---
title: Melhores gerenciadores de senhas
description: Como comparar gerenciadores de senhas em 2026 — níveis grátis, criptografia zero-knowledge, auto-hospedagem, Autofill, passkeys e as perguntas a fazer antes de escolher um.
date: 2026-09-13
cover: /blog/covers/best-password-managers.png
---

# Melhores gerenciadores de senhas

Não existe um único melhor gerenciador de senhas. Existe o melhor *para o seu modelo de ameaça, suas plataformas e quanto de configuração você tolera* — e a maneira de encontrá-lo é pontuar alguns candidatos nas mesmas sete perguntas em vez de ler mais uma listagem que silenciosamente promove alguém.

Este artigo te dá as sete perguntas, uma folha de pontuação e notas honestas sobre as quatro categorias entre as quais a maioria das pessoas acaba escolhendo.

## As sete perguntas

### 1. O provedor consegue ler meu cofre?

Esta é a única pergunta que é genuinamente binária. Procure **zero-knowledge** explícito ou criptografia ponta a ponta, e verifique *quem guarda as chaves*. Se o provedor consegue redefinir sua senha mestra, emitir uma chave de descriptografia substituta ou desbloquear seu cofre "para suporte", não é zero-knowledge, não importa o ícone de cadeado no site.

### 2. Onde estão os dados criptografados, e quem pode apagá-los?

| Modelo | Você está confiando a eles | Melhor para |
|--------|---------------------------|-------------|
| Somente nuvem do fornecedor | Disponibilidade, durabilidade, histórico de violações deles | Quem quer zero configuração |
| Nuvem do fornecedor, auto-hospedável | O mesmo, mas com uma saída | Usuarios atentos à privacidade que querem uma opção |
| Seu próprio servidor | Sua própria disponibilidade e seus backups | Qualquer pessoa que consiga rodar Docker ou um VPS pequeno |

Auto-hospedar não é uma melhoria mágica — é uma troca. Você ganha controle do plano de armazenamento e tira um terceiro da cadeia de confiança; em troca assume TLS, backups e upgrades. O [servidor do OpenKey](/pt/guide/server) é a implementação de referência se você quiser ver como isso fica na prática.

### 3. O que o nível grátis realmente permite?

Os níveis grátis são onde os gerenciadores de senhas escondem o imposto de migração. Verifique os limites *específicos*, porque eles variam muito: alguns limitam itens, outros limitam dispositivos, outros limitam o sync, outros desabilitam a exportação por completo — o que significa que você entra, mas não sai.

