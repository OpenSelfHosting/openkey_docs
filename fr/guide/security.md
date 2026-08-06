# Sécurité

OpenKey est conçu pour que le serveur ne puisse pas lire votre coffre.

## Dérivation des clés

<img src="/guide/security-key-derivation.svg" alt="Key derivation: Argon2id turns email and master password into a master key, which yields an auth hash for login and a wrapped vault key for AES-256-GCM ciphertext" class="ok-diagram" width="920" height="400" />

1. `Argon2id(email + master_password, salt)` produit une clé maître.
2. La clé maître dérive un **auth hash** (envoyé au serveur pour la connexion) et enveloppe la **clé de coffre**.
3. La clé de coffre chiffre les noms de collections et les charges d’entrées (**AES-256-GCM**).
4. La clé de chiffrement de la base locale est dérivée de la clé de coffre.
5. Le mot de passe principal ne quitte jamais l’appareil.

## Ce que stocke le serveur

| Stocké | Non stocké |
|--------|------------|
| `auth_hash` | Mot de passe principal |
| Sel et paramètres KDF | Clé de coffre en clair |
| Clé de coffre enveloppée (chiffrée) | Noms de collections déchiffrés |
| Ciphertext opaque pour données de coffre, pièces jointes, orgs, partages | Charges d’entrées en clair |
| Entrées partagées d’org (`encrypted_payload` sous collections d’org) | Clé d’org en clair (les clients déballent via les clés d’org enveloppées) |

Les éléments de coffre soft-supprimés restent des **tombstones** jusqu’à la sync des pairs ; le last-write-wins utilise le `revision` par élément.

## Jetons

- Les JWT d’accès sont de courte durée.
- Les jetons de rafraîchissement sont hachés au repos et rotés à l’usage.
- Les endpoints d’auth sont limités en débit par IP client.

## Modèle de menace

### Frontières de confiance

