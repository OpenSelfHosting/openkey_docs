---
title: "Google Password Manager : quand rester et quand partir"
description: Ce que Google Password Manager fait bien, où il s'arrête, comment exporter depuis celui-ci, et comment sortir vos mots de passe de l'écosystème Chrome vers un coffre que vous contrôlez.
date: 2026-09-21
cover: /blog/covers/google-password-manager.png
---

# Google Password Manager : quand rester et quand partir

« google password manager » est la seule variante la plus forte du terme générique **password manager** — un intérêt relatif parfait de 100, devant toutes les marques concurrentes. « google password » n'est pas très loin derrière à 93. Ce n'est pas un hasard : une grande partie des gens qui cherchent « password manager » en utilisent déjà un sans le savoir, parce que Google l'a activé pour eux.

La question utile n'est donc pas « est-ce bon ? » — il est très bon. La question est **quand rester et quand partir**.

## Ce que vous avez déjà

Google Password Manager est intégré à Chrome et à Android, et fonctionne sur d'autres navigateurs via un compte Google. Il stocke les mots de passe, les passkeys, les codes et les cartes de paiement, génère des mots de passe, signale les identifiants compromis et fait l'Autofill sur vos appareils Google. Il est gratuit, et il est réellement compétent.

Pour beaucoup de gens, dans un seul écosystème, c'est la bonne réponse sans qu'il faille y réfléchir davantage.

## Les cinq raisons qui font partir les gens

### 1. L'enfermement dans l'écosystème

Le coffre vit dans un compte Google. C'est excellent jusqu'à ce que vous vouliez partir — et à ce moment-là vos mots de passe sont dans un format d'export Google, et tout ce que vous avez construit autour (familles, partage, clés matérielles) est venu avec.

### 2. Le partage hors de l'écosystème

Le partage fonctionne bien entre comptes Google et est maladroit avec tout le monde. Si quelqu'un dans votre foyer ou votre équipe n'est pas sur Google, vous finissez par dupliquer des entrées ou par revenir à quelque chose de non sécurisé.

### 3. Aucun auto-hébergement

Il n'existe aucune option pour exécuter la sync sur votre propre matériel. Si garder des données chiffrées sur une infrastructure que vous contrôlez est une exigence, c'est éliminatoire et non une préférence.

### 4. Le couplage au navigateur

Si vous utilisez Firefox ou Safari, le gestionnaire de Chrome n'est pas votre fournisseur d'Autofill natif. Vous revenez à une extension tierce ou au magasin de la plateforme, et l'avantage d'intégration disparaît.

### 5. Le modèle de sécurité est un compromis

Le coffre est protégé par les identifiants de votre compte Google et par le déverrouillage de l'appareil, avec la récupération de compte Google comme filet. C'est une conception raisonnable — mais c'est un modèle de confiance fondamentalement différent d'un coffre zero-knowledge où personne, le fournisseur compris, ne peut récupérer vos données. Ni l'un ni l'autre n'est faux. Ce sont deux réponses différentes à « qui est le secours si j'oublie mon mot de passe principal », et vous devez choisir la réponse avec laquelle vous êtes à l'aise plutôt que la plus facile.

## Rester : rendre Google Password Manager vraiment bon

Si vous restez, voici les réglages qui comptent :

1. **Activez les passkeys** là où les sites en proposent — c'est l'identifiant le plus solide et le gestionnaire les gère bien.
2. **Activez le générateur intégré à l'inscription**, pour que les nouveaux mots de passe ne soient jamais inventés.
3. **Consultez le Password Checkup** (Sécurité → Password Checkup) et agissez sur les entrées réutilisées ou compromises.
4. **Ajoutez une adresse email de récupération et un numéro de récupération** que vous contrôlez réellement.
5. **Ajoutez un passkey comme second facteur** sur le compte Google lui-même — pas seulement un mot de passe.
6. **Activez la sync chiffrée** si elle est proposée dans votre région, et ne laissez jamais un profil de navigateur connecté déverrouillé sur une machine partagée.

## Partir : exporter depuis Chrome

L'export de Chrome est un CSV simple. Il est rapide, et c'est le fichier que les gens laisse le plus souvent traîner par accident — traitez-le comme une copie vivante de vos mots de passe.

```bash
# Take a backup of the export before you do anything else
cp passwords.csv ~/secure-backup-dir/chrome-export-$(date +%F).csv
```

1. Ouvrez `chrome://password-manager/settings`.
2. Repérez **Exporter les mots de passe** (ou `chrome://password-manager/export`).
3. Enregistrez le CSV.
4. **Immédiatement**, déplacez-le hors de votre dossier Téléchargements vers un stockage chiffré.

Le CSV contient les colonnes `name`, `url`, `username`, `password` et `note`. Les champs personnalisés sont limités, et les cartes peuvent arriver dans un export séparé selon la configuration de votre compte.

## Importer dans un gestionnaire que vous contrôlez

