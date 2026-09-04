# Security Policy

## Reporting a vulnerability

If you believe you have found a security issue in OpenKey (server, extension, CLI, docs, or the app), please report it privately.

**Do not** open a public GitHub issue for exploitable vulnerabilities.

Preferred contact:

- Email: **security@openselfhosting.com**
- Or open a **private** security advisory on the relevant GitHub repository under [OpenSelfHosting](https://github.com/OpenSelfHosting)

Please include:

1. Affected package (`openkey_server`, `openkey_extension`, `openkey_cli`, official app binaries, …)
2. Version / commit hash if known
3. Steps to reproduce
4. Impact (e.g. ciphertext disclosure, auth bypass, local privilege)

We aim to acknowledge reports within **7 days** and to ship a fix or mitigation for confirmed issues as quickly as practical.

## Scope

In scope:

- Cryptographic design flaws that weaken zero-knowledge guarantees
- Authentication / authorization bypass on the sync API
- Plaintext vault leakage from the extension, native messaging bridge, or CLI beyond intentional fill/save flows
- Remote code execution or privilege escalation in supported packages

Out of scope (unless you can show a practical exploit chain):

- Denial of service against a self-hosted instance
- Phishing / social engineering of master passwords
- Compromised devices with an **unlocked** vault (the vault key is in memory by design)
- Issues that require physical access plus an unlocked session

## Security model (summary)

- The sync server stores **ciphertext only**. Master passwords and plaintext vault keys must never leave the client.
- Access JWTs are short-lived; refresh tokens are hashed at rest and rotated on use.
- Soft-deleted vault items remain as tombstones until peers sync; LWW uses per-item `revision`.

See [openkey_docs/guide/security.md](./openkey_docs/guide/security.md) for the full threat model.
