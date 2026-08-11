---
title: OpenKey Pro — 解锁什么（与不解锁什么）
description: 免费与 Pro 限额、Nearby 与 LAN Pro、商店 IAP 与桌面版，以及各平台仍免费的内容。
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — 解锁什么（与不解锁什么）

OpenKey 核心保险库可离线使用，无需订阅。**Pro** 提高限额并解锁跨设备同步、导出或与团队共享时重要的额外功能。以下是实用划分 — 以及常令人困惑的 LAN Pro 说明。

## 仍免费的内容

- 本地加密保险库（有免费层限额 — 见下文）
- 自托管[服务器同步](/zh/guide/server)（仅密文）
- 系统 Autofill / passkeys（在操作系统允许处）
- 指向已解锁桌面应用的[浏览器扩展](/zh/guide/extension)桥接
- 从 Bitwarden、浏览器 CSV、KeePass 等 **导入**

免费层限额（强制执行 Pro 的移动/桌面构建）：**50** 条登录项；集合、支付卡、加密钱包与开发者密钥各 **3** 个。

## Pro 解锁内容

| 能力 | 说明 |
|------------|--------|
| 不限条目 / 集合 / 卡片 / 加密资产 / 密钥 | 移除免费上限 |
| **导出** + 加密 **`.okbak`** 备份 | 将导出视为机密 |
| **Nearby** 局域网保险库同步 | 二维码配对、链接保险库、发送条目 — [指南](/zh/guide/nearby) |
| 组织与共享 | 同一自托管服务器 |
| 条目附件 | 各约 20 MB，服务器上为密文 |
| 自定义应用图标 | 在平台支持处 |

完整矩阵：[定价](/zh/pricing) · [使用应用 → 免费与 OpenKey Pro](/zh/guide/app#免费与-openkey-pro)。

## LAN Pro 不是商店收据

在 **没有** 商店内购的平台（通常是 Windows / Linux）上，Pro 对等方可通过 Nearby 共享 **LAN Pro** 证明，使另一台设备在局域网上解锁 Pro 限额。

- 仅作便利 — **不是** 购买的密码学证明
- Android、iOS 和 macOS **忽略** LAN Pro；请在该商店购买或恢复 Pro
- 取消配对即停止证明

## Web 构建

**Web 构建暂不强制 Pro。** 移动与桌面商店/桌面构建会强制。若在浏览器中测试，请相应规划。

## 深入了解

- [定价](/zh/pricing) — 方案、购买、取消
- [无需服务器的 Nearby](/zh/blog/nearby-without-a-server)
- [导入与导出](/zh/guide/import-export)
- [共享与组织](/zh/guide/sharing)
- [常见问题](/zh/guide/faq)
- [安全](/zh/guide/security)
