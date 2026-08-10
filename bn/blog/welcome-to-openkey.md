---
title: OpenKey-এ স্বাগতম
description: কেন আমরা একটি self-hosted পাসওয়ার্ড ম্যানেজার তৈরি করেছি যা শুধু ciphertext সংরক্ষণ করে — এবং অ্যাপ, সার্ভার, এক্সটেনশন ও CLI-তে কী আছে।
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.svg
---

# OpenKey-এ স্বাগতম

বেশিরভাগ পাসওয়ার্ড ম্যানেজার আপনাকে এমন একটি ক্লাউডে বিশ্বাস করতে বলে যা আপনি নিয়ন্ত্রণ করেন না। OpenKey অন্য পথে চলে: আপনার ভল্ট ডিভাইসে এনক্রিপ্টেড থাকে, ঐচ্ছিক sync সার্ভার শুধু **ciphertext** সংরক্ষণ করে, এবং master password কখনো ক্লায়েন্ট ছেড়ে যায় না।

## শুধু ciphertext

ক্লায়েন্টরা ডিভাইস ছাড়ার আগেই ভল্ট ডেটা এনক্রিপ্ট করে। sync API — যদি ব্যবহার করেন — অস্পষ্ট blob সংরক্ষণ করে। collection নাম, entry payload, attachment, organization নাম এবং share ডেটা rest-এ ciphertext থাকে। ডাটাবেস আপোহার করলে salt, KDF প্যারামিটার, wrapped key এবং blob পাওয়া যায় — পড়া যায় এমন login নয়।

## আজ কী আছে

| অংশ | ভূমিকা |
|-------|------|
| **অ্যাপ** | Android, iOS, macOS, Linux ও Windows-এ দৈনন্দিন ভল্ট — login, card, crypto wallet, developer secret, organization ও sharing |
| **সার্ভার** | FastAPI + PostgreSQL zero-knowledge sync API যা আপনি self-host করতে পারেন |
| **এক্সটেনশন** | Chrome ও Firefox-এর জন্য MV3 autofill ও passkey |
| **CLI** | অফলাইন পাসওয়ার্ড জেনারেশন, লোকাল secret discovery এবং ঐচ্ছিক sync |

একই Wi‑Fi-তে ডিভাইসগুলোর মধ্যে **Nearby** (Pro) দিয়ে ভল্ট sync করতে পারেন — LAN পথে সার্ভার লাগে না। সার্ভার sync ও Nearby দুটোই শুধু ciphertext সরায় (revision অনুযায়ী last-write-wins)।

## শুরু করুন

- [Quick start](/bn/guide/quick-start) — স্ট্যাক লোকালি চালান
- [অ্যাপ ব্যবহার](/bn/guide/app) — ফোন ও ডেস্কটপে ভল্ট workflow
- [Security](/bn/guide/security) — zero-knowledge মডেল ও threat boundary
- [সার্ভার সেটআপ](/bn/guide/server) — নিজের sync host ইনস্টল ও লিঙ্ক করুন

ব্লগেও দেখুন: [zero-knowledge sync](/bn/blog/zero-knowledge-sync), [সার্ভার ছাড়া Nearby](/bn/blog/nearby-without-a-server), [self-hosting](/bn/blog/self-host-your-vault), [passkey ও autofill](/bn/blog/passkeys-and-autofill), এবং [developer CLI](/bn/blog/cli-for-developers)। কোড [OpenSelfHosting on GitHub](https://github.com/OpenSelfHosting)-এ।
