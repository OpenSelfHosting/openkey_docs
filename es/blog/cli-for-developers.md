---
title: Una CLI para secretos de desarrollador
description: Visión profesional de la CLI de OpenKey — generación sin conexión, puente nativo de escritorio, descubrimiento, tipos de secreto y sync opcional zero-knowledge con servidor.
date: 2026-08-01
cover: /blog/covers/cli-for-developers.png
---

# Una CLI para secretos de desarrollador

Las claves SSH, los archivos `.env` y los tokens API se dispersan por portátiles y agentes CI. La **CLI** de OpenKey (`openkey`) es la cara de terminal del mismo vault zero-knowledge: genera contraseñas sin conexión, importa hallazgos locales en la app de **escritorio** desbloqueada, gestiona secretos tipados y, opcionalmente, extrae texto cifrado de un servidor autoalojado.

Este artículo es un recorrido guiado. La referencia completa a nivel de flags está en la [guía de la CLI](/es/guide/cli).

## Tres modos de operación

<img src="/guide/cli-architecture.svg" alt="Visión general de la arquitectura de la CLI de OpenKey" class="ok-diagram" width="920" height="420" />

| Modo | Requisito | Rol |
|------|-------------|------|
| Sin conexión | Nada | `openkey gen` — contraseñas criptográficamente útiles sin red ni vault desbloqueado |
| Puente nativo | App de escritorio desbloqueada en esta máquina | Ruta por defecto para secretos, importación por descubrimiento y búsqueda en secretos e inicios de sesión |
| Sesión CLI | `login` + `eval $(openkey unlock)` | Caché local de texto cifrado y `sync` cuando la app de escritorio no está disponible |

La CLI prefiere el puente cuando está activo. Si no, usa `OPENKEY_SESSION`. El puente es solo local y rechaza trabajo mientras el vault está bloqueado — el mismo límite de confianza que la sesión de escritorio.

<img src="/guide/cli-backend-choice.svg" alt="Cómo los comandos del vault eligen puente nativo o modo sesión" class="ok-diagram" width="920" height="360" />

## Generación sin conexión

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

Ajusta longitud y clases de caracteres (`--no-upper`, `--no-lower`, `--no-digits`, `--no-symbols`), o copia directo al portapapeles con `-c`. No se requiere desbloquear la app ni registrarse en el servidor.

## Descubrimiento en un grupo de dispositivo

<img src="/guide/cli-discover-flow.svg" alt="Flujo de descubrimiento desde el escaneo hasta guardar en el vault" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

El descubrimiento puede escanear:

- Claves privadas bajo `~/.ssh` (con archivos `.pub` hermanos cuando existan)
- Variables de entorno de proceso conocidas y con aspecto de secreto
- Credenciales compartidas de AWS
- Árboles `.env` / `.env.*` desde una o más raíces de proyecto

Los resultados se agrupan bajo una etiqueta de **dispositivo** (hostname por defecto) en la sección Secrets del vault. Los valores ya importados se omiten por huella de contenido. Usa `--dry-run` para previsualizar; `-y` para importar sin prompt. Guardar aún requiere la app de escritorio desbloqueada (o una sesión CLI).

## Operaciones diarias con secretos

Los secretos son registros tipados: `apiToken` (por defecto), `sshKey`, `envSnippet` u `other`.

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

Listar y buscar **enmascaran** valores. Usa `get` / `copy` solo cuando se requiera texto plano. Las consultas coinciden con nombre, host o prefijo de UUID; las coincidencias ambiguas listan candidatos en lugar de adivinar.

Para buscar **secretos y entradas de inicio de sesión** juntos:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## Sync autoalojado opcional

<img src="/guide/cli-server-flow.svg" alt="Flujo de login, extracción de texto cifrado y desbloqueo OPENKEY_SESSION" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

El login deriva un `auth_hash` con Argon2id, nunca envía la contraseña maestra como flag, almacena solo claves envueltas y texto cifrado en la caché de la CLI, e imprime una exportación `OPENKEY_SESSION` desde `unlock` (vida por defecto 15 minutos; cambia con `openkey config set-lock`). Para CI puedes definir `OPENKEY_PASSWORD`; prefiere el prompt interactivo en máquinas personales.

Inspecciona el estado en cualquier momento:

```bash
openkey status
openkey config show
```

## Por qué pertenece a un gestor de contraseñas

Los desarrolladores viven en terminales. Una CLI que escribe en la misma área Secrets cifrada que la app — y la misma API de sync solo de texto cifrado — mantiene alineados el flujo de trabajo y el modelo de amenazas. No mantienes un segundo almacén de secretos para scripts.

## Instalar

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

Requiere Node.js 20+. Referencia completa de comandos, variables de entorno, rutas de configuración y notas de seguridad: [guía de la CLI](/es/guide/cli).
