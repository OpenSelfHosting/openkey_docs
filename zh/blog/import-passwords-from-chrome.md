---
title: 从 Chrome 导入密码
description: 如何从 Chrome、Edge 和 Google Password Manager 导出密码，导入到另一个密码管理器，然后再安全地删除导出文件。
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# 从 Chrome 导入密码

导出是最简单的部分。危险的是之后的十分钟 — 那时一份包含你所有密码的明文 CSV 正躺在你的「下载」文件夹里。

这是完整流程：从 Chrome、Edge 或 Google Password Manager 导出；导入你的新保险库；验证；然后销毁文件。第一次请预留十五分钟。

## 先弄清你即将创建的东西

Chrome 的密码导出是一个 **明文 CSV**。任何打开它的人都拥有你的全部密码 — 没有主密码，没有加密，没有第二因素。把它当成一张印出来的家门钥匙清单。

整个过程有三条规则：

1. **绝不要用邮件发送它、用即时通讯发它，或把它上传到某个格式转换网站。** 把密码导出上传到第三方的「帮我转换这个 CSV」工具，等于交出你整个保险库。
2. **在文件所在的那台设备上做导入。** 来回搬动文件只会成倍放大你的风险敞口。
3. **导入一经验证就立刻删除导出文件** — 要真正地删，而不只是清空回收站。

## 从 Chrome 导出

Chrome 内置的管理器与 Google Password Manager（随账户同步的那个版本）走的是同一条导出路径，两者都在本文覆盖范围内。

1. 打开 `chrome://password-manager/settings`。
2. 滚动到 **Export passwords**，或直接前往 `chrome://password-manager/export`。
3. Chrome 会要求你重新验证身份 — 输入你的 Google 账户密码或设备凭据。
4. 保存文件，然后在做任何别的事之前，**把它从「下载」里挪出去**放进一个加密位置。

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### 文件里有什么

| 列 | 内容 |
|--------|----------|
| `name` | Chrome 保存下来的站点名称 |
| `url` | 完整 URL，包括子域名 |
| `username` | 你的用户名或邮箱 |
| `password` | 密码，明文 |
| `note` | 你添加的任何备注 |

没有文件夹结构 — Chrome 根本没有文件夹。所有内容都是平铺落地的，这正是之后整理集合那一步重要的原因。

## 从 Edge 导出

Microsoft Edge 使用同一套 Chromium 密码存储：

1. 打开 `edge://wallet/passwords`。
2. 进入 **更多设置 → 导出密码**，或直接前往 `edge://wallet/exportpasswords`。
3. 重新验证身份、保存文件，并把它挪到某个加密位置。

## 直接从 Google Password Manager 导出

如果你在多台设备上使用随账户同步的那个管理器，可以在任何已登录的浏览器上前往 `passwords.google.com` → **Export passwords** 导出。它生成的是同一个 CSV，同样的规则依然适用。

## 导入 OpenKey

1. 安装并解锁 OpenKey。
2. 打开 **设置 → 数据 → 导入与导出 → 导入**。
3. 选择 **Chrome CSV**。
4. 选择文件并确认。

导入完全在本地进行。没有服务器往返，你的明文也不会上传到同步服务器 — 这一点在你使用自托管服务器时尤其重要，因为那样这个 CSV 就永远不会变成服务器可能被要求生成的东西。

如果你要一次性整合多个来源，其他受支持的格式有：**Bitwarden JSON**、**LastPass CSV**、**1Password CSV**、**KeePass `.kdbx`**（数据库密码和可选的密钥文件），以及 OpenKey 自己的 JSON。能映射的文件夹会变成集合。

## 重新整理：按信任级别建立集合

导入是平铺的，而平铺的保险库会滋生重复使用的密码，因为你看不见其中的风险。花三十分钟整理是值得的：

| 集合 | 放什么 | 规则 |
|-----------|-----------------|------|
| 身份 | 邮箱、云端根账户、政府 | 最强的密码、passkeys、一份硬件密钥备份 |
| 财务 | 银行、支付卡片、税务 | 一切都要 2FA；提供 passkey 的地方都用上 |
| 工作 | 雇主账户 | 绝不重复使用；配一份离职处理清单 |
| 购物与社交 | 一切可以抛弃的东西 | 长的生成密码，不必费心 |
| 设备 | 路由器、NAS、摄像头、智能家居 | 生成；同时也离线保存一份 |

