---
title: Qu'est-ce qu'un passkey ?
description: Un guide simple sur les passkeys — comment fonctionne WebAuthn, pourquoi ils résistent au hameçonnage, comment en créer et en utiliser un, et ce que devient votre gestionnaire de mots de passe.
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# Qu'est-ce qu'un passkey ?

Un **passkey** est un identifiant de connexion composé d'une paire de clés cryptographiques au lieu d'une chaîne de caractères. La moitié privée reste chiffrée sur votre appareil, derrière le même déverrouillage (biométrie, verrouillage d'écran ou mot de passe principal) que vous utilisez déjà. Le site ne stocke que la moitié publique, qui ne sert à rien pour se connecter à votre place.

Le résultat concret : il n'y a aucun mot de passe à taper, rien à hameçonner, rien qu'un site compromis puisse remettre à un attaquant, et aucun flux de réinitialisation que quiconque puisse manipuler par ingénierie sociale.

## Le problème des mots de passe

Chaque connexion que vous avez jamais faite est un secret partagé. Vous et le site stockez la même chaîne, ce qui crée trois modes de défaillance :

- **Hameçonnage.** Une copie convaincante de la page de connexion récolte la chaîne, parce que la chaîne fonctionne aussi bien sur le vrai site que sur le faux.
- **Credential stuffing.** Une chaîne ayant fui d'un site est rejouée contre chaque autre compte que vous possédez et qui la réutilise.
- **Fuite de serveur.** Les sites qui stockent des mots de passe lisibles remettent des identifiants fonctionnels aux attaquants dès qu'ils sont compromis.

Les passkeys suppriment le secret partagé. Le site ne voit jamais rien de réutilisable.

## Comment fonctionne un passkey

Enregistrement, lors de votre première connexion :

1. Votre appareil génère une **paire de clés** — une clé privée et une clé publique.
2. La clé publique est envoyée au site et stockée dans sa base d'utilisateurs.
3. La clé privée reste sur votre appareil, chiffrée, et n'est utilisable qu'après votre déverrouillage.

Connexion, à chaque fois ensuite :

1. Le site émet un **défi**.
2. Votre appareil le signe avec la clé privée.
3. Le site vérifie la signature avec la clé publique qu'il a stockée.

Il n'y a aucun secret partagé à aucune des deux étapes. Un faux site ne peut pas être utilisé, parce que le défi vient du vrai site et que votre appareil ne signera que pour l'origine avec laquelle il a été enregistré. C'est la propriété anti-hameçonnage, et elle vient du protocole plutôt que de la vigilance de l'utilisateur.

Sous le capot, il s'agit de **WebAuthn** (désormais appelé passkeys), avec l'identifiant généralement situé sur un authentificateur matériel **FIDO2** — l'élément sécurisé de votre appareil, un authentificateur de plateforme, ou une clé de sécurité USB/NFC.

## Créer un passkey

Le flux est presque identique partout, et votre gestionnaire de mots de passe fournit l'identifiant :

1. Sur la page de connexion du site, choisissez **Se connecter avec un passkey** (ou **Créer un passkey** si vous n'avez pas encore de compte).
2. Votre fournisseur affiche une boîte de confirmation nommant le site et le compte.
3. Approuvez avec Face ID, Touch ID, empreinte digitale ou le code PIN de votre appareil.
4. Terminé. Le passkey est stocké dans votre coffre et lié à ce site.

Si la boîte de dialogue propose une option « Utiliser le navigateur » ou « Utiliser plutôt cet appareil », l'accepter confie l'identifiant à l'authentificateur de plateforme au lieu de votre gestionnaire — utile pour une occurrence ponctuelle, mais cela signifie que le passkey n'est plus dans votre coffre.

## Utiliser un passkey au quotidien

Rien ne change dans la connexion, seulement ce qui se passe en dessous :

1. Concentrez le champ nom d'utilisateur et cliquez sur **Se connecter avec un passkey**.
2. Approuvez l'invite.
3. Le site valide la signature. Vous êtes connecté.

Aucune saisie, aucun presse-papiers, aucune invite de second facteur — le déverrouillage *est* le second facteur. Comme votre appareil affiche le site demandeur dans la boîte de dialogue d'approbation, un attaquant ne peut pas le rediriger silencieusement.

## Supprimer et transférer des passkeys

- **Supprimer :** ouvrez les réglages de sécurité du compte sur le site et supprimez-y le passkey, ou retirez-le de votre fournisseur. Le supprimer à un endroit laisse l'autre copie intacte : supprimez donc des deux côtés si vous voulez en finir avec.
- **Transférer :** un passkey synchronisé via un compte de plateforme (iCloud Keychain, Google Password Manager) suit ce compte. Un passkey stocké dans un coffre auto-hébergé bouge quand vous synchronisez, ou quand vous l'importez dans un nouveau gestionnaire.

Si vous perdez tous les appareils détenant un passkey *et* que vous n'avez aucun chemin de récupération, le compte est irrécupérable. Gardez au moins un passkey enregistré sur un second appareil ou une clé de sécurité.

## Passkeys et gestionnaires de mots de passe

Les passkeys ne remplacent pas votre gestionnaire de mots de passe — ils le font passer du travail le plus faible au travail le plus solide.

| Travail | Avant | Après |
|---------|-------|-------|
| Mémoriser le mot de passe | Une chaîne dans votre tête, réutilisée | Une paire de clés dans votre coffre |
| Résistance au hameçonnage | Vérification manuelle du domaine | Cryptographique, intégrée |
| Second facteur | Un code tournant | Le déverrouillage de l'appareil lui-même |
| Impact d'une fuite | Identifiants lisibles dans la base du site | Une clé publique, inutile à un attaquant |

Le gestionnaire stocke toujours la clé privée du passkey, verrouille toujours l'accès derrière le déverrouillage de votre coffre, et synchronise toujours. Ce qui change, c'est que le secret stocké n'est plus une chaîne mémorisable — ce qui supprime toute la raison pour laquelle les mots de passe ont été réutilisés.

Dans OpenKey, l'extension intercepte les appels WebAuthn `create` et `get`, stocke les identifiants ES256, et se replie sur l'authentificateur de plateforme quand vous le préférez. Le chemin via le fournisseur au niveau du système couvre les apps et navigateurs qui parlent à l'UI d'identifiants de l'OS. Les deux s'exécutent après déverrouillage, sur le client. [Comment ça marche dans OpenKey](/fr/blog/passkeys-and-autofill).

## Les passkeys fonctionnent-ils partout pour l'instant ?

Presque partout, avec quelques lacunes persistantes : certaines configurations d'authentification unique entreprises, certaines WebViews d'apps mobiles plus anciennes, et une poignée de sites qui ont implémenté WebAuthn mais pas la synchronisation des passkeys. L'approche pratique est de garder les mots de passe en solution de repli dans votre gestionnaire tant qu'un site propose les deux — et de préférer le passkey quand il est proposé.

## Ce que disent les données de recherche

L'intérêt pour les passkeys est important et continue de monter, et les requêtes sont majoritairement des questions de débutants. Google Trends (monde, 12 derniers mois), variantes de « passkey » :

| Requête associée | Intérêt relatif |
|-------------------|-----------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

« what is a passkey » et « what is passkey » sont les deux requêtes les plus fortes du groupe, et « what is a passkey » progresse d'environ 450% sur un an. C'est la forme d'une technologie qui passe des initiés au grand public : presque personne ne cherche encore la *gestion* des passkeys, et la plupart cherchent une définition.

Au niveau des termes génériques, « passkey » capte environ 42% de l'intérêt de recherche de « password manager », et « 2fa » environ 67% — tous deux considérables, et tous deux convergeant vers le même travail.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

Un passkey est une paire de clés dont la moitié privée vit chiffrée sur votre appareil et dont le site ne stocke que la moitié publique. Comme il n'y a aucun secret partagé, un faux site ne peut rien collecter de réutilisable, et le déverrouillage de votre appareil devient le second facteur. Créez-en un depuis la page de connexion d'un site, approuvez-le avec Face ID ou le code PIN de votre appareil, et connectez-vous d'un toucher et d'une signature la prochaine fois.

## Prochaines étapes

- [Passkeys et Autofill dans le navigateur](/fr/blog/passkeys-and-autofill) — l'implémentation OpenKey
- [Qu'est-ce qu'un gestionnaire de mots de passe ?](/fr/blog/what-is-a-password-manager) — où vivent les passkeys
- [Extension navigateur](/fr/guide/extension) — configuration WebAuthn et comportement de repli
- [Authentification à deux facteurs](/fr/blog/two-factor-authentication) — ce que les passkeys remplacent
