# Importar y exportar

Mueve contraseñas entre OpenKey y otros gestores, o haz una copia cifrada completa del vault. Ruta: **Ajustes → Datos → Importar y exportar** (y **Copia de seguridad y restauración** para `.okbak`).

| Acción | Gratis | Pro |
|--------|------|-----|
| Importar (todos los formatos de abajo) | Sí | Sí |
| Exportar (todos los formatos de abajo) | — | Sí |
| Copia / restauración local cifrada (`.okbak`) | — | Sí |

Las exportaciones y copias se descifran en el dispositivo antes de escribir un archivo — trata cada exportación como **secreto**. Prefiere almacenamiento cifrado sin conexión. Ver [FAQ](./faq) y [Gratis frente a Pro](./app#gratis-frente-a-openkey-pro).

## Guía de importación

1. Desbloquea OpenKey.
2. **Ajustes → Datos → Importar y exportar → Importar**.
3. Elige un formato, selecciona el archivo, confirma.
4. Revisa las nuevas entradas/colecciones en el vault. Sincroniza con tu [servidor](./server) si usas uno.

### Bitwarden JSON

1. En Bitwarden: exporta **JSON** (exportación sin cifrar — protege el archivo).
2. En OpenKey: Importar → **Bitwarden JSON**.
3. Las carpetas se mapean a colecciones cuando es posible; los inicios de sesión se convierten en entradas.

### Chrome / Edge CSV

1. Gestor de contraseñas del navegador → exportar CSV.
2. OpenKey → Importar → **Chrome CSV**.
3. Espera columnas url / username / password; los campos personalizados pueden ser limitados.

### LastPass CSV

1. LastPass → exportar CSV.
2. OpenKey → Importar → **LastPass CSV**.

### 1Password CSV

1. 1Password → exportar CSV (formato admitido por el importador de OpenKey).
2. OpenKey → Importar → **1Password CSV**.
3. Los tipos de elemento complejos pueden aplanarse a entradas tipo inicio de sesión.

### KeePass (`.kdbx`)

1. OpenKey → Importar → **KeePass `.kdbx`**.
2. Introduce la contraseña de la base de datos y el **archivo de clave** opcional.
3. Los grupos se convierten en colecciones; las entradas se importan como inicios de sesión cuando los campos mapean bien.

Contraseña / archivo de clave incorrectos → desbloqueo fallido; sin ida y vuelta al servidor (todo local).

### OpenKey JSON

Formato de ida y vuelta para exportaciones nativas de OpenKey. Úsalo al mover entre dispositivos sin sync de servidor, o como volcado portable del vault (**Pro** para crear el archivo).

**Adjuntos:** las exportaciones JSON de OpenKey incluyen *metadatos* de adjuntos en las entradas pero **omiten los blobs de texto cifrado de adjuntos**. Para un vault completo con adjuntos, usa una copia cifrada **`.okbak`**.

## Guía de exportación (Pro)

1. **Ajustes → Datos → Importar y exportar → Exportar**.
2. Elige el formato. Para KeePass, define una nueva contraseña de base de datos (y archivo de clave opcional).
3. Guarda el archivo en un sitio cifrado / sin conexión.
4. Elimina las exportaciones en texto plano al terminar la migración.

Exportaciones disponibles: **OpenKey JSON**, **Bitwarden JSON**, **Chrome CSV**, **LastPass CSV**, **KeePass `.kdbx`**, **1Password CSV**.

## Copia de seguridad cifrada (Pro)

**Ajustes → Datos → Copia de seguridad y restauración**

- Crea un `.okbak` completo del vault (base de datos, ajustes, adjuntos) cifrado para restaurar con las credenciales de tu vault.
- Restaurar reemplaza los datos locales del vault — confirma antes de continuar.
- Nearby / sync de servidor **no** es una copia de seguridad ([FAQ](./faq)).

## Tras migrar desde otro gestor

1. Revisa inicios de sesión importantes (y TOTP si lo usabas).
2. Activa [autocompletar](./app) / [extensión](./extension).
3. Sincroniza con tu servidor o empareja Nearby (Pro) para otros dispositivos.
4. Borra de forma segura los archivos de exportación antiguos.
5. Opcionalmente cambia contraseñas que vivieron en un CSV sin cifrar durante la transferencia.

## Relacionado

- [Compartir y organizaciones](./sharing) — texto cifrado de equipo en tu servidor
- [Usar la app](./app)
- [Seguridad](./security) — las exportaciones son material de confianza

Siguiente: [Descargar](./download) · [FAQ](./faq) · [CLI](./cli)
