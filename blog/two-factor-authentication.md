---
title: Two-factor authentication in a password manager
description: What 2FA and TOTP codes are, how to store authenticator seeds next to the logins they protect, and how passkeys change the picture.
date: 2026-09-17
cover: /blog/covers/two-factor-authentication.png
---

# Two-factor authentication in a password manager

**Two-factor authentication (2FA)** means proving you are you with a second piece of evidence, not just your password. The most common form is the rotating six-digit code from an authenticator app — **TOTP** — based on a time-based one-time password computed from a shared seed.

The awkward part is that the seed and the code live in a *different app* from your password. This article explains the mechanics, why storing seeds in a password manager is the sane arrangement, and how passkeys change it.

## How 2FA works

1. When you enable 2FA on a site, it shows you a **secret** — usually as a QR code containing an `otpauth://` URI.
2. You scan or paste that secret into an authenticator.
3. Every 30 seconds, the authenticator computes a six-digit code from the secret plus the current time: `HMAC(secret, floor(time/30))`.
4. The site computes the same value. If they match, you are in.

The code is worthless a minute later, which is why it works. But the *secret* is effectively a permanent password — anyone who has it can generate valid codes forever.

## The decision: authenticator app, SMS, or passkey

| Method | Phishable | Server breach impact | Notes |
|--------|-----------|----------------------|-------|
| SMS code | Yes | No | Vulnerable to SIM swap and number recycling; still better than nothing |
| TOTP app / code | Yes (seed theft) | No | Works offline; secret must be protected |
| Hardware key (FIDO2) | No | No | Strongest; needs a second device or key as backup |
| Passkey | No | No | Nothing to type, nothing to steal; see below |

Hardware keys and passkeys are the only options that are not phishable, because the credential never leaves your device and the signing is bound to the requesting origin.

## Why TOTP seeds belong in your vault

The usual advice is "keep your authenticator app separate from your password manager", on the reasonable theory that one compromised app should not unlock everything. In practice this creates a worse problem: the password and its second factor end up in different places, so recovery from one is impossible without the other, and people end up re-enrolling 2FA constantly.

The better framing: treat the TOTP seed as **part of the credential**, and protect it with the same controls. If your vault is unlocked behind a master password and, ideally, a biometric, then the seed is no weaker than the password it protects — and it is always where you need it.

Most managers support this directly: paste the secret, paste an `otpauth://` URI, or scan the QR code directly into the entry.

In OpenKey, add the authenticator secret or `otpauth` URI to the login entry, or scan the QR from the site's 2FA setup screen. Codes appear whenever the vault is unlocked, and the system Autofill provider or the browser extension can fill them where the platform supports it. From the terminal, the CLI can read them directly:

```bash
openkey totp "GitHub" -c     # copy the live code
openkey totp "GitHub" -w     # watch it refresh until you stop it
```

## Setting up 2FA on an account

1. Log in and open the site's security settings.
2. Choose authenticator app, and **scan the QR code** or enter the secret manually.
3. Save a copy of that secret into the same vault entry as the username and password.
4. Enter the current code to confirm.
5. Save the site's **recovery codes** somewhere you control — an encrypted note in the same vault, or a printed copy stored offline.

Step 3 is the one people skip, and it is the step that saves you when you later change phones.

## Enforcing it for a whole account

Once 2FA is on for a few logins, treat it as a default:

- Store a **recovery method per site**, because each site handles it differently.
- Prefer **two authenticators** where the site allows it: phone and desktop, both fed from the vault. If you lose one device, the other still works.
- Turn on **2FA on email first**. It is the account that resets every other account.
- Check for a hardware-key or passkey option, and add it alongside TOTP rather than instead of it, until you are confident you can recover.

## Where 2FA goes wrong

**Lost phone with no backup.** Without a second authenticator, a recovery code, or a hardware key, the account is gone. This is the single most common 2FA failure and the reason recovery codes matter.

**Seed in a screenshot.** A photographed QR code is a plaintext credential. Save the seed into your vault and delete the image.

**Seed in a synced notes file.** Cloud notes sync in plaintext. If you use notes at all for recovery material, it should be inside the encrypted vault.

**Rotating codes typed from the wrong app.** Some authenticators let you reorder accounts, which causes codes to be entered against the wrong site. Not a security problem — a support problem.

**Assuming 2FA makes reuse safe.** It does not. If you reuse a password across two sites and only one has 2FA, the other is still one breach away.

## How passkeys change 2FA

A passkey removes the second factor rather than strengthening it. The private key is protected by the device's secure hardware and only usable after a biometric or PIN check, so the "something you know" and "something you are" collapse into a single hardware-backed action. There is no code to steal, no seed to leak, and no SIM to swap.

This is why passkeys are the direction the industry moved: they are the rare credential that is both more secure *and* less work. The remaining reason to keep 2FA is coverage — passkeys are not available on every site yet, so a TOTP seed in your vault is a reasonable bridge for the ones that have not caught up.

[More on how passkeys work](/blog/what-are-passkeys) · [how OpenKey handles them](/blog/passkeys-and-autofill)

## What search data says

2FA is one of the largest security-adjacent query terms on the web. At the head-term level, "2fa" draws roughly **67%** of the interest of "password manager" — higher than "passkey" at 42% and "password generator" at 36%.

Refinements people add to "two-factor authentication" (Google Trends, worldwide, last 12 months):

| Related query | Relative interest |
|---------------|-------------------|
| what is two-factor authentication | 100 |
| two-factor authentication app | 14 |
| two-factor authentication code | 12 |
| two-factor authentication google | 8 |
| enable two-factor authentication | 7 |
| two-factor authentication iphone | 5 |
| two-factor authentication examples | 2 |

"what is two-factor authentication" is also the fastest-rising term in the cluster, up about 550% year over year. A definitional query rising fastest is a clear signal that the audience is new — which is why this article leads with the mechanics rather than the recommendation.

Method: Google Trends, worldwide, last 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

TOTP codes are computed from a permanent secret shared with the site, so that secret is really a password and deserves the same protection. Store it in the same encrypted vault entry as the username and password, keep a second authenticator, save the site's recovery codes offline, enable 2FA on your email account first, and add a passkey wherever one is offered.

## Next steps

- [What are passkeys?](/blog/what-are-passkeys) — the credential that replaces codes
- [Autofill passwords](/blog/autofill-passwords) — filling logins and codes together
- [Using the app](/guide/app) — adding TOTP to an entry
- [CLI guide](/guide/cli#search-across-secrets-and-logins) — reading codes from the terminal
