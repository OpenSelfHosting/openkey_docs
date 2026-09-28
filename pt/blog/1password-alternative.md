---
title: "Alternativa ao 1Password: trocando sem perder o cofre"
description: Por que as pessoas saem do 1Password — custo, planos de família e auto-hospedagem — mais uma migração passo a passo para um gerenciador de senhas que você controla.
date: 2026-09-20
cover: /blog/covers/1password-alternative.png
---

# Alternativa ao 1Password: trocando sem perder o cofre

O 1Password é um excelente produto, e uma das razões pelas quais ele é excelente é não ter um nível grátis. Essa única decisão de design é o motivo mais comum para as pessoas buscarem "1password alternative" — a consulta de alternativa mais buscada de toda a categoria, com cerca de quatro vezes o interesse de "lastpass alternative".

Este artigo é para as pessoas cujo motivo é um de três: **custo**, **atrito no compartilhamento em família** ou **querer o seu sync no seu próprio hardware**. Não é uma acusação; o 1Password é uma escolha legítima, e o enquadramento honesto é "se esse não é o seu problema, fique".

## Os três motivos reais para trocar

### Custo

A assinatura é o preço de entrada e não existe uma opção grátis permanente. O preço é localizado por loja e região, então o enquadramento honesto é estrutural: você está comparando uma assinatura com um nível grátis em outro lugar ou com uma compra única mais o seu próprio servidor.

As consultas refletem isso. "1password pricing" está entre os refinamentos que mais sobem relacionados ao Bitwarden, com alta de cerca de **200%** na comparação ano a ano, e os termos relacionados a preço dominam a lista de crescimento sob várias marcas principais.

### Família e equipe

Planos de família são uma fonte comum de atrito — gestão de assentos, upgrades de plano quando um filho precisa de uma conta separada e compartilhamento entre casas com dispositivos diferentes. Se a sua casa mistura iOS/Android/Windows, ou se você quer compartilhar com alguém que não está em um plano de família, esse é um motivo legítimo para mudar.

### Auto-hospedagem

O 1Password descontinuou cofres locais autônomos há algum tempo, então o sync passa pelo fornecedor. Se o requisito é que os dados criptografados fiquem em uma infraestrutura que você controla, isso é um requisito rígido em vez de uma preferência — e aponta para um gerenciador auto-hospedável.

## Antes de migrar: o custo é mesmo o problema?

Vale verificar com honestidade, porque a migração é uma tarde de trabalho que você vai fazer mais de uma vez se não tiver cuidado:

- **Você realmente precisa mudar?** Uma assinatura de um ano costuma sair mais barato do que o custo da migração. Se a dor é uma única cobrança anual, a resposta pode ser ficar.
- **É o plano ou o número de assentos?** Um plano pessoal e um plano de família são produtos diferentes; mudar porque o plano de família é constrangedor é uma decisão diferente de mudar porque você não quer assinatura.
- **Você precisa de auto-hospedagem por um motivo real?** Se ninguém na sua casa sabe rodar um servidor, auto-hospedagem é um Passatempo que você vai abandonar. O sync Nearby na LAN cobre a maior parte do benefício sem nenhuma manutenção.

Se a resposta for sim, mude — e o resto deste artigo é o como.

## Migrando passo a passo

### 1. Exporte do 1Password

1. Faça login no app web ou no desktop.
2. Abra **Configurações → Exportar** e escolha **1Password CSV**.
3. Prefira a exportação criptografada **1PUX**, se ela estiver disponível para você — ela mantém os itens trancados com uma senha em vez de escrever plaintext.
4. Salve em algum lugar que você controle e depois leve para offline.

Tipos de item complexos — notas seguras com anexos, identidades, documentos, credenciais de Wi-Fi — são achatados em linhas parecidas com login na exportação. Espere recriar à mão os importantes.

### 2. Importe no novo gerenciador

No OpenKey: **Configurações → Dados → Importar e exportar → Importar → 1Password CSV**. A importação é local; nada é enviado. As pastas viram coleções onde o mapeamento é limpo.

### 3. Ligue o Autofill imediatamente

Com o Autofill funcionando, tudo em que você entrar a partir de agora é salvo para você, então o cofre se conserta sozinho enquanto você rotaciona senhas.

- [Autofill de senhas](/pt/blog/autofill-passwords)
- [Autofill não funcionando](/pt/blog/autofill-not-working) — se as sugestões estiverem faltando

### 4. Rotacione as contas que importam

Email primeiro, depois banco e nuvem, depois o resto conforme cada site pedir. Gere cada senha localmente:

```bash
openkey gen -l 24 -c
```

Adicione 2FA enquanto estiver nas configurações de segurança ([guia](/pt/blog/two-factor-authentication)) e adicione uma passkey onde houver uma ([o que são passkeys?](/pt/blog/what-are-passkeys)).

