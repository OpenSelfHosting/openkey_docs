---
title: "LastPass alternative: কীভাবে migrate করবেন আর কী খুঁজবেন"
description: LastPass থেকে সরে আসা — কী export করবেন, অন্য ম্যানেজারে কীভাবে import করবেন, আর প্রতিস্থাপক বেছে নেওয়ার আগে যে চারটি শর্ত যাচাই করতে হবে।
date: 2026-09-19
cover: /blog/covers/lastpass-alternative.png
---

# LastPass alternative: কীভাবে migrate করবেন আর কী খুঁজবেন

LastPass বেশিরভাগ দেশে সবচেয়ে পরিচিত পাসওয়ার্ড ম্যানেজারের নাম, যার কারণে "lastpass alternative" এই ক্যাটাগরির সবচেয়ে বেশি সার্চ করা তুলনাগুলোর একটি। মানুষ তিনটি ভিন্ন কারণে এখানে আসে, আর তাদের তিনটি ভিন্ন জিনিস দরকার:

1. **Trust** — আপনি "কে আমার পাসওয়ার্ড পড়তে পারে" প্রশ্নের একটি ভিন্ন উত্তর চান।
2. **Cost or limits** — free tier বা family plan আর মানানসই নেই।
3. **Features** — আপনি passkey, self-hosting, বা developer secret চান।

এই নিবন্ধে রয়েছে migration-এর সময় আসলে কী বদলায়, commit করার আগে কী যাচাই করতে হবে, আর এমনভাবে switch করবেন কীভাবে যাতে এক মুহূর্তের জন্যও আপনি কোনো কিছুতে login করতে না পারেন।

## এই migration-কে আলাদা করে কী দেয়

LastPass অনেকদিন ধরে খবরের মুখে, আর migration-এর বাস্তব পরিণতি বাস্তব, নাটকীয় নয়:

- **Export হয় একটি CSV।** plaintext, unencrypted, সব পাসওয়ার্ড খোলামেলা। ফাইলটি যে পেয়ে গেল, তার কাছে আপনার পুরো vault।
- **Password-protected export পাওয়া যেতে পারে।** আপনার plan-এ সেটি থাকলে, default CSV-এর তুলনায় তা উল্লেখযোগ্যভাবে নিরাপদ। সেটিই ব্যবহার করুন।
- **Export-এ attachment-এর সমর্থন সীমিত।** entry-তে যুক্ত ফাইল সাধারণত CSV-তে আসে না।
- **দীর্ঘমেয়াদি ব্যবহারকারীদের ক্ষেত্রে vault বড়।** এক দশকের পুরনো account অনেক folder-এ ছড়িয়ে কয়েকশো entry রাখতে পারে। এক বিকেলের সময় হিসাব করুন।

এই migration-এর সবচেয়ে গুরুত্বপূর্ণ একটি কথা হলো এটি **একমুখী export, তারপর একবারের import**। সাবধানে করুন, যাচাই করুন, তারপরেই পুরনো account মুছুন।

## প্রতিস্থাপকের জন্য চারটি শর্ত

### 1. এটি zero-knowledge হতে হবে, প্রমাণসহ

দেখুন decryption key কার কাছে। কোনো support agent যদি আপনার master password reset করতে পারে বা vault unlock করতে পারে, তাহলে marketing যা-ই বলুক, আপনি তাদের infrastructure-এর উপর আপনার plaintext-এর ভরসা রাখছেন। একটি ভালো প্রতিস্থাপক আপনি vault তৈরি করার আগেই জানিয়ে দেয় যে ভুলে যাওয়া master password কেউ — তারা-ও — পুনরুদ্ধার করতে পারে না।

### 2. এটি আপনার LastPass CSV import করতে হবে

নিশ্চিত করুন importer-এ LastPass CSV-এর নির্দিষ্ট সমর্থন আছে, আর folder structure collection-এ ম্যাপ হয়। টুলটি যদি অনুমতি দেয়, আগে একটি আংশিক export দিয়ে টেস্ট করুন।

### 3. এটি আপনার বের হওয়াকে paywall করবে না

