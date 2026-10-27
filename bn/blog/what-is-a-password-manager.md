---
title: পাসওয়ার্ড ম্যানেজার কী
description: সহজ ভাষায় পাসওয়ার্ড ম্যানেজার গাইড — এরা কী সংরক্ষণ করে, কীভাবে এনক্রিপ্ট করে, কোন কোন ধরন আছে, এবং অচেনা কাউকে পাসওয়ার্ড দিয়ে দেওয়া ছাড়া কীভাবে একটি বেছে নেবেন।
date: 2026-09-12
cover: /blog/covers/what-is-a-password-manager.png
---

# পাসওয়ার্ড ম্যানেজার কী

একটি **পাসওয়ার্ড ম্যানেজার** হলো একটি এনক্রিপ্টেড vault, যা আপনার হয়ে একটি শক্তিশালী master password মনে রাখে আর বাকি সব নিজে থেকেই ফিল করে দেয়। বারোটি সাইটে একই `Summer2019!` পুনর্ব্যবহার না করে আপনি প্রতিটির জন্য আলাদা 20-অক্ষরের পাসওয়ার্ড জেনারেট করেন, আর ম্যানেজার সেটি সংরক্ষণ করে, ফিরিয়ে আনে এবং দরকার হলে টাইপ করে দেয়।

পুরো ধারণাটাই এটুকু। বাকি সব — sync, sharing, passkey, autofill, self-hosting — এই একটি সুবিধার চারপাশের plumbing।

## মানুষের কেন এটা দরকার

সমস্যাটা হিসাবের। একটি ভালো মানুষি পাসওয়ার্ড মনে থাকে, আর মনে থাকা মানেই পুনর্ব্যবহার। credential-stuffing attack একটি সাইট থেকে leak হওয়া পাসওয়ার্ড নিয়ে হাজার হাজার অন্য সাইটে চেষ্টা করে, তাই একটি পুনর্ব্যবহৃত পাসওয়ার্ড আপনার সম্পর্কহীন একটি account কাড়াতে পারে। সমাধান হলো প্রতি account-এ একটি unique পাসওয়ার্ড — আর ঠিক এটাই কেউ মনে রাখতে চায় না।

পাসওয়ার্ড ম্যানেজার মনে রাখার ধাপটাই সরিয়ে দেয়। আপনি একটি secret মনে রাখেন; বাকিটা vault ধরে রাখে।

## পাসওয়ার্ড ম্যানেজার আসলে কী সংরক্ষণ করে

শুধু পাসওয়ার্ড নয়। আধুনিক vault ধরে রাখে বেশ চমকপ্রদ একটি পরিমাণ:

| আইটেম | এটা কী |
|-------|--------|
| Login | URL, username, password, নোট, TOTP seed |
| Payment card | নম্বর, expiry, CVV, issuer গ্রুপিং |
| Crypto wallet | ঠিকানা, private key, seed phrase |
| Identity | নাম, ঠিকানা, ফোন, ID নম্বর |
| Secure note | আর যা কিছু আপনি chat app-এ paste করতেন না |
| Passkey | একটি WebAuthn credential, যা পাসওয়ার্ডটাই সম্পূর্ণ বদলে দেয় |

**TOTP**-এর কথা আলাদা করে বলা দরকার: two-factor authentication-এর time-based one-time code যে পাসওয়ার্ডটিকে রক্ষা করে, তার সঙ্গে একই entry-তেই থাকতে পারে — ফলে একটি login আর তার ঘুরতে থাকা code দুটো দুটো আলাদা app-এ না গিয়ে একসঙ্গে থাকে।

## ভালো থেকে খারাপ আলাদা করে যে চারটি জিনিস

### 1. এনক্রিপশন মডেল

ভরসাযোগ্য ম্যানেজার আপনার vault আপনার ডিভাইসেই এনক্রিপ্ট করে, master password থেকে derive করা key দিয়ে (OpenKey derivation-এর জন্য **Argon2id** এবং vault ডেটার জন্য **AES-256-GCM** ব্যবহার করে)। সার্ভার চালানো কোম্পানির আপনার entry পড়ার ক্ষমতা থাকা উচিত নয় — এটিই *zero-knowledge* বৈশিষ্ট্য। প্রোভাইডার যদি আপনার হয়ে master password রিসেট করতে পারে, কিংবা এমন একটি master key ধরে রাখে যা দিয়ে decrypt করা সম্ভব, তাহলে সেটি zero-knowledge নয় — মার্কেটিং যা-ই বলুক।