### 5. Reconstrua à mão os itens compartilhados

Esta é a parte que as pessoas subestimam. Recrie:

- **Cartões de pagamento**, agrupados por emissor
- **Identidades** usadas em formulários
- **Credenciais de Wi-Fi e de dispositivos** que você tinha guardado
- **Notas seguras** com anexos — essas não vieram

O OpenKey mantém cartões, carteiras cripto e segredos de desenvolvedor como áreas de primeira classe do cofre, em vez de notas de texto livre, o que torna essa reconstrução menos dolorida do que em um gerenciador só de notas. Veja [Usar o app](/pt/guide/app).

### 6. Faça um backup e então cancele

Exporte um backup local criptografado (`.okbak` no OpenKey) **antes** de cancelar e depois verifique um novo login em um segundo dispositivo. Só então feche a conta antiga.

### 7. Destrua os arquivos de exportação

Exportações criptografadas: apague. CSVs em plaintext: sobrescreva e shred. Qualquer coisa que ficou uma semana em um arquivo em plaintext deve ser rotacionada de qualquer forma.

## O que olhar no substituto

| Requisito | O que verificar |
|-------------|----------------|
| Não ser caro | Um nível grátis que cubra cofre, Autofill e sync — com os limites de *itens* declarados |
| Compartilhamento em família | Coleções compartilhadas com revogação, e se filhos precisam de planos separados |
| Importação de CSV do 1Password | Suportada explicitamente, com mapeamento de pastas |
| Exportação gratuita | Confirme o nível; uma exportação paga faz dos dados um refém |
| Auto-hospedagem | Opcional, mas muda completamente o modelo de confiança |
| Passkeys e TOTP | Os dois, funcionando, não "em breve" |
| CLI ou API | Valioso se você automatiza alguma coisa |

Critérios completos e uma folha de pontuação: [Melhores gerenciadores de senhas](/pt/blog/best-password-managers).

## O ângulo família e equipe

Se o que motivou foi o compartilhamento em vez do custo, veja isto antes de escolher um plano de consumo:

- [Gerenciador de senhas para família](/pt/blog/password-manager-for-family) — configurações de casa, filhos, contas compartilhadas
- [Gerenciador de senhas para equipes](/pt/blog/password-manager-for-teams) — orgs, papéis, revogação, offboarding

No OpenKey, organizações e coleções compartilhadas exigem Pro e um servidor auto-hospedado, e tudo que elas armazenam — nomes de org, payloads de entradas, anexos — permanece ciphertext. Os clientes encapsulam chaves para os destinatários; o servidor nunca as abre. Um detalhe que vale conhecer antes de desenhar um processo em cima disso: **compartilhamentos de entrada são snapshots**, não documentos ao vivo. Revogar um compartilhamento impede um aceite pendente, mas não apaga uma cópia que o destinatário já aceitou. Para acesso compartilhado contínuo, use uma coleção compartilhada de org.

## O que os dados de busca dizem

O Google Trends (global, últimos 12 meses) torna explícita a forma dessa migração. Comparando as consultas de alternativa entre si:

| Consulta | Interesse relativo no cluster |
|-------|-------------------------------|
| **1password alternative** | **100** |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

E as consultas em crescimento presas às marcas principais são dominadas por questões comerciais em vez de questões de segurança: para o Bitwarden, "bitwarden price increase" lidera com cerca de **+450%** na comparação ano a ano, com "bitwarden review" e "bitwarden lite" em torno de +350%, e "bitwarden pricing" em torno de +190%. O interesse por open source, auto-hospedagem e equipes pequenas também está subindo — "bitwarden open source", "bitwarden enterprise" e "bitwarden cli" aparecem todas na lista de crescimento.

Duas conclusões. Primeira, o principal motivador para trocar nesta categoria é **preço**, não ansiedade de violação. Segunda, os interesses adjacentes que mais sobem são open source, enterprise e CLI — o que sugere que as pessoas que deixam planos pagos procuram algo que elas mesmas possam rodar e inspecionar.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de um minuto

Se a dor é custo, uma exportação CSV do 1Password e um gerenciador com nível grátis e exportação gratuita tiram você dali de graça. Se a dor é compartilhamento em família ou auto-hospedagem, escolha primeiro por esses dois requisitos e pelo preço depois. Exporte, importe localmente, ligue o Autofill, rotacione email e banco, reconstrua cartões e notas à mão, faça um backup criptografado e então cancele.

## Próximos passos

- [Alternativa ao LastPass](/pt/blog/lastpass-alternative) — o mesmo processo, outros gatilhos
- [Gerenciador de senhas auto-hospedado](/pt/blog/self-hosted-password-manager) — a rota da auto-hospedagem
- [Gerenciador de senhas para família](/pt/blog/password-manager-for-family) — compartilhamento em casa
- [Preços](/pt/pricing) — o que o OpenKey Free e o Pro incluem
