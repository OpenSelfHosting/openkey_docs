---
title: O que são passkeys?
description: Um guia em linguagem simples sobre passkeys — como o WebAuthn funciona, por que elas não podem ser phishingadas, como criar e usar uma, e o que acontece com o seu gerenciador de senhas.
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# O que são passkeys?

Uma **passkey** é uma credencial de login feita de um par de chaves criptográficas em vez de uma string de caracteres. A metade privada fica criptografada no seu dispositivo, atrás do mesmo desbloqueio (biometria, bloqueio de tela ou senha mestra) que você já usa. O site armazena apenas a metade pública, que é inútil para entrar como você.

O resultado prático: não há senha para digitar, nada para phishar, nada que um site violado entregue a um atacante e nenhum fluxo de redefinição para alguém explorar com engenharia social.

## O problema que as senhas têm

Todo login que você já fez é um segredo compartilhado. Você e o site guardam a mesma string, o que cria três modos de falha:

- **Phishing.** Uma cópia convincente da página de login colhe a string, porque a string funciona tanto no site real quanto no falso.
- **Credential stuffing.** Uma string vazada de um site é reaplicada em todas as outras contas que você tem e que a reutilizam.
- **Violação do servidor.** Sites que guardam senhas legíveis entregam credenciais funcionais aos atacantes no instante em que são violados.

Passkeys removem o segredo compartilhado. O site nunca vê nada reutilizável.

## Como uma passkey funciona

Registro, quando você faz login pela primeira vez:

1. Seu dispositivo gera um **par de chaves** — uma chave privada e uma chave pública.
2. A chave pública é enviada ao site e guardada no banco de dados de usuários dele.
3. A chave privada fica no seu dispositivo, criptografada, e só pode ser usada depois que você desbloqueia.

Login, todas as vezes depois disso:

1. O site emite um **desafio**.
2. Seu dispositivo o assina com a chave privada.
3. O site verifica a assinatura contra a chave pública que guardou.

Não há segredo compartilhado em nenhuma das etapas. Um site falso não pode ser usado, porque o desafio vem do site real e seu dispositivo só assina para a origem com a qual foi registrado. Essa é a propriedade anti-phishing, e ela vem do protocolo, não da vigilância do usuário.

Por baixo, isso é **WebAuthn** (agora chamado de passkeys), com a credencial normalmente em um autenticador de hardware **FIDO2** — o elemento seguro do seu dispositivo, um autenticador de plataforma ou uma chave de segurança USB/NFC.

## Criando uma passkey

O fluxo é quase o mesmo em todo lugar, e seu gerenciador de senhas fornece a credencial:

1. Na página de login do site, escolha **Entrar com uma passkey** (ou **Criar uma passkey** se você ainda não tem conta).
2. Seu provedor mostra um diálogo de confirmação com o nome do site e da conta.
3. Aprove com Face ID, Touch ID, impressão digital ou o PIN do seu dispositivo.
4. Pronto. A passkey fica guardada no seu cofre e vinculada a esse site.

Se o diálogo oferecer uma opção "Usar navegador" ou "Usar este dispositivo", escolhê-la entrega a credencial ao autenticador de plataforma em vez do seu gerenciador — útil para uma ocasião, mas significa que a passkey não está mais no seu cofre.

## Usando uma passkey no dia a dia

Nada muda no login, só o que acontece por baixo:

1. Foque o campo de nome de usuário e clique em **Entrar com uma passkey**.
2. Aprove o prompt.
3. O site valida a assinatura. Você entrou.

Nada de digitação, nada de área de transferência, nenhum prompt de segundo fator — o desbloqueio *é* o segundo fator. Como seu dispositivo mostra o site solicitante no diálogo de aprovação, um atacante não consegue redirecioná-lo silenciosamente.

## Removendo e transferindo passkeys

