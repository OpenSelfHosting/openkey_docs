---
title: Password manager for family
description: পরিবারের সঙ্গে পাসওয়ার্ড share করা — কী share করবেন, কী কখনো নয়, child-দের account কীভাবে সামলাবেন, আর কেউ বাড়ি ছাড়লে কীভাবে access revoke করবেন।
date: 2026-09-24
cover: /blog/covers/password-manager-for-family.png
---

# Password manager for family

পরিবারের সঙ্গে পাসওয়ার্ড share করার একটি কঠিন শর্ত আছে, যা মানুষ সাধারণত ভুল করেন: **সবকিছু share করা উচিত নয়।** এমন একটি shared vault যেখানে সবাই সবকিছু দেখতে পায় — সুবিধাজনক মনে হয়, আর সাধারণত সেটি ভেতরের প্রতিটি account-এর জন্যই একটি security downgrade।

সঠিক model হলো সচেতনভাবে share করা অল্প কয়েকটি credential, আর বেশিরভাগ private — কোনটা কোনটা, তার স্পষ্ট নিয়ম সহ।

## এটিকে কাজ করানোর নিয়ম

প্রতিটি credential-কে হুবহু তিনটি bucket-এর একটিতে শ্রেণিবদ্ধ করুন:

| Bucket | উদাহরণ | কে দেখতে পারে |
|--------|----------|----------------|
| **Shared** | Streaming, shared shopping account, home Wi-Fi guest, family storage, shared car account | ডিজাইন অনুযায়ী household-এর সবাই |
| **Family-scoped** | Child-দের school portal, family plan account, shared utility | নির্দিষ্ট যে ব্যক্তিদের দরকার |
| **Private** | Personal email, banking, medical, work, dating, individual cloud account | একজন, চিরকাল |

ব্যর্থতার রূপ হলো অপসরণ: একটি login সুবিধার জন্য Shared থেকে শুরু হয়, তারপর নিঃশব্দ সংবেদনশীল জিনিস জমতে থাকে — একটি recovery email, একটি সংরক্ষিত card, একটি private message। Shared নিরাপদ default নয়। এটি সচেতন, আর বারবার যাচাই করে নেওয়া সিদ্ধান্ত হওয়া উচিত।

## যা সত্যিই share করা উচিত

- **Streaming আর media** — সাধারণত আলাদা profile-এর সুবিধা আগে থেকেই থাকে, যা account-ই share করার চেয়ে ভালো।
- **Shared কেনাকাটা** — একটি recurring subscription-এর জন্য একটি account, সচেতনভাবে share করা।
- **Home infrastructure** — router, guest Wi-Fi, smart-home hub, shared printer।
- **Family storage** — shared photo library বা drive, যেখানে কয়েকজন মানুষই বাস্তবসম্মত অবদান রাখেন।
- **Emergency access** — আপনার কিছু হয়ে গেলে সবার পৌঁছানো উচিত একমাত্র জিনিস।

## যা কখনো share করা উচিত নয়

- **Banking** — joint account-এর একটি কারণ আছে; shared login fraud protection আর dispute process ভেঙে দেয়।
- **Personal email** — এটি বাকি সবকিছুর password reset, আর এটি একটি private correspondence channel।
- **Work account** — employer policy-তে সাধারণত নিষিদ্ধ, আর এটি বাস্তব employment risk তৈরি করে।
- **Medical আর insurance portal** — এগুলো আইনগত ও নৈতিকভাবে ব্যক্তিগত।
- **যেকোনো কিছু যার আছে আইনগত বা অন্তরঙ্গ মাত্রা।** কেউ অন্য পড়তে পারে বলে তা গুরুত্বপূর্ণ হয়ে উঠত, তাহলে share করবেন না।

## একটি বাস্তবসম্মত layout

বেশিরভাগ household manager shared collection বা per-item sharing সমর্থন করে। এমন একটি structure কাজ করে:

```
Family
├── Household          — streaming, shared shopping, Wi-Fi, smart home
├── Kids               — school portals, game accounts, device accounts
└── Emergency          — the recovery entry, and where the backups live
```

সবার নিজের account তাঁর নিজের private vault-এ থাকে, কিংবা আলাদা private collection-এ। Household-এর account-গুলোই shared, আর সেগুলোই সংখ্যায় ছোট অংশ।

OpenKey-এ sharing চলে **Pro** আর self-hosted server দিয়ে, আর দুটো model-ই আছে:

- **Organization shared collection** — সবাই shared org key-এর নিচে একই জীবন্ত ciphertext পড়ে। Household আর Kids-এর জন্য সঠিক।
- **Entry আর collection share** — একটি এনক্রিপ্টেড **snapshot** যা গ্রহণ করলে recipient-এর vault-এ copy হয়। একবারের credential-এর জন্য ঠিক আছে, যা কিছু বর্তমান থাকতে হবে তার জন্য ভুল — কারণ পরের edit তাদের কাছে পাঠানো হয় না।

