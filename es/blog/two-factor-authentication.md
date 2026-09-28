---
title: Autenticación en dos pasos en un gestor de contraseñas
description: Qué son el 2FA y los códigos TOTP, cómo guardar las semillas del autenticador junto a los inicios de sesión que protegen y cómo los passkeys cambian el panorama.
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# Autenticación en dos pasos en un gestor de contraseñas

La **autenticación en dos pasos (2FA)** significa demostrar que eres tú con una segunda prueba, no solo con tu contraseña. La forma más común es el código rotativo de seis dígitos de una app de autenticación — **TOTP** — basado en una contraseña de un solo uso depende del tiempo, calculada a partir de una semilla compartida.

Lo incómodo es que la semilla y el código viven en una app *distinta* de la de tu contraseña. Este artículo explica la mecánica, por qué guardar las semillas en un gestor de contraseñas es la disposición sensata y cómo lo cambian los passkeys.

## Cómo funciona el 2FA

1. Cuando activas el 2FA en un sitio, te muestra un **secreto** — normalmente como un código QR que contiene una URI `otpauth://`.
2. Escaneas o pegas ese secreto en un autenticador.
3. Cada 30 segundos, el autenticador calcula un código de seis dígitos a partir del secreto más la hora actual: `HMAC(secret, floor(time/30))`.
4. El sitio calcula el mismo valor. Si coinciden, entras.

El código no vale nada un minuto después, y por eso funciona. Pero el *secreto* es de hecho una contraseña permanente: cualquiera que lo tenga puede generar códigos válidos para siempre.

## La decisión: app de autenticación, SMS o passkey

| Método | ¿Sujeto a phishing? | Impacto de una filtración del servidor | Notas |
|--------|----------------------|------------------------------------|-------|
| Código SMS | Sí | No | Vulnerable al SIM swap y a la reutilización de números; mejor que nada |
| App / código TOTP | Sí (robo de la semilla) | No | Funciona sin conexión; el secreto debe protegerse |
| Clave de hardware (FIDO2) | No | No | Lo más fuerte; necesita un segundo dispositivo o clave como respaldo |
| Passkey | No | No | Nada que escribir, nada que robar; mira abajo |

Las claves de hardware y las passkeys son las únicas opciones no sujetas a phishing, porque la credencial nunca sale de tu dispositivo y la firma está vinculada al origen solicitante.

## Por qué las semillas TOTP pertenecen a tu vault

El consejo habitual es «mantén tu app de autenticación separada de tu gestor de contraseñas», Partiendo de la teoría razonable de que una app comprometida no debería abrir todo. En la práctica eso crea un problema peor: la contraseña y su segundo factor acaban en sitios distintos, así que la recuperación de uno es imposible sin el otro, y la gente acaba reactivando el 2FA constantemente.

El encuadre mejor: trata la semilla TOTP como **parte de la credencial** y protécela con los mismos controles. Si tu vault se desbloquea con una contraseña maestra y, en ideal, con un dato biométrico, entonces la semilla no es más débil que la contraseña que protege — y siempre está donde la necesitas.

La mayoría de los gestores lo admite directamente: pega el secreto, pega una URI `otpauth://` o escanea el código QR directamente en la entrada.

En OpenKey, añade el secreto del autenticador o la URI `otpauth` a la entrada de inicio de sesión, o escanea el QR desde la pantalla de configuración de 2FA del sitio. Los códigos aparecen siempre que el vault está desbloqueado, y el proveedor de Autofill del sistema o la extensión del navegador pueden rellenarlos donde la plataforma lo admita. Desde la terminal, la CLI puede leerlos directamente:

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## Configurar el 2FA en una cuenta

1. Inicia sesión y abre los ajustes de seguridad del sitio.
2. Elige app de autenticación y **escanea el código QR** o introduce el secreto manualmente.
3. Guarda una copia de ese secreto en la misma entrada del vault que el nombre de usuario y la contraseña.
4. Introduce el código actual para confirmar.
5. Guarda los **códigos de recuperación** del sitio en un lugar que controles: una nota cifrada en el mismo vault, o una copia impresa guardada sin conexión.

El paso 3 es el que la gente se salta, y es el que te salva cuando más adelante cambies de teléfono.

