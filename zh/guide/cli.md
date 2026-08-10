# CLI

OpenKey CLI（`openkey`）面向在 OpenKey 保险库中保存机密、API 令牌、SSH 密钥和 `.env` 内容的开发者。它可**完全离线**生成密码，通过本地原生桥接与**已解锁的 OpenKey 桌面应用**通信，并可选择向**自托管同步服务器**认证以拉取密文并建立短期 CLI 会话。

需要 **Node.js 20+**。

## 架构

下图展示各组件如何通信。密码生成保持离线。保险库命令优先使用已解锁的桌面应用。服务器同步为可选。

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI 架构：CLI 通过原生桥接与桌面应用通信，在本机扫描以发现，并可选择性与自托管服务器同步密文" class="ok-diagram" width="920" height="420" />

| 模式 | 适用场景 | 能力 |
|------|----------|------|
| **离线** | 始终 | `gen` — 无需应用与服务器 |
| **原生桥接** | 本机桌面应用已解锁 | 机密 CRUD、发现导入、在机密与登录项间搜索/获取/复制 |
| **CLI 会话** | 执行 `login` 后 `eval $(openkey unlock)` | 对本地密文缓存执行相同保险库操作；`sync` 从服务器拉取 |

### 保险库命令如何选择后端

<img src="/guide/cli-backend-choice.svg" alt="流程图：保险库命令检查桌面桥接，再检查 OPENKEY_SESSION，否则报错并提示解锁" class="ok-diagram" width="920" height="360" />

1. 若桌面桥接有响应 → 使用 **native** 模式（首选；无需在服务器注册）。
2. 否则若 `OPENKEY_SESSION` 已设置且有效 → 使用 **session** 模式（本地缓存 / 服务器支撑的材料）。
3. 否则 → 需要保险库的命令失败，并提示解锁应用或运行 `eval $(openkey unlock)`。

桥接**仅接受来自本机**的连接，且仅在保险库已解锁时可用。在 Unix 上，它使用已知 OpenKey 路径下的套接字（可用 `OPENKEY_NATIVE_SOCKET` 覆盖）。在 Windows 上，它使用 `%LOCALAPPDATA%\OpenKey\` 下的 localhost 端口文件（可用 `OPENKEY_NATIVE_PORT` 覆盖）。

## 安装

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

不链接时：

```bash
npx tsx src/cli.ts --help
# after build:
node dist/cli.js --help
```

验证：

```bash
openkey --version
openkey status
```

## 配置与存储

本地 CLI 状态保存在平台配置目录中（在支持时文件权限为 `600`）：

| 平台 | 路径 |
|------|------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json`（或 `$XDG_CONFIG_HOME/openkey/`） |
| Windows | `%APPDATA%\OpenKey\config.json` |

该文件可能包含：服务器 URL、邮箱、访问/刷新令牌、盐与 KDF 参数、包装的保险库密钥、会话锁定时长、服务器 revision，以及同步后的条目/集合**密文**缓存。它不以明文存储主密码。

### `config` 命令

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` 要求 URL 以 `http://` 或 `https://` 开头（末尾斜杠会被去掉）。
- 首次设置前的默认服务器 URL：`http://localhost:8000`。

## 全局选项

| 标志 | 作用 |
|------|------|
| `--json` | 在 stdout 输出可供脚本使用的 JSON |
| `--help` / `--version` | 帮助与版本 |

使用 Commander 全局选项时，将 `--json` 放在子命令之前，例如 `openkey --json status`。

## 密码生成（`gen`）

完全离线。不需要应用或服务器。

```bash
openkey gen
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c
openkey --json gen -l 20
```

| 选项 | 说明 | 默认 |
|------|------|------|
| `-l, --length <n>` | 长度（实用范围 4–64） | `20` |
| `--no-upper` | 排除大写字母 | 关闭 |
| `--no-lower` | 排除小写字母 | 关闭 |
| `--no-digits` | 排除数字 | 关闭 |
| `--no-symbols` | 排除符号 | 关闭 |
| `-a, --avoid-ambiguous` | 避免易混淆字符 `Il1O0o` | 关闭 |
| `-c, --copy` | 复制到剪贴板而非打印 | 关闭 |

使用 `-c` 时，人类可读模式会打印确认信息；JSON 模式返回 `{ "copied": true, "length": N }`。不使用 `-c` 时，密码会被打印（JSON 模式下为 `{ "password": "..." }`）。

