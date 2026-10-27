---
title: Gestionnaire de mots de passe pour la famille
description: Partager les mots de passe avec sa famille — quoi partager, quoi ne jamais partager, comment gérer les comptes des enfants, et comment révoquer l'accès quand quelqu'un déménage.
date: 2026-09-24
cover: /blog/covers/password-manager-for-family.png
---

# Gestionnaire de mots de passe pour la famille

Le partage familial des mots de passe a une exigence difficile que les gens ont d'habitude de mal comprendre : **tout ne devrait pas être partagé.** Un coffre partagé où chacun voit tout paraît pratique et constitue généralement une rétrogradation de sécurité pour chaque compte qu'il contient.

Le bon modèle est un petit nombre d'identifiants partagés délibérément, et un grand nombre d'identifiants privés — avec une règle claire pour savoir lequel est lequel.

## La règle qui fait fonctionner tout ça

Classez chaque identifiant dans exactement l'une des trois catégories :

| Catégorie | Exemples | Qui peut les voir |
|--------|----------|----------------|
| **Partagé** | Streaming, compte d'achats commun, Wi-Fi invité de la maison, stockage familial, compte de la voiture partagée | Tout le foyer, par conception |
| **À portée de famille** | Le portail scolaire des enfants, un compte d'offre famille, un service commun | Les personnes précises qui en ont besoin |
| **Privé** | Email personnel, banque, médical, travail, rencontres, comptes cloud individuels | Une personne, pour toujours |

Le mode de défaillance est la dérive : une connexion commence dans Partagé parce que c'était pratique, puis acquiert discrètement du contenu sensible — une adresse email de récupération, une carte enregistrée, un message privé. Partagé n'est pas une valeur par défaut sûre. Cela doit être une décision délibérée et réexaminée.

## Ce qui devrait réellement être partagé

- **Streaming et médias** — ils supportent généralement déjà des profils séparés, ce qui est préférable à ne pas partager le compte du tout.
- **Achats communs** — un compte unique pour un abonnement récurrent, partagé délibérément.
- **Infrastructure de la maison** — le routeur, le Wi-Fi invité, une box domotique, l'imprimante partagée.
- **Stockage familial** — la photothèque ou le disque commun, où plusieurs personnes contribuent légitimement.
- **Accès d'urgence** — la seule chose que tout le monde doit pouvoir atteindre s'il vous arrive quelque chose.

## Ce qui ne doit jamais être partagé

- **Banque** — les comptes conjoints existent pour une raison ; les connexions partagées cassent la protection contre la fraude et les processus de réclamation.
- **Email personnel** — c'est la réinitialisation de tout le reste, et c'est un canal de correspondance privé.
- **Comptes de travail** — la politique de l'employeur l'interdit en général, et cela crée un vrai risque professionnel.
- **Portails médicaux et d'assurance** — ils sont juridiquement et éthiquement individuels.
- **Tout ce qui a une dimension juridique ou intime.** Si cela importait que quelqu'un d'autre puisse le lire, ne le partagez pas.

## Une disposition pratique

La plupart des gestionnaires de foyer prennent en charge les collections partagées ou le partage par élément. Une structure qui fonctionne :

```
Family
├── Household          — streaming, shared shopping, Wi-Fi, smart home
├── Kids               — school portals, game accounts, device accounts
└── Emergency          — the recovery entry, and where the backups live
```

Les comptes personnels de chacun restent dans son propre coffre privé, ou dans une collection privée séparée. Les comptes du foyer sont les comptes partagés, et ils sont la petite minorité.

Dans OpenKey, le partage fonctionne avec **Pro** et un serveur auto-hébergé, et les deux modèles existent :

- **Collections partagées d'org** — tout le monde lit le même ciphertext vivant sous une clé d'org partagée. Correct pour Household et Kids.
- **Partages d'entrée et de collection** — un **instantané** chiffré copié dans le coffre du destinataire lorsqu'il accepte. Bien pour des identifiants ponctuels, mauvais pour tout ce qui doit rester à jour, parce que les modifications ultérieures ne lui sont pas poussées.

