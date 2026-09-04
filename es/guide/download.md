---
title: Descargar e instalar
---

<DownloadPicker layout="page" />

Obtén la app OpenKey y, opcionalmente, conecta un [servidor autoalojado](./server), la [extensión del navegador](./extension) o la [CLI](./cli).

Id de aplicación: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Las fichas de tienda y las Releases de GitHub se despliegan por plataforma. Hasta que un enlace de tienda esté activo, compila desde el monorepo o usa un artefacto de escritorio de tu propia ejecución de `build_all/`.

## Móvil

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — Busca **OpenKey** de OpenSelfHosting cuando la ficha sea pública |
| Sideload APK/AAB {#android-apk} | APK/AAB sideload desde `build_all/android/` (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | Busca **OpenKey** de OpenSelfHosting cuando la ficha esté aprobada |
| Xcode archive | Archivo Xcode en `build_all/ios/` |

Activa **Ajustes → Seguridad** para que OpenKey pueda rellenar contraseñas y passkeys en todo el sistema.

## Escritorio

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

### Compilar escritorio tú mismo

Instaladores oficiales: [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). El código fuente de la app oficial no es público.

## Extensión del navegador

Chrome / Edge / Firefox (MV3). Aún no en las fichas públicas de Web Store — carga una build descomprimida:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [Extensión del navegador](./extension).

## Servidor y CLI

| Package | Install |
|---------|---------|
| **Servidor** | Docker Compose in `openkey_server` — [Servidor](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## Tras instalar

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

Siguiente: [Usar la app](./app) · [Nearby](./nearby) · [Extensión del navegador](./extension) · [Configuración del servidor](./server)
