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
