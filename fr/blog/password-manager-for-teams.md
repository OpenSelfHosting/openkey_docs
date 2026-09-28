---
title: "Gestionnaire de mots de passe pour les équipes : quoi évaluer"
description: Choisir un gestionnaire de mots de passe d'équipe — coffres partagés, rôles, départ, accès CLI et API, traçabilité — et comment en exécuter un sur votre propre serveur.
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# Gestionnaire de mots de passe pour les équipes : quoi évaluer

Un gestionnaire de mots de passe d'équipe n'est pas un produit grand public avec plus de sièges. Il a un autre métier : il doit survivre aux arrivées et aux départs, et il doit pouvoir répondre à des questions sur qui avait accès à quoi, et quand. La plupart des outils sont jugés sur la fonctionnalité de partage et échouent sur la deuxième question.

Cet article est la liste d'évaluation, plus la façon dont le modèle d'OpenKey fonctionne si vous voulez des collections partagées sur une infrastructure que vous contrôlez.

## Les exigences qui diffèrent vraiment

### 1. Des coffres partagés avec un vrai contrôle d'accès

« Partager avec mon équipe » est acquis. Ce qui compte est de savoir si l'accès est par collection ou par personne, si vous pouvez partager un sous-ensemble sans tout exposer, et si un prestataire peut voir exactement un service.

- **Le partage tout ou rien** échoue vite. Il ne passe pas l'échelle d'environ cinq personnes.
- **Le partage par collection** est le modèle utile minimum.
- **L'accès par rôle** (admin / member, et idéalement en lecture seule) est ce que vous voulez dès qu'il y a des relecteurs et des approbateurs.

### 2. Un départ qui retire réellement l'accès

C'est l'exigence qui sépare les outils grand public des outils d'équipe, et c'est celle qui manque le plus souvent.

Lorsqu'une personne part, vous devez savoir :

- Est-ce qu'elle perd l'accès **immédiatement**, ou à la prochaine sync ?
- Est-ce qu'elle conserve des **copies hors ligne** des identifiants partagés — et si oui, comment gérez-vous cela ?
- Pouvez-vous **révoquer un partage** et savoir que la copie a disparu ?
- Est-ce que la **propriété de l'org** et les droits d'admin survivent à son départ, ou l'équipe perd-elle la capacité de s'administer elle-même ?

Un outil incapable de répondre à cela est un passif de conformité déguisé en fonctionnalité de productivité.

### 3. Automatisation et accès machine

Les humains dans une UI constituent la moitié du problème. L'autre moitié, c'est :

- Une **CLI** pour la CI et le scripting
- Une **API** pour le provisionnement et les outils internes
- Des **comptes de service** qui n'expirent pas quand une personne part
- Un **import en masse** depuis un annuaire ou un tableur d'anciens identifiants partagés

Les équipes qui ont de l'infrastructure ont généralement besoin des quatre. Un gestionnaire de mots de passe qui n'a qu'une extension navigateur ne survivra pas au contact d'un pipeline de déploiement.

### 4. Zero-knowledge, et ce que cela signifie commercialement

Pour un particulier, le zero-knowledge est une préférence de confidentialité. Pour une organisation, c'est une position de conformité : c'est la différence entre « notre fournisseur a été compromis » et « notre fournisseur a été compromis, et il détenait du ciphertext ».

Cela contraint aussi les fonctionnalités. Certains fournisseurs proposeront une récupération de compte, une réinitialisation par un admin, ou une application de politique qui exige du texte en clair côté serveur — et chacune est une réduction délibérée de la propriété zero-knowledge. Les deux positions sont défendables ; vous devez choisir en connaissance de cause plutôt que le découvrir lors d'une revue d'incident.

### 5. Piste d'audit

« Puis-je prouver qui avait accès au mot de passe de la base de production le 3 mars ? » exige un journal d'accès, conservé pendant une période définie, exportable pour un auditeur.

