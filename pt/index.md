---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="Gerenciador de senhas auto-hospedado. Apenas texto cifrado no servidor."
  cta-primary="Baixar"
  cta-secondary="Começar"
  download-link="/pt/guide/download"
  quick-start-link="/pt/guide/quick-start"
/>

<HomeSections
  features-title="Por que OpenKey"
  :features="[
    { title: 'Apenas texto cifrado', body: 'Argon2id no dispositivo. O servidor nunca vê sua senha mestra ou chave do cofre.', href: '/pt/guide/security', linkLabel: 'Modelo de segurança' },
    { title: 'Auto-hospede ou Nearby', body: 'Sincronize pela API Docker — ou emparelhe dispositivos na LAN com QR, sem servidor.', href: '/pt/guide/nearby', linkLabel: 'Guia Nearby' },
    { title: 'Preenchimento automático e passkeys', body: 'Autofill do sistema mais extensão do navegador com atalho de preenchimento e WebAuthn.', href: '/pt/guide/extension', linkLabel: 'Extensão do navegador' },
    { title: 'Equipes ainda zero-knowledge', body: 'Orgs e compartilhamentos criptografam com chaves que o servidor não pode desembrulhar.', href: '/pt/guide/sharing', linkLabel: 'Compartilhamento e orgs' }
  ]"
  platforms-title="Onde você trabalha"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Servidor Docker', 'CLI']"
  how-title="Como a sync permanece zero-knowledge"
  :how-steps="['Derive chaves de e-mail + senha mestra com Argon2id', 'Envie apenas um hash de autenticação para login', 'Criptografe nomes, entradas e anexos antes do upload', 'O servidor armazena texto cifrado opaco — nunca a chave do cofre']"
  cta-title="Comece na sua infraestrutura"
  cta-body="Baixe o app, aponte ao servidor ou emparelhe Nearby para sync só na LAN."
  cta-primary="Baixar"
  cta-secondary="Começar"
  cta-security="Leia o modelo de ameaças"
  download-link="/pt/guide/download"
  quick-start-link="/pt/guide/quick-start"
  security-link="/pt/guide/security"
/>

</div>
