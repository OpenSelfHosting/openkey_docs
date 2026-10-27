---
title: L'authentification à deux facteurs dans un gestionnaire de mots de passe
description: Ce que sont la 2FA et les codes TOTP, comment stocker les seeds d'authentificateur à côté des connexions qu'ils protègent, et comment les passkeys changent la donne.
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# L'authentification à deux facteurs dans un gestionnaire de mots de passe

L'**authentification à deux facteurs (2FA)** signifie prouver que vous êtes vous avec une seconde preuve, pas seulement avec votre mot de passe. La forme la plus courante est le code tournant à six chiffres d'une app d'authentification — **TOTP** — fondé sur un mot de passe à usage unique temporel calculé à partir d'un seed partagé.

La partie embarrassante, c'est que le seed et le code vivent dans une app *différente* de votre mot de passe. Cet article explique la mécanique, pourquoi stocker les seeds dans un gestionnaire de mots de passe est l'agencement raisonnable, et comment les passkeys changent la donne.

## Comment fonctionne la 2FA

1. Lorsque vous activez la 2FA sur un site, il vous affiche un **secret** — généralement sous forme de QR code contenant une URI `otpauth://`.
2. Vous scannez ou collez ce secret dans un authentificateur.
3. Toutes les 30 secondes, l'authentificateur calcule un code à six chiffres à partir du secret plus de l'heure courante : `HMAC(secret, floor(time/30))`.
4. Le site calcule la même valeur. Si elles correspondent, vous êtes connecté.

Le code ne vaut plus rien une minute plus tard, et c'est justement pourquoi cela fonctionne. Mais le *secret* est en pratique un mot de passe permanent — quiconque le possède peut générer des codes valides indéfiniment.

## La décision : app d'authentification, SMS ou passkey

| Méthode | Hameçonnable | Impact d'une fuite de serveur | Notes |
|---------|--------------|--------------------------------|-------|
| Code SMS | Oui | Non | Vulnérable au SIM swap et au recyclage de numéros ; toujours mieux que rien |
| App / code TOTP | Oui (vol du seed) | Non | Fonctionne hors ligne ; le secret doit être protégé |
| Clé matérielle (FIDO2) | Non | Non | La plus forte ; exige un second appareil ou une clé de secours |
| Passkey | Non | Non | Rien à taper, rien à voler ; voir ci-dessous |

Les clés matérielles et les passkeys sont les seules options qui ne soient pas hameçonnables, parce que l'identifiant ne quitte jamais votre appareil et que la signature est liée à l'origine requérante.

## Pourquoi les seeds TOTP appartiennent à votre coffre

Le conseil habituel est « gardez votre app d'authentification séparée de votre gestionnaire de mots de passe », sur l'hypothèse raisonnable qu'une app compromise ne devrait pas tout ouvrir. En pratique cela crée un pire problème : le mot de passe et son second facteur finissent dans des endroits différents, donc la récupération de l'un est impossible sans l'autre, et les gens réinscrivent la 2FA sans cesse.

Le cadrage meilleur : traitez le seed TOTP comme **une partie de l'identifiant**, et protégez-le avec les mêmes contrôles. Si votre coffre est déverrouillé derrière un mot de passe principal et, idéalement, un élément biométrique, alors le seed n'est pas plus faible que le mot de passe qu'il protège — et il est toujours là où vous en avez besoin.

La plupart des gestionnaires le prennent en charge directement : collez le secret, collez une URI `otpauth://`, ou scannez le QR code directement dans l'entrée.

Dans OpenKey, ajoutez le secret d'authentification ou l'URI `otpauth` à l'entrée de connexion, ou scannez le QR depuis l'écran de configuration 2FA du site. Les codes apparaissent dès que le coffre est déverrouillé, et le fournisseur Autofill système ou l'extension navigateur peut les saisir là où la plateforme le permet. Depuis le terminal, la CLI peut les lire directement :

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## Configurer la 2FA sur un compte

1. Connectez-vous et ouvrez les réglages de sécurité du site.
2. Choisissez l'app d'authentification, et **scannez le QR code** ou saisissez le secret manuellement.
3. Enregistrez une copie de ce secret dans la même entrée de coffre que le nom d'utilisateur et le mot de passe.
4. Saisissez le code courant pour confirmer.
5. Conservez les **codes de récupération** du site là où vous les contrôlez — une note chiffrée dans le même coffre, ou une copie imprimée stockée hors ligne.

L'étape 3 est celle que les gens sautent, et c'est celle qui vous sauve quand vous changerez plus tard de téléphone.

