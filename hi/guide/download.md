---
title: डाउनलोड और इंस्टॉल
---

<DownloadPicker layout="page" />

OpenKey ऐप प्राप्त करें, फिर वैकल्पिक रूप से [सेल्फ-होस्टेड सर्वर](./server), [ब्राउज़र एक्सटेंशन](./extension), या [CLI](./cli) कनेक्ट करें।

ऐप id: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

स्टोर लिस्टिंग और GitHub Releases प्रति प्लेटफ़ॉर्म आते हैं। **Google Play और Microsoft Store लाइव हैं** — Android पर OpenKey को [Google Play लिस्टिंग](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) से, या Windows पर [Microsoft Store लिस्टिंग](https://apps.microsoft.com/detail/9MXNBRPMDT53) से इंस्टॉल करें। मुख्य डाउनलोड बटन आपको उसी सिस्टम के स्टोर पर ले जाता है, और बगल का बटन सीधा बिल्ड देता है। आधिकारिक ऐप बाइनरी [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases) पर भी उपलब्ध हैं। ऐप का आधिकारिक **सोर्स सार्वजनिक नहीं** है, इसलिए खुद बिल्ड करने के बजाय उन्हीं आर्टिफैक्ट का उपयोग करें। दूसरी स्टोर लिस्टिंग अभी समीक्षा में हो सकती है।

## मोबाइल

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | [Google Play पर OpenKey पाएँ](https://play.google.com/store/apps/details?id=com.openselfhosting.openkey) — **OpenSelfHosting** द्वारा `com.openselfhosting.openkey` के रूप में लिस्टेड |
| Sideload APK/AAB {#android-apk} | `build_all/android/` से sideload APK/AAB (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | लिस्टिंग के बाद OpenSelfHosting का **OpenKey** खोजें |
| Xcode archive | स्थानीय `build_all/ios/` |

**सेटिंग्स → Autofill** सक्षम करें ताकि OpenKey सिस्टम-वाइड पासवर्ड और passkeys भर सके।

## डेस्कटॉप

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
| Microsoft Store {#windows-store} | [Microsoft Store पर OpenKey पाएँ](https://apps.microsoft.com/detail/9MXNBRPMDT53) — Windows उपयोगकर्ताओं के लिए अनुशंसित; स्वयं अपडेट होता है |

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

### डेस्कटॉप स्वयं बिल्ड करें

**OpenKey MIT License के तहत open-source app है**; इसका [source code](https://github.com/OpenSelfHosting/OpenKey) और [build instructions](https://github.com/OpenSelfHosting/OpenKey#build-from-source) सभी के लिए उपलब्ध हैं। Official desktop installers [GitHub Releases](https://github.com/OpenSelfHosting/OpenKey/releases) पर हैं।

## ब्राउज़र एक्सटेंशन

Chrome, Edge और Firefox के लिए MV3 extension। [Chrome Web Store से OpenKey इंस्टॉल करें](https://chromewebstore.google.com/detail/cmebbcnocamcolnedgafbkeelejldoga?utm_source=item-share-cp)। Edge, Firefox या manual installation के लिए extension build करके `dist/` folder load करें:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [ब्राउज़र एक्सटेंशन](./extension).

## सर्वर और CLI

| Package | Install |
|---------|---------|
| **सर्वर** | Docker Compose in `openkey_server` — [सर्वर](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## इंस्टॉल के बाद

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

अगला: [ऐप](./app) · [Nearby](./nearby) · [एक्सटेंशन](./extension) · [सर्वर](./server)
