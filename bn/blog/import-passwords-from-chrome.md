---
title: Import passwords from Chrome
description: Chrome, Edge, আর Google Password Manager থেকে কীভাবে পাসওয়ার্ড export করবেন, অন্য পাসওয়ার্ড ম্যানেজারে সেগুলো import করবেন, আর তারপর export-টি নিরাপদে মুছে ফেলবেন।
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Import passwords from Chrome

Export করা সহজ অংশ। বিপজ্জনক অংশ হলো তারপরের দশ মিনিট, যখন আপনার সব পাসওয়ার্ডধারী একটি plaintext CSV বসে আছে আপনার Downloads folder-এ।

এটি সম্পূর্ণ process: Chrome, Edge, বা Google Password Manager থেকে export করুন; আপনার নতুন vault-এ import করুন; যাচাই করুন; তারপর ফাইলটি ধ্বংস করুন। প্রথমবারের জন্য পনেরো মিনিট রাখুন।

## প্রথমে বুঝুন আপনি কী তৈরি করছেন

Chrome password export হলো একটি **plaintext CSV**। যে এটি খুলবে, তার কাছে আপনার পাসওয়ার্ড — কোনো master password নেই, কোনো encryption নেই, কোনো দ্বিতীয় factor নেই। এটিকে বাড়ির চাবির ছাপা তালিকার মতো দেখুন।

পুরো procedure-র জন্য তিনটি নিয়ম:

1. **এটি কখনো email করবেন না, message করবেন না, বা converter site-এ upload করবেন না।** পাসওয়ার্ড export কোনো third-party "convert my CSV" টুলে upload করলে আপনার সম্পূর্ণ vault হস্তান্তর হয়ে যায়।
2. **Import করুন সেই ডিভাইসেই যেখানে ফাইলটি আগে থেকেই আছে।** ফাইলটি এক জায়গা থেকে আরেক জায়গায় সরানো আপনার exposure বাড়ায়।
3. **Import যাচাই হয়ে গেলেই export মুছুন** — ঠিকভাবে, শুধু trash খালি করে নয়।

## Chrome থেকে export

Chrome-এর built-in manager আর Google Password Manager (account-sync করা সংস্করণ) একই export path, আর দুটোই এখানে আছে।

1. `chrome://password-manager/settings` খুলুন।
2. **Export passwords**-এ পর্যন্ত scroll করুন, কিংবা সরাসরি `chrome://password-manager/export`-এ যান।
3. Chrome আপনাকে আবার authenticate করতে বলবে — আপনার Google account পাসওয়ার্ড বা ডিভাইস credential দিন।
4. ফাইলটি সংরক্ষণ করুন, তারপর **Downloads থেকে সরিয়ে** এনক্রিপ্টেড জায়গায় নিন — অন্য কিছু করার আগেই।

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### ফাইলে কী আছে

| Column | বিষয়বস্তু |
|--------|----------|
| `name` | Chrome যেভাবে সংরক্ষণ করেছে সেই সাইটের নাম |
| `url` | সম্পূর্ণ URL, subdomain-সহ |
| `username` | আপনার username বা email |
| `password` | পাসওয়ার্ড, plaintext-এ |
| `note` | আপনি যে নোট যোগ করেছেন |

কোনো folder structure নেই — Chrome-এর folder থাকে না। সবকিছু সমতলে পড়ে, যার কারণেই পরের collection ধাপটি গুরুত্বপূর্ণ।

## Edge থেকে export

Microsoft Edge একই Chromium password store ব্যবহার করে:

1. `edge://wallet/passwords` খুলুন।
2. **More settings → Export passwords**, কিংবা `edge://wallet/exportpasswords`-এ যান।
3. আবার authenticate করুন, সংরক্ষণ করুন, ফাইলটি কোথাও এনক্রিপ্টেড জায়গায় সরান।

## সরাসরি Google Password Manager থেকে export

আপনি যদি ডিভাইসগুলোর মধ্যে account-sync করা manager ব্যবহার করেন, তাহলে যেকোনো login করা ব্রাউজার থেকে `passwords.google.com` → **Export passwords**-এ export করতে পারেন। এটি একই CSV তৈরি করে, আর একই নিয়ম প্রযোজ্য।

