---
title: Importar contraseñas desde Chrome
description: Cómo exportar contraseñas de Chrome, Edge y Google Password Manager, importarlas en otro gestor de contraseñas y luego borrar la exportación de forma segura.
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Importar contraseñas desde Chrome

La exportación es la parte fácil. La parte peligrosa son los diez minutos siguientes, cuando un CSV en texto plano con todas las contraseñas que tienes está en tu carpeta Descargas.

Este es el proceso completo: exportar desde Chrome, Edge o Google Password Manager; importar en tu nuevo vault; verificar; y luego destruir el archivo. Reserva quince minutos la primera vez.

## Primero, entiende lo que vas a crear

Una exportación de contraseñas de Chrome es un **CSV en texto plano**. Quien lo abra tiene tus contraseñas — sin contraseña maestra, sin cifrado, sin segundo factor. Trátalo como una lista impresa de las llaves de tu casa.

Tres reglas para todo el procedimiento:

1. **Nunca lo envíes por correo, lo mensajees ni lo subas a un sitio conversor.** Subir una exportación de contraseñas a una herramienta de terceros de «convierte mi CSV» te entrega el vault entero.
2. **Haz la importación en el dispositivo donde ya está el archivo.** Mover el archivo multiplica tu exposición.
3. **Borra la exportación en el momento en que verifiques la importación** — bien, no solo vaciando la papelera.

## Exportar desde Chrome

El gestor integrado de Chrome y Google Password Manager (la versión sincronizada con la cuenta) son la misma vía de exportación, y se cubren ambos.

1. Abre `chrome://password-manager/settings`.
2. Desplázate hasta **Export passwords**, o ve directamente a `chrome://password-manager/export`.
3. Chrome te pide que te vuelvas a autenticar — introduce la contraseña de tu cuenta de Google o las credenciales de tu dispositivo.
4. Guarda el archivo y luego **muévelo fuera de Descargas** a una ubicación cifrada antes de hacer cualquier otra cosa.

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### Qué hay en el archivo

| Columna | Contenido |
|---------|-----------|
| `name` | El nombre del sitio tal como lo guardó Chrome |
| `url` | La URL completa, incluido el subdominio |
| `username` | Tu nombre de usuario o correo |
| `password` | La contraseña, en texto plano |
| `note` | Cualquier nota que hayas añadido |

No hay estructura de carpetas — Chrome no tiene carpetas. Todo aterriza plano, y por eso importa el paso de colecciones posterior.

## Exportar desde Edge

Microsoft Edge usa el mismo almacén de contraseñas de Chromium:

1. Abre `edge://wallet/passwords`.
2. **Más ajustes → Export passwords**, o ve a `edge://wallet/exportpasswords`.
3. Vuelve a autenticar, guarda y mueve el archivo a algún sitio cifrado.

## Exportar directamente desde Google Password Manager

Si usas el gestor sincronizado con la cuenta entre dispositivos, puedes exportar desde cualquier navegador con la sesión iniciada en `passwords.google.com` → **Export passwords**. Produce el mismo CSV, y aplican las mismas reglas.

## Importar en OpenKey

1. Instala y desbloquea OpenKey.
2. **Ajustes → Datos → Importar y exportar → Importar**.
3. Elige **Chrome CSV**.
4. Selecciona el archivo y confirma.

La importación es totalmente local. No hay ida y vuelta al servidor, y tu texto plano no va a un servidor de sync — lo cual importa si usas un servidor autoalojado, porque el CSV nunca se convierte en algo que se le pueda pedir al servidor que produzca.

Otros formatos admitidos, si estás consolidando varias fuentes a la vez: **JSON de Bitwarden**, **LastPass CSV**, **1Password CSV**, **`.kdbx` de KeePass** (contraseña de la base de datos y archivo de clave opcional) y el propio JSON de OpenKey. Las carpetas se convierten en colecciones donde se mapean.

## Reorganizar: crea colecciones por nivel de confianza

La importación es plana, y los vaults planos acaban con contraseñas reutilizadas porque no puedes ver el riesgo. Treinta minutos de orden se pagan solos:

| Colección | Qué va dentro | Regla |
|-----------|---------------|-------|
| Identidad | Correo, raíz de la nube, organismos oficiales | Las contraseñas más fuertes, passkeys, una copia de la clave de hardware |
| Finanzas | Banca, tarjetas de pago, impuestos | 2FA en todo; passkeys donde se ofrezcan |
| Trabajo | Cuentas del empleador | Nunca reutilizar; lista de baja |
| Compras y redes sociales | Todo lo desechable | Contraseñas largas generadas, sin esfuerzo invertido |
| Dispositivos | Router, NAS, cámaras, hogar inteligente | Generadas; también guardadas sin conexión |

