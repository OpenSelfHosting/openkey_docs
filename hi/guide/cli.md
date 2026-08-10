# CLI

OpenKey CLI (`openkey`) उन developers के लिए एक command-line interface है जो secrets, API tokens, SSH keys, और `.env` सामग्री OpenKey vault में रखते हैं। यह password generation के लिए **पूरी तरह offline** चल सकता है, स्थानीय native bridge पर **unlocked OpenKey desktop ऐप** से बात कर सकता है, और वैकल्पिक रूप से ciphertext pull और एक short-lived CLI session के लिए **self-hosted sync server** पर authenticate कर सकता है।

**Node.js 20+** आवश्यक है।

## Architecture

नीचे का diagram दिखाता है कि कौन किससे बात करता है। Password generation offline रहता है। Vault commands unlocked desktop ऐप को प्राथमिकता देती हैं। Server sync वैकल्पिक है।

<img src="/guide/cli-architecture.svg" alt="OpenKey CLI architecture: CLI native bridge के ज़रिए desktop ऐप से बात करता है, discover के लिए इस मशीन को scan करता है, और वैकल्पिक रूप से self-hosted server के साथ ciphertext sync करता है" class="ok-diagram" width="920" height="420" />

| Mode | When it applies | What it can do |
|------|-----------------|----------------|
| **Offline** | Always | `gen` — no app, no server |
| **Native bridge** | Desktop app unlocked on this machine | Secrets CRUD, discovery import, search/get/copy across secrets and logins |
| **CLI session** | After `login` + `eval $(openkey unlock)` | Same vault operations against a local ciphertext cache; `sync` pulls from the server |

### Vault command backend कैसे चुनता है

<img src="/guide/cli-backend-choice.svg" alt="Flowchart: vault command desktop bridge जाँचता है, फिर OPENKEY_SESSION, अन्यथा unlock tip के साथ error" class="ok-diagram" width="920" height="360" />

1. यदि desktop bridge जवाब देता है → **native** mode उपयोग करें (प्राथमिक; server registration आवश्यक नहीं)।
2. अन्यथा यदि `OPENKEY_SESSION` सेट और valid है → **session** mode उपयोग करें (local cache / server-backed material)।
3. अन्यथा → vault चाहिए वाली commands unlock tip के साथ fail होती हैं — ऐप unlock करें या `eval $(openkey unlock)` चलाएँ।

Bridge कनेक्शन **केवल local machine** से स्वीकार करता है और केवल जब vault unlocked हो। Unix पर यह ज्ञात OpenKey paths के तहत socket उपयोग करता है (`OPENKEY_NATIVE_SOCKET` से override)। Windows पर `%LOCALAPPDATA%\OpenKey\` के तहत localhost port file (`OPENKEY_NATIVE_PORT` से override)।

## Install

```bash
cd openkey_cli
npm install
npm run build
npm link          # optional: puts `openkey` on your PATH
```

Linking के बिना:

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

स्थानीय CLI state platform config directory में संग्रहीत होता है (supported होने पर file mode `600`):

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/OpenKey/config.json` |
| Linux | `~/.config/openkey/config.json` (or `$XDG_CONFIG_HOME/openkey/`) |
| Windows | `%APPDATA%\OpenKey\config.json` |

फ़ाइल में हो सकता है: server URL, email, access/refresh tokens, salt और KDF params, wrapped vault key, session lock duration, server revision, और sync के बाद entries/collections का **ciphertext** cache। यह मास्टर पासवर्ड plaintext में संग्रहीत नहीं करता।

### `config` commands

```bash
openkey config set-server https://openkey.example.com
openkey config show
openkey config set-lock 30    # session lifetime in minutes (1–1440, default 15)
```

- `set-server` को `http://` या `https://` से शुरू होने वाला URL चाहिए (trailing slash हटाया जाता है)।
- पहले set से पहले default server URL: `http://localhost:8000`।

## Global options

| Flag | Effect |
|------|--------|
| `--json` | Machine-readable JSON on stdout for scripting |
| `--help` / `--version` | Help and version |

Commander globals उपयोग करते समय `--json` subcommand से पहले रखें, जैसे `openkey --json status`।

## Password generation (`gen`)

पूरी तरह offline। ऐप या server की ज़रूरत नहीं।

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