## 状态与清理

```bash
openkey status
openkey forget
```

**`status`** 报告服务器 URL、邮箱、登录状态、桥接可用性、解锁模式（`native` / `session`）、剩余会话时间及缓存条目数量。

**`forget`** 会清除本地 CLI 配置与密文缓存。不会删除桌面应用保险库内的机密。若使用服务器模式，在 `forget` 后需重新执行 `config set-server` / `login`。

## 开发者机密（`secret`）

机密保存在保险库预留的 **Secrets** 区域（`__dev_secrets__`），按**设备**（机器标签；默认为主机名）分组。命令需要桌面应用已解锁**或**有效的 `OPENKEY_SESSION`。

### 类型

| 类型 | 典型用途 | 备注 |
|------|----------|------|
| `apiToken` | PAT、API 密钥 | 默认 |
| `sshKey` | 私钥 | 建议使用 `--file` / `--public-key-file` |
| `envSnippet` | 完整 `.env` 内容 | 建议使用 `--file` |
| `other` | 通用 | — |

别名如 `ssh`、`api`、`token`、`env`、`.env` 会规范化为上述类型。

### `secret add`

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy key" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub -H git.example.com -u git
openkey secret add -n "acme .env" -k envSnippet -f ./apps/api/.env -d laptop
```

| 选项 | 说明 |
|------|------|
| `-n, --name` | 显示名称（**必填**） |
| `-k, --kind` | `sshKey` \| `apiToken` \| `envSnippet` \| `other` |
| `-s, --secret` | 内联机密值（`-` 从 stdin 读取） |
| `-f, --file` | 从文件读取机密内容 |
| `--stdin` | 从 stdin 读取机密（优于在 argv 中放令牌） |
| `-u, --username` | 可选用户名 |
| `-H, --host` | 可选主机 |
| `-d, --device` | 设备集合标签（默认：主机名） |
| `--public-key` / `--public-key-file` | SSH 公钥 |
| `--passphrase` | 密钥口令 |
| `--notes` | 自由格式备注 |

需提供 `--secret`、`--file` 或 `--stdin`（非空）。创建的记录会返回 UUID。

```bash
printf '%s' "$TOKEN" | openkey secret add -n "CI token" --stdin
```

### `secret list` / `get` / `copy` / `rm` / `update` / `export` / `devices`

```bash
openkey secret list
openkey secret list -d laptop -k apiToken
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret update "GitHub PAT" --secret ghp_new...
printf '%s' "$TOKEN" | openkey secret update "GitHub PAT" --stdin
openkey secret export -d laptop -o .env.local
openkey secret export --format exports   # for eval
openkey secret devices
openkey secret rm "old token" -y
```

- **list** — 表格显示 UUID 前缀、名称、类型、设备、**掩码**后的机密。可选 `-d/--device` 与 `-k/--kind` 筛选。
- **get** / **copy** / **rm** / **update** — 按**名称**、**主机**或 **UUID 前缀**匹配。多个子串匹配时，**精确**名称/标题、主机或唯一 UUID 前缀（≥4 字符）优先；否则命令报错并列出候选。
- **update** — 仅修补你传入的标志（`--name`、`--secret`/`--file`/`--stdin`、`--kind`、`--device` 等）。需要桌面桥接的 `updateSecret` 处理器（含此版本的 OpenKey 应用）或 CLI 会话。
- **export** — 将机密写为 dotenv（`KEY=value`；`envSnippet` 内容内联）或 `--format exports` shell 行。`-o` 在支持时写入权限为 `600` 的文件。
- **devices** — 列出设备集合标签及数量。
- **get** 打印明文（`--json` 模式下为完整 JSON 对象）。
- **copy** 将明文写入剪贴板。
- **rm** 除非传入 `-y` / `--yes` 否则会提示确认。

## 将机密注入 shell（`env` / `run`）

```bash
# Print export lines for eval (NAME or NAME=query)
eval $(openkey env DATABASE_URL)
eval $(openkey env DB=DATABASE_URL GH="GitHub PAT")

