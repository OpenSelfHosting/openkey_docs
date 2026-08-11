# CLI

CLI OpenKey (`openkey`) — интерфейс командной строки для разработчиков, которые хранят секреты, API-токены, SSH-ключи и материал `.env` в сейфе OpenKey. Она может работать **полностью офлайн** для генерации паролей, общаться с **разблокированным desktop-приложением OpenKey** через локальный нативный мост и опционально аутентифицироваться на **self-hosted sync-сервере** для pull шифротекста и короткоживущей CLI-сессии.

Требуется **Node.js 20+**.

## Архитектура

Диаграмма ниже показывает, кто с кем общается. Генерация паролей остаётся офлайн. Команды сейфа предпочитают разблокированное desktop-приложение. Sync с сервером опциональна.

<img src="/guide/cli-architecture.svg" alt="Архитектура OpenKey CLI: CLI общается с desktop-приложением через нативный мост, сканирует эту машину для discover и опционально синхронизирует шифротекст с self-hosted сервером" class="ok-diagram" width="920" height="420" />

| Режим | Когда применяется | Что может делать |
|-------|-------------------|------------------|
| **Офлайн** | Всегда | `gen` — без приложения и сервера |
| **Нативный мост** | Desktop-приложение разблокировано на этой машине | CRUD секретов, импорт через discover, search/get/copy по секретам и логинам |
| **CLI-сессия** | После `login` + `eval $(openkey unlock)` | Те же операции сейфа против локального кэша шифротекста; `sync` тянет с сервера |

### Как команда сейфа выбирает backend

<img src="/guide/cli-backend-choice.svg" alt="Блок-схема: команда сейфа проверяет desktop-мост, затем OPENKEY_SESSION; иначе ошибка с подсказкой разблокировки" class="ok-diagram" width="920" height="360" />

1. Если desktop-мост отвечает → использовать режим **native** (предпочтительно; регистрация на сервере не нужна).
2. Иначе, если `OPENKEY_SESSION` задана и валидна → использовать режим **session** (локальный кэш / материал с сервера).
3. Иначе → команды, которым нужен сейф, завершаются с подсказкой разблокировать приложение или выполнить `eval $(openkey unlock)`.

Мост принимает соединения **только с локальной машины** и только пока сейф разблокирован. На Unix используется сокет под известными путями OpenKey (переопределение через `OPENKEY_NATIVE_SOCKET`). На Windows — файл порта localhost под `%LOCALAPPDATA%\OpenKey\` (переопределение через `OPENKEY_NATIVE_PORT`).

## Установка

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

Без link:

```bash
npx tsx src/cli.ts --help
# after build:
node dist/cli.js --help
```

Проверка:

```bash
openkey --version
openkey status
```

## Конфигурация и хранение

Локальное состояние CLI хранится в каталоге конфигурации платформы (режим файла `600` при поддержке):

| Платформа | Путь |
|-----------|------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json` (или `$XDG_CONFIG_HOME/openkey/`) |
| Windows | `%APPDATA%\OpenKey\config.json` |

Файл может содержать: URL сервера, email, access/refresh токены, salt и параметры KDF, обёрнутый ключ сейфа, длительность блокировки сессии, revision сервера и **шифротекстный** кэш записей/коллекций после sync. Мастер-пароль в открытом виде не хранится.

### Команды `config`

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` требует URL, начинающийся с `http://` или `https://` (завершающий слэш удаляется).
- URL сервера по умолчанию до первого `set`: `http://localhost:8000`.

## Глобальные опции

| Флаг | Эффект |
|------|--------|
| `--json` | JSON, читаемый машиной, на stdout для скриптов |
| `--help` / `--version` | Справка и версия |

Ставьте `--json` перед подкомандой при использовании глобальных опций Commander, например `openkey --json status`.

## Генерация паролей (`gen`)

Полностью офлайн. Не требует приложения или сервера.

```bash
openkey gen
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c
openkey --json gen -l 20
```

| Опция | Описание | По умолчанию |
|-------|----------|--------------|
| `-l, --length <n>` | Длина (практический диапазон 4–64) | `20` |
| `--no-upper` | Исключить заглавные буквы | выкл. |
| `--no-lower` | Исключить строчные буквы | выкл. |
| `--no-digits` | Исключить цифры | выкл. |
| `--no-symbols` | Исключить символы | выкл. |
| `-a, --avoid-ambiguous` | Избегать неоднозначных символов `Il1O0o` | выкл. |
| `-c, --copy` | Копировать в буфер обмена вместо вывода | выкл. |

