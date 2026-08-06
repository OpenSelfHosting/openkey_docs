# پیکجز

پیکجز جو آپ self-host اور build کر سکتے ہیں۔ **OpenKey mobile/desktop app** [ایپ کا استعمال](./app) میں cover ہے۔

| Path | Description |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | FastAPI zero-knowledge sync API + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | MV3 browser extension (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | Developer CLI — secrets، password generation، sync |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | یہ site — product pages اور documentation |

 client کے روزمرہ استعمال کے لیے [ایپ کا استعمال](./app) دیکھیں۔

## Server highlights

- Ciphertext-only storage
- JWT access tokens + rotating opaque refresh tokens
- Alembic migrations on PostgreSQL 16
- Auth rate limiting and strict CORS

## Extension highlights

- Standalone vault unlock + sync، یا unlocked desktop app سے native bridge
- Autofill overlays، save/update prompts، passkeys
- Cards، crypto wallets، اور developer secrets

## CLI highlights

- Offline password generation
- Unlocked desktop app میں SSH keys، `.env` files، اور API tokens discover
- آپ کے server کے خلاف optional login / unlock / sync

[OpenSelfHosting](https://github.com/OpenSelfHosting) کے تحت published remotes الگ packages ship کر سکتے ہیں؛ یہ docs site اوپر والے open packages بیان کرتی ہے۔