এই পার্থক্যটিই ঠিক ধরতে হবে। যে shared router password কখনো বদলায় না সেটি ভালো entry share। যে shared account-এর পাসওয়ার্ড আপনি rotate করেন সেটি org shared collection — নইলে আপনি এক বিকেল সময় ভাববেন smart hub কেন কাজ করছে না।

## Child-দের account

Child-দের নিজের login দরকার, আপনার নয়।

- **শুরু থেকেই তাদের নিজের vault দিন**, এমন master password দিয়ে যা মনে রাখতে পারে — একটি passphrase, আর এমন phrase যা তারা নতুন করে সাজাতে পারে, কারণ আপনার চেয়ে তারা এটি বেশি ভুলে ফেলবে।
- **Child-এর account কখনো parent-এর collection-এ রাখবেন না।** যখন সেটি বড় হবে, আপনি সেটি পরিষ্কারভাবে হস্তান্তর করতে পারবেন না।
- **Account তৈরি করুন তাঁদের আসল নামে আর আসল email দিয়ে**, যাতে তারা বড় হলে, অ্যাকাউন্টটি তাঁদেরই হলে recovery কাজ করে।
- **আগেই recovery ঠিক করুন।** এমন account যেটি কেউ reset করতে পারে না, পরে একটি support বোঝা; আর হারানো account এমন একটি শিক্ষা যা আপনি তাদের ব্যয়বহুলভাবে শিখতে দিতে চান না।
- **১৩ বছর বয়সীদের কাছে গেলে আবার দেখুন।** বেশিরভাগ service এই বয়সের আশেপাশে আসল parental consent চায়, আর এটিই সেই মুহূর্ত যেখানে account তাঁদের নিজের vault-এ সরিয়ে চাবি হস্তান্তর করার।

## যিনি technical নন, তাঁর সঙ্গে sharing

বেশিরভাগ household sharing plan এখানেই ব্যর্থ হয়। একজন parent, partner, বা এমন একজন grandparent যিনি এখানে থাকতে বেছে নেননি — access-এর সবচেয়ে বেশি দরকার এই ব্যক্তিরই, আর app সহ্য করার সম্ভাবনা তাঁর সবচেয়ে কম।

বাস্তব কৌশল:

1. **তাঁদের হয়ে একবার login করে দিন** আর ছোট auto-lock দিন, যাতে প্রতিবার app-টি একটি puzzle না হয়।
2. **Biometric unlock চালু করুন** যাতে shared device-এ তাঁরা কখনো master password না টাইপ করেন।
3. **Master password লিখে রাখুন** আর এমন পাসওয়ার্ড ম্যানেজারে রাখুন যেটিতে তাঁরা ইতিমধ্যে বিশ্বাস করেন, কিংবা সিল করা একটি খামে। আপনি কোনো secret সংরক্ষণ করছেন না; আপনি এমন একটি secret-এর key সংরক্ষণ করছেন যা তারা নইলে হারাবেন।
4. **Shared collection ছোট রাখুন।** প্রতিটি অতিরিক্ত entry আরেকটি জিনিস, যা তাঁরা ভুল করে বদলে ফেলতে পারেন।
5. **Shared login আগে থেকেই তৈরি করে রাখুন** যাতে চাপের মধ্যে কাউকে account register করতে না হয়।
6. **হস্তান্তর একবার rehearsal করুন**, যখন আপনি এখনো আছেন। লক্ষ্য হলো "streaming account-এ ঢুকব কীভাবে" প্রশ্নের উত্তর একজন মানুষ, কোনো search নয়।

## কেউ চলে গেলে

এটি তখনই করুন, যখন মনে পড়বে তখন নয়:

1. **Shared পাসওয়ার্ড বদলান**, শুরু করুন shared Household collection থেকে — streaming, Wi-Fi, storage, যেকোনো কিছু যেখানে সংরক্ষিত card আছে।
2. **তাঁকে shared collection আর org থেকে সরান।** Owner আর admin invite revoke করতে পারেন, role বদলাতে পারেন, বা member সরাতে পারেন।
3. **Revocation কী করে না তা বুঝুন।** Revoke করলে pending accept বন্ধ হয়। কেউ ইতিমধ্যে নিজের vault-এ import করে নেওয়া copy তা **মোছে না**। OpenKey-এ entry share হলো snapshot, তাই গৃহীত share মানে তাঁর ডিভাইসে একটি decrypted local copy — এটিকে হস্তান্তর করা একটি key-এর মতোই ব্যবহার করুন।
4. **তাঁর পড়তে পারার কোনো কিছুই rotate করুন**, যার মধ্যে বহুলের সঙ্গে share করা collection-এর যেকোনো কিছু রয়েছে।
5. **আপনার Emergency collection-এর recovery entry হালনাগাদ করুন।**
6. **Shared-এ কী আছে আবার যাচাই করুন।** Household sharing অপসরণ করে; এটি একটি ভালো মুহূর্ত, যেখানে সেই সবকিছুকে আর rank নামাতে পারেন যা আর সত্যিই shared নয়।

