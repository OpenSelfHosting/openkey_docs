# Instalar o servidor

OpenKey Server é uma **API de sync zero-knowledge** opcional. Armazena apenas texto cifrado para sincronizar cofres entre seus próprios dispositivos. Senhas mestras e chaves do cofre em texto claro nunca saem do cliente.

## Requisitos

- Docker e Docker Compose (recomendado), **ou** Python 3.12+ com PostgreSQL 16
- Um `JWT_SECRET` forte (pelo menos 32 caracteres, não um placeholder)

## Instalar com Docker

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET in .env
docker compose up --build -d
```

Quando estiver saudável:

| URL | Propósito |
|-----|---------|
| `http://localhost:8000` | Base da API |
| `http://localhost:8000/docs` | Docs OpenAPI |
| `http://localhost:8000/health` | Verificação de saúde |

Migrações de esquema rodam automaticamente na inicialização da API (`alembic upgrade head`).

## Configuração importante

| Variável | Notas |
|----------|--------|
| `JWT_SECRET` | Obrigatório. Mín. 32 caracteres; placeholders rejeitados na inicialização |
| `DATABASE_URL` | URL Postgres async (Compose define para o serviço `db`) |
| `CORS_ORIGINS` | Origens separadas por vírgula — **sem `*`** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT de acesso de curta duração (padrão 15) |
| `REFRESH_TOKEN_EXPIRE_DAYS` | TTL do refresh token opaco (padrão 7, rotacionado no uso) |
| `AUTH_RATE_LIMIT_*` | Limites por IP nos endpoints de auth |

Para produção: coloque a API atrás de HTTPS, defina um `JWT_SECRET` único e restrinja `CORS_ORIGINS` aos seus clientes.


## Produção com HTTPS


Full Caddy / nginx examples: [English](/guide/server#production-behind-https) · [العربية](/ar/guide/server#الإنتاج-خلف-https).

Put the API behind TLS, set a unique `JWT_SECRET`, and restrict `CORS_ORIGINS` (never `*`). Point clients at `https://your.domain` and check `/health`.

## Conectar seus clientes

Aponte cada cliente para **a mesma** URL do servidor (Docker local: `http://localhost:8000`, ou sua URL HTTPS pública).

### App OpenKey (telefone / desktop)

Instale o app oficial OpenKey pela loja oficial ou canal de download.

1. Desbloqueie ou crie um cofre local com sua senha mestra.
2. Abra **Configurações → Dados → Servidor auto-hospedado**.
3. Informe a URL do servidor (exemplo: `https://openkey.example.com`).
4. **Registrar** (primeiro dispositivo) ou **Login** (outro dispositivo que já tenha esta conta de cofre).
5. Toque **Sincronizar agora** quando quiser puxar/enviar texto cifrado.

O app mantém um banco de dados local criptografado. A sync só troca texto cifrado opaco. Mais: [Usar o app](./app).

### Extensão do navegador

1. Compile e carregue `openkey_extension` (`npm install && npm run build`, depois carregue `dist/`).
2. Abra **Opções** da extensão e defina a mesma URL do servidor.
3. Desbloqueie com o mesmo email + senha mestra (a extensão usa `/auth/prelogin` e depois login).

**Ponte desktop (opcional):** desbloqueie o app desktop OpenKey, ative Preenchimento automático para registrar o host de mensagens nativo, depois escolha «Usar app desktop» na extensão. Preencher/salvar pode passar pelo app desbloqueado sem desbloqueio separado da extensão.

### CLI

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Veja [CLI](./cli) para descoberta de segredos sem servidor (ponte do app desktop).

## Checklist multi-dispositivo

1. Instale e proteja o servidor uma vez.
2. No primeiro dispositivo: registro + sync.
3. Em cada novo dispositivo: instale o cliente → defina a mesma URL → login com o mesmo email e senha mestra → sync.
4. Mantenha backups offline regulares (exportação / backup local) — o servidor não é caminho de recuperação para senha mestra esquecida.

Próximo: [Usar o app](./app) · [CLI](./cli) · [Segurança](./security)
