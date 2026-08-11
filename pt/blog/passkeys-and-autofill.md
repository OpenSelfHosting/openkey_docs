---
title: Passkeys e autofill no navegador
description: Como o OpenKey preenche logins e passkeys no navegador e como provedor de credenciais do sistema — mantendo os dados do cofre criptografados no cliente.
date: 2026-08-02
cover: /blog/covers/passkeys-and-autofill.svg
---

# Passkeys e autofill no navegador

O cofre no seu celular é metade da história. O login do dia a dia acontece no Chrome, Firefox e na interface de credenciais do SO — por isso o OpenKey oferece uma extensão de navegador **MV3** mais suporte a Autofill do sistema / Provedor de Credenciais no mobile e desktop.

## O que a extensão faz

- Desbloqueia contra seu cofre (ponte local para o app desktop e/ou sincronização auto-hospedada)
- Sugere logins correspondentes em formulários web
- Suporta fluxos WebAuthn / passkey onde o site oferece
- Usa a **mesma** URL de servidor do app quando você sincroniza

Compile e carregue a partir de `openkey_extension`:

```bash
cd openkey_extension
npm install
npm run build
```

Carregue a pasta `dist/` como extensão descompactada. No desktop, desbloqueie o app OpenKey e registre o host de mensagens nativas, ou desbloqueie a extensão contra seu servidor no modo autônomo. Defina a URL do servidor em Opções se usar sincronização, depois desbloqueie com e-mail e senha mestra.

## Autofill do sistema também

No app, ative o OpenKey em **Configurações → Autofill** como provedor de senhas e passkeys do sistema. Esse caminho cobre apps e navegadores que falam com o armazenamento de credenciais do SO — complementar à extensão, não substituto em todas as plataformas.

## Ainda zero-knowledge

O autofill roda após o desbloqueio no cliente. A extensão ou o provedor do SO descriptografa apenas o necessário. A sincronização — se ativada — ainda troca ciphertext opaco. Um banco de sincronização comprometido não vira um dump de senhas preenchidas. Páginas web não confiáveis devem receber segredos apenas por mediação intencional de autofill.

## Combine com o resto da pilha

| Cliente | Função |
|--------|------|
| App | Cofre diário no celular e desktop; Autofill do sistema / passkeys |
| Extensão | Autofill e passkeys no Chrome / Firefox |
| CLI | Segredos de desenvolvedor e geração |
| Servidor | Sincronização opcional de ciphertext |

## Saiba mais

- [Usar o app](/pt/guide/app) — Autofill, navegador e backups
- [Pacotes](/pt/guide/packages) — configuração da extensão
- [Configuração do servidor](/pt/guide/server) — conecte a extensão ao seu host
- [Segurança](/pt/guide/security) — limites de confiança para extensão e mensagens nativas
