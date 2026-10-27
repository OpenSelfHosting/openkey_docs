---
title: "Strong password generator: আর পাসওয়ার্ড বানাবেন না"
description: নিজে বানানো পাসওয়ার্ড কেন দুর্বল হয়, cracking-এর বিরুদ্ধে সত্যিই টেকা এমন পাসওয়ার্ড কীভাবে জেনারেট করবেন, আর আপনার কাছে থাকা দুর্বলগুলো কীভাবে দেখবেন ও ঠিক করবেন।
date: 2026-09-18
cover: /blog/covers/strong-password-generator.png
---

# Strong password generator: আর পাসওয়ার্ড বানাবেন না

মানুষের পাসওয়ার্ড বানানো একটি সমাধান হয়ে যাওয়া সমস্যা, যার উত্তর খারাপ। প্রায় সবাই একই গঠন ব্যবহার করেন — একটি শব্দ, একটি বড় হাতের অক্ষর, সাল, `!` — আর ঠিক এই গঠনটিই cracking tool-এর অনুমান। একটি generator অনুমানটাকে আর মানুষকে পুরোপুরি লুপ থেকে সরিয়ে দেয়।

এটি হলো কীভাবে এমন পাসওয়ার্ড জেনারেট করবেন যা টেকে, কীভাবে আপনার কাছে থাকা পাসওয়ার্ডগুলো দেখবেন, আর কীভাবে এক বিকেল না খেয়ে সবচেয়ে খারাপগুলো ঠিক করবেন।

## কেন `P@ssw0rd1!` ব্যর্থ হয়

Attacker পাসওয়ার্ড একটি একটি করে অনুমান করে না। তারা বাস্তব breach-এ পর্যবেক্ষিত pattern ব্যবহার করে পুরো জনগোষ্ঠীর বিরুদ্ধে বড় পরিসরে precomputation চালায়:

- কয়েকটি ভাষার dictionary শব্দ, সঙ্গে নাম ও brand
- keyboard walk (`qwerty`, `1qaz2wsx`) এবং সেগুলোর rotation
- তারিখ: সাল, মাস, ঋতু
- leetspeak substitution: `a→@`, `i→1`, `o→0`, `e→3`
- সংযুক্ত সংখ্যা আর একটি trailing symbol

আপনার বানানো পাসওয়ার্ড একাধিক তালিকার মিলনস্থলে পড়ে। আধুনিক hardware দ্রুত hash-এর বিরুদ্ধে সেকেন্ডে কোটি কোটি candidate চেষ্টা করে, তাই মানুষের কাছে "জটিল" মনে হওয়া একটি pattern কয়েক ঘণ্টায় বা তার কম সময়েই crack হয়ে যায়।

## কী করে পাসওয়ার্ডকে শক্তিশালী

**লম্বাই জটিলতার চেয়ে এগিয়ে।** প্রতিটি অতিরিক্ত অক্ষর search space-কে গুণ করে। চারটি অসম্পর্কিত শব্দ — `harbour-lantern-margarine-tricycle` — `X7$kq2!`-এর চেয়ে দুটোই বেশি লম্বা এবং মনে রাখা সহজ, আর crack করা অনেক কঠিন। Master password-এর জন্য passphrase, বাকি সব জায়গায় random string বেছে নিন।

**Randomness vocabulary-র চেয়ে এগিয়ে।** সম্পূর্ণ character set থেকে বেছে নেওয়া একটি generator এমন string বানায় যার কোনো exploit করার মতো pattern নেই। একটি wordlist থেকে বেছে নেওয়া generator একটি passphrase বানায়, যা *ঠিক আছে* — যদি শব্দগুলো অসম্পর্কিত হয় এবং যথেষ্ট সংখ্যক থাকে।

**Uniqueness strength-এর চেয়ে এগিয়ে।** একটি সাইটে ব্যবহৃত 12-অক্ষরের পাসওয়ার্ড ঠিক আছে। একই 12-অক্ষরের পাসওয়ার্ড 40টি সাইটে মানে 40টি breach থেকে একটির দূরে। পাসওয়ার্ড ম্যানেজারের অস্তিত্বের কারণ ঠিক এটিই।

## কীভাবে generator ব্যবহার করবেন

এর যেকোনো একটি অফলাইনে সত্যিই random output দেয়, কোনো network জড়িত না করেই:

```bash
openkey gen -l 24                       # 24 characters
openkey gen -l 32 -a -c                 # avoid confusing characters, copy to clipboard
openkey gen -l 20 --no-symbols          # for sites that reject symbols
openkey --json gen -l 24                # machine-readable output
```

অ্যাপে **Settings → Password generator** খুলে আপনার default length ও character class ঠিক করুন, কিংবা কোনো entry form থেকেই generator ব্যবহার করুন। যে পাসওয়ার্ড রাখতে চান তার জন্য online generator এড়িয়ে চলা ভালো: আপনি কোনো অচেনা মানুষের server-কে একটি secret চাইছেন, আর সেটি কী করল তা যাচাই করতে পারবেন না।

### দৈর্ঘ্য বেছে নেওয়া

| প্রসঙ্গ | দৈর্ঘ্য |
|---------|--------|
| আপনার master password | ৪–৬টি অসম্পর্কিত শব্দ, বা 20+ অক্ষর |
| Email, banking, cloud account | 20+ random অক্ষর |
| সাধারণ সাইটের account | 16+ random অক্ষর |
| Password-expiry policy থাকা যেকোনো কিছু | Unique হলে 12–14 যথেষ্ট |

## Strength পরীক্ষা

Searcherরা অবিরাম "password strength checker" ও "password strength tester" নিয়ে জিজ্ঞাসা করেন, আর দরকারি পার্থক্যটা হলো একটি *candidate* পরীক্ষা করা আর *আপনার কাছে যা আছে* তার audit করা।

**একটি candidate-এর জন্য:** আগে দৈর্ঘ্য, তারপর দেখুন সেটি কোনো breach list-এ নেই এবং আপনার নাম, সাইটের নাম বা বর্তমান সাল থেকে derive করা নয়। একে কোথাও পাঠানোর দরকার নেই — দৈর্ঘ্যের একটি অনুমান আর pattern পরীক্ষা দুটোই local operation।

**আপনার vault-এর জন্য:** আপনি যা চান তা strength score নয়, একটি *reuse* report। তিনটি প্রশ্ন গুরুত্বপূর্ণ:

1. **আমি কি একাধিক সাইটে একই পাসওয়ার্ড ব্যবহার করি?** এটিই সেই finding, যা আসলে আপনার ঝুঁকি বদলে দেয়।
2. **এই পাসওয়ার্ড কি কোনো পরিচিত breach corpus-এ?** চুরি হওয়া পাসওয়ার্ড যেকোনো দৈর্ঘ্যে অকার্যকর, কারণ সেই নির্দিষ্ট string ক্র্যাকারদের wordlist-এ আগেই আছে।
3. **কোনো দামি জিনিস থাকা account-এ এই পাসওয়ার্ড কি বছরের পর বছর অপরিবর্তিত আছে?**

লক্ষ করুন, OpenKey ইচ্ছাকৃতভাবে have-i-been-pwned-এ ফোন করে না এবং password-health screen চালায় না, আর এটি একটি যুক্তিসঙ্গত default: একটি health screen হয়তো ডেটা পাঠায়, নয়তো লোকাল breach corpus চায়। বদলে নিজে হাতে audit করুন — email, banking আর cloud দিয়ে শুরু করে বাইরের দিকে এগোন।

## দুর্বল ও পুনর্ব্যবহৃত পাসওয়ার্ড ঠিক করা

আপনাকে একসঙ্গে সবকিছু বদলাতে হবে না। অগ্রাধিকার দিন:

1. **Email** — এটি বাকি প্রতিটি account reset করে।
2. **Banking আর cloud** — cloud storage বাকি সব ধরে রাখতে পারে।
3. **আপনার প্রধান social account** — password-reset flow সাধারণত email-এ নিয়ে যায়।
4. **আপনার master password**, যদি সেটি ছোট হয় বা কোথাও পুনর্ব্যবহৃত হয়।
5. **বাকি সব**, সুযোগ অনুযায়ী, যখন প্রতিটি সাইট পরেরবার আপনাকে বলে।

একটি বাস্তবসম্মত workflow:

1. আগে autofill চালু করুন, যাতে নতুন login নিজে থেকেই সংরক্ষিত হয়।
2. অগ্রাধিকারপ্রাপ্ত প্রতিটি account-এর জন্য নতুন random পাসওয়ার্ড জেনারেট করুন **লগ-ইন অবস্থায় থাকতেই**।
3. সেটি টাইপ না করে generator-এর মধ্য দিয়ে paste করুন।
4. একই সময়ে 2FA চালু করুন — আপনি তো ইতিমধ্যেই security settings-এ ([2FA গাইড](/bn/blog/two-factor-authentication))।
5. যেখানে দেওয়া হয় সেখানে একটি passkey যোগ করুন ([passkey কী?](/bn/blog/what-are-passkeys))।
6. Migration শেষ হলে পুরোনো plaintext export file মুছে ফেলুন ([Chrome থেকে import](/bn/blog/import-passwords-from-chrome))।

