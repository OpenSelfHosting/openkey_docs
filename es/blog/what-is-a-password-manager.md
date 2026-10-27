---
title: ¿Qué es un gestor de contraseñas?
description: Una guía en lenguaje claro sobre los gestores de contraseñas — qué almacenan, cómo cifran, qué tipos existen y cómo elegir uno sin confiarle tus contraseñas a un desconocido.
date: 2026-09-12
cover: /blog/covers/what-is-a-password-manager.png
---

# ¿Qué es un gestor de contraseñas?

Un **gestor de contraseñas** es un vault cifrado que recuerda por ti una única contraseña maestra fuerte y rellena todo lo demás. En lugar de reutilizar `Summer2019!` en doce sitios, generas una contraseña distinta de 20 caracteres para cada uno, y el gestor la almacena, la recupera y la escribe cuando la necesitas.

Esa es toda la idea. Todo lo demás —sync, compartición, passkeys, autocompletado, autoalojamiento— es la tubería que rodea ese único beneficio.

## Por qué la gente necesita uno

El problema es aritmético. Una buena contraseña humana es memorable, y memorable significa reutilizada. Los ataques de relleno de credenciales toman contraseñas filtradas de un sitio y las prueban contra miles de otros, así que una sola contraseña reutilizada puede costarte una cuenta sin relación alguna. La solución es una contraseña única por cuenta, que es exactamente lo que nadie está dispuesto a memorizar.

Un gestor de contraseñas elimina el paso de memorizar. Recuerdas un secreto; el vault guarda el resto.

## Qué almacena realmente un gestor de contraseñas

No solo contraseñas. Un vault moderno guarda una cantidad sorprendente:

| Elemento | Qué es |
|----------|--------|
| Inicio de sesión | URL, nombre de usuario, contraseña, notas, semilla TOTP |
| Tarjeta de pago | Número, caducidad, CVV, agrupación del emisor |
| Monedero cripto | Dirección, clave privada, frase semilla |
| Identidad | Nombre, dirección, teléfono, números de documento |
| Nota segura | Cualquier otra cosa que no pegarías en una app de chat |
| Passkey | Una credencial WebAuthn que sustituye la contraseña por completo |

**TOTP** merece mención aparte: los códigos de un solo uso basados en el tiempo para la autenticación en dos pasos pueden vivir en la misma entrada que la contraseña que protegen, de modo que un inicio de sesión y su código rotativo quedan juntos en lugar de repartidos entre dos apps.

## Las cuatro cosas que separan uno bueno de uno malo

### 1. El modelo de cifrado

Un gestor con reputación cifra tu vault en tu dispositivo con una clave derivada de tu contraseña maestra (OpenKey usa **Argon2id** para la derivación y **AES-256-GCM** para los datos del vault). La empresa que ejecuta el servidor no debería poder leer tus entradas: esa es la propiedad *zero-knowledge*. Si el proveedor puede restablecer tu contraseña maestra por ti, o guarda una clave maestra que podría usar para descifrar, no es zero-knowledge diga lo que diga el marketing.

### 2. Dónde viven los datos cifrados

Tres respuestas habituales, en orden creciente de control:

- **Nube del proveedor** — alguien más ejecuta los servidores. Lo más simple, y heredas su disponibilidad, su historial de brechas y su jurisdicción.
- **Nube del proveedor, autoalojable** — el mismo cliente, con servidor propio opcional.
- **Tu propio servidor** — tú ejecutas la API de sync. El servidor guarda texto cifrado y no puede leerlo.

En una instalación autoalojada como la de [OpenKey](/es/blog/zero-knowledge-sync), una base de datos de servidor robada es un montón de texto cifrado robado, no una lista de contraseñas robada.

### 3. La calidad del autocompletado

El autocompletado es donde un gestor de contraseñas se gana su puesto, porque es lo que tocas cincuenta veces al día. Busca una extensión del navegador, un proveedor a nivel de sistema para móvil y una vía para passkeys. La demanda de búsqueda lo refleja: «autofill» y sus refinamientos superan en varias veces a las consultas «password vault».

### 4. La postura de recuperación

Alguien tiene que poder decirte la verdad sobre qué ocurre si olvidas la contraseña maestra. Los diseños zero-knowledge no pueden: el servidor no guarda nada que sirva de ayuda. Un buen gestor lo dice sin rodeos, te da copias de seguridad locales cifradas que tú controlas y no finge que un agente de soporte pueda ayudarte. Consulta [contraseña maestra olvidada](/es/blog/forgot-master-password) para saber cómo evitar la situación por completo.

## Lo que un gestor de contraseñas no es

