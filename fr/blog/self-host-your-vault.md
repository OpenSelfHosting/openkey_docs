---
title: Pourquoi auto-héberger votre coffre de mots de passe
description: Contrôle, confidentialité et un serveur de sync qui ne stocke que du ciphertext — comment exécuter OpenKey sur votre propre matériel avec Docker.
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.png
---

# Pourquoi auto-héberger votre coffre de mots de passe

Les gestionnaires de mots de passe sont au centre de votre vie numérique. Quand ce coffre vit uniquement sur le cloud de quelqu'un d'autre, pannes, changements de politique et fuites deviennent *votre* risque. L'auto-hébergement inverse la logique : vous choisissez la machine, les sauvegardes et qui peut atteindre l'API.

## Ce que vous contrôlez

| Vous possédez | Le serveur n'obtient jamais |
|---------------|----------------------------|
| Où le ciphertext est stocké | Mot de passe principal |
| Quand les mises à jour et sauvegardes s'exécutent | Clés de coffre en clair |
| Quels clients peuvent se connecter (`CORS_ORIGINS`, HTTPS) | Noms d'entrées ou mots de passe lisibles |
| Si la sync est activée | Pièces jointes ou partages déchiffrés |

L'app OpenKey fonctionne hors ligne avec une base locale chiffrée. Pointez **Réglages → Données → Serveur auto-hébergé** vers votre instance quand vous voulez une sync multi-appareils — mêmes règles zero-knowledge dans les deux cas. Préférez conserver au moins une **sauvegarde locale chiffrée** ; le serveur ne peut pas récupérer un mot de passe principal oublié.

## Une forme pratique

Beaucoup commencent avec Docker sur un NAS domestique ou un petit VPS :

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 caractères ; les placeholders sont rejetés)
docker compose up --build -d
```

Mettez du TLS devant (Caddy, Traefik ou votre reverse proxy), définissez un `JWT_SECRET` long et unique, et restreignez `CORS_ORIGINS` aux origines de votre app et extension — jamais `*`. Puis **Inscrivez-vous** depuis le premier appareil et **Connectez-vous** depuis les autres, et utilisez **Synchroniser maintenant** pour un pull/push explicite.

## LAN sans serveur

Si vous n'avez besoin que d'appareils sur le même Wi‑Fi, la sync de coffre **Nearby** (Pro) peut apparier et lier les coffres sur le LAN sans PostgreSQL. Utilisez-la pour la commodité ; conservez quand même des sauvegardes hors ligne pour la reprise après sinistre.

## Pour qui c'est fait

- Particuliers qui veulent la sync sans coffre SaaS
- Équipes qui ont besoin de collections partagées mais gardent la crypto sur les clients
- Développeurs qui exécutent déjà PostgreSQL et sont à l'aise avec Compose

Vous n'avez pas besoin d'auto-héberger pour utiliser OpenKey localement. Vous auto-hébergez quand vous voulez **votre** plan de sync — avec le stockage ciphertext uniquement comme règle stricte.

## Prochaines étapes

- [Configuration du serveur](/fr/guide/server) — installer, configurer et lier les clients
- [Utiliser l'application](/fr/guide/app) — workflows du coffre, Nearby, import/export
- [Sécurité](/fr/guide/security) — checklist de durcissement et modèle de menace
- [Vue d'ensemble](/fr/guide/overview) — paquets et modèle zero-knowledge
