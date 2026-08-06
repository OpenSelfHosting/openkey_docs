---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="সেল্ফ-হোস্টেড পাসওয়ার্ড ম্যানেজার। সার্ভারে শুধু সিফারটেক্সট।"
  cta-primary="ডাউনলোড"
  cta-secondary="শুরু করুন"
  download-link="/bn/guide/download"
  quick-start-link="/bn/guide/quick-start"
/>

<HomeSections
  features-title="কেন OpenKey"
  :features="[
    { title: 'Ciphertext only', body: 'Argon2id on device. The server never sees your master password or vault key.', href: '/bn/guide/security', linkLabel: 'Security model' },
    { title: 'Self-host or Nearby', body: 'Sync through your Docker API — or pair devices on LAN with QR, no server required.', href: '/bn/guide/nearby', linkLabel: 'Nearby guide' },
    { title: 'Autofill & passkeys', body: 'System Autofill plus a browser extension with fill shortcut and WebAuthn.', href: '/bn/guide/extension', linkLabel: 'Browser extension' },
    { title: 'Teams still zero-knowledge', body: 'Orgs and shares encrypt with keys the server cannot unwrap.', href: '/bn/guide/sharing', linkLabel: 'Sharing & orgs' }
  ]"
  platforms-title="যেখানে আপনি কাজ করেন"
  how-title="সিঙ্ক কীভাবে জিরো-নলেজ থাকে"
  :how-steps="['Derive keys from email + master password with Argon2id', 'Send only an auth hash to log in', 'Encrypt names, entries, and attachments before upload', 'Server stores opaque ciphertext — never the vault key']"
  cta-title="নিজের ইনফ্রায় শুরু করুন"
  cta-body="অ্যাপ ডাউনলোড করুন, সার্ভারে সংযুক্ত করুন, বা Nearby দিয়ে LAN সিঙ্ক।"
  cta-primary="ডাউনলোড"
  cta-secondary="শুরু করুন"
  cta-security="থ্রেট মডেল পড়ুন"
  download-link="/bn/guide/download"
  quick-start-link="/bn/guide/quick-start"
  security-link="/bn/guide/security"
/>

</div>
