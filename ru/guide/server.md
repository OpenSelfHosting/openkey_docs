# Установка сервера

OpenKey Server — опциональный **zero-knowledge sync API**. Хранит только ciphertext, чтобы синхронизировать сейфы между вашими устройствами. Мастер-пароли и plaintext-ключи сейфа никогда не покидают клиент.

## Требования

- Docker и Docker Compose (рекомендуется), **или** Python 3.12+ с PostgreSQL 16
- Надёжный `JWT_SECRET` (минимум 32 символа, не placeholder)

## Установка через Docker

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

Когда сервис здоров:

| URL | Назначение |
|-----|---------|
| `http://localhost:8000` | База API |
| `http://localhost:8000/docs` | OpenAPI docs |
| `http://localhost:8000/health` | Health check |

Миграции схемы выполняются автоматически при запуске API (`alembic upgrade head`).

## Важная конфигурация

| Переменная | Примечания |
|----------|--------|
| `JWT_SECRET` | Обязательно. Мин. 32 символа; placeholders отклоняются при запуске |
| `DATABASE_URL` | Async Postgres URL (Compose задаёт для сервиса `db`) |
| `CORS_ORIGINS` | Origins через запятую — **без `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Краткоживущий access JWT (по умолчанию 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | TTL opaque refresh token (по умолчанию 7, ротация при использовании) |
| `AUTH_RATE_LIMIT_*` | Лимиты per-IP на auth endpoints |

Для production: разместите API за HTTPS, задайте уникальный `JWT_SECRET` и ограничьте `CORS_ORIGINS` вашими клиентами.


## Production за HTTPS


Full Caddy / nginx examples: [English](/guide/server#production-behind-https) · [العربية](/ar/guide/server#الإنتاج-خلف-https).

Put the API behind TLS, set a unique `JWT_SECRET`, and restrict `CORS_ORIGINS` (never `*`). Point clients at `https://your.domain` and check `/health`.

## Подключение клиентов

Укажите каждому клиенту **тот же** URL сервера (локальный Docker: `http://localhost:8000`, или публичный HTTPS URL).

### Приложение OpenKey (телефон / desktop)

Устанавливайте официальное приложение OpenKey из официального магазина или канала загрузки.

1. Разблокируйте или создайте локальный сейф мастер-паролем.
2. Откройте **Настройки → Данные → Self-hosted server**.
3. Введите URL сервера (пример: `https://openkey.example.com`).
4. **Register** (первое устройство) или **Login** (другое устройство с этим аккаунтом сейфа).
5. Нажмите **Sync now**, когда нужно pull/push ciphertext.

Приложение хранит локальную зашифрованную базу. Sync обменивается только opaque ciphertext. Подробнее: [Использование приложения](./app).

### Расширение браузера

1. Соберите и загрузите `openkey_extension` (`npm install && npm run build`, затем загрузите `dist/`).
2. Откройте **Options** расширения и задайте тот же URL сервера.
3. Разблокируйте тем же email + мастер-паролем (расширение использует `/auth/prelogin`, затем login).

**Desktop bridge (опционально):** разблокируйте desktop-приложение OpenKey, включите Autofill для регистрации native messaging host, затем выберите «Use desktop app» в расширении. Fill/save может идти через разблокированное приложение без отдельной разблокировки расширения.

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

См. [CLI](./cli) для обнаружения секретов без сервера (bridge desktop-приложения).

## Чеклист для нескольких устройств

1. Установите и защитите сервер один раз.
2. На первом устройстве: register + sync.
3. На каждом новом устройстве: установите клиент → задайте тот же URL → login с тем же email и мастер-паролем → sync.
4. Регулярно делайте offline-резервные копии (export / local backup) — сервер не восстанавливает забытый мастер-пароль.

<img src="/guide/server-sync-topology.svg" alt="Sync topology: app, extension, and CLI send auth_hash and ciphertext to openkey_server (FastAPI), which stores opaque rows in PostgreSQL" class="ok-diagram" width="920" height="400" />

Далее: [Использование приложения](./app) · [CLI](./cli) · [Безопасность](./security)
