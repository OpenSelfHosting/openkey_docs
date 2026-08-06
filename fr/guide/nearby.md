# Sync Nearby sur le LAN

**OpenKey Pro** peut synchroniser le même coffre entre appareils sur votre Wi‑Fi local **sans serveur auto-hébergé**. Le ciphertext circule via une session LAN appariée ; la clé de coffre n’est partagée qu’après un **Lier le coffre** explicite.

Cette page couvre l’appariement, les QR, la liaison du coffre, l’envoi d’entrée, LAN Pro et les règles de confiance. Dépannage court : [FAQ](./faq#nearby-ne-trouve-pas-lautre-appareil-pro). Modèle de menace : [Sécurité](./security).

## Prérequis

- OpenKey Pro sur chaque appareil qui doit synchroniser (ou une attestation **LAN Pro** valide sur les plateformes sans IAP magasin — voir ci-dessous)
- Les deux appareils déverrouillés et sur le **même LAN** (pas Wi‑Fi invité / isolation client)
- **Réglages → Appareils à proximité** démarré des deux côtés

Nearby n’est **pas** une sauvegarde. Conservez aussi une [sauvegarde chiffrée `.okbak`](./import-export#sauvegarde-chiffrée-pro) Pro.

## Apparier des appareils

1. Déverrouillez OpenKey sur les deux appareils → **Réglages → Appareils à proximité**.
2. Activez **Visible sur le réseau local** (mémorisé : reprend au prochain déverrouillage tant que le coffre est déverrouillé).
3. Appariez avec l’une des méthodes :
   - **QR (préféré) :** l’appareil qui annonce affiche un QR d’appariement ; sur l’autre, appuyez sur **Scanner le QR d’appariement** et pointez la caméra — pas besoin de taper le code.
   - **Code court :** saisissez le code affiché sur le pair dans un délai d’environ deux minutes.
4. Après l’appariement, appuyez sur **Lier le coffre** pour que les deux partagent la même empreinte de clé de coffre.

Si les clés de coffre diffèrent, l’appareil destinataire peut **adopter** la clé du pair (remplace les données locales du coffre après confirmation du mot de passe principal). Traitez liaison + adoption comme une confiance totale au coffre.

### Pare-feu / rappel (dial-back)

Certains bureaux (surtout macOS) bloquent le TCP entrant. Si le scan d’un QR échoue à se connecter, OpenKey peut demander à l’hôte du QR de rappeler l’invité. Autorisez les invites réseau local / pare-feu quand l’OS le demande. Préférez le même sous-réseau ; VPN et private relay cassent souvent la découverte.

## Après la liaison

- Les changements se synchronisent automatiquement tant que les deux coffres sont déverrouillés et que Nearby annonce.
- Utilisez **Synchroniser maintenant** pour un rattrapage manuel.
- La sync est **last-write-wins par revision** (même règle que le [serveur](./server)) — éditez un appareil à la fois autant que possible.
- **Appareils de confiance :** après un appariement + liaison réussis, les pairs se reconnectent et synchronisent dès que Nearby est actif — sans ré-appariement.
- **Réseaux de confiance uniquement (optionnel) :** ajoutez les SSID domicile/bureau ; Nearby se met en pause sur les réseaux inconnus et reprend à votre retour.
- **Dissocier** pour révoquer la confiance LAN, arrêter la sync et effacer les attestations LAN Pro de ce pair.

## Envoyer une entrée

Vous pouvez pousser une seule connexion vers un pair apparié sans attendre une sync complète du coffre :

1. Ouvrez l’entrée (ou utilisez les actions du pair Nearby dans **Réglages → Appareils à proximité**).
2. Choisissez **Envoyer à l’appareil** / envoyer l’entrée pour ce pair.
3. Le pair reçoit le ciphertext via la session LAN et peut le stocker localement.

Utilisez ceci pour des partages ponctuels sur le LAN ; préférez [organisations et partage](./sharing) lorsque les pairs utilisent le même serveur auto-hébergé.

## Attestation LAN Pro

Sur les plateformes **sans** achat in-app magasin (typiquement Windows / Linux), un pair Pro peut partager un statut **LAN Pro** pour que l’autre appareil débloque les limites Pro via Nearby.

- Confort uniquement — **pas** une preuve cryptographique d’achat.
- Android, iOS et macOS (IAP magasin) **ignorent** LAN Pro ; achetez ou restaurez Pro sur ce magasin.
- La dissociation arrête l’attestation.

## Résumé de confiance

| Action | Implication de confiance |
|--------|-------------------|
| Apparier | Clé de session avec ce pair sur le LAN |
| Lier le coffre | Partage du matériau de clé de coffre — le pair peut synchroniser tout le ciphertext du coffre |
| Envoyer une entrée | Le pair reçoit le ciphertext de cette entrée |
| LAN Pro | Le pair peut débloquer les limites Pro sur les plateformes sans IAP |

N’appariez et ne liez qu’avec des appareils et des personnes de confiance. Détails : [Sécurité → Modèle de menace](./security#modèle-de-menace).

## Voir aussi

- [Utiliser l’application](./app) — carte des réglages et matrice Pro
- [Télécharger](./download)
- [Import et export](./import-export) — vraies sauvegardes
- [FAQ](./faq)
- [Sécurité](./security)

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: pair with QR or code for a session key, explicitly link vault to share the vault key, then sync ciphertext on the LAN; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

Suivant : [Utiliser l’application](./app) · [Partage](./sharing) · [FAQ](./faq)
