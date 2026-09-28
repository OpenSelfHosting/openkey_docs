---
title: "Self-hosted password manager: আসলে যা লাগে"
description: Docker দিয়ে নিজের পাসওয়ার্ড ম্যানেজার sync server চালানো — self-hosted vault আসলে কী দেয়, এর জন্য কী দিতে হয়, এবং একটি সম্পূর্ণ setup ও hardening checklist।
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Self-hosted password manager: আসলে যা লাগে

পাসওয়ার্ড ম্যানেজার self-host করা মানে এনক্রিপ্টেড-sync server নিজে চালানো। আপনার ক্লায়েন্টরা ডিভাইসেই এনক্রিপ্ট করে; আপনি যে server চালান তা ciphertext সংরক্ষণ করে আর আপনাকে authenticate করে। ওই server compromise হলে আপনি পান একটি এনক্রিপ্টেড blob, পাসওয়ার্ড তালিকা নয়।

এটি একটি সত্যিকার এবং টেকসই গোপনীয়তার জয়। এটি একই সঙ্গে একটি maintenance commitment, আর এই নিবন্ধের সৎ সংস্করণ দুটোই বর্ণনা করে।

## Self-hosting আসলে কী বদলে

এ বিষয়ে সুনির্দিষ্ট থাকুন, কারণ প্রত্যাশা ঠিক এখানেই ভুল হয়:

| | Vendor cloud | Self-hosted |
|---|--------------|-------------|
| আপনার vault কে পড়তে পারে | কেউ না, zero-knowledge হলে | কেউ না, zero-knowledge হলে |
| আপনার vault কে **মুছতে** পারে | Vendor | আপনি |
| Metadata কে দেখে | Vendor | আপনি |
| কাকে ডেটা বাধ্য করে হস্তান্তর করতে পারে | তাদের jurisdiction-এ vendor | আপনার jurisdiction-এ আপনি |
| Uptime-এর দায়িত্ব | Vendor | আপনি |
| TLS, patching, backup | Vendor | আপনি |
| খরচ | Subscription | Server + আপনার সময় |

Confidentiality-র দাবি বদলায় না। যা বদলায় তা হলো **storage plane-এর উপর নিয়ন্ত্রণ** আর trust chain-এ কে আছে। Self-hosting একটি তৃতীয় পক্ষ সরায়; কোনো নতুন cryptography যোগ করে না।

## কখন এর যোগ্য

- আপনি ইতিমধ্যে service চালান এবং আপনার একটি NAS, homelab, বা ছোট VPS আছে।
- আপনার threat model-এ "প্রোভাইডার compromise বা বাধ্য হয়েছে" আছে।
- আপনি এমন jurisdiction-এ আছেন যেখানে অন্যের data-hosting একটি দায়।
- আপনি audit করা infrastructure-এ একটি team-এর জন্য shared collection চান।
- আপনি সেই ধরনের মানুষ, যার পাঁচ মিনিটের Docker Compose আর একটি cron job ভালো লাগে।

## কখন এর যোগ্য নয়

- আপনি কখনো reverse proxy চালাননি এবং আগে TLS, DNS আর firewall rule শিখতে হবে।
- কেউ patch করতে মনে রাখবে না। Patch না করা server একটি দায়, security জয় নয়।
- আপনিই একমাত্র ব্যবহারকারী, একটি ডিভাইসে। তাহলে server পুরো বাদ দিয়ে লোকাল vault ব্যবহার করুন।
- আপনার এমন একটি business-critical system দরকার যার নিশ্চিত uptime লাগে, কিন্তু কোনো backup plan নেই।

শেষ দুইটি ক্ষেত্রে একটি মাঝামাঝি পথ আছে: নিজের ডিভাইসের জন্য [Nearby LAN sync](/bn/blog/nearby-without-a-server)-সহ একটি **লোকাল এনক্রিপ্টেড vault**, আর একেবারেই কোনো server নেই।

## পাঁচ মিনিটে একটি setup করা

OpenKey Server হলো PostgreSQL-সহ একটি FastAPI application, যা Docker Compose stack হিসেবে আসে।

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

তারপর নিশ্চিত করুন এটি healthy:

| URL | উদ্দেশ্য |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Schema migration স্টার্টআপে স্বয়ংক্রিয়ভাবে চলে। **Settings → Data → Self-hosted server** থেকে একটি ক্লায়েন্ট connect করুন, তারপর প্রথম ডিভাইসে **Register** আর বাকিগুলোতে **Login** করুন। সম্পূর্ণ বিস্তারিত: [সার্ভার সেটআপ](/bn/guide/server)।

## Hardening checklist

মানুষ এই অংশটি বাদ দেয়, আর ঠিক এই অংশটিই ঠিক করে self-hosting কি সত্যিই উপকর করেছে। [security guide](/bn/guide/security)-এ থেকে:

### যা অবশ্যই করতে হবে

