# Partage et organisations

Partagez des éléments individuels ou travaillez en **organisations** avec d’autres utilisateurs OpenKey sur le **même serveur auto-hébergé**. Tout ce que le serveur stocke pour orgs et partages reste du **ciphertext** — les clients enveloppent les clés pour les destinataires ; l’API ne déchiffre jamais les noms ni les charges utiles.

**Nécessite OpenKey Pro** et un compte [serveur](./server) configuré (inscription / connexion + sync). Publiez les clés d’identité avant d’inviter ou de partager pour que les pairs puissent envelopper des clés pour vous.

## Prérequis

1. Installez l’app ([Télécharger](./download)) et déverrouillez votre coffre.
2. Connectez **Réglages → Données → Serveur auto-hébergé** et synchronisez.
3. **Réglages → Données → Publier les clés d’identité** (Pro) — envoie le matériau opaque de clé publique / privée enveloppée utilisé pour le partage.
4. Les destinataires doivent utiliser la **même URL serveur** et avoir publié des clés d’identité (ou au moins un compte inscrit que le serveur peut retrouver).

## Organisations

Chemin : **Réglages → Données → Organisations**, ou **Hub des éléments → Organisations**.

### Créer une org

1. Ouvrez Organisations → créer.
2. Le client chiffre le nom de l’org et enveloppe une clé d’org pour vous en tant que propriétaire.
3. Créez des **collections partagées** sous l’org pour les connexions d’équipe (noms + charges chiffrés).

Les entrées de coffre partagées d’org vivent sous ces collections d’org et se synchronisent comme des lignes opaques (`encrypted_payload`).

### Inviter des membres

1. Ouvrez l’org → **Inviter un membre**.
2. Saisissez leur **email** (doit déjà exister sur ce serveur) et choisissez un rôle (`admin` / `member`).
3. Le client enveloppe la clé d’org pour leur clé d’identité publique et poste l’invitation.
4. Ils voient **Invitations en attente**, acceptent, puis peuvent ouvrir les collections partagées après sync.

Le propriétaire/admin peut révoquer les invitations en attente, changer les rôles ou retirer des membres. Le propriétaire ne peut pas quitter l’org ; le transfert de propriété n’est pas un chemin de récupération séparé — planifiez les admins avec soin.

### Accepter une invitation

1. Ouvrez Organisations → **Invitations en attente**.
2. Acceptez. Synchronisez pour que les collections partagées apparaissent.
3. Utilisez le même mot de passe principal et serveur qu’habituellement — rejoindre ne donne pas le clair au serveur.

## Partages d’éléments et de collections

Partagez une seule connexion (ou collection) avec un autre utilisateur sans l’ajouter à une org.

1. Ouvrez l’entrée (ou la collection) → **Partager**.
2. Choisissez l’email du destinataire sur votre serveur.
3. Le client enveloppe une clé d’élément pour eux. Les **partages d’entrée prennent un snapshot** de la charge chiffrée au moment du partage.
4. Destinataire : accepter sous l’UI partages / en attente, puis le snapshot s’importe dans **son** coffre (nouveau uuid local).

### Sémantique de snapshot (important)

- Accepter un partage d’**entrée** copie le ciphertext figé dans le coffre personnel du destinataire.
- Les éditions ultérieures de l’entrée originale du propriétaire **ne** sont **pas** poussées aux destinataires.
- **Révoquer** arrête une acceptation en attente ; cela **ne** supprime **pas** une copie déjà importée sur l’appareil du destinataire.

Traitez les partages comme remettre une copie scellée, pas un document partagé en direct. Préférez les **collections partagées d’org** lorsque vous avez besoin d’un accès d’équipe continu au même ciphertext sous une clé d’org partagée.

## Extension

En mode autonome (serveur), l’[extension navigateur](./extension) peut lister/accepter/révoquer des partages et lister organisations / collections partagées. Le mode pont bureau s’appuie sur l’app déverrouillée pour les opérations de coffre.

## Notes de sécurité

- Ne partagez qu’avec des personnes et appareils de confiance — les destinataires qui acceptent peuvent déchiffrer ce que vous avez enveloppé pour eux.
- Les noms d’org, charges de partage et blobs de clés d’identité sont opaques sur le serveur ([Sécurité](./security)).
- Révoquer l’accès sur le serveur n’efface pas les copies locales déjà déchiffrées sur un autre appareil.
- Conservez des sauvegardes Pro ; le partage ne remplace pas les matériaux de récupération hors ligne.

## API associée (auto-hébergeurs)

Voir le README de `openkey_server` : `/orgs`, `/invites/*`, `/shares`, plus `POST /auth/lookup-public-key` pour envelopper des clés par email.

Suivant : [Utiliser l’application](./app) · [Import et export](./import-export) · [FAQ](./faq) · [Installer le serveur](./server)
