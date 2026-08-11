# CLI

La CLI de OpenKey (`openkey`) es una interfaz de línea de comandos para desarrolladores que guardan secretos, tokens API, claves SSH y material `.env` en un vault de OpenKey. Puede operar **totalmente sin conexión** para generar contraseñas, comunicarse con una **app de escritorio OpenKey desbloqueada** mediante un puente nativo local y, opcionalmente, autenticarse en un **servidor de sync autoalojado** para extraer texto cifrado y obtener una sesión CLI de corta duración.

Requiere **Node.js 20+**.

## Arquitectura

El diagrama siguiente muestra qué componente habla con cuál. La generación de contraseñas permanece sin conexión. Los comandos del vault prefieren la app de escritorio desbloqueada. La sync con el servidor es opcional.

<img src="/guide/cli-architecture.svg" alt="Arquitectura de la CLI de OpenKey: la CLI habla con la app de escritorio vía puente nativo, escanea esta máquina para discover y, opcionalmente, sincroniza texto cifrado con un servidor autoalojado" class="ok-diagram" width="920" height="420" />

| Modo | Cuándo aplica | Qué puede hacer |
|------|---------------|-----------------|
| **Sin conexión** | Siempre | `gen` — sin app ni servidor |
| **Puente nativo** | App de escritorio desbloqueada en esta máquina | CRUD de secretos, importación por descubrimiento, búsqueda/get/copy en secretos e inicios de sesión |
| **Sesión CLI** | Tras `login` + `eval $(openkey unlock)` | Las mismas operaciones del vault contra una caché local de texto cifrado; `sync` extrae del servidor |

### Cómo un comando del vault elige un backend

<img src="/guide/cli-backend-choice.svg" alt="Diagrama de flujo: el comando del vault comprueba el puente de escritorio, luego OPENKEY_SESSION; si no, error con un consejo de desbloqueo" class="ok-diagram" width="920" height="360" />

1. Si el puente de escritorio responde → usar modo **nativo** (preferido; no requiere registro en el servidor).
2. Si no, y `OPENKEY_SESSION` está definida y es válida → usar modo **sesión** (caché local / material respaldado por el servidor).
3. Si no → los comandos que necesitan el vault fallan con un consejo para desbloquear la app o ejecutar `eval $(openkey unlock)`.

El puente acepta conexiones **solo desde la máquina local** y solo mientras el vault está desbloqueado. En Unix usa un socket bajo rutas conocidas de OpenKey (sobrescribe con `OPENKEY_NATIVE_SOCKET`). En Windows usa un archivo de puerto localhost bajo `%LOCALAPPDATA%\OpenKey\` (sobrescribe con `OPENKEY_NATIVE_PORT`).

## Instalación

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

Sin enlazar:

```bash
npx tsx src/cli.ts --help
# after build:
node dist/cli.js --help
```

Verificar:

```bash
openkey --version
openkey status
```

## Configuración y almacenamiento

El estado local de la CLI se guarda en un directorio de configuración según la plataforma (modo de archivo `600` cuando se admite):

| Plataforma | Ruta |
|------------|------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json` (o `$XDG_CONFIG_HOME/openkey/`) |
| Windows | `%APPDATA%\OpenKey\config.json` |

El archivo puede contener: URL del servidor, email, tokens de acceso/refresh, sal y parámetros KDF, clave del vault envuelta, duración del bloqueo de sesión, revisión del servidor y una caché de **texto cifrado** de entradas/colecciones tras la sync. No almacena la contraseña maestra en texto plano.

### Comandos `config`

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` requiere una URL que empiece por `http://` o `https://` (se elimina la barra final).
- URL del servidor predeterminada antes del primer `set`: `http://localhost:8000`.

## Opciones globales

| Flag | Efecto |
|------|--------|
| `--json` | JSON legible por máquina en stdout para scripts |
| `--help` / `--version` | Ayuda y versión |

Coloca `--json` antes del subcomando al usar globales de Commander, p. ej. `openkey --json status`.

## Generación de contraseñas (`gen`)

Totalmente sin conexión. No requiere la app ni un servidor.

```bash
openkey gen
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c
openkey --json gen -l 20
```

| Opción | Descripción | Predeterminado |
|--------|-------------|----------------|
| `-l, --length <n>` | Longitud (rango práctico 4–64) | `20` |
| `--no-upper` | Excluir mayúsculas | desactivado |
| `--no-lower` | Excluir minúsculas | desactivado |
| `--no-digits` | Excluir dígitos | desactivado |
| `--no-symbols` | Excluir símbolos | desactivado |
| `-a, --avoid-ambiguous` | Evitar caracteres ambiguos `Il1O0o` | desactivado |
| `-c, --copy` | Copiar al portapapeles en lugar de imprimir | desactivado |

