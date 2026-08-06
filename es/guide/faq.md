# FAQ y solución de problemas

Respuestas cortas a preguntas habituales. Contexto más amplio: [Seguridad](./security), [Configuración del servidor](./server), [Usar la app](./app), [Nearby](./nearby), [Extensión del navegador](./extension), [CLI](./cli).

## Contraseña maestra y recuperación

### Olvidé mi contraseña maestra. ¿Puedo recuperar el vault?

**No.** OpenKey es zero-knowledge: el servidor nunca ve la contraseña maestra ni la clave del vault en texto plano. Sin la contraseña (y sin un dispositivo que aún tenga una sesión desbloqueada o una copia local cifrada que puedas desbloquear), el texto cifrado es irrecuperable.

Mantén una contraseña maestra fuerte y única y al menos una copia local cifrada **Pro** (`.okbak`) o una exportación sin conexión.

### ¿Puede el administrador del servidor restablecer mi contraseña?

No. Los administradores pueden borrar o retener texto cifrado y observar metadatos (email, tamaños, tiempos). No pueden descifrar tu vault ni establecer una nueva contraseña maestra por ti.

### ¿Cómo cambio mi contraseña maestra?

En la app, usa el flujo de cuenta / seguridad que rota credenciales (`/auth/rekey` en el servidor). La clave del vault en sí permanece igual; solo se actualizan el auth hash y la clave del vault envuelta en el servidor. Sincroniza después los otros dispositivos con la **nueva** contraseña maestra.

## Sync y servidor

### La sync falla o el login devuelve un error

1. Confirma que `http(s)://your-host/health` responde saludable.
2. Usa la **misma** URL de servidor exacta en cada cliente (la barra final está bien; prefiere HTTPS en producción).
3. Comprueba que `JWT_SECRET` esté configurado (≥ 32 caracteres, no un marcador) — la API se niega a arrancar en caso contrario.
4. Comprueba que `CORS_ORIGINS` incluya los orígenes de tu extensión / web si los usas (**nunca `*`**).
5. Los endpoints de auth tienen **límite de tasa** por IP (`AUTH_RATE_LIMIT_*`). Espera un minuto y reintenta tras muchos logins fallidos.
6. Regístrate una vez en el primer dispositivo; en otros dispositivos **inicia sesión** con el mismo email + contraseña maestra, luego **Sincronizar ahora**.

### El teléfono no alcanza `http://localhost:8000`

`localhost` en el teléfono es el propio teléfono. Usa la IP LAN de tu ordenador (`http://192.168.x.x:8000`) en la misma Wi‑Fi, o expón HTTPS mediante un proxy inverso / túnel. El HTTP en claro puede estar bloqueado en móvil — prefiere HTTPS salvo depuración local.

### Dos dispositivos muestran contenidos de vault distintos tras la sync

La sync es **last-write-wins por revision**, no un CRDT. Las ediciones concurrentes pueden sobrescribirse. Extrae/envía de nuevo tras editar en un dispositivo a la vez. La sync Nearby en LAN usa la misma regla LWW.

### ¿Cómo elimino mi cuenta del servidor?

Los clientes llaman a `POST /auth/delete` autenticado tras volver a demostrar el `auth_hash` actual. Eso elimina de forma permanente el texto cifrado en el servidor. **Los vaults locales en los dispositivos no se ven afectados** — bórralos o limpia por separado si hace falta.

## App y Pro

### ¿Qué es gratis frente a Pro?

