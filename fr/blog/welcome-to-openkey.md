---
title: Bienvenue sur OpenKey
description: Pourquoi nous avons construit un gestionnaire de mots de passe auto-hébergé qui ne stocke que du ciphertext — et ce qui est disponible dans l'app, le serveur, l'extension et la CLI.
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.png
---

# Bienvenue sur OpenKey

La plupart des gestionnaires de mots de passe vous demandent de faire confiance à un cloud que vous ne contrôlez pas. OpenKey prend l'autre voie : votre coffre reste chiffré sur l'appareil, un serveur de sync optionnel ne stocke que du **ciphertext**, et les mots de passe principaux ne quittent jamais le client.

## Ciphertext uniquement

Les clients chiffrent les données du coffre avant qu'elles ne quittent l'appareil. L'API de sync — si vous en utilisez une — stocke des blobs opaques. Noms de collections, charges d'entrées, pièces jointes, noms d'organisations et données de partage restent du ciphertext au repos. Compromettre la base de données ne donne que des sels, des paramètres KDF, des clés enveloppées et des blobs — pas des identifiants lisibles.

## Ce qui est disponible aujourd'hui

| Composant | Rôle |
|-----------|------|
| **App** | Coffre quotidien sur Android, iOS, macOS, Linux et Windows — connexions, cartes, portefeuilles crypto, secrets développeur, organisations et partage |
| **Serveur** | API de sync zero-knowledge FastAPI + PostgreSQL que vous pouvez auto-héberger |
| **Extension** | Saisie automatique et passkeys MV3 pour Chrome et Firefox |
| **CLI** | Génération de mots de passe hors ligne, découverte de secrets locaux et sync optionnelle |

Vous pouvez aussi synchroniser un coffre entre appareils sur le même Wi‑Fi avec **Nearby** (Pro) — aucun serveur requis pour ce chemin LAN. La sync serveur et Nearby ne déplacent que du ciphertext (last-write-wins par revision).

## Commencer

- [Démarrage rapide](/fr/guide/quick-start) — exécuter la pile localement
- [Utiliser l'application](/fr/guide/app) — workflows du coffre sur téléphone et bureau
- [Sécurité](/fr/guide/security) — modèle zero-knowledge et frontières de confiance
- [Configuration du serveur](/fr/guide/server) — installer et lier votre propre hôte de sync

Aussi sur le blog : [sync zero-knowledge](/fr/blog/zero-knowledge-sync), [Nearby sans serveur](/fr/blog/nearby-without-a-server), [auto-hébergement](/fr/blog/self-host-your-vault), [passkeys et saisie automatique](/fr/blog/passkeys-and-autofill), et la [CLI développeur](/fr/blog/cli-for-developers). Le code est sous [OpenSelfHosting sur GitHub](https://github.com/OpenSelfHosting).
