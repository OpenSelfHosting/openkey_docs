---
title: "Autofill des mots de passe : comment le configurer et le réparer"
description: Ce qu'est l'Autofill, comment activer l'Autofill des mots de passe dans Chrome, Firefox, Safari et sur mobile, et comment OpenKey saisit les connexions, les cartes et les passkeys.
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autofill des mots de passe : comment le configurer et le réparer

L'**Autofill** est la fonctionnalité qui transforme un gestionnaire de mots de passe d'un endroit où ranger des mots de passe en un outil que vous utilisez réellement. Au lieu d'ouvrir le coffre, de trouver la bonne entrée et de copier une chaîne, vous concentrez un champ nom d'utilisateur et une suggestion apparaît.

C'est ici que la plupart des gens cherchent d'abord — « how to autofill », « autofill password », « autofill chrome », « autofill iphone » — et c'est ici que la plupart abandonnent. Voici donc : ce que c'est, comment l'activer partout, et comment le rendre fiable.

## Ce que l'Autofill fait réellement

Trois mécanismes distincts partagent ce nom :

1. **Autofill de formulaire** — une page de connexion est détectée, le gestionnaire propose les entrées correspondantes, vous en touchez une, et le nom d'utilisateur et le mot de passe sont saisis.
2. **Invitations à enregistrer** — après votre connexion, le gestionnaire propose de stocker ou de mettre à jour les identifiants.
3. **Génération de mots de passe** — sur un formulaire d'inscription, le gestionnaire peut créer un mot de passe solide et l'écrire dans le champ pendant que vous tapez.

Le troisième est la partie sous-estimée. Générer un mot de passe *pendant* l'inscription est le meilleur changement d'habitude disponible : il supprime le moment où vous inventeriez autrement quelque chose de faible, parce que le champ est rempli avant que vous ne puissiez taper dessus.

## Activer l'Autofill dans Chrome

Le gestionnaire intégré de Chrome et un gestionnaire tiers occupent le même endroit, ce qui explique la confusion.

1. Ouvrez `chrome://settings/addresses` (mots de passe et Autofill).
2. Activez **Proposer d'enregistrer les mots de passe**.
3. Activez **Se connecter automatiquement avec les mots de passe enregistrés**, si vous voulez une connexion en un toucher.
4. Sous **Mots de passe, passkeys et Autofill**, choisissez le gestionnaire que vous voulez utiliser — celui intégré à Chrome, ou l'extension de votre gestionnaire de mots de passe.
5. Si vous utilisez une extension, ouvrez son popup une fois et confirmez qu'elle est déverrouillée.

La saisie au clavier fonctionne généralement aussi : `Ctrl+Shift+L` sous Windows et Linux, `⌘⇧L` sous macOS. Si une autre extension a déjà revendiqué ce raccourci, remappez-le sous les raccourcis clavier des extensions du navigateur.

## L'Autofill dans Firefox

Firefox a son propre gestionnaire intégré et est plus strict sur les extensions autorisées à saisir. Si les suggestions n'apparaissent pas, vérifiez que l'extension est autorisée sur ce site et qu'elle est déverrouillée. Firefox utilise automatiquement `openkey@openselfhosting.local` pour l'hôte de messagerie native — aucune édition manuelle du manifeste sur cette plateforme.

## L'Autofill sur iPhone et iPad

iOS n'a pas d'interrupteur global « remplir depuis n'importe quelle app » comme Android. Vous utilisez **AutoFill Passwords** dans un flux par app :

1. Installez votre gestionnaire de mots de passe et activez-le comme fournisseur AutoFill dans les réglages système.
2. Dans l'app où vous vous connectez, touchez le champ nom d'utilisateur ou mot de passe et choisissez votre fournisseur dans le menu du champ (ou dans la rangée de mots de passe du clavier).
3. Approuvez avec Face ID / Touch ID quand cela vous est demandé.

Deux habitudes iOS à connaître : si OpenKey n'apparaît pas dans la liste des fournisseurs, il n'a pas été activé dans les réglages système, et iOS a parfois besoin que l'app cible soit redémarrée après un changement de fournisseur. Les [passkeys](/fr/blog/what-are-passkeys) passent aussi par le même sélecteur AutoFill : la même configuration couvre donc les deux.

## L'Autofill sur Android

Android expose un vrai fournisseur système de mots de passe et de passkeys à l'échelle du système, ce qui en fait la plateforme mobile la plus fluide :

1. Ouvrez **Réglages → Sécurité → Service de saisie automatique** et choisissez votre gestionnaire.
2. Accordez les demandes d'autorisation.
3. Dans les réglages de votre gestionnaire, choisissez les **suggestions en ligne** ou une **fenêtre contextuelle**, et éventuellement exigez un élément biométrique avant chaque saisie.
4. Confirmez avec une connexion de test sur un site pour lequel vous avez déjà des identifiants.

