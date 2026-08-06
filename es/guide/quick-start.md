# Inicio rápido

Ejecuta el servidor de sync abierto y conecta la app, la extensión o la CLI.

## Servidor

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI en `/docs`, health en `/health`.

## App

Instala la app **OpenKey** desde la tienda oficial o el canal de descarga de tu plataforma. En **Ajustes → Datos → Servidor autoalojado**, configura `http://localhost:8000` (o tu URL HTTPS), luego regístrate o inicia sesión y sincroniza.

Consulta [Usar la app](./app).

## Extensión del navegador

```bash
cd openkey_extension
npm install
npm run build
```

Carga `dist/` como extensión sin empaquetar. Configura la URL del servidor en Opciones y desbloquea con email + contraseña maestra. En escritorio, activa Autocompletar en la app para registrar el host de mensajería nativa.

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

Mantén la app de escritorio desbloqueada para el descubrimiento local de secretos. Sync opcional del servidor:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Siguiente: lee [Seguridad](./security), [Configuración del servidor](./server), [Usar la app](./app) y [CLI](./cli).
