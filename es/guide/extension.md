# Extensión del navegador

Extensión MV3 para **Chrome**, **Edge**, **Brave** y **Firefox**. Puede desbloquear contra tu [servidor autoalojado](./server) (modo independiente) o rellenar a través de la **app de escritorio** desbloqueada (mensajería nativa).

Nombre del host: `com.openselfhosting.openkey`

## Qué hace

1. **Vault independiente** — desbloquea con email + contraseña maestra; sincroniza texto cifrado desde tu servidor
2. **Puente nativo** — cuando la app de escritorio OpenKey está desbloqueada, rellena y guarda vía mensajería nativa
3. **Autocompletar** — superposiciones, menú contextual y atajo de teclado para inicios de sesión y tarjetas de pago
4. **Guardar / actualizar** — captura nuevos inicios de sesión de la página en el vault
5. **Passkeys** — intercepta WebAuthn `create` / `get`; almacena credenciales ES256 (extensión desbloqueada)
6. **Tarjetas, cripto y secretos** — navega y rellena/copia áreas reservadas del vault
7. **Adjuntos** — lista y descarga adjuntos descifrados de un inicio de sesión (modo independiente)
8. **Compartidos y orgs** — lista/acepta/revoca compartidos e invitaciones de org (modo independiente)

### Atajo de teclado

| Acción | Windows / Linux | macOS |
|--------|-----------------|-------|
| Rellenar inicio de sesión con OpenKey | `Ctrl+Shift+L` | `⌘⇧L` |

Los navegadores pueden pedirte confirmar o reasignar el comando en los atajos de teclado de la extensión si otra extensión ya lo reclamó.

## Instalar (descomprimida)

Es posible que las fichas de tienda aún no estén publicadas. Compila y carga en local:

```bash
cd openkey_extension
npm install
npm run build
```

- **Chrome / Edge / Brave:** `chrome://extensions` → Modo de desarrollador → **Load unpacked** → selecciona `dist/`
- **Firefox:** `about:debugging` → This Firefox → **Load Temporary Add-on** → elige `dist/manifest.json`

Copia el ID de la extensión desde el popup o la página Options — lo necesitas para conectar el puente de escritorio en navegadores Chromium.

## Permisos

La extensión usa coincidencias de host / content-script `<all_urls>` para que el autocompletado, la captura de inicios de sesión y la interceptación de passkeys funcionen en los sitios que visitas (una lista blanca fija no puede cubrir la web abierta). La sync de texto cifrado y el desbloqueo permanecen en tu dispositivo o en tu [servidor autoalojado](./server); OpenKey no exfiltra HTML de la página a una nube de proveedor. Prefiere **Usar app de escritorio** cuando quieras rellenar sin desbloquear un vault separado de la extensión.

## Modos de desbloqueo

### Servidor autoalojado

1. Configura la **URL del servidor autoalojado** en el popup o Options.
2. **Crear cuenta** (registro) o **Desbloquear** (prelogin + login con el mismo email y contraseña maestra que la app).
3. El texto cifrado se sincroniza mediante `POST /sync`. La contraseña maestra nunca sale del cliente.

### Puente de la app de escritorio

1. Desbloquea la app de escritorio OpenKey.
2. Activa Autocompletar / conecta la extensión (pasos por plataforma abajo).
3. En la extensión elige **Usar app de escritorio**.

Rellenar y guardar pasan por la app desbloqueada — no hace falta un desbloqueo separado del vault de la extensión para esos flujos.

Opcional: **Ajustes → Extensión del navegador → Copiar enlace de vault sin conexión** en la app para un arranque air-gapped.

## Conectar mensajería nativa

### Windows

Abrir **Ajustes → Autocompletar** registra `openkey_native_host.exe` bajo:

`HKCU\Software\...\NativeMessagingHosts\com.openselfhosting.openkey`

Para Chromium, escribe el ID de la extensión descomprimida en:

`%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt`

luego abre Autocompletar de nuevo para que se regenere el manifiesto del host. Firefox usa `openkey@openselfhosting.local` automáticamente.

Mantén el vault desbloqueado (TCP en loopback).

### macOS

Al desbloquear, OpenKey instala `openkey_native_host.py` y escribe manifiestos bajo las carpetas NativeMessagingHosts de Chrome / Chromium / Edge / Brave / Firefox.

1. Carga la extensión descomprimida y copia su ID.
2. App: **Ajustes → Extensión del navegador** → pega el ID → **Conectar extensión**.
3. Mantén el vault desbloqueado → extensión: **Usar app de escritorio**.

Requiere **Python 3** en el `PATH`.

### Linux

**Ajustes → Autocompletar** escribe manifiestos de host bajo `~/.config/google-chrome/`, Chromium, Edge y `~/.mozilla/native-messaging-hosts/`.

Archivo del ID de extensión Chromium:

`~/.local/share/OpenKey/chrome_extension_id.txt`

luego toca Autocompletar de nuevo. Firefox usa `openkey@openselfhosting.local`.

Socket del puente: `$XDG_RUNTIME_DIR/openkey-native.sock` (mantén el vault desbloqueado).

## Guardar inicios de sesión capturados

Tras enviar un inicio de sesión (o botón de login / Enter), un banner en la página ofrece **Guardar** o **Actualizar**:

1. **Puente nativo** — `createEntry` / `updateEntry` en la app de escritorio desbloqueada
2. **Independiente** — cifra en local y envía texto cifrado vía sync

El mismo host + usuario + contraseña se ignora; una contraseña cambiada pide actualizar.

## Passkeys

Con la extensión desbloqueada, OpenKey puede gestionar WebAuthn en sitios. Un diálogo en la página confirma; elige **Usar navegador** para volver al autenticador de la plataforma.

Prueba rápida tras desbloquear: [webauthn.io](https://webauthn.io) o `npx tsx src/passkey/smoke.test.ts` en `openkey_extension`.

## Relacionado

- [Descargar e instalar](./download)
- [Usar la app](./app) — ajustes de Autocompletar y Extensión del navegador
- [Configuración del servidor](./server)
- [Seguridad](./security) — límite de confianza de la extensión
