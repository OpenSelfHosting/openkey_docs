---
title: Passkey কী
description: সহজ ভাষায় passkey গাইড — WebAuthn কীভাবে কাজ করে, কেন এগুলো phishing-এর শিকার হয় না, কীভাবে একটি তৈরি ও ব্যবহার করবেন, এবং আপনার পাসওয়ার্ড ম্যানেজারের কী হয়।
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# Passkey কী

একটি **passkey** হলো একটি login credential, যা অক্ষরের string-এর বদলে cryptographic key pair দিয়ে তৈরি। ব্যক্তিগত অংশটি আপনার ডিভাইসেই এনক্রিপ্টেড থাকে, আপনি যে unlock ব্যবহার করেনই (biometric, screen lock, বা master password) তার পেছনে। সাইট কেবল public অংশটি সংরক্ষণ করে, যা আপনি হিসেবে sign in করার জন্য অকার্যকর।

বাস্তব ফলাফল: টাইপ করার কোনো পাসওয়ার্ড নেই, phishing করার কিছু নেই, breach হওয়া সাইটের কাছে attacker-কে হস্তান্তর করার মতো কিছু নেই, আর social engineering করে reset করার কোনো flow নেই।

## পাসওয়ার্ডের যে সমস্যা আছে

আপনি যে কোনো login করেছেন তা একটি shared secret। আপনিও সাইটও একই string সংরক্ষণ করেন, যা তৈরি করে তিনটি failure mode:

- **Phishing।** Login page-এর একটি বিশ্বাসযোগ্য copy সেই string কুড়িয়ে নেয়, কারণ string-টি আসল সাইটে ও নকল সাইটে দুটোতেই কাজ করে।
- **Credential stuffing।** একটি সাইট থেকে leak হওয়া string পুনরায় চালানো হয় আপনার প্রতিটি অন্য account-এর বিরুদ্ধে, যেগুলো একই পাসওয়ার্ড ব্যবহার করে।
- **সার্ভার breach।** যেসব সাইট পড়া যায় এমন পাসওয়ার্ড সংরক্ষণ করে, সেগুলো breach হওয়ার সঙ্গে সঙ্গে attacker-কে কার্যকর credential তুলে দেয়।

Passkey shared secret সরিয়ে দেয়। সাইট কখনো পুনর্ব্যবহারযোগ্য কিছুই দেখে না।

## Passkey কীভাবে কাজ করে

রেজিস্ট্রেশন, আপনি প্রথমবার login করার সময়:

1. আপনার ডিভাইস একটি **key pair** জেনারেট করে — একটি private key আর একটি public key।
2. Public key সাইটে পাঠানো হয় এবং তার user database-এ সংরক্ষিত হয়।
3. Private key আপনার ডিভাইসেই এনক্রিপ্টেড অবস্থায় থাকে, আর unlock করার পরেই কেবল ব্যবহারযোগ্য হয়।

Sign in, তারপর প্রতিবার:

1. সাইট একটি **challenge** ইস্যু করে।
2. আপনার ডিভাইস সেটিকে private key দিয়ে sign করে।
3. সাইট signature-টি যাচাই করে সংরক্ষিত public key-এর বিপরীতে।

দুই ধাপেই কোনো shared secret নেই। নকল সাইট ব্যবহার করা যায় না, কারণ challenge আসে আসল সাইট থেকে আর আপনার ডিভাইস কেবল সেই origin-এর জন্যই sign করবে যেখানে এটি রেজিস্টার করা ছিল। এটিই anti-phishing বৈশিষ্ট্য, আর এটি আসে প্রোটোকল থেকে, ব্যবহারকারীর সতর্কতা থেকে নয়।

ভেতরে এটি **WebAuthn** (এখন passkey বলা হয়), আর credential সাধারণত একটি **FIDO2** hardware authenticator-এ থাকে — আপনার ডিভাইসের secure element, একটি platform authenticator, কিংবা একটি USB/NFC security key।

