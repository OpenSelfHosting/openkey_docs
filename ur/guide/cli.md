# CLI

The OpenKey CLI (`openkey`) is a command-line interface for developers who keep secrets, API tokens, SSH keys, and `.env` material in an OpenKey vault. It can operate **fully offline** for password generation, talk to an **unlocked OpenKey desktop app** over a local native bridge, and optionally authenticate to a **self-hosted sync server** for ciphertext pull and a short-lived CLI session.

Requires **Node.js 20+**.

## Architecture

The diagram below shows what talks to what. Password generation stays offline. Vault commands prefer the unlocked desktop app. Server sync is optional.

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI architecture: CLI talks to desktop app via native bridge, scans this machine for discover, and optionally syncs ciphertext with a self-hosted server" class="ok-diagram" width="920" height="420" />

| Mode | When it applies | What it can do |
|------|-----------------|----------------|
| **Offline** | Always | `gen` — no app, no server |
| **Native bridge** | Desktop app unlocked on this machine | Secrets CRUD, discovery import, search/get/copy across secrets and logins |
| **CLI session** | After `login` + `eval $(openkey unlock)` | Same vault operations against a local ciphertext cache; `sync` pulls from the server |

### How a vault command picks a backend

<img src="/guide/cli-backend-choice.svg" alt="Flowchart: vault command checks desktop bridge, then OPENKEY_SESSION, otherwise errors with an unlock tip" class="ok-diagram" width="920" height="360" />

1. If the desktop bridge responds → use **native** mode (preferred; no server registration required).
2. Else if `OPENKEY_SESSION` is set and valid → use **session** mode (local cache / server-backed material).
3. Else → commands that need the vault fail with a tip to unlock the app or run `eval $(openkey unlock)`.

The bridge accepts connections **only from the local machine** and only while the vault is unlocked. On Unix it uses a socket under known OpenKey paths (override with `OPENKEY_NATIVE_SOCKET`). On Windows it uses a localhost port file under `%LOCALAPPDATA%\OpenKey\` (override with `OPENKEY_NATIVE_PORT`).

## Install

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

Without linking:

```bash
npx tsx src/cli.ts --help
# after build:
node dist/cli.js --help
```

Verify:

```bash
openkey --version
openkey status
```

## Configuration and storage

Local CLI state is stored in a platform config directory (file mode `600` when supported):

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json` (or `$XDG_CONFIG_HOME/openkey/`) |
| Windows | `%APPDATA%\OpenKey\config.json` |

The file may contain: server URL, email, access/refresh tokens, salt and KDF params, wrapped vault key, session lock duration, server revision, and a **ciphertext** cache of entries/collections after sync. It does not store the master password in plaintext.

### `config` commands

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` requires a URL starting with `http://` or `https://` (trailing slash stripped).
- Default server URL before first set: `http://localhost:8000`.

## Global options

| Flag | Effect |
|------|--------|
| `--json` | Machine-readable JSON on stdout for scripting |
| `--help` / `--version` | Help and version |

Place `--json` before the subcommand when using Commander globals, e.g. `openkey --json status`.

## Password generation (`gen`)

Fully offline. Does not require the app or a server.

```bash
openkey gen
openkey gen -l 24 --no-symbols
openkey gen -l 32 -a -c
openkey --json gen -l 20
```

| Option | Description | Default |
|--------|-------------|---------|
| `-l, --length <n>` | Length (practical range 4–64) | `20` |
| `--no-upper` | Exclude uppercase letters | off |
| `--no-lower` | Exclude lowercase letters | off |
| `--no-digits` | Exclude digits | off |
| `--no-symbols` | Exclude symbols | off |
| `-a, --avoid-ambiguous` | Avoid ambiguous characters `Il1O0o` | off |
| `-c, --copy` | Copy to clipboard instead of printing | off |

With `-c`, human mode prints a confirmation; JSON mode returns `{ "copied": true, "length": N }`. Without `-c`, the password is printed (or `{ "password": "..." }` in JSON mode).

## Status and hygiene

```bash
openkey status
openkey forget
```

**`status`** reports server URL, email, login state, bridge availability, unlock mode (`native` / `session`), remaining session time, and cached entry count.

