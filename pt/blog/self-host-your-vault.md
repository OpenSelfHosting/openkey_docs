---
title: Por que auto-hospedar seu cofre de senhas
description: Controle, privacidade e um servidor de sincronização que armazena apenas ciphertext — como executar o OpenKey no seu próprio hardware com Docker.
date: 2026-08-03
cover: /blog/covers/self-host-your-vault.svg
---

# Por que auto-hospedar seu cofre de senhas

Gerenciadores de senhas ficam no centro da sua vida digital. Quando esse cofre vive apenas na nuvem de outra pessoa, interrupções, mudanças de política e violações tornam-se *seu* risco. A auto-hospedagem inverte o padrão: você escolhe a máquina, os backups e quem pode alcançar a API.

## O que você controla

| Você possui | O servidor nunca recebe |
|---------|------------------------|
| Onde o ciphertext é armazenado | Senha mestra |
| Quando upgrades e backups rodam | Chaves do cofre em plaintext |
| Quais clientes podem conectar (`CORS_ORIGINS`, HTTPS) | Nomes de entradas ou senhas legíveis |
| Se a sincronização está ativa | Anexos ou compartilhamentos descriptografados |

O app OpenKey funciona offline com um banco de dados local criptografado. Aponte **Configurações → Dados → Servidor auto-hospedado** para sua instância quando quiser sincronização multi-dispositivo — mesmas regras zero-knowledge de qualquer forma. Prefira manter pelo menos um **backup local criptografado**; o servidor não pode recuperar uma senha mestra esquecida.

## Uma forma prática

Muitas pessoas começam com Docker em um NAS doméstico ou um VPS pequeno:

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # JWT_SECRET (min 32 characters; placeholders are rejected)
docker compose up --build -d
```

Coloque TLS na frente (Caddy, Traefik ou seu proxy reverso), defina um `JWT_SECRET` longo e único, e restrinja `CORS_ORIGINS` às origens do seu app e extensão — nunca `*`. Depois **Registre** do primeiro dispositivo e **Entre** nos demais, e use **Sincronizar agora** quando quiser um pull/push explícito.

## LAN sem servidor

Se você só precisa de dispositivos na mesma Wi‑Fi, a sincronização de cofre **Nearby** (Pro) pode emparelhar e vincular cofres na LAN sem PostgreSQL. Use para conveniência; ainda mantenha backups offline para recuperação de desastres.

## Para quem é

- Indivíduos que querem sincronização sem cofre SaaS
- Equipes que precisam de coleções compartilhadas mas mantêm criptografia nos clientes
- Desenvolvedores que já executam PostgreSQL e estão confortáveis com Compose

Você não precisa auto-hospedar para usar o OpenKey localmente. Auto-hospeda quando quer **seu** plano de sincronização — com armazenamento apenas ciphertext como regra rígida.

## Próximos passos

- [Configuração do servidor](/pt/guide/server) — instale, configure e vincule clientes
- [Usar o app](/pt/guide/app) — fluxos do cofre, Nearby, importação/exportação
- [Segurança](/pt/guide/security) — checklist de endurecimento e modelo de ameaças
- [Visão geral](/pt/guide/overview) — pacotes e o modelo zero-knowledge
