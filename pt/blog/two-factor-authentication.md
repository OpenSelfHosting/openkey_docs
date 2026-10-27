---
title: Autenticação de dois fatores em um gerenciador de senhas
description: O que são 2FA e códigos TOTP, como guardar seeds do autenticador ao lado dos logins que eles protegem e como as passkeys mudam o cenário.
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# Autenticação de dois fatores em um gerenciador de senhas

**Autenticação de dois fatores (2FA)** significa provar que você é você com uma segunda peça de evidência, não apenas a sua senha. A forma mais comum é o código rotativo de seis dígitos de um app autenticador — **TOTP** — baseado em uma senha de uso único dependente de tempo, computada a partir de uma seed compartilhada.

A parte inconveniente é que a seed e o código vivem em um *app diferente* do das suas senhas. Este artigo explica a mecânica, por que guardar seeds em um gerenciador de senhas é o arranjo sensato e como as passkeys mudam isso.

## Como funciona o 2FA

1. Quando você ativa o 2FA em um site, ele mostra um **segredo** — normalmente como um código QR contendo uma URI `otpauth://`.
2. Você escaneia ou cola esse segredo em um autenticador.
3. A cada 30 segundos, o autenticador computa um código de seis dígitos a partir do segredo mais o horário atual: `HMAC(secret, floor(time/30))`.
4. O site computa o mesmo valor. Se coincidem, você entrou.

O código não vale nada um minuto depois, e é por isso que funciona. Mas o *segredo* é, na prática, uma senha permanente — qualquer pessoa que o tenha pode gerar códigos válidos para sempre.

## A decisão: app autenticador, SMS ou passkey

| Método | Sofre phishing | Impacto de violação do servidor | Notas |
|--------|----------------|--------------------------------|-------|
| Código SMS | Sim | Não | Vulnerável a SIM swap e reciclagem de números; ainda melhor que nada |
| App / código TOTP | Sim (roubo da seed) | Não | Funciona offline; o segredo precisa ser protegido |
| Chave de hardware (FIDO2) | Não | Não | A mais forte; precisa de um segundo dispositivo ou chave como backup |
| Passkey | Não | Não | Nada para digitar, nada para roubar; veja abaixo |

Chaves de hardware e passkeys são as únicas opções que não sofrem phishing, porque a credencial nunca sai do seu dispositivo e a assinatura é vinculada à origem solicitante.

## Por que as seeds TOTP pertencem ao seu cofre

O conselho usual é "mantenha seu app autenticador separado do gerenciador de senhas", com base na teoria razoável de que um app comprometido não deveria destrancar tudo. Na prática isso cria um problema pior: a senha e seu segundo fator acabam em lugares diferentes, então recuperar a partir de um é impossível sem o outro, e as pessoas acabam refazendo o cadastro do 2FA o tempo todo.

O enquadramento melhor: trate a seed TOTP como **parte da credencial** e proteja-a com os mesmos controles. Se o seu cofre é desbloqueado por uma senha mestra e, idealmente, por uma biometria, então a seed não é mais fraca que a senha que ela protege — e ela está sempre onde você precisa.

A maioria dos gerenciadores suporta isso diretamente: cole o segredo, cole uma URI `otpauth://` ou escaneie o código QR direto para a entrada.

No OpenKey, adicione o segredo do autenticador ou a URI `otpauth` à entrada de login, ou escaneie o QR da tela de configuração de 2FA do site. Os códigos aparecem sempre que o cofre está desbloqueado, e o provedor de Autofill do sistema ou a extensão do navegador pode preenchê-los onde a plataforma suporta. Do terminal, a CLI consegue lê-los diretamente:

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## Configurando o 2FA em uma conta

1. Faça login e abra as configurações de segurança do site.
2. Escolha app autenticador e **escaneie o código QR** ou digite o segredo manualmente.
3. Salve uma cópia desse segredo na mesma entrada do cofre que contém o nome de usuário e a senha.
4. Digite o código atual para confirmar.
5. Salve os **códigos de recuperação** do site em algum lugar que você controle — uma nota criptografada no mesmo cofre ou uma cópia impressa guardada offline.

