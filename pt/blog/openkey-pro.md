---
title: OpenKey Pro — o que desbloqueia (e o que não)
description: Limites grátis vs Pro, Nearby e LAN Pro, IAP da loja vs desktop, e o que permanece grátis em cada plataforma.
date: 2026-08-06
cover: /blog/covers/openkey-pro.svg
---

# OpenKey Pro — o que desbloqueia (e o que não)

O cofre principal do OpenKey funciona offline sem assinatura. O **Pro** aumenta limites e desbloqueia extras importantes quando você sincroniza entre dispositivos, exporta ou compartilha com uma equipe. Aqui está a divisão prática — e o aviso do LAN Pro que frequentemente confunde.

## O que permanece grátis

- Cofre local criptografado (com limites freemium — veja abaixo)
- [Sincronização do servidor](/pt/guide/server) auto-hospedada (apenas ciphertext)
- Autofill do sistema / passkeys onde o SO permite
- Ponte da [extensão do navegador](/pt/guide/extension) para o app desktop desbloqueado
- **Importação** do Bitwarden, CSVs do navegador, KeePass e mais

Limites do nível grátis (builds mobile/desktop que aplicam Pro): **50** entradas de login; **3** coleções, cartões de pagamento, carteiras cripto e segredos de desenvolvedor cada.

## O que o Pro desbloqueia

| Capacidade | Notas |
|------------|--------|
| Entradas / coleções / cartões / cripto / segredos ilimitados | Remove limites grátis |
| **Exportação** + backup criptografado **`.okbak`** | Trate exportações como segredo |
| Sincronização de cofre **Nearby** na LAN | Emparelhar QR, vincular cofre, enviar entrada — [guia](/pt/guide/nearby) |
| Organizações e compartilhamento | Mesmo servidor auto-hospedado |
| Anexos em entradas | ~20 MB cada, ciphertext no servidor |
| Ícone personalizado do app | Onde a plataforma suporta |

Matriz completa: [Preços](/pt/pricing) · [Usar o app → Grátis vs Pro](/pt/guide/app#grátis-vs-openkey-pro).

## LAN Pro não é recibo da loja

Em plataformas **sem** compra no app da loja (tipicamente Windows / Linux), um par Pro pode compartilhar uma atestação **LAN Pro** via Nearby para que o outro dispositivo desbloqueie limites Pro na LAN.

- Apenas conveniência — **não** é prova criptográfica de compra
- Android, iOS e macOS **ignoram** LAN Pro; compre ou restaure Pro nessa loja
- Desemparelhar interrompe a atestação

## Builds web

**As builds web ainda não aplicam Pro.** As builds mobile e desktop da loja/desktop aplicam. Planeje de acordo se testar no navegador.

## Aprofunde-se

- [Preços](/pt/pricing) — planos, como comprar, cancelar
- [Nearby sem servidor](/pt/blog/nearby-without-a-server)
- [Importação e exportação](/pt/guide/import-export)
- [Compartilhamento e organizações](/pt/guide/sharing)
- [FAQ](/pt/guide/faq)
- [Segurança](/pt/guide/security)
