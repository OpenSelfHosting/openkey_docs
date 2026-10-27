# Sincronização Nearby na LAN

**OpenKey Pro** pode sincronizar o mesmo cofre entre dispositivos no seu Wi‑Fi local **sem um servidor auto-hospedado**. O texto cifrado trafega numa sessão LAN emparelhada; a chave do cofre só é compartilhada depois que você tocar explicitamente em **Vincular cofre**. Em um **dispositivo novo**, você também pode **copiar** um cofre existente pelo Nearby durante a configuração inicial (clonagem de cofre) — ainda peer-to-peer, nunca pela API de sync.

<img src="/guide/nearby-pair-link-flow.svg" alt="Fluxo Nearby: descobrir um par na LAN, emparelhar para uma chave de sessão, depois copiar um cofre na configuração ou vincular cofres explicitamente para sync de mesclagem contínua; envio de entrada opcional para envios pontuais" class="ok-diagram" width="920" height="360" />

Esta página cobre descoberta, emparelhamento por toque, clonagem de cofre na configuração, vínculo do cofre, envio de entradas, LAN Pro e regras de confiança. Solução de problemas breve: [FAQ](./faq#o-nearby-nao-encontra-o-outro-dispositivo-pro). Modelo de ameaça: [Segurança](./security#modelo-de-ameaca). Detalhes do protocolo: [especificação OpenKey → Nearby](https://github.com/OpenSelfHosting/OpenKey/blob/main/spec/nearby.md).

## Requisitos

- OpenKey Pro em cada dispositivo que deve sincronizar ou clonar (ou uma atestação **LAN Pro** válida em plataformas sem IAP da loja — veja abaixo)
- Mesma **LAN** (não Wi‑Fi de convidados / isolamento de clientes)
- Para **sync de mesclagem**: ambos os dispositivos desbloqueados com **Configurações → Dispositivos próximos** iniciado
- Para **clonagem de cofre** na configuração: dispositivo existente desbloqueado e anunciando com cofre; dispositivo novo no caminho de primeira execução **Dispositivo próximo**

A sync de mesclagem Nearby **não** é um backup. Mantenha também um backup Pro [criptografado `.okbak`](./import-export#backup-criptografado-pro). A clonagem copia o cofre completo uma vez (incluindo anexos); continue com backups offline depois.

Beacons de descoberta incluem o **nome do dispositivo em claro** na LAN (e um flag `vault` de se o par já tem conta). Aceite apenas dispositivos seus. Bloquear o cofre pausa o Nearby até você desbloquear de novo.

Linux e Windows podem pedir uma vez para abrir portas LAN (**UDP/TCP 47821**, **TCP 47822**). Permita esses avisos para que os pares encontrem esta máquina.

## Copiar cofre na configuração (clonagem de cofre)

Use isto quando um **telefone ou desktop novo** deve receber uma cópia completa de um cofre existente por Wi‑Fi (sem arquivo `.okbak`, sem servidor).

1. No dispositivo **existente**: desbloqueie o OpenKey → **Configurações → Dispositivos próximos** → ative **Visível na rede local**. O par deve mostrar que **tem um cofre**.
2. No dispositivo **novo**: seletor de primeira execução → **Dispositivo próximo** (ou o caminho de configuração equivalente).
3. Toque no par descoberto → confirme a cópia. O titular do cofre envia (ou o dispositivo vazio puxa) um arquivo criptografado da sessão pela LAN.
4. Desbloqueie no dispositivo novo com a **mesma senha mestra** da origem. A senha nunca é enviada no fio — só o material de desbloqueio e o texto cifrado do cofre se movem dentro da sessão emparelhada.

A clonagem inclui o banco local, preferências, anexos, avatar opcional e campos de desbloqueio da conta (e-mail, salt, KDF, chave do cofre encapsulada). Se esse e-mail já existir no dispositivo novo, a clonagem falha com `email_exists`.

**Clonar vs Vincular cofre**

| | Clonagem de cofre | Vincular cofre |
|--|-------------|------------|
| Quando | Primeira execução / dispositivo vazio | Ambos os dispositivos já têm cofres |
| Resultado | Cópia completa de um cofre no dispositivo vazio | Compartilhar impressão da chave do cofre; sync LWW contínua |
| Senha mestra | Mesma senha para desbloquear a cópia | Já desbloqueado nos dois lados |

## Emparelhar dispositivos (sync de mesclagem)

1. Desbloqueie o OpenKey nos dois dispositivos → **Configurações → Dispositivos próximos**.
2. Ative **Visível na rede local** (é lembrado: retoma no próximo desbloqueio enquanto o cofre estiver desbloqueado).
3. Toque em um par descoberto para emparelhar (o código curto de emparelhamento é trocado automaticamente pela sessão LAN). Digitar um código curto manualmente ainda funciona por cerca de dois minutos quando a descoberta é difícil.
4. Após o emparelhamento, toque **Vincular cofre** para que ambos compartilhem a mesma impressão da chave do cofre. O emparelhamento sozinho nunca compartilha automaticamente a chave do cofre.

Se as chaves do cofre forem diferentes, o dispositivo receptor pode **adotar** a chave do par (substitui os dados locais do cofre após confirmar a senha mestra). Trate vínculo + adoção como confiança total no cofre.

### Firewall / retorno de conexão

Alguns desktops (especialmente macOS) bloqueiam TCP de entrada. Builds Linux e Windows podem pedir uma vez **UDP/TCP 47821** e **TCP 47822**. Se um par não conseguir discar para dentro, o OpenKey pode pedir ao host que anuncia que ligue de volta ao convidado (somente UDP unicast — o código de emparelhamento não é transmitido na LAN). Permita os avisos de rede local / firewall quando o SO solicitar. Prefira a mesma sub-rede; VPNs e private relay costumam quebrar a descoberta. Muitos códigos errados disparam um bloqueio curto.

## Após vincular

- As alterações sincronizam automaticamente enquanto ambos os cofres estiverem desbloqueados e o Nearby estiver anunciando.
- Use **Sincronizar agora** para uma atualização manual.
- A sincronização é **last-write-wins por revision** (mesma regra do [servidor](./server)) — edite um dispositivo por vez quando possível.
- **Dispositivos confiáveis:** após um emparelhamento + vínculo de cofre bem-sucedido, os pares reconectam e sincronizam sempre que o Nearby estiver ativo — sem novo emparelhamento.
- **Somente redes confiáveis (opcional):** adicione SSIDs de casa/escritório; o Nearby pausa quando o SSID atual não está na lista (e bloqueia o início se a lista estiver vazia). Quando o SO não consegue ler o SSID, o Nearby ainda pode rodar com um banner de aviso.
- **Desemparelhar** revoga a confiança na LAN, para a sincronização e limpa as reivindicações LAN Pro daquele par.

## Enviar uma entrada

Você pode enviar um único login a um par emparelhado sem esperar uma sincronização completa do cofre:

1. Abra a entrada (ou use as ações do par Nearby em **Configurações → Dispositivos próximos**).
2. Escolha **Enviar para dispositivo** / enviar entrada para aquele par.
3. O par recebe o texto cifrado pela sessão LAN e pode armazená-lo localmente.

Use isso para compartilhamentos pontuais na LAN; prefira [organizações e compartilhamento](./sharing) quando os pares usam o mesmo servidor auto-hospedado.

## Atestação LAN Pro {#lan-pro-attestation}

Em plataformas **sem** compra dentro do app da loja (tipicamente Windows / Linux), um par Pro **com cofre vinculado** pode compartilhar um status **LAN Pro** para que o outro dispositivo desbloqueie os limites Pro pelo Nearby. O emparelhamento sozinho não basta — você deve tocar **Vincular cofre** primeiro.

- Apenas conveniência — **não** é uma prova criptográfica de compra.
- Android, iOS e macOS (IAP da loja) **ignoram** LAN Pro; compre ou restaure o Pro naquela loja.
- Desemparelhar interrompe a atestação.

## Resumo de confiança

| Ação | Implicação de confiança |
|--------|-------------------|
| Emparelhar | Chave de sessão com aquele par na LAN |
| Clonagem de cofre | O par recebe uma cópia completa do cofre (texto cifrado + material de desbloqueio); precisa da mesma senha mestra para desbloquear |
| Vincular cofre | Compartilhar material da chave do cofre — o par pode sincronizar o texto cifrado completo do cofre |
| Enviar entrada | O par recebe o texto cifrado daquela entrada |
| LAN Pro | O par pode desbloquear limites Pro em plataformas sem IAP |

Emparelhe, clone e vincule apenas com dispositivos e pessoas em quem confia. Detalhes: [Segurança → Modelo de ameaça](./security#modelo-de-ameaca).

## Relacionado

- [Usar o app](./app) — seletor de configuração, mapa de configurações e matriz Pro
- [Download](./download)
- [Importar e exportar](./import-export) — `.okbak` vs clonagem Nearby
- [FAQ](./faq)
- [Segurança](./security)

Próximo: [Usar o app](./app) · [Compartilhamento](./sharing) · [FAQ](./faq)
