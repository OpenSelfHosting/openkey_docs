# FAQ et dépannage

Réponses courtes aux questions fréquentes. Contexte plus profond : [Sécurité](./security), [Installer le serveur](./server), [Utiliser l’application](./app), [Nearby](./nearby), [Extension navigateur](./extension), [CLI](./cli).

## Mot de passe principal et récupération

### J’ai oublié mon mot de passe principal. Puis-je récupérer le coffre ?

**Non.** OpenKey est zero-knowledge : le serveur ne voit jamais le mot de passe principal ni la clé de coffre en clair. Sans le mot de passe (et sans appareil ayant encore une session déverrouillée ou une sauvegarde locale chiffrée que vous pouvez déverrouiller), le ciphertext est irrécupérable.

Conservez un mot de passe principal fort et unique et au moins une sauvegarde locale chiffrée **Pro** (`.okbak`) ou un export hors ligne.

### L’admin du serveur peut-il réinitialiser mon mot de passe ?

Non. Les admins peuvent supprimer ou retenir le ciphertext et observer des métadonnées (email, tailles, timings). Ils ne peuvent pas déchiffrer votre coffre ni définir un nouveau mot de passe principal pour vous.

### Comment changer mon mot de passe principal ?

Dans l’app, utilisez le flux compte / sécurité qui fait tourner les credentials (`/auth/rekey` sur le serveur). La clé de coffre elle-même reste la même ; seuls le auth hash et la clé de coffre enveloppée sur le serveur sont mis à jour. Synchronisez ensuite les autres appareils avec le **nouveau** mot de passe principal.

## Sync et serveur

### La sync échoue ou la connexion renvoie une erreur

1. Confirmez que `http(s)://votre-hôte/health` renvoie un état sain.
2. Utilisez **exactement** la même URL serveur sur chaque client (slash final OK ; préférez HTTPS en production).
3. Vérifiez que `JWT_SECRET` est défini (≥ 32 caractères, pas un placeholder) — sinon l’API refuse de démarrer.
4. Vérifiez que `CORS_ORIGINS` inclut vos origines extension / web si vous les utilisez (**jamais `*`**).
5. Les endpoints d’auth sont **rate-limités** par IP (`AUTH_RATE_LIMIT_*`). Attendez une minute et réessayez après de nombreux échecs de connexion.
6. Inscrivez-vous une fois sur le premier appareil ; sur les autres, **connectez-vous** avec le même email + mot de passe principal, puis **Synchroniser maintenant**.

### Le téléphone n’atteint pas `http://localhost:8000`

`localhost` sur le téléphone, c’est le téléphone lui-même. Utilisez l’IP LAN de votre ordinateur (`http://192.168.x.x:8000`) sur le même Wi‑Fi, ou exposez HTTPS via un reverse proxy / tunnel. Le HTTP en clair peut être bloqué sur mobile — préférez HTTPS au-delà du débogage local.

### Deux appareils montrent des contenus de coffre différents après sync

La sync est **last-write-wins par revision**, pas un CRDT. Des éditions concurrentes peuvent s’écraser. Tirez/poussez à nouveau après avoir édité un appareil à la fois. La sync Nearby sur le LAN utilise la même règle LWW.

### Comment supprimer mon compte serveur ?

Les clients appellent `POST /auth/delete` authentifié après avoir re-prouvé le `auth_hash` actuel. Cela supprime définitivement le ciphertext côté serveur. **Les coffres locaux sur les appareils ne sont pas affectés** — supprimez-les ou effacez-les séparément si besoin.

## Application et Pro

### Qu’est-ce qui est gratuit vs Pro ?