Cette distinction est ce qu'il faut bien comprendre. Un mot de passe de routeur partagé qui ne change jamais est un bon partage d'entrée. Un compte partagé dont vous renouvelez le mot de passe est une collection partagée d'org, sinon vous passerez un après-midi à vous demander pourquoi la box domotique a cessé de fonctionner.

## Les comptes des enfants

Les enfants ont besoin de leurs propres connexions, pas des vôtres.

- **Donnez-leur leur propre coffre** dès le départ, avec un mot de passe principal qu'ils puissent retenir — une phrase de passe, et une phrase qu'ils peuvent reconstruire, puisqu'ils l'oublieront plus souvent que vous.
- **Ne mettez jamais le compte d'un enfant dans la collection d'un parent.** Quand il grandira, vous ne pourrez pas le lui transmettre proprement.
- **Créez les comptes sous leur vrai nom et avec leur vrai email**, pour que la récupération fonctionne quand ils seront plus âgés et qu'il s'agira bien de leur compte.
- **Mettez la récupération en place tôt.** Un compte que personne ne peut réinitialiser est une charge d'assistance plus tard, et un compte perdu est une leçon que vous ne voudrez peut-être pas qu'ils apprennent de la manière coûteuse.
- **Revenez dessus vers 13 ans.** Aux environs de l'âge où la plupart des services exigent un vrai consentement parental, c'est le moment de déplacer les comptes dans leur propre coffre et de leur en remettre les clés.

## Partager avec quelqu'un qui n'est pas technique

C'est là que la plupart des plans de partage familial échouent. Un parent, un partenaire, un grand-parent qui n'a pas choisi d'être là : c'est la personne la plus susceptible d'avoir besoin d'un accès et la moins susceptible de tolérer une app.

Tactiques pratiques :

1. **Connectez-les une fois** et définissez un verrouillage auto court, pour que l'app ne soit pas une énigme à chaque fois.
2. **Activez le déverrouillage biométrique** pour qu'ils ne tapent jamais un mot de passe principal sur un appareil partagé.
3. **Notez le mot de passe principal** et conservez-le dans un gestionnaire de mots de passe en lequel ils ont déjà confiance, ou dans une enveloppe scellée. Vous ne stockez pas un secret ; vous stockez la clé d'un secret qu'ils perdront sinon.
4. **Gardez la collection partagée petite.** Chaque entrée supplémentaire est une chose de plus qu'ils peuvent modifier par accident.
5. **Pré-créez les connexions partagées** pour que personne n'ait à créer des comptes sous pression.
6. **Répétez la passation** une fois, pendant que vous êtes encore là. L'objectif est que la réponse à « comment j'accède au compte de streaming » soit une personne, pas une recherche.

## Quand quelqu'un déménage

Faites-le la même semaine, pas quand vous y pensez :

1. **Changez les mots de passe partagés**, en commençant par la collection Household partagée — streaming, Wi-Fi, stockage, tout ce qui a une carte enregistrée.
2. **Retirez-les des collections partagées et des orgs.** Les propriétaires et les admins peuvent révoquer les invitations, changer les rôles, ou retirer des membres.
3. **Comprenez ce que la révocation ne fait pas.** Révoquer arrête une acceptation en attente. Cela **ne** supprime **pas** une copie que quelqu'un a déjà importée dans son propre coffre. Dans OpenKey, les partages d'entrée sont des instantanés, donc un partage accepté est une copie locale déchiffrée sur son appareil — traitez-la comme une clé que vous avez remise.
4. **Renouvelez tout ce qu'ils pouvaient plausiblement avoir lu**, y compris tout ce qui se trouvait dans une collection largement partagée.
5. **Mettez à jour l'entrée de récupération** dans votre collection Emergency.
6. **Revérifiez ce qui est dans Partagé.** Le partage du foyer dérive ; c'est le bon moment pour rétrograder tout ce qui a cessé d'être véritablement partagé.

