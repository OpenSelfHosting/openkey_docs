# Compartilhamento e organizações

Compartilhe itens individuais ou trabalhe em **organizações** com outros usuários OpenKey no **mesmo servidor auto-hospedado**. Tudo o que o servidor armazena para orgs e compartilhamentos permanece como **texto cifrado** — os clientes envolvem chaves para os destinatários; a API nunca descriptografa nomes ou cargas.

<img src="/guide/sharing-key-wrap.svg" alt="Sharing model: publish identity keys, wrap org keys for live shared collections, or wrap entry shares as frozen ciphertext snapshots; server stores opaque blobs only" class="ok-diagram" width="920" height="400" />

**Requer OpenKey Pro** e uma conta de [servidor](./server) configurada (registro / login + sync). Publique chaves de identidade antes de convidar ou compartilhar para que os pares possam envolver chaves para você.

## Pré-requisitos

1. Instale o app ([Download](./download)) e desbloqueie seu cofre.
2. Conecte **Configurações → Dados → Servidor auto-hospedado** e sincronize.
3. **Configurações → Dados → Publicar chaves de identidade** (Pro) — envia material opaco de chave pública / chave privada envolvida usado para compartilhamento.
4. Os destinatários devem usar a **mesma URL do servidor** e ter publicado chaves de identidade (ou pelo menos uma conta registrada que o servidor possa consultar).

## Organizações

Caminho: **Configurações → Dados → Organizações**, ou **Hub de itens → Organizações**.

### Criar uma org

1. Abra Organizações → criar.
2. O cliente criptografa o nome da org e envolve uma chave de org para você como proprietário.
3. Crie **coleções compartilhadas** na org para logins da equipe (nomes + cargas criptografados).

As entradas compartilhadas da org ficam nessas coleções e sincronizam como linhas opacas (`encrypted_payload`).

### Convidar membros

1. Abra a org → **Convidar membro**.
2. Digite o **e-mail** dele (deve já existir neste servidor) e escolha uma função (`admin` / `member`).
3. O cliente envolve a chave da org para a chave de identidade pública dele e publica o convite.
4. Eles veem **Convites pendentes**, aceitam e então podem abrir coleções compartilhadas após sincronizar.

O proprietário/admin pode revogar convites pendentes, alterar funções ou remover membros. O proprietário não pode sair da org; transferir a propriedade não é um caminho de recuperação separado — planeje os admins com cuidado.

### Aceitar um convite

1. Abra Organizações → **Convites pendentes**.
2. Aceite. Sincronize para que as coleções compartilhadas apareçam.
3. Use a mesma senha mestra e servidor de sempre — entrar não dá ao servidor texto em claro.

## Compartilhamentos de itens e coleções

Compartilhe um único login (ou coleção) com outro usuário sem colocá-lo em uma org.

1. Abra a entrada (ou coleção) → **Compartilhar**.
2. Escolha o e-mail do destinatário no seu servidor.
3. O cliente envolve uma chave de item para ele. **Compartilhamentos de entrada fazem um snapshot** da carga cifrada no momento do compartilhamento.
4. Destinatário: aceite na UI de compartilhamentos / pendentes; o snapshot é importado para **o** cofre dele (novo uuid local).

### Semântica de snapshot (importante)

- Aceitar um compartilhamento de **entrada** copia o texto cifrado congelado para o cofre pessoal do destinatário.
- Edições posteriores na entrada original do proprietário **não** são enviadas aos destinatários.
- **Revogar** interrompe uma aceitação pendente; **não** exclui uma cópia já importada no dispositivo do destinatário.

Trate compartilhamentos como entregar uma cópia selada, não um documento compartilhado ao vivo. Prefira **coleções compartilhadas de org** quando precisar de acesso contínuo da equipe ao mesmo texto cifrado sob uma chave de org compartilhada.

## Extensão

No modo autônomo (servidor) a [extensão do navegador](./extension) pode listar/aceitar/revogar compartilhamentos e listar organizações / coleções compartilhadas. O modo ponte desktop depende do app desbloqueado para operações do cofre.

## Notas de segurança

- Compartilhe apenas com pessoas e dispositivos em quem confia — destinatários que aceitam podem descriptografar o que você envolveu para eles.
- Nomes de org, cargas de compartilhamento e blobs de chaves de identidade são opacos no servidor ([Segurança](./security)).
- Revogar acesso no servidor não apaga cópias locais já descriptografadas em outro dispositivo.
- Mantenha backups Pro; compartilhamento não substitui materiais de recuperação offline.

## API relacionada (auto-hospedadores)

Consulte o README do `openkey_server`: `/orgs`, `/invites/*`, `/shares`, mais `POST /auth/lookup-public-key` para envolver chaves por e-mail.

Próximo: [Usar o app](./app) · [Importar e exportar](./import-export) · [FAQ](./faq) · [Configuração do servidor](./server)
