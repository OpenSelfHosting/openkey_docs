---
title: "Générateur de mots de passe solides : arrêtez d'inventer des mots de passe"
description: Pourquoi les mots de passe inventés à la main sont faibles, comment générer des mots de passe qui résistent vraiment au cassage, et comment vérifier et corriger ceux que vous avez déjà.
date: 2026-09-18
cover: /blog/covers/strong-password-generator.png
---

# Générateur de mots de passe solides : arrêtez d'inventer des mots de passe

L'invention humaine de mots de passe est un problème résolu avec une mauvaise réponse. Presque tout le monde utilise la même construction — un mot, une majuscule, l'année, `!` — et cette construction est exactement ce que les outils de cassage supposent. Un générateur supprime entièrement la devinette et l'humain de l'équation.

Voici comment générer des mots de passe qui tiennent, comment vérifier ceux que vous avez déjà, et comment corriger les pires sans y consacrer un après-midi.

## Pourquoi `P@ssw0rd1!` échoue

Les attaquants ne devinent pas les mots de passe un par un. Ils lancent des précalculs à grande échelle sur des populations entières, en utilisant des motifs observés dans de vraies fuites :

- des mots de dictionnaire, dans plusieurs langues, plus des noms et des marques
- des parcours de clavier (`qwerty`, `1qaz2wsx`) et leurs rotations
- des dates : années, mois, saisons
- des substitutions leetspeak : `a→@`, `i→1`, `o→0`, `e→3`
- des chiffres ajoutés et un seul symbole final

Votre mot de passe inventé atterrit à l'intersection de plusieurs de ces listes. Le matériel moderne essaie des milliards de candidats par seconde contre des hachages rapides, donc un motif « complexe » qui paraît inguessable à un humain est souvent cassé en quelques heures ou moins.

## Ce qui rend un mot de passe solide

**La longueur l'emporte sur la complexité.** Chaque caractère supplémentaire multiplie l'espace de recherche. Quatre mots sans rapport — `harbour-lantern-margarine-tricycle` — est à la fois plus long et plus facile à retenir que `X7$kq2!`, et immensément plus dur à casser. Préférez une phrase de passe pour votre mot de passe principal, et des chaînes aléatoires partout ailleurs.

**L'aléa l'emporte sur le vocabulaire.** Un générateur qui pioche dans un jeu de caractères complet produit une chaîne sans motif à exploiter. Un générateur qui pioche dans une liste de mots produit une phrase de passe, ce qui convient *si* les mots sont sans rapport et suffisamment nombreux.

**L'unicité l'emporte sur la robustesse.** Un mot de passe de 12 caractères utilisé sur un seul site va bien. Le même mot de passe de 12 caractères sur 40 sites est à une fuite près de 40 fuites. C'est précisément le point qui justifie l'existence d'un gestionnaire de mots de passe.

## Comment utiliser un générateur

Chacun de ceux-ci produit une sortie réellement aléatoire hors ligne, sans aucun réseau impliqué :

```bash
openkey gen -l 24                       # 24 characters
openkey gen -l 32 -a -c                 # avoid confusing characters, copy to clipboard
openkey gen -l 20 --no-symbols          # for sites that reject symbols
openkey --json gen -l 24                # machine-readable output
```

Dans l'app, ouvrez **Réglages → Générateur de mots de passe** pour définir votre longueur et vos classes de caractères par défaut, ou utilisez le générateur depuis un formulaire d'entrée. Les générateurs en ligne valent la peine d'être évités pour les mots de passe que vous comptez garder : vous demandez un secret au serveur d'un inconnu, et vous ne pouvez pas vérifier ce qu'il en a fait.

### Choisir une longueur

| Contexte | Longueur |
|----------|----------|
| Votre mot de passe principal | 4 à 6 mots sans rapport, ou 20+ caractères |
| Email, banque, compte cloud | 20+ caractères aléatoires |
| Compte de site ordinaire | 16+ caractères aléatoires |
| Tout ce qui a une politique d'expiration | 12 à 14 suffisent s'ils sont uniques |

## Vérifier la robustesse

Les gens qui cherchent demandent sans cesse « password strength checker » et « password strength tester », et la distinction utile est entre vérifier un *candidat* et auditer *ce que vous avez déjà*.

**Pour un candidat :** la longueur d'abord, puis vérifiez qu'il ne figure sur aucune liste de fuites et qu'il ne dérive pas de votre nom, du nom du site ou de l'année en cours. Il n'est pas besoin de l'envoyer nulle part — une estimation de longueur et une vérification de motif sont des opérations locales.

**Pour votre coffre :** ce que vous voulez, c'est un rapport de *réutilisation*, pas un score de robustesse. Trois questions comptent :

