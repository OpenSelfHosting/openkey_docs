---
title: 为何自托管你的密码保险库
description: 掌控、隐私，以及仅存储密文的同步服务器 — 如何用 Docker 在你自己的硬件上运行 OpenKey。
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.png
---

# 为何自托管你的密码保险库

密码管理器处于你数字生活的中心。当保险库只存在于他人的云上时，宕机、政策变更与泄露都会成为 *你的* 风险。自托管翻转默认：你选择机器、备份以及谁能访问 API。

## 你掌控什么

| 你拥有 | 服务器永远得不到 |
|---------|------------------------|
| 密文存储位置 | 主密码 |
| 升级与备份何时执行 | 明文保险库密钥 |
| 哪些客户端可连接（`CORS_ORIGINS`、HTTPS） | 可读的条目名称或密码 |
| 是否启用同步 | 解密后的附件或共享 |

OpenKey 应用可在离线状态下使用本地加密数据库。需要多设备同步时，在 **设置 → 数据 → 自托管服务器** 指向你的实例 — 零知识规则相同。建议至少保留一份 **加密本地备份**；服务器无法恢复遗忘的主密码。

## 一种实用形态

许多人从家庭 NAS 或小型 VPS 上的 Docker 开始：

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

在前面放置 TLS（Caddy、Traefik 或你的反向代理），设置足够长且唯一的 `JWT_SECRET`，并将 `CORS_ORIGINS` 限制为你的应用与扩展来源 — 切勿使用 `*`。然后在首台设备上 **注册**，其余设备 **登录**，需要显式拉取/推送时使用 **立即同步**。

## 无需服务器的局域网

若只需同一 Wi‑Fi 上的设备，**Nearby** 保险库同步（Pro）可在局域网配对并链接保险库，无需 PostgreSQL。可将其用于便利；灾难恢复仍请保留离线备份。

## 适合谁

- 想要同步但不想用 SaaS 保险库的个人用户
- 需要共享集合但将加密保留在客户端的团队
- 已在运行 PostgreSQL 且熟悉 Compose 的开发者

不必自托管也能本地使用 OpenKey。当你想要 **自己的** 同步平面 — 且仅密文存储为硬性规则 — 时再自托管。

## 下一步

- [服务器设置](/zh/guide/server) — 安装、配置并连接客户端
- [使用应用](/zh/guide/app) — 保险库工作流、Nearby、导入/导出
- [安全](/zh/guide/security) — 加固清单与威胁模型
- [概览](/zh/guide/overview) — 软件包与零知识模型
