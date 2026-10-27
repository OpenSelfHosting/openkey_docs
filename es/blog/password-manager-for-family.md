---
title: Gestor de contraseñas para la familia
description: Compartir contraseñas con la familia — qué compartir, qué no compartir nunca, cómo gestionar las cuentas de los hijos y cómo revocar el acceso cuando alguien se muda.
date: 2026-09-24
cover: /blog/covers/password-manager-for-family.png
---

# Gestor de contraseñas para la familia

La compartición de contraseñas en familia tiene un requisito estricto que la gente suele entender mal: **no todo debería compartirse.** Un vault compartido donde todo el mundo ve todo resulta conveniente y suele ser una degradación de seguridad para cada cuenta que contiene.

El modelo correcto es un pequeño número de credenciales compartidas a propósito y un gran número de privadas — con una regla clara para distinguir unas de otras.

## La regla que hace que esto funcione

Clasifica cada credencial en exactamente uno de tres cubos:

| Cubo | Ejemplos | Quién puede verlo |
|------|----------|-----------------|
| **Compartido** | Streaming, cuenta de compras compartida, invitados del Wi-Fi del hogar, el almacenamiento familiar, la cuenta compartida del coche | Todo el mundo en el hogar, por diseño |
| **De ámbito familiar** | El portal escolar de los hijos, una cuenta de plan familiar, un suministro compartido | Las personas concretas que lo necesitan |
| **Privado** | Correo personal, banca, médico, trabajo, citas, cuentas individuales de nube | Una persona, siempre |

El modo de fallo es la deriva: un inicio de sesión empieza en Compartido porque era cómodo y luego adquiere en silencio contenido sensible — un correo de recuperación, una tarjeta guardada, un mensaje privado. Compartido no es un valor por defecto seguro. Debería ser una decisión deliberada y revisada.

## Lo que sí debería compartirse

- **Streaming y multimedia** — normalmente ya admite perfiles separados, que es mejor que compartir la cuenta entera.
- **Compras compartidas** — una sola cuenta para una suscripción recurrente, compartida a propósito.
- **Infraestructura del hogar** — el router, el Wi-Fi de invitados, un concentrador de hogar inteligente, la impresora compartida.
- **Almacenamiento familiar** — la fototeca o la unidad compartida, donde varias personas aportan legítimamente.
- **Acceso de emergencia** — lo único que todos deberían poder alcanzar si te ocurre algo.

## Lo que nunca debe compartirse

- **Banca** — las cuentas conjuntos existen por algo; los inicios de sesión compartidos rompen la protección contra el fraude y los procesos de reclamación.
- **Correo personal** — es el restablecimiento de contraseña de todo lo demás, y es un canal de correspondencia privado.
- **Cuentas de trabajo** — la política del empleador suele prohibirlas, y supone un riesgo laboral real.
- **Portales médicos y de seguros** — estos son legal y éticamente individuales.
- **Cualquier cosa con una dimensión legal o íntima.** Si te importaría que otra persona pudiera leerlo, no lo compartas.

## Un diseño práctico

La mayoría de los gestores domésticos admiten colecciones compartidas o compartición por elemento. Una estructura que funciona:

```
Family
├── Household          — streaming, shared shopping, Wi-Fi, smart home
├── Kids               — school portals, game accounts, device accounts
└── Emergency          — the recovery entry, and where the backups live
```

Las cuentas propias de cada uno se quedan en su vault privado, o en una colección privada aparte. Las cuentas del hogar son las compartidas, y son la pequeña minoría.

En OpenKey, la compartición funciona con **Pro** y un servidor autoalojado, y existen ambos modelos:

- **Colecciones compartidas de organización** — todo el mundo lee el mismo texto cifrado vivo bajo una clave de organización compartida. Lo correcto para Household y Kids.
- **Comparticiones de entradas y colecciones** — una **instantánea** cifrada que se copia al vault del destinatario cuando este acepta. Bien para credenciales puntuales, mal para todo lo que deba estar al día, porque las ediciones posteriores no se le envían.

Esa distinción es lo que hay que acertar. Una contraseña de router compartida que nunca cambia es una buena compartición de entrada. Una cuenta compartida cuya contraseña rotas es una colección compartida de organización, o pasarás una tarde preguntándote por qué el concentrador inteligente ha dejado de funcionar.

## Cuentas de los hijos

Los niños necesitan sus propios inicios de sesión, no los tuyos.

- **Dales su propio vault** desde el principio, con una contraseña maestra que puedan recordar — una frase de contraseña, y una frase que puedan reconstruir, porque la olvidarán más a menudo que tú.
- **Nunca pongas la cuenta de un hijo dentro de la colección de un padre.** Cuando crezcan, no podrás entregársela limpiamente.
- **Crea las cuentas con su nombre real y su correo real**, para que la recuperación funcione cuando sean mayores y sea su cuenta.
- **Configura la recuperación pronto.** Una cuenta que nadie puede restablecer es una carga de soporte más adelante, y una cuenta perdida es una lección que quizá no quieras que aprendan por la vía cara.
- **Revísalo cuando cumplan unos 13 años.** A la edad en la que la mayoría de los servicios exigen consentimiento real de un progenitor, ese es el momento de mover las cuentas a su propio vault y entregarles las llaves.

## Compartir con alguien que no es técnico

Aquí es donde fracasa la mayoría de los planes de compartición del hogar. Un padre, una pareja, una abuela que no eligió estar aquí es la persona con más probabilidades de necesitar acceso y con menos de tolerar una app.

