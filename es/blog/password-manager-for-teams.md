---
title: "Gestor de contraseñas para equipos: qué evaluar"
description: Elegir un gestor de contraseñas para equipos — vaults compartidos, roles, baja de personal, acceso por CLI y API, auditabilidad — y cómo ejecutar uno en tu propio servidor.
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# Gestor de contraseñas para equipos: qué evaluar

Un gestor de contraseñas para equipos no es un producto de consumo con más asientos. Hace un trabajo distinto: tiene que sobrevivir a que la gente entre y se vaya, y tiene que responder a preguntas sobre quién tuvo acceso a qué y cuándo. La mayoría de las herramientas se juzgan por la función de compartición y fallan la segunda pregunta.

Este artículo es la lista de evaluación, más cómo funciona el modelo de OpenKey si quieres colecciones compartidas sobre infraestructura que controlas.

## Los requisitos que de verdad difieren

### 1. Vaults compartidos con control de acceso real

«Puedo compartir con mi equipo» es el mínimo de partida. Lo que importa es si el acceso es por colección o por persona, si puedes compartir un subconjunto sin exponerlo todo y si un contratista puede ver exactamente un servicio.

- La compartición **de todo o nada** falla rápido. No escala más allá de unas cinco personas.
- La compartición **por colección** es el modelo útil mínimo.
- El acceso **basado en roles** (admin / member, e idealmente solo lectura) es lo que quieres cuando hay revisores y aprobadores.

### 2. Una baja de personal que de verdad elimine el acceso

Este es el requisito que separa las herramientas de consumo de las de equipo, y es el que más falta.

Cuando alguien se va, necesitas saber:

- ¿Pierden el acceso **de inmediato** o en la próxima sync?
- ¿Conservan **copias sin conexión** de las credenciales compartidas — y si es así, cómo lo gestionas?
- ¿Puedes **revocar una compartición** y saber que la copia ha desaparecido?
- ¿Sobreviven la **propiedad de la organización** y los derechos de administrador a su marcha, o el equipo pierde la capacidad de administrarse?

Una herramienta que no puede responder a esto es un pasivo de cumplimiento disfrazado de función de productividad.

### 3. Automatización y acceso de máquinas

Los humanos en una UI son la mitad del problema. La otra mitad es:

- Una **CLI** para CI y scripts
- Una **API** para aprovisionamiento y herramientas internas
- **Cuentas de servicio** que no caducan cuando se va una persona
- **Importación masiva** desde un directorio o una hoja de cálculo de credenciales compartidas heredadas

Los equipos con infraestructura suelen necesitar las cuatro. Un gestor de contraseñas que solo tiene extensión de navegador no sobrevive al contacto con un pipeline de despliegue.

### 4. Zero-knowledge, y lo que significa comercialmente

Para un individuo, zero-knowledge es una preferencia de privacidad. Para una organización es una postura de cumplimiento: es la diferencia entre «nuestro proveedor fue comprometido» y «nuestro proveedor fue comprometido y tenía texto cifrado».

También limita las funciones. Algunos proveedores ofrecerán recuperación de cuenta, reinicios de administrador o aplicación de políticas que requiere texto plano en el servidor — y cada una de esas cosas es una reducción deliberada de la propiedad zero-knowledge. Ambas posturas son defendibles; deberías elegir con conocimiento de causa en lugar de descubrirlo durante la revisión de un incidente.

### 5. Registro de auditoría

«¿Puedo demostrar quién tuvo acceso a la contraseña de la base de datos de producción el 3 de marzo?» necesita un registro de acceso, conservado durante un periodo definido y exportable para un auditor.

Anota el límite con honestidad: en un sistema zero-knowledge, un administrador puede ver *que* se accedió a una entrada, no *qué contenía*. Ese es el comportamiento correcto, y también es una restricción sobre lo que tu auditoría puede demostrar.

### 6. Infraestructura propia

En algún momento una revisión de seguridad preguntará si las credenciales compartidas salen de tu red. Las respuestas son: alojado por el proveedor con un DPA contractual, nube privada o autoalojado. El autoalojamiento es el único que puedes verificar tú, y el único donde puedes demostrar que el servidor contiene texto cifrado.

### 7. Un modelo de coste que sobreviva al crecimiento de plantilla

El precio por asiento que incluye a cada contratista, cada cuenta de servicio y cada auditor de solo lectura se encarece rápido. Comprueba si:

- Precios de asiento de solo lectura
- Si las cuentas de servicio son gratis
- Si los usuarios desactivados siguen contando
- Si hay un nivel gratis para evaluación

## Una hoja de puntuación para equipos

| Criterio | Peso | Por qué importa |
|----------|------|-----------------|
| Baja de personal y revocación | ×3 | El requisito que más herramientas incumplen |
| Control de acceso por colección | ×3 | Evita que un contratista vea todo |
| Acceso por CLI y API | ×3 | Las máquinas son la mitad de tus usuarios |
| Zero-knowledge verificable | ×3 | Cumplimiento y exposición a filtraciones |
| Cuentas de servicio | ×2 | Acceso no humano de larga duración |
| Registro de auditoría con retención | ×2 | Demostrar accesos históricos |
| Autoalojamiento disponible | ×2 | Mantener las credenciales dentro de tu red |
| Acceso de emergencia | ×1 | Rotura de cristal cuando un administrador no está disponible |
| Herramientas de migración masiva | ×1 | Salir de la hoja de cálculo compartida |

## Cómo maneja OpenKey el acceso de equipo