## Passkey তৈরি করা

প্রায় সব জায়গায় flow একই, আর credential-টি দেয় আপনার পাসওয়ার্ড ম্যানেজার:

1. সাইটের sign-in page-এ **Sign in with a passkey** বেছে নিন (কিংবা এখনো account না থাকলে **Create a passkey**)।
2. আপনার provider একটি confirmation dialog দেখায়, যেখানে সাইট ও account-এর নাম থাকে।
3. Face ID, Touch ID, fingerprint, বা আপনার ডিভাইসের PIN দিয়ে অনুমোদন দিন।
4. শেষ। Passkey-টি আপনার vault-এ সংরক্ষিত ও ওই সাইটের সঙ্গে যুক্ত।

Dialog-এ "Use browser" বা "Use this device instead" বিকল্প থাকলে সেটি নিতে হলে credential-টি আপনার ম্যানেজারের বদলে platform authenticator-এ চলে যায় — একবারের কাজে কাজে, কিন্তু তার মানে passkey আর আপনার vault-এ নেই।

## দৈনন্দিন passkey ব্যবহার

Login নিজে কোনোটাই বদলায় না, শুধু নিচের দিকের প্রক্রিয়াটি বদলায়:

1. Username field-এ focus দিন আর **Sign in with a passkey**-এ ক্লিক করুন।
2. Prompt-টি অনুমোদন করুন।
3. সাইট signature যাচাই করে। আপনি ঢুকে গেছেন।

কোনো টাইপ নেই, কোনো paste buffer নেই, কোনো দ্বিতীয় factor prompt নেই — unlock *হলোই* দ্বিতীয় factor। যেহেতু আপনার ডিভাইস approval dialog-এ request করা সাইটটি দেখায়, কোনো attacker সেটি নীরবে অন্যদিকে redirect করতে পারে না।

## Passkey সরানো ও স্থানান্তর

- **সরানো:** সাইটের account security settings খুলে সেখানে passkey মুছুন, কিংবা আপনার provider থেকে সরান। এক জায়গায় মুছলে অন্য কপি অক্ষত থেকে যায়, তাই পুরোপুরি বিলুপ্ত করতে চাইলে দুটো জায়গা থেকেই সরান।
- **স্থানান্তর:** platform account (iCloud Keychain, Google Password Manager) দিয়ে sync হওয়া passkey সেই account-এর সঙ্গে সরে যায়। Self-hosted vault-এ সংরক্ষিত passkey sync করলে, কিংবা নতুন ম্যানেজারে import করলে সরে যায়।

আপনি যদি passkey ধরে রাখা প্রতিটি ডিভাইস হারিয়ে ফেলেন *এবং* কোনো recovery path না থাকে, তাহলে account আর পুনরুদ্ধারযোগ্য নয়। অন্তত একটি passkey দ্বিতীয় ডিভাইস বা security key-তে রেজিস্টার করে রাখুন।

## Passkey ও পাসওয়ার্ড ম্যানেজার

Passkey আপনার পাসওয়ার্ড ম্যানেজারকে প্রতিস্থাপন করে না — সবচেয়ে দুর্বল কাজ থেকে সবচেয়ে শক্তিশালী কাজে তা সরিয়ে দেয়।

| কাজ | আগে | পরে |
|-----|------|------|
| পাসওয়ার্ড মনে রাখা | মাথার মধ্যে একটি string, পুনর্ব্যবহৃত | vault-এ একটি key pair |
| Phishing-এর বিরুদ্ধে স্থায়িত্ব | ম্যানুয়াল domain যাচাই | Cryptographic, ভেতরেই তৈরি |
| দ্বিতীয় factor | একটি ঘুরতে থাকা code | নিজেই ডিভাইসের unlock |
| Breach-এর প্রভাব | সাইটের database-এ পড়া যায় এমন credential | একটি public key, attacker-এর কাজে অকার্যকর |

