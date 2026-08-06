# Quick start

Open sync server چلائیں، پھر app، extension، یا CLI connect کریں۔

## Server

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI `/docs` پر، health `/health` پر۔

## App

اپنے پلیٹ فارم کے سرکاری store یا download channel سے **OpenKey** app install کریں۔ **Settings → Data → Self-hosted server** میں `http://localhost:8000` (یا HTTPS URL) set کریں، پھر register یا log in اور sync کریں۔

[ایپ کا استعمال](./app) دیکھیں۔

## Browser extension

```bash
cd openkey_extension
npm install
npm run build
```

`dist/` unpacked extension کے طور پر load کریں۔ Options میں server URL set کریں اور email + master password سے unlock کریں۔ desktop پر native messaging host register کرنے app میں Autofill enable کریں۔

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

local secret discovery کے لیے desktop app unlocked رکھیں۔ optional server sync:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

اگلا: [Security](./security)، [سرور سیٹ اپ](./server)، [ایپ کا استعمال](./app)، اور [CLI](./cli) پڑھیں۔
