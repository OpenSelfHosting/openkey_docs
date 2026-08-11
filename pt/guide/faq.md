# FAQ e solução de problemas

Respostas curtas a perguntas comuns. Contexto mais profundo: [Segurança](./security), [Configuração do servidor](./server), [Usar o app](./app), [Nearby](./nearby), [Extensão do navegador](./extension), [CLI](./cli).

## Senha mestra e recuperação

### Esqueci minha senha mestra. Posso recuperar o cofre?

**Não.** O OpenKey é zero-knowledge: o servidor nunca vê a senha mestra nem a chave do cofre em texto claro. Sem a senha (e sem um dispositivo que ainda tenha uma sessão desbloqueada ou um backup local criptografado que você possa desbloquear), o texto cifrado é irrecuperável.

Mantenha uma senha mestra forte e única e pelo menos um backup local criptografado **Pro** (`.okbak`) ou uma exportação offline.

### O administrador do servidor pode redefinir minha senha?

Não. Administradores podem excluir ou reter texto cifrado e observar metadados (e-mail, tamanhos, horários). Eles não podem descriptografar seu cofre nem definir uma nova senha mestra para você.

### Como altero minha senha mestra?

No app, use o fluxo de conta / segurança que rotaciona credenciais (`/auth/rekey` no servidor). A chave do cofre em si permanece a mesma; apenas o auth hash e a chave do cofre envolvida no servidor são atualizados. Sincronize outros dispositivos depois com a **nova** senha mestra.

## Sync e servidor

### A sync falha ou o login retorna um erro

1. Confirme que `http(s)://your-host/health` retorna saudável.
2. Use a **mesma** URL de servidor exata em cada cliente (barra final é aceita; prefira HTTPS em produção).
3. Verifique se `JWT_SECRET` está definido (≥ 32 caracteres, não um placeholder) — a API recusa iniciar caso contrário.
4. Verifique se `CORS_ORIGINS` inclui as origens da extensão / web se você as usa (**nunca `*`**).
5. Endpoints de auth têm **limite de taxa** por IP (`AUTH_RATE_LIMIT_*`). Aguarde um minuto e tente novamente após muitos logins falhos.
6. Registre-se uma vez no primeiro dispositivo; em outros dispositivos **faça login** com o mesmo e-mail + senha mestra, depois **Sincronizar agora**.

### O telefone não alcança `http://localhost:8000`

`localhost` no telefone é o próprio telefone. Use o IP LAN do seu computador (`http://192.168.x.x:8000`) na mesma Wi‑Fi, ou exponha HTTPS via proxy reverso / túnel. HTTP em texto claro pode ser bloqueado no celular — prefira HTTPS para qualquer coisa além de depuração local.

### Dois dispositivos mostram conteúdos diferentes do cofre após a sync

A sync é **last-write-wins por revision**, não um CRDT. Edições concorrentes podem sobrescrever. Puxe/envie novamente após editar em um dispositivo por vez. A sync Nearby na LAN usa a mesma regra LWW.

### Como excluo minha conta no servidor?

Clientes chamam `POST /auth/delete` autenticado após provar novamente o `auth_hash` atual. Isso remove permanentemente o texto cifrado no servidor. **Cofres locais nos dispositivos não são afetados** — exclua ou limpe-os separadamente se necessário.

## App e Pro

### O que é grátis vs Pro?

