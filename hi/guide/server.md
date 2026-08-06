# सर्वर इंस्टॉल

OpenKey Server एक वैकल्पिक **zero-knowledge sync API** है। यह केवल ciphertext संग्रहीत करता है ताकि आप अपने डिवाइसों में vault sync कर सकें। मास्टर पासवर्ड और plaintext vault keys कभी क्लाइंट नहीं छोड़ते।

## आवश्यकताएँ

- Docker और Docker Compose (अनुशंसित), **या** Python 3.12+ PostgreSQL 16 के साथ
- मज़बूत `JWT_SECRET` (कम से कम 32 वर्ण, placeholder नहीं)

## Docker से इंस्टॉल

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

स्वस्थ होने पर:

| URL | उद्देश्य |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

API startup पर schema migrations स्वचालित (`alembic upgrade head`)।

## महत्वपूर्ण कॉन्फ़िगरेशन

| Variable | Notes |
|----------|--------|
| `JWT_SECRET` | आवश्यक। न्यूनतम 32 वर्ण; startup पर placeholders अस्वीकृत |
| `DATABASE_URL` | Async Postgres URL (Compose `db` service के लिए सेट) |
| `CORS_ORIGINS` | comma-separated origins — **`*` नहीं** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | अल्पकालिक access JWT (डिफ़ॉल्ट 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | opaque refresh token TTL (डिफ़ॉल्ट 7, उपयोग पर rotate) |
| `AUTH_RATE_LIMIT_*` | auth endpoints पर per-IP limits |

Production के लिए: API HTTPS के पीछे रखें, unique `JWT_SECRET` सेट करें, `CORS_ORIGINS` clients तक सीमित करें।


## प्रोडक्शन HTTPS

Full Caddy / nginx examples: [English](/guide/server#production-behind-https) · [العربية](/ar/guide/server#الإنتاج-خلف-https).

Put the API behind TLS, set a unique `JWT_SECRET`, and restrict `CORS_ORIGINS` (never `*`). Point clients at `https://your.domain` and check `/health`.

## अपने clients कनेक्ट करें

प्रत्येक client **समान** सर्वर URL पर इंगित करें (स्थानीय Docker: `http://localhost:8000`, या public HTTPS URL)।

### OpenKey ऐप (phone / desktop)

आधिकारिक स्टोर या डाउनलोड चैनल से आधिकारिक OpenKey ऐप इंस्टॉल करें।

1. मास्टर पासवर्ड से स्थानीय vault अनलॉक या बनाएँ।
2. **Settings → Data → Self-hosted server** खोलें।
3. सर्वर URL दर्ज करें (उदाहरण: `https://openkey.example.com`)।
4. **Register** (पहला device) या **Login** (दूसरा device जिसमें यह vault account है)।
5. ciphertext pull/push के लिए **Sync now** टैप करें।

ऐप स्थानीय एन्क्रिप्टेड database रखता है। sync केवल opaque ciphertext exchange करता है। और: [ऐप का उपयोग](./app)।

### ब्राउज़र एक्सटेंशन

1. `openkey_extension` build और load (`npm install && npm run build`, फिर `dist/` load)।
2. extension **Options** खोलकर समान सर्वर URL सेट करें।
3. समान email + मास्टर पासवर्ड से अनलॉक (extension `/auth/prelogin` फिर login)।

**Desktop bridge (वैकल्पिक):** OpenKey desktop ऐप अनलॉक करें, native messaging host रजिस्टर करने Autofill सक्षम करें, फिर extension में «Use desktop app» चुनें। अलग extension unlock के बिना fill/save अनलॉक ऐप से हो सकता है।

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

सर्वर के बिना secrets discovery: [CLI](./cli) (desktop ऐप bridge)।

## Multi-device checklist

1. सर्वर एक बार इंस्टॉल और सुरक्षित करें।
2. पहले device पर: register + sync।
3. प्रत्येक नए device पर: client इंस्टॉल → समान सर्वर URL → समान email और मास्टर पासवर्ड → sync।
4. नियमित offline backups रखें (export / local backup) — भूला मास्टर पासवर्ड के लिए सर्वर recovery path नहीं।

<img src="/guide/server-sync-topology.svg" alt="Sync topology: app, extension, and CLI send auth_hash and ciphertext to openkey_server (FastAPI), which stores opaque rows in PostgreSQL" class="ok-diagram" width="920" height="400" />

अगला: [ऐप का उपयोग](./app) · [CLI](./cli) · [Security](./security)
