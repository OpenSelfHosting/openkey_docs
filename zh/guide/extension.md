# 浏览器扩展

适用于 **Chrome**、**Edge**、**Brave** 和 **Firefox** 的 MV3 扩展。可对[自托管服务器](./server)解锁（独立模式），或通过已解锁的 **桌面应用**（原生消息）填充。

<img src="/guide/extension-unlock-modes.svg" alt="Two unlock modes: standalone sync with the self-hosted server, or desktop app bridge via native messaging without a separate extension vault unlock" class="ok-diagram" width="920" height="400" />

主机名：`com.openselfhosting.openkey`

## 功能

1. **独立保险库** — 用邮箱 + 主密码解锁；从服务器同步密文
2. **原生桥接** — 桌面 OpenKey 已解锁时，通过原生消息填充与保存
3. **自动填充** — 页面浮层、上下文菜单与键盘快捷键（登录与支付卡）
4. **保存 / 更新** — 从页面捕获新登录写入保险库
5. **通行密钥** — 拦截 WebAuthn `create` / `get`；存储 ES256 凭证（扩展已解锁）
6. **卡片、加密货币与密钥** — 浏览并填充/复制保留区域
7. **附件** — 列出并下载登录项的解密附件（独立模式）
8. **共享与组织** — 列出/接受/撤销共享与组织邀请（独立模式）

### 键盘快捷键

| 操作 | Windows / Linux | macOS |
|--------|-----------------|-------|
| 用 OpenKey 填充登录 | `Ctrl+Shift+L` | `⌘⇧L` |

若快捷键被其他扩展占用，可在浏览器的扩展快捷键设置中确认或重新映射。

## 安装（未打包）

商店列表可能尚未发布。本地构建并加载：

```bash
cd openkey_extension
npm install
npm run build
```

- **Chrome / Edge / Brave：** `chrome://extensions` → 开发者模式 → **加载已解压的扩展程序** → 选择 `dist/`
- **Firefox：** `about:debugging` → 此 Firefox → **临时加载附加组件** → 选择 `dist/manifest.json`

从弹窗或选项页复制扩展 ID — 在 Chromium 上连接桌面桥接时需要。

## 权限

扩展使用 `<all_urls>` 主机 / 内容脚本匹配，以便在你访问的站点上自动填充、捕获登录并拦截通行密钥（固定白名单无法覆盖开放网络）。密文同步与解锁留在本机或你的[自托管服务器](./server)；OpenKey 不会把页面 HTML 外传到厂商云。若希望填充而不单独解锁扩展保险库，请优先 **使用桌面应用**。

## 解锁模式

### 自托管服务器

1. 在弹窗或选项中设置 **自托管服务器 URL**。
2. **创建账户**（注册）或 **解锁**（prelogin + 使用与应用相同的邮箱和主密码登录）。
3. 密文通过 `POST /sync` 同步。主密码永不离开客户端。

### 桌面应用桥接

1. 解锁 OpenKey 桌面应用。
2. 启用自动填充 / 按下列平台步骤连接扩展。
3. 在扩展中选择 **使用桌面应用**。

填充与保存走已解锁的应用 — 这些流程无需单独解锁扩展保险库。

可选：应用中 **设置 → 浏览器扩展 → 复制离线保险库链接**，用于气隙环境下的引导。

## 连接原生消息

### Windows

打开 **设置 → 自动填充** 会在以下位置注册 `openkey_native_host.exe`：

`HKCU\Software\...\NativeMessagingHosts\com.openselfhosting.openkey`

对 Chromium，将未打包扩展 ID 写入：

`%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt`

然后再次打开自动填充以重新生成主机清单。Firefox 自动使用 `openkey@openselfhosting.local`。

保持保险库解锁（回环 TCP）。

### macOS

解锁时，OpenKey 安装 `openkey_native_host.py`，并写入 Chrome / Chromium / Edge / Brave / Firefox 的 NativeMessagingHosts 目录。

1. 加载未打包扩展并复制其 ID。
2. 应用：**设置 → 浏览器扩展** → 粘贴 ID → **连接扩展**。
3. 保持保险库解锁 → 扩展：**使用桌面应用**。

需要 `PATH` 上有 **Python 3**。

### Linux

**设置 → 自动填充** 会在 `~/.config/google-chrome/`、Chromium、Edge 与 `~/.mozilla/native-messaging-hosts/` 写入主机清单。

Chromium 扩展 ID 文件：

`~/.local/share/OpenKey/chrome_extension_id.txt`

然后再次点按自动填充。Firefox 使用 `openkey@openselfhosting.local`。

桥接套接字：`$XDG_RUNTIME_DIR/openkey-native.sock`（保持保险库解锁）。

## 保存捕获的登录

登录提交（或登录按钮 / Enter）后，页内横幅提供 **保存** 或 **更新**：

1. **原生桥接** — 在已解锁桌面应用上 `createEntry` / `updateEntry`
2. **独立模式** — 本地加密并通过同步推送密文

相同主机 + 用户名 + 密码会被忽略；密码变更会提示更新。

## 通行密钥

扩展解锁后，OpenKey 可处理站点上的 WebAuthn。页内对话框确认；选择 **使用浏览器** 可回退到平台认证器。

解锁后冒烟测试：[webauthn.io](https://webauthn.io) 或在 `openkey_extension` 中运行 `npx tsx src/passkey/smoke.test.ts`。

## 相关

- [下载与安装](./download)
- [使用应用](./app) — 自动填充与浏览器扩展设置
- [服务器安装](./server)
- [安全](./security) — 扩展信任边界
