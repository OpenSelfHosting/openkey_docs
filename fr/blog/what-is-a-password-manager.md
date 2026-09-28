---
title: Qu'est-ce qu'un gestionnaire de mots de passe ?
description: Un guide simple sur les gestionnaires de mots de passe — ce qu'ils stockent, comment ils chiffrent, quels types existent et comment en choisir un sans confier vos mots de passe à un inconnu.
date: 2026-09-12
cover: /blog/covers/what-is-a-password-manager.png
---

# Qu'est-ce qu'un gestionnaire de mots de passe ?

Un **gestionnaire de mots de passe** est un coffre chiffré qui retient à votre place un seul mot de passe principal solide et saisit tout le reste. Au lieu de réutiliser `Summer2019!` sur douze sites, vous générez un mot de passe différent de 20 caractères pour chacun, et le gestionnaire stocke, récupère et saisit le bon au moment voulu.

C'est toute l'idée. Tout le reste — sync, partage, passkeys, Autofill, auto-hébergement — est de la tuyauterie autour de ce seul bénéfice.

## Pourquoi on en a besoin

Le problème est arithmétique. Un bon mot de passe humain est mémorable, et mémorable signifie réutilisé. Les attaques par credential stuffing reprennent les mots de passe ayant fui d'un site et les essaient sur des milliers d'autres : un seul mot de passe réutilisé peut donc vous coûter un compte sans rapport. La solution est un mot de passe unique par compte — exactement ce que personne n'a envie de mémoriser.

Un gestionnaire de mots de passe supprime l'étape de mémorisation. Vous retenez un seul secret ; le coffre garde le reste.

## Ce qu'un gestionnaire de mots de passe stocke vraiment

Pas seulement des mots de passe. Un coffre moderne contient une quantité étonnante de choses :

| Élément | Ce que c'est |
|---------|--------------|
| Connexion | URL, nom d'utilisateur, mot de passe, notes, seed TOTP |
| Carte de paiement | Numéro, expiration, CVV, regroupement par émetteur |
| Portefeuille crypto | Adresse, clé privée, phrase de récupération |
| Identité | Nom, adresse, téléphone, numéros de pièce d'identité |
| Note sécurisée | Tout ce que vous ne colleriez pas dans une app de chat |
| Passkey | Un identifiant WebAuthn qui remplace entièrement le mot de passe |

**TOTP** mérite qu'on s'y arrête : les codes temporels à usage unique pour l'authentification à deux facteurs peuvent vivre dans la même entrée que le mot de passe qu'ils protègent, si bien qu'une connexion et son code tournant restent ensemble au lieu d'être répartis dans deux apps distinctes.

## Les quatre choses qui séparent un bon gestionnaire d'un mauvais

### 1. Le modèle de chiffrement

Un gestionnaire sérieux chiffre votre coffre sur votre appareil avec une clé dérivée de votre mot de passe principal (OpenKey utilise **Argon2id** pour la dérivation et **AES-256-GCM** pour les données du coffre). L'entreprise qui exploite le serveur ne devrait pas pouvoir lire vos entrées — c'est la propriété *zero-knowledge*. Si le fournisseur peut réinitialiser votre mot de passe principal à votre place, ou détient une clé maîtresse qu'il pourrait utiliser pour déchiffrer, ce n'est pas zero-knowledge, quoi qu'en dise le marketing.

### 2. Où vivent les données chiffrées

Trois réponses courantes, par ordre de contrôle croissant :

- **Cloud du fournisseur** — quelqu'un d'autre exploite les serveurs. Le plus simple, et vous héritez de sa disponibilité, de son historique de fuites et de sa juridiction.
- **Cloud du fournisseur, auto-hébergeable** — même client, serveur optionnel.
- **Votre propre serveur** — c'est vous qui exploitez l'API de sync. Le serveur détient du ciphertext et ne peut pas le lire.

Pour une installation auto-hébergée comme [OpenKey](/fr/blog/zero-knowledge-sync), une base de données serveur volée est un tas de ciphertext volé, pas une liste de mots de passe volée.

### 3. La qualité de l'Autofill

L'Autofill est là où un gestionnaire de mots de passe mérite sa place, parce que c'est ce que vous touchez cinquante fois par jour. Cherchez une extension navigateur, un fournisseur au niveau du système pour le mobile, et un chemin passkey. La demande de recherche le reflète : « autofill » et ses variantes l'emportent plusieurs fois sur les requêtes « password vault ».

### 4. La position sur la récupération

Quelqu'un doit pouvoir vous dire la vérité sur ce qui arrive si vous oubliez votre mot de passe principal. Les conceptions zero-knowledge ne le peuvent pas : le serveur ne détient rien qui puisse aider. Un bon gestionnaire le dit sans détour, vous remet des sauvegardes locales chiffrées que vous contrôlez, et ne prétend pas qu'un agent de support pourra aider. Voir [mot de passe principal oublié](/fr/blog/forgot-master-password) pour comment éviter complètement la situation.

## Ce qu'un gestionnaire de mots de passe n'est pas

