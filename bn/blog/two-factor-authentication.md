---
title: পাসওয়ার্ড ম্যানেজারে two-factor authentication
description: 2FA ও TOTP code কী, যে login-এর সঙ্গে authenticator seed সংরক্ষণ করবেন তা কীভাবে, এবং passkey কীভাবে পুরো ছবিটাই বদলে দেয়।
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# পাসওয়ার্ড ম্যানেজারে two-factor authentication

**Two-factor authentication (2FA)** মানে শুধু পাসওয়ার্ড দিয়ে নয়, দ্বিতীয় একটি প্রমাণ দিয়ে প্রমাণ করা যে আপনি আপনিই। সবচেয়ে সাধারণ রূপ হলো authenticator app থেকে আসা ঘুরতে থাকা ছয়-অঙ্কের code — **TOTP** — যা shared seed থেকে সময়ভিত্তিক একটি one-time password হিসাব করে পাওয়া যায়।

অস্বস্তির দিকটা হলো seed আর code আপনার পাসওয়ার্ডের থেকে *আলাদা app*-এ থাকে। এই নিবন্ধে mechanics ব্যাখ্যা করা হলো, কেন পাসওয়ার্ড ম্যানেজারে seed সংরক্ষণ করাই যুক্তিসঙ্গত ব্যবস্থা, এবং passkey কীভাবে সেটি বদলে দেয়।

## 2FA কীভাবে কাজ করে

1. কোনো সাইটে 2FA চালু করলে সেটি আপনাকে একটি **secret** দেখায় — সাধারণত `otpauth://` URI ধারণকারী QR code হিসেবে।
2. আপনি সেই secret scan বা paste করে একটি authenticator-এ নেন।
3. প্রতি ৩০ সেকেন্ডে authenticator secret ও বর্তমান সময় থেকে ছয়-অঙ্কের code হিসাব করে: `HMAC(secret, floor(time/30))`।
4. সাইট একই মান হিসাব করে। মিললে আপনি ঢুকে গেছেন।

এক মিনিট পরে code-টি নিষ্প্রভ, তাই এটি কাজ করে। কিন্তু *secret* কার্যত একটি স্থায়ী পাসওয়ার্ড — যে এটি পায়, সে চিরকাল বৈধ code বানাতে পারে।

## সিদ্ধান্ত: authenticator app, SMS, নাকি passkey

| পদ্ধতি | Phishable | সার্ভার breach-এর প্রভাব | নোট |
|--------|-----------|----------------------|-----|
| SMS code | হ্যাঁ | না | SIM swap ও নম্বর পুনর্বণ্টের ঝুঁকিতে; তবু কিছু না থাকার চেয়ে ভালো |
| TOTP app / code | হ্যাঁ (seed চুরি) | না | Offline কাজ করে; secret রক্ষা করতে হবে |
| Hardware key (FIDO2) | না | না | সবচেয়ে শক্তিশালী; backup হিসেবে দ্বিতীয় ডিভাইস বা key লাগবে |
| Passkey | না | না | টাইপ করার কিছু নেই, চুরি করার কিছু নেই; নিচে দেখুন |

Hardware key আর passkey-ই একমাত্র বিকল্প, যেগুলো phishing করা যায় না, কারণ credential কখনো আপনার ডিভাইস ছাড়ে না আর signing-টি bound থাকে request করা origin-এর সঙ্গে।

## কেন TOTP seed আপনার vault-এ থাকা উচিত

সাধারণ পরামর্শ হলো "আপনার authenticator app-কে পাসওয়ার্ড ম্যানেজার থেকে আলাদা রাখুন" — যুক্তিটি বুদ্ধিসঙ্গত, কারণ একটি compromised app-এর সব খুলে যাওয়া উচিত নয়। বাস্তবে এটি আরও খারাপ সমস্যা তৈরি করে: পাসওয়ার্ড আর তার দ্বিতীয় factor আলাদা জায়গায় থাকে, তাই একটি ছাড়া অন্যটি থেকে পুনরুদ্ধার অসম্ভব হয়ে যায়, আর মানুষ বারবার 2FA আবার enroll করতে থাকে।

