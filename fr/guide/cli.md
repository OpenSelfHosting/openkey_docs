# CLI

L’interface en ligne de commande OpenKey (`openkey`) s’adresse aux développeurs qui conservent des secrets, jetons API, clés SSH et contenu `.env` dans un coffre OpenKey. Elle peut fonctionner **entièrement hors ligne** pour la génération de mots de passe, communiquer avec une **application bureau OpenKey déverrouillée** via un pont natif local, et s’authentifier optionnellement auprès d’un **serveur de sync auto-hébergé** pour tirer du ciphertext et obtenir une session CLI de courte durée.

Nécessite **Node.js 20+**.

## Architecture

Le schéma ci-dessous montre qui communique avec quoi. La génération de mots de passe reste hors ligne. Les commandes coffre privilégient l’application bureau déverrouillée. La sync serveur est optionnelle.

<img src="/guide/cli-architecture.svg" alt="Architecture OpenKey CLI : la CLI communique avec l'application bureau via un pont natif, analyse cette machine pour la découverte, et synchronise optionnellement le ciphertext avec un serveur auto-hébergé" class="ok-diagram" width="920" height="420" />

| Mode | Quand il s’applique | Ce qu’il peut faire |
|------|---------------------|---------------------|
| **Hors ligne** | Toujours | `gen` — sans application, sans serveur |
| **Pont natif** | Application bureau déverrouillée sur cette machine | CRUD secrets, import par découverte, recherche/get/copy dans les secrets et connexions |
| **Session CLI** | Après `login` + `eval $(openkey unlock)` | Mêmes opérations sur le coffre contre un cache ciphertext local ; `sync` tire depuis le serveur |

### Comment une commande coffre choisit un backend

<img src="/guide/cli-backend-choice.svg" alt="Organigramme : une commande coffre vérifie le pont bureau, puis OPENKEY_SESSION, sinon erreur avec une indication de déverrouillage" class="ok-diagram" width="920" height="360" />

1. Si le pont bureau répond → utiliser le mode **native** (préféré ; aucune inscription serveur requise).
2. Sinon, si `OPENKEY_SESSION` est défini et valide → utiliser le mode **session** (cache local / matériau adossé au serveur).
3. Sinon → les commandes qui nécessitent le coffre échouent avec une indication pour déverrouiller l’application ou exécuter `eval $(openkey unlock)`.

Le pont n’accepte les connexions **que depuis la machine locale** et uniquement tant que le coffre est déverrouillé. Sous Unix, il utilise un socket sous les chemins OpenKey connus (remplacer avec `OPENKEY_NATIVE_SOCKET`). Sous Windows, il utilise un fichier de port localhost sous `%LOCALAPPDATA%\OpenKey\` (remplacer avec `OPENKEY_NATIVE_PORT`).

## Installation

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

Sans liaison :

```bash
npx tsx src/cli.ts --help
# after build:
node dist/cli.js --help
```

Vérification :

```bash
openkey --version
openkey status
```

## Configuration et stockage

L’état CLI local est stocké dans un répertoire de configuration selon la plateforme (mode fichier `600` lorsque pris en charge) :

| Plateforme | Chemin |
|------------|--------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json` (ou `$XDG_CONFIG_HOME/openkey/`) |
| Windows | `%APPDATA%\OpenKey\config.json` |

Le fichier peut contenir : URL serveur, email, jetons d’accès/rafraîchissement, sel et paramètres KDF, clé de coffre enveloppée, durée de verrouillage de session, révision serveur, et un cache **ciphertext** d’entrées/collections après sync. Il ne stocke pas le mot de passe principal en clair.

### Commandes `config`

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` requiert une URL commençant par `http://` ou `https://` (barre oblique finale supprimée).
- URL serveur par défaut avant la première définition : `http://localhost:8000`.

## Options globales

