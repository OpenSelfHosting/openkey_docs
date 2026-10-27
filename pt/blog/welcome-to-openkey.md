---
title: Bem-vindo ao OpenKey
description: Por que construímos um gerenciador de senhas auto-hospedado que armazena apenas ciphertext — e o que está disponível no app, servidor, extensão e CLI.
date: 2026-08-05
cover: /blog/covers/welcome-to-openkey.png
---

# Bem-vindo ao OpenKey

A maioria dos gerenciadores de senhas pede que você confie em uma nuvem que não controla. O OpenKey segue o outro caminho: seu cofre permanece criptografado no dispositivo, um servidor de sincronização opcional armazena **apenas ciphertext**, e as senhas mestras nunca saem do cliente.

## Apenas ciphertext

Os clientes criptografam os dados do cofre antes de qualquer coisa sair do dispositivo. A API de sincronização — se você usar uma — armazena blobs opacos. Nomes de coleções, payloads de entradas, anexos, nomes de organizações e dados de compartilhamento permanecem ciphertext em repouso. Comprometer o banco de dados rende salts, parâmetros KDF, chaves encapsuladas e blobs — não logins legíveis.

## O que está disponível hoje

| Peça | Função |
|-------|------|
| **App** | Cofre do dia a dia no Android, iOS, macOS, Linux e Windows — logins, cartões, carteiras cripto, segredos de desenvolvedor, organizações e compartilhamento |
| **Servidor** | API de sincronização zero-knowledge FastAPI + PostgreSQL que você pode auto-hospedar |
| **Extensão** | Autofill e passkeys MV3 para Chrome e Firefox |
| **CLI** | Geração de senhas offline, descoberta de segredos locais e sincronização opcional |

Você também pode sincronizar o cofre entre dispositivos na mesma rede Wi‑Fi com **Nearby** (Pro) — sem servidor necessário para esse caminho na LAN. A sincronização do servidor e o Nearby movem apenas ciphertext (última escrita vence por revisão).

## Comece agora

- [Início rápido](/pt/guide/quick-start) — execute a pilha localmente
- [Usar o app](/pt/guide/app) — fluxos do cofre no celular e desktop
- [Segurança](/pt/guide/security) — modelo zero-knowledge e limites de confiança
- [Configuração do servidor](/pt/guide/server) — instale e vincule seu próprio host de sincronização

Também no blog: [sincronização zero-knowledge](/pt/blog/zero-knowledge-sync), [Nearby sem servidor](/pt/blog/nearby-without-a-server), [auto-hospedagem](/pt/blog/self-host-your-vault), [passkeys e autofill](/pt/blog/passkeys-and-autofill) e a [CLI para desenvolvedores](/pt/blog/cli-for-developers). O código está em [OpenSelfHosting no GitHub](https://github.com/OpenSelfHosting).
