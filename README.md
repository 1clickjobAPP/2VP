# 2VP

Next.js 14 site with one statically generated landing page per London
borough (33) and prime area (26) — 59 total — for 2VP Construction.

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build && npm start
```

`next build` generates 66 static routes (home, /areas, 59 area pages,
/api/lead, sitemap.xml, robots.txt, /404).

## Lead capture

Each area page embeds `<LeadForm />` which POSTs to `/api/lead`. Set
`LEAD_WEBHOOK_URL` in your environment (Google Sheets / Zapier / Make /
Slack / CRM endpoint) and submissions get forwarded as JSON. See
`.env.example`.

**Recommended:** drop leads into a Google Sheet via a 5-minute Apps
Script setup. Full walkthrough in
[`docs/leads-to-sheets.md`](./docs/leads-to-sheets.md). Script code is
in [`docs/leads-to-sheets.gs`](./docs/leads-to-sheets.gs).

Payload shape:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "07…",
  "postcode": "NW1",
  "projectType": "extension",
  "budget": "100-250k",
  "message": "...",
  "areaSlug": "camden",
  "areaName": "Camden",
  "areaTier": "prime",
  "source": "https://2vp.uk/areas/camden",
  "receivedAt": "2026-05-10T12:00:00.000Z",
  "userAgent": "...",
  "ip": "..."
}
```

If `LEAD_WEBHOOK_URL` is unset, the API logs the lead and returns 200 —
useful in local dev.

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel link        # link this directory to a Vercel project
vercel env add LEAD_WEBHOOK_URL production   # paste your webhook URL
vercel --prod
```

`vercel.json` pins `regions: lhr1` (London) so the lead API runs close
to UK visitors.

After deploy, point `2vp.uk` (or a sub-domain) at the Vercel project
in **Project → Settings → Domains**.
