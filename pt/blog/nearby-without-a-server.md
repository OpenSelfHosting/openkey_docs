---
title: Nearby sem servidor
description: Emparelhe dispositivos na sua rede Wi‑Fi com códigos QR, vincule cofres e sincronize ciphertext na LAN — sem API auto-hospedada necessária.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# Nearby sem servidor

Auto-hospedar uma API de sincronização é poderoso — e opcional. **Nearby** (OpenKey Pro) mantém a mesma postura zero-knowledge na sua rede local: os dispositivos emparelham, você **Confia e vincula o cofre** explicitamente, e só então o material da chave do cofre se move para que os pares sincronizem **ciphertext**. O emparelhamento sozinho nunca compartilha automaticamente a chave do cofre.

## Quando usar

- Dois ou mais dos seus dispositivos na mesma rede Wi‑Fi de casa ou escritório
- Você quer sincronização sem subir Docker / Postgres ainda
- Precisa de um **Enviar para dispositivo** pontual para um único login sem pull completo do cofre

**Não** é backup. Mantenha um [`.okbak`](/pt/guide/import-export) criptografado Pro offline. Redes de convidados e isolamento de clientes quebram a descoberta — use um segmento LAN normal.

## Emparelhar com QR (preferido)

1. Desbloqueie o OpenKey nos dois dispositivos → **Configurações → Dispositivos próximos**.
2. Ative **Visível na rede local**.
3. Em um dispositivo, mostre o QR de emparelhamento; no outro, **Escanear QR de emparelhamento** (ou **Colar QR de emparelhamento** no desktop Linux/Windows).
4. Toque em **Confiar e vincular cofre** para que ambos compartilhem a mesma impressão digital da chave do cofre.

Digitar o código curto ainda funciona em cerca de dois minutos. Se o firewall do Mac bloquear TCP de entrada após a leitura, o OpenKey pode pedir ao host do QR para ligar de volta — permita os prompts de rede do SO.

## Depois de vincular

As alterações sincronizam enquanto ambos os cofres estão desbloqueados e o Nearby está anunciando (**última escrita vence por revisão**, mesma regra do servidor). Dispositivos confiáveis reconectam automaticamente; **Apenas redes confiáveis** opcional pausa o Nearby fora dos seus SSIDs. **Desemparelhar** revoga a confiança na LAN e as reivindicações LAN Pro.

## LAN Pro, em resumo

No Windows / Linux (sem IAP da loja), um par Pro com cofre vinculado pode compartilhar uma atestação **LAN Pro** para que o outro dispositivo desbloqueie limites Pro. Emparelhar sem vínculo não basta. Android, iOS e macOS ignoram — compre ou restaure Pro na loja. Trate a atestação como conveniência, não como prova criptográfica de compra.

## Aprofunde-se

- Passo a passo completo: [Sincronização Nearby na LAN](/pt/guide/nearby)
- Modelo de ameaças: [Segurança](/pt/guide/security)
- Matriz Pro do app: [Usar o app](/pt/guide/app)
- Solução de problemas na FAQ: [O Nearby não encontra o outro dispositivo](/pt/guide/faq)
