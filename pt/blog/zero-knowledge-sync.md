---
title: Sincronização zero-knowledge explicada
description: Como o OpenKey sincroniza cofres entre dispositivos sem dar plaintext ao servidor — Argon2id, hashes de autenticação e armazenamento apenas ciphertext.
date: 2026-08-04
cover: /blog/covers/zero-knowledge-sync.svg
---

# Sincronização zero-knowledge explicada

Sincronizar é útil. Confiar senhas a uma máquina remota não é. O OpenKey separa essas ideias: você pode sincronizar entre celulares, desktops e a extensão do navegador enquanto o servidor armazena apenas **ciphertext**.

## O que “zero-knowledge” significa aqui

1. Sua senha mestra permanece no dispositivo. Os clientes derivam uma chave mestra com **Argon2id** a partir de e-mail + senha mestra e um salt.
2. O login envia um `auth_hash` — suficiente para provar que você conhece a senha, insuficiente para recuperá-la.
3. Uma **chave do cofre** criptografa nomes de coleções e payloads de entradas com **AES-256-GCM**. O servidor armazena apenas uma chave do cofre encapsulada (criptografada), nunca a chave em plaintext.
4. Anexos, nomes de organizações e payloads de compartilhamento saem do dispositivo já criptografados. A API de sincronização persiste blobs opacos; não pode descriptografá-los mesmo se o banco de dados for copiado.

## Para que serve o servidor

O servidor OpenKey opcional é uma superfície de sincronização e autenticação:

- Registro de conta e login (via `auth_hash`)
- Push / pull de payloads criptografados do cofre (última escrita vence por `revision` por item)
- Organizações e compartilhamentos — ainda ciphertext em repouso
- JWTs de acesso de curta duração e tokens de atualização com hash e rotação

Ele **não** é um lugar que reconstrói seu cofre. Se você nunca configurar uma URL de servidor, o app ainda funciona como cofre local criptografado. Também **não há recuperação de senha mestra**: se perdê-la, o ciphertext é irrecuperável — mantenha um backup offline.

## Nearby na LAN

Quer sincronização multi-dispositivo sem subir PostgreSQL? **Nearby** (Pro) emparelha dispositivos na Wi‑Fi local, vincula uma chave de cofre compartilhada e sincroniza ciphertext entre eles com a mesma regra LWW. Trate o emparelhamento e o vínculo do cofre como confiança total do cofre; não substitui backups criptografados.

## Por que este modelo importa

Gerenciadores de senhas na nuvem pedem que você confie na infraestrutura e nos operadores deles. O OpenKey pede que confie no **seu** host (ou em um VPS que você controla) apenas com armazenamento e disponibilidade — não com segredos. Um banco de dados roubado não é um cofre roubado.

## Aprofunde-se

- [Segurança](/pt/guide/security) — derivação de chaves, modelo de ameaças e checklist operacional
- [Configuração do servidor](/pt/guide/server) — instale a sincronização Docker e vincule clientes
- [Usar o app](/pt/guide/app) — Nearby, backups e uso diário do cofre
- [Início rápido](/pt/guide/quick-start) — execute a pilha localmente
