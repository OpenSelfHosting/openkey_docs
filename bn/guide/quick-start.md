# Quick start

ওপেন সিঙ্ক সার্ভার চালান, তারপর অ্যাপ, এক্সটেনশন বা CLI সংযুক্ত করুন।

## সার্ভার

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI `/docs`-এ, health `/health`-এ।

## অ্যাপ

আপনার প্ল্যাটফর্মের অফিসিয়াল স্টোর বা ডাউনলোড চ্যানেল থেকে **OpenKey** অ্যাপ ইনস্টল করুন। **Settings → Data → Self-hosted server**-এ `http://localhost:8000` (বা HTTPS URL) সেট করুন, তারপর register বা log in ও sync করুন।

[অ্যাপ ব্যবহার](./app) দেখুন।

## ব্রাউজার এক্সটেনশন

```bash
cd openkey_extension
npm install
npm run build
```

`dist/` unpacked এক্সটেনশন হিসেবে লোড করুন। Options-এ সার্ভার URL সেট করুন এবং email + মাস্টার পাসওয়ার্ড দিয়ে আনলক করুন। ডেস্কটপে native messaging host রেজিস্টার করতে অ্যাপে Autofill সক্ষম করুন।

## CLI

```bash
cd openkey_cli
npm install
npm run build
npm link   # optional

openkey gen -l 24
openkey discover --dry-run
openkey discover -y
```

স্থানীয় সিক্রেট discovery-র জন্য ডেস্কটপ অ্যাপ আনলক রাখুন। ঐচ্ছিক সার্ভার সিঙ্ক:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

পরবর্তী: [Security](./security), [সার্ভার সেটআপ](./server), [অ্যাপ ব্যবহার](./app), এবং [CLI](./cli) পড়ুন।