Con `-c`, el modo humano imprime una confirmación; el modo JSON devuelve `{ "copied": true, "length": N }`. Sin `-c`, se imprime la contraseña (o `{ "password": "..." }` en modo JSON).

## Estado e higiene

```bash
openkey status
openkey forget
```

**`status`** informa de la URL del servidor, el email, el estado de inicio de sesión, la disponibilidad del puente, el modo de desbloqueo (`native` / `session`), el tiempo restante de sesión y el recuento de entradas en caché.

**`forget`** borra la configuración local de la CLI y el texto cifrado en caché. No elimina secretos dentro del vault de la app de escritorio. Tras `forget`, vuelve a ejecutar `config set-server` / `login` si usas el modo servidor.

## Secretos de desarrollador (`secret`)

Los secretos viven en el área reservada **Secrets** del vault (`__dev_secrets__`), agrupados por **dispositivo** (etiqueta de máquina; hostname predeterminado). Los comandos requieren la app de escritorio desbloqueada **o** una `OPENKEY_SESSION` válida.

### Tipos

| Tipo | Uso típico | Notas |
|------|------------|-------|
| `apiToken` | PAT, claves API | Predeterminado |
| `sshKey` | Claves privadas | Prefiere `--file` / `--public-key-file` |
| `envSnippet` | Cuerpos `.env` completos | Prefiere `--file` |
| `other` | Comodín | — |

Alias como `ssh`, `api`, `token`, `env`, `.env` se normalizan a los tipos anteriores.

### `secret add`

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy key" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub -H git.example.com -u git
openkey secret add -n "acme .env" -k envSnippet -f ./apps/api/.env -d laptop
```

| Opción | Descripción |
|--------|-------------|
| `-n, --name` | Nombre visible (**obligatorio**) |
| `-k, --kind` | `sshKey` \| `apiToken` \| `envSnippet` \| `other` |
| `-s, --secret` | Valor del secreto en línea (`-` lee stdin) |
| `-f, --file` | Leer el cuerpo del secreto desde un archivo |
| `--stdin` | Leer el secreto desde stdin (preferible a poner tokens en argv) |
| `-u, --username` | Nombre de usuario opcional |
| `-H, --host` | Host opcional |
| `-d, --device` | Etiqueta de colección de dispositivo (predeterminado: hostname) |
| `--public-key` / `--public-key-file` | Clave pública SSH |
| `--passphrase` | Frase de contraseña de la clave |
| `--notes` | Notas libres |

Proporciona `--secret`, `--file` o `--stdin` (no vacío). Los registros creados devuelven un UUID.

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

- **list** — tabla con prefijo de UUID, nombre, tipo, dispositivo y secreto **enmascarado**. Filtros opcionales `-d/--device` y `-k/--kind`.
- **get** / **copy** / **rm** / **update** — coinciden por **nombre**, **host** o **prefijo de UUID**. Cuando varias subcadenas coinciden, gana un nombre/título **exacto**, host o prefijo de UUID único (≥4 caracteres); si no, el comando falla con candidatos.
- **update** — parchea solo los flags que pases (`--name`, `--secret`/`--file`/`--stdin`, `--kind`, `--device`, …). Requiere el manejador `updateSecret` del puente de escritorio (app OpenKey con esta versión) o una sesión CLI.
- **export** — escribe secretos como dotenv (`KEY=value`; cuerpos `envSnippet` en línea) o líneas shell con `--format exports`. `-o` escribe un archivo con modo `600` cuando se admite.
- **devices** — lista etiquetas de colección de dispositivo y recuentos.
- **get** imprime texto plano (o el objeto JSON completo en modo `--json`).
- **copy** escribe texto plano en el portapapeles.
- **rm** pide confirmación salvo con `-y` / `--yes`.

## Inyectar secretos en el shell (`env` / `run`)

```bash
# Print export lines for eval (NAME or NAME=query)
eval $(openkey env DATABASE_URL)
eval $(openkey env DB=DATABASE_URL GH="GitHub PAT")

