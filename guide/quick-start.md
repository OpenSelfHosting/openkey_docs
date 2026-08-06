# Quick start

Install a client from [Download](./download), run the sync server, then connect the app, the [extension](./extension), or the CLI.

## Server

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI at `/docs`, health at `/health`.

## App

Install the **OpenKey** app ([download channels](./download)). In **Settings → Data → Self-hosted server**, set `http://localhost:8000` (or your HTTPS URL), then register or log in and sync.

See [Using the app](./app).

## Browser extension

```bash
cd openkey_extension
npm install
npm run build
```

Load `dist/` as an unpacked extension. Set the server URL in Options and unlock with email + master password. On desktop, enable Autofill in the app so the native messaging host is registered.

Details: [Browser extension](./extension).

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

Keep the desktop app unlocked for local secret discovery. Optional server sync:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Next: [Security](./security), [Server setup](./server), [Using the app](./app), [Browser extension](./extension), [FAQ](./faq), [Changelog](./changelog), and [CLI](./cli).
