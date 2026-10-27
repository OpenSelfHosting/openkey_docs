---
title: Best password managers
description: How to compare password managers in 2026 — free tiers, zero-knowledge encryption, self-hosting, autofill, passkeys, and the questions to ask before you pick one.
date: 2026-09-13
cover: /blog/covers/best-password-managers.png
---

# Best password managers

There is no single best password manager. There is the best one *for your threat model, your platforms, and how much setup you tolerate* — and the way to find it is to score a handful of candidates on the same seven questions instead of reading another listicle that quietly sponsors someone.

This article gives you the seven questions, a scoring sheet, and honest notes on the four categories most people end up choosing between.

## The seven questions

### 1. Can the provider read my vault?

This is the only question that is genuinely binary. Look for explicit **zero-knowledge** or end-to-end encryption, and check *who holds the keys*. If the provider can reset your master password, issue a replacement decryption key, or unlock your vault "for support", it is not zero-knowledge regardless of the lock icon on the website.

### 2. Where is the encrypted data, and who can delete it?

| Model | You are trusting them with | Best for |
|-------|---------------------------|----------|
| Vendor cloud only | Availability, durability, their breach history | People who want zero setup |
| Vendor cloud, self-hostable | Same, but with an exit | Privacy-minded users who want an option |
| Your own server | Your own uptime and backups | Anyone who can run Docker or a small VPS |

