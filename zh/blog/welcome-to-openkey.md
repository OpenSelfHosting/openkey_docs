---
title: 欢迎使用 OpenKey
description: 我们为何构建一款仅存储密文的自托管密码管理器 — 以及应用、服务器、扩展与 CLI 各自提供什么。
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.svg
---

# 欢迎使用 OpenKey

大多数密码管理器要求你信任一个你无法控制的云。OpenKey 走另一条路：保险库在设备上保持加密，可选的同步服务器仅存储 **密文**，主密码绝不会离开客户端。

## 仅密文

客户端在数据离开设备前加密保险库内容。同步 API — 若你使用的话 — 存储不透明 blob。集合名称、条目载荷、附件、组织名称和共享数据在静态存储时均为密文。攻破数据库只能得到盐、KDF 参数、包装密钥和 blob — 而非可读的登录信息。

## 目前已提供

| 组件 | 角色 |
|------|------|
| **应用** | Android、iOS、macOS、Linux 和 Windows 上的日常保险库 — 登录项、卡片、加密钱包、开发者密钥、组织与共享 |
| **服务器** | 可自托管的 FastAPI + PostgreSQL 零知识同步 API |
| **扩展** | 适用于 Chrome 和 Firefox 的 MV3 自动填充与 passkeys |
| **CLI** | 离线密码生成、本地密钥发现与可选同步 |

你也可以通过 **Nearby**（Pro）在同一 Wi‑Fi 上跨设备同步保险库 — 该局域网路径无需服务器。服务器同步与 Nearby 均只传输密文（按 revision 的最后写入获胜）。

## 开始使用

- [快速开始](/zh/guide/quick-start) — 在本地运行整套栈
- [使用应用](/zh/guide/app) — 手机与桌面上的保险库工作流
- [安全](/zh/guide/security) — 零知识模型与信任边界
- [服务器设置](/zh/guide/server) — 安装并连接你自己的同步主机

博客其他文章：[零知识同步](/zh/blog/zero-knowledge-sync)、[无需服务器的 Nearby](/zh/blog/nearby-without-a-server)、[自托管](/zh/blog/self-host-your-vault)、[passkeys 与自动填充](/zh/blog/passkeys-and-autofill)，以及[开发者 CLI](/zh/blog/cli-for-developers)。代码位于 [GitHub 上的 OpenSelfHosting](https://github.com/OpenSelfHosting)。