ভালো framing: TOTP seed-কে **credential-এর একটি অংশ** হিসেবে দেখুন, আর একই নিয়ন্ত্রণে রক্ষা করুন। আপনার vault master password-এর পেছনে — এবং আদর্শভাবে biometric-এর পেছনে — unlock থাকলে, seed আর তার যে পাসওয়ার্ডকে সে রক্ষা করে তার চেয়ে দুর্বল নয়, আর সে সবসময় সেই জায়গাতেই থাকে যেখানে আপনার দরকার।

বেশিরভাগ ম্যানেজার সরাসরি এটা সমর্থন করে: secret paste করুন, `otpauth://` URI paste করুন, কিংবা QR code সরাসরি entry-তে scan করুন।

OpenKey-এ, login entry-তে authenticator secret বা `otpauth` URI যোগ করুন, কিংবা সাইটের 2FA setup screen থেকে QR scan করুন। Vault unlocked থাকলেই code দেখা যায়, আর platform সমর্থন করলে system Autofill provider বা browser extension সেগুলো ফিল করতে পারে। Terminal থেকে CLI সরাসরি পড়তে পারে:

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## কোনো account-এ 2FA setup করা

1. Login করে সাইটের security settings খুলুন।
2. Authenticator app বেছে নিন, আর **QR code scan করুন** কিংবা secret হাতে লিখুন।
3. ওই secret-এর একটি কপি username ও password-এর সঙ্গে একই vault entry-তে সংরক্ষণ করুন।
4. নিশ্চিত করতে বর্তমান code দিন।
5. সাইটের **recovery code** আপনার নিয়ন্ত্রণে থাকা কোথাও সংরক্ষণ করুন — একই vault-এ একটি encrypted note, কিংবা অফলাইন রাখা একটি printout।

ধাপ ৩-টি মানুষ বাদ দেয়, আর পরে ফোন বদলানোর সময় ঠিক এই ধাপটিই আপনাকে বাঁচায়।

## পুরো account-এ তা বাধ্যতামূলক করা

কয়েকটি login-এ 2FA চালু হলে, সেটিকে default হিসেবে বিবেচনা করুন:

- **প্রতি সাইটে একটি recovery method** সংরক্ষণ করুন, কারণ প্রতিটি সাইট এটি ভিন্নভাবে সামলায়।
- যেখানে সাইট অনুমতি দেয় সেখানে **দুটি authenticator** ব্যবহার করুন: ফোন আর ডেস্কটপ, দুটোই vault থেকে খাওয়ানো। একটি ডিভাইস হারালে অপরটি এখনও কাজ করবে।
- **আগে email-এ 2FA চালু করুন**। এটিই সেই account, যা বাকি সব account reset করে।
- Hardware-key বা passkey বিকল্প আছে কি না দেখুন, আর নিশ্চিন্ত হওয়া পর্যন্ত তার পরিবর্তে নয়, TOTP-এর পাশাপাশি সেটি যোগ করুন।

## 2FA কোথায় ভুল হয়

**Backup ছাড়া ফোন হারানো।** দ্বিতীয় authenticator, recovery code, বা hardware key ছাড়া account শেষ। এটি একক সবচেয়ে সাধারণ 2FA failure, আর recovery code-এর গুরুত্ব এর জন্যই।

**Screenshot-এ seed।** ছবি তোলা QR code হলো plaintext credential। Seed vault-এ সংরক্ষণ করে ছবিটি মুছে ফেলুন।

**Sync হওয়া notes file-এ seed।** Cloud notes plaintext-এ sync হয়। Recovery material-এর জন্য notes ব্যবহার করলে সেটি encrypted vault-এর ভেতরে থাকা উচিত।

