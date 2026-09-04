# Registro de cambios

Notas de publicación de los paquetes OpenKey de este monorepo. La versión de la app sigue `openkey_app` (`pubspec.yaml`). La versión de la documentación sigue este sitio.


## 1.0.6 (2026-08-28)

See [English changelog](/guide/changelog#10-06-2026-08-28) — Linux AppImage/RPM, rounded icons, Nearby, Autofill, Termux CLI; app **1.0.6+7**.

## 1.0.2 (2026-08-13)

See [English changelog](/guide/changelog#10-02-2026-08-13) — web target removed; app **1.0.2+3**.

## 1.0.0 (2026)

Primer corte público de documentación alineado con la app **1.0.0+1** y los paquetes abiertos (`openkey_server`, `openkey_extension`, `openkey_cli`, `openkey_docs`).

### App

- Vault local cifrado: colecciones, inicios de sesión, tarjetas, monederos cripto, secretos de desarrollador, TOTP
- Autocompletar del sistema / Credential Provider y passkeys (según plataforma)
- Sync con servidor autoalojado (solo texto cifrado)
- Sync Nearby del vault en LAN entre dispositivos emparejados (**Pro**)
- Organizaciones, invitaciones y compartidos de elementos/colecciones (**Pro**)
- Importar (gratis) / exportar y copias `.okbak` (**Pro**)
- Límites freemium: 50 entradas, 3 colecciones / tarjetas / cripto / secretos en el nivel gratuito
- Empaquetado para Play, App Store, Mac App Store, Microsoft Store, Snap, Flathub e instaladores de escritorio

### Servidor

- API de sync zero-knowledge FastAPI + PostgreSQL 16
- Auth (`prelogin` / register / login / refresh / rekey / delete), sync, adjuntos, orgs, compartidos
- JWT de corta duración, refresh tokens opacos rotativos, límites de tasa de auth, CORS estricto

### Extensión del navegador

- MV3 Chrome / Firefox: desbloqueo independiente + sync, o puente de mensajería nativa de escritorio
- Autocompletar, guardar/actualizar, passkeys, tarjetas / cripto / secretos, compartidos y orgs (independiente)

### CLI

- `gen` sin conexión, puente nativo a la app de escritorio desbloqueada, `discover`, CRUD de secretos
- Sesión opcional de servidor `login` / `unlock` / `sync`

### Sitio de documentación

- Sitio VitePress del producto en 10 idiomas (RTL para árabe y urdu)
- Guías: resumen, seguridad, inicio rápido, descargar, servidor (incl. proxy inverso HTTPS + resumen de API), app, **Nearby**, extensión, CLI, compartir, importar/exportar, FAQ, paquetes, registro de cambios
- Conjunto completo de guías en **chino (zh)** alineado con EN/AR en las páginas principales
- Entradas del blog (EN + AR completos; otros idiomas indexan al inglés) incluyendo **Nearby without a server**
- Página de inicio: hero + secciones de funciones / plataformas / cómo funciona / CTA

## Sin publicar / siguiente

- URLs de fichas de tienda en vivo cuando cada canal se publique
- Traducciones más completas más allá de EN/AR/zh para guías largas (es/fr/… aún usan stubs enriquecidos en algunas páginas)
- Entradas de changelog por paquete cuando los remotos independientes publiquen releases etiquetadas

## Cómo se relacionan las versiones

| Paquete | Dónde mirar |
|---------|----------------|
| App | `openkey_app/pubspec.yaml` → `version` |
| Servidor | Etiquetas Git / de imagen para `openkey_server` |
| Extensión / CLI | `package.json` en cada paquete |
| Docs | Esta página + despliegue del sitio |

Informa de problemas de seguridad en privado — **security@openselfhosting.com**. Ver [Seguridad → Informar](./security#informar-vulnerabilidades).

Siguiente: [Descargar](./download) · [Nearby](./nearby) · [FAQ](./faq) · [Seguridad](./security)
