---
title: Por qué autoalojar tu vault de contraseñas
description: Control, privacidad y un servidor de sync que solo almacena texto cifrado — cómo ejecutar OpenKey en tu propio hardware con Docker.
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.png
---

# Por qué autoalojar tu vault de contraseñas

Los gestores de contraseñas están en el centro de tu vida digital. Cuando ese vault vive solo en la nube de otro, las caídas, cambios de política y brechas se convierten en *tu* riesgo. El autoalojamiento invierte el valor por defecto: eliges la máquina, las copias de seguridad y quién puede alcanzar la API.

## Qué controlas

| Tú posees | El servidor nunca obtiene |
|---------|------------------------|
| Dónde se almacena el texto cifrado | Contraseña maestra |
| Cuándo se ejecutan actualizaciones y copias | Claves del vault en texto plano |
| Qué clientes pueden conectar (`CORS_ORIGINS`, HTTPS) | Nombres de entradas o contraseñas legibles |
| Si la sync está activa | Adjuntos o compartidos descifrados |

La app OpenKey funciona sin conexión con una base de datos cifrada local. Apunta **Ajustes → Datos → Servidor autoalojado** a tu instancia cuando quieras sync multi-dispositivo — mismas reglas zero-knowledge en ambos casos. Mantén al menos una **copia local cifrada**; el servidor no puede recuperar una contraseña maestra olvidada.

## Una forma práctica

Mucha gente empieza con Docker en un NAS doméstico o un VPS pequeño:

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

Pon TLS delante (Caddy, Traefik o tu proxy inverso), configura un `JWT_SECRET` largo y único, y restringe `CORS_ORIGINS` a los orígenes de tu app y extensión — nunca `*`. Luego **Regístrate** desde el primer dispositivo e **Inicia sesión** desde el resto, y usa **Sincronizar ahora** cuando quieras un pull/push explícito.

## LAN sin servidor

Si solo necesitas dispositivos en la misma Wi‑Fi, la sync de vault **Nearby** (Pro) puede emparejar y vincular vaults en la LAN sin PostgreSQL. Úsala por comodidad; conserva copias sin conexión para recuperación ante desastres.

## Para quién es

- Personas que quieren sync sin un vault SaaS
- Equipos que necesitan colecciones compartidas pero mantienen el cifrado en clientes
- Desarrolladores que ya ejecutan PostgreSQL y dominan Compose

No necesitas autoalojar para usar OpenKey localmente. Autoalojas cuando quieres **tu** plano de sync — con almacenamiento solo de texto cifrado como regla estricta.

## Próximos pasos

- [Configuración del servidor](/es/guide/server) — instalar, configurar y enlazar clientes
- [Usar la app](/es/guide/app) — flujos del vault, Nearby, importar/exportar
- [Seguridad](/es/guide/security) — lista de endurecimiento y modelo de amenazas
- [Resumen](/es/guide/overview) — paquetes y modelo zero-knowledge
