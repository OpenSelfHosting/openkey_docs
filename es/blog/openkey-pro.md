---
title: OpenKey Pro — qué desbloquea (y qué no)
description: Límites Gratis vs Pro, Nearby y LAN Pro, IAP de tienda vs escritorio, y qué sigue siendo gratis en cada plataforma.
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — qué desbloquea (y qué no)

El vault básico de OpenKey funciona sin conexión sin suscripción. **Pro** sube los límites y desbloquea extras que importan al sincronizar entre dispositivos, exportar o compartir con un equipo. Esta es la división práctica — y la advertencia de LAN Pro que a menudo confunde.

## Qué sigue siendo gratis

- Vault cifrado local (con límites freemium — ver abajo)
- [Sync de servidor](/es/guide/server) autoalojado (solo texto cifrado)
- Autofill del sistema / passkeys donde el SO lo permita
- Puente de la [extensión del navegador](/es/guide/extension) a la app de escritorio desbloqueada
- **Importar** desde Bitwarden, CSV del navegador, KeePass y más

Límites del nivel gratis (builds móvil/escritorio que aplican Pro): **50** entradas de inicio de sesión; **3** colecciones, tarjetas de pago, monederos cripto y secretos de desarrollador cada uno.

## Qué desbloquea Pro

| Capacidad | Notas |
|------------|--------|
| Entradas / colecciones / tarjetas / cripto / secretos ilimitados | Elimina los límites gratis |
| **Exportar** + copia de seguridad **`.okbak`** cifrada | Trata las exportaciones como secretas |
| Sync de vault **Nearby** en LAN | Emparejar con QR, vincular vault, enviar entrada — [guía](/es/guide/nearby) |
| Organizaciones y compartición | Mismo servidor autoalojado |
| Adjuntos en entradas | ~20 MB cada uno, texto cifrado en el servidor |
| Icono de app personalizado | Donde la plataforma lo admita |

Matriz completa: [Precios](/es/pricing) · [Usar la app → Gratis frente a OpenKey Pro](/es/guide/app#gratis-frente-a-openkey-pro).

## LAN Pro no es un recibo de tienda

En plataformas **sin** compra dentro de la app de tienda (típicamente Windows / Linux), un par Pro puede compartir una certificación **LAN Pro** por Nearby para que el otro dispositivo desbloquee los límites Pro en la LAN.

- Solo comodidad — **no** prueba criptográfica de compra
- Android, iOS y macOS **ignoran** LAN Pro; compra o restaura Pro en esa tienda
- Desemparejar detiene la certificación

## Builds web

**Las builds web aún no aplican Pro.** Las builds móvil y de escritorio de tienda/escritorio sí. Planifica en consecuencia si pruebas en el navegador.

## Profundizar

- [Precios](/es/pricing) — planes, cómo comprar, cancelar
- [Nearby sin servidor](/es/blog/nearby-without-a-server)
- [Importar y exportar](/es/guide/import-export)
- [Compartir y organizaciones](/es/guide/sharing)
- [FAQ](/es/guide/faq)
- [Seguridad](/es/guide/security)
