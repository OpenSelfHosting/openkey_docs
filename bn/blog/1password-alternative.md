---
title: "1Password alternative: vault হারানো ছাড়াই switch করা"
description: মানুষ 1Password ছাড়ে কেন — cost, family plan, আর self-hosting — সঙ্গে আপনার নিয়ন্ত্রণে এমন একটি পাসওয়ার্ড ম্যানেজারে ধাপে ধাপে migration।
date: 2026-09-20
cover: /blog/covers/1password-alternative.png
---

# 1Password alternative: vault হারানো ছাড়াই switch করা

1Password একটি চমৎকার পণ্য, আর সেটি এত ভালো হওয়ার একটি কারণ হলো এতে কোনো free tier নেই। এই একটি design সিদ্ধান্তই মানুষ "1password alternative" সার্চ করার সবচেয়ে বেশি কারণ — পুরো ক্যাটাগরির সবচেয়ে বেশি সার্চ করা alternative query, আনুমানিক "lastpass alternative"-এর চার গুণ আগ্রহে।

এই নিবন্ধ তাদের জন্য, যাদের কারণ এই তিনটির একটি: **cost**, **family sharing-এর ঝামেলা**, বা **নিজের হার্ডওয়্যারে sync চাওয়া**। এটি কোনো দোষারোপনি নয়; 1Password একটি বৈধ পছন্দ, আর সৎ framing হলো "এটি যদি আপনার সমস্যা না হয়, থাকুন।"

## switch করার তিনটি আসল কারণ

### Cost

Subscription-ই হলো entry price, আর কোনো স্থায়ী free বিকল্প নেই। Pricing store আর region অনুযায়ী আলাদা, তাই সৎ framing-টা structural: আপনি তুলনা করছেন একটি subscription-এর সঙ্গে অথবা অন্য কোথাও free tier-এর, নয়তো একবারের কেনা আর নিজের server-এর সঙ্গে।

Query-গুলো এটাই প্রতিফলিত করে। "1password pricing" Bitwarden-সংক্রান্ত দ্রুততম-বর্ধনশীল refinement-গুলোর একটি, বছরে প্রায় **200%** বৃদ্ধি, আর কয়েকটি বড় brand-এর নিচের rising list-এ pricing-সংক্রান্ত পদ dominate করে।

### Family ও team sharing

Family plan সাধারণত ঝামেলার উৎস — seat ব্যবস্থাপনা, child-এর আলাদা account লাগার পর plan upgrade, আর ভিন্ন ভিন্ন ডিভাইস থাকা household-গুলোর মধ্যে sharing। আপনার household মিশ্র iOS/Android/Windows হলে, বা family plan-এ নেই এমন কারও সঙ্গে share করতে চাইলে, সরে আসা একটি যুক্তিসঙ্গত কারণ।

### Self-hosting

1Password কিছুদিন আগেই standalone local vault বন্ধ করে দিয়েছে, তাই sync এখন vendor-এর মধ্য দিয়ে চলে। প্রয়োজন যদি হয় যে এনক্রিপ্টেড ডেটা আপনার নিয়ন্ত্রণে থাকা infrastructure-এ থাকুক, তাহলে সেটি পছন্দ নয়, একটি hard requirement — আর তা একটি self-host করার উপযোগী ম্যানেজারের দিকে ইঙ্গিত করে।

## migrate করার আগে: cost কি সত্যিই সমস্যা?

সৎভাবে যাচাই করা উচিত, কারণ সাবধান না করলে migration হলো এক বিকেলের কাজ, যা আপনাকে একাধিকবার করতে হবে:

- **আপনার কি সত্যিই সরতে হবে?** এক বছরের subscription প্রায়ই migration-এর খরচের চেয়ে সস্তা। সমস্যা যদি বার্ষিক একটি charge হয়, উত্তর হতে পারে থেকে যাওয়া।
- **সমস্যা plan-এ নাকি seat সংখ্যায়?** personal plan আর family plan আলাদা পণ্য; family plan অস্বস্তিজনক বলে সরে আসা আর subscription-ই চাই না বলে সরে আসা — দুটি ভিন্ন সিদ্ধান্ত।
- **আপনার কি সত্যিই কোনো কারণে self-hosting দরকার?** আপনার household-এ কেউ server চালাতে পারে না, তাহলে self-hosting একটি hobby যা আপনি ছেড়ে দেবেন। Nearby LAN sync maintenance-এর কোনো অংশ ছাড়াই বেশিরভাগ সুবিধা দেয়।

