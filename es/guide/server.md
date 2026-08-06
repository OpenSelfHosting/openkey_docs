# Instalar el servidor

OpenKey Server es una **API de sync zero-knowledge** opcional. Almacena solo texto cifrado para que puedas sincronizar vaults entre tus propios dispositivos. Las contraseñas maestras y las claves del vault en texto plano nunca salen del cliente.

## Requisitos

- Docker y Docker Compose (recomendado), **o** Python 3.12+ con PostgreSQL 16
- Un `JWT_SECRET` fuerte (al menos 32 caracteres, no un marcador de posición)

## Instalar con Docker

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

Cuando esté saludable:

| URL | Propósito |
|-----|---------|
| `http://localhost:8000` | Base de la API |
| `http://localhost:8000/docs` | Docs OpenAPI |
| `http://localhost:8000/health` | Comprobación de salud |

Las migraciones de esquema se ejecutan automáticamente al iniciar la API (`alembic upgrade head`).

## Configuración importante

| Variable | Notas |
|----------|--------|
| `JWT_SECRET` | Obligatorio. Mín. 32 caracteres; los marcadores se rechazan al iniciar |
| `DATABASE_URL` | URL Postgres async (Compose lo configura para el servicio `db`) |
| `CORS_ORIGINS` | Orígenes separados por comas — **sin `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT de acceso de corta duración (predeterminado 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | TTL del refresh token opaco (predeterminado 7, rotado al usar) |
| `AUTH_RATE_LIMIT_*` | Límites por IP en endpoints de auth |

Para producción: pon la API detrás de HTTPS, configura un `JWT_SECRET` único y restringe `CORS_ORIGINS` a tus clientes. ¿Atascado? Consulta [FAQ y solución de problemas](./faq).

## Producción con HTTPS

Expón solo el proxy inverso de forma pública. Mantén Postgres y la API en una red privada (el valor predeterminado de Compose vale en un solo host).

Ejemplo **Caddy** (Let’s Encrypt automático):

```txt
openkey.example.com {
	reverse_proxy 127.0.0.1:8000
}
```

Ejemplo **nginx**:

```nginx
server {
	listen 443 ssl http2;
	server_name openkey.example.com;

	# ssl_certificate / ssl_certificate_key … (certbot or your CA)

	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Luego en `.env`:

```bash
CORS_ORIGINS=https://openkey.example.com
# Add chrome-extension://<id> and moz-extension://<id> if the browser extension calls the API from those origins
```

Apunta los clientes a `https://openkey.example.com` (sin puerto). Confirma `https://openkey.example.com/health`.

## Resumen de la API

OpenAPI interactivo: `http://localhost:8000/docs` en un servidor en ejecución. Las tablas completas están en el README del paquete `openkey_server`. Destacados:

### Auth

| Método | Ruta | Notas |
|--------|------|--------|
| `POST` | `/auth/register` | Primera cuenta — almacena `auth_hash`, clave del vault envuelta, sal, parámetros KDF |
| `POST` | `/auth/prelogin` | Devuelve sal + parámetros KDF para que los clientes deriven `auth_hash` |
| `POST` | `/auth/login` | Email + `auth_hash` → tokens de acceso + refresh |
| `POST` | `/auth/refresh` | Rota el refresh token opaco |
| `POST` | `/auth/rekey` | Tras cambiar la contraseña maestra — la clave del vault permanece igual |
| `POST` | `/auth/delete` | Vuelve a demostrar `auth_hash`; elimina solo el texto cifrado del **servidor** |
| `POST` | `/auth/lookup-public-key` | Email → clave de identidad pública (para envolver claves de org/compartido) |

Los endpoints de auth tienen límite de tasa por IP del cliente. Los refresh tokens se hashean en reposo.

### Sync, colecciones, entradas

`POST /sync` envía/extrae texto cifrado con **last-write-wins por `revision` por elemento**. Los borrados suaves se convierten en **tombstones** para que los pares conozcan las eliminaciones. Las carpetas anidadas usan `parent_uuid` de colección.

### Adjuntos

Solo texto cifrado. Tamaño máximo **20 MB**. Prefiere multipart `POST /attachments` para subidas; `GET /attachments/{uuid}/content` transmite bytes cifrados. La sync por lotes aún puede llevar blobs base64 para alcances sin conexión.

### Orgs y compartidos

Los nombres de org y las cargas de compartidos permanecen cifrados. Los compartidos de entrada hacen una **instantánea** del texto cifrado al crear — aceptar importa una copia congelada en el vault del destinatario (no un documento en vivo). Prefiere colecciones compartidas de org para acceso continuo del equipo. Guía: [Compartir y organizaciones](./sharing).

## Conectar tus clientes

Apunta cada cliente a **la misma** URL del servidor (Docker local: `http://localhost:8000`, o tu URL HTTPS pública).

### App OpenKey (teléfono / escritorio)

Instala la app oficial de OpenKey desde la tienda oficial o el canal de descarga ([Descargar](./download)).

1. Desbloquea o crea un vault local con tu contraseña maestra.
2. Abre **Ajustes → Datos → Servidor autoalojado**.
3. Introduce la URL del servidor (ejemplo: `https://openkey.example.com`).
4. **Registrarse** (primer dispositivo) o **Iniciar sesión** (otro dispositivo que ya tenga esta cuenta de vault).
5. Pulsa **Sincronizar ahora** cuando quieras extraer/enviar texto cifrado.

La app mantiene una base de datos local cifrada. La sync solo intercambia texto cifrado opaco. Más: [Usar la app](./app).

### Extensión del navegador

1. Compila y carga `openkey_extension` (`npm install && npm run build`, luego carga `dist/`) — ver [Extensión del navegador](./extension).
2. Abre **Opciones** de la extensión y configura la misma URL del servidor.
3. Desbloquea con el mismo email + contraseña maestra (la extensión usa `/auth/prelogin` y luego login).

**Puente de escritorio (opcional):** desbloquea la app de escritorio OpenKey, activa Autocompletar para registrar el host de mensajería nativa, luego elige «Usar app de escritorio» en la extensión. Rellenar/guardar puede pasar por la app desbloqueada sin un desbloqueo separado de la extensión.

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Consulta [CLI](./cli) para descubrimiento de secretos sin servidor (puente de la app de escritorio).

## Lista de comprobación multi-dispositivo

1. Instala y asegura el servidor una vez.
2. En el primer dispositivo: registro + sync.
3. En cada dispositivo nuevo: instala el cliente → configura la misma URL → inicia sesión con el mismo email y contraseña maestra → sync.
4. Mantén copias offline regulares (exportación / copia local) — el servidor no es una vía de recuperación para una contraseña maestra olvidada.

<img src="/guide/server-sync-topology.svg" alt="Sync topology: app, extension, and CLI send auth_hash and ciphertext to openkey_server (FastAPI), which stores opaque rows in PostgreSQL" class="ok-diagram" width="920" height="400" />

Siguiente: [Descargar](./download) · [Usar la app](./app) · [Extensión del navegador](./extension) · [FAQ](./faq) · [CLI](./cli) · [Seguridad](./security)
