---
title: "Gestionnaire de mots de passe auto-hébergé : ce qu'il faut vraiment"
description: Exécuter votre propre serveur de sync de gestionnaire de mots de passe avec Docker — ce qu'un coffre auto-hébergé vous apporte vraiment, ce qu'il vous coûte, et une liste complète de configuration et de durcissement.
date: 2026-09-22
cover: /blog/covers/self-hosted-password-manager.png
---

# Gestionnaire de mots de passe auto-hébergé : ce qu'il faut vraiment

Auto-héberger un gestionnaire de mots de passe signifie exécuter vous-même le serveur de sync chiffrée. Vos clients chiffrent sur l'appareil ; le serveur que vous exploitez stocke du ciphertext et vous authentifie. Le compromis de ce serveur ne vous donne qu'un blob chiffré, pas une liste de mots de passe.

C'est un gain de confidentialité réel et durable. C'est aussi un engagement de maintenance, et la version honnête de cet article décrit les deux.

## Ce que l'auto-hébergement change vraiment

Soyez précis là-dessus, car c'est là que les attentes se trompent :

| | Cloud du fournisseur | Auto-hébergé |
|---|----------------------|-------------|
| Qui peut lire votre coffre | Personne, si c'est zero-knowledge | Personne, si c'est zero-knowledge |
| Qui peut **supprimer** votre coffre | Le fournisseur | Vous |
| Qui voit les métadonnées | Le fournisseur | Vous |
| Qui peut être contraint de céder les données | Le fournisseur, dans sa juridiction | Vous, dans la vôtre |
| Responsabilité de disponibilité | Le fournisseur | Vous |
| TLS, correctifs, sauvegardes | Le fournisseur | Vous |
| Coût | Abonnement | Serveur + votre temps |

La revendication de confidentialité ne change pas. Ce qui change, c'est le **contrôle sur le plan de stockage** et l'identité de ceux qui sont dans la chaîne de confiance. L'auto-hébergement retire un tiers ; il n'ajoute pas de cryptographie.

## Quand c'est utile

- Vous exécutez déjà des services et avez un NAS, un homelab ou un petit VPS.
- Votre modèle de menace inclut « le fournisseur est compromis ou contraint ».
- Vous êtes dans une juridiction où l'hébergement de données chez quelqu'un d'autre est un passif.
- Vous voulez des collections partagées pour une équipe sur une infrastructure que vous auditez.
- Vous êtes le genre de personne qui apprécie un Docker Compose de cinq minutes et une tâche cron.

## Quand ce n'est pas utile

- Vous n'avez jamais exécuté de reverse proxy et devriez d'abord apprendre TLS, DNS et les règles de pare-feu.
- Personne ne se souviendra d'appliquer les correctifs. Un serveur non corrigé est un passif, pas un gain de sécurité.
- Vous êtes le seul utilisateur, sur un seul appareil. Alors sautez complètement le serveur et utilisez un coffre local.
- Vous avez besoin d'une disponibilité garantie pour un système critique sans aucun plan de sauvegarde.

Pour les deux derniers cas, il y a une voie intermédiaire : un **coffre local chiffré** avec la [sync Nearby sur le LAN](/fr/blog/nearby-without-a-server) pour vos propres appareils, et aucun serveur du tout.

## En cinq minutes

OpenKey Server est une application FastAPI avec PostgreSQL, livrée sous forme de pile Docker Compose.

```bash
cd openkey_server
cp .env.example .env
openssl rand -hex 32      # paste this into JWT_SECRET in .env
docker compose up --build -d
```

Puis confirmez qu'elle est saine :

| URL | Rôle |
|-----|------|
| `http://localhost:8000` | Base de l'API |
| `http://localhost:8000/docs` | Documentation OpenAPI |
| `http://localhost:8000/health` | Contrôle de santé |

Les migrations de schéma s'exécutent automatiquement au démarrage. Connectez un client depuis **Réglages → Données → Serveur auto-hébergé**, puis **Inscrivez-vous** sur le premier appareil et **Connectez-vous** sur les autres. Détail complet : [Configuration du serveur](/fr/guide/server).

## La liste de durcissement

C'est la partie que les gens sautent, et c'est celle qui décide si l'auto-hébergement a aidé. Extrait du [guide de sécurité](/fr/guide/security) :