Después ponte una regla: **nada nuevo entra en Compras o Social con una contraseña reutilizada.** Con el autocompletado activado, eso ocurre igual de forma automática.

## Activa el autocompletado de inmediato

Este es el paso que hace que la migración se autorepare. Una vez que el autocompletado funciona, cada inicio de sesión a partir de ahora se guarda por ti, así que el vault se mejora solo mientras avanzas con las cuentas importantes.

- [Autocompletar contraseñas](/es/blog/autofill-passwords) — la guía de configuración
- [El autocompletado no funciona](/es/blog/autofill-not-working) — cuando faltan las sugerencias

Luego **desactiva el autocompletado propio de Chrome** para que los dos no compitan:

1. `chrome://settings/addresses`.
2. Desactiva **Offer to save passwords** y **Automatically sign in with saved passwords**.
3. Pon como gestor de contraseñas el que quieras usar.

## Arregla las cuentas de más valor

No rotes 400 contraseñas. Recorre una lista:

1. **Correo** — restablece todo lo demás.
2. **Banca y almacenamiento en la nube** — la nube puede aguantar el resto.
3. **Tu cuenta social principal**.
4. Todo lo demás, a medida que cada sitio lo pida a continuación.

Genera cada contraseña localmente sobre la marcha:

```bash
openkey gen -l 24 -c
```

Añade 2FA mientras ya estás en los ajustes de seguridad ([guía](/es/blog/two-factor-authentication)) y añade una passkey donde el sitio ofrezca una ([¿qué son las passkeys?](/es/blog/what-are-passkeys)).

## Verifica antes de borrar nada

No te saltes esto. Comprueba:

- [ ] Una docena de inicios de sesión importantes se abren correctamente desde el nuevo vault.
- [ ] Las entradas TOTP, si las tenías, producen códigos válidos.
- [ ] El autocompletado funciona en tu navegador principal **y** en tu teléfono.
- [ ] Puedes iniciar sesión en un **segundo dispositivo** y ver las mismas entradas.
- [ ] Has hecho una **copia de seguridad local cifrada** (`.okbak` en OpenKey).

Solo entonces pasa al borrado.

## Borra la exportación, bien

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` es más fiable cuando está disponible, pero ninguno de los dos métodos es fiable en SSDs ni en sistemas de archivos copy-on-write. La respuesta práctica es sobrescribir lo que puedas y luego rotar todo lo que haya pasado en texto plano el tiempo suficiente como para preocuparte.

Una contraseña en un CSV en texto plano durante una semana no es una crisis; la misma contraseña todavía en ese archivo un año después sí lo es.

Luego borra la copia que guarda el navegador: `chrome://password-manager/settings` → **Delete passwords from Chrome**.

## Qué dicen los datos de búsqueda

Migrar es una intención grande y específica — quien busca sabe lo que quiere *hacer*, no qué comprar. Google Trends (en todo el mundo, últimos 12 meses) compara entre sí estos términos de migración:

| Consulta | Interés relativo en el grupo |
|---------|------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

Las dos primeras son toda la historia, y la proporción entre ellas es el hallazgo útil: **la gente busca la exportación más del doble que la importación.** Eso está al revés para la seguridad, porque la exportación crea el artefacto expuesto y la importación es la parte que arregla el problema. El contenido que empieza por la vía de exportación debería pasar de inmediato a la importación y luego al paso de borrado.

La cola larga también es escasa y casi toda con formulaciones nativas en inglés, lo que sugiere una audiencia pequeña y bien definida que ya conoce el vocabulario — el tipo de lector que se beneficia más de un recorrido preciso que de una comparación.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de un minuto

Exporta desde `chrome://password-manager/settings`, mueve el CSV en texto plano fuera de Descargas de inmediato, impórtalo localmente en tu nuevo vault, crea colecciones por nivel de confianza, activa el autocompletado y desactiva el de Chrome, rota el correo y la banca, verifica en un segundo dispositivo y luego sobrescribe y borra el CSV y elimina la copia guardada por Chrome.

## Próximos pasos

- [Autocompletar contraseñas](/es/blog/autofill-passwords) — haz esto antes de rotar nada
- [Google Password Manager](/es/blog/google-password-manager) — el mismo recorrido, planteado en torno al ecosistema de Google
- [Generador de contraseñas fuertes](/es/blog/strong-password-generator) — a qué rotar
- [Importar y exportar](/es/guide/import-export) — todos los formatos admitidos, gratis frente a Pro