С `-c` человекочитаемый режим печатает подтверждение; JSON-режим возвращает `{ "copied": true, "length": N }`. Без `-c` пароль выводится (или `{ "password": "..." }` в JSON-режиме).

## Статус и гигиена

```bash
openkey status
openkey forget
```

**`status`** сообщает URL сервера, email, состояние входа, доступность моста, режим разблокировки (`native` / `session`), оставшееся время сессии и число записей в кэше.

**`forget`** стирает локальный конфиг CLI и кэшированный шифротекст. Не удаляет секреты внутри сейфа desktop-приложения. После `forget` снова выполните `config set-server` / `login`, если используете серверный режим.

## Секреты разработчика (`secret`)

Секреты живут в зарезервированной области **Secrets** сейфа (`__dev_secrets__`), сгруппированы по **устройству** (метка машины; hostname по умолчанию). Команды требуют разблокированное desktop-приложение **или** валидную `OPENKEY_SESSION`.

### Типы

| Тип | Типичное использование | Примечания |
|-----|------------------------|------------|
| `apiToken` | PAT, API-ключи | По умолчанию |
| `sshKey` | Приватные ключи | Предпочитайте `--file` / `--public-key-file` |
| `envSnippet` | Полные тела `.env` | Предпочитайте `--file` |
| `other` | Универсальный | — |

Алиасы вроде `ssh`, `api`, `token`, `env`, `.env` нормализуются к типам выше.

### `secret add`

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy key" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub -H git.example.com -u git
openkey secret add -n "acme .env" -k envSnippet -f ./apps/api/.env -d laptop
```

| Опция | Описание |
|-------|----------|
| `-n, --name` | Отображаемое имя (**обязательно**) |
| `-k, --kind` | `sshKey` \| `apiToken` \| `envSnippet` \| `other` |
| `-s, --secret` | Inline-значение секрета (`-` читает stdin) |
| `-f, --file` | Читать тело секрета из файла |
| `--stdin` | Читать секрет из stdin (лучше, чем токены в argv) |
| `-u, --username` | Опциональное имя пользователя |
| `-H, --host` | Опциональный host |
| `-d, --device` | Метка коллекции устройства (по умолчанию: hostname) |
| `--public-key` / `--public-key-file` | SSH публичный ключ |
| `--passphrase` | Passphrase ключа |
| `--notes` | Произвольные заметки |

Укажите `--secret`, `--file` или `--stdin` (непустой). Созданные записи возвращают UUID.

```bash
printf '%s' "$TOKEN" | openkey secret add -n "CI token" --stdin
```

### `secret list` / `get` / `copy` / `rm` / `update` / `export` / `devices`

```bash
openkey secret list
openkey secret list -d laptop -k apiToken
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret update "GitHub PAT" --secret ghp_new...
printf '%s' "$TOKEN" | openkey secret update "GitHub PAT" --stdin
openkey secret export -d laptop -o .env.local
openkey secret export --format exports   # for eval
openkey secret devices
openkey secret rm "old token" -y
```

- **list** — таблица с префиксом UUID, именем, типом, устройством и **замаскированным** секретом. Опциональные фильтры `-d/--device` и `-k/--kind`.
- **get** / **copy** / **rm** / **update** — совпадение по **имени**, **host** или **префиксу UUID**. При нескольких совпадениях подстроки побеждает **точное** имя/заголовок, host или уникальный префикс UUID (≥4 символа); иначе команда завершается с кандидатами.
- **update** — патчит только переданные флаги (`--name`, `--secret`/`--file`/`--stdin`, `--kind`, `--device`, …). Требует обработчик `updateSecret` desktop-моста (OpenKey app этой версии) или CLI-сессию.
- **export** — записывает секреты как dotenv (`KEY=value`; тела `envSnippet` inline) или shell-строки с `--format exports`. `-o` пишет файл с режимом `600` при поддержке.
- **devices** — список меток коллекций устройств и счётчиков.
- **get** печатает plaintext (или полный JSON-объект в режиме `--json`).
- **copy** записывает plaintext в буфер обмена.
- **rm** запрашивает подтверждение, кроме `-y` / `--yes`.

## Инъекция секретов в shell (`env` / `run`)

```bash
# Print export lines for eval (NAME or NAME=query)
eval $(openkey env DATABASE_URL)
eval $(openkey env DB=DATABASE_URL GH="GitHub PAT")

