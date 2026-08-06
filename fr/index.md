---
layout: page
sidebar: false
aside: false
title: OpenKey
---

<div class="ok-home">

<HomeHero
  tagline="Gestionnaire de mots de passe auto-hébergé. Chiffrement uniquement sur le serveur."
  cta-primary="Télécharger"
  cta-secondary="Commencer"
  download-link="/fr/guide/download"
  quick-start-link="/fr/guide/quick-start"
/>

<HomeSections
  features-title="Pourquoi OpenKey"
  :features="[
    { title: 'Chiffrement uniquement', body: 'Argon2id sur l’appareil. Le serveur ne voit jamais votre mot de passe maître ni la clé du coffre.', href: '/fr/guide/security', linkLabel: 'Modèle de sécurité' },
    { title: 'Auto-hébergé ou Nearby', body: 'Synchronisez via votre API Docker — ou appariez des appareils en LAN avec un QR, sans serveur.', href: '/fr/guide/nearby', linkLabel: 'Guide Nearby' },
    { title: 'Remplissage et passkeys', body: 'Autofill système plus une extension avec raccourci et WebAuthn.', href: '/fr/guide/extension', linkLabel: 'Extension navigateur' },
    { title: 'Équipes toujours zero-knowledge', body: 'Orgs et partages chiffrent avec des clés que le serveur ne peut pas déballer.', href: '/fr/guide/sharing', linkLabel: 'Partage et orgs' }
  ]"
  platforms-title="Là où vous êtes"
  :platforms="['Android', 'iOS', 'macOS', 'Windows', 'Linux', 'Chrome / Firefox', 'Serveur Docker', 'CLI']"
  how-title="Comment la sync reste zero-knowledge"
  :how-steps="[
    'Dérivez les clés de l’e-mail + mot de passe maître avec Argon2id',
    'N’envoyez qu’un auth hash pour vous connecter',
    'Chiffrez noms, entrées et pièces jointes avant l’envoi',
    'Le serveur stocke du chiffrement opaque — jamais la clé du coffre',
  ]"
  cta-title="Démarrez sur votre infra"
  cta-body="Téléchargez l’app, pointez votre serveur, ou appariez Nearby en LAN."
  cta-primary="Télécharger"
  cta-secondary="Commencer"
  cta-security="Lire le modèle de menace"
  download-link="/fr/guide/download"
  quick-start-link="/fr/guide/quick-start"
  security-link="/fr/guide/security"
/>

</div>
