# Política de privacidad

**Última actualización:** 6 de agosto de 2026  
**Producto:** OpenKey (`com.openselfhosting.openkey`)  
**Editor:** OpenSelfHosting  
**Contacto:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · Seguridad: [security@openselfhosting.com](mailto:security@openselfhosting.com)

Esta Política de privacidad describe cómo la app móvil y de escritorio **OpenKey** trata la información. OpenKey está diseñado como gestor de contraseñas **zero-knowledge**: los secretos del vault se cifran en tu dispositivo antes de salir de él.

Lectura relacionada: [Seguridad](/es/guide/security) · [Términos de servicio](/es/terms)

## Resumen

| Tema | Práctica |
|-------|----------|
| Contraseña maestra | Nunca sale de tu dispositivo en texto plano |
| Contenido del vault | Cifrado en el dispositivo (AES-256-GCM); la sync opcional envía **solo texto cifrado** |
| Nuestra nube | OpenKey **no** opera una nube de vault obligatoria del proveedor para tus contraseñas |
| Servidor autoalojado | Si conectas uno, **tú** (o tu organización) lo opera y controlas esos datos |
| Facturación de tienda | Las compras Pro pasan por la facturación de Apple / Google / Microsoft donde esté disponible |

## A quién aplica

Esta política aplica a la **app** oficial OpenKey (Android, iOS, macOS, Windows, Linux y builds web del mismo producto). Los paquetes separados (servidor autoalojado, extensión del navegador, CLI, sitio de documentación) siguen los mismos principios zero-knowledge; quien opera un servidor autoalojado es el responsable de los datos operativos de esa instancia (ver abajo).

## Información que no recopilamos

OpenSelfHosting **no** recibe tu:

- Contraseña maestra
- Clave del vault en texto plano
- Inicios de sesión, notas, secretos TOTP, tarjetas de pago, datos de carteras cripto, secretos de desarrollador o contenido de adjuntos descifrados
- HTML completo de páginas que visitas (la extensión del navegador no exfiltra páginas a una nube del proveedor)

No vendemos datos personales.

## Información procesada en tu dispositivo

OpenKey almacena y procesa **localmente** en tu dispositivo lo siguiente (cifrado en reposo tras configurar el desbloqueo):

- Base de datos del vault (colecciones, entradas, metadatos/blobs de adjuntos como texto cifrado cuando está bloqueado/sincronizado)
- Ajustes de la app (apariencia, idioma, preferencias de autofill, URL del servidor que introduces, preferencias de Nearby)
- Envoltorio biométrico opcional del material de desbloqueo (gestionado por el enclave seguro / keystore del SO cuando esté disponible)
- Tokens de sync en caché para un servidor que **tú** configuras (JWT de acceso / material de actualización almacenado por la app para ese host)

Eliminar la app o borrar el dispositivo quita los datos locales según las copias de seguridad del SO que controles.

## Servidor de sync autoalojado opcional

Si activas **Ajustes → Datos → Servidor autoalojado**, la app envía a **tu** API (o la que elijas):

- Correo electrónico (identificador de cuenta)
- `auth_hash` derivado del cliente (no la contraseña maestra)
- Sal y parámetros KDF
- Clave del vault envuelta (cifrada) y texto cifrado opaco de ítems del vault, adjuntos, orgs y comparticiones

El servidor de referencia del proyecto OpenKey está diseñado para almacenar **solo texto cifrado**. Quien ejecute ese servidor (tú, tu empresa o un host de confianza) puede ver metadatos como correo, tamaños de texto cifrado y marcas de tiempo, y puede borrar o retener datos — pero no puede descifrar el contenido del vault por diseño. Ver [Seguridad](/es/guide/security).

## Sync Nearby en LAN (Pro)

Nearby empareja dispositivos en tu red local y, tras **Vincular vault**, sincroniza el texto cifrado del vault entre esos dispositivos. El emparejamiento y el intercambio de la clave del vault ocurren en tu LAN entre los dispositivos que elijas. OpenSelfHosting no recibe el tráfico de Nearby.


## Autofill, passkeys y extensión del navegador

- **Autofill del sistema / Proveedor de credenciales** comparte credenciales con apps y sitios solo mediante flujos de relleno mediados por el SO que inicies o apruebes.
- La **extensión del navegador** puede desbloquear contra tu servidor o rellenar mediante la app de escritorio desbloqueada (mensajería nativa). Rellenar y guardar son acciones intencionadas del usuario. Ver [Extensión del navegador](/es/guide/extension).

## Compras y suscripciones (OpenKey Pro)

Donde Pro se vende por una tienda de apps, el procesamiento de pagos, recibos y datos de cuenta relacionados los gestionan **Apple, Google o Microsoft** bajo sus políticas. OpenKey puede recibir derechos de tienda / estado de compra necesarios para desbloquear funciones Pro. No recibimos tu número completo de tarjeta de pago de esas tiendas.

La certificación **LAN Pro** entre pares Nearby es una comodidad local en algunas plataformas de escritorio — no una cuenta de facturación en la nube con OpenSelfHosting.

## Diagnóstico y soporte

OpenKey no incluye un SDK de analítica de terceros obligatorio que suba contenido del vault. Si escribes a soporte ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) o a canales comunitarios de Telegram, eliges qué incluir (por ejemplo la versión de la app). No envíes contraseñas maestras ni exportaciones del vault en correo en texto claro.

## Privacidad de menores

OpenKey no está dirigido a menores de 13 años (o la edad mínima exigida en tu jurisdicción). No uses la app si estás por debajo de esa edad.

## Tratamiento internacional

El procesamiento ocurre en tus dispositivos y, si configuras sync, en el host del servidor que elijas. Si nos contactas, los mensajes pueden procesarse en las regiones donde operen nuestro correo o herramientas de soporte.

## Conservación

- **En el dispositivo:** hasta que borres el vault, desinstales la app o borres el dispositivo / copias de seguridad.
- **En tu servidor de sync:** hasta que borres tu cuenta de servidor o el operador borre los datos; pueden quedar tombstones hasta que los pares sincronicen.
- **Correo de soporte:** conservado según sea necesario para responder y con fines legítimos de seguridad/legal.

## Tus opciones

- Usar OpenKey totalmente sin conexión sin servidor
- Aceptar o rechazar el emparejamiento Nearby
- Exportar o borrar datos locales (exportar / copia de seguridad puede requerir Pro)
- Borrar una cuenta de servidor mediante el flujo de borrado autenticado (elimina el texto cifrado del servidor; las copias locales permanecen hasta que las borres)
- Revocar suscripciones de tienda mediante la gestión de suscripciones de la tienda

## Cambios

Podemos actualizar esta política a medida que cambie el producto. Cambiará la fecha de «Última actualización»; los cambios materiales también pueden anotarse en el [changelog](/es/guide/changelog) o en enlaces Acerca de en la app.

## Contacto

- Producto / soporte: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Informes de seguridad: [security@openselfhosting.com](mailto:security@openselfhosting.com) — ver [Informar vulnerabilidades](/es/guide/security#reporting-vulnerabilities)
- Organización: [OpenSelfHosting](https://github.com/OpenSelfHosting) · Producto: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Empresa: [openselfhosting.com](https://openselfhosting.com)

Siguiente: [Términos de servicio](/es/terms) · [Seguridad](/es/guide/security) · [Usar la app](/es/guide/app)