## সাধারণ নিয়ম

- কখনো পুনর্ব্যবহার করবেন না। আত্মসংযম দিয়ে নয়, generator দিয়ে এটি enforce করুন।
- দৈর্ঘ্য হলো আপনার হাতে থাকা সবচেয়ে সস্তা security।
- শুধু একটি বছর পেরিয়েছে বলে শক্তিশালী unique পাসওয়ার্ড rotate করবেন না। কারণ ছাড়া rotation মানে churn।
- পরিবর্তন করতে বাধ্য হলে পুরোনো পাসওয়ার্ডের শেষে `1` বা `!` জুড়বেন না — এটি একটি পরিচিত string-এর পূর্বানুমানযোগ্য সম্প্রসারণ, আর এভাবেই "আলাদা" পাসওয়ার্ডের একটি set একটি set হয়ে যায়।
- জেনারেট করা পাসওয়ার্ডের spreadsheet রাখবেন না। সেগুলো vault-এ রাখুন, আর একটি encrypted offline backup রাখুন।

## সার্চ ডেটা কী বলছে

Password generation পাসওয়ার্ড ম্যানেজারের একটি উপ-বিষয় নয়, একটি বড় স্বতন্ত্র cluster। Head-term-এর মাপে "password generator" টানে প্রায় "password manager"-এর আগ্রহের **36%**।

"strong password generator"-এ মানুষ যে refinement যোগ করে (Google Trends, worldwide, last 12 months):

| Related query | Relative interest |
|---------------|-------------------|
| google strong password generator | 100 |
| random strong password generator | 100 |
| random password generator | 99 |
| strong passwords | 58 |
| strong password generator online | 57 |
| generate strong password | 49 |
| password manager | 26 |
| apple strong password generator | 17 |

শীর্ষ দুটি হলো **Google** ও **Apple** account-এর সঙ্গে আসা built-in generator — মানুষ third-party সাইট নয়, বরং তাদের platform-এর সঙ্গেই আসা generator খুঁজছে। 57-এ থাকা "strong password generator online" দিয়ে সাবধান থাকা উচিত: একটি online generator হলো তৃতীয় একটি পক্ষ, যার কাছে যে secret আপনি রাখতে চান সেটি যাচ্ছে।

আলাদা একটি cluster audit-এর অভিপ্রায় স্পষ্টভাবে দেখায়। "password strength"-এর অধীনে সম্পর্কিত query: *password strength checker* (100), *strength check* (51), *strength tester* (41), *strength tool* (28), *strength generator* (27)। "Checker" ও "tester" ধরনের বাক্যাংশ বেশিরভাগই আপনার কাছে থাকা পাসওয়ার্ড যাচাই করা নিয়ে, তাই যারা ডেটা বাইরে পাঠাতে চান না তাদের কাছে in-app health screen-এর চেয়ে হাতে audit কার্যকর।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

দৈর্ঘ্য জটিলতার চেয়ে এগিয়ে, randomness vocabulary-র চেয়ে এগিয়ে, আর uniqueness দুটোরই চেয়ে এগিয়ে। ওয়েবসাইটের বদলে লোকাল টুল দিয়ে জেনারেট করুন, সাধারণ account-এর জন্য 16+ random অক্ষর আর master password-এর জন্য multi-word passphrase লক্ষ্য করুন, আর আপনার সীমিত শ্রম সেই accountগুলোতে ব্যয় করুন যেগুলো বাকিগুলো reset করতে পারে।

## পরবর্তী ধাপ

- [পাসওয়ার্ড ম্যানেজার কী?](/bn/blog/what-is-a-password-manager) — জেনারেট করা পাসওয়ার্ড কোথায় থাকে
- [Autofill passwords](/bn/blog/autofill-passwords) — signup-এ স্বয়ংক্রিয়ভাবে জেনারেট করুন
- [Two-factor authentication](/bn/blog/two-factor-authentication) — দ্বিতীয় স্তর
- [CLI guide](/bn/guide/cli#password-generation-gen) — generation flag ও character class
