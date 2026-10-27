---
title: Passkeys et saisie automatique dans le navigateur
description: Comment OpenKey remplit les connexions et passkeys dans le navigateur et comme fournisseur d'identifiants système — tout en gardant les données du coffre chiffrées sur le client.
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.png
---

# Passkeys et saisie automatique dans le navigateur

Le coffre sur votre téléphone n'est que la moitié de l'histoire. La connexion quotidienne se fait dans Chrome, Firefox et l'UI d'identifiants du système — OpenKey fournit donc une extension navigateur **MV3** plus la prise en charge Autofill / Credential Provider système sur mobile et bureau.

## Ce que fait l'extension

- Déverrouille contre votre coffre (pont local vers l'app bureau, et/ou sync auto-hébergée)
- Suggère des connexions correspondantes sur les formulaires web
- Prend en charge les flux WebAuthn / passkey lorsque le site les propose
- Utilise la **même** URL de serveur que l'app lorsque vous synchronisez

Construisez et chargez-la depuis `openkey_extension` :

```bash
cd openkey_extension
npm install
npm run build
```

Chargez le dossier `dist/` comme extension non empaquetée. Sur bureau, déverrouillez l'app OpenKey et enregistrez l'hôte de messagerie native, ou déverrouillez l'extension contre votre serveur en mode autonome. Définissez l'URL du serveur dans Options si vous utilisez la sync, puis déverrouillez avec email et mot de passe principal.

## Autofill système aussi

Dans l'app, activez OpenKey sous **Réglages → Autofill** comme fournisseur système de mots de passe et passkeys. Ce chemin couvre les apps et navigateurs qui parlent au magasin d'identifiants de l'OS — complémentaire à l'extension, pas un remplacement sur toutes les plateformes.

## Toujours zero-knowledge

La saisie automatique s'exécute après déverrouillage sur le client. L'extension ou le fournisseur OS ne déchiffre que ce dont il a besoin. La sync — si activée — échange toujours du ciphertext opaque. Une base de sync compromise ne devient pas un dump de mots de passe remplis. Les pages web non dignes de confiance ne doivent recevoir des secrets que via une médiation d'autofill intentionnelle.

## Associez-le au reste de la pile

| Client | Rôle |
|--------|------|
| App | Coffre quotidien sur téléphone et bureau ; Autofill système / passkeys |
| Extension | Saisie automatique et passkeys dans Chrome / Firefox |
| CLI | Secrets développeur et génération |
| Serveur | Sync ciphertext optionnelle |

## En savoir plus

- [Utiliser l'application](/fr/guide/app) — Autofill, navigateur et sauvegardes
- [Paquets](/fr/guide/packages) — configuration de l'extension
- [Configuration du serveur](/fr/guide/server) — connecter l'extension à votre hôte
- [Sécurité](/fr/guide/security) — frontières de confiance pour l'extension et la messagerie native
