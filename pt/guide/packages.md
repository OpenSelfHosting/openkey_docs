# Pacotes

Pacotes que você pode auto-hospedar e compilar. O **app móvel/desktop OpenKey** está em [Usar o app](./app).

| Caminho | Descrição |
|------|-------------|
| [`openkey_server`](https://github.com/OpenSelfHosting) | API de sync zero-knowledge FastAPI + PostgreSQL |
| [`openkey_extension`](https://github.com/OpenSelfHosting) | Extensão MV3 (Chrome / Firefox) |
| [`openkey_cli`](https://github.com/OpenSelfHosting) | CLI de desenvolvedor — segredos, geração de senhas, sync |
| [`openkey_docs`](https://github.com/OpenSelfHosting) | Este site — páginas do produto e documentação |

Para o uso diário do cliente, veja [Usar o app](./app).

## Destaques do servidor

- Armazenamento apenas de texto cifrado
- JWTs de acesso + refresh tokens opacos rotativos
- Migrações Alembic no PostgreSQL 16
- Limitação de taxa de autenticação e CORS estrito

## Destaques da extensão

- Desbloqueio de cofre independente + sync, ou ponte nativa para o app desktop desbloqueado
- Sobreposições de preenchimento, prompts de salvar/atualizar, passkeys
- Cartões, carteiras cripto e segredos de desenvolvedor

## Destaques da CLI

- Geração de senhas offline
- Descobrir chaves SSH, arquivos `.env` e tokens API no app desktop desbloqueado
- Login / unlock / sync opcionais contra o seu servidor

Remotos publicados sob [OpenSelfHosting](https://github.com/OpenSelfHosting) podem enviar pacotes separadamente; este site descreve os pacotes abertos acima.
