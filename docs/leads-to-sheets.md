# Sending 2VP leads to a Google Sheet (with email notifications)

The `/api/lead` route forwards every form submission to whatever URL you set
in the `LEAD_WEBHOOK_URL` env var. The simplest landing spot is a Google
Sheet on your Drive, written to by a small Apps Script attached to the sheet.
The same script also fires two emails on every lead:

1. **Internal alert** → `hi@2vp.uk` (so you know immediately)
2. **Confirmation reply** → the lead's own email address (so they get a
   receipt and your reply-to set)

No Google Cloud project, no API keys, no third-party tools.

## 1. Create the sheet

1. Go to <https://sheets.new> while signed in to the Google account that
   owns 2VP's Drive.
2. Rename the file to something like **"2VP — Leads"**.
3. (Optional.) Rename the first tab to **`Leads`**. If you skip this, the
   script will create a `Leads` tab on first submission.

## 2. Attach the Apps Script

1. In the sheet, click **Extensions → Apps Script**. A new editor tab opens.
2. Delete the placeholder `function myFunction() {}` code.
3. Paste the full contents of [`leads-to-sheets.gs`](./leads-to-sheets.gs)
   (also in this repo) into the editor.
4. Click the disk icon (or `⌘S` / `Ctrl+S`) to save. Name the project
   **"2VP Leads webhook"**.

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Next to "Select type", click the gear icon and choose **Web app**.
3. Settings:
   - **Description:** `2VP /api/lead receiver`
   - **Execute as:** `Me (your-email@…)`
   - **Who has access:** `Anyone` (this only allows POSTing to the URL —
     it does NOT make your sheet public)
4. Click **Deploy**. Google will ask you to authorise the script the first
   time. Approve the prompts (you may need to click **Advanced → Go to
   2VP Leads webhook (unsafe)** because Google warns on un-verified
   personal scripts).
5. Copy the **Web app URL** at the end. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb…/exec
   ```

## 4. Wire the URL into Vercel

```bash
vercel env add LEAD_WEBHOOK_URL production
# paste the web app URL when prompted, press Enter
vercel --prod   # redeploy so the env var takes effect
```

Local dev: drop the URL into `.env.local` as `LEAD_WEBHOOK_URL=…`.

> **Don't set `LEAD_WEBHOOK_SECRET` for Apps Script.** Apps Script `doPost`
> doesn't expose custom HTTP headers, so the secret check would do nothing.
> The web app URL itself contains ~70 characters of entropy and acts as the
> shared secret — just don't post it publicly.

## 5. Email behaviour & quotas

Both emails are sent by Google's built-in `MailApp` service from the Google
account that owns the Apps Script (typically the same account that owns the
sheet).

- **From address.** Emails always come from the script-owner account. To
  send from `hi@2vp.uk`, create the sheet while signed in as `hi@2vp.uk`
  (Workspace), or set up Gmail "Send mail as" with that address.
- **Internal alert** has its `Reply-To` set to the lead's email, so hitting
  Reply in your inbox starts a thread with the customer directly.
- **Lead confirmation** has its `Reply-To` set to `hi@2vp.uk`, so any reply
  from the lead lands in your shared inbox.
- **Daily quota.** Apps Script `MailApp` allows 100 recipients/day on free
  Gmail and 1500/day on Workspace. Each lead consumes 2 emails (internal +
  confirmation), so you have headroom for ~50 leads/day on free Gmail and
  ~750/day on Workspace.
- **Disable lead confirmation.** Set `SEND_CONFIRMATION_TO_LEAD = false`
  at the top of `leads-to-sheets.gs`, save, and **Deploy → Manage
  deployments → edit → New version**.
- **Change recipient.** Edit `NOTIFY_EMAIL` in the script.

## 6. Test it

Submit a lead from any area page (`/areas/camden`, etc.) — within a couple
of seconds you should see:

- a new row in your **Leads** tab,
- an alert email at `hi@2vp.uk`, and
- a confirmation email to the address you used in the form.

You can also test directly with curl once `LEAD_WEBHOOK_URL` is set:

```bash
curl -X POST https://YOUR-VERCEL-DOMAIN/api/lead \
  -H "content-type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "phone": "07700900123",
    "postcode": "NW1",
    "projectType": "extension",
    "budget": "100-250k",
    "message": "Side-return + loft",
    "areaSlug": "camden",
    "renderedAt": 0
  }'
```

## Sheet column layout

The script creates these 15 columns in row 1 on first run:

| Col | Header        | Source field    |
|-----|---------------|-----------------|
| A   | Received      | `receivedAt`    |
| B   | Area          | `areaName`      |
| C   | Area slug     | `areaSlug`      |
| D   | Tier          | `areaTier`      |
| E   | Name          | `name`          |
| F   | Email         | `email`         |
| G   | Phone         | `phone`         |
| H   | Postcode      | `postcode`      |
| I   | Project type  | `projectType`   |
| J   | Budget        | `budget`        |
| K   | Message       | `message`       |
| L   | Source URL    | `source`        |
| M   | Referer       | `referer`       |
| N   | IP            | `ip`            |
| O   | User agent    | `userAgent`     |

You can hide / reorder columns in the sheet UI without breaking the script
(rows are appended to fixed column indexes via `appendRow`).

## Re-deploying after script edits

If you change anything in `leads-to-sheets.gs` (recipient, confirmation
copy, columns), you need to publish a new version of the web app:

1. Apps Script editor → **Deploy → Manage deployments**
2. Pencil icon next to the existing deployment
3. **Version → New version**, click **Deploy**

The web app URL stays the same, so you don't need to change Vercel's env
var.

## Optional follow-ups

- **Filter / dashboard.** Build a separate `Dashboard` tab with formulas
  like `=COUNTIFS(Leads!D:D,"prime")` for tier breakdowns.
- **Duplicate detection.** Add a check on `body.email` before appending to
  avoid duplicate rows.
- **HTML emails.** Swap `body:` for `htmlBody:` in `MailApp.sendEmail` to
  send branded HTML — recommended once you have a logo and brand colours
  to use.