# Or run a child process with secrets in its environment
openkey run -e DATABASE_URL -e GH="GitHub PAT" -- npm start
```

| 形式 | 含义 |
|------|------|
| `NAME` | 环境变量 `NAME`；按该名称查找保险库项 |
| `NAME=query` | 环境变量 `NAME`；按 `query`（名称 / 主机 / UUID）查找 |

`env` 的 `--json` 返回包含 `env`、`query`、`name`、`uuid` 和 `value` 的对象。`--raw` 打印单个明文值（恰好一个绑定）。

## 发现（`discover`）

扫描本机并将**新**机密导入设备组。与保险库中已有值去重（按类型 + 名称 + 内容指纹）。

<img src="/guide/cli-discover-flow.svg" alt="发现流程：扫描本地来源，预览掩码值，按指纹去重，然后保存到保险库设备组" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme -p ~/src/labs --depth 3
openkey discover --no-aws --no-env-vars
```

| 选项 | 说明 | 默认 |
|------|------|------|
| `-d, --device` | 设备集合名称 | 主机名 |
| `-p, --path <dir>` | 用于 `.env` 遍历的项目根目录（可重复） | `cwd` |
| `--depth <n>` | `.env` 的最大目录深度 | `4` |
| `--no-ssh` | 跳过 `~/.ssh` 私钥 | 扫描开启 |
| `--no-env-files` | 跳过 `.env` / `.env.*` 文件 | 扫描开启 |
| `--no-env-vars` | 跳过进程环境变量 | 扫描开启 |
| `--no-aws` | 跳过 `~/.aws/credentials` | 扫描开启 |
| `--no-gh` | 跳过 GitHub CLI `hosts.yml` 令牌 | 扫描开启 |
| `--no-docker` | 跳过 `~/.docker/config.json` 注册表认证 | 扫描开启 |
| `--dry-run` | 仅列出；不保存 | 关闭 |
| `-y, --yes` | 无需交互确认即导入 | 关闭 |

### 扫描内容

- **SSH** — `~/.ssh` 下的私钥（跳过 `known_hosts`、`authorized_keys`、`config`、`.pub` 文件）；存在时附加同级 `.pub`。
- **环境变量** — 知名名称（`GITHUB_TOKEN`、`OPENAI_API_KEY`、`DATABASE_URL` 等）及匹配机密式后缀的名称；跳过 `PATH`、`HOME`、`OPENKEY_SESSION`、`OPENKEY_PASSWORD` 等。
- **AWS** — `~/.aws/credentials` 中的配置文件。
- **GitHub CLI** — `~/.config/gh/hosts.yml` 中的 `oauth_token` / `token` 条目。
- **Docker** — 从 `~/.docker/config.json` 解码的 `auths`。
- **`.env` 文件** — 从根目录遍历，跳过 `node_modules`、`.git`、`dist`、虚拟环境等；适用大小与文件数量限制。

`--dry-run` 在保险库锁定时也可用（仅列出）。保存需要桥接或会话解锁。已导入的机密会报告为已跳过。

## 跨机密与登录项搜索

这些命令搜索**开发者机密与登录条目**：

```bash
openkey search github
openkey get "GitHub"
openkey get "GitHub" --field username
openkey copy api.example.com --field totp
openkey totp "GitHub" -c
openkey logins
```

| 命令 | 输出 |
|------|------|
| `search <query>` | 掩码表格（或 JSON 预览）；显示 TOTP 可用性 |
| `get <query>` | 最佳匹配字段（`--field password\|username\|url\|totp\|notes`） |
| `copy <query>` | 将该字段复制到剪贴板（45 秒后自动清除；`--keep` 可禁用） |
| `totp <query>` | 实时 TOTP 码（`-c` 复制，`-w` 监视直至 Ctrl+C） |
| `logins` | 列出登录项及用户名 / URL / TOTP 标志 |
| `doctor` | 诊断 Node、配置权限、桥接、会话、服务器 `/health`、剪贴板 |

模糊的子串匹配优先精确名称/标题、主机或唯一 UUID 前缀；否则列出 UUID、类型与标签 — 请细化查询。若只需 Secrets 区域，请使用 `secret get` / `secret copy`。

使用 **`secret set`** 按名称 + 设备 upsert（创建或更新）。**`sync --push`** 在拉取前推送本地密文缓存。

## 可选自托管服务器

当本机没有桌面应用（例如仅通过同步在手机上访问保险库），或你需要 CLI 密文缓存时，使用此路径。

<img src="/guide/cli-server-flow.svg" alt="服务器流程：set-server、使用 auth_hash 登录、将密文拉取到本地缓存，然后 eval unlock 设置 OPENKEY_SESSION 以执行保险库命令" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

