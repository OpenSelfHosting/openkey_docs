---
title: "Gerenciador de senhas auto-hospedado: o que isso exige de verdade"
description: Rodando seu próprio servidor de sync de senhas com Docker — o que um cofre auto-hospedado realmente te dá, o que ele custa e um checklist completo de configuração e endurecimento.
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Gerenciador de senhas auto-hospedado: o que isso exige de verdade

Auto-hospedar um gerenciador de senhas significa rodar você mesmo o servidor de sync criptografado. Seus clientes criptografam no dispositivo; o servidor que você opera armazena ciphertext e autentica você. Um comprometimento desse servidor rende um blob criptografado, não uma lista de senhas.

Essa é uma vitória de privacidade real e durável. Também é um compromisso de manutenção, e a versão honesta deste artigo descreve as duas coisas.

## O que a auto-hospedagem realmente muda

Seja preciso sobre isso, porque é aqui que as expectativas dão errado:

| | Nuvem do fornecedor | Auto-hospedado |
|---|---------------------|---------------|
| Quem pode ler seu cofre | Ninguém, se for zero-knowledge | Ninguém, se for zero-knowledge |
| Quem pode **apagar** seu cofre | O fornecedor | Você |
| Quem vê metadados | O fornecedor | Você |
| Quem pode ser obrigado a entregar dados | O fornecedor, na jurisdição dele | Você, na sua |
| Responsabilidade pela disponibilidade | O fornecedor | Você |
| TLS, patches, backups | O fornecedor | Você |
| Custo | Assinatura | Servidor + seu tempo |

A afirmação de confidencialidade não muda. O que muda é o **controle sobre o plano de armazenamento** e quem está na cadeia de confiança. Auto-hospedar remove um terceiro; não acrescenta criptografia.

## Quando vale a pena

- Você já roda serviços e tem um NAS, um homelab ou um VPS pequeno.
- Seu modelo de ameaça inclui "o provedor está comprometido ou sendo coagido".
- Você está em uma jurisdição onde o hosting de dados de outra pessoa é um passivo.
- Você quer coleções compartilhadas para uma equipe em infraestrutura que audita.
- Você é do tipo de pessoa que curte um Docker Compose de cinco minutos e um cron job.

## Quando não vale a pena

- Você nunca rodou um proxy reverso e precisaria aprender antes TLS, DNS e regras de firewall.
- Ninguém vai lembrar de aplicar patches. Um servidor sem patch é um passivo, não uma vitória de segurança.
- Você é o único usuário, em um dispositivo. Então pule o servidor por completo e use um cofre local.
- Você precisa de disponibilidade garantida para um sistema crítico do negócio sem plano de backup.

Para os dois últimos casos existe um caminho do meio: um **cofre local criptografado** com o [sync Nearby na LAN](/pt/blog/nearby-without-a-server) para os seus próprios dispositivos, e nenhum servidor.

## Configurando um em cinco minutos

O OpenKey Server é uma aplicação FastAPI com PostgreSQL, distribuída como uma pilha Docker Compose.

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

Depois confirme que ele está saudável:

| URL | Finalidade |
|-----|------------|
| `http://localhost:8000` | Base da API |
| `http://localhost:8000/docs` | Documentação OpenAPI |
| `http://localhost:8000/health` | Verificação de saúde |

As migrações de esquema rodam automaticamente na inicialização. Conecte um cliente em **Configurações → Dados → Servidor auto-hospedado** e então **Registre** no primeiro dispositivo e **Entre** nos demais. Detalhe completo: [Configuração do servidor](/pt/guide/server).

## O checklist de endurecimento

Esta é a parte que as pessoas pulam, e é a parte que decide se a auto-hospedagem ajudou. Do [guia de segurança](/pt/guide/security):

### Inegociável

1. **Um `JWT_SECRET` único de pelo menos 32 caracteres.** Valores de exemplo são rejeitados na inicialização. Gere um; não copie um exemplo.
2. **HTTPS com um certificado válido.** Os clientes usam a pilha TLS da plataforma sem pinning de certificado, então uma URL `http://` com erro de digitação ou um certificado ruim abre espaço para um ataque man-in-the-middle no login e no sync. Termine o TLS no Caddy, no nginx ou no seu load balancer.
3. **Uma allow-list explícita de `CORS_ORIGINS`.** Nunca `*`. Se você usa a extensão do navegador, adicione explicitamente as origens `chrome-extension://` e `moz-extension://` dela.
4. **Postgres e a porta bruta da API ficam privados.** Exponha apenas o proxy reverso.
5. **HSTS no proxy**, para que os navegadores nunca voltem para HTTP depois da primeira visita.

### Fortemente recomendado

6. **Limites de taxa no proxy reverso.** O limitador embutido da API é em memória e **por processo worker**, então com vários workers ou réplicas o limite efetivo se multiplica. Adicione `limit_req` no nginx ou limites de taxa do Caddy na borda.
7. **Defina `TRUST_PROXY_HEADERS=true` apenas se o proxy sobrescrever `X-Forwarded-For`** e você confiar nesse caminho. Caso contrário, seus limites por IP se aplicam ao proxy, não ao usuário.
8. **Esteja ciente da enumeração de emails.** `POST /auth/prelogin` e `POST /auth/lookup-public-key` retornam 404 para emails desconhecidos, o que ajuda clientes legítimos, mas permite que alguém sonde quais endereços estão registrados. Limites de taxa rigorosos, TLS e, opcionalmente, VPN ou allow-list de IP para implantações de alta sensibilidade.
9. **Faça backup do Postgres e teste a restauração.** Um servidor de gerenciador de senhas que nunca foi restaurado de um backup é uma hipótese.
10. **Monitore `/health`** e os logs da API; alerte se ele parar de responder.

