# Paquetes

Paquetes que puedes autoalojar y compilar. La **app móvil/escritorio de OpenKey** se describe en [Usar la app](./app).

| Ruta | Descripción |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | API de sync zero-knowledge FastAPI + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | Extensión MV3 (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | CLI de desarrollador — secretos, generación de contraseñas, sync |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | Este sitio — páginas del producto y documentación |

Para el uso diario de la app, consulta [Usar la app](./app).

## Destacados del servidor

- Almacenamiento solo de texto cifrado
- JWT de acceso + refresh tokens opacos rotativos
- Migraciones Alembic en PostgreSQL 16
- Limitación de tasa de autenticación y CORS estricto

## Destacados de la extensión

- Desbloqueo de vault independiente + sync, o puente nativo a la app de escritorio desbloqueada
- Superposiciones de autocompletado, avisos de guardar/actualizar, passkeys
- Tarjetas, monederos cripto y secretos de desarrollador

## Destacados de la CLI

- Generación de contraseñas offline
- Descubrir claves SSH, archivos `.env` y tokens API en la app de escritorio desbloqueada
- Login / unlock / sync opcionales contra tu servidor

Los remotos publicados bajo [OpenSelfHosting](https://github.com/OpenSelfHosting) pueden distribuir paquetes por separado; este sitio describe los paquetes abiertos anteriores.
