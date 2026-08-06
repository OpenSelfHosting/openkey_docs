# سرور انسٹال

OpenKey Server optional **zero-knowledge sync API** ہے۔ یہ صرف ciphertext store کرتا ہے تاکہ آپ اپنے devices میں vaults sync کر سکیں۔ Master passwords اور plaintext vault keys کبھی client نہیں چھوڑتے۔

## Requirements

- Docker and Docker Compose (recommended)، **یا** Python 3.12+ PostgreSQL 16 کے ساتھ
- Strong `JWT_SECRET` (کم از کم 32 characters، placeholder نہیں)

## Docker سے install

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

Healthy ہونے پر:

| URL | Purpose |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Schema migrations API startup پر automatically (`alembic upgrade head`)۔

## Important configuration

| Variable | Notes |
|----------|--------|
| `JWT_SECRET` | Required. Min 32 chars؛ startup پر placeholders rejected |
| `DATABASE_URL` | Async Postgres URL (Compose `db` service کے لیے set) |
| `CORS_ORIGINS` | Comma-separated origins — **no `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Short-lived access JWT (default 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Opaque refresh token TTL (default 7، use پر rotated) |
| `AUTH_RATE_LIMIT_*` | Auth endpoints پر per-IP limits |

Production کے لیے: API HTTPS کے پیچھے رکھیں، unique `JWT_SECRET` set کریں، `CORS_ORIGINS` clients تک restrict کریں۔


## پروڈکشن HTTPS

Full Caddy / nginx examples: [English](/guide/server#production-behind-https) · [العربية](/ar/guide/server#الإنتاج-خلف-https).

Put the API behind TLS, set a unique `JWT_SECRET`, and restrict `CORS_ORIGINS` (never `*`). Point clients at `https://your.domain` and check `/health`.

## اپنے clients connect کریں

ہر client **same** server URL پر point کریں (local Docker: `http://localhost:8000`، یا public HTTPS URL)۔

### OpenKey app (phone / desktop)

Official store یا download channel سے official OpenKey app install کریں۔

1. Master password سے local vault unlock یا create کریں۔
2. **Settings → Data → Self-hosted server** کھولیں۔
3. Server URL enter کریں (example: `https://openkey.example.com`)۔
4. **Register** (پہلا device) یا **Login** (دوسرا device جس میں یہ vault account ہے)۔
5. Ciphertext pull/push کے لیے **Sync now** tap کریں۔

App local encrypted database رکھتا ہے۔ Sync صرف opaque ciphertext exchange کرتا ہے۔ مزید: [ایپ کا استعمال](./app)۔

### Browser extension

1. `openkey_extension` build اور load (`npm install && npm run build`، پھر `dist/` load)۔
2. Extension **Options** کھول کر same server URL set کریں۔
3. Same email + master password سے unlock (extension `/auth/prelogin` پھر login)۔

**Desktop bridge (optional):** OpenKey desktop app unlock کریں، native messaging host register کرنے Autofill enable کریں، پھر extension میں «Use desktop app» choose کریں۔ Separate extension unlock کے بغیر fill/save unlocked app سے ہو سکتا ہے۔

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Server کے بغیر secrets discovery: [CLI](./cli) (desktop app bridge)۔

## Multi-device checklist

1. Server ایک بار install اور secure کریں۔
2. پہلے device پر: register + sync۔
3. ہر نئے device پر: client install → same server URL → same email اور master password → sync۔
4. Regular offline backups رکھیں (export / local backup) — بھولا master password server recovery path نہیں۔

اگلا: [ایپ کا استعمال](./app) · [CLI](./cli) · [Security](./security)
