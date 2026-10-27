---
title: "Google Password Manager: cuándo quedarse y cuándo irse"
description: Qué hace bien Google Password Manager, dónde se queda corto, cómo exportar desde él y cómo sacar tus contraseñas del ecosistema de Chrome a un vault que controlas tú.
date: 2026-09-21
cover: /blog/covers/google-password-manager.png
---

# Google Password Manager: cuándo quedarse y cuándo irse

«google password manager» es el refinamiento más fuerte del término principal **password manager** — un perfecto 100 de interés relativo, por delante de cualquier marca competidora. «google password» no queda muy lejos, con 93. Eso no es una coincidencia: una buena parte de la gente que busca «password manager» ya está usando uno y no se da cuenta, porque Google lo activó por ella.

Así que la pregunta útil no es «¿es bueno?» — es muy bueno. La pregunta es **cuándo quedarse y cuándo irse**.

## Lo que ya tienes

Google Password Manager está integrado en Chrome y Android, y funciona en otros navegadores mediante una cuenta de Google. Guarda contraseñas, passkeys, códigos y tarjetas de pago, genera contraseñas, señala las credenciales comprometidas y hace autocompletado en tus dispositivos de Google. Es gratis, y es realmente competente.

Para mucha gente, en un solo ecosistema, es la respuesta correcta sin necesidad de pensar más.

## Las cinco razones por las que la gente se va

### 1. Dependencia del ecosistema

El vault vive en una cuenta de Google. Eso es excelente hasta que quieres irte — y en ese momento tus contraseñas están dentro de un formato de exportación de Google, y todo lo que construiste a su alrededor (familias, compartición, claves de hardware) vino con él.

### 2. Compartición fuera del ecosistema

La compartición funciona bien entre cuentas de Google y es incómoda con todo lo demás. Si alguien en tu hogar o tu equipo no está en Google, acabas duplicando entradas o recurriendo a algo inseguro.

### 3. Sin autoalojamiento

No hay ninguna opción de ejecutar la sync en tu propio hardware. Si mantener los datos cifrados en infraestructura que controlas es un requisito, esto es descalificador y no una preferencia.

### 4. Acoplamiento al navegador

Si usas Firefox o Safari, el gestor de Chrome no es tu proveedor nativo de autocompletado. Vuelves a una extensión de terceros o a la tienda de la plataforma, y la ventaja de integración desaparece.

### 5. El modelo de seguridad es un intercambio

El vault está protegido por las credenciales de tu cuenta de Google y el desbloqueo del dispositivo, con la recuperación de cuentas de Google como red de seguridad. Es un diseño razonable — pero es un modelo de confianza fundamentalmente distinto del de un vault zero-knowledge donde nadie, ni siquiera el proveedor, puede recuperar tus datos. Ninguno está mal. Son respuestas distintas a «quién es el respaldo si olvido mi contraseña maestra», y deberías elegir la respuesta con la que te sientes cómodo en lugar de la más fácil.

## Quedarte: haz que Google Password Manager sea bueno

Si te quedas, estos son los ajustes que importan:

1. **Activa las passkeys** donde los sitios las ofrezcan — son la credencial más fuerte y el gestor las maneja bien.
2. **Activa el generador integrado al registrarte**, así las contraseñas nuevas nunca se inventan.
3. **Revisa el Password Checkup** (Security → Password Checkup) y actúa sobre las entradas reutilizadas o comprometidas.
4. **Añade un correo de recuperación y un teléfono de recuperación** que controles de verdad.
5. **Añade una passkey como segundo factor** en la propia cuenta de Google — no solo una contraseña.
6. **Activa la sync cifrada** si se ofrece en tu región, y nunca dejes un perfil del navegador con la sesión iniciada desbloqueado en una máquina compartida.

## Irse: exportar desde Chrome

La exportación de Chrome es un CSV en texto plano. Es rápida, y es el archivo que más a menudo la gente deja tirado por accidente — trátalo como una copia viva de tus contraseñas.

```bash
# Take a backup of the export before you do anything else
cp passwords.csv ~/secure-backup-dir/chrome-export-$(date +%F).csv
```

1. Abre `chrome://password-manager/settings`.
2. Busca **Export passwords** (o `chrome://password-manager/export`).
3. Guarda el CSV.
4. **Inmediatamente**, muévelo fuera de tu carpeta Descargas a almacenamiento cifrado.

El CSV contiene las columnas `name`, `url`, `username`, `password` y `note`. Los campos personalizados son limitados, y las tarjetas pueden llegar en una exportación aparte según cómo tengas configurada la cuenta.

## Importar en un gestor que controlas

En OpenKey: **Ajustes → Datos → Importar y exportar → Importar → Chrome CSV**. Elige el archivo, confirma y la importación se ejecuta localmente — tu texto plano no va a ningún servidor.