উত্তর হ্যাঁ হলে সরে আসুন — আর এই নিবন্ধের বাকি অংশ হলো তা কীভাবে।

## ধাপে ধাপে migrate করা

### 1. 1Password থেকে export

1. Web বা desktop app-এ login করুন।
2. **Settings → Export** খুলুন আর **1Password CSV** বেছে নিন।
3. **encrypted 1PUX** export পাওয়া গেলে সেটিই বেছে নিন — এতে item পাসওয়ার্ড দিয়ে lock থাকে, plaintext লেখা হয় না।
4. এমন জায়গায় সংরক্ষণ করুন যা আপনার নিয়ন্ত্রণে, তারপর সেটি offline-এ সরান।

জটিল item type — attachment-সহ secure note, identity, document, Wi-Fi credential — export-এ login-এর মতো সারির রূপ পায়। গুরুত্বপূর্ণগুলো হাতে তৈরি করে নিতে হবে।

### 2. নতুন ম্যানেজারে import

OpenKey-এ: **Settings → Data → Import & export → Import → 1Password CSV**। Import লোকাল; কিছুই upload হয় না। যেখানে পরিষ্কারভাবে ম্যাপ হয়, সেখানে folder collection হয়।

### 3. সাথে সাথে autofill চালু করুন

Autofill কাজ করলে এখন থেকে আপনি যেখানে login করবেন সবটাই আপনার জন্য সংরক্ষিত হয়, তাই পাসওয়ার্ড rotate করার সময় vault নিজেকে মেরামত করে।

- [Autofill passwords](/bn/blog/autofill-passwords)
- [Autofill not working](/bn/blog/autofill-not-working) — যদি suggestion না আসে

### 4. গুরুত্বপূর্ণ account-গুলো rotate করুন

আগে email, তারপর banking আর cloud, তারপর বাকিগুলো যখন যে সাইট প্রম্পট দেবে। প্রতিটি পাসওয়ার্ড locally জেনারেট করুন:

```bash
openkey gen -l 24 -c
```

Security settings-এ থাকাকালীন 2FA যোগ করুন ([guide](/bn/blog/two-factor-authentication)), আর যেখানে দেওয়া হয় সেখানে passkey যোগ করুন ([passkey কী?](/bn/blog/what-are-passkeys))।

### 5. Shared item হাতে তৈরি করে পুনর্গঠন করুন

এই অংশটিই মানুষ কম আন্দাজ করে। যা যা আবার তৈরি করতে হবে:

- issuer অনুযায়ী সাজানো **payment card**
- ফর্মে ব্যবহৃত **identity**
- আপনার সংরক্ষিত **Wi-Fi ও device credential**
- attachment-সহ **secure note** — এগুলো আসেনি

OpenKey card, crypto wallet, আর developer secret-কে free-text note-এর বদলে vault-এর first-class এলাকা হিসেবে রাখে, যার ফলে এই পুনর্গঠন notes-only ম্যানেজারের চেয়ে কম কষ্টকর। [Using the app](/bn/guide/app) দেখুন।

### 6. Backup নিন, তারপর cancel

Cancel করার **আগে** একটি encrypted local backup (OpenKey-এ `.okbak`) export করুন, তারপর দ্বিতীয় ডিভাইসে একটি নতুন sign-in যাচাই করুন। তারপরেই পুরনো account বন্ধ করুন।

### 7. Export file ধ্বংস করুন

এনক্রিপ্টেড export: মুছে ফেলুন। plaintext CSV: overwrite করে shred করুন। এক সপ্তাহ plaintext file-এ থাকা যেকোনো কিছু অবশ্যই rotate করুন।

## প্রতিস্থাপকের মধ্যে কী খুঁজবেন

