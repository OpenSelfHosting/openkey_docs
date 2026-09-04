# Política de privacidade

**Última atualização:** 6 August 2026  
**Produto:** OpenKey (`com.openselfhosting.openkey`)  
**Editor:** OpenSelfHosting  
**Contato:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · Segurança: [security@openselfhosting.com](mailto:security@openselfhosting.com)

Esta Política de Privacidade descreve como o app **OpenKey** para mobile e desktop trata informações. O OpenKey é projetado como um gerenciador de senhas **zero-knowledge**: os segredos do cofre são criptografados no seu dispositivo antes de saírem dele.

Leitura relacionada: [Segurança](/pt/guide/security) · [Termos de serviço](/pt/terms)

## Resumo

| Tópico | Prática |
|-------|----------|
| Senha mestra | Nunca sai do seu dispositivo em texto claro |
| Conteúdo do cofre | Criptografado no dispositivo (AES-256-GCM); o sync opcional envia **apenas ciphertext** |
| Nossa nuvem | O OpenKey **não** opera uma nuvem de cofre obrigatória do fornecedor para suas senhas |
| Servidor auto-hospedado | Se você conectar um, **você** (ou sua org) o opera e controla esses dados |
| Cobrança da loja | Compras Pro passam pela cobrança da Apple / Google / Microsoft onde disponível |

## A quem se aplica

Esta política se aplica ao **app** oficial OpenKey (Android, iOS, macOS, Windows, Linux e builds web do mesmo produto). Pacotes separados (servidor auto-hospedado, extensão do navegador, CLI, site de documentação) seguem os mesmos princípios zero-knowledge; operadores de um servidor auto-hospedado são controladores dos dados operacionais daquela instância (veja abaixo).

## Informações que não coletamos

A OpenSelfHosting **não** recebe:

- Senha mestra
- Chave do cofre em texto claro
- Logins, notas, segredos TOTP, cartões de pagamento, dados de carteiras cripto, segredos de desenvolvedor ou conteúdo de anexos descriptografados
- HTML completo de páginas que você visita (a extensão do navegador não exfiltra páginas para uma nuvem do fornecedor)

Não vendemos dados pessoais.

## Informações processadas no seu dispositivo

O OpenKey armazena e processa **localmente** no seu dispositivo (criptografado em repouso após a configuração de desbloqueio):

- Banco de dados do cofre (coleções, entradas, metadados/blobs de anexos como ciphertext quando bloqueado/sincronizado)
- Configurações do app (aparência, idioma, preferências de autofill, URL do servidor que você informa, preferências do Nearby)
- Envelope biométrico opcional do material de desbloqueio (gerenciado pelo secure enclave / keystore do SO quando disponível)
- Tokens de sync em cache para um servidor que **você** configura (JWTs de acesso / material de refresh armazenados pelo app para aquele host)

Excluir o app ou apagar o dispositivo remove dados locais conforme backups do SO que você controla.

## Servidor de sync auto-hospedado opcional

Se você ativar **Configurações → Dados → Servidor auto-hospedado**, o app envia para **sua** API (ou uma que você escolher):

- E-mail (identificador da conta)
- `auth_hash` derivado no cliente (não a senha mestra)
- Salt e parâmetros KDF
- Chave do cofre envolvida (criptografada) e ciphertext opaco para itens do cofre, anexos, orgs e compartilhamentos

O servidor de referência do projeto OpenKey é projetado para armazenar **apenas ciphertext**. Quem opera esse servidor (você, sua empresa ou um host em quem confia) pode ver metadados como e-mail, tamanhos de ciphertext e timestamps, e pode excluir ou reter dados — mas não pode descriptografar o conteúdo do cofre por design. Veja [Segurança](/pt/guide/security).

## Sync Nearby na LAN (Pro)

O Nearby emparelha dispositivos na sua rede local e, após **Vincular cofre**, sincroniza ciphertext do cofre entre esses dispositivos. O emparelhamento e o compartilhamento da chave do cofre ocorrem na sua LAN entre dispositivos que você escolhe. A OpenSelfHosting não recebe tráfego do Nearby.


## Autofill, passkeys e extensão do navegador

- **Autofill do sistema / Credential Provider** compartilha credenciais com apps e sites apenas por fluxos de preenchimento mediados pelo SO que você inicia ou aprova.
- A **extensão do navegador** pode desbloquear contra seu servidor ou preencher via o app desktop desbloqueado (native messaging). Preencher e salvar são ações intencionais do usuário. Veja [Extensão do navegador](/pt/guide/extension).

## Compras e assinaturas (OpenKey Pro)

Onde o Pro é vendido por uma loja de apps, processamento de pagamento, recibos e dados de conta relacionados são tratados pela **Apple, Google ou Microsoft** sob suas políticas. O OpenKey pode receber direitos da loja / status de compra necessários para desbloquear recursos Pro. Não recebemos o número completo do seu cartão de pagamento dessas lojas.

A atestação **LAN Pro** entre pares Nearby é uma conveniência local em algumas plataformas desktop — não é uma conta de cobrança na nuvem com a OpenSelfHosting.

## Diagnóstico e suporte

O OpenKey não inclui um SDK de analytics de terceiros obrigatório que envie conteúdo do cofre. Se você enviar e-mail ao suporte ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) ou canais da comunidade no Telegram, você escolhe o que incluir (por exemplo, versão do app). Não envie senhas mestras ou exportações do cofre em e-mail em texto claro.

## Privacidade de crianças

O OpenKey não é direcionado a crianças menores de 13 anos (ou a idade mínima exigida na sua jurisdição). Não use o app se estiver abaixo dessa idade.

## Processamento internacional

O processamento ocorre nos seus dispositivos e, se você configurar sync, no host do servidor que escolher. Se você nos contatar, mensagens podem ser processadas nas regiões onde nossas ferramentas de e-mail ou suporte operam.

## Retenção

- **No dispositivo:** até você excluir o cofre, desinstalar o app ou apagar o dispositivo / backups.
- **No seu servidor de sync:** até você excluir sua conta no servidor ou o operador excluir os dados; tombstones podem permanecer até os pares sincronizarem.
- **E-mail de suporte:** retido conforme necessário para responder e para fins legítimos de segurança/legal.

## Suas escolhas

- Usar o OpenKey totalmente offline sem servidor
- Aceitar ou recusar emparelhamento Nearby
- Exportar ou excluir dados locais (exportação / backup pode exigir Pro)
- Excluir uma conta no servidor pelo fluxo autenticado de exclusão (remove ciphertext do servidor; cópias locais permanecem até você apagá-las)
- Revogar assinaturas da loja pelo gerenciamento de assinaturas da loja

## Alterações

Podemos atualizar esta política conforme o produto muda. A data «Última atualização» mudará; alterações materiais também podem ser anotadas no [changelog](/pt/guide/changelog) ou em links Sobre no app.

## Contato

- Produto / suporte: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Relatórios de segurança: [security@openselfhosting.com](mailto:security@openselfhosting.com) — veja [Reportar vulnerabilidades](/pt/guide/security)
- Organização: [OpenSelfHosting](https://github.com/OpenSelfHosting) · Produto: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Empresa: [openselfhosting.com](https://openselfhosting.com)

Próximo: [Termos de serviço](/pt/terms) · [Segurança](/pt/guide/security) · [Usar o app](/pt/guide/app)
