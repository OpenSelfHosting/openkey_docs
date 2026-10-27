---
title: "Autofill not working: fixes that actually work"
description: Why password autofill stops working in Chrome, Firefox, Safari, and on mobile — the five common causes and the fixes, in order of likelihood.
date: 2026-09-15
cover: /blog/covers/autofill-not-working.png
---

# Autofill not working: fixes that actually work

Autofill breaks in a small number of predictable ways. In practice the cause is almost never a bug: it is a locked vault, the wrong provider selected, a bridge that stopped connecting, an app that needs restarting, or a browser that has quietly started filling from somewhere else.

Work through these in order of likelihood. It takes about five minutes and resolves the overwhelming majority of cases.

## Fix 1: Unlock the vault

The most common cause by a wide margin, and the easiest to miss, because the app *looks* installed and enabled.

- **Extension standalone mode:** open the extension popup and unlock it. A locked extension cannot decrypt anything, so it offers nothing.
- **Desktop bridge mode:** the desktop app must be unlocked. The bridge refuses work while the vault is locked, by design.
- **Mobile:** open the app and unlock before you focus the field. Locking on idle means autofill pauses too.

If suggestions appear only immediately after you unlock and then vanish, this is your answer.

## Fix 2: Check the system provider

Changing your password manager does not always change what the OS offers.

| Platform | Where to check |
|----------|----------------|
| Android | Settings → Security → **Autofill service** |
| iOS / iPadOS | Settings → Passwords → **AutoFill Passwords** |
| macOS | System Settings → General → **AutoFill & Passwords** |
| Windows | Settings → Accounts → **Passwords** (credential providers) |
| Chrome | Settings → Passwords, passkeys and autofill → **Password manager** |

If two managers are enabled, the OS picks one and the other looks broken. Disable the one you do not want, or deliberately choose the one you do — and confirm the same choice in the browser.

## Fix 3: Restart the target app or browser

Changing a credential provider does not always take effect in a process that is already running. This is routine, not a bug:

- Mobile: force-quit the app you are trying to autofill into, then reopen it.
- Desktop: fully quit the browser (not just the window) and reopen.
- If the browser is the problem, restart it before changing anything else — an extension reload often re-registers the native host.

## Fix 4: Reconnect the desktop bridge

Desktop autofill is a two-part handshake: the app registers a native messaging host, and the extension talks to it over a local socket. It fails when the host registration is missing or stale.

1. Unlock the OpenKey desktop app.
2. Open **Settings → Security** and toggle Autofill — this (re)registers the native messaging host.
3. On Chromium browsers, write your unpacked extension ID to the platform file, then toggle Autofill again so the manifest regenerates:

| Platform | Extension ID file |
|----------|-------------------|
| Windows | `%LOCALAPPDATA%\OpenKey\chrome_extension_id.txt` |
| Linux | `~/.local/share/OpenKey/chrome_extension_id.txt` |

4. In the extension, choose **Use desktop app**.
5. macOS only: confirm Python 3 is on your `PATH` — the host script requires it.

Also make sure the vault is **still unlocked** when you test. The bridge socket only exists during an unlocked session.

## Fix 5: Check for a competing manager

Chrome and Edge both ship built-in password storage, and both will happily keep filling on their own. If suggestions "disappear" and credentials get filled anyway, the built-in manager is doing it.

- Turn off automatic sign-in for saved passwords in browser settings, or
- Delete the built-in entry and let your manager own the login.

The same conflict shows up between iCloud Keychain and a third-party AutoFill provider, and between two extensions that both request `<all_urls>`.

## Platform-specific causes

### Chrome

Extension site access: `chrome://extensions` → your extension → **Details** → Site access → *On all sites*, or *On click* if you prefer explicit grants. Autofill needs page access to detect fields.

If another extension claimed the fill shortcut, remap under `chrome://extensions/shortcuts`.

### Firefox

