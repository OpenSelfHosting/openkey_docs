# 安装服务器

OpenKey Server 是可选的 **零知识同步 API**。它仅存储密文，以便您在自己的设备间同步保险库。主密码和明文保险库密钥绝不会离开客户端。

## 要求

- Docker 和 Docker Compose（推荐），**或** Python 3.12+ 与 PostgreSQL 16
- 强 `JWT_SECRET`（至少 32 字符，非占位符）

## 使用 Docker 安装

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

健康运行后：

| URL | 用途 |
|-----|---------|
| `http://localhost:8000` | API 基址 |
| `http://localhost:8000/docs` | OpenAPI 文档 |
| `http://localhost:8000/health` | 健康检查 |

模式迁移在 API 启动时自动运行（`alembic upgrade head`）。

## 重要配置

| 变量 | 说明 |
|----------|--------|
| `JWT_SECRET` | 必填。最少 32 字符；启动时拒绝占位符 |
| `DATABASE_URL` | 异步 Postgres URL（Compose 为 `db` 服务设置） |
| `CORS_ORIGINS` | 逗号分隔的来源 — **不可使用 `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | 短期访问 JWT（默认 15） |
| `REFRESH_TOKEN_EXPIRE_DAYS` | 不透明刷新令牌 TTL（默认 7，使用时轮换） |
| `AUTH_RATE_LIMIT_*` | 认证端点的每 IP 限制 |

生产环境：将 API 置于 HTTPS 之后，设置唯一 `JWT_SECRET`，并将 `CORS_ORIGINS` 限制为您的客户端。卡住了？参见[常见问题与排查](./faq)。

## 生产环境 HTTPS

仅将反向代理公开暴露。将 Postgres 与 API 保留在私有网络上（单机上 Compose 默认即可）。

**Caddy** 示例（自动 Let’s Encrypt）：

```txt
openkey.example.com {
	reverse_proxy 127.0.0.1:8000
}
```

**nginx** 示例：

```nginx
server {
	listen 443 ssl http2;
	server_name openkey.example.com;

	# ssl_certificate / ssl_certificate_key …（certbot 或您的 CA）

	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

然后在 `.env` 中：

```bash
CORS_ORIGINS=https://openkey.example.com
# 若浏览器扩展从这些来源调用 API，请添加 chrome-extension://<id> 与 moz-extension://<id>
```

将客户端指向 `https://openkey.example.com`（无需端口）。确认 `https://openkey.example.com/health`。

## 连接客户端

将每个客户端指向 **相同** 的服务器 URL（本地 Docker：`http://localhost:8000`，或您的公共 HTTPS URL）。

### OpenKey 应用（手机 / 桌面）

从[下载渠道](./download)安装 OpenKey 应用。

1. 使用主密码解锁或创建本地保险库。
2. 打开 **设置 → 数据 → 自托管服务器**。
3. 输入服务器 URL（示例：`https://openkey.example.com`）。
4. **注册**（首台设备）或 **登录**（已有此保险库账户的其他设备）。
5. 需要拉取/推送密文时点击 **立即同步**。

应用保留本地加密数据库。同步仅交换不透明密文。更多：[使用应用](./app)。

### 浏览器扩展

1. 构建并加载 `openkey_extension`（`npm install && npm run build`，然后加载 `dist/`）— 见[浏览器扩展](./extension)。
2. 打开扩展 **选项** 并设置相同的服务器 URL。
3. 使用相同邮箱 + 主密码解锁（扩展使用 `/auth/prelogin` 然后 login）。

**桌面桥接（可选）：** 解锁 OpenKey 桌面应用，启用 Autofill 以注册原生消息主机，然后在扩展中选择「使用桌面应用」。填充/保存可通过已解锁的应用进行，无需单独解锁扩展。

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

无服务器的密钥发现请参阅 [CLI](./cli)（桌面应用桥接）。

## 多设备清单

1. 安装并保护服务器一次。
2. 在首台设备上：注册 + 同步。
3. 在每台新设备上：安装客户端 → 设置相同服务器 URL → 使用相同邮箱和主密码登录 → 同步。
4. 保持定期离线备份（导出 / 本地备份）— 服务器无法恢复忘记的主密码。

## API 概览

交互式 OpenAPI：在已运行的服务器上访问 `http://localhost:8000/docs`。完整表格见 `openkey_server` 软件包 README。要点如下：

### 认证

| 方法 | 路径 | 说明 |
|--------|------|--------|
| `POST` | `/auth/register` | 首个账户 — 存储 `auth_hash`、已封装保险库密钥、salt、KDF 参数 |
| `POST` | `/auth/prelogin` | 返回 salt + KDF 参数，供客户端派生 `auth_hash` |
| `POST` | `/auth/login` | 邮箱 + `auth_hash` → 访问令牌 + 刷新令牌 |
| `POST` | `/auth/refresh` | 轮换不透明刷新令牌 |
| `POST` | `/auth/rekey` | 更改主密码之后 — 保险库密钥本身不变 |
| `POST` | `/auth/delete` | 重新证明 `auth_hash`；仅删除**服务器**密文 |

认证端点按客户端 IP 限流。刷新令牌在静态存储时哈希。

### 同步（LWW）

`POST /sync` 按每条目的 **`revision` last-write-wins** 推送/拉取密文。软删除变为**墓碑（tombstones）**，以便对等方获知移除。嵌套文件夹使用集合的 `parent_uuid`。

### 附件

仅密文。最大 **20 MB**。上传优先使用 multipart `POST /attachments`；`GET /attachments/{uuid}/content` 流式传输加密字节。批量同步仍可能携带 base64 blob 以供离线追赶。

完整 OpenAPI：[`http://localhost:8000/docs`](http://localhost:8000/docs)。

<img src="/guide/server-sync-topology.svg" alt="Sync topology: app, extension, and CLI send auth_hash and ciphertext to openkey_server (FastAPI), which stores opaque rows in PostgreSQL" class="ok-diagram" width="920" height="400" />

下一步：[下载](./download) · [使用应用](./app) · [浏览器扩展](./extension) · [常见问题](./faq) · [CLI](./cli) · [安全](./security)
