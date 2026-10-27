# Sync Nearby sur le LAN

**OpenKey Pro** peut synchroniser le même coffre entre appareils sur votre Wi‑Fi local **sans serveur auto-hébergé**. Le ciphertext circule via une session LAN appariée ; la clé de coffre n’est partagée qu’après un **Lier le coffre** explicite. Sur un **nouvel appareil**, vous pouvez aussi **copier** un coffre existant via Nearby pendant la configuration initiale (clonage de coffre) — toujours en pair-à-pair, jamais via l’API de sync.

<img src="/guide/nearby-pair-link-flow.svg" alt="Flux Nearby : découvrir un pair sur le LAN, apparier pour une clé de session, puis copier un coffre à la configuration ou lier les coffres explicitement pour une sync de fusion continue ; envoi d’entrée optionnel pour des envois ponctuels" class="ok-diagram" width="920" height="360" />

Cette page couvre la découverte, l’appariement par appui, le clonage de coffre à la configuration, la liaison du coffre, l’envoi d’entrée, LAN Pro et les règles de confiance. Dépannage court : [FAQ](./faq#nearby-ne-trouve-pas-lautre-appareil-pro). Modèle de menace : [Sécurité](./security). Détails du protocole : [spécification OpenKey → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md).

## Prérequis

- OpenKey Pro sur chaque appareil qui doit synchroniser ou cloner (ou une attestation **LAN Pro** valide sur les plateformes sans IAP magasin — voir ci-dessous)
- Même **LAN** (pas Wi‑Fi invité / isolation client)
- Pour la **sync de fusion** : les deux appareils déverrouillés avec **Réglages → Appareils à proximité** démarré
- Pour le **clonage de coffre** à la configuration : appareil existant déverrouillé et annonçant avec un coffre ; nouvel appareil sur le chemin de premier lancement **Appareil à proximité**

La sync de fusion Nearby n’est **pas** une sauvegarde. Conservez aussi une [sauvegarde chiffrée `.okbak`](./import-export#sauvegarde-chiffrée-pro) Pro. Le clonage copie le coffre entier une fois (pièces jointes comprises) ; conservez ensuite des sauvegardes hors ligne.

Les balises de découverte incluent le **nom d’appareil en clair** sur le LAN (et un flag `vault` indiquant si le pair a déjà un compte). N’acceptez que des appareils que vous possédez. Verrouiller le coffre met Nearby en pause jusqu’au prochain déverrouillage.

Linux et Windows peuvent demander une fois d’ouvrir des ports LAN (**UDP/TCP 47821**, **TCP 47822**). Autorisez ces invites pour que les pairs trouvent cette machine.

## Copier le coffre à la configuration (clonage de coffre)

À utiliser lorsqu’un **nouveau téléphone ou bureau** doit recevoir une copie complète d’un coffre existant via Wi‑Fi (sans fichier `.okbak`, sans serveur).

1. Sur l’appareil **existant** : déverrouillez OpenKey → **Réglages → Appareils à proximité** → activez **Visible sur le réseau local**. Le pair doit indiquer qu’il **a un coffre**.
2. Sur le **nouvel** appareil : sélecteur de premier lancement → **Appareil à proximité** (ou le chemin de configuration équivalent).
3. Appuyez sur le pair découvert → confirmez la copie. Le détenteur du coffre pousse (ou l’appareil vide tire) une archive chiffrée de session sur le LAN.
4. Déverrouillez sur le nouvel appareil avec le **même mot de passe principal** que la source. Le mot de passe n’est jamais envoyé sur le fil — seuls le matériau de déverrouillage et le ciphertext du coffre circulent dans la session appariée.

Le clonage inclut la base locale, les préférences, les pièces jointes, l’avatar optionnel et les champs de déverrouillage du compte (e-mail, sel, KDF, clé de coffre encapsulée). Si cet e-mail existe déjà sur le nouvel appareil, le clonage échoue avec `email_exists`.

**Cloner vs Lier le coffre**

| | Clonage de coffre | Lier le coffre |
|--|-------------|------------|
| Quand | Premier lancement / appareil vide | Les deux appareils ont déjà des coffres |
| Résultat | Copie complète d’un coffre sur l’appareil vide | Partage de l’empreinte de clé de coffre ; sync LWW continue |
| Mot de passe principal | Même mot de passe pour déverrouiller la copie | Déjà déverrouillé des deux côtés |

## Apparier des appareils (sync de fusion)

1. Déverrouillez OpenKey sur les deux appareils → **Réglages → Appareils à proximité**.
2. Activez **Visible sur le réseau local** (mémorisé : reprend au prochain déverrouillage tant que le coffre est déverrouillé).
3. Appuyez sur un pair découvert pour apparier (le code court d’appariement est échangé automatiquement via la session LAN). Saisir un code court manuellement fonctionne encore environ deux minutes lorsque la découverte est gênante.
4. Après l’appariement, appuyez sur **Lier le coffre** pour que les deux partagent la même empreinte de clé de coffre. L’appariement seul ne partage jamais automatiquement la clé de coffre.

Si les clés de coffre diffèrent, l’appareil destinataire peut **adopter** la clé du pair (remplace les données locales du coffre après confirmation du mot de passe principal). Traitez liaison + adoption comme une confiance totale au coffre.

### Pare-feu / rappel (dial-back)

Certains bureaux (surtout macOS) bloquent le TCP entrant. Les builds Linux et Windows peuvent demander une fois **UDP/TCP 47821** et **TCP 47822**. Si un pair ne peut pas appeler vers l’intérieur, OpenKey peut demander à l’hôte qui annonce de rappeler l’invité (UDP unicast uniquement — le code d’appariement n’est pas diffusé sur le LAN). Autorisez les invites réseau local / pare-feu quand l’OS le demande. Préférez le même sous-réseau ; VPN et private relay cassent souvent la découverte. Trop de codes incorrects déclenchent un verrouillage court.

## Après la liaison

- Les changements se synchronisent automatiquement tant que les deux coffres sont déverrouillés et que Nearby annonce.
- Utilisez **Synchroniser maintenant** pour un rattrapage manuel.
- La sync est **last-write-wins par revision** (même règle que le [serveur](./server)) — éditez un appareil à la fois autant que possible.
- **Appareils de confiance :** après un appariement + liaison réussis, les pairs se reconnectent et synchronisent dès que Nearby est actif — sans ré-appariement.
- **Réseaux de confiance uniquement (optionnel) :** ajoutez les SSID domicile/bureau ; Nearby se met en pause lorsque le SSID actuel n’est pas dans la liste (et bloque le démarrage si la liste est vide). Lorsque l’OS ne peut pas lire le SSID, Nearby peut quand même tourner avec une bannière d’avertissement.
- **Dissocier** pour révoquer la confiance LAN, arrêter la sync et effacer les attestations LAN Pro de ce pair.

## Envoyer une entrée

Vous pouvez pousser une seule connexion vers un pair apparié sans attendre une sync complète du coffre :

1. Ouvrez l’entrée (ou utilisez les actions du pair Nearby dans **Réglages → Appareils à proximité**).
2. Choisissez **Envoyer à l’appareil** / envoyer l’entrée pour ce pair.
3. Le pair reçoit le ciphertext via la session LAN et peut le stocker localement.

Utilisez ceci pour des partages ponctuels sur le LAN ; préférez [organisations et partage](./sharing) lorsque les pairs utilisent le même serveur auto-hébergé.

## Attestation LAN Pro {#lan-pro-attestation}

Sur les plateformes **sans** achat in-app magasin (typiquement Windows / Linux), un pair Pro **lié au coffre** peut partager un statut **LAN Pro** pour que l’autre appareil débloque les limites Pro via Nearby. L’appariement seul ne suffit pas — vous devez d’abord appuyer sur **Lier le coffre**.

- Confort uniquement — **pas** une preuve cryptographique d’achat.
- Android, iOS et macOS (IAP magasin) **ignorent** LAN Pro ; achetez ou restaurez Pro sur ce magasin.
- La dissociation arrête l’attestation.

## Résumé de confiance

| Action | Implication de confiance |
|--------|-------------------|
| Apparier | Clé de session avec ce pair sur le LAN |
| Clonage de coffre | Le pair reçoit une copie complète du coffre (ciphertext + matériau de déverrouillage) ; il faut le même mot de passe principal pour déverrouiller |
| Lier le coffre | Partage du matériau de clé de coffre — le pair peut synchroniser tout le ciphertext du coffre |
| Envoyer une entrée | Le pair reçoit le ciphertext de cette entrée |
| LAN Pro | Le pair peut débloquer les limites Pro sur les plateformes sans IAP |

N’appariez, ne clonez et ne liez qu’avec des appareils et des personnes de confiance. Détails : [Sécurité → Modèle de menace](./security#modèle-de-menace).

## Voir aussi

- [Utiliser l’application](./app) — sélecteur de configuration, carte des réglages et matrice Pro
- [Télécharger](./download)
- [Import et export](./import-export) — `.okbak` vs clonage Nearby
- [FAQ](./faq)
- [Sécurité](./security)

Suivant : [Utiliser l’application](./app) · [Partage](./sharing) · [FAQ](./faq)
