---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="自托管密码管理器。服务器只保存密文。"
  cta-primary="下载"
  cta-secondary="开始使用"
  download-link="/zh/guide/download"
  quick-start-link="/zh/guide/quick-start"
/>

<HomeSections
  features-title="为什么选择 OpenKey"
  :features="[
    { title: '仅密文', body: '设备端 Argon2id。服务器看不到主密码或保险库密钥。', href: '/zh/guide/security', linkLabel: '安全模型' },
    { title: '自托管或 Nearby', body: '通过 Docker API 同步——或用二维码在局域网配对，无需服务器。', href: '/zh/guide/nearby', linkLabel: 'Nearby 指南' },
    { title: '自动填充与通行密钥', body: '系统 Autofill，外加带填充快捷键与 WebAuthn 的浏览器扩展。', href: '/zh/guide/extension', linkLabel: '浏览器扩展' },
    { title: '团队仍是零知识', body: '组织与共享用服务器无法解开的密钥加密。', href: '/zh/guide/sharing', linkLabel: '共享与组织' }
  ]"
  platforms-title="多端可用"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Docker 服务器', 'CLI']"
  how-title="同步如何保持零知识"
  :how-steps="['用 Argon2id 从邮箱 + 主密码派生密钥', '登录时只发送认证哈希', '上传前加密名称、条目与附件', '服务器只存不透明密文——永不见保险库密钥']"
  cta-title="在自己的基础设施上开始"
  cta-body="下载应用、连接你的服务器，或用 Nearby 做局域网同步。"
  cta-primary="下载"
  cta-secondary="快速开始"
  cta-security="阅读威胁模型"
  download-link="/zh/guide/download"
  quick-start-link="/zh/guide/quick-start"
  security-link="/zh/guide/security"
/>

</div>
