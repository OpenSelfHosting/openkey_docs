---
title: "Autofill not working: যে fix আসলে কাজ করে"
description: Chrome, Firefox, Safari ও মোবাইলে password autofill কেন কাজ করা বন্ধ করে — সম্ভাবনার ক্রম অনুযায়ী পাঁচটি সাধারণ কারণ ও তার fix।
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# Autofill not working: যে fix আসলে কাজ করে

Autofill অল্প কয়েকটি অনুমানযোগ্য উপায়ে ভাঙে। বাস্তবে কারণ প্রায় কখনো কোনো bug নয়: সেটি হলো locked vault, ভুল provider নির্বাচিত, যোগাযোগ বন্ধ হয়ে যাওয়া একটি bridge, restart দরকার এমন একটি app, কিংবা এমন একটি ব্রাউজার যা চুপচাপ অন্য কোথা থেকে fill করা শুরু করেছে।

সম্ভাবনার ক্রম অনুযায়ী এগুলোর মধ্যে দিয়ে যান। এতে প্রায় পাঁচ মিনিট লাগে আর অধিকাংশ case সমাধান হয়ে যায়।

## Fix 1: Vault unlock করুন

চওরা মতো সবচেয়ে সাধারণ কারণ, আর সবচেয়ে সহজে বাদ পড়া — কারণ app ইনস্টল ও চালু *মনে হয়*।

- **Extension standalone mode:** extension popup খুলে সেটি unlock করুন। Locked extension কিছুই decrypt করতে পারে না, তাই কিছুই দেখায় না।
- **Desktop bridge mode:** desktop অ্যাপ অবশ্যই unlock থাকতে হবে। ডিজাইন অনুযায়ী vault locked থাকলে bridge কাজ করে না।
- **Mobile:** field-এ focus দেওয়ার আগে app খুলে unlock করুন। Idle অবস্থায় lock করলে autofill-ও থামে।

Unlock করার সঙ্গে সঙ্গে suggestion এল আর তারপর মিলিয়ে গেল, তাহলে এটিই আপনার উত্তর।

## Fix 2: System provider দেখুন

পাসওয়ার্ড ম্যানেজার বদলালে সবসময় OS যা দেখায় তা-ও বদলায় না।

| Platform | কোথায় দেখবেন |
|----------|--------------|
| Android | Settings → Security → **Autofill service** |
| iOS / iPadOS | Settings → Passwords → **AutoFill Passwords** |
| macOS | System Settings → General → **AutoFill & Passwords** |
| Windows | Settings → Accounts → **Passwords** (credential providers) |
| Chrome | Settings → Passwords, passkeys and autofill → **Password manager** |

দুটি ম্যানেজার চালু থাকলে OS একটি বেছে নেয়, আর অপরটি ভাঙা মনে হয়। যেটি চান না সেটি বন্ধ করে দিন, কিংবা ইচ্ছাকৃতভাবে যেটি চান সেটিই বেছে নিন — আর ব্রাউজারেও একই নির্বাচন নিশ্চিত করুন।

## Fix 3: Target অ্যাপ বা ব্রাউজার restart করুন

Credential provider বদলানো সবসময় চলমান প্রক্রিয়াগুলোতে কাজ করে না। এটি স্বাভাবিক, bug নয়:

- Mobile: যে অ্যাপে autofill করতে চাইছেন সেটি force-quit করে আবার খুলুন।
- Desktop: ব্রাউজারটি সম্পূর্ণ বন্ধ করুন (শুধু window নয়) আর আবার খুলুন।
- সমস্যাটি ব্রাউজার হলে অন্য কিছু বদলানোর আগে সেটি restart করুন — extension reload প্রায়ই native host আবার রেজিস্টার করে দেয়।

## Fix 4: Desktop bridge আবার যুক্ত করুন

Desktop autofill একটি দুই-দলের handshake: app একটি native messaging host রেজিস্টার করে, আর extension তার সঙ্গে লোকাল socket-এ কথা বলে। এটি ব্যর্থ হয় যখন host রেজিস্ট্রেশন নেই বা পুরোনো।

1. OpenKey desktop অ্যাপ unlock করুন।
2. **Settings → Security** খুলে Autofill টগল করুন — এতে native messaging host রেজিস্টার (হয়)।
3. Chromium ব্রাউজারে আপনার unpacked extension ID প্ল্যাটফর্মের file-এ লিখে দিন, তারপর আবার Autofill টগল করুন যাতে manifest আবার তৈরি হয়:

| Platform | Extension ID file |
|----------|-------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. Extension-এ **Use desktop app** বাছুন।
5. শুধু macOS: নিশ্চিত করুন আপনার `PATH`-এ Python 3 আছে — host script-এর জন্য সেটি দরকার।

টেস্ট করার সময় vault **এখনও unlocked** আছে কি না-ও দেখে নিন। Bridge socket শুধু unlocked session চলাকালীনই থাকে।

## Fix 5: প্রতিযোগী ম্যানেজার আছে কি না দেখুন

Chrome ও Edge দুটোতেই built-in password storage আসে, আর দুটোই নিজে থেকেই ভরা করতে থাকতে পারে। Suggestion "উধাও" হয়ে গেলেও credential তবুও ফিল হচ্ছে, তাহলে built-in manager-ই করছে।

- ব্রাউজার settings-এ সংরক্ষিত পাসওয়ার্ডের জন্য automatic sign-in বন্ধ করুন, কিংবা
- Built-in entry মুছে দিন আর login-এর মালিক আপনার ম্যানেজার হতে দিন।

একই সংঘাত iCloud Keychain ও third-party AutoFill provider-এর মধ্যে, কিংবা দুটি extension-এর মধ্যে দেখা যায় যখন দুটোই `<all_urls>` চায়।

## নির্দিষ্ট platform-এর কারণ

### Chrome

Extension site access: `chrome://extensions` → আপনার extension → **Details** → Site access → *On all sites*, অথবা স্পষ্ট grant পছন্দ হলে *On click*। Autofill field শনাক্ত করতে page access দরকার।

অন্য কোনো extension যদি fill shortcut ধরে রেখে থাকে, `chrome://extensions/shortcuts`-এ গিয়ে remap করুন।

### Firefox

Firefox প্রথমবার কোনো extension কোনো সাইটে fill করতে চাইলে permission চায়, আর কিছু all-sites request নীরবে প্রত্যাখ্যান করে। `about:addons` → Permissions → Access your data for all websites-এ extension-এর permission দেখুন।

Firefox `openkey@openselfhosting.local` native host স্বয়ংক্রিয়ভাবে ব্যবহার করে; ওই platform-এ কোনো ম্যানুয়াল manifest কাজ দরকার নেই।

### Safari

Safari-র AutoFill আর আপনার ম্যানেজার আলাদা panel। System Settings-এ ম্যানেজারটি চালু করুন, তারপর Safari-তে **Passwords** autofill চালু আছে কি না দেখুন। system settings-এ ক্রম বদলে গেলে Safari একটি *আলাদা* credential provider দিয়েও auto-fill করতে পারে — শুধু toggle নয়, নির্বাচনের ক্রম যাচাই করুন।

### iOS এবং Android

- **প্রতি app-এর অবস্থা:** iOS field-এর menu-তেই provider দেখায়, তাই উপসর্গ হয় "option-টাই নেই", "ভুল জিনিস ফিল করেছে" নয়।
- **Permission prompt:** setup-এর সময় OS local-network বা biometric permission চায়। প্রত্যাখ্যাত prompt একটি ভাঙা ম্যানেজারের মতো দেখায়।
- **Fill-এর আগে biometric:** fill-এর আগে biometric চালু করে থাকলে এখন প্রতিটি fill-এর অনুমোদন লাগবে। এটি সঠিক আচরণ, কোনো ত্রুটি নয়।
- **Background restriction:** Android-এ আগ্রাসী battery optimiser provider প্রক্রিয়া মেরে ফেলতে পারে, তাই app foreground-এ থাকলেই suggestion দেখা যায়।

## ব্রাউজারের autofill audit দিয়ে নির্ণয়

ব্রাউজারে একটি diagnostic আসে, যা দেখানো প্রতিটি field, দেওয়া প্রতিটি suggestion, আর কেন সেটি বাতিল করা হলো। এতে অনুমান করার বদলে দুই মিনিটের কাজ হয়ে যায়।

