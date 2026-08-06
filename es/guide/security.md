# Seguridad

OpenKey está diseñado para que el servidor no pueda leer tu vault.

## Derivación de claves

<img src="/guide/security-key-derivation.svg" alt="Key derivation: Argon2id turns email and master password into a master key, which yields an auth hash for login and a wrapped vault key for AES-256-GCM ciphertext" class="ok-diagram" width="920" height="400" />

1. `Argon2id(email + master_password, salt)` produce una clave maestra.
2. La clave maestra deriva un **auth hash** (enviado al servidor para el login) y envuelve la **clave del vault**.
3. La clave del vault cifra nombres de colecciones y cargas de entradas (**AES-256-GCM**).
4. La clave de cifrado de la base de datos local se deriva de la clave del vault.
5. La contraseña maestra nunca sale del dispositivo.

## Qué almacena el servidor

| Almacena | No almacena |
|--------|------------|
| `auth_hash` | Contraseña maestra |
| Sal y parámetros KDF | Clave del vault en texto plano |
| Clave del vault envuelta (cifrada) | Nombres de colecciones descifrados |
| Texto cifrado opaco de datos del vault, adjuntos, orgs, compartidos | Cargas de entradas en texto plano |
| Entradas compartidas de org (`encrypted_payload` bajo colecciones de org) | Clave de org en texto plano (los clientes la desenvuelven vía claves de org envueltas) |

Los elementos del vault eliminados de forma suave permanecen como **tombstones** hasta que los pares sincronicen; last-write-wins usa `revision` por elemento.

## Tokens

- Los JWT de acceso son de corta duración.
- Los refresh tokens se hashean en reposo y se rotan al usarse.
- Los endpoints de auth tienen límite de tasa por IP del cliente.

## Modelo de amenazas

### Límites de confianza

| Componente | Supuesto de confianza |
|-----------|------------------|
| Dispositivo / vault local | Raíz de confianza mientras está desbloqueado; el usuario del SO puede leer la memoria y el archivo de BD cifrada |
| Servidor de sync autoalojado | No confiable para confidencialidad — solo texto cifrado; confiable para disponibilidad y comparación de auth-hash |
| Extensión del navegador | Confiable con el texto plano del vault tras desbloquear; las páginas web no confiables no deben recibir secretos más allá del autocompletado intencional. `<all_urls>` es necesario para relleno/captura/WebAuthn universal — ver [Extensión del navegador](./extension#permisos). |
| Host de mensajería nativa | Puente solo local a la app de escritorio desbloqueada; solo respuestas con vault desbloqueado |
| CLI / puente de escritorio | Misma confianza local que la sesión de la app desbloqueada |
| Nearby / emparejamiento LAN | Los pares emparejados comparten una clave de sesión; tras **Vincular vault**, intercambian el mismo material de clave del vault y sincronizan texto cifrado en la LAN — trata emparejamiento + vínculo como confianza plena del vault |

### Qué pueden y no pueden hacer los atacantes

| Atacante | Puede | No puede (por diseño) |
|----------|-----|---------------------|
| Admin de servidor comprometido | Borrar/retener texto cifrado, reemplazar blobs, observar metadatos (email, tamaños, tiempos) | Descifrar entradas del vault, recuperar la contraseña maestra solo a partir de `auth_hash` |
| MITM de red (sin TLS) | Interceptar JWT y texto cifrado en tránsito | Leer texto plano sin la clave del vault |
| Dispositivo bloqueado robado | Atacar sin conexión el vault envuelto con Argon2id (se requiere contraseña maestra fuerte) | Desbloquear sin la contraseña maestra / envoltorio biométrico |
| Dispositivo desbloqueado robado | Leer texto plano del vault desde memoria / sesión activa | — (fuera de alcance) |
| Página web maliciosa | Disparar la UI de autocompletado; intentar phishing | Leer el vault completo vía content scripts sin mediación del usuario/extensión |
| Par malicioso de org/compartido | Compartir texto cifrado que puede descifrar con claves que envolviste para él | Descifrar elementos personales del vault no relacionados |
| Par Nearby malicioso | Enviar entradas / reclamar LAN Pro / recibir texto cifrado del vault tras el vínculo | Desbloquear Pro en plataformas con IAP de tienda (Android/iOS/macOS ignoran LAN Pro); descifrar texto cifrado LAN sin la clave compartida del vault |

### No objetivos explícitos

- **Sin recuperación de contraseña maestra** — si la pierdes, el texto cifrado es irrecuperable.
- **El servidor no puede descifrar** cargas de vault, adjuntos, org o compartidos.
- **La sync es LWW por revision**, no un CRDT — las ediciones concurrentes pueden sobrescribirse; el servidor ecoa las filas ganadoras cuando un push obsoleto pierde. La **sync Nearby del vault en LAN** usa la misma regla LWW entre dispositivos emparejados y con vault vinculado (no sustituye copias sin conexión).
- La **certificación LAN Pro** es una comodidad entre dispositivos emparejados en plataformas sin IAP de tienda — no una prueba criptográfica de compra.

### Lista de endurecimiento operativo

- Configura un `JWT_SECRET` fuerte y único (mín. 32 caracteres; los marcadores se rechazan al arrancar).
- Termina **HTTPS** delante de la API en producción.
- Mantén `CORS_ORIGINS` como lista blanca explícita (**nunca `*`**).
- Prefiere mantener el vault **bloqueado en inactividad**; activa el desbloqueo biométrico con cuidado.
- Usa **Ajustes → Seguridad → Salud de contraseñas** para encontrar contraseñas débiles/reutilizadas; las comprobaciones HIBP opcionales envían solo un **prefijo** del hash SHA-1 (k-anonimato), nunca la contraseña.
- Trata exportaciones / copias como material secreto — almacena sin conexión y cifrado.
- Empareja dispositivos Nearby solo con personas/dispositivos de confianza; **Vincular vault** comparte material de la clave del vault por la sesión LAN — desempareja para revocar reclamaciones LAN Pro y detener la sync.
- Informa vulnerabilidades en privado — ver [Informar vulnerabilidades](#informar-vulnerabilidades).

## Informar vulnerabilidades

Si crees haber encontrado un problema de seguridad en OpenKey (servidor, extensión, CLI, docs o app), infórmalo en **privado**.

**No** abras un issue público de GitHub para vulnerabilidades explotables.

- Email: **security@openselfhosting.com**
- O abre un aviso de seguridad **privado** bajo [OpenSelfHosting](https://github.com/OpenSelfHosting)

Incluye el paquete afectado, versión/commit si se conoce, pasos para reproducir e impacto. Intentamos acusar recibo en **7 días**. Política completa: archivo del paquete `SECURITY.md` (también en la raíz del monorepo).

## Reglas prácticas

- Elige una contraseña maestra fuerte — es la raíz de confianza.
- Mantén `JWT_SECRET` (servidor) largo y único; los marcadores se rechazan al arrancar.
- Prefiere HTTPS en producción y restringe `CORS_ORIGINS` (sin `*`).
- Haz copia de seguridad de la exportación / materiales de recuperación sin conexión.

## Nota de empaquetado

Los paquetes publicados incluyen el **servidor**, la **extensión del navegador**, la **CLI** y la **documentación** (MIT). Este monorepo puede contener un checkout de desarrollo de la **app OpenKey** móvil/escritorio usado para trabajo entre paquetes. Consulta las guías de [resumen](./overview) y [paquetes](./packages).

Para detalles de la API, consulta el README del paquete `openkey_server` y `/docs` en un servidor en ejecución.
