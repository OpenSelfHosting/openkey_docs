---
title: "Gestor de contraseñas autoalojado: lo que realmente exige"
description: Ejecutar tu propio servidor de sync de contraseñas con Docker — qué te da realmente un vault autoalojado, qué te cuesta y una lista completa de configuración y endurecimiento.
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Gestor de contraseñas autoalojado: lo que realmente exige

Autoalojar un gestor de contraseñas significa ejecutar tú mismo el servidor de sync cifrado. Tus clientes cifran en el dispositivo; el servidor que operas guarda texto cifrado y te autentica. Que ese servidor se comprometa te entrega un blob cifrado, no una lista de contraseñas.

Esa es una victoria de privacidad real y duradera. También es un compromiso de mantenimiento, y la versión honesta de este artículo describe ambas cosas.

## Qué cambia realmente el autoalojamiento

Sé preciso con esto, porque es donde las expectativas fallan:

| | Nube del proveedor | Autoalojado |
|---|--------------------|--------------|
| Quién puede leer tu vault | Nadie, si es zero-knowledge | Nadie, si es zero-knowledge |
| Quién puede **borrar** tu vault | El proveedor | Tú |
| Quién ve los metadatos | El proveedor | Tú |
| Quién puede ser obligado a entregar datos | El proveedor, en su jurisdicción | Tú, en la tuya |
| Responsabilidad de disponibilidad | El proveedor | Tú |
| TLS, parches, copias de seguridad | El proveedor | Tú |
| Coste | Suscripción | Servidor + tu tiempo |

La afirmación de confidencialidad no cambia. Lo que cambia es el **control sobre el plano de almacenamiento** y quién está en la cadena de confianza. El autoalojamiento elimina a un tercero; no añade criptografía.

## Cuándo merece la pena

- Ya ejecutas servicios y tienes un NAS, un homelab o un VPS pequeño.
- Tu modelo de amenaza incluye «el proveedor está comprometido o presionado».
- Estás en una jurisdicción donde el alojamiento de datos de otra persona es una responsabilidad.
- Queres colecciones compartidas para un equipo sobre infraestructura que auditas.
- Eres de los que disfruta un Docker Compose de cinco minutos y una tarea de cron.

## Cuándo no merece la pena

- Nunca has ejecutado un proxy inverso y tendrías que aprender TLS, DNS y reglas de cortafuegos primero.
- Nadie va a acordarse de parchear. Un servidor sin parches es una responsabilidad, no una victoria de seguridad.
- Eres el único usuario, en un solo dispositivo. Entonces omite el servidor por completo y usa un vault local.
- Necesitas disponibilidad garantizada para un sistema crítico de negocio sin plan de copias de seguridad.

Para los dos últimos casos hay un camino intermedio: un **vault cifrado local** con [sync Nearby en LAN](/es/blog/nearby-without-a-server) para tus propios dispositivos, y ningún servidor en absoluto.

## Montarlo en cinco minutos

OpenKey Server es una aplicación FastAPI con PostgreSQL, distribuida como una pila de Docker Compose.

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

Luego confirma que está sana:

| URL | Propósito |
|-----|-----------|
| `http://localhost:8000` | API base |
| `http://localhost:8000/docs` | Documentación OpenAPI |
| `http://localhost:8000/health` | Comprobación de estado |

Las migraciones de esquema se ejecutan automáticamente al arrancar. Conecta un cliente desde **Ajustes → Datos → Servidor autoalojado**, luego **Regístrate** en el primer dispositivo e **Inicia sesión** en el resto. Detalle completo: [Configuración del servidor](/es/guide/server).

## La lista de endurecimiento

Esta es la parte que la gente se salta, y es la parte que decide si el autoalojamiento ayudó. De la [guía de seguridad](/es/guide/security):

### Innegociable

1. **Un `JWT_SECRET` único de al menos 32 caracteres.** Los valores de ejemplo se rechazan al arrancar. Genera uno; no copies un ejemplo.
2. **HTTPS con un certificado válido.** Los clientes usan la pila TLS de la plataforma sin fijado de certificados, así que una URL `http://` con una errata o un certificado malo permite un ataque de intermediario en el inicio de sesión y en la sync. Termina TLS en Caddy, nginx o tu balanceador de carga.
3. **Una lista blanca `CORS_ORIGINS` explícita.** Nunca `*`. Si usas la extensión del navegador, añade explícitamente sus orígenes `chrome-extension://` y `moz-extension://`.
4. **Postgres y el puerto crudo de la API se quedan privados.** Expón solo el proxy inverso.
5. **HSTS en el proxy**, para que los navegadores nunca vuelvan a HTTP después de la primera visita.

### Muy recomendable

6. **Límites de tasa en el proxy inverso.** El limitador integrado de la API está en memoria y es **por cada proceso worker**, así que con varios workers o réplicas el límite efectivo se multiplica. Añade `limit_req` en nginx o límites de tasa de Caddy en el borde.
7. **Establece `TRUST_PROXY_HEADERS=true` solo si el proxy sobrescribe `X-Forwarded-For`** y confías en esa ruta. Si no, tus límites por IP se aplican al proxy, no al usuario.
8. **Ten en cuenta la enumeración de correos.** `POST /auth/prelogin` y `POST /auth/lookup-public-key` devuelven 404 para correos desconocidos, lo que ayuda a los clientes legítimos pero permite a alguien sondear qué direcciones están registradas. Límites de tasa estrictos, TLS y, opcionalmente, una VPN o lista blanca de IP para despliegues de alta sensibilidad.
9. **Haz copias de seguridad de Postgres y prueba la restauración.** Un servidor de gestor de contraseñas que nunca se ha restaurado desde una copia es una hipótesis.
10. **Vigila `/health`** y los registros de la API; alerta si deja de responder.