Exiger la biométrie avant la saisie est une amélioration réelle : elle referme le trou « quelqu'un s'approche de votre téléphone déverrouillé et lit les mots de passe de votre boîte mail » sans rendre l'Autofill pénible.

## L'Autofill dans les apps de bureau

L'Autofill sur bureau est une poignée de main en deux parties. L'app enregistre un **hôte de messagerie native** lorsque vous activez son réglage Autofill, puis l'extension navigateur parle à l'app déverrouillée via un socket local. Sur macOS, le script hôte a besoin de Python 3 dans votre `PATH` ; sur Linux et Windows, l'app écrit les manifestes pour vous lorsque vous activez le réglage.

Si l'extension n'atteint pas l'app, cette poignée de main en est presque toujours la cause — voir [l'Autofill ne fonctionne pas](/fr/blog/autofill-not-working) pour la liste de vérification complète.

## Configurer l'Autofill OpenKey

| Plateforme | Étapes |
|------------|--------|
| Android | **Réglages → Sécurité** → activer OpenKey comme fournisseur système → déverrouiller le coffre |
| iOS / macOS | Activer OpenKey dans les réglages AutoFill système → accorder les invites de l'OS → redémarrer l'app cible |
| Windows / Linux | **Réglages → Sécurité** → activer l'Autofill pour enregistrer l'hôte natif |
| Navigateur | Construire et charger `openkey_extension` → définir l'URL du serveur, ou choisir **Utiliser l'app de bureau** |

Deux modes de déverrouillage sont disponibles. **Autonome** déverrouille l'extension contre votre serveur auto-hébergé avec votre email et votre mot de passe principal. **Pont bureau** passe par l'app déjà déverrouillée, sans déverrouillage séparé de l'extension — généralement la meilleure expérience au quotidien parce que l'app est le seul endroit où vous déverrouillez.

Le guide complet : [Guide de l'extension navigateur](/fr/guide/extension).

## Pourquoi l'Autofill est aussi une fonctionnalité de sécurité

L'Autofill n'est pas qu'un confort ; c'est un contrôle.

- **Résistance au hameçonnage.** Un gestionnaire qui rattache une connexion à l'origine exacte pour laquelle elle a été enregistrée ne propose rien sur un domaine sosie. Coller manuellement un mot de passe dans une copie convaincante de votre banque est exactement l'attaque que l'Autofill empêche.
- **Moins de copies en texte en clair.** Pas d'app de gestion de mots de passe, pas d'entrée dans l'historique du presse-papiers, pas de mot de passe qui traîne dans un fichier de notes.
- **Rotation naturelle.** Quand un site demande un nouveau mot de passe, en générer un en ligne rend les mots de passe uniques le chemin de la moindre résistance.

## Autofill et passkeys

Les passkeys supprime entièrement le champ mot de passe, donc il n'y a rien à saisir — l'identifiant est récupéré depuis le coffre et signé sur place. Le même déverrouillage que vous utilisez pour l'Autofill couvre WebAuthn, ce qui explique pourquoi configurer le fournisseur une fois fait les deux jobs. [Qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys)

## Ce que disent les données de recherche

L'Autofill est un gros groupe de requêtes, riche en intention. D'après Google Trends (monde, 12 derniers mois), voici les variantes que les gens ajoutent à « autofill » :

| Requête associée | Intérêt relatif |
|-------------------|-----------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

Lisez cela comme un entonnoir : les gens arrivent sans savoir ce qu'est l'Autofill, atterrissent sur une plateforme précise, puis se bloquent sur les réglages. Et au sein du groupe *dépannage* — un ensemble de termes à longue queue comparés entre eux — « autofill not working » atteint à peu près **55%** de la popularité de « autofill extension », ce qui représente une très vaste population dont l'Autofill est cassé et qui a plus besoin d'un correctif que d'un tutoriel.

Les mêmes données montrent « google chrome autofill settings » comme la variante à la plus forte croissance sous le groupe Chrome, en hausse d'environ 70% sur un an.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## Si l'Autofill ne fonctionne pas

Neuf cas sur dix relèvent de l'une de ces cinq choses : le coffre est verrouillé, le mauvais fournisseur est sélectionné dans les réglages système, l'extension n'est pas connectée à l'app, le navigateur a besoin d'un redémarrage après un changement de fournisseur, ou l'Autofill est délibérément restreint à un seul navigateur. Parcourez [l'Autofill ne fonctionne pas](/fr/blog/autofill-not-working) pour la version pas à pas.

## Prochaines étapes

- [L'Autofill ne fonctionne pas](/fr/blog/autofill-not-working) — la liste de vérification complète
- [Extension navigateur](/fr/guide/extension) — installation, modes de déverrouillage, messagerie native
- [Qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys) — l'étape suivante une fois l'Autofill fonctionnel
- [Utiliser l'application](/fr/guide/app) — l'Autofill et les réglages du navigateur en contexte