### Non négociables

1. **Un `JWT_SECRET` unique d'au moins 32 caractères.** Les valeurs de remplacement sont rejetées au démarrage. Générez-en un ; ne copiez pas un exemple.
2. **HTTPS avec un certificat valide.** Les clients utilisent la pile TLS de la plateforme sans épinglage de certificat : une URL `http://` mal orthographiée ou un certificat douteux active une attaque de l'homme du milieu lors de la connexion et de la sync. Terminez le TLS au niveau de Caddy, nginx ou de votre load balancer.
3. **Une liste blanche `CORS_ORIGINS` explicite.** Jamais `*`. Si vous utilisez l'extension navigateur, ajoutez explicitement ses origines `chrome-extension://` et `moz-extension://`.
4. **Postgres et le port brut de l'API restent privés.** N'exposez que le reverse proxy.
5. **HSTS au niveau du proxy**, pour que les navigateurs ne retombent jamais sur HTTP après la première visite.

### Fortement recommandés

6. **Des limites de débit au niveau du reverse proxy.** Le limiteur intégré à l'API est en mémoire et **par processus worker** : avec plusieurs workers ou répliques, la limite effective se multiplie. Ajoutez `limit_req` sous nginx ou des limites de débit Caddy en bordure.
7. **Définissez `TRUST_PROXY_HEADERS=true` uniquement si le proxy écrase `X-Forwarded-For`** et que vous faites confiance à ce chemin. Sinon vos limites par IP s'appliquent au proxy, pas à l'utilisateur.
8. **Soyez conscient de l'énumération des emails.** `POST /auth/prelogin` et `POST /auth/lookup-public-key` renvoient 404 pour les emails inconnus : cela aide les clients légitimes mais permet de sonder quelles adresses sont enregistrées. Limites de débit strictes, TLS et, en option, un VPN ou une liste blanche d'IP pour les déploiements très sensibles.
9. **Sauvegardez Postgres et testez la restauration.** Un serveur de gestionnaire de mots de passe qui n'a jamais été restauré depuis une sauvegarde n'est qu'une hypothèse.
10. **Surveillez `/health`** et les journaux de l'API ; alertez s'il cesse de répondre.

## Ce qu'un serveur de sync auto-hébergé peut et ne peut pas faire

| Il peut | Il ne peut pas |
|---------|----------------|
| Vous authentifier à partir de votre `auth_hash` | Lire votre mot de passe principal |
| Stocker du ciphertext opaque pour les entrées, pièces jointes, organisations et partages | Déchiffrer les noms de collection ou les charges d'entrée |
| Supprimer ou retenir vos données | Récupérer un mot de passe principal oublié |
| Voir des métadonnées : email, tailles de ciphertext, temporisations | Reconstruire votre coffre à partir de la base de données |
| Être limité en débit, corrigé ou redémarré par vous | Survivre à votre oubli du mot de passe principal |

Lisez attentivement cette quatrième ligne : un serveur auto-hébergé ne vous rend **pas** plus sûr face à l'oubli de votre mot de passe. Il retire une partie de la chaîne de confiance et vous ajoute comme opérateur pouvant perdre les données. [Mot de passe principal oublié](/fr/blog/forgot-master-password) couvre la prévention.

## Sémantique de sync à connaître avant de vous y fier

- **Last-write-wins par `revision` par élément, pas un CRDT.** Des modifications concurrentes sur deux appareils peuvent s'écraser. Modifiez sur un seul appareil à la fois quand cela compte.
- **Les suppressions se synchronisent comme des tombstones** jusqu'à ce que les pairs se rattrapent : une suppression n'est donc pas instantanée partout.
- **La sync Nearby sur le LAN utilise la même règle LWW** entre appareils appariés et liés au coffre.
- **Aucun des deux n'est une sauvegarde.** Conservez au moins une sauvegarde locale chiffrée (`.okbak` dans OpenKey).

Ce dernier point est celui que les gens se trompent le plus souvent, et c'est la différence entre « j'ai déplacé mon coffre sur mon propre serveur » et « j'ai un plan de récupération ».

## Sûreté opérationnelle pour l'opérateur