`-c` के साथ, human mode confirmation प्रिंट करता है; JSON mode `{ "copied": true, "length": N }` लौटाता है। `-c` के बिना, password प्रिंट होता है (या JSON mode में `{ "password": "..." }`)।

## Status and hygiene

```bash
openkey status
openkey forget
```

**`status`** server URL, email, login state, bridge availability, unlock mode (`native` / `session`), शेष session time, और cached entry count रिपोर्ट करता है।

**`forget`** स्थानीय CLI config और cached ciphertext मिटाता है। यह desktop ऐप vault के अंदर secrets नहीं हटाता। `forget` के बाद, server mode उपयोग करते हों तो `config set-server` / `login` फिर चलाएँ।

## Developer secrets (`secret`)

Secrets vault के reserved **Secrets** क्षेत्र (`__dev_secrets__`) में रहते हैं, **device** (machine label; default hostname) द्वारा समूहित। Commands के लिए desktop ऐप unlocked **या** valid `OPENKEY_SESSION` चाहिए।

### Kinds

| Kind | Typical use | Notes |
|------|-------------|--------|
| `apiToken` | PAT, API keys | Default |
| `sshKey` | Private keys | Prefer `--file` / `--public-key-file` |
| `envSnippet` | Full `.env` bodies | Prefer `--file` |
| `other` | Catch-all | — |

`ssh`, `api`, `token`, `env`, `.env` जैसे aliases ऊपर के kinds में normalize होते हैं।

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
| `-s, --secret` | Inline secret value (`-` reads stdin) |
| `-f, --file` | Read secret body from a file |
| `--stdin` | Read secret from stdin (prefer over putting tokens in argv) |
| `-u, --username` | Optional username |
| `-H, --host` | Optional host |
| `-d, --device` | Device collection label (default: hostname) |
| `--public-key` / `--public-key-file` | SSH public key |
| `--passphrase` | Key passphrase |
| `--notes` | Free-form notes |

`--secret`, `--file`, या `--stdin` (non-empty) दें। बनाए गए records UUID लौटाते हैं।

```bash
printf '%s' "$TOKEN" | openkey secret add -n "CI token" --stdin
```

### `secret list` / `get` / `copy` / `rm` / `update` / `export` / `devices`

```bash
openkey secret list
openkey secret list -d laptop -k apiToken
openkey secret get "GitHub"
openkey secret copy ghp
openkey secret update "GitHub PAT" --secret ghp_new...
printf '%s' "$TOKEN" | openkey secret update "GitHub PAT" --stdin
openkey secret export -d laptop -o .env.local
openkey secret export --format exports   # for eval
openkey secret devices
openkey secret rm "old token" -y
```

- **list** — UUID prefix, name, kind, device, **masked** secret की table। वैकल्पिक `-d/--device` और `-k/--kind` filters।
- **get** / **copy** / **rm** / **update** — **name**, **host**, या **UUID prefix** से match। कई substrings match होने पर **exact** name/title, host, या unique UUID prefix (≥4 chars) जीतता है; अन्यथा command candidates के साथ error।
- **update** — केवल वे flags patch करें जो आप पास करते हैं (`--name`, `--secret`/`--file`/`--stdin`, `--kind`, `--device`, …)। Desktop bridge `updateSecret` handler (इस release वाला OpenKey ऐप) या CLI session चाहिए।
- **export** — secrets dotenv (`KEY=value`; `envSnippet` bodies inlined) या `--format exports` shell lines के रूप में लिखें। `-o` supported होने पर mode-`600` फ़ाइल लिखता है।
- **devices** — device collection labels और counts सूचीबद्ध करें।
- **get** plaintext प्रिंट करता है (या `--json` mode में full JSON object)।
- **copy** plaintext clipboard पर लिखता है।
- **rm** `-y` / `--yes` के बिना prompt करता है।

## Shell में secrets inject करें (`env` / `run`)

```bash
# Print export lines for eval (NAME or NAME=query)
eval $(openkey env DATABASE_URL)
eval $(openkey env DB=DATABASE_URL GH="GitHub PAT")

# Or run a child process with secrets in its environment
openkey run -e DATABASE_URL -e GH="GitHub PAT" -- npm start
```

