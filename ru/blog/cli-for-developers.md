---
title: CLI для секретов разработчика
description: Профессиональный обзор OpenKey CLI — офлайн-генерация, нативный мост к десктопу, обнаружение, типы секретов и опциональная синхронизация с сервером с нулевым разглашением.
date: 2026-08-01
cover: /blog/covers/cli-for-developers.svg
---

# CLI для секретов разработчика

SSH-ключи, файлы `.env` и API-токены разбросаны по ноутбукам и CI-агентам. **CLI** OpenKey (`openkey`) — терминальный интерфейс того же хранилища с нулевым разглашением: генерируйте пароли офлайн, импортируйте локальные находки в разблокированное **десктопное** приложение, управляйте типизированными секретами и опционально получайте шифротекст с self-hosted сервера.

Эта статья — обзорный тур. Полный справочник по флагам — в [руководстве по CLI](/ru/guide/cli).

## Три режима работы

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI architecture overview" class="ok-diagram" width="920" height="420" />

| Режим | Требование | Роль |
|-------|------------|------|
| Offline | Ничего | `openkey gen` — криптографически полезные пароли без сети и без разблокированного хранилища |
| Native bridge | Десктопное приложение разблокировано на этой машине | Путь по умолчанию для секретов, импорта обнаружения и поиска по секретам **и** логинам |
| CLI session | `login` + `eval $(openkey unlock)` | Локальный кэш шифротекста и `sync`, когда десктопное приложение недоступно |

CLI предпочитает мост, когда он доступен. Иначе используется `OPENKEY_SESSION`. Мост только локальный и отказывается работать, пока хранилище заблокировано — та же граница доверия, что и у десктопной сессии.

<img src="/guide/cli-backend-choice.svg" alt="How vault commands choose native bridge or session mode" class="ok-diagram" width="920" height="360" />

## Офлайн-генерация

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

Настройте длину и классы символов (`--no-upper`, `--no-lower`, `--no-digits`, `--no-symbols`) или копируйте сразу в буфер обмена с `-c`. Разблокировка приложения и регистрация на сервере не требуются.

## Обнаружение в группу устройства

<img src="/guide/cli-discover-flow.svg" alt="Discover flow from scan to vault save" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

Обнаружение может сканировать:

- Приватные ключи в `~/.ssh` (с соседними `.pub`, если есть)
- Известные и похожие на секреты переменные окружения процессов
- Общие учётные данные AWS
- Деревья `.env` / `.env.*` из одного или нескольких корней проектов

Результаты группируются под меткой **device** (по умолчанию hostname) в разделе Secrets хранилища. Уже импортированные значения пропускаются по отпечатку содержимого. Используйте `--dry-run` для предпросмотра; `-y` — импорт без запроса. Сохранение всё равно требует разблокированного десктопного приложения (или CLI-сессии).

## Повседневные операции с секретами

Секреты — типизированные записи: `apiToken` (по умолчанию), `sshKey`, `envSnippet` или `other`.

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

List и search **маскируют** значения. Используйте `get` / `copy` только когда нужен открытый текст. Запросы совпадают по имени, хосту или префиксу UUID; при неоднозначности выводятся кандидаты вместо угадывания.

Чтобы искать **секреты и записи логинов** вместе:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## Опциональная self-hosted синхронизация

<img src="/guide/cli-server-flow.svg" alt="Login, ciphertext pull, and OPENKEY_SESSION unlock flow" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

Login выводит `auth_hash` с Argon2id, никогда не передаёт мастер-пароль флагом, хранит в кэше CLI только обёрнутые ключи и шифротекст и выводит экспорт `OPENKEY_SESSION` из `unlock` (срок по умолчанию 15 минут; измените через `openkey config set-lock`). Для CI можно задать `OPENKEY_PASSWORD`; на личных машинах предпочитайте интерактивный запрос.

Проверяйте состояние в любой момент:

```bash
openkey status
openkey config show
```

## Почему это место в менеджере паролей

Разработчики живут в терминалах. CLI, который пишет в ту же зашифрованную область Secrets, что и приложение — и в тот же API синхронизации только шифротекста — держит рабочий процесс и модель угроз согласованными. Вам не нужно поддерживать второе хранилище секретов для скриптов.

## Установка

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

Требуется Node.js 20+. Полный справочник команд, переменные окружения, пути конфигурации и заметки по безопасности: [руководство по CLI](/ru/guide/cli).
