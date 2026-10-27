---
title: "Alternative à 1Password : basculer sans perdre votre coffre"
description: Pourquoi les gens quittent 1Password — coût, offres famille et auto-hébergement — plus une migration pas à pas vers un gestionnaire de mots de passe que vous contrôlez.
date: 2026-09-20
cover: /blog/covers/1password-alternative.png
---

# Alternative à 1Password : basculer sans perdre votre coffre

1Password est un excellent produit, et l'une des raisons pour lesquelles il est excellent est qu'il n'a pas de palier gratuit. Cette seule décision de conception est la raison la plus fréquente pour laquelle on cherche « 1password alternative » — la requête d'alternative la plus recherchée de toute la catégorie, à environ quatre fois l'intérêt de « lastpass alternative ».

Cet article s'adresse aux gens dont la raison est l'une des trois : **le coût**, **les frictions de partage familial**, ou **vouloir votre sync sur votre propre matériel**. Ce n'est pas un réquisitoire ; 1Password est un choix légitime, et le cadrage honnête est « si ce n'est pas votre problème, restez ».

## Les trois vraies raisons de basculer

### Coût

L'abonnement est le prix d'entrée et il n'existe pas d'option gratuite permanente. La tarification est localisée par store et par région, donc le cadrage honnête est structurel : vous comparez un abonnement à soit un palier gratuit ailleurs, soit un achat unique plus votre propre serveur.

Les requêtes le reflètent. « 1password pricing » figure parmi les variantes qui montent le plus vite liées à Bitwarden, en hausse d'environ **200%** sur un an, et les termes liés au prix dominent la liste des requêtes en hausse sous plusieurs grandes marques.

### Partage familial et équipe

Les offres famille sont une source fréquente de frictions — gestion des sièges, montée d'offre quand un enfant se révèle avoir besoin d'un compte séparé, et partage entre foyers avec des appareils différents. Si votre foyer mélange iOS/Android/Windows, ou si vous voulez partager avec quelqu'un qui n'est pas sur une offre famille, c'est une raison légitime de bouger.

### Auto-hébergement

1Password a abandonné il y a quelque temps les coffres locaux autonomes, donc la sync passe par le fournisseur. Si l'exigence est que les données chiffrées résident sur une infrastructure que vous contrôlez, c'est une exigence ferme et non une préférence — et elle pointe vers un gestionnaire auto-hébergeable.

## Avant de migrer : le coût est-il vraiment le problème ?

Cela mérite d'être vérifié honnêtement, parce qu'une migration est un après-midi de travail que vous ferez plus d'une fois si vous ne faites pas attention :

- **Devez-vous vraiment partir ?** Un abonnement d'un an coûte souvent moins cher que le temps que la migration vous demande. Si la douleur est un prélèvement annuel unique, la réponse est peut-être de rester.
- **Est-ce l'offre ou le nombre de sièges ?** Une offre personnelle et une offre famille sont des produits différents ; partir parce que l'offre famille est malcommode est une autre décision que partir parce que vous ne voulez aucun abonnement.
- **Avez-vous besoin de l'auto-hébergement pour une vraie raison ?** Si personne dans votre foyer ne sait exécuter un serveur, l'auto-hébergement est un hobby que vous abandonnerez. La sync Nearby sur le LAN couvre l'essentiel de l'intérêt sans aucun coût de maintenance.

Si la réponse est oui, partez — et le reste de cet article est le comment.

## Migrer étape par étape

### 1. Exporter depuis 1Password

1. Connectez-vous sur le web ou dans l'app de bureau.
2. Ouvrez **Réglages → Export** et choisissez **1Password CSV**.
3. Préférez l'**export chiffré 1PUX** s'il vous est disponible — il garde les éléments verrouillés par un mot de passe au lieu d'écrire en texte en clair.
4. Enregistrez-le là où vous le contrôlez, puis déplacez-le hors ligne.

Les types d'éléments complexes — notes sécurisées avec pièces jointes, identités, documents, identifiants Wi-Fi — s'aplatissent en lignes ressemblant à des connexions à l'export. Attendez-vous à devoir recréer à la main les plus importants.

### 2. Importer dans le nouveau gestionnaire

Dans OpenKey : **Réglages → Données → Import et export → Import → 1Password CSV**. L'import est local ; rien n'est téléversé. Les dossiers deviennent des collections là où le mappage est propre.

### 3. Activez l'Autofill immédiatement

Avec l'Autofill fonctionnel, tout ce où vous vous connectez à partir de maintenant est enregistré pour vous, si bien que le coffre se répare tout seul pendant que vous renouvelez les mots de passe.

