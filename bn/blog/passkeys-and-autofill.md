---
title: ব্রাউজারে passkey ও autofill
description: OpenKey কীভাবে ব্রাউজার ও system credential provider হিসেবে login ও passkey fill করে — ভল্ট ডেটা ক্লায়েন্টে এনক্রিপ্টেড রেখে।
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.png
---

# ব্রাউজারে passkey ও autofill

ফোনের ভল্ট গল্পের অর্ধেক। দৈনন্দিন login Chrome, Firefox ও OS credential UI-তে হয় — তাই OpenKey **MV3** ব্রাউজার এক্সটেনশন এবং mobile ও desktop-এ system Autofill / Credential Provider support দেয়।

## এক্সটেনশন কী করে

- আপনার ভল্টের বিরুদ্ধে unlock (desktop অ্যাপের লোকাল bridge, এবং/অথবা self-hosted sync)
- ওয়েব ফর্মে মিলে যাওয়া login সাজেস্ট করে
- সাইট WebAuthn / passkey দিলে সেই flow সমর্থন করে
- sync করলে অ্যাপের **একই** server URL ব্যবহার করে

`openkey_extension` থেকে build ও load করুন:

```bash
cd openkey_extension
npm install
npm run build
```

`dist/` ফোল্ডার unpacked extension হিসেবে load করুন। Desktop-এ OpenKey অ্যাপ unlock করুন এবং native messaging host রেজিস্টার করুন, অথবা standalone mode-এ server-এর বিরুদ্ধে এক্সটেনশন unlock করুন। sync ব্যবহার করলে Options-এ server URL সেট করুন, তারপর email ও master password দিয়ে unlock করুন।

## System Autofill-ও

অ্যাপে **Settings → Security**-এ OpenKey system password ও passkey provider হিসেবে চালু করুন। OS credential store-এর সাথে কথা বোলা অ্যাপ ও ব্রাউজার cover করে — এক্সটেনশনের পরিপূরক, প্রতিটি প্ল্যাটফর্মে বিকল্প নয়।

## এখনো zero-knowledge

Autofill ক্লায়েন্টে unlock-এর পর চলে। এক্সটেনশন বা OS provider শুধু প্রয়োজনীয়টা decrypt করে। sync — যদি চালু — এখনো অস্পষ্ট ciphertext বিনিময় করে। compromise হওয়া sync ডাটাবেস fill করা পাসওয়ার্ডের dump হয় না। অবিশ্বস্ত ওয়েব পেজ শুধু ইচ্ছাকৃত autofill mediation দিয়ে secret পাবে।

## বাকি স্ট্যাকের সাথে মিলিয়ে

| ক্লায়েন্ট | ভূমিকা |
|--------|------|
| অ্যাপ | ফোন ও ডেস্কটপে দৈনন্দিন ভল্ট; system Autofill / passkey |
| এক্সটেনশন | Chrome / Firefox-এ autofill ও passkey |
| CLI | Developer secret ও generation |
| সার্ভার | ঐচ্ছিক ciphertext sync |

## আরও জানুন

- [অ্যাপ ব্যবহার](/bn/guide/app) — Autofill, ব্রাউজার ও backup
- [Packages](/bn/guide/packages) — এক্সটেনশন সেটআপ
- [সার্ভার সেটআপ](/bn/guide/server) — এক্সটেনশন host-এ সংযুক্ত করুন
- [Security](/bn/guide/security) — এক্সটেনশন ও native messaging-এর trust boundary