Voir la matrice dans [Utiliser l’application](./app#gratuit-vs-openkey-pro). En bref : le gratuit inclut le coffre de base + sync serveur avec des plafonds d’éléments ; Pro débloque éléments illimités, export, sauvegardes chiffrées, Nearby, organisations/partage, pièces jointes et icônes personnalisées.

### Nearby ne trouve pas l’autre appareil (Pro)

1. Les deux appareils déverrouillés, **Réglages → Appareils à proximité** démarré, même Wi‑Fi (pas invité / isolation client).
2. Préférez **Scanner le QR d’appariement** plutôt que de taper le code ; autorisez les invites caméra / réseau local.
3. Désactivez temporairement VPN / private relay. Sur macOS, autorisez le rappel pare-feu si la connexion QR échoue.
4. Appariez, puis **Lier le coffre** (même empreinte de clé de coffre). Guide complet : [Nearby](./nearby).
5. Option **Réseaux de confiance uniquement** : ajoutez votre SSID ou Nearby se met en pause sur les réseaux inconnus.
6. Les plateformes IAP magasin (Android / iOS / macOS) ignorent **LAN Pro** des pairs — achetez/restaurez Pro sur ce magasin si requis.

### Comment envoyer un mot de passe à un autre appareil sur le LAN ?

Après appariement (Pro), utilisez **Envoyer à l’appareil** sur l’entrée ou depuis les actions du pair Nearby. Cela pousse une entrée via la session LAN sans attendre une sync complète du coffre. Détails : [Nearby → Envoyer une entrée](./nearby#envoyer-une-entrée).

### Autofill / passkeys n’apparaissent pas

Activez OpenKey comme fournisseur système de mots de passe et passkeys sous **Réglages → Saisie automatique**, puis déverrouillez le coffre. Sur iOS/macOS, accordez les invites de permission OS. Redémarrez le navigateur ou l’app cible après changement de fournisseur.

### Quel est le raccourci de remplissage de l’extension ?

`Ctrl+Shift+L` sur Windows/Linux, `⌘⇧L` sur macOS. Remappez sous les raccourcis clavier d’extensions du navigateur si besoin. Voir [Extension navigateur](./extension#raccourci-clavier).

### L’import a fonctionné mais l’export est verrouillé

**L’import est gratuit ; l’export nécessite Pro** (idem pour les sauvegardes chiffrées `.okbak`). Guide : [Import et export](./import-export).

### Comment fonctionnent les pièces jointes ?

**Pro.** Ouvrez une connexion → ajoutez une pièce jointe chiffrée (environ **20 Mo** max). Les pièces jointes se synchronisent en ciphertext via votre serveur. L’export JSON OpenKey n’inclut que les métadonnées — utilisez `.okbak` pour un coffre complet incluant les blobs de pièces jointes.

### Comment ajouter des codes TOTP / authenticator ?

Sur une entrée, ajoutez un secret authenticator ou une URI `otpauth`, ou **scannez le QR** depuis la configuration 2FA du site. Les codes apparaissent quand le coffre est déverrouillé ; l’Autofill système / l’extension peuvent remplir là où c’est pris en charge.

### Les collections peuvent-elles être imbriquées ?

Oui — les dossiers peuvent contenir d’autres dossiers (relation `parent`). Les connexions imbriquées sont incluses dans l’autofill et le pont bureau.

### Les éléments supprimés disparaissent-ils immédiatement sur les autres appareils ?

Les éléments soft-supprimés se synchronisent comme **tombstones** jusqu’à ce que les pairs rattrapent. Le last-write-wins utilise le `revision` par élément — des éditions concurrentes peuvent encore s’écraser.

### Les builds web exigent-elles Pro ?

**Pas encore.** Les builds web n’appliquent pas encore les limites Pro. Les builds mobile et bureau magasin/bureau, oui.

### Comment fonctionnent les organisations et les partages ?

Pro + même serveur auto-hébergé. Publiez les clés d’identité, puis invitez à une org ou partagez un snapshot d’entrée. Détails : [Partage et organisations](./sharing).

### Comment fonctionnent biométrie / verrouillage auto ?

Sous **Réglages → Sécurité** vous pouvez activer le déverrouillage biométrique (selon plateforme) et les protections de verrouillage associées. Préférez verrouiller en inactivité sur les machines partagées. La biométrie enveloppe la clé de coffre sur l’appareil — elle ne remplace pas un mot de passe principal fort.

## Extension navigateur

### L’extension ne parle pas à l’application bureau

1. Déverrouillez le coffre bureau et laissez-le déverrouillé.
2. Ouvrez **Réglages → Saisie automatique** (et **Extension navigateur** sur macOS) pour enregistrer l’hôte natif.
3. Chromium : écrivez l’ID de l’extension non empaquetée dans le fichier plateforme (voir [Extension navigateur](./extension)), puis rouvrez Saisie automatique.
4. Choisissez **Utiliser l’application bureau** dans l’extension.
5. macOS nécessite Python 3 sur le `PATH` pour le script hôte.

### Le déverrouillage autonome échoue contre mon serveur

Confirmez que prelogin fonctionne : l’email doit déjà être inscrit. Même mot de passe principal que l’app. L’URL serveur doit être joignable depuis le navigateur (CORS / HTTPS). Vérifiez la page Options pour l’URL et essayez `/health` dans un onglet normal.

### Les passkeys basculent vers l’authenticator du navigateur

C’est attendu lorsque vous choisissez **Utiliser le navigateur** dans la boîte de confirmation, ou lorsque le coffre de l’extension est verrouillé. Déverrouillez l’extension (autonome) pour stocker/utiliser les passkeys OpenKey.

## CLI

### `openkey secret …` dit de déverrouiller l’app

Les commandes coffre nécessitent soit une **app bureau déverrouillée** (pont natif), soit `eval $(openkey unlock)` après `login`. Lancez `openkey status` pour voir l’état du pont / de la session.

### Session expirée

Le verrouillage par défaut est de 15 minutes (`openkey config set-lock`). Relancez `eval $(openkey unlock)`. Préférez l’invite interactive de mot de passe à `OPENKEY_PASSWORD` sur les machines personnelles.

## Sécurité / vie privée

### Santé des mots de passe envoie-t-elle mes mots de passe sur Internet ?

Les contrôles locaux faibles/réutilisés restent sur l’appareil. Have I Been Pwned optionnel n’utilise que la **k-anonymité de préfixe SHA-1** — jamais le mot de passe complet. Voir [Sécurité](./security).

### Nearby est-il une sauvegarde ?

Non. Il synchronise le ciphertext sur le LAN entre appareils appariés et liés par coffre. Conservez aussi des sauvegardes Pro hors ligne.

## Toujours bloqué ?

1. Notez le client en échec (app / extension / CLI) et l’heure approximative.
2. Vérifiez les logs serveur (`docker compose logs -f api`) et `/health`.
3. Signalez les problèmes de sécurité en privé — **security@openselfhosting.com** ou un advisory privé sous [OpenSelfHosting](https://github.com/OpenSelfHosting). Voir [Sécurité → Signalement](./security#signalement-des-vulnérabilités).
4. Pour les bugs produit, ouvrez une issue sous [OpenSelfHosting](https://github.com/OpenSelfHosting) avec le nom du paquet et la version.

Suivant : [Nearby](./nearby) · [Installer le serveur](./server) · [Sécurité](./security) · [Télécharger](./download)
