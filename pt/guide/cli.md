# CLI

A CLI do OpenKey (`openkey`) é uma interface de linha de comando para desenvolvedores que mantêm segredos, tokens de API, chaves SSH e material `.env` em um cofre OpenKey. Ela pode operar **totalmente offline** para geração de senhas, falar com um **app desktop OpenKey desbloqueado** por uma ponte nativa local e, opcionalmente, autenticar-se em um **servidor de sync auto-hospedado** para pull de texto cifrado e uma sessão CLI de curta duração.

Requer **Node.js 20+**.

## Arquitetura

O diagrama abaixo mostra o que conversa com o quê. A geração de senhas permanece offline. Comandos do cofre preferem o app desktop desbloqueado. A sync com o servidor é opcional.

<img src="/guide/cli-architecture.svg" alt="Arquitetura da CLI OpenKey: a CLI fala com o app desktop via ponte nativa, escaneia esta máquina para discover e, opcionalmente, sincroniza texto cifrado com um servidor auto-hospedado" class="ok-diagram" width="920" height="420" />

| Modo | Quando se aplica | O que pode fazer |
|------|------------------|------------------|
| **Offline** | Sempre | `gen` — sem app, sem servidor |
| **Ponte nativa** | App desktop desbloqueado nesta máquina | CRUD de segredos, importação por descoberta, search/get/copy em segredos e logins |
| **Sessão CLI** | Após `login` + `eval $(openkey unlock)` | Mesmas operações do cofre contra um cache local de texto cifrado; `sync` puxa do servidor |

### Como um comando do cofre escolhe um backend

<img src="/guide/cli-backend-choice.svg" alt="Fluxograma: comando do cofre verifica a ponte desktop, depois OPENKEY_SESSION; caso contrário, erro com dica de desbloqueio" class="ok-diagram" width="920" height="360" />

1. Se a ponte desktop responder → usar modo **native** (preferido; não requer registro no servidor).
2. Senão, se `OPENKEY_SESSION` estiver definida e válida → usar modo **session** (cache local / material respaldado pelo servidor).
3. Senão → comandos que precisam do cofre falham com uma dica para desbloquear o app ou executar `eval $(openkey unlock)`.

A ponte aceita conexões **somente da máquina local** e apenas enquanto o cofre estiver desbloqueado. No Unix usa um socket sob caminhos conhecidos do OpenKey (sobrescreva com `OPENKEY_NATIVE_SOCKET`). No Windows usa um arquivo de porta localhost sob `%LOCALAPPDATA%\OpenKey\` (sobrescreva com `OPENKEY_NATIVE_PORT`).

## Instalar

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

Sem link:

```bash
npx tsx src/cli.ts --help
# after build:
node dist/cli.js --help
```

Verificar:

```bash
openkey --version
openkey status
```

## Configuração e armazenamento

O estado local da CLI fica em um diretório de configuração da plataforma (modo de arquivo `600` quando suportado):

| Plataforma | Caminho |
|------------|---------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json` (ou `$XDG_CONFIG_HOME/openkey/`) |
| Windows | `%APPDATA%\OpenKey\config.json` |

O arquivo pode conter: URL do servidor, e-mail, tokens de acesso/refresh, salt e parâmetros KDF, chave do cofre envolvida, duração do bloqueio de sessão, revisão do servidor e um cache de **texto cifrado** de entradas/coleções após a sync. Não armazena a senha mestra em texto claro.

### Comandos `config`

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` requer uma URL que comece com `http://` ou `https://` (barra final removida).
- URL padrão do servidor antes do primeiro `set`: `http://localhost:8000`.

## Opções globais

| Flag | Efeito |
|------|--------|
| `--json` | JSON legível por máquina em stdout para scripts |
| `--help` / `--version` | Ajuda e versão |

Coloque `--json` antes do subcomando ao usar globais do Commander, por exemplo `openkey --json status`.

## Geração de senhas (`gen`)

Totalmente offline. Não requer o app nem um servidor.

```bash
openkey gen
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c
openkey --json gen -l 20
```

| Opção | Descrição | Padrão |
|-------|-----------|--------|
| `-l, --length <n>` | Comprimento (faixa prática 4–64) | `20` |
| `--no-upper` | Excluir letras maiúsculas | desativado |
| `--no-lower` | Excluir letras minúsculas | desativado |
| `--no-digits` | Excluir dígitos | desativado |
| `--no-symbols` | Excluir símbolos | desativado |
| `-a, --avoid-ambiguous` | Evitar caracteres ambíguos `Il1O0o` | desativado |
| `-c, --copy` | Copiar para a área de transferência em vez de imprimir | desativado |