Self-hosting is not a magic upgrade — it is a trade. You gain control of the storage plane and remove a third party from the trust chain; you take on TLS, backups, and upgrades. [OpenKey's server](/guide/server) is the reference implementation if you want to see what that looks like.

### 3. What does the free tier actually allow?

Free tiers are where password managers hide the migration tax. Check the *specific* caps, because they differ wildly: some limit items, some limit devices, some limit sync, some disable export entirely — which means you can move in but not out.

A free tier that covers vault + autofill + passkeys + sync, with item limits, is genuinely usable. [OpenKey Free](/pricing#free-vs-openkey-pro) is one of these: 50 logins, 3 collections, 3 cards, 3 wallets, 3 secrets, with server sync and autofill included.

### 4. Does autofill work everywhere I use?

Not "does it exist" — does it work *reliably* on your browser, your phone's system provider, your desktop apps. Autofill is the feature you touch most, so it deserves a real test before you migrate 400 logins into it. See [autofill passwords](/blog/autofill-passwords) for the setup, and [autofill not working](/blog/autofill-not-working) when it does not.

### 5. Passkeys, TOTP, and cards

The three capabilities that separate a password manager from a password storage box:

- **Passkeys** — a real WebAuthn implementation, not "coming soon". [What are passkeys?](/blog/what-are-passkeys)
- **TOTP** — store the seed next to the login it protects ([2FA in a vault](/blog/two-factor-authentication))
- **Cards, wallets, identities** — useful, and a good signal of whether the vault is a real password manager or a spreadsheet

### 6. Can I get my data out?

Import is table stakes. **Export** is what makes you trustable, because it is the escape hatch. Check which formats are supported, whether export is paywalled, and whether the export is plaintext. If you cannot leave cleanly, you are renting.

### 7. What happens if I forget the master password?

Get a straight answer. In a true zero-knowledge design the answer is "nothing — the data is unrecoverable", and the vendor's job is to make that obvious *before* you create the vault, not after. Ask what offline recovery material you can create yourself ([covered here](/blog/forgot-master-password)).

## The four categories

### Mainstream cloud managers

The lowest-friction option and the right default for most people. You accept the vendor's infrastructure in exchange for a polished app, broad platform support, and no server to maintain. Best when you want this solved, not operated. Compare them on free-tier limits, passkey support, and export — not on feature checklists, which inflate.

### Open-source and self-hostable managers

The code is public and, in several cases, the server is too. You can audit the encryption, run your own instance, or run no server at all and keep a local encrypted file. Best when the trust chain itself is the requirement. [Self-hosted password manager](/blog/self-hosted-password-manager) covers the operational side.

### Platform built-ins

[Google Password Manager](/blog/google-password-manager), iCloud Keychain, and Microsoft Edge are excellent for people already committed to one ecosystem: near-zero setup, solid integration, and a genuinely good free tier. The trade-offs are ecosystem lock-in, weaker cross-platform sharing, and no self-hosting story.

### Family and team plans

Not a different kind of product — a different set of requirements. Shared vaults, revocation, and roles. [Password manager for family](/blog/password-manager-for-family) and [password manager for teams](/blog/password-manager-for-teams) cover what to check and what to avoid.

## A scoring sheet

Score each candidate 0–3 per row, then add it up. Twelve points of difference is a real signal; two points is noise.

| Criterion | Weight | Notes |
|-----------|--------|-------|
| Zero-knowledge, provable | ×3 | Non-negotiable if you care about the provider reading you |
| Export available and free | ×3 | Your exit hatch |
| Autofill on all my platforms | ×3 | Test it, do not assume |
| Passkeys + TOTP | ×2 | The modern replacement for the password field |
| Free tier is genuinely usable | ×2 | Item *and* sync limits both count |
| Self-hosting available | ×1 | Optional, but it changes the trust model |
| Recovery story is honest | ×1 | Includes offline backups you control |
| Sharing and revocation | ×1 | Only if you share |

## What search data says about how people choose

Google Trends (worldwide, last 12 months) shows how this decision is actually being made. The refinements people add to "best password manager":

| Related query | Relative interest | Note |
|---------------|-------------------|------|
| best password manager 2026 | 100 | Year-qualified searches dominate |
| the best password manager | 90 | |
| best password manager 2025 | 81 | Last year's list still ranking |
| best password manager app | 34 | Mobile-first intent |
| what is the best password manager | 31 | Beginner crossover |
| reddit best password manager | 17 | Community validation matters |
| best password manager for business | 14 | Team evaluation |
| best password manager for android | 11 | Platform-specific |

Two practical takeaways. First, **"best password manager 2026" was the single fastest-rising refinement of the head term, up about 2,800% year over year**, and last year's list still outranks this year's — which tells you most searchers are reading whatever comprehensive roundup they find first, so vendor-sponsored lists do most of the deciding. Second, "reddit" appears as an explicit qualifier, meaning people want a recommendation they can sanity-check against strangers.

On brand interest, within a head-to-head comparison of the major names normalized against the head term: Bitwarden and 1Password both draw noticeably more brand search than LastPass, and KeePass, NordPass, and Dashlane sit well below all three. Related to Bitwarden specifically, pricing and review queries are the fastest-rising — interest in *cost*, not just capability.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes. Rising values are growth versus the equivalent previous period.

## A 20-minute evaluation routine

1. Pick three candidates: your incumbent, one cloud manager, one self-hostable option.
2. Score them on the sheet above.
3. Install the top two. Do not migrate yet — just unlock, enable autofill, and use them for a day.
4. Check passkeys and TOTP on a throwaway account.
5. Export from the one you will not choose, and look at the file. If the export is unusable, that is your answer.
6. Migrate, then delete the old export securely.

Migration walkthroughs: [from LastPass](/blog/lastpass-alternative) · [from 1Password](/blog/1password-alternative) · [from Chrome](/blog/import-passwords-from-chrome)

## The honest shortlist

- **Want it handled?** A mainstream cloud manager with a real free tier and free export.
- **Want it auditable?** An open-source client with a self-hostable server — [OpenKey](/blog/what-is-a-password-manager) is one such option.
- **Want no vendor at all?** A local encrypted vault with no server, plus [Nearby LAN sync](/blog/nearby-without-a-server) for your own devices.
- **Want it in your ecosystem?** A platform built-in, accepting the lock-in.

## Next steps

- [What is a password manager?](/blog/what-is-a-password-manager) — the fundamentals
- [Autofill passwords](/blog/autofill-passwords) — the feature that matters most
- [Pricing and Free vs Pro](/pricing) — what OpenKey includes
- [Security model](/guide/security) — what "zero-knowledge" means concretely
