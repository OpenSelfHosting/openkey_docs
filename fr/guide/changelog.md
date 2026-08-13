# Journal des changements

Notes de version des paquets OpenKey de ce monorepo. La version de l’app suit `openkey_app` (`pubspec.yaml`). La version de la doc suit ce site.


## 1.0.2 (2026-08-13)

See [English changelog](/guide/changelog#10-02-2026-08-13) — web target removed; app **1.0.2+3**.

## 1.0.0 (2026)

Première coupe de documentation publique alignée avec l’app **1.0.0+1** et les paquets ouverts (`openkey_server`, `openkey_extension`, `openkey_cli`, `openkey_docs`).

### Application

- Coffre local chiffré : collections, connexions, cartes, portefeuilles crypto, secrets développeur, TOTP
- Autofill / Credential Provider système et passkeys (selon plateforme)
- Sync serveur auto-hébergé (ciphertext uniquement)
- Sync de coffre Nearby sur le LAN entre appareils appariés (**Pro**)
- Organisations, invitations et partages d’éléments/collections (**Pro**)
- Import (gratuit) / export et sauvegardes `.okbak` (**Pro**)
- Limites freemium : 50 entrées, 3 collections / cartes / crypto / secrets en gratuit
- Packaging pour Play, App Store, Mac App Store, Microsoft Store, Snap, Flathub et installateurs bureau

### Serveur

- API de sync zero-knowledge FastAPI + PostgreSQL 16
- Auth (`prelogin` / register / login / refresh / rekey / delete), sync, pièces jointes, orgs, partages
- JWT courte durée, refresh tokens opaques rotés, rate limits auth, CORS strict

### Extension navigateur

- MV3 Chrome / Firefox : déverrouillage autonome + sync, ou pont de messagerie native bureau
- Autofill, enregistrer/mettre à jour, passkeys, cartes / crypto / secrets, partages et orgs (autonome)

### CLI

- `gen` hors ligne, pont natif vers l’app bureau déverrouillée, `discover`, CRUD secrets
- Session serveur optionnelle `login` / `unlock` / `sync`

### Site de documentation

- Site produit VitePress en 10 locales (RTL pour l’arabe et l’ourdou)
- Guides : aperçu, sécurité, démarrage rapide, téléchargement, serveur (incl. reverse proxy HTTPS + aperçu API), app, **Nearby**, extension, CLI, partage, import/export, FAQ, paquets, changelog
- Jeu de guides **chinois (zh)** complet aligné avec EN/AR pour les pages majeures
- Articles de blog (EN + AR complets ; autres locales pointent vers l’anglais) dont **Nearby without a server**
- Page d’accueil : hero + sections fonctionnalités / plateformes / comment ça marche / CTA

## Non publié / suivant

- URLs de fiches magasin live une fois chaque canal publié
- Traductions plus complètes au-delà de EN/AR/zh pour les guides longs (es/fr/… utilisent encore des stubs enrichis pour certaines pages)
- Entrées de changelog par paquet lorsque les remotes autonomes publient des releases taguées

## Comment les versions se relient

| Paquet | Où regarder |
|---------|----------------|
| App | `openkey_app/pubspec.yaml` → `version` |
| Serveur | Tags Git / tags d’image pour `openkey_server` |
| Extension / CLI | `package.json` dans chaque paquet |
| Docs | Cette page + déploiement du site |

Signalez les problèmes de sécurité en privé — **security@openselfhosting.com**. Voir [Sécurité → Signalement](./security#signalement-des-vulnérabilités).

Suivant : [Télécharger](./download) · [Nearby](./nearby) · [FAQ](./faq) · [Sécurité](./security)
