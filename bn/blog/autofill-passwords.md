---
title: "Autofill passwords: কীভাবে setup ও ঠিক করবেন"
description: Autofill কী, Chrome, Firefox, Safari ও মোবাইলে password autofill কীভাবে চালু করবেন, এবং OpenKey কীভাবে login, card ও passkey ফিল করে।
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autofill passwords: কীভাবে setup ও ঠিক করবেন

**Autofill** হলো সেই feature, যা পাসওয়ার্ড ম্যানেজারকে "পাসওয়ার্ড যেখানে রাখা হয়" সেই জায়গা থেকে বদলে দিয়ে আপনি আসলে ব্যবহার করেন এমন টুল বানিয়ে দেয়। vault খুলে সঠিক entry খুঁজে একটা string copy করার বদলে আপনি username field-এ focus দেন, আর একটি suggestion চোখের সামনে হয়ে ওঠে।

এখানেই বেশিরভাগ মানুষ প্রথম search করেন — "how to autofill", "autofill password", "autofill chrome", "autofill iphone" — আর এখানেই বেশিরভাগ মানুষ প্রথম হাল ছেড়ে দেন। তাই: এটা কী, কোথাও কীভাবে চালু করবেন, আর কীভাবে নির্ভরযোগ্য করবেন।

## Autofill আসলে কী করে

একই নামে তিনটি আলাদা mechanism চলে:

1. **Form autofill** — একটি login page শনাক্ত হয়, ম্যানেজার মিলে যাওয়া entry দেখায়, আপনি একটি ট্যাপ করেন, আর username ও password ফিল হয়ে যায়।
2. **Save prompt** — login করার পর ম্যানেজার credential সংরক্ষণ বা আপডেট করার প্রস্তাব দেয়।
3. **Password generation** — sign-up form-এ ম্যানেজার একটি শক্তিশালী পাসওয়ার্ড তৈরি করে আপনি টাইপ করার সঙ্গে সঙ্গে সেটি field-এ লিখে দেয়।

তৃতীয়টিই কম-মূল্যায়িত অংশ। Signup-এর *চলাকালেই* পাসওয়ার্ড জেনারেট করা একমাত্র সেরা অভ্যাস-পরিবর্তন: এটি সেই মুহূর্তটাই সরিয়ে দেয় যেখানে আপনি নিজে কিছু দুর্বল বানিয়ে ফেলতেন, কারণ আপনি টাইপ করার আগেই field ভর্তি হয়ে যায়।

## Chrome-এ autofill চালু করুন

Chrome-এর নিজস্ব ম্যানেজার আর third-party ম্যানেজার — দুটোই একই জায়গায়, তাই এটি বিভ্রান্তিকর হয়ে যায়।

1. `chrome://settings/addresses` খুলুন (passwords and autofill)।
2. **Offer to save passwords** চালু করুন।
3. এক ট্যাপে sign-in চাইলে **Automatically sign in with saved passwords** চালু করুন।
4. **Passwords, passkeys and autofill**-এর অধীনে যে ম্যানেজার ব্যবহার করতে চান সেটি বাছুন — Chrome-এর নিজস্ব, অথবা আপনার পাসওয়ার্ড ম্যানেজারের extension।
5. Extension ব্যবহার করলে তার popup একবার খুলে নিশ্চিত করুন যে সেটি unlocked।

Keyboard দিয়ে fill করাও সাধারণত কাজ করে: Windows ও Linux-এ `Ctrl+Shift+L`, macOS-এ `⌘⇧L`। আগে থেকেই অন্য কোনো extension এই shortcut ধরে রেখে থাকলে, ব্রাউজারের extension keyboard shortcuts-এ গিয়ে remap করুন।

## Firefox-এ autofill

Firefox-এর নিজস্ব built-in manager আছে, আর কোন extension fill করতে পারে সে বিষয়ে এটি বেশ কড়া। suggestion না এলে দেখুন extension-টি ওই সাইটে অনুমোদিত কি না, আর extension unlocked কি না। Firefox native messaging host-এর জন্য `openkey@openselfhosting.local` স্বয়ংক্রিয়ভাবে ব্যবহার করে — ওই platform-এ কোনো ম্যানুয়াল manifest সম্পাদনা লাগে না।

