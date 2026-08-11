---
title: La sync zero-knowledge expliquée
description: Comment OpenKey synchronise les coffres entre appareils sans donner le texte en clair au serveur — Argon2id, auth hashes et stockage ciphertext uniquement.
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.svg
---

# La sync zero-knowledge expliquée

La sync est utile. Faire confiance à une machine distante avec vos mots de passe ne l'est pas. OpenKey sépare ces idées : vous pouvez synchroniser entre téléphones, bureaux et l'extension navigateur tandis que le serveur ne stocke jamais que du **ciphertext**.

## Ce que « zero-knowledge » signifie ici

1. Votre mot de passe principal reste sur l'appareil. Les clients dérivent une clé maître avec **Argon2id** à partir de l'email + mot de passe principal et d'un sel.
2. La connexion envoie un `auth_hash` — suffisant pour prouver que vous connaissez le mot de passe, pas pour le récupérer.
3. Une **clé de coffre** chiffre les noms de collections et les charges d'entrées avec **AES-256-GCM**. Le serveur ne stocke qu'une clé de coffre enveloppée (chiffrée), jamais la clé en clair.
4. Pièces jointes, noms d'organisations et charges de partage quittent l'appareil déjà chiffrés. L'API de sync persiste des blobs opaques ; elle ne peut pas les déchiffrer même si la base de données est copiée.

## À quoi sert le serveur

Le serveur OpenKey optionnel est une surface de sync et d'authentification :

- Inscription de compte et connexion (via `auth_hash`)
- Push / pull de charges de coffre chiffrées (last-write-wins par `revision` par élément)
- Organisations et partages — toujours du ciphertext au repos
- JWT d'accès de courte durée et jetons de rafraîchissement hachés et rotés

Ce n'est **pas** un endroit qui reconstruit votre coffre. Si vous ne configurez jamais d'URL de serveur, l'app fonctionne toujours comme coffre local chiffré. Il n'y a aussi **pas de récupération du mot de passe principal** : si vous le perdez, le ciphertext est irrécupérable — conservez une sauvegarde hors ligne.

## Nearby sur le LAN

Vous voulez une sync multi-appareils sans déployer PostgreSQL ? **Nearby** (Pro) apparie les appareils sur le Wi‑Fi local, lie une clé de coffre partagée et synchronise le ciphertext entre eux avec la même règle LWW. Traitez l'appariement et la liaison du coffre comme une confiance totale au coffre ; ce n'est pas un substitut aux sauvegardes chiffrées.

## Pourquoi ce modèle compte

Les gestionnaires de mots de passe cloud vous demandent de faire confiance à leur infrastructure et à leurs opérateurs. OpenKey vous demande de faire confiance à **votre** hôte (ou un VPS que vous contrôlez) pour le stockage et la disponibilité uniquement — pas pour les secrets. Une base de données volée n'est pas un coffre volé.

## Aller plus loin

- [Sécurité](/fr/guide/security) — dérivation des clés, modèle de menace et checklist opérationnelle
- [Configuration du serveur](/fr/guide/server) — installer la sync Docker et lier les clients
- [Utiliser l'application](/fr/guide/app) — Nearby, sauvegardes et usage quotidien du coffre
- [Démarrage rapide](/fr/guide/quick-start) — exécuter la pile localement
