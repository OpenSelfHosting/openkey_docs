---
title: OpenKey Pro — কী unlock হয় (আর কী হয় না)
description: Free বনাম Pro limit, Nearby ও LAN Pro, store IAP বনাম desktop, এবং প্রতিটি প্ল্যাটফর্মে কী free থাকে।
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — কী unlock হয় (আর কী হয় না)

OpenKey-এর মূল ভল্ট subscription ছাড়াই অফলাইন কাজ করে। **Pro** limit বাড়ায় এবং ডিভাইস জুড়ে sync, export বা টিমে share করার সময় দরকারি extra unlock করে। এখানে ব্যবহারিক ভাগ — এবং LAN Pro সতর্কতা যা প্রায়ই বিভ্রান্ত করে।

## কী free থাকে

- লোকাল এনক্রিপ্টেড ভল্ট (freemium cap — নিচে দেখুন)
- Self-hosted [server sync](/bn/guide/server) (শুধু ciphertext)
- OS যেখানে দেয় সেখানে system Autofill / passkey
- unlocked desktop অ্যাপের [browser extension](/bn/guide/extension) bridge
- Bitwarden, browser CSV, KeePass ইত্যাদি থেকে **Import**

Free tier cap (Pro enforce করা mobile/desktop build): **50** login entry; **3** collection, payment card, crypto wallet ও developer secret প্রতিটিতে।

## Pro কী unlock করে

| ক্ষমতা | নোট |
|------------|--------|
| Unlimited entry / collection / card / crypto / secret | Free cap সরায় |
| **Export** + encrypted **`.okbak`** backup | Export secret ধরে নিন |
| **Nearby** LAN vault sync | QR pair, vault link, entry পাঠান — [guide](/bn/guide/nearby) |
| Organization ও sharing | একই self-hosted server |
| Entry-তে attachment | প্রতিটি ~20 MB, সার্ভারে ciphertext |
| Custom app icon | প্ল্যাটফর্ম যেখানে সমর্থন করে |

সম্পূর্ণ matrix: [Pricing](/bn/pricing) · [অ্যাপ ব্যবহার → Free বনাম Pro](/bn/guide/app#free-vs-openkey-pro)।

## LAN Pro store receipt নয়

Store in-app purchase **নেই** এমন প্ল্যাটফর্মে (সাধারণত Windows / Linux), Pro peer Nearby-তে **LAN Pro** attestation শেয়ার করতে পারে যাতে অন্য ডিভাইস LAN-এ Pro limit unlock করে।

- শুধু সুবিধা — purchase-এর cryptographic proof **নয়**
- Android, iOS ও macOS LAN Pro **উপেক্ষা** করে; সেই store-এ Pro কিনুন বা restore করুন
- Unpair করলে attestation বন্ধ হয়

## Web build

**Web build এখনো Pro enforce করে না।** Mobile ও desktop store/desktop build করে। ব্রাউজারে test করলে সেই অনুযায়ী পরিকল্পনা করুন।

## আরও জানুন

- [Pricing](/bn/pricing) — plan, কেনা, বাতিল
- [সার্ভার ছাড়া Nearby](/bn/blog/nearby-without-a-server)
- [Import ও export](/bn/guide/import-export)
- [Sharing ও organization](/bn/guide/sharing)
- [FAQ](/bn/guide/faq)
- [Security](/bn/guide/security)