## iPhone ও iPad-এ autofill

Android-এর মতো iOS-এ "যেকোনো app থেকে fill" করার global toggle নেই। আপনি প্রতি app-এর flow-তে **AutoFill Passwords** ব্যবহার করেন:

1. পাসওয়ার্ড ম্যানেজার ইনস্টল করে system settings-এ সেটিকে AutoFill provider হিসেবে চালু করুন।
2. যে app-এ login করছেন সেখানে username বা password field-এ ট্যাপ করুন আর field menu (কিংবা keyboard-এর password row) থেকে provider বেছে নিন।
3. প্রয়োজন হলে Face ID / Touch ID দিয়ে অনুমোদন দিন।

জানার মতো দুটি iOS অভ্যাস: OpenKey provider তালিকায় না এলে মানে system settings-এ সেটি চালু করা হয়নি, আর provider বদলানোর পর iOS-কে মাঝে মাঝে target অ্যাপ restart করতে হয়। [Passkey](/bn/blog/what-are-passkeys)-ও একই AutoFill picker ব্যবহার করে, তাই একই setup দুটোরই কাজ করে।

## Android-এ autofill

Android-এ একটি সত্যিকারের system-wide password ও passkey provider আছে, যা এটিকে মোবাইল platform-গুলোর মধ্যে সবচেয়ে মসৃণ করে তোলে:

1. **Settings → Security → Autofill service** খুলে আপনার ম্যানেজার বাছুন।
2. permission prompt-গুলোতে সম্মতি দিন।
3. আপনার ম্যানেজারের settings-এ **inline suggestion** বা **popup** বেছে নিন, আর চাইলে প্রতিটি fill-এর আগে biometric বাধ্যতামূলক করুন।
4. এমন একটি সাইটে একটি test login দিয়ে নিশ্চিত করুন যেখানে আপনার credential আগে থেকেই আছে।

Fill-এর আগে biometric চাওয়া একটি অর্থবহ উন্নতি: এটি "কেউ আপনার unlock করা ফোনের কাছে এসে inbox-এর পাসওয়ার্ড পড়ে ফেলল" ছিদ্রটি বন্ধ করে দেয়, autofill-কে বিরক্তিকর না করেই।

## Desktop app-এ autofill

Desktop autofill একটি দুই-দলের handshake। Autofill setting চালু করার সময় app একটি **native messaging host** রেজিস্টার করে, তারপর browser extension ওই unlocked app-এর সঙ্গে লোকাল socket-এ কথা বলে। macOS-এ host script-এর জন্য আপনার `PATH`-এ Python 3 দরকার; Linux ও Windows-এ setting টগল করলেই app manifest লিখে দেয়।

Extension যদি app-এ পৌঁছাতে না পারে, এই handshake-ই প্রায় সবসময় কারণ — সম্পূর্ণ checklist দেখুন [autofill not working](/bn/blog/autofill-not-working)।

## OpenKey autofill setup করা

| Platform | ধাপ |
|----------|------|
| Android | **Settings → Security** → OpenKey-কে system provider হিসেবে চালু করুন → vault unlock করুন |
| iOS / macOS | System AutoFill settings-এ OpenKey চালু করুন → OS prompt-এ সম্মতি দিন → target অ্যাপ restart করুন |
| Windows / Linux | **Settings → Security** → native host রেজিস্টার করতে Autofill চালু করুন |
| Browser | `openkey_extension` build ও load করুন → server URL সেট করুন, কিংবা **Use desktop app** বাছুন |

দুটি unlock mode আছে। **Standalone** আপনার email ও master password দিয়ে self-hosted server-এর বিরুদ্ধে extension unlock করে। **Desktop bridge** ইতিমধ্যে unlock করা অ্যাপের মধ্য দিয়ে fill করে, আলাদা করে extension unlock ছাড়াই — সাধারণত দৈনন্দিনের অভিজ্ঞতা ভালো, কারণ app-টিই একমাত্র জায়গা যেখানে আপনি unlock করেন।

