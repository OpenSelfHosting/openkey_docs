# Segurança

O OpenKey é projetado para que o servidor não possa ler seu cofre.

## Derivação de chaves

1. `Argon2id(email + master_password, salt)` produz uma chave mestra.
2. A chave mestra deriva um **auth hash** (enviado ao servidor) e envolve a **chave do cofre**.
3. A chave do cofre criptografa nomes de coleções e payloads de entradas (**AES-256-GCM**).
4. A chave de criptografia do banco local é derivada da chave do cofre.
5. A senha mestra nunca sai do dispositivo.

## O que o servidor armazena

| Armazena | Não armazena |
|--------|------------|
| `auth_hash` | Senha mestra |
| Salt e parâmetros KDF | Chave do cofre em claro |
| Chave do cofre envolvida (criptografada) | Nomes de coleções descriptografados |
| Texto cifrado opaco de dados, anexos, orgs e compartilhamentos | Payloads de entradas em claro |

## Tokens

- JWTs de acesso são de curta duração.
- Tokens de atualização são hasheados em repouso e rotacionados no uso.
- Endpoints de autenticação têm limite de taxa por IP.

## Regras práticas

- Escolha uma senha mestra forte — ela é a raiz de confiança.
- Mantenha `JWT_SECRET` (servidor) longo e único; placeholders são rejeitados na inicialização.
- Prefira HTTPS em produção e restrinja `CORS_ORIGINS` (sem `*`).
- Faça backup offline da exportação do cofre / materiais de recuperação.

Para a API, veja o README do `openkey_server` e `/docs` em um servidor em execução.

## Modelo de ameaça

Modelo completo em inglês / árabe: [English](/guide/security) · [العربية](/ar/guide/security)

**Resumo**

- O servidor de sync não é confiável para confidencialidade (só ciphertext).
- Sem recuperação da senha mestra.
- Sync é LWW por revision (não CRDT).
- LAN Pro só em plataformas sem IAP da loja.
- Prefira HTTPS, `JWT_SECRET` forte e `CORS_ORIGINS` explícito (nunca `*`).

Reporte vulnerabilidades em privado — **security@openselfhosting.com**.
