---
title: Importer les mots de passe depuis Chrome
description: Comment exporter les mots de passe depuis Chrome, Edge et Google Password Manager, les importer dans un autre gestionnaire de mots de passe, puis supprimer l'export en toute sécurité.
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Importer les mots de passe depuis Chrome

L'export est la partie facile. La partie dangereuse est les dix minutes qui suivent, lorsqu'un CSV en texte en clair contenant chaque mot de passe que vous possédez est posé dans votre dossier Téléchargements.

Voici le processus complet : exporter depuis Chrome, Edge ou Google Password Manager ; importer dans votre nouveau coffre ; vérifier ; puis détruire le fichier. Prévoyez quinze minutes la première fois.

## D'abord, comprenez ce que vous êtes sur le point de créer

Un export de mots de passe Chrome est un **CSV en texte en clair**. Quiconque l'ouvre a vos mots de passe — pas de mot de passe principal, pas de chiffrement, pas de second facteur. Traitez-le comme une liste imprimée des clés de votre maison.

Trois règles pour toute la procédure :

1. **Ne l'envoyez jamais par email, par message, et ne le téléversez jamais sur un site de conversion.** Téléverser un export de mots de passe vers un outil tiers « convertis mon CSV » revient à livrer votre coffre entier.
2. **Faites l'import sur l'appareil où le fichier se trouve déjà.** Déplacer le fichier multiplie votre exposition.
3. **Supprimez l'export dès que l'import est vérifié** — correctement, pas seulement en vidant la corbeille.

## Exporter depuis Chrome

Le gestionnaire intégré de Chrome et Google Password Manager (la version synchronisée par compte) passent par le même chemin d'export, et les deux sont couverts.

1. Ouvrez `chrome://password-manager/settings`.
2. Faites défiler jusqu'à **Exporter les mots de passe**, ou allez directement à `chrome://password-manager/export`.
3. Chrome vous demande de vous ré-authentifier — saisissez le mot de passe de votre compte Google ou vos identifiants d'appareil.
4. Enregistrez le fichier, puis **sortez-le de Téléchargements** vers un emplacement chiffré avant de faire quoi que ce soit d'autre.

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### Ce que contient le fichier

| Colonne | Contenu |
|--------|----------|
| `name` | Le nom du site tel que Chrome l'a enregistré |
| `url` | L'URL complète, y compris le sous-domaine |
| `username` | Votre nom d'utilisateur ou votre email |
| `password` | Le mot de passe, en texte en clair |
| `note` | Toute note que vous avez ajoutée |

Il n'y a pas de structure de dossiers — Chrome n'a pas de dossiers. Tout arrive à plat, ce qui explique pourquoi l'étape des collections qui suit compte.

## Exporter depuis Edge

Microsoft Edge utilise le même magasin de mots de passe Chromium :

1. Ouvrez `edge://wallet/passwords`.
2. **Plus de paramètres → Exporter les mots de passe**, ou allez à `edge://wallet/exportpasswords`.
3. Ré-authentifiez-vous, enregistrez, déplacez le fichier vers un emplacement chiffré.

## Exporter directement depuis Google Password Manager

Si vous utilisez le gestionnaire synchronisé par compte sur plusieurs appareils, vous pouvez exporter depuis n'importe quel navigateur connecté à `passwords.google.com` → **Exporter les mots de passe**. Cela produit le même CSV, et les mêmes règles s'appliquent.

## Importer dans OpenKey

1. Installez et déverrouillez OpenKey.
2. **Réglages → Données → Import et export → Import**.
3. Choisissez **Chrome CSV**.
4. Sélectionnez le fichier et confirmez.

L'import est entièrement local. Il n'y a aucun aller-retour serveur, et votre texte en clair ne va pas vers un serveur de sync — ce qui compte si vous utilisez un serveur auto-hébergé, parce que le CSV ne devient jamais quelque chose que le serveur pourrait être chargé de produire.

Autres formats pris en charge, si vous consolidez plusieurs sources à la fois : **Bitwarden JSON**, **LastPass CSV**, **1Password CSV**, **KeePass `.kdbx`** (mot de passe de base et fichier de clé optionnel), et le JSON natif d'OpenKey. Les dossiers deviennent des collections là où le mappage fonctionne.

## Réorganiser : construire des collections par niveau de confiance

L'import est à plat, et les coffres à plat se remplissent de mots de passe réutilisés parce que vous ne voyez pas le risque. Trente minutes de rangement se rentabilisent :

| Collection | Ce qu'elle contient | Règle |
|-----------|-----------------|------|
| Identité | Email, racine cloud, gouvernement | Mots de passe les plus solides, passkeys, une sauvegarde par clé matérielle |
| Finance | Banque, cartes de paiement, impôts | 2FA partout ; passkeys là où c'est proposé |
| Travail | Comptes de l'employeur | Jamais réutilisés ; liste de contrôle au départ |
| Achats et social | Tout ce qui est jetable | Mots de passe longs générés, aucun effort dépensé |
| Appareils | Routeur, NAS, caméras, maison connectée | Générés ; aussi stockés hors ligne |