1. **অন্তত 32 অক্ষরের একটি unique `JWT_SECRET`।** Placeholder মান startup-এই reject হয়। একটি জেনারেট করুন; উদাহরণ কপি করবেন না।
2. **বৈধ certificate-সহ HTTPS।** ক্লায়েন্টরা certificate pinning ছাড়া platform TLS stack ব্যবহার করে, তাই ভুল টাইপ করা `http://` URL বা খারাপ certificate login ও sync-এ man-in-the-middle চালু করে দেয়। Caddy, nginx, বা আপনার load balancer-এ TLS terminate করুন।
3. **একটি স্পষ্ট `CORS_ORIGINS` allow-list।** কখনো `*` নয়। ব্রাউজার extension ব্যবহার করলে তার `chrome-extension://` ও `moz-extension://` origin স্পষ্টভাবে যোগ করুন।
4. **Postgres আর raw API port private থাকবে।** শুধু reverse proxy-টি expose করুন।
5. **Proxy-তে HSTS**, যাতে প্রথম visit-এর পর browser কখনো HTTP-তে ফিরে না যায়।

### শক্তিশালীভাবে প্রস্তাবিত

6. **Reverse proxy-তে rate limit।** API-এর built-in limiter in-memory এবং **প্রতি worker process**-এর, তাই একাধিক worker বা replica থাকলে কার্যকর সীমা গুণে যায়। nginx-এ `limit_req` যোগ করুন বা edge-এ Caddy rate limit ব্যবহার করুন।
7. **`TRUST_PROXY_HEADERS=true` শুধু তখনই সেট করুন যখন proxy `X-Forwarded-For` overwrite করে** এবং আপনি সেই পথকে বিশ্বাস করেন। নইলে আপনার per-IP সীমা proxy-তেই প্রযোজ্য হবে, ব্যবহারকারীর উপর নয়।
8. **Email enumeration সম্পর্কে সচেতন থাকুন।** `POST /auth/prelogin` আর `POST /auth/lookup-public-key` অজানা email-এর জন্য 404 ফেরত দেয়, যা বৈধ ক্লায়েন্টের কাজে লাগে, কিন্তু কাউকে কোন ঠিকানা registered আছে তা probe করতে দেয়। কড়া rate limit, TLS, আর অতি-সংবেদনশীল deployment-এর জন্য ঐচ্ছিকভাবে VPN বা IP allow-list।
9. **Postgres backup নিন আর restore পরীক্ষা করুন।** এমন পাসওয়ার্ড ম্যানেজার server, যা কখনো backup থেকে restore করা হয়নি, আসলে একটি অনুমান মাত্র।
10. **`/health`** আর API log monitor করুন; সাড়া বন্ধ হলে alert দিন।

## Self-hosted sync server যা করতে পারে আর যা পারে না

| যা করতে পারে | যা পারে না |
|--------|-----------|
| আপনার `auth_hash` থেকে আপনাকে authenticate করতে | আপনার master password পড়তে |
| entry, attachment, org, আর share-এর opaque ciphertext সংরক্ষণ করতে | collection নাম বা entry payload decrypt করতে |
| আপনার ডেটা মুছতে বা না দিতে | ভুলে যাওয়া master password পুনরুদ্ধার করতে |
| Metadata দেখতে: email, ciphertext size, সময় | ডেটাবেস থেকে আপনার vault পুনর্গঠন করতে |
| আপনার দ্বারা rate-limited, patched, বা restart করা হতে | আপনি master password ভুলে গেলে টিকে থাকতে |

চতুর্থ সারিটি মনোযোগ দিয়ে পড়ুন: একটি self-hosted server আপনাকে পাসওয়ার্ড ভুলে যাওয়ার থেকে **নিরাপদ** করে না। এটি trust chain থেকে একটি পক্ষ সরায় আর ডেটা হারানো পারে এমন operator হিসেবে আপনাকেই যোগ করে। প্রতিরোধের দিক দেখুন [Forgotten master password](/bn/blog/forgot-master-password)।

## স্থায়িতভরে আশ্রয় করার আগে যে sync semantics জানা দরকার

- **প্রতি item-এর `revision` অনুযায়ী last-write-wins, CRDT নয়।** দুটি ডিভাইসে একসঙ্গে করা edit একে অপরকে overwrite করতে পারে। গুরুত্বপূর্ণ সময়ে একসঙ্গে একটি ডিভাইসেই edit করুন।
- **Delete tombstone হিসেবে sync হয়** যতক্ষণ না peer আগে পৌঁছায়, তাই একটি delete সব জায়গায় সঙ্গে সঙ্গে কার্যকর হয় না।
- **Nearby LAN sync একই LWW নিয়ম ব্যবহার করে**, paired ও vault-linked ডিভাইসগুলোর মধ্যে।
- **দুটোই backup নয়।** অন্তত একটি encrypted local backup রাখুন (OpenKey-এ `.okbak`)।

শেষ বিষয়টিই মানুষ সবচেয়ে বেশি ভুল ধরেন, আর "আমি আমার vault আমার নিজের server-এ সরিয়েছি" ও "আমার একটি recovery plan আছে" — এই দুটোর পার্থক্য ঠিক এটাই।

