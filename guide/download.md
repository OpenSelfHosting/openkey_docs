# Download & install

Get the OpenKey app, then optionally connect a [self-hosted server](./server), the [browser extension](./extension), or the [CLI](./cli).

Application id: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Store listings and GitHub Releases roll out per platform. Until a store link is live, build from the monorepo or use a desktop artifact from your own `build_all/` run. Public store pages may still be pending review even when packaging scripts produce Play / App Store / Flathub bundles locally.

## Mobile

| Platform | Channel | Notes |
|----------|---------|--------|
| **Android** | Google Play (`com.openselfhosting.openkey`) when listed · sideload APK/AAB from `build_all/` | Search **OpenKey** by OpenSelfHosting once the listing is public |
| **iOS** | App Store when listed · Xcode archive | Search **OpenKey** by OpenSelfHosting once the listing is approved |

Enable **Settings → Autofill** so OpenKey can fill passwords and passkeys system-wide.

## Desktop

| Platform | Channel | Artifact / notes |
|----------|---------|------------------|
| **macOS** | Mac App Store (when listed) · direct `.dmg` / `.zip` | Apple Silicon and Intel builds from packaging (`build_all/macos/`) |
| **Windows** | Microsoft Store (when listed) · Inno Setup installer · portable `.zip` | Store package is `.msix`; sideload uses `*-setup.exe` when Inno Setup is available |
| **Linux** | Flathub · Snap Store (when listed) · `.tar.gz` / `.deb` | Flatpak / Snap id: `com.openselfhosting.openkey`. No AppImage yet — use the portable tarball or `.deb` from `build_all/` / packaging scripts |

Desktop Autofill registers the **native messaging host** used by the [browser extension](./extension). Keep the vault unlocked while filling from the browser.

### Build desktop yourself

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

See `openkey_app/packaging/README.md` for store packaging (Play, App Store, Microsoft Store, Snap, Flathub).

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