| Option | Effet |
|--------|-------|
| `--json` | JSON lisible par machine sur stdout pour les scripts |
| `--help` / `--version` | Aide et version |

Placez `--json` avant la sous-commande pour les options globales Commander, par ex. `openkey --json status`.

## Génération de mots de passe (`gen`)

Entièrement hors ligne. Ne nécessite ni l’application ni un serveur.

```bash
openkey gen
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c
openkey --json gen -l 20
```

| Option | Description | Défaut |
|--------|-------------|--------|
| `-l, --length <n>` | Longueur (plage pratique 4–64) | `20` |
| `--no-upper` | Exclure les majuscules | désactivé |
| `--no-lower` | Exclure les minuscules | désactivé |
| `--no-digits` | Exclure les chiffres | désactivé |
| `--no-symbols` | Exclure les symboles | désactivé |
| `-a, --avoid-ambiguous` | Éviter les caractères ambigus `Il1O0o` | désactivé |
| `-c, --copy` | Copier dans le presse-papiers au lieu d’afficher | désactivé |

Avec `-c`, le mode humain affiche une confirmation ; le mode JSON renvoie `{ "copied": true, "length": N }`. Sans `-c`, le mot de passe est affiché (ou `{ "password": "..." }` en mode JSON).

## État et hygiène

```bash
openkey status
openkey forget
```

**`status`** affiche l’URL serveur, l’email, l’état de connexion, la disponibilité du pont, le mode de déverrouillage (`native` / `session`), le temps de session restant et le nombre d’entrées en cache.

**`forget`** efface la configuration CLI locale et le ciphertext en cache. Il ne supprime pas les secrets dans le coffre de l’application bureau. Après `forget`, relancez `config set-server` / `login` si vous utilisez le mode serveur.

## Secrets développeur (`secret`)

Les secrets résident dans la zone réservée **Secrets** du coffre (`__dev_secrets__`), regroupés par **appareil** (libellé de machine ; nom d’hôte par défaut). Les commandes requièrent l’application bureau déverrouillée **ou** une `OPENKEY_SESSION` valide.

### Types

| Type | Usage typique | Notes |
|------|---------------|-------|
| `apiToken` | PAT, clés API | Par défaut |
| `sshKey` | Clés privées | Préférez `--file` / `--public-key-file` |
| `envSnippet` | Corps `.env` complets | Préférez `--file` |
| `other` | Fourre-tout | — |

Des alias tels que `ssh`, `api`, `token`, `env`, `.env` sont normalisés vers les types ci-dessus.

