---
title: Mejores gestores de contraseñas
description: Cómo comparar gestores de contraseñas en 2026 — niveles gratis, cifrado zero-knowledge, autoalojamiento, autocompletado, passkeys y las preguntas que debes hacer antes de elegir uno.
date: 2026-09-13
cover: /blog/covers/best-password-managers.png
---

# Mejores gestores de contraseñas

No existe un único mejor gestor de contraseñas. Existe el mejor *para tu modelo de amenaza, tus plataformas y cuánta configuración toleres* — y la forma de encontrarlo es puntuar un puñado de candidatos con las mismas siete preguntas en lugar de leer otra lista que en silencio patrocina a alguien.

Este artículo te da las siete preguntas, una hoja de puntuación y notas honestas sobre las cuatro categorías entre las que la gente suele decidir.

## Las siete preguntas

### 1. ¿Puede el proveedor leer mi vault?

Esta es la única pregunta realmente binaria. Busca cifrado **zero-knowledge** o de extremo a extremo explícito, y comprueba *quién tiene las claves*. Si el proveedor puede restablecer tu contraseña maestra, emitir una clave de descifrado de repuesto o desbloquear tu vault «para soporte», no es zero-knowledge por mucho candado que haya en la web.

### 2. ¿Dónde están los datos cifrados y quién puede borrarlos?

| Modelo | Qué les confías | Mejor para |
|--------|-----------------|------------|
| Solo nube del proveedor | Disponibilidad, durabilidad, su historial de brechas | Quienes quieren cero configuración |
| Nube del proveedor, autoalojable | Lo mismo, pero con una salida | Usuarios concienciados que quieren opción |
| Tu propio servidor | Tu propia disponibilidad y tus copias de seguridad | Cualquiera que sepa ejecutar Docker o un VPS pequeño |

El autoalojamiento no es una mejora mágica: es un intercambio. Ganas control del plano de almacenamiento y sacas a un tercero de la cadena de confianza; asumes TLS, copias de seguridad y actualizaciones. [El servidor de OpenKey](/es/guide/server) es la implementación de referencia si quieres ver cómo se ve eso.

### 3. ¿Qué permite realmente el nivel gratis?

Los niveles gratis son donde los gestores de contraseñas esconden el peaje de la migración. Comprueba los topes *concretos*, porque varían enormemente: unos limitan elementos, otros limitan dispositivos, otros limitan la sync y otros deshabilitan la exportación por completo — lo que significa que puedes entrar pero no salir.

