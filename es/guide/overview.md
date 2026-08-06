# Resumen

OpenKey es un **gestor de contraseñas cifrado de extremo a extremo autoalojado**. Los clientes cifran los datos del vault antes de que salgan del dispositivo. El servidor de sync opcional almacena **solo texto cifrado** — las contraseñas maestras y las claves del vault en texto plano nunca salen del cliente.

## Qué obtienes

- Vault cifrado local (colecciones, inicios de sesión, tarjetas, monederos cripto, secretos de desarrollador)
- Sync opcional entre dispositivos a través de tu propio servidor
- Extensión del navegador con autocompletado y passkeys
- App móvil / escritorio y CLI de desarrollador abierta
- Organizaciones, colecciones compartidas y compartición de elementos — aún texto cifrado en el servidor

## Modelo zero-knowledge

1. El cliente deriva claves de tu contraseña maestra con **Argon2id**.
2. Un `auth_hash` te autentica en el servidor sin revelar la contraseña maestra.
3. El contenido del vault permanece cifrado con una clave que el servidor nunca ve en texto plano.
4. Nombres, payloads, adjuntos, nombres de org y payloads de compartición son texto cifrado opaco en el servidor.

## Paquetes abiertos

| Paquete | Rol |
|---------|------|
| `openkey_server` | API de sync zero-knowledge FastAPI + PostgreSQL |
| `openkey_extension` | Extensión MV3 (Chrome / Firefox) |
| `openkey_cli` | CLI de desarrollador (secretos, gen. contraseñas, sync) |

La **app OpenKey** móvil y de escritorio se cubre por separado. Consulta [Usar la app](./app) para el uso del producto, [Paquetes](./packages) para la configuración, [Configuración del servidor](./server) para instalar sync, e [Inicio rápido](./quick-start) para ejecutar la pila localmente.
