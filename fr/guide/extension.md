# Extension navigateur

Extension MV3 pour **Chrome**, **Edge**, **Brave** et **Firefox**. Elle peut se déverrouiller contre votre [serveur auto-hébergé](./server) (autonome) ou remplir via l’**application bureau** déverrouillée (messagerie native).

<img src="/guide/extension-unlock-modes.svg" alt="Two unlock modes: standalone sync with the self-hosted server, or desktop app bridge via native messaging without a separate extension vault unlock" class="ok-diagram" width="920" height="400" />

Nom d’hôte : `com.openselfhosting.openkey`

## Ce qu’elle fait

1. **Coffre autonome** — déverrouillage avec email + mot de passe principal ; sync du ciphertext depuis votre serveur
2. **Pont natif** — lorsque l’app bureau OpenKey est déverrouillée, remplir et enregistrer via messagerie native
3. **Autofill** — overlays, menu contextuel et raccourci clavier pour connexions et cartes de paiement
4. **Enregistrer / mettre à jour** — capturer de nouvelles connexions depuis la page dans le coffre
5. **Passkeys** — intercepter WebAuthn `create` / `get` ; stocker des credentials ES256 (extension déverrouillée)
6. **Cartes, crypto et secrets** — parcourir et remplir/copier les zones réservées du coffre
7. **Pièces jointes** — lister et télécharger les pièces jointes déchiffrées d’une connexion (autonome)
8. **Partages et orgs** — lister/accepter/révoquer partages et invitations d’org (autonome)

### Raccourci clavier

| Action | Windows / Linux | macOS |
|--------|-----------------|-------|
| Remplir la connexion avec OpenKey | `Ctrl+Shift+L` | `⌘⇧L` |

Les navigateurs peuvent exiger de confirmer ou de remapper la commande sous les raccourcis clavier d’extensions si une autre extension l’a déjà prise.

## Installation (non empaquetée)

Les fiches magasin peuvent ne pas être encore publiées. Compilez et chargez localement :

```bash
cd openkey_extension
npm install
npm run build
```

- **Chrome / Edge / Brave :** `chrome://extensions` → Mode développeur → **Charger l’extension non empaquetée** → sélectionnez `dist/`
- **Firefox :** `about:debugging` → Ce Firefox → **Charger un module complémentaire temporaire** → choisissez `dist/manifest.json`

Copiez l’ID de l’extension depuis la popup ou la page Options — vous en avez besoin pour connecter le pont bureau sur les navigateurs Chromium.

## Permissions

L’extension utilise des correspondances d’hôte / content-script `<all_urls>` pour que l’autofill, la capture de connexion et l’interception passkey fonctionnent sur les sites visités (une liste blanche fixe ne peut pas couvrir le web ouvert). La sync du ciphertext et le déverrouillage restent sur votre appareil ou votre [serveur auto-hébergé](./server) ; OpenKey n’exfiltre pas le HTML des pages vers un cloud vendeur. Préférez **Utiliser l’application bureau** lorsque vous voulez remplir sans déverrouiller un coffre d’extension séparé.

## Modes de déverrouillage

### Serveur auto-hébergé

1. Définissez l’**URL du serveur auto-hébergé** dans la popup ou Options.
2. **Créer un compte** (inscription) ou **Déverrouiller** (prelogin + login avec le même email et mot de passe principal que l’app).
3. Le ciphertext se synchronise via `POST /sync`. Le mot de passe principal ne quitte jamais le client.

### Pont application bureau

1. Déverrouillez l’application bureau OpenKey.
2. Activez Autofill / connectez l’extension (étapes plateforme ci-dessous).
3. Dans l’extension, choisissez **Utiliser l’application bureau**.

Remplir et enregistrer passent par l’app déverrouillée — aucun déverrouillage séparé du coffre d’extension n’est requis pour ces flux.

Optionnel : **Réglages → Extension navigateur → Copier le lien coffre hors ligne** dans l’app pour un bootstrap air-gapped.

## Connecter la messagerie native

### Windows

Ouvrir **Réglages → Saisie automatique** enregistre `openkey_native_host.exe` sous :

`HKCU\Software\...\NativeMessagingHosts\com.openselfhosting.openkey`

Pour Chromium, écrivez l’ID de l’extension non empaquetée dans :

`%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt`

puis rouvrez Saisie automatique pour régénérer le manifeste d’hôte. Firefox utilise `openkey@openselfhosting.local` automatiquement.

Gardez le coffre déverrouillé (TCP loopback).

### macOS

Au déverrouillage, OpenKey installe `openkey_native_host.py` et écrit les manifestes sous les dossiers NativeMessagingHosts de Chrome / Chromium / Edge / Brave / Firefox.

1. Chargez l’extension non empaquetée et copiez son ID.
2. App : **Réglages → Extension navigateur** → collez l’ID → **Connecter l’extension**.
3. Gardez le coffre déverrouillé → extension : **Utiliser l’application bureau**.

Nécessite **Python 3** sur le `PATH`.

### Linux

**Réglages → Saisie automatique** écrit les manifestes d’hôte sous `~/.config/google-chrome/`, Chromium, Edge, et `~/.mozilla/native-messaging-hosts/`.

Fichier d’ID d’extension Chromium :

`~/.local/share/OpenKey/chrome_extension_id.txt`

puis touchez à nouveau Saisie automatique. Firefox utilise `openkey@openselfhosting.local`.

Socket du pont : `$XDG_RUNTIME_DIR/openkey-native.sock` (gardez le coffre déverrouillé).

## Enregistrer les connexions capturées

Après une soumission de connexion (ou bouton de connexion / Entrée), une bannière in-page propose **Enregistrer** ou **Mettre à jour** :

1. **Pont natif** — `createEntry` / `updateEntry` sur l’app bureau déverrouillée
2. **Autonome** — chiffrer localement et pousser le ciphertext via sync

Même hôte + identifiant + mot de passe est ignoré ; un mot de passe modifié propose une mise à jour.

## Passkeys

Avec l’extension déverrouillée, OpenKey peut gérer WebAuthn sur les sites. Une boîte de dialogue in-page confirme ; choisissez **Utiliser le navigateur** pour revenir à l’authenticator de plateforme.

Test rapide après déverrouillage : [webauthn.io](https://webauthn.io) ou `npx tsx src/passkey/smoke.test.ts` dans `openkey_extension`.

## Voir aussi

- [Télécharger et installer](./download)
- [Utiliser l’application](./app) — réglages Saisie automatique et Extension navigateur
- [Installer le serveur](./server)
- [Sécurité](./security) — frontière de confiance de l’extension
