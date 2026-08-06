---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="Gestor de contraseñas autoalojado. Solo cifrado en el servidor."
  cta-primary="Descargar"
  cta-secondary="Empezar"
  download-link="/es/guide/download"
  quick-start-link="/es/guide/quick-start"
/>

<HomeSections
  features-title="Por qué OpenKey"
  :features="[
    { title: 'Solo cifrado', body: 'Argon2id en el dispositivo. El servidor nunca ve tu contraseña maestra ni la clave del vault.', href: '/es/guide/security', linkLabel: 'Modelo de seguridad' },
    { title: 'Autoalojado o Nearby', body: 'Sincroniza con tu API en Docker — o empareja dispositivos en la LAN con QR, sin servidor.', href: '/es/guide/nearby', linkLabel: 'Guía Nearby' },
    { title: 'Autocompletar y passkeys', body: 'Autofill del sistema más una extensión con atajo de relleno y WebAuthn.', href: '/es/guide/extension', linkLabel: 'Extensión del navegador' },
    { title: 'Equipos aún zero-knowledge', body: 'Orgs y compartidos cifran con claves que el servidor no puede desenvolver.', href: '/es/guide/sharing', linkLabel: 'Compartir y orgs' }
  ]"
  platforms-title="Donde tú trabajas"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Servidor Docker', 'CLI']"
  how-title="Cómo el sync sigue siendo zero-knowledge"
  :how-steps="[
    'Deriva claves del email + contraseña maestra con Argon2id',
    'Envía solo un auth hash para iniciar sesión',
    'Cifra nombres, entradas y adjuntos antes de subir',
    'El servidor guarda cifrado opaco — nunca la clave del vault',
  ]"
  cta-title="Empieza en tu infraestructura"
  cta-body="Descarga la app, apunta a tu servidor o empareja Nearby solo en LAN."
  cta-primary="Descargar"
  cta-secondary="Empezar"
  cta-security="Leer el modelo de amenazas"
  download-link="/es/guide/download"
  quick-start-link="/es/guide/quick-start"
  security-link="/es/guide/security"
/>

</div>
