---
title: "Password manager for teams: what to evaluate"
description: Choosing a team password manager — shared vaults, roles, offboarding, CLI and API access, auditability — and how to run one on your own server.
date: 2026-09-23
cover: /blog/covers/password-manager-for-teams.png
---

# Password manager for teams: what to evaluate

A team password manager is not a consumer product with more seats. It has a different job: it has to survive people joining and leaving, and it has to answer questions about who had access to what, and when. Most tools are judged on the sharing feature and fail the second question.

This article is the evaluation checklist, plus how OpenKey's model works if you want shared collections on infrastructure you control.

## The requirements that actually differ

### 1. Shared vaults with real access control

"Can share with my team" is table stakes. What matters is whether access is per-collection or per-person, whether you can share a subset without exposing everything, and whether a contractor can see exactly one service.

- **All-or-nothing sharing** fails fast. It does not scale past about five people.
- **Per-collection sharing** is the minimum useful model.
- **Role-based access** (admin / member, and ideally read-only) is what you want once there are reviewers and approvers.

### 2. Offboarding that actually removes access

This is the requirement that separates consumer tools from team tools, and it is the one most often missing.

When someone leaves, you need to know:

- Do they lose access **immediately**, or at next sync?
- Do they retain **offline copies** of shared credentials — and if so, how do you handle that?
- Can you **revoke a share** and know that the copy is gone?
- Do **org ownership** and admin rights survive their departure, or does the team lose the ability to administer itself?

A tool that cannot answer these is a compliance liability dressed as a productivity feature.

### 3. Automation and machine access

Humans in a UI are half the problem. The other half is:

- A **CLI** for CI and scripting
- An **API** for provisioning and internal tools
- **Service accounts** that do not expire when a person leaves
- **Bulk import** from a directory or a spreadsheet of legacy shared credentials

Teams with infrastructure generally need all four. A password manager that only has a browser extension will not survive contact with a deploy pipeline.

### 4. Zero-knowledge, and what that means commercially

For an individual, zero-knowledge is a privacy preference. For an organisation it is a compliance position: it is the difference between "our vendor was breached" and "our vendor was breached, and they held ciphertext".

It also constrains features. Some vendors will offer account recovery, admin resets, or policy enforcement that requires server-side plaintext — and each of those is a deliberate reduction of the zero-knowledge property. Both positions are defensible; you should choose knowingly rather than discover it during an incident review.

### 5. Audit trail

"Can I prove who had access to the production database password on 3 March?" needs an access log, retained for a defined period, exportable for an auditor.

Note the limit honestly: in a zero-knowledge system, an admin can see *that* an entry was accessed, not *what it contained*. That is the correct behaviour, and it is also a constraint on what your audit can prove.

### 6. Bring-your-own infrastructure

At some point a security review will ask whether shared credentials leave your network. The answers are: vendor-hosted with a contractual DPA, private cloud, or self-hosted. Self-hosting is the only one that is verifiable by you, and it is the only one where you can demonstrate the server holds ciphertext.

### 7. Cost model that survives headcount

Per-seat pricing that includes every contractor, every service account, and every read-only auditor gets expensive quickly. Check for:

- Read-only seat pricing
- Whether service accounts are free
- Whether deactivated users still count
- Whether there is a free tier for evaluation

## A scoring sheet for teams

| Criterion | Weight | Why it matters |
|-----------|--------|----------------|
| Offboarding and revocation | ×3 | The requirement most tools fail |
| Per-collection access control | ×3 | Prevents one contractor seeing everything |
| CLI and API access | ×3 | Machines are half your users |
| Zero-knowledge, verifiable | ×3 | Compliance and breach exposure |
| Service accounts | ×2 | Long-lived non-human access |
| Audit log with retention | ×2 | Proving historical access |
| Self-hosting available | ×2 | Keeping credentials inside your network |
| Emergency access | ×1 | Break-glass when an admin is unreachable |
| Bulk migration tooling | ×1 | Getting off the shared spreadsheet |