Tácticas prácticas:

1. **Inicia sesión por ellos una vez** y pon un autobloqueo corto, para que la app no sea un acertijo cada vez.
2. **Activa el desbloqueo biométrico** para que nunca escriban una contraseña maestra en un dispositivo compartido.
3. **Anota la contraseña maestra** y guárdala en un gestor de contraseñas en el que ya confíen, o en un sobre sellado. No estás guardando un secreto; estás guardando la llave de un secreto que si no perderían.
4. **Mantén pequeña la colección compartida.** Cada entrada extra es una cosa más que pueden cambiar por accidente.
5. **Precrea los inicios de sesión compartidos** para que nadie tenga que registrarse con prisa.
6. **Ensaya el relevo una vez**, mientras aún estés. El objetivo es que la respuesta a «¿cómo entro en la cuenta de streaming?» sea una persona, no una búsqueda.

## Cuando alguien se muda

Hazlo la misma semana, no cuando te acuerdes:

1. **Cambia las contraseñas compartidas**, empezando por la colección Household compartida — streaming, Wi-Fi, almacenamiento, cualquier cosa con una tarjeta guardada.
2. **Quítalos de las colecciones compartidas y de las organizaciones.** Los propietarios y administradores pueden revocar invitaciones, cambiar roles o quitar miembros.
3. **Entiende lo que la revocación no hace.** Revocar detiene una aceptación pendiente. **No** borra una copia que alguien ya importó en su propio vault. En OpenKey, las comparticiones de entradas son instantáneas, así que una compartición aceptada es una copia local descifrada en su dispositivo — trátala como una llave que entregaste.
4. **Rota todo lo que poderiam haber leído razonablemente**, incluido lo que haya en una colección que compartiste ampliamente.
5. **Actualiza la entrada de recuperación** de tu colección Emergency.
6. **Vuelve a revisar qué hay en Compartido.** La compartición del hogar se desvía; este es un buen momento para degradar a privado todo lo que dejó de compartirse de verdad.

## Acceso de emergencia

El escenario que merece planificación: te ocurre algo, y las personas que necesitan las cuentas son las personas que nunca las tuvieron.

- **Mantén una colección Emergency** con las cuentas que importan operativamente — el servicio de streaming, el almacenamiento familiar, las cuentas de suministros y dónde viven tus copias de seguridad.
- **Incluye una instrucción humana**, no solo credenciales. Una nota que diga *qué* cuentas, *para qué* sirven y a quién contactar es más útil que una lista de contraseñas, porque le dice a una persona estresada qué hacer.
- **Mantenla al día.** Un documento de emergencia de hace tres años es peor que no tener ninguno, porque se confía en él y está mal.
- **No** dependas de un solo dispositivo. Si la persona que necesita acceso ya no tiene teléfono, necesita una copia impresa sin conexión.

## Elegir un gestor para un hogar

| Requisito | Por qué |
|-----------|--------|
| Compartición por elemento y por colección | Compartir el vault entero es demasiado tosco |
| Revocación | Los hogares cambian |
| Roles de solo lectura o limitados | Los niños no deberían administrar el vault del hogar |
| Desbloqueo biométrico | Dispositivos compartidos y manos compartidas |
| Acceso de emergencia | El escenario que no querrás improvisar |
| Precios familiares razonables | Los costes por asiento suman rápido |
| Un nivel gratis que merezca la pena | Alguien empezará sin pagar |

Al comparar, revisa las mismas preguntas de baja de personal que en [gestor de contraseñas para equipos](/es/blog/password-manager-for-teams) — la mecánica es idéntica, las apuestas solo son más bajas.

## Qué dicen los datos de búsqueda

La compartición es donde vive la intención de «cómo hacerlo», no la de «qué producto». Refinamientos de «password manager» en Google Trends (en todo el mundo, últimos 12 meses):

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |

Y un conjunto de cola larga independiente, comparado entre sí:

| Consulta | Interés relativo en el grupo |
|---------|------------------------------|
| password manager for business | 100 |
| **password manager for family** | **41** |
| best password manager for business | 36 |
| password manager for teams | 22 |

La compartición en el hogar atrae un interés real — alrededor del 41% del grupo de evaluación de empresas — pero se presenta de forma consistente como una *función de un producto que ya has elegido* en lugar de una categoría en la que estás comprando. Esa es una señal editorial útil: quien busca «password manager for family» suele querer saber **cómo compartir de forma segura**, no qué gestor comprar.

A nivel del término principal, «how to share passwords» es el término más fuerte del grupo «cómo hacerlo», por delante de «how to import passwords» y «how to use a password manager». Compartir es lo primero que los hogares quieren hacer, y lo primero que hacen mal.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de un minuto

No compartas todo. Mantén un conjunto pequeño y deliberado de credenciales compartidas, deja privados la banca, el correo personal y las cuentas de trabajo, da a los niños sus propios vaults y trata la revocación como un proceso real — porque una compartición aceptada es una copia que no puedes recuperar. Escribe el plan de emergencia mientras estés bien.

## Próximos pasos

- [Gestor de contraseñas para equipos](/es/blog/password-manager-for-teams) — la misma mecánica, evaluada en serio
- [Compartir y organizaciones](/es/guide/sharing) — organizaciones, invitaciones y semántica de instantáneas
- [¿Qué es un gestor de contraseñas?](/es/blog/what-is-a-password-manager) — los fundamentos
- [Precios](/es/pricing) — Gratis y Pro, incluida la compartición