- **Remover:** abra as configurações de segurança da conta no site e apague a passkey lá, ou remova-a do seu provedor. Apagá-la em um lugar deixa a outra cópia intacta, então remova dos dois se quiser que ela desapareça.
- **Transferir:** uma passkey sincronizada por uma conta de plataforma (iCloud Keychain, Google Password Manager) se move junto com essa conta. Uma passkey guardada em um cofre auto-hospedado se move quando você sincroniza, ou quando importa para um novo gerenciador.

Se você perder todos os dispositivos que guardam uma passkey *e* não tiver caminho de recuperação, a conta é irrecuperável. Mantenha pelo menos uma passkey registrada em um segundo dispositivo ou em uma chave de segurança.

## Passkeys e gerenciadores de senhas

Passkeys não substituem seu gerenciador de senhas — elas o movem do trabalho mais fraco para o mais forte.

| Tarefa | Antes | Depois |
|--------|-------|--------|
| Lembrar a senha | Uma string na sua cabeça, reutilizada | Um par de chaves no seu cofre |
| Resistência a phishing | Verificação manual de domínio | Criptográfica, embutida |
| Segundo fator | Um código rotativo | O próprio desbloqueio do dispositivo |
| Impacto de violação | Credenciais legíveis no banco de dados do site | Uma chave pública, inútil para um atacante |

O gerenciador ainda guarda a chave privada da passkey, ainda condiciona o acesso ao desbloqueio do cofre e ainda sincroniza. O que muda é que o segredo guardado não é mais uma string memorizável — o que elimina toda a razão pela qual as senhas acabavam reutilizadas.

No OpenKey a extensão intercepta chamadas WebAuthn `create` e `get`, guarda credenciais ES256 e recorre ao autenticador de plataforma quando você prefere. O caminho do provedor no nível do sistema cobre apps e navegadores que conversam com a UI de credenciais do SO. Os dois rodam depois do desbloqueio, no cliente. [Como funciona no OpenKey](/pt/blog/passkeys-and-autofill).

## As passkeys já funcionam em todo lugar?

Quase em todo lugar, com algumas lacunas persistentes: algumas configurações corporativas de single sign-on, alguns WebViews de apps móveis mais antigos e alguns sites que implementaram WebAuthn mas não a sincronização de passkeys. Uma abordagem prática é manter senhas como fallback no seu gerenciador enquanto um site oferecer as duas coisas — e preferir a passkey quando ele oferecer.

## O que os dados de busca dizem

O interesse por passkey é grande e continua subindo, e as buscas são esmagadoramente perguntas de iniciante. Refinamentos de "passkey" no Google Trends (global, últimos 12 meses):

| Consulta relacionada | Interesse relativo |
|---------------------|--------------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

"what is a passkey" e "what is passkey" são as duas buscas mais fortes do cluster, e "what is a passkey" está subindo cerca de 450% na comparação ano a ano. Essa é a forma de uma tecnologia cruzando de aficionados para o público em geral: quase ninguém busca ainda *gerenciamento* de passkey, e a maioria busca uma definição.

No nível do termo principal, "passkey" atrai cerca de 42% do interesse de busca de "password manager", e "2fa" atrai cerca de 67% — ambos substanciais e ambos convergindo para o mesmo trabalho.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de um minuto

Uma passkey é um par de chaves em que a metade privada vive criptografada no seu dispositivo e o site só guarda a metade pública. Como não há segredo compartilhado, um site falso não consegue coletar nada reutilizável, e o desbloqueio do seu dispositivo se torna o segundo fator. Crie uma na página de login de um site, aprove com Face ID ou o PIN do seu dispositivo e entre com um toque e uma assinatura na próxima vez.

## Próximos passos

- [Passkeys e Autofill no navegador](/pt/blog/passkeys-and-autofill) — a implementação do OpenKey
- [O que é um gerenciador de senhas?](/pt/blog/what-is-a-password-manager) — onde as passkeys ficam
- [Extensão do navegador](/pt/guide/extension) — configuração do WebAuthn e comportamento de fallback
- [Autenticação de dois fatores](/pt/blog/two-factor-authentication) — o que as passkeys substituem