## Accès d'urgence

Le scénario qui vaut la peine d'être planifié : il vous arrive quelque chose, et les personnes qui ont besoin des comptes sont précisément celles qui ne les ont jamais eus.

- **Gardez une seule collection Emergency** avec les comptes qui comptent opérationnellement — le service de streaming, le stockage familial, les comptes de services publics, et l'endroit où vivent vos sauvegardes.
- **Incluez une instruction humaine**, pas seulement des identifiants. Une note disant *quels* comptes, *à quoi* ils servent et qui contacter est plus utile qu'une liste de mots de passe, parce qu'elle dit à une personne stressée quoi faire.
- **Gardez-la à jour.** Un document d'urgence d'il y a trois ans est pire que pas de document du tout, parce qu'il inspire confiance et il a tort.
- **Ne** comptez pas sur un seul appareil. Si la personne qui a besoin d'un accès n'a plus de téléphone, il lui faut une copie imprimée hors ligne.

## Choisir un gestionnaire pour un foyer

| Exigence | Pourquoi |
|-------------|-----|
| Partage par élément et par collection | Un partage de coffre entier est trop brutal |
| Révocation | Les foyers changent |
| Rôles en lecture seule ou limités | Les enfants ne doivent pas administrer le coffre du foyer |
| Déverrouillage biométrique | Appareils partagés et mains partagées |
| Accès d'urgence | Le scénario où vous ne voudrez pas improviser |
| Tarification familiale raisonnable | Les coûts par siège s'additionnent vite |
| Un palier gratuit digne d'être utilisé | Quelqu'un commencera sans payer |

Quand vous comparez, posez les mêmes questions sur le départ que dans [gestionnaire de mots de passe pour les équipes](/fr/blog/password-manager-for-teams) — la mécanique est identique, l'enjeu est simplement plus faible.

## Ce que disent les données de recherche

Le partage est là où vit l'intention « comment faire », pas l'intention « quel produit ». Google Trends (monde, 12 derniers mois), variantes de « password manager » :

| Requête associée | Intérêt relatif |
|---------------|-------------------|
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |

Et un ensemble distinct à longue queue, comparés entre eux :

| Requête | Intérêt relatif dans le groupe |
|-------|-------------------------------|
| password manager for business | 100 |
| **password manager for family** | **41** |
| best password manager for business | 36 |
| password manager for teams | 22 |

Le partage du foyer dégage un intérêt réel — autour de 41% du groupe d'évaluation pour les entreprises — mais il est systématiquement présenté comme une *fonctionnalité d'un produit que vous avez déjà choisi* plutôt que comme une catégorie dans laquelle vous achetez. C'est un signal éditorial utile : les gens qui cherchent « password manager for family » veulent généralement savoir **comment partager en toute sécurité**, pas quel gestionnaire acheter.

Au niveau du terme générique, « how to share passwords » est le terme le plus fort du groupe « comment faire », devant « how to import passwords » et « how to use a password manager ». Le partage est la première chose que les foyers veulent faire, et la première chose qu'ils ratent.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

Ne partagez pas tout. Gardez un petit ensemble délibéré d'identifiants partagés, laissez la banque, l'email personnel et les comptes de travail privés, donnez aux enfants leurs propres coffres, et traitez la révocation comme un vrai processus — parce qu'un partage accepté est une copie que vous ne pouvez pas récupérer. Notez le plan d'urgence tant que vous allez bien.

## Prochaines étapes

- [Gestionnaire de mots de passe pour les équipes](/fr/blog/password-manager-for-teams) — la même mécanique, évaluée sérieusement
- [Partage et organisations](/fr/guide/sharing) — orgs, invitations, et sémantique des instantanés
- [Qu'est-ce qu'un gestionnaire de mots de passe ?](/fr/blog/what-is-a-password-manager) — les fondamentaux
- [Tarifs](/fr/pricing) — Free et Pro, y compris le partage
