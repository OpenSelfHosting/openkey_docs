---
title: ¿Qué son las passkeys?
description: Una guía en lenguaje claro sobre las passkeys — cómo funciona WebAuthn, por qué no se pueden usar para phishing, cómo crear y usar una y qué pasa con tu gestor de contraseñas.
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# ¿Qué son las passkeys?

Una **passkey** es una credencial de inicio de sesión formada por un par de claves criptográficas en lugar de una cadena de caracteres. La mitad privada permanece cifrada en tu dispositivo, detrás del mismo desbloqueo (dato biométrico, bloqueo de pantalla o contraseña maestra) que ya usas. El sitio solo guarda la mitad pública, que no sirve para iniciar sesión como tú.

El resultado práctico: no hay contraseña que escribir, nada que suplantar con phishing, nada que un sitio filtrado pueda entregar a un atacante y ningún flujo de restablecimiento que alguien pueda manipular con ingeniería social.

## El problema que tienen las contraseñas

Cada inicio de sesión que has hecho nunca es un secreto compartido. Tú y el sitio guardáis la misma cadena, y eso crea tres modos de fallo:

- **Phishing.** Una copia convincente de la página de inicio de sesión cosecha la cadena, porque la cadena funciona tanto en el sitio real como en el falso.
- **Relleno de credenciales.** Una cadena filtrada de un sitio se reutiliza contra todas las demás cuentas tuyas que la repiten.
- **Filtración del servidor.** Los sitios que guardan contraseñas legibles entregan credenciales funcionales a los atacantes en cuanto son filtrados.

Las passkeys eliminan el secreto compartido. El sitio nunca ve nada reutilizable.

## Cómo funciona una passkey

Registro, la primera vez que inicias sesión:

1. Tu dispositivo genera un **par de claves** — una clave privada y una clave pública.
2. La clave pública se envía al sitio y se guarda en su base de datos de usuarios.
3. La clave privada se queda en tu dispositivo, cifrada, y solo es usable tras desbloquear.

Inicio de sesión, todas las veces posteriores:

1. El sitio emite un **desafío**.
2. Tu dispositivo lo firma con la clave privada.
3. El sitio verifica la firma contra la clave pública que guardó.

No hay secreto compartido en ninguno de los dos pasos. Un sitio falso no puede usarse, porque el desafío viene del sitio real y tu dispositivo solo firma para el origen con el que se registró. Esa es la propiedad anti-phishing, y viene del protocolo, no de la vigilancia del usuario.

Por debajo, esto es **WebAuthn** (ahora llamado passkeys), con la credencial normalmente en un autenticador de hardware **FIDO2**: el elemento seguro de tu dispositivo, un autenticador de plataforma o una clave de seguridad USB/NFC.

## Crear una passkey

El flujo es casi el mismo en todas partes, y tu gestor de contraseñas aporta la credencial:

1. En la página de inicio de sesión del sitio, elige **Sign in with a passkey** (o **Create a passkey** si aún no tienes cuenta).
2. Tu proveedor muestra un diálogo de confirmación con el nombre del sitio y de la cuenta.
3. Aprueba con Face ID, Touch ID, huella o el PIN de tu dispositivo.
4. Listo. La passkey queda guardada en tu vault y vinculada a ese sitio.

Si el diálogo ofrece una opción «Use browser» o «Use this device instead», aceptarla entrega la credencial al autenticador de plataforma en lugar de a tu gestor: útil para una vez, pero significa que la passkey ya no está en tu vault.

## Usar una passkey en el día a día

El inicio de sesión no cambia, solo lo que ocurre por debajo:

1. Enfoca el campo de nombre de usuario y haz clic en **Sign in with a passkey**.
2. Aprueba el aviso.
3. El sitio valida la firma. Ya estás dentro.

Sin escribir, sin búfer de pegado, sin aviso de segundo factor — el desbloqueo *es* el segundo factor. Como tu dispositivo muestra el sitio solicitante en el diálogo de aprobación, un atacante no puede redirigirlo en silencio.

## Eliminar y transferir passkeys

