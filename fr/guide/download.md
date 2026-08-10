---
title: Télécharger et installer
---

<DownloadPicker layout="page" />

Obtenez l’application OpenKey, puis connectez optionnellement un [serveur auto-hébergé](./server), l’[extension navigateur](./extension) ou la [CLI](./cli).

Identifiant d’application : `com.openselfhosting.openkey` · Org : [OpenSelfHosting](https://github.com/OpenSelfHosting)

Les fiches magasin et les GitHub Releases se déploient par plateforme. Tant qu’un lien magasin n’est pas en ligne, compilez depuis le monorepo ou utilisez un artefact bureau de votre propre run `build_all/`.

## Mobile

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — Recherchez **OpenKey** par OpenSelfHosting une fois la fiche publique |
| Sideload APK/AAB {#android-apk} | Sideload APK/AAB depuis `build_all/android/` (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | Recherchez **OpenKey** par OpenSelfHosting une fois la fiche approuvée |
| Xcode archive | Archive Xcode locale `build_all/ios/` |

Activez **Réglages → Saisie automatique** pour qu’OpenKey remplisse mots de passe et passkeys à l’échelle du système.

## Bureau

### macOS {#macos}

| Build | Artifact |
|-------|----------|
| Apple Silicon {#macos-arm64} | `OpenKey-*-macos-arm64.dmg` / `.zip` from `build_all/macos/` |
| Intel Chip {#macos-x64} | `OpenKey-*-macos-x64.dmg` / `.zip` |
| Universal {#macos-universal} | Prefer arch-matched `.dmg`; Mac App Store when listed |
| Mac App Store {#macos-appstore} | When listed |

### Windows {#windows}

| Build | Artifact |
|-------|----------|
| x64 installer {#windows-x64} | `OpenKey-*-windows-x64-setup.exe` · portable `.zip` · optional `.msix` |
| Arm64 {#windows-arm64} | When published on GitHub Releases / Microsoft Store |
| Microsoft Store {#windows-store} | When listed |

### Linux {#linux}

| Build | Artifact |
|-------|----------|
| `.deb` x64 {#linux-deb-x64} | `OpenKey-*-linux-x64.deb` |
| `.deb` Arm64 {#linux-deb-arm64} | `OpenKey-*-linux-arm64.deb` |
| `.tar.gz` x64 {#linux-tar-x64} | Portable tarball from `build_all/linux/` |
| `.tar.gz` Arm64 {#linux-tar-arm64} | Portable tarball (arm64) |
| Flathub {#linux-flathub} | When listed (`com.openselfhosting.openkey`) |
| Snap Store {#linux-snap} | When listed (`openkey`) |

Desktop Autofill registers the **native messaging host** used by the [browser extension](./extension). Keep the vault unlocked while filling from the browser.

### Compiler le bureau vous-même

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

See `openkey_app/packaging/README.md` for store packaging (Play, App Store, Microsoft Store, Snap, Flathub).

## Extension navigateur

Chrome / Edge / Firefox (MV3). Pas encore sur les fiches Web Store publiques — chargez un build non empaqueté :

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [Extension navigateur](./extension).

## Serveur et CLI

| Package | Install |
|---------|---------|
| **Serveur** | Docker Compose in `openkey_server` — [Serveur](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## Après l’installation

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

Suivant : [Utiliser l’application](./app) · [Nearby](./nearby) · [Extension navigateur](./extension) · [Installer le serveur](./server)
