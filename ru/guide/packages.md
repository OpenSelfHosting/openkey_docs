# Пакеты

Пакеты, которые вы можете self-host и собирать. **Мобильное/настольное приложение OpenKey** описано в [Использование приложения](./app).

| Путь | Описание |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | FastAPI zero-knowledge sync API + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | MV3 расширение браузера (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | CLI для разработчиков — секреты, генерация паролей, sync |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | Этот сайт — страницы продукта и документация |

Для повседневного использования клиента см. [Использование приложения](./app).

## Особенности сервера

- Хранение только ciphertext
- JWT access tokens + ротируемые opaque refresh tokens
- Миграции Alembic на PostgreSQL 16
- Rate limiting auth и строгий CORS

## Особенности расширения

- Standalone разблокировка сейфа + sync или native bridge к разблокированному desktop-приложению
- Autofill overlays, подсказки сохранить/обновить, passkeys
- Карты, криптокошельки и секреты разработчика

## Особенности CLI

- Offline-генерация паролей
- Обнаружение SSH-ключей, файлов `.env` и API-токенов в разблокированном desktop-приложении
- Опциональные login / unlock / sync с вашим сервером

Опубликованные remotes под [OpenSelfHosting](https://github.com/OpenSelfHosting) могут распространять пакеты отдельно; этот сайт описывает open-source пакеты выше.
