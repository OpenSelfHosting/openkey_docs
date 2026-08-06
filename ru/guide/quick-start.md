# Быстрый старт

Запустите open sync-сервер, затем подключите приложение, расширение или CLI.

## Сервер

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI на `/docs`, health на `/health`.

## Приложение

Установите приложение **OpenKey** из официального магазина или канала загрузки вашей платформы. В **Настройки → Данные → Self-hosted server** укажите `http://localhost:8000` (или HTTPS URL), затем зарегистрируйтесь или войдите и синхронизируйте.

См. [Использование приложения](./app).

## Расширение браузера

```bash
cd openkey_extension
npm install
npm run build
```

Загрузите `dist/` как unpacked extension. Укажите URL сервера в Options и разблокируйте email + мастер-паролем. На desktop включите Autofill в приложении для регистрации native messaging host.

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

Держите desktop-приложение разблокированным для локального обнаружения секретов. Опциональный sync сервера:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Далее: прочитайте [Безопасность](./security), [Настройка сервера](./server), [Использование приложения](./app) и [CLI](./cli).