**`forget`** wipes local CLI config and the cached ciphertext. It does not delete secrets inside the desktop app vault. After `forget`, re-run `config set-server` / `login` if you use server mode.

## Developer secrets (`secret`)

Secrets live in the vault’s reserved **Secrets** area (`__dev_secrets__`), grouped by **device** (machine label; default hostname). Commands require the desktop app unlocked **or** a valid `OPENKEY_SESSION`.

### Kinds

| Kind | Typical use | Notes |
|------|-------------|--------|
| `apiToken` | PAT, API keys | Default |
| `sshKey` | Private keys | Prefer `--file` / `--public-key-file` |
| `envSnippet` | Full `.env` bodies | Prefer `--file` |
| `other` | Catch-all | — |

Aliases such as `ssh`, `api`, `token`, `env`, `.env` normalize to the kinds above.

### `secret add`

```bash
openkey secret add --name "GitHub PAT" --kind apiToken --secret ghp_...
openkey secret add -n "deploy key" -k sshKey -f ~/.ssh/id_ed25519 \
  --public-key-file ~/.ssh/id_ed25519.pub -H git.example.com -u git
openkey secret add -n "acme .env" -k envSnippet -f ./apps/api/.env -d laptop
```

| Option | Description |
|--------|-------------|
| `-n, --name` | Display name (**required**) |
| `-k, --kind` | `sshKey` \| `apiToken` \| `envSnippet` \| `other` |
| `-s, --secret` | Inline secret value |
| `-f, --file` | Read secret body from a file |
| `-u, --username` | Optional username |
| `-H, --host` | Optional host |
| `-d, --device` | Device collection label (default: hostname) |
| `--public-key` / `--public-key-file` | SSH public key |
| `--passphrase` | Key passphrase |
| `--notes` | Free-form notes |

Provide `--secret` or `--file` (non-empty). Created records return a UUID.

### `secret list` / `get` / `copy` / `rm`

```bash
openkey secret list
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret rm "old token" -y
```

- **list** — table of UUID prefix, name, kind, device, **masked** secret.
- **get** / **copy** / **rm** — match by **name**, **host**, or **UUID prefix**. Ambiguous matches error with candidates; refine the query.
- **get** prints plaintext (or full JSON object in `--json` mode).
- **copy** writes plaintext to the clipboard.
- **rm** prompts unless `-y` / `--yes`.

## Discovery (`discover`)

Scans this machine and imports **new** secrets into the device group. Deduplicates against values already in the vault (by kind + name + content fingerprint).

<img src="/guide/cli-discover-flow.svg" alt="Discover flow: scan local sources, preview masked values, dedupe fingerprints, then save into the vault device group" class="ok-diagram" width="920" height="280" />

```bash
openkey discover --dry-run
openkey discover -y
openkey discover -d workstation -p ~/src/acme -p ~/src/labs --depth 3
openkey discover --no-aws --no-env-vars
```

| Option | Description | Default |
|--------|-------------|---------|
| `-d, --device` | Device collection name | hostname |
| `-p, --path <dir>` | Project root(s) for `.env` walk (repeatable) | `cwd` |
| `--depth <n>` | Max directory depth for `.env` | `4` |
| `--no-ssh` | Skip `~/.ssh` private keys | scan on |
| `--no-env-files` | Skip `.env` / `.env.*` files | scan on |
| `--no-env-vars` | Skip process environment | scan on |
| `--no-aws` | Skip `~/.aws/credentials` | scan on |
| `--dry-run` | List only; do not save | off |
| `-y, --yes` | Import without interactive confirm | off |

### What is scanned

- **SSH** — private keys under `~/.ssh` (skips `known_hosts`, `authorized_keys`, `config`, `.pub` files); attaches sibling `.pub` when present.
- **Environment variables** — well-known names (`GITHUB_TOKEN`, `OPENAI_API_KEY`, `DATABASE_URL`, …) and names matching secret-like suffixes; skips `PATH`, `HOME`, `OPENKEY_SESSION`, `OPENKEY_PASSWORD`, etc.
- **AWS** — profiles in `~/.aws/credentials`.
- **`.env` files** — walk from roots, skipping `node_modules`, `.git`, `dist`, virtualenvs, etc.; size and file-count limits apply.