### `secret add`

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy key" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub -H git.example.com -u git
openkey secret add -n "acme .env" -k envSnippet -f ./apps/api/.env -d laptop
```

| Option | Description |
|--------|-------------|
| `-n, --name` | Nom d’affichage (**obligatoire**) |
| `-k, --kind` | `sshKey` \| `apiToken` \| `envSnippet` \| `other` |
| `-s, --secret` | Valeur du secret en ligne (`-` lit stdin) |
| `-f, --file` | Lire le corps du secret depuis un fichier |
| `--stdin` | Lire le secret depuis stdin (préférable à mettre des jetons dans argv) |
| `-u, --username` | Nom d’utilisateur optionnel |
| `-H, --host` | Hôte optionnel |
| `-d, --device` | Libellé de collection d’appareil (défaut : nom d’hôte) |
| `--public-key` / `--public-key-file` | Clé publique SSH |
| `--passphrase` | Phrase secrète de la clé |
| `--notes` | Notes libres |

Fournissez `--secret`, `--file` ou `--stdin` (non vide). Les enregistrements créés renvoient un UUID.

```bash
printf '%s' "$TOKEN" | openkey secret add -n "CI token" --stdin
```

### `secret list` / `get` / `copy` / `rm` / `update` / `export` / `devices`

```bash
openkey secret list
openkey secret list -d laptop -k apiToken
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret update "GitHub PAT" --secret ghp_new...
printf '%s' "$TOKEN" | openkey secret update "GitHub PAT" --stdin
openkey secret export -d laptop -o .env.local
openkey secret export --format exports   # for eval
openkey secret devices
openkey secret rm "old token" -y
```

- **list** — tableau avec préfixe UUID, nom, type, appareil, secret **masqué**. Filtres optionnels `-d/--device` et `-k/--kind`.
- **get** / **copy** / **rm** / **update** — correspondance par **nom**, **hôte** ou **préfixe UUID**. Quand plusieurs sous-chaînes correspondent, un nom/titre, hôte ou préfixe UUID (≥4 caractères) **exact** l’emporte ; sinon la commande échoue avec les candidats.
- **update** — ne met à jour que les options passées (`--name`, `--secret`/`--file`/`--stdin`, `--kind`, `--device`, …). Requiert le gestionnaire `updateSecret` du pont bureau (application OpenKey avec cette version) ou une session CLI.
- **export** — écrit les secrets au format dotenv (`KEY=value` ; corps `envSnippet` intégrés) ou lignes shell `--format exports`. `-o` écrit un fichier en mode `600` lorsque pris en charge.
- **devices** — liste les libellés de collections d’appareils et les comptages.
- **get** affiche en clair (ou l’objet JSON complet en mode `--json`).
- **copy** écrit en clair dans le presse-papiers.
- **rm** demande confirmation sauf si `-y` / `--yes`.

## Injecter des secrets dans le shell (`env` / `run`)

```bash
# Print export lines for eval (NAME or NAME=query)
eval $(openkey env DATABASE_URL)
eval $(openkey env DB=DATABASE_URL GH="GitHub PAT")

# Or run a child process with secrets in its environment
openkey run -e DATABASE_URL -e GH="GitHub PAT" -- npm start
```

| Forme | Signification |
|-------|---------------|
| `NAME` | Variable d’env `NAME` ; recherche l’élément du coffre par ce nom |
| `NAME=query` | Variable d’env `NAME` ; recherche par `query` (nom / hôte / UUID) |

`--json` sur `env` renvoie des objets avec `env`, `query`, `name`, `uuid` et `value`. `--raw` affiche une seule valeur en clair (exactement une liaison).

## Découverte (`discover`)

Analyse cette machine et importe les secrets **nouveaux** dans le groupe d’appareil. Déduplique par rapport aux valeurs déjà dans le coffre (par type + nom + empreinte de contenu).

<img src="/guide/cli-discover-flow.svg" alt="Flux de découverte : analyser les sources locales, prévisualiser les valeurs masquées, dédupliquer par empreinte, puis enregistrer dans le groupe d'appareil du coffre" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme -p ~/src/labs --depth 3
openkey discover --no-aws --no-env-vars
```

| Option | Description | Défaut |
|--------|-------------|--------|
| `-d, --device` | Nom de collection d’appareil | nom d’hôte |
| `-p, --path <dir>` | Racine(s) de projet pour le parcours `.env` (répétable) | `cwd` |
| `--depth <n>` | Profondeur maximale de répertoire pour `.env` | `4` |
| `--no-ssh` | Ignorer les clés privées de `~/.ssh` | analyse activée |
| `--no-env-files` | Ignorer les fichiers `.env` / `.env.*` | analyse activée |
| `--no-env-vars` | Ignorer l’environnement du processus | analyse activée |
| `--no-aws` | Ignorer `~/.aws/credentials` | analyse activée |
| `--no-gh` | Ignorer les jetons GitHub CLI `hosts.yml` | analyse activée |
| `--no-docker` | Ignorer l’auth registre `~/.docker/config.json` | analyse activée |
| `--dry-run` | Lister uniquement ; ne pas enregistrer | désactivé |
| `-y, --yes` | Importer sans confirmation interactive | désactivé |

### Ce qui est analysé