| Composant | Hypothèse de confiance |
|-----------|------------------|
| Appareil / coffre local | Racine de confiance tant que déverrouillé ; l’utilisateur OS peut lire la mémoire et le fichier de base chiffrée |
| Serveur de sync auto-hébergé | Non digne de confiance pour la confidentialité — ciphertext uniquement ; digne de confiance pour la disponibilité et la comparaison d’auth-hash |
| Extension navigateur | Digne de confiance avec le clair du coffre après déverrouillage ; les pages web non dignes de confiance ne doivent pas recevoir de secrets au-delà de l’autofill intentionnel. `<all_urls>` est requis pour le remplissage/capture/WebAuthn universels — voir [Extension navigateur](./extension#permissions). |
| Hôte de messagerie native | Pont local uniquement vers l’app bureau déverrouillée ; réponses du coffre déverrouillé seulement |
| CLI / pont bureau | Même confiance locale que la session d’app déverrouillée |
| Appariement Nearby / LAN | Les pairs appariés partagent une clé de session ; après **Lier le coffre**, ils échangent le même matériau de clé de coffre et synchronisent le ciphertext sur le LAN — traitez appariement + liaison comme une confiance totale au coffre |

### Ce que les attaquants peuvent et ne peuvent pas faire

| Attaquant | Peut | Ne peut pas (par conception) |
|----------|-----|---------------------|
| Admin serveur compromis | Supprimer/retenir le ciphertext, remplacer des blobs, observer des métadonnées (email, tailles, timings) | Déchiffrer les entrées du coffre, récupérer le mot de passe principal depuis `auth_hash` seul |
| MITM réseau (sans TLS) | Intercepter JWT et ciphertext en transit | Lire le clair sans la clé de coffre |
| Appareil verrouillé volé | Attaque hors ligne sur le coffre enveloppé Argon2id (mot de passe principal fort requis) | Déverrouiller sans le mot de passe principal / enveloppe biométrique |
| Appareil déverrouillé volé | Lire le clair du coffre depuis la mémoire / session active | — (hors périmètre) |
| Page web malveillante | Déclencher l’UI d’autofill ; tenter du phishing | Lire le coffre entier via content scripts sans médiation utilisateur/extension |
| Pair org/partage malveillant | Partager du ciphertext qu’il peut déchiffrer avec les clés que vous avez enveloppées pour lui | Déchiffrer des éléments de coffre personnel non liés |
| Pair Nearby malveillant | Envoyer des entrées / revendiquer LAN Pro / recevoir le ciphertext du coffre après liaison | Débloquer Pro sur les plateformes IAP magasin (Android/iOS/macOS ignorent LAN Pro) ; déchiffrer le ciphertext LAN sans la clé de coffre partagée |

### Non-objectifs explicites

- **Pas de récupération du mot de passe principal** — si vous le perdez, le ciphertext est irrécupérable.
- **Le serveur ne peut pas déchiffrer** les charges de coffre, pièces jointes, org ou partages.
- **La sync est LWW par revision**, pas un CRDT — des éditions concurrentes peuvent s’écraser ; le serveur renvoie les lignes gagnantes quand un push obsolète perd. La **sync de coffre Nearby sur le LAN** utilise la même règle LWW entre appareils appariés et liés (pas un substitut aux sauvegardes hors ligne).
- **L’attestation LAN Pro** est un confort entre appareils appariés sur les plateformes sans IAP magasin — pas une preuve cryptographique d’achat.

### Liste de durcissement opérationnel

- Définissez un `JWT_SECRET` fort et unique (min. 32 caractères ; placeholders rejetés au démarrage).
- Terminez **HTTPS** devant l’API en production.
- Gardez `CORS_ORIGINS` comme liste d’autorisation explicite (**jamais `*`**).
- Préférez garder le coffre **verrouillé en inactivité** ; activez le déverrouillage biométrique avec prudence.
- Utilisez **Réglages → Sécurité → Santé des mots de passe** pour trouver les mots de passe faibles/réutilisés ; les contrôles HIBP optionnels n’envoient qu’un **préfixe** de hash SHA-1 (k-anonymité), jamais le mot de passe.
- Traitez exports / sauvegardes comme du matériel secret — stockez hors ligne et chiffré.
- N’appariez Nearby qu’avec des personnes/appareils de confiance ; **Lier le coffre** partage le matériau de clé de coffre via la session LAN — dissociez pour révoquer les attestations LAN Pro et arrêter la sync.
- Signalez les vulnérabilités en privé — voir [Signalement des vulnérabilités](#signalement-des-vulnérabilités).

## Signalement des vulnérabilités

Si vous pensez avoir trouvé un problème de sécurité dans OpenKey (serveur, extension, CLI, docs ou app), signalez-le **en privé**.

**N’ouvrez pas** d’issue GitHub publique pour des vulnérabilités exploitables.

- Email : **security@openselfhosting.com**
- Ou ouvrez un advisory de sécurité **privé** sous [OpenSelfHosting](https://github.com/OpenSelfHosting)

Incluez le paquet concerné, la version/commit si connue, les étapes de reproduction et l’impact. Nous visons à accuser réception sous **7 jours**. Politique complète : fichier `SECURITY.md` du paquet (aussi à la racine du monorepo).

## Règles pratiques

- Choisissez un mot de passe principal fort — c’est la racine de confiance.
- Gardez `JWT_SECRET` (serveur) long et unique ; les placeholders sont rejetés au démarrage.
- Préférez HTTPS en production et verrouillez `CORS_ORIGINS` (pas de `*`).
- Sauvegardez hors ligne l’export du coffre / les matériaux de récupération.

## Note sur le packaging

Les paquets publiés incluent le **serveur**, l’**extension navigateur**, la **CLI** et les **docs** (MIT). Ce monorepo peut contenir un checkout de développement de l’**application OpenKey** mobile/bureau utilisé pour le travail cross-paquet. Voir les guides [aperçu](./overview) et [paquets](./packages).

Pour les détails API, voir le README du paquet `openkey_server` et `/docs` sur un serveur en cours d’exécution.