Puis fixez-vous une règle : **rien de nouveau n'entre dans Achats ou Social avec un mot de passe réutilisé.** Avec l'Autofill activé, cela arrive de toute façon automatiquement.

## Activez l'Autofill immédiatement

C'est l'étape qui rend la migration auto-réparatrice. Une fois l'Autofill fonctionnel, chaque connexion à partir de maintenant est enregistrée pour vous, si bien que le coffre s'améliore tout seul pendant que vous traitez les comptes importants.

- [Autofill des mots de passe](/fr/blog/autofill-passwords) — le guide de configuration
- [L'Autofill ne fonctionne pas](/fr/blog/autofill-not-working) — quand les suggestions manquent

Puis **désactivez l'Autofill de Chrome lui-même** pour que les deux ne se disputent pas :

1. `chrome://settings/addresses`.
2. Désactivez **Proposer d'enregistrer les mots de passe** et **Se connecter automatiquement avec les mots de passe enregistrés**.
3. Définissez le gestionnaire de mots de passe sur celui que vous voulez utiliser.

## Corriger les comptes les plus précieux

Ne renouvelez pas 400 mots de passe. Descendez une liste :

1. **Email** — il réinitialise tout le reste.
2. **Banque et stockage cloud** — le cloud peut contenir le reste.
3. **Votre compte social principal**.
4. Tout le reste, au fil des demandes de chaque site.

Générez chaque mot de passe localement au fur et à mesure :

```bash
openkey gen -l 24 -c
```

Ajoutez la 2FA pendant que vous êtes déjà dans les réglages de sécurité ([guide](/fr/blog/two-factor-authentication)), et ajoutez un passkey partout où le site en propose un ([qu'est-ce qu'un passkey ?](/fr/blog/what-are-passkeys)).

## Vérifiez avant de supprimer quoi que ce soit

Ne sautez pas cette étape. Vérifiez :

- [ ] Une poignée de connexions importantes s'ouvrent correctement depuis le nouveau coffre.
- [ ] Les entrées TOTP, si vous en aviez, produisent des codes valides.
- [ ] L'Autofill fonctionne dans votre navigateur principal **et** sur votre téléphone.
- [ ] Vous pouvez vous connecter sur un **second appareil** et voir les mêmes entrées.
- [ ] Vous avez pris une **sauvegarde locale chiffrée** (`.okbak` dans OpenKey).

Ne proceed à la suppression qu'ensuite.

## Supprimer l'export, correctement

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` est plus fiable quand il est disponible, mais aucune de ces approches n'est fiable sur les SSD et les systèmes de fichiers copy-on-write. La réponse pratique est d'écraser ce que vous pouvez, puis de renouveler tout ce qui a séjourné en texte en clair assez longtemps pour s'inquiéter.

Un mot de passe dans un CSV en texte en clair pendant une semaine n'est pas une crise ; le même mot de passe toujours dans ce fichier un an plus tard en est une.

Puis supprimez la copie stockée par le navigateur : `chrome://password-manager/settings` → **Supprimer les mots de passe de Chrome**.

## Ce que disent les données de recherche

La migration est une intention large et précise — le chercheur sait ce qu'il veut *faire*, pas ce qu'il veut acheter. Google Trends (monde, 12 derniers mois) compare ces termes de migration entre eux :

| Requête | Intérêt relatif dans le groupe |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

Les deux premières sont toute l'histoire, et le rapport entre elles est l'enseignement utile : **les gens cherchent l'export plus de deux fois plus que l'import.** C'est le mauvais sens pour la sécurité, parce que l'export crée l'artefact exposé et que l'import est la partie qui règle le problème. Un contenu qui commence par le chemin d'export devrait immédiatement renvoyer vers l'import, puis vers l'étape de suppression.

La longue queue est aussi mince et largement formulée en anglais natif, ce qui suggère un public petit et bien défini qui connaît déjà le vocabulaire — le genre de lecteur qui bénéficie davantage d'une procédure précise que d'une comparaison.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

Exportez depuis `chrome://password-manager/settings`, sortez immédiatement le CSV en texte en clair de Téléchargements, importez-le localement dans votre nouveau coffre, construisez des collections par niveau de confiance, activez l'Autofill et désactivez celui de Chrome, renouvelez l'email et la banque, vérifiez sur un second appareil, puis écrasez et supprimez le CSV et retirez la copie stockée par Chrome.

## Prochaines étapes

- [Autofill des mots de passe](/fr/blog/autofill-passwords) — faites ceci avant de renouveler quoi que ce soit
- [Google Password Manager](/fr/blog/google-password-manager) — la même procédure, cadrée autour de l'écosystème Google
- [Générateur de mots de passe solides](/fr/blog/strong-password-generator) — vers quoi renouveler
- [Import et export](/fr/guide/import-export) — tous les formats pris en charge, gratuit vs Pro
