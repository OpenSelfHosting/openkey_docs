# 更新日志

本 monorepo 中 OpenKey 软件包的发行说明。应用版本遵循 `openkey_app`（`pubspec.yaml`）。文档版本跟踪本站点。

## 1.0.0 (2026)

首次公开文档版本，与应用 **1.0.0+1** 及开源软件包（`openkey_server`、`openkey_extension`、`openkey_cli`、`openkey_docs`）对齐。

### 应用

- 本地加密保险库：集合、登录、卡片、加密钱包、开发者密钥、TOTP
- 系统自动填充 / Credential Provider 与通行密钥（取决于平台）
- 自托管服务器同步（仅密文）
- 已配对设备之间的 Nearby 局域网保险库同步（**Pro**）
- 组织、邀请，以及条目/集合共享（**Pro**）
- 导入（免费）/ 导出与 `.okbak` 备份（**Pro**）
- 免费层限额：50 个条目，集合 / 卡片 / 加密资产 / 密钥各 3 个
- 面向 Play、App Store、Mac App Store、Microsoft Store、Snap、Flathub 以及桌面安装包的打包

### 服务器

- FastAPI 零知识同步 API + PostgreSQL 16
- 认证（`prelogin` / register / login / refresh / rekey / delete）、同步、附件、组织、共享
- 短期 JWT、轮换的不透明刷新令牌、认证限流、严格 CORS

### 浏览器扩展

- MV3 Chrome / Firefox：独立解锁 + 同步，或桌面原生消息桥接
- 自动填充、保存/更新、通行密钥、卡片 / 加密资产 / 密钥、共享与组织（独立模式）

### CLI

- 离线 `gen`、到已解锁桌面应用的原生桥接、`discover`、密钥 CRUD
- 可选服务器 `login` / `unlock` / `sync` 会话

### 文档站点

- VitePress 产品站点，10 种语言（阿拉伯语与乌尔都语为 RTL）
- 指南：概览、安全、快速开始、下载、服务器（含 HTTPS 反向代理）、应用、**Nearby**、扩展、CLI、共享、导入/导出、FAQ、软件包、更新日志
- 博客文章（完整 EN + AR；其他语言索引到英文）
- 首页：英雄区 + 功能 / 平台 / 工作原理 / CTA 区块

## 未发布 / 下一步

- 各渠道上架后的实际商店列表 URL
- 更长指南页的更完整翻译（超出 EN/AR；部分语言仍为 `sharing`、`import-export`、`faq`、`extension`、`download`、`changelog`、`nearby` 的占位）
- 各软件包独立远程发布带标签版本时的分条更新日志

## 版本如何对应

| 软件包 | 查看位置 |
|---------|----------------|
| 应用 | `openkey_app/pubspec.yaml` → `version` |
| 服务器 | `openkey_server` 的 Git 标签 / 镜像标签 |
| 扩展 / CLI | 各软件包中的 `package.json` |
| 文档 | 本页 + 站点部署 |

私下报告安全问题 — **security@openselfhosting.com**。参见[安全](./security)。

下一步：[下载](./download) · [Nearby](./nearby) · [常见问题](./faq) · [安全](./security)