Notez honnêtement la limite : dans un système zero-knowledge, un admin peut voir *qu'une* entrée a été consultée, pas *ce qu'elle contenait*. C'est le comportement correct, et c'est aussi une contrainte sur ce que votre audit peut prouver.

### 6. Apportez votre propre infrastructure

Un jour, une revue de sécurité demandera si des identifiants partagés quittent votre réseau. Les réponses sont : hébergement fournisseur avec un DPA contractuel, cloud privé, ou auto-hébergement. L'auto-hébergement est la seule option que vous pouvez vérifier, et la seule où vous pouvez démontrer que le serveur détient du ciphertext.

### 7. Un modèle de coût qui survit à l'effectif

Une tarification par siège qui inclut chaque prestataire, chaque compte de service et chaque auditeur en lecture seule devient vite chère. Vérifiez :

- La tarification des sièges en lecture seule
- Si les comptes de service sont gratuits
- Si les utilisateurs désactivés comptent encore
- S'il existe un palier gratuit pour l'évaluation

## Une grille de notation pour les équipes

| Critère | Poids | Pourquoi c'est important |
|-----------|--------|----------------|
| Départ et révocation | ×3 | L'exigence que le plupart des outils échouent |
| Contrôle d'accès par collection | ×3 | Empêche un prestataire de tout voir |
| Accès CLI et API | ×3 | Les machines sont la moitié de vos utilisateurs |
| Zero-knowledge, vérifiable | ×3 | Conformité et exposition en cas de fuite |
| Comptes de service | ×2 | Accès non humain de longue durée |
| Journal d'accès avec rétention | ×2 | Prouver un accès historique |
| Auto-hébergement disponible | ×2 | Garder les identifiants dans votre réseau |
| Accès d'urgence | ×1 | Solution de secours quand un admin est injoignable |
| Outils de migration en masse | ×1 | Sortir du tableur partagé |

## Comment OpenKey gère l'accès d'équipe

Le modèle de partage d'OpenKey est conçu pour cela, et il est volontairement inhabituel sur quelques points qui méritent d'être compris avant que vous ne bâtissiez un processus là-dessus.

### Organisations et collections partagées

Le partage exige **Pro** et un serveur auto-hébergé configuré, avec tout le monde sur la **même URL de serveur**. Le modèle :

1. **Publiez vos clés d'identité** pour que les pairs puissent vous envelopper des clés. Dans OpenKey, cela se fait depuis l'extension navigateur en mode autonome (serveur) — la page Réglages → Données de l'app ne contient pas cette action.
2. **Créez une organisation** et des collections partagées sous elle. Le client chiffre le nom de l'org et vous enveloppe une clé d'org en tant que propriétaire.
3. **Invitez des membres** par email (ils doivent déjà exister sur le serveur), avec un rôle de `admin` ou `member`. Votre client enveloppe la clé d'org pour leur clé d'identité publiée et poste l'invitation.
4. Ils acceptent sous **Invitations en attente** et synchronisent ; les collections partagées apparaissent.

Le serveur stocke les noms d'org, les charges partagées et les clés d'identité comme du **ciphertext opaque**. Il ne déplie jamais une clé d'org.

Pouvoirs d'admin : révoquer les invitations en attente, changer les rôles, retirer des membres. Une contrainte à anticiper — **le propriétaire ne peut pas quitter l'org**, et le transfert de propriété n'est pas un chemin de récupération séparé. Nommez un second propriétaire tôt plutôt que de traiter cela comme une formalité.

### Les partages d'éléments sont des instantanés, pas des documents vivants

C'est le détail opérationnel le plus important. Lorsque vous partagez une seule entrée ou collection avec quelqu'un :

- La charge chiffrée est **figée au moment du partage** et copiée dans le coffre du destinataire à l'acceptation.
- Les modifications ultérieures de votre copie **ne** lui sont **pas** poussées.
- **Révoquer** arrête une acceptation en attente. Cela **ne** supprime **pas** une copie que le destinataire a déjà importée.