Com `-c`, o modo humano imprime uma confirmação; o modo JSON retorna `{ "copied": true, "length": N }`. Sem `-c`, a senha é impressa (ou `{ "password": "..." }` no modo JSON).

## Status e higiene

```bash
openkey status
openkey forget
```

**`status`** informa URL do servidor, e-mail, estado de login, disponibilidade da ponte, modo de desbloqueio (`native` / `session`), tempo restante de sessão e contagem de entradas em cache.

**`forget`** apaga a config local da CLI e o texto cifrado em cache. Não exclui segredos dentro do cofre do app desktop. Após `forget`, execute novamente `config set-server` / `login` se usar o modo servidor.

## Segredos de desenvolvedor (`secret`)

Os segredos ficam na área reservada **Secrets** do cofre (`__dev_secrets__`), agrupados por **dispositivo** (rótulo da máquina; hostname padrão). Os comandos exigem o app desktop desbloqueado **ou** uma `OPENKEY_SESSION` válida.

### Tipos

| Tipo | Uso típico | Notas |
|------|------------|-------|
| `apiToken` | PAT, chaves de API | Padrão |
| `sshKey` | Chaves privadas | Prefira `--file` / `--public-key-file` |
| `envSnippet` | Corpos `.env` completos | Prefira `--file` |
| `other` | Genérico | — |

Aliases como `ssh`, `api`, `token`, `env`, `.env` normalizam para os tipos acima.

### `secret add`

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy key" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub -H git.example.com -u git
openkey secret add -n "acme .env" -k envSnippet -f ./apps/api/.env -d laptop
```

| Opção | Descrição |
|-------|-----------|
| `-n, --name` | Nome de exibição (**obrigatório**) |
| `-k, --kind` | `sshKey` \| `apiToken` \| `envSnippet` \| `other` |
| `-s, --secret` | Valor do segredo inline (`-` lê stdin) |
| `-f, --file` | Ler corpo do segredo de um arquivo |
| `--stdin` | Ler segredo de stdin (prefira a colocar tokens em argv) |
| `-u, --username` | Nome de usuário opcional |
| `-H, --host` | Host opcional |
| `-d, --device` | Rótulo da coleção de dispositivo (padrão: hostname) |
| `--public-key` / `--public-key-file` | Chave pública SSH |
| `--passphrase` | Frase secreta da chave |
| `--notes` | Notas livres |

Forneça `--secret`, `--file` ou `--stdin` (não vazio). Registros criados retornam um UUID.

```bash
printf '%s' "$TOKEN" | openkey secret add -n "CI token" --stdin
```

### `secret list` / `get` / `copy` / `rm` / `update` / `export` / `devices`

```bash
openkey secret list
openkey secret list -d laptop -k apiToken
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret update "GitHub PAT" --secret ghp_new...
printf '%s' "$TOKEN" | openkey secret update "GitHub PAT" --stdin
openkey secret export -d laptop -o .env.local
openkey secret export --format exports   # for eval
openkey secret devices
openkey secret rm "old token" -y
```

- **list** — tabela com prefixo de UUID, nome, tipo, dispositivo e segredo **mascarado**. Filtros opcionais `-d/--device` e `-k/--kind`.
- **get** / **copy** / **rm** / **update** — correspondem por **nome**, **host** ou **prefixo de UUID**. Quando várias substrings coincidem, ganha um nome/título **exato**, host ou prefixo de UUID único (≥4 caracteres); caso contrário, o comando falha com candidatos.
- **update** — aplica patch apenas nos flags que você passar (`--name`, `--secret`/`--file`/`--stdin`, `--kind`, `--device`, …). Requer o handler `updateSecret` da ponte desktop (app OpenKey com esta versão) ou uma sessão CLI.
- **export** — grava segredos como dotenv (`KEY=value`; corpos `envSnippet` inline) ou linhas shell com `--format exports`. `-o` grava um arquivo com modo `600` quando suportado.
- **devices** — lista rótulos de coleção de dispositivo e contagens.
- **get** imprime texto claro (ou objeto JSON completo no modo `--json`).
- **copy** grava texto claro na área de transferência.
- **rm** solicita confirmação, exceto com `-y` / `--yes`.

## Injetar segredos no shell (`env` / `run`)

```bash
# Print export lines for eval (NAME or NAME=query)
eval $(openkey env DATABASE_URL)
eval $(openkey env DB=DATABASE_URL GH="GitHub PAT")