# Or run a child process with secrets in its environment
openkey run -e DATABASE_URL -e GH="GitHub PAT" -- npm start
```

| Forma | Significado |
|-------|-------------|
| `NAME` | Variable de entorno `NAME`; busca el elemento del vault por ese nombre |
| `NAME=query` | Variable de entorno `NAME`; busca por `query` (nombre / host / UUID) |

`--json` en `env` devuelve objetos con `env`, `query`, `name`, `uuid` y `value`. `--raw` imprime un único valor en texto plano (exactamente un enlace).

## Descubrimiento (`discover`)

Escanea esta máquina e importa secretos **nuevos** al grupo del dispositivo. Deduplica frente a valores ya presentes en el vault (por tipo + nombre + huella del contenido).

<img src="/guide/cli-discover-flow.svg" alt="Flujo de discover: escanear fuentes locales, previsualizar valores enmascarados, deduplicar huellas y guardar en el grupo de dispositivo del vault" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme -p ~/src/labs --depth 3
openkey discover --no-aws --no-env-vars
```

| Opción | Descripción | Predeterminado |
|--------|-------------|----------------|
| `-d, --device` | Nombre de la colección de dispositivo | hostname |
| `-p, --path <dir>` | Raíz(es) de proyecto para recorrer `.env` (repetible) | `cwd` |
| `--depth <n>` | Profundidad máxima de directorios para `.env` | `4` |
| `--no-ssh` | Omitir claves privadas en `~/.ssh` | escaneo activado |
| `--no-env-files` | Omitir archivos `.env` / `.env.*` | escaneo activado |
| `--no-env-vars` | Omitir variables de entorno del proceso | escaneo activado |
| `--no-aws` | Omitir `~/.aws/credentials` | escaneo activado |
| `--no-gh` | Omitir tokens de `hosts.yml` de GitHub CLI | escaneo activado |
| `--no-docker` | Omitir auth de registro en `~/.docker/config.json` | escaneo activado |
| `--dry-run` | Solo listar; no guardar | desactivado |
| `-y, --yes` | Importar sin confirmación interactiva | desactivado |

### Qué se escanea

- **SSH** — claves privadas bajo `~/.ssh` (omite `known_hosts`, `authorized_keys`, `config`, archivos `.pub`); adjunta el `.pub` hermano cuando existe.
- **Variables de entorno** — nombres conocidos (`GITHUB_TOKEN`, `OPENAI_API_KEY`, `DATABASE_URL`, …) y nombres con sufijos tipo secreto; omite `PATH`, `HOME`, `OPENKEY_SESSION`, `OPENKEY_PASSWORD`, etc.
- **AWS** — perfiles en `~/.aws/credentials`.
- **GitHub CLI** — entradas `oauth_token` / `token` en `~/.config/gh/hosts.yml`.
- **Docker** — `auths` decodificados de `~/.docker/config.json`.
- **Archivos `.env`** — recorrido desde las raíces, omitiendo `node_modules`, `.git`, `dist`, entornos virtuales, etc.; aplican límites de tamaño y recuento de archivos.

El dry-run funciona aunque el vault esté bloqueado (solo listado). Guardar requiere puente o sesión desbloqueados. Los secretos ya importados se informan como omitidos.

## Búsqueda en secretos e inicios de sesión

Estos comandos buscan en **secretos de desarrollador y entradas de inicio de sesión**:

```bash
openkey search github
openkey get "GitHub"
openkey get "GitHub" --field username
openkey copy api.example.com --field totp
openkey totp "GitHub" -c
openkey logins
```

| Comando | Salida |
|---------|--------|
| `search <query>` | Tabla enmascarada (o vistas previas JSON); muestra disponibilidad de TOTP |
| `get <query>` | Campo de mejor coincidencia (`--field password\|username\|url\|totp\|notes`) |
| `copy <query>` | Copia al portapapeles de ese campo (se borra automáticamente a los 45 s; `--keep` para desactivar) |
| `totp <query>` | Código TOTP en vivo (`-c` copiar, `-w` observar hasta Ctrl+C) |
| `logins` | Lista inicios de sesión con usuario / URL / flag TOTP |
| `doctor` | Diagnostica Node, permisos de config, puente, sesión, `/health` del servidor, portapapeles |

Las coincidencias ambiguas por subcadena prefieren un nombre/título exacto, host o prefijo de UUID único; si no, listan UUID, tipo y etiqueta — refina la consulta. Prefiere `secret get` / `secret copy` cuando solo quieras la sección Secrets.

Usa **`secret set`** para upsert por nombre + dispositivo (crear o actualizar). **`sync --push`** envía la caché local de texto cifrado antes de extraer.

## Servidor autoalojado opcional

Usa esta vía cuando la app de escritorio no esté disponible en la máquina (por ejemplo acceso al vault solo desde el teléfono vía sync), o cuando quieras una caché de texto cifrado en la CLI.

<img src="/guide/cli-server-flow.svg" alt="Flujo con servidor: set-server, login con auth_hash, extraer texto cifrado a la caché local y luego eval unlock para definir OPENKEY_SESSION en comandos del vault" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Instalación del servidor: [Instalar el servidor](./server).

