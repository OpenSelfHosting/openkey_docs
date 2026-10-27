---
title: Sync zero-knowledge explicada
description: Cómo OpenKey sincroniza vaults entre dispositivos sin dar texto plano al servidor — Argon2id, auth hashes y almacenamiento solo de texto cifrado.
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.png
---

# Sync zero-knowledge explicada

La sync es útil. Confiar una máquina remota con tus contraseñas, no. OpenKey separa esas ideas: puedes sincronizar entre móviles, escritorios y la extensión del navegador mientras el servidor solo almacena **texto cifrado**.

## Qué significa «zero-knowledge» aquí

1. Tu contraseña maestra permanece en el dispositivo. Los clientes derivan una clave maestra con **Argon2id** a partir del email + contraseña maestra y una sal.
2. El login envía un `auth_hash` — suficiente para demostrar que conoces la contraseña, insuficiente para recuperarla.
3. Una **clave del vault** cifra nombres de colecciones y cargas de entradas con **AES-256-GCM**. El servidor solo almacena una clave del vault envuelta (cifrada), nunca la clave en texto plano.
4. Los adjuntos, nombres de organizaciones y cargas compartidas salen del dispositivo ya cifrados. La API de sync persiste blobs opacos; no puede descifrarlos aunque se copie la base de datos.

## Para qué sirve el servidor

El servidor OpenKey opcional es una superficie de sync y autenticación:

- Registro de cuenta e inicio de sesión (vía `auth_hash`)
- Push / pull de cargas cifradas del vault (last-write-wins por `revision` por elemento)
- Organizaciones y compartidos — aún texto cifrado en reposo
- JWT de acceso de corta duración y refresh tokens hasheados y rotados

**No** es un lugar que reconstruya tu vault. Si nunca configuras una URL de servidor, la app sigue funcionando como vault cifrado local. Tampoco hay **recuperación de contraseña maestra**: si la pierdes, el texto cifrado es irrecuperable — conserva una copia sin conexión.

## Nearby en la LAN

¿Quieres sync multi-dispositivo sin levantar PostgreSQL? **Nearby** (Pro) empareja dispositivos en Wi‑Fi local, vincula una clave de vault compartida y sincroniza texto cifrado entre ellos con la misma regla LWW. Trata el emparejamiento y el vínculo del vault como confianza plena del vault; no sustituye copias cifradas.

## Por qué importa este modelo

Los gestores de contraseñas en la nube te piden confiar en su infraestructura y sus operadores. OpenKey te pide confiar en **tu** host (o un VPS que controles) solo para almacenamiento y disponibilidad — no para secretos. Una base de datos robada no es un vault robado.

## Profundizar

- [Seguridad](/es/guide/security) — derivación de claves, modelo de amenazas y lista operativa
- [Configuración del servidor](/es/guide/server) — instala sync con Docker y enlaza clientes
- [Usar la app](/es/guide/app) — Nearby, copias de seguridad y uso diario del vault
- [Inicio rápido](/es/guide/quick-start) — ejecuta la pila localmente
