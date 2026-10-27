---
title: "Autofill de senhas: como configurar e corrigir"
description: O que é Autofill, como ativar o autofill de senhas no Chrome, Firefox, Safari e no mobile, e como o OpenKey preenche logins, cartões e passkeys.
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autofill de senhas: como configurar e corrigir

**Autofill** é o recurso que transforma um gerenciador de senhas de um lugar para onde as senhas vão em uma ferramenta que você realmente usa. Em vez de abrir o cofre, achar a entrada certa e copiar uma string, você foca um campo de nome de usuário e uma sugestão aparece.

É aqui que a maioria das pessoas pesquisa pela primeira vez — "how to autofill", "autofill password", "autofill chrome", "autofill iphone" — e é aqui que a maioria desiste pela primeira vez. Então: o que é, como ativar em todos os lugares e como torná-lo confiável.

## O que o Autofill realmente faz

Três mecanismos diferentes compartilham o nome:

1. **Autofill de formulário** — uma página de login é detectada, o gerenciador oferece entradas correspondentes, você toca em uma, e nome de usuário e senha são preenchidos.
2. **Prompts de salvar** — depois que você faz login, o gerenciador oferece armazenar ou atualizar as credenciais.
3. **Geração de senha** — em um formulário de cadastro, o gerenciador pode criar uma senha forte e escrevê-la no campo enquanto você digita.

O terceiro é a parte subestimada. Gerar uma senha *durante* o cadastro é a melhor mudança de hábito disponível: elimina o momento em que você inventaria algo fraco, porque o campo já está preenchido antes de você poder digitar por cima.

## Ative o Autofill no Chrome

O gerenciador embutido do Chrome e um gerenciador de terceiros ficam no mesmo lugar, e é por isso que isso fica confuso.

1. Abra `chrome://settings/addresses` (senhas e Autofill).
2. Ligue **Oferecer para salvar senhas**.
3. Ligue **Entrar automaticamente com senhas salvas**, se quiser login com um toque.
4. Em **Senhas, passkeys e Autofill**, escolha o gerenciador que quer usar — o embutido do Chrome ou a extensão do seu gerenciador de senhas.
5. Se você usa uma extensão, abra o popup dela uma vez e confirme que está desbloqueada.

O preenchimento por teclado normalmente funciona também: `Ctrl+Shift+L` no Windows e Linux, `⌘⇧L` no macOS. Se outra extensão já tiver reservado o atalho, remapeie nas teclas de atalho de extensão do navegador.

## Autofill no Firefox

O Firefox tem seu próprio gerenciador embutido e é mais estrito sobre quais extensões podem preencher. Se as sugestões não aparecerem, verifique se a extensão tem permissão naquele site e se está desbloqueada. O Firefox usa `openkey@openselfhosting.local` para o host de mensagens nativas automaticamente — sem edição manual de manifestos naquela plataforma.

## Autofill no iPhone e no iPad

O iOS não tem um interruptor global de "preencher a partir de qualquer app" como o Android tem. Você usa **AutoFill Passwords** em um fluxo por app:

1. Instale seu gerenciador de senhas e ative-o como provedor de AutoFill nas configurações do sistema.
2. No app em que você está entrando, toque no campo de nome de usuário ou senha e escolha seu provedor no menu do campo (ou na linha de senhas do teclado).
3. Aprove com Face ID / Touch ID quando solicitado.

Dois hábitos do iOS que vale conhecer: se o OpenKey não aparece na lista de provedores, é porque não foi ativado nas configurações do sistema, e o iOS às vezes precisa que o app de destino seja reiniciado depois que você troca de provedor. [Passkeys](/pt/blog/what-are-passkeys) também passam pelo mesmo seletor de AutoFill, então a mesma configuração cobre os dois.

## Autofill no Android

O Android expõe um provedor real de senhas e passkeys em todo o sistema, o que faz dele a plataforma móvel mais tranquila:

1. Abra **Configurações → Segurança → Serviço de Autofill** e escolha seu gerenciador.
2. Conceda as permissões.
3. Nas configurações do seu gerenciador, escolha **sugestões inline** ou um **popup** e, opcionalmente, exija uma biometria antes de cada preenchimento.
4. Confirme com um login de teste em um site para o qual você já tem credenciais.

Exigir biometria antes do preenchimento é uma melhoria real: fecha o buraco de "alguém chega perto do seu celular desbloqueado e lê as senhas do seu email" sem tornar o Autofill inconveniente.

