# Sincronización Nearby en LAN

**OpenKey Pro** puede sincronizar el mismo vault entre dispositivos en tu Wi‑Fi local **sin un servidor autoalojado**. El texto cifrado se mueve por una sesión LAN emparejada; la clave del vault solo se comparte después de **Vincular vault** de forma explícita. En un **dispositivo nuevo**, también puedes **copiar** un vault existente por Nearby durante la configuración inicial (clonación de vault) — sigue siendo de igual a igual, nunca pasa por la API de sync.

<img src="/guide/nearby-pair-link-flow.svg" alt="Flujo Nearby: descubrir un par en la LAN, emparejar para una clave de sesión, luego copiar un vault en la configuración o vincular vaults explícitamente para sync de fusión continua; envío de entrada opcional para envíos puntuales" class="ok-diagram" width="920" height="360" />

Esta página cubre descubrimiento, emparejamiento por toque, clonación de vault en la configuración, vínculo del vault, envío de entradas, LAN Pro y reglas de confianza. Solución de problemas breve: [FAQ](./faq#nearby-no-encuentra-el-otro-dispositivo-pro). Modelo de amenazas: [Seguridad](./security). Detalles del protocolo: [especificación OpenKey → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md).

## Requisitos

- OpenKey Pro en cada dispositivo que deba sincronizar o clonar (o una certificación **LAN Pro** válida en plataformas sin IAP de tienda — ver abajo)
- Misma **LAN** (no Wi‑Fi de invitados / aislamiento de clientes)
- Para **sync de fusión**: ambos dispositivos desbloqueados con **Ajustes → Dispositivos cercanos** iniciado
- Para **clonación de vault** en la configuración: dispositivo existente desbloqueado y anunciando con vault; dispositivo nuevo en la ruta de primer uso **Dispositivo cercano**

La sync de fusión Nearby **no** es una copia de seguridad. Mantén también una copia Pro [cifrada `.okbak`](./import-export#copia-de-seguridad-cifrada-pro). La clonación copia el vault completo una vez (incluidos adjuntos); sigue guardando copias offline después.

Las balizas de descubrimiento incluyen el **nombre del dispositivo en claro** en la LAN (y un flag `vault` de si el par ya tiene cuenta). Solo acepta dispositivos que poseas. Bloquear el vault pausa Nearby hasta que desbloquees de nuevo.

Linux y Windows pueden pedir una vez abrir puertos LAN (**UDP/TCP 47821**, **TCP 47822**). Permite esos avisos para que los pares encuentren esta máquina.

## Copiar vault en la configuración (clonación de vault)

Úsalo cuando un **teléfono o escritorio nuevo** deba recibir una copia completa de un vault existente por Wi‑Fi (sin archivo `.okbak`, sin servidor).

1. En el dispositivo **existente**: desbloquea OpenKey → **Ajustes → Dispositivos cercanos** → activa **Visible en la red local**. El par debe mostrar que **tiene un vault**.
2. En el dispositivo **nuevo**: selector de primer uso → **Dispositivo cercano** (o la ruta de configuración equivalente).
3. Toca el par descubierto → confirma la copia. El titular del vault empuja (o el dispositivo vacío tira) un archivo cifrado de sesión por la LAN.
4. Desbloquea en el dispositivo nuevo con la **misma contraseña maestra** que el origen. La contraseña nunca se envía por el cable — solo el material de desbloqueo y el texto cifrado del vault se mueven dentro de la sesión emparejada.

La clonación incluye la base de datos local, preferencias, adjuntos, avatar opcional y campos de desbloqueo de cuenta (email, salt, KDF, clave de vault envuelta). Si ese email ya existe en el dispositivo nuevo, la clonación falla con `email_exists`.

**Clonar vs Vincular vault**

| | Clonación de vault | Vincular vault |
|--|-------------|------------|
| Cuándo | Primer uso / dispositivo vacío | Ambos dispositivos ya tienen vaults |
| Resultado | Copia completa de un vault en el dispositivo vacío | Compartir huella de la clave del vault; sync LWW continua |
| Contraseña maestra | Misma contraseña para desbloquear la copia | Ya desbloqueado en ambos lados |

## Emparejar dispositivos (sync de fusión)

1. Desbloquea OpenKey en ambos dispositivos → **Ajustes → Dispositivos cercanos**.
2. Activa **Visible en la red local** (se recuerda: se reanuda en el siguiente desbloqueo mientras el vault esté desbloqueado).
3. Toca un par descubierto para emparejar (el código corto de emparejamiento se intercambia automáticamente por la sesión LAN). Introducir un código corto a mano sigue funcionando unos dos minutos cuando el descubrimiento es incómodo.
4. Tras el emparejamiento, toca **Vincular vault** para que ambos compartan la misma huella de la clave del vault. Emparejar solo nunca comparte automáticamente la clave del vault.

Si las claves del vault difieren, el dispositivo receptor puede **adoptar** la clave del par (reemplaza los datos locales del vault tras confirmar la contraseña maestra). Trata vínculo + adopción como confianza plena del vault.

### Cortafuegos / conexión de vuelta

Algunos escritorios (sobre todo macOS) bloquean TCP entrante. Las builds de Linux y Windows pueden pedir una vez **UDP/TCP 47821** y **TCP 47822**. Si un par no puede marcar hacia dentro, OpenKey puede pedir al anfitrión que anuncia que llame de vuelta al invitado (solo UDP unicast — el código de emparejamiento no se difunde en la LAN). Permite los avisos de red local / cortafuegos cuando el SO lo pida. Prefiere la misma subred; las VPN y el private relay suelen romper el descubrimiento. Demasiados códigos incorrectos provocan un bloqueo breve.

## Tras vincular

- Los cambios se sincronizan automáticamente mientras ambos vaults estén desbloqueados y Nearby esté anunciando.
- Usa **Sincronizar ahora** para un alcance manual.
- La sync es **last-write-wins por revision** (misma regla que el [servidor](./server)) — edita un dispositivo a la vez cuando sea posible.
- **Dispositivos de confianza:** tras un emparejamiento + vínculo de vault exitoso, los pares se reconectan y sincronizan siempre que Nearby esté activo — sin volver a emparejar.
- **Solo redes de confianza (opcional):** añade SSIDs de casa/oficina; Nearby se pausa cuando el SSID actual no está en la lista (y bloquea el inicio si la lista está vacía). Cuando el SO no puede leer el SSID, Nearby puede seguir con un banner de aviso.
- **Desemparejar** revoca la confianza LAN, detiene la sync y borra las reclamaciones LAN Pro de ese par.

## Enviar una entrada

Puedes enviar un único inicio de sesión a un par emparejado sin esperar una sync completa del vault:

1. Abre la entrada (o usa las acciones del par Nearby en **Ajustes → Dispositivos cercanos**).
2. Elige **Enviar al dispositivo** / enviar entrada para ese par.
3. El par recibe el texto cifrado por la sesión LAN y puede guardarlo localmente.

Úsalo para comparticiones puntuales en la LAN; prefiere [organizaciones y compartición](./sharing) cuando los pares usen el mismo servidor autoalojado.

## Certificación LAN Pro {#lan-pro-attestation}

En plataformas **sin** compra dentro de la app de tienda (típicamente Windows / Linux), un par Pro **con vault vinculado** puede compartir un estado **LAN Pro** para que el otro dispositivo desbloquee los límites Pro por Nearby. Emparejar solo no basta — debes tocar **Vincular vault** primero.

- Solo comodidad — **no** es una prueba criptográfica de compra.
- Android, iOS y macOS (IAP de tienda) **ignoran** LAN Pro; compra o restaura Pro en esa tienda.
- Desemparejar detiene la certificación.

## Resumen de confianza

| Acción | Implicación de confianza |
|--------|-------------------|
| Emparejar | Clave de sesión con ese par en la LAN |
| Clonación de vault | El par recibe una copia completa del vault (texto cifrado + material de desbloqueo); necesita la misma contraseña maestra para desbloquear |
| Vincular vault | Compartir material de la clave del vault — el par puede sincronizar el texto cifrado completo del vault |
| Enviar entrada | El par recibe el texto cifrado de esa entrada |
| LAN Pro | El par puede desbloquear límites Pro en plataformas sin IAP |

Solo empareja, clona y vincula con dispositivos y personas de confianza. Detalles: [Seguridad → Modelo de amenazas](./security#modelo-de-amenazas).

## Relacionado

- [Usar la app](./app) — selector de configuración, mapa de ajustes y matriz Pro
- [Descargar](./download)
- [Importar y exportar](./import-export) — `.okbak` vs clonación Nearby
- [FAQ](./faq)
- [Seguridad](./security)

Siguiente: [Usar la app](./app) · [Compartir](./sharing) · [FAQ](./faq)
