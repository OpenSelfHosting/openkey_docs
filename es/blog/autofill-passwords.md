---
title: "Autocompletar contraseñas: cómo configurarlo y arreglarlo"
description: Qué es el autocompletado, cómo activar el autocompletado de contraseñas en Chrome, Firefox, Safari y en móvil, y cómo OpenKey rellena inicios de sesión, tarjetas y passkeys.
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autocompletar contraseñas: cómo configurarlo y arreglarlo

El **autocompletado** es la función que convierte un gestor de contraseñas de un sitio donde se guardan contraseñas en una herramienta que de verdad usas. En lugar de abrir el vault, buscar la entrada correcta y copiar una cadena, enfocas un campo de nombre de usuario y aparece una sugerencia.

Aquí es donde la mayoría busca por primera vez — «how to autofill», «autofill password», «autofill chrome», «autofill iphone» — y donde la mayoría se rinde por primera vez. Así que: qué es, cómo activarlo en todas partes y cómo volverlo fiable.

## Qué hace realmente el autocompletado

Tres mecanismos distintos comparten el nombre:

1. **Autocompletado de formularios** — se detecta una página de inicio de sesión, el gestor ofrece entradas coincidentes, tocas una y se rellenan nombre de usuario y contraseña.
2. **Avisos de guardado** — después de iniciar sesión, el gestor ofrece guardar o actualizar las credenciales.
3. **Generación de contraseñas** — en un formulario de registro, el gestor puede crear una contraseña fuerte y escribirla en el campo mientras escribes.

El tercero es la parte infravalorada. Generar una contraseña *durante* el registro es el mejor cambio de hábito disponible: elimina el momento en el que inventarías algo débil, porque el campo ya está relleno antes de que puedas sobrescribirlo.

## Activar el autocompletado en Chrome

El gestor integrado de Chrome y un gestor de terceros viven en el mismo sitio, y por eso esto se confunde.

1. Abre `chrome://settings/addresses` (contraseñas y autocompletado).
2. Activa **Offer to save passwords**.
3. Activa **Automatically sign in with saved passwords**, si quieres inicio de sesión con un toque.
4. En **Passwords, passkeys and autofill**, elige el gestor que quieras usar: el integrado de Chrome o la extensión de tu gestor de contraseñas.
5. Si usas una extensión, abre su popup una vez y confirma que está desbloqueada.

Rellenar con el teclado suele funcionar también: `Ctrl+Shift+L` en Windows y Linux, `⌘⇧L` en macOS. Si otra extensión ya reclamó ese atajo, reasígnalo en los atajos de teclado de extensiones del navegador.

## Autocompletado en Firefox

Firefox tiene su propio gestor integrado y es más estricto sobre qué extensiones pueden rellenar. Si no aparecen sugerencias, comprueba que la extensión esté permitida en ese sitio y que esté desbloqueada. Firefox usa `openkey@openselfhosting.local` como anfitrión de mensajería nativa de forma automática — sin editar manifiestos a mano en esa plataforma.

## Autocompletado en iPhone y iPad

iOS no tiene un interruptor global de «rellenar desde cualquier app» como Android. Usas **AutoFill Passwords** en un flujo por app:

1. Instala tu gestor de contraseñas y actívalo como proveedor de AutoFill en los ajustes del sistema.
2. En la app en la que estás iniciando sesión, toca el campo de nombre de usuario o contraseña y elige tu proveedor en el menú del campo (o en la fila de contraseñas del teclado).
3. Aprueba con Face ID / Touch ID cuando te lo pida.

Dos hábitos de iOS que conviene conocer: si OpenKey no aparece en la lista de proveedores, es que no se ha activado en los ajustes del sistema, e iOS a veces necesita que reinicies la app de destino después de cambiar de proveedor. Las [passkeys](/es/blog/what-are-passkeys) también pasan por el mismo selector de AutoFill, así que la misma configuración cubre ambas cosas.

## Autocompletado en Android

Android expone un proveedor real de contraseñas y passkeys para todo el sistema, lo que la convierte en la plataforma móvil más fluida:

1. Abre **Ajustes → Seguridad → Autofill service** y elige tu gestor.
2. Acepta los avisos de permiso.
3. En los ajustes de tu gestor, elige **inline suggestions** o un **popup** y, si quieres, exige un dato biométrico antes de cada relleno.
4. Confirma con un inicio de sesión de prueba en un sitio para el que ya tengas credenciales.

