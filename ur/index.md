---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="خود میزبان پاس ورڈ مینیجر۔ سرور پر صرف سائفر ٹیکسٹ۔"
  cta-primary="ڈاؤن لوڈ"
  cta-secondary="شروع کریں"
  download-link="/ur/guide/download"
  quick-start-link="/ur/guide/quick-start"
/>

<HomeSections
  features-title="OpenKey کیوں"
  :features="[
    { title: 'Ciphertext only', body: 'Argon2id on device. The server never sees your master password or vault key.', href: '/ur/guide/security', linkLabel: 'Security model' },
    { title: 'Self-host or Nearby', body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.', href: '/ur/guide/nearby', linkLabel: 'Nearby guide' },
    { title: 'Autofill & passkeys', body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.', href: '/ur/guide/extension', linkLabel: 'Browser extension' },
    { title: 'Teams still zero-knowledge', body: 'Orgs and shares encrypt with keys the server cannot unwrap.', href: '/ur/guide/sharing', linkLabel: 'Sharing & orgs' }
  ]"
  platforms-title="جہاں آپ کام کرتے ہیں"
  how-title="سنک زیرو نالج کیسے رہتی ہے"
  :how-steps="['Derive keys from email + master password with Argon2id', 'Send only an auth hash to log in', 'Encrypt names, entries, and attachments before upload', 'Server stores opaque ciphertext — never the vault key']"
  cta-title="اپنی انفرا پر شروع کریں"
  cta-body="ایپ ڈاؤن لوڈ کریں، سرور لگائیں، یا Nearby سے LAN سنک۔"
  cta-primary="ڈاؤن لوڈ"
  cta-secondary="شروع کریں"
  cta-security="تھریٹ ماڈل پڑھیں"
  download-link="/ur/guide/download"
  quick-start-link="/ur/guide/quick-start"
  security-link="/ur/guide/security"
/>

</div>
