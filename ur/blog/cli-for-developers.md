---
title: Developer secrets کے لیے CLI
description: OpenKey CLI کا پیشہ ورانہ جائزہ — آف لائن generation، native desktop bridge، discovery، secret kinds، اور اختیاری zero-knowledge سرور sync۔
date: 2026-08-01
cover: /blog/covers/cli-for-developers.svg
---

# Developer secrets کے لیے CLI

SSH keys، `.env` فائلیں، اور API tokens لیپ ٹاپز اور CI agents پر بکھرے ہوتے ہیں۔ OpenKey **CLI** (`openkey`) اسی zero-knowledge vault کا ٹرمینل چہرہ ہے: آف لائن پاس ورڈز بنائیں، مقامی findings ان لاک شدہ **desktop** ایپ میں import کریں، typed secrets manage کریں، اور اختیاری طور پر self-hosted سرور سے ciphertext کھینچیں۔

یہ مضمون guided tour ہے۔ مکمل flag-level reference [CLI گائیڈ](/ur/guide/cli) میں ہے۔

## تین operating modes

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI architecture overview" class="ok-diagram" width="920" height="420" />

| Mode | ضرورت | کردار |
|------|--------|--------|
| Offline | کچھ نہیں | `openkey gen` — بغیر نیٹ ورک اور بغیر unlock vault کے کرپٹوگرافک طور پر مفید پاس ورڈز |
| Native bridge | اس مشین پر desktop ایپ unlock | secrets، discovery import، اور secrets **اور** logins میں search کے لیے ڈیفالٹ راستہ |
| CLI session | `login` + `eval $(openkey unlock)` | مقامی ciphertext cache اور `sync` جب desktop ایپ دستیاب نہیں |

CLI bridge کو ترجیح دیتا ہے جب وہ چالو ہو۔ ورنہ `OPENKEY_SESSION` استعمال ہوتا ہے۔ Bridge صرف مقامی ہے اور vault locked ہونے پر کام سے انکار کرتا ہے — desktop session جیسی ہی trust boundary۔

<img src="/guide/cli-backend-choice.svg" alt="How vault commands choose native bridge or session mode" class="ok-diagram" width="920" height="360" />

## آف لائن generation

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

لمبائی اور character classes (`--no-upper`، `--no-lower`، `--no-digits`، `--no-symbols`) ٹیون کریں، یا `-c` سے سیدھا clipboard پر کاپی کریں۔ ایپ unlock اور سرور registration درکار نہیں۔

## Device group میں discovery

<img src="/guide/cli-discover-flow.svg" alt="Discover flow from scan to vault save" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

Discovery scan کر سکتا ہے:

- `~/.ssh` کے تحت private keys (جب موجود ہوں تو sibling `.pub` فائلیں)
- معروف اور secret جیسے process environment variables
- AWS shared credentials
- ایک یا زیادہ project roots سے `.env` / `.env.*` trees

نتائج vault کے Secrets حصے میں **device** لیبل (ڈیفالٹ hostname) کے تحت گروپ ہوتے ہیں۔ پہلے import شدہ values content fingerprint سے چھوڑ دی جاتی ہیں۔ preview کے لیے `--dry-run`؛ بغیر prompt import کے لیے `-y`۔ محفوظ کرنے کے لیے پھر بھی desktop ایپ unlock (یا CLI session) چاہیے۔

## روزمرہ secret operations

Secrets typed records ہیں: `apiToken` (ڈیفالٹ)، `sshKey`، `envSnippet`، یا `other`۔

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

List اور search values **mask** کرتے ہیں۔ `get` / `copy` صرف جب plaintext ضروری ہو۔ Queries نام، host، یا UUID prefix سے match؛ مبہم matches اندازہ لگانے کے بجائے candidates دکھاتے ہیں۔

**Secrets اور login entries** اکٹھے تلاش کرنے کے لیے:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## اختیاری self-hosted sync

<img src="/guide/cli-server-flow.svg" alt="Login, ciphertext pull, and OPENKEY_SESSION unlock flow" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

Login Argon2id سے `auth_hash` نکالتا ہے، ماسٹر پاس ورڈ کبھی flag کے طور پر نہیں بھیجتا، CLI cache میں صرف لپٹی ہوئی keys اور ciphertext رکھتا ہے، اور `unlock` سے `OPENKEY_SESSION` export پرنٹ کرتا ہے (ڈیفالٹ مدت 15 منٹ؛ `openkey config set-lock` سے بدلیں)۔ CI کے لیے `OPENKEY_PASSWORD` سیٹ کر سکتے ہیں؛ ذاتی مشینوں پر interactive prompt بہتر۔

کسی بھی وقت state دیکھیں:

```bash
openkey status
openkey config show
```

## یہ پاس ورڈ مینیجر میں کیوں

Developers ٹرمینلز میں رہتے ہیں۔ CLI جو ایپ جیسے ہی خفیہ Secrets علاقے میں لکھے — اور وہی ciphertext-only sync API — workflow اور threat model aligned رکھتا ہے۔ scripts کے لیے دوسرا secrets store maintain نہیں کرنا پڑتا۔

## انسٹال

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

Node.js 20+ درکار۔ مکمل command reference، environment variables، config paths، اور security notes: [CLI گائیڈ](/ur/guide/cli)۔
