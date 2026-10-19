# Blog batch 2026-10-17: what it contains and how to publish it

The rulebook (`2VP_SEO_Rules.md`) requires these posts and the hub was missing them. Each one is a finished page in the same HTML format as the existing posts: same CSS, nav, keyword block, schema, FAQ and CTA blocks.

| # | Slug | Rule | Type |
|---|---|---|---|
| 1 | `cost-per-square-metre-london-renovation-2026` | I | Cost guide |
| 2 | `full-victorian-terrace-renovation-cost-london` | I | Cost guide |
| 3 | `rear-extension-cost-london-2026` | I | Cost guide |
| 4 | `permitted-development-rights-extension-london` | J | **Not written: redirect** (see below) |
| 5 | `what-is-a-jct-homeowner-contract` | J | How-to |
| 6 | `structural-engineer-vs-architect-london` | J | How-to |
| 7 | `loft-conversion-vs-extension-which` | J | How-to |
| 8 | `snagging-list-final-walkthrough-london` | J | How-to |
| 9a | `basement-conversion-london-guide` | Top 100 #13 | Existing 27 Aug guide, never deployed (small fixes) |
| 9b | `basement-waterproofing-bs-8102-london` | Keyword B3 | How-to (new) |

Every £ figure is NET of VAT and comes from 2VP's own estimator (`2vp-estimator-config.json`, v1.0.0) or from bands the hub already publishes. No industry averages, no invented projects or testimonials. The basement pages publish no basement rate, the same as the existing guide.

## Why these are not live yet

`blog/_daily/DEPLOY.md` is still the blocker. The live site is a separate Next.js app on the Hostinger VPS, and no route has been recorded for getting posts onto it. These pages are built in the same static-HTML format as the rest of `blog/`, so they go out whichever way the other ~15 live posts went.

The **Google Business Profile post promoting `/blog/basement-conversion-london-guide`** must keep its fallback button (`/blog/underpinning-explained-london-homeowners`) until that URL returns 200.

## Item 4: redirect instead of a new page

The hub already has `permitted-development-rules-extensions-london-2026` (14 May 2026). It covers rear and side extensions and outbuildings, not just lofts. A second page on the same query would compete with it (rule K-4 cannibalisation). Instead:

- 301 `/blog/permitted-development-rights-extension-london/` to `/blog/permitted-development-rules-extensions-london-2026/`.
- Update rule J item 2 in `2VP_SEO_Rules.md` to point at the existing slug.
- First confirm the existing post actually returns 200 on 2vp.uk. If it does not, deploy it from the source; do not write a duplicate.

## Steps

1. Copy each `blog/<slug>/` folder into the site's blog source, the same way the existing posts were deployed.
2. **Also deploy `loft-conversion-planning-permission-london`.** It is linked from the "Continue reading" block several pages inherited from the kitchen template, and `DEPLOY.md` lists it as written but 404. Otherwise those links 404.
3. Curl every URL for a 200. Then append the 8 entries in `_batch-2026-10-17-posts.additions.json` to `blog/_daily/posts.json`, and run `build_blog_hub.py`.
4. Validate the schema at search.google.com/test/rich-results. Resubmit the sitemap to Google and Bing, and ping IndexNow. Never submit a 404.
5. Add the primary keywords to the Top 100 (rule T2.1) and change B3's "Deploy on" to `/blog/basement-waterproofing-bs-8102-london/`.

## Things to decide before publishing

- **Loft £/m² is published two ways.** The basement guide says *delivered* loft rates are £3,200–£4,800/m². The estimator gives a loft *price* of £2,295–£3,645/m² (£2,700 Balanced). The new pages use the estimator figures. Both are internally consistent, but a careful reader can see the gap. Pick one basis for lofts.
- **Rear extension band.** The existing house-extension guide says single-storey rear extensions cost £78k–£140k. On the estimator, 20 m² Minimalist comes to £71k and 25 m² Signature to £141k. The rear-extension page says so openly rather than hiding it. Consider widening the old band.
- **New build Signature** comes out at £3,240/m² net build, above the hub's £1.8–3.2k band.
- **Amott Road.** The published £140k–£175k is well below what the estimator gives for a full-scope Victorian terrace. The Victorian guide explains the difference by scope (ground-floor refurbishment only). Check this framing is fair to the real job.
- **The 15–20% contingency for pre-1940 houses** is quoted from `2VP_Cost_Guide_Research.md`. There is no public URL behind it.
- **Facts to check by eye** (the writers marked them uncertain and worded them carefully):
  - BS 8102:2022 grade wording.
  - CSSW (Property Care Association).
  - JCT edition details. The page tells readers to check the current edition.
  - Approved Document L's 25% glazing rule. No paragraph number is given.
  - The Thames Water build-over distance of 3 m.
  - The 42-day prior-approval period.
  - The "registered building control approver" terminology.
- The basement guide's party wall surveyor band (£1,200–£3,000 per side) and the party wall guide's figure (£800–£1,500 with one Agreed Surveyor) describe different arrangements, but read side by side they look inconsistent.