## OpenKey-তে import

1. OpenKey ইনস্টল করে unlock করুন।
2. **Settings → Data → Import & export → Import**।
3. **Chrome CSV** বেছে নিন।
4. ফাইলটি সিলেক্ট করে নিশ্চিত করুন।

Import সম্পূর্ণ লোকাল। কোনো server round-trip নেই, আর আপনার plaintext sync server-এ যায় না — যেটা self-hosted server ব্যবহার করলে গুরুত্বপূর্ণ, কারণ CSV কখনো এমন কিছু হয় না যা server-কে দিয়ে তৈরি করাতে বলা যেতে পারে।

একসঙ্গে কয়েকটি source এক জায়গায় আনলে অন্য সমর্থিত format: **Bitwarden JSON**, **LastPass CSV**, **1Password CSV**, **KeePass `.kdbx`** (database password আর ঐচ্ছিক key file), এবং OpenKey-এর নিজের JSON। যেখানে ম্যাপ হয়, সেখানে folder collection হয়।

## আবার সাজান: trust level অনুযায়ী collection বানান

Import সমতল হয়ে আসে, আর সমতল vault পুনর্ব্যবহৃত পাসওয়ার্ড জমায় রাখে, কারণ ঝুঁকি দেখা যায় না। ত্রিশ মিনিটের গোছানো নিজেকেই ফিরিয়ে দেয়:

| Collection | কী রাখবেন | নিয়ম |
|-----------|-----------------|------|
| Identity | Email, cloud root, government | সবচেয়ে শক্তিশালী পাসওয়ার্ড, passkey, একটি hardware-key backup |
| Finance | Banking, payment card, tax | সবকিছুতে 2FA; যেখানে দেওয়া হয় সেখানে passkey |
| Work | Employer account | কখনো পুনর্ব্যবহার নয়; offboarding checklist |
| Shopping আর social | যা কিছু ফেলে দেওয়া যায় | লম্বা generated পাসওয়ার্ড, কোনো চেষ্টা নয় |
| Devices | Router, NAS, camera, smart home | Generated; অফলাইনেও সংরক্ষিত |

তারপর নিজের জন্য একটি নিয়ম ঠিক করুন: **Shopping বা Social-এ নতুন কিছু reused পাসওয়ার্ড দিয়ে যায় না।** Autofill চালু থাকলে সেটি তো নিজে থেকেই ঘটে।

## সাথে সাথে autofill চালু করুন

এই ধাপটিই migration-কে self-repairing বানিয়ে দেয়। Autofill কাজ করা শুরু করলে এখন থেকে প্রতিটি login আপনার জন্য সংরক্ষিত হয়, তাই গুরুত্বপূর্ণ account শেষ করার সময় vault নিজেকে উন্নত করে।

- [Autofill passwords](/bn/blog/autofill-passwords) — setup guide
- [Autofill not working](/bn/blog/autofill-not-working) — যখন suggestion আসে না

তারপর **Chrome-এর নিজস্ব autofill বন্ধ করুন** যাতে দুটো প্রতিযোগিতা না করে:

1. `chrome://settings/addresses`।
2. **Offer to save passwords** আর **Automatically sign in with saved passwords** বন্ধ করুন।
3. Password manager সেট করুন আপনি যেটি ব্যবহার করতে চান।

## সবচেয়ে মূল্যবান account ঠিক করুন

400টি পাসওয়ার্ড rotate করবেন না। একটি তালিকা দিয়ে এগোন:

1. **Email** — এটি বাকি সবকিছু reset করে।
2. **Banking আর cloud storage** — cloud-এ বাকিটা থাকতে পারে।
3. **আপনার প্রধান social account**।
4. বাকি সবকিছু, যখন যে সাইট পরেরবার চাইবে।

প্রতিটি পাসওয়ার্ড গাড়তে গাড়তে locally জেনারেট করুন:

```bash
openkey gen -l 24 -c
```

