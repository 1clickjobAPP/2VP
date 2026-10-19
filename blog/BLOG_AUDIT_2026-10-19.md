# Blog audit — 19 October 2026

The 9 unpublished posts in the 17 Oct batch (branch `claude/sleepy-wozniak-om66nr`) checked against `BLOG_RULES.md`. The 39 live posts could not be fetched from this session (2vp.uk is blocked here), so only their registry data was checked.

## Result in one line

The posts pass almost every SEO rule. Two problems block publishing: **£ figures in the body** (the 17 Oct master bans them) and **"fixed-price" in the footer** (retired wording). A third, the deploy route, is still unsolved.

## Per-post scores

| Post | Title chars | Meta chars | H1 | H2 | Hook words | Keyword in first 10 | Words | £ | Byline | 60-sec box |
|---|---|---|---|---|---|---|---|---|---|---|
| basement-conversion-london-guide | 48 | 148 | 1 | 12 | 24 | ✅ | 3,757 | 22 | ✅ | ✅ |
| basement-waterproofing-bs-8102-london | 52 | 135 | 1 | 11 | 25 | ✅ | 3,414 | 1 | ✅ | ✅ |
| cost-per-square-metre-london-renovation-2026 | 53 | 148 | 1 | 10 | 24 | ✅ | 3,248 | 84 | ✅ | n/a (cost) |
| full-victorian-terrace-renovation-cost-london | 59 | 145 | 1 | 11 | 23 | ✅ | 3,635 | 148 | ✅ | n/a (cost) |
| loft-conversion-vs-extension-which | 50 | 148 | 1 | 11 | 24 | ✅ | 3,676 | 73 | ✅ | ✅ |
| rear-extension-cost-london-2026 | 50 | 146 | 1 | 10 | 24 | ✅ | 2,931 | 83 | ✅ | n/a (cost) |
| snagging-list-final-walkthrough-london | 51 | 152 | 1 | 9 | 23 | ✅ | 3,286 | 7 | ✅ | ✅ |
| structural-engineer-vs-architect-london | 51 | 154 | 1 | 9 | 23 | ✅ | 3,511 | 41 | ✅ | ✅ |
| what-is-a-jct-homeowner-contract | 56 | 148 | 1 | 11 | 24 | ✅ | 2,969 | 7 | ✅ | ✅ |

Also passing on all 9: keyword block present · canonical, hreflang, OG, geo meta · `Article`, `Organization`, `BreadcrumbList`, `FAQPage` schema · every image has alt text · olive/gold brand colours · 20 Dawes Road SW6 7EN and 020 8050 8968 in the footer · every £ marked NET / ex VAT with "VAT in addition" · calculator, service-hub and related-post links present.

H2 count runs 9–12, a little over the 4–8 guide. Acceptable for 3,000+ word guides; not worth rewriting.

## Blocking issues

### 1. £ figures in blog bodies (all 9 posts, 466 £ signs in total)

The master (17 Oct, §3) says "No £ figures in social posts, blog bodies, GMB posts or videos." It outranks the SEO Rules, whose rule I requires £-led cost guides. This also affects most of the live cost guides (loft, extension, side return, kitchen, bathroom, office fit-out…), whose titles and hooks are built on £ bands.

| Option | What it means | Trade-off |
|---|---|---|
| **A. Allow £ in cost guides only** (amend the master) | Cost guides keep 2VP's own ex-VAT ranges; how-to posts, GMB posts and social stay £-free. | Keeps the strongest SEO asset ("{service} cost London" queries). Needs one line added to the master. |
| B. Strip £ from all blog bodies | Rewrite ~15 live cost guides and 7 batch posts; prices only in the calculator. | Follows the master as written. Cost-guide pages lose their main reason to rank; rule I has to be rewritten. |

Recommendation: **A**. Searchers for "rear extension cost London" expect numbers; a cost guide without them will lose to Beams and The Page.

### 2. ✅ FIXED 19 Oct — "Fixed-price" in the footer strapline (all 9 posts)

Every post's footer reads "Built by 2VP — fixed-price design & build across London." The phrase was retired on 22 May 2026. The same template is likely on the live posts too.

Fixed in this branch: all 9 footers now read "Built by 2VP — open-book design & build across London." The live posts still need the same change in the site template.

The JCT post's use of "fixed price renovation contract" as a general term (keyword, FAQ) explains what the contract type is and does not promise anything. It can stay.

### 3. Deploy route still unknown

`DEPLOY.md` (22 Aug) is unresolved: the live site is a Next.js app on the Hostinger VPS, no SSH key or repo is recorded, and the app does not serve standalone `index.html`. Posts link to file names (`../../2VP.Calculator.LandingPage.html`, `../../2VP.Loft.HTML`) that must be mapped to live URLs when they're converted.

## Non-blocking issues

| # | Issue | Where | Fix |
|---|---|---|---|
| 4 | Footer LinkedIn link goes to the **AtoZ** company page (`a-to-z-construct-and-build-ltd`) | All 9 | Point to a 2VP LinkedIn page, or remove. |
| 5 | Links to `../commercial/` (6 links) and `../loft-conversion-planning-permission-london/` (3 links) — neither is in the registry | Several | Ship the loft planning post first; confirm `/blog/commercial/` exists. |
| 6 | `basement-conversion-london-guide` title "The Real Tests" and `og:site_name` "2VP — Fix & Clear" | Batch | Check "Fix & Clear" is the current strapline. |
| 7 | Loft £/m² published two ways (delivered £3,200–4,800 vs estimator £2,295–3,645) | Basement guide vs cost-per-m² | Pick one basis (BLOG_RULES §3.5). |
| 8 | Rear extension: estimator gives £71k–£141k vs live band £78k–£140k | Rear extension vs house-extension cost | Widen the live band or explain in both. |
| 9 | Facts marked uncertain by the writer: BS 8102:2022 grade wording · CSSW · JCT edition · Approved Document L 25% glazing · Thames Water 3 m build-over · 42-day prior approval · "registered building control approver" | Batch | Vladimir to check by eye before publishing. |
| 10 | Live loft cost guide uses a non-loft photo (`image_todo` in registry) | Live post #1 | Replace when a loft is photographed. |
| 11 | Registry says "all 23 return 200" but holds 39 entries; 5 are contradicted by DEPLOY/batch notes | `posts.json` | `curl -I` all 39 and update the note. |

## What to do next, in order

1. Vladimir decides the £ question (option A or B).
2. ~~Replace "fixed-price" in the footer~~ done for the batch; still to do in the live site template.
3. Fix the LinkedIn link.
4. Solve the deploy route (SSH key or repo), then ship `loft-conversion-planning-permission-london` first, then the batch.
5. `curl` all 39 registry URLs and correct `posts.json`.
