# 2VP Blog Rules — Current

**Version 1.0 · 19 October 2026 · Owner: Vladimir Castravet**

The one rulebook for every 2VP blog post. It merges the blog parts of the
current rule files into one list, keeps the rules that still apply, and lists
the rules that were dropped (section 20) so nobody follows them by mistake.

## 0. Where these rules come from, and which one wins

Order of authority (from *2VP Rules — Current (master)*, 17 Oct 2026):

> Vladimir in writing > Contract > **2VP Rules — Current (master)** > Trust & Conversion Rules > SEO Rules > handbooks > dated plans. If SEO and Trust disagree, Trust wins.

| Source | Date | Status for the blog |
|---|---|---|
| *2VP Rules — Current (master)* (Google Doc) | 17 Oct 2026 | **Top authority.** Claims, prices, brand, cadence. |
| `2VP_Trust_and_Conversion_Rules.md` (Drive) | 13 Oct 2026 copy | Current. Wording, protections, testimonials, CTAs. |
| `2VP_SEO_Rules.md` (Drive) | 13 Oct 2026 copy | Current, except the "fixed price" lines (see 20). |
| `2VP_SEO_Keywords_and_Strategy.md` (Drive) | 13 Oct 2026 copy | Top 100 keyword list. Some keywords now banned (see 4.4). |
| `blog/_daily/DEPLOY.md` + batch notes | Aug–Oct 2026 | Publishing steps. |
| `Marketing.Rules.2VP.Master` (branch `london-landing-pages`) | 11 May 2026 | **Retired for the blog.** Built for a different site (`/insights`, 59 area pages, blue brand). Only the cannibalisation rule is kept (4.3). |
| `website-rules.md` (Drive) | 4 May 2026 | **Not 2VP.** AtoZ Design & Glass rules. AtoZ is on hold. Do not use for the blog. |

---

## 1. Cadence and roles

1. **One post a day**: residential on odd dates, office fit-out on even dates.
2. **Every post gets its own Google Business Profile post** on the same day.
3. Roles: Vladimir = source, face and final say on truth. Claude = drafts, checks, reports. Dina = social and calendar. Sandu = website and tracking.
4. A post is not "published" until its live URL returns **200** on 2vp.uk.

## 2. Claims and wording