### 2. এনক্রিপ্টেড ডেটা কোথায় থাকে

নিয়ন্ত্রণের বাড়তি ক্রমে সাজানো তিনটি সাধারণ উত্তর:

- **Vendor cloud** — সার্ভার অন্য কেউ চালায়। সবচেয়ে সহজ, আর আপনি তাদের uptime, তাদের breach history এবং তাদের jurisdiction উত্তরাধিকারসূত্র পান।
- **Vendor cloud, self-hostable** — একই ক্লায়েন্ট, চাইলে নিজের server আনার সুবিধা।
- **নিজের server** — sync API আপনিই চালান। সার্ভার ciphertext ধরে রাখে, পড়তে পারে না।

[OpenKey](/bn/blog/zero-knowledge-sync)-এর মতো self-hosted setup-এ চুরি হওয়া সার্ভার ডেটাবেস মানে চুরি হওয়া ciphertext-এর ঢেলা, চুরি হওয়া পাসওয়ার্ড তালিকা নয়।

### 3. Autofill-এর মান

Autofill-ই সেই জায়গা যেখানে পাসওয়ার্ড ম্যানেজার নিজের যোগ্যতা প্রমাণ করে, কারণ দিনে পঞ্চাশবার আপনি এটাই ছুঁয়ে দেখেন। খুঁজবেন browser extension, মোবাইলের জন্য system-level provider, আর একটি passkey path। সার্চ ডিমান্ডও তা-ই প্রতিফলিত করে: "autofill" এবং এর refinement "password vault" query-র চেয়ে কয়েকগুণ বেশি।

### 4. Recovery-র অবস্থান

Master password ভুলে গেলে কী হয়, তা সত্য করে বলার কাউকে না কাউকে হয়। Zero-knowledge ডিজাইন পারে না: সার্ভারের কাছে সাহায্যকারী কিছুই থাকে না। ভালো ম্যানেজার এ বিষয়ে সরাসরি বলে, আপনার নিয়ন্ত্রণে থাকা encrypted local backup দেয়, আর support agent সাহায্য করতে পারে বলে ভান করে না। পুরো পরিস্থিতিটাই এড়ানোর উপায় দেখুন [forgot master password](/bn/blog/forgot-master-password)-এ।

## পাসওয়ার্ড ম্যানেজার কী নয়

- **আপনার account-এর backup নয়।** এটি credential ধরে রাখে; lock হয়ে যাওয়া email account reset করে না।
- **স্বয়ংক্রিয়ভাবে 2FA নয়।** TOTP seed সংরক্ষণ করা মানে hardware key দিয়ে account রক্ষা করা নয়।
- **পাসওয়ার্ড পুনর্ব্যবহারের অনুমতি নয়।** পুরো মূল্যই uniqueness-তে।
- **master password বাদ দেওয়ার কাজ নয়।** vault যত শক্তিশালী, ঠিক ততই শক্তিশালী সেই key যা তা খোলে।

## আসলে কীভাবে ব্যবহার করবেন

1. **একটি শক্তিশালী master password বাছুন।** লম্বা জেতে যায় জটিলের চেয়ে। চার থেকে ছয়টি অসম্পর্কিত শব্দের multi-word passphrase `P@ssw0rd!`-এর চেয়ে শক্তিশালী এবং মনে রাখা সহজ।
2. কিছু import করার আগেই **autofill চালু করুন**, যাতে সংরক্ষিত login নিজে থেকেই জমতে থাকে।
3. **আপনার যা আছে তা import করুন।** [Chrome export](/bn/blog/import-passwords-from-chrome) নিতে প্রায় এক মিনিট লাগে।
4. **জেনারেট করুন, বানিয়ে বসবেন না।** প্রতিটি নতুন account-এর জন্য [built-in generator](/bn/blog/strong-password-generator) ব্যবহার করুন।
5. **সবচেয়ে খারাপগুলো আগে ঠিক করুন** — banking, email, এবং আপনার প্রধান social account।
6. **code গুলো account-এর সঙ্গে একসঙ্গে রাখুন।** TOTP seed একই entry-তে যোগ করুন ([কীভাবে কাজ করে](/bn/blog/two-factor-authentication))।
7. **একটি encrypted backup নিন** আর সেটি অফলাইন কোথাও রাখুন।

## কোন ধরনটি বাছবেন

