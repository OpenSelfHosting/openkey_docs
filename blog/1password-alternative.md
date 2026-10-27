---
title: "1Password alternative: switching without losing your vault"
description: Why people leave 1Password — cost, family plans, and self-hosting — plus a step-by-step migration to a password manager you control.
date: 2026-09-20
cover: /blog/covers/1password-alternative.png
---

# 1Password alternative: switching without losing your vault

1Password is an excellent product, and one of the reasons it is excellent is that it has no free tier. That single design decision is the most common reason people search "1password alternative" — the most-searched alternative query in the entire category, at roughly four times the interest of "lastpass alternative".

This article is for people whose reason is one of three: **cost**, **family sharing friction**, or **wanting your sync on your own hardware**. It is not an indictment; 1Password is a legitimate choice, and the honest framing is "if this is not the problem you have, stay."

## The three real reasons to switch

### Cost

The subscription is the price of entry and there is no permanent free option. Pricing is localized by store and region, so the honest framing is structural: you are comparing a subscription against either a free tier elsewhere or a one-time purchase plus your own server.

The queries reflect this. "1password pricing" is among the fastest-rising refinements related to Bitwarden, up about **200%** year over year, and pricing-related terms dominate the rising list under several major brands.

### Family and team sharing

Family plans are a common source of friction — seat management, plan upgrades when a child turns out to need a separate account, and sharing between households with different devices. If your household is mixed iOS/Android/Windows, or you want to share with someone who is not on a family plan, this is a legitimate reason to move.

### Self-hosting

1Password discontinued standalone local vaults some time ago, so sync runs through the vendor. If the requirement is that encrypted data sits on infrastructure you control, that is a hard requirement rather than a preference — and it points at a self-hostable manager.

## Before you migrate: is cost really the problem?

Worth checking honestly, because migration is an afternoon of work you will do more than once if you are not careful:

- **Do you actually need to move?** A year subscription is often cheaper than the time migration costs. If the pain is a single annual charge, the answer may be to stay.
- **Is it the plan or the seat count?** A personal plan and a family plan are different products; moving because the family plan is awkward is a different decision from moving because you want no subscription.
- **Do you need self-hosting for a real reason?** If nobody in your household can run a server, self-hosting is a hobby you will abandon. Nearby LAN sync covers most of the benefit with none of the maintenance.

If the answer is yes, move — and the rest of this article is the how.

## Migrating step by step

### 1. Export from 1Password

1. Log in on the web or desktop app.
2. Open **Settings → Export** and choose **1Password CSV**.
3. Prefer the **encrypted 1PUX** export if you have it available — it keeps the items locked with a password rather than writing plaintext.
4. Save it somewhere you control, then move it offline.

Complex item types — secure notes with attachments, identities, documents, Wi-Fi credentials — flatten into login-like rows on export. Expect to recreate the important ones by hand.

### 2. Import into the new manager

In OpenKey: **Settings → Data → Import & export → Import → 1Password CSV**. The import is local; nothing is uploaded. Folders become collections where they map cleanly.

### 3. Turn on autofill immediately

With autofill working, everything you log into from here on is saved for you, so the vault repairs itself while you rotate passwords.

- [Autofill passwords](/blog/autofill-passwords)
- [Autofill not working](/blog/autofill-not-working) — if suggestions are missing

### 4. Rotate the accounts that matter

Email first, then banking and cloud, then the rest as each site prompts you. Generate each password locally:

```bash
openkey gen -l 24 -c
```

Add 2FA while you are in the security settings ([guide](/blog/two-factor-authentication)), and add a passkey where offered ([what are passkeys?](/blog/what-are-passkeys)).

### 5. Rebuild the shared items by hand

This is the part people underestimate. Recreate:

- **Payment cards**, grouped by issuer
- **Identities** used for forms
- **Wi-Fi and device credentials** you had stored
- **Secure notes** with attachments — those did not come across

OpenKey keeps cards, crypto wallets, and developer secrets as first-class vault areas rather than free-text notes, which makes this rebuild less painful than it is in a notes-only manager. See [Using the app](/guide/app).

### 6. Take a backup, then cancel

Export an encrypted local backup (`.okbak` in OpenKey) **before** you cancel, then verify a fresh sign-in on a second device. Only then close the old account.

### 7. Destroy the export files

Encrypted exports: delete them. Plaintext CSVs: overwrite and shred. Anything that sat in a plaintext file for a week should be rotated regardless.

## What to look for in the replacement

| Requirement | What to verify |
|-------------|----------------|
| Not expensive | A free tier that covers vault, autofill, and sync — with the *item* limits stated |
| Family sharing | Shared collections with revocation, and whether children need separate plans |
| 1Password CSV import | Explicitly supported, with folder mapping |
| Free export | Confirm the tier; an export paywall makes the data a hostage |
| Self-hosting | Optional, but it changes the trust model entirely |
| Passkeys and TOTP | Both, working, not "coming soon" |
| CLI or API | Valuable if you script anything |

Full criteria and a scoring sheet: [Best password managers](/blog/best-password-managers).

## The families-and-teams angle

If the driver was sharing rather than cost, look at this before you choose a consumer plan:

- [Password manager for family](/blog/password-manager-for-family) — household setups, kids, shared accounts
- [Password manager for teams](/blog/password-manager-for-teams) — orgs, roles, revocation, offboarding

In OpenKey, organizations and shared collections require Pro and a self-hosted server, and everything they store — org names, entry payloads, attachments — stays ciphertext. Clients wrap keys for recipients; the server never unwraps them. One detail worth knowing before you design a process around it: **entry shares are snapshots**, not live documents. Revoking a share stops a pending accept but does not delete a copy the recipient already accepted. For ongoing shared access, use an org shared collection instead.

## What search data says

Google Trends (worldwide, last 12 months) makes the shape of this migration explicit. Comparing alternative queries against each other:

| Query | Relative interest in cluster |
|-------|-------------------------------|
| **1password alternative** | **100** |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

And the rising queries attached to the major brands are dominated by commercial questions rather than security ones: for Bitwarden, "bitwarden price increase" leads at roughly **+450%** year over year, with "bitwarden review" and "bitwarden lite" both around +350%, and "bitwarden pricing" around +190%. Open-source, self-hostable and small-team interest is also climbing — "bitwarden open source", "bitwarden enterprise", and "bitwarden cli" all appear in the rising list.

Two conclusions. First, the dominant driver of switching in this category is **price**, not breach anxiety. Second, the fastest-rising adjacent interests are open source, enterprise, and CLI — which suggests people leaving paid plans are looking for something they can run and inspect themselves.

Method: Google Trends, worldwide, last 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

If the pain is cost, a 1Password CSV export and a free-tier manager with free export gets you out for nothing. If the pain is family sharing or self-hosting, choose on those two requirements first and price second. Export, import locally, turn on autofill, rotate email and banking, rebuild cards and notes by hand, take an encrypted backup, then cancel.

## Next steps

- [LastPass alternative](/blog/lastpass-alternative) — the same process, different triggers
- [Self-hosted password manager](/blog/self-hosted-password-manager) — the self-hosting route
- [Password manager for family](/blog/password-manager-for-family) — household sharing
- [Pricing](/pricing) — what OpenKey Free and Pro include