## L'imposer sur l'ensemble d'un compte

Une fois la 2FA active sur quelques connexions, traitez-la comme un défaut :

- Stockez une **méthode de récupération par site**, parce que chaque site la gère différemment.
- Préférez **deux authentificateurs** quand le site le permet : téléphone et bureau, tous deux alimentés depuis le coffre. Si vous perdez un appareil, l'autre fonctionne toujours.
- Activez d'abord la **2FA sur l'email**. C'est le compte qui réinitialise tous les autres comptes.
- Recherchez une option de clé matérielle ou de passkey, et ajoutez-la à côté de TOTP plutôt qu'à sa place, tant que vous n'êtes pas sûr de pouvoir récupérer.

## Où la 2FA tourne mal

**Téléphone perdu sans sauvegarde.** Sans un second authentificateur, un code de récupération ou une clé matérielle, le compte est perdu. C'est l'échec 2FA le plus courant et la raison pour laquelle les codes de récupération comptent.

**Seed dans une capture d'écran.** Un QR code photographié est un identifiant en texte en clair. Enregistrez le seed dans votre coffre et supprimez l'image.

**Seed dans un fichier de notes synchronisé.** Les notes cloud se synchronisent en texte en clair. Si vous utilisez des notes pour du matériel de récupération, il doit être dans le coffre chiffré.

**Codes tournants saisis depuis la mauvaise app.** Certains authentificateurs permettent de réordonner les comptes, ce qui fait que des codes sont saisis contre le mauvais site. Ce n'est pas un problème de sécurité — c'est un problème de support.

**Croire que la 2FA rend la réutilisation sûre.** Ce n'est pas le cas. Si vous réutilisez un mot de passe sur deux sites et qu'un seul a la 2FA, l'autre reste à une fuite près.

## Comment les passkeys changent la 2FA

Un passkey supprime le second facteur au lieu de le renforcer. La clé privée est protégée par le matériel sécurisé de l'appareil et n'est utilisable qu'après une vérification biométrique ou par code PIN, si bien que le « quelque chose que vous savez » et le « quelque chose que vous êtes » se réduisent à une seule action adossée au matériel. Il n'y a aucun code à voler, aucun seed à faire fuir, et aucun SIM à usurper.

C'est pourquoi les passkeys sont la direction vers laquelle l'industrie s'est tournée : c'est le rare identifiant à la fois plus sécurisé *et* moins chronophage. La seule raison qui reste de garder la 2FA est la couverture — les passkeys ne sont pas encore disponibles sur tous les sites, donc un seed TOTP dans votre coffre est un pont raisonnable pour ceux qui n'ont pas suivi.

Plus de détails sur le fonctionnement des passkeys : [En savoir plus sur le fonctionnement des passkeys](/fr/blog/what-are-passkeys) · [comment OpenKey les gère](/fr/blog/passkeys-and-autofill)

## Ce que disent les données de recherche

La 2FA est l'un des plus grands termes de requête liés à la sécurité sur le web. Au niveau des termes génériques, « 2fa » capte environ **67%** de l'intérêt de « password manager » — plus que « passkey » à 42% et « password generator » à 36%.

Variantes que les gens ajoutent à « two-factor authentication » (Google Trends, monde, 12 derniers mois) :

| Requête associée | Intérêt relatif |
|-------------------|-----------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

« what is two-factor authentication » est aussi le terme à la plus forte croissance du groupe, en hausse d'environ 550% sur un an. Une requête définitionnelle qui progresse le plus vite est un signal clair que le public est nouveau — c'est pourquoi cet article commence par la mécanique plutôt que par la recommandation.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

Les codes TOTP sont calculés à partir d'un secret permanent partagé avec le site : ce secret est donc en réalité un mot de passe et mérite la même protection. Stockez-le dans la même entrée de coffre chiffrée que le nom d'utilisateur et le mot de passe, gardez un second authentificateur, conservez les codes de récupération du site hors ligne, activez la 2FA d'abord sur votre compte email, et ajoutez un passkey partout où il est proposé.

## Prochaines étapes

- [Qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys) — l'identifiant qui remplace les codes
- [Autofill des mots de passe](/fr/blog/autofill-passwords) — saisir connexions et codes ensemble
- [Utiliser l'application](/fr/guide/app) — ajouter un TOTP à une entrée
- [Guide de la CLI](/fr/guide/cli#rechercher-dans-les-secrets-et-les-connexions) — lire les codes depuis le terminal