এটিই লক্ষ্য করার মতো অসমতা: **import ফ্রি, export পেইড**। যেসব ম্যানেজার আপনাকে ঢোয়ায় কিন্তু বের হতে charge করে, তারা নিঃশব্দে আপনার ডেটাকে থেকে যাওয়ার একটি কারণ বানিয়ে দিয়েছে। migrate করার আগে export tier যাচাই করুন, পরে নয়।

### 4. এটি আপনার ডিভাইসগুলোতে সঠিকভাবে autofill করতে হবে

প্রথম সপ্তাহে autofill-ই আপনার সবচেয়ে বেশি চোখে পড়বে। পুরনো account মুছে ফেলার আগে আপনার সবচেয়ে বেশি ব্যবহৃত তিনটি সাইটে এটি টেস্ট করুন।

## ধাপে ধাপে migrate করা

### 1. LastPass থেকে export

1. Login করুন, **Settings → Advanced Export** খুলুন, আর **LastPass CSV** বেছে নিন (অথবা plan-এ থাকলে password-protected export)।
2. এমন জায়গায় সংরক্ষণ করুন যা আপনার নিয়ন্ত্রণে, shared cloud folder-এ নয়।
3. এটি email করবেন না, Downloads-এ রেখে দেবেন না।

### 2. নতুন ম্যানেজারে import

OpenKey-এ: **Settings → Data → Import & export → Import → LastPass CSV**, ফাইলটি বেছে নিন, আর নিশ্চিত করুন। সবকিছু স্থানীয়ভাবে ঘটে — কোনো server round-trip নেই, আর আপনার plaintext কখনো sync server ছোঁয় না।

folder থেকে collection-এ ম্যাপ হওয়া আশা করুন, আর খুব পুরনো vault-এর ক্ষেত্রে কিছু entry folder ছাড়াই এসে পড়তে পারে। ধরে নেবেন না, পরে review করুন।

### 3. পাসওয়ার্ড বদলানোর আগেই autofill চালু করুন

এই ক্রমটি গুরুত্বপূর্ণ। Autofill কাজ করলে এই মুহূর্ত থেকে আপনার প্রতিটি login স্বয়ংক্রিয়ভাবে ধরা পড়ে, তাই আপনি কাজ করতে করতেই vault নিজেকে আবার সাজিয়ে নেয়।

- [Autofill passwords](/bn/blog/autofill-passwords) — setup guide
- [Autofill not working](/bn/blog/autofill-not-working) — যখন সহযোগিতা করে না

### 4. সবচেয়ে মূল্যবান account আগে ঠিক করুন

400টি পাসওয়ার্ড rotate করার চেষ্টা করবেন না। আগে email, banking, আর cloud rotate করুন, প্রতিটি তৈরি করতে করতে:

```bash
openkey gen -l 24
```

একই সঙ্গে 2FA যোগ করুন ([guide](/bn/blog/two-factor-authentication)), আর সাইট যেখানে দেয় সেখানে passkey যোগ করুন ([passkey কী?](/bn/blog/what-are-passkeys))।

### 5. যাচাই করুন, তারপর export ধ্বংস করুন

- গুরুত্বপূর্ণ কিছু login spot-check করুন, ব্যবহার করে থাকলে TOTP entry-ও।
- আপনার main browser আর ফোনে autofill নিশ্চিত করুন।
- দ্বিতীয় ডিভাইসে sign in করতে পারছেন কি না নিশ্চিত করুন।
- **CSV নিরাপদে মুছুন।** এটি ঠিকভাবে করুন; SSD-তে মুছে ফেলা ফাইল পুনরুদ্ধারযোগ্য হতে পারে। ফাইলটি overwrite করা আর trash খালি করা যুক্তিসঙ্গত সর্বনিম্ন পদক্ষেপ।
- যেকোনো কিছু যদি বহুদিন সেই plaintext ফাইলে থেকে থাকে, সেটি rotate করুন।

### 6. Cancel করার আগে একটি backup রাখুন

আগে একটি encrypted local backup নিন — OpenKey-এ এটি একটি `.okbak`, কিংবা আপনার ম্যানেজারের সমতুল্য। তারপর পুরনো account মুছুন। cancel করা দ্বিতীয় ধাপ নয়, শেষ ধাপ হওয়া উচিত।