- **No es una copia de seguridad de tus cuentas.** Guarda credenciales; no restablece una cuenta de correo bloqueada.
- **No es 2FA automática.** Guardar una semilla TOTP no es lo mismo que proteger la cuenta con claves de hardware.
- **No es una licencia para reutilizar contraseñas.** Todo el valor está en la unicidad.
- **No es una razón para saltarte la contraseña maestra.** El vault es tan fuerte como la clave que lo abre.

## Cómo usar uno de verdad

1. **Elige una contraseña maestra fuerte.** La longitud gana a la complejidad. Una frase de contraseña de cuatro a seis palabras sin relación entre sí es más fuerte y más fácil de recordar que `P@ssw0rd!`.
2. **Activa el autocompletado** antes de importar nada, para que los inicios de sesión guardados empiecen a acumularse por sí solos.
3. **Importa lo que tienes.** [Exportar desde Chrome](/es/blog/import-passwords-from-chrome) tarda alrededor de un minuto.
4. **Genera, no inventes.** Usa el [generador integrado](/es/blog/strong-password-generator) para cada cuenta nueva.
5. **Arregla primero los peores casos** — banca, correo y tu cuenta social principal.
6. **Guarda los códigos junto a la cuenta.** Añade semillas TOTP a la misma entrada ([cómo funciona](/es/blog/two-factor-authentication)).
7. **Haz una copia de seguridad cifrada** y consérvala en algún sitio sin conexión.

## ¿Qué tipo deberías elegir?

| Si… | Mira |
|-----|------|
| Quieres cero configuración y no te importa quién ejecuta los servidores | Un gestor en la nube convencional |
| Quieres probar antes de comprometerte | Cualquiera con un nivel gratis de verdad — [el nivel gratis de OpenKey](/es/pricing#free-vs-openkey-pro) cubre vault, autocompletado, passkeys y sync autoalojada |
| Quieres tu sync en hardware que controlas | Un [gestor de contraseñas autoalojado](/es/blog/self-hosted-password-manager) |
| Estás dejando atrás un gran proveedor | Guías de migración desde [LastPass](/es/blog/lastpass-alternative) o [1Password](/es/blog/1password-alternative) |
| Estás dentro del ecosistema de Google | [Google Password Manager](/es/blog/google-password-manager) — y cuándo salir de él |
| Compartes con la familia | [Gestor de contraseñas para la familia](/es/blog/password-manager-for-family) |
| Compartes con compañeros de trabajo | [Gestor de contraseñas para equipos](/es/blog/password-manager-for-teams) |

## Qué busca la gente, y qué te dice

Los datos de búsqueda son un buen indicador de qué preguntas se hacen de verdad los principiantes. De Google Trends (en todo el mundo, últimos 12 meses), estos son los refinamientos que la gente añade con más frecuencia al término principal «password manager»:

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| google password manager | 100 |
| google password | 93 |
| **what is a password manager** | **39** |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| bitwarden | 7 |
| 1password | 4 |

Dos cosas saltan a la vista. Primera, la pregunta de seguimiento más común es exactamente la que responde este artículo: el término se plantea en inglés llano, lo que significa que la audiencia es nueva en la categoría. Segunda, dominan las consultas de marca: la mayoría llega al tema pensando ya «qué producto», no «qué es esto». El mismo conjunto de datos muestra «what is a password manager» como el refinamiento *informativo* que más crece, alrededor de 1,050% interanual, mientras que términos de presencia de marca como «nord password manager» subieron cerca de 850%.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Las cifras son interés relativo normalizado (0–100), no volúmenes de búsqueda mensuales. Las cifras al alza son crecimiento respecto al período anterior equivalente.

## La versión de un minuto

Un gestor de contraseñas es un vault cifrado al que se llega con una única contraseña maestra fuerte, de modo que cada cuenta puede tener una contraseña única que nunca tendrás que recordar. Lo que importa es si el proveedor puede leer tus datos (no debería), dónde viven los datos cifrados, si el autocompletado funciona de verdad en tus dispositivos y qué pasa si olvidas la contraseña maestra. Elige uno, activa el autocompletado, importa y luego genera hasta salir de la reutilización.

## A dónde ir después

- [Mejores gestores de contraseñas](/es/blog/best-password-managers) — cómo comparar opciones
- [Autocompletar contraseñas](/es/blog/autofill-passwords) — configúralo bien
- [Generador de contraseñas fuertes](/es/blog/strong-password-generator) — deja de inventar contraseñas
- [Modelo de seguridad](/es/guide/security) — derivación de claves y límites de la amenaza
- [Usar la app](/es/guide/app) — el vault de OpenKey en la práctica