# Or run a child process with secrets in its environment
openkey run -e DATABASE_URL -e GH="GitHub PAT" -- npm start
```

| Форма | Значение |
|-------|----------|
| `NAME` | Переменная окружения `NAME`; ищет элемент сейфа по этому имени |
| `NAME=query` | Переменная окружения `NAME`; ищет по `query` (имя / host / UUID) |

`--json` на `env` возвращает объекты с `env`, `query`, `name`, `uuid` и `value`. `--raw` печатает одно plaintext-значение (ровно одна привязка).

## Обнаружение (`discover`)

Сканирует эту машину и импортирует **новые** секреты в группу устройства. Дедуплицирует против значений уже в сейфе (по типу + имени + отпечатку содержимого).

<img src="/guide/cli-discover-flow.svg" alt="Поток discover: сканировать локальные источники, предпросмотр замаскированных значений, дедупликация отпечатков, затем сохранение в группу устройства сейфа" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme -p ~/src/labs --depth 3
openkey discover --no-aws --no-env-vars
```

| Опция | Описание | По умолчанию |
|-------|----------|--------------|
| `-d, --device` | Имя коллекции устройства | hostname |
| `-p, --path <dir>` | Корень(и) проекта для обхода `.env` (повторяемый) | `cwd` |
| `--depth <n>` | Максимальная глубина каталогов для `.env` | `4` |
| `--no-ssh` | Пропустить приватные ключи в `~/.ssh` | сканирование вкл. |
| `--no-env-files` | Пропустить файлы `.env` / `.env.*` | сканирование вкл. |
| `--no-env-vars` | Пропустить переменные окружения процесса | сканирование вкл. |
| `--no-aws` | Пропустить `~/.aws/credentials` | сканирование вкл. |
| `--no-gh` | Пропустить токены GitHub CLI в `hosts.yml` | сканирование вкл. |
| `--no-docker` | Пропустить registry auth в `~/.docker/config.json` | сканирование вкл. |
| `--dry-run` | Только список; не сохранять | выкл. |
| `-y, --yes` | Импорт без интерактивного подтверждения | выкл. |

### Что сканируется

- **SSH** — приватные ключи в `~/.ssh` (пропускает `known_hosts`, `authorized_keys`, `config`, файлы `.pub`); прикрепляет соседний `.pub`, если есть.
- **Переменные окружения** — известные имена (`GITHUB_TOKEN`, `OPENAI_API_KEY`, `DATABASE_URL`, …) и имена с секретоподобными суффиксами; пропускает `PATH`, `HOME`, `OPENKEY_SESSION`, `OPENKEY_PASSWORD` и т.д.
- **AWS** — профили в `~/.aws/credentials`.
- **GitHub CLI** — записи `oauth_token` / `token` в `~/.config/gh/hosts.yml`.
- **Docker** — декодированные `auths` из `~/.docker/config.json`.
- **Файлы `.env`** — обход от корней, пропуская `node_modules`, `.git`, `dist`, virtualenv и т.д.; действуют лимиты размера и числа файлов.

Dry-run работает даже при заблокированном сейфе (только список). Сохранение требует разблокированный мост или сессию. Уже импортированные секреты помечаются как пропущенные.

## Поиск по секретам и логинам

Эти команды ищут **секреты разработчика и записи логинов**:

```bash
openkey search github
openkey get "GitHub"
openkey get "GitHub" --field username
openkey copy api.example.com --field totp
openkey totp "GitHub" -c
openkey logins
```

| Команда | Вывод |
|---------|-------|
| `search <query>` | Замаскированная таблица (или JSON-превью); показывает доступность TOTP |
| `get <query>` | Поле лучшего совпадения (`--field password\|username\|url\|totp\|notes`) |
| `copy <query>` | Копия поля в буфер обмена (автоочистка через 45с; `--keep` чтобы отключить) |
| `totp <query>` | Живой TOTP-код (`-c` копировать, `-w` наблюдать до Ctrl+C) |
| `logins` | Список логинов с username / URL / флагом TOTP |
| `doctor` | Диагностика Node, прав config, моста, сессии, `/health` сервера, буфера обмена |

Неоднозначные совпадения подстрок предпочитают точное имя/заголовок, host или уникальный префикс UUID; иначе перечисляют UUID, тип и метку — уточните запрос. Предпочитайте `secret get` / `secret copy`, если нужна только секция Secrets.

Используйте **`secret set`** для upsert по имени + устройству (создать или обновить). **`sync --push`** отправляет локальный кэш шифротекста перед pull.

## Опциональный self-hosted сервер

Используйте этот путь, когда desktop-приложение недоступно на машине (например доступ к сейфу только с телефона через sync) или когда нужен кэш шифротекста в CLI.

