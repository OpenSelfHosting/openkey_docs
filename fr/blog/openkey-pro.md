---
title: OpenKey Pro — ce qui se débloque (et ce qui ne se débloque pas)
description: Limites Gratuit vs Pro, Nearby et LAN Pro, IAP magasin vs bureau, et ce qui reste gratuit sur chaque plateforme.
date: 2026-08-06
cover: /blog/covers/openkey-pro.png
---

# OpenKey Pro — ce qui se débloque (et ce qui ne se débloque pas)

Le coffre de base d'OpenKey fonctionne hors ligne sans abonnement. **Pro** relève les limites et débloque des extras importants quand vous synchronisez entre appareils, exportez ou partagez avec une équipe. Voici la répartition pratique — et l'avertissement LAN Pro qui confond souvent.

## Ce qui reste gratuit

- Coffre local chiffré (avec plafonds freemium — voir ci-dessous)
- [Sync serveur](/fr/guide/server) auto-hébergée (ciphertext uniquement)
- Autofill système / passkeys là où l'OS le permet
- Pont [extension navigateur](/fr/guide/extension) vers l'app bureau déverrouillée
- **Import** depuis Bitwarden, CSV navigateur, KeePass et plus

Plafonds du niveau gratuit (builds mobile/bureau qui appliquent Pro) : **50** entrées de connexion ; **3** collections, cartes de paiement, portefeuilles crypto et secrets développeur chacun.

## Ce que Pro débloque

| Capacité | Notes |
|----------|-------|
| Entrées / collections / cartes / crypto / secrets illimités | Supprime les plafonds gratuits |
| **Export** + sauvegarde **`.okbak`** chiffrée | Traitez les exports comme secrets |
| Sync de coffre **Nearby** sur LAN | Appariement QR, liaison du coffre, envoi d'entrée — [guide](/fr/guide/nearby) |
| Organisations et partage | Même serveur auto-hébergé |
| Pièces jointes sur les entrées | ~20 Mo chacune, ciphertext sur le serveur |
| Icône d'app personnalisée | Là où la plateforme le supporte |

Matrice complète : [Tarifs](/fr/pricing) · [Utiliser l'application → Gratuit vs Pro](/fr/guide/app#gratuit-vs-openkey-pro).

## LAN Pro n'est pas un reçu de magasin

Sur les plateformes **sans** achat intégré au magasin (typiquement Windows / Linux), un pair Pro peut partager une attestation **LAN Pro** via Nearby pour que l'autre appareil débloque les limites Pro sur le LAN.

- Confort uniquement — **pas** une preuve cryptographique d'achat
- Android, iOS et macOS **ignorent** LAN Pro ; achetez ou restaurez Pro sur ce magasin
- Dissocier arrête l'attestation

## Builds web

**Les builds web n'appliquent pas encore Pro.** Les builds mobile et bureau magasin/bureau le font. Planifiez en conséquence si vous testez dans le navigateur.

## Aller plus loin

- [Tarifs](/fr/pricing) — forfaits, achat, annulation
- [Nearby sans serveur](/fr/blog/nearby-without-a-server)
- [Import et export](/fr/guide/import-export)
- [Partage et organisations](/fr/guide/sharing)
- [FAQ](/fr/guide/faq)
- [Sécurité](/fr/guide/security)
