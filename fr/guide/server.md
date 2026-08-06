# Installer le serveur

OpenKey Server est une **API de sync zero-knowledge** optionnelle. Il stocke uniquement du ciphertext pour synchroniser les coffres entre vos propres appareils. Les mots de passe principaux et les clés de coffre en clair ne quittent jamais le client.

## Prérequis

- Docker et Docker Compose (recommandé), **ou** Python 3.12+ avec PostgreSQL 16
- Un `JWT_SECRET` fort (au moins 32 caractères, pas un placeholder)

## Installation avec Docker

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

Une fois sain :

| URL | Rôle |
|-----|---------|
| `http://localhost:8000` | Base API |
| `http://localhost:8000/docs` | Docs OpenAPI |
| `http://localhost:8000/health` | Contrôle de santé |

Les migrations de schéma s’exécutent automatiquement au démarrage de l’API (`alembic upgrade head`).

## Configuration importante

| Variable | Notes |
|----------|--------|
| `JWT_SECRET` | Requis. Min. 32 caractères ; les placeholders sont rejetés au démarrage |
| `DATABASE_URL` | URL Postgres async (Compose le définit pour le service `db`) |
| `CORS_ORIGINS` | Origines séparées par des virgules — **pas de `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT d’accès courte durée (défaut 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | TTL du refresh token opaque (défaut 7, roté à l’usage) |
| `AUTH_RATE_LIMIT_*` | Limites par IP sur les endpoints auth |

En production : mettez l’API derrière HTTPS, définissez un `JWT_SECRET` unique et restreignez `CORS_ORIGINS` à vos clients. Bloqué ? Voir [FAQ et dépannage](./faq).

## Production derrière HTTPS

N’exposez publiquement que le reverse proxy. Gardez Postgres et l’API sur un réseau privé (le défaut Compose convient sur un seul hôte).

Exemple **Caddy** (Let’s Encrypt automatique) :

```txt
openkey.example.com {
	reverse_proxy 127.0.0.1:8000
}
```

Exemple **nginx** :

```nginx
server {
	listen 443 ssl http2;
	server_name openkey.example.com;

	# ssl_certificate / ssl_certificate_key … (certbot or your CA)

	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Puis dans `.env` :

```bash
CORS_ORIGINS=https://openkey.example.com
# Add chrome-extension://<id> and moz-extension://<id> if the browser extension calls the API from those origins
```

Pointez les clients vers `https://openkey.example.com` (sans port). Confirmez `https://openkey.example.com/health`.

## Aperçu de l’API

OpenAPI interactive : `http://localhost:8000/docs` sur un serveur en cours d’exécution. Les tableaux complets sont dans le README du paquet `openkey_server`. Points clés :

### Auth

| Méthode | Chemin | Notes |
|--------|------|--------|
| `POST` | `/auth/register` | Premier compte — stocke `auth_hash`, clé de coffre enveloppée, sel, paramètres KDF |
| `POST` | `/auth/prelogin` | Renvoie sel + paramètres KDF pour que les clients dérivent `auth_hash` |
| `POST` | `/auth/login` | Email + `auth_hash` → jetons d’accès + rafraîchissement |
| `POST` | `/auth/refresh` | Fait tourner le refresh token opaque |
| `POST` | `/auth/rekey` | Après changement de mot de passe principal — la clé de coffre reste la même |
| `POST` | `/auth/delete` | Re-prouver `auth_hash` ; supprime uniquement le ciphertext **serveur** |
| `POST` | `/auth/lookup-public-key` | Email → clé d’identité publique (pour envelopper les clés org/partage) |

Les endpoints d’auth sont rate-limités par IP client. Les refresh tokens sont hachés au repos.

### Sync, collections, entrées

`POST /sync` pousse/tire du ciphertext avec **last-write-wins par `revision` par élément**. Les soft deletes deviennent des **tombstones** pour que les pairs apprennent les suppressions. Les dossiers imbriqués utilisent le `parent_uuid` de collection.

### Pièces jointes

Ciphertext uniquement. Taille max **20 Mo**. Préférez le multipart `POST /attachments` pour les uploads ; `GET /attachments/{uuid}/content` streame les octets chiffrés. La sync par lot peut encore transporter des blobs base64 pour le rattrapage hors ligne.

### Orgs et partages

Les noms d’org et charges de partage restent chiffrés. Les partages d’entrée **prennent un snapshot** du ciphertext à la création — accepter importe une copie figée dans le coffre du destinataire (pas un document en direct). Préférez les collections partagées d’org pour un accès d’équipe continu. Guide : [Partage et organisations](./sharing).

## Connecter vos clients

Pointez chaque client vers **la même** URL serveur (Docker local : `http://localhost:8000`, ou votre URL HTTPS publique).

### Application OpenKey (téléphone / bureau)

Installez l’application OpenKey depuis les [canaux de téléchargement](./download).

1. Déverrouillez ou créez un coffre local avec votre mot de passe principal.
2. Ouvrez **Réglages → Données → Serveur auto-hébergé**.
3. Saisissez l’URL du serveur (exemple : `https://openkey.example.com`).
4. **S’inscrire** (premier appareil) ou **Connexion** (autre appareil ayant déjà ce compte coffre).
5. Appuyez sur **Synchroniser maintenant** pour tirer/pousser du ciphertext.

L’application conserve une base de données locale chiffrée. La sync n’échange que du ciphertext opaque. Plus : [Utiliser l’application](./app).

### Extension navigateur

1. Compilez et chargez `openkey_extension` (`npm install && npm run build`, puis chargez `dist/`) — voir [Extension navigateur](./extension).
2. Ouvrez **Options** de l’extension et définissez la même URL serveur.
3. Déverrouillez avec le même email + mot de passe principal (l’extension utilise `/auth/prelogin` puis login).

**Pont bureau (optionnel) :** déverrouillez l’application bureau OpenKey, activez Autofill pour enregistrer l’hôte de messagerie native, puis choisissez « Utiliser l’application bureau » dans l’extension. Remplir/enregistrer peut passer par l’application déverrouillée sans déverrouillage séparé de l’extension.

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Voir [CLI](./cli) pour la découverte de secrets sans serveur (pont application bureau).

## Liste de contrôle multi-appareils

1. Installez et sécurisez le serveur une fois.
2. Sur le premier appareil : inscription + sync.
3. Sur chaque nouvel appareil : installez le client → définissez la même URL serveur → connectez-vous avec le même email et mot de passe principal → sync.
4. Conservez des sauvegardes hors ligne régulières (export / sauvegarde locale) — le serveur n’est pas une voie de récupération pour un mot de passe principal oublié.

<img src="/guide/server-sync-topology.svg" alt="Sync topology: app, extension, and CLI send auth_hash and ciphertext to openkey_server (FastAPI), which stores opaque rows in PostgreSQL" class="ok-diagram" width="920" height="400" />

Suivant : [Télécharger](./download) · [Utiliser l’application](./app) · [Extension navigateur](./extension) · [FAQ](./faq) · [CLI](./cli) · [Sécurité](./security)