Exigir biometría antes de rellenar es una mejora con peso: cierra el agujero de «alguien se acerca a tu teléfono desbloqueado y lee las contraseñas de tu correo» sin volver el autocompletado molesto.

## Autocompletado en apps de escritorio

El autocompletado de escritorio es un apretón de manos en dos partes. La app registra un **anfitrión de mensajería nativa** cuando activas su ajuste de Autofill, y la extensión del navegador habla después con la app desbloqueada a través de un socket local. En macOS, el script anfitrión necesita Python 3 en tu `PATH`; en Linux y Windows la app escribe los manifiestos por ti cuando cambias el ajuste.

Si la extensión no llega a la app, la causa casi siempre es ese apretón de manos — consulta [el autocompletado no funciona](/es/blog/autofill-not-working) para la lista completa.

## Configurar el autocompletado de OpenKey

| Plataforma | Pasos |
|------------|-------|
| Android | **Ajustes → Seguridad** → activa OpenKey como proveedor del sistema → desbloquea el vault |
| iOS / macOS | Activa OpenKey en los ajustes de AutoFill del sistema → acepta los avisos del SO → reinicia la app de destino |
| Windows / Linux | **Ajustes → Seguridad** → activa Autofill para registrar el anfitrión nativo |
| Navegador | Compila y carga `openkey_extension` → define la URL del servidor, o elige **Use desktop app** |

Hay dos modos de desbloqueo disponibles. **Standalone** desbloquea la extensión contra tu servidor autoalojado con tu email y tu contraseña maestra. **Desktop bridge** rellena a través de la app ya desbloqueada, sin un desbloqueo aparte de la extensión — normalmente la experiencia diaria más agradable, porque la app es el único sitio donde desbloqueas.

Guía completa: [Extensión del navegador](/es/guide/extension).

## Por qué el autocompletado también es una función de seguridad

El autocompletado no es solo comodidad: es un control.

- **Resistencia al phishing.** Un gestor que asocia un inicio de sesión al origen exacto para el que se guardó no ofrecerá nada en un dominio parecido. Pegar una contraseña a mano en una copia convincente de tu banco es exactamente el ataque que el autocompletado evita.
- **Menos copias en texto plano.** Sin app del gestor, sin entrada en el historial del portapapeles, sin contraseña olvidada en un archivo de notas.
- **Rotación natural.** Cuando un sitio pide una contraseña nueva, generar una en línea convierte las contraseñas únicas en el camino de menor resistencia.

## Autocompletado y passkeys

Las passkeys eliminan el campo de contraseña por completo, así que no hay nada que rellenar: la credencial se recupera del vault y se firma en el momento. El mismo desbloqueo que usas para el autocompletado cubre WebAuthn, y por eso configurar el proveedor una vez hace ambos trabajos. [¿Qué son las passkeys?](/es/blog/what-are-passkeys)

## Qué dicen los datos de búsqueda

El autocompletado es un grupo de consultas grande y con mucha intención. De Google Trends (en todo el mundo, últimos 12 meses), estos son los refinamientos que la gente añade a «autofill»:

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

Léelo como un embudo: la gente llega sin saber qué es el autocompletado, aterriza en una plataforma concreta y luego se atasca en los ajustes. Y dentro del grupo de *solución de problemas* —un conjunto de términos de cola larga comparados entre sí— «autofill not working» tiene aproximadamente **55%** de la popularidad de «autofill extension», lo que representa una población muy numerosa de personas cuyo autocompletado se rompió y que necesitan un arreglo más que un tutorial.

Los mismos datos muestran «google chrome autofill settings» como el refinamiento de más rápido crecimiento bajo el grupo de Chrome, con cerca de 70% interanual.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## Si el autocompletado no funciona

Nueve de cada diez casos son una de cinco cosas: el vault está bloqueado, el proveedor seleccionado en los ajustes del sistema no es el correcto, la extensión no está conectada con la app, el navegador necesita reiniciarse tras un cambio de proveedor, o el autocompletado está restringido deliberadamente a un solo navegador. Recorre [el autocompletado no funciona](/es/blog/autofill-not-working) para la versión paso a paso.

## Próximos pasos

- [El autocompletado no funciona](/es/blog/autofill-not-working) — la lista completa de solución de problemas
- [Extensión del navegador](/es/guide/extension) — instalación, modos de desbloqueo, mensajería nativa
- [¿Qué son las passkeys?](/es/blog/what-are-passkeys) — el siguiente paso cuando el autocompletado funciona
- [Usar la app](/es/guide/app) — Autofill y ajustes del navegador en contexto