Dry-run works even if the vault is locked (listing only). Saving requires bridge or session unlock. Already-imported secrets are reported as skipped.

## Search across secrets and logins

These commands search **developer secrets and login entries**:

```bash
openkey search github
openkey get "GitHub"
openkey copy api.example.com
```

| Command | Output |
|---------|--------|
| `search <query>` | Masked table (or JSON previews) |
| `get <query>` | Best-match plaintext password/secret |
| `copy <query>` | Clipboard copy of best match |

Ambiguous matches list UUID, kind, and label — refine the query. Prefer `secret get` / `secret copy` when you only want the Secrets section.

## Optional self-hosted server

Use this path when the desktop app is not available on the machine (for example phone-only vault access via sync), or when you want a CLI ciphertext cache.

<img src="/guide/cli-server-flow.svg" alt="Server flow: set-server, login with auth_hash, pull ciphertext into local cache, then eval unlock to set OPENKEY_SESSION for vault commands" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Server install: [Install the server](./server).

### Authentication flow

1. **`login`** — prompts for email (or `-e`) and master password (or `OPENKEY_PASSWORD`). Performs prelogin for salt/KDF, derives `auth_hash` with Argon2id, obtains JWTs, fetches wrapped vault key material, verifies the password by unwrapping, then **pulls** ciphertext into the local cache. Never send the master password as a CLI flag.
2. **`unlock`** — derives the vault key again, refreshes tokens/sync when the server is reachable, and prints a shell export for `OPENKEY_SESSION` (use `eval $(openkey unlock)`). Options: `-e/--email`, `--raw` (token only). JSON mode emits the session fields.
3. **`lock`** — prints `unset OPENKEY_SESSION` (or JSON hint) so you can `eval $(openkey lock)`.
4. **`logout`** — clears access/refresh tokens; keeps the local ciphertext cache. Pair with `lock` to clear the session env.
5. **`sync`** — requires login; pulls entries/collections and updates `serverRevision`.

Session lifetime defaults to **15 minutes** (`config set-lock`). Expired sessions require `unlock` again.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `OPENKEY_SESSION` | Short-lived encrypted session blob from `unlock` |
| `OPENKEY_PASSWORD` | Master password for non-interactive `login` / `unlock` (scripts/CI only) |
| `OPENKEY_NATIVE_SOCKET` | Override Unix bridge socket path |
| `OPENKEY_NATIVE_PORT` | Override Windows bridge port |

Prefer the interactive password prompt on personal machines. Treat `OPENKEY_PASSWORD` and session tokens as secret material in CI logs.

## Command reference

| Command | Needs vault access? | Description |
|---------|---------------------|-------------|
| `gen` | No | Offline password generation |
| `discover` | Save: yes\* / dry-run: no | Scan SSH / `.env` / env / AWS → device group |
| `secret add\|list\|get\|copy\|rm` | Yes\* | Developer secrets |
| `get` / `copy` / `search` | Yes\* | Secrets + logins |
| `status` | No | Bridge / session / server state |
| `config set-server\|show\|set-lock` | No | CLI configuration |
| `login` / `logout` | — | Optional server auth |
| `unlock` / `lock` | — | Optional CLI session |
| `sync` | Login required | Pull ciphertext from server |
| `forget` | No | Wipe local CLI config + cache |

\*Desktop app unlocked, **or** valid `OPENKEY_SESSION` after server login.

## Security model

- List/search commands **mask** values; use `get` / `copy` only when you need plaintext.
- The sync server stores **ciphertext only**; the CLI derives keys locally like other OpenKey clients.
- Do not pass the master password as a flag; avoid logging `OPENKEY_PASSWORD` or `OPENKEY_SESSION`.
- Bridge traffic is local-only and requires an unlocked vault.
- Session tokens expire; reduce lifetime with `config set-lock` on shared machines.
- `forget` clears CLI state on disk; rotate server tokens with `logout` if the machine is untrusted afterward.

## Development

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## Related guides

- [Using the app](./app) — desktop unlock, Secrets section, autofill
- [Install the server](./server) — self-hosted sync
- [Security](./security) — Argon2id, tokens, threat model
- [Packages](./packages) — repository layout
