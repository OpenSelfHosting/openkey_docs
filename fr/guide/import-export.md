# Import et export

Déplacez des mots de passe entre OpenKey et d’autres gestionnaires, ou prenez une sauvegarde chiffrée du coffre complet. Chemin : **Réglages → Données → Import et export** (et **Sauvegarde et restauration** pour `.okbak`).

| Action | Gratuit | Pro |
|--------|------|-----|
| Import (tous les formats ci-dessous) | Oui | Oui |
| Export (tous les formats ci-dessous) | — | Oui |
| Sauvegarde / restauration locale chiffrée (`.okbak`) | — | Oui |

Les exports et sauvegardes déchiffrent sur l’appareil avant d’écrire un fichier — traitez chaque export comme **secret**. Préférez un stockage chiffré hors ligne. Voir [FAQ](./faq) et [Gratuit vs Pro](./app#gratuit-vs-openkey-pro).

## Parcours d’import

1. Déverrouillez OpenKey.
2. **Réglages → Données → Import et export → Import**.
3. Choisissez un format, sélectionnez le fichier, confirmez.
4. Vérifiez les nouvelles entrées/collections dans le coffre. Synchronisez vers votre [serveur](./server) si vous en utilisez un.

### Bitwarden JSON

1. Dans Bitwarden : exportez en **JSON** (export non chiffré — protégez le fichier).
2. Dans OpenKey : Import → **Bitwarden JSON**.
3. Les dossiers correspondent aux collections autant que possible ; les connexions deviennent des entrées.

### Chrome / Edge CSV

1. Gestionnaire de mots de passe du navigateur → exporter CSV.
2. OpenKey → Import → **Chrome CSV**.
3. Attendez-vous aux colonnes url / username / password ; les champs personnalisés peuvent être limités.

### LastPass CSV

1. LastPass → exporter CSV.
2. OpenKey → Import → **LastPass CSV**.

### 1Password CSV

1. 1Password → exporter CSV (format pris en charge par l’importeur OpenKey).
2. OpenKey → Import → **1Password CSV**.
3. Les types d’éléments complexes peuvent se aplatir en entrées de type connexion.

### KeePass (`.kdbx`)

1. OpenKey → Import → **KeePass `.kdbx`**.
2. Saisissez le mot de passe de la base et le **fichier de clé** optionnel.
3. Les groupes deviennent des collections ; les entrées s’importent comme connexions lorsque les champs se mappent proprement.

Mauvais mot de passe / fichier de clé → déverrouillage échoué ; pas d’aller-retour serveur (tout local).

### OpenKey JSON

Format aller-retour pour les exports natifs OpenKey. À utiliser pour déplacer entre appareils sans sync serveur, ou comme dump portable du coffre (**Pro** pour créer le fichier).

**Pièces jointes :** les exports JSON OpenKey incluent les *métadonnées* de pièces jointes sur les entrées mais **omettent les blobs ciphertext** des pièces jointes. Pour un coffre complet avec pièces jointes, utilisez plutôt une sauvegarde chiffrée **`.okbak`**.

## Parcours d’export (Pro)

1. **Réglages → Données → Import et export → Export**.
2. Choisissez le format. Pour KeePass, définissez un nouveau mot de passe de base (et un fichier de clé optionnel).
3. Enregistrez le fichier quelque part chiffré / hors ligne.
4. Supprimez les exports en clair une fois la migration terminée.

Exports disponibles : **OpenKey JSON**, **Bitwarden JSON**, **Chrome CSV**, **LastPass CSV**, **KeePass `.kdbx`**, **1Password CSV**.

## Sauvegarde chiffrée (Pro)

**Réglages → Données → Sauvegarde et restauration**

- Crée un `.okbak` du coffre complet (base, réglages, pièces jointes) chiffré pour restauration avec vos credentials de coffre.
- La restauration remplace les données locales du coffre — confirmez avant de continuer.
- Nearby / sync serveur n’est **pas** une sauvegarde ([FAQ](./faq)).

## Après migration depuis un autre gestionnaire

1. Vérifiez les connexions importantes (et le TOTP si vous l’utilisiez).
2. Activez [autofill](./app) / [extension](./extension).
3. Synchronisez vers votre serveur ou appariez Nearby (Pro) pour les autres appareils.
4. Effacez de façon sécurisée les anciens fichiers d’export.
5. Optionnellement, changez les mots de passe qui ont vécu dans un CSV non chiffré pendant le transfert.

## Voir aussi

- [Partage et organisations](./sharing) — ciphertext d’équipe sur votre serveur
- [Utiliser l’application](./app)
- [Sécurité](./security) — les exports sont du matériel de confiance

Suivant : [Télécharger](./download) · [FAQ](./faq) · [CLI](./cli)
