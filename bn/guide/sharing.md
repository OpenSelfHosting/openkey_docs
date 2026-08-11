# শেয়ারিং ও সংগঠন

**একই self-hosted server**-এ অন্যান্য OpenKey users-এর সাথে individual items শেয়ার করুন অথবা **organizations**-এ কাজ করুন। Server orgs ও shares-এর জন্য যা store করে সব **ciphertext** — clients recipients-এর জন্য keys wrap করে; API names বা payloads decrypt না করে।

<img src="/guide/sharing-key-wrap.svg" alt="Sharing model: publish identity keys, wrap org keys for live shared collections, or wrap entry shares as frozen ciphertext snapshots; server stores opaque blobs only" class="ok-diagram" width="920" height="400" />

**OpenKey Pro** এবং configured [server](./server) account (register / login + sync) প্রয়োজন। Invite বা share-এর আগে identity keys publish করুন যাতে peers আপনার জন্য keys wrap করতে পারে।

## Prerequisites

1. App ইনস্টল করুন ([Download](./download)) এবং vault unlock করুন।
2. **Settings → Data → Self-hosted server** connect করুন ও sync করুন।
3. **Settings → Data → Publish identity keys** (Pro) — sharing-এর opaque public / wrapped private key material upload।
4. Recipients **একই server URL** ব্যবহার করুন এবং identity keys publish করেছেন (অথবা কমপক্ষে registered account যা server look up করতে পারে)।

## Organizations

Path: **Settings → Data → Organizations**, অথবা **Items hub → Organizations**।

### Create an org

1. Organizations → create খুলুন।
2. Client org name encrypt করে এবং owner হিসেবে আপনার জন্য org key wrap করে।
3. Org-এর অধীনে team logins-এর **shared collections** বানান (encrypted names + payloads)।

Org shared vault entries সেই org collections-এর অধীনে থাকে এবং opaque rows (`encrypted_payload`) হিসেবে sync হয়।

### Invite members

1. Org → **Invite member** খুলুন।
2. তাদের **email** দিন (এই server-এ আগে থেকে exist করতে হবে) এবং role বেছে নিন (`admin` / `member`)।
3. Client তাদের public identity key-এর জন্য org key wrap করে এবং invite post করে।
4. তারা **Pending invites** দেখে, accept করে, তারপর sync-এর পর shared collections খুলতে পারে।

Owner/admin pending invites revoke, role বদলাতে, বা members সরাতে পারে। Owner org ছাড়তে পারে না; ownership transfer আলাদা recovery path নয় — admins সাবধানে plan করুন।

### Accept an invite

1. Organizations → **Pending invites** খুলুন।
2. Accept করুন। Sync করুন যাতে shared collections দেখা যায়।
3. সাধারণ master password ও server ব্যবহার করুন — join করলে server plaintext পায় না।

## Item & collection shares

Org-এ রাখা ছাড়াই single login (অথবা collection) অন্য user-এর সাথে শেয়ার করুন।

1. Entry (অথবা collection) → **Share** খুলুন।
2. আপনার server-এ recipient email বেছে নিন।
3. Client তাদের জন্য item key wrap করে। **Entry shares** share time-এ encrypted payload **snapshot** করে।
4. Recipient: shares / pending UI-এ accept করুন, তারপর snapshot **তাদের** vault-এ import হয় (নতুন local uuid)।

### Snapshot semantics (গুরুত্বপূর্ণ)

- **Entry** share accept করলে frozen ciphertext recipient-এর personal vault-এ copy হয়।
- Owner-এর original entry-এর পরের edits recipients-এ **push নয়**।
- **Revoke** pending accept বন্ধ করে; recipient-এর ডিভাইসে আগে import করা copy **delete না** করে।

Shares sealed copy দেওয়ার মতো মানুন, live shared document নয়। Ongoing team access-এ shared org key-এর অধীনে same ciphertext চাইলে **org shared collections** প্রাথমিক।

## Extension

Standalone (server) mode-এ [browser extension](./extension) shares list/accept/revoke এবং organizations / shared collections list করতে পারে। Desktop-bridge mode unlocked app-এ vault operations-এর জন্য নির্ভর।

## Security notes

- শুধু trusted মানুষ ও ডিভাইসের সাথে শেয়ার করুন — accept করলে recipients যা wrap করেছেন decrypt করতে পারে।
- Org names, share payloads, ও identity key blobs server-এ opaque ([Security](./security))।
- Server-এ access revoke করা অন্য ডিভাইসে আগে decrypt করা local copies মুছে না।
- Pro backups রাখুন; sharing offline recovery materials-এর বিকল্প নয়।

## Related API (self-hosters)

`openkey_server` README দেখুন: `/orgs`, `/invites/*`, `/shares`, এবং email-এ keys wrap-এর জন্য `POST /auth/lookup-public-key`।

Next: [Using the app](./app) · [Import & export](./import-export) · [FAQ](./faq) · [Server setup](./server)
