---
title: Nearby sin servidor
description: Empareja dispositivos en tu Wi‑Fi con códigos QR, vincula vaults y sincroniza texto cifrado en la LAN — sin API autoalojada.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# Nearby sin servidor

Autoalojar una API de sync es potente — y opcional. **Nearby** (OpenKey Pro) mantiene la misma postura zero-knowledge en tu red local: los dispositivos se emparejan, **Vinculas vault** de forma explícita, y solo entonces se mueve material de la clave del vault para que los pares sincronicen **texto cifrado**. El emparejamiento solo nunca comparte automáticamente la clave del vault.

## Cuándo usarlo

- Dos o más de tus dispositivos en la misma Wi‑Fi de casa u oficina
- Quieres sync sin levantar Docker / Postgres aún
- Necesitas un **Enviar al dispositivo** puntual para un único inicio de sesión sin un pull completo del vault

**No** es una copia de seguridad. Conserva una [`.okbak` cifrada](/es/guide/import-export) Pro sin conexión. Las redes de invitados y el aislamiento de clientes rompen el descubrimiento — usa un segmento LAN normal.

## Emparejar con QR (preferido)

1. Desbloquea OpenKey en ambos dispositivos → **Ajustes → Dispositivos cercanos**.
2. Activa **Visible en la red local**.
3. En un dispositivo muestra el QR de emparejamiento; en el otro, **Escanear QR de emparejamiento** (o **Pegar QR de emparejamiento** en escritorio Linux/Windows).
4. Toca **Vincular vault** para que ambos compartan la misma huella de la clave del vault.

Escribir el código corto sigue funcionando en unos dos minutos. Si un cortafuegos de Mac bloquea TCP entrante tras un escaneo, OpenKey puede pedir al anfitrión del QR que llame de vuelta — permite los avisos de red del SO.

## Tras vincular

Los cambios se sincronizan mientras ambos vaults estén desbloqueados y Nearby esté anunciando (**last-write-wins por revision**, misma regla que el servidor). Los dispositivos de confianza se reconectan automáticamente; **Solo redes de confianza** (opcional) pausa Nearby fuera de tus SSID. **Desemparejar** revoca la confianza LAN y las reclamaciones LAN Pro.

## LAN Pro, en breve

En Windows / Linux (sin IAP de tienda), un par Pro con **vault vinculado** puede compartir una certificación **LAN Pro** para que el otro dispositivo desbloquee los límites Pro. El emparejamiento sin vínculo no basta. Android, iOS y macOS lo ignoran — compra o restaura Pro en la tienda. Trata la certificación como comodidad, no como prueba criptográfica de compra.

## Profundizar

- Guía completa: [Sync Nearby en LAN](/es/guide/nearby)
- Modelo de amenazas: [Seguridad](/es/guide/security)
- Matriz Pro de la app: [Usar la app](/es/guide/app)
- Solución de problemas en FAQ: [Nearby no encuentra el otro dispositivo](/es/guide/faq)