Consulta la matriz en [Usar la app](./app#gratis-frente-a-openkey-pro). Versión corta: gratis incluye vault básico + sync de servidor con límites de elementos; Pro desbloquea elementos ilimitados, exportar, copias cifradas, Nearby, organizaciones/compartir, adjuntos e iconos personalizados.

### Nearby no encuentra el otro dispositivo (Pro)

1. Ambos dispositivos desbloqueados, **Ajustes → Dispositivos cercanos** iniciado, misma Wi‑Fi (sin invitados/aislamiento de clientes).
2. Prefiere **Escanear QR de emparejamiento** en lugar de escribir el código; permite avisos de cámara / red local.
3. Desactiva temporalmente VPN / private relay. En macOS, permite la conexión de vuelta del cortafuegos si falla la conexión QR.
4. Empareja, luego **Vincular vault** (misma huella de clave del vault). Guía completa: [Nearby](./nearby).
5. Opcional **Solo redes de confianza**: añade tu SSID o Nearby se pausa en redes desconocidas.
6. Las plataformas con IAP de tienda (Android / iOS / macOS) ignoran **LAN Pro** de los pares — compra/restaura Pro en esa tienda si hace falta.

### ¿Cómo envío una sola contraseña a otro dispositivo en la LAN?

Tras emparejar (Pro), usa **Enviar al dispositivo** en la entrada o desde las acciones del par Nearby. Eso envía una entrada por la sesión LAN sin esperar una sync completa del vault. Detalles: [Nearby → Enviar una entrada](./nearby#enviar-una-entrada).

### Autocompletar / passkeys no aparecen

Activa OpenKey como proveedor del sistema de contraseñas y passkeys en **Ajustes → Autocompletar**, luego desbloquea el vault. En iOS/macOS concede los avisos de permiso del SO. Reinicia el navegador o la app de destino tras cambiar de proveedor.

### ¿Cuál es el atajo de relleno de la extensión?

`Ctrl+Shift+L` en Windows/Linux, `⌘⇧L` en macOS. Reasigna en los atajos de teclado de la extensión del navegador si hace falta. Ver [Extensión del navegador](./extension#atajo-de-teclado).

### La importación funcionó pero la exportación está bloqueada

**Importar es gratis; exportar requiere Pro** (igual para copias cifradas `.okbak`). Guía: [Importar y exportar](./import-export).

### ¿Cómo funcionan los adjuntos?

**Pro.** Abre un inicio de sesión → añade un adjunto cifrado (máx. unos **20 MB**). Los adjuntos se sincronizan como texto cifrado a través de tu servidor. La exportación JSON de OpenKey incluye solo metadatos — usa `.okbak` para un vault completo con blobs de adjuntos.

### ¿Cómo añado códigos TOTP / autenticador?

En una entrada, añade un secreto de autenticador o URI `otpauth`, o **escanea el QR** del setup 2FA del sitio. Los códigos aparecen con el vault desbloqueado; Autocompletar del sistema / la extensión pueden rellenar donde se admita.

### ¿Pueden anidarse las colecciones?

Sí — las carpetas pueden contener otras carpetas (relación `parent`). Los inicios de sesión anidados se incluyen en el autocompletado y el puente de escritorio.

### ¿Los elementos eliminados desaparecen de inmediato en otros dispositivos?

Los elementos eliminados de forma suave se sincronizan como **tombstones** hasta que los pares se pongan al día. Last-write-wins usa `revision` por elemento — las ediciones concurrentes aún pueden sobrescribirse.

### ¿Las builds web requieren Pro?

**Todavía no.** Las builds web no aplican límites Pro hoy. Las builds de tienda/escritorio móviles y de escritorio sí.

### ¿Cómo funcionan las organizaciones y los compartidos?

Pro + el mismo servidor autoalojado. Publica claves de identidad, luego invita a una org o comparte una instantánea de entrada. Detalles: [Compartir y organizaciones](./sharing).

### ¿Cómo funcionan la biometría / el bloqueo automático?

En **Ajustes → Seguridad** puedes activar el desbloqueo biométrico (según plataforma) y protecciones de bloqueo relacionadas. Prefiere bloquear en inactividad en máquinas compartidas. La biometría envuelve la clave del vault en el dispositivo — no sustituye una contraseña maestra fuerte.

## Extensión del navegador

### La extensión no puede hablar con la app de escritorio

1. Desbloquea el vault de escritorio y déjalo desbloqueado.
2. Abre **Ajustes → Autocompletar** (y **Extensión del navegador** en macOS) para registrar el host nativo.
3. Chromium: escribe el ID de la extensión descomprimida en el archivo de la plataforma (ver [Extensión del navegador](./extension)), luego vuelve a abrir Autocompletar.
4. Elige **Usar app de escritorio** en la extensión.
5. macOS necesita Python 3 en el `PATH` para el script del host.

### El desbloqueo independiente falla contra mi servidor

Confirma que prelogin funciona: el email debe estar ya registrado. Misma contraseña maestra que la app. La URL del servidor debe ser alcanzable desde el navegador (CORS / HTTPS). Revisa la página Options por la URL e intenta `/health` en una pestaña normal.

### Las passkeys vuelven al autenticador del navegador

Es lo esperado cuando eliges **Usar navegador** en el diálogo de confirmación, o cuando el vault de la extensión está bloqueado. Desbloquea la extensión (modo independiente) para almacenar/usar passkeys de OpenKey.

## CLI

### `openkey secret …` dice que desbloquees la app

Los comandos de vault necesitan una **app de escritorio desbloqueada** (puente nativo) o `eval $(openkey unlock)` tras `login`. Ejecuta `openkey status` para ver el estado del puente / sesión.

### Sesión caducada

El bloqueo predeterminado es 15 minutos (`openkey config set-lock`). Ejecuta `eval $(openkey unlock)` de nuevo. Prefiere el prompt interactivo de contraseña frente a `OPENKEY_PASSWORD` en máquinas personales.

## Seguridad / privacidad

### ¿Salud de contraseñas envía mis contraseñas a Internet?

Las comprobaciones locales de débiles/reutilizadas permanecen en el dispositivo. Have I Been Pwned opcional usa solo **k-anonimato de prefijo SHA-1** — nunca la contraseña completa. Ver [Seguridad](./security).

### ¿Nearby es una copia de seguridad?

No. Sincroniza texto cifrado en la LAN entre dispositivos emparejados y con vault vinculado. Mantén también copias Pro sin conexión.

## ¿Sigues atascado?

1. Captura el cliente que falla (app / extensión / CLI) y la hora aproximada.
2. Revisa los logs del servidor (`docker compose logs -f api`) y `/health`.
3. Reporta problemas de seguridad en privado — **security@openselfhosting.com** o un aviso privado bajo [OpenSelfHosting](https://github.com/OpenSelfHosting). Ver [Seguridad → Informar](./security#informar-vulnerabilidades).
4. Para errores de producto, abre un issue bajo [OpenSelfHosting](https://github.com/OpenSelfHosting) con el nombre del paquete y la versión.

Siguiente: [Nearby](./nearby) · [Configuración del servidor](./server) · [Seguridad](./security) · [Descargar](./download)