1. **Est-ce que j'utilise le même mot de passe sur plus d'un site ?** C'est le constat qui change réellement votre risque.
2. **Ce mot de passe figure-t-il dans un corpus de fuites connu ?** Un mot de passe ayant fuité ne vaut plus rien quelle que soit sa longueur, parce que la chaîne exacte est déjà dans les listes de mots des casseurs.
3. **Ce mot de passe est-il inchangé depuis des années sur un compte contenant quelque chose de valuable ?**

Notez qu'OpenKey ne contacte délibérément **pas** have-i-been-pwned ni n'exécute d'écran de santé des mots de passe, et que c'est un défaut raisonnable : un écran de santé envoie soit des données, soit exige un corpus local de fuites. Faites l'audit à la main plutôt — commencez par l'email, la banque et le cloud, puis élargissez.

## Corriger les mots de passe faibles et réutilisés

Vous n'avez pas besoin de tout changer d'un coup. Priorisez :

1. **Email** — il réinitialise tous les autres comptes.
2. **Banque et cloud** — le stockage cloud peut contenir le reste.
3. **Votre compte social principal** — les flux de réinitialisation de mot de passe mènent souvent à l'email.
4. **Votre mot de passe principal**, s'il est court ou réutilisé ailleurs.
5. **Tout le reste**, au fil de l'eau, chaque fois qu'un site vous le redemande.

Un flux de travail pratique :

1. Activez d'abord l'Autofill, pour que les nouvelles connexions soient enregistrées automatiquement.
2. Générez un nouveau mot de passe aléatoire pour chaque compte prioritaire **pendant que vous êtes connecté**.
3. Collez-le depuis le générateur plutôt que de le taper.
4. Activez la 2FA au même moment — vous êtes déjà dans les réglages de sécurité ([guide 2FA](/fr/blog/two-factor-authentication)).
5. Ajoutez un passkey là où il est proposé ([qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys)).
6. Supprimez l'ancien fichier d'export en texte en clair quand votre migration est terminée ([import depuis Chrome](/fr/blog/import-passwords-from-chrome)).

## Règles empiriques

- Ne réutilisez jamais. Imposez-le avec un générateur, pas avec de la discipline.
- La longueur est la sécurité la moins chère à votre disposition.
- Ne faites pas tourner un mot de passe solide et unique parce qu'une année est passée. La rotation sans raison n'est que du remue-ménage.
- N'ajoutez pas `1` ou `!` à un ancien mot de passe quand on vous force à le changer — c'est un prolongement prévisible d'une chaîne connue, et c'est ainsi qu'un ensemble de mots de passe « différents » en devient un seul.
- Ne gardez pas un tableur de mots de passe générés. Gardez-les dans le coffre, et conservez une sauvegarde hors ligne chiffrée.

## Ce que disent les données de recherche

La génération de mots de passe est un gros groupe autonome, pas seulement un sous-sujet des gestionnaires de mots de passe. Au niveau des termes génériques, « password generator » capte environ **36%** de l'intérêt de « password manager ».

Variantes que les gens ajoutent à « strong password generator » (Google Trends, monde, 12 derniers mois) :

| Requête associée | Intérêt relatif |
|-------------------|-----------------|
| google strong password generator | 100 |
| random strong password generator | 100 |
| random password generator | 99 |
| strong passwords | 58 |
| strong password generator online | 57 |
| generate strong password | 49 |
| password manager | 26 |
| apple strong password generator | 17 |

Les deux premières sont les générateurs intégrés aux comptes **Google** et **Apple** — les gens cherchent le générateur que leur plateforme fournit déjà, pas un site tiers. « strong password generator online » à 57 est le groupe dont il faut se méfier : un générateur en ligne est un tiers qui manipule un secret que vous comptez garder.

Un groupe séparé montre clairement l'intention d'audit. Requêtes associées sous « password strength » : *password strength checker* (100), *strength check* (51), *strength tester* (41), *strength tool* (28), *strength generator* (27). Les formulations « checker » et « tester » portent très majoritairement sur la validation d'un mot de passe que vous avez, ce qui explique pourquoi l'audit manuel l'emporte sur un écran de santé intégré à l'app pour quiconque ne veut pas envoyer de données.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

La longueur l'emporte sur la complexité, l'aléa l'emporte sur le vocabulaire, et l'unicité l'emporte sur les deux. Générez avec un outil local plutôt qu'avec un site web, visez 16+ caractères aléatoires pour les comptes ordinaires et une phrase de passe multi-mots pour votre mot de passe principal, et dépensez votre effort limité sur les comptes capables de réinitialiser les autres.

## Prochaines étapes

- [Qu'est-ce qu'un gestionnaire de mots de passe ?](/fr/blog/what-is-a-password-manager) — où vivent les mots de passe générés
- [Autofill des mots de passe](/fr/blog/autofill-passwords) — générer automatiquement à l'inscription
- [Authentification à deux facteurs](/fr/blog/two-factor-authentication) — la seconde couche
- [Guide de la CLI](/fr/guide/cli#generation-de-mots-de-passe-gen) — options de génération et classes de caractères