Un partage d'entrée se comporte donc comme si vous remettiez une enveloppe scellée, pas comme le partage d'un document vivant. Pour tout ce qui doit rester synchronisé — un compte de service partagé, un outil interne à toute l'équipe — utilisez une **collection partagée d'org**, où les membres continuent de lire le même ciphertext sous une clé d'org partagée.

Se tromper là-dessus produit le bug classique : vous mettez à jour un mot de passe partagé, vous supposez que tout le monde a le nouveau, et la moitié de l'équipe détient un identifiant que vous avez renouvelé il y a un mois.

### Ce qu'OpenKey ne fait pas

Vaut la peine de le dire franchement, parce que cela détermine quand vous devez choisir autre chose :

- **Pas de moteur de politique imposé par l'admin** dans le client. Il n'existe aucune règle côté serveur qui impose une longueur minimale de mot de passe à toute une équipe.
- **Pas d'accroche de départ automatique.** Retirer un membre est une action manuelle : révoquer ou retirer dans l'org, puis régler les partages d'entrée qui ont déjà été acceptés.
- **Pas de SCIM ni de synchronisation d'annuaire.** L'appartenance se gère via les API d'org et de partage.
- **Pas de journal d'audit côté serveur de l'accès aux entrées.** Le serveur ne voit pas de texte en clair, il ne peut donc pas journaliser ce qui a été lu.
- **La sync est en last-write-wins par revision, pas un CRDT.** Des modifications concurrentes peuvent s'écraser ; modifiez sur un seul appareil à la fois quand cela compte.

Si vous avez besoin d'un départ automatisé, d'un moteur de politique ou d'un journal d'accès de niveau conformité, choisissez un produit d'équipe commercial. OpenKey est pour les équipes qui veulent la cryptographie sur leurs clients et sont prêtes à exécuter elles-mêmes la couche de collaboration.

## Déployer auprès d'une équipe

1. **Exécutez d'abord le serveur.** [Installation du serveur](/fr/guide/server), durci selon la [liste de durcissement](/fr/blog/self-hosted-password-manager#la-liste-de-durcissement).
2. **Créez votre propre compte**, publiez les clés d'identité depuis l'extension.
3. **Créez l'org**, puis une collection partagée par service ou par limite d'équipe. Commencez par les comptes d'infrastructure partagée — ce sont ceux qui causent le plus de dégâts quand ils sont faux.
4. **Publiez les clés d'identité de tout le monde** avant d'inviter, sinon l'étape d'enveloppement ne les trouvera pas.
5. **Invitez par petits groupes** et vérifiez qu'un membre peut réellement ouvrir une collection partagée avant d'ajouter le lot suivant.
6. **Déplacez le tableur partagé.** Chaque identifiant actuellement dans un tableur d'équipe est votre importation la plus prioritaire.
7. **Écrivez la procédure de départ avant d'en avoir besoin.** Deux étapes, écrites : retirer de l'org ; vérifier et révoquer les partages d'entrée.

## La version en une minute

Évaluez d'abord le départ, l'accès par collection et l'accès machine — pas la fonctionnalité de partage. Préférez un zero-knowledge que vous pouvez vérifier, et vérifiez si les fonctionnalités de récupération et d'admin du fournisseur exigent discrètement du texte en clair côté serveur. Si vous auto-hébergez, rappelez-vous que les partages d'entrée sont des instantanés : utilisez les collections partagées d'org pour tout ce qui doit rester à jour.

## Prochaines étapes

- [Partage et organisations](/fr/guide/sharing) — la procédure complète
- [Gestionnaire de mots de passe auto-hébergé](/fr/blog/self-hosted-password-manager) — exécuter le serveur
- [Gestionnaire de mots de passe pour la famille](/fr/blog/password-manager-for-family) — la version à l'échelle du foyer
- [Modèle de sécurité](/fr/guide/security) — ce que le serveur peut et ne peut pas voir
