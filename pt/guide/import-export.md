# Importar e exportar

Mova senhas entre o OpenKey e outros gerenciadores, ou faça um backup criptografado completo do cofre. Caminho: **Configurações → Dados → Importar e exportar** (e **Backup e restauração** para `.okbak`).

| Ação | Grátis | Pro |
|--------|------|-----|
| Importar (todos os formatos abaixo) | Sim | Sim |
| Exportar (todos os formatos abaixo) | — | Sim |
| Backup / restauração local criptografado (`.okbak`) | — | Sim |

Exportações e backups descriptografam no dispositivo antes de gravar um arquivo — trate cada exportação como **secreto**. Prefira armazenamento criptografado offline. Veja [FAQ](./faq) e [Grátis vs Pro](./app#gratis-vs-openkey-pro).

## Guia de importação

1. Desbloqueie o OpenKey.
2. **Configurações → Dados → Importar e exportar → Importar**.
3. Escolha um formato, selecione o arquivo, confirme.
4. Revise novas entradas/coleções no cofre. Sincronize com o seu [servidor](./server) se usar um.

### Bitwarden JSON

1. No Bitwarden: exporte **JSON** (exportação não criptografada — proteja o arquivo).
2. No OpenKey: Importar → **Bitwarden JSON**.
3. Pastas mapeiam para coleções quando possível; logins viram entradas.

### Chrome / Edge CSV

1. Gerenciador de senhas do navegador → exportar CSV.
2. OpenKey → Importar → **Chrome CSV**.
3. Espere colunas url / username / password; campos personalizados podem ser limitados.

### LastPass CSV

1. LastPass → exportar CSV.
2. OpenKey → Importar → **LastPass CSV**.

### 1Password CSV

1. 1Password → exportar CSV (formato suportado pelo importador do OpenKey).
2. OpenKey → Importar → **1Password CSV**.
3. Tipos de item complexos podem ser achatados para entradas tipo login.

### KeePass (`.kdbx`)

1. OpenKey → Importar → **KeePass `.kdbx`**.
2. Digite a senha do banco de dados e o **arquivo de chave** opcional.
3. Grupos viram coleções; entradas importam como logins quando os campos mapeiam bem.

Senha / arquivo de chave incorretos → desbloqueio falhou; sem ida e volta ao servidor (tudo local).

### OpenKey JSON

Formato de ida e volta para exportações nativas do OpenKey. Use ao mover entre dispositivos sem sync de servidor, ou como dump portátil do cofre (**Pro** para criar o arquivo).

**Anexos:** exportações OpenKey JSON incluem *metadados* de anexos nas entradas, mas **omitem os blobs de texto cifrado dos anexos**. Para um cofre completo com anexos, use um backup criptografado **`.okbak`**.

## Guia de exportação (Pro)

1. **Configurações → Dados → Importar e exportar → Exportar**.
2. Escolha o formato. Para KeePass, defina uma nova senha do banco de dados (e arquivo de chave opcional).
3. Salve o arquivo em local criptografado / offline.
4. Exclua exportações em texto claro ao terminar a migração.

Exportações disponíveis: **OpenKey JSON**, **Bitwarden JSON**, **Chrome CSV**, **LastPass CSV**, **KeePass `.kdbx`**, **1Password CSV**.

## Backup criptografado (Pro)

**Configurações → Dados → Backup e restauração**

- Cria um `.okbak` completo do cofre (banco de dados, configurações, anexos) criptografado para restaurar com as credenciais do seu cofre.
- Restaurar substitui os dados locais do cofre — confirme antes de prosseguir.
- Nearby / sync de servidor **não** é backup ([FAQ](./faq)).

## Após migrar de outro gerenciador

1. Verifique logins importantes (e TOTP se usou).
2. Ative [preenchimento automático](./app) / [extensão](./extension).
3. Sincronize com o servidor ou emparelhe Nearby (Pro) para outros dispositivos.
4. Apague com segurança os arquivos de exportação antigos.
5. Opcionalmente altere senhas que estiveram em um CSV não criptografado durante a transferência.

## Relacionado

- [Compartilhamento e organizações](./sharing) — texto cifrado de equipe no seu servidor
- [Usar o app](./app)
- [Segurança](./security) — exportações são material de confiança

Próximo: [Download](./download) · [FAQ](./faq) · [CLI](./cli)
