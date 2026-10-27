---
title: "Strong password generator: stop inventing passwords"
description: Why hand-invented passwords are weak, how to generate passwords that actually resist cracking, and how to check and fix the weak ones you already have.
date: 2026-09-18
cover: /blog/covers/strong-password-generator.png
---

# Strong password generator: stop inventing passwords

Human password invention is a solved problem with a bad answer. Almost everyone uses the same construction — a word, a capital letter, the year, `!` — and that construction is exactly what cracking tools assume. A generator removes the guesswork and the human from the loop entirely.

This is how to generate passwords that hold up, how to check the ones you already have, and how to fix the worst of them without spending an afternoon.

## Why `P@ssw0rd1!` fails

Attackers do not guess passwords one at a time. They run large-scale precomputation against whole populations, using patterns observed in real breaches:

- dictionary words, in several languages, plus names and brands
- keyboard walks (`qwerty`, `1qaz2wsx`) and their rotations
- dates: years, months, seasons
- leetspeak substitutions: `a→@`, `i→1`, `o→0`, `e→3`
- appended digits and a single trailing symbol

Your invented password lands in the intersection of several of those lists. Modern hardware tries billions of candidates per second against fast hashes, so a "complex" pattern that looks unguessable to a human is often cracked in hours or less.

## What makes a password strong

**Length beats complexity.** Each extra character multiplies the search space. Four unrelated words — `harbour-lantern-margarine-tricycle` — is both longer and easier to remember than `X7$kq2!`, and vastly harder to crack. Prefer a passphrase for your master password and random strings everywhere else.

**Randomness beats vocabulary.** A generator picking from a full character set produces a string with no pattern to exploit. A generator picking from a wordlist produces a passphrase, which is fine *if* the words are unrelated and there are enough of them.

**Uniqueness beats strength.** A 12-character password used on one site is fine. The same 12-character password on 40 sites is one breach away from 40 breaches. This is the point a password manager exists to make.

## How to use a generator

Any of these produce genuinely random output offline, with no network involved:

```bash
openkey gen -l 24                       # 24 characters
openkey gen -l 32 -a -c                 # avoid confusing characters, copy to clipboard
openkey gen -l 20 --no-symbols          # for sites that reject symbols
openkey --json gen -l 24                # machine-readable output
```

In the app, open **Settings → Password generator** to set your default length and character classes, or use the generator from an entry form. Online generators are worth avoiding for passwords you intend to keep: you are asking a stranger's server for a secret, and you cannot verify what it did with it.

### Choosing a length

| Context | Length |
|---------|--------|
| Your master password | 4–6 unrelated words, or 20+ characters |
| Email, banking, cloud account | 20+ random characters |
| Ordinary site account | 16+ random characters |
| Anything with a password-expiry policy | 12–14 is enough if unique |

## Strength checking

Searchers ask about "password strength checker" and "password strength tester" constantly, and the useful distinction is between checking a *candidate* and auditing *what you already have*.

**For a candidate:** length first, then check it is not on a breach list and not derived from your name, the site name, or the current year. There is no need to send it anywhere — a length estimate and a pattern check are local operations.

**For your vault:** what you want is a *reuse* report, not a strength score. Three questions matter:

1. **Do I use the same password on more than one site?** This is the finding that actually changes your risk.
2. **Is this password in a known breach corpus?** A breached password is worthless at any length, because the exact string is already in the crackers' wordlists.
3. **Has this password been unchanged for years on an account holding something valuable?**

Note that OpenKey deliberately does **not** phone home to have-i-been-pwned or run a password-health screen, and that is a reasonable default: a health screen either sends data out or requires a local breach corpus. Do the audit by hand instead — start with email, banking, and cloud, and work outward.

## Fixing weak and reused passwords

You do not need to change everything at once. Prioritise:

1. **Email** — it resets every other account.
2. **Banking and cloud** — cloud storage can hold the rest.
3. **Your primary social account** — password-reset flows often lead to email.
4. **Your master password**, if it is short or reused anywhere.
5. **Everything else**, opportunistically, as each site next prompts you.

A practical workflow:

1. Turn on autofill first, so new logins get saved automatically.
2. Generate a new random password for each priority account **while logged in**.
3. Paste it through the generator rather than typing it.
4. Turn on 2FA at the same moment — you are already in the security settings ([2FA guide](/blog/two-factor-authentication)).
5. Add a passkey where offered ([what are passkeys?](/blog/what-are-passkeys)).
6. Delete the old plaintext export file when your migration is done ([import from Chrome](/blog/import-passwords-from-chrome)).

## Rules of thumb

- Never reuse. Enforce it with a generator, not discipline.
- Length is the cheapest security available to you.
- Do not rotate a strong unique password just because a year passed. Rotation without a reason is churn.
- Do not append `1` or `!` to an old password when forced to change it — that is a predictable extension of a known string, and it is how a set of "different" passwords becomes one set.
- Do not keep a spreadsheet of generated passwords. Keep them in the vault, and keep one encrypted offline backup.

## What search data says

Password generation is a large standalone cluster, not just a sub-topic of password managers. At the head-term level, "password generator" draws about **36%** of the interest of "password manager".

Refinements people add to "strong password generator" (Google Trends, worldwide, last 12 months):

| Related query | Relative interest |
|---------------|-------------------|
| google strong password generator | 100 |
| random strong password generator | 100 |
| random password generator | 99 |
| strong passwords | 58 |
| strong password generator online | 57 |
| generate strong password | 49 |
| password manager | 26 |
| apple strong password generator | 17 |

The top two are the built-in generators on **Google** and **Apple** accounts — people are looking for the generator their platform already ships, not for a third-party site. "strong password generator online" at 57 is the group to be careful about: an online generator is a third party handling a secret you intend to keep.

A separate cluster shows the auditing intent clearly. Related queries under "password strength": *password strength checker* (100), *strength check* (51), *strength tester* (41), *strength tool* (28), *strength generator* (27). "Checker" and "tester" phrasing is overwhelmingly about validating a password you have, which is why hand-auditing beats an in-app health screen for anyone who does not want to send data out.

Method: Google Trends, worldwide, past 12 months, pulled September 2026. Values are normalized relative interest (0–100), not search volumes.

## The one-minute version

Length beats complexity, randomness beats vocabulary, and uniqueness beats both. Generate with a local tool rather than a website, target 16+ random characters for ordinary accounts and a multi-word passphrase for your master password, and spend your limited effort on the accounts that can reset the others.

## Next steps

- [What is a password manager?](/blog/what-is-a-password-manager) — where generated passwords live
- [Autofill passwords](/blog/autofill-passwords) — generate at signup automatically
- [Two-factor authentication](/blog/two-factor-authentication) — the second layer
- [CLI guide](/guide/cli#password-generation-gen) — generation flags and character classes
