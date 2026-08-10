# Utiliser l'application

OpenKey est le client mobile et bureau pour Android, iOS, macOS, Linux et Windows. Les fonctions de base du coffre sont gratuites; OpenKey Pro débloque des extras. Votre coffre reste chiffré sur l'appareil; un [serveur](./server) auto-hébergé est optionnel pour la synchronisation. Installez-la depuis la boutique officielle ou le canal de téléchargement de votre plateforme.

<img src="/app_icon.png" alt="OpenKey app icon" width="96" height="96" style="border-radius: 20px; margin: 1rem 0;" />

## Installation

1. Obtenez OpenKey depuis la boutique / le distributeur officiel de votre plateforme.
2. Ouvrez l'application et créez ou déverrouillez un coffre avec votre mot de passe principal.

Les paquets associés de ce projet incluent le [serveur](./server), l'[extension navigateur](./extension) et la [CLI](./cli).



## Gratuit vs OpenKey Pro {#free-vs-openkey-pro}

Les fonctions de base du coffre marchent hors ligne sans abonnement. Sur Android, iOS, macOS, Windows et Linux, Pro relève les plafonds et débloque des extras. Les builds web n’appliquent pas encore Pro. Sur les plateformes **sans** IAP magasin (souvent Windows/Linux), un pair Nearby peut partager une attestation **LAN Pro** — confort uniquement, pas une preuve d’achat cryptographique (les plateformes IAP ignorent le LAN Pro).

| | Gratuit | Pro |
|--|------|-----|
| Entrées de connexion | Jusqu’à **50** | Illimité |
| Collections (dossiers) | Jusqu’à **3** | Illimité |
| Cartes / crypto / secrets | Jusqu’à **3** chacun | Illimité |
| Sync serveur, autofill, import | Oui | Oui |
| **Export**, sauvegarde **`.okbak`**, **Nearby**, **orgs/partage**, **pièces jointes**, **icône** | — | Oui |

Gérez l’abonnement dans **Réglages → OpenKey Pro** si la facturation magasin est dispo.

## Sync Nearby sur le LAN (Pro)

Synchronisez le même coffre sur le Wi‑Fi local sans serveur :

1. Déverrouillez OpenKey sur les deux appareils → **Réglages → Appareils à proximité**.
2. Démarrez Nearby des deux côtés, appariez avec le code court, puis **Lier le coffre**.
3. Ils doivent partager la même clé de coffre (même empreinte). Sinon, le receveur peut adopter celle du pair (remplace les données locales après confirmation du mot de passe principal).
4. Après liaison, sync auto tant que les deux sont déverrouillés ; **Synchroniser maintenant** pour un rattrapage manuel.
5. **Visible sur le réseau local** est mémorisé : Nearby reprend au prochain déverrouillage (en pause si verrouillé).
6. Option **Réseaux de confiance uniquement** : ajoutez des SSID ; Nearby se met en pause ailleurs.
7. **Appareils de confiance** : après un appariement + liaison, reconnexion auto si Nearby est actif.

La sync LAN n’échange que du **chiffrement** (LWW par revision). Ce n’est pas une sauvegarde. Voir [FAQ](./faq) · [Partage](./sharing) · [Import / export](./import-export).

## Créer ou déverrouiller un coffre

1. Choisissez un **mot de passe principal** fort (12+ caractères avec types mixtes recommandés).
2. Acceptez les avertissements du coffre : **aucune récupération** si vous oubliez le mot de passe principal ; les données sont chiffrées sur l'appareil ; les sauvegardes comptent.
3. Déverrouillez avec le mot de passe principal à chaque ouverture de l'application.

Le mot de passe principal ne quitte jamais l'appareil en clair.

## Utilisation quotidienne

### Accueil du coffre

- Parcourez les **collections** (dossiers) et les **entrées** de mots de passe.
- Recherchez, filtrez par tags et ouvrez une entrée pour copier identifiant/mot de passe ou voir les champs personnalisés.
- Créez des entrées avec URLs, notes, icônes et TOTP lorsque pris en charge.

### Générateur de mots de passe

Ouvrez **Paramètres → Générateur de mots de passe** (ou le générateur depuis le formulaire d'entrée) pour créer des mots de passe forts avec votre longueur et vos règles de caractères.

### Cartes, crypto et secrets

Les zones réservées du coffre contiennent :

- **Cartes de paiement**
- **Portefeuilles crypto**
- **Secrets développeur** (tokens API, clés SSH, extraits `.env`) — aussi utilisés par la [CLI](./cli)

### Organisations et partage

Partagez des collections ou des éléments individuels avec d'autres utilisateurs OpenKey sur le même serveur. Les noms d'org et les payloads de partage restent du texte chiffré sur le serveur.

## Carte des paramètres

| Zone | Rôle |
|------|----------------|
| **Apparence** | Mode de thème et langue (mêmes locales que ce site de documentation) |
| **Sécurité** | Verrouillage / biométrie / protections associées |
| **Générateur de mots de passe** | Options de génération par défaut |
| **Données** | Sync serveur, Nearby LAN (Pro), import/export, sauvegardes, extension, partage |
| **Saisie automatique** | Autofill système / Credential Provider (mobile et bureau) et passkeys |
| **OpenKey Pro** | Gestion d'abonnement lorsque disponible |

## Connecter un serveur auto-hébergé

1. Exécutez [OpenKey Server](./server).
2. **Paramètres → Données → Serveur auto-hébergé** → définissez l'URL → **S'inscrire** ou **Connexion** → **Synchroniser maintenant**.

Détails : [Installer le serveur](./server).

## Saisie automatique et navigateur

- **Autofill mobile / bureau :** activez OpenKey comme fournisseur système de mots de passe et passkeys dans Paramètres → Saisie automatique.
- **Navigateur :** installez l'extension ; sur bureau, déverrouillez l'application et enregistrez l'hôte natif, ou déverrouillez l'extension contre votre serveur en mode autonome.

## Import, export et sauvegarde

- **Import / export :** déplacez des mots de passe (Bitwarden JSON, Chrome CSV, 1Password CSV, OpenKey JSON). L'export déchiffre sur l'appareil — traitez le fichier comme sensible.
- **Sauvegarde / restauration locale :** sauvegardes chiffrées de l'appareil (Pro si requis).
- Préférez les sauvegardes hors ligne même avec sync serveur — un mot de passe principal oublié ne peut pas être récupéré depuis le serveur.

## Bonnes pratiques

- Utilisez un mot de passe principal unique et fort.
- Synchronisez après des changements importants lorsque vous utilisez un serveur.
- Conservez au moins une sauvegarde hors ligne.
- Verrouillez le coffre en quittant une machine partagée.

Suivant : [Installer le serveur](./server) · [CLI](./cli) · [Démarrage rapide](./quick-start)

Also: [Download](./download) · [Sharing](./sharing) · [Import & export](./import-export) · [FAQ](./faq) · [Changelog](./changelog)
