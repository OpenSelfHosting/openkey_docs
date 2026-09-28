---
title: "L'Autofill ne fonctionne pas : les correctifs qui marchent vraiment"
description: Pourquoi l'Autofill des mots de passe cesse de fonctionner dans Chrome, Firefox, Safari et sur mobile — les cinq causes courantes et les correctifs, par ordre de probabilité.
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# L'Autofill ne fonctionne pas : les correctifs qui marchent vraiment

L'Autofill casse pour un petit nombre de raisons prévisibles. En pratique la cause n'est presque jamais un bug : c'est un coffre verrouillé, le mauvais fournisseur sélectionné, un pont qui a cessé de se connecter, une app qui a besoin d'être redémarrée, ou un navigateur qui a.discrétement commencé à remplir depuis ailleurs.

Parcourez-les dans l'ordre de probabilité. Cela prend environ cinq minutes et règle l'immense majorité des cas.

## Correctif 1 : déverrouillez le coffre

La cause la plus courante de loin, et la plus facile à manquer, parce que l'app *paraît* installée et activée.

- **Extension en mode autonome :** ouvrez le popup de l'extension et déverrouillez-la. Une extension verrouillée ne peut rien déchiffrer, elle ne propose donc rien.
- **Mode pont bureau :** l'app de bureau doit être déverrouillée. Le pont refuse de travailler tant que le coffre est verrouillé, par conception.
- **Mobile :** ouvrez l'app et déverrouillez-la avant de concentrer le champ. Le verrouillage sur inactivité met aussi l'Autofill en pause.

Si les suggestions n'apparaissent qu'immédiatement après votre déverrouillage puis disparaissent, voilà votre réponse.

## Correctif 2 : vérifiez le fournisseur système

Changer de gestionnaire de mots de passe ne change pas toujours ce que l'OS propose.

