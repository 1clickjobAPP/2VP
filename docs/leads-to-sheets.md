# Sending 2VP leads to a Google Sheet

The `/api/lead` route forwards every form submission to whatever URL you set
in the `LEAD_WEBHOOK_URL` env var. The simplest landing spot is a Google
Sheet on your Drive, written to by a small Apps Script attached to the sheet.

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

## 5. Test it

Submit a lead from any area page (`/areas/camden`, etc.) — within a couple
of seconds a row should appear in your **Leads** tab.

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

## Optional follow-ups

- **Email notifications.** Add a `MailApp.sendEmail(...)` call after
  `sheet.appendRow(...)` to ping `hi@2vp.uk` on every new lead.
- **Filter / dashboard.** Build a separate `Dashboard` tab with formulas
  like `=COUNTIFS(Leads!D:D,"prime")` for tier breakdowns.
- **Duplicate detection.** Add a check on `body.email` before appending to
  avoid duplicate rows.