然后给自己定一条规则：**购物或社交类别里不再出现任何用重复密码的新条目。** 打开自动填充之后，这件事反正会自动发生。

## 立刻打开自动填充

这一步让整个迁移具备自我修复能力。自动填充一旦正常工作，从此以后你做的每次登录都会替你保存，于是保险库会在你处理重要账户的同时自我改进。

- [自动填充密码](/zh/blog/autofill-passwords) — 设置指南
- [自动填充不工作](/zh/blog/autofill-not-working) — 没有候选项时怎么办

然后**禁用 Chrome 自带的自动填充**，让两者不互相竞争：

1. 打开 `chrome://settings/addresses`。
2. 关掉 **Offer to save passwords** 和 **Automatically sign in with saved passwords**。
3. 把密码管理器设为你想用的那一个。

## 修复价值最高的账户

不要试图一次轮换 400 个密码。按一份清单往下做：

1. **邮箱** — 它能重置其他一切。
2. **银行和云存储** — 云端能装下剩下的东西。
3. **你主要的社交账户**。
4. 其余的，随着各个站点依次来问。

一边做一边在本地生成每个密码：

```bash
openkey gen -l 24 -c
```

既然已经打开安全设置了，就顺手加上 2FA（[指南](/zh/blog/two-factor-authentication)），并在网站提供 passkey 的任何地方都加上一个（[什么是 passkeys？](/zh/blog/what-are-passkeys)）。

## 删除任何东西之前先验证

不要跳过这一步。逐条检查：

- [ ] 若干重要登录项能从新保险库正确打开。
- [ ] 如果你有过 TOTP 条目，它们能生成有效验证码。
- [ ] 自动填充在你主力浏览器 **以及** 你的手机上都能用。
- [ ] 你能在 **第二台设备** 上登录，并看到同样的条目。
- [ ] 你已经做了一份 **加密的本地备份**（OpenKey 中是 `.okbak`）。

只有做到这一步，才继续去删除。

## 正确地删除导出文件

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` 在可用时更可靠，但这两种做法在 SSD 和写时复制文件系统上都不保险。实际的答案就是：能覆写多少就覆写多少，然后把任何在明文里待得足够久、值得担心的东西轮换掉。

一个密码在明文 CSV 里待一周不算危机；同一个密码一年后还留在那个文件里就是。

然后删掉浏览器里存的那份副本：`chrome://password-manager/settings` → **Delete passwords from Chrome**。

## 搜索数据说明

迁移是一个规模很大、指向明确的需求 — 搜索者知道自己要 *做* 什么，而不是要买什么。Google Trends（全球范围，过去 12 个月）把这些迁移相关的词互相比较：

| 查询 | 簇内相对关注度 |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

前两行就是整个故事，而两者之间的比例才是有用的发现：**人们搜索「导出」的次数超过「导入」的两倍。** 就安全性而言，这个比例正好是反的，因为导出制造了那个暴露在外的产物，而导入才是解决问题的部分。以导出路径开篇的内容，应当立刻把读者交接到导入，然后再交接到删除那一步。

这条长尾同样很窄，而且大多是英语母语者的措辞，这说明受众规模不大、界定清晰，而且已经熟悉这些术语 — 这类读者从一份精确的流程中得到的收获，多过从一篇横向对比中得到的。

Method: Google Trends，全球范围，过去 12 个月，2026 年九月提取。数字为归一化的相对关注度（0–100），而非搜索量。

## 一分钟版本

从 `chrome://password-manager/settings` 导出，立刻把明文 CSV 挪出「下载」，在本地把它导入你的新保险库，按信任级别建立集合，打开自动填充并关掉 Chrome 的，轮换邮箱和银行，在第二台设备上验证，然后覆写并删除那个 CSV，同时删掉 Chrome 里存的那份副本。

## 下一步

- [自动填充密码](/zh/blog/autofill-passwords) — 在你轮换任何东西之前先做这个
- [Google Password Manager](/zh/blog/google-password-manager) — 同一套流程，但围绕 Google 的生态来组织
- [强密码生成器](/zh/blog/strong-password-generator) — 该轮换成什么
- [导入与导出](/zh/guide/import-export) — 全部受支持的格式，以及 Free 与 Pro 的差别
