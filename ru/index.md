---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="Самостоятельно размещаемый менеджер паролей. На сервере только шифротекст."
  cta-primary="Скачать"
  cta-secondary="Начать"
  download-link="/ru/guide/download"
  quick-start-link="/ru/guide/quick-start"
/>

<HomeSections
  features-title="Почему OpenKey"
  :features="[
    { title: 'Ciphertext only', body: 'Argon2id on device. The server never sees your master password or vault key.', href: '/ru/guide/security', linkLabel: 'Security model' },
    { title: 'Self-host or Nearby', body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.', href: '/ru/guide/nearby', linkLabel: 'Nearby guide' },
    { title: 'Autofill & passkeys', body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.', href: '/ru/guide/extension', linkLabel: 'Browser extension' },
    { title: 'Teams still zero-knowledge', body: 'Orgs and shares encrypt with keys the server cannot unwrap.', href: '/ru/guide/sharing', linkLabel: 'Sharing & orgs' }
  ]"
  platforms-title="Где вы работаете"
  how-title="Как sync остаётся zero-knowledge"
  :how-steps="['Derive keys from email + master password with Argon2id', 'Send only an auth hash to log in', 'Encrypt names, entries, and attachments before upload', 'Server stores opaque ciphertext — never the vault key']"
  cta-title="Начните на своей инфраструктуре"
  cta-body="Скачайте приложение, укажите сервер или спарьте Nearby по LAN."
  cta-primary="Скачать"
  cta-secondary="Начать"
  cta-security="Модель угроз"
  download-link="/ru/guide/download"
  quick-start-link="/ru/guide/quick-start"
  security-link="/ru/guide/security"
/>

</div>
