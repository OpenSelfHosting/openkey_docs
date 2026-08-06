# Sincronización Nearby en LAN

**OpenKey Pro** puede sincronizar el mismo vault entre dispositivos en tu Wi‑Fi local **sin un servidor autoalojado**. El texto cifrado se mueve por una sesión LAN emparejada; la clave del vault solo se comparte después de **Vincular vault** de forma explícita.

Esta página cubre el emparejamiento, códigos QR, vínculo del vault, envío de entradas, LAN Pro y reglas de confianza. Solución de problemas breve: [FAQ](./faq#nearby-no-encuentra-el-otro-dispositivo-pro). Modelo de amenazas: [Seguridad](./security).

## Requisitos

- OpenKey Pro en cada dispositivo que deba sincronizar (o una certificación **LAN Pro** válida en plataformas sin IAP de tienda — ver abajo)
- Ambos dispositivos desbloqueados y en la **misma LAN** (no Wi‑Fi de invitados / aislamiento de clientes)
- **Ajustes → Dispositivos cercanos** iniciado en ambos lados

Nearby **no** es una copia de seguridad. Mantén también una copia Pro [cifrada `.okbak`](./import-export#copia-de-seguridad-cifrada-pro).

## Emparejar dispositivos

1. Desbloquea OpenKey en ambos dispositivos → **Ajustes → Dispositivos cercanos**.
2. Activa **Visible en la red local** (se recuerda: se reanuda en el siguiente desbloqueo mientras el vault esté desbloqueado).
3. Empareja con una de estas opciones:
   - **QR (preferido):** el dispositivo que anuncia muestra un QR de emparejamiento; en el otro toca **Escanear QR de emparejamiento** y apunta la cámara — no hace falta escribir el código.
   - **Código corto:** introduce el código mostrado en el par en unos dos minutos.
4. Tras el emparejamiento, toca **Vincular vault** para que ambos compartan la misma huella de la clave del vault.

Si las claves del vault difieren, el dispositivo receptor puede **adoptar** la clave del par (reemplaza los datos locales del vault tras confirmar la contraseña maestra). Trata vínculo + adopción como confianza plena del vault.

### Cortafuegos / conexión de vuelta

Algunos escritorios (sobre todo macOS) bloquean TCP entrante. Si escanear un QR no conecta, OpenKey puede pedir al anfitrión del QR que llame de vuelta al invitado. Permite los avisos de red local / cortafuegos cuando el SO lo pida. Prefiere la misma subred; las VPN y el private relay suelen romper el descubrimiento.

## Tras vincular

- Los cambios se sincronizan automáticamente mientras ambos vaults estén desbloqueados y Nearby esté anunciando.
- Usa **Sincronizar ahora** para un alcance manual.
- La sync es **last-write-wins por revision** (misma regla que el [servidor](./server)) — edita un dispositivo a la vez cuando sea posible.
- **Dispositivos de confianza:** tras un emparejamiento + vínculo de vault exitoso, los pares se reconectan y sincronizan siempre que Nearby esté activo — sin volver a emparejar.
- **Solo redes de confianza (opcional):** añade SSIDs de casa/oficina; Nearby se pausa en redes desconocidas y se reanuda al volver.
- **Desemparejar** revoca la confianza LAN, detiene la sync y borra las reclamaciones LAN Pro de ese par.

## Enviar una entrada

Puedes enviar un único inicio de sesión a un par emparejado sin esperar una sync completa del vault:

1. Abre la entrada (o usa las acciones del par Nearby en **Ajustes → Dispositivos cercanos**).
2. Elige **Enviar al dispositivo** / enviar entrada para ese par.
3. El par recibe el texto cifrado por la sesión LAN y puede guardarlo localmente.

Úsalo para comparticiones puntuales en la LAN; prefiere [organizaciones y compartición](./sharing) cuando los pares usen el mismo servidor autoalojado.

## Certificación LAN Pro

En plataformas **sin** compra dentro de la app de tienda (típicamente Windows / Linux), un par Pro puede compartir un estado **LAN Pro** para que el otro dispositivo desbloquee los límites Pro por Nearby.

- Solo comodidad — **no** es una prueba criptográfica de compra.
- Android, iOS y macOS (IAP de tienda) **ignoran** LAN Pro; compra o restaura Pro en esa tienda.
- Desemparejar detiene la certificación.

## Resumen de confianza

| Acción | Implicación de confianza |
|--------|-------------------|
| Emparejar | Clave de sesión con ese par en la LAN |
| Vincular vault | Compartir material de la clave del vault — el par puede sincronizar el texto cifrado completo del vault |
| Enviar entrada | El par recibe el texto cifrado de esa entrada |
| LAN Pro | El par puede desbloquear límites Pro en plataformas sin IAP |

Solo empareja y vincula con dispositivos y personas de confianza. Detalles: [Seguridad → Modelo de amenazas](./security#modelo-de-amenazas).

## Relacionado

- [Usar la app](./app) — mapa de ajustes y matriz Pro
- [Descargar](./download)
- [Importar y exportar](./import-export) — copias de seguridad reales
- [FAQ](./faq)
- [Seguridad](./security)

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: pair with QR or code for a session key, explicitly link vault to share the vault key, then sync ciphertext on the LAN; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

Siguiente: [Usar la app](./app) · [Compartir](./sharing) · [FAQ](./faq)
