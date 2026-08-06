# Vue d'ensemble

OpenKey est un **gestionnaire de mots de passe chiffré de bout en bout auto-hébergé**. Les clients chiffrent les données du coffre avant qu'elles ne quittent l'appareil. Le serveur de sync optionnel stocke **uniquement du ciphertext** — les mots de passe principaux et les clés de coffre en clair ne quittent jamais le client.

## Ce que vous obtenez

- Coffre chiffré local (collections, identifiants, cartes, portefeuilles crypto, secrets développeur)
- Sync optionnelle entre appareils via votre propre serveur
- Extension navigateur avec saisie automatique et passkeys
- Application mobile / bureau et CLI développeur ouverte
- Organisations, collections partagées et partages d'éléments — toujours du ciphertext sur le serveur

## Modèle zero-knowledge

1. Le client dérive des clés de votre mot de passe principal avec **Argon2id**.
2. Un `auth_hash` vous authentifie auprès du serveur sans révéler le mot de passe principal.
3. Le contenu du coffre reste chiffré avec une clé de coffre que le serveur ne voit jamais en clair.
4. Noms, payloads, pièces jointes, noms d'org et payloads de partage sont du ciphertext opaque au repos sur le serveur.

## Paquets ouverts

| Paquet | Rôle |
|---------|------|
| `openkey_server` | API de sync zero-knowledge FastAPI + PostgreSQL |
| `openkey_extension` | Extension navigateur MV3 (Chrome / Firefox) |
| `openkey_cli` | CLI développeur (secrets, gén. mots de passe, sync) |

L'**application OpenKey** mobile et bureau est traitée séparément. Voir [Utiliser l'application](./app) pour l'usage produit, [Paquets](./packages) pour la configuration, [Configuration du serveur](./server) pour installer la sync, et [Démarrage rapide](./quick-start) pour exécuter la pile localement.
