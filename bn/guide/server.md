# সার্ভার ইনস্টল

OpenKey Server একটি ঐচ্ছিক **zero-knowledge সিঙ্ক API**। এটি শুধু ciphertext সংরক্ষণ করে যাতে আপনি নিজের ডিভাইস জুড়ে ভল্ট সিঙ্ক করতে পারেন। মাস্টার পাসওয়ার্ড ও প্লেইনটেক্সট ভল্ট কী কখনো ক্লায়েন্ট ছাড়ে না।

## প্রয়োজনীয়তা

- Docker ও Docker Compose (সুপারিশ), **অথবা** Python 3.12+ PostgreSQL 16 সহ
- শক্তিশালী `JWT_SECRET` (অন্তত ৩২ অক্ষর, placeholder নয়)

## Docker দিয়ে ইনস্টল

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

সুস্থ হলে:

| URL | উদ্দেশ্য |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

API startup-এ schema migration স্বয়ংক্রিয় (`alembic upgrade head`)।

## গুরুত্বপূর্ণ কনফিগারেশন

| ভেরিয়েবল | নোট |
|----------|--------|
| `JWT_SECRET` | প্রয়োজন। ন্যূনতম ৩২ অক্ষর; startup-এ placeholder প্রত্যাখ্যাত |
| `DATABASE_URL` | Async Postgres URL (Compose `db` সার্ভিসের জন্য সেট করে) |
| `CORS_ORIGINS` | কমা-বিভক্ত origins — **`*` নয়** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | স্বল্পমেয়াদী access JWT (ডিফল্ট ১৫) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | opaque refresh token TTL (ডিফল্ট ৭, ব্যবহারে ঘোরানো) |
| `AUTH_RATE_LIMIT_*` | auth endpoint-এ per-IP সীমা |

প্রোডাকশনে: API HTTPS-এর পিছনে রাখুন, unique `JWT_SECRET` সেট করুন, `CORS_ORIGINS` ক্লায়েন্টে সীমাবদ্ধ করুন।


## প্রোডাকশন HTTPS

Full Caddy / nginx examples: [English](/guide/server#production-behind-https) · [العربية](/ar/guide/server#الإنتاج-خلف-https).

Put the API behind TLS, set a unique `JWT_SECRET`, and restrict `CORS_ORIGINS` (never `*`). Point clients at `https://your.domain` and check `/health`.

## ক্লায়েন্ট সংযুক্ত করুন

প্রতিটি ক্লায়েন্ট **একই** সার্ভার URL-এ নির্দেশ করুন (স্থানীয় Docker: `http://localhost:8000`, বা পাবলিক HTTPS URL)।

### OpenKey অ্যাপ (ফোন / ডেস্কটপ)

অফিসিয়াল স্টোর বা ডাউনলোড চ্যানেল থেকে অফিসিয়াল OpenKey অ্যাপ ইনস্টল করুন।

1. মাস্টার পাসওয়ার্ড দিয়ে স্থানীয় ভল্ট আনলক বা তৈরি করুন।
2. **Settings → Data → Self-hosted server** খুলুন।
3. সার্ভার URL দিন (উদাহরণ: `https://openkey.example.com`)।
4. **Register** (প্রথম ডিভাইস) বা **Login** (অন্য ডিভাইস যেখানে এই ভল্ট অ্যাকাউন্ট আছে)।
5. ciphertext pull/push করতে **Sync now** ট্যাপ করুন।

অ্যাপ স্থানীয় এনক্রিপ্টেড ডাটাবেস রাখে। সিঙ্ক শুধু opaque ciphertext বিনিময় করে। আরও: [অ্যাপ ব্যবহার](./app)।

### ব্রাউজার এক্সটেনশন

1. `openkey_extension` বিল্ড ও লোড (`npm install && npm run build`, তারপর `dist/` লোড)।
2. এক্সটেনশন **Options** খুলে একই সার্ভার URL সেট করুন।
3. একই email + মাস্টার পাসওয়ার্ড দিয়ে আনলক (`/auth/prelogin` তারপর login)।

**ডেস্কটপ bridge (ঐচ্ছিক):** OpenKey ডেস্কটপ অ্যাপ আনলক করুন, native messaging host রেজিস্টার করতে Autofill সক্ষম করুন, তারপর এক্সটেনশনে «Use desktop app» বেছে নিন। আলাদা এক্সটেনশন unlock ছাড়াই fill/save আনলক করা অ্যাপ দিয়ে হতে পারে।

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

সার্ভার ছাড়া সিক্রেট discovery: [CLI](./cli) (ডেস্কটপ অ্যাপ bridge)।

## মাল্টি-ডিভাইস চেকলিস্ট

1. সার্ভার একবার ইনস্টল ও সুরক্ষিত করুন।
2. প্রথম ডিভাইসে: register + sync।
3. প্রতিটি নতুন ডিভাইসে: ক্লায়েন্ট ইনস্টল → একই সার্ভার URL → একই email ও মাস্টার পাসওয়ার্ড → sync।
4. নিয়মিত অফলাইন ব্যাকআপ রাখুন (export / local backup) — ভুলে যাওয়া মাস্টার পাসওয়ার্ডের জন্য সার্ভার recovery path নয়।

পরবর্তী: [অ্যাপ ব্যবহার](./app) · [CLI](./cli) · [Security](./security)