| আপনি যদি… | তাহলে দেখুন |
|----------|----------|
| একেবারে setup চান না এবং কে সার্ভার চালাচ্ছে তা নিয়ে ভাবেন না | একটি mainstream cloud manager |
| commit করার আগে চেষ্টা করতে চান | সত্যিকারের free tier থাকা যেকোনো কিছু — [OpenKey-এর free tier](/bn/pricing#free-vs-openkey-pro) vault, autofill, passkey ও self-hosted sync কভার করে |
| sync নিজের নিয়ন্ত্রণে থাকা হার্ডওয়্যারে রাখতে চান | একটি [self-hosted password manager](/bn/blog/self-hosted-password-manager) |
| বড় ভেন্ডর থেকে সরে আসছেন | [LastPass](/bn/blog/lastpass-alternative) বা [1Password](/bn/blog/1password-alternative) migration গাইড |
| Google ecosystem-এ গভীরভাবে আছেন | [Google Password Manager](/bn/blog/google-password-manager) — এবং কখন সরে আসবেন |
| পরিবারের সঙ্গে share করেন | [Password manager for family](/bn/blog/password-manager-for-family) |
| সহকর্মীদের সঙ্গে share করেন | [Password manager for teams](/bn/blog/password-manager-for-teams) |

## মানুষ কী খুঁজে আর তা কী বলছে

Search data শুরু করা মানুষদের আসলে কোন প্রশ্ন থাকে তার একটি ভালো proxy। Google Trends (worldwide, last 12 months) থেকে, head term "password manager"-এ মানুষ সবচেয়ে বেশি যে refinement যোগ করে:

| Related query | Relative interest |
|---------------|-------------------|
| google password manager | 100 |
| google password | 93 |
| **what is a password manager** | **39** |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| bitwarden | 7 |
| 1password | 4 |

দুটি বিষয় চোখে পড়ে। প্রথমত, সবচেয়ে সাধারণ follow-up প্রশ্নটি ঠিক সেটাই, যার উত্তর এই নিবন্ধে দেওয়া হয়েছে — এই term-টি সরল ইংরেজিতে জিজ্ঞাসা করা হয়, যার মানে শ্রোতারা এই বিভাগে নতুন। দ্বিতীয়ত, brand query আধিপত্য বিস্তার করে: বেশিরভাগ মানুষ টপিকে এসেই ভাবে "কোন product" নিয়ে আসে, "এটা আসলে কী" নিয়ে নয়। একই data set দেখায় "what is a password manager" হলো দ্রুততম বর্ধনশীল *informational* refinement, বছরে বছরে প্রায় 1,050% বৃদ্ধি, আর "nord password manager"-এর মতো brand উপস্থিতি term বেড়েছে প্রায় 850%।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. ফিগারগুলো হলো normalized relative interest (0–100), মাসিক search volume নয়। বর্ধনশীল ফিগারগুলো হলো সমতুল্য আগের সময়ের তুলনায় growth।

## এক মিনিটের সংস্করণ

পাসওয়ার্ড ম্যানেজার হলো একটি এনক্রিপ্টেড vault, যেখানে একটি শক্তিশালী master password দিয়েই প্রবেশ করা যায়, তাই প্রতিটি account-এর পাসওয়ার্ড unique হতে পারে — কোনোটিই আপনাকে মনে রাখতে হবে না। যে বিষয়গুলো গুরুত্বপূর্ণ সেগুলো হলো: প্রোভাইডার কি আপনার ডেটা পড়তে পারে (পারা উচিত নয়), এনক্রিপ্টেড ডেটা কোথায় থাকে, autofill কি আপনার ডিভাইসে সত্যিই কাজ করে, এবং master password ভুলে গেলে কী হয়। একটি বাছুন, autofill চালু করুন, import করুন, তারপর জেনারেট করতে করতে reuse থেকে বেরিয়ে আসুন।

## এরপর কোথায় যাবেন

- [Best password managers](/bn/blog/best-password-managers) — কীভাবে বিকল্পগুলো তুলনা করবেন
- [Autofill passwords](/bn/blog/autofill-passwords) — ঠিকভাবে setup করুন
- [Strong password generator](/bn/blog/strong-password-generator) — আর পাসওয়ার্ড বানাবেন না
- [Security model](/bn/guide/security) — key derivation ও threat boundary
- [Using the app](/bn/guide/app) — বাস্তবে OpenKey vault
