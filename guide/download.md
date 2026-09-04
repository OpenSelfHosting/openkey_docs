---
title: Download & install
---

<DownloadPicker layout="page" />

Get the OpenKey app, then optionally connect a [self-hosted server](./server), the [browser extension](./extension), or the [CLI](./cli).

Application id: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Store listings and GitHub Releases roll out per platform. Official app binaries are published on [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). The official app **source is not public**. Until a store link is live, use those release artifacts. Public store pages may still be pending review.

## Mobile

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — search **OpenKey** by OpenSelfHosting once the listing is public |
| Sideload APK/AAB {#android-apk} | From [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases) (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | When listed — search **OpenKey** by OpenSelfHosting |
| Xcode archive | Local `build_all/ios/` |

Enable **Settings → Security** (Autofill) so OpenKey can fill passwords and passkeys system-wide.

## Desktop

### macOS {#macos}

| Build | Artifact |
|-------|----------|
| Apple Silicon {#macos-arm64} | `OpenKey-*-macos-arm64.dmg` / `.zip` from `build_all/macos/` |
| Intel Chip {#macos-x64} | `OpenKey-*-macos-x64.dmg` / `.zip` |
| Universal {#macos-universal} | Prefer the arch-matched `.dmg` when available; Mac App Store when listed |

### Windows {#windows}

| Build | Artifact |
|-------|----------|
| x64 installer {#windows-x64} | `OpenKey-*-windows-x64-setup.exe` · portable `.zip` · optional `.msix` |
| Arm64 {#windows-arm64} | When published on GitHub Releases / Microsoft Store |

### Linux {#linux}

| Build | Artifact |
|-------|----------|
| AppImage x64 {#linux-appimage-x64} | `OpenKey-*-linux-x64.AppImage` — any glibc distro |
| AppImage Arm64 {#linux-appimage-arm64} | `OpenKey-*-linux-arm64.AppImage` |
| `.deb` x64 {#linux-deb-x64} | Debian, Ubuntu, Mint, Pop!_OS (`OpenKey-*-linux-x64.deb`) |
| `.deb` Arm64 {#linux-deb-arm64} | `OpenKey-*-linux-arm64.deb` |
| `.tar.gz` x64 {#linux-tar-x64} | Portable tarball from `build_all/linux/` |
| `.tar.gz` Arm64 {#linux-tar-arm64} | Portable tarball (arm64) |

Arch users can `makepkg -si` with the `PKGBUILD` inside the tarball.

Desktop Autofill registers the **native messaging host** used by the [browser extension](./extension). Keep the vault unlocked while filling from the browser.

Official desktop installers are attached to [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). The OpenKey app source is proprietary — install the official artifacts, do not expect a public `flutter build`.

## Browser extension

Chrome / Edge / Firefox (MV3). Not yet on the public Web Store listings — load an unpacked build:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [Browser extension](./extension).

## Server & CLI

| Package | Install |
|---------|---------|
| **Server** | Docker Compose in `openkey_server` — [Server setup](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## After install

1. Create or unlock a vault with a strong master password ([Using the app](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby guide](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

Next: [Using the app](./app) · [Nearby](./nearby) · [Browser extension](./extension) · [Server setup](./server)