Un nivel gratis que cubre vault + autocompletado + passkeys + sync, con límites de elementos, es realmente utilizable. [OpenKey Free](/es/pricing#free-vs-openkey-pro) es uno de ellos: 50 inicios de sesión, 3 colecciones, 3 tarjetas, 3 monederos, 3 secretos, con sync de servidor y autocompletado incluidos.

### 4. ¿Funciona el autocompletado en todas partes donde uso?

No «¿existe?», sino ¿funciona *de forma fiable* en tu navegador, en el proveedor de sistema de tu teléfono y en tus apps de escritorio? El autocompletado es la función que más tocas, así que merece una prueba real antes de migrarle 400 inicios de sesión. Consulta [autocompletar contraseñas](/es/blog/autofill-passwords) para la configuración y [el autocompletado no funciona](/es/blog/autofill-not-working) cuando no.

### 5. Passkeys, TOTP y tarjetas

Las tres capacidades que separan un gestor de contraseñas de una caja de contraseñas:

- **Passkeys** — una implementación real de WebAuthn, no «próximamente». [¿Qué son las passkeys?](/es/blog/what-are-passkeys)
- **TOTP** — guarda la semilla junto al inicio de sesión que protege ([2FA en el vault](/es/blog/two-factor-authentication))
- **Tarjetas, monederos, identidades** — útil, y una buena señal de si el vault es un gestor de contraseñas real o una hoja de cálculo

### 6. ¿Puedo sacar mis datos?

La importación es el mínimo. La **exportación** es lo que hace que sea de fiar, porque es la vía de salida. Comprueba qué formatos se admiten, si la exportación está tras el muro de pago y si el resultado es texto plano. Si no puedes salir limpiamente, estás alquilando.

### 7. ¿Qué pasa si olvido la contraseña maestra?

Obtén una respuesta clara. En un diseño realmente zero-knowledge la respuesta es «nada: los datos son irrecuperables», y el trabajo del proveedor es que eso quede evidente *antes* de crear el vault, no después. Pregunta qué material de recuperación sin conexión puedes crear tú mismo ([está cubierto aquí](/es/blog/forgot-master-password)).

## Las cuatro categorías

### Gestores en la nube convencionales

La opción con menos fricción y el valor por defecto correcto para casi todo el mundo. Aceptas la infraestructura del proveedor a cambio de una app pulida, amplio soporte de plataformas y ningún servidor que mantener. La mejor cuando quieres que esto esté resuelto, no operado. Compáralos por los límites del nivel gratis, el soporte de passkeys y la exportación — no por listas de funciones, que inflan.

### Gestores de código abierto y autoalojables

El código es público y, en varios casos, el servidor también. Puedes auditar el cifrado, ejecutar tu propia instancia o no ejecutar ningún servidor y mantener un archivo local cifrado. La mejor cuando el propio requisito es la cadena de confianza. [Gestor de contraseñas autoalojado](/es/blog/self-hosted-password-manager) cubre la parte operativa.

### Integrados de la plataforma

[Google Password Manager](/es/blog/google-password-manager), iCloud Keychain y Microsoft Edge son excelentes para quien ya está comprometido con un ecosistema: configuración casi nula, integración sólida y un nivel gratis realmente bueno. Las contras son la dependencia del ecosistema, una compartición entre plataformas más débil y ninguna historia de autoalojamiento.

### Planes para familia y equipos

No son otro tipo de producto: son otro conjunto de requisitos. Vaults compartidos, revocación y roles. [Gestor de contraseñas para la familia](/es/blog/password-manager-for-family) y [gestor de contraseñas para equipos](/es/blog/password-manager-for-teams) cubren qué comprobar y qué evitar.

## Una hoja de puntuación

Puntúa cada candidato de 0 a 3 en cada fila y luego suma. Una diferencia de doce puntos es una señal real; dos puntos es ruido.

| Criterio | Peso | Notas |
|----------|------|-------|
| Zero-knowledge, demostrable | ×3 | Innegociable si te importa que el proveedor te lea |
| Exportación disponible y gratuita | ×3 | Tu vía de salida |
| Autocompletado en todas mis plataformas | ×3 | Pruébalo, no lo des por supuesto |
| Passkeys + TOTP | ×2 | El sustituto moderno del campo de contraseña |
| El nivel gratis es realmente utilizable | ×2 | Cuentan tanto los límites de elementos como los de sync |
| Autoalojamiento disponible | ×1 | Opcional, pero cambia el modelo de confianza |
| La historia de recuperación es honesta | ×1 | Incluye copias de seguridad sin conexión que controlas |
| Compartición y revocación | ×1 | Solo si compartes |

## Qué dicen los datos de búsqueda sobre cómo elige la gente

Google Trends (en todo el mundo, últimos 12 meses) muestra cómo se está tomando realmente esta decisión. Los refinamientos que la gente añade a «best password manager»:

| Consulta relacionada | Interés relativo | Nota |
|----------------------|------------------|------|
| best password manager 2026 | 100 | Las búsquedas con año dominan |
| the best password manager | 90 | |
| best password manager 2025 | 81 | La lista del año pasado sigue posicionada |
| best password manager app | 34 | Intención de móvil primero |
| what is the best password manager | 31 | Solapamiento con principiantes |
| reddit best password manager | 17 | La validación de la comunidad importa |
| best password manager for business | 14 | Evaluación de equipos |
| best password manager for android | 11 | Específica de plataforma |

Dos conclusiones prácticas. Primera: **«best password manager 2026» fue el refinamiento de más rápido crecimiento del término principal, con cerca de 2,800% interanual**, y la lista del año pasado todavía va por delante de la de este año — lo que te dice que la mayoría de quienes buscan leen la primera comparativa completa que encuentran, así que las listas patrocinadas por proveedores hacen casi todo el trabajo de decidir. Segunda: «reddit» aparece como calificador explícito, lo que significa que la gente quiere una recomendación que pueda contrastar con desconocidos.

En cuanto al interés de marca, en una comparación directa entre los nombres grandes normalizada contra el término principal: Bitwarden y 1Password concentran bastante más búsqueda de marca que LastPass, mientras que KeePass, NordPass y Dashlane quedan muy por debajo de los tres. Relacionadas con Bitwarden en concreto, las consultas de precio y de reseñas son las que más crecen: interés por el *coste*, no solo por la capacidad.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda. Los valores al alza son crecimiento frente al período anterior equivalente.

## Una rutina de evaluación de 20 minutos

1. Elige tres candidatos: el actual, un gestor en la nube y una opción autoalojable.
2. Puntúalos con la hoja de arriba.
3. Instala los dos primeros. No migres aún: solo desbloquea, activa el autocompletado y úsalos durante un día.
4. Comprueba passkeys y TOTP en una cuenta desechable.
5. Exporta desde el que no vas a elegir y mira el archivo. Si la exportación es inusable, esa es tu respuesta.
6. Migra y luego borra la exportación antigua de forma segura.

Guías de migración: [desde LastPass](/es/blog/lastpass-alternative) · [desde 1Password](/es/blog/1password-alternative) · [desde Chrome](/es/blog/import-passwords-from-chrome)

## La lista corta honesta

- **¿Quieres que esté resuelto?** Un gestor en la nube convencional con un nivel gratis real y exportación gratuita.
- **¿Quieres que sea auditable?** Un cliente de código abierto con servidor autoalojable — [OpenKey](/es/blog/what-is-a-password-manager) es una de esas opciones.
- **¿Quieres ningún proveedor?** Un vault cifrado local sin servidor, más [sync Nearby en LAN](/es/blog/nearby-without-a-server) para tus propios dispositivos.
- **¿Lo quieres en tu ecosistema?** Un integrado de la plataforma, aceptando la dependencia.

## Próximos pasos

- [¿Qué es un gestor de contraseñas?](/es/blog/what-is-a-password-manager) — los fundamentos
- [Autocompletar contraseñas](/es/blog/autofill-passwords) — la función que más importa
- [Precios y Gratis frente a Pro](/es/pricing) — qué incluye OpenKey
- [Modelo de seguridad](/es/guide/security) — qué significa «zero-knowledge» en la práctica