আপনি ইতিমধ্যে security settings-এ আছেন বলে 2FA যোগ করুন ([guide](/bn/blog/two-factor-authentication)), আর যেখানে সাইট একটি দেয় সেখানে passkey যোগ করুন ([passkey কী?](/bn/blog/what-are-passkeys))।

## কিছু মুছে ফেলার আগে যাচাই করুন

এটি বাদ দেবেন না। দেখুন:

- [ ] নতুন vault থেকে হাতে গোনা কয়েকটি গুরুত্বপূর্ণ login সঠিকভাবে খোলে।
- [ ] TOTP entry, যদি ছিল, বৈধ code দেয়।
- [ ] Autofill আপনার main browser-এ **এবং** ফোনে কাজ করে।
- [ ] আপনি **দ্বিতীয় ডিভাইসে** sign in করে একই entry দেখতে পান।
- [ ] আপনি একটি **encrypted local backup** নিয়েছেন (OpenKey-এ `.okbak`)।

তারপরেই deletion-এর দিকে এগান।

## Export ঠিকভাবে মুছুন

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` পাওয়া গেলে বেশি নির্ভরযোগ্য, তবে SSD আর copy-on-write filesystem-এ দুটি পদ্ধতিই নির্ভরযোগ্য নয়। বাস্তব উত্তর হলো যতটা পারেন overwrite করুন, তারপর plaintext-এ যতদিন থেকেছে তা চিন্তার মতো হয়ে গেছে — যত দিন থাকে তত rotate করুন।

একটি plaintext CSV-তে এক সপ্তাহ থাকা পাসওয়ার্ড কোনো crisis নয়; একই পাসওয়ার্ড এক বছর পরেও যদি ওই ফাইলে থাকে, তখন।

তারপর ব্রাউজারের সংরক্ষিত copy মুছুন: `chrome://password-manager/settings` → **Delete passwords from Chrome**।

## সার্চ ডেটা কী বলছে

Migration একটি বড়, নির্দিষ্ট intent — searcher জানে তিনি কী *করতে* চান, কী কিনতে চান তা নয়। Google Trends (worldwide, last 12 months) এই migration-পদগুলো পরস্পরের তুলনায় মাপে:

| Query | Cluster-এ relative interest |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

প্রথম দুটিই পুরো গল্প, আর দুটির মধ্যে অনুপাতই কার্যকর ফলাফল: **import-এর চেয়ে দ্বিগুণেরও বেশি মানুষ export সার্চ করেন।** নিরাপত্তার দিক থেকে এটি উল্টো দিক, কারণ exposed artifact তৈরি করে export, আর সমস্যার সমাধান import। যে কনটেন্ট export path দিয়ে শুরু করে, তার সাথে সাথে import-এ এবং তারপর deletion ধাপে হস্তান্তর করা উচিত।

Long tail-ও পাতলা, আর বেশিরভাগই English-native phrasing, যা ইঙ্গিত করে একটি ছোট, সুনির্দিষ্ট audience-এর কথা যারা vocabulary-ই জানেন — এমন পাঠক, যার তুলনার চেয়ে নিখ্যাঁ walkthrough-ই বেশি উপযোগী।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

`chrome://password-manager/settings` থেকে export করুন, plaintext CSV সাথে সাথে Downloads থেকে সরান, আপনার নতুন vault-এ লোকালভাবে import করুন, trust level অনুযায়ী collection বানান, autofill চালু করুন আর Chrome-এরটি বন্ধ করুন, email আর banking rotate করুন, দ্বিতীয় ডিভাইসে যাচাই করুন, তারপর CSV overwrite করে মুছুন আর Chrome-এর সংরক্ষিত copy সরান।

## পরবর্তী ধাপ

- [Autofill passwords](/bn/blog/autofill-passwords) — যেকোনো কিছু rotate করার আগে এটি করুন
- [Google Password Manager](/bn/blog/google-password-manager) — একই walkthrough, Google-এর ecosystem কেন্দ্রিক ফ্রেমিং-এ
- [Strong password generator](/bn/blog/strong-password-generator) — কীসে rotate করবেন
- [Import & export](/bn/guide/import-export) — সমর্থিত প্রতিটি format, free বনাম Pro
