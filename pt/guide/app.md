# Usar o app

OpenKey é o cliente móvel e desktop para Android, iOS, macOS, Linux e Windows. Os recursos principais do cofre são gratuitos; o OpenKey Pro desbloqueia extras. Seu cofre permanece criptografado no dispositivo; um [servidor](./server) auto-hospedado é opcional para sincronização. O app instale-o pela loja oficial ou canal de download da sua plataforma.

<img src="/app_icon.png" alt="OpenKey app icon" width="96" height="96" style="border-radius: 20px; margin: 1rem 0;" />

## Instalar

1. Obtenha o OpenKey na loja / distribuidor oficial da sua plataforma.
2. Abra o app e crie ou desbloqueie um cofre com sua senha mestra.

Os pacotes relacionados deste projeto incluem o [servidor](./server), a [extensão do navegador](./extension) e a [CLI](./cli).



## Grátis vs OpenKey Pro {#free-vs-openkey-pro}

Os recursos básicos do cofre funcionam offline sem assinatura. No Android, iOS, macOS, Windows e Linux, o Pro aumenta limites e libera extras. Builds web ainda não aplicam Pro. Em plataformas **sem** IAP da loja (em geral Windows/Linux), um par Nearby pode compartilhar atestação **LAN Pro** — apenas conveniência, não prova criptográfica de compra.

| | Grátis | Pro |
|--|------|-----|
| Entradas de login | Até **50** | Ilimitado |
| Coleções (pastas) | Até **3** | Ilimitado |
| Cartões / cripto / segredos | Até **3** cada | Ilimitado |
| Sync de servidor, preenchimento, importar | Sim | Sim |
| **Exportar**, backup **`.okbak`**, **Nearby**, **orgs/compartilhar**, **anexos**, **ícone** | — | Sim |

Gerencie a assinatura em **Configurações → OpenKey Pro** quando houver cobrança da loja.

## Sincronização Nearby na LAN (Pro)

Sincronize o mesmo cofre no Wi‑Fi local sem servidor:

1. Desbloqueie o OpenKey nos dois dispositivos → **Configurações → Dispositivos próximos**.
2. Inicie o Nearby nos dois, emparelhe com o código curto e toque em **Vincular cofre**.
3. Devem compartilhar a mesma chave do cofre (mesma impressão). Se diferirem, o receptor pode adotar a do par (substitui dados locais após confirmar a senha mestra).
4. Após vincular, as mudanças sincronizam enquanto ambos estiverem desbloqueados; use **Sincronizar agora** para atualização manual.
5. **Visível na rede local** é lembrado: após ativar uma vez, o Nearby retoma no próximo desbloqueio.
6. Opcional **Somente redes confiáveis**: adicione SSIDs; o Nearby pausa em redes desconhecidas.
7. **Dispositivos confiáveis**: após um emparelhamento + vínculo, reconectam automaticamente com Nearby ativo.

A sync LAN move só **texto cifrado** (LWW por revision). Não é backup. Ver [FAQ](./faq) · [Compartilhamento](./sharing) · [Importar e exportar](./import-export).

## Criar ou desbloquear um cofre

1. Escolha uma **senha mestra** forte (recomendado 12+ caracteres com tipos mistos).
2. Aceite os avisos do cofre: **não há recuperação** se esquecer a senha mestra; os dados são criptografados no dispositivo; backups importam.
3. Desbloqueie com a senha mestra sempre que abrir o app.

A senha mestra nunca sai do dispositivo em texto claro.

## Uso diário

### Início do cofre

- Navegue por **coleções** (pastas) e **entradas** de senhas.
- Pesquise, filtre por tags e abra uma entrada para copiar usuário/senha ou ver campos personalizados.
- Crie entradas com URLs, notas, ícones e TOTP onde suportado.

### Gerador de senhas

Abra **Configurações → Gerador de senhas** (ou o gerador a partir do formulário de entrada) para criar senhas fortes com seu comprimento e regras de caracteres.

### Cartões, cripto e segredos

Áreas reservadas do cofre contêm:

- **Cartões de pagamento**
- **Carteiras cripto**
- **Segredos de desenvolvedor** (tokens API, chaves SSH, trechos `.env`) — também usados pela [CLI](./cli)

### Organizações e compartilhamento

Compartilhe coleções ou itens individuais com outros usuários OpenKey no mesmo servidor. Nomes de org e payloads de compartilhamento permanecem texto cifrado no servidor.

## Mapa de configurações

| Área | Função |
|------|----------------|
| **Aparência** | Modo de tema e idioma (mesmos idiomas deste site de documentação) |
| **Segurança** | Bloqueio / biometria / proteções relacionadas |
| **Gerador de senhas** | Opções de geração padrão |
| **Dados** | Sync do servidor, Nearby LAN (Pro), importação/exportação, backups, extensão, compartilhamento |
| **OpenKey Pro** | Gerenciamento de assinatura onde disponível |

## Conectar um servidor auto-hospedado

1. Execute [OpenKey Server](./server).
2. **Configurações → Dados → Servidor auto-hospedado** → defina a URL → **Registrar** ou **Login** → **Sincronizar agora**.

Detalhes: [Instalar o servidor](./server).

## Preenchimento automático e navegador

- **Autofill mobile / desktop:** ative o OpenKey como provedor do sistema de senhas e passkeys em Configurações → Segurança.
- **Navegador:** instale a extensão; no desktop, desbloqueie o app e registre o host nativo, ou desbloqueie a extensão contra seu servidor em modo autônomo.

## Importar, exportar e backup

- **Importar / exportar:** mova senhas para dentro ou fora (Bitwarden JSON, Chrome CSV, 1Password CSV, OpenKey JSON). A exportação descriptografa no dispositivo — trate o arquivo como sensível.
- **Backup / restauração local:** backups criptografados do dispositivo (Pro onde exigido).
- Prefira backups offline mesmo usando sync do servidor — senha mestra esquecida não pode ser recuperada do servidor.

## Boas práticas

- Use uma senha mestra única e forte.
- Sincronize após mudanças importantes quando usar um servidor.
- Mantenha pelo menos um backup offline.
- Bloqueie o cofre ao se afastar de uma máquina compartilhada.

Próximo: [Instalar o servidor](./server) · [CLI](./cli) · [Início rápido](./quick-start)

Also: [Download](./download) · [Sharing](./sharing) · [Import & export](./import-export) · [FAQ](./faq) · [Changelog](./changelog)
