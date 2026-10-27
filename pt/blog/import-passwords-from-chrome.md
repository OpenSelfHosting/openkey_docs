---
title: Importar senhas do Chrome
description: Como exportar senhas do Chrome, do Edge e do Google Password Manager, importá-las em outro gerenciador de senhas e depois apagar a exportação com segurança.
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Importar senhas do Chrome

A exportação é a parte fácil. A parte perigosa são os dez minutos seguintes, quando um CSV em plaintext com todas as senhas que você tem está sentado na sua pasta Downloads.

Este é o processo completo: exportar do Chrome, do Edge ou do Google Password Manager; importar no seu novo cofre; verificar; e então destruir o arquivo. Reserve quinze minutos na primeira vez.

## Primeiro, entenda o que você está prestes a criar

Uma exportação de senhas do Chrome é um **CSV em plaintext**. Qualquer pessoa que abrir tem as suas senhas — sem senha mestra, sem criptografia, sem segundo fator. Trate como uma lista impressa das chaves da sua casa.

Três regras para todo o procedimento:

1. **Nunca envie por email, por mensagem ou para um site conversor.** Enviar uma exportação de senhas para uma ferramenta de terceiros do tipo "converta meu CSV" entrega o seu cofre inteiro.
2. **Faça a importação no dispositivo onde o arquivo já está.** Mover o arquivo multiplica a sua exposição.
3. **Apague a exportação no instante em que a importação for verificada** — direito, não só esvaziando a lixeira.

## Exportando do Chrome

O gerenciador embutido do Chrome e o Google Password Manager (a versão sincronizada pela conta) são o mesmo caminho de exportação, e ambos estão cobertos.

1. Abra `chrome://password-manager/settings`.
2. Role até **Export passwords**, ou vá direto para `chrome://password-manager/export`.
3. O Chrome pede que você se reautentique — digite a senha da sua conta do Google ou as credenciais do dispositivo.
4. Salve o arquivo e **tire-o de Downloads** para um local criptografado antes de fazer qualquer outra coisa.

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### O que está no arquivo

| Coluna | Conteúdo |
|--------|----------|
| `name` | O nome do site como o Chrome salvou |
| `url` | A URL completa, incluindo o subdomínio |
| `username` | Seu nome de usuário ou email |
| `password` | A senha, em plaintext |
| `note` | Qualquer nota que você tenha adicionado |

Não existe estrutura de pastas — o Chrome não tem pastas. Tudo chega chapado, e é por isso que a etapa de coleções depois importa.

## Exportando do Edge

O Microsoft Edge usa o mesmo armazenamento de senhas do Chromium:

1. Abra `edge://wallet/passwords`.
2. **More settings → Export passwords**, ou vá para `edge://wallet/exportpasswords`.
3. Reautentique, salve e mova o arquivo para algum lugar criptografado.

## Exportando direto do Google Password Manager

Se você usa o gerenciador sincronizado pela conta entre dispositivos, pode exportar de qualquer navegador logado em `passwords.google.com` → **Export passwords**. Ele produz o mesmo CSV, e as mesmas regras valem.

## Importando para o OpenKey

1. Instale e desbloqueie o OpenKey.
2. **Configurações → Dados → Importar e exportar → Importar**.
3. Escolha **Chrome CSV**.
4. Selecione o arquivo e confirme.

A importação é inteiramente local. Não há ida e volta ao servidor, e seu plaintext não vai para um servidor de sync — o que importa se você usa um servidor auto-hospedado, porque o CSV nunca se transforma em algo que o servidor poderia ser solicitado a produzir.

Outros formatos suportados, se você estiver consolidando várias fontes de uma vez: **Bitwarden JSON**, **LastPass CSV**, **1Password CSV**, **KeePass `.kdbx`** (senha do banco e arquivo de chave opcional) e o próprio JSON do OpenKey. As pastas viram coleções onde há mapeamento.

## Reorganizando: monte coleções por nível de confiança

A importação chega chapada, e cofres chapados acabam com senhas reutilizadas porque você não consegue ver o risco. Trinta minutos de arrumação se pagam:

| Coleção | O que entra | Regra |
|-----------|-----------------|------|
| Identidade | Email, raiz da nuvem, governo | Senhas mais fortes, passkeys, um backup de chave de hardware |
| Finanças | Banco, cartões de pagamento, impostos | 2FA em tudo; passkeys onde houver |
| Trabalho | Contas do empregador | Nunca reutilizar; checklist de offboarding |
| Compras e redes sociais | Tudo descartável | Senhas longas e geradas, sem esforço gasto |
| Dispositivos | Roteador, NAS, câmeras, casa inteligente | Geradas; guardadas também offline |

