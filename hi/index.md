---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="सेल्फ-होस्टेड पासवर्ड मैनेजर। सर्वर केवल सिफरटेक्स्ट रखता है।"
  cta-primary="डाउनलोड"
  cta-secondary="शुरू करें"
  download-link="/hi/guide/download"
  quick-start-link="/hi/guide/quick-start"
/>

<HomeSections
  features-title="Why OpenKey"
  :features="[
    { title: 'Ciphertext only', body: 'Argon2id on device. The server never sees your master password or vault key.', href: '/hi/guide/security', linkLabel: 'Security model' },
    { title: 'Self-host or Nearby', body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.', href: '/hi/guide/nearby', linkLabel: 'Nearby guide' },
    { title: 'Autofill & passkeys', body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.', href: '/hi/guide/extension', linkLabel: 'Browser extension' },
    { title: 'Teams still zero-knowledge', body: 'Orgs and shares encrypt with keys the server cannot unwrap.', href: '/hi/guide/sharing', linkLabel: 'Sharing & orgs' }
  ]"
  platforms-title="Runs where you do"
  how-title="How sync stays zero-knowledge"
  :how-steps="['Derive keys from email + master password with Argon2id', 'Send only an auth hash to log in', 'Encrypt names, entries, and attachments before upload', 'Server stores opaque ciphertext — never the vault key']"
  cta-title="Start on your own infrastructure"
  cta-body="Download the app, point it at your server, or pair Nearby for LAN-only sync."
  cta-primary="Download"
  cta-secondary="शुरू करें"
  cta-security="Read the threat model"
  download-link="/hi/guide/download"
  quick-start-link="/hi/guide/quick-start"
  security-link="/hi/guide/security"
/>

</div>
