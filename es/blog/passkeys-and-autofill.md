---
title: Passkeys y autocompletado en el navegador
description: Cómo OpenKey rellena inicios de sesión y passkeys en el navegador y como proveedor de credenciales del sistema — manteniendo los datos del vault cifrados en el cliente.
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.png
---

# Passkeys y autocompletado en el navegador

El vault en tu teléfono es solo la mitad de la historia. El inicio de sesión diario ocurre en Chrome, Firefox y la UI de credenciales del SO — por eso OpenKey incluye una extensión de navegador **MV3** más soporte de Autofill del sistema / Credential Provider en móvil y escritorio.

## Qué hace la extensión

- Desbloquea contra tu vault (puente local a la app de escritorio, y/o sync autoalojado)
- Sugiere inicios de sesión coincidentes en formularios web
- Admite flujos WebAuthn / passkey donde el sitio los ofrezca
- Usa la **misma** URL de servidor que la app cuando sincronizas

Compílala y cárgala desde `openkey_extension`:

```bash
cd openkey_extension
npm install
npm run build
```

Carga la carpeta `dist/` como extensión sin empaquetar. En escritorio, desbloquea la app OpenKey y registra el host de mensajería nativa, o desbloquea la extensión contra tu servidor en modo independiente. Configura la URL del servidor en Opciones si usas sync, luego desbloquea con email y contraseña maestra.

## También Autofill del sistema

En la app, activa OpenKey en **Ajustes → Seguridad** como proveedor del sistema de contraseñas y passkeys. Esa ruta cubre apps y navegadores que hablan con el almacén de credenciales del SO — complementaria a la extensión, no un reemplazo en todas las plataformas.

## Sigue siendo zero-knowledge

El autocompletado se ejecuta tras el desbloqueo en el cliente. La extensión o el proveedor del SO descifra solo lo necesario. La sync — si está activada — sigue intercambiando texto cifrado opaco. Una base de datos de sync comprometida no se convierte en un volcado de contraseñas rellenadas. Las páginas web no confiables solo deben recibir secretos mediante mediación intencional del autocompletado.

## Combínalo con el resto de la pila

| Cliente | Rol |
|--------|------|
| App | Vault diario en móvil y escritorio; Autofill del sistema / passkeys |
| Extensión | Autocompletado y passkeys en Chrome / Firefox |
| CLI | Secretos de desarrollador y generación |
| Servidor | Sync opcional de texto cifrado |

## Saber más

- [Usar la app](/es/guide/app) — Autofill, navegador y copias de seguridad
- [Paquetes](/es/guide/packages) — configuración de la extensión
- [Configuración del servidor](/es/guide/server) — conecta la extensión a tu host
- [Seguridad](/es/guide/security) — límites de confianza para extensión y mensajería nativa