### Flujo de autenticación

1. **`login`** — pide email (o `-e`) y contraseña maestra (o `OPENKEY_PASSWORD`). Ejecuta prelogin para sal/KDF, deriva `auth_hash` con Argon2id, obtiene JWT, recupera material de clave del vault envuelta, verifica la contraseña al desenvolver y luego **extrae** texto cifrado a la caché local. Nunca envíes la contraseña maestra como flag de la CLI.
2. **`unlock`** — vuelve a derivar la clave del vault, refresca tokens/sync cuando el servidor es alcanzable e imprime una exportación shell para `OPENKEY_SESSION` (usa `eval $(openkey unlock)`). Opciones: `-e/--email`, `--raw` (solo token). El modo JSON emite los campos de sesión.
3. **`lock`** — imprime `unset OPENKEY_SESSION` (o pista JSON) para poder hacer `eval $(openkey lock)`.
4. **`logout`** — borra tokens de acceso/refresh; conserva la caché local de texto cifrado. Combínalo con `lock` para limpiar la variable de entorno de sesión.
5. **`sync`** — requiere inicio de sesión; extrae entradas/colecciones y actualiza `serverRevision`.

La duración de la sesión es **15 minutos** por defecto (`config set-lock`). Las sesiones caducadas requieren `unlock` de nuevo.

### Variables de entorno

| Variable | Propósito |
|----------|-----------|
| `OPENKEY_SESSION` | Blob de sesión cifrado de corta duración de `unlock` |
| `OPENKEY_PASSWORD` | Contraseña maestra para `login` / `unlock` no interactivos (solo scripts/CI) |
| `OPENKEY_EMAIL` | Email de la cuenta para `login` / `unlock` no interactivos |
| `OPENKEY_NATIVE_SOCKET` | Sobrescribir ruta del socket del puente en Unix |
| `OPENKEY_NATIVE_PORT` | Sobrescribir puerto del puente en Windows |

Prefiere el prompt interactivo de contraseña en máquinas personales. Trata `OPENKEY_PASSWORD` y los tokens de sesión como material secreto en logs de CI.

## Autocompletado del shell

```bash
eval "$(openkey completion bash)"
eval "$(openkey completion zsh)"
openkey completion fish | source
```

## Referencia de comandos

| Comando | ¿Necesita acceso al vault? | Descripción |
|---------|----------------------------|-------------|
| `gen` | No | Generación de contraseñas sin conexión |
| `discover` | Guardar: sí\* / dry-run: no | Escanear SSH / `.env` / env / AWS → grupo de dispositivo |
| `secret add\|list\|get\|copy\|rm\|update\|export\|devices` | Sí\* | Secretos de desarrollador |
| `get` / `copy` / `search` / `totp` / `logins` | Sí\* | Secretos + inicios de sesión (TOTP, selección de campo) |
| `doctor` | No | Diagnosticar puente / sesión / servidor |
| `env` / `run` | Sí\* | Exportar secretos al shell / proceso hijo |
| `completion` | No | Autocompletado bash / zsh / fish |
| `status` | No | Estado del puente / sesión / servidor |
| `config set-server\|show\|set-lock` | No | Configuración de la CLI |
| `login` / `logout` | — | Auth opcional del servidor |
| `unlock` / `lock` | — | Sesión CLI opcional |
| `sync` | Requiere login | Extraer texto cifrado del servidor |
| `forget` | No | Borrar config local de la CLI + caché |

\*App de escritorio desbloqueada, **o** `OPENKEY_SESSION` válida tras login en el servidor.

## Modelo de seguridad

- Los comandos list/search **enmascaran** valores; usa `get` / `copy` solo cuando necesites texto plano.
- El servidor de sync almacena **solo texto cifrado**; la CLI deriva claves localmente como otros clientes OpenKey.
- No pases la contraseña maestra como flag; evita registrar `OPENKEY_PASSWORD` o `OPENKEY_SESSION`.
- El tráfico del puente es solo local y requiere un vault desbloqueado.
- Los tokens de sesión caducan; reduce la duración con `config set-lock` en máquinas compartidas.
- `forget` limpia el estado de la CLI en disco; rota tokens del servidor con `logout` si la máquina deja de ser de confianza.

## Desarrollo

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## Guías relacionadas

- [Usar la app](./app) — desbloqueo en escritorio, sección Secrets, autocompletado
- [Instalar el servidor](./server) — sync autoalojada
- [Seguridad](./security) — Argon2id, tokens, modelo de amenazas
- [Paquetes](./packages) — estructura del repositorio
