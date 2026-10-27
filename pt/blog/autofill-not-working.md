---
title: "Autofill não funcionando: correções que funcionam mesmo"
description: Por que o autofill de senhas para de funcionar no Chrome, Firefox, Safari e no mobile — as cinco causas comuns e as correções, em ordem de probabilidade.
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# Autofill não funcionando: correções que funcionam mesmo

O Autofill quebra de poucas formas previsíveis. Na prática a causa quase nunca é um bug: é um cofre bloqueado, o provedor errado selecionado, uma ponte que parou de conectar, um app que precisa ser reiniciado ou um navegador que começou a preencher a partir de outro lugar sem avisar.

Percorra estes na ordem de probabilidade. Leva cerca de cinco minutos e resolve a grande maioria dos casos.

## Correção 1: desbloqueie o cofre

A causa mais comum por larga margem, e a mais fácil de não perceber, porque o app *parece* instalado e ativado.

- **Modo autônomo da extensão:** abra o popup da extensão e desbloqueie-a. Uma extensão bloqueada não consegue descriptografar nada, então não oferece nada.
- **Modo ponte do desktop:** o app desktop precisa estar desbloqueado. A ponte recusa trabalhar enquanto o cofre está bloqueado, por design.
- **Mobile:** abra o app e desbloqueie antes de focar o campo. Bloquear por inatividade faz o Autofill pausar também.

Se as sugestões aparecem só logo depois que você desbloqueia e depois somem, essa é a sua resposta.

## Correção 2: verifique o provedor do sistema

Trocar de gerenciador de senhas nem sempre muda o que o SO oferece.

| Plataforma | Onde verificar |
|------------|----------------|
| Android | Configurações → Segurança → **Serviço de Autofill** |
| iOS / iPadOS | Configurações → Senhas → **AutoFill Passwords** |
| macOS | Configurações do Sistema → Geral → **AutoFill e Senhas** |
| Windows | Configurações → Contas → **Senhas** (provedores de credenciais) |
| Chrome | Configurações → Senhas, passkeys e Autofill → **Gerenciador de senhas** |

Se dois gerenciadores estiverem ativados, o SO escolhe um e o outro parece quebrado. Desative o que você não quer, ou escolha de propósito o que quer — e confirme a mesma escolha no navegador.

## Correção 3: reinicie o app ou navegador de destino

Trocar um provedor de credenciais nem sempre tem efeito em um processo que já está rodando. Isso é rotineiro, não é bug:

- Mobile: encerre à força o app em que você está tentando fazer Autofill e reabra-o.
- Desktop: encerre completamente o navegador (não apenas a janela) e reabra.
- Se o navegador for o problema, reinicie-o antes de mudar qualquer outra coisa — recarregar a extensão costuma registrar de novo o host nativo.

## Correção 4: reconecte a ponte do desktop

O Autofill no desktop é um handshake de duas partes: o app registra um host de mensagens nativas, e a extensão conversa com ele por um socket local. Falha quando o registro do host está ausente ou desatualizado.

1. Desbloqueie o app desktop do OpenKey.
2. Abra **Configurações → Segurança** e altere o Autofill — isso (re)registra o host de mensagens nativas.
3. Em navegadores Chromium, escreva o ID da sua extensão descompactada no arquivo da plataforma e depois altere o Autofill de novo para que o manifesto seja regenerado:

| Plataforma | Arquivo de ID da extensão |
|------------|---------------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. Na extensão, escolha **Usar app desktop**.
5. Somente macOS: confirme que o Python 3 está no seu `PATH` — o script do host precisa dele.

Também confirme que o cofre está **ainda desbloqueado** quando você testar. O socket da ponte só existe durante uma sessão desbloqueada.

## Correção 5: verifique se há um gerenciador competidor

Chrome e Edge vêm com armazenamento de senhas embutido, e os dois continuam preenchendo por conta própria sem reclamar. Se as sugestões "desaparecem" e as credenciais continuam sendo preenchidas, o gerenciador embutido é quem está fazendo.

- Desligue o login automático com senhas salvas nas configurações do navegador, ou
- Apague a entrada embutida e deixe seu gerenciador cuidar do login.

O mesmo conflito aparece entre o iCloud Keychain e um provedor de AutoFill de terceiros, e entre duas extensões que pedem `<all_urls>`.

## Causas específicas de plataforma

### Chrome

Acesso da extensão aos sites: `chrome://extensions` → sua extensão → **Detalhes** → Acesso a sites → *Em todos os sites*, ou *Ao clicar* se você preferir concessões explícitas. O Autofill precisa de acesso à página para detectar campos.

Se outra extensão tiver reservado o atalho de preenchimento, remapeie em `chrome://extensions/shortcuts`.

### Firefox

O Firefox pede permissão na primeira vez que uma extensão quer preencher em um site, e recusa silenciosamente algumas solicitações de todos os sites. Verifique as permissões da extensão em `about:addons` → Permissões → Acessar seus dados em todos os sites.

