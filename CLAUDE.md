# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Status

This repository is in an **initial / pre-code** state. As of this writing it contains only:

- `README.md` — a one-line description: "our 2VP Construction company"
- `Portfolio` — an empty placeholder file
- No source code, package manifest, build system, tests, lint config, or CI

There is therefore nothing to build, lint, run, or test yet. Re-inspect the working tree before assuming any of that has changed — when real code lands, this file should be updated to describe the actual stack, commands, and architecture rather than the placeholder state below.

## Project Intent

The repo is intended to host work for "2VP Construction company." The presence of an empty `Portfolio` file suggests an upcoming portfolio/site of some kind, but the technology choice (static site, framework, CMS, etc.) has not yet been made in-tree. Do not assume a stack — confirm with the user before scaffolding one.

## Working in This Repo

- Default development branch for Claude-authored work in this environment: `claude/add-claude-documentation-8xdw5` (per harness instructions). Push only to the branch the harness designates.
- The remote is `1clickjobAPP/2VP` on GitHub; GitHub interactions must go through the `mcp__github__*` tools (no `gh` CLI is available).
- When the user asks for the first piece of real code (site scaffold, portfolio page, etc.), ask which stack they want before generating files — the repo gives no signal either way.

## Updating This File

Once actual code is added, replace this placeholder with:
1. The real build / dev / test / lint commands.
2. A short architecture overview that captures things spanning multiple files (routing, data flow, deploy target).
3. Any project-specific conventions that aren't obvious from reading one file.