<img src="/guide/cli-server-flow.svg" alt="Поток сервера: set-server, login с auth_hash, pull шифротекста в локальный кэш, затем eval unlock для установки OPENKEY_SESSION для команд сейфа" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Установка сервера: [Установка сервера](./server).

### Поток аутентификации

1. **`login`** — запрашивает email (или `-e`) и мастер-пароль (или `OPENKEY_PASSWORD`). Выполняет prelogin для salt/KDF, выводит `auth_hash` через Argon2id, получает JWT, загружает обёрнутый материал ключа сейфа, проверяет пароль при развёртывании и затем **тянет** шифротекст в локальный кэш. Никогда не передавайте мастер-пароль флагом CLI.
2. **`unlock`** — снова выводит ключ сейфа, обновляет токены/sync при доступном сервере и печатает shell-export для `OPENKEY_SESSION` (используйте `eval $(openkey unlock)`). Опции: `-e/--email`, `--raw` (только токен). JSON-режим выдаёт поля сессии.
3. **`lock`** — печатает `unset OPENKEY_SESSION` (или JSON-подсказку), чтобы можно было `eval $(openkey lock)`.
4. **`logout`** — очищает access/refresh токены; сохраняет локальный кэш шифротекста. Сочетайте с `lock`, чтобы очистить env сессии.
5. **`sync`** — требует login; тянет записи/коллекции и обновляет `serverRevision`.

Время жизни сессии по умолчанию **15 минут** (`config set-lock`). Истёкшие сессии требуют снова `unlock`.

### Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `OPENKEY_SESSION` | Короткоживущий зашифрованный blob сессии из `unlock` |
| `OPENKEY_PASSWORD` | Мастер-пароль для неинтерактивного `login` / `unlock` (только скрипты/CI) |
| `OPENKEY_EMAIL` | Email аккаунта для неинтерактивного `login` / `unlock` |
| `OPENKEY_NATIVE_SOCKET` | Переопределить путь сокета Unix-моста |
| `OPENKEY_NATIVE_PORT` | Переопределить порт Windows-моста |

Предпочитайте интерактивный запрос пароля на личных машинах. Относитесь к `OPENKEY_PASSWORD` и токенам сессии как к секретному материалу в логах CI.

## Shell completions

```bash
eval "$(openkey completion bash)"
eval "$(openkey completion zsh)"
openkey completion fish | source
```

## Справочник команд

| Команда | Нужен доступ к сейфу? | Описание |
|---------|------------------------|----------|
| `gen` | Нет | Офлайн-генерация паролей |
| `discover` | Сохранение: да\* / dry-run: нет | Сканировать SSH / `.env` / env / AWS → группа устройства |
| `secret add\|list\|get\|copy\|rm\|update\|export\|devices` | Да\* | Секреты разработчика |
| `get` / `copy` / `search` / `totp` / `logins` | Да\* | Секреты + логины (TOTP, выбор поля) |
| `doctor` | Нет | Диагностика моста / сессии / сервера |
| `env` / `run` | Да\* | Экспорт секретов в shell / дочерний процесс |
| `completion` | Нет | Completions bash / zsh / fish |
| `status` | Нет | Состояние моста / сессии / сервера |
| `config set-server\|show\|set-lock` | Нет | Конфигурация CLI |
| `login` / `logout` | — | Опциональная auth сервера |
| `unlock` / `lock` | — | Опциональная CLI-сессия |
| `sync` | Требуется login | Pull шифротекста с сервера |
| `forget` | Нет | Стереть локальный конфиг CLI + кэш |

\*Разблокированное desktop-приложение **или** валидная `OPENKEY_SESSION` после server login.

## Модель безопасности

- Команды list/search **маскируют** значения; используйте `get` / `copy` только когда нужен plaintext.
- Sync-сервер хранит **только шифротекст**; CLI выводит ключи локально, как другие клиенты OpenKey.
- Не передавайте мастер-пароль флагом; избегайте логирования `OPENKEY_PASSWORD` или `OPENKEY_SESSION`.
- Трафик моста только локальный и требует разблокированный сейф.
- Токены сессии истекают; уменьшайте время жизни через `config set-lock` на общих машинах.
- `forget` очищает состояние CLI на диске; ротируйте токены сервера через `logout`, если машина стала недоверенной.

## Разработка

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## См. также

- [Использование приложения](./app) — разблокировка desktop, секция Secrets, автозаполнение
- [Установка сервера](./server) — self-hosted sync
- [Безопасность](./security) — Argon2id, токены, модель угроз
- [Пакеты](./packages) — структура репозитория
