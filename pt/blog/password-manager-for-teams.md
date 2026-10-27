---
title: "Gerenciador de senhas para equipes: o que avaliar"
description: Como escolher um gerenciador de senhas para equipes — cofres compartilhados, papéis, offboarding, acesso via CLI e API, auditabilidade — e como rodar um no seu próprio servidor.
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# Gerenciador de senhas para equipes: o que avaliar

Um gerenciador de senhas para equipes não é um produto de consumo com mais assentos. Ele tem um trabalho diferente: precisa sobreviver a pessoas entrando e saindo, e precisa responder a perguntas sobre quem teve acesso a quê, e quando. A maioria das ferramentas é julgada pelo recurso de compartilhamento e reprova na segunda pergunta.

Este artigo é a checklist de avaliação, mais como o modelo do OpenKey funciona se você quiser coleções compartilhadas em uma infraestrutura que você controla.

## Os requisitos que realmente diferem

### 1. Cofres compartilhados com controle de acesso de verdade

"Posso compartilhar com minha equipe" é o mínimo obrigatório. O que importa é se o acesso é por coleção ou por pessoa, se você pode compartilhar um subconjunto sem expor tudo, e se um prestador de serviço consegue ver exatamente um serviço.

- **Compartilhamento tudo-ou-nada** falha rápido. Não escala para além de cerca de cinco pessoas.
- **Compartilhamento por coleção** é o modelo mínimo útil.
- **Acesso baseado em papéis** (admin / membro e, idealmente, somente leitura) é o que você quer quando existem revisores e aprovadores.

### 2. Offboarding que realmente remove o acesso

Este é o requisito que separa ferramentas de consumo de ferramentas de equipe, e é o que mais falta.

Quando alguém sai, você precisa saber:

- A pessoa perde o acesso **imediatamente**, ou só no próximo sync?
- Ela mantém **cópias offline** de credenciais compartilhadas — e se mantém, como você lida com isso?
- Você consegue **revogar um compartilhamento** e saber que a cópia sumiu?
- A **propriedade da org** e os direitos de admin sobrevivem à saída dela, ou a equipe perde a capacidade de se administrar?

Uma ferramenta que não responde a isso é um passivo de conformidade disfarçado de recurso de produtividade.

### 3. Automação e acesso de máquina

Humanos em uma UI são metade do problema. A outra metade é:

- Uma **CLI** para CI e scripts
- Uma **API** para provisionamento e ferramentas internas
- **Contas de serviço** que não expiram quando uma pessoa sai
- **Importação em massa** de um diretório ou de uma planilha de credenciais compartilhadas legadas

Equipes com infraestrutura em geral precisam das quatro. Um gerenciador de senhas que só tem extensão de navegador não sobrevive ao contato com um pipeline de deploy.

### 4. Zero-knowledge, e o que isso significa comercialmente

Para um indivíduo, zero-knowledge é uma preferência de privacidade. Para uma organização, é uma posição de conformidade: é a diferença entre "nosso fornecedor foi violado" e "nosso fornecedor foi violado e eles tinham ciphertext".

Também restringe recursos. Alguns fornecedores oferecem recuperação de conta, redefinições de admin ou imposição de política que exigem plaintext no servidor — e cada uma delas é uma redução deliberada da propriedade zero-knowledge. As duas posições são defensáveis; escolha sabendo, em vez de descobrir durante uma revisão de incidente.

### 5. Trilha de auditoria

"Posso provar quem teve acesso à senha do banco de produção em 3 de março?" precisa de um log de acesso, retido por um período definido e exportável para um auditor.

Note o limite com honestidade: em um sistema zero-knowledge, um admin pode ver *que* uma entrada foi acessada, não *o que ela continha*. Esse é o comportamento correto, e também é uma restrição sobre o que a sua auditoria consegue provar.

### 6. Infraestrutura própria (bring-your-own)

Em algum momento uma revisão de segurança vai perguntar se credenciais compartilhadas saem da sua rede. As respostas são: hospedado no fornecedor com um DPA contratual, nuvem privada, ou auto-hospedado. A auto-hospedagem é a única que é verificável por você, e é a única onde você consegue demonstrar que o servidor guarda ciphertext.

### 7. Modelo de custo que sobrevive ao número de pessoas

Preço por assento que inclui todo prestador, toda conta de serviço e todo auditor somente leitura fica caro rápido. Verifique:

- Preço de assento somente leitura
- Se contas de serviço são grátis
- Se usuários desativados ainda contam
- Se existe um nível grátis para avaliação

## Uma folha de pontuação para equipes

| Critério | Peso | Por que importa |
|-----------|--------|----------------|
| Offboarding e revogação | ×3 | O requisito que a maioria das ferramentas reprova |
| Controle de acesso por coleção | ×3 | Impede que um prestador veja tudo |
| Acesso via CLI e API | ×3 | Máquinas são metade dos seus usuários |
| Zero-knowledge, verificável | ×3 | Conformidade e exposição a violações |
| Contas de serviço | ×2 | Acesso não humano e de longa duração |
| Log de auditoria com retenção | ×2 | Provar acessos históricos |
| Auto-hospedagem disponível | ×2 | Manter credenciais dentro da sua rede |
| Acesso de emergência | ×1 | Break-glass quando um admin está inacessível |
| Ferramentas de migração em massa | ×1 | Sair da planilha compartilhada |

## Como o OpenKey lida com acesso de equipe