| Plateforme | Où vérifier |
|------------|--------------|
| Android | Réglages → Sécurité → **Service de saisie automatique** |
| iOS / iPadOS | Réglages → Mots de passe → **AutoFill Passwords** |
| macOS | Réglages Système → Général → **AutoFill et Mots de passe** |
| Windows | Réglages → Comptes → **Mots de passe** (fournisseurs d'identifiants) |
| Chrome | Réglages → Mots de passe, passkeys et Autofill → **Gestionnaire de mots de passe** |

Si deux gestionnaires sont activés, l'OS en choisit un et l'autre semble cassé. Désactivez celui que vous ne voulez pas, ou choisissez délibérément celui que vous voulez — et confirmez le même choix dans le navigateur.

## Correctif 3 : redémarrez l'app ou le navigateur cible

Changer de fournisseur d'identifiants ne prend pas toujours effet dans un processus déjà en cours d'exécution. C'est normal, pas un bug :

- Mobile : forcez la fermeture de l'app dans laquelle vous essayez de saisir, puis rouvrez-la.
- Bureau : quittez complètement le navigateur (pas seulement la fenêtre) et rouvrez-le.
- Si c'est le navigateur qui pose problème, redémarrez-le avant de changer quoi que ce soit d'autre — un rechargement d'extension réenregistre souvent l'hôte natif.

## Correctif 4 : reconnectez le pont bureau

L'Autofill sur bureau est une poignée de main en deux parties : l'app enregistre un hôte de messagerie native, et l'extension lui parle via un socket local. Elle échoue quand l'enregistrement de l'hôte est absent ou périmé.

1. Déverrouillez l'app de bureau OpenKey.
2. Ouvrez **Réglages → Sécurité** et basculez l'Autofill — cela (ré)enregistre l'hôte de messagerie native.
3. Sur les navigateurs Chromium, écrivez l'ID de votre extension non empaquetée dans le fichier de la plateforme, puis rebasculer l'Autofill pour que le manifeste se régénère :

| Plateforme | Fichier d'ID d'extension |
|------------|--------------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. Dans l'extension, choisissez **Utiliser l'app de bureau**.
5. macOS uniquement : confirmez que Python 3 est dans votre `PATH` — le script hôte en a besoin.

Assurez-vous aussi que le coffre est **toujours déverrouillé** au moment du test. Le socket du pont n'existe que pendant une session déverrouillée.

## Correctif 5 : vérifiez s'il y a un gestionnaire concurrent

Chrome et Edge intègrent tous deux un stockage de mots de passe natif, et tous deux continueront volontiers à remplir tout seuls. Si les suggestions « disparaissent » et que les identifiants sont tout de même remplis, c'est le gestionnaire intégré qui le fait.

- Désactivez la connexion automatique avec les mots de passe enregistrés dans les réglages du navigateur, ou
- Supprimez l'entrée intégrée et laissez votre gestionnaire posséder la connexion.

Le même conflit apparaît entre iCloud Keychain et un fournisseur AutoFill tiers, et entre deux extensions qui demandent toutes deux `<all_urls>`.

## Causes propres à chaque plateforme

### Chrome

Accès de l'extension aux sites : `chrome://extensions` → votre extension → **Détails** → Accès aux sites → *Sur tous les sites*, ou *Au clic* si vous préférez des autorisations explicites. L'Autofill a besoin d'accéder à la page pour détecter les champs.

Si une autre extension a revendiqué le raccourci de saisie, remappez-le sous `chrome://extensions/shortcuts`.

### Firefox

Firefox demande une permission la première fois qu'une extension veut remplir sur un site, et refuse silencieusement certaines requêtes tous-sites. Vérifiez les permissions de l'extension dans `about:addons` → Permissions → Accès à vos données pour tous les sites web.

Firefox utilise automatiquement l'hôte natif `openkey@openselfhosting.local` ; aucun travail manuel sur le manifeste n'est nécessaire sur cette plateforme.

### Safari

L'AutoFill de Safari et votre gestionnaire sont des panneaux distincts. Activez le gestionnaire dans les Réglages Système, puis dans Safari assurez-vous que l'Autofill **Mots de passe** est activé. Safari peut aussi remplir automatiquement avec un *autre* fournisseur d'identifiants si l'ordre dans les réglages système a changé — vérifiez l'ordre de sélection, pas seulement l'interrupteur.

### iOS et Android

- **État par app :** iOS ne propose des fournisseurs que dans le menu d'un champ, donc le symptôme est « l'option n'est pas là » plutôt que « il a rempli la mauvaise chose ».
- **Invites d'autorisation :** l'OS demande des autorisations de réseau local ou biométriques pendant la configuration. Une invite refusée ressemble à un gestionnaire cassé.
- **Biométrie avant saisie :** si vous avez activé la biométrie avant saisie, chaque saisie exige désormais une approbation. C'est le comportement correct, pas un défaut.
- **Restrictions en arrière-plan :** les optimiseurs de batterie agressifs sur Android peuvent tuer le processus du fournisseur, si bien que les suggestions n'apparaissent que tant que l'app est au premier plan.

## Diagnostiquer avec l'audit d'Autofill du navigateur

Les navigateurs fournissent un diagnostic qui rapporte chaque champ détecté, chaque suggestion proposée, et la raison de tout rejet. Cela transforme les suppositions en un processus de deux minutes.

Dans Chrome, ouvrez DevTools → **Application** → **Autofill**, puis reproduisez la saisie sur la page. Vous obtenez les champs détectés, les éléments de liste déroulante proposés, et la raison de toute suppression. `autofill.creditCards` et `autofill.profiles` peuvent aussi être basculés dans `chrome://flags` quand c'est l'Autofill des cartes ou des adresses qui échoue.

Firefox : `about:debugging` → inspectez l'extension, et vérifiez sa console pour les erreurs au moment de la saisie.

## Si vous utilisez OpenKey spécifiquement

| Symptôme | Vérification |
|----------|--------------|
| Aucune suggestion dans le navigateur | Extension déverrouillée, ou app de bureau déverrouillée et **Utiliser l'app de bureau** sélectionné |
| « L'extension ne peut pas parler à l'app de bureau » | Enregistrement de l'hôte natif, fichier d'ID d'extension, Python 3 sur macOS |
| Rien sur Android | **Réglages → Sécurité → Autofill** activé dans Android, puis déverrouiller l'app |
| Rien sur iOS | Fournisseur AutoFill activé dans les réglages système ; redémarrer l'app cible |
| Les passkeys basculent vers le navigateur | Attendu quand vous choisissez **Utiliser le navigateur**, ou quand le coffre de l'extension est verrouillé |
| La saisie fonctionne, l'enregistrement non | Confirmez que la bannière d'enregistrement de la page n'est pas bloquée par la page |

L'extension a besoin d'un accès hôte `<all_urls>` pour détecter les champs, capturer les connexions et intercepter WebAuthn sur des sites arbitraires — une liste blanche fixe ne peut pas couvrir le web ouvert. Tout ce qu'elle déchiffre reste sur votre appareil ou sur votre propre serveur ; le contenu des pages n'est pas envoyé à un cloud de fournisseur.

## Ce que disent les données de recherche

C'est un gros groupe de requêtes, ce qui est un bon signe pour quiconque s'y est heurté. En comparant les termes de dépannage d'Autofill à longue queue entre eux (Google Trends, monde, 12 derniers mois) :

| Requête | Intérêt relatif dans le groupe |
|---------|-------------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

Le fait qu'« autofill not working » atteigne plus de la moitié de l'intérêt du terme générique « autofill extension » signifie qu'une très vaste audience arrive déjà en état de panne. Sous le groupe Chrome plus précisément, « google chrome autofill settings » est la première requête associée à 100 et celle à la plus forte croissance, à environ +70% sur un an, avec « chrome autofill extension » à 62 et « chrome autofill not working » à 16.

Cette distribution suggère une stratégie de support précise : du contenu orienté réglages et une liste de vérification de dépannage fiable toucheront plus de monde qu'une nouvelle annonce de fonctionnalité.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en 30 secondes

Déverrouillez le coffre. Confirmez que le bon fournisseur système est sélectionné. Redémarrez l'app ou le navigateur. Rebasculez l'Autofill dans l'app pour réenregistrer l'hôte natif. Désactivez tout gestionnaire concurrent. Si cela échoue encore, ouvrez l'audit d'Autofill du navigateur et lisez la raison du rejet — elle nomme le problème.

## Prochaines étapes

- [Autofill des mots de passe](/fr/blog/autofill-passwords) — le guide de configuration
- [Extension navigateur](/fr/guide/extension) — modes de déverrouillage et détail de la messagerie native
- [FAQ et dépannage](/fr/guide/faq) — correctifs propres à OpenKey
- [Qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys) — le type d'identifiant qui remplace les mots de passe