Firefox asks for permission the first time an extension wants to fill on a site, and silently declines some all-sites requests. Check the extension's permissions in `about:addons` → Permissions → Access your data for all websites.

Firefox uses the `openkey@openselfhosting.local` native host automatically; no manual manifest work is needed on that platform.

### Safari

Safari's AutoFill and your manager are separate panels. Enable the manager in System Settings, then in Safari make sure **Passwords** autofill is on. Safari can also auto-fill with a *different* credential provider if the ordering in system settings changed — verify the selection order, not just the toggle.

### iOS and Android

- **Per-app state:** iOS only offers providers in a field's menu, so the symptom is "the option is not there" rather than "it filled the wrong thing".
- **Permission prompts:** the OS asks for local-network or biometric permissions during setup. A denied prompt looks like a broken manager.
- **Biometrics before fill:** if you enabled biometric-before-fill, every fill now needs an approval. That is correct behaviour, not a fault.
- **Background restrictions:** aggressive battery optimisers on Android can kill the provider process, so suggestions appear only while the app is foregrounded.

## Diagnosing with the browser's autofill audit

Browsers ship a diagnostic that reports every field they saw, every suggestion offered, and why it was rejected. This turns guessing into a two-minute process.

In Chrome, open DevTools → **Application** → **Autofill**, then reproduce the fill on the page. You get the detected fields, the dropdown items offered, and the reason for any suppression. `autofill.creditCards` and `autofill.profiles` can also be toggled in `chrome://flags` when card or address autofill is the part that is failing.

Firefox: `about:debugging` → inspect the extension, and check its console for fill-time errors.

## If you use OpenKey specifically

| Symptom | Check |
|---------|-------|
| No suggestions in the browser | Extension unlocked, or desktop app unlocked and **Use desktop app** selected |
| "Extension cannot talk to the desktop app" | Native host registration, extension ID file, Python 3 on macOS |
| Nothing on Android | **Settings → Security → Autofill** enabled in Android, then unlock the app |
| Nothing on iOS | AutoFill provider enabled in system settings; restart the target app |
| Passkeys fall back to the browser | Expected when you pick **Use browser**, or when the extension vault is locked |
| Fill works, save does not | Confirm the in-page save banner is not being blocked by the page |

The extension needs `<all_urls>` host access to detect fields, capture logins, and intercept WebAuthn on arbitrary sites — a fixed allowlist cannot cover the open web. Everything it decrypts stays on your device or your own server; page content is not sent to a vendor cloud.

## What search data says

This is a big query cluster, which is a good sign for anyone who has hit it. Comparing long-tail autofill troubleshooting terms against each other (Google Trends, worldwide, last 12 months):

| Query | Relative interest in cluster |
|-------|-------------------------------|
| autofill extension | 100 |
| autofill safari | 71 |
| **autofill not working** | **55** |
| password autofill chrome | 33 |
| chrome autofill not working | 2 |

"Autofill not working" reaching over half the interest of the generic "autofill extension" term means a very large audience arrives already broken. Under the Chrome cluster specifically, "google chrome autofill settings" is the top related query at 100 and the fastest-rising at about +70% year over year, with "chrome autofill extension" at 62 and "chrome autofill not working" at 16.

That distribution suggests a specific support strategy: settings-oriented content and a trustworthy troubleshooting checklist will reach more people than another feature announcement.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The 30-second version

Unlock the vault. Confirm the right system provider is selected. Restart the app or browser. Re-toggle Autofill in the app to re-register the native host. Disable any competing manager. If it still fails, open the browser's autofill audit and read the rejection reason — it names the problem.

## Next steps

- [Autofill passwords](/blog/autofill-passwords) — the setup guide
- [Browser extension](/guide/extension) — unlock modes and native messaging detail
- [FAQ & troubleshooting](/guide/faq) — OpenKey-specific fixes
- [What are passkeys?](/blog/what-are-passkeys) — the credential type that replaces passwords
