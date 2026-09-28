---
title: What are passkeys?
description: A plain-English guide to passkeys — how WebAuthn works, why they cannot be phished, how to create and use one, and what happens to your password manager.
date: 2026-09-16
cover: /blog/covers/what-are-passkeys.png
---

# What are passkeys?

A **passkey** is a login credential made of a cryptographic key pair instead of a string of characters. The private half stays encrypted on your device, behind the same unlock (biometric, screen lock, or master password) you already use. The site stores only the public half, which is useless for signing in as you.

The practical result: there is no password to type, nothing to phish, nothing for a breached site to hand to an attacker, and no reset flow for anyone to social-engineer.

## The problem passwords have

Every login you have ever made is a shared secret. Both you and the site store the same string, which creates three failure modes:

- **Phishing.** A convincing copy of the login page harvests the string, because the string works on both the real site and the fake one.
- **Credential stuffing.** A string leaked from one site is replayed against every other account you own that reuses it.
- **Server breach.** Sites that store readable passwords hand attackers working credentials the moment they are breached.

Passkeys remove the shared secret. The site never sees anything reusable.

## How a passkey works

Registration, when you first log in:

1. Your device generates a **key pair** — a private key and a public key.
2. The public key is sent to the site and stored in its user database.
3. The private key stays on your device, encrypted, and is only usable after you unlock.

Signing in, every time after that:

1. The site issues a **challenge**.
2. Your device signs it with the private key.
3. The site verifies the signature against the public key it stored.

There is no shared secret at either step. A fake site cannot be used, because the challenge comes from the real site and your device will only sign for the origin it was registered with. That is the anti-phishing property, and it comes from the protocol rather than from user vigilance.

Under the hood this is **WebAuthn** (now called passkeys), with the credential typically on a **FIDO2** hardware authenticator — your device's secure element, a platform authenticator, or a USB/NFC security key.

## Creating a passkey

The flow is the same almost everywhere, and your password manager supplies the credential:

1. On the site's sign-in page, choose **Sign in with a passkey** (or **Create a passkey** if you have no account yet).
2. Your provider shows a confirmation dialog naming the site and the account.
3. Approve with Face ID, Touch ID, fingerprint, or your device PIN.
4. Done. The passkey is stored in your vault and tied to that site.

If the dialog offers a "Use browser" or "Use this device instead" option, taking it hands the credential to the platform authenticator instead of your manager — useful for a one-off, but it means the passkey is no longer in your vault.

## Using a passkey day to day

Nothing changes about the login, only what happens underneath:

1. Focus the username field and click **Sign in with a passkey**.
2. Approve the prompt.
3. The site validates the signature. You are in.

No typing, no paste buffer, no second factor prompt — the unlock *is* the second factor. Because your device shows the requesting site in the approval dialog, an attacker cannot silently redirect it.

## Removing and transferring passkeys

- **Remove:** open the site's account security settings and delete the passkey there, or remove it from your provider. Deleting it in one place leaves the other copy intact, so remove from both if you want it gone.
- **Transfer:** a passkey synced through a platform account (iCloud Keychain, Google Password Manager) moves with that account. A passkey stored in a self-hosted vault moves when you sync, or when you import into a new manager.

If you lose every device holding a passkey *and* have no recovery path, the account is unrecoverable. Keep at least one passkey registered on a second device or a security key.

## Passkeys and password managers

Passkeys do not replace your password manager — they move it from the weakest job to the strongest one.

| Job | Before | After |
|-----|--------|-------|
| Remembering the password | A string in your head, reused | A key pair in your vault |
| Phishing resistance | Manual domain checking | Cryptographic, built in |
| Second factor | A rotating code | The device unlock itself |
| Breach impact | Readable credentials in the site's database | A public key, useless to an attacker |

The manager still stores the passkey private key, still gates access on your vault unlock, and still syncs. What changes is that the stored secret is no longer a memorizable string — which removes the entire reason passwords got reused.

In OpenKey the extension intercepts WebAuthn `create` and `get` calls, stores ES256 credentials, and falls back to the platform authenticator when you prefer it. The system-level provider path covers apps and browsers that talk to the OS credential UI. Both run after unlock, on the client. [How it works in OpenKey](/blog/passkeys-and-autofill).

## Do passkeys work everywhere yet?

Nearly everywhere, with a few persistent gaps: some enterprise single-sign-on setups, some older mobile app WebViews, and a handful of sites that implemented WebAuthn but not passkey sync. A practical approach is to keep passwords as a fallback in your manager while a site offers both — and to prefer the passkey when it does.

## What search data says

Passkey interest is large and still climbing, and the queries are overwhelmingly beginner questions. Google Trends (worldwide, last 12 months) refinements of "passkey":

| Related query | Relative interest |
|---------------|-------------------|
| what is passkey | 100 |
| what is a passkey | 93 |
| google passkey | 50 |
| passkey microsoft | 28 |
| passkey login | 22 |
| create passkey | 20 |
| passkey app | 19 |
| passkey iphone | 19 |
| windows passkey | 18 |
| passkeys | 17 |
| how to use passkey | 8 |
| how to remove passkey | 6 |

"what is a passkey" and "what is passkey" are the two strongest queries in the cluster, and "what is a passkey" is rising about 450% year over year. That is the shape of a technology crossing from enthusiast to general audience: almost nobody is searching for passkey *management* yet, and most are searching for a definition.

At the head-term level, "passkey" draws about 42% of the search interest of "password manager", and "2fa" draws about 67% — both substantial, and both converging on the same job.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

A passkey is a key pair where the private half lives encrypted on your device and the site only stores the public half. Because there is no shared secret, a fake site cannot collect anything reusable, and your device unlock becomes the second factor. Create one from a site's sign-in page, approve it with Face ID or your device PIN, and log in with a tap and a signature next time.

## Next steps

- [Passkeys and autofill in the browser](/blog/passkeys-and-autofill) — the OpenKey implementation
- [What is a password manager?](/blog/what-is-a-password-manager) — where passkeys live
- [Browser extension](/guide/extension) — WebAuthn setup and fallback behaviour
- [Two-factor authentication](/blog/two-factor-authentication) — what passkeys replace
