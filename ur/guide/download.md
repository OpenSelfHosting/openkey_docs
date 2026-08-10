---
title: ڈاؤن لوڈ اور انسٹال
---

<DownloadPicker layout="page" />

OpenKey ایپ حاصل کریں، پھر اختیاری طور پر [سیلف-ہوسٹ سرور](./server)، [براؤزر ایکسٹینشن](./extension)، یا [CLI](./cli) منسلک کریں۔

ایپ id: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

اسٹور لسٹنگز اور GitHub Releases پلیٹ فارم کے حساب سے آتے ہیں۔ جب تک اسٹور لنک لائیو نہ ہو، monorepo سے بلڈ کریں یا اپنے `build_all/` رن سے ڈیسک ٹاپ آرٹیفیکٹ استعمال کریں۔

## موبائل

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — لسٹنگ عوامی ہونے پر OpenSelfHosting کا **OpenKey** تلاش کریں |
| Sideload APK/AAB {#android-apk} | `build_all/android/` سے sideload APK/AAB (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | لسٹنگ کے بعد OpenSelfHosting کا **OpenKey** تلاش کریں |
| Xcode archive | مقامی `build_all/ios/` |

**سیٹنگز → Autofill** فعال کریں تاکہ OpenKey سسٹم بھر میں پاس ورڈز اور passkeys بھر سکے۔

## ڈیسک ٹاپ

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

### ڈیسک ٹاپ خود بنائیں

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

See `openkey_app/packaging/README.md` for store packaging (Play, App Store, Microsoft Store, Snap, Flathub).

## براؤزر ایکسٹینشن

Chrome / Edge / Firefox (MV3). ابھی عوامی Web Store لسٹنگ نہیں — unpacked build لوڈ کریں:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [براؤزر ایکسٹینشن](./extension).

## سرور اور CLI

| Package | Install |
|---------|---------|
| **سرور** | Docker Compose in `openkey_server` — [سرور](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## انسٹال کے بعد

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

اگلا: [ایپ](./app) · [Nearby](./nearby) · [ایکسٹینشن](./extension) · [سرور](./server)
