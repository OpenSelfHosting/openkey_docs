---
title: What is a password manager?
description: A plain-English guide to password managers — what they store, how they encrypt, which types exist, and how to pick one without trusting a stranger with your passwords.
date: 2026-09-12
cover: /blog/covers/what-is-a-password-manager.png
---

# What is a password manager?

A **password manager** is an encrypted vault that remembers one strong master password on your behalf and fills in everything else. Instead of reusing `Summer2019!` across twelve sites, you generate a different 20-character password for each one, and the manager stores, retrieves, and types it when you need it.

That is the whole idea. Everything else — sync, sharing, passkeys, autofill, self-hosting — is plumbing around that single benefit.

## Why people need one

The problem is arithmetic. A good human password is memorable, and memorable means reused. Credential-stuffing attacks take passwords leaked from one site and try them against thousands of others, so one reused password can cost you an unrelated account. The fix is a unique password per account, which is exactly what nobody is willing to memorize.

A password manager removes the memorization step. You remember one secret; the vault holds the rest.

## What a password manager actually stores

Not just passwords. A modern vault holds a surprising amount:

| Item | What it is |
|------|------------|
| Login | URL, username, password, notes, TOTP seed |
| Payment card | Number, expiry, CVV, issuer grouping |
| Crypto wallet | Address, private key, seed phrase |
| Identity | Name, address, phone, ID numbers |
| Secure note | Anything else you would not paste into a chat app |
| Passkey | A WebAuthn credential that replaces the password entirely |

**TOTP** is worth calling out: time-based one-time codes for two-factor authentication can live in the same entry as the password they protect, so a login and its rotating code sit together instead of in two separate apps.

## The four things that separate a good one from a bad one

### 1. The encryption model

A reputable manager encrypts your vault on your device with a key derived from your master password (OpenKey uses **Argon2id** for derivation and **AES-256-GCM** for vault data). The company running the server should not be able to read your entries — that is the *zero-knowledge* property. If the provider can reset your master password for you, or holds a master key it could use to decrypt, it is not zero-knowledge, whatever the marketing says.

### 2. Where the encrypted data lives

Three common answers, in increasing order of control:

- **Vendor cloud** — someone else runs the servers. Simplest, and you inherit their uptime, their breach history, and their jurisdiction.
- **Vendor cloud, self-hostable** — same client, optional bring-your-own server.
- **Your own server** — you run the sync API. The server holds ciphertext and cannot read it.

For a self-hosted setup like [OpenKey](/blog/zero-knowledge-sync), a stolen server database is a stolen pile of ciphertext, not a stolen password list.

### 3. Autofill quality

Autofill is where a password manager earns its keep, because it is what you touch fifty times a day. Look for a browser extension, a system-level provider for mobile, and a passkey path. Search demand reflects this: "autofill" and its refinements outnumber "password vault" queries several to one.

### 4. Recovery posture

Someone has to be able to tell you the truth about what happens if you forget the master password. Zero-knowledge designs cannot: the server holds nothing that helps. A good manager is blunt about it, gives you encrypted local backups you control, and does not pretend a support agent can help. See [forgot master password](/blog/forgot-master-password) for how to avoid the situation entirely.

## What a password manager is not

- **Not a backup of your accounts.** It holds credentials; it does not reset a locked-out email account.
- **Not automatically 2FA.** Storing a TOTP seed is not the same as protecting the account with hardware keys.
- **Not a license to reuse passwords.** The whole value is uniqueness.
- **Not a reason to skip a master password.** The vault is only as strong as the key that opens it.

## How to actually use one

1. **Pick a strong master password.** Long beats complex. A multi-word passphrase of four to six unrelated words is stronger and easier to recall than `P@ssw0rd!`.
2. **Turn on autofill** before you import anything, so saved logins start accumulating on their own.
3. **Import what you have.** [Chrome export](/blog/import-passwords-from-chrome) takes about a minute.
4. **Generate, do not invent.** Use the [built-in generator](/blog/strong-password-generator) for every new account.
5. **Fix the worst offenders first** — banking, email, and your primary social account.
6. **Store the codes with the account.** Add TOTP seeds to the same entry ([how it works](/blog/two-factor-authentication)).
7. **Take one encrypted backup** and keep it somewhere offline.

## Which type should you pick?

| If you… | Look at |
|---------|---------|
| Want zero setup and do not care who runs the servers | A mainstream cloud manager |
| Want to try before you commit | Anything with a genuinely free tier — [OpenKey's free tier](/pricing#free-vs-openkey-pro) covers vault, autofill, passkeys, and self-hosted sync |
| Want your sync on hardware you control | A [self-hosted password manager](/blog/self-hosted-password-manager) |
| Are moving off a big vendor | [LastPass](/blog/lastpass-alternative) or [1Password](/blog/1password-alternative) migration guides |
| Are deep in the Google ecosystem | [Google Password Manager](/blog/google-password-manager) — and when to move off it |
| Share with family | [Password manager for family](/blog/password-manager-for-family) |
| Share with colleagues | [Password manager for teams](/blog/password-manager-for-teams) |

## What people search for, and what it tells you

Search data is a decent proxy for which questions beginners actually have. From Google Trends (worldwide, last 12 months), the refinements people most often add to the head term "password manager":

| Related query | Relative interest |
|---------------|-------------------|
| google password manager | 100 |
| google password | 93 |
| **what is a password manager** | **39** |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| bitwarden | 7 |
| 1password | 4 |

Two things jump out. First, the single most common follow-up question is exactly the one this article answers — the term is asked in plain English, which means the audience is new to the category. Second, brand queries dominate: most people arrive at the topic already thinking "which product", not "what is this". The same data set shows "what is a password manager" as the fastest-rising *informational* refinement, up roughly 1,050% year over year, while brand-presence terms such as "nord password manager" rose about 850%.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Figures are normalized relative interest (0–100), not monthly search volumes. The rising figures are growth against the equivalent previous period.

## The one-minute version

A password manager is an encrypted vault reached through a single strong master password, so every account can have a unique password you never have to remember. The things that matter are whether the provider can read your data (it should not), where the encrypted data lives, whether autofill actually works on your devices, and what happens if you forget the master password. Pick one, turn on autofill, import, then generate your way out of reuse.

## Where to go next

- [Best password managers](/blog/best-password-managers) — how to compare options
- [Autofill passwords](/blog/autofill-passwords) — set it up properly
- [Strong password generator](/blog/strong-password-generator) — stop inventing passwords
- [Security model](/guide/security) — key derivation and threat boundaries
- [Using the app](/guide/app) — the OpenKey vault in practice
