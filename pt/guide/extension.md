# Extensão do navegador

Extensão MV3 para **Chrome**, **Edge**, **Brave** e **Firefox**. Pode desbloquear contra o seu [servidor auto-hospedado](./server) (modo autônomo) ou preencher pelo **app desktop** desbloqueado (mensageria nativa).

Nome do host: `com.openselfhosting.openkey`

<img src="/guide/extension-unlock-modes.svg" alt="Two unlock modes: standalone sync with the self-hosted server, or desktop app bridge via native messaging without a separate extension vault unlock" class="ok-diagram" width="920" height="400" />

## O que faz

1. **Cofre autônomo** — desbloqueia com e-mail + senha mestra; sincroniza texto cifrado do seu servidor
2. **Ponte nativa** — quando o app desktop OpenKey está desbloqueado, preenche e salva via mensageria nativa
3. **Preenchimento automático** — sobreposições, menu de contexto e atalho de teclado para logins e cartões de pagamento
4. **Salvar / atualizar** — captura novos logins da página no cofre
5. **Passkeys** — intercepta WebAuthn `create` / `get`; armazena credenciais ES256 (extensão desbloqueada)
6. **Cartões, cripto e segredos** — navegue e preencha/copie áreas reservadas do cofre
7. **Anexos** — liste e baixe anexos descriptografados de um login (modo autônomo)
8. **Compartilhamentos e orgs** — liste/aceite/revogue compartilhamentos e convites de org (modo autônomo)

### Atalho de teclado

| Ação | Windows / Linux | macOS |
|--------|-----------------|-------|
| Preencher login com OpenKey | `Ctrl+Shift+L` | `⌘⇧L` |

Os navegadores podem exigir que você confirme ou remapeie o comando em atalhos de teclado da extensão se outra extensão já o tiver reivindicado.

## Instalar (descompactada)

As listagens das lojas podem ainda não estar publicadas. Compile e carregue localmente:

```bash
cd openkey_extension
npm install
npm run build
```

- **Chrome / Edge / Brave:** `chrome://extensions` → Modo do desenvolvedor → **Load unpacked** → selecione `dist/`
- **Firefox:** `about:debugging` → This Firefox → **Load Temporary Add-on** → escolha `dist/manifest.json`

Copie o ID da extensão no popup ou na página Options — você precisa dele para conectar a ponte desktop em navegadores Chromium.

## Permissões

A extensão usa correspondências de host / content-script `<all_urls>` para que o preenchimento automático, a captura de logins e a interceptação de passkeys funcionem nos sites que você visita (uma lista fixa não cobre a web aberta). A sincronização de texto cifrado e o desbloqueio permanecem no seu dispositivo ou no seu [servidor auto-hospedado](./server); o OpenKey não exfiltra HTML da página para uma nuvem de fornecedor. Prefira **Usar app desktop** quando quiser preencher sem desbloquear um cofre separado da extensão.

## Modos de desbloqueio

### Servidor auto-hospedado

1. Defina a **URL do servidor auto-hospedado** no popup ou em Options.
2. **Criar conta** (registro) ou **Desbloquear** (prelogin + login com o mesmo e-mail e senha mestra do app).
3. O texto cifrado sincroniza via `POST /sync`. A senha mestra nunca sai do cliente.

### Ponte do app desktop

1. Desbloqueie o app desktop OpenKey.
2. Ative Preenchimento automático / conecte a extensão (passos por plataforma abaixo).
3. Na extensão escolha **Usar app desktop**.

Preencher e salvar passam pelo app desbloqueado — não é necessário desbloquear um cofre separado da extensão para esses fluxos.

Opcional: **Configurações → Extensão do navegador → Copiar link do cofre offline** no app para inicialização air-gapped.

## Conectar mensageria nativa

### Windows

Abrir **Configurações → Preenchimento automático** registra `openkey_native_host.exe` em:

`HKCU\Software\...\NativeMessagingHosts\com.openselfhosting.openkey`

Para Chromium, grave o ID da extensão descompactada em:

`%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt`

depois abra Preenchimento automático novamente para regenerar o manifesto do host. O Firefox usa `openkey@openselfhosting.local` automaticamente.

Mantenha o cofre desbloqueado (TCP em loopback).

### macOS

Ao desbloquear, o OpenKey instala `openkey_native_host.py` e grava manifestos nas pastas NativeMessagingHosts do Chrome / Chromium / Edge / Brave / Firefox.

1. Carregue a extensão descompactada e copie o ID.
2. App: **Configurações → Extensão do navegador** → cole o ID → **Conectar extensão**.
3. Mantenha o cofre desbloqueado → extensão: **Usar app desktop**.

Requer **Python 3** no `PATH`.

### Linux

**Configurações → Preenchimento automático** grava manifestos de host em `~/.config/google-chrome/`, Chromium, Edge e `~/.mozilla/native-messaging-hosts/`.

Arquivo do ID da extensão Chromium:

`~/.local/share/OpenKey/chrome_extension_id.txt`

depois toque em Preenchimento automático novamente. O Firefox usa `openkey@openselfhosting.local`.

Socket da ponte: `$XDG_RUNTIME_DIR/openkey-native.sock` (mantenha o cofre desbloqueado).

## Salvar logins capturados

Após enviar um login (ou botão de login / Enter), um banner na página oferece **Salvar** ou **Atualizar**:

1. **Ponte nativa** — `createEntry` / `updateEntry` no app desktop desbloqueado
2. **Autônomo** — criptografa localmente e envia texto cifrado via sync

O mesmo host + usuário + senha é ignorado; uma senha alterada solicita atualização.

## Passkeys

Com a extensão desbloqueada, o OpenKey pode lidar com WebAuthn em sites. Um diálogo na página confirma; escolha **Usar navegador** para voltar ao autenticador da plataforma.

Teste rápido após desbloquear: [webauthn.io](https://webauthn.io) ou `npx tsx src/passkey/smoke.test.ts` em `openkey_extension`.

## Relacionado

- [Download e instalação](./download)
- [Usar o app](./app) — configurações de Preenchimento automático e Extensão do navegador
- [Configuração do servidor](./server)
- [Segurança](./security) — limite de confiança da extensão
