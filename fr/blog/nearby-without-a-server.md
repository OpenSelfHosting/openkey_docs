---
title: Nearby sans serveur
description: Appariez des appareils sur votre Wi‑Fi avec des QR codes, liez les coffres et synchronisez le ciphertext sur le LAN — sans API auto-hébergée requise.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.svg
---

# Nearby sans serveur

Auto-héberger une API de sync est puissant — et optionnel. **Nearby** (OpenKey Pro) conserve la même posture zero-knowledge sur votre réseau local : les appareils s'apparient, vous **Liez le coffre** explicitement, et seulement alors le matériau de clé de coffre circule pour que les pairs synchronisent le **ciphertext**. L'appariement seul ne partage jamais automatiquement la clé de coffre.

## Quand l'utiliser

- Deux appareils ou plus sur le même Wi‑Fi domicile ou bureau
- Vous voulez la sync sans déployer Docker / Postgres pour l'instant
- Vous avez besoin d'un **Envoyer à l'appareil** ponctuel pour une seule connexion sans pull complet du coffre

Ce n'est **pas** une sauvegarde. Conservez une [sauvegarde `.okbak` chiffrée](/fr/guide/import-export) Pro hors ligne. Les réseaux invités et l'isolation client cassent la découverte — utilisez un segment LAN normal.

## Apparier avec un QR (préféré)

1. Déverrouillez OpenKey sur les deux appareils → **Réglages → Appareils à proximité**.
2. Activez **Visible sur le réseau local**.
3. Sur un appareil, affichez le QR d'appariement ; sur l'autre, **Scanner le QR d'appariement** (ou **Coller le QR d'appariement** sur bureau Linux/Windows).
4. Appuyez sur **Lier le coffre** pour que les deux partagent la même empreinte de clé de coffre.

Saisir le code court fonctionne encore dans un délai d'environ deux minutes. Si un pare-feu Mac bloque le TCP entrant après un scan, OpenKey peut demander à l'hôte du QR de rappeler — autorisez les invites réseau de l'OS.

## Après la liaison

Les changements se synchronisent tant que les deux coffres sont déverrouillés et que Nearby annonce (**last-write-wins par revision**, même règle que le serveur). Les appareils de confiance se reconnectent automatiquement ; **Réseaux de confiance uniquement** (optionnel) met Nearby en pause hors de vos SSID. **Dissocier** révoque la confiance LAN et les revendications LAN Pro.

## LAN Pro, en bref

Sur Windows / Linux (sans IAP magasin), un pair Pro avec coffre lié peut partager une attestation **LAN Pro** pour que l'autre appareil débloque les limites Pro. L'appariement sans liaison ne suffit pas. Android, iOS et macOS l'ignorent — achetez ou restaurez Pro sur le magasin. Traitez l'attestation comme un confort, pas une preuve cryptographique d'achat.

## Aller plus loin

- Guide complet : [Sync Nearby sur le LAN](/fr/guide/nearby)
- Modèle de menace : [Sécurité](/fr/guide/security)
- Matrice Pro de l'app : [Utiliser l'application](/fr/guide/app)
- Dépannage FAQ : [Nearby ne trouve pas l'autre appareil](/fr/guide/faq)