## মানুষ সাধারণত কোথায় switch করে

| আপনি যদি চান… | দেখুন |
|-------------|---------|
| কোনো server নেই, কোনো vendor নেই, শুধু local file | KeePass-এর মতো file-based manager — চমৎকার, তবে backup আপনার দায়িত্ব |
| নিজের sync server, open code | self-host করার উপযোগী একটি manager — [OpenKey](/bn/blog/self-hosted-password-manager) এরকম একটি |
| আসল free tier-সহ vendor polish | mainstream manager-গুলোর যেকোনো একটি, [এখানকার মানদণ্ডে](/bn/blog/best-password-managers) বিচার করে |
| একেবারেই migration নয় — শুধু আরেকটি manager যোগ করা | দুটোই এক মাস চালান; নিশ্চিত না হওয়া পর্যন্ত পুরনো account-টি read-only রাখুন |

দুটি ম্যানেজার পাশাপাশি চালানো সবচেয়ে কম ঝুঁকির বিকল্প, আর এর জন্য কিছুই খরচ হয় না। পুরনোটিতে autofill বন্ধ করে দিন, install করা রাখুন, আর এক সপ্তাহ ঝামেলামুক্ত login-এর পরেই account মুছুন।

## সার্চ ডেটা কী বলছে

Google Trends (worldwide, last 12 months) দেখায় LastPass alternatives একটি বাস্তব ও বর্ধনশীল cluster, আর 1Password alternatives LastPass-এর চেয়ে বেশি search interest আকর্ষণ করে। পরস্পরের তুলনায় alternative query-গুলো মাপলে:

| Query | Cluster-এ relative interest |
|-------|-------------------------------|
| 1password alternative | 100 |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

"1password alternative" যা আনুমানিক "lastpass alternative"-এর চার গুণ আগ্রহে বসে আছে, সেটি থামার দরকার: এটি বোঝায় যে এই ক্যাটাগরির সবচেয়ে বড় migration wave LastPass থেকে সরে আসার জন্য নয়, বরং 1Password-এর pricing আর family-plan কাঠামোই চালিকাশক্তি। "1password pricing" সংক্রান্ত search-ও Bitwarden-এর সঙ্গে যুক্ত দ্রুততম-বর্ধনশীল query-গুলোর মধ্যে, বছরে প্রায় 200% বৃদ্ধি।

Head term এখনো অত্যন্ত brand-কেন্দ্রিক। "password manager"-এর refinement-গুলোর মধ্যে Bitwarden আর 1Password দুটোই LastPass-এর চেয়ে বেশি brand search পায়, কিন্তু LastPass *সংজ্ঞামূলক* ও recovery query-তে অনেক বেশি আসে — সবচেয়ে স্পষ্টভাবে "lastpass forgot master password", যেটি "forgot master password"-এর নিচে সবচেয়ে শক্তিশালী একটি related query।

এই ভাগটিই কার্যকর বিদ্বান্তি: কিছু একটা ভুল হলে LastPass সার্চ করা হয়, আর কিছু একটা ব্যয়বহুল হয়ে উঠলে 1Password। ভিন্ন সমস্যা, ভিন্ন সমাধান — আর তার একটি মোটেও security সমস্যা নয়।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

LastPass থেকে export করুন (পাওয়া গেলে password-protected), CSV-টি এমন প্রতিস্থাপকে import করুন যার export ফ্রি আর vault zero-knowledge, কিছু বদলানোর আগে autofill চালু করুন, আগে email আর banking rotate করুন, তারপর export মুছুন, আর তারপরেই পুরনো account। cancel করার আগে একটি encrypted backup রাখুন।

## পরবর্তী ধাপ

- [1Password alternative](/bn/blog/1password-alternative) — একই প্রক্রিয়া, ভিন্ন কারণ
- [Import from Chrome](/bn/blog/import-passwords-from-chrome) — যদি আপনি browser export-ও একসঙ্গে এক জায়গায় আনছেন
- [Best password managers](/bn/blog/best-password-managers) — scoring sheet
- [Import & export](/bn/guide/import-export) — সমর্থিত format, free বনাম Pro
