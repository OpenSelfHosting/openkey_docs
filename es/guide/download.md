# Descargar e instalar

Obtén la app OpenKey y, opcionalmente, conecta un [servidor autoalojado](./server), la [extensión del navegador](./extension) o la [CLI](./cli).

Id de aplicación: `com.openselfhosting.openkey` · Org: [OpenSelfHosting](https://github.com/OpenSelfHosting)

Las fichas de tienda y las Releases de GitHub se despliegan por plataforma. Hasta que un enlace de tienda esté activo, compila desde el monorepo o usa un artefacto de escritorio de tu propia ejecución de `build_all/`. Las páginas públicas de tienda pueden seguir pendientes de revisión aunque los scripts de empaquetado produzcan bundles de Play / App Store / Flathub en local.

## Móvil

| Plataforma | Canal | Notas |
|----------|---------|--------|
| **Android** | Google Play (`com.openselfhosting.openkey`) cuando esté listado · APK/AAB sideload desde `build_all/` | Busca **OpenKey** de OpenSelfHosting cuando la ficha sea pública |
| **iOS** | App Store cuando esté listado · archivo Xcode | Busca **OpenKey** de OpenSelfHosting cuando la ficha esté aprobada |

Activa **Ajustes → Autocompletar** para que OpenKey pueda rellenar contraseñas y passkeys en todo el sistema.

## Escritorio

| Plataforma | Canal | Artefacto / notas |
|----------|---------|------------------|
| **macOS** | Mac App Store (cuando esté listado) · `.dmg` / `.zip` directo | Builds Apple Silicon e Intel desde empaquetado (`build_all/macos/`) |
| **Windows** | Microsoft Store (cuando esté listado) · instalador Inno Setup · `.zip` portable | El paquete de tienda es `.msix`; el sideload usa `*-setup.exe` cuando Inno Setup está disponible |
| **Linux** | Flathub · Snap Store (cuando esté listado) · `.tar.gz` / `.deb` | Id Flatpak / Snap: `com.openselfhosting.openkey`. Aún no hay AppImage — usa el tarball portable o `.deb` de `build_all/` / scripts de empaquetado |

Autocompletar de escritorio registra el **host de mensajería nativa** usado por la [extensión del navegador](./extension). Mantén el vault desbloqueado mientras rellenas desde el navegador.

### Compilar escritorio tú mismo

```bash
cd openkey_app
./build_all.sh --desktop    # or --macos / host-specific flags
```

Consulta `openkey_app/packaging/README.md` para el empaquetado de tiendas (Play, App Store, Microsoft Store, Snap, Flathub).

## Extensión del navegador

Chrome / Edge / Firefox (MV3). Aún no en las fichas públicas de Web Store — carga una build descomprimida:

```bash
cd openkey_extension
npm install && npm run build
```

Luego carga `dist/` en `chrome://extensions` o Firefox `about:debugging`. Configuración completa: [Extensión del navegador](./extension).

## Servidor y CLI

| Paquete | Instalación |
|---------|---------|
| **Servidor** | Docker Compose en `openkey_server` — [Configuración del servidor](./server) |
| **CLI** | Node 20+ en `openkey_cli` (`npm link`) — [CLI](./cli) |

Pila local rápida: [Inicio rápido](./quick-start).

## Tras instalar

1. Crea o desbloquea un vault con una contraseña maestra fuerte ([Usar la app](./app)).
2. Opcional: apunta **Ajustes → Datos → Servidor autoalojado** a la URL de tu API y sincroniza.
3. Opcional (Pro): empareja dispositivos con **Nearby** para sync del vault en LAN sin servidor — [guía Nearby](./nearby).
4. En escritorio: conecta la [extensión](./extension) vía Autocompletar / ajustes de Extensión del navegador.

Siguiente: [Usar la app](./app) · [Nearby](./nearby) · [Extensión del navegador](./extension) · [Configuración del servidor](./server)
