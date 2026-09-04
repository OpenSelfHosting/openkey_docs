---
title: Baixar e instalar
---

<DownloadPicker layout="page" />

Obtenha o app OpenKey e, opcionalmente, conecte um [servidor auto-hospedado](./server), a [extensão do navegador](./extension) ou a [CLI](./cli).

Id do aplicativo: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Listagens nas lojas e GitHub Releases são lançadas por plataforma. Até um link de loja ficar ativo, compile do monorepo ou use um artefato desktop do seu próprio `build_all/`.

## Mobile

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — Procure **OpenKey** da OpenSelfHosting quando a listagem for pública |
| Sideload APK/AAB {#android-apk} | Sideload APK/AAB de `build_all/android/` (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | Procure **OpenKey** da OpenSelfHosting quando a listagem for aprovada |
| Xcode archive | Arquivo Xcode local `build_all/ios/` |

Ative **Configurações → Preenchimento automático** para o OpenKey preencher senhas e passkeys no sistema.

## Desktop

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
| AppImage x64 {#linux-appimage-x64} | `OpenKey-*-linux-x64.AppImage` |
| AppImage Arm64 {#linux-appimage-arm64} | `OpenKey-*-linux-arm64.AppImage` |
| `.deb` x64 {#linux-deb-x64} | `OpenKey-*-linux-x64.deb` |
| `.deb` Arm64 {#linux-deb-arm64} | `OpenKey-*-linux-arm64.deb` |
| `.tar.gz` x64 {#linux-tar-x64} | Portable tarball from `build_all/linux/` |
| `.tar.gz` Arm64 {#linux-tar-arm64} | Portable tarball (arm64) |

Arch: `makepkg -si` with the `PKGBUILD` inside the tarball.

Desktop Autofill registers the **native messaging host** used by the [browser extension](./extension). Keep the vault unlocked while filling from the browser.

### Compilar desktop você mesmo

Instaladores oficiais: [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). O código-fonte do app oficial não é público.

## Extensão do navegador

Chrome / Edge / Firefox (MV3). Ainda não nas lojas públicas — carregue build descompactado:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [Extensão do navegador](./extension).

## Servidor e CLI

| Package | Install |
|---------|---------|
| **Servidor** | Docker Compose in `openkey_server` — [Servidor](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## Após instalar

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

Próximo: [Usar o app](./app) · [Nearby](./nearby) · [Extensão](./extension) · [Servidor](./server)
