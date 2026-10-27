---
title: "Generador de contraseñas fuertes: deja de inventar contraseñas"
description: Por qué las contraseñas inventadas a mano son débiles, cómo generar contraseñas que realmente resistan el descifrado y cómo comprobar y arreglar las débiles que ya tienes.
date: 2026-09-18
cover: /blog/covers/strong-password-generator.png
---

# Generador de contraseñas fuertes: deja de inventar contraseñas

La invención humana de contraseñas es un problema resuelto con una mala respuesta. Casi todo el mundo usa la misma construcción —una palabra, una mayúscula, el año, `!`— y esa construcción es exactamente lo que asumen las herramientas de descifrado. Un generador elimina la conjetura y a la persona del bucle por completo.

Así se generan contraseñas que aguantan, cómo se comprueban las que ya tienes y cómo se arreglan las peores sin dedicarte una tarde entera.

## Por qué `P@ssw0rd1!` falla

Los atacantes no adivinan contraseñas de una en una. Ejecutan precomputación a gran escala contra poblaciones enteras, usando patrones observados en filtraciones reales:

- palabras de diccionario, en varios idiomas, más nombres y marcas
- recorridos de teclado (`qwerty`, `1qaz2wsx`) y sus rotaciones
- fechas: años, meses, estaciones
- sustituciones leetspeak: `a→@`, `i→1`, `o→0`, `e→3`
- dígitos añadidos al final y un único símbolo final

Tu contraseña inventada cae en la intersección de varias de esas listas. El hardware moderno prueba miles de millones de candidatos por segundo contra hashes rápidos, así que un patrón «complejo» que a una persona le parece imposible de adivinar se descifra a menudo en horas o menos.

## Qué hace fuerte a una contraseña

**La longitud gana a la complejidad.** Cada carácter extra multiplica el espacio de búsqueda. Cuatro palabras sin relación —`harbour-lantern-margarine-tricycle`— es más largo y más fácil de recordar que `X7$kq2!`, y muchísimo más difícil de descifrar. Prefiere una frase de contraseña para tu contraseña maestra y cadenas aleatorias en todas partes.

**El azar gana al vocabulario.** Un generador que elige de un conjunto completo de caracteres produce una cadena sin patrón que explotar. Un generador que elige de una lista de palabras produce una frase de contraseña, lo cual está bien *si* las palabras no tienen relación y hay suficientes.

**La unicidad gana a la fuerza.** Una contraseña de 12 caracteres usada en un solo sitio está bien. La misma contraseña de 12 caracteres en 40 sitios está a una filtración de distancia de 40 filtraciones. Este es exactamente el punto por el que existe un gestor de contraseñas.

## Cómo usar un generador

Cualquiera de estos produce salida realmente aleatoria sin conexión, sin red de por medio:

```bash
openkey gen -l 24                       # 24 characters
openkey gen -l 32 -a -c                 # avoid confusing characters, copy to clipboard
openkey gen -l 20 --no-symbols          # for sites that reject symbols
openkey --json gen -l 24                # machine-readable output
```

En la app, abre **Ajustes → Generador de contraseñas** para definir tu longitud y clases de caracteres por defecto, o usa el generador desde un formulario de entrada. Los generadores en línea conviene evitarlos para las contraseñas que pienses conservar: le estás pidiendo un secreto al servidor de un desconocido y no puedes verificar qué ha hecho con él.

### Elegir una longitud

| Contexto | Longitud |
|----------|----------|
| Tu contraseña maestra | 4–6 palabras sin relación, o 20+ caracteres |
| Correo, banca, cuenta en la nube | 20+ caracteres aleatorios |
| Cuenta de un sitio normal | 16+ caracteres aleatorios |
| Cualquier cosa con política de caducidad | 12–14 basta si es única |

## Comprobar la fuerza

Quien busca pregunta constantemente por «password strength checker» y «password strength tester», y la distinción útil es entre comprobar una *candidata* y auditar *lo que ya tienes*.

**Para una candidata:** primero la longitud, luego comprobar que no está en una lista de filtraciones ni se deriva de tu nombre, del nombre del sitio o del año actual. No hace falta enviarla a ninguna parte: una estimación de longitud y una comprobación de patrones son operaciones locales.

**Para tu vault:** lo que quieres es un informe de *reutilización*, no una puntuación de fuerza. Importan tres preguntas:

1. **¿Uso la misma contraseña en más de un sitio?** Este es el hallazgo que realmente cambia tu riesgo.
2. **¿Está esta contraseña en un corpus de filtraciones conocido?** Una contraseña filtrada no vale nada a ninguna longitud, porque la cadena exacta ya está en las listas de palabras de los crackers.
3. **¿Lleva años sin cambiar esta contraseña en una cuenta que contiene algo valioso?**