## Lo que un servidor de sync autoalojado puede y no puede hacer

| Puede | No puede |
|-------|----------|
| Autenticarte a partir de tu `auth_hash` | Leer tu contraseña maestra |
| Guardar texto cifrado opaco de entradas, adjuntos, orgs y compartidos | Descifrar nombres de colecciones o cargas de entradas |
| Borrar o retener tus datos | Recuperar una contraseña maestra olvidada |
| Ver metadatos: correo, tamaños del texto cifrado, marcas de tiempo | Reconstruir tu vault a partir de la base de datos |
| Ser limitado, parcheado o reiniciado por ti | Sobrevivir a que olvides la contraseña maestra |

Lee con atención esa cuarta fila: un servidor autoalojado **no** te hace más seguro frente al olvido de la contraseña. Elimina a una parte de la cadena de confianza y te añade a ti como el operador que puede perder los datos. [Contraseña maestra olvidada](/es/blog/forgot-master-password) cubre el lado de la prevención.

## Semántica de sync que debes conocer antes de depender de ella

- **Gana la última escritura por `revision` de cada elemento, no un CRDT.** Las ediciones concurrentes en dos dispositivos pueden sobrescribirse. Edita en un solo dispositivo cada vez cuando importe.
- **Los borrados se sincronizan como tombstones** hasta que los pares se ponen al día, así que un borrado no es instantáneo en todas partes.
- **La sync Nearby en LAN usa la misma regla LWW** entre dispositivos emparejados y vinculados al vault.
- **Ninguna de las dos es una copia de seguridad.** Conserva al menos una copia local cifrada (`.okbak` en OpenKey).

Ese último punto es el que la gente se equivoca con más frecuencia, y es la diferencia entre «moví mi vault a mi propio servidor» y «tengo un plan de recuperación».

## Seguridad operativa para quien opera el servidor

- Ejecuta el servidor en un anfitrión al que parcheas con un horario. Sin parches es peor que alojado por el proveedor.
- Guarda `JWT_SECRET` en un gestor de secretos o al menos en un archivo con modo 600, no en el historial de tu shell.
- La retención de registros es una responsabilidad: los registros de sync pueden revelar marcas de tiempo y tamaños. Rótalos y limítalos.
- Haz copias de seguridad de la **base de datos**, no solo del volumen, y verifica las restauraciones cada trimestre.
- Nunca expongas la API en una red no confiable sin TLS.
- Si necesitas garantías de disponibilidad, pon un segundo anfitrión detrás de un balanceador de carga y acepta que la resolución de conflictos de sync sigue siendo gana la última escritura.

## Cómo mantiene OpenKey el servidor inútil para un atacante

- Los clientes derivan una clave maestra con **Argon2id** a partir de email + contraseña maestra + sal.
- El inicio de sesión envía un **`auth_hash`**, que demuestra conocimiento sin revelar la contraseña.
- Una **clave del vault** cifra nombres de colecciones y cargas de entradas con **AES-256-GCM**. El servidor solo guarda una clave del vault envuelta.
- Los JWT de acceso son de corta duración; los refresh tokens se hashean en reposo y rotan en cada uso.
- Los adjuntos se sincronizan como texto cifrado, con un tope de 20 MB cada uno.

Un volcado de `postgres` robado le da a un atacante sales, parámetros KDF, claves envueltas y blobs. Descifrarlo significa atacar Argon2id, y aun así sigue teniendo texto cifrado que no puede leer sin la clave. Ese es todo el argumento de seguridad, y se sostiene precisamente porque la contraseña maestra nunca salió de un cliente.

## Qué dicen los datos de búsqueda

El autoalojamiento es un grupo pequeño pero real, y se agrupa en torno a la frase «open source» más que en torno a «self-hosted». Google Trends (en todo el mundo, últimos 12 meses), comparando estos términos entre sí:

| Consulta | Interés relativo en el grupo |
|----------|------------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

La implicación es que «open source» es la frase que la gente busca y «self-hosted» es la frase en la que aterriza después: una búsqueda que empieza como preferencia y acaba como implementación. Las consultas relacionadas bajo «open source password manager» apuntan en la misma dirección: KeePass con 100, «open source password manager self hosted» con 84 y Passbolt con 78. Dos de las tres primeras son nombres que la gente compara, no descripciones de una función.

Estos siguen siendo números pequeños junto al término principal. «Self-hosted password manager» es un nicho dentro de un nicho, y la conclusión honesta es que la mayoría de quienes buscan esa frase son usuarios técnicos que ya saben lo que quieren.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de cinco minutos

El autoalojamiento cambia al proveedor por ti en la cadena de confianza. No añade criptografía: añade TLS, copias de seguridad, parches y límites de tasa a tu lista. Si ya ejecutas servicios: pila de Compose, `JWT_SECRET` único, HTTPS con un certificado válido, `CORS_ORIGINS` explícito y copias de seguridad probadas. Si no, usa en su lugar un vault cifrado local y [sync Nearby en LAN](/es/blog/nearby-without-a-server), y conserva al menos una copia de seguridad cifrada sin conexión en cualquier caso.

## Próximos pasos

- [Por qué autoalojar tu vault de contraseñas](/es/blog/self-host-your-vault) — los argumentos a favor
- [Sync zero-knowledge explicada](/es/blog/zero-knowledge-sync) — el protocolo
- [Configuración del servidor](/es/guide/server) — instalación, configuración y endurecimiento en producción
- [Seguridad](/es/guide/security) — modelo de amenazas y lista para el operador