## How OpenKey handles team access

OpenKey's sharing model is built for this, and it is deliberately unusual in a few places worth understanding before you design a process around it.

### Organizations and shared collections

Sharing requires **Pro** and a configured self-hosted server, with everyone on the **same server URL**. The model:

1. **Publish identity keys** so peers can wrap keys for you. In OpenKey this is done from the browser extension in standalone (server) mode — the app's Settings → Data page does not include that action.
2. **Create an organization** and shared collections under it. The client encrypts the org name and wraps an org key for you as owner.
3. **Invite members** by email (they must already exist on the server), with a role of `admin` or `member`. Your client wraps the org key for their published identity key and posts the invite.
4. They accept under **Pending invites** and sync; shared collections appear.

The server stores org names, shared payloads, and identity keys as **opaque ciphertext**. It never unwraps an org key.

Admin powers: revoke pending invites, change roles, remove members. One constraint to plan around — **the owner cannot leave the org**, and ownership transfer is not a separate recovery path. Nominate a second owner early rather than treating it as a formality.

### Item shares are snapshots, not live documents

This is the single most important operational detail. When you share a single entry or collection with someone:

- The encrypted payload is **frozen at share time** and copied into the recipient's vault on accept.
- Later edits to your copy are **not** pushed to them.
- **Revoking** stops a pending accept. It **does not** delete a copy the recipient already imported.

So an entry share behaves like handing someone a sealed envelope, not like sharing a live document. For anything that must stay in sync — a shared service account, a team-wide internal tool — use an **organization shared collection**, where members keep reading the same ciphertext under a shared org key.

Getting this backwards produces the classic bug: you update a shared password, assume everyone has the new one, and half the team is holding a credential you rotated a month ago.

### What OpenKey does not do

Worth stating plainly, because it affects when you should choose something else:

- **No admin-enforced policy engine** in the client. There is no server-side rule that forces a minimum password length across a team.
- **No automatic offboarding hook.** Removing a member is a manual action: revoke or remove in the org, then deal with any entry shares that were already accepted.
- **No SCIM or directory sync.** Membership is managed through the org and sharing APIs.
- **No server-side audit log of entry access.** The server cannot see plaintext, so it cannot log what was read.
- **Sync is last-write-wins by revision, not a CRDT.** Concurrent edits can overwrite; edit on one device at a time when it matters.

If you need automated offboarding, a policy engine, or a compliance-grade access log, choose a commercial team product. OpenKey is for teams that want the crypto on their clients and are willing to run the collaboration layer themselves.

## Rolling out to a team

1. **Run the server first.** [Server setup](/guide/server), hardened per the [security checklist](/blog/self-hosted-password-manager#the-hardening-checklist).
2. **Create your own account**, publish identity keys from the extension.
3. **Create the org**, then one shared collection per service or team boundary. Start with the shared infrastructure accounts — those are the ones that create the most damage when they are wrong.
4. **Publish identity keys for everyone** before you invite, or the wrap step will not find them.
5. **Invite in small groups** and verify a member can actually open a shared collection before adding the next batch.
6. **Move the shared spreadsheet.** Every credential currently in a team spreadsheet is your highest-priority import.
7. **Write the offboarding procedure before you need it.** Two steps, written down: remove from the org; review and revoke entry shares.

## The one-minute version

Evaluate on offboarding, per-collection access, and machine access first — not on the sharing feature. Prefer zero-knowledge you can verify, and check whether the vendor's recovery and admin features quietly require server-side plaintext. If you self-host, remember that entry shares are snapshots: use org shared collections for anything that must stay current.

## Next steps

- [Sharing & organizations](/guide/sharing) — the full walkthrough
- [Self-hosted password manager](/blog/self-hosted-password-manager) — running the server
- [Password manager for family](/blog/password-manager-for-family) — the household-scale version
- [Security](/guide/security) — what the server can and cannot see