O Firefox usa o host nativo `openkey@openselfhosting.local` automaticamente; nenhum trabalho manual com manifestos é necessário naquela plataforma.

### Safari

O AutoFill do Safari e seu gerenciador são painéis separados. Ative o gerenciador nas Configurações do Sistema e depois, no Safari, confirme que o preenchimento de **Senhas** está ligado. O Safari também pode preencher com um provedor de credenciais *diferente* se a ordem nas configurações do sistema mudou — verifique a ordem de seleção, não apenas o interruptor.

### iOS e Android

- **Estado por app:** o iOS só oferece provedores no menu de um campo, então o sintoma é "a opção não está lá" em vez de "preenchiu a coisa errada".
- **Prompts de permissão:** o SO pede permissões de rede local ou biometria durante a configuração. Um prompt negado parece um gerenciador quebrado.
- **Biometria antes do preenchimento:** se você ativou biometria antes do preenchimento, todo preenchimento agora precisa de aprovação. Esse é o comportamento correto, não uma falha.
- **Restrições em segundo plano:** otimizadores agressivos de bateria no Android podem encerrar o processo do provedor, então as sugestões aparecem só enquanto o app está em primeiro plano.

## Diagnosticando com a auditoria de Autofill do navegador

Os navegadores trazem um diagnóstico que relata cada campo que viram, cada sugestão oferecida e por que ela foi rejeitada. Isso transforma adivinhação em um processo de dois minutos.

No Chrome, abra DevTools → **Application** → **Autofill** e então reproduza o preenchimento na página. Você obtém os campos detectados, os itens do menu suspenso oferecidos e o motivo de qualquer supressão. `autofill.creditCards` e `autofill.profiles` também podem ser alternados em `chrome://flags` quando o preenchimento de cartão ou endereço é a parte que está falhando.

Firefox: `about:debugging` → inspecione a extensão e verifique o console dela em busca de erros no momento do preenchimento.

## Se você usa o OpenKey especificamente

| Sintoma | Verifique |
|---------|-----------|
| Nenhuma sugestão no navegador | Extensão desbloqueada, ou app desktop desbloqueado e **Usar app desktop** selecionado |
| "A extensão não consegue falar com o app desktop" | Registro do host nativo, arquivo de ID da extensão, Python 3 no macOS |
| Nada no Android | **Configurações → Segurança → Autofill** ativado no Android e depois desbloquear o app |
| Nada no iOS | Provedor de AutoFill ativado nas configurações do sistema; reinicie o app de destino |
| Passkeys caem para o navegador | Esperado quando você escolhe **Usar navegador**, ou quando o cofre da extensão está bloqueado |
| Preencher funciona, salvar não | Confirme que a faixa de salvar dentro da página não está sendo bloqueada pela página |

A extensão precisa de acesso de host `<all_urls>` para detectar campos, capturar logins e interceptar WebAuthn em sites arbitrários — uma allowlist fixa não cobre a web aberta. Tudo o que ela descriptografa fica no seu dispositivo ou no seu próprio servidor; o conteúdo da página não é enviado a uma nuvem de fornecedor.

## O que os dados de busca dizem

Este é um grande cluster de buscas, o que é um bom sinal para qualquer pessoa que já passou por isso. Comparando termos de cauda longa de solução de problemas de Autofill entre si (Google Trends, global, últimos 12 meses):

| Consulta | Interesse relativo no cluster |
|----------|-------------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

"autofill not working" alcançando mais da metade do interesse do termo genérico "autofill extension" significa que um público muito grande chega já com algo quebrado. Especificamente no cluster do Chrome, "google chrome autofill settings" é a consulta relacionada mais procurada, com 100, e a de crescimento mais rápido, com cerca de +70% na comparação ano a ano, com "chrome autofill extension" em 62 e "chrome autofill not working" em 16.

Essa distribuição sugere uma estratégia de suporte específica: conteúdo orientado a configurações e uma lista de solução de problemas confiável alcançarão mais pessoas do que mais um anúncio de recurso.

Método: Google Trends, global, últimos 12 meses, consultado em setembro de 2026. Os valores são interesse relativo normalizado (0–100), não volumes de busca.

## A versão de 30 segundos

Desbloqueie o cofre. Confirme que o provedor do sistema correto está selecionado. Reinicie o app ou o navegador. Altere o Autofill novamente no app para registrar de novo o host nativo. Desative qualquer gerenciador competidor. Se ainda falhar, abra a auditoria de Autofill do navegador e leia o motivo da rejeição — ele nomeia o problema.

## Próximos passos

- [Autofill de senhas](/pt/blog/autofill-passwords) — o guia de configuração
- [Extensão do navegador](/pt/guide/extension) — modos de desbloqueio e detalhe de mensagens nativas
- [FAQ e solução de problemas](/pt/guide/faq) — correções específicas do OpenKey
- [O que são passkeys?](/pt/blog/what-are-passkeys) — o tipo de credencial que substitui senhas
