# Обзор

OpenKey — **self-hosted менеджер паролей с end-to-end шифрованием**. Клиенты шифруют данные сейфа до отправки с устройства. Опциональный sync-сервер хранит **только ciphertext** — мастер-пароли и plaintext-ключи сейфа никогда не покидают клиент.

## Что вы получаете

- Локальный зашифрованный сейф (коллекции, логины, карты, криптокошельки, секреты разработчика)
- Опциональная синхронизация между устройствами через ваш сервер
- Расширение браузера с автозаполнением и passkeys
- mobile / desktop приложение и open developer CLI
- Организации, общие коллекции и общий доступ к элементам — на сервере по-прежнему ciphertext

## Модель zero-knowledge

1. Клиент выводит ключи из мастер-пароля с **Argon2id**.
2. `auth_hash` аутентифицирует вас на сервере без раскрытия мастер-пароля.
3. Содержимое сейфа остаётся зашифрованным ключом сейфа, который сервер не видит в plaintext.
4. Имена, payload, вложения, имена org и payload общего доступа — opaque ciphertext на сервере.

## Open-source пакеты

| Пакет | Роль |
|---------|------|
| `openkey_server` | FastAPI zero-knowledge sync API + PostgreSQL |
| `openkey_extension` | MV3 расширение браузера (Chrome / Firefox) |
| `openkey_cli` | Developer CLI (секреты, генерация паролей, sync) |

<img src="/guide/overview-ecosystem.svg" alt="OpenKey ecosystem: app, browser extension, and CLI encrypt on device; optional sync via self-hosted server (ciphertext only) or Nearby LAN pairing" class="ok-diagram" width="920" height="440" />

**Приложение OpenKey** для mobile и desktop описано отдельно. См. [Использование приложения](./app) для использования продукта, [Пакеты](./packages) для setup, [Настройка сервера](./server) для установки sync и [Быстрый старт](./quick-start) для локального запуска.
