---
title: "El autocompletado no funciona: arreglos que sí funcionan"
description: Por qué el autocompletado de contraseñas deja de funcionar en Chrome, Firefox, Safari y en móvil — las cinco causas habituales y sus arreglos, por orden de probabilidad.
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# El autocompletado no funciona: arreglos que sí funcionan

El autocompletado se rompe de un puñado de formas predecibles. En la práctica la causa casi nunca es un error: es un vault bloqueado, el proveedor equivocado seleccionado, un puente que dejó de conectar, una app que necesita reiniciarse o un navegador que ha empezado en silencio a rellenar desde otro sitio.

Recórrelas en orden de probabilidad. Lleva unos cinco minutos y resuelve la enorme mayoría de los casos.

## Arreglo 1: Desbloquea el vault

La causa más común con diferencia, y la más fácil de pasar por alto, porque la app *parece* instalada y activada.

- **Extensión en modo standalone:** abre el popup de la extensión y desbloquéala. Una extensión bloqueada no puede descifrar nada, así que no ofrece nada.
- **Modo puente de escritorio:** la app de escritorio debe estar desbloqueada. El puente se niega a trabajar mientras el vault está bloqueado, por diseño.
- **Móvil:** abre la app y desbloquéala antes de enfocar el campo. Bloquear en inactividad también pausa el autocompletado.

Si las sugerencias aparecen solo justo después de desbloquear y luego desaparecen, esta es tu respuesta.

## Arreglo 2: Comprueba el proveedor del sistema

Cambiar de gestor de contraseñas no siempre cambia lo que ofrece el SO.

| Plataforma | Dónde comprobar |
|------------|-----------------|
| Android | Ajustes → Seguridad → **Autofill service** |
| iOS / iPadOS | Ajustes → Contraseñas → **AutoFill Passwords** |
| macOS | Ajustes del Sistema → General → **AutoFill & Passwords** |
| Windows | Ajustes → Cuentas → **Contraseñas** (proveedores de credenciales) |
| Chrome | Ajustes → Passwords, passkeys and autofill → **Password manager** |

Si hay dos gestores activados, el SO elige uno y el otro parece roto. Desactiva el que no quieras, o elige deliberadamente el que sí — y confirma la misma elección en el navegador.

## Arreglo 3: Reinicia la app o el navegador de destino

Cambiar un proveedor de credenciales no siempre surte efecto en un proceso que ya está en marcha. Es rutina, no un error:

- Móvil: fuerza el cierre de la app en la que intentas autocompletar y vuelve a abrirla.
- Escritorio: cierra el navegador por completo (no solo la ventana) y vuelve a abrirlo.
- Si el problema es el navegador, reinícialo antes de cambiar nada más — recargar la extensión suele volver a registrar el anfitrión nativo.

## Arreglo 4: Reconecta el puente de escritorio

El autocompletado de escritorio es un apretón de manos en dos partes: la app registra un anfitrión de mensajería nativa, y la extensión habla con él por un socket local. Falla cuando el registro del anfitrión falta o está obsoleto.

1. Desbloquea la app de escritorio de OpenKey.
2. Abre **Ajustes → Seguridad** y cambia Autofill — esto (re)registra el anfitrión de mensajería nativa.
3. En navegadores Chromium, escribe el ID de tu extensión desempaquetada en el archivo de la plataforma y luego cambia Autofill otra vez para que el manifiesto se regenere:

| Plataforma | Archivo de ID de extensión |
|------------|----------------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. En la extensión, elige **Use desktop app**.
5. Solo en macOS: confirma que Python 3 está en tu `PATH` — el script anfitrión lo requiere.

Asegúrate también de que el vault siga **desbloqueado** cuando hagas la prueba. El socket del puente solo existe durante una sesión desbloqueada.

## Arreglo 5: Busca un gestor competidor

Chrome y Edge incluyen almacenamiento de contraseñas integrado, y ambos seguirán rellenando por su cuenta con gusto. Si las sugerencias «desaparecen» y las credenciales se rellenan igualmente, el gestor integrado es el que lo hace.

- Desactiva el inicio de sesión automático con las contraseñas guardadas en los ajustes del navegador, o
- Borra la entrada integrada y deja que tu gestor sea el dueño del inicio de sesión.

El mismo conflicto aparece entre iCloud Keychain y un proveedor de AutoFill de terceros, y entre dos extensiones que ambas piden `<all_urls>`.

## Causas específicas de cada plataforma

### Chrome

Acceso de la extensión a sitios: `chrome://extensions` → tu extensión → **Detalles** → Acceso al sitio → *En todos los sitios*, o *Al hacer clic* si prefieres permisos explícitos. El autocompletado necesita acceso a la página para detectar campos.

Si otra extensión reclamó el atajo de relleno, reasígnalo en `chrome://extensions/shortcuts`.

### Firefox