ম্যানেজার এখনও passkey-এর private key সংরক্ষণ করে, এখনও vault unlock-এর উপর প্রবেশাধিকার নির্ভর করে, আর এখনও sync করে। যা বদলায় তা হলো — সংরক্ষিত secret আর মনে রাখার মতো string নয়, যা পাসওয়ার্ড পুনর্ব্যবহৃত হওয়ার পুরো কারণটাই সরিয়ে দেয়।

OpenKey-এ extension WebAuthn-এর `create` ও `get` call intercept করে, ES256 credential সংরক্ষণ করে, আর আপনি চাইলে platform authenticator-এ ফিরে যায়। System-level provider-এর পথ OS credential UI-এর সঙ্গে কথা বলে এমন app ও browser কভার করে। দুটোই unlock-এর পরে, ক্লায়েন্টে চলে। [OpenKey-এ কীভাবে কাজ করে](/bn/blog/passkeys-and-autofill)।

## Passkey কি এখনো সব জায়গায় কাজ করে?

প্রায় সব জায়গায়, কিছু স্থায়ী ফাঁক রয়ে গেছে: কিছু enterprise single-sign-on setup, কিছু পুরোনো mobile app WebView, আর এমন কয়েকটি সাইট যেগুলো WebAuthn বাস্তবায়ন করেছে কিন্তু passkey sync করেনি। বাস্তবসম্মত উপায় হলো — কোনো সাইট দুটোই দেওয়া থাকলে ম্যানেজারে পাসওয়ার্ড fallback হিসেবে রেখে দিন, আর passkey দেওয়া থাকলে সেটিই বেছে নিন।

## সার্চ ডেটা কী বলছে

Passkey-তে আগ্রহ বড় এবং এখনও বাড়ছে, আর query-গুলো বিপুলভাবে beginner-এর প্রশ্ন। Google Trends (worldwide, last 12 months)-এ "passkey"-এর refinement:

| Related query | Relative interest |
|---------------|-------------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

"what is a passkey" এবং "what is passkey" হলো cluster-এর দুটি শক্তিশালীতম query, আর "what is a passkey" বছরে বছরে প্রায় 450% বেড়েছে। এটাই একটি প্রযুক্তি enthusiast থেকে সাধারণ দর্শকের দিকে পেরিয়ে যাওয়ার আকৃতি: এখনও প্রায় কেউ passkey *management* খুঁজছে না, বেশিরভাগ মানুষ সংজ্ঞা খুঁজছে।

Head-term-এর মাপে "passkey" টানে প্রায় "password manager"-এর search আগ্রহের 42%, আর "2fa" টানে প্রায় 67% — দুটোই উল্লেখযোগ্য, আর দুটোই একই কাজের দিকে এগোচ্ছে।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

Passkey হলো একটি key pair, যেখানে ব্যক্তিগত অংশটি আপনার ডিভাইসে এনক্রিপ্টেড থাকে আর সাইট কেবল public অংশটি সংরক্ষণ করে। কারণ কোনো shared secret নেই, নকল সাইট কিছুই পুনর্ব্যবহারযোগ্য জমাতে পারে না, আর ডিভাইসের unlock-ই দ্বিতীয় factor হয়ে যায়। কোনো সাইটের sign-in page থেকে একটি তৈরি করুন, Face ID বা ডিভাইসের PIN দিয়ে অনুমোদন দিন, আর পরের বার একটি ট্যাপ ও একটি signature দিয়ে login করুন।

## পরবর্তী ধাপ

- [ব্রাউজারে passkey ও autofill](/bn/blog/passkeys-and-autofill) — OpenKey implementation
- [পাসওয়ার্ড ম্যানেজার কী?](/bn/blog/what-is-a-password-manager) — passkey কোথায় থাকে
- [Browser extension](/bn/guide/extension) — WebAuthn setup ও fallback আচরণ
- [Two-factor authentication](/bn/blog/two-factor-authentication) — passkey কী প্রতিস্থাপন করে
