# Privacy Policy

**Last updated:** 6 August 2026  
**Product:** OpenKey (`com.openselfhosting.openkey`)  
**Publisher:** OpenSelfHosting  
**Contact:** [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com) · Security: [security@openselfhosting.com](mailto:security@openselfhosting.com)

This Privacy Policy describes how the **OpenKey** mobile and desktop app handles information. OpenKey is designed as a **zero-knowledge** password manager: vault secrets are encrypted on your device before they leave it.

Related reading: [Security](/guide/security) · [Terms of Service](/terms)

## Summary

| Topic | Practice |
|-------|----------|
| Master password | Never leaves your device in plaintext |
| Vault contents | Encrypted on device (AES-256-GCM); optional sync sends **ciphertext only** |
| Our cloud | OpenKey does **not** operate a mandatory vendor vault cloud for your passwords |
| Self-hosted server | If you connect one, **you** (or your org) operate it and control that data |
| Store billing | Pro purchases go through Apple / Google / Microsoft store billing where available |

## Who this covers

This policy applies to the official OpenKey **app** (Android, iOS, macOS, Windows, and Linux). Separate packages (self-hosted server, browser extension, CLI, documentation site) follow the same zero-knowledge principles; operators of a self-hosted server are controllers of that instance’s operational data (see below).

## Information we do not collect

OpenSelfHosting does **not** receive your:

- Master password
- Plaintext vault key
- Decrypted logins, notes, TOTP secrets, payment cards, crypto wallet data, developer secrets, or attachment contents
- Full page HTML from websites you visit (the browser extension does not exfiltrate pages to a vendor cloud)

We do not sell personal data.

## Information processed on your device

OpenKey stores and processes the following **locally** on your device (encrypted at rest after unlock setup):

- Vault database (collections, entries, attachments metadata/blobs as ciphertext when locked/synced)
- App settings (appearance, language, autofill preferences, server URL you enter, Nearby preferences)
- Optional biometric wrap of unlock material (handled by the OS secure enclave / keystore where available)
- Cached sync tokens for a server **you** configure (access JWTs / refresh material stored by the app for that host)

Deleting the app or wiping the device removes local data subject to OS backups you control.

## Optional self-hosted sync server

If you enable **Settings → Data → Self-hosted server**, the app sends to **your** API (or one you choose):

- Email (account identifier)
- Client-derived `auth_hash` (not the master password)
- Salt and KDF parameters
- Wrapped (encrypted) vault key and opaque ciphertext for vault items, attachments, orgs, and shares

The OpenKey project’s reference server is designed to store **ciphertext only**. Whoever runs that server (you, your company, or a host you trust) can see metadata such as email, ciphertext sizes, and timestamps, and can delete or withhold data — but cannot decrypt vault contents by design. See [Security](/guide/security).

## Nearby LAN sync (Pro)

Nearby pairs devices on your local network and, after **Link vault**, syncs vault ciphertext between those devices. Pairing and vault-key sharing happen on your LAN between devices you choose. OpenSelfHosting does not receive Nearby traffic.

## Autofill, passkeys, and the browser extension

- **System Autofill / Credential Provider** shares credentials with apps and sites only through OS-mediated fill flows you initiate or approve.
- The **browser extension** can unlock against your server or fill via the unlocked desktop app (native messaging). Fill and save are intentional user actions. See [Browser extension](/guide/extension).

## Purchases and subscriptions (OpenKey Pro)

Where Pro is sold through an app store, payment processing, receipts, and related account data are handled by **Apple, Google, or Microsoft** under their policies. OpenKey may receive store entitlements / purchase status needed to unlock Pro features. We do not receive your full payment card number from those stores.

**LAN Pro** attestation between Nearby peers is a local convenience on some desktop platforms — not a cloud billing account with OpenSelfHosting.

## Diagnostics and support

OpenKey does not include a mandatory third-party analytics SDK that uploads vault content. If you email support ([openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)) or Telegram community channels, you choose what to include (for example app version). Do not send master passwords or vault exports in cleartext email.

## Children’s privacy

OpenKey is not directed at children under 13 (or the minimum age required in your jurisdiction). Do not use the app if you are under that age.

## International processing

Processing occurs on your devices and, if you configure sync, on the server host you choose. If you contact us, messages may be processed in the regions where our mail or support tools operate.

## Retention

- **On device:** until you delete the vault, uninstall the app, or wipe the device / backups.
- **On your sync server:** until you delete your server account or the operator deletes data; tombstones may remain until peers sync.
- **Support email:** retained as needed to respond and for legitimate security/legal purposes.

## Your choices

- Use OpenKey fully offline without a server
- Choose or refuse Nearby pairing
- Export or delete local data (export / backup may require Pro)
- Delete a server account via the authenticated delete flow (removes server ciphertext; local copies remain until you wipe them)
- Revoke store subscriptions through the store’s subscription management

## Changes

We may update this policy as the product changes. The “Last updated” date will change; material changes may also be noted in the [changelog](/guide/changelog) or in-app About links.

## Contact

- Product / support: [openkey@openselfhosting.com](mailto:openkey@openselfhosting.com)
- Security reports: [security@openselfhosting.com](mailto:security@openselfhosting.com) — see [Reporting vulnerabilities](/guide/security#reporting-vulnerabilities)
- Organization: [OpenSelfHosting](https://github.com/OpenSelfHosting) · Product: [openkey.openselfhosting.com](https://openkey.openselfhosting.com) · Company: [openselfhosting.com](https://openselfhosting.com)

Next: [Terms of Service](/terms) · [Security](/guide/security) · [Using the app](/guide/app)