- [Autofill des mots de passe](/fr/blog/autofill-passwords)
- [L'Autofill ne fonctionne pas](/fr/blog/autofill-not-working) — si les suggestions manquent

### 4. Renouvelez les comptes qui comptent

L'email d'abord, puis la banque et le cloud, puis le reste au fil des demandes de chaque site. Générez chaque mot de passe localement :

```bash
openkey gen -l 24 -c
```

Ajoutez la 2FA pendant que vous êtes dans les réglages de sécurité ([guide](/fr/blog/two-factor-authentication)), et ajoutez un passkey là où il est proposé ([qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys)).

### 5. Reconstruisez à la main les éléments partagés

C'est la partie que les gens sous-estiment. Recréez :

- **Cartes de paiement**, regroupées par émetteur
- **Identités** utilisées dans les formulaires
- **Identifiants Wi-Fi et d'appareils** que vous aviez stockés
- **Notes sécurisées** avec pièces jointes — celles-là ne sont pas venues

OpenKey conserve les cartes, les portefeuilles crypto et les secrets développeur comme des zones de coffre de premier plan plutôt que comme des notes en texte libre, ce qui rend cette reconstruction moins pénible que dans un gestionnaire limité aux notes. Voir [Utiliser l'application](/fr/guide/app).

### 6. Prenez une sauvegarde, puis annulez

Exportez une sauvegarde locale chiffrée (`.okbak` dans OpenKey) **avant** d'annuler, puis vérifiez une nouvelle connexion sur un second appareil. Ne fermez ensuite l'ancien compte.

### 7. Détruisez les fichiers d'export

Exports chiffrés : supprimez-les. CSV en texte en clair : réécrivez et broyez. Tout ce qui a séjourné une semaine dans un fichier en texte en clair doit être renouvelé quoi qu'il en soit.

## Que vérifier chez le remplaçant

| Exigence | Ce qu'il faut vérifier |
|-------------|----------------|
| Pas cher | Un palier gratuit qui couvre le coffre, l'Autofill et la sync — avec les limites d'*éléments* indiquées |
| Partage familial | Collections partagées avec révocation, et si les enfants ont besoin d'offres séparées |
| Import 1Password CSV | Explicitement pris en charge, avec mappage des dossiers |
| Export gratuit | Confirmez le palier ; un export payant fait des données une prise d'otage |
| Auto-hébergement | Facultatif, mais cela change entièrement le modèle de confiance |
| Passkeys et TOTP | Les deux, fonctionnels, pas « bientôt disponibles » |
| CLI ou API | Précieux si vous scriptez quoi que ce soit |

Critères complets et grille de notation : [Meilleurs gestionnaires de mots de passe](/fr/blog/best-password-managers).

## L'angle familles et équipes

Si le moteur était le partage plutôt que le coût, regardez ceci avant de choisir une offre grand public :

- [Gestionnaire de mots de passe pour la famille](/fr/blog/password-manager-for-family) — configuration du foyer, enfants, comptes partagés
- [Gestionnaire de mots de passe pour les équipes](/fr/blog/password-manager-for-teams) — orgs, rôles, révocation, départ

Dans OpenKey, les organisations et les collections partagées exigent Pro et un serveur auto-hébergé, et tout ce qu'elles stockent — noms d'org, charges d'entrée, pièces jointes — reste du ciphertext. Les clients enveloppent des clés pour les destinataires ; le serveur ne les déplie jamais. Un détail à connaître avant de bâtir un processus là-dessus : **les partages d'entrée sont des instantanés**, pas des documents vivants. Révoquer un partage arrête une acceptation en attente mais ne supprime pas la copie que le destinataire a déjà acceptée. Pour un accès partagé continu, utilisez plutôt une collection partagée d'org.

## Ce que disent les données de recherche

Google Trends (monde, 12 derniers mois) rend la forme de cette migration explicite. En comparant les requêtes d'alternative entre elles :

| Requête | Intérêt relatif dans le groupe |
|-------|-------------------------------|
| **1password alternative** | **100** |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

Et les requêtes en hausse rattachées aux grandes marques sont dominées par des questions commerciales plutôt que par des questions de sécurité : pour Bitwarden, « bitwarden price increase » arrive en tête à environ **+450%** sur un an, avec « bitwarden review » et « bitwarden lite » tous deux autour de +350%, et « bitwarden pricing » autour de +190%. L'intérêt pour l'open source, l'auto-hébergeable et les petites équipes monte aussi — « bitwarden open source », « bitwarden enterprise » et « bitwarden cli » figurent toutes dans la liste en hausse.

Deux conclusions. Premièrement, le moteur dominant du basculement dans cette catégorie est le **prix**, pas l'angoisse d'une fuite. Deuxièmement, les intérêts adjacents qui montent le plus vite sont l'open source, l'entreprise et la CLI — ce qui suggère que les gens qui quittent des offres payantes cherchent quelque chose qu'ils peuvent exécuter et inspecter eux-mêmes.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

Si la douleur est le coût, un export 1Password CSV et un gestionnaire à palier gratuit avec export gratuit vous font sortir pour rien. Si la douleur est le partage familial ou l'auto-hébergement, choisissez d'abord sur ces deux exigences et le prix ensuite. Exportez, importez localement, activez l'Autofill, renouvelez l'email et la banque, reconstruisez les cartes et les notes à la main, prenez une sauvegarde chiffrée, puis annulez.

## Prochaines étapes

- [Alternative à LastPass](/fr/blog/lastpass-alternative) — le même processus, d'autres déclencheurs
- [Gestionnaire de mots de passe auto-hébergé](/fr/blog/self-hosted-password-manager) — la voie de l'auto-hébergement
- [Gestionnaire de mots de passe pour la famille](/fr/blog/password-manager-for-family) — le partage au foyer
- [Tarifs](/fr/pricing) — ce qu'incluent OpenKey Free et Pro
