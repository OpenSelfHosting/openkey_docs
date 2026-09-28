---
title: Forgot your master password? What is actually recoverable
description: ভুলে যাওয়া পাসওয়ার্ড ম্যানেজার master password সাধারণত পুনরুদ্ধার করা যায় না। এখানে কোন design কী restore করতে পারে আর কী পারে না, কীভাবে যাচাই করবেন আপনি lock out হবেন না, আর কীভাবে এটি আর কখনো ঘটাবে না তা নিশ্চিত করবেন।
date: 2026-09-26
cover: /blog/covers/forgot-master-password.png
---

# Forgot your master password? What is actually recoverable

সঠিকভাবে design করা যেকোনো zero-knowledge পাসওয়ার্ড ম্যানেজারের ক্ষেত্রে সৎ উত্তর হলো **কিছুই নয়**। কোনো support agent নেই যে এটি reset করতে পারে, কোনো admin নেই যে নতুন করে সেট করতে পারে, আর কোনো server-side copy নেই যেটি আপনার হয়ে decrypt করা যায়। এটি কোনো bug বা অনুপস্থিত feature নয় — এটিই সেই গুণ, যা এই design-কে রাখার যোগ্য করে।

এই নিবন্ধে ব্যাখ্যা করা হলো, কোন architecture কী restore করতে পারে আর কী পারে না, panic করার আগে কীভাবে বুঝবেন আপনি কোন পরিস্থিতিতে আছেন, আর কীভাবে নিশ্চিত করবেন এটি আর কখনো আপনার জন্য ঘটবে না।

## প্রথমে: বুঝুন আপনি কোন পরিস্থিতিতে আছেন

"master password ভুলে গেছি" সমস্যাগুলোর বেশিরভাগ আসলে সেটি নয়। এই ক্রমে দেখুন।

### 1. কোনো ডিভাইস এখনো unlock আছে

কোনো ডিভাইসে যদি এখনো unlock session থাকে — আপনার পকেটের ফোন, খোলা রাখা desktop app — আপনার vault **এই মুহূর্তে** পড়া যাচ্ছে। সেটি lock করবেন না। খুলুন, master password বদলে এমন কিছু দিন যা মনে রাখতে পারবেন, আর অন্য কিছু ছোঁয়ার আগে sync করুন।

OpenKey-এ master password বদলালে আপনার credential rotate হয় (server-এ `/auth/rekey`): vault key নিজেই একই থাকে, আর শুধু auth hash আর wrapped vault key হালনাগাদ হয়। এরপর অন্য ডিভাইসগুলো **নতুন** master password দিয়ে sync করে।

### 2. আপনার একটি ডিভাইসে biometric unlock চালু আছে

Biometrics ডিভাইসেই vault key wrap করে। যদি আপনি ডিভাইসের নিজস্ব lock screen পার করতে না পারেন, তাহলে তা কাজে লাগে না — কিন্তু PIN বা নিজের biometric দিয়ে unlock করতে পারে এমন ডিভাইসে master password না টাইপ করেই vault পৌঁছানো যায়।

### 3. আপনার একটি encrypted local backup আছে

আপনি যদি একটি `.okbak` (OpenKey) বা সমতুল্য encrypted export তৈরি করে থাকেন, আর সেই master password জানা থাকে যেটিতে এটি এনক্রিপ্ট করা হয়েছিল, তাহলে আপনি restore করতে পারেন। শর্তটি খেয়াল করুন: OpenKey backup আপনার **vault credential** দিয়ে restore হয়, তাই ভুলে যাওয়া master password-এ এনক্রিপ্ট করা backup এই সমস্যার কোনো পথ নয়।

### 4. পাসওয়ার্ড ম্যানেজার একটি account-recovery path দেয়