El modelo de compartición de OpenKey está construido para esto, y es deliberadamente inusual en algunos puntos que conviene entender antes de diseñar un proceso en torno a él.

### Organizaciones y colecciones compartidas

La compartición requiere **Pro** y un servidor autoalojado configurado, con todo el mundo en la **misma URL de servidor**. El modelo:

1. **Publica claves de identidad** para que los pares puedan envolverte claves. En OpenKey esto se hace desde la extensión del navegador en modo standalone (servidor) — la página Ajustes → Datos de la app no incluye esa acción.
2. **Crea una organización** y colecciones compartidas dentro de ella. El cliente cifra el nombre de la organización y te envuelve una clave de organización como propietario.
3. **Invita miembros** por correo (ya deben existir en el servidor), con un rol de `admin` o `member`. Tu cliente envuelve la clave de organización para su clave de identidad publicada y envía la invitación.
4. Ellos aceptan en **Invitaciones pendientes** y sincronizan; aparecen las colecciones compartidas.

El servidor guarda los nombres de organización, las cargas compartidas y las claves de identidad como **texto cifrado opaco**. Nunca desenvuelve una clave de organización.

Poderes de administrador: revocar invitaciones pendientes, cambiar roles, quitar miembros. Una restricción con la que hay que planificar — **el propietario no puede abandonar la organización**, y la transferencia de propiedad no es una vía de recuperación separada. Nombra un segundo propietario pronto en lugar de tratarlo como un trámite.

### Las comparticiones de elementos son instantáneas, no documentos vivos

Este es el detalle operativo más importante. Cuando compartes una sola entrada o colección con alguien:

- La carga cifrada queda **congelada en el momento de compartir** y se copia al vault del destinatario cuando acepta.
- Las ediciones posteriores en tu copia **no** se le envían.
- **Revocar** detiene una aceptación pendiente. **No** borra una copia que el destinatario ya importó.

Así que una compartición de entrada se comporta como entregarle a alguien un sobre sellado, no como compartir un documento vivo. Para todo lo que deba mantenerse sincronizado — una cuenta de servicio compartida, una herramienta interna para todo el equipo — usa una **colección compartida de organización**, donde los miembros siguen leyendo el mismo texto cifrado bajo una clave de organización compartida.

Hacer esto al revés produce el error clásico: actualizas una contraseña compartida, asumes que todo el mundo tiene la nueva y media equipo está usando una credencial que rotaste hace un mes.

### Lo que OpenKey no hace

Vale la pena decirlo claramente, porque afecta a cuándo deberías elegir otra cosa:

- **No hay un motor de políticas impuesto por el administrador** en el cliente. No existe ninguna regla del servidor que imponga una longitud mínima de contraseña en todo un equipo.
- **No hay un gancho automático de baja.** Quitar a un miembro es una acción manual: revoca o quita en la organización y luego ocúpate de las comparticiones de entradas que ya se habían aceptado.
- **No hay SCIM ni sync de directorio.** La pertenencia se gestiona mediante las API de organización y de compartición.
- **No hay registro de auditoría del acceso a entradas en el servidor.** El servidor no puede ver texto plano, así que no puede registrar qué se leyó.
- **La sync es gana la última escritura por `revision`, no un CRDT.** Las ediciones concurrentes pueden sobrescribirse; edita en un solo dispositivo cada vez cuando importe.

Si necesitas baja automatizada, un motor de políticas o un registro de acceso de nivel de cumplimiento, elige un producto comercial para equipos. OpenKey es para equipos que quieren la cripto en sus clientes y están dispuestos a operar por su cuenta la capa de colaboración.

## Despliegue en un equipo

1. **Ejecuta primero el servidor.** [Instalar el servidor](/es/guide/server), endurecido según la [lista de endurecimiento](/es/blog/self-hosted-password-manager#la-lista-de-endurecimiento).
2. **Crea tu propia cuenta** y publica las claves de identidad desde la extensión.
3. **Crea la organización** y después una colección compartida por servicio o frontera de equipo. Empieza por las cuentas de infraestructura compartida — esas son las que más daño causan cuando están mal.
4. **Publica las claves de identidad de todo el mundo** antes de invitar, o el paso de envolverlas no las encontrará.
5. **Invita en grupos pequeños** y verifica que un miembro puede abrir de verdad una colección compartida antes de añadir el siguiente lote.
6. **Mueve la hoja de cálculo compartida.** Cada credencial que está ahora mismo en una hoja de cálculo de equipo es tu importación de máxima prioridad.
7. **Escribe el procedimiento de baja antes de necesitarlo.** Dos pasos, por escrito: quitar de la organización; revisar y revocar las comparticiones de entradas.

## La versión de un minuto

Evalúa primero la baja de personal, el acceso por colección y el acceso de máquinas — no la función de compartición. Prefiere un zero-knowledge que puedas verificar y comprueba si las funciones de recuperación y administración del proveedor requieren en silencio texto plano en el servidor. Si autoalojas, recuerda que las comparticiones de entradas son instantáneas: usa colecciones compartidas de organización para todo lo que deba estar al día.

## Próximos pasos

- [Compartir y organizaciones](/es/guide/sharing) — el recorrido completo
- [Gestor de contraseñas autoalojado](/es/blog/self-hosted-password-manager) — ejecutar el servidor
- [Gestor de contraseñas para la familia](/es/blog/password-manager-for-family) — la versión a escala de hogar
- [Seguridad](/es/guide/security) — qué puede y qué no puede ver el servidor