Ten en cuenta que OpenKey deliberadamente **no** llama a have-i-been-pwned ni ejecuta una pantalla de salud de contraseñas, y que ese es un valor por defecto razonable: una pantalla de salud o bien envía datos fuera o exige un corpus local de filtraciones. Haz la auditoría a mano: empieza por correo, banca y nube, y ve ampliando.

## Arreglar contraseñas débiles y reutilizadas

No necesitas cambiarlo todo a la vez. Prioriza:

1. **Correo** — restablece todas las demás cuentas.
2. **Banca y nube** — el almacenamiento en la nube puede alojar el resto.
3. **Tu cuenta social principal** — los flujos de restablecimiento de contraseña suelen llevar al correo.
4. **Tu contraseña maestra**, si es corta o está reutilizada en algún sitio.
5. **Todo lo demás**, de forma oportunista, cada vez que un sitio te lo pida.

Un flujo de trabajo práctico:

1. Activa primero el autocompletado, para que los inicios de sesión nuevos se guarden solos.
2. Genera una contraseña aleatoria nueva para cada cuenta prioritaria **mientras tienes la sesión iniciada**.
3. Pégala a través del generador en lugar de escribirla.
4. Activa el 2FA en el mismo momento: ya estás en los ajustes de seguridad ([guía de 2FA](/es/blog/two-factor-authentication)).
5. Añade un passkey donde se ofrezca ([¿qué son las passkeys?](/es/blog/what-are-passkeys)).
6. Borra el archivo de exportación antiguo en texto plano cuando termines la migración ([importar desde Chrome](/es/blog/import-passwords-from-chrome)).

## Reglas de dedo

- Nunca reutilices. Impónlo con un generador, no con disciplina.
- La longitud es la seguridad más barata que tienes a tu alcance.
- No rotes una contraseña fuerte y única solo porque haya pasado un año. Rotar sin motivo es movimiento sin sentido.
- No añadas `1` o `!` a una contraseña vieja cuando te obliguen a cambiarla: es una extensión predecible de una cadena conocida, y así es como un conjunto de contraseñas «diferentes» se convierte en uno solo.
- No guardes una hoja de cálculo con contraseñas generadas. Guárdalas en el vault y conserva una copia de seguridad cifrada sin conexión.

## Qué dicen los datos de búsqueda

La generación de contraseñas es un grupo grande por derecho propio, no solo un subtema de los gestores de contraseñas. A nivel del término principal, «password generator» atrae cerca del **36%** del interés de «password manager».

Refinamientos que la gente añade a «strong password generator» (Google Trends, en todo el mundo, últimos 12 meses):

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| google strong password generator | 100 |
| random strong password generator | 100 |
| random password generator | 99 |
| strong passwords | 58 |
| strong password generator online | 57 |
| generate strong password | 49 |
| password manager | 26 |
| apple strong password generator | 17 |

Las dos primeras son los generadores integrados de las cuentas de **Google** y **Apple**: la gente busca el generador que su plataforma ya incluye, no un sitio de terceros. «strong password generator online», con 57, es el grupo del que hay que tener cuidado: un generador en línea es un tercero manejando un secreto que piensas conservar.

Un grupo aparte muestra con claridad la intención de auditoría. Consultas relacionadas bajo «password strength»: *password strength checker* (100), *strength check* (51), *strength tester* (41), *strength tool* (28), *strength generator* (27). La formulación «checker» y «tester» trata casi siempre de validar una contraseña que ya tienes, y por eso la auditoría manual gana a una pantalla de salud dentro de la app para cualquiera que no quiera enviar datos fuera.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de un minuto

La longitud gana a la complejidad, el azar gana al vocabulario y la unicidad gana a ambos. Genera con una herramienta local en lugar de con una web, apunta a 16+ caracteres aleatorios para cuentas normales y a una frase de contraseña de varias palabras para tu contraseña maestra, y gasta tu esfuerzo limitado en las cuentas que pueden restablecer a las demás.

## Próximos pasos

- [¿Qué es un gestor de contraseñas?](/es/blog/what-is-a-password-manager) — dónde viven las contraseñas generadas
- [Autocompletar contraseñas](/es/blog/autofill-passwords) — genera automáticamente en el registro
- [Autenticación en dos pasos](/es/blog/two-factor-authentication) — la segunda capa
- [Guía de la CLI](/es/guide/cli#generacion-de-contrasenas-gen) — banderas de generación y clases de caracteres
