---
name: Contribute Template
about: Add consistency to when creating issues, requests of bugs.
title: ''
labels: ''
assignees: ''

---

| Status  | Type  | Env Vars Change | Review App | Ticket |
| :---: | :---: | :---: | :--: | :--: |
| Ready/Hold | Feature/Bug/Tooling/Refactor/Hotfix | Yes/No | [Link](<Review app link here>) | [Link](<ticket link here>) |

> ⚠️ NOTE: use notes like this to emphasize something about the PR. This could include other PRs this PR is built on top of; new or removed environment variables; reasons for why the PR is on hold; or anything else you would like to draw attention to.

## Problem

_What problem are you trying to solve?_


## Solution

_How did you solve the problem?_


## Before & After Screenshots

**BEFORE**:
[insert screenshot here]

**AFTER**:
[insert screenshot here]


## Other changes (e.g. bug fixes, UI tweaks, small refactors)


## Deploy Notes

_Notes regarding deployment of the contained body of work. These should note any
new dependencies, new scripts, etc._

**New environment variables**:

- `env var` : env var details

**New scripts**:

- `script` : script details

**New dependencies**:

- `dependency` : dependency details

**New dev dependencies**:

- `dependency` : dependency details


## Checklist

<!---
This checklist is mostly useful as a reminder of small things that can easily be forgotten.
Put an `x` in all the items that apply, make notes next to any that haven't been addressed,
Remove any items that are not relevant to this PR.
-->

General

- [ ] My pull request represents one logical piece of work.
- [ ] My commits are related to the pull request and look clean.
- [ ] I have performed a self-review of my code
- [ ] Vercel deployments pass with my changes
- [ ] My code contains no conflicts and is up to date with the latest main branch