কিছু ম্যানেজার একটি এনক্রিপ্টেড recovery key বা escrow সংরক্ষণ করে, যা ভুলে যাওয়া master password-কে পুনরুদ্ধারযোগ্য করে **zero-knowledge গুণের বিনিময়ে**। আপনার ম্যানেজার যদি এটি করে, এটিই সেই একমাত্র ক্ষেত্র যেখানে পুনরুদ্ধার সম্ভব। দরকার হওয়ার আগেই এটি যাচাই করার কারণও এটিই।

### 5. আপনার সত্যিই কিছু নেই

কোনো unlock করা ডিভাইস নেই, কোনো backup নেই, কোনো recovery path নেই। তাহলে ডেটা cryptographically unrecoverable। "সাপোর্টে যোগাযোগ করুন" নয় — unrecoverable। এটি design-ই হয় যেমন বিধিবদ্ধ, আর এটিই সেই মুহূর্ত যখন trick খোঁজা বন্ধ করা উচিত।

## কোন architecture কী করতে পারে আর কী পারে না

| Architecture | ভুলে যাওয়া master password | কারণ |
|--------------|---------------------------|-----|
| Zero-knowledge, client-side encryption (**OpenKey**) | পুনরুদ্ধারযোগ্য নয় | Server একটি wrapped key আর একটি `auth_hash` রাখে; কোনোটিই পাসওয়ার্ডে ফিরে যায় না |
| Vendor cloud, zero-knowledge | পুনরুদ্ধারযোগ্য নয় | একই model, ভিন্ন operator |
| Vendor cloud, escrow বা recovery key-সহ | পুনরুদ্ধারযোগ্য | Provider decrypt করতে পারে, যা ঠিক এই বিনিময়টিই |
| Local file manager (KeePass-এর মতো) | পুনরুদ্ধারযোগ্য নয়, তবে database key আপনার কাছে থাকতে পারে | Database password *হলোই* master password; key file হলো দ্বিতীয় factor |
| OS বা platform store | প্রায়ই platform account-এর মাধ্যমে পুনরুদ্ধারযোগ্য | Platform আপনার credential reset করতে পারে |

Security page-এ OpenKey-এর অবস্থান স্পষ্টভাবে লেখা আছে: compromised server admin ciphertext মুছতে বা আটকে রাখতে পারে আর metadata দেখতে পারে, কিন্তু entry decrypt করতে পারে না বা শুধু `auth_hash` থেকে master password পুনরুদ্ধার করতে পারে না। [Threat model দেখুন](/bn/guide/security)।

## `auth_hash` কেন attacker-কে সাহায্য করে না

Login করার সময় OpenKey আপনার email, master password, আর একটি salt থেকে **Argon2id** দিয়ে একটি master key derive করে। সেখান থেকে এটি একটি `auth_hash` derive করে, যা আপনি server-এ পাঠান, আর আলাদাভাবে **vault key** wrap করে। তাই:

- Server `auth_hash`, salt, KDF parameter, আর wrapped vault key সংরক্ষণ করে।
- পুরো database পাওয়া একজন attacker `auth_hash`-এর বিরুদ্ধে offline অনুমান করতে পারে।
- প্রতিটি অনুমানের দাম একটি Argon2id computation, যা ইচ্ছাকৃতভাবে ধীর।
- **এবং সঠিক অনুমানও কাজে লাগে না**, কারণ পাসওয়ার্ড পুনরুদ্ধার করলে ciphertext decrypt হয় না, যদি না একই অনুমান vault key-ও unwrap করে — আর server সেটি কখনো plaintext-এ সংরক্ষণ করেনি।

এটিই "আক্রমণ করা ব্যয়বহুল" আর "আক্রমণ করা অর্থহীন"-এর পার্থক্য। একটি শক্তিশালী master password প্রথমটিকে সত্য করে; architecture দ্বিতীয়টিকে সত্য করে, সেটি থেকে স্বতন্ত্র।

## আপনি lock out হবেন না তা যাচাই করার উপায়

পাসওয়ার্ড মনে থাকাকালীনই এটি একবার চালান।