- **Pas une sauvegarde de vos comptes.** Il détient des identifiants ; il ne réinitialise pas un compte email verrouillé.
- **Pas de la 2FA automatique.** Stocker un seed TOTP n'est pas la même chose que protéger le compte avec des clés matérielles.
- **Pas une autorisation de réutiliser les mots de passe.** Toute la valeur tient à l'unicité.
- **Pas une raison de se passer de mot de passe principal.** Le coffre n'est aussi fort que la clé qui l'ouvre.

## Comment l'utiliser concrètement

1. **Choisissez un mot de passe principal solide.** La longueur l'emporte sur la complexité. Une phrase de passe de quatre à six mots sans rapport est plus solide et plus facile à retenir que `P@ssw0rd!`.
2. **Activez l'Autofill** avant d'importer quoi que ce soit, pour que les connexions enregistrées s'accumulent d'elles-mêmes.
3. **Importez ce que vous avez.** [L'export de Chrome](/fr/blog/import-passwords-from-chrome) prend environ une minute.
4. **Générez, n'inventez pas.** Utilisez le [générateur intégré](/fr/blog/strong-password-generator) pour chaque nouveau compte.
5. **Corrigez d'abord les pirements cas** — banque, email et votre compte social principal.
6. **Rangez les codes avec le compte.** Ajoutez les seeds TOTP à la même entrée ([comment ça marche](/fr/blog/two-factor-authentication)).
7. **Faites une sauvegarde chiffrée** et conservez-la hors ligne.

## Quel type choisir ?

| Si vous… | Regardez |
|----------|----------|
| Ne voulez aucune configuration et vous moquiez de savoir qui exploite les serveurs | Un gestionnaire cloud grand public |
| Voulez essayer avant de vous engager | Tout ce qui a un palier réellement gratuit — le [palier gratuit d'OpenKey](/fr/pricing#free-vs-openkey-pro) couvre le coffre, l'Autofill, les passkeys et la sync auto-hébergée |
| Voulez votre sync sur du matériel que vous contrôlez | Un [gestionnaire de mots de passe auto-hébergé](/fr/blog/self-hosted-password-manager) |
| Quittez un grand fournisseur | Les guides de migration depuis [LastPass](/fr/blog/lastpass-alternative) ou [1Password](/fr/blog/1password-alternative) |
| Êtes au fond de l'écosystème Google | [Google Password Manager](/fr/blog/google-password-manager) — et le moment où le quitter |
| Partagez avec votre famille | [Gestionnaire de mots de passe pour la famille](/fr/blog/password-manager-for-family) |
| Partagez avec des collègues | [Gestionnaire de mots de passe pour les équipes](/fr/blog/password-manager-for-teams) |

## Ce que les gens cherchent, et ce que cela révèle

Les données de recherche font un substitut correct pour savoir quelles questions se posent réellement les débutants. D'après Google Trends (monde, 12 derniers mois), voici les variantes que les gens ajoutent le plus souvent au terme générique « password manager » :

| Requête associée | Intérêt relatif |
|-------------------|-----------------|
| google password manager | 100 |
| google password | 93 |
| **what is a password manager** | **39** |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| bitwarden | 7 |
| 1password | 4 |

Deux choses sautent aux yeux. Premièrement, la question de relance la plus fréquente est exactement celle que cet article répond — le terme est posé en anglais courant, ce qui signifie que le public est nouveau dans la catégorie. Deuxièmement, les requêtes de marque dominent : la plupart des gens arrivent sur le sujet en pensant déjà « quel produit », pas « qu'est-ce que c'est ». Le même jeu de données montre « what is a password manager » comme la variante *informationnelle* à la plus forte croissance, en hausse d'environ 1,050% sur un an, tandis que les termes de présence de marque comme « nord password manager » ont augmenté d'environ 850%.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les chiffres sont un intérêt relatif normalisé (0–100), pas des volumes de recherche mensuels. Les chiffres en hausse correspondent à la croissance par rapport à la période équivalente précédente.

## La version en une minute

Un gestionnaire de mots de passe est un coffre chiffré accessible via un seul mot de passe principal solide, pour que chaque compte puisse avoir un mot de passe unique que vous n'avez jamais à retenir. Ce qui compte, c'est si le fournisseur peut lire vos données (il ne devrait pas), où vivent les données chiffrées, si l'Autofill fonctionne réellement sur vos appareils, et ce qui se passe si vous oubliez le mot de passe principal. Choisissez-en un, activez l'Autofill, importez, puis générez pour sortir de la réutilisation.

## Où aller ensuite

- [Meilleurs gestionnaires de mots de passe](/fr/blog/best-password-managers) — comment comparer les options
- [Autofill des mots de passe](/fr/blog/autofill-passwords) — le configurer correctement
- [Générateur de mots de passe solides](/fr/blog/strong-password-generator) — arrêter d'inventer des mots de passe
- [Modèle de sécurité](/fr/guide/security) — dérivation des clés et frontières de la menace
- [Utiliser l'application](/fr/guide/app) — le coffre OpenKey en pratique