Dans OpenKey : **Réglages → Données → Import et export → Import → Chrome CSV**. Choisissez le fichier, confirmez, et l'import s'exécute localement — votre texte en clair ne part pas vers un serveur.

Ce à quoi vous attendre : les connexions arrivent comme des entrées, `url` devient la correspondance de site, `username` et `password` se mappent directement, et `note` devient le champ de notes de l'entrée. Chrome n'a pas de dossiers imbriqués dans son export, vous voudrez donc construire une structure de collections ensuite — la plus utile étant des **collections par niveau de confiance** (finance, travail, achats, jetables) plutôt que par site.

Ensuite :

1. **Activez l'Autofill** dans le nouveau gestionnaire avant de faire quoi que ce soit d'autre ([guide de configuration](/fr/blog/autofill-passwords)).
2. **Désactivez l'Autofill de Chrome** pour que les deux ne se battent pas : `chrome://settings/addresses` → désactivez la connexion automatique avec les mots de passe enregistrés, et définissez le gestionnaire de mots de passe sur le nouveau.
3. **Supprimez votre magasin de mots de passe Chrome** une fois le nouveau coffre vérifié — `chrome://password-manager/settings` → **Supprimer les mots de passe de Chrome**.
4. **Supprimez le CSV de manière sécurisée.**
5. **Renouvelez les mots de passe importants** qui ont passé du temps en texte en clair : email, banque, cloud.

Procédure complète, y compris le dépannage : [Importer les mots de passe depuis Chrome](/fr/blog/import-passwords-from-chrome).

## Une structure de collections suggérée

Une fois importé, réorganisez par la confiance plutôt que par l'habitude :

| Collection | Contenu | Traitement |
|-----------|----------|----------|
| Finance | Banque, paiements, impôts | 2FA plus passkey dès que possible |
| Identité | Email, gouvernement, racine cloud | Mots de passe les plus solides, passkeys, sauvegarde par clé matérielle |
| Travail | Comptes de l'employeur | Jamais réutilisés ; à vérifier au départ |
| Achats | Tout ce qui est jetable | Mots de passe longs et aléatoires, aucun effort de 2FA |
| Appareils | Routeur, NAS, caméra, maison connectée | Générés, stockés aussi hors ligne |

## Ce que disent les données de recherche

La marque Google est le centre de gravité de cette catégorie. Google Trends (monde, 12 derniers mois), variantes de « password manager » :

| Requête associée | Intérêt relatif |
|---------------|-------------------|
| **google password manager** | **100** |
| google password | 93 |
| what is a password manager | 39 |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| windows password manager | 8 |
| apple password manager | 8 |
| microsoft password manager | 7 |
| bitwarden | 7 |
| gmail password manager | 5 |
| samsung password manager | 5 |
| 1password | 4 |

Lisez attentivement la forme de ce tableau. Les quatre intégrés de plateforme — Google, Windows, Apple, Microsoft — apparaissent tous, et la variante « app » de la requête se résout en « google password manager app » à 100. Entre-temps les termes de marque dédiés sont bien plus bas : Bitwarden à 7, 1Password à 4.

Le trafic de recherche de la catégorie est très majoritairement du « j'en ai déjà un, c'est très bien » plutôt que du « aidez-moi à choisir ». Deux conséquences pour quiconque publie dans cet espace : une grande partie des chercheurs a besoin de contenu sur la migration et le dépannage plus que de guides d'achat, et les intégrés de plateforme se concurrencent sur les réglages par défaut plutôt que sur les fonctionnalités.

Un groupe distinct montre le même schéma — sous « password manager android », « google password manager android » arrive en tête à 100, avec « chrome password manager android » à 20 et « best free password manager android » en hausse d'environ 80% sur un an. Sous « chrome password manager », la seule requête associée forte est « chrome password manager security » à 100, elle-même en hausse d'environ 50%, ce qui se lit comme des gens qui demandent si c'est sûr plutôt que comment s'en servir.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en une minute

Google Password Manager est gratuit, bon, et la bonne réponse si toute votre vie est dans un seul écosystème Google et que vous acceptez Google comme chemin de récupération. Quittez-le si vous avez besoin de partager avec des comptes non Google, d'une Autofill native inter-navigateurs, ou de votre propre serveur. Si vous partez, exportez le CSV, importez-le localement, activez l'Autofill dans le nouveau gestionnaire, désactivez celui de Chrome, supprimez les mots de passe stockés par Chrome, broyez le CSV, et renouvelez tout ce qui a été en texte en clair.

## Prochaines étapes

- [Importer les mots de passe depuis Chrome](/fr/blog/import-passwords-from-chrome) — la procédure complète
- [Qu'est-ce qu'un gestionnaire de mots de passe ?](/fr/blog/what-is-a-password-manager) — les fondamentaux
- [Autofill des mots de passe](/fr/blog/autofill-passwords) — rendre la bascule transparente
- [Gestionnaire de mots de passe auto-hébergé](/fr/blog/self-hosted-password-manager) — la voie où vos données vous appartiennent
