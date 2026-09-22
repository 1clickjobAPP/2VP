# 2VP — local setup

## 1. Hello-world server

```bash
node server.mjs
# Listening on 127.0.0.1:3000
```

Check it with `curl http://127.0.0.1:3000/` — it answers `Hello World!`.

It binds to `127.0.0.1`, so it is reachable only from the machine running it.
To reach it from another device on your network, change the listen call to
`server.listen(3000, '0.0.0.0', ...)`.

## 2. PostPost.ai MCP server

`.mcp.json` defines the `postpost` server. It reads your key from the
`POSTPOST_API_KEY` environment variable, so no key is ever committed.

1. Create a key in the PostPost.ai app: account menu → MCP.
2. Export it before starting Claude Code:

   ```bash
   export POSTPOST_API_KEY=pp_your_key_here
   claude
   ```

   `.env.example` records the variable name; copy it to `.env` if you prefer
   to keep the key in a file and source it (`.env` is gitignored).
3. Confirm the connection with `/mcp` inside Claude Code — `postpost` should
   read `connected`, and `list_brands` should answer.

`.claude/settings.json` pre-approves this one project server
(`enabledMcpjsonServers`), so Claude Code will not prompt for it.

Notes on the config shape: the header is passed as `Authorization:${AUTH_HEADER}`
with no space, and the value is held in an env var — `mcp-remote` splits
`--header` arguments on whitespace, so the indirection is what keeps
`Bearer <key>` intact.

## 3. PostPost skill

`.claude/skills/postpost/SKILL.md` is checked in, so Claude Code loads it
automatically in any session opened on this repo. It tells Claude how to use
the PostPost tools: read the brand vault first, never invent facts, stay inside
each channel's character limit, and ask before spending credits or publishing.

The skill needs the MCP server from step 2 to be connected — on its own it has
no way to reach PostPost.

## 4. Using PostPost from a Claude Code cloud session

A cloud session reaches the internet through an allowlist, and `postpost.ai`
is not on the default **Trusted** list — the gateway answers `403` to the
CONNECT, so `mcp-remote` reports `CONNECTION_CLOSED`. Two settings on the
cloud environment fix it.

At [claude.ai/code](https://claude.ai/code), select the cloud icon showing the
environment's name in the row above the message box (there is no settings page
or direct URL), hover the environment and select the gear icon. In the dialog:

**Network access** → **Custom**, and in **Allowed domains**, one per line:

```text
postpost.ai
*.postpost.ai
```

Leave **Also include default list of common package managers** checked —
`npx -y mcp-remote` needs the npm registry, and unchecking it allows only
what is listed.

**Environment variables** (`.env` format, one pair per line):

```text
POSTPOST_API_KEY=pp_your_key_here
```

Note that anyone using the environment can read these values. On Pro and Max
plans an **API credential** is the safer alternative: the agent proxy attaches
the key to requests for the hosts you list *after* they leave the session, so
the key never reaches the model or the session's environment. Using one means
dropping the `--header` argument and the `env` block from `.mcp.json`, since
the proxy supplies the header instead.

Both changes apply to **sessions started afterwards**. A session already
running keeps the values and the allowlist it started with, so start a new
cloud session before expecting `/mcp` to show `postpost` connected.
