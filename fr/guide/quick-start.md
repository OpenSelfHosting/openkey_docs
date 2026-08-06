# Démarrage rapide

Exécutez le serveur de sync ouvert, puis connectez l'application, l'extension ou la CLI.

## Serveur

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API : `http://localhost:8000` — OpenAPI sur `/docs`, santé sur `/health`.

## Application

Installez l'application **OpenKey** depuis la boutique officielle ou le canal de téléchargement de votre plateforme. Dans **Paramètres → Données → Serveur auto-hébergé**, définissez `http://localhost:8000` (ou votre URL HTTPS), puis inscrivez-vous ou connectez-vous et synchronisez.

Voir [Utiliser l'application](./app).

## Extension navigateur

```bash
cd openkey_extension
npm install
npm run build
```

Chargez `dist/` comme extension non empaquetée. Définissez l'URL du serveur dans Options et déverrouillez avec email + mot de passe principal. Sur bureau, activez Autofill dans l'application pour enregistrer l'hôte de messagerie native.

## CLI

```bash
cd openkey_cli
npm install
npm run build
npm link   # optional

openkey gen -l 24
openkey discover --dry-run
openkey discover -y
```

Gardez l'application bureau déverrouillée pour la découverte locale de secrets. Sync serveur optionnelle :

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Suivant : lisez [Sécurité](./security), [Configuration du serveur](./server), [Utiliser l'application](./app) et [CLI](./cli).