## Emergency access

যে পরিস্থিতির পরিকল্পনা করা worth: আপনার কিছু হয়ে যায়, আর account-যাদের দরকার তাঁরাই কেউ, যাঁরা কখনো সেগুলো পাননি।

- **একটি Emergency collection রাখুন** সেসব account নিয়ে, যেগুলো পরিচালনার জন্য জরুরি — streaming service, family storage, utility account, আর আপনার backup কোথায় আছে।
- **শুধু credential নয়, একটি মানবিক নির্দেশনা রাখুন।** কোন account, কী কাজে, কার সঙ্গে যোগাযোগ করবে — একটি নোট পাসওয়ার্ডের তালিকার চেয়ে বেশি কাজের, কারণ এটি চাপে থাকা মানুষকে কী করতে হবে তা বলে দেয়।
- **এটি বর্তমান রাখুন।** তিন বছরের পুরনো emergency নথি কিছু না থাকার চেয়েও খারাপ, কারণ সেটি বিশ্বাসযোগ্য আর ভুল।
- **একটি ডিভাইসের উপর নির্ভর করবেন না।** যে ব্যক্তির access দরকার তার কাছে আর ফোন নেই, তার অফলাইনে একটি printout দরকার।

## household-এর জন্য একটি ম্যানেজার বেছে নেওয়া

| শর্ত | কারণ |
|-------------|-----|
| Per-item আর per-collection sharing | পুরো vault share করা অনেক খোলামেলা |
| Revocation | Household বদলায় |
| Read-only বা সীমিত role | Child-দের household vault পরিচালনা করা উচিত নয় |
| Biometric unlock | Shared ডিভাইস আর shared হাত |
| Emergency access | যে পরিস্থিতিতে আপনি improvise করতে চান না |
| যুক্তিসঙ্গত family pricing | Per-seat খরচ দ্রুত জমে |
| ব্যবহারযোগ্য একটি free tier | কেউ না দিয়েই শুরু করবে |

তুলনা করার সময় [password manager for teams](/bn/blog/password-manager-for-teams)-এর মতো একই offboarding প্রশ্নগুলো দেখুন — mechanics অভিন্ন, শুধু stakes কম।

## সার্চ ডেটা কী বলছে

Sharing-এ থাকে "how to" intent, "which product" intent নয়। Google Trends (worldwide, last 12 months)-এ "password manager"-এর refinement:

| Related query | Relative interest |
|---------------|-------------------|
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |

আর পরস্পরের তুলনায় একটি আলাদা long-tail set:

| Query | Cluster-এ relative interest |
|-------|-------------------------------|
| password manager for business | 100 |
| **password manager for family** | **41** |
| best password manager for business | 36 |
| password manager for teams | 22 |

Household sharing আসল আগ্রহ তোলে — business evaluation cluster-এর প্রায় 41% — কিন্তু একে ধারাবাহিকভাবে ফ্রেম করা হয় *আপনি যে পণ্য বেছে নিয়েছেন তার একটি feature* হিসেবে, কেনাকাটা করা একটি category হিসেবে নয়। এটি একটি কার্যকর editorial signal: "password manager for family" সার্চ করা মানুষ সাধারণত জানতে চায় **কীভাবে নিরাপদে share করবেন**, কোন ম্যানেজার কিনবে তা নয়।

Head-term-এর মাত্রায় "how to share passwords" হলো "how to" cluster-এর শক্তিশালীতম পদ, "how to import passwords" আর "how to use a password manager"-এর আগে। Sharing-ই household-এর প্রথমে যা করতে চাওয়া, আর প্রথমেই যা ভুল করা হয়।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

সবকিছু share করবেন না। সচেতনভাবে বেছে নেওয়া অল্প কয়েকটি shared credential রাখুন, banking, personal email, আর work account private রাখুন, child-দের নিজের vault দিন, আর revocation-কে একটি সত্যিকারের process হিসেবে দেখুন — কারণ গৃহীত share মানে এমন একটি copy যা আপনি ফিরিয়ে আনতে পারবেন না। সুস্থ থাকাকালীন emergency plan লিখে রাখুন।

## পরবর্তী ধাপ

- [Password manager for teams](/bn/blog/password-manager-for-teams) — একই mechanics, গুরুত্বের সঙ্গে মূল্যায়ন করা
- [Sharing & organizations](/bn/guide/sharing) — org, invite, আর snapshot semantics
- [পাসওয়ার্ড ম্যানেজার কী?](/bn/blog/what-is-a-password-manager) — মূল বিষয়
- [Pricing](/bn/pricing) — Free আর Pro, sharing-সহ
