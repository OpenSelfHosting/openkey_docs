---
title: "Alternativa ao LastPass: como migrar e o que olhar"
description: Saindo do LastPass — o que exportar, como importar em outro gerenciador e os quatro requisitos para verificar antes de escolher um substituto.
date: 2026-09-19
cover: /blog/covers/lastpass-alternative.png
---

# Alternativa ao LastPass: como migrar e o que olhar

LastPass é o nome de gerenciador de senhas mais conhecido na maior parte do mundo, e é justamente isso que faz de "lastpass alternative" uma das comparações mais buscadas da categoria. As pessoas chegam aqui por três motivos diferentes, e precisam de três coisas diferentes:

1. **Confiança** — você quer uma resposta diferente para "quem pode ler minhas senhas".
2. **Custo ou limites** — o nível grátis ou o plano de família não encaixa mais.
3. **Recursos** — você quer passkeys, auto-hospedagem ou segredos de desenvolvedor.

Este artigo cobre o que de fato muda durante uma migração, o que verificar antes de se comprometer e como fazer a troca sem uma janela em que você não consegue entrar em nada.

## O que torna esta migração diferente

LastPass está no noticiário há muito tempo, e as consequências práticas para uma migração são práticas em vez de dramáticas:

- **A exportação é um CSV.** Plaintext, sem criptografia, com todas as senhas à vista. Qualquer pessoa que consiga esse arquivo tem o seu cofre.
- **Pode existir uma exportação protegida por senha.** Se o seu plano oferecer uma, ela é bem mais segura do que o CSV padrão. Use-a.
- **O suporte a anexos é limitado na exportação.** Arquivos anexados a entradas em geral não vêm em um CSV.
- **O cofre é grande para quem usa há muito tempo.** Uma conta com dez anos pode ter centenas de entradas em muitas pastas. Reserve uma tarde.

A coisa mais importante sobre esta migração é que ela é uma **exportação de sentido único seguida de uma importação única**. Faça com cuidado, verifique e só então apague a conta antiga.

## Os quatro requisitos para um substituto

### 1. Precisa ser zero-knowledge, comprovadamente

Verifique quem guarda a chave de descriptografia. Se um agente de suporte consegue redefinir sua senha mestra ou desbloquear seu cofre, você está confiando a infraestrutura deles ao seu plaintext, digam o que o marketing disser. Um bom substituto diz, antes de você criar um cofre, que uma senha mestra esquecida não pode ser recuperada por ninguém — nem por eles.

### 2. Precisa importar o seu CSV do LastPass

Confirme que o importador suporta especificamente CSV do LastPass e que a estrutura de pastas mapeia para coleções. Teste primeiro com uma exportação parcial, se a ferramenta permitir.

### 3. Precisa não cobrar pela sua saída

Esta é a assimetria para ficar de olho: **importar de graça, exportar pago**. Gerenciadores que deixam você entrar mas cobram para sair transformaram discretamente seus dados em um motivo para ficar. Verifique o nível de exportação antes de migrar, não depois.

### 4. Precisa fazer Autofill corretamente nos seus dispositivos

Você vai notar o Autofill mais do que qualquer outra coisa na primeira semana. Teste nos seus três sites mais usados antes de apagar a conta antiga.

## Migrando, passo a passo

### 1. Exporte do LastPass

1. Faça login, abra **Configurações → Exportação avançada** e escolha **LastPass CSV** (ou uma exportação protegida por senha, se o seu plano tiver uma).
2. Salve em um local que você controle, não em uma pasta de nuvem compartilhada.
3. Não envie por email e não deixe em Downloads.

### 2. Importe no novo gerenciador

No OpenKey: **Configurações → Dados → Importar e exportar → Importar → LastPass CSV**, escolha o arquivo e confirme. Tudo acontece localmente — sem ida e volta ao servidor, e seu plaintext nunca toca um servidor de sync.

Espere um mapeamento de pastas para coleções e, para um cofre muito antigo, algumas entradas chegando sem pasta. Revise depois em vez de assumir.

### 3. Ligue o Autofill *antes* de começar a trocar senhas

Esta ordem importa. Com o Autofill funcionando, todo login que você fizer daqui em diante é capturado automaticamente, então o cofre se reclassifica sozinho enquanto você trabalha.

- [Autofill de senhas](/pt/blog/autofill-passwords) — o guia de configuração
- [Autofill não funcionando](/pt/blog/autofill-not-working) — quando ele não obedece