| Form | Meaning |
|------|---------|
| `NAME` | Env var `NAME`; vault item उस name से खोजें |
| `NAME=query` | Env var `NAME`; `query` (name / host / UUID) से खोजें |

`env` पर `--json` `env`, `query`, `name`, `uuid`, और `value` वाले objects लौटाता है। `--raw` एक plaintext value प्रिंट करता है (ठीक एक binding)।

## Discovery (`discover`)

इस मशीन को scan करता है और **नए** secrets device group में import करता है। Vault में पहले से मौजूद values के विरुद्ध deduplicate करता है (kind + name + content fingerprint से)।

<img src="/guide/cli-discover-flow.svg" alt="Discover flow: स्थानीय sources scan करें, masked values preview करें, fingerprints dedupe करें, फिर vault device group में save करें" class="ok-diagram" width="920" height="280" />

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
| `--no-gh` | Skip GitHub CLI `hosts.yml` tokens | scan on |
| `--no-docker` | Skip `~/.docker/config.json` registry auth | scan on |
| `--dry-run` | List only; do not save | off |
| `-y, --yes` | Import without interactive confirm | off |

### क्या scan होता है

- **SSH** — `~/.ssh` के तहत private keys (`known_hosts`, `authorized_keys`, `config`, `.pub` files skip); मौजूद होने पर sibling `.pub` attach।
- **Environment variables** — well-known names (`GITHUB_TOKEN`, `OPENAI_API_KEY`, `DATABASE_URL`, …) और secret-like suffixes match करने वाले names; `PATH`, `HOME`, `OPENKEY_SESSION`, `OPENKEY_PASSWORD`, आदि skip।
- **AWS** — `~/.aws/credentials` में profiles।
- **GitHub CLI** — `~/.config/gh/hosts.yml` में `oauth_token` / `token` entries।
- **Docker** — `~/.docker/config.json` से decoded `auths`।
- **`.env` files** — roots से walk, `node_modules`, `.git`, `dist`, virtualenvs, आदि skip; size और file-count limits लागू।

Dry-run vault locked होने पर भी काम करता है (केवल listing)। Saving के लिए bridge या session unlock चाहिए। पहले से import किए secrets skipped के रूप में रिपोर्ट होते हैं।

## Secrets और logins में search

ये commands **developer secrets और login entries** खोजते हैं:

```bash
openkey search github
openkey get "GitHub"
openkey get "GitHub" --field username
openkey copy api.example.com --field totp
openkey totp "GitHub" -c
openkey logins
```

| Command | Output |
|---------|--------|
| `search <query>` | Masked table (या JSON previews); TOTP availability दिखाता है |
| `get <query>` | Best-match field (`--field password\|username\|url\|totp\|notes`) |
| `copy <query>` | उस field की clipboard copy (45s में auto-clear; `--keep` से disable) |
| `totp <query>` | Live TOTP code (`-c` copy, `-w` watch until Ctrl+C) |
| `logins` | Username / URL / TOTP flag के साथ logins सूची |
| `doctor` | Node, config permissions, bridge, session, server `/health`, clipboard diagnose करें |

अस्पष्ट substring matches exact name/title, host, या unique UUID prefix को प्राथमिकता देते हैं; अन्यथा UUID, kind, और label सूचीबद्ध — query refine करें। केवल Secrets section चाहिए तो `secret get` / `secret copy` प्राथमिक।

Name + device से upsert के लिए **`secret set`** उपयोग करें। **`sync --push`** pull से पहले local ciphertext cache push करता है।

## वैकल्पिक self-hosted server

इस path का उपयोग करें जब desktop ऐप मशीन पर उपलब्ध न हो (उदाहरण: sync के ज़रिए phone-only vault access), या जब CLI ciphertext cache चाहिए।

<img src="/guide/cli-server-flow.svg" alt="Server flow: set-server, auth_hash के साथ login, local cache में ciphertext pull, फिर vault commands के लिए OPENKEY_SESSION सेट करने हेतु eval unlock" class="ok-diagram" width="920" height="340" />

```bash
openkey config set-server http://localhost:8000
openkey login --email you@example.com
eval $(openkey unlock)
openkey sync
```

Server install: [सर्वर इंस्टॉल](./server)।

### Authentication flow

