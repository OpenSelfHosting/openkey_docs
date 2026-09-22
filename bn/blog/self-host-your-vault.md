---
title: কেন নিজের পাসওয়ার্ড ভল্ট self-host করবেন
description: নিয়ন্ত্রণ, গোপনীয়তা এবং শুধু ciphertext সংরক্ষণ করা sync সার্ভার — Docker দিয়ে নিজের হার্ডওয়্যারে OpenKey চালানোর উপায়।
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.png
---

# কেন নিজের পাসওয়ার্ড ভল্ট self-host করবেন

পাসওয়ার্ড ম্যানেজার আপনার ডিজিটাল জীবনের কেন্দ্রে। ভল্ট শুধু অন্যের ক্লাউডে থাকলে outage, নীতি পরিবর্তন ও breach *আপনার* ঝুঁকি হয়। Self-hosting উল্টো করে: মেশিন, backup ও API-তে কে পৌঁছতে পারবে তা আপনি বেছে নেন।

## আপনি কী নিয়ন্ত্রণ করেন

| আপনার | সার্ভার কখনো পায় না |
|---------|------------------------|
| ciphertext কোথায় সংরক্ষিত | Master password |
| upgrade ও backup কখন | Plaintext vault key |
| কোন ক্লায়েন্ট connect করতে পারে (`CORS_ORIGINS`, HTTPS) | পড়া যায় এমন entry নাম বা পাসওয়ার্ড |
| sync চালু আছে কিনা | Decrypted attachment বা share |

OpenKey অ্যাপ অফলাইনে লোকাল এনক্রিপ্টেড ডাটাবেসে কাজ করে। multi-device sync চাইলে **Settings → Data → Self-hosted server**-এ instance দেখান — zero-knowledge নিয়ম একই। কমপক্ষে একটি **encrypted local backup** রাখুন; ভুলে যাওয়া master password সার্ভার recover করতে পারে না।

## ব্যবহারিক আকার

অনেকে home NAS বা ছোট VPS-এ Docker দিয়ে শুরু করেন:

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

সামনে TLS (Caddy, Traefik বা reverse proxy), দীর্ঘ unique `JWT_SECRET`, এবং `CORS_ORIGINS` অ্যাপ ও এক্সটেনশন origin-এ সীমিত — কখনো `*` নয়। তারপর প্রথম ডিভাইস থেকে **Register**, বাকিগুলো থেকে **Login**, এবং explicit pull/push চাইলে **Sync now**।

## সার্ভার ছাড়া LAN

শুধু একই Wi‑Fi-তে ডিভাইস লাগলে **Nearby** vault sync (Pro) PostgreSQL ছাড়াই LAN-এ pair ও link করতে পারে। সুবিধার জন্য ব্যবহার করুন; disaster recovery-র জন্য অফলাইন backup রাখুন।

## কার জন্য

- SaaS vault ছাড়া sync চান এমন ব্যক্তি
- shared collection দরকার কিন্তু crypto ক্লায়েন্টে রাখতে চান এমন টিম
- ইতিমধ্যে PostgreSQL চালান এমন developer যারা Compose-এ স্বাচ্ছন্দ্য

লোকালি OpenKey ব্যবহারে self-host বাধ্যতামূলক নয়। **আপনার** sync plane চাইলে self-host করুন — ciphertext-only storage কঠোর নিয়ম হিসেবে।

## পরবর্তী ধাপ

- [সার্ভার সেটআপ](/bn/guide/server) — ইনস্টল, কনফিগার ও ক্লায়েন্ট লিঙ্ক
- [অ্যাপ ব্যবহার](/bn/guide/app) — ভল্ট workflow, Nearby, import/export
- [Security](/bn/guide/security) — hardening checklist ও threat model
- [Overview](/bn/guide/overview) — package ও zero-knowledge মডেল