## Imponerlo a toda una cuenta

Una vez que el 2FA está activo en varios inicios de sesión, trátalo como un valor por defecto:

- Guarda un **método de recuperación por sitio**, porque cada sitio lo gestiona de forma diferente.
- Prefiere **dos autenticadores** cuando el sitio lo permita: teléfono y escritorio, ambos alimentados desde el vault. Si pierdes un dispositivo, el otro sigue funcionando.
- Activa el **2FA en el correo primero**. Es la cuenta que restablece todas las demás.
- Busca una opción de clave de hardware o passkey, y añádela junto a TOTP en lugar de en lugar de este, hasta que estés seguro de que puedes recuperar el acceso.

## Dónde falla el 2FA

**Teléfono perdido sin respaldo.** Sin un segundo autenticador, un código de recuperación o una clave de hardware, la cuenta se pierde. Es el fallo de 2FA más común y la razón de que importen los códigos de recuperación.

**Semilla en una captura de pantalla.** Un código QR fotografiado es una credencial en texto plano. Guarda la semilla en tu vault y borra la imagen.

**Semilla en un archivo de notas sincronizado.** Las notas en la nube se sincronizan en texto plano. Si usas notas para material de recuperación, debe estar dentro del vault cifrado.

**Códigos rotativos escritos desde la app equivocada.** Algunos autenticadores te dejan reordenar cuentas, lo que hace que los códigos se introduzcan contra el sitio equivocado. No es un problema de seguridad, sino de soporte.

**Suponer que el 2FA hace segura la reutilización.** No lo hace. Si reutilizas una contraseña en dos sitios y solo uno tiene 2FA, el otro sigue a una filtración de distancia.

## Cómo cambian el 2FA los passkeys

Una passkey elimina el segundo factor en lugar de reforzarlo. La clave privada está protegida por el hardware seguro del dispositivo y solo es usable tras una comprobación biométrica o de PIN, así que el «algo que sabes» y el «algo que eres» se colapsan en una sola acción respaldada por hardware. No hay código que robar, ni semilla que filtrar, ni SIM que intercambiar.

Esta es la razón por la que los passkeys son la dirección hacia la que se movió la industria: son esa credencial rara que es a la vez más segura *y* menos trabajo. El motivo que queda para mantener el 2FA es la cobertura: los passkeys aún no están disponibles en todos los sitios, así que una semilla TOTP en tu vault es un puente razonable para los que aún no se han puesto al día.

[Más sobre cómo funcionan los passkeys](/es/blog/what-are-passkeys) · [cómo los gestiona OpenKey](/es/blog/passkeys-and-autofill)

## Qué dicen los datos de búsqueda

El 2FA es uno de los términos de consulta más grandes de la web en materia de seguridad. A nivel del término principal, «2fa» atrae aproximadamente el **67%** del interés de «password manager» — más que «passkey», con 42%, y que «password generator», con 36%.

Refinamientos que la gente añade a «two-factor authentication» (Google Trends, en todo el mundo, últimos 12 meses):

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

«what is two-factor authentication» es también el término de más rápido crecimiento del grupo, con alrededor de 550% interanual. Una consulta definicional que sube más rápido es una señal clara de que la audiencia es nueva — y por eso este artículo empieza por la mecánica y no por la recomendación.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de un minuto

Los códigos TOTP se calculan a partir de un secreto permanente compartido con el sitio, así que ese secreto es en realidad una contraseña y merece la misma protección. Guárdalo en la misma entrada cifrada del vault que el nombre de usuario y la contraseña, mantén un segundo autenticador, guarda los códigos de recuperación del sitio sin conexión, activa el 2FA primero en tu cuenta de correo y añade un passkey donde se ofrezca.

## Próximos pasos

- [¿Qué son las passkeys?](/es/blog/what-are-passkeys) — la credencial que sustituye a los códigos
- [Autocompletar contraseñas](/es/blog/autofill-passwords) — rellenar inicios de sesión y códigos a la vez
- [Usar la app](/es/guide/app) — añadir TOTP a una entrada
- [Guía de la CLI](/es/guide/cli#busqueda-en-secretos-e-inicios-de-sesion) — leer códigos desde la terminal
