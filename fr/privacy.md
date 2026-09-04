# Politique de confidentialité

**Dernière mise à jour :** 6 août 2026  
**Produit :** OpenKey (`com.openselfhosting.openkey`)  
**Éditeur :** OpenSelfHosting  
**Contact :** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · Sécurité : [security@openselfhosting.com](mailto:security@openselfhosting.com)

Cette Politique de confidentialité décrit comment l’application mobile et bureau **OpenKey** traite les informations. OpenKey est conçu comme gestionnaire de mots de passe **zero-knowledge** : les secrets du coffre sont chiffrés sur votre appareil avant de le quitter.

Lecture associée : [Sécurité](/fr/guide/security) · [Conditions d’utilisation](/fr/terms)

## Résumé

| Sujet | Pratique |
|-------|----------|
| Mot de passe principal | Ne quitte jamais votre appareil en clair |
| Contenu du coffre | Chiffré sur l’appareil (AES-256-GCM) ; la sync optionnelle n’envoie que du **ciphertext** |
| Notre cloud | OpenKey **n’exploite pas** de cloud coffre obligatoire du fournisseur pour vos mots de passe |
| Serveur auto-hébergé | Si vous en connectez un, **vous** (ou votre organisation) l’exploitez et contrôlez ces données |
| Facturation magasin | Les achats Pro passent par la facturation Apple / Google / Microsoft lorsqu’elle est disponible |

## Qui est concerné

Cette politique s’applique à l’**application** officielle OpenKey (Android, iOS, macOS, Windows, Linux et builds web du même produit). Les paquets séparés (serveur auto-hébergé, extension navigateur, CLI, site de documentation) suivent les mêmes principes zero-knowledge ; les opérateurs d’un serveur auto-hébergé sont responsables des données opérationnelles de cette instance (voir ci-dessous).

## Informations que nous ne collectons pas

OpenSelfHosting **ne reçoit pas** :

- Votre mot de passe principal
- La clé de coffre en clair
- Connexions, notes, secrets TOTP, cartes de paiement, données de portefeuilles crypto, secrets développeur ou contenu de pièces jointes déchiffrés
- Le HTML complet des pages que vous visitez (l’extension navigateur n’exfiltre pas les pages vers un cloud fournisseur)

Nous ne vendons pas de données personnelles.

## Informations traitées sur votre appareil

OpenKey stocke et traite **localement** sur votre appareil ce qui suit (chiffré au repos après configuration du déverrouillage) :

- Base de données du coffre (collections, entrées, métadonnées/blobs de pièces jointes en ciphertext lorsque verrouillé/synchronisé)
- Réglages de l’app (apparence, langue, préférences autofill, URL serveur que vous saisissez, préférences Nearby)
- Enveloppe biométrique optionnelle du matériel de déverrouillage (gérée par l’enclave sécurisée / keystore du SE lorsque disponible)
- Jetons de sync en cache pour un serveur que **vous** configurez (JWT d’accès / matériel de rafraîchissement stocké par l’app pour cet hôte)

La suppression de l’app ou l’effacement de l’appareil retire les données locales selon les sauvegardes OS que vous contrôlez.

## Serveur de sync auto-hébergé optionnel

Si vous activez **Réglages → Données → Serveur auto-hébergé**, l’app envoie à **votre** API (ou celle que vous choisissez) :

- E-mail (identifiant de compte)
- `auth_hash` dérivé côté client (pas le mot de passe principal)
- Sel et paramètres KDF
- Clé de coffre enveloppée (chiffrée) et ciphertext opaque des entrées du coffre, pièces jointes, orgs et partages

Le serveur de référence du projet OpenKey est conçu pour stocker **uniquement du ciphertext**. Celui qui exécute ce serveur (vous, votre entreprise ou un hôte de confiance) peut voir des métadonnées comme l’e-mail, les tailles de ciphertext et les horodatages, et peut supprimer ou retenir des données — mais ne peut pas déchiffrer le contenu du coffre par conception. Voir [Sécurité](/fr/guide/security).