Firefox pide permiso la primera vez que una extensión quiere rellenar en un sitio, y rechaza en silencio algunas peticiones de todos los sitios. Comprueba los permisos de la extensión en `about:addons` → Permisos → Acceder a tus datos en todos los sitios web.

Firefox usa el anfitrión nativo `openkey@openselfhosting.local` automáticamente; no hace falta ningún trabajo manual con manifiestos en esa plataforma.

### Safari

El AutoFill de Safari y tu gestor son paneles separados. Activa el gestor en Ajustes del Sistema y luego asegúrate de que el autocompletado de **Passwords** está activado en Safari. Safari también puede autocompletar con un proveedor de credenciales *distinto* si cambió el orden en los ajustes del sistema: verifica el orden de selección, no solo el interruptor.

### iOS y Android

- **Estado por app:** iOS solo ofrece proveedores en el menú de un campo, así que el síntoma es «la opción no está» en lugar de «rellenó otra cosa».
- **Avisos de permiso:** el SO pide permisos de red local o biometría durante la configuración. Un aviso denegado parece un gestor roto.
- **Biometría antes de rellenar:** si activaste biometría antes del relleno, cada relleno necesita ahora una aprobación. Es el comportamiento correcto, no un fallo.
- **Restricciones en segundo plano:** los optimizadores de batería agresivos en Android pueden matar el proceso del proveedor, así que las sugerencias solo aparecen con la app en primer plano.

## Diagnosticar con la auditoría de autocompletado del navegador

Los navegadores incluyen un diagnóstico que informa de cada campo que vio, cada sugerencia que ofreció y por qué se rechazó. Convierte las suposiciones en un proceso de dos minutos.

En Chrome, abre DevTools → **Application** → **Autofill**, y luego reproduce el relleno en la página. Obtienes los campos detectados, los elementos del desplegable ofrecidos y el motivo de cualquier supresión. `autofill.creditCards` y `autofill.profiles` también se pueden activar en `chrome://flags` cuando la parte que falla es el autocompletado de tarjetas o direcciones.

Firefox: `about:debugging` → inspecciona la extensión y revisa su consola para buscar errores en el momento del relleno.

## Si usas OpenKey en concreto

| Síntoma | Comprueba |
|---------|-----------|
| No hay sugerencias en el navegador | Extensión desbloqueada, o app de escritorio desbloqueada y **Use desktop app** seleccionado |
| «La extensión no puede hablar con la app de escritorio» | Registro del anfitrión nativo, archivo de ID de extensión, Python 3 en macOS |
| Nada en Android | **Ajustes → Seguridad → Autofill** activado en Android y luego desbloquea la app |
| Nada en iOS | Proveedor de AutoFill activado en los ajustes del sistema; reinicia la app de destino |
| Las passkeys recurren al navegador | Lo esperado si eliges **Use browser**, o cuando el vault de la extensión está bloqueado |
| Rellenar funciona, guardar no | Comprueba que el banner de guardado dentro de la página no esté siendo bloqueado por la página |

La extensión necesita acceso de anfitrión `<all_urls>` para detectar campos, capturar inicios de sesión e interceptar WebAuthn en sitios arbitrarios: una lista blanca fija no puede cubrir la web abierta. Todo lo que descifra se queda en tu dispositivo o en tu propio servidor; el contenido de las páginas no se envía a ninguna nube de proveedor.

## Qué dicen los datos de búsqueda

Este es un grupo de consultas grande, lo cual es buena señal para cualquiera que se haya topado con él. Comparando entre sí términos de cola larga de solución de problemas de autocompletado (Google Trends, en todo el mundo, últimos 12 meses):

| Consulta | Interés relativo en el grupo |
|----------|------------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

Que «autofill not working» alcance más de la mitad del interés del término genérico «autofill extension» significa que una audiencia enorme llega ya con el problema. Bajo el grupo de Chrome en concreto, «google chrome autofill settings» es la consulta relacionada principal con 100 y la que más crece, con cerca de +70% interanual, mientras que «chrome autofill extension» está en 62 y «chrome autofill not working» en 16.

Esa distribución sugiere una estrategia de soporte concreta: el contenido orientado a ajustes y una lista de solución de problemas fiable llegan a más gente que otro anuncio de función.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de 30 segundos

Desbloquea el vault. Confirma que el proveedor del sistema correcto está seleccionado. Reinicia la app o el navegador. Cambia Autofill en la app para volver a registrar el anfitrión nativo. Desactiva cualquier gestor competidor. Si sigue fallando, abre la auditoría de autocompletado del navegador y lee el motivo del rechazo — nombra el problema.

## Próximos pasos

- [Autocompletar contraseñas](/es/blog/autofill-passwords) — la guía de configuración
- [Extensión del navegador](/es/guide/extension) — detalle de modos de desbloqueo y mensajería nativa
- [FAQ y solución de problemas](/es/guide/faq) — arreglos específicos de OpenKey
- [¿Qué son las passkeys?](/es/blog/what-are-passkeys) — el tipo de credencial que sustituye a las contraseñas
