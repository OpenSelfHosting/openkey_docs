---
title: Bienvenido a OpenKey
description: Por qué construimos un gestor de contraseñas autoalojado que solo almacena texto cifrado — y qué ofrece la app, el servidor, la extensión y la CLI.
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.svg
---

# Bienvenido a OpenKey

La mayoría de gestores de contraseñas te piden confiar en una nube que no controlas. OpenKey toma el otro camino: tu vault permanece cifrado en el dispositivo, un servidor de sync opcional almacena **solo texto cifrado**, y las contraseñas maestras nunca salen del cliente.

## Solo texto cifrado

Los clientes cifran los datos del vault antes de que salgan del dispositivo. La API de sync — si la usas — almacena blobs opacos. Los nombres de colecciones, las cargas de entradas, los adjuntos, los nombres de organizaciones y los datos compartidos permanecen como texto cifrado en reposo. Comprometer la base de datos solo da sales, parámetros KDF, claves envueltas y blobs — no inicios de sesión legibles.

## Qué hay hoy

| Pieza | Rol |
|-------|------|
| **App** | Vault diario en Android, iOS, macOS, Linux y Windows — inicios de sesión, tarjetas, monederos cripto, secretos de desarrollador, organizaciones y compartición |
| **Servidor** | API de sync zero-knowledge FastAPI + PostgreSQL que puedes autoalojar |
| **Extensión** | Autocompletado MV3 y passkeys para Chrome y Firefox |
| **CLI** | Generación de contraseñas sin conexión, descubrimiento local de secretos y sync opcional |

También puedes sincronizar un vault entre dispositivos en la misma Wi‑Fi con **Nearby** (Pro) — no se requiere servidor para esa ruta LAN. La sync del servidor y Nearby mueven solo texto cifrado (last-write-wins por revision).

## Empezar

- [Inicio rápido](/es/guide/quick-start) — ejecuta la pila localmente
- [Usar la app](/es/guide/app) — flujos del vault en móvil y escritorio
- [Seguridad](/es/guide/security) — modelo zero-knowledge y límites de confianza
- [Configuración del servidor](/es/guide/server) — instala y enlaza tu propio host de sync

También en el blog: [sync zero-knowledge](/es/blog/zero-knowledge-sync), [Nearby sin servidor](/es/blog/nearby-without-a-server), [autoalojamiento](/es/blog/self-host-your-vault), [passkeys y autocompletado](/es/blog/passkeys-and-autofill), y la [CLI para desarrolladores](/es/blog/cli-for-developers). El código está en [OpenSelfHosting en GitHub](https://github.com/OpenSelfHosting).