- Exécutez le serveur sur un hôte sur lequel vous appliquez des correctifs selon un calendrier. Non corrigé est pire qu'hébergé chez un fournisseur.
- Gardez `JWT_SECRET` dans un gestionnaire de secrets ou au moins dans un fichier en mode 600, pas dans votre historique de shell.
- La rétention des journaux est un passif : les journaux de sync peuvent révéler des temporisations et des tailles. Faites-les tourner et plafonnez-les.
- Sauvegardez la **base de données**, pas seulement le volume, et vérifiez les restaurations chaque trimestre.
- N'exposez jamais l'API sur un réseau non fiable sans TLS.
- Si vous avez besoin de garanties de disponibilité, placez un second hôte derrière un load balancer et acceptez que la résolution des conflits de sync reste en last-write-wins.

## Comment OpenKey rend le serveur inutile pour un attaquant

- Les clients dérivent une clé maîtresse avec **Argon2id** à partir de l'email + mot de passe principal + sel.
- La connexion envoie un **`auth_hash`**, qui prouve la connaissance sans révéler le mot de passe.
- Une **clé de coffre** chiffre les noms de collection et les charges d'entrée avec **AES-256-GCM**. Le serveur ne stocke qu'une clé de coffre enveloppée.
- Les JWT d'accès sont de courte durée ; les jetons de rafraîchissement sont hachés au repos et rotés à chaque usage.
- Les pièces jointes se synchronisent en ciphertext, plafonnées à 20 Mo chacune.

Un dump `postgres` volé donne à un attaquant des sels, des paramètres KDF, des clés enveloppées et des blobs. Le casser signifie attaquer Argon2id, et même ensuite il détient du ciphertext qu'il ne peut pas lire sans la clé. C'est tout l'argument de sécurité, et il tient précisément parce que le mot de passe principal n'a jamais quitté un client.

## Ce que disent les données de recherche

L'auto-hébergement est un groupe petit mais réel, et il se regroupe autour de l'expression « open source » plus que autour de « self-hosted ». Google Trends (monde, 12 derniers mois), en comparant ces termes entre eux :

| Requête | Intérêt relatif dans le groupe |
|---------|-------------------------------|
| passbolt | 100 |
| **open source password manager** | **55** |
| password manager self hosted | 13 |
| self-hosted password manager | 4 |
| keepass alternative | 1 |

L'implication, c'est que « open source » est l'expression vers laquelle les gens tendent, et « self-hosted » celle sur laquelle ils atterrissent ensuite — une recherche qui part d'une préférence et devient une implémentation. Les requêtes associées sous « open source password manager » vont dans le même sens : KeePass à 100, « open source password manager self hosted » à 84, et Passbolt à 78. Deux des trois premiers sont des noms que les gens comparent, pas des descriptions de fonctionnalité.

Cela restent de petits nombres à côté du terme générique. « Self-hosted password manager » est une niche dans une niche, et la conclusion honnête est que la plupart des gens qui cherchent cette expression sont des utilisateurs techniques qui savent déjà ce qu'ils veulent.

Méthode : Google Trends, monde, 12 derniers mois, extrait en septembre 2026. Les valeurs sont un intérêt relatif normalisé (0–100), pas des volumes de recherche.

## La version en cinq minutes

L'auto-hébergement remplace le fournisseur par vous dans la chaîne de confiance. Il n'ajoute pas de cryptographie : il ajoute TLS, sauvegardes, correctifs et limitation de débit à votre liste. Si vous exécutez déjà des services : pile Compose, `JWT_SECRET` unique, HTTPS avec un certificat valide, `CORS_ORIGINS` explicite, et sauvegardes testées. Si ce n'est pas le cas, utilisez plutôt un coffre local chiffré et la [sync Nearby sur le LAN](/fr/blog/nearby-without-a-server), et conservez dans tous les cas au moins une sauvegarde hors ligne chiffrée.

## Prochaines étapes

- [Pourquoi auto-héberger votre coffre de mots de passe](/fr/blog/self-host-your-vault) — l'argument en faveur
- [La sync zero-knowledge expliquée](/fr/blog/zero-knowledge-sync) — le protocole
- [Configuration du serveur](/fr/guide/server) — installation, configuration, durcissement en production
- [Sécurité](/fr/guide/security) — modèle de menace et checklist de l'opérateur
