---
title: "Password manager for teams: কী মূল্যায়ন করবেন"
description: একটি team password manager বেছে নেওয়া — shared vault, role, offboarding, CLI ও API access, auditability — আর নিজের server-এ এটি চালানোর উপায়।
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# Password manager for teams: কী মূল্যায়ন করবেন

Team password manager consumer product-এর seat বাড়ানো ভার্সন নয়। এর কাজ আলাদা: মানুষ যোগ দেয় আর চলে যায়, তার মধ্যে এটি টিকে থাকতে হবে, আর "কে কখন কীতে access ছিল" — এমন প্রশ্নের উত্তর দিতে হবে। বেশিরভাগ টুল sharing feature-কে দিয়ে বিচার করা হয়, আর দ্বিতীয় প্রশ্নে ব্যর্থ হয়।

এই নিবন্ধটি মূল্যায়নের checklist, সঙ্গে নিজের নিয়ন্ত্রণে থাকা infrastructure-এ shared collection চাইলে OpenKey-এর model কীভাবে কাজ করে।

## যেসব শর্ত আসলে আলাদা

### 1. সত্যিকারের access control-সহ shared vault

"টিমের সঙ্গে share করা যায়" এটা table stakes। গুরুত্বপূর্ণ হলো access প্রতি collection নাকি প্রতি ব্যক্তি, সব কিছু প্রকাশ না করেই subset share করা যায় কি না, আর একজন contractor ঠিক একটি service দেখতে পারে কি না।

- **All-or-nothing sharing** দ্রুত ব্যর্থ হয়। এটি প্রায় পাঁচজনের বেশি scale করে না।
- **Per-collection sharing**-ই হলো সবচেয়ে ছোট কার্যকর model।
- **Role-based access** (admin / member, আদর্শত্ব read-only) — reviewer আর approver থাকলে এটিই চান।

### 2. যে offboarding সত্যিই access সরায়

এই শর্তটিই consumer tool আর team tool-কে আলাদা করে, আর এটিই সবচেয়ে বেশি বাদ পড়ে।

কেউ চলে গেলে আপনাকে জানতে হবে:

- তার access **সাথে সাথে** বন্ধ হয়, নাকি পরবর্তী sync-এ?
- shared credential-এর **offline copy** কি তার কাছে থেকে যায় — আর থাকলে কীভাবে সামলাবেন?
- আপনি কি একটি **share revoke** করে নিশ্চিত হতে পারেন যে copy আর নেই?
- তাদের চলে যাওয়ার পর **org ownership** আর admin right কি টিকে থাকে, নাকি team নিজেকে পরিচালনা করার ক্ষমতা হারায়?

যে টুল এই প্রশ্নগুলোর উত্তর দিতে পারে না, তা productivity feature-এর আবরণে চাপা একটি compliance liability।

### 3. Automation আর machine access

UI-তে মানুষ সমস্যার অর্ধেক। বাকি অর্ধেক:

- CI আর scripting-এর জন্য একটি **CLI**
- provisioning আর internal tool-এর জন্য একটি **API**
- **Service account** যা কোনো ব্যক্তি চলে গেলে মেয়াদ শেষ হয় না
- directory বা legacy shared credential-এর spreadsheet থেকে **bulk import**

Infrastructure থাকা team-এর সাধারণত চারটিই লাগে। যে পাসওয়ার্ড ম্যানেজারে শুধু browser extension আছে, সেটি deploy pipeline-এর সংস্পর্শে টিকবে না।

### 4. Zero-knowledge, আর বাণিজ্যিকভাবে এর অর্থ কী

একজন ব্যক্তির ক্ষেত্রে zero-knowledge একটি privacy পছন্দ। একটি organisation-এর ক্ষেত্রে এটি একটি compliance অবস্থান: "আমাদের vendor breach হয়েছে" আর "আমাদের vendor breach হয়েছে, আর তাদের কাছে ciphertext ছিল" — এই দুটির মধ্যে পার্থক্য এটিই।

এটি feature-ও সীমাবদ্ধ করে। কিছু vendor account recovery, admin reset, বা server-side plaintext প্রয়োজন এমন policy enforcement দিতে রাজি হয় — আর প্রতিটিই zero-knowledge গুণের সচেতনভাবে করা কমাঙ্গ। দুটি অবস্থানই রক্ষযোগ্য; আপনাকে incident review-এর সময় আবিষ্কার করার বদলে সচেতনভাবে বেছে নিতে হবে।

### 5. Audit trail

"৩ মার্চে production database-এর পাসওয়ার্ডে কার access ছিল, তা কি আমি প্রমাণ করতে পারি?" — এর জন্য একটি access log দরকার, নির্দিষ্ট সময়সীমা ধরে রাখা, আর auditor-এর জন্য export করার মতো।