1. Use the five protections with these exact labels: **Open-Book Itemised Quote · Stage Payments, QA-Gated · Daily On-Site Report · 12-Month Workmanship Warranty · One Named PM, Start to Finish.**
2. **Never promise a fixed price.** "Fixed quote", "fixed price", "fixed-price estimate" and "fixed-price design & build" are retired (since 22 May 2026). Explaining what a fixed-price *contract* is, as a general term, is allowed.
3. Warranty is **12-month workmanship**. No "10-year guarantee".
4. Insurance: name all five (Public liability · Employer's liability · Contractors all-risk · Professional indemnity · Product liability). Never "fully insured" alone.
5. **Never say:** we pride ourselves on · quality work / high standard (without proof) · bespoke (alone) · trusted (about us) · cheapest · most affordable · best · leading · premier · luxury · escrow · funds released on completion · hand-picked from hundreds · free coaching · replacement builder at no cost. (Using a word in its plain technical sense, such as "a stairway leading to a final exit", is fine.)
6. "Design & build" is fine on the blog (homeowner-facing). Never in copy aimed at architects.
7. Every claim must be provable. Numbers beat adjectives. Say "you/your" twice as often as "we/our".
8. Testimonials: first name + neighbourhood + postcode, max 25 words, with written permission.
9. UK English throughout.

## 3. Prices and money

> ⚠️ **OPEN DECISION — read first.** The master (§3, 17 Oct 2026) says **"No £ figures in … blog bodies"**. The SEO Rules (rule I) require cost-guide posts built on 2VP's own £ figures, and most live cost guides plus 7 of the 9 posts in the 17 Oct batch carry £ figures. The master is higher authority, so **until Vladimir decides, do not publish any new post with £ in the body.** See `BLOG_AUDIT_2026-10-19.md` for the options.

Rules that apply either way:

1. Every £ shown anywhere is **excluding VAT**, with "VAT in addition".
2. Only 2VP's own figures (estimator `2vp-estimator-config.json` or delivered projects). Never industry averages.
3. Always a range, never a single promised price.
4. The calculator always shows a range first and is never gated behind an email.
5. One basis per figure: the same service must not appear at two different £/m² on two pages (e.g. loft "delivered" vs "estimator" rates).

## 4. Keywords

1. **Keyword extraction comes first**, before any copy: 1 primary + 2–3 secondary + 5–8 LSI + 3–5 People-Also-Ask questions, recorded in the keyword comment block at the top of the page source, with a `Last extracted` date.
2. All keywords come from the **Top 100** in `2VP_SEO_Keywords_and_Strategy.md`. If a keyword is missing, add it to the Top 100 first.
3. **One primary keyword per page, and no two pages share a primary** (cannibalisation). If a new post would compete with a live one, redirect or merge instead.
4. Do not target keywords that break section 2, even if they are in the Top 100: "trusted", "luxury", "best", "10 year warranty", "fixed price builder".
5. Do not target: DIY, "cheap builders", places outside Greater London, pure material-price queries.
6. Primary keyword appears in: URL, title, HOOK, H1, first 100 words, one image alt; 2–4 times in the body. No stuffing.

## 5. URL

- Cost guide: `/blog/{service}-cost-london-{year}/`. How-to: `/blog/{topic-as-question-or-noun-phrase}/`.
- Lowercase, hyphens, no dates in the path, max 5 words after `/blog/`.
- Any URL change gets a 301. Never let a post die.

## 6. Title tag

- ≤ 60 characters. Primary keyword first, brand last, pipes as separators.
- Cost guide: `[Service] Cost in London [Year] | Real Figures from 2VP` (shorten to `| Real 2VP Figures` to fit).
- How-to: `[Topic] for London Homeowners | 2VP Guide` (or `[Topic] London | 2VP Guide`).
- No clickbait, no superlatives.

## 7. Meta description

- ≤ 155 characters, never empty, never duplicated.
- Verb-led, primary keyword in the first 20 characters, ends on a soft CTA ("Get your itemised estimate in 2 minutes", "See real 2VP projects").
- Never "fixed-price estimate".

## 8. H1

- Exactly one. ≤ 70 characters. Title case.
- Contains the primary keyword (and London where relevant). Different from the HOOK.

## 9. HOOK (first sentence after the H1)

- One sentence, ≤ 25 words, primary keyword in the first 10 words.
- Never starts with "We" or "Our". Answers the title's question rather than repeating it.
- Self-contained and quotable: AI Overviews, ChatGPT and Perplexity lift this line.

## 10. Heading structure

One H1 → 4–8 H2s (9–12 is acceptable on long guides) → 2–4 H3s per H2 where needed → H4 only for real sub-points. Never skip a level. Question-form H3s for PAA, each answered in the 2–4 sentences beneath it.

**Cost-guide H2 menu:** Average cost in London {year} · Cost per m² by finish level · What affects the cost · Hidden costs most homeowners miss · Real 2VP project costs · Cost calculator · FAQs.

**How-to H2 menu:** In 60 seconds — the short answer · What {topic} actually means · When you need it in London · What it costs · How 2VP handles it on every project · FAQs · Get expert advice from 2VP.

## 11. Body content

**Every post:**
- At least 400 words of unique body copy (current posts run 2,900–3,700 — fine).
- Answer-first: the first sentence under each H2 answers that H2.
- Facts in tables and lists. Regulations cited by document and clause where the clause is certain; otherwise cite the document without a number and say so.
- Author byline with photo: Vladimir Castravet (or a named PM).
- One real, signed-off 2VP project near the top (photo + postcode).

**Cost guides also need:** a line-item breakdown table · "What's included / what's not" block · 2+ real 2VP photos · a link to the calculator · `dateModified` refreshed quarterly. (All subject to the £ decision in section 3.)

**How-to posts also need:** an "In 60 seconds" summary box · a one-line answer in the first paragraph · 2+ links to 2VP service hubs · a "Get expert advice from 2VP" CTA at the foot.

## 12. Schema (JSON-LD)

- Required on every post: `Organization` · `BreadcrumbList` · `WebSite` · `Article` (author as `Person`, `datePublished`, `dateModified`).
- `FAQPage` for the FAQ block. Note: since 2023 Google shows FAQ rich results only for government and health sites and no longer shows HowTo rich results. Keep both blocks for Bing and AI engines, but don't expect rich snippets on Google from them.
- Validate at validator.schema.org and search.google.com/test/rich-results before publishing.
- Never fake reviews or ratings.

## 13. Internal links

- Every post links to: **the calculator · its parent service hub · 2 related blog posts.**
- Anchor text uses the target page's keyword. Never "click here", "read more", "learn more".
- No more than one internal link per 100 words of body copy.
- **Every internal link must point to a URL that returns 200** (in `blog/_daily/posts.json` or a live page). No links to unpublished posts.
- No links to AtoZ pages or the AtoZ LinkedIn company page (AtoZ is on hold).

## 14. Images

- **Real 2VP photos only, never stock.** If the right photo doesn't exist yet, use a real 2VP photo and record an `image_todo`.
- File name: `{service}-{neighbourhood}-{postcode}-{descriptor}-{n}.jpg`. Alt text: literal description + primary keyword.
- ≤ 250 KB, WebP preferred, width/height set, lazy-load below the fold. Hero max 1600px wide.

## 15. Page template (technical)

- `lang="en-GB"`, canonical, `hreflang="en-gb"`, `robots index,follow`, Open Graph + Twitter Card, geo meta, semantic HTML.
- Core Web Vitals "Good" on mobile: LCP ≤ 2.5s · CLS ≤ 0.1 · INP ≤ 200ms. Page ≤ 2 MB.
- Brand: Olive `#3A4B29`, Gold `#C6A664`, Black `#222222`, Graphite `#444444`, Light Gray `#F3F3F3`. League Spartan (H1/H2), Inter (body).
- Footer NAP exactly: **2VP · 20 Dawes Road, London SW6 7EN · 020 8050 8968 · hi@2vp.uk** — identical to Google Business Profile, Bing Places and Apple Business Connect.
- Footer strapline must not say "fixed-price". Use: "Built by 2VP — open-book design & build across London."

## 16. Publishing and indexing

1. Draft → run the checklist (section 19) → Vladimir signs off.
2. Deploy to the live site. (Blocked: the deploy route to the Hostinger VPS is still not recorded — see `DEPLOY.md`.)
3. `curl` the live URL for a **200**. Only then add the post to `blog/_daily/posts.json` and run `build_blog_hub.py`.
4. Validate schema. Resubmit the sitemap to Google Search Console and Bing Webmaster Tools; ping IndexNow. **Never submit a 404.**
5. Publish the matching GBP post. If its target URL isn't live yet, the GBP button points at a live fallback post.
6. Add the post's primary keyword to the Top 100 "Deploy on" column.

## 17. Measure and prune

- Track per post: landing page, target keyword, CTA clicks, scroll depth, calculator submissions.
- Monthly: Search Console ranking for each primary keyword.
- Quarterly: any post with zero impressions in 90 days is consolidated (301) or rewritten.
- Judge posts on traffic × calculator-submission rate × consult-booked rate, not traffic alone.

## 18. Never do

Never publish: an empty or duplicate meta · generic anchor text · industry-average prices · stock photos · clickbait titles · thin posts (< 400 unique words) · links to 404s · a second post on a live post's primary keyword · any wording from section 2.5.

## 19. Pre-publish checklist

- [ ] Keyword block filled from the Top 100, primary not used by another post
- [ ] URL, title (≤60), meta (≤155), one H1 (≤70) all carry the primary keyword
- [ ] HOOK ≤ 25 words, keyword in first 10, doesn't start with We/Our
- [ ] Heading cascade clean, mandatory H2s present
- [ ] £ rule (section 3) followed; any £ is ex VAT with "VAT in addition"
- [ ] No banned wording (section 2), no "fixed price" promise, footer strapline correct
- [ ] Byline, real 2VP photo, alt text
- [ ] Links: calculator + service hub + 2 related posts, all returning 200
- [ ] Schema validates
- [ ] Vladimir has signed off the facts

## 20. Retired rules (removed — do not use)

| Old rule | Source | Why it was removed | Replaced by |
|---|---|---|---|
| Blog lives at `/insights/[slug]` | Marketing.Rules.2VP.Master §5, §9 SEO-L-3, §19 | Live blog is `/blog/` | Section 5 |
| Blog posts link to 2 *area* pages + 1 service hub | Marketing.Rules SEO-L-3, K-3 | The 59-area-page site was never the live site | Section 13 |
| Blog word count 1,200–2,000 | Marketing.Rules C-1 | Live posts run 2,900–3,700 and rank; only a 400-word floor remains | Section 11 |
| Brand colours `#0a3d62` / `#e6a23c` | Marketing.Rules B-6 | Brand is olive/gold | Section 15 |
| Week-7 "4 cornerstone pieces" (Article 4 Camden etc.) | Marketing.Rules §19 | Dated plan, superseded by rules I and J | Inventory, section 4 |
| LCP < 2.0s, CLS < 0.05 | Marketing.Rules SEO-T-8 | Superseded by SEO Rules M | Section 15 |
| AI content needs only a "human pass" | Marketing.Rules C-6 | Now: Vladimir signs off every fact | Section 16.1 |
| Title hook "Fixed-Price Design & Build" | SEO Rules C | "Fixed price" retired 22 May 2026 | Section 6 |
| Meta CTA "Get your fixed-price estimate" | SEO Rules D | Same | Section 7 |
| HOOK template "fixed-price quotes" | SEO Rules R | Same | Section 9 |
| Trust strip "Fully insured" | Trust Rules C.2 | Must name all five insurances | Section 2.4 |
| Rule J item 2: write `/blog/permitted-development-rights-extension-london/` | SEO Rules J | Would cannibalise the live `permitted-development-rules-extensions-london-2026` | 301 to the live post |
| Rule J item 1: write `/blog/party-wall-agreement-london-guide/` | SEO Rules J | Live `party-wall-agreement-cost-london` already covers it | Point rule at the live post |
| Rule I item 2: write `/blog/side-return-extension-cost-london-2026/` | SEO Rules I | Live `side-return-extension-guide-london` already publishes the cost band | Point rule at the live post |
| Any AtoZ website rule | `website-rules.md` | Different company, on hold | — |

## 21. Open decisions (need Vladimir)

1. **£ in blog bodies** — keep cost guides with £ figures (change the master), or strip £ from blog bodies (rewrite the cost guides). See the audit for the trade-off.
2. **One URL set** for the calculator and service hubs (`/calculator/` vs `/quote-calculator/`; `/basement-conversions/` vs `/basements/`). Posts currently link to file names like `2VP.Calculator.LandingPage.html`, which must be mapped to live URLs at deploy.
3. **Loft £/m² basis** — "delivered" £3,200–£4,800 or estimator £2,295–£3,645. Pick one.
4. **Deploy route** to the live Next.js site (SSH or GitHub), and how it sources posts.
