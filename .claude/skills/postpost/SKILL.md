---
name: postpost
description: >
  Plan, write, schedule and publish a brand's social media posts through the
  PostPost.ai tools. Use whenever the user mentions PostPost, their brand's social
  posts, a content plan or calendar, carousels, post images, or scheduling and
  publishing to their connected social channels. Not for ads or landing-page copy.
---

# Working in PostPost.ai

PostPost.ai keeps a brand vault built from the business's own website: what it sells,
who it serves, how it speaks, its connected social channels and its weekly content
plan. You work inside that vault through the `postpost` tools. If they are not
available, tell the user to connect PostPost in the app first (account menu, MCP) and
stop; there is no other way in.

## Before writing anything

1. `list_brands`, then `get_brand_context` for the brand the user means. Read the
   voice, the audience, the offerings and each connected channel's `text_limit`.
2. Every fact in a post comes from the vault or from the user: names, prices, dates,
   places, claims. Nothing is invented, rounded or "improved". When a fact is
   missing, ask or leave it out.
3. Match the brand's voice samples: their sentence length, warmth, use of emoji and
   hashtags. Do not write like a generic marketing assistant.

## How the tools fit together

PostPost.ai plans and publishes on-brand social content. Typical flow:

1. `list_brands`, then `get_brand_context(brand_id)` — voice, audience,
   offerings, pillars, connected channels. Long reference documents:
   `list_brand_documents` + `read_brand_document`.
2. `get_content_plan` and `get_posting_slots` — what the week already
   holds and where there is room.
3. Add content one slot at a time with `add_plan_slot` (your own copy via
   `body`, or `compose: true` to have PostPost.ai write and design it —
   costs credits). Standalone drafts: `create_post`. Your own copy can
   still get an on-brand picture in the same call: `generate_media: true`.
4. `schedule_post` books a time; `publish_post` sends immediately.

A wrong fact in the vault (voice, audience, description, timezone…) is
fixed with `update_brand`; the edit is saved as the owner's own words and
survives a site re-scan. A standing instruction — what this brand always,
never, or only sometimes does — goes to `save_brand_memory`, which every
later run reads; point it at a picture (`picture_key` from
`list_brand_media`) when the rule is about the brand's mascot or character,
and the image model is handed that file rather than a description of it.
Channels are connected in the app (Settings,
Social Accounts), never over the API: a brand with no connected channel
refuses `add_plan_slot` and `create_post` until one is connected, and
`list_brands` says so per brand (`can_publish`). One channel can hold
SEVERAL accounts — a revoked one keeps what it already sent — and only the
row `get_brand_context` marks `can_publish: true` receives new posts.

