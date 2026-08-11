---
title: Скачать и установить
---

<DownloadPicker layout="page" />

Установите приложение OpenKey, затем при необходимости подключите [самохостируемый сервер](./server), [расширение браузера](./extension) или [CLI](./cli).

Id приложения: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Листинги в магазинах и GitHub Releases появляются по платформам. Пока ссылка магазина не активна, соберите из monorepo или используйте артефакт с вашего `build_all/`.

## Мобильные

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — Ищите **OpenKey** от OpenSelfHosting после публикации листинга |
| Sideload APK/AAB {#android-apk} | Sideload APK/AAB из `build_all/android/` (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | Ищите **OpenKey** от OpenSelfHosting после одобрения листинга |
| Xcode archive | Локальный архив Xcode `build_all/ios/` |

Включите **Настройки → Автозаполнение**, чтобы OpenKey заполнял пароли и passkeys в системе.

## Настольные

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

### Собрать настольную версию самостоятельно

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

See `openkey_app/packaging/README.md` for store packaging (Play, App Store, Microsoft Store, Snap, Flathub).

## Расширение браузера

Chrome / Edge / Firefox (MV3). Пока нет в публичных магазинах — загрузите распакованную сборку:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [Расширение браузера](./extension).

## Сервер и CLI

| Package | Install |
|---------|---------|
| **Сервер** | Docker Compose in `openkey_server` — [Сервер](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## После установки

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

Далее: [Приложение](./app) · [Nearby](./nearby) · [Расширение](./extension) · [Сервер](./server)
