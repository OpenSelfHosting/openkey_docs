# Visão geral

OpenKey é um **gerenciador de senhas criptografado de ponta a ponta auto-hospedado**. Os clientes criptografam os dados do cofre antes de saírem do dispositivo. O servidor de sync opcional armazena **apenas texto cifrado** — senhas mestras e chaves do cofre em texto claro nunca saem do cliente.

## O que você obtém

- Cofre criptografado local (coleções, logins, cartões, carteiras cripto, segredos de desenvolvedor)
- Sync opcional entre dispositivos pelo seu próprio servidor
- Extensão do navegador com preenchimento automático e passkeys
- App mobile / desktop e CLI de desenvolvedor aberta
- Organizações, coleções compartilhadas e compartilhamento de itens — ainda texto cifrado no servidor

## Modelo zero-knowledge

1. O cliente deriva chaves da sua senha mestra com **Argon2id**.
2. Um `auth_hash` autentica você no servidor sem revelar a senha mestra.
3. O conteúdo do cofre permanece criptografado com uma chave que o servidor nunca vê em texto claro.
4. Nomes, payloads, anexos, nomes de org e payloads de compartilhamento são texto cifrado opaco no servidor.

## Pacotes abertos

| Pacote | Papel |
|---------|------|
| `openkey_server` | API de sync zero-knowledge FastAPI + PostgreSQL |
| `openkey_extension` | Extensão MV3 (Chrome / Firefox) |
| `openkey_cli` | CLI de desenvolvedor (segredos, geração de senhas, sync) |

O **app OpenKey** mobile e desktop é coberto separadamente. Veja [Usar o app](./app) para uso do produto, [Pacotes](./packages) para configuração, [Configuração do servidor](./server) para instalar sync, e [Início rápido](./quick-start) para executar a stack localmente.
