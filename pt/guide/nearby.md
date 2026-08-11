# Sincronização Nearby na LAN

**OpenKey Pro** pode sincronizar o mesmo cofre entre dispositivos no seu Wi‑Fi local **sem um servidor auto-hospedado**. O texto cifrado trafega numa sessão LAN emparelhada; a chave do cofre só é compartilhada depois que você tocar explicitamente em **Vincular cofre**.

<img src="/guide/nearby-pair-link-flow.svg" alt="Nearby flow: pair with QR or code for a session key, explicitly link vault to share the vault key, then sync ciphertext on the LAN; optional send-entry for one-off pushes" class="ok-diagram" width="920" height="360" />

Esta página cobre emparelhamento, códigos QR, vínculo do cofre, envio de entradas, LAN Pro e regras de confiança. Solução de problemas breve: [FAQ](./faq#o-nearby-nao-encontra-o-outro-dispositivo-pro). Modelo de ameaça: [Segurança](./security#modelo-de-ameaca).

## Requisitos

- OpenKey Pro em cada dispositivo que deve sincronizar (ou uma atestação **LAN Pro** válida em plataformas sem IAP da loja — veja abaixo)
- Ambos os dispositivos desbloqueados e na **mesma LAN** (não Wi‑Fi de convidados / isolamento de clientes)
- **Configurações → Dispositivos próximos** iniciado nos dois lados

O Nearby **não** é um backup. Mantenha também um backup Pro [criptografado `.okbak`](./import-export#backup-criptografado-pro).

## Emparelhar dispositivos

1. Desbloqueie o OpenKey nos dois dispositivos → **Configurações → Dispositivos próximos**.
2. Ative **Visível na rede local** (é lembrado: retoma no próximo desbloqueio enquanto o cofre estiver desbloqueado).
3. Emparelhe com uma destas opções:
   - **QR (preferido):** o dispositivo que anuncia mostra um QR de emparelhamento; no outro toque **Escanear QR de emparelhamento** (ou **Colar QR de emparelhamento** no Linux/Windows) — não é preciso digitar o código.
   - **Código curto:** digite o código mostrado no par em cerca de dois minutos.
4. Após o emparelhamento, toque **Vincular cofre** para que ambos compartilhem a mesma impressão da chave do cofre. O emparelhamento sozinho nunca compartilha automaticamente a chave do cofre.

Se as chaves do cofre forem diferentes, o dispositivo receptor pode **adotar** a chave do par (substitui os dados locais do cofre após confirmar a senha mestra). Trate vínculo + adoção como confiança total no cofre.

### Firewall / retorno de conexão

Alguns desktops (especialmente macOS) bloqueiam TCP de entrada. Se escanear um QR falhar ao conectar, o OpenKey pode pedir ao host do QR que ligue de volta ao convidado (somente UDP unicast — o código de emparelhamento não é transmitido na LAN). Permita os avisos de rede local / firewall quando o SO solicitar. Prefira a mesma sub-rede; VPNs e private relay costumam quebrar a descoberta. Muitos códigos errados disparam um bloqueio curto.

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

Em plataformas **sem** compra dentro do app da loja (tipicamente Windows / Linux), um par Pro com cofre vinculado pode compartilhar um status **LAN Pro** para que o outro dispositivo desbloqueie os limites Pro pelo Nearby. O emparelhamento sozinho não basta — você deve tocar **Vincular cofre** primeiro.

- Apenas conveniência — **não** é uma prova criptográfica de compra.
- Android, iOS e macOS (IAP da loja) **ignoram** LAN Pro; compre ou restaure o Pro naquela loja.
- Desemparelhar interrompe a atestação.

## Resumo de confiança

| Ação | Implicação de confiança |
|--------|-------------------|
| Emparelhar | Chave de sessão com aquele par na LAN |
| Vincular cofre | Compartilhar material da chave do cofre — o par pode sincronizar o texto cifrado completo do cofre |
| Enviar entrada | O par recebe o texto cifrado daquela entrada |
| LAN Pro | O par pode desbloquear limites Pro em plataformas sem IAP |

Emparelhe e vincule apenas com dispositivos e pessoas em quem confia. Detalhes: [Segurança → Modelo de ameaça](./security#modelo-de-ameaca).

## Relacionado

- [Usar o app](./app) — mapa de configurações e matriz Pro
- [Download](./download)
- [Importar e exportar](./import-export) — backups reais
- [FAQ](./faq)
- [Segurança](./security)

Próximo: [Usar o app](./app) · [Compartilhamento](./sharing) · [FAQ](./faq)