1. **নিশ্চিত করুন অন্তত দুটি ডিভাইসে vault-এ পৌঁছাতে পারেন** — একটিতে নয়।
2. **একটি encrypted local backup নিন** আর সেটি অফলাইনে রাখুন, এমন জায়গায় যেখানে crisis-এ খুঁজে পাবেন। একই ডিভাইসে নয়, একই cloud account-এও নয়।
3. **Master password একটি সচেতন জায়গায় রাখুন** — এমন পাসওয়ার্ড ম্যানেজার যেটিতে আপনি ইতিমধ্যে বিশ্বাস করেন, সিল করা একটি খাম, বা অফলাইন password card। এটি অতিরিক্ত মনে হতে পারে, তবে নয়: আপনি কোনো secret সংরক্ষণ করছেন না, আপনি এমন একটি secret-এর key সংরক্ষণ করছেন যা নইলে হারাবেন।
4. **লিখে রাখুন আপনার কী আছে।** কোন ডিভাইসগুলো paired, কোনগুলোতে Nearby linked, backup কোথায়, server URL পৌঁছানো যায় কি না। Lockout-এ সমস্যার অর্ধেক হলো নিজের setup না জানা।
5. **Restore পরীক্ষা করুন।** Backup এমন একটি ডিভাইসে restore করুন যেটি আপনি সাধারণত ব্যবহার করেন না। পরীক্ষা না করা backup একটি বিশ্বাস, পরিকল্পনা নয়।

## যাতে এটি আর কখনো না হারাতে পারে

সমাধানটি সাধারণ, আর এটি কাজ করে।

**Passphrase ব্যবহার করুন, password নয়।** চার থেকে ছয়টি অসম্পর্কিত শব্দ `P@ssw0rd1!`-এর চেয়ে লম্বা, শক্তিশালী, আর অনেক সহজে মনে রাখার মতো। শক্তিশালী password-এর ব্যর্থতার রূপ হলো ভুলে যাওয়া; passphrase-এর ব্যর্থতার রূপ হলো বেছে নেওয়া শব্দগুলো কল্পনায় আনতে না পারা, যা অনেক বেশি বিরল ঘটনা।

```bash
openkey gen -l 24          # if you would rather use a random string
```

**Master password-এর জন্য এমন পাসওয়ার্ড ম্যানেজার ব্যবহার করুন যেটিতে আপনি ইতিমধ্যে বিশ্বাস করেন।** একটি mature, বহুল ব্যবহৃত ম্যানেজারে একটি high-value secret রাখা একটি স্বাভাবিক engineering বিনিময়: আপনি স্মৃতির উপর নির্ভরশীলতা বন্ধ করে একটি ভালোভাবে audit করা implementation গ্রহণ করেন। এখানে কোনো recursion সমস্যা নেই।

**Biometric unlock চালু করুন।** এটি master password-এর বিকল্প নয়, তবে এর ফলে দৈনন্দিন ব্যবহারে সেটি টাইপ করা লাগে না, তাই typing fatigue আর ভুল টাইপ করে reset সমস্যা হয়ে উঠে না।

**যে account-গুলো বাকিগুলো reset করতে পারে সেগুলো ঠিক করুন।** আপনার email account-এর পাসওয়ার্ড বদলান আর তাতে একটি passkey বা hardware key যোগ করুন। এতে বাস্তব জগতের সবচেয়ে সাধারণ lockout-ই সরে যায় — অ্যাক্সেস করা না যায় এমন একটি email account।

**Rotate করবেন শুধু rotate করার জন্য নয়।** পাঁচ বছরের পুরনো একটি শক্তিশালী unique master password ঠিক আছে। নির্ধারিত সময়ে জোর করে rotation মূলত আরও দুর্বল পাসওয়ার্ড তৈরি করে।

## যদি এই মুহূর্তে lock out হয়ে থাকেন

