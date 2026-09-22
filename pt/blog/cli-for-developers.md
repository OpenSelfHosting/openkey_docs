---
title: Uma CLI para segredos de desenvolvedor
description: Uma visão profissional da CLI do OpenKey — geração offline, ponte nativa do desktop, descoberta, tipos de segredo e sincronização opcional zero-knowledge com servidor.
date: 2026-08-01
cover: /blog/covers/cli-for-developers.png
---

# Uma CLI para segredos de desenvolvedor

Chaves SSH, arquivos `.env` e tokens de API se espalham por laptops e agentes de CI. A **CLI** do OpenKey (`openkey`) é a face de terminal do mesmo cofre zero-knowledge: gere senhas offline, importe descobertas locais no app **desktop** desbloqueado, gerencie segredos tipados e, opcionalmente, puxe ciphertext de um servidor auto-hospedado.

Este artigo é um tour guiado. A referência completa em nível de flags está no [guia da CLI](/pt/guide/cli).

## Três modos de operação

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI architecture overview" class="ok-diagram" width="920" height="420" />

| Modo | Requisito | Função |
|------|-------------|------|
| Offline | Nada | `openkey gen` — senhas criptograficamente úteis sem rede e sem cofre desbloqueado |
| Ponte nativa | App desktop desbloqueado nesta máquina | Caminho padrão para segredos, importação por descoberta e busca em segredos **e** logins |
| Sessão CLI | `login` + `eval $(openkey unlock)` | Cache local de ciphertext e `sync` quando o app desktop não está disponível |

A CLI prefere a ponte quando está ativa. Caso contrário, usa `OPENKEY_SESSION`. A ponte é apenas local e recusa trabalho enquanto o cofre está bloqueado — o mesmo limite de confiança da sessão desktop.

<img src="/guide/cli-backend-choice.svg" alt="How vault commands choose native bridge or session mode" class="ok-diagram" width="920" height="360" />

## Geração offline

```bash
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c          # avoid Il1O0o, copy to clipboard
openkey --json gen -l 20
```

Ajuste comprimento e classes de caracteres (`--no-upper`, `--no-lower`, `--no-digits`, `--no-symbols`), ou copie direto para a área de transferência com `-c`. Não é necessário desbloquear o app nem registrar no servidor.

## Descoberta em um grupo de dispositivos

<img src="/guide/cli-discover-flow.svg" alt="Discover flow from scan to vault save" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme --depth 3 --no-aws
```

A descoberta pode escanear:

- Chaves privadas em `~/.ssh` (com arquivos `.pub` irmãos quando presentes)
- Variáveis de ambiente de processo conhecidas e com aparência de segredo
- Credenciais compartilhadas da AWS
- Árvores `.env` / `.env.*` de uma ou mais raízes de projeto

Os resultados são agrupados sob um rótulo de **dispositivo** (hostname por padrão) na seção Segredos do cofre. Valores já importados são ignorados por impressão digital de conteúdo. Use `--dry-run` para visualizar; `-y` para importar sem prompt. Salvar ainda exige o app desktop desbloqueado (ou uma sessão CLI).

## Operações diárias de segredos

Segredos são registros tipados: `apiToken` (padrão), `sshKey`, `envSnippet` ou `other`.

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

Listar e buscar **mascaram** valores. Use `get` / `copy` apenas quando plaintext for necessário. Consultas correspondem a nome, host ou prefixo de UUID; correspondências ambíguas listam candidatos em vez de adivinhar.

Para buscar **segredos e entradas de login** juntos:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

## Sincronização auto-hospedada opcional

<img src="/guide/cli-server-flow.svg" alt="Login, ciphertext pull, and OPENKEY_SESSION unlock flow" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server https://openkey.example.com
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
eval $(openkey lock)
```

O login deriva um `auth_hash` com Argon2id, nunca envia a senha mestra como flag, armazena apenas chaves encapsuladas e ciphertext no cache da CLI, e imprime uma exportação `OPENKEY_SESSION` de `unlock` (vida útil padrão de 15 minutos; altere com `openkey config set-lock`). Para CI você pode definir `OPENKEY_PASSWORD`; prefira o prompt interativo em máquinas pessoais.

Inspecione o estado a qualquer momento:

```bash
openkey status
openkey config show
```

## Por que isso pertence a um gerenciador de senhas

Desenvolvedores vivem em terminais. Uma CLI que escreve na mesma área Segredos criptografada do app — e na mesma API de sincronização apenas ciphertext — mantém fluxo de trabalho e modelo de ameaças alinhados. Você não mantém um segundo repositório de segredos para scripts.

## Instalar

```bash
cd openkey_cli
npm install && npm run build
npm link   # optional
```

Requer Node.js 20+. Referência completa de comandos, variáveis de ambiente, caminhos de configuração e notas de segurança: [guia da CLI](/pt/guide/cli).