- **SSH** — clés privées sous `~/.ssh` (ignore `known_hosts`, `authorized_keys`, `config`, fichiers `.pub`) ; attache le `.pub` jumeau lorsqu’il est présent.
- **Variables d’environnement** — noms bien connus (`GITHUB_TOKEN`, `OPENAI_API_KEY`, `DATABASE_URL`, …) et noms correspondant à des suffixes de type secret ; ignore `PATH`, `HOME`, `OPENKEY_SESSION`, `OPENKEY_PASSWORD`, etc.
- **AWS** — profils dans `~/.aws/credentials`.
- **GitHub CLI** — entrées `oauth_token` / `token` dans `~/.config/gh/hosts.yml`.
- **Docker** — `auths` décodés depuis `~/.docker/config.json`.
- **Fichiers `.env`** — parcours depuis les racines, en ignorant `node_modules`, `.git`, `dist`, environnements virtuels, etc. ; des limites de taille et de nombre de fichiers s’appliquent.

L’exécution à blanc fonctionne même si le coffre est verrouillé (liste uniquement). L’enregistrement requiert un pont ou une session déverrouillée. Les secrets déjà importés sont signalés comme ignorés.

## Rechercher dans les secrets et les connexions

Ces commandes recherchent dans les **secrets développeur et les entrées de connexion** :

```bash
openkey search github
openkey get "GitHub"
openkey get "GitHub" --field username
openkey copy api.example.com --field totp
openkey totp "GitHub" -c
openkey logins
```

| Commande | Sortie |
|----------|--------|
| `search <query>` | Tableau masqué (ou aperçus JSON) ; indique la disponibilité TOTP |
| `get <query>` | Champ de la meilleure correspondance (`--field password\|username\|url\|totp\|notes`) |
| `copy <query>` | Copie dans le presse-papiers de ce champ (effacement auto après 45 s ; `--keep` pour désactiver) |
| `totp <query>` | Code TOTP en direct (`-c` copie, `-w` affichage continu jusqu’à Ctrl+C) |
| `logins` | Liste les connexions avec nom d’utilisateur / URL / indicateur TOTP |
| `doctor` | Diagnostique Node, permissions config, pont, session, `/health` serveur, presse-papiers |

Les correspondances ambiguës par sous-chaîne privilégient un nom/titre, hôte ou préfixe UUID exact ; sinon elles listent UUID, type et libellé — affinez la requête. Préférez `secret get` / `secret copy` lorsque vous ne voulez que la section Secrets.

Utilisez **`secret set`** pour créer ou mettre à jour par nom + appareil. **`sync --push`** pousse le cache ciphertext local avant de tirer.

## Serveur auto-hébergé optionnel

Utilisez ce chemin lorsque l’application bureau n’est pas disponible sur la machine (par exemple accès au coffre uniquement via téléphone et sync), ou lorsque vous voulez un cache ciphertext CLI.

<img src="/guide/cli-server-flow.svg" alt="Flux serveur : set-server, login avec auth_hash, tirer le ciphertext dans le cache local, puis eval unlock pour définir OPENKEY_SESSION pour les commandes coffre" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Installation du serveur : [Installer le serveur](./server).

### Flux d’authentification

1. **`login`** — demande l’email (ou `-e`) et le mot de passe principal (ou `OPENKEY_PASSWORD`). Effectue un prelogin pour le sel/KDF, dérive `auth_hash` avec Argon2id, obtient des JWT, récupère le matériau de clé de coffre enveloppée, vérifie le mot de passe en déroulant l’enveloppe, puis **tire** le ciphertext dans le cache local. Ne jamais envoyer le mot de passe principal en argument CLI.
2. **`unlock`** — dérive à nouveau la clé de coffre, actualise les jetons/la sync lorsque le serveur est joignable, et affiche une exportation shell pour `OPENKEY_SESSION` (utilisez `eval $(openkey unlock)`). Options : `-e/--email`, `--raw` (jeton uniquement). Le mode JSON émet les champs de session.
3. **`lock`** — affiche `unset OPENKEY_SESSION` (ou indication JSON) pour pouvoir exécuter `eval $(openkey lock)`.
4. **`logout`** — efface les jetons d’accès/rafraîchissement ; conserve le cache ciphertext local. Associez avec `lock` pour effacer l’env de session.
5. **`sync`** — requiert une connexion ; tire les entrées/collections et met à jour `serverRevision`.

