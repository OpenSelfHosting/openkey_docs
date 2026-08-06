---
title: Télécharger et installer
---

<DownloadPicker layout="page" />

Obtenez l’application OpenKey, puis connectez optionnellement un [serveur auto-hébergé](./server), l’[extension navigateur](./extension) ou la [CLI](./cli).

Identifiant d’application : `com.openselfhosting.openkey` · Org : [OpenSelfHosting](https://github.com/OpenSelfHosting)

Les fiches magasin et les GitHub Releases se déploient par plateforme. Tant qu’un lien magasin n’est pas en ligne, compilez depuis le monorepo ou utilisez un artefact bureau de votre propre run `build_all/`. Les pages magasin publiques peuvent encore être en revue même lorsque les scripts de packaging produisent localement des bundles Play / App Store / Flathub.

## Mobile

| Plateforme | Canal | Notes |
|----------|---------|--------|
| **Android** | Google Play (`com.openselfhosting.openkey`) une fois listé · sideload APK/AAB depuis `build_all/` | Recherchez **OpenKey** par OpenSelfHosting une fois la fiche publique |
| **iOS** | App Store une fois listé · archive Xcode | Recherchez **OpenKey** par OpenSelfHosting une fois la fiche approuvée |

Activez **Réglages → Saisie automatique** pour qu’OpenKey remplisse mots de passe et passkeys à l’échelle du système.

## Bureau

| Plateforme | Canal | Artefact / notes |
|----------|---------|------------------|
| **macOS** | Mac App Store (une fois listé) · `.dmg` / `.zip` directs | Builds Apple Silicon et Intel depuis le packaging (`build_all/macos/`) |
| **Windows** | Microsoft Store (une fois listé) · installateur Inno Setup · `.zip` portable | Le paquet magasin est `.msix` ; le sideload utilise `*-setup.exe` lorsque Inno Setup est disponible |
| **Linux** | Flathub · Snap Store (une fois listés) · `.tar.gz` / `.deb` | Id Flatpak / Snap : `com.openselfhosting.openkey`. Pas d’AppImage pour l’instant — utilisez le tarball portable ou le `.deb` depuis `build_all/` / scripts de packaging |

L’Autofill bureau enregistre l’**hôte de messagerie native** utilisé par l’[extension navigateur](./extension). Gardez le coffre déverrouillé pendant le remplissage depuis le navigateur.

### Compiler le bureau vous-même

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

Voir `openkey_app/packaging/README.md` pour le packaging magasin (Play, App Store, Microsoft Store, Snap, Flathub).

## Extension navigateur

Chrome / Edge / Firefox (MV3). Pas encore sur les fiches Web Store publiques — chargez un build non empaqueté :

```bash
cd openkey_extension
npm install && npm run build
```

Puis chargez `dist/` dans `chrome://extensions` ou Firefox `about:debugging`. Configuration complète : [Extension navigateur](./extension).

## Serveur et CLI

| Paquet | Installation |
|---------|---------|
| **Serveur** | Docker Compose dans `openkey_server` — [Installer le serveur](./server) |
| **CLI** | Node 20+ dans `openkey_cli` (`npm link`) — [CLI](./cli) |

Stack locale rapide : [Démarrage rapide](./quick-start).

## Après l’installation

1. Créez ou déverrouillez un coffre avec un mot de passe principal fort ([Utiliser l’application](./app)).
2. Optionnel : pointez **Réglages → Données → Serveur auto-hébergé** vers l’URL de votre API et synchronisez.
3. Optionnel (Pro) : appariez des appareils avec **Nearby** pour la sync de coffre sur le LAN sans serveur — [Guide Nearby](./nearby).
4. Sur bureau : connectez l’[extension](./extension) via Saisie automatique / Réglages Extension navigateur.

Suivant : [Utiliser l’application](./app) · [Nearby](./nearby) · [Extension navigateur](./extension) · [Installer le serveur](./server)
