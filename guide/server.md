# Install the server

OpenKey Server is an optional **zero-knowledge sync API**. It stores ciphertext only so you can sync vaults across your own devices. Master passwords and plaintext vault keys never leave the client.

## Requirements

- Docker and Docker Compose (recommended), **or** Python 3.12+ with PostgreSQL 16
- A strong `JWT_SECRET` (at least 32 characters, not a placeholder)

## Install with Docker

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

When it is healthy:

| URL | Purpose |
|-----|---------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Schema migrations run automatically on API startup (`alembic upgrade head`).

## Important configuration

| Variable | Notes |
|----------|--------|
| `JWT_SECRET` | Required. Min 32 chars; placeholders are rejected at startup |
| `DATABASE_URL` | Async Postgres URL (Compose sets this for the `db` service) |
| `CORS_ORIGINS` | Comma-separated origins — **no `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Short-lived access JWT (default 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Opaque refresh token TTL (default 7, rotated on use) |
| `AUTH_RATE_LIMIT_*` | Per-IP limits on auth endpoints |

For production: put the API behind HTTPS, set a unique `JWT_SECRET`, and restrict `CORS_ORIGINS` to your clients. Stuck? See [FAQ & troubleshooting](./faq).

## Production behind HTTPS

Expose only the reverse proxy publicly. Keep Postgres and the API on a private network (Compose default is fine on a single host).

Example **Caddy** (automatic Let’s Encrypt):

```txt
openkey.example.com {
	reverse_proxy 127.0.0.1:8000
}
```

Example **nginx**:

```nginx
server {
	listen 443 ssl http2;
	server_name openkey.example.com;

	# ssl_certificate / ssl_certificate_key … (certbot or your CA)

	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Then in `.env`:

```bash
CORS_ORIGINS=https://openkey.example.com
# Add chrome-extension://<id> and moz-extension://<id> if the browser extension calls the API from those origins
```

Point clients at `https://openkey.example.com` (no port). Confirm `https://openkey.example.com/health`.

## API overview

Interactive OpenAPI: `http://localhost:8000/docs` on a running server. Full tables live in the `openkey_server` package README. Highlights:

### Auth

| Method | Path | Notes |
|--------|------|--------|
| `POST` | `/auth/register` | First account — stores `auth_hash`, wrapped vault key, salt, KDF params |
| `POST` | `/auth/prelogin` | Returns salt + KDF params so clients can derive `auth_hash` |
| `POST` | `/auth/login` | Email + `auth_hash` → access + refresh tokens |
| `POST` | `/auth/refresh` | Rotates opaque refresh token |
| `POST` | `/auth/rekey` | After master-password change — vault key stays the same |
| `POST` | `/auth/delete` | Re-prove `auth_hash`; deletes **server** ciphertext only |
| `POST` | `/auth/lookup-public-key` | Email → public identity key (for wrapping org/share keys) |

Auth endpoints are rate-limited per client IP. Refresh tokens are hashed at rest.

### Sync, collections, entries

`POST /sync` pushes/pulls ciphertext with **last-write-wins by per-item `revision`**. Soft deletes become **tombstones** so peers learn about removals. Nested folders use collection `parent_uuid`.

### Attachments

Ciphertext only. Max size **20 MB**. Prefer multipart `POST /attachments` for uploads; `GET /attachments/{uuid}/content` streams encrypted bytes. Batch sync may still carry base64 blobs for offline catch-up.

### Orgs & shares

Org names and share payloads stay encrypted. Entry shares **snapshot** ciphertext at create time — accepting imports a frozen copy into the recipient’s vault (not a live document). Prefer org shared collections for ongoing team access. Walkthrough: [Sharing & organizations](./sharing).

## Connect your clients

Point each client at the **same** server URL (for local Docker: `http://localhost:8000`, or your public HTTPS URL).

### OpenKey app (phone / desktop)

Install the OpenKey app from the [download channels](./download).

1. Unlock or create a local vault with your master password.
2. Open **Settings → Data → Self-hosted server**.
3. Enter the server URL (example: `https://openkey.example.com`).
4. **Register** (first device) or **Login** (another device that already has this vault account).
5. Tap **Sync now** whenever you want to pull/push ciphertext.

The app keeps a local encrypted database. Sync only exchanges opaque ciphertext. More: [Using the app](./app).

### Browser extension

1. Build and load `openkey_extension` (`npm install && npm run build`, then load `dist/`) — see [Browser extension](./extension).
2. Open extension **Options** and set the same server URL.
3. Unlock with the same email + master password (the extension uses `/auth/prelogin` then login).

**Desktop bridge (optional):** unlock the OpenKey desktop app, enable Autofill so the native messaging host is registered, then choose “Use desktop app” in the extension. Fill/save can go through the unlocked app without a separate extension unlock.

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

See [CLI](./cli) for secrets discovery without a server (desktop app bridge).

## Multi-device checklist

1. Install and secure the server once.
2. On the first device: register + sync.
3. On each new device: install the client → set the same server URL → login with the same email and master password → sync.
4. Keep regular offline backups (export / local backup) — the server is not a recovery path for a forgotten master password.

Next: [Download](./download) · [Using the app](./app) · [Browser extension](./extension) · [FAQ](./faq) · [CLI](./cli) · [Security](./security)