## Sync Nearby sur LAN (Pro)

Nearby apparie des appareils sur votre réseau local et, après **Lier le coffre**, synchronise le ciphertext du coffre entre ces appareils. L’appariement et le partage de clé de coffre se font sur votre LAN entre les appareils que vous choisissez. OpenSelfHosting ne reçoit pas le trafic Nearby.


## Autofill, passkeys et extension navigateur

- **Autofill système / Fournisseur d’identifiants** partage les identifiants avec apps et sites uniquement via des flux de remplissage médiés par l’OS que vous initiez ou approuvez.
- L’**extension navigateur** peut déverrouiller contre votre serveur ou remplir via l’app bureau déverrouillée (messagerie native). Remplir et enregistrer sont des actions utilisateur intentionnelles. Voir [Extension navigateur](/fr/guide/extension).

## Achats et abonnements (OpenKey Pro)

Lorsque Pro est vendu via un magasin d’apps, le traitement des paiements, reçus et données de compte associées est géré par **Apple, Google ou Microsoft** selon leurs politiques. OpenKey peut recevoir les droits magasin / statut d’achat nécessaires pour débloquer les fonctions Pro. Nous ne recevons pas votre numéro de carte complet de ces magasins.

L’attestation **LAN Pro** entre pairs Nearby est un confort local sur certaines plateformes bureau — pas un compte de facturation cloud chez OpenSelfHosting.

## Diagnostics et support

OpenKey n’inclut pas de SDK d’analytique tiers obligatoire qui téléverse le contenu du coffre. Si vous écrivez au support ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) ou aux canaux communautaires Telegram, vous choisissez ce que vous incluez (par ex. version de l’app). N’envoyez pas de mots de passe principaux ni d’exports de coffre en clair par e-mail.

## Confidentialité des enfants

OpenKey ne s’adresse pas aux enfants de moins de 13 ans (ou l’âge minimum requis dans votre juridiction). N’utilisez pas l’app si vous êtes en dessous de cet âge.

## Traitement international

Le traitement a lieu sur vos appareils et, si vous configurez la sync, sur l’hôte serveur que vous choisissez. Si vous nous contactez, les messages peuvent être traités dans les régions où opèrent notre messagerie ou nos outils de support.

## Conservation

- **Sur l’appareil :** jusqu’à suppression du coffre, désinstallation de l’app ou effacement de l’appareil / sauvegardes.
- **Sur votre serveur de sync :** jusqu’à suppression de votre compte serveur ou suppression des données par l’opérateur ; des tombstones peuvent rester jusqu’à sync des pairs.
- **E-mail support :** conservé selon les besoins de réponse et à des fins légitimes de sécurité/juridiques.

## Vos choix

- Utiliser OpenKey entièrement hors ligne sans serveur
- Accepter ou refuser l’appariement Nearby
- Exporter ou supprimer les données locales (export / sauvegarde peut nécessiter Pro)
- Supprimer un compte serveur via le flux de suppression authentifié (retire le ciphertext serveur ; les copies locales restent jusqu’à effacement)
- Révoquer les abonnements magasin via la gestion d’abonnements du magasin

## Modifications

Nous pouvons mettre à jour cette politique au fil des évolutions du produit. La date « Dernière mise à jour » changera ; les changements importants peuvent aussi être notés dans le [changelog](/fr/guide/changelog) ou les liens À propos in-app.

## Contact

- Produit / support : [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Signalements sécurité : [security@openselfhosting.com](mailto:security@openselfhosting.com) — voir [Signaler des vulnérabilités](/fr/guide/security#reporting-vulnerabilities)
- Organisation : [OpenSelfHosting](https://github.com/OpenSelfHosting) · Produit : [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Société : [openselfhosting.com](https://openselfhosting.com)

Suite : [Conditions d’utilisation](/fr/terms) · [Sécurité](/fr/guide/security) · [Utiliser l’application](/fr/guide/app)
