---
title: Une CLI pour les secrets développeur
description: Vue d'ensemble professionnelle de la CLI OpenKey — génération hors ligne, pont bureau natif, découverte, types de secrets et sync serveur zero-knowledge optionnelle.
date: 2026-08-01
cover: /blog/covers/cli-for-developers.png
---

# Une CLI pour les secrets développeur

Clés SSH, fichiers `.env` et jetons API éparpillés sur les laptops et agents CI. La **CLI** OpenKey (`openkey`) est la face terminal du même coffre zero-knowledge : générez des mots de passe hors ligne, importez des découvertes locales dans l'app **bureau** déverrouillée, gérez des secrets typés et tirez optionnellement du ciphertext depuis un serveur auto-hébergé.

Cet article est une visite guidée. La référence complète au niveau des flags est dans le [guide CLI](/fr/guide/cli).

## Trois modes de fonctionnement

<img src="/guide/cli-architecture.svg" alt="Vue d'ensemble de l'architecture OpenKey CLI" class="ok-diagram" width="920" height="420" />

| Mode | Prérequis | Rôle |
|------|-----------|------|
| Hors ligne | Rien | `openkey gen` — mots de passe cryptographiquement utiles sans réseau ni coffre déverrouillé |
| Pont natif | App bureau déverrouillée sur cette machine | Chemin par défaut pour secrets, import par découverte et recherche dans secrets **et** connexions |
| Session CLI | `login` + `eval $(openkey unlock)` | Cache ciphertext local et `sync` quand l'app bureau n'est pas disponible |

La CLI préfère le pont quand il est actif. Sinon elle utilise `OPENKEY_SESSION`. Le pont est local uniquement et refuse le travail tant que le coffre est verrouillé — la même frontière de confiance que la session bureau.

<img src="/guide/cli-backend-choice.svg" alt="Comment les commandes coffre choisissent le pont natif ou le mode session" class="ok-diagram" width="920" height="360" />

## Génération hors ligne

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

Ajustez la longueur et les classes de caractères (`--no-upper`, `--no-lower`, `--no-digits`, `--no-symbols`), ou copiez directement dans le presse-papiers avec `-c`. Aucun déverrouillage d'app ni inscription serveur requis.

## Découverte vers un groupe d'appareil

<img src="/guide/cli-discover-flow.svg" alt="Flux de découverte du scan à l'enregistrement dans le coffre" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

La découverte peut analyser :

- Clés privées sous `~/.ssh` (avec fichiers `.pub` associés si présents)
- Variables d'environnement de processus bien connues et de type secret
- Identifiants partagés AWS
- Arbres `.env` / `.env.*` depuis une ou plusieurs racines de projet

Les résultats sont regroupés sous une étiquette **device** (nom d'hôte par défaut) dans la section Secrets du coffre. Les valeurs déjà importées sont ignorées par empreinte de contenu. Utilisez `--dry-run` pour prévisualiser ; `-y` pour importer sans invite. L'enregistrement nécessite toujours l'app bureau déverrouillée (ou une session CLI).

## Opérations quotidiennes sur les secrets

Les secrets sont des enregistrements typés : `apiToken` (par défaut), `sshKey`, `envSnippet` ou `other`.

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

List et search **masquent** les valeurs. Utilisez `get` / `copy` uniquement quand le texte en clair est requis. Les requêtes correspondent au nom, à l'hôte ou au préfixe UUID ; les correspondances ambiguës listent les candidats au lieu de deviner.

Pour rechercher **secrets et entrées de connexion** ensemble :

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## Sync auto-hébergée optionnelle

<img src="/guide/cli-server-flow.svg" alt="Flux login, pull ciphertext et déverrouillage OPENKEY_SESSION" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

Login dérive un `auth_hash` avec Argon2id, n'envoie jamais le mot de passe principal comme flag, ne stocke que des clés enveloppées et du ciphertext dans le cache CLI, et imprime un export `OPENKEY_SESSION` depuis `unlock` (durée par défaut 15 minutes ; changez avec `openkey config set-lock`). Pour la CI vous pouvez définir `OPENKEY_PASSWORD` ; préférez l'invite interactive sur les machines personnelles.

Inspectez l'état à tout moment :

```bash
openkey status
openkey config show
```

## Pourquoi cela appartient à un gestionnaire de mots de passe

Les développeurs vivent dans les terminaux. Une CLI qui écrit dans la même zone Secrets chiffrée que l'app — et la même API de sync ciphertext uniquement — aligne workflow et modèle de menace. Vous ne maintenez pas un second magasin de secrets pour les scripts.

## Installation

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

Nécessite Node.js 20+. Référence complète des commandes, variables d'environnement, chemins de config et notes de sécurité : [guide CLI](/fr/guide/cli).
