---
title: 下载与安装
---

<DownloadPicker layout="page" />

获取 OpenKey 应用，然后可选连接[自托管服务器](./server)、[浏览器扩展](./extension)或 [CLI](./cli)。

应用 ID：`com.openselfhosting.openkey` · 组织：[OpenSelfHosting](https://github.com/OpenSelfHosting)

各平台的商店上架与 GitHub Releases 会分批推出。在公开商店链接可用之前，可从 monorepo 构建，或使用自己跑出的 `build_all/` 桌面产物。即便本地打包脚本已生成 Play / App Store / Flathub 包，公开商店页仍可能在审核中。

## 移动端

| 平台 | 渠道 | 说明 |
|----------|---------|--------|
| **Android** | Google Play（`com.openselfhosting.openkey`，上架后）· 从 `build_all/` 侧载 APK/AAB | 上架后搜索 OpenSelfHosting 的 **OpenKey** |
| **iOS** | App Store（上架后）· Xcode 归档 | 审核通过后搜索 OpenSelfHosting 的 **OpenKey** |

启用 **设置 → 自动填充**，以便系统级填充密码与通行密钥。

## 桌面端

| 平台 | 渠道 | 产物 / 说明 |
|----------|---------|------------------|
| **macOS** | Mac App Store（上架后）· `.dmg` / `.zip` | 打包产物在 `build_all/macos/`（Apple Silicon 与 Intel） |
| **Windows** | Microsoft Store（上架后）· Inno Setup · 便携 `.zip` | 商店包为 `.msix`；侧载可用 `*-setup.exe`（需 Inno Setup） |
| **Linux** | Flathub · Snap（上架后）· `.tar.gz` / `.deb` | Flatpak / Snap id：`com.openselfhosting.openkey`。暂无 AppImage — 使用 `build_all/` 便携包或 `.deb` |

桌面自动填充会注册 [浏览器扩展](./extension) 使用的 **原生消息主机**。从浏览器填充时请保持保险库已解锁。

### 自行构建桌面版

```bash
cd openkey_app
./build_all.sh --desktop    # 或 --macos / 主机相关参数
```

商店打包说明见 `openkey_app/packaging/README.md`（Play、App Store、Microsoft Store、Snap、Flathub）。

## 浏览器扩展

Chrome / Edge / Firefox（MV3）。尚未上架公共扩展商店 — 加载未打包构建：

```bash
cd openkey_extension
npm install && npm run build
```

然后在 `chrome://extensions` 或 Firefox `about:debugging` 加载 `dist/`。完整步骤：[浏览器扩展](./extension)。

## 服务器与 CLI

| 包 | 安装 |
|---------|---------|
| **服务器** | `openkey_server` 的 Docker Compose — [服务器安装](./server) |
| **CLI** | Node 20+，`openkey_cli`（`npm link`）— [CLI](./cli) |

本地快速栈：[快速开始](./quick-start)。

## 安装之后

1. 用强主密码创建或解锁保险库（[使用应用](./app)）。
2. 可选：在 **设置 → 数据 → 自托管服务器** 填入 API URL 并同步。
3. 可选（Pro）：用 **Nearby** 在局域网同步保险库 — [Nearby 指南](./nearby)。
4. 桌面端：通过自动填充 / 浏览器扩展设置连接[扩展](./extension)。

下一步：[使用应用](./app) · [Nearby](./nearby) · [浏览器扩展](./extension) · [服务器安装](./server)
