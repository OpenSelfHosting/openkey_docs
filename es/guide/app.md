# Usar la app

OpenKey es el cliente móvil y de escritorio para Android, iOS, macOS, Linux y Windows. Las funciones básicas del vault son gratuitas; OpenKey Pro desbloquea extras. Tu vault permanece cifrado en el dispositivo; un [servidor](./server) autoalojado es opcional para sincronizar. La app instálala desde la tienda oficial o el canal de descarga de tu plataforma.

<img src="/app_icon.png" alt="OpenKey app icon" width="96" height="96" style="border-radius: 20px; margin: 1rem 0;" />

## Instalar

1. Obtén OpenKey en la tienda / distribuidor oficial de tu plataforma.
2. Abre la app y crea o desbloquea un vault con tu contraseña maestra.

Los paquetes relacionados de este proyecto incluyen el [servidor](./server), la [extensión del navegador](./extension) y la [CLI](./cli).



## Gratis frente a OpenKey Pro

Las funciones básicas del vault funcionan sin conexión y sin suscripción. En Android, iOS, macOS, Windows y Linux, Pro sube los límites y desbloquea extras. Las builds web aún no aplican Pro. En plataformas **sin** IAP de tienda (típicamente Windows/Linux), un par Nearby puede compartir una certificación **LAN Pro** — solo comodidad, no prueba criptográfica de compra (las plataformas con IAP ignoran LAN Pro).

| | Gratis | Pro |
|--|------|-----|
| Entradas de inicio de sesión | Hasta **50** | Ilimitado |
| Colecciones (carpetas) | Hasta **3** | Ilimitado |
| Tarjetas / cripto / secretos | Hasta **3** cada uno | Ilimitado |
| Sync de servidor, autocompletado, importar | Sí | Sí |
| **Exportar**, copia **`.okbak`**, **Nearby**, **orgs/compartir**, **adjuntos**, **icono** | — | Sí |

Gestiona la suscripción en **Ajustes → OpenKey Pro** cuando haya facturación de tienda.

## Sincronización Nearby en LAN (Pro)

Sincroniza el mismo vault entre tus dispositivos en el Wi‑Fi local sin servidor:

1. Desbloquea OpenKey en ambos dispositivos y abre **Ajustes → Dispositivos cercanos**.
2. Inicia Nearby en ambos, empareja con el código corto y toca **Vincular vault**.
3. Deben compartir una misma clave de vault (misma huella). Si difieren, el receptor puede adoptar la del par (reemplaza datos locales tras confirmar la contraseña maestra).
4. Tras vincular, los cambios se sincronizan mientras ambos estén desbloqueados; usa **Sincronizar ahora** para un alcance manual.
5. **Visible en la red local** se recuerda: tras activarlo una vez, Nearby se reanuda al desbloquear (se pausa al bloquear).
6. Opcional **Solo redes de confianza**: añade SSIDs; Nearby se pausa en redes desconocidas.
7. **Dispositivos de confianza**: tras un emparejamiento + vínculo, se reconectan solos cuando Nearby está activo.

La sync LAN mueve solo **texto cifrado** (LWW por revision). No es una copia de seguridad. Ver [FAQ](./faq) · [Compartir](./sharing) · [Importar y exportar](./import-export).

## Crear o desbloquear un vault

1. Elige una **contraseña maestra** fuerte (se recomiendan 12+ caracteres con tipos mixtos).
2. Acepta los avisos del vault: **no hay recuperación** si olvidas la contraseña maestra; los datos están cifrados en el dispositivo; las copias de seguridad importan.
3. Desbloquea con la contraseña maestra cada vez que abras la app.

La contraseña maestra nunca sale del dispositivo en texto plano.

## Uso diario

### Inicio del vault

- Navega por **colecciones** (carpetas) y **entradas** de contraseñas.
- Busca, filtra por etiquetas y abre una entrada para copiar usuario/contraseña o ver campos personalizados.
- Crea entradas con URLs, notas, iconos y TOTP donde se admita.

### Generador de contraseñas

Abre **Ajustes → Generador de contraseñas** (o el generador desde el formulario de entrada) para crear contraseñas fuertes con tu longitud y reglas de caracteres.

### Tarjetas, cripto y secretos

Áreas reservadas del vault contienen:

- **Tarjetas de pago**
- **Monederos cripto**
- **Secretos de desarrollador** (tokens API, claves SSH, fragmentos `.env`) — también usados por la [CLI](./cli)

### Organizaciones y compartición

Comparte colecciones o elementos individuales con otros usuarios de OpenKey en el mismo servidor. Los nombres de org y los payloads de compartición permanecen como texto cifrado en el servidor.

## Mapa de ajustes

| Área | Función |
|------|----------------|
| **Apariencia** | Modo de tema e idioma (mismos idiomas que este sitio de documentación) |
| **Seguridad** | Bloqueo / biometría / protecciones relacionadas |
| **Generador de contraseñas** | Opciones de generación predeterminadas |
| **Datos** | Sync del servidor, importación/exportación, copias de seguridad, extensión del navegador, compartición |
| **Autocompletar** | Autofill del sistema / Credential Provider (móvil y escritorio) y passkeys |
| **OpenKey Pro** | Gestión de suscripción donde esté disponible |

## Conectar un servidor autoalojado

1. Ejecuta [OpenKey Server](./server).
2. **Ajustes → Datos → Servidor autoalojado** → configura la URL → **Registrarse** o **Iniciar sesión** → **Sincronizar ahora**.

Detalles: [Instalar el servidor](./server).

## Autocompletar y navegador

- **Autofill móvil / escritorio:** activa OpenKey como proveedor del sistema de contraseñas y passkeys en Ajustes → Autocompletar.
- **Navegador:** instala la extensión; en escritorio, desbloquea la app y registra el host nativo, o desbloquea la extensión contra tu servidor en modo independiente.

## Importar, exportar y copia de seguridad

- **Importar / exportar:** mueve contraseñas dentro o fuera (Bitwarden JSON, Chrome CSV, 1Password CSV, OpenKey JSON). La exportación descifra en el dispositivo — trata el archivo como sensible.
- **Copia / restauración local:** copias cifradas del dispositivo (Pro donde se requiera).
- Prefiere copias offline aunque uses sync del servidor — una contraseña maestra olvidada no se puede recuperar del servidor.

## Buenas prácticas

- Usa una contraseña maestra única y fuerte.
- Sincroniza tras cambios importantes cuando uses un servidor.
- Mantén al menos una copia offline.
- Bloquea el vault al alejarte de una máquina compartida.

Siguiente: [Instalar el servidor](./server) · [CLI](./cli) · [Inicio rápido](./quick-start)

Also: [Download](./download) · [Sharing](./sharing) · [Import & export](./import-export) · [FAQ](./faq) · [Changelog](./changelog)
