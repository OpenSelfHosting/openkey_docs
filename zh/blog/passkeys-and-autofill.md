---
title: 浏览器中的 passkeys 与自动填充
description: OpenKey 如何在浏览器与系统凭据提供方中填充登录项与 passkeys — 同时保持保险库数据在客户端加密。
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.svg
---

# 浏览器中的 passkeys 与自动填充

手机上的保险库只是故事的一半。日常登录发生在 Chrome、Firefox 与操作系统凭据界面 — 因此 OpenKey 提供 **MV3** 浏览器扩展，并在移动与桌面上支持系统 Autofill / Credential Provider。

## 扩展做什么

- 针对你的保险库解锁（本地桥接到桌面应用，和/或自托管同步）
- 在网页表单上建议匹配的登录项
- 在站点提供时支持 WebAuthn / passkey 流程
- 同步时使用与应用 **相同** 的服务器 URL

从 `openkey_extension` 构建并加载：

```bash
cd openkey_extension
npm install
npm run build
```

将 `dist/` 文件夹作为未打包扩展加载。在桌面上，解锁 OpenKey 应用并注册原生消息主机，或在独立模式下针对服务器解锁扩展。若使用同步，在选项中设置服务器 URL，然后用邮箱与主密码解锁。

## 还有系统 Autofill

在应用中，在 **设置 → 安全** 将 OpenKey 设为系统密码与 passkey 提供方。该路径覆盖与操作系统凭据存储通信的应用与浏览器 — 与扩展互补，并非在每个平台上替代扩展。

## 仍是零知识

自动填充在客户端解锁后运行。扩展或 OS 提供方仅解密所需内容。同步 — 若启用 — 仍交换不透明密文。被攻破的同步数据库不会变成已填充密码的转储。不可信网页应仅通过有意的自动填充中介接收密钥。

## 与整套栈配合

| 客户端 | 角色 |
|--------|------|
| 应用 | 手机与桌面日常保险库；系统 Autofill / passkeys |
| 扩展 | Chrome / Firefox 中的自动填充与 passkeys |
| CLI | 开发者密钥与生成 |
| 服务器 | 可选密文同步 |

## 了解更多

- [使用应用](/zh/guide/app) — Autofill、浏览器与备份
- [软件包](/zh/guide/packages) — 扩展设置
- [服务器设置](/zh/guide/server) — 将扩展连接到你的主机
- [安全](/zh/guide/security) — 扩展与原生消息的信任边界