| Requirement | কী যাচাই করবেন |
|-------------|----------------|
| ব্যয়বহুল নয় | vault, autofill, আর sync কভার করে এমন একটি free tier — *item* সীমা স্পষ্ট লেখা সহ |
| Family sharing | revocation-সহ shared collection, আর child-দের আলাদা plan লাগে কি না |
| 1Password CSV import | folder mapping সহ স্পষ্টভাবে সমর্থিত |
| বিনামূল্যে export | tier যাচাই করুন; export-এর paywall ডেটাকে hostage বানায় |
| Self-hosting | ঐচ্ছিক, তবে এটি trust model-কে সম্পূর্ণ বদলে দেয় |
| Passkey আর TOTP | দুটোই, কাজ করছে, "শীঘ্রই আসছে" নয় |
| CLI বা API | script কিছু লেখলে মূল্যবান |

সম্পূর্ণ মানদণ্ড আর scoring sheet: [Best password managers](/bn/blog/best-password-managers)।

## Family ও team-এর দিক

চালিকাশক্তি ছিল sharing, cost না, তাহলে consumer plan বেছে নেওয়ার আগে এটি দেখে নিন:

- [Password manager for family](/bn/blog/password-manager-for-family) — household setup, child, shared account
- [Password manager for teams](/bn/blog/password-manager-for-teams) — org, role, revocation, offboarding

OpenKey-এ organization আর shared collection-এর জন্য Pro আর self-hosted server লাগে, আর সেগুলো যা সংরক্ষণ করে — org name, entry payload, attachment — সবই ciphertext থাকে। ক্লায়েন্টরা recipient-এর জন্য key wrap করে; সার্ভার কখনো সেগুলো unwrap করে না। এর আগে জেনে রাখা উচিত এমন একটি বিষয়: **entry share হলো snapshot**, জীবন্ত document নয়। কোনো share revoke করলে pending accept বন্ধ হয়, কিন্তু recipient ইতিমধ্যে গ্রহণ করে নেওয়া copy মুছে যায় না। চলমান shared access-এর জন্য ব্যবহার করুন org shared collection।

## সার্চ ডেটা কী বলছে

Google Trends (worldwide, last 12 months) এই migration-এর আকৃতিকে স্পষ্ট করে। পরস্পরের তুলনায় alternative query-গুলো মাপলে:

| Query | Cluster-এ relative interest |
|-------|-------------------------------|
| **1password alternative** | **100** |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

আর বড় brand-গুলোর সঙ্গে যুক্ত rising query-তে security-বিষয়ক নয়, বাণিজ্যিক প্রশ্নই আধিপত্য বহন করে: Bitwarden-এর ক্ষেত্রে "bitwarden price increase" প্রায় **+450%** বছরে ধরে বাছনিক শীর্ষে, "bitwarden review" আর "bitwarden lite" দুটোই প্রায় +350%, আর "bitwarden pricing" প্রায় +190%। Open-source, self-host করার উপযোগী, আর ছোট team-এর আগ্রহও বাড়ছে — "bitwarden open source", "bitwarden enterprise", আর "bitwarden cli" তিনটিই rising list-এ আছে।

দুটি সিদ্ধান্ত। প্রথম, এই ক্যাটাগরিতে switch করার প্রধান চালিকাশক্তি **দাম**, breach-এর উদ্বেগ নয়। দ্বিতীয়, দ্রুততম-বর্ধনশীল পারোপক্ষিক আগ্রহ হলো open source, enterprise, আর CLI — যা বোঝায় paid plan ছাড়া মানুষ এমন কিছু খুঁজছেন যা তারা নিজেরা চালাতে ও পরীক্ষা করতে পারেন।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

সমস্যা যদি cost হয়, তাহলে 1Password CSV export আর free export-ওয়ালা free-tier ম্যানেজার — এতেই বিনা খরচে বের হয়ে যাবেন। সমস্যা যদি family sharing বা self-hosting হয়, তাহলে প্রথমে ওই দুটি শর্তে বেছে নিন, দামে নয়। Export করুন, লোকালভাবে import করুন, autofill চালু করুন, email আর banking rotate করুন, card আর note হাতে তৈরি করুন, একটি encrypted backup নিন, তারপর cancel।

## পরবর্তী ধাপ

- [LastPass alternative](/bn/blog/lastpass-alternative) — একই প্রক্রিয়া, ভিন্ন trigger
- [Self-hosted password manager](/bn/blog/self-hosted-password-manager) — self-hosting-এর পথ
- [Password manager for family](/bn/blog/password-manager-for-family) — household sharing
- [Pricing](/bn/pricing) — OpenKey Free আর Pro-তে কী রয়েছে
