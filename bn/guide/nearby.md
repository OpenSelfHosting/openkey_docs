# Nearby LAN সিঙ্ক

**OpenKey Pro** আপনার স্থানীয় Wi‑Fi-তে ডিভাইসগুলোর মধ্যে একই ভল্ট **স্ব-হোস্ট সার্ভার ছাড়াই** সিঙ্ক করতে পারে। Ciphertext একটি paired LAN session-এ চলে; ভল্ট কী শেয়ার হয় শুধু যখন আপনি স্পষ্টভাবে **Link vault** করেন। **নতুন ডিভাইসে** first-run setup-এ Nearby দিয়ে বিদ্যমান ভল্ট **কপি**ও করা যায় (vault clone) — এখনও peer-to-peer, sync API দিয়ে নয়।

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: discover a peer on the LAN, pair for a session key, then either copy a vault at setup or explicitly link vaults for ongoing merge sync; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

এই পৃষ্ঠা discovery, tap-to-pair, setup-এ vault clone, vault link, send-entry, LAN Pro, এবং trust rules কভার করে। সংক্ষিপ্ত troubleshooting: [FAQ](./faq#nearby-does-not-find-the-other-device-pro)। Threat model: [Security](./security)। Protocol details: [OpenKey spec → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md)।

## প্রয়োজনীয়তা

- সিঙ্ক বা clone করতে চান প্রতিটি ডিভাইসে OpenKey Pro (অথবা non–store-IAP প্ল্যাটফর্মে বৈধ **LAN Pro** attestation — নিচে দেখুন)
- একই **LAN** (guest Wi‑Fi / client isolation নয়)
- **Merge sync**-এর জন্য: উভয় ডিভাইস unlocked এবং **Settings → Nearby devices** চালু
- **Setup-এ vault clone**-এর জন্য: বিদ্যমান ডিভাইস unlocked ও advertising (ভল্টসহ); নতুন ডিভাইস first-run **Nearby device** path-এ

Nearby merge sync **ব্যাকআপ নয়**। Pro [encrypted `.okbak`](./import-export#encrypted-backup-pro) রাখুন। Vault clone একবার পুরো ভল্ট কপি করে (attachmentsসহ); তারপরও offline backups রাখুন।

Discovery beacons-এ LAN-এ **device name স্পষ্ট** থাকে (এবং peer-এর আগে থেকে account আছে কিনা — `vault` flag)। শুধু নিজের ডিভাইস গ্রহণ করুন। ভল্ট lock করলে unlock পর্যন্ত Nearby থেমে যায়।

Linux ও Windows একবার LAN ports খুলতে বলতে পারে (**UDP/TCP 47821**, **TCP 47822**)। Peers এই মেশিন খুঁজে পাক বলে prompts allow করুন।

## Setup-এ ভল্ট কপি করুন (vault clone)

যখন **নতুন ফোন বা desktop**-এ Wi‑Fi দিয়ে বিদ্যমান ভল্টের পূর্ণ কপি চাই (`.okbak` ফাইল ছাড়া, সার্ভার ছাড়া):

1. **বিদ্যমান** ডিভাইসে: OpenKey unlock → **Settings → Nearby devices** → **Visible on local network** চালু করুন। Peer দেখাক যে তার **ভল্ট আছে**।
2. **নতুন** ডিভাইসে: first-run chooser → **Nearby device** (বা সমতুল্য setup path)।
3. Discovered peer-এ ট্যাপ করুন → কপি confirm করুন। Vault holder push করে (বা খালি ডিভাইস pull) — session-encrypted archive LAN-এ।
4. নতুন ডিভাইসে উৎসের **একই master password** দিয়ে unlock করুন। Password wire-এ যায় না — শুধু unlock material ও vault ciphertext paired session-এর ভিতরে চলে।

Clone-এ local database, preferences, attachments, optional avatar, এবং account unlock fields (email, salt, KDF, wrapped vault key) থাকে। সেই email নতুন ডিভাইসে আগে থেকে থাকলে clone `email_exists` দিয়ে fail হয়।

**Clone vs Link vault**

| | Vault clone | Link vault |
|--|-------------|------------|
| কখন | First-run / খালি ডিভাইস | উভয় ডিভাইসে আগে থেকেই vaults |
| ফল | একটি পূর্ণ ভল্ট খালি ডিভাইসে কপি | Vault-key fingerprint শেয়ার; ongoing LWW merge sync |
| Master password | কপি unlock-এর জন্য একই password | উভয় পাশে আগে থেকে unlocked |

## ডিভাইস pair করুন (merge sync)

1. উভয় ডিভাইসে OpenKey unlock করুন → **Settings → Nearby devices**।
2. **Visible on local network** চালু করুন (মনে রাখা হয়: ভল্ট unlocked থাকলে পরবর্তী unlock-এ resume)।
3. Discovered peer-এ ট্যাপ করে pair করুন (short pairing code LAN session-এ স্বয়ংক্রিয় exchange)। Discovery কঠিন হলে প্রায় দুই মিনিটের মধ্যে short code ম্যানুয়াল দেওয়া এখনও কাজ করে।
4. Pairing-এর পর **Link vault** ট্যাপ করুন যাতে উভয় একই vault-key fingerprint শেয়ার করে। Pairing একাই vault key auto-share না করে।

ভল্ট কী ভিন্ন হলে, receiving ডিভাইস peer-এর কী **adopt** করতে পারে (master-password confirmation-এর পর local vault data প্রতিস্থাপন)। Link + adopt-কে full vault trust মানুন।

### Firewall / dial-back

কিছু desktop (বিশেষ করে macOS) inbound TCP ব্লক করে। Linux ও Windows builds একবার **UDP/TCP 47821** ও **TCP 47822** চাইতে পারে। Peer dial-in করতে না পারলে OpenKey advertising host-কে guest-এ dial-back করতে বলতে পারে (unicast UDP only — pairing code LAN-এ broadcast নয়)। OS prompt-এ local-network / firewall অনুমতি দিন। একই subnet প্রাথমিক; VPN ও private relay প্রায়ই discovery ভাঙে। অনেক ভুল code-এ short lockout।

## Linking-এর পর

- উভয় ভল্ট unlocked ও Nearby advertising চালু থাকলে changes স্বয়ংক্রিয় সিঙ্ক।
- Manual catch-up-এ **Sync now** ব্যবহার করুন।
- সিঙ্ক **revision অনুযায়ী last-write-wins** (একই নিয়ম [server](./server) যেমন) — যেখানে সম্ভব এক ডিভাইসে edit করুন।
- **Trusted devices:** এক সফল pair + vault link-এর পর peers reconnect ও সিঙ্ক যখনই Nearby চালু — re-pairing নয়।
- **Trusted networks only (ঐচ্ছিক):** home/office Wi‑Fi SSID যোগ করুন; current SSID তালিকায় না থাকলে Nearby pause (তালিকা খালি হলে start ব্লক)। OS SSID পড়তে না পারলে warning banner-সহ Nearby চলতে পারে।
- **Unpair** LAN trust revoke, সিঙ্ক বন্ধ, এবং সেই peer-এর LAN Pro claims সাফ করতে।

## Entry পাঠান

Full vault sync-এর অপেক্ষা ছাড়াই paired peer-এ single login push করতে পারেন:

1. Entry খুলুন (অথবা **Settings → Nearby devices**-এ Nearby peer actions)।
2. সেই peer-এর জন্য **Send to device** / send entry বেছে নিন।
3. Peer LAN session-এ ciphertext পায় এবং locally store করতে পারে।

LAN-এ one-off share-এর জন্য; peers একই self-hosted server ব্যবহার করলে [organizations & sharing](./sharing) প্রাথমিক।

## LAN Pro attestation {#lan-pro-attestation}

Store in-app purchase **বিহীন** প্ল্যাটফর্মে (সাধারণত Windows / Linux), **vault-linked** Pro peer **LAN Pro** status শেয়ার করতে পারে যাতে অন্য ডিভাইস Nearby-তে Pro limits unlock করে। Pairing একাই যথেষ্ট নয় — প্রথমে **Link vault** ট্যাপ করুন।

- শুধু সুবিধা — purchase-এর **cryptographic proof নয়**।
- Android, iOS, এবং macOS (store IAP) LAN Pro **ignore** করে; সেই store-এ Pro কিনুন বা restore করুন।
- Unpairing attestation বন্ধ করে।

## Trust সারাংশ

| Action | Trust implication |
|--------|-------------------|
| Pair | LAN-এ সেই peer-এর সাথে session key |
| Vault clone | Peer পূর্ণ vault copy পায় (ciphertext + unlock material); unlock-এ একই master password লাগে |
| Link vault | Vault-key material শেয়ার — peer full vault ciphertext সিঙ্ক করতে পারে |
| Send entry | Peer সেই entry-এর ciphertext পায় |
| LAN Pro | Peer non-IAP প্ল্যাটফর্মে Pro limits unlock করতে পারে |

শুধু trusted ডিভাইস ও মানুষের সাথে pair, clone, ও link করুন। বিস্তারিত: [Security → Threat model](./security#threat-model)।

## সম্পর্কিত

- [Using the app](./app) — setup chooser, settings map ও Pro matrix
- [Download](./download)
- [Import & export](./import-export) — `.okbak` vs Nearby clone
- [FAQ](./faq)
- [Security](./security)

Next: [Using the app](./app) · [Sharing](./sharing) · [FAQ](./faq)