Every answer that names a post includes its `url` — the post's page in
the app. Share it with the user so they can review the work in one
click. To verify what will actually publish (full per-channel copy and
each channel's character cap), read the post back with `get_post`;
`get_brand_context` lists each connected account's `text_limit` — write
within it on the first pass. A post carrying a PICTURE is capped lower on
several networks (`text_limit_with_media`; Telegram takes 1024 against
4096 for text alone), and `get_post` prints the cap that really applies.

TWO STATE MACHINES, and they sit on the same row. A plan slot's `status`
is one of planned / needs_input / composing / drafted / skipped. The POST
that slot produced has its own, `post_status`: draft / scheduled /
publishing / published / failed. `drafted` + `draft` is the ordinary pair
— the slot is written, the post has not been sent.

WATCHING ASYNC WORK. `compose: true`, `compose_slot` and
`generate_post_media` all return immediately and finish in the
background.

- A slot being written: poll `get_plan_slot(item_id)` every ~10s. It is
  one slot, not the week. `composing` → keep waiting; `drafted` → the
  `post_id` is there.
- A picture being rendered: it takes MINUTES, not seconds — poll
  `get_media_status(post_id)` every ~30s, and a poll that times out in
  transport changed nothing, so read it again. Every asset
  answers `generating`, `ready` or `failed`, and the post answers the
  same in `state` — `failed` always carries a reason, the provider's own
  wording where there is one. Work in flight says WHEN it started
  (`since`) and when we stop calling it work
  (`stops_looking_after_seconds`), so a poll loop has an end.
  `building: true` means a carousel DECK is still being written, so no
  slide exists yet.
- When a compose FAILS, the slot goes back to `planned` (or
  `needs_input`) and says why in `compose_error` — `insufficient_credits`
  is a wallet, anything else is retried with `compose_slot`.
- `needs_input` is advisory, never a blocker: the slot names material the
  brand still owes (`input_request`), composing runs anyway and designs a
  stand-in; the real photo is swapped in afterwards.

AI tools report `credits_used`-style costs and refuse with
`insufficient_credits` when the wallet is empty. WHICH wallet is a fact
about the brand: `get_account` prints the account's own balance, while the
pool a brand's composing and rendering is charged to — often somebody
else's — is `credits` in `get_brand_context`. All content you pass is
published as plain text — write final copy, not markdown.

EVERY TIME is printed in the brand's timezone, and a datetime you pass
without an offset is read in the ACCOUNT's — `get_account` names it and
says what time it is there now.

Booking is reversible until it goes out: `schedule_post` books a time and
`unschedule_post` takes it back off the calendar. An ARCHIVED post
(`archived: true`) is the other kind of cancelled: it still reads `draft`
but never sends, it is out of `list_posts` unless you ask for
`archived: true`, and scheduling or publishing it is refused. Some channels need a
publish setting before either is allowed — TikTok's privacy level,
YouTube's category — and the refusal names the key and the values it
takes. Ask BEFORE you write: `get_channel_options(brand_id)` lists what
this brand's channels take with no post in existence, and `create_post` /
`add_plan_slot` accept those settings as `options` in the same call, so
one call leaves a post that can be scheduled. On an existing post,
`get_channel_options(post_id)` adds what is already set and
`update_post(options: {…})` changes it. `validate: true` on either
creating tool runs every check and writes nothing.

THE PLAN AND THE CALENDAR ARE TWO SETS. `get_content_plan` answers for
slots; a post booked without a slot (`create_post` + `schedule_post`)
is in the queue only, and the plan lists those as `booked_outside_plan`
for the same week. `get_posting_slots` answers the third question —
which times are still free.

HOW THE POSTS PERFORMED: `export_analytics(brand_id)` returns the same
CSV the app's Analytics page exports — one row per published post per
channel with impressions, engagements, likes, comments, shares, saves and
link clicks — for the last 30 days, a `from`/`to` window, or
`scope: "all"` for everything the plan's history reaches. Save `csv` as a
file named `filename` for the user; summarise it rather than reading rows
back. Per-channel figures come from the network and a metric it does not
report is a dash, not a zero.

The user's OWN photos/videos: `list_brand_media` shows what the library
already holds, and you attach from it by key (`attach_post_media`, or
`media_keys` on create_post / add_plan_slot). Putting a NEW file in is not
a tool: it happens in the app, or over REST (POST /api/brands/:id/media,
multipart `file` or a `url`) with an API key of your own — the key your
MCP client sends is not readable from here, so ask the user to upload
rather than planning around that route.

## Writing rules

- Plain text only. No markdown, no headings, no bold; what you pass is what gets
  published.
- Stay inside each channel's `text_limit` on the first pass; the user should never
  have to cut a post after the fact.
- One post carries one idea and one call to action, taken from the brand's goals.
- When the user asks for several posts, vary the topic and the form across them:
  an offer, a tip, a story, a question, a behind-the-scenes note.

## Asking before spending or sending

- `compose: true`, `compose_slot` and `generate_post_media` spend the user's credits.
  Say so and get a yes before the first call in a conversation.
- `schedule_post` and `publish_post` reach a real audience. Show the final text and
  the time first, and call them only after the user agrees to exactly that.
- After every write, hand the user the post's `url` so they can check it in the app,
  and re-read a post with `get_post` after editing it.
- When a tool refuses, relay its exact reason. Do not retry with guessed inputs.
