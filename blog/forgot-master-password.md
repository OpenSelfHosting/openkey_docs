---
title: Forgot your master password? What is actually recoverable
description: A forgotten password manager master password usually cannot be recovered. Here is what each design can and cannot restore, how to check you are not locked out, and how to make it impossible to happen again.
date: 2026-09-26
cover: /blog/covers/forgot-master-password.png
---

# Forgot your master password? What is actually recoverable

The honest answer, for any properly designed zero-knowledge password manager, is **nothing**. There is no support agent who can reset it, no admin who can set a new one, and no server-side copy that can be decrypted on your behalf. That is not a bug or a missing feature — it is the property that makes the design worth having.

This article explains what each architecture can and cannot restore, how to find out which situation you are in before you panic, and how to make sure this never applies to you again.

## First: work out which situation you are in

Most "I forgot my master password" problems are not that. Check in this order.

### 1. A device is still unlocked

If any device still has an unlocked session — a phone in your pocket, a desktop app you left open — your vault is readable **right now**. Do not lock it. Open it, change the master password to something you will remember, and sync before you touch anything else.

In OpenKey, changing the master password rotates your credentials (`/auth/rekey` on the server): the vault key itself stays the same, and only the auth hash and wrapped vault key are updated. Other devices then sync with the **new** master password.

### 2. You have a device with biometric unlock enabled

Biometrics wrap the vault key on device. That does not help if you cannot get past the device's own lock screen — but on a device you can unlock with a PIN or your own biometrics, the vault is reachable without typing the master password.

### 3. You have an encrypted local backup

If you made an `.okbak` (OpenKey) or an equivalent encrypted export, and you know the master password it was encrypted with, you can restore. Note the catch: OpenKey backups are restored with your **vault credentials**, so a backup encrypted under a master password you have forgotten is not a way around the problem.

### 4. The password manager offers an account-recovery path

Some managers store an encrypted recovery key or escrow, which makes a forgotten master password recoverable **at the cost of the zero-knowledge property**. If yours does, this is the one case where recovery is possible. It is also the reason to check this before you need it.

### 5. You genuinely have nothing

No unlocked device, no backup, no recovery path. Then the data is cryptographically unrecoverable. Not "contact support" — unrecoverable. This is the design working as intended, and it is also the moment to stop looking for a trick.

## What each architecture can and cannot do

| Architecture | Forgotten master password | Why |
|--------------|---------------------------|-----|
| Zero-knowledge, client-side encryption (**OpenKey**) | Not recoverable | The server holds a wrapped key and an `auth_hash`; neither reverses to the password |
| Vendor cloud, zero-knowledge | Not recoverable | Same model, different operator |
| Vendor cloud with escrow or recovery key | Recoverable | The provider can decrypt, which is exactly the trade-off |
| Local file manager (KeePass-style) | Not recoverable, but you may have the database key | The database password *is* the master password; a key file is a second factor |
| OS or platform store | Often recoverable via the platform account | The platform can reset your credential |

The security page documents the OpenKey position explicitly: a compromised server admin can delete or withhold ciphertext and observe metadata, but cannot decrypt entries or recover the master password from the `auth_hash` alone. [See the threat model](/guide/security).

## Why the `auth_hash` does not help an attacker

When you log in, OpenKey derives a master key with **Argon2id** from your email, master password, and a salt. From that it derives an `auth_hash`, which you send to the server, and separately wraps the **vault key**. So:

- The server stores `auth_hash`, the salt, the KDF parameters, and the wrapped vault key.
- An attacker with the whole database can attempt guesses against `auth_hash` offline.
- Each guess costs an Argon2id computation, which is deliberately slow.
- **And even a correct guess does not help**, because recovering the password does not decrypt the ciphertext unless the same guess also unwraps the vault key — and the server never stored it in the clear.

This is the difference between "expensive to attack" and "pointless to attack". A strong master password makes the first true; the architecture makes the second true regardless.

## How to check you are not locked out

Run this once, while you still remember the password.