**ভুল app থেকে টাইপ করা ঘুরতে থাকা code।** কিছু authenticator-এ account সাজানোর সুবিধা আছে, যা ফলে ভুল সাইটের বিরুদ্ধে code বসে যায়। এটি security-র সমস্যা নয় — একটি support সমস্যা।

**ধরে নেওয়া যে 2FA reuse নিরাপদ করে।** তা করে না। দুটি সাইটে একই পাসওয়ার্ড পুনর্ব্যবহার করলে এবং কেবল একটিতে 2FA থাকলে, অপরটি এখনও একটি breach দূরে।

## Passkey কীভাবে 2FA বদলে দেয়

Passkey দ্বিতীয় factor-টিকে শক্তিশালী না করে, বরং সরিয়ে দেয়। Private key ডিভাইসের নিরাপদ hardware দ্বারা সুরক্ষিত আর biometric বা PIN যাচাইয়ের পরেই ব্যবহারযোগ্য, তাই "আপনি যা জানেন" আর "আপনি যা" একে একটি hardware-backed কাজে মিলে যায়। চুরি করার মতো code নেই, leak হওয়ার মতো seed নেই, আর swap করার মতো SIM নেই।

তাই passkey-ই সেই দিক, যেদিকে শিল্প চলে গেছে: এগুলো সেই বিরল credential, যা একই সঙ্গে *বেশি* নিরাপদ *এবং* কম কাজ। 2FA রাখার অবশিষ্ট কারণ হলো coverage — passkey এখনো প্রতিটি সাইটে নেই, তাই যেগুলো এখনো পিছিয়ে আছে তাদের জন্য vault-এর TOTP seed একটি যুক্তিসঙ্গত সেতু।

[Passkey কীভাবে কাজ করে সে সম্পর্কে আরও](/bn/blog/what-are-passkeys) · [OpenKey কীভাবে সামলায়](/bn/blog/passkeys-and-autofill)

## সার্চ ডেটা কী বলছে

2FA হলো ওয়েবে security-পাশাপাশি সবচেয়ে বড় query term-গুলোর একটি। Head-term-এর মাপে "2fa" টানে মোটামুটি **67%** "password manager"-এর আগ্রহ — "passkey" 42% ও "password generator" 36%-এর চেয়ে বেশি।

"two-factor authentication"-এ মানুষ যে refinement যোগ করে (Google Trends, worldwide, last 12 months):

| Related query | Relative interest |
|---------------|-------------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

"what is two-factor authentication" একই সঙ্গে cluster-এর দ্রুততম বর্ধনশীল term, বছরে বছরে প্রায় 550% বৃদ্ধি। সংজ্ঞামূলক query সবচেয়ে দ্রুত বাড়ছে — এটি স্পষ্ট সংকেত যে শ্রোতারা নতুন, তাই এই নিবন্ধ recommendation দিয়ে শুরু না করে mechanics দিয়ে শুরু করে।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## এক মিনিটের সংস্করণ

TOTP code হিসাব হয় সাইটের সঙ্গে ভাগ করা একটি স্থায়ী secret থেকে, তাই সেই secret কার্যত একটি পাসওয়ার্ড এবং একই সুরক্ষা দাবি করে। সেটি username ও password-এর সঙ্গে একই encrypted vault entry-তে রাখুন, একটি দ্বিতীয় authenticator রাখুন, সাইটের recovery code অফলাইনে সংরক্ষণ করুন, আগে email account-এ 2FA চালু করুন, আর যেখানে দেওয়া হয় সেখানে একটি passkey যোগ করুন।

## পরবর্তী ধাপ

- [Passkey কী?](/bn/blog/what-are-passkeys) — code-এর বদলে যে credential
- [Autofill passwords](/bn/blog/autofill-passwords) — login ও code একসঙ্গে ফিল করা
- [Using the app](/bn/guide/app) — entry-তে TOTP যোগ করা
- [CLI guide](/bn/guide/cli#secrets-ও-logins-এ-search) — terminal থেকে code পড়া
