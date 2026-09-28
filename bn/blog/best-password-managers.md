---
title: সেরা পাসওয়ার্ড ম্যানেজার
description: ২০২৬ সালে পাসওয়ার্ড ম্যানেজার কীভাবে তুলনা করবেন — free tier, zero-knowledge encryption, self-hosting, autofill, passkey, এবং বেছে নেওয়ার আগে যে প্রশ্নগুলো করতে হয়।
date: 2026-09-13
cover: /blog/covers/best-password-managers.png
---

# সেরা পাসওয়ার্ড ম্যানেজার

একক কোনো সেরা পাসওয়ার্ড ম্যানেজার নেই। আছে সেটাই যেটি *আপনার threat model, আপনার platform, এবং আপনি কতটা setup সহ্য করতে পারেন* তার জন্য সেরা — আর সেটিকে খুঁজে বের করার উপায় হলো আরেকটি listicle পড়ার বদলে একই সাতটি প্রশ্নে কয়েকটি প্রার্থীকে score করা, যেগুলো চুপচাপ কারও বিজ্ঞাপন করে।

এই নিবন্ধে আপনি পাবেন সাতটি প্রশ্ন, একটি scoring sheet, এবং যে চারটি বিভাগের মধ্যে বেশিরভাগ মানুষ শেষ পর্যন্ত বেছে নেয় — তার সৎ মন্তব্য।

## সাতটি প্রশ্ন

### 1. প্রোভাইডার কি আমার vault পড়তে পারে

এটিই একমাত্র প্রশ্ন, যার উত্তর সত্যিই দুই ধরনের। খুঁজুন স্পষ্ট **zero-knowledge** বা end-to-end encryption, আর দেখুন *key কার হাতে*। প্রোভাইডার যদি আপনার master password রিসেট করতে পারে, বিকল্প decryption key ইস্যু করতে পারে, কিংবা "সাপোর্টের জন্য" আপনার vault unlock করে দিতে পারে, তাহলে সেটি zero-knowledge নয় — ওয়েবসাইটে থাকা lock icon যা-ই থাকুক।

### 2. এনক্রিপ্টেড ডেটা কোথায়, আর কে সেটি মুছতে পারে

| মডেল | আপনি তাদের উপর কী ভরসা রাখছেন | কাদের জন্য সেরা |
|-------|----------------------------|-------------|
| শুধু vendor cloud | Availability, durability, তাদের breach history | একেবারে setup চান না এমন মানুষ |
| Vendor cloud, self-hostable | একই, তবে বেরিয়ে আসার একটি রাস্তা সহ | গোপনীয়তা-কেন্দ্রিক ব্যবহারকারী যারা একটি বিকল্প চায় |
| নিজের server | নিজের uptime আর backup | Docker বা ছোট VPS চালাতে পারে এমন যেকোনো ব্যক্তি |

Self-hosting কোনো জাদুকরি upgrade নয় — এটি একটি বিনিময়। আপনি storage plane-এর নিয়ন্ত্রণ পান আর trust chain থেকে একটি তৃতীয় পক্ষ সরান; বদলে TLS, backup আর upgrade-এর দায়িত্ব নেন। এটা কেমন দেখায়, তা দেখতে চাইলে [OpenKey-এর server](/bn/guide/server) হলো reference implementation।

### 3. Free tier আসলে কী অনুমতি দেয়

Free tier-ই হলো সেই জায়গা যেখানে পাসওয়ার্ড ম্যানেজার migration tax লুকায়। নির্দিষ্ট cap গুলো দেখুন, কারণ সেগুলো অসমানভাবে আলাদা: কোনোটি item সীমাবদ্ধ করে, কোনোটি device, কোনোটি sync, কোনোটি একেবারেই export বন্ধ করে দেয় — যার মানে আপনি ঢুকতে পারবেন, বেরোতে পারবেন না।

