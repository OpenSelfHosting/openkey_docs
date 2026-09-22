---
title: 面向开发者密钥的 CLI
description: OpenKey CLI 专业概览 — 离线生成、原生桌面桥接、发现、密钥类型与可选零知识服务器同步。
date: 2026-08-01
cover: /blog/covers/cli-for-developers.png
---

# 面向开发者密钥的 CLI

SSH 密钥、`.env` 文件与 API 令牌散落在笔记本与 CI 代理上。OpenKey **CLI**（`openkey`）是同一零知识保险库的终端界面：离线生成密码，将本地发现导入已解锁的 **桌面** 应用，管理类型化密钥，并可选择从自托管服务器拉取密文。

本文是导览。完整标志级参考见 [CLI 指南](/zh/guide/cli)。

## 三种运行模式

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI 架构概览" class="ok-diagram" width="920" height="420" />

| 模式 | 要求 | 角色 |
|------|-------------|------|
| 离线 | 无 | `openkey gen` — 无需网络与解锁保险库即可生成密码学上有用的密码 |
| 原生桥接 | 本机桌面应用已解锁 | 密钥、发现导入、在密钥与登录项间搜索的默认路径 |
| CLI 会话 | `login` + `eval $(openkey unlock)` | 桌面应用不可用时的本地密文缓存与 `sync` |

CLI 在桥接可用时优先使用桥接。否则使用 `OPENKEY_SESSION`。桥接仅本地，保险库锁定时拒绝工作 — 与桌面会话相同的信任边界。

<img src="/guide/cli-backend-choice.svg" alt="保险库命令如何选择原生桥接或会话模式" class="ok-diagram" width="920" height="360" />

## 离线生成

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

调整长度与字符类（`--no-upper`、`--no-lower`、`--no-digits`、`--no-symbols`），或用 `-c` 直接复制到剪贴板。无需应用解锁或服务器注册。

## 发现导入到设备组

<img src="/guide/cli-discover-flow.svg" alt="从扫描到保存保险库的发现流程" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

发现可扫描：

- `~/.ssh` 下的私钥（存在时含同级 `.pub` 文件）
- 知名且类似密钥的进程环境变量
- AWS 共享凭据
- 一个或多个项目根目录下的 `.env` / `.env.*` 树

结果在保险库 Secrets 区域下按 **设备** 标签分组（默认主机名）。已导入的值按内容指纹跳过。用 `--dry-run` 预览；`-y` 无提示导入。保存仍需要桌面应用解锁（或 CLI 会话）。

## 日常密钥操作

密钥为类型化记录：`apiToken`（默认）、`sshKey`、`envSnippet` 或 `other`。

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

列表与搜索会 **掩码** 值。仅在需要明文时使用 `get` / `copy`。查询匹配名称、主机或 UUID 前缀；模糊匹配会列出候选而非猜测。

要一起搜索 **密钥与登录项**：

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## 可选自托管同步

<img src="/guide/cli-server-flow.svg" alt="登录、密文拉取与 OPENKEY_SESSION 解锁流程" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

登录使用 Argon2id 派生 `auth_hash`，从不以标志发送主密码，仅在 CLI 缓存中存储包装密钥与密文，并从 `unlock` 打印 `OPENKEY_SESSION` 导出（默认有效期 15 分钟；用 `openkey config set-lock` 更改）。CI 可设置 `OPENKEY_PASSWORD`；个人机器请优先使用交互式提示。

随时检查状态：

```bash
openkey status
openkey config show
```

## 为何属于密码管理器

开发者在终端中工作。写入与应用相同加密 Secrets 区域 — 以及相同仅密文同步 API — 的 CLI，使工作流与威胁模型一致。你无需为脚本维护第二套密钥存储。

## 安装

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

需要 Node.js 20+。完整命令参考、环境变量、配置路径与安全说明：[CLI 指南](/zh/guide/cli)。
