---
title: "Google Password Manager：何时留下，何时迁走"
description: Google Password Manager 擅长什么、它的边界在哪里、如何从中导出，以及如何把你的密码带出 Chrome 生态、搬进一个由你掌控的保险库。
date: 2026-09-21
cover: /blog/covers/google-password-manager.png
---

# Google Password Manager：何时留下，何时迁走

「google password manager」是头部词条 **password manager** 之下最强的单个细化词 — 相对关注度满分 100，领先所有竞争品牌。「google password」也紧随其后，为 93。这不是巧合：搜索「password manager」的人当中，有相当大一部分其实已经在用密码管理器了，只是他们没意识到，因为 Google 已经替他们打开了。

所以真正有用的问题不是「它好吗？」— 它非常好。问题是 **何时留下，何时迁走**。

## 你已经拥有的东西

Google Password Manager 内置于 Chrome 和 Android，并通过 Google 账户在其他浏览器上工作。它存储密码、passkeys、验证码和支付卡片，生成密码，标记已被攻破的凭据，并在你的 Google 设备之间自动填充。它免费，而且确实称职。

对很多人来说，在一个生态之内，它就是正确答案，无需再多想什么。

## 人们离开的五个理由

### 1. 生态锁定

保险库寄居在一个 Google 账户里。在你不想离开之前，这都很好 — 而当你真的想离开时，你的密码就困在一种 Google 的导出格式里，你围绕它建立的一切（家庭、共享、硬件密钥）也都跟着困在里面。

### 2. 生态之外的共享

在 Google 账户之间共享很好用，和其他人共享就很别扭。如果你家里或团队里有谁不在 Google 上，你最后只能复制重复的条目，或者退回到某个不安全的东西。

### 3. 没有自托管

你没有办法把同步运行在自己的硬件上。如果「把加密数据放在你掌控的基础设施上」是一条硬要求，那么这一条就是否决项，而不是偏好。

### 4. 与浏览器绑定

如果你用 Firefox 或 Safari，Chrome 的管理器就不是你系统原生的自动填充提供方了。你又回到了第三方扩展或者平台自带的商店，集成上的优势随之消失。

### 5. 安全模型是一场取舍

保险库由你的 Google 账户凭据和设备解锁保护，并以 Google 的账户恢复作为兜底。这是一个合理的设计 — 但它与零知识保险库是完全不同的信任模型：后者没有人能恢复你的数据，服务商也不能。两者都不算错。它们是对「如果我忘记主密码，谁来兜底」这个问题给出的不同答案，而你应该挑一个自己用着安心的，而不是挑一个最省事的。

## 留下：把 Google Password Manager 用好

如果你决定留下，下面这些设置才是要紧的：

1. 在网站提供 passkey 的地方 **打开 passkeys** — 它们是最强的凭据，而这个管理器处理得很好。
2. **在注册时启用内置生成器**，这样新密码就永远不是自己编出来的。
3. **查看 Password Checkup**（安全 → Password Checkup），并处理其中被重复使用或已被攻破的条目。
4. **添加一个你真正能控制的恢复邮箱和恢复手机号**。
5. 在 Google 账户本身上 **加一个 passkey 作为第二因素** — 而不只是一个密码。
6. 如果你的地区提供，**打开加密同步**；并且永远不要在共享机器上留下一个已登录且未锁定的浏览器配置文件。

## 迁走：从 Chrome 导出

Chrome 的导出是一个纯文本 CSV。它很快，而且这是人们最容易随手留在硬盘上的文件 — 把它当成你密码的一份实时副本来对待。

```bash
# Take a backup of the export before you do anything else
cp passwords.csv ~/secure-backup-dir/chrome-export-$(date +%F).csv
```

1. 打开 `chrome://password-manager/settings`。
2. 找到 **Export passwords**（或直接前往 `chrome://password-manager/export`）。
3. 保存这个 CSV。
4. **立刻**把它从「下载」文件夹挪到加密存储中。

这个 CSV 包含 `name`、`url`、`username`、`password` 和 `note` 列。自定义字段很有限，而且视你的账户设置而定，支付卡片可能会出现在另一份单独的导出里。

## 导入到你掌控的管理器

在 OpenKey 中：**设置 → 数据 → 导入与导出 → 导入 → Chrome CSV**。选择文件、确认，导入会在本地运行 — 你的明文不会上传到任何服务器。

