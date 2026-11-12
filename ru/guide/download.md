---
title: Скачать и установить
---

<DownloadPicker layout="page" />

Установите приложение OpenKey, затем при необходимости подключите [самохостируемый сервер](./server), [расширение браузера](./extension) или [CLI](./cli).

Id приложения: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Листинги в магазинах и GitHub Releases появляются по платформам. **Google Play и Microsoft Store уже доступны** — установите OpenKey на Android из [карточки Google Play](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) или на Windows из [карточки Microsoft Store](https://apps.microsoft.com/detail/9MXNBRPMDT53). Основная кнопка загрузки ведёт в магазин вашей системы, а соседняя отдаёт прямую сборку. Официальные бинарники также публикуются в [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases). Официальный исходный код **не публикуется**, поэтому используйте эти артефакты, а не собирайте приложение сами. Остальные карточки магазинов могут ещё проходить проверку.

## Мобильные

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | [Скачать OpenKey из Google Play](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) — опубликовано **OpenSelfHosting** как `com.openselfhosting.openkey` |
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
| x64 installer {#windows-x64} | `OpenKey-*-windows-x64.exe` · portable `.zip` |
| Arm64 {#windows-arm64} | When published on GitHub Releases / Microsoft Store |
| Microsoft Store {#windows-store} | [Скачать OpenKey из Microsoft Store](https://apps.microsoft.com/detail/9MXNBRPMDT53) — рекомендуется для пользователей Windows; обновляется сам |

### Linux {#linux}

| Build | Artifact |
|-------|----------|
| AppImage x64 {#linux-appimage-x64} | `OpenKey-*-linux-x64.AppImage` |
| AppImage Arm64 {#linux-appimage-arm64} | `OpenKey-*-linux-arm64.AppImage` |
| `.deb` x64 {#linux-deb-x64} | `OpenKey-*-linux-x64.deb` |
| `.deb` Arm64 {#linux-deb-arm64} | `OpenKey-*-linux-arm64.deb` |
| `.rpm` x64 {#linux-rpm-x64} | `OpenKey-*-linux-x64.rpm` |
| `.rpm` Arm64 {#linux-rpm-arm64} | `OpenKey-*-linux-arm64.rpm` |
| `.tar.gz` x64 {#linux-tar-x64} | Portable tarball from `build_all/linux/` |
| `.tar.gz` Arm64 {#linux-tar-arm64} | Portable tarball (arm64) |

Arch: `makepkg -si` with the `PKGBUILD` inside the tarball.

Desktop Autofill registers the **native messaging host** used by the [browser extension](./extension). Keep the vault unlocked while filling from the browser.

### Собрать настольную версию самостоятельно

**OpenKey — приложение с открытым исходным кодом** под лицензией MIT; [исходный код](https://github.com/OpenSelfHosting/OpenKey) и [инструкции по сборке](https://github.com/OpenSelfHosting/OpenKey#build-from-source) доступны всем. Официальные установщики опубликованы в [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases).

## Расширение браузера

Расширение MV3 для Chrome, Edge и Firefox. [Установите OpenKey из Chrome Web Store](https://chromewebstore.google.com/detail/cmebbcnocamcolnedgafbkeelejldoga?utm_source=item-share-cp). Для Edge, Firefox или ручной установки соберите расширение и загрузите папку `dist/`:

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