Um nível grátis que cobre cofre + Autofill + passkeys + sync, com limites de itens, é realmente usável. O [OpenKey Free](/pt/pricing#free-vs-openkey-pro) é um deles: 50 logins, 3 coleções, 3 cartões, 3 carteiras, 3 segredos, com sync de servidor e Autofill incluídos.

### 4. O Autofill funciona em todos os lugares onde eu uso?

Não "se existe" — se funciona de forma *confiável* no seu navegador, no provedor de sistema do celular, nos seus apps de desktop. Autofill é o recurso que você mais toca, então merece um teste de verdade antes de você migrar 400 logins para ele. Veja [Autofill de senhas](/pt/blog/autofill-passwords) para a configuração e [Autofill não funcionando](/pt/blog/autofill-not-working) quando não funciona.

### 5. Passkeys, TOTP e cartões

As três capacidades que separam um gerenciador de senhas de uma caixa de armazenamento de senhas:

- **Passkeys** — uma implementação real de WebAuthn, não "em breve". [O que são passkeys?](/pt/blog/what-are-passkeys)
- **TOTP** — guarde a seed ao lado do login que ela protege ([2FA em um cofre](/pt/blog/two-factor-authentication))
- **Cartões, carteiras, identidades** — úteis, e um bom sinal de se o cofre é um gerenciador de senhas de verdade ou uma planilha

### 6. Conseguo tirar meus dados?

Importar é o mínimo obrigatório. **Exportar** é o que faz você ser confiável, porque é a válvula de escape. Verifique quais formatos têm suporte, se a exportação é paga e se a exportação é plaintext. Se você não consegue sair limpo, você está alugando.

### 7. O que acontece se eu esquecer a senha mestra?

Exija uma resposta direta. Em um projeto realmente zero-knowledge a resposta é "nada — os dados são irrecuperáveis", e o trabalho do fornecedor é tornar isso óbvio *antes* de você criar o cofre, não depois. Pergunte que material de recuperação offline você mesmo pode criar ([coberto aqui](/pt/blog/forgot-master-password)).

## As quatro categorias

### Gerenciadores de nuvem convencionais

A opção de menor atrito e o padrão certo para a maioria das pessoas. Você aceita a infraestrutura do fornecedor em troca de um app bem acabado, amplo suporte a plataformas e nenhum servidor para manter. É a melhor opção quando você quer isso resolvido, não operado. Compare-os por limites do nível grátis, suporte a passkey e exportação — não por listas de recursos, que inflam tudo.

### Gerenciadores open-source e auto-hospedáveis

O código é público e, em vários casos, o servidor também é. Você pode auditar a criptografia, rodar sua própria instância ou não rodar servidor nenhum e manter um arquivo local criptografado. É a melhor opção quando a própria cadeia de confiança é o requisito. [Gerenciador de senhas auto-hospedado](/pt/blog/self-hosted-password-manager) cobre o lado operacional.

### Integrados à plataforma

[Google Password Manager](/pt/blog/google-password-manager), iCloud Keychain e Microsoft Edge são excelentes para quem já está comprometido com um ecossistema: configuração quase zero, integração sólida e um nível grátis realmente bom. As compensações são o aprisionamento no ecossistema, compartilhamento entre plataformas mais fraco e nenhuma história de auto-hospedagem.

### Planos de família e equipe

Não é um tipo diferente de produto — é um conjunto diferente de requisitos. Cofres compartilhados, revogação e papéis. [Gerenciador de senhas para família](/pt/blog/password-manager-for-family) e [gerenciador de senhas para equipes](/pt/blog/password-manager-for-teams) cobrem o que verificar e o que evitar.

## Uma folha de pontuação

Dê a cada candidato uma nota de 0–3 por linha e depois some. Doze pontos de diferença são um sinal real; dois pontos é ruído.

| Critério | Peso | Notas |
|-----------|------|-------|
| Zero-knowledge, comprovável | ×3 | Inegociável se você se importa com o provedor lendo você |
| Exportação disponível e gratuita | ×3 | Sua válvula de escape |
| Autofill em todas as minhas plataformas | ×3 | Teste, não presuma |
| Passkeys + TOTP | ×2 | O substituto moderno do campo de senha |
| Nível grátis realmente usável | ×2 | Limites de itens *e* de sync contam |
| Auto-hospedagem disponível | ×1 | Opcional, mas muda o modelo de confiança |
| História de recuperação honesta | ×1 | Inclui backups offline que você controla |
| Compartilhamento e revogação | ×1 | Só se você compartilha |

## O que os dados de busca dizem sobre como as pessoas escolhem

O Google Trends (global, últimos 12 meses) mostra como essa decisão está sendo tomada na prática. Os refinamentos que as pessoas acrescentam a "best password manager":

| Consulta relacionada | Interesse relativo | Nota |
|---------------------|--------------------|------|
| best password manager 2026 | 100 | Buscas com o ano na consulta dominam |
| the best password manager | 90 | |
| best password manager 2025 | 81 | A lista do ano passado ainda aparecendo |
| best password manager app | 34 | Intenção mobile-first |
| what is the best password manager | 31 | Ponto de entrada dos iniciantes |
| reddit best password manager | 17 | A validação da comunidade importa |
| best password manager for business | 14 | Avaliação de equipe |
| best password manager for android | 11 | Específico da plataforma |

Duas conclusões práticas. Primeiro, **"best password manager 2026" foi o refinamento de crescimento mais rápido do termo principal, subindo cerca de 2,800% na comparação ano a ano**, e a lista do ano passado ainda supera a deste ano — o que diz que a maioria de quem busca está lendo o primeiro roundup abrangente que encontra, então listas patrocinadas por fornecedores fazem a maior parte da decisão. Segundo, "reddit" aparece como qualificador explícito, ou seja, as pessoas querem uma recomendação que consigam conferir com desconhecidos.

Sobre interesse de marca, em uma comparação direta entre os principais nomes normalizada contra o termo principal: Bitwarden e 1Password atraem visivelmente mais buscas de marca do que LastPass, e KeePass, NordPass e Dashlane ficam bem abaixo dos três. Especificamente em relação ao Bitwarden, as buscas de preço e de avaliações são as de crescimento mais rápido — interesse em *custo*, não apenas em capacidade.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca. Os valores em alta são crescimento em relação ao período anterior equivalente.

## Uma rotina de avaliação de 20 minutos

1. Escolha três candidatos: o seu atual, um gerenciador de nuvem e uma opção auto-hospedável.
2. Dê a eles a nota na folha acima.
3. Instale os dois melhores. Ainda não migre — apenas desbloqueie, ative o Autofill e use por um dia.
4. Verifique passkeys e TOTP em uma conta descartável.
5. Exporte do que você não vai escolher e olhe o arquivo. Se a exportação for inutilizável, essa é a sua resposta.
6. Migre e então apague a exportação antiga com segurança.

Guias de migração: [do LastPass](/pt/blog/lastpass-alternative) · [do 1Password](/pt/blog/1password-alternative) · [do Chrome](/pt/blog/import-passwords-from-chrome)

## A lista curta honesta

- **Quer que resolva tudo?** Um gerenciador de nuvem convencional com um nível grátis de verdade e exportação gratuita.
- **Quer que seja auditável?** Um cliente open-source com servidor auto-hospedável — o [OpenKey](/pt/blog/what-is-a-password-manager) é uma dessas opções.
- **Quer nenhum fornecedor?** Um cofre local criptografado sem servidor, mais o [sync Nearby na LAN](/pt/blog/nearby-without-a-server) para os seus próprios dispositivos.
- **Quer no seu ecossistema?** Um integrado à plataforma, aceitando o aprisionamento.

## Próximos passos

- [O que é um gerenciador de senhas?](/pt/blog/what-is-a-password-manager) — os fundamentos
- [Autofill de senhas](/pt/blog/autofill-passwords) — o recurso que mais importa
- [Preços e Free vs Pro](/pt/pricing) — o que o OpenKey inclui
- [Modelo de segurança](/pt/guide/security) — o que "zero-knowledge" significa de fato