- **Eliminar:** abre los ajustes de seguridad de la cuenta en el sitio y borra allí la passkey, o quítala de tu proveedor. Borrarla en un sitio deja intacta la otra copia, así que quítala de ambos si quieres que desaparezca.
- **Transferir:** una passkey sincronizada a través de una cuenta de plataforma (iCloud Keychain, Google Password Manager) se mueve con esa cuenta. Una passkey guardada en un vault autoalojado se mueve cuando sincronizas, o cuando la importas a un gestor nuevo.

Si pierdes todos los dispositivos que guardan una passkey *y* no tienes ninguna vía de recuperación, la cuenta es irrecuperable. Mantén al menos una passkey registrada en un segundo dispositivo o en una clave de seguridad.

## Passkeys y gestores de contraseñas

Las passkeys no sustituyen a tu gestor de contraseñas: lo mueven del trabajo más débil al más fuerte.

| Trabajo | Antes | Después |
|--------|-------|---------|
| Recordar la contraseña | Una cadena en tu cabeza, reutilizada | Un par de claves en tu vault |
| Resistencia al phishing | Comprobación manual del dominio | Criptográfica, integrada |
| Segundo factor | Un código rotativo | El propio desbloqueo del dispositivo |
| Impacto de una filtración | Credenciales legibles en la base de datos del sitio | Una clave pública, inútil para un atacante |

El gestor sigue guardando la clave privada de la passkey, sigue condicionando el acceso al desbloqueo de tu vault y sigue sincronizando. Lo que cambia es que el secreto guardado ya no es una cadena memorizable — y eso elimina la razón entera por la que las contraseñas se reutilizaban.

En OpenKey la extensión intercepta las llamadas `create` y `get` de WebAuthn, guarda credenciales ES256 y recurre al autenticador de plataforma cuando tú lo prefieres. La vía del proveedor a nivel de sistema cubre apps y navegadores que hablan con la UI de credenciales del SO. Ambas se ejecutan tras el desbloqueo, en el cliente. [Cómo funciona en OpenKey](/es/blog/passkeys-and-autofill).

## ¿Ya funcionan las passkeys en todas partes?

Casi en todas partes, con algunos huecos persistentes: ciertas instalaciones de inicio de sesión único empresarial, ciertos WebViews de apps móviles antiguas y un puñado de sitios que implementaron WebAuthn pero no la sincronización de passkeys. Un enfoque práctico es mantener las contraseñas como alternativa en tu gestor mientras un sitio ofrezca ambas cosas — y preferir la passkey cuando la ofrezca.

## Qué dicen los datos de búsqueda

El interés por las passkeys es grande y sigue subiendo, y las consultas son casi en su totalidad preguntas de principiante. Google Trends (en todo el mundo, últimos 12 meses), refinamientos de «passkey»:

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

«what is a passkey» y «what is passkey» son las dos consultas más fuertes del grupo, y «what is a passkey» sube alrededor de 450% interanual. Esa es la forma de una tecnología que cruza el paso de la comunidad de aficionados a la audiencia general: casi nadie busca todavía la *gestión* de passkeys, y la mayoría busca una definición.

A nivel del término principal, «passkey» atrae cerca del 42% del interés de búsqueda de «password manager», y «2fa» cerca del 67% — ambos considerables, y ambos convergiendo en el mismo trabajo.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de un minuto

Una passkey es un par de claves en el que la mitad privada vive cifrada en tu dispositivo y el sitio solo guarda la mitad pública. Como no hay secreto compartido, un sitio falso no puede coleccionar nada reutilizable, y el desbloqueo de tu dispositivo se convierte en el segundo factor. Crea una desde la página de inicio de sesión de un sitio, apruébala con Face ID o el PIN de tu dispositivo, y la próxima vez entra con un toque y una firma.

## Próximos pasos

- [Passkeys y autocompletado en el navegador](/es/blog/passkeys-and-autofill) — la implementación de OpenKey
- [¿Qué es un gestor de contraseñas?](/es/blog/what-is-a-password-manager) — dónde viven las passkeys
- [Extensión del navegador](/es/guide/extension) — configuración de WebAuthn y comportamiento de reserva
- [Autenticación en dos pasos](/es/blog/two-factor-authentication) — lo que sustituyen las passkeys