服务器安装：[安装服务器](./server)。

### 认证流程

1. **`login`** — 提示输入邮箱（或 `-e`）与主密码（或 `OPENKEY_PASSWORD`）。执行 prelogin 获取盐/KDF，用 Argon2id 派生 `auth_hash`，获取 JWT，拉取包装的保险库密钥材料，通过解包验证密码，然后**拉取**密文到本地缓存。切勿将主密码作为 CLI 标志传入。
2. **`unlock`** — 再次派生保险库密钥，在服务器可达时刷新令牌/同步，并打印用于 `OPENKEY_SESSION` 的 shell export（使用 `eval $(openkey unlock)`）。选项：`-e/--email`、`--raw`（仅令牌）。JSON 模式输出会话字段。
3. **`lock`** — 打印 `unset OPENKEY_SESSION`（或 JSON 提示），以便 `eval $(openkey lock)`。
4. **`logout`** — 清除访问/刷新令牌；保留本地密文缓存。与 `lock` 配合以清除会话环境变量。
5. **`sync`** — 需要已登录；拉取条目/集合并更新 `serverRevision`。

会话生命周期默认为 **15 分钟**（`config set-lock`）。过期会话需再次 `unlock`。

### 环境变量

| 变量 | 用途 |
|------|------|
| `OPENKEY_SESSION` | 来自 `unlock` 的短期加密会话 blob |
| `OPENKEY_PASSWORD` | 用于非交互式 `login` / `unlock` 的主密码（仅脚本/CI） |
| `OPENKEY_EMAIL` | 用于非交互式 `login` / `unlock` 的账户邮箱 |
| `OPENKEY_NATIVE_SOCKET` | 覆盖 Unix 桥接套接字路径 |
| `OPENKEY_NATIVE_PORT` | 覆盖 Windows 桥接端口 |

在个人设备上优先使用交互式密码提示。在 CI 日志中将 `OPENKEY_PASSWORD` 与会话令牌视为机密材料。

## Shell 补全

```bash
eval "$(openkey completion bash)"
eval "$(openkey completion zsh)"
openkey completion fish | source
```

## 命令参考

| 命令 | 需要保险库访问？ | 说明 |
|------|------------------|------|
| `gen` | 否 | 离线密码生成 |
| `discover` | 保存：是\* / dry-run：否 | 扫描 SSH / `.env` / 环境变量 / AWS → 设备组 |
| `secret add\|list\|get\|copy\|rm\|update\|export\|devices` | 是\* | 开发者机密 |
| `get` / `copy` / `search` / `totp` / `logins` | 是\* | 机密 + 登录项（TOTP、字段选择） |
| `doctor` | 否 | 诊断桥接 / 会话 / 服务器 |
| `env` / `run` | 是\* | 将机密导出到 shell / 子进程 |
| `completion` | 否 | Bash / zsh / fish 补全 |
| `status` | 否 | 桥接 / 会话 / 服务器状态 |
| `config set-server\|show\|set-lock` | 否 | CLI 配置 |
| `login` / `logout` | — | 可选服务器认证 |
| `unlock` / `lock` | — | 可选 CLI 会话 |
| `sync` | 需要登录 | 从服务器拉取密文 |
| `forget` | 否 | 清除本地 CLI 配置与缓存 |

\*桌面应用已解锁，**或**服务器登录后有效的 `OPENKEY_SESSION`。

## 安全模型

- 列表/搜索命令会**掩码**值；仅在需要明文时使用 `get` / `copy`。
- 同步服务器仅存储**密文**；CLI 与其他 OpenKey 客户端一样在本地派生密钥。
- 不要将主密码作为标志传入；避免记录 `OPENKEY_PASSWORD` 或 `OPENKEY_SESSION`。
- 桥接流量仅限本地，且需要保险库已解锁。
- 会话令牌会过期；在共享机器上可用 `config set-lock` 缩短生命周期。
- `forget` 清除磁盘上的 CLI 状态；若机器此后不可信，用 `logout` 轮换服务器令牌。

## 开发

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## 相关指南

- [使用应用](./app) — 桌面解锁、Secrets 区域、自动填充
- [安装服务器](./server) — 自托管同步
- [安全](./security) — Argon2id、令牌、威胁模型
- [软件包](./packages) — 仓库布局
