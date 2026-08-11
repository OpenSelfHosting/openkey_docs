# 隐私政策

**最后更新：** 2026 年 8 月 6 日  
**产品：** OpenKey (`com.openselfhosting.openkey`)  
**发布者：** OpenSelfHosting  
**联系：** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · 安全：[security@openselfhosting.com](mailto:security@openselfhosting.com)

本隐私政策说明 **OpenKey** 移动与桌面应用如何处理信息。OpenKey 设计为**零知识**密码管理器：保险库密钥在离开设备前于本地加密。

相关阅读：[安全](/zh/guide/security) · [服务条款](/zh/terms)

## 摘要

| 主题 | 做法 |
|-------|----------|
| 主密码 | 绝不会以明文离开您的设备 |
| 保险库内容 | 在设备上加密（AES-256-GCM）；可选同步仅发送**密文** |
| 我们的云 | OpenKey **不**运营强制性的厂商密码云保险库 |
| 自托管服务器 | 若您连接一台，由**您**（或您的组织）运营并控制该数据 |
| 商店计费 | Pro 购买通过 Apple / Google / Microsoft 商店计费（在可用处） |

## 适用范围

本政策适用于官方 OpenKey **应用**（Android、iOS、macOS、Windows、Linux 及同一产品的 Web 构建）。独立软件包（自托管服务器、浏览器扩展、CLI、文档站）遵循相同的零知识原则；自托管服务器运营者为其该实例的运营数据控制者（见下文）。

## 我们不收集的信息

OpenSelfHosting **不会**收到您的：

- 主密码
- 明文保险库密钥
- 解密后的登录项、备注、TOTP 密钥、支付卡、加密钱包数据、开发者密钥或附件内容
- 您访问网站的完整页面 HTML（浏览器扩展不会将页面外泄至厂商云）

我们不出售个人数据。

## 在您的设备上处理的信息

OpenKey 在您的设备上**本地**存储并处理以下内容（解锁设置后静态加密）：

- 保险库数据库（集合、条目、附件元数据/ blob，锁定/同步时为密文）
- 应用设置（外观、语言、自动填充偏好、您输入的服务器 URL、Nearby 偏好）
- 可选的生物识别封装解锁材料（在可用时由操作系统安全区域 / 密钥库处理）
- 为您配置的**服务器**缓存的同步令牌（该主机的访问 JWT / 刷新材料由应用存储）

删除应用或擦除设备会移除本地数据，具体取决于您控制的系统备份。

## 可选的自托管同步服务器

若您启用 **设置 → 数据 → 自托管服务器**，应用会向**您的** API（或您选择的 API）发送：

- 电子邮件（账户标识符）
- 客户端派生的 `auth_hash`（非主密码）
- 盐值与 KDF 参数
- 封装（加密）的保险库密钥，以及保险库条目、附件、组织和共享的不透明密文

OpenKey 项目的参考服务器设计为仅存储**密文**。运行该服务器的一方（您、您的公司或您信任的主机）可看到电子邮件、密文大小和时间戳等元数据，并可删除或扣留数据——但按设计无法解密保险库内容。见[安全](/zh/guide/security)。

## Nearby 局域网同步（Pro）

Nearby 在本地网络上配对设备，在**链接保险库**后，在这些设备之间同步保险库密文。配对与保险库密钥共享发生在您选择的设备之间的局域网上。OpenSelfHosting 不会收到 Nearby 流量。

## 可选的密码健康检查（Have I Been Pwned）

若您启用可选的泄露密码检查，OpenKey 可能仅向 Have I Been Pwned 范围 API 发送 **SHA-1 哈希前缀**（k-匿名性）。您的密码本身绝不会上传。您可保持此功能关闭。

## 自动填充、通行密钥与浏览器扩展

- **系统自动填充 / 凭证提供程序**仅通过您发起或批准的操作系统中介填充流程与应用和网站共享凭证。
- **浏览器扩展**可针对您的服务器解锁，或通过已解锁的桌面应用填充（原生消息）。填充与保存均为有意的用户操作。见[浏览器扩展](/zh/guide/extension)。

## 购买与订阅（OpenKey Pro）

在通过应用商店销售 Pro 的地方，付款处理、收据及相关账户数据由 **Apple、Google 或 Microsoft** 按其政策处理。OpenKey 可能收到解锁 Pro 功能所需的商店权益 / 购买状态。我们不会从那些商店收到您的完整支付卡号。

Nearby 对等方之间的 **LAN Pro** 证明在某些桌面平台上仅为本地便利——并非与 OpenSelfHosting 的云计费账户。

## 诊断与支持

OpenKey 不包含会上传保险库内容的强制性第三方分析 SDK。若您发送支持邮件（[openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)）或使用 Telegram 社区频道，您可自行选择包含的内容（例如应用版本）。请勿在明文邮件中发送主密码或保险库导出文件。

## 儿童隐私

OpenKey 不面向 13 岁以下儿童（或您所在司法管辖区的最低年龄要求）。若您低于该年龄，请勿使用本应用。

## 跨境处理

处理发生在您的设备上，以及若您配置同步，则发生在您选择的服务器主机上。若您联系我们，消息可能在我们邮件或支持工具运营的区域内处理。

## 保留

- **设备上：** 直至您删除保险库、卸载应用或擦除设备 / 备份。
- **您的同步服务器上：** 直至您删除服务器账户或运营者删除数据；墓碑记录可能保留至对等方同步完成。
- **支持邮件：** 按响应需要及合法安全/法律目的保留。

## 您的选择

- 完全离线使用 OpenKey，无需服务器
- 选择或拒绝 Nearby 配对
- 禁用可选的 HIBP 检查
- 导出或删除本地数据（导出 / 备份可能需要 Pro）
- 通过已认证的删除流程删除服务器账户（移除服务器密文；本地副本保留直至您擦除）
- 通过商店的订阅管理撤销商店订阅

## 变更

我们可能随产品变化更新本政策。「最后更新」日期将变更；重大变更也可能在[更新日志](/zh/guide/changelog)或应用内「关于」链接中注明。

## 联系

- 产品 / 支持：[openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- 安全报告：[security@openselfhosting.com](mailto:security@openselfhosting.com) — 见[报告漏洞](/zh/guide/security#reporting-vulnerabilities)
- 组织：[OpenSelfHosting](https://github.com/OpenSelfHosting) · 产品：[openkey.openselfhosting.com](https://openkey.openselfhosting.com) · 公司：[openselfhosting.com](https://openselfhosting.com)

下一步：[服务条款](/zh/terms) · [安全](/zh/guide/security) · [使用应用](/zh/guide/app)