O passo 3 é o que as pessoas pulam, e é o passo que salva você quando mais tarde trocar de celular.

## Exigindo isso em uma conta inteira

Depois que o 2FA estiver ativo em alguns logins, trate-o como padrão:

- Guarde um **método de recuperação por site**, porque cada site lida com isso de um jeito diferente.
- Prefira **dois autenticadores** onde o site permitir: celular e desktop, ambos alimentados pelo cofre. Se você perder um dispositivo, o outro continua funcionando.
- Ative o **2FA no email primeiro**. É a conta que redefine todas as outras.
- Verifique se existe uma opção de chave de hardware ou passkey e adicione-a junto com o TOTP, não no lugar dele, até você ter confiança de que consegue recuperar.

## Onde o 2FA dá errado

**Celular perdido sem backup.** Sem um segundo autenticador, um código de recuperação ou uma chave de hardware, a conta se foi. Esta é a falha de 2FA mais comum de todas e a razão pela qual os códigos de recuperação importam.

**Seed em uma captura de tela.** Um código QR fotografado é uma credencial em plaintext. Salve a seed no seu cofre e apague a imagem.

**Seed em um arquivo de notas sincronizado.** Notas na nuvem sincronizam em plaintext. Se você usa notas para material de recuperação, isso deve ficar dentro do cofre criptografado.

**Códigos rotativos digitados do app errado.** Alguns autenticadores permitem reordenar contas, o que faz os códigos serem digitados no site errado. Não é um problema de segurança — é um problema de suporte.

**Supor que o 2FA torna seguro reutilizar.** Não torna. Se você reutiliza uma senha em dois sites e só um tem 2FA, o outro ainda está a uma violação de distância.

## Como as passkeys mudam o 2FA

Uma passkey remove o segundo fator em vez de reforçá-lo. A chave privada é protegida pelo hardware seguro do dispositivo e só pode ser usada depois de uma verificação de biometria ou PIN, então o "algo que você sabe" e o "algo que você é" colapsam em uma única ação apoiada em hardware. Não há código para roubar, seed para vazar nem SIM para trocar.

É por isso que as passkeys são a direção para a qual a indústria migrou: são a credencial rara que é ao mesmo tempo mais segura *e* menos trabalhosa. O motivo restante para manter o 2FA é cobertura — as passkeys ainda não estão disponíveis em todo site, então uma seed TOTP no seu cofre é uma ponte razoável para os que não acompanharam.

[Mais sobre como as passkeys funcionam](/pt/blog/what-are-passkeys) · [como o OpenKey lida com elas](/pt/blog/passkeys-and-autofill)

## O que os dados de busca dizem

2FA é um dos maiores termos de busca da web no campo de segurança. No nível do termo principal, "2fa" atrai cerca de **67%** do interesse de "password manager" — mais do que "passkey" com 42% e "password generator" com 36%.

Refinamentos que as pessoas acrescentam a "two-factor authentication" (Google Trends, global, últimos 12 meses):

| Consulta relacionada | Interesse relativo |
|---------------------|--------------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

"what is two-factor authentication" também é o termo de crescimento mais rápido do cluster, subindo cerca de 550% na comparação ano a ano. Uma busca definicional que mais sobe é um sinal claro de que o público é novo — e é por isso que este artigo começa pela mecânica, não pela recomendação.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de um minuto

Códigos TOTP são computados a partir de um segredo permanente compartilhado com o site, então esse segredo é na verdade uma senha e merece a mesma proteção. Guarde-o na mesma entrada criptografada do cofre que contém o nome de usuário e a senha, mantenha um segundo autenticador, salve os códigos de recuperação do site offline, ative o 2FA primeiro na sua conta de email e adicione uma passkey onde houver uma disponível.

## Próximos passos

- [O que são passkeys?](/pt/blog/what-are-passkeys) — a credencial que substitui códigos
- [Autofill de senhas](/pt/blog/autofill-passwords) — preenchendo logins e códigos juntos
- [Usar o app](/pt/guide/app) — adicionando TOTP a uma entrada
- [Guia da CLI](/pt/guide/cli#busca-em-segredos-e-logins) — lendo códigos do terminal