Item সীমা থাকা সত্ত্বেও vault + autofill + passkey + sync কভার করা একটি free tier সত্যিই ব্যবহারযোগ্য। [OpenKey Free](/bn/pricing#free-vs-openkey-pro) এরকম একটিই: 50 logins, 3 collections, 3 cards, 3 wallets, 3 secrets, সাথে server sync ও autofill অন্তর্ভুক্ত।

### 4. Autofill কি সব জায়গায় কাজ করে যেখানে আমি ব্যবহার করি

"এটা আছে কি না" নয় — আপনার ব্রাউজারে, আপনার ফোনের system provider-এ, আপনার desktop app-গুলোতে এটি *নির্ভরযোগ্যভাবে* কাজ করে কি না। Autofill-ই সেই feature যেটি আপনি সবচেয়ে বেশি ছোঁয়েন, তাই 400টি login তার মধ্যে migrate করার আগে একটি সত্যিকারের টেস্ট এর যোগ্য। Setup-এর জন্য [autofill passwords](/bn/blog/autofill-passwords) দেখুন, আর কাজ না করলে [autofill not working](/bn/blog/autofill-not-working)।

### 5. Passkey, TOTP আর card

তিনটি সক্ষমতাই পাসওয়ার্ড ম্যানেজারকে পাসওয়ার্ড স্টোরেজ বাক্স থেকে আলাদা করে:

- **Passkey** — সত্যিকারের WebAuthn implementation, "শিগগিরই আসছে" নয়। [Passkey কী?](/bn/blog/what-are-passkeys)
- **TOTP** — seed সংরক্ষণ করুন যে login-এর সঙ্গে সেটি সুরক্ষা করে ([vault-এ 2FA](/bn/blog/two-factor-authentication))
- **Card, wallet, identity** — কাজে লাগে, আর ভালো সংকেত যে vault আসলে পাসওয়ার্ড ম্যানেজার নাকি একটি spreadsheet

### 6. আমি কি আমার ডেটা বের করতে পারি

Import তো আজকের ভিত্তি। **Export**-ই আপনাকে বিশ্বাসযোগ্য করে, কারণ এটিই পলায়ের রাস্তা। দেখুন কোন কোন format সমর্থিত, export কি paywall-এ, আর export কি plaintext। আপনি যদি পরিষ্কারভাবে বেরিয়ে আসতে না পারেন, তাহলে আপনি ভাড়া করে বসে আছেন।

### 7. Master password ভুলে গেলে কী হয়

সরাসরি উত্তর নিন। সত্যিকারের zero-knowledge ডিজাইনে উত্তর হলো "কিছু নয় — ডেটা আর পুনরুদ্ধারযোগ্য নয়", আর ভেন্ডরের কাজ হলো vault তৈরি করার *আগে* সেটি স্পষ্ট করে দেওয়া, পরে নয়। জিজ্ঞাসা করুন আপনি নিজে কী offline recovery material তৈরি করতে পারেন ([এখানে বিস্তারিত](/bn/blog/forgot-master-password))।

## চারটি বিভাগ

### Mainstream cloud manager

সবচেয়ে কম ঝামেলার বিকল্প, এবং বেশিরভাগ মানুষের জন্য সঠিক default। আপনি vendor-এর infrastructure গ্রহণ করেন, বিনিময়ে পাচ্ছেন একটি পালিশ করা app, বহুল platform সাপোর্ট, আর maintain করার মতো কোনো server নেই। আপনি চান এটা সমাধান হয়ে যাক, চালাতে না হয় — তখন সেরা। তুলনা করুন free-tier সীমা, passkey সাপোর্ট, আর export দিয়ে — feature checklist দিয়ে নয়, কারণ সেটা সংখ্যা ফোলায়।

### Open-source ও self-hostable manager

কোড public, এবং কয়েকটি ক্ষেত্রে server-ও। আপনি encryption audit করতে পারেন, নিজের instance চালাতে পারেন, কিংবা একেবারেই server না চালিয়ে লোকাল এনক্রিপ্টেড file রাখতে পারেন। তখন সেরা, যখন trust chain-টাই প্রধান প্রয়োজন। Operational দিকটি নিয়ে [Self-hosted password manager](/bn/blog/self-hosted-password-manager) আলোচনা করে।

### Platform-এর ভেতরের বিল্ট-ইন

[Google Password Manager](/bn/blog/google-password-manager), iCloud Keychain আর Microsoft Edge এমন মানুষদের জন্য চমৎকার যারা ইতিমধ্যেই একটি ecosystem-এ প্রতিশ্রুত: প্রায় শূন্য setup, শক্ত integration, আর সত্যিই ভালো একটি free tier। বিনিময় হলো ecosystem lock-in, দুর্বল cross-platform sharing, আর self-hosting-এর কোনো গল্প নেই।

### Family ও team plan

এটি ভিন্ন ধরনের প্রোডাক্ট নয় — ভিন্ন ধরনের প্রয়োজন। Shared vault, revocation আর role। কী দেখবেন আর কী এড়াবেন তা [Password manager for family](/bn/blog/password-manager-for-family) ও [password manager for teams](/bn/blog/password-manager-for-teams) বলছে।

## একটি scoring sheet

প্রতিটি প্রার্থীকে প্রতি সারিতে 0–3 দিন, তারপর যোগ করুন। বারো পয়েন্টের পার্থক্য আসল সংকেত; দুই পয়েন্ট হলো noise।

| মানদণ্ড | ওজন | নোট |
|-----------|-------|-----|
| Zero-knowledge, প্রমাণযোগ্য | ×3 | প্রোভাইডার আপনাকে পড়া নিয়ে আপনার যত্ন থাকলেও আলোচনার বাইরে |
| Export আছে এবং বিনামূল্যে | ×3 | আপনার পলায়ের রাস্তা |
| আমার সব platform-এ Autofill | ×3 | টেস্ট করুন, অনুমান করবেন না |
| Passkey + TOTP | ×2 | পাসওয়ার্ড field-এর আধুনিক বিকল্প |
| Free tier সত্যিই ব্যবহারযোগ্য | ×2 | Item *এবং* sync — দুটো সীমাই গোনা হয় |
| Self-hosting পাওয়া যায় | ×1 | ঐচ্ছিক, কিন্তু trust model বদলে দেয় |
| Recovery-র গল্প সৎ | ×1 | এতে আপনার নিয়ন্ত্রণে offline backup-ও ধরা |
| Sharing ও revocation | ×1 | শুধু যদি share করেন |

## সার্চ ডেটা কী বলছে মানুষ কীভাবে বেছে নেয়

Google Trends (worldwide, last 12 months) দেখায় এই সিদ্ধান্ত আসলে কীভাবে হচ্ছে। "best password manager"-এ মানুষ যে refinement যোগ করে:

| Related query | Relative interest | নোট |
|---------------|-------------------|------|
| best password manager 2026 | 100 | বছর-নির্দিষ্ট search সবচেয়ে বেশি |
| the best password manager | 90 | |
| best password manager 2025 | 81 | গত বছরের list এখনও rank করছে |
| best password manager app | 34 | Mobile-first অভিপ্রায় |
| what is the best password manager | 31 | Beginner-এর প্রবেশ |
| reddit best password manager | 17 | Community validation গুরুত্বপূর্ণ |
| best password manager for business | 14 | Team মূল্যায়ন |
| best password manager for android | 11 | নির্দিষ্ট platform |

দুটি বাস্তবসম্মত শিক্ষা। প্রথমত, **"best password manager 2026" ছিল head term-এর দ্রুততম বর্ধনশীল একমাত্র refinement, বছরে বছরে প্রায় 2,800% বৃদ্ধি**, আর গত বছরের list এখনও এই বছরের চেয়ে উপরে — যা বোঝায় বেশিরভাগ searcher যে comprehensive roundup-ই আগে পান সেটিই পড়ছেন, তাই vendor-sponsored list-ই বেশিরভাগ সিদ্ধান্ত ঠিক করে। দ্বিতীয়ত, "reddit" একটি স্পষ্ট qualifier হিসেবে আসে, মানে মানুষ এমন recommendation চায় যেটা অচেনা মানুষের সঙ্গে মিলিয়ে যাচাই করা যায়।

Brand interest নিয়ে, বড় নামগুলোর মধ্যে head-to-head তুলনায় head term-এর সাপেক্ষে normalize করলে: Bitwarden ও 1Password — দুটোই LastPass-এর চেয়ে উল্লেখযোগ্যভাবে বেশি brand search পায়, আর KeePass, NordPass ও Dashlane তিনটির চেয়েও অনেক নিচে আছে। শুধু Bitwarden-এর ক্ষেত্রে, pricing ও review query সবচেয়ে দ্রুততম বর্ধনশীল — শুধু capability নয়, *cost*-এর আগ্রহ।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়। বর্ধনশীল মানগুলো হলো সমতুল্য আগের সময়ের তুলনায় growth।

## ২০ মিনিটের মূল্যায়ন রুটিন

1. তিনটি প্রার্থী বাছুন: আপনার বর্তমানটি, একটি cloud manager, আর একটি self-hostable বিকল্প।
2. উপরের sheet-এ স্কোর করুন।
3. সেরা দুটো ইনস্টল করুন। এখনই migrate করবেন না — শুধু unlock করুন, autofill চালু করুন, আর একদিন ব্যবহার করুন।
4. একটি throwaway account-এ passkey ও TOTP পরীক্ষা করুন।
5. যেটি আপনি বাছবেন না সেখান থেকে export করুন, আর file দেখুন। export অব্যবহারযোগ্য হলে, সেটিই আপনার উত্তর।
6. migrate করুন, তারপর পুরোনো export নিরাপদে মুছে ফেলুন।

Migration walkthrough: [LastPass থেকে](/bn/blog/lastpass-alternative) · [1Password থেকে](/bn/blog/1password-alternative) · [Chrome থেকে](/bn/blog/import-passwords-from-chrome)

## সৎ shortlist

- **চাইন এটা সামলানো?** আসল free tier ও বিনামূল্যে export থাকা একটি mainstream cloud manager।
- **চাইন এটা audit করা?** self-hostable server-সহ একটি open-source ক্লায়েন্ট — [OpenKey](/bn/blog/what-is-a-password-manager) এরকম একটি বিকল্প।
- **চাইন একেবারেই কোনো vendor না?** server ছাড়া লোকাল এনক্রিপ্টেড vault, আর নিজের ডিভাইসগুলোর জন্য [Nearby LAN sync](/bn/blog/nearby-without-a-server)।
- **চাইন এটা আপনার ecosystem-এ?** একটি platform built-in, lock-in মেনে নিয়ে।

## পরবর্তী ধাপ

- [পাসওয়ার্ড ম্যানেজার কী?](/bn/blog/what-is-a-password-manager) — মূল বিষয়
- [Autofill passwords](/bn/blog/autofill-passwords) — সবচেয়ে গুরুত্বপূর্ণ feature
- [Pricing এবং Free বনাম Pro](/bn/pricing) — OpenKey-এ কী রয়েছে
- [Security model](/bn/guide/security) — "zero-knowledge" বাস্তবে কী মানে
