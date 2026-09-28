---
title: "Gerador de senhas fortes: pare de inventar senhas"
description: Por que senhas inventadas à mão são fracas, como gerar senhas que realmente resistem a ataques de quebra e como verificar e corrigir as fracas que você já tem.
date: 2026-09-18
cover: /blog/covers/strong-password-generator.png
---

# Gerador de senhas fortes: pare de inventar senhas

A invenção de senhas por pessoas é um problema resolvido com uma resposta ruim. Quase todo mundo usa a mesma construção — uma palavra, uma letra maiúscula, o ano, `!` — e essa construção é exatamente o que as ferramentas de quebra assumem. Um gerador tira a adivinhação e a pessoa humana do loop por completo.

Este é o guia para gerar senhas que se sustentam, como verificar as que você já tem e como consertar as piores sem gastar uma tarde inteira.

## Por que `P@ssw0rd1!` falha

Atacantes não adivinham senhas uma de cada vez. Eles rodam pré-computação em larga escala contra populações inteiras, usando padrões observados em violações reais:

- palavras de dicionário, em vários idiomas, além de nomes e marcas
- percursos de teclado (`qwerty`, `1qaz2wsx`) e suas rotações
- datas: anos, meses, estações
- substituições em leetspeak: `a→@`, `i→1`, `o→0`, `e→3`
- dígitos acrescentados ao final e um único símbolo no fim

A senha que você inventou cai na interseção de várias dessas listas. Hardware moderno tenta bilhões de candidatos por segundo contra hashes rápidos, então um padrão "complexo" que parece inguessável para uma pessoa costuma ser quebrado em horas ou menos.

## O que torna uma senha forte

**Comprimento vence complexidade.** Cada caractere extra multiplica o espaço de busca. Quatro palavras sem relação entre si — `harbour-lantern-margarine-tricycle` — é mais longo e mais fácil de lembrar do que `X7$kq2!`, e muito mais difícil de quebrar. Prefira uma frase de senha para a sua senha mestra e strings aleatórias em todo o resto.

**Aleatoriedade vence vocabulário.** Um gerador que sorteia de um conjunto completo de caracteres produz uma string sem padrão para explorar. Um gerador que sorteia de uma lista de palavras produz uma frase de senha, o que é bom *se* as palavras não tiverem relação entre si e houver o suficiente delas.

**Unicidade vence força.** Uma senha de 12 caracteres usada em um site tudo bem. A mesma senha de 12 caracteres em 40 sites está a uma violação de distância de 40 violações. Este é o ponto para o qual um gerenciador de senhas existe.

## Como usar um gerador

Qualquer um destes produz uma saída genuinamente aleatória offline, sem nenhuma rede envolvida:

```bash
openkey gen -l 24                       # 24 characters
openkey gen -l 32 -a -c                 # avoid confusing characters, copy to clipboard
openkey gen -l 20 --no-symbols          # for sites that reject symbols
openkey --json gen -l 24                # machine-readable output
```

No app, abra **Configurações → Gerador de senhas** para definir seu comprimento padrão e classes de caracteres, ou use o gerador a partir de um formulário de entrada. Geradores online valem a pena evitar para senhas que você pretende guardar: você está pedindo um segredo ao servidor de um desconhecido e não consegue verificar o que ele fez com ele.

### Escolhendo um comprimento

| Contexto | Comprimento |
|----------|-------------|
| Sua senha mestra | 4–6 palavras sem relação, ou 20+ caracteres |
| Email, banco, conta na nuvem | 20+ caracteres aleatórios |
| Conta comum de site | 16+ caracteres aleatórios |
| Qualquer coisa com política de expiração de senha | 12–14 basta se for única |

## Verificação de força

Quem busca pergunta o tempo todo sobre "password strength checker" e "password strength tester", e a distinção útil é entre verificar um *candidato* e auditar *o que você já tem*.

**Para um candidato:** primeiro o comprimento, depois verifique se não está em uma lista de violações e não deriva do seu nome, do nome do site ou do ano atual. Não há necessidade de enviar para lugar nenhum — uma estimativa de comprimento e uma checagem de padrão são operações locais.

**Para o seu cofre:** o que você quer é um relatório de *reutilização*, não uma nota de força. Três perguntas importam:

1. **Eu uso a mesma senha em mais de um site?** Este é o achado que realmente muda o seu risco.
2. **Esta senha está em um corpus de violações conhecido?** Uma senha violada não vale nada em nenhum comprimento, porque a string exata já está nas listas dos quebradores.
3. **Esta senha está sem mudança há anos em uma conta que guarda algo valioso?**