# Or run a child process with secrets in its environment
openkey run -e DATABASE_URL -e GH="GitHub PAT" -- npm start
```

| Forma | Significado |
|-------|-------------|
| `NAME` | Variável de ambiente `NAME`; busca item do cofre por esse nome |
| `NAME=query` | Variável de ambiente `NAME`; busca por `query` (nome / host / UUID) |

`--json` em `env` retorna objetos com `env`, `query`, `name`, `uuid` e `value`. `--raw` imprime um único valor em texto claro (exatamente um binding).

## Descoberta (`discover`)

Escaneia esta máquina e importa segredos **novos** para o grupo do dispositivo. Deduplica contra valores já no cofre (por tipo + nome + impressão digital do conteúdo).

<img src="/guide/cli-discover-flow.svg" alt="Fluxo discover: escanear fontes locais, pré-visualizar valores mascarados, deduplicar impressões digitais e salvar no grupo de dispositivo do cofre" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme -p ~/src/labs --depth 3
openkey discover --no-aws --no-env-vars
```

| Opção | Descrição | Padrão |
|-------|-----------|--------|
| `-d, --device` | Nome da coleção de dispositivo | hostname |
| `-p, --path <dir>` | Raiz(es) de projeto para varredura `.env` (repetível) | `cwd` |
| `--depth <n>` | Profundidade máxima de diretório para `.env` | `4` |
| `--no-ssh` | Pular chaves privadas em `~/.ssh` | varredura ativa |
| `--no-env-files` | Pular arquivos `.env` / `.env.*` | varredura ativa |
| `--no-env-vars` | Pular variáveis de ambiente do processo | varredura ativa |
| `--no-aws` | Pular `~/.aws/credentials` | varredura ativa |
| `--no-gh` | Pular tokens do GitHub CLI em `hosts.yml` | varredura ativa |
| `--no-docker` | Pular auth de registro em `~/.docker/config.json` | varredura ativa |
| `--dry-run` | Apenas listar; não salvar | desativado |
| `-y, --yes` | Importar sem confirmação interativa | desativado |

### O que é escaneado

- **SSH** — chaves privadas em `~/.ssh` (pula `known_hosts`, `authorized_keys`, `config`, arquivos `.pub`); anexa `.pub` irmão quando presente.
- **Variáveis de ambiente** — nomes conhecidos (`GITHUB_TOKEN`, `OPENAI_API_KEY`, `DATABASE_URL`, …) e nomes com sufixos tipo segredo; pula `PATH`, `HOME`, `OPENKEY_SESSION`, `OPENKEY_PASSWORD`, etc.
- **AWS** — perfis em `~/.aws/credentials`.
- **GitHub CLI** — entradas `oauth_token` / `token` em `~/.config/gh/hosts.yml`.
- **Docker** — `auths` decodificados de `~/.docker/config.json`.
- **Arquivos `.env`** — varredura a partir das raízes, pulando `node_modules`, `.git`, `dist`, virtualenvs, etc.; limites de tamanho e contagem de arquivos se aplicam.

Dry-run funciona mesmo com o cofre bloqueado (apenas listagem). Salvar exige ponte ou sessão desbloqueada. Segredos já importados são reportados como ignorados.

## Busca em segredos e logins

Esses comandos buscam em **segredos de desenvolvedor e entradas de login**:

```bash
openkey search github
openkey get "GitHub"
openkey get "GitHub" --field username
openkey copy api.example.com --field totp
openkey totp "GitHub" -c
openkey logins
```

| Comando | Saída |
|---------|-------|
| `search <query>` | Tabela mascarada (ou prévias JSON); mostra disponibilidade de TOTP |
| `get <query>` | Campo de melhor correspondência (`--field password\|username\|url\|totp\|notes`) |
| `copy <query>` | Copia esse campo para a área de transferência (limpa automaticamente em 45s; `--keep` para desativar) |
| `totp <query>` | Código TOTP ao vivo (`-c` copiar, `-w` observar até Ctrl+C) |
| `logins` | Lista logins com usuário / URL / flag TOTP |
| `doctor` | Diagnostica Node, permissões de config, ponte, sessão, `/health` do servidor, área de transferência |

Correspondências ambíguas por substring preferem um nome/título exato, host ou prefixo de UUID único; caso contrário, listam UUID, tipo e rótulo — refine a consulta. Prefira `secret get` / `secret copy` quando quiser apenas a seção Secrets.

Use **`secret set`** para upsert por nome + dispositivo (criar ou atualizar). **`sync --push`** envia o cache local de texto cifrado antes de puxar.

## Servidor auto-hospedado opcional

Use este caminho quando o app desktop não estiver disponível na máquina (por exemplo acesso ao cofre só pelo telefone via sync), ou quando quiser um cache de texto cifrado na CLI.