## O que um servidor de sync auto-hospedado pode e não pode fazer

| Ele pode | Ele não pode |
|---------|--------------|
| Autenticar você a partir do seu `auth_hash` | Ler sua senha mestra |
| Armazenar ciphertext opaco de entradas, anexos, orgs e compartilhamentos | Descriptografar nomes de coleções ou payloads de entradas |
| Apagar ou reter seus dados | Recuperar uma senha mestra esquecida |
| Ver metadados: email, tamanhos do ciphertext, tempos | Reconstruir o seu cofre a partir do banco de dados |
| Sofrecer limite de taxa, patch ou reinício por você | Sobreviver a você esquecer a senha mestra |

Leia a quarta linha com cuidado: um servidor auto-hospedado **não** deixa você mais seguro contra esquecer sua senha. Ele remove uma parte da cadeia de confiança e adiciona você como o operador que pode perder os dados. [Senha mestra esquecida](/pt/blog/forgot-master-password) cobre o lado da prevenção.

## Semântica de sync que você deve conhecer antes de confiar nela

- **A última escrita vence por `revision` por item, não um CRDT.** Edições simultâneas em dois dispositivos podem sobrescrever uma a outra. Edite em um dispositivo por vez quando isso importar.
- **Exclusões sincronizam como lápides** até os pares alcançarem, então uma exclusão não é instantânea em todo lugar.
- **O sync Nearby na LAN usa a mesma regra LWW** entre dispositivos emparelhados e vinculados ao cofre.
- **Nenhum dos dois é backup.** Mantenha pelo menos um backup local criptografado (`.okbak` no OpenKey).

Esse último ponto é o que as pessoas mais erram, e é a diferença entre "movi meu cofre para o meu próprio servidor" e "tenho um plano de recuperação".

## Segurança operacional para o operador

- Rode o servidor em um host onde você aplica patch em um horário definido. Sem patch é pior que hospedado pelo fornecedor.
- Guarde o `JWT_SECRET` em um gerenciador de segredos ou pelo menos em um arquivo com modo 600, não no histórico do seu shell.
- A retenção de logs é um passivo: logs de sync podem revelar tempos e tamanhos. Roteie e limite.
- Faça backup do **banco de dados**, não apenas do volume, e verifique as restaurações a cada trimestre.
- Nunca exponha a API em uma rede não confiável sem TLS.
- Se você precisa de garantias de disponibilidade, coloque um segundo host atrás de um load balancer e aceite que a resolução de conflitos de sync ainda é a última escrita que vence.

## Como o OpenKey mantém o servidor inútil para um atacante

- Os clientes derivam uma chave mestra com **Argon2id** a partir de email + senha mestra + salt.
- O login envia um **`auth_hash`**, que prova conhecimento sem revelar a senha.
- Uma **chave de cofre** criptografa nomes de coleções e payloads de entradas com **AES-256-GCM**. O servidor guarda apenas uma chave de cofre encapsulada.
- JWTs de acesso têm vida curta; tokens de atualização são hasheados em repouso e rotacionados a cada uso.
- Anexos sincronizam como ciphertext, limitados a 20 MB cada.

Um dump de `postgres` roubado entrega a um atacante salts, parâmetros KDF, chaves encapsuladas e blobs. Quebrá-lo significa atacar o Argon2id, e depois disso eles ainda têm ciphertext que não conseguem ler sem a chave. Esse é todo o argumento de segurança, e ele se sustenta precisamente porque a senha mestra nunca saiu de um cliente.

## O que os dados de busca dizem

A auto-hospedagem é um cluster pequeno mas real, e ele se agrupa mais em torno da expressão "open source" do que de "self-hosted". Google Trends (global, últimos 12 meses), comparando esses termos entre si:

| Consulta | Interesse relativo no cluster |
|----------|-------------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

A implicação é que "open source" é a expressão que as pessoas procuram, e "self-hosted" é a expressão em que elas chegam depois — uma busca que começa como preferência e vira implementação. As consultas relacionadas sob "open source password manager" apontam na mesma direção: KeePass com 100, "open source password manager self hosted" com 84 e Passbolt com 78. Dois dos três primeiros são nomes que as pessoas estão comparando, não descrições de um recurso.

Esses continuam sendo números pequenos em relação ao termo principal. "Self-hosted password manager" é um nicho de um nicho, e a conclusão honesta é que a maioria de quem busca essa expressão são usuários técnicos que já sabem o que querem.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de cinco minutos

Auto-hospedar troca o provedor por você na cadeia de confiança. Não acrescenta criptografia; acrescenta TLS, backups, patches e limitação de taxa à sua lista. Se você já roda serviços: pilha Compose, `JWT_SECRET` único, HTTPS com certificado válido, `CORS_ORIGINS` explícito e backups testados. Se não, use um cofre local criptografado e o [sync Nearby na LAN](/pt/blog/nearby-without-a-server), e mantenha pelo menos um backup criptografado offline de qualquer forma.

## Próximos passos

- [Por que auto-hospedar seu cofre de senhas](/pt/blog/self-host-your-vault) — os argumentos a favor
- [Sincronização zero-knowledge explicada](/pt/blog/zero-knowledge-sync) — o protocolo
- [Configuração do servidor](/pt/guide/server) — instalação, configuração, endurecimento de produção
- [Segurança](/pt/guide/security) — modelo de ameaça e checklist do operador
