# Início rápido

Execute o servidor de sync aberto e conecte o app, a extensão ou a CLI.

## Servidor

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32   # paste into JWT_SECRET
docker compose up --build -d
```

API: `http://localhost:8000` — OpenAPI em `/docs`, health em `/health`.

## App

Instale o app **OpenKey** pela loja oficial ou canal de download da sua plataforma. Em **Configurações → Dados → Servidor auto-hospedado**, defina `http://localhost:8000` (ou sua URL HTTPS), depois registre-se ou faça login e sincronize.

Veja [Usar o app](./app).

## Extensão do navegador

```bash
cd openkey_extension
npm install
npm run build
```

Carregue `dist/` como extensão descompactada. Defina a URL do servidor em Opções e desbloqueie com email + senha mestra. No desktop, ative Preenchimento automático no app para registrar o host de mensagens nativo.

## CLI

```bash
cd openkey_cli
npm install
npm run build
npm link   # optional

openkey gen -l 24
openkey discover --dry-run
openkey discover -y
```

Mantenha o app desktop desbloqueado para descoberta local de segredos. Sync opcional do servidor:

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Próximo: leia [Segurança](./security), [Configuração do servidor](./server), [Usar o app](./app) e [CLI](./cli).
