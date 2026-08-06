# 快速开始

运行开源同步服务器，然后连接 应用、扩展或 CLI。

## 服务器

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API：`http://localhost:8000` — OpenAPI 在 `/docs`，健康检查在 `/health`。

## 应用

从您平台的官方商店或下载渠道安装 **OpenKey** 应用。在 **设置 → 数据 → 自托管服务器** 中设置 `http://localhost:8000`（或您的 HTTPS URL），然后注册或登录并同步。

请参阅 [使用应用](./app)。

## 浏览器扩展

```bash
cd openkey_extension
npm install
npm run build
```

以未打包扩展加载 `dist/`。在选项中设置服务器 URL，使用邮箱 + 主密码解锁。在桌面上启用应用中的 Autofill 以注册原生消息主机。

## CLI

```bash
cd openkey_cli
npm install
npm run build
npm link   # optional

openkey gen -l 24
openkey discover --dry-run
openkey discover -y
```

本地密钥发现需保持桌面应用已解锁。可选的服务器同步：

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

下一步：阅读 [安全](./security)、[服务器设置](./server)、[使用应用](./app) 和 [CLI](./cli)。