1. **`login`** — email (या `-e`) और मास्टर पासवर्ड (या `OPENKEY_PASSWORD`) के लिए prompt। Salt/KDF के लिए prelogin, Argon2id से `auth_hash` derive, JWTs प्राप्त, wrapped vault key material fetch, unwrapping से password verify, फिर local cache में ciphertext **pull**। मास्टर पासवर्ड CLI flag के रूप में कभी न भेजें।
2. **`unlock`** — vault key फिर derive, server reachable होने पर tokens/sync refresh, और `OPENKEY_SESSION` के लिए shell export प्रिंट (`eval $(openkey unlock)` उपयोग करें)। Options: `-e/--email`, `--raw` (token only)। JSON mode session fields emit करता है।
3. **`lock`** — `unset OPENKEY_SESSION` प्रिंट (या JSON hint) ताकि `eval $(openkey lock)` चला सकें।
4. **`logout`** — access/refresh tokens साफ़; local ciphertext cache रखता है। Session env साफ़ करने के लिए `lock` के साथ pair करें।
5. **`sync`** — login आवश्यक; entries/collections pull और `serverRevision` update।

Session lifetime default **15 minutes** (`config set-lock`)। Expired sessions के लिए फिर `unlock` चाहिए।

### Environment variables

| Variable | Purpose |
|----------|---------|
| `OPENKEY_SESSION` | `unlock` से short-lived encrypted session blob |
| `OPENKEY_PASSWORD` | non-interactive `login` / `unlock` के लिए मास्टर पासवर्ड (scripts/CI only) |
| `OPENKEY_EMAIL` | non-interactive `login` / `unlock` के लिए account email |
| `OPENKEY_NATIVE_SOCKET` | Unix bridge socket path override |
| `OPENKEY_NATIVE_PORT` | Windows bridge port override |

Personal machines पर interactive password prompt प्राथमिक। CI logs में `OPENKEY_PASSWORD` और session tokens को secret material मानें।

## Shell completions

```bash
eval "$(openkey completion bash)"
eval "$(openkey completion zsh)"
openkey completion fish | source
```

## Command reference

| Command | Needs vault access? | Description |
|---------|---------------------|-------------|
| `gen` | No | Offline password generation |
| `discover` | Save: yes\* / dry-run: no | Scan SSH / `.env` / env / AWS → device group |
| `secret add\|list\|get\|copy\|rm\|update\|export\|devices` | Yes\* | Developer secrets |
| `get` / `copy` / `search` / `totp` / `logins` | Yes\* | Secrets + logins (TOTP, field select) |
| `doctor` | No | Diagnose bridge / session / server |
| `env` / `run` | Yes\* | Export secrets into shell / child process |
| `completion` | No | Bash / zsh / fish completions |
| `status` | No | Bridge / session / server state |
| `config set-server\|show\|set-lock` | No | CLI configuration |
| `login` / `logout` | — | Optional server auth |
| `unlock` / `lock` | — | Optional CLI session |
| `sync` | Login required | Pull ciphertext from server |
| `forget` | No | Wipe local CLI config + cache |

\*Desktop ऐप unlocked, **या** server login के बाद valid `OPENKEY_SESSION`।

## Security model

- List/search commands values **mask** करती हैं; plaintext चाहिए तभी `get` / `copy` उपयोग करें।
- Sync server केवल **ciphertext** संग्रहीत करता है; CLI keys locally derive करता है जैसे अन्य OpenKey clients।
- मास्टर पासवर्ड flag के रूप में न पास करें; `OPENKEY_PASSWORD` या `OPENKEY_SESSION` log न करें।
- Bridge traffic local-only है और unlocked vault चाहिए।
- Session tokens expire होते हैं; shared machines पर `config set-lock` से lifetime घटाएँ।
- `forget` disk पर CLI state साफ़ करता है; मशीन untrusted हो तो `logout` से server tokens rotate करें।

## Development

```bash
cd openkey_cli
npm test
npm run typecheck
npm run build
```

## Related guides

- [ऐप का उपयोग](./app) — desktop unlock, Secrets section, autofill
- [सर्वर इंस्टॉल](./server) — self-hosted sync
- [Security](./security) — Argon2id, tokens, threat model
- [Packages](./packages) — repository layout