Consulte a matriz em [Usar o app](./app#gratis-vs-openkey-pro). Versão curta: grátis inclui cofre básico + sync de servidor com limites de itens; Pro desbloqueia itens ilimitados, exportar, backups criptografados, Nearby, organizações/compartilhamento, anexos e ícones personalizados.

### O Nearby não encontra o outro dispositivo (Pro)

1. Ambos os dispositivos desbloqueados, **Configurações → Dispositivos próximos** iniciado, mesma Wi‑Fi (sem convidados/isolamento de clientes).
2. Prefira **Escanear QR de emparelhamento** em vez de digitar o código; permita avisos de câmera / rede local.
3. Desative VPN / private relay temporariamente. No macOS, permita o retorno de conexão do firewall se a conexão QR falhar.
4. Emparelhe, depois **Vincular cofre** (mesma impressão da chave do cofre). Guia completo: [Nearby](./nearby).
5. Opcional **Somente redes confiáveis**: adicione seu SSID ou o Nearby pausa em redes desconhecidas.
6. Plataformas com IAP da loja (Android / iOS / macOS) ignoram **LAN Pro** dos pares — compre/restaure Pro naquela loja se necessário.

### Como envio uma senha para outro dispositivo na LAN?

Após emparelhar (Pro), use **Enviar para dispositivo** na entrada ou nas ações do par Nearby. Isso envia uma entrada pela sessão LAN sem esperar uma sync completa do cofre. Detalhes: [Nearby → Enviar uma entrada](./nearby#enviar-uma-entrada).

### Preenchimento automático / passkeys não aparecem

Ative o OpenKey como provedor do sistema de senhas e passkeys em **Configurações → Preenchimento automático**, depois desbloqueie o cofre. No iOS/macOS conceda os avisos de permissão do SO. Reinicie o navegador ou o app de destino após mudar de provedor.

### Qual é o atalho de preenchimento da extensão?

`Ctrl+Shift+L` no Windows/Linux, `⌘⇧L` no macOS. Remapeie em atalhos de teclado da extensão do navegador se necessário. Veja [Extensão do navegador](./extension#atalho-de-teclado).

### A importação funcionou mas a exportação está bloqueada

**Importar é grátis; exportar requer Pro** (igual para backups criptografados `.okbak`). Guia: [Importar e exportar](./import-export).

### Como funcionam os anexos?

**Pro.** Abra um login → adicione um anexo criptografado (máx. cerca de **20 MB**). Anexos sincronizam como texto cifrado pelo seu servidor. A exportação OpenKey JSON inclui apenas metadados — use `.okbak` para um cofre completo com blobs de anexos.

### Como adiciono códigos TOTP / autenticador?

Em uma entrada, adicione um segredo de autenticador ou URI `otpauth`, ou **escaneie o QR** da configuração 2FA do site. Os códigos aparecem com o cofre desbloqueado; Preenchimento automático do sistema / a extensão podem preencher onde suportado.

### Coleções podem ser aninhadas?

Sim — pastas podem conter outras pastas (relação `parent`). Logins aninhados são incluídos no preenchimento automático e na ponte desktop.

### Itens excluídos desaparecem imediatamente em outros dispositivos?

Itens excluídos de forma suave sincronizam como **tombstones** até os pares atualizarem. Last-write-wins usa `revision` por item — edições concorrentes ainda podem sobrescrever.

### Builds web exigem Pro?

**Ainda não.** Builds web não aplicam limites Pro hoje. Builds de loja móvel e desktop aplicam.

### Como funcionam organizações e compartilhamentos?

Pro + mesmo servidor auto-hospedado. Publique chaves de identidade, depois convide para uma org ou compartilhe um snapshot de entrada. Detalhes: [Compartilhamento e organizações](./sharing).

### Como funcionam biometria / bloqueio automático?

Em **Configurações → Segurança** você pode ativar desbloqueio biométrico (depende da plataforma) e proteções de bloqueio relacionadas. Prefira bloquear quando inativo em máquinas compartilhadas. A biometria envolve a chave do cofre no dispositivo — não substitui uma senha mestra forte.

## Extensão do navegador

### A extensão não consegue falar com o app desktop

1. Desbloqueie o cofre desktop e mantenha-o desbloqueado.
2. Abra **Configurações → Preenchimento automático** (e **Extensão do navegador** no macOS) para registrar o host nativo.
3. Chromium: grave o ID da extensão descompactada no arquivo da plataforma (veja [Extensão do navegador](./extension)), depois abra Preenchimento automático novamente.
4. Escolha **Usar app desktop** na extensão.
5. macOS precisa de Python 3 no `PATH` para o script do host.

### O desbloqueio autônomo falha contra meu servidor

Confirme que o prelogin funciona: o e-mail deve já estar registrado. Mesma senha mestra do app. A URL do servidor deve ser alcançável pelo navegador (CORS / HTTPS). Verifique a página Options pela URL e tente `/health` em uma aba normal.

### Passkeys voltam ao autenticador do navegador

Isso é esperado quando você escolhe **Usar navegador** no diálogo de confirmação, ou quando o cofre da extensão está bloqueado. Desbloqueie a extensão (autônomo) para armazenar/usar passkeys do OpenKey.

## CLI

### `openkey secret …` diz para desbloquear o app

Comandos do cofre precisam de um **app desktop desbloqueado** (ponte nativa) ou `eval $(openkey unlock)` após `login`. Execute `openkey status` para ver o estado da ponte / sessão.

### Sessão expirada

O bloqueio padrão é 15 minutos (`openkey config set-lock`). Execute `eval $(openkey unlock)` novamente. Prefira o prompt interativo de senha em vez de `OPENKEY_PASSWORD` em máquinas pessoais.

## Segurança / privacidade

### O Password health envia minhas senhas para a internet?

Verificações locais de fracas/reutilizadas permanecem no dispositivo. Have I Been Pwned opcional usa apenas **k-anonimato de prefixo SHA-1** — nunca a senha completa. Veja [Segurança](./security).

### O Nearby é um backup?

Não. Sincroniza texto cifrado na LAN entre dispositivos emparelhados e com cofre vinculado. Mantenha também backups Pro offline.

## Ainda com problemas?

1. Registre o cliente que falha (app / extensão / CLI) e o horário aproximado.
2. Verifique os logs do servidor (`docker compose logs -f api`) e `/health`.
3. Reporte problemas de segurança em privado — **security@openselfhosting.com** ou um advisory privado em [OpenSelfHosting](https://github.com/OpenSelfHosting). Veja [Segurança](./security).
4. Para bugs de produto, abra uma issue em [OpenSelfHosting](https://github.com/OpenSelfHosting) com nome do pacote e versão.

Próximo: [Nearby](./nearby) · [Configuração do servidor](./server) · [Segurança](./security) · [Download](./download)
