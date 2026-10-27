---
title: সার্ভার ছাড়া Nearby
description: Wi‑Fi-তে peer খুঁজুন, সেটআপে ভল্ট কপি করুন বা LAN sync-এর জন্য ভল্ট লিঙ্ক করুন — self-hosted API লাগে না।
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# সার্ভার ছাড়া Nearby

Self-hosted sync API শক্তিশালী — এবং ঐচ্ছিক। **Nearby** (OpenKey Pro) লোকাল নেটওয়ার্কে একই zero-knowledge অবস্থান রাখে: ডিভাইস একে অপরকে খুঁজে, session key-এর জন্য pair হয়, এবং আপনি হয় সেটআপে নতুন ডিভাইসে **ভল্ট কপি** করেন অথবা চলমান merge sync-এর জন্য স্পষ্টভাবে **Trust & link vault** করেন। শুধু pairing vault key auto-share করে না।

## কখন ব্যবহার করবেন

- একই বাড়ি বা অফিস Wi‑Fi-তে দুটো বা তার বেশি ডিভাইস
- এখনো Docker / Postgres দাঁড় করাতে চান না, কিন্তু sync চান
- **নতুন ফোন বা ডেস্কটপ**-এ `.okbak` ফাইল ছাড়াই পূর্ণ ভল্ট কপি পাওয়া উচিত
- পূর্ণ ভল্ট pull ছাড়া এক login **Send to device** একবারের জন্য দরকার

Merge sync **backup নয়**। Pro [encrypted `.okbak`](/bn/guide/import-export) অফলাইন রাখুন। Guest network ও client isolation discovery ভাঙে — সাধারণ LAN segment ব্যবহার করুন।

## নতুন ডিভাইসে ভল্ট কপি করুন

1. বিদ্যমান ডিভাইস unlock করুন → **Settings → Nearby devices** → **Visible on local network**।
2. নতুন ডিভাইসে first-run setup chooser-এ **Nearby device** বেছে নিন।
3. Peer ট্যাপ করুন → confirm করুন → **একই master password** দিয়ে unlock করুন।

এটি session-encrypted পূর্ণ-ভল্ট archive পাঠায় (attachmentsসহ)। বিস্তারিত: [Nearby → Setup-এ ভল্ট কপি](/bn/guide/nearby#setup-এ-ভল্ট-কপি-করুন-vault-clone)।

## চলমান sync-এর জন্য pair করুন

1. দুটো ডিভাইসে OpenKey unlock করুন → **Settings → Nearby devices**।
2. **Visible on local network** চালু করুন।
3. Pair করতে discovered peer ট্যাপ করুন (discovery অসুবিধাজনক হলে প্রায় দুই মিনিটের মধ্যে ছোট কোড এখনও চলে)।
4. **Trust & link vault** ট্যাপ করুন যাতে দুটোই একই vault-key fingerprint শেয়ার করে।

Mac firewall inbound TCP ব্লক করলে OpenKey advertising host-কে dial back করতে বলতে পারে — OS network prompt অনুমতি দিন।

## লিঙ্কের পর

দুটো ভল্ট unlocked ও Nearby advertising থাকলে পরিবর্তন sync হয় (**revision অনুযায়ী last-write-wins**, সার্ভারের মতো নিয়ম)। Trusted device স্বয়ংক্রিয় reconnect; ঐচ্ছিক **Trusted networks only** আপনার SSID-র বাইরে Nearby বন্ধ করে। **Unpair** LAN trust ও LAN Pro claim প্রত্যাহার করে।

## LAN Pro, সংক্ষেপে

Windows / Linux-এ (store IAP নেই), **vault-linked** Pro peer **LAN Pro** attestation শেয়ার করতে পারে যাতে অন্য ডিভাইস Pro limit unlock করে। লিঙ্ক ছাড়া pairing যথেষ্ট নয়। Android, iOS ও macOS এটা উপেক্ষা করে — store-এ Pro কিনুন বা restore করুন। Attestation সুবিধা, cryptographic purchase proof নয়।

## আরও জানুন

- সম্পূর্ণ walkthrough: [Nearby LAN sync](/bn/guide/nearby)
- Threat model: [Security](/bn/guide/security)
- অ্যাপ Pro matrix: [অ্যাপ ব্যবহার](/bn/guide/app)
- FAQ troubleshooting: [Nearby অন্য ডিভাইস খুঁজে পায় না](/bn/guide/faq)