1. **Confirm you can still reach the vault on at least two devices** — not one.
2. **Take an encrypted local backup** and store it offline, somewhere you would find in a crisis. Not the same device, not the same cloud account.
3. **Store the master password in a deliberate place** — a password manager you already trust, a sealed envelope, or an offline password card. This sounds redundant and is not: you are not storing a secret, you are storing the key to a secret you will otherwise lose.
4. **Write down what you have.** Which devices are paired, which have Nearby linked, where the backups are, whether the server URL is reachable. In a lockout, half the problem is not knowing your own setup.
5. **Test the restore.** Restore the backup onto a device you do not normally use. An untested backup is a belief, not a plan.

## Making it impossible to happen again

The fix is boring and it works.

**Use a passphrase, not a password.** Four to six unrelated words are longer, stronger, and far easier to recall than `P@ssw0rd1!`. The failure mode of a strong password is forgetting it; the failure mode of a passphrase is being unable to visualise the words you chose, which is a much rarer event.

```bash
openkey gen -l 24          # if you would rather use a random string
```

**Use a password manager you already trust for the master password.** Storing one high-value secret in a mature, widely used manager is a normal engineering trade: you accept a well-audited implementation in exchange for not relying on memory. There is no recursion problem here.

**Enable biometric unlock.** It does not replace the master password, but it means day-to-day use never requires typing it, so typing fatigue and mistyped resets stop mattering.

**Set up the accounts that can reset the others.** Change your email account's password and add a passkey or hardware key to it. This removes the most common real-world lockout, which is an email account you cannot access.

**Do not rotate for the sake of rotation.** A strong unique master password that is five years old is fine. Forced rotation on a schedule mainly produces weaker passwords.

## If you are locked out right now

1. Stop trying variations. Every failed login is a rate-limited attempt, and some managers will throttle or lock the account.
2. Look for an unlocked session on any device, and use it.
3. Look for an encrypted backup you can unlock.
4. Check whether your manager offers a recovery key or account recovery — some do, by design.
5. Accept it if none of the above exists. Then re-establish from scratch: new vault, new accounts, and use the password reset flow on each service. Start with email.

## What search data says

Password recovery is a high-anxiety query, and the brand names in it reveal who people are actually worried about. Google Trends (worldwide, last 12 months) refinements of "forgot master password":

| Related query | Relative interest |
|---------------|-------------------|
| lastpass forgot master password | 100 |
| dashlane forgot master password | 27 |

Both are brand-qualified, and LastPass dominates by a factor of nearly four. That pattern — brand name plus "forgot master password" — is people searching for **how a specific vendor handled a specific incident**, not for general advice. Whatever the history, the lasting effect on search behaviour is a durable association between that brand and this fear.

The general cluster tells a similar story. Comparing recovery terms against each other:

| Query | Relative interest in cluster |
|-------|-------------------------------|
| recover password | 100 |
| reset master password | 6 |
| forgot master password | 2 |
| master password recovery | 1.5 |
| lost master password | 0.2 |

"Recover password" is the general query, and it is mostly about ordinary account recovery rather than vault access. The genuinely-specific terms — "forgot master password", "lost master password" — are small in absolute terms. As a share of the category, "password vault" itself draws about **57%** of the interest of "master password" within that cluster, which tells you the master password is the thing people are searching *for*, and the vault is the thing they already have.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

If any device is unlocked, use it and rotate the password now. Otherwise, an encrypted backup is the only path back. With nothing, the data is cryptographically unrecoverable — that is the design, not a failure. To prevent it: a multi-word passphrase, the password stored in a manager you already trust, one offline encrypted backup tested on a second device, biometrics enabled, and a passkey on your email account.

## Next steps

- [What is a password manager?](/blog/what-is-a-password-manager) — why recovery is impossible by design
- [Zero-knowledge sync explained](/blog/zero-knowledge-sync) — the key derivation
- [Security](/guide/security) — the threat model in full
- [Import & export](/guide/import-export) — encrypted backups