## Operator-এর জন্য operational security

- Server এমন একটি host-এ চালান যেখানে আপনি নির্ধারিত সময়ে patch করেন। Patch না করা state, vendor-hosted-এর চেয়ে খারাপ।
- `JWT_SECRET` একটি secrets manager-এ রাখুন, অথবা অন্তত 600-mode file-এ, আপনার shell history-তে নয়।
- Log রাখার সময়সীমা একটি দায়: sync log timing ও size প্রকাশ করতে পারে। নিয়মিত rotate করুন ও সীমিত রাখুন।
- শুধু volume নয়, **database**-ও backup নিন, আর প্রতি ত্রৈমাসিকে restore যাচাই করুন।
- TLS ছাড়া untrusted network-এ API কখনো expose করবেন না।
- Uptime guarantee দরকার হলে load balancer-এর পেছনে দ্বিতীয় host রাখুন, আর মেনে নিন যে sync conflict resolution এখনও last-write-wins।

## OpenKey কীভাবে server-টিকে attacker-এর কাছে অকার্যকর রাখে

- ক্লায়েন্টরা email + master password + salt থেকে **Argon2id** দিয়ে একটি master key derive করে।
- Login একটি **`auth_hash`** পাঠায়, যা পাসওয়ার্ড প্রকাশ না করেই জানার প্রমাণ করে।
- একটি **vault key** collection নাম ও entry payload **AES-256-GCM** দিয়ে এনক্রিপ্ট করে। সার্ভার কেবল একটি wrapped vault key সংরক্ষণ করে।
- Access JWT স্বল্পমেয়াদি; refresh token বিশ্রামে hashed থাকে এবং ব্যবহারে rotate হয়।
- Attachment ciphertext হিসেবে sync হয়, প্রতিটি 20 MB পর্যন্ত সীমিত।

চুরি হওয়া `postgres` dump attacker-কে দেয় salt, KDF parameter, wrapped key আর blob। সেটি ভাঙতে মানে Argon2id-এর বিরুদ্ধে আক্রমণ করা, আর তারপরও তার কাছে এমন ciphertext থাকে যা key ছাড়া সে পড়তে পারে না। এটিই পুরো security যুক্তি, আর এটি ঠিক থাকে কারণ master password কখনো কোনো ক্লায়েন্ট ছাড়েনি।

## সার্চ ডেটা কী বলছে

Self-hosting একটি ছোট কিন্তু বাস্তব cluster, আর এটি "self-hosted"-এর চেয়ে "open source" phrase-এর চারপাশে বেশি জড়ো হয়। Google Trends (worldwide, last 12 months), এই term-গুলো পরস্পরের তুলনায় মাপলে:

| Query | Cluster-এ relative interest |
|-------|---------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

এ থেকে বোঝা যায় "open source" সেই phrase যা মানুষ খোঁজে, আর "self-hosted" সেই phrase যেখানে তারা পরে এসে পৌঁছায় — একটি search যা একটি পছন্দ দিয়ে শুরু হয় আর একটি বাস্তবায়নে রূপ নেয়। "open source password manager"-এর অধীনে সম্পর্কিত query-গুলো একই দিকে ইঙ্গিত করে: KeePass 100, "open source password manager self hosted" 84, আর Passbolt 78। শীর্ষ তিনটির মধ্যে দুটি এমন নাম, যেগুলো মানুষ তুলনা করে, feature-এর বিবরণ নয়।

Head term-এর পাশে এগুলো এখনো ছোট সংখ্যা। "Self-hosted password manager" একটি niche-এর niche, আর সৎ সিদ্ধান্ত হলো এই phrase খোঁজা মানুষদের বেশিরভাগই technical ব্যবহারকারী, যারা আগেই জানে তারা কী চায়।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## পাঁচ মিনিটের সংস্করণ

Self-hosting trust chain-এ provider-টির বদলে আপনাকে বসায়। এটি cryptography যোগ করে না, বরং আপনার তালিকায় TLS, backup, patching আর rate limiting যোগ করে। আপনি ইতিমধ্যে service চালান: Compose stack, unique `JWT_SECRET`, বৈধ certificate-সহ HTTPS, স্পষ্ট `CORS_ORIGINS`, আর পরীক্ষিত backup। আপনি চালান না: বদলে একটি লোকাল এনক্রিপ্টেড vault আর [Nearby LAN sync](/bn/blog/nearby-without-a-server) ব্যবহার করুন, আর যেকোনো অবস্থাতেই অন্তত একটি encrypted offline backup রাখুন।

## পরবর্তী ধাপ

- [কেন নিজের পাসওয়ার্ড vault self-host করবেন](/bn/blog/self-host-your-vault) — এর পক্ষে যুক্তি
- [Zero-knowledge sync ব্যাখ্যা](/bn/blog/zero-knowledge-sync) — প্রোটোকল
- [সার্ভার সেটআপ](/bn/guide/server) — ইনস্টল, কনফিগার, production hardening
- [Security](/bn/guide/security) — threat model ও operator checklist