Repare que o OpenKey deliberadamente **não** liga para o have-i-been-pwned nem executa uma tela de saúde de senhas, e isso é um padrão razoável: uma tela de saúde ou envia dados para fora ou exige um corpus local de violações. Faça a auditoria à mão — comece por email, banco e nuvem e vá expandindo.

## Corrigindo senhas fracas e reutilizadas

Você não precisa mudar tudo de uma vez. Priorize:

1. **Email** — redefine todas as outras contas.
2. **Banco e nuvem** — o armazenamento em nuvem pode conter o resto.
3. **Sua conta social principal** — os fluxos de redefinição de senha costumam levar ao email.
4. **Sua senha mestra**, se for curta ou reutilizada em algum lugar.
5. **Todo o resto**, opportunisticamente, da próxima vez que cada site pedir.

Um fluxo de trabalho prático:

1. Ative o Autofill primeiro, para que os novos logins sejam salvos automaticamente.
2. Gere uma nova senha aleatória para cada conta prioritária **enquanto estiver com login feito**.
3. Cole pelo gerador em vez de digitar.
4. Ligue o 2FA no mesmo instante — você já está nas configurações de segurança ([guia de 2FA](/pt/blog/two-factor-authentication)).
5. Adicione uma passkey onde houver uma disponível ([o que são passkeys?](/pt/blog/what-are-passkeys)).
6. Apague o arquivo antigo de exportação em plaintext quando sua migração terminar ([importar do Chrome](/pt/blog/import-passwords-from-chrome)).

## Regras de bolso

- Nunca reutilize. Imponga isso com um gerador, não com disciplina.
- Comprimento é a segurança mais barata disponível para você.
- Não rotacione uma senha forte e única só porque passou um ano. Rotação sem motivo é agitação.
- Não acrescente `1` ou `!` a uma senha antiga quando for obrigado a mudá-la — essa é uma extensão previsível de uma string conhecida, e é assim que um conjunto de senhas "diferentes" vira um conjunto só.
- Não mantenha uma planilha de senhas geradas. Guarde-as no cofre e mantenha um backup criptografado offline.

## O que os dados de busca dizem

A geração de senhas é um grande cluster autônomo, não apenas um subtópico de gerenciadores de senhas. No nível do termo principal, "password generator" atrai cerca de **36%** do interesse de "password manager".

Refinamentos que as pessoas acrescentam a "strong password generator" (Google Trends, global, últimos 12 meses):

| Consulta relacionada | Interesse relativo |
|---------------------|--------------------|
| google strong password generator | 100 |
| random strong password generator | 100 |
| random password generator | 99 |
| strong passwords | 58 |
| strong password generator online | 57 |
| generate strong password | 49 |
| password manager | 26 |
| apple strong password generator | 17 |

As duas primeiras são os geradores embutidos em contas do **Google** e da **Apple** — as pessoas estão procurando o gerador que a plataforma delas já traz, não um site de terceiros. "strong password generator online" com 57 é o grupo de que se deve ter cuidado: um gerador online é um terceiro lidando com um segredo que você pretende guardar.

Um cluster separado mostra a intenção de auditoria com clareza. Consultas relacionadas sob "password strength": *password strength checker* (100), *strength check* (51), *strength tester* (41), *strength tool* (28), *strength generator* (27). As formulações "checker" e "tester" são, esmagadoramente, sobre validar uma senha que você já tem, e é por isso que auditar à mão supera uma tela de saúde dentro do app para qualquer pessoa que não queira enviar dados para fora.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de um minuto

Comprimento vence complexidade, aleatoriedade vence vocabulário e unicidade vence os dois. Gere com uma ferramenta local em vez de um site, mire em 16+ caracteres aleatórios para contas comuns e em uma frase de senha de várias palavras para a sua senha mestra, e gaste seu esforço limitado nas contas que podem redefinir as outras.

## Próximos passos

- [O que é um gerenciador de senhas?](/pt/blog/what-is-a-password-manager) — onde as senhas geradas ficam
- [Autofill de senhas](/pt/blog/autofill-passwords) — gere automaticamente no cadastro
- [Autenticação de dois fatores](/pt/blog/two-factor-authentication) — a segunda camada
- [Guia da CLI](/pt/guide/cli#geracao-de-senhas-gen) — flags de geração e classes de caracteres