<img src="/guide/cli-server-flow.svg" alt="Fluxo com servidor: set-server, login com auth_hash, pull de texto cifrado para o cache local e depois eval unlock para definir OPENKEY_SESSION em comandos do cofre" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Instalação do servidor: [Instalar o servidor](./server).

### Fluxo de autenticação

1. **`login`** — solicita e-mail (ou `-e`) e senha mestra (ou `OPENKEY_PASSWORD`). Executa prelogin para salt/KDF, deriva `auth_hash` com Argon2id, obtém JWTs, busca material da chave do cofre envolvida, verifica a senha ao desenvelopar e então **puxa** texto cifrado para o cache local. Nunca envie a senha mestra como flag da CLI.
2. **`unlock`** — deriva a chave do cofre novamente, atualiza tokens/sync quando o servidor está acessível e imprime uma exportação shell para `OPENKEY_SESSION` (use `eval $(openkey unlock)`). Opções: `-e/--email`, `--raw` (apenas token). O modo JSON emite os campos de sessão.
3. **`lock`** — imprime `unset OPENKEY_SESSION` (ou dica JSON) para você poder `eval $(openkey lock)`.
4. **`logout`** — limpa tokens de acesso/refresh; mantém o cache local de texto cifrado. Combine com `lock` para limpar a variável de ambiente de sessão.
5. **`sync`** — requer login; puxa entradas/coleções e atualiza `serverRevision`.

A duração da sessão é **15 minutos** por padrão (`config set-lock`). Sessões expiradas exigem `unlock` novamente.

### Variáveis de ambiente

| Variável | Propósito |
|----------|-----------|
| `OPENKEY_SESSION` | Blob de sessão criptografado de curta duração de `unlock` |
| `OPENKEY_PASSWORD` | Senha mestra para `login` / `unlock` não interativos (apenas scripts/CI) |
| `OPENKEY_EMAIL` | E-mail da conta para `login` / `unlock` não interativos |
| `OPENKEY_NATIVE_SOCKET` | Sobrescrever caminho do socket da ponte no Unix |
| `OPENKEY_NATIVE_PORT` | Sobrescrever porta da ponte no Windows |

Prefira o prompt interativo de senha em máquinas pessoais. Trate `OPENKEY_PASSWORD` e tokens de sessão como material secreto em logs de CI.

## Completions do shell

```bash
eval "$(openkey completion bash)"
eval "$(openkey completion zsh)"
openkey completion fish | source
```

## Referência de comandos

| Comando | Precisa de acesso ao cofre? | Descrição |
|---------|----------------------------|-----------|
| `gen` | Não | Geração de senhas offline |
| `discover` | Salvar: sim\* / dry-run: não | Escanear SSH / `.env` / env / AWS → grupo de dispositivo |
| `secret add\|list\|get\|copy\|rm\|update\|export\|devices` | Sim\* | Segredos de desenvolvedor |
| `get` / `copy` / `search` / `totp` / `logins` | Sim\* | Segredos + logins (TOTP, seleção de campo) |
| `doctor` | Não | Diagnosticar ponte / sessão / servidor |
| `env` / `run` | Sim\* | Exportar segredos para o shell / processo filho |
| `completion` | Não | Completions bash / zsh / fish |
| `status` | Não | Estado da ponte / sessão / servidor |
| `config set-server\|show\|set-lock` | Não | Configuração da CLI |
| `login` / `logout` | — | Auth opcional do servidor |
| `unlock` / `lock` | — | Sessão CLI opcional |
| `sync` | Login necessário | Puxar texto cifrado do servidor |
| `forget` | Não | Apagar config local da CLI + cache |

\*App desktop desbloqueado, **ou** `OPENKEY_SESSION` válida após login no servidor.

## Modelo de segurança

- Comandos list/search **mascaram** valores; use `get` / `copy` apenas quando precisar de texto claro.
- O servidor de sync armazena **apenas texto cifrado**; a CLI deriva chaves localmente como outros clientes OpenKey.
- Não passe a senha mestra como flag; evite registrar `OPENKEY_PASSWORD` ou `OPENKEY_SESSION`.
- O tráfego da ponte é somente local e exige um cofre desbloqueado.
- Tokens de sessão expiram; reduza a duração com `config set-lock` em máquinas compartilhadas.
- `forget` limpa o estado da CLI em disco; rotacione tokens do servidor com `logout` se a máquina deixar de ser confiável.

## Desenvolvimento

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## Guias relacionados

- [Usar o app](./app) — desbloqueio no desktop, seção Secrets, preenchimento automático
- [Instalar o servidor](./server) — sync auto-hospedada
- [Segurança](./security) — Argon2id, tokens, modelo de ameaça
- [Pacotes](./packages) — layout do repositório
