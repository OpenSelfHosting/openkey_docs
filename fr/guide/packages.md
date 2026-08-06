# Paquets

Paquets que vous pouvez auto-héberger et compiler. L'**application mobile/bureau OpenKey** est décrite dans [Utiliser l'application](./app).

| Chemin | Description |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | API de sync zero-knowledge FastAPI + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | Extension navigateur MV3 (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | CLI développeur — secrets, génération de mots de passe, sync |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | Ce site — pages produit et documentation |

Pour l'utilisation quotidienne du client, voir [Utiliser l'application](./app).

## Points forts du serveur

- Stockage ciphertext uniquement
- JWT d'accès + refresh tokens opaques rotatifs
- Migrations Alembic sur PostgreSQL 16
- Limitation de débit auth et CORS strict

## Points forts de l'extension

- Déverrouillage de coffre autonome + sync, ou pont natif vers l'application bureau déverrouillée
- Overlays Autofill, invites enregistrer/mettre à jour, passkeys
- Cartes, portefeuilles crypto et secrets développeur

## Points forts de la CLI

- Génération de mots de passe hors ligne
- Découverte de clés SSH, fichiers `.env` et tokens API dans l'application bureau déverrouillée
- Login / unlock / sync optionnels contre votre serveur

Les remotes publiés sous [OpenSelfHosting](https://github.com/OpenSelfHosting) peuvent distribuer des paquets séparément ; ce site décrit les paquets ouverts ci-dessus.
