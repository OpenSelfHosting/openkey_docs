---
title: ডাউনলোড ও ইনস্টল
---

<DownloadPicker layout="page" />

OpenKey অ্যাপ নিন, তারপর ঐচ্ছিকভাবে [সেল্ফ-হোস্টেড সার্ভার](./server), [ব্রাউজার এক্সটেনশন](./extension), বা [CLI](./cli) সংযুক্ত করুন।

অ্যাপ id: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

স্টোর লিস্টিং ও GitHub Releases প্ল্যাটফর্মভিত্তিক আসে। স্টোর লিঙ্ক লাইভ না হওয়া পর্যন্ত monorepo থেকে বিল্ড করুন বা নিজের `build_all/` রান থেকে ডেস্কটপ আর্টিফ্যাক্ট ব্যবহার করুন।

## মোবাইল

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — লিস্টিং পাবলিক হলে OpenSelfHosting-এর **OpenKey** খুঁজুন |
| Sideload APK/AAB {#android-apk} | `build_all/android/` থেকে sideload APK/AAB (`OpenKey-*-android.apk`) |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | লিস্টিংয়ের পর OpenSelfHosting-এর **OpenKey** খুঁজুন |
| Xcode archive | স্থানীয় `build_all/ios/` |

**সেটিংস → Autofill** চালু করুন যাতে OpenKey সিস্টেম-জুড়ে পাসওয়ার্ড ও passkeys পূরণ করতে পারে।

## ডেস্কটপ

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

### ডেস্কটপ নিজে বিল্ড করুন

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

See `openkey_app/packaging/README.md` for store packaging (Play, App Store, Microsoft Store, Snap, Flathub).

## ব্রাউজার এক্সটেনশন

Chrome / Edge / Firefox (MV3). এখনও পাবলিক Web Store লিস্টিং নেই — unpacked build লোড করুন:

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [ব্রাউজার এক্সটেনশন](./extension).

## সার্ভার ও CLI

| Package | Install |
|---------|---------|
| **সার্ভার** | Docker Compose in `openkey_server` — [সার্ভার](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## ইনস্টলের পর

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

পরবর্তী: [অ্যাপ](./app) · [Nearby](./nearby) · [এক্সটেনশন](./extension) · [সার্ভার](./server)
