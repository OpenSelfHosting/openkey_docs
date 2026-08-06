---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="Gerenciador de senhas auto-hospedado. Apenas texto cifrado no servidor."
  cta-primary="Baixar"
  cta-secondary="Começar"
  download-link="/pt/guide/download"
  quick-start-link="/pt/guide/quick-start"
/>

<HomeSections
  features-title="Por que OpenKey"
  :features="[
    { title: 'Ciphertext only', body: 'Argon2id on device. The server never sees your master password or vault key.', href: '/pt/guide/security', linkLabel: 'Security model' },
    { title: 'Self-host or Nearby', body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.', href: '/pt/guide/nearby', linkLabel: 'Nearby guide' },
    { title: 'Autofill & passkeys', body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.', href: '/pt/guide/extension', linkLabel: 'Browser extension' },
    { title: 'Teams still zero-knowledge', body: 'Orgs and shares encrypt with keys the server cannot unwrap.', href: '/pt/guide/sharing', linkLabel: 'Sharing & orgs' }
  ]"
  platforms-title="Onde você está"
  how-title="Como o sync permanece zero-knowledge"
  :how-steps="['Derive keys from email + master password with Argon2id', 'Send only an auth hash to log in', 'Encrypt names, entries, and attachments before upload', 'Server stores opaque ciphertext — never the vault key']"
  cta-title="Comece na sua infraestrutura"
  cta-body="Baixe o app, aponte ao servidor ou emparelhe Nearby só na LAN."
  cta-primary="Baixar"
  cta-secondary="Começar"
  cta-security="Ler o modelo de ameaça"
  download-link="/pt/guide/download"
  quick-start-link="/pt/guide/quick-start"
  security-link="/pt/guide/security"
/>

</div>