O modelo de compartilhamento do OpenKey foi construído para isso, e é deliberadamente incomum em alguns pontos que vale entender antes de desenhar um processo em cima dele.

### Organizações e coleções compartilhadas

Compartilhar exige **Pro** e um servidor auto-hospedado configurado, com todo mundo na **mesma URL de servidor**. O modelo:

1. **Publique chaves de identidade** para que os pares possam encapsular chaves para você. No OpenKey isso é feito pela extensão do navegador no modo autônomo (servidor) — a página Configurações → Dados do app não inclui essa ação.
2. **Crie uma organização** e coleções compartilhadas dentro dela. O cliente criptografa o nome da org e encapsula uma chave de org para você como proprietário.
3. **Convide membros** por email (eles já precisam existir no servidor), com um papel de `admin` ou `member`. O seu cliente encapsula a chave de org para a chave de identidade publicada deles e envia o convite.
4. Eles aceitam em **Convites pendentes** e sincronizam; as coleções compartilhadas aparecem.

O servidor guarda nomes de org, payloads compartilhados e chaves de identidade como **ciphertext opaco**. Ele nunca abre uma chave de org.

Poderes de admin: revogar convites pendentes, mudar papéis, remover membros. Uma restrição para planejar — **o proprietário não pode sair da org**, e a transferência de propriedade não é um caminho de recuperação separado. Nomeie um segundo proprietário cedo em vez de tratar isso como formalidade.

### Compartilhamentos de item são snapshots, não documentos ao vivo

Este é o detalhe operacional mais importante de todos. Quando você compartilha uma única entrada ou coleção com alguém:

- O payload criptografado é **congelado no momento do compartilhamento** e copiado para o cofre do destinatário na aceitação.
- Edições posteriores na sua cópia **não** são enviadas para ele.
- **Revogar** impede um aceite pendente. **Não** apaga uma cópia que o destinatário já importou.

Então um compartilhamento de entrada se comporta como entregar um envelope lacrado a alguém, não como compartilhar um documento ao vivo. Para qualquer coisa que precise ficar em sincronia — uma conta de serviço compartilhada, uma ferramenta interna da equipe — use uma **coleção compartilhada de org**, onde os membros continuam lendo o mesmo ciphertext sob uma chave de org compartilhada.

Errar isso produz o bug clássico: você atualiza uma senha compartilhada, assume que todos já têm a nova, e metade da equipe está com uma credencial que você rotacionou há um mês.

### O que o OpenKey não faz

Vale dizer com todas as letras, porque isso afeta quando você deve escolher outra coisa:

- **Sem mecanismo de política imposto pelo admin** no cliente. Não existe uma regra no servidor que obrigue um comprimento mínimo de senha em toda a equipe.
- **Sem gancho automático de offboarding.** Remover um membro é uma ação manual: revogue ou remova na org e depois resolva os compartilhamentos de entrada que já foram aceitos.
- **Sem SCIM nem sincronização de diretório.** A associação é gerenciada pelas APIs de org e de compartilhamento.
- **Sem log de auditoria no servidor sobre o acesso a entradas.** O servidor não consegue ver plaintext, então não pode registrar o que foi lido.
- **O sync é última escrita vence por revisão, não um CRDT.** Edições concorrentes podem se sobrescrever; edite em um dispositivo por vez quando isso importar.

Se você precisa de offboarding automatizado, um mecanismo de política ou um log de acesso em nível de conformidade, escolha um produto comercial para equipes. O OpenKey é para equipes que querem a cripto nos clientes delas e estão dispostas a rodar a camada de colaboração por conta própria.

## Implantando para uma equipe

1. **Rode o servidor primeiro.** [Instalação do servidor](/pt/guide/server), endurecida conforme a [checklist de segurança](/pt/blog/self-hosted-password-manager#o-checklist-de-endurecimento).
2. **Crie sua própria conta** e publique as chaves de identidade pela extensão.
3. **Crie a org** e depois uma coleção compartilhada por serviço ou fronteira de equipe. Comece pelas contas de infraestrutura compartilhadas — são as que causam mais estrago quando estão erradas.
4. **Publique as chaves de identidade de todos** antes de convidar, ou a etapa de encapsulamento não vai encontrá-los.
5. **Convoque em grupos pequenos** e verifique que um membro consegue realmente abrir uma coleção compartilhada antes de adicionar o próximo lote.
6. **Mova a planilha compartilhada.** Toda credencial que está hoje em uma planilha de equipe é sua importação de maior prioridade.
7. **Escreva o procedimento de offboarding antes de precisar dele.** Dois passos, escritos: remover da org; revisar e revogar compartilhamentos de entrada.

## A versão de um minuto

Avalie primeiro por offboarding, acesso por coleção e acesso de máquina — não pelo recurso de compartilhamento. Prefira um zero-knowledge que você consiga verificar, e confira se os recursos de recuperação e admin do fornecedor exigem discretamente plaintext no servidor. Se você auto-hospeda, lembre-se de que compartilhamentos de entrada são snapshots: use coleções compartilhadas de org para qualquer coisa que precise ficar atualizada.

## Próximos passos

- [Compartilhamento e organizações](/pt/guide/sharing) — o passo a passo completo
- [Gerenciador de senhas auto-hospedado](/pt/blog/self-hosted-password-manager) — rodando o servidor
- [Gerenciador de senhas para família](/pt/blog/password-manager-for-family) — a versão em escala de casa
- [Segurança](/pt/guide/security) — o que o servidor pode e não pode ver