1. রকম-রকমের variation চেষ্টা বন্ধ করুন। প্রতিটি ব্যর্থ login একটি rate-limited attempt, আর কিছু ম্যানেজার account throttle বা lock করে দেবে।
2. যেকোনো ডিভাইসে unlock session খুঁজুন, আর সেটি ব্যবহার করুন।
3. এমন একটি encrypted backup খুঁজুন যেটি আপনি unlock করতে পারেন।
4. দেখুন আপনার ম্যানেজার recovery key বা account recovery দেয় কি না — কিছু ম্যানেজার design অনুযায়ীই দেয়।
5. উপরের কোনোটিই না থাকলে তা মেনে নিন। তারপর শূন্য থেকে গড়ুন: নতুন vault, নতুন account, আর প্রতিটি service-এর password reset flow ব্যবহার করুন। Email দিয়ে শুরু করুন।

## সার্চ ডেটা কী বলছে

Password recovery একটি উচ্চ-উদ্বেগের query, আর তার মধ্যে থাকা brand name প্রকাশ করে মানুষ আসলে কার ভয় করে। Google Trends (worldwide, last 12 months)-এ "forgot master password"-এর refinement:

| Related query | Relative interest |
|---------------|-------------------|
| lastpass forgot master password | 100 |
| dashlane forgot master password | 27 |

দুটোই brand-qualified, আর LastPass প্রায় চার গুণে প্রাধান্য বহন করে। এই pattern — brand name-এর সঙ্গে "forgot master password" — মানুষ **কীভাবে একটি নির্দিষ্ট vendor একটি নির্দিষ্ট incident সামলেছিল** তা সার্চ করছে, সাধারণ পরামর্শ নয়। ইতিহাস যা হোক, search behaviour-এ তার দীর্ঘস্থায়ী প্রভাব হলো এই ভয় আর ওই brand-এর মধ্যে একটি স্থায়ী সম্পর্ক।

সাধারণ cluster-ও একই গল্প বলে। পরস্পরের তুলনায় recovery-পদ মাপলে:

| Query | Cluster-এ relative interest |
|-------|-------------------------------|
| recover password | 100 |
| reset master password | 6 |
| forgot master password | 2 |
| master password recovery | 1.5 |
| lost master password | 0.2 |

"Recover password" হলো সাধারণ query, আর এটি মূলত সাধারণ account recovery নিয়ে, vault access নিয়ে নয়। সত্যিকারের নির্দিষ্ট পদ — "forgot master password", "lost master password" — পরমাপে ছোট। এই ক্যাটাগরির ভাগ হিসেবে ওই cluster-এর ভেতরে "password vault" নিজে "master password"-এর আগ্রহের প্রায় **57%** টানে, যা বোঝায় মানুষ master password-ই *খুঁজছে*, আর vault তাদের আগে থেকেই আছে।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

কোনো ডিভাইস unlock থাকলে সেটি ব্যবহার করুন আর এখনই পাসওয়ার্ড rotate করুন। নইলে ফেরার একমাত্র পথ একটি encrypted backup। কিছু না থাকলে ডেটা cryptographically unrecoverable — এটি design, ব্যর্থতা নয়। যাতে না হয়: একাধিক শব্দের একটি passphrase, পাসওয়ার্ডটি এমন ম্যানেজারে রাখা যেটিতে আপনি ইতিমধ্যে বিশ্বাস করেন, দ্বিতীয় ডিভাইসে পরীক্ষিত একটি offline encrypted backup, চালু biometric, আর আপনার email account-এ একটি passkey।

## পরবর্তী ধাপ

- [পাসওয়ার্ড ম্যানেজার কী?](/bn/blog/what-is-a-password-manager) — কেন recovery design অনুযায়ীই অসম্ভব
- [Zero-knowledge sync explained](/bn/blog/zero-knowledge-sync) — key derivation
- [Security](/bn/guide/security) — সম্পূর্ণ threat model
- [Import & export](/bn/guide/import-export) — encrypted backup