Depois defina uma regra para si mesmo: **nada novo entra em Compras ou Redes Sociais com senha reutilizada.** Com o Autofill ligado, isso acontece de qualquer forma automaticamente.

## Ligue o Autofill imediatamente

Esta é a etapa que torna a migração autossuficiente. Uma vez que o Autofill funciona, todo login a partir de agora é salvo para você, então o cofre melhora sozinho enquanto você passa pelas contas importantes.

- [Autofill de senhas](/pt/blog/autofill-passwords) — o guia de configuração
- [Autofill não funcionando](/pt/blog/autofill-not-working) — quando as sugestões estão faltando

Depois **desative o Autofill do próprio Chrome** para que os dois não competam:

1. `chrome://settings/addresses`.
2. Desligue **Offer to save passwords** e **Automatically sign in with saved passwords**.
3. Defina o gerenciador de senhas como o que você quer usar.

## Conserte as contas de maior valor

Não tente rotacionar 400 senhas. Desça uma lista:

1. **Email** — ele redefine tudo o mais.
2. **Banco e armazenamento em nuvem** — a nuvem pode guardar o resto.
3. **Sua conta social principal**.
4. Todo o resto, conforme cada site pedir em seguida.

Gere cada senha localmente conforme avança:

```bash
openkey gen -l 24 -c
```

Adicione 2FA enquanto já estiver nas configurações de segurança ([guia](/pt/blog/two-factor-authentication)) e adicione uma passkey onde o site oferecer uma ([o que são passkeys?](/pt/blog/what-are-passkeys)).

## Verifique antes de apagar qualquer coisa

Não pule isso. Confira:

- [ ] Uma dúzia de logins importantes abrem corretamente do novo cofre.
- [ ] Entradas TOTP, se você as tinha, geram códigos válidos.
- [ ] O Autofill funciona no seu navegador principal **e** no seu celular.
- [ ] Você consegue entrar em um **segundo dispositivo** e ver as mesmas entradas.
- [ ] Você fez um **backup local criptografado** (`.okbak` no OpenKey).

Só então siga para a exclusão.

## Apague a exportação, direito

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` é mais confiável quando está disponível, mas nenhuma das abordagens é confiável em SSDs e sistemas de arquivos copy-on-write. A resposta prática é sobrescrever o que você puder e então rotacionar qualquer coisa que ficou em plaintext tempo suficiente para preocupar.

Uma senha em um CSV em plaintext por uma semana não é uma crise; a mesma senha ainda naquele arquivo um ano depois é.

Depois apague a cópia armazenada pelo navegador: `chrome://password-manager/settings` → **Delete passwords from Chrome**.

## O que os dados de busca dizem

Migração é uma intenção grande e específica — quem busca sabe o que quer *fazer*, não o que comprar. O Google Trends (global, últimos 12 meses) compara estes termos de migração entre si:

| Consulta | Interesse relativo no cluster |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

As duas primeiras são toda a história, e a proporção entre elas é o achado útil: **as pessoas buscam a exportação mais do que o dobro da importação.** Isso está do avesso em termos de segurança, porque a exportação cria o artefato exposto e a importação é a parte que conserta o problema. Conteúdo que começa pelo caminho de exportação deve passar imediatamente para a importação e depois para a etapa de exclusão.

A cauda longa também é fina e majoritariamente está em formulação nativa do inglês, o que sugere um público pequeno e bem definido que já conhece o vocabulário — o tipo de leitor que se beneficia mais de um passo a passo preciso do que de uma comparação.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de um minuto

Exporte de `chrome://password-manager/settings`, tire o CSV em plaintext de Downloads imediatamente, importe-o localmente no seu novo cofre, monte coleções por nível de confiança, ligue o Autofill e desative o do Chrome, rotacione email e banco, verifique em um segundo dispositivo e então sobrescreva e apague o CSV e remova a cópia armazenada pelo Chrome.

## Próximos passos

- [Autofill de senhas](/pt/blog/autofill-passwords) — faça isso antes de rotacionar qualquer coisa
- [Google Password Manager](/pt/blog/google-password-manager) — o mesmo passo a passo, enquadrado pelo ecossistema do Google
- [Gerador de senhas fortes](/pt/blog/strong-password-generator) — para que rotacionar
- [Importar e exportar](/pt/guide/import-export) — todos os formatos suportados, grátis vs Pro
