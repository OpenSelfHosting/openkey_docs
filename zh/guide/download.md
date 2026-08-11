---
title: 下载与安装
---

<DownloadPicker layout="page" />

获取 OpenKey 应用，然后可选连接[自托管服务器](./server)、[浏览器扩展](./extension)或 [CLI](./cli)。

应用 ID：`com.openselfhosting.openkey` · 组织：[OpenSelfHosting](https://github.com/OpenSelfHosting)

各平台的商店上架与 GitHub Releases 会分批推出。在公开商店链接可用之前，可从 monorepo 构建，或使用自己跑出的 `build_all/` 桌面产物。

## 移动端

### Android {#android}

| Channel | Notes |
|---------|--------|
| Google Play {#android-play} | `com.openselfhosting.openkey` — 上架后搜索 OpenSelfHosting 的 **OpenKey** |
| Sideload APK/AAB {#android-apk} | 从 `build_all/android/` 侧载 APK/AAB |

### iOS {#ios}

| Channel | Notes |
|---------|--------|
| App Store | 上架后搜索 OpenSelfHosting 的 **OpenKey** |
| Xcode archive | 本地 `build_all/ios/` |

启用 **设置 → 自动填充**，以便系统级填充密码与通行密钥。

## 桌面端

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

### 自行构建桌面版

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

See `openkey_app/packaging/README.md` for store packaging (Play, App Store, Microsoft Store, Snap, Flathub).

## 浏览器扩展

Chrome / Edge / Firefox（MV3）。尚未上架公共扩展商店 — 加载未打包构建：

```bash
cd openkey_extension
npm install && npm run build
```

Then load `dist/` in `chrome://extensions` or Firefox `about:debugging`. Full setup: [浏览器扩展](./extension).

## 服务器与 CLI

| Package | Install |
|---------|---------|
| **服务器** | Docker Compose in `openkey_server` — [服务器](./server) |
| **CLI** | Node 20+ in `openkey_cli` (`npm link`) — [CLI](./cli) |

Quick local stack: [Quick start](./quick-start).

## 安装之后

1. Create or unlock a vault with a strong master password ([App](./app)).
2. Optional: point **Settings → Data → Self-hosted server** at your API URL and sync.
3. Optional (Pro): pair devices with **Nearby** for LAN vault sync without a server — [Nearby](./nearby).
4. On desktop: connect the [extension](./extension) via Autofill / Browser extension settings.

下一步：[使用应用](./app) · [Nearby](./nearby) · [浏览器扩展](./extension) · [服务器安装](./server)