## Autofill em apps de desktop

O Autofill no desktop é um handshake de duas partes. O app registra um **host de mensagens nativas** quando você ativa a configuração de Autofill dele, e a extensão do navegador então conversa com o app desbloqueado por um socket local. No macOS o script do host precisa de Python 3 no seu `PATH`; no Linux e no Windows o app escreve os manifestos para você quando você alterna a configuração.

Se a extensão não consegue alcançar o app, quase sempre a causa é esse handshake — veja [Autofill não funcionando](/pt/blog/autofill-not-working) para a lista completa.

## Configurando o Autofill do OpenKey

| Plataforma | Passos |
|------------|--------|
| Android | **Configurações → Segurança** → ative o OpenKey como provedor do sistema → desbloqueie o cofre |
| iOS / macOS | Ative o OpenKey nas configurações de AutoFill do sistema → conceda os prompts do SO → reinicie o app de destino |
| Windows / Linux | **Configurações → Segurança** → ative o Autofill para registrar o host nativo |
| Navegador | Compile e carregue `openkey_extension` → defina a URL do servidor, ou escolha **Usar app desktop** |

Há dois modos de desbloqueio. **Autônomo** desbloqueia a extensão contra seu servidor auto-hospedado com seu email e senha mestra. **Ponte do desktop** preenche pelo app já desbloqueado, sem um desbloqueio separado da extensão — normalmente a experiência diária mais agradável, porque o app é o único lugar onde você desbloqueia.

Passo a passo completo: [guia da extensão do navegador](/pt/guide/extension).

## Por que o Autofill também é um recurso de segurança

Autofill não é apenas conveniência; é um controle.

- **Resistência a phishing.** Um gerenciador que casa um login com a origem exata para a qual ele foi salvo não oferece nada em um domínio parecido. Colar manualmente uma senha em uma cópia convincente do seu banco é exatamente o ataque que o Autofill evita.
- **Menos cópias em plaintext.** Nenhum app de gerenciador de senhas, nenhuma entrada no histórico da área de transferência, nenhuma senha parada em um arquivo de notas.
- **Rotação natural.** Quando um site pede uma nova senha, gerar uma inline faz senhas únicas serem o caminho de menor resistência.

## Autofill e passkeys

Passkeys removem o campo de senha por completo, então não há nada para preencher — a credencial é recuperada do cofre e assinada na hora. O mesmo desbloqueio que você usa para o Autofill cobre o WebAuthn, e é por isso que configurar o provedor uma vez resolve as duas coisas. [O que são passkeys?](/pt/blog/what-are-passkeys)

## O que os dados de busca dizem

Autofill é um grande cluster de buscas cheias de intenção. Do Google Trends (global, últimos 12 meses), os refinamentos que as pessoas acrescentam a "autofill":

| Consulta relacionada | Interesse relativo |
|---------------------|--------------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

Leia isso como um funil: as pessoas chegam sem saber o que é Autofill, caem em uma plataforma específica e depois travam nas configurações. E dentro do cluster de *solução de problemas* — um conjunto de termos de cauda longa comparados entre si — "autofill not working" tem cerca de **55%** da popularidade de "autofill extension", o que representa uma população muito grande de pessoas cujo Autofill quebrou e que precisam de uma correção mais do que de um tutorial.

O mesmo dado mostra "google chrome autofill settings" como o refinamento de crescimento mais rápido no cluster do Chrome, subindo cerca de 70% na comparação ano a ano.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## Se o Autofill não estiver funcionando

Nove em cada dez casos são uma de cinco coisas: o cofre está bloqueado, o provedor errado está selecionado nas configurações do sistema, a extensão não está conectada ao app, o navegador precisa ser reiniciado depois de uma troca de provedor, ou o Autofill está deliberadamente restrito a um navegador. Percorra [Autofill não funcionando](/pt/blog/autofill-not-working) para a versão passo a passo.

## Próximos passos

- [Autofill não funcionando](/pt/blog/autofill-not-working) — a lista completa de solução de problemas
- [Extensão do navegador](/pt/guide/extension) — instalação, modos de desbloqueio, mensagens nativas
- [O que são passkeys?](/pt/blog/what-are-passkeys) — o próximo passo depois que o Autofill funciona
- [Usar o app](/pt/guide/app) — Autofill e configurações do navegador em contexto
