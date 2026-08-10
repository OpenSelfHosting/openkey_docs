# Tarifs

**OpenKey** est gratuit pour un coffre chiffré complet avec des plafonds raisonnables. **OpenKey Pro** supprime les limites et débloque l’export, les sauvegardes, Nearby, le partage et les pièces jointes.

Les prix du magasin sont fixés par région dans la facturation Apple / Google / Microsoft et affichés dans l’app au moment de l’achat. Cette page explique **ce que vous obtenez** et **comment acheter** — pas un tableau fixe en USD (les magasins localisent devise et taxes).

Voir aussi : [Utiliser l’application](/fr/guide/app#free-vs-openkey-pro) · [OpenKey Pro expliqué](/fr/blog/openkey-pro) · [Télécharger](/fr/guide/download) · [Conditions](/fr/terms)

## Offres

| Offre | Facturation | Notes |
|------|---------|--------|
| **Gratuit** | 0 $ | Coffre de base + sync serveur + autofill + import (avec plafonds d’entrées) |
| **Mensuel** | Abonnement | Renouvellement auto ; résiliable à tout moment dans le magasin |
| **Annuel** | Abonnement | Renouvellement auto ; en général le meilleur rapport récurrent ; résiliable à tout moment |
| **À vie** | Paiement unique | Déblocage Pro permanent pour ce compte magasin |

Les montants exacts apparaissent sous **Réglages → OpenKey Pro** sur Android, iOS et macOS (et autres plateformes IAP lorsqu’elles sont listées).

## Gratuit vs Pro

| | Gratuit | Pro |
|--|------|-----|
| Entrées de connexion | Jusqu’à **50** | Illimité |
| Collections (dossiers) | Jusqu’à **3** | Illimité |
| Cartes de paiement | Jusqu’à **3** | Illimité |
| Portefeuilles crypto | Jusqu’à **3** | Illimité |
| Secrets développeur | Jusqu’à **3** | Illimité |
| Sync serveur auto-hébergé | Oui | Oui |
| Autofill / passkeys (système) | Oui | Oui |
| Pont extension navigateur | Oui | Oui |
| Import depuis d’autres gestionnaires | Oui | Oui |
| **Export** | — | Oui |
| **Sauvegarde `.okbak` chiffrée** | — | Oui |
| **Sync coffre Nearby sur LAN** | — | Oui |
| **Organisations et partage** | — | Oui |
| **Pièces jointes** (~20 Mo chacune) | — | Oui |
| **Icône d’app personnalisée** | — | Oui |

Le zero-knowledge reste le même en Gratuit et Pro : le serveur ne voit toujours que du ciphertext. Pro débloque des fonctions et limites côté client — ce n’est pas un « coffre cloud » hébergé par OpenSelfHosting.

## Comment s’abonner

1. Installez OpenKey depuis un [canal de téléchargement](/fr/guide/download) qui prend en charge les achats intégrés (Play Store, App Store, Mac App Store lorsqu’il est listé).
2. Déverrouillez votre coffre → **Réglages → OpenKey Pro**.
3. Choisissez **Mensuel**, **Annuel** ou **À vie** et finalisez l’achat magasin.
4. Utilisez **Restaurer les achats** / actualiser le statut si vous réinstallez ou changez d’appareil sur le même compte magasin.

### Windows et Linux

Les achats intégrés sont disponibles sur **Android, iOS et macOS**. Sur Windows et Linux :

- Connectez-vous avec le **même compte OpenKey** après vous être abonné sur un mobile ou un Mac lorsque Pro lié au compte est pris en charge, **ou**
- Utilisez **LAN Pro** depuis un pair Nearby Pro (confort uniquement — pas un reçu magasin ; Android / iOS / macOS ignorent LAN Pro)

Détails : [Nearby → LAN Pro](/fr/guide/nearby#lan-pro-attestation) · [FAQ](/fr/guide/faq)

### Builds web

Les builds web **n’appliquent pas encore Pro**. Les builds magasin mobile et bureau le font.

## Gérer ou résilier

- **Apple :** Réglages → Apple ID → Abonnements (ou abonnements App Store)
- **Google Play :** Play Store → Paiements et abonnements
- **Microsoft :** account.microsoft.com / abonnements Store le cas échéant

Les remboursements suivent les politiques du magasin. Voir [Conditions d’utilisation](/fr/terms).

## FAQ

### Le niveau gratuit est-il utilisable sans payer ?

Oui — coffre, autofill, import et sync serveur fonctionnent dans les plafonds ci-dessus.

### Faut-il Pro pour un serveur auto-hébergé ?

Non. La sync serveur est disponible en Gratuit. Pro ajoute export, sauvegardes, Nearby, orgs/partage, pièces jointes et plafonds plus élevés.

### Les prix vont-ils changer ?

Les magasins peuvent modifier les prix régionaux. Le paywall in-app affiche toujours l’offre actuelle pour votre compte et votre région.

### Où est la politique de confidentialité ?

[Politique de confidentialité](/fr/privacy) · [Conditions](/fr/terms)

## Commencer

- [Télécharger OpenKey](/fr/guide/download)
- [Démarrage rapide](/fr/guide/quick-start)
- [Nearby sans serveur](/fr/blog/nearby-without-a-server) (Pro)
