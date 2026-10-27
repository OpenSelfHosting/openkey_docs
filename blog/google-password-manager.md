---
title: "Google Password Manager: when to stay and when to move"
description: What Google Password Manager does well, where it stops, how to export from it, and how to get your passwords out of the Chrome ecosystem into a vault you control.
date: 2026-09-21
cover: /blog/covers/google-password-manager.png
---

# Google Password Manager: when to stay and when to move

"google password manager" is the single strongest refinement of the head term **password manager** — a perfect 100 relative interest, ahead of every competitor brand. "google password" is not far behind at 93. That is not a coincidence: a large share of people who search for "password manager" are already using one and do not realise it, because Google turned it on for them.

So the useful question is not "is it good?" — it is very good. The question is **when to stay and when to move**.

## What you already have

Google Password Manager is built into Chrome and Android, and works on other browsers through a Google account. It stores passwords, passkeys, codes, and payment cards, generates passwords, flags compromised credentials, and autofills across your Google devices. It is free, and it is genuinely competent.

For a lot of people, in one ecosystem, it is the correct answer with no further thought required.

## The five reasons people leave

### 1. Ecosystem lock-in

The vault lives in a Google account. That is excellent until you want to leave — at which point your passwords are inside a Google export format, and everything you built around it (families, sharing, hardware keys) came with it.

### 2. Sharing outside the ecosystem

Sharing works well between Google accounts and is awkward with everyone else. If anyone in your household or team is not on Google, you end up duplicating entries or falling back to something insecure.

### 3. No self-hosting

There is no option to run the sync on your own hardware. If keeping encrypted data on infrastructure you control is a requirement, this is disqualifying rather than a preference.

### 4. Browser coupling

If you use Firefox or Safari, Chrome's manager is not your native autofill provider. You are back to a third-party extension or the platform's own store, and the integration advantage disappears.

### 5. The security model is a trade

The vault is protected by your Google account credentials and device unlock, with Google's account recovery as a backstop. That is a reasonable design — but it is a fundamentally different trust model from a zero-knowledge vault where nobody, including the provider, can recover your data. Neither is wrong. They are different answers to "who is the fallback if I forget my master password", and you should pick the answer you are comfortable with rather than the one that is easiest.

## Staying: make Google Password Manager good

If you are staying, these are the settings that matter:

1. **Turn on passkeys** where sites offer them — they are the strongest credential and the manager handles them well.
2. **Enable the built-in generator at signup**, so new passwords are never invented.
3. **Check the Password Checkup** (Security → Password Checkup) and act on reused or compromised entries.
4. **Add a recovery email and a recovery phone** you actually control.
5. **Add a passkey as a second factor** on the Google account itself — not just a password.
6. **Turn on encrypted sync** if offered in your region, and never leave a logged-in browser profile unlocked on a shared machine.

## Moving: export from Chrome

Chrome's export is a plain CSV. It is quick, and it is the most common file people accidentally leave lying around — treat it as a live copy of your passwords.

```bash
# Take a backup of the export before you do anything else
cp passwords.csv ~/secure-backup-dir/chrome-export-$(date +%F).csv
```

1. Open `chrome://password-manager/settings`.
2. Find **Export passwords** (or `chrome://password-manager/export`).
3. Save the CSV.
4. **Immediately** move it out of your Downloads folder to encrypted storage.

The CSV contains `name`, `url`, `username`, `password`, and `note` columns. Custom fields are limited, and cards may arrive in a separate export depending on your account setup.

## Importing into a manager you control

In OpenKey: **Settings → Data → Import & export → Import → Chrome CSV**. Choose the file, confirm, and the import runs locally — your plaintext does not go to a server.

What to expect: logins arrive as entries, `url` becomes the site match, `username` and `password` map directly, and `note` becomes the entry's notes field. Nested folders do not exist in Chrome's export, so you will want to build a collection structure afterwards — the useful one being **collections by trust level** (finance, work, shopping, throwaway) rather than by site.

Then:

1. **Turn on autofill** in the new manager before you do anything else ([setup guide](/blog/autofill-passwords)).
2. **Disable Chrome's autofill** so the two do not fight: `chrome://settings/addresses` → turn off automatic sign-in with saved passwords, and set the password manager to the new one.
3. **Delete your Chrome password store** once the new vault is verified — `chrome://password-manager/settings` → **Delete passwords from Chrome**.
4. **Securely delete the CSV.**
5. **Rotate the important passwords** that spent time in plaintext: email, banking, cloud.

Full walkthrough, including troubleshooting: [Import passwords from Chrome](/blog/import-passwords-from-chrome).

## A suggested collection structure

Once imported, reorganise by trust rather than by habit:

| Collection | Contents | Handling |
|-----------|----------|----------|
| Finance | Banking, payments, tax | 2FA plus passkey where possible |
| Identity | Email, government, cloud root | Strongest passwords, passkeys, hardware key backup |
| Work | Employer accounts | Never reuse; review on offboarding |
| Shopping | Everything disposable | Long random passwords, no 2FA effort |
| Devices | Router, NAS, camera, smart home | Generated, stored offline too |

## What search data says

Google's brand is the gravitational centre of this category. Google Trends (worldwide, last 12 months) refinements of "password manager":

| Related query | Relative interest |
|---------------|-------------------|
| **google password manager** | **100** |
| google password | 93 |
| what is a password manager | 39 |
| best password manager | 25 |
| free password manager | 17 |
| password manager app | 17 |
| chrome password manager | 10 |
| password manager android | 9 |
| windows password manager | 8 |
| apple password manager | 8 |
| microsoft password manager | 7 |
| bitwarden | 7 |
| gmail password manager | 5 |
| samsung password manager | 5 |
| 1password | 4 |

Read the shape of that table carefully. The four platform built-ins — Google, Windows, Apple, Microsoft — all appear, and the "app" variant of the query resolves to "google password manager app" at 100. Meanwhile the dedicated-brand terms are far lower: Bitwarden at 7, 1Password at 4.

The category's search traffic is overwhelmingly **"I already have one, which is fine"** rather than "help me choose". Two consequences for anyone publishing in this space: a large share of searchers need migration and troubleshooting content more than they need buying guides, and platform built-ins are competing on defaults rather than features.

A separate cluster shows the same pattern — under "password manager android", "google password manager android" leads at 100, with "chrome password manager android" at 20 and "best free password manager android" rising about 80% year over year. Under "chrome password manager", the only strong related query is "chrome password manager security" at 100, itself rising about 50%, which reads as people asking whether it is safe rather than how to use it.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

Google Password Manager is free, good, and the right answer if your whole life is in one Google ecosystem and you are comfortable with Google as the recovery path. Leave it if you need sharing with non-Google accounts, cross-browser native autofill, or your own server. If you leave, export the CSV, import it locally, turn on autofill in the new manager, disable Chrome's autofill, delete Chrome's stored passwords, shred the CSV, and rotate anything that sat in plaintext.

## Next steps

- [Import passwords from Chrome](/blog/import-passwords-from-chrome) — the full walkthrough
- [What is a password manager?](/blog/what-is-a-password-manager) — the fundamentals
- [Autofill passwords](/blog/autofill-passwords) — make the switch seamless
- [Self-hosted password manager](/blog/self-hosted-password-manager) — the own-your-data route