Qué esperar: los inicios de sesión llegan como entradas, `url` se convierte en la coincidencia de sitio, `username` y `password` se mapean directamente y `note` se convierte en el campo de notas de la entrada. En la exportación de Chrome no existen carpetas anidadas, así que después querrás construir una estructura de colecciones — la útil siendo **colecciones por nivel de confianza** (finanzas, trabajo, compras, desechable) en lugar de por sitio.

Luego:

1. **Activa el autocompletado** en el nuevo gestor antes de hacer cualquier otra cosa ([guía de configuración](/es/blog/autofill-passwords)).
2. **Desactiva el autocompletado de Chrome** para que los dos no se peleen: `chrome://settings/addresses` → desactiva el inicio de sesión automático con las contraseñas guardadas y pon como gestor de contraseñas el nuevo.
3. **Borra tu almacén de contraseñas de Chrome** una vez verificado el nuevo vault — `chrome://password-manager/settings` → **Delete passwords from Chrome**.
4. **Borra el CSV de forma segura.**
5. **Rota las contraseñas importantes** que pasaron tiempo en texto plano: correo, banca, nube.

Recorrido completo, incluida la solución de problemas: [Importar contraseñas desde Chrome](/es/blog/import-passwords-from-chrome).

## Una estructura de colecciones sugerida

Una vez importado, reordena por confianza y no por costumbre:

| Colección | Contenido | Tratamiento |
|-----------|-----------|-------------|
| Finanzas | Banca, pagos, impuestos | 2FA más passkey donde sea posible |
| Identidad | Correo, organismos oficiales, raíz de la nube | Las contraseñas más fuertes, passkeys, copia de la clave de hardware |
| Trabajo | Cuentas del empleador | Nunca reutilizar; revisar en la baja |
| Compras | Todo lo desechable | Contraseñas largas y aleatorias, sin esfuerzo con el 2FA |
| Dispositivos | Router, NAS, cámaras, hogar inteligente | Generadas, también guardadas sin conexión |

## Qué dicen los datos de búsqueda

La marca de Google es el centro gravitatorio de esta categoría. Refinamientos de «password manager» según Google Trends (en todo el mundo, últimos 12 meses):

| Consulta relacionada | Interés relativo |
|----------------------|------------------|
| **google password manager** | **100** |
| google password | 93 |
| what is a password manager | 39 |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| windows password manager | 8 |
| apple password manager | 8 |
| microsoft password manager | 7 |
| bitwarden | 7 |
| gmail password manager | 5 |
| samsung password manager | 5 |
| 1password | 4 |

Lee la forma de esa tabla con cuidado. Los cuatro integrados de plataforma — Google, Windows, Apple, Microsoft — aparecen todos, y la variante «app» de la consulta resuelve a «google password manager app» con 100. Mientras tanto, los términos de marca dedicada son mucho más bajos: Bitwarden con 7, 1Password con 4.

El tráfico de búsqueda de la categoría es, en su enorme mayoría, **«ya tengo uno y me parece bien»** en lugar de «ayúdame a elegir». Dos consecuencias para quien publica en este espacio: una buena parte de quienes buscan necesitan contenido de migración y solución de problemas más que guías de compra, y los integrados de plataforma compiten por los valores por defecto más que por las funciones.

Otro grupo independiente muestra el mismo patrón — bajo «password manager android», «google password manager android» lidera con 100, con «chrome password manager android» en 20 y «best free password manager android» subiendo cerca de un 80% interanual. Bajo «chrome password manager», la única consulta relacionada fuerte es «chrome password manager security» con 100, ella misma subiendo cerca de un 50%, lo que se lee como gente preguntando si es seguro en lugar de cómo usarlo.

Method: Google Trends, en todo el mundo, últimos 12 meses, consultado en septiembre de 2026. Los valores son interés relativo normalizado (0–100), no volúmenes de búsqueda.

## La versión de un minuto

Google Password Manager es gratis, bueno y la respuesta correcta si toda tu vida está en un único ecosistema de Google y te va bien que Google sea la vía de recuperación. Déjalo si necesitas compartición con cuentas que no son de Google, autocompletado nativo entre navegadores o tu propio servidor. Si te vas, exporta el CSV, impórtalo localmente, activa el autocompletado en el nuevo gestor, desactiva el de Chrome, borra las contraseñas almacenadas en Chrome, destruye el CSV con `shred` y rota todo lo que haya pasado en texto plano.

## Próximos pasos

- [Importar contraseñas desde Chrome](/es/blog/import-passwords-from-chrome) — el recorrido completo
- [¿Qué es un gestor de contraseñas?](/es/blog/what-is-a-password-manager) — los fundamentos
- [Autocompletar contraseñas](/es/blog/autofill-passwords) — haz el cambio sin fisuras
- [Gestor de contraseñas autoalojado](/es/blog/self-hosted-password-manager) — la vía de ser dueño de tus datos
