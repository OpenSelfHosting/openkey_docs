# 软件包

可自托管和构建的软件包。**OpenKey 移动/桌面应用** 见 [使用应用](./app)。

| 路径 | 说明 |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | FastAPI 零知识同步 API + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | MV3 浏览器扩展（Chrome / Firefox） |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | 开发者 CLI — 密钥、密码生成、同步 |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | 本站点 — 产品页面与文档 |

 应用的日常使用请参阅 [使用应用](./app)。

## 服务器亮点

- 仅存储密文
- JWT 访问令牌 + 轮换的不透明刷新令牌
- PostgreSQL 16 上的 Alembic 迁移
- 认证速率限制与严格 CORS

## 扩展亮点

- 独立保险库解锁 + 同步，或桥接至已解锁的桌面应用
- Autofill 覆盖层、保存/更新提示、passkeys
- 卡片、加密钱包与开发者密钥

## CLI 亮点

- 离线密码生成
- 在已解锁的桌面应用中发现 SSH 密钥、`.env` 文件和 API 令牌
- 针对您的服务器可选 login / unlock / sync

[OpenSelfHosting](https://github.com/OpenSelfHosting) 下发布的远程仓库可能单独分发软件包；本站描述上述开源包。
