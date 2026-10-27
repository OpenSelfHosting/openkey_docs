---
title: "LastPass alternative: how to migrate and what to look for"
description: Moving off LastPass — what to export, how to import into another manager, and the four requirements to check before choosing a replacement.
date: 2026-09-19
cover: /blog/covers/lastpass-alternative.png
---

# LastPass alternative: how to migrate and what to look for

LastPass is the best-known password manager name in most of the world, which makes "lastpass alternative" one of the most searched comparisons in the category. People land on it for three different reasons, and they need three different things:

1. **Trust** — you want a different answer to "who can read my passwords".
2. **Cost or limits** — the free tier or the family plan no longer fits.
3. **Features** — you want passkeys, self-hosting, or developer secrets.

This article covers what actually changes during a migration, what to verify before you commit, and how to do the switch without a window where you cannot log in to anything.

## What makes this migration different

LastPass has been in the news for a long time, and the practical consequences for a migration are practical rather than dramatic:

- **The export is a CSV.** Plaintext, unencrypted, with every password in the clear. Anyone who gets that file has your vault.
- **A password-protected export may be available.** If your plan offers one, it is meaningfully safer than the default CSV. Use it.
- **Attachment support is limited in the export.** Files attached to entries generally do not come across in a CSV.
- **The vault is large for long-term users.** A decade-old account can hold hundreds of entries across many folders. Expect an afternoon.

The single most important thing about this migration is that it is a **one-way export followed by a one-time import**. Do it carefully, verify, and only then delete the old account.

## The four requirements for a replacement

### 1. It must be zero-knowledge, provably

Check who holds the decryption key. If a support agent can reset your master password or unlock your vault, you are trusting their infrastructure with your plaintext, whatever the marketing says. A good replacement tells you, before you create a vault, that a forgotten master password cannot be recovered by anyone — including them.

### 2. It must import your LastPass CSV

Confirm the importer supports LastPass CSV specifically, and that folder structure maps to collections. Test with a partial export first if the tool allows it.

### 3. It must not paywall your exit

This is the asymmetry to watch for: **import free, export paid**. Managers that let you in but charge to leave have quietly made your data a reason to stay. Check the export tier before you migrate, not after.

### 4. It must autofill properly on your devices

You are going to notice autofill more than anything else in the first week. Test it on your three most-used sites before deleting the old account.

## Migrating, step by step

### 1. Export from LastPass

1. Log in, open **Settings → Advanced Export**, and choose **LastPass CSV** (or a password-protected export if your plan has one).
2. Save it to a location you control, not a shared cloud folder.
3. Do not email it, and do not leave it in Downloads.

### 2. Import into the new manager

In OpenKey: **Settings → Data → Import & export → Import → LastPass CSV**, pick the file, and confirm. Everything happens locally — no server round-trip, and your plaintext never touches a sync server.

Expect folder-to-collection mapping and, for a very old vault, some entries to land without a folder. Review afterwards rather than assuming.

### 3. Turn on autofill *before* you start changing passwords

This ordering matters. With autofill working, every login you make from this point forward is captured automatically, so the vault re-curates itself while you work.

- [Autofill passwords](/blog/autofill-passwords) — the setup guide
- [Autofill not working](/blog/autofill-not-working) — when it does not cooperate

### 4. Fix the highest-value accounts first

Do not attempt to rotate 400 passwords. Rotate email, banking, and cloud first, generating each one as you go:

```bash
openkey gen -l 24
```

Add 2FA at the same time ([guide](/blog/two-factor-authentication)), and add a passkey where the site offers one ([what are passkeys?](/blog/what-are-passkeys)).

### 5. Verify, then destroy the export

- Spot-check important logins, including TOTP entries if you used them.
- Confirm autofill on your main browser and phone.
- Confirm you can sign in on a second device.
- **Securely delete the CSV.** Do this properly; a deleted file on an SSD may be recoverable. Overwriting the file and emptying the trash is a reasonable minimum.
- Rotate anything that lived in that plaintext file for a long time.

### 6. Keep a backup before you cancel

Take one encrypted local backup first — an `.okbak` in OpenKey, or your manager's equivalent. Then delete the old account. Cancellation should be the last step, not the second.

## What people usually switch to

| If you want… | Look at |
|-------------|---------|
| No server, no vendor, local file only | A file-based manager such as KeePass — great, but you own backups |
| Your own sync server, open code | A self-hostable manager — [OpenKey](/blog/self-hosted-password-manager) is one |
| Vendor polish with a real free tier | Any of the mainstream managers, judged on the [criteria here](/blog/best-password-managers) |
| No migration at all — just add a second manager | Run both for a month; keep the old account read-only until you are confident |

Running two managers in parallel is the lowest-risk option and costs nothing. Disable autofill in the old one, leave it installed, and delete the account only after a week of friction-free logins.

## What search data says

Google Trends (worldwide, last 12 months) shows LastPass alternatives are a real and growing cluster, and that 1Password alternatives attract more search interest than LastPass ones. Comparing alternative queries against each other:

| Query | Relative interest in cluster |
|-------|-------------------------------|
| 1password alternative | 100 |
| lastpass alternative | 26 |
| proton pass alternative | 7 |
| dashlane alternative | 1 |

"1password alternative" sitting at roughly four times the interest of "lastpass alternative" is worth pausing on: it suggests the biggest migration wave in the category is *not* away from LastPass, but driven by 1Password's pricing and family-plan structure. Searches for "1password pricing" are among the fastest-rising queries related to Bitwarden too, up about 200% year over year.

The head term is still overwhelmingly brand-anchored. Among refinements of "password manager", Bitwarden and 1Password both attract more brand search than LastPass, while LastPass appears far more often in the *definitional* and recovery queries — most visibly "lastpass forgot master password", which is the single strongest related query under "forgot master password".

That split is the useful insight: LastPass is searched for when something has gone wrong, and 1Password is searched for when something has become expensive. Different problems, different fixes — and one of them is not a security problem at all.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

Export from LastPass (password-protected if available), import the CSV into a replacement whose export is free and whose vault is zero-knowledge, turn on autofill before changing anything, rotate email and banking first, then delete the export and only then the old account. Keep one encrypted backup before you cancel.

## Next steps

- [1Password alternative](/blog/1password-alternative) — the same process, different reasons
- [Import from Chrome](/blog/import-passwords-from-chrome) — if you are consolidating browser exports too
- [Best password managers](/blog/best-password-managers) — the scoring sheet
- [Import & export](/guide/import-export) — supported formats, free vs Pro