La durée de vie de session est de **15 minutes** par défaut (`config set-lock`). Les sessions expirées requièrent un nouveau `unlock`.

### Variables d’environnement

| Variable | Rôle |
|----------|------|
| `OPENKEY_SESSION` | Blob de session chiffré de courte durée issu de `unlock` |
| `OPENKEY_PASSWORD` | Mot de passe principal pour `login` / `unlock` non interactifs (scripts/CI uniquement) |
| `OPENKEY_EMAIL` | Email du compte pour `login` / `unlock` non interactifs |
| `OPENKEY_NATIVE_SOCKET` | Remplacer le chemin du socket du pont Unix |
| `OPENKEY_NATIVE_PORT` | Remplacer le port du pont Windows |

Préférez l’invite de mot de passe interactive sur les machines personnelles. Traitez `OPENKEY_PASSWORD` et les jetons de session comme du matériel secret dans les journaux CI.

## Complétions shell

```bash
eval "$(openkey completion bash)"
eval "$(openkey completion zsh)"
openkey completion fish | source
```

## Référence des commandes

| Commande | Accès coffre requis ? | Description |
|----------|----------------------|-------------|
| `gen` | Non | Génération de mots de passe hors ligne |
| `discover` | Enregistrement : oui\* / dry-run : non | Analyse SSH / `.env` / env / AWS → groupe d’appareil |
| `secret add\|list\|get\|copy\|rm\|update\|export\|devices` | Oui\* | Secrets développeur |
| `get` / `copy` / `search` / `totp` / `logins` | Oui\* | Secrets + connexions (TOTP, sélection de champ) |
| `doctor` | Non | Diagnostiquer pont / session / serveur |
| `env` / `run` | Oui\* | Exporter des secrets dans le shell / processus enfant |
| `completion` | Non | Complétions Bash / zsh / fish |
| `status` | Non | État pont / session / serveur |
| `config set-server\|show\|set-lock` | Non | Configuration CLI |
| `login` / `logout` | — | Auth serveur optionnelle |
| `unlock` / `lock` | — | Session CLI optionnelle |
| `sync` | Connexion requise | Tirer le ciphertext depuis le serveur |
| `forget` | Non | Effacer la config CLI locale + le cache |

\*Application bureau déverrouillée, **ou** `OPENKEY_SESSION` valide après connexion serveur.

## Modèle de sécurité

- Les commandes list/search **masquent** les valeurs ; utilisez `get` / `copy` uniquement lorsque vous avez besoin du texte en clair.
- Le serveur de sync stocke **uniquement du ciphertext** ; la CLI dérive les clés localement comme les autres clients OpenKey.
- Ne passez pas le mot de passe principal en argument ; évitez de journaliser `OPENKEY_PASSWORD` ou `OPENKEY_SESSION`.
- Le trafic du pont est local uniquement et requiert un coffre déverrouillé.
- Les jetons de session expirent ; réduisez la durée avec `config set-lock` sur les machines partagées.
- `forget` efface l’état CLI sur disque ; faites tourner les jetons serveur avec `logout` si la machine n’est plus de confiance ensuite.

## Développement

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## Guides connexes

- [Utiliser l’application](./app) — déverrouillage bureau, section Secrets, remplissage automatique
- [Installer le serveur](./server) — sync auto-hébergée
- [Sécurité](./security) — Argon2id, jetons, modèle de menace
- [Paquets](./packages) — organisation du dépôt