সম্পূর্ণ walkthrough: [Browser extension গাইড](/bn/guide/extension)।

## কেন autofill একই সঙ্গে একটি security feature

Autofill শুধু সুবিধা নয়; এটি একটি নিয়ন্ত্রণ।

- **Phishing-এর বিরুদ্ধে স্থায়িত্ব।** যে ম্যানেজার একটি login-কে সেই নির্দিষ্ট origin-এর সঙ্গে মেলাতে পারে যেখানে সেটি সংরক্ষিত ছিল, সেটি lookalike domain-এ কিছুই দেখাবে না। আপনার ব্যাংকের অত্যন্ত বাস্তবসম্মত copy-তে পাসওয়ার্ড নিজে পেস্ট করা ঠিক সেই attack, যা autofill প্রতিরোধ করে।
- **কম plaintext কপি।** কোনো পাসওয়ার্ড ম্যানেজার app-এ কপি নেই, clipboard history-তে entry নেই, notes file-এ পাসওয়ার্ড পড়ে নেই।
- **স্বাভাবিক rotation।** কোনো সাইট নতুন পাসওয়ার্ড চাইলে সেটি inline জেনারেট করলে unique পাসওয়ার্ডই সবচেয়ে সহজ পথ হয়ে ওঠে।

## Autofill ও passkey

Passkey পাসওয়ার্ড field-টাই সম্পূর্ণ সরিয়ে দেয়, তাই autofill করার কিছুই থাকে না — credential vault থেকে আনা হয় আর সেখানেই sign করা হয়। Autofill-এর জন্য যে unlock ব্যবহার করেন সেটিই WebAuthn-ও কভার করে, তাই provider একবার setup করলে দুটো কাজই হয়ে যায়। [Passkey কী?](/bn/blog/what-are-passkeys)

## সার্চ ডেটা কী বলছে

Autofill একটি বড়, intent-rich query cluster। Google Trends (worldwide, last 12 months) থেকে, "autofill"-এ মানুষ যে refinement যোগ করে:

| Related query | Relative interest |
|---------------|-------------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

এটাকে একটি funnel হিসেবে পড়ুন: মানুষ আসে autofill কী জানে না, নির্দিষ্ট একটি platform-এ নামে, তারপর আটকে যায় settings-এ। আর *troubleshooting* cluster-এর ভেতরে — পরস্পরের তুলনায় হিসাব করা দীর্ঘ-লম্বা term-গুলোর একটি সেট — "autofill not working" মোটামুটি **55%** জনপ্রিয়, যতটা "autofill extension"। অর্থাৎ এমন একটি বিশাল জনগোষ্ঠী, যাদের autofill ভেঙে গেছে আর tutorial-এর চেয়ে fix দরকার।

একই data দেখায় "google chrome autofill settings" Chrome cluster-এর অধীনে দ্রুততম বর্ধনশীল refinement, বছরে বছরে প্রায় 70% বৃদ্ধি।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## Autofill কাজ না করলে

দশটির মধ্যে নয়টি case এই পাঁচটির একটি: vault locked, system settings-এ ভুল provider নির্বাচিত, extension app-এর সঙ্গে যুক্ত নয়, provider বদলানোর পর ব্রাউজার restart দরকার, কিংবা autofill ইচ্ছাকৃতভাবে একটি ব্রাউজারেই সীমাবদ্ধ করা আছে। ধাপে ধাপে বিস্তারিত সংস্করণের জন্য [autofill not working](/bn/blog/autofill-not-working) অনুসরণ করুন।

## পরবর্তী ধাপ

- [Autofill not working](/bn/blog/autofill-not-working) — সম্পূর্ণ troubleshooting checklist
- [Browser extension](/bn/guide/extension) — ইনস্টল, unlock mode, native messaging
- [Passkey কী?](/bn/blog/what-are-passkeys) — autofill কাজ করার পরের ধাপ
- [Using the app](/bn/guide/app) — প্রসঙ্গে Autofill ও browser settings
