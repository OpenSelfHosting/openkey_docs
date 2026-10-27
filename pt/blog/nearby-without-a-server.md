---
title: Nearby sem servidor
description: Descubra pares no Wi‑Fi, copie um cofre na configuração ou vincule cofres para sync na LAN — sem API auto-hospedada.
date: 2026-08-06
cover: /blog/covers/nearby-without-a-server.png
---

# Nearby sem servidor

Auto-hospedar uma API de sincronização é poderoso — e opcional. **Nearby** (OpenKey Pro) mantém a mesma postura zero-knowledge na sua rede local: os dispositivos se descobrem, emparelham para uma chave de sessão, e você **copia um cofre** para um dispositivo novo na configuração ou toca explicitamente em **Vincular cofre** para sync de mesclagem contínua. O emparelhamento sozinho nunca compartilha automaticamente a chave do cofre.

## Quando usar

- Dois ou mais dos seus dispositivos na mesma rede Wi‑Fi de casa ou escritório
- Você quer sincronização sem subir Docker / Postgres ainda
- Um **telefone ou desktop novo** deve receber uma cópia completa do cofre sem um arquivo `.okbak`
- Precisa de um **Enviar para dispositivo** pontual para um único login sem pull completo do cofre

A sync de mesclagem **não** é backup. Mantenha um [`.okbak`](/pt/guide/import-export) criptografado Pro offline. Redes de convidados e isolamento de clientes quebram a descoberta — use um segmento LAN normal.

## Copiar cofre para um dispositivo novo

1. Desbloqueie o dispositivo existente → **Configurações → Dispositivos próximos** → **Visível na rede local**.
2. No dispositivo novo, escolha **Dispositivo próximo** no seletor de configuração do primeiro uso.
3. Toque no par → confirme → desbloqueie com a **mesma senha mestra**.

Isso envia um arquivo completo do cofre criptografado pela sessão (incluindo anexos). Detalhes: [Nearby → Copiar cofre na configuração](/pt/guide/nearby#copiar-cofre-na-configuração-clonagem-de-cofre).

## Emparelhar para sync contínua

1. Desbloqueie o OpenKey nos dois dispositivos → **Configurações → Dispositivos próximos**.
2. Ative **Visível na rede local**.
3. Toque em um par descoberto para emparelhar (o código curto ainda funciona em cerca de dois minutos quando a descoberta é difícil).
4. Toque em **Vincular cofre** para que ambos compartilhem a mesma impressão digital da chave do cofre.

Se o firewall do Mac bloquear TCP de entrada, o OpenKey pode pedir ao host que anuncia para ligar de volta — permita os prompts de rede do SO.

## Depois de vincular

As alterações sincronizam enquanto ambos os cofres estão desbloqueados e o Nearby está anunciando (**última escrita vence por revisão**, mesma regra do servidor). Dispositivos confiáveis reconectam automaticamente; **Apenas redes confiáveis** opcional pausa o Nearby fora dos seus SSIDs. **Desemparelhar** revoga a confiança na LAN e as reivindicações LAN Pro.

## LAN Pro, em resumo

No Windows / Linux (sem IAP da loja), um par Pro com cofre vinculado pode compartilhar uma atestação **LAN Pro** para que o outro dispositivo desbloqueie limites Pro. Emparelhar sem vínculo não basta. Android, iOS e macOS ignoram — compre ou restaure Pro na loja. Trate a atestação como conveniência, não como prova criptográfica de compra.

## Aprofunde-se

- Passo a passo completo: [Sincronização Nearby na LAN](/pt/guide/nearby)
- Modelo de ameaças: [Segurança](/pt/guide/security)
- Matriz Pro do app: [Usar o app](/pt/guide/app)
- Solução de problemas na FAQ: [O Nearby não encontra o outro dispositivo](/pt/guide/faq)