### 4. Conserte primeiro as contas de maior valor

Não tente rotacionar 400 senhas. Rotacione primeiro email, banco e nuvem, gerando cada uma conforme avança:

```bash
openkey gen -l 24
```

Adicione 2FA ao mesmo tempo ([guia](/pt/blog/two-factor-authentication)) e adicione uma passkey onde o site oferecer uma ([o que são passkeys?](/pt/blog/what-are-passkeys)).

### 5. Verifique e então destrua a exportação

- Confira de perto alguns logins importantes, incluindo entradas TOTP, se você as usava.
- Confirme o Autofill no seu navegador principal e no celular.
- Confirme que você consegue entrar em um segundo dispositivo.
- **Apague o CSV com segurança.** Faça isso direito; um arquivo apagado em um SSD pode ser recuperável. Sobrescrever o arquivo e esvaziar a lixeira é o mínimo razoável.
- Rotacione qualquer coisa que morou muito tempo naquele arquivo em plaintext.

### 6. Guarde um backup antes de cancelar

Faça primeiro um backup local criptografado — um `.okbak` no OpenKey, ou o equivalente do seu gerenciador. Então apague a conta antiga. O cancelamento deve ser o último passo, não o segundo.

## Para onde as pessoas costumam trocar

| Se você quer… | Olhe para |
|-------------|---------|
| Sem servidor, sem fornecedor, só um arquivo local | Um gerenciador baseado em arquivo, como o KeePass — ótimo, mas os backups são seus |
| Seu próprio servidor de sync, código aberto | Um gerenciador auto-hospedável — o [OpenKey](/pt/blog/self-hosted-password-manager) é um |
| Polimento de fornecedor com um nível grátis de verdade | Qualquer um dos gerenciadores principais, julgado pelos [critérios aqui](/pt/blog/best-password-managers) |
| Nenhuma migração — só adicionar um segundo gerenciador | Rode os dois por um mês; mantenha a conta antiga somente leitura até ter confiança |

Rodar dois gerenciadores em paralelo é a opção de menor risco e não custa nada. Desative o Autofill no antigo, deixe-o instalado e apague a conta só depois de uma semana de logins sem atrito.

## O que os dados de busca dizem

O Google Trends (global, últimos 12 meses) mostra que as alternativas ao LastPass formam um cluster real e crescente, e que as alternativas ao 1Password atraem mais interesse de busca do que as do LastPass. Comparando as consultas de alternativa entre si:

| Consulta | Interesse relativo no cluster |
|-------|-------------------------------|
| 1password alternative | 100 |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

"1password alternative" com cerca de quatro vezes o interesse de "lastpass alternative" merece uma pausa: sugere que a maior onda de migração da categoria *não* é a partir do LastPass, mas impulsionada pelo preço do 1Password e pela estrutura do plano de família. Buscas por "1password pricing" estão entre as consultas relacionadas ao Bitwarden que mais sobem, com cerca de 200% na comparação ano a ano.

O termo principal continua sendo esmagadoramente ancorado em marca. Entre os refinamentos de "password manager", Bitwarden e 1Password atraem mais busca de marca do que LastPass, enquanto LastPass aparece muito mais nas consultas *definicionais* e de recuperação — mais visivelmente "lastpass forgot master password", que é a consulta relacionada mais forte sob "forgot master password".

Essa divisão é a leitura útil: LastPass é buscado quando algo deu errado, e 1Password é buscado quando algo ficou caro. Problemas diferentes, soluções diferentes — e um deles nem sequer é um problema de segurança.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de um minuto

Exporte do LastPass (protegido por senha, se estiver disponível), importe o CSV em um substituto cuja exportação seja gratuita e cujo cofre seja zero-knowledge, ligue o Autofill antes de mudar qualquer coisa, rotacione primeiro email e banco, apague a exportação e só então a conta antiga. Guarde um backup criptografado antes de cancelar.

## Próximos passos

- [Alternativa ao 1Password](/pt/blog/1password-alternative) — o mesmo processo, motivos diferentes
- [Importar do Chrome](/pt/blog/import-passwords-from-chrome) — se você também está consolidando exportações do navegador
- [Melhores gerenciadores de senhas](/pt/blog/best-password-managers) — a folha de pontuação
- [Importar e exportar](/pt/guide/import-export) — formatos suportados, grátis vs Pro
