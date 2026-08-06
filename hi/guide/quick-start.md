# Quick start

ओपन sync सर्वर चलाएँ, फिर ऐप, एक्सटेंशन या CLI कनेक्ट करें।

## सर्वर

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI `/docs` पर, health `/health` पर।

## ऐप

अपने प्लेटफ़ॉर्म के आधिकारिक स्टोर या डाउनलोड चैनल से **OpenKey** ऐप इंस्टॉल करें। **Settings → Data → Self-hosted server** में `http://localhost:8000` (या HTTPS URL) सेट करें, फिर register या log in और sync करें।

[ऐप का उपयोग](./app) देखें।

## ब्राउज़र एक्सटेंशन

```bash
cd openkey_extension
npm install
npm run build
```

`dist/` unpacked extension के रूप में लोड करें। Options में सर्वर URL सेट करें और email + मास्टर पासवर्ड से अनलॉक करें। डेस्कटॉप पर native messaging host रजिस्टर करने के लिए ऐप में Autofill सक्षम करें।

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

स्थानीय secret discovery के लिए डेस्कटॉप ऐप अनलॉक रखें। वैकल्पिक सर्वर sync:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

अगला: [Security](./security), [सर्वर सेटअप](./server), [ऐप का उपयोग](./app), और [CLI](./cli) पढ़ें।
