---
title: "Autofill passwords: how to set it up and fix it"
description: What autofill is, how to turn on password autofill in Chrome, Firefox, Safari, and on mobile, and how OpenKey fills logins, cards, and passkeys.
date: 2026-09-14
cover: /blog/covers/autofill-passwords.png
---

# Autofill passwords: how to set it up and fix it

**Autofill** is the feature that turns a password manager from a place where passwords go into a tool you actually use. Instead of opening the vault, finding the right entry, and copying a string, you focus a username field and a suggestion appears.

This is where most people first search — "how to autofill", "autofill password", "autofill chrome", "autofill iphone" — and where most people first give up. So: what it is, how to turn it on everywhere, and how to make it reliable.

## What autofill actually does

Three separate mechanisms share the name:

1. **Form autofill** — a login page is detected, the manager offers matching entries, you tap one, and username and password are filled.
2. **Save prompts** — after you log in, the manager offers to store or update the credentials.
3. **Password generation** — on a sign-up form, the manager can create a strong password and write it into the field as you type.

The third one is the underrated part. Generating a password *during* signup is the single best habit change available: it removes the moment where you would otherwise invent something weak, because the field is filled before you can type over it.

## Turn on autofill in Chrome

Chrome's built-in manager and a third-party manager both live in the same place, which is why this gets confusing.

1. Open `chrome://settings/addresses` (passwords and autofill).
2. Set **Offer to save passwords** on.
3. Set **Automatically sign in with saved passwords** on, if you want one-tap sign-in.
4. Under **Passwords, passkeys and autofill**, choose the manager you want to use — Chrome's built-in, or your password manager's extension.
5. If you use an extension, open its popup once and confirm it is unlocked.

Keyboard-first filling usually works too: `Ctrl+Shift+L` on Windows and Linux, `⌘⇧L` on macOS. If a different extension already claimed it, remap under the browser's extension keyboard shortcuts.

## Autofill in Firefox

Firefox has its own built-in manager and is stricter about which extensions may fill. If suggestions do not appear, check that the extension is allowed on that site, and that the extension is unlocked. Firefox uses `openkey@openselfhosting.local` for the native messaging host automatically — no manual manifest editing on that platform.

## Autofill on iPhone and iPad

iOS does not have a global "fill from any app" toggle the way Android does. You use **AutoFill Passwords** in a per-app flow:

1. Install your password manager and enable it as an AutoFill provider in system settings.
2. In the app you are logging into, tap the username or password field and pick your provider from the field menu (or the keyboard's password row).
3. Approve with Face ID / Touch ID when prompted.

Two iOS habits worth knowing: if OpenKey does not show up in the provider list, it has not been enabled in system settings, and iOS sometimes needs the target app restarted after you change providers. [Passkeys](/blog/what-are-passkeys) also ride the same AutoFill picker, so the same setup covers both.

## Autofill on Android

Android exposes a real system-wide password and passkey provider, which makes it the smoothest of the mobile platforms:

1. Open **Settings → Security → Autofill service** and pick your manager.
2. Grant the permission prompts.
3. In your manager's settings, choose **inline suggestions** or a **popup**, and optionally require a biometric before every fill.
4. Confirm with a test login on a site you already have credentials for.

Requiring biometrics before fill is a meaningful upgrade: it closes the "someone walks up to your unlocked phone and reads your inbox passwords" hole without making autofill annoying.

## Autofill on desktop apps

Desktop autofill is a two-part handshake. The app registers a **native messaging host** when you enable its Autofill setting, and the browser extension then talks to the unlocked app over a local socket. On macOS the host script needs Python 3 on your `PATH`; on Linux and Windows the app writes the manifests for you when you toggle the setting.

If the extension cannot reach the app, this handshake is almost always the cause — see [autofill not working](/blog/autofill-not-working) for the full checklist.

## Setting up OpenKey autofill

| Platform | Steps |
|----------|-------|
| Android | **Settings → Security** → enable OpenKey as the system provider → unlock the vault |
| iOS / macOS | Enable OpenKey in system AutoFill settings → grant OS prompts → restart the target app |
| Windows / Linux | **Settings → Security** → enable Autofill to register the native host |
| Browser | Build and load `openkey_extension` → set the server URL, or choose **Use desktop app** |

Two unlock modes are available. **Standalone** unlocks the extension against your self-hosted server with your email and master password. **Desktop bridge** fills through the already-unlocked app, with no separate extension unlock — usually the nicer daily experience because the app is the single place you unlock.

Full walkthrough: [Browser extension guide](/guide/extension).

## Why autofill is also a security feature

Autofill is not just a convenience; it is a control.

- **Phishing resistance.** A manager that matches a login to the exact origin it was saved for will offer nothing on a lookalike domain. Manually pasting a password into a convincing copy of your bank is exactly the attack autofill prevents.
- **Fewer plaintext copies.** No password manager app, no clipboard history entry, no password sitting in a notes file.
- **Natural rotation.** When a site prompts for a new password, generating one inline makes unique passwords the path of least resistance.

## Autofill and passkeys

Passkeys remove the password field entirely, so there is nothing to autofill — the credential is retrieved from the vault and signed on the spot. The same unlock you use for autofill covers WebAuthn, which is why setting up the provider once does both jobs. [What are passkeys?](/blog/what-are-passkeys)

## What search data says

Autofill is a large, intent-rich query cluster. From Google Trends (worldwide, last 12 months), the refinements people add to "autofill":

| Related query | Relative interest |
|---------------|-------------------|
| how to autofill | 100 |
| autofill iphone | 44 |
| google autofill | 42 |
| chrome autofill | 38 |
| autofill password | 35 |
| autofill passwords | 28 |
| what is autofill | 21 |
| autofill extension | 17 |
| autofill settings | 13 |
| safari autofill | 12 |
| password manager | 10 |

Read that as a funnel: people arrive not knowing what autofill is, land on a specific platform, then get stuck on settings. And within the *troubleshooting* cluster — a set of long-tail terms compared against each other — "autofill not working" is roughly **55%** as popular as "autofill extension", which is a very large population of people whose autofill broke and who need a fix more than a tutorial.

The same data shows "google chrome autofill settings" as the fastest-rising refinement under the Chrome cluster, up about 70% year over year.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## If autofill is not working

Nine out of ten cases are one of five things: the vault is locked, the wrong provider is selected in system settings, the extension is not connected to the app, the browser needs a restart after a provider change, or autofill is deliberately restricted to one browser. Work through [autofill not working](/blog/autofill-not-working) for the step-by-step version.

## Next steps

- [Autofill not working](/blog/autofill-not-working) — the full troubleshooting checklist
- [Browser extension](/guide/extension) — install, unlock modes, native messaging
- [What are passkeys?](/blog/what-are-passkeys) — the next step after autofill works
- [Using the app](/guide/app) — Autofill and browser settings in context
