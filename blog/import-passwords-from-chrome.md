---
title: Import passwords from Chrome
description: How to export passwords from Chrome, Edge, and Google Password Manager, import them into another password manager, and then delete the export safely.
date: 2026-09-25
cover: /blog/covers/import-passwords-from-chrome.png
---

# Import passwords from Chrome

The export is the easy part. The dangerous part is the ten minutes afterwards, when a plaintext CSV containing every password you own is sitting in your Downloads folder.

This is the full process: export from Chrome, Edge, or Google Password Manager; import into your new vault; verify; then destroy the file. Budget fifteen minutes the first time.

## First, understand what you are about to create

A Chrome password export is a **plaintext CSV**. Anyone who opens it has your passwords — no master password, no encryption, no second factor. Treat it like a printed list of your house keys.

Three rules for the whole procedure:

1. **Never email it, message it, or upload it to a converter site.** Uploading a password export to a third-party "convert my CSV" tool hands over your entire vault.
2. **Do the import on the device where the file already is.** Moving the file around multiplies your exposure.
3. **Delete the export the moment the import is verified** — properly, not just by emptying the trash.

## Export from Chrome

Chrome's built-in manager and Google Password Manager (the account-synced version) are the same export path, and both are covered.

1. Open `chrome://password-manager/settings`.
2. Scroll to **Export passwords**, or go directly to `chrome://password-manager/export`.
3. Chrome asks you to re-authenticate — enter your Google account password or your device credentials.
4. Save the file, then **move it out of Downloads** into an encrypted location before you do anything else.

```bash
# Immediately get it out of Downloads and note the date
mkdir -p ~/secure-vault-staging
mv ~/Downloads/passwords*.csv ~/secure-vault-staging/chrome-export-$(date +%F).csv
chmod 600 ~/secure-vault-staging/chrome-export-*.csv
```

### What is in the file

| Column | Contents |
|--------|----------|
| `name` | The site name as Chrome saved it |
| `url` | The full URL, including the subdomain |
| `username` | Your username or email |
| `password` | The password, in plaintext |
| `note` | Any note you added |

There is no folder structure — Chrome does not have folders. Everything lands flat, which is why the collection step afterwards matters.

## Export from Edge

Microsoft Edge uses the same Chromium password store:

1. Open `edge://wallet/passwords`.
2. **More settings → Export passwords**, or go to `edge://wallet/exportpasswords`.
3. Re-authenticate, save, move the file somewhere encrypted.

## Export from Google Password Manager directly

If you use the account-synced manager across devices, you can export from any logged-in browser at `passwords.google.com` → **Export passwords**. It produces the same CSV, and the same rules apply.

## Import into OpenKey

1. Install and unlock OpenKey.
2. **Settings → Data → Import & export → Import**.
3. Choose **Chrome CSV**.
4. Select the file and confirm.

The import is entirely local. There is no server round-trip, and your plaintext does not go to a sync server — which matters if you use a self-hosted server, because the CSV never becomes something the server could be asked to produce.

Other supported formats, if you are consolidating several sources at once: **Bitwarden JSON**, **LastPass CSV**, **1Password CSV**, **KeePass `.kdbx`** (database password and optional key file), and OpenKey's own JSON. Folders become collections where they map.

## Reorganise: build collections by trust level

The import is flat, and flat vaults get reused passwords because you cannot see the risk. Thirty minutes of tidying pays for itself:

| Collection | What goes in it | Rule |
|-----------|-----------------|------|
| Identity | Email, cloud root, government | Strongest passwords, passkeys, a hardware-key backup |
| Finance | Banking, payment cards, tax | 2FA on everything; passkeys where offered |
| Work | Employer accounts | Never reused; offboarding checklist |
| Shopping and social | Everything disposable | Long generated passwords, no effort spent |
| Devices | Router, NAS, cameras, smart home | Generated; also stored offline |

Then set a rule for yourself: **nothing new goes into Shopping or Social with a reused password.** With autofill on, that happens automatically anyway.

## Turn on autofill immediately

This is the step that makes the migration self-repairing. Once autofill works, every login from now on is saved for you, so the vault improves itself while you work through the important accounts.

- [Autofill passwords](/blog/autofill-passwords) — the setup guide
- [Autofill not working](/blog/autofill-not-working) — when suggestions are missing

Then **disable Chrome's own autofill** so the two do not compete:

1. `chrome://settings/addresses`.
2. Turn off **Offer to save passwords** and **Automatically sign in with saved passwords**.
3. Set the password manager to the one you want to use.

## Fix the highest-value accounts

Do not rotate 400 passwords. Work down a list:

1. **Email** — it resets everything else.
2. **Banking and cloud storage** — cloud can hold the rest.
3. **Your primary social account**.
4. Everything else, as each site next asks.

Generate each password locally as you go:

```bash
openkey gen -l 24 -c
```

Add 2FA while you are already in security settings ([guide](/blog/two-factor-authentication)), and add a passkey wherever the site offers one ([what are passkeys?](/blog/what-are-passkeys)).

## Verify before you delete anything

Do not skip this. Check:

- [ ] A handful of important logins open correctly from the new vault.
- [ ] TOTP entries, if you had them, produce valid codes.
- [ ] Autofill works in your main browser **and** on your phone.
- [ ] You can sign in on a **second device** and see the same entries.
- [ ] You have taken one **encrypted local backup** (`.okbak` in OpenKey).

Only then proceed to deletion.

## Delete the export, properly

```bash
# Overwrite the file, then remove it
for f in ~/secure-vault-staging/chrome-export-*.csv; do
  dd if=/dev/urandom of="$f" bs=1M count=8 conv=notrunc status=none
  rm -f "$f"
done
```

`shred` is more reliable when it is available, but neither approach is dependable on SSDs and copy-on-write filesystems. The practical answer is to overwrite what you can and then rotate anything that sat in plaintext long enough to worry about.

A password in a plaintext CSV for a week is not a crisis; the same password still in that file a year later is.

Then delete the browser's stored copy: `chrome://password-manager/settings` → **Delete passwords from Chrome**.

## What search data says

Migration is a large, specific intent — the searcher knows what they want to *do*, not what to buy. Google Trends (worldwide, last 12 months) compares these migration terms against each other:

| Query | Relative interest in cluster |
|-------|-------------------------------|
| export passwords chrome | 100 |
| **import passwords from chrome** | **46** |
| chrome password manager export | 11 |
| move passwords to another password manager | 1 |
| import passwords from lastpass | 0.1 |

The first two are the whole story, and the ratio between them is the useful finding: **people search for the export more than twice as much as the import.** That is the wrong way round for safety, because the export creates the exposed artifact and the import is the part that fixes the problem. Content that leads with the export path should immediately hand off to the import and then to the deletion step.

The long tail is also thin and mostly English-native phrasing, which suggests a small, well-defined audience that already knows the vocabulary — the kind of reader who benefits more from a precise walkthrough than from a comparison.

Method: Google Trends, worldwide, last 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

Export from `chrome://password-manager/settings`, move the plaintext CSV out of Downloads immediately, import it locally into your new vault, build collections by trust level, turn on autofill and disable Chrome's, rotate email and banking, verify on a second device, then overwrite and delete the CSV and remove Chrome's stored copy.

## Next steps

- [Autofill passwords](/blog/autofill-passwords) — do this before you rotate anything
- [Google Password Manager](/blog/google-password-manager) — the same walkthrough, framed around Google's ecosystem
- [Strong password generator](/blog/strong-password-generator) — what to rotate to
- [Import & export](/guide/import-export) — every supported format, free vs Pro