预期结果是：登录项会作为条目进来，`url` 变成站点匹配依据，`username` 和 `password` 直接映射，而 `note` 会成为条目的备注字段。Chrome 的导出里不存在嵌套文件夹，所以你之后需要自己搭一套集合结构 — 有用的那种是 **按信任级别划分集合**（财务、工作、购物、一次性），而不是按站点。

然后：

1. 在做任何别的事之前，先在新管理器里 **打开自动填充**（[设置指南](/zh/blog/autofill-passwords)）。
2. **禁用 Chrome 的自动填充**，让两者不要互相打架：打开 `chrome://settings/addresses` → 关掉自动使用已保存密码登录，并把密码管理器设为新的那个。
3. 等新保险库验证无误后，**删除你在 Chrome 中的密码存储** — `chrome://password-manager/settings` → **Delete passwords from Chrome**。
4. **安全地删除那个 CSV。**
5. **轮换那些曾在明文里待过的要紧密码**：邮箱、银行、云端。

含故障排查的完整流程见：[从 Chrome 导入密码](/zh/blog/import-passwords-from-chrome)。

## 一套建议的集合结构

导入之后，按信任级别而不是按习惯重新组织：

| 集合 | 内容 | 处理方式 |
|-----------|----------|----------|
| 财务 | 银行、支付、税务 | 尽可能 2FA 加 passkey |
| 身份 | 邮箱、政府、云端根账户 | 最强的密码、passkeys、硬件密钥备份 |
| 工作 | 雇主账户 | 绝不重复使用；离职处理时复查 |
| 购物 | 一切可以抛弃的东西 | 长随机密码，不必费心做 2FA |
| 设备 | 路由器、NAS、摄像头、智能家居 | 生成的，同时也离线保存一份 |

## 搜索数据说明

Google 这个品牌是整个品类的引力中心。Google Trends（全球范围，过去 12 个月）中「password manager」的细化词：

| 相关查询 | 相对关注度 |
|---------------|-------------------|
| **google password manager** | **100** |
| google password | 93 |
| what is a password manager | 39 |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| windows password manager | 8 |
| apple password manager | 8 |
| microsoft password manager | 7 |
| bitwarden | 7 |
| gmail password manager | 5 |
| samsung password manager | 5 |
| 1password | 4 |

仔细读这张表的形状。四个平台内置方案 — Google、Windows、Apple、Microsoft — 全部上榜，而这个查询的「app」变体落在「google password manager app」上，为 100。与此同时，专用品牌的词低得多：Bitwarden 为 7，1Password 为 4。

这个品类的搜索流量压倒性地是 **「我已经有一个了，还行」**，而不是「帮我挑一个」。这对任何在这个领域发布内容的人有两个含义：相当大一部分搜索者需要的是迁移与故障排查的内容，而不是购买指南；而平台内置方案比拼的是默认设置，而不是功能。

另一个查询簇也呈现同样的模式 — 在「password manager android」之下，「google password manager android」以 100 领跑，「chrome password manager android」为 20，而「best free password manager android」同比增长约 80%。在「chrome password manager」之下，唯一一个强相关查询是「chrome password manager security」，为 100，本身又上涨约 50%，这读起来像是在问它是否安全，而不是怎么使用它。

Method: Google Trends，全球范围，过去 12 个月，2026 年九月提取。数字为归一化的相对关注度（0–100），而非搜索量。

## 一分钟版本

Google Password Manager 免费、好用，如果你的整个生活都在一个 Google 生态里、而且你接受以 Google 作为恢复路径，那它就是正确答案。如果你需要与非 Google 账户共享、需要跨浏览器的原生自动填充，或者需要自己的服务器，那就离开它。如果要离开：导出 CSV、在本地导入、打开新管理器的自动填充、禁用 Chrome 的自动填充、删除 Chrome 里存的密码、彻底擦除那个 CSV，并轮换所有曾在明文里待过的东西。

## 下一步

- [从 Chrome 导入密码](/zh/blog/import-passwords-from-chrome) — 完整流程
- [什么是密码管理器？](/zh/blog/what-is-a-password-manager) — 基本原理
- [自动填充密码](/zh/blog/autofill-passwords) — 让切换变得顺滑
- [自托管密码管理器](/zh/blog/self-hosted-password-manager) — 数据归你自己那条路
