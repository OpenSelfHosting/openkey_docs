# Compartir y organizaciones

Comparte elementos individuales o trabaja en **organizaciones** con otros usuarios de OpenKey en el **mismo servidor autoalojado**. Todo lo que el servidor almacena de orgs y compartidos permanece como **texto cifrado** — los clientes envuelven claves para los destinatarios; la API nunca descifra nombres ni cargas.

**Requiere OpenKey Pro** y una cuenta de [servidor](./server) configurada (registro / login + sync). Publica claves de identidad antes de invitar o compartir para que los pares puedan envolver claves para ti.

## Requisitos previos

1. Instala la app ([Descargar](./download)) y desbloquea tu vault.
2. Conecta **Ajustes → Datos → Servidor autoalojado** y sincroniza.
3. **Ajustes → Datos → Publicar claves de identidad** (Pro) — sube material opaco de clave pública / clave privada envuelta usado para compartir.
4. Los destinatarios deben usar la **misma URL del servidor** y haber publicado claves de identidad (o al menos una cuenta registrada que el servidor pueda buscar).

## Organizaciones

Ruta: **Ajustes → Datos → Organizaciones**, o **Centro de elementos → Organizaciones**.

### Crear una org

1. Abre Organizaciones → crear.
2. El cliente cifra el nombre de la org y envuelve una clave de org para ti como propietario.
3. Crea **colecciones compartidas** bajo la org para inicios de sesión del equipo (nombres + cargas cifrados).

Las entradas compartidas de org viven bajo esas colecciones de org y se sincronizan como filas opacas (`encrypted_payload`).

### Invitar miembros

1. Abre la org → **Invitar miembro**.
2. Introduce su **email** (debe existir ya en este servidor) y elige un rol (`admin` / `member`).
3. El cliente envuelve la clave de org para su clave de identidad pública y publica la invitación.
4. Ellos ven **Invitaciones pendientes**, aceptan y luego pueden abrir colecciones compartidas tras sincronizar.

El propietario/admin puede revocar invitaciones pendientes, cambiar roles o eliminar miembros. El propietario no puede abandonar la org; transferir la propiedad no es una vía de recuperación separada — planifica los admins con cuidado.

### Aceptar una invitación

1. Abre Organizaciones → **Invitaciones pendientes**.
2. Acepta. Sincroniza para que aparezcan las colecciones compartidas.
3. Usa la misma contraseña maestra y servidor de siempre — unirse no da al servidor texto plano.

## Compartidos de elementos y colecciones

Comparte un único inicio de sesión (o colección) con otro usuario sin meterlo en una org.

1. Abre la entrada (o colección) → **Compartir**.
2. Elige el email del destinatario en tu servidor.
3. El cliente envuelve una clave de elemento para ellos. Los **compartidos de entrada hacen una instantánea** de la carga cifrada en el momento de compartir.
4. Destinatario: acepta en la UI de compartidos / pendientes; luego la instantánea se importa en **su** vault (nuevo uuid local).

### Semántica de instantánea (importante)

- Aceptar un compartido de **entrada** copia el texto cifrado congelado en el vault personal del destinatario.
- Las ediciones posteriores a la entrada original del propietario **no** se envían a los destinatarios.
- **Revocar** detiene una aceptación pendiente; **no** elimina una copia ya importada en el dispositivo del destinatario.

Trata los compartidos como entregar una copia sellada, no un documento compartido en vivo. Prefiere **colecciones compartidas de org** cuando necesites acceso continuo del equipo al mismo texto cifrado bajo una clave de org compartida.

## Extensión

En modo independiente (servidor) la [extensión del navegador](./extension) puede listar/aceptar/revocar compartidos y listar organizaciones / colecciones compartidas. El modo puente de escritorio depende de la app desbloqueada para las operaciones del vault.

## Notas de seguridad

- Solo comparte con personas y dispositivos de confianza — los destinatarios que aceptan pueden descifrar lo que envolviste para ellos.
- Los nombres de org, las cargas de compartidos y los blobs de claves de identidad son opacos en el servidor ([Seguridad](./security)).
- Revocar el acceso en el servidor no borra las copias locales ya descifradas en otro dispositivo.
- Mantén copias Pro; compartir no sustituye materiales de recuperación sin conexión.

## API relacionada (autoalojadores)

Consulta el README de `openkey_server`: `/orgs`, `/invites/*`, `/shares`, más `POST /auth/lookup-public-key` para envolver claves por email.

Siguiente: [Usar la app](./app) · [Importar y exportar](./import-export) · [FAQ](./faq) · [Configuración del servidor](./server)
