---
title: ڈاؤن لوڈ اور انسٹال
---

<DownloadPicker layout="page" />

OpenKey ایپ حاصل کریں، پھر اختیاری طور پر [سیلف-ہوسٹ سرور](./server)، [براؤزر ایکسٹینشن](./extension)، یا [CLI](./cli) منسلک کریں۔

ایپ id: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

اسٹور لسٹنگز اور GitHub Releases پلیٹ فارم کے حساب سے آتے ہیں۔ **Google Play اور Microsoft Store اب لائیو ہیں** — Android پر OpenKey کو [Google Play لسٹنگ](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) سے، یا Windows پر [Microsoft Store لسٹنگ](https://apps.microsoft.com/detail/9MXNBRPMDT53) سے انسٹال کریں۔ مرکزی ڈاؤن لوڈ بٹن آپ کو اپنے سسٹم کے اسٹور پر لے جاتا ہے، اور اس کے ساتھ والا بٹن براہِ راست بلڈ دیتا ہے۔ آفیشل ایپ باینریز [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases) پر بھی دستیاب ہیں۔ ایپ کا آفیشل **سورس عوامی نہیں**، اس لیے خود بلڈ کرنے کے بجائے انہی آرٹیفیکٹس استعمال کریں۔ دوسری اسٹور لسٹنگز ابھی جائزے میں ہو سکتی ہیں۔

## موبائل

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | [Google Play پر OpenKey حاصل کریں](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) — **OpenSelfHosting** کی طرف سے `com.openselfhosting.openkey` کے نام سے فہرست میں |
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
| x64 installer {#windows-x64} | `OpenKey-*-windows-x64.exe` · portable `.zip` |
| Arm64 {#windows-arm64} | When published on GitHub Releases / Microsoft Store |
| Microsoft Store {#windows-store} | [Microsoft Store پر OpenKey حاصل کریں](https://apps.microsoft.com/detail/9MXNBRPMDT53) — Windows صارفین کے لیے تجویز کردہ؛ خود بخود اپ ڈیٹ ہوتا ہے |

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

### ڈیسک ٹاپ خود بنائیں

**OpenKey MIT License کے تحت اوپن سورس ہے**؛ [source code](https://github.com/OpenSelfHosting/OpenKey) اور [build instructions](https://github.com/OpenSelfHosting/OpenKey#build-from-source) سب کے لیے دستیاب ہیں۔ Official desktop installers [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases) پر موجود ہیں۔

## براؤزر ایکسٹینشن

Chrome، Edge اور Firefox کے لیے MV3 extension۔ [Chrome Web Store سے OpenKey انسٹال کریں](https://chromewebstore.google.com/detail/cmebbcnocamcolnedgafbkeelejldoga?utm_source=item-share-cp)۔ Edge، Firefox یا manual installation کے لیے extension build کرکے `dist/` folder لوڈ کریں:

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
