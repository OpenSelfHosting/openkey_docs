---
title: Nearby sans serveur
description: Découvrez des pairs sur votre Wi‑Fi, copiez un coffre à la configuration ou liez les coffres pour la sync LAN — sans API auto-hébergée.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# Nearby sans serveur

Auto-héberger une API de sync est puissant — et optionnel. **Nearby** (OpenKey Pro) conserve la même posture zero-knowledge sur votre réseau local : les appareils se découvrent, s’apparient pour une clé de session, et vous **copiez un coffre** sur un nouvel appareil à la configuration ou **Liez le coffre** explicitement pour une sync de fusion continue. L’appariement seul ne partage jamais automatiquement la clé de coffre.

## Quand l'utiliser

- Deux appareils ou plus sur le même Wi‑Fi domicile ou bureau
- Vous voulez la sync sans déployer Docker / Postgres pour l’instant
- Un **nouveau téléphone ou bureau** doit recevoir une copie complète du coffre sans fichier `.okbak`
- Vous avez besoin d’un **Envoyer à l’appareil** ponctuel pour une seule connexion sans pull complet du coffre

La sync de fusion n’est **pas** une sauvegarde. Conservez une [sauvegarde `.okbak` chiffrée](/fr/guide/import-export) Pro hors ligne. Les réseaux invités et l’isolation client cassent la découverte — utilisez un segment LAN normal.

## Copier le coffre sur un nouvel appareil

1. Déverrouillez l’appareil existant → **Réglages → Appareils à proximité** → **Visible sur le réseau local**.
2. Sur le nouvel appareil, choisissez **Appareil à proximité** dans le sélecteur de configuration au premier lancement.
3. Appuyez sur le pair → confirmez → déverrouillez avec le **même mot de passe maître**.

Cela envoie une archive complète du coffre chiffrée par session (pièces jointes incluses). Détails : [Nearby → Copier le coffre à la configuration](/fr/guide/nearby#copier-le-coffre-à-la-configuration-clonage-de-coffre).

## Apparier pour une sync continue

1. Déverrouillez OpenKey sur les deux appareils → **Réglages → Appareils à proximité**.
2. Activez **Visible sur le réseau local**.
3. Appuyez sur un pair découvert pour l’appariement (le code court fonctionne encore dans un délai d’environ deux minutes quand la découverte est difficile).
4. Appuyez sur **Lier le coffre** pour que les deux partagent la même empreinte de clé de coffre.

Si un pare-feu Mac bloque le TCP entrant, OpenKey peut demander à l’hôte qui annonce de rappeler — autorisez les invites réseau de l’OS.

## Après la liaison

Les changements se synchronisent tant que les deux coffres sont déverrouillés et que Nearby annonce (**last-write-wins par revision**, même règle que le serveur). Les appareils de confiance se reconnectent automatiquement ; **Réseaux de confiance uniquement** (optionnel) met Nearby en pause hors de vos SSID. **Dissocier** révoque la confiance LAN et les revendications LAN Pro.

## LAN Pro, en bref

Sur Windows / Linux (sans IAP magasin), un pair Pro avec coffre lié peut partager une attestation **LAN Pro** pour que l’autre appareil débloque les limites Pro. L’appariement sans liaison ne suffit pas. Android, iOS et macOS l’ignorent — achetez ou restaurez Pro sur le magasin. Traitez l’attestation comme un confort, pas une preuve cryptographique d’achat.

## Aller plus loin

- Guide complet : [Sync Nearby sur le LAN](/fr/guide/nearby)
- Modèle de menace : [Sécurité](/fr/guide/security)
- Matrice Pro de l’app : [Utiliser l’application](/fr/guide/app)
- Dépannage FAQ : [Nearby ne trouve pas l’autre appareil](/fr/guide/faq)
