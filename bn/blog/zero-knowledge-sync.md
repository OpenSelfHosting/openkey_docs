---
title: Zero-knowledge sync ব্যাখ্যা
description: OpenKey কীভাবে সার্ভারকে plaintext না দিয়ে ডিভাইস জুড়ে ভল্ট sync করে — Argon2id, auth hash এবং ciphertext-only storage।
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.png
---

# Zero-knowledge sync ব্যাখ্যা

Sync দরকারি। দূরের মেশিনে পাসওয়ার্ড বিশ্বাস করা নয়। OpenKey এই দুটো আলাদা রাখে: ফোন, ডেস্কটপ ও ব্রাউজার এক্সটেনশন জুড়ে sync করতে পারেন, আর সার্ভার শুধু **ciphertext** সংরক্ষণ করে।

## এখানে “zero-knowledge” মানে কী

1. Master password ডিভাইসেই থাকে। ক্লায়েন্ট email + master password ও salt দিয়ে **Argon2id** থেকে master key derive করে।
2. Login-এ `auth_hash` পাঠায় — পাসওয়ার্ড জানার প্রমাণ, কিন্তু পুনরুদ্ধারের জন্য যথেষ্ট নয়।
3. একটি **vault key** collection নাম ও entry payload **AES-256-GCM** দিয়ে এনক্রিপ্ট করে। সার্ভার শুধু wrapped (এনক্রিপ্টেড) vault key সংরক্ষণ করে, plaintext key কখনো নয়।
4. Attachment, organization নাম ও share payload ডিভাইস ছাড়ার আগেই এনক্রিপ্টেড। sync API অস্পষ্ট blob রাখে; ডাটাবেস কপি হলেও decrypt করতে পারে না।

## সার্ভার কিসের জন্য

ঐচ্ছিক OpenKey সার্ভার sync ও auth সারফেস:

- অ্যাকাউন্ট রেজিস্ট্রেশন ও login (`auth_hash` দিয়ে)
- এনক্রিপ্টেড ভল্ট payload push/pull (প্রতি item `revision` অনুযায়ী last-write-wins)
- Organization ও share — rest-এ এখনো ciphertext
- স্বল্পমেয়াদি access JWT এবং hashed, rotated refresh token

এটি আপনার ভল্ট পুনর্গঠনের জায়গা **নয়**। সার্ভার URL কনফিগ না করলেও অ্যাপ লোকাল এনক্রিপ্টেড ভল্ট হিসেবে কাজ করে। **Master-password recovery-ও নেই**: হারালে ciphertext পুনরুদ্ধার অসম্ভব — অফলাইন backup রাখুন।

## LAN-এ Nearby

PostgreSQL ছাড়াই multi-device sync চান? **Nearby** (Pro) লোকাল Wi‑Fi-তে ডিভাইস pair করে, shared vault key লিঙ্ক করে, একই LWW নিয়মে ciphertext sync করে। Pairing ও vault link পূর্ণ ভল্ট trust-এর মতো মানুন; এনক্রিপ্টেড backup-এর বিকল্প নয়।

## এই মডেল কেন গুরুত্বপূর্ণ

ক্লাউড পাসওয়ার্ড ম্যানেজার তাদের infrastructure ও operator-এ বিশ্বাস চায়। OpenKey **আপনার** host (বা আপনার নিয়ন্ত্রণে VPS)-এ শুধু storage ও uptime-এ বিশ্বাস চায় — secret-এ নয়। চুরি হওয়া ডাটাবেস চুরি হওয়া ভল্ট নয়।

## আরও জানুন

- [Security](/bn/guide/security) — key derivation, threat model ও operational checklist
- [সার্ভার সেটআপ](/bn/guide/server) — Docker sync ইনস্টল ও ক্লায়েন্ট লিঙ্ক
- [অ্যাপ ব্যবহার](/bn/guide/app) — Nearby, backup ও দৈনন্দিন ভল্ট ব্যবহার
- [Quick start](/bn/guide/quick-start) — স্ট্যাক লোকালি চালান
