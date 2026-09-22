---
title: Developer secret-এর জন্য CLI
description: OpenKey CLI-এর পেশাদারি পরিচিতি — অফলাইন জেনারেশন, native desktop bridge, discovery, secret kind এবং ঐচ্ছিক zero-knowledge server sync।
date: 2026-08-01
cover: /blog/covers/cli-for-developers.png
---

# Developer secret-এর জন্য CLI

SSH key, `.env` ফাইল ও API token ল্যাপটপ ও CI agent জুড়ে ছড়িয়ে পড়ে। OpenKey **CLI** (`openkey`) একই zero-knowledge ভল্টের টার্মিনাল মুখ: অফলাইনে পাসওয়ার্ড জেনারেট, লোকাল finding unlocked **desktop** অ্যাপে import, typed secret পরিচালনা, এবং ঐচ্ছিকভাবে self-hosted server থেকে ciphertext pull।

এটি guided tour। সম্পূর্ণ flag-level reference [CLI guide](/bn/guide/cli)-এ।

## তিনটি operating mode

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI architecture overview" class="ok-diagram" width="920" height="420" />

| Mode | প্রয়োজনীয়তা | ভূমিকা |
|------|-------------|------|
| Offline | কিছু নয় | `openkey gen` — নেটওয়ার্ক বা unlocked vault ছাড়াই cryptographically উপযোগী পাসওয়ার্ড |
| Native bridge | এই মেশিনে desktop অ্যাপ unlocked | secret, discovery import ও search-এর default পথ **secret ও login** জুড়ে |
| CLI session | `login` + `eval $(openkey unlock)` | desktop অ্যাপ না থাকলে লোকাল ciphertext cache ও `sync` |

CLI bridge up থাকলে prefer করে। না হলে `OPENKEY_SESSION` ব্যবহার করে। Bridge শুধু লোকাল এবং vault locked থাকলে কাজ করতে দেয় না — desktop session-এর মতো trust boundary।

<img src="/guide/cli-backend-choice.svg" alt="How vault commands choose native bridge or session mode" class="ok-diagram" width="920" height="360" />

## অফলাইন জেনারেশন

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

দৈর্ঘ্য ও character class (`--no-upper`, `--no-lower`, `--no-digits`, `--no-symbols`) টিউন করুন, অথবা `-c` দিয়ে সরাসরি clipboard-এ কপি করুন। অ্যাপ unlock বা server registration লাগে না।

## device group-এ discovery

<img src="/guide/cli-discover-flow.svg" alt="Discover flow from scan to vault save" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

Discovery scan করতে পারে:

- `~/.ssh`-এর নিচে private key (সহ sibling `.pub` যখন আছে)
- পরিচিত ও secret-like process environment variable
- AWS shared credential
- এক বা একাধিক project root থেকে `.env` / `.env.*` tree

ফলাফল ভল্টের Secrets অংশে **device** লেবেলের (default hostname) নিচে গ্রুপ হয়। আগে import করা value content fingerprint দিয়ে skip হয়। `--dry-run` preview; `-y` prompt ছাড়া import। save-এর জন্য desktop অ্যাপ unlocked (বা CLI session) লাগে।

## দৈনন্দিন secret অপারেশন

Secret typed record: `apiToken` (default), `sshKey`, `envSnippet`, বা `other`।

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

List ও search value **mask** করে। plaintext দরকার হলে `get` / `copy` ব্যবহার করুন। Query name, host বা UUID prefix match করে; ambiguous হলে candidate তালিকা, অনুমান নয়।

**Secret ও login entry** একসাথে search:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## ঐচ্ছিক self-hosted sync

<img src="/guide/cli-server-flow.svg" alt="Login, ciphertext pull, and OPENKEY_SESSION unlock flow" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

Login Argon2id দিয়ে `auth_hash` derive করে, master password flag হিসেবে পাঠায় না, CLI cache-এ শুধু wrapped key ও ciphertext রাখে, `unlock` থেকে `OPENKEY_SESSION` export প্রিন্ট করে (default lifetime 15 মিনিট; `openkey config set-lock` দিয়ে বদলান)। CI-তে `OPENKEY_PASSWORD` সেট করতে পারেন; ব্যক্তিগত মেশিনে interactive prompt prefer করুন।

যেকোনো সময় state দেখুন:

```bash
openkey status
openkey config show
```

## এটি পাসওয়ার্ড ম্যানেজারে কেন

Developer টার্মিনালে থাকে। অ্যাপের মতো এনক্রিপ্টেড Secrets এলাকায় লেখা CLI — এবং একই ciphertext-only sync API — workflow ও threat model এক রাখে। script-এর জন্য দ্বিতীয় secret store রাখতে হয় না।

## ইনস্টল

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

Node.js 20+ লাগে। সম্পূর্ণ command reference, environment variable, config path ও security note: [CLI guide](/bn/guide/cli)।