Chrome-এ DevTools → **Application** → **Autofill** খুলে পেজে fill-টি পুনরায় ঘটান। আপনি detected field, dropdown-এ দেওয়া item, এবং কোনো suppression-এর কারণ পাবেন। Card বা address autofill-ই যেটুকু ব্যর্থ হচ্ছে, সেই ক্ষেত্রে `autofill.creditCards` ও `autofill.profiles` `chrome://flags`-এ টগল করা যায়।

Firefox: `about:debugging` → extension পরীক্ষা করুন, আর তার console-এ fill-এর সময়ের error দেখুন।

## বিশেষভাবে OpenKey ব্যবহার করলে

| উপসর্গ | যা দেখবেন |
|--------|----------|
| ব্রাউজারে কোনো suggestion নেই | Extension unlocked, কিংবা desktop অ্যাপ unlock করে **Use desktop app** নির্বাচিত |
| "Extension cannot talk to the desktop app" | Native host রেজিস্ট্রেশন, extension ID file, macOS-এ Python 3 |
| Android-এ কিছু নেই | Android-এ **Settings → Security → Autofill** চালু, তারপর অ্যাপ unlock করুন |
| iOS-এ কিছু নেই | System settings-এ AutoFill provider চালু; target অ্যাপ restart করুন |
| Passkey ব্রাউজারে ফিরে যায় | **Use browser** বাছলে এটি প্রত্যাশিত, কিংবা extension vault locked থাকলে |
| Fill হয় কিন্তু save হয় না | In-page save banner-টি পেজ ব্লক করছে না তা নিশ্চিত করুন |

Field শনাক্ত করা, login capture করা এবং যেকোনো সাইটে WebAuthn intercept করার জন্য extension-এর `<all_urls>` host access দরকার — একটি নির্দিষ্ট allowlist খোলা ওয়েব কভার করতে পারে না। এটি যা decrypt করে তা আপনার ডিভাইসেই বা আপনার নিজের server-এই থাকে; পেজের content কোনো vendor cloud-এ পাঠানো হয় না।

## সার্চ ডেটা কী বলছে

এটি একটি বড় query cluster, যা এখানে আঘাত পাওয়া যেকোনো ব্যক্তির জন্য ভালো সংকেত। পরস্পরের তুলনায় দীর্ঘ-লম্বা autofill troubleshooting term মাপা হলে (Google Trends, worldwide, last 12 months):

| Query | Cluster-এ relative interest |
|-------|---------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

Generic "autofill extension" term-এর অর্ধেকেরও বেশি আগ্রহে "Autofill not working" পৌঁছানো মানে অত্যন্ত বড় একটি দর্শকগোষ্ঠী ভেঙে অবস্থায়ই এসে পড়ছে। বিশেষভাবে Chrome cluster-এর অধীনে "google chrome autofill settings" 100-এ শীর্ষ related query এবং দ্রুততম বর্ধনশীল, বছরে বছরে প্রায় +70%; এর পরে "chrome autofill extension" 62 এবং "chrome autofill not working" 16।

এই বণ্টনটি একটি নির্দিষ্ট support strategy নির্দেশ করছে: settings-ভিত্তিক content আর একটি বিশ্বাসযোগ্য troubleshooting checklist আরেকটি feature announcement-এর চেয়ে বেশি মানুষের কাছে পৌঁছাবে।

Method: Google Trends, worldwide, past 12 months, pulled September 2026. মানগুলো হলো normalized relative interest (0–100), search volume নয়।

## ৩০ সেকেন্ডের সংস্করণ

Vault unlock করুন। সঠিক system provider নির্বাচিত হয়েছে কি না নিশ্চিত করুন। অ্যাপ বা ব্রাউজার restart করুন। Native host আবার রেজিস্টার করতে app-এ Autofill আবার টগল করুন। প্রতিযোগী ম্যানেজার বন্ধ করুন। তবুও ব্যর্থ হলে ব্রাউজারের autofill audit খুলে বাতিলের কারণ পড়ুন — সেটি সমস্যাটির নাম বলে দেয়।

## পরবর্তী ধাপ

- [Autofill passwords](/bn/blog/autofill-passwords) — setup গাইড
- [Browser extension](/bn/guide/extension) — unlock mode ও native messaging-এর বিশদ
- [FAQ & troubleshooting](/bn/guide/faq) — OpenKey-নির্দিষ্ট fix
- [Passkey কী?](/bn/blog/what-are-passkeys) — পাসওয়ার্ডের বদলে যে credential type