সীমাটি সৎভাবে স্বীকার করুন: zero-knowledge সিস্টেমে admin দেখেন যে *কোনো* entry accessed হয়েছে, কী ছিল তা নয়। এটিই সঠিক আচরণ, আর এটি একই সঙ্গে আপনার audit কী প্রমাণ করতে পারে তার উপর একটি সীমা।

### 6. নিজের infrastructure আনা

কোনো একটি সময়ে security review জিজ্ঞেস করবে shared credential আপনার network ছাড়ে কি না। উত্তর: contractual DPA-সহ vendor-hosted, private cloud, বা self-hosted। Self-hosting-ই একমাত্র বিকল্প যা আপনি যাচাই করতে পারেন, আর একমাত্র বিকল্প যেখানে আপনি দেখাতে পারেন server-এ ciphertext-ই আছে।

### 7. Headcount বাড়লেও টিকে যাওয়া cost model

প্রতি seat-এর pricing-এ প্রতিটি contractor, প্রতিটি service account, আর প্রতিটি read-only auditor গুণলে দ্রুত খরচ বাড়ে। দেখুন:

- Read-only seat-এর pricing আছে কি না
- Service account কি বিনামূল্যে
- Deactivated user-ও কি গোনা হয়
- মূল্যায়নের জন্য free tier আছে কি না

## Team-এর জন্য একটি scoring sheet

| মানদণ্ড | ওজন | কেন গুরুত্বপূর্ণ |
|-----------|--------|----------------|
| Offboarding আর revocation | ×3 | যে শর্তে বেশিরভাগ টুল ব্যর্থ হয় |
| Per-collection access control | ×3 | একজন contractor সবকিছু দেখে ফেলা আটকায় |
| CLI আর API access | ×3 | machine-ই আপনার অর্ধেক user |
| যাচাইযোগ্য zero-knowledge | ×3 | Compliance আর breach exposure |
| Service account | ×2 | দীর্ঘমেয়াদি non-human access |
| Retention-সহ audit log | ×2 | ঐতিহাসিক access প্রমাণ করা |
| Self-hosting পাওয়া যায় | ×2 | Credential আপনার network-এর ভেতরে রাখা |
| Emergency access | ×1 | Admin পৌঁছানো যায় না তখন break-glass |
| Bulk migration tooling | ×1 | Shared spreadsheet থেকে নামানো |

## OpenKey team access কীভাবে সামলায়

OpenKey-এর sharing model এটার জন্যই তৈরি, আর কয়েকটি জায়গায় ইচ্ছাকৃতভাবে অস্বাভাবিক যেগুলো বোঝা দরকার — আপনি এর চারপাশে একটি process বানানোর আগে।

### Organization আর shared collection

Sharing-এর জন্য **Pro** আর configured self-hosted server লাগে, সবাই একই **server URL**-এ থাকতে হবে। Model:

1. **Identity key প্রকাশ করুন** যাতে peer-রা আপনার জন্য key wrap করতে পারে। OpenKey-এ এটি standalone (server) mode-এ browser extension থেকে করা হয় — app-এর Settings → Data page-এ সেই কাজটি নেই।
2. একটি **organization তৈরি করুন** আর তার নিচে shared collection। ক্লায়েন্ট org name এনক্রিপ্ট করে আর owner হিসেবে আপনার জন্য একটি org key wrap করে।
3. Email দিয়ে **member আমন্ত্রণ** করুন (তারা আগে থেকেই server-এ থাকতে হবে), role হবে `admin` বা `member`। আপনার ক্লায়েন্ট তাদের published identity key-এর জন্য org key wrap করে আর invite পাঠায়।
4. তারা **Pending invites**-এ গ্রহণ করে আর sync করে; shared collection দেখা যায়।

Server org name, shared payload, আর identity key **opaque ciphertext** হিসেবে সংরক্ষণ করে। এটি কখনো কোনো org key unwrap করে না।

Admin-এর ক্ষমতা: pending invite revoke করা, role বদলানো, member সরানো। পরিকল্পনায় যে একটি সীমা রাখতে হবে — **owner org ছাড়তে পারে না**, আর ownership transfer কোনো আলাদা recovery path নয়। এটিকে আনুষ্ঠানিকতা ভাববেন না, শুরুতেই দ্বিতীয় owner নিযুক্ত করুন।

### Item share snapshot, জীবন্ত document নয়

এটিই সবচেয়ে গুরুত্বপূর্ণ operational বিবরণ। আপনি কোনো একটি entry বা collection কারও সঙ্গে share করলে:

- এনক্রিপ্টেড payload **share-এর সময় frozen** হয় আর গ্রহণ করার সময় recipient-এর vault-এ copy হয়।
- পরে আপনার copy-তে করা edit তার দিকে **পাঠানো হয় না**।
- **Revoke** করলে pending accept বন্ধ হয়। Recipient ইতিমধ্যে যে copy import করে নিয়েছে তা এটি **মোছে না**।

তাই entry share আচরণ করে সিল করা একটি খাম কাউকে হস্তান্তর করার মতো, জীবন্ত document share করার মতো নয়। যা কিছু sync-এ থাকতে হবে — একটি shared service account, team-wide internal tool — তার জন্য ব্যবহার করুন একটি **organization shared collection**, যেখানে member-রা shared org key-এর নিচে একই ciphertext পড়তে থাকে।

এটি উল্টো বুঝলে classic bug তৈরি হয়: আপনি একটি shared পাসওয়ার্ড আপডেট করেন, ভাবেন সবাই নতুনটি পেয়েছে, আর অর্ধেক team এক মাস আগে rotate করা credential হাতে করে চলছে।

### OpenKey যা করে না

স্পষ্ট করে বলা দরকার, কারণ এটি নির্ধারণ করে কখন আপনি অন্য কিছু বেছে নেবেন:

- ক্লায়েন্টে **admin-enforced policy engine নেই**। team-এর সবার উপর ন্যূনতম পাসওয়ার্ড দৈর্ঘ্য বাধ্য করে এমন কোনো server-side rule নেই।
- **Automatic offboarding hook নেই।** Member সরানো একটি manual কাজ: org-এ revoke বা remove করুন, তারপর আগে থেকে গ্রহণ করা entry share-গুলো সামলান।
- **SCIM বা directory sync নেই।** Membership org আর sharing API-এর মাধ্যমে পরিচালিত হয়।
- **Entry access-এর server-side audit log নেই।** Server plaintext দেখতে পায় না, তাই কী পড়া হলো তা log করতে পারে না।
- **Sync revision অনুযায়ী last-write-wins, CRDT নয়।** একসঙ্গে দুটি edit পরস্পরকে overwrite করতে পারে; গুরুত্বপূর্ণ সময়ে একসময়ে একটি ডিভাইসেই edit করুন।

আপনার automated offboarding, policy engine, বা compliance-grade access log দরকার হলে একটি commercial team product বেছে নিন। OpenKey তাদের জন্য, যারা crypto নিজেদের ক্লায়েন্টে রাখতে চান আর collaboration layer নিজেরা চালাতে রাজি।

## একটি team-এ rollout করা

1. **আগে server চালান।** [Server setup](/bn/guide/server), [security checklist](/bn/blog/self-hosted-password-manager#hardening-checklist)-এর মতো harden করা।
2. **নিজের account তৈরি করুন**, extension থেকে identity key প্রকাশ করুন।
3. **Org তৈরি করুন**, তারপর service বা team boundary-র প্রতি একটি shared collection। শুরু করুন shared infrastructure account থেকে — ভুল হলে এগুলোই সবচেয়ে বেশি ক্ষতি করে।
4. আমন্ত্রণের আগে **সবার জন্য identity key প্রকাশ করুন**, নইলে wrap ধাপটি তাদের খুঁজে পাবে না।
5. **ছোট ছোট দলে আমন্ত্রণ** করুন, আর পরের ব্যাচ যোগ করার আগে যাচাই করুন যে একজন member সত্যিই একটি shared collection খুলতে পারেন।
6. **Shared spreadsheet সরান।** team spreadsheet-এ থাকা প্রতিটি credential-ই আপনার সর্বোচ্চ অগ্রাধিকার import।
7. **Offboarding procedure লিখে রাখুন, যখন দরকার হবে তার আগেই।** দুটি ধাপ, লিখিত: org থেকে সরান; entry share review করে revoke করুন।

## এক মিনিটের সংস্করণ

আগে offboarding, per-collection access, আর machine access-এর উপর মূল্যায়ন করুন — sharing feature-এর উপর নয়। যাচাইযোগ্য zero-knowledge পছন্দ করুন, আর দেখুন vendor-এর recovery ও admin feature কি নিঃশব্দে server-side plaintext চায়। Self-host করলে মনে রাখুন, entry share হলো snapshot: যা বর্তমান থাকতে হবে তার জন্য org shared collection ব্যবহার করুন।

## পরবর্তী ধাপ

- [Sharing & organizations](/bn/guide/sharing) — সম্পূর্ণ walkthrough
- [Self-hosted password manager](/bn/blog/self-hosted-password-manager) — server চালানো
- [Password manager for family](/bn/blog/password-manager-for-family) — household-স্কেলের সংস্করণ
- [Security](/bn/guide/security) — server কী দেখতে পারে আর কী পারে না
