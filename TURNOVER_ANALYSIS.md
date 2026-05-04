# AtoZ Marketplace — Turnover Analysis

> Bottom-up projection of revenue and gross profit AtoZ could plausibly generate from the managed-marketplace model, across three scenarios over 36 months.
>
> **These are projections, not guarantees.** They assume the operational model in `MARKETPLACE_SOLUTION.md` is delivered as designed and that the four pre-launch decisions in §15 of that document have been resolved.

---

## 1. Method

Turnover = **Jobs × Average Order Value (AOV)**, built bottom-up from:
- AOV bands grounded in 2026 UK fitted prices for AtoZ's product mix
- A capacity model (surveyors × install crews × throughput per crew)
- A demand funnel (leads → survey → firm quote → order)
- A monthly ramp curve reflecting realistic onboarding speed
- A separate B2B / trade-project layer that can scale independently of B2C capacity

---

## 2. AOV bands — what an "average order" looks like

Reference points (London, supplied & fitted, 2026):

| Product | Typical fitted price |
|---|---|
| Pair of upgraded sash windows | £1.5–3k |
| Composite front door | £1.8–4.3k |
| Steel front door (bespoke) | £4–10k |
| Full house re-glaze, 8–10 windows | £6–12k |
| 3-pane aluminium bifold | £6–10k |
| 4-pane aluminium bifold | £8.5–13k |
| 5-pane aluminium bifold | £11–16k |
| 6-pane+ bifold / large slider | £14–25k |
| Steel framed glazing wall | £15–40k |
| Architectural / commercial glass | £30–150k+ |

### Planning AOV bands for AtoZ's positioning (bespoke, London/SE)

| Segment | Mix assumption | Blended AOV used in model |
|---|---|---|
| B2C entry (single product, replacement) | 25% of jobs | £4,500 |
| B2C mid (bifolds, doors, partial reglaze) | 50% of jobs | £10,500 |
| B2C premium (steel, full house, architectural) | 25% of jobs | £22,000 |
| **B2C blended AOV** | | **£11,800** |
| B2B trade order (architect / single contractor PO) | — | £18,000 |
| B2B project (developer / new build, multi-unit) | — | £150,000–£800,000 |

> For modelling, B2C blended AOV is rounded to **£10,000** (conservative — accounts for early jobs leaning entry/mid before brand trust pulls in premium).

---

## 3. Capacity model — the binding constraint

Bespoke fenestration is capacity-limited. You can't sell what you can't survey, schedule and snag.

| Resource | Sustainable monthly throughput |
|---|---|
| 1 surveyor | ~12 site surveys / month |
| 1 install crew (2 fitters) | ~6 jobs / month at 80% utilisation |
| 1 customer-success / ops person | ~25–35 active jobs in flight |

Each job consumes: 1 survey visit + 1–3 install days + 1 snag visit, plus admin.

A panel of **6 install crews + 2 surveyors** therefore tops out around **30–35 B2C jobs/month** before stress.

B2B trade projects sit largely outside this constraint — the contractor's site team installs, AtoZ supplies frames + (optionally) a project-managed install crew. This is why scaling **into B2B** transforms the turnover ceiling.

---

## 4. Demand funnel — what marketing has to deliver

Industry funnel for high-ticket UK home improvement (£35–£100 CPL on Google/Meta for double glazing):

| Stage | Conversion |
|---|---|
| Lead → survey deposit paid | 18% |
| Survey → firm quote issued | 95% |
| Firm quote → order | 55% |
| **Lead → order (overall)** | **~9.4%** |

So **every 100 inbound leads = ~9 closed orders**.

To land 12 B2C orders/month you need roughly **130 qualified inbound leads/month** — at £50 CPL that's **£6.5k marketing spend/month**.

---

## 5. Three scenarios — Year 1 monthly ramp

### 5a. Conservative — slow onboarding, light marketing

Capacity: 4 install crews, 1 surveyor by month 6.
Marketing: £2–4k/month on Google/Meta.
B2B: not yet active.

| Month | B2C jobs | AOV | Monthly turnover |
|---|---|---|---|
| M1 | 1 | £8,000 | £8,000 |
| M2 | 2 | £8,000 | £16,000 |
| M3 | 3 | £8,500 | £25,500 |
| M4 | 4 | £9,000 | £36,000 |
| M5 | 6 | £9,000 | £54,000 |
| M6 | 8 | £9,500 | £76,000 |
| M7 | 9 | £9,500 | £85,500 |
| M8 | 10 | £10,000 | £100,000 |
| M9 | 11 | £10,000 | £110,000 |
| M10 | 12 | £10,000 | £120,000 |
| M11 | 12 | £10,000 | £120,000 |
| M12 | 12 | £10,000 | £120,000 |
| **Y1 totals** | **~90 jobs** | | **~£870,000** |

→ **Y1 turnover ~£0.85m, gross profit @ 21% ~£180k.**

### 5b. Base case — plan met

Capacity: 6 install crews + 2 surveyors by month 8.
Marketing: £4–8k/month.
B2B: 1 architect / small contractor account live by month 9.

| Month | B2C jobs | B2B trade orders | Monthly turnover |
|---|---|---|---|
| M1 | 2 | — | £20,000 |
| M2 | 3 | — | £30,000 |
| M3 | 5 | — | £50,000 |
| M4 | 7 | — | £70,000 |
| M5 | 9 | — | £90,000 |
| M6 | 12 | — | £120,000 |
| M7 | 14 | — | £140,000 |
| M8 | 16 | — | £160,000 |
| M9 | 18 | 1 (£18k) | £198,000 |
| M10 | 20 | 2 (£36k) | £236,000 |
| M11 | 22 | 2 | £256,000 |
| M12 | 22 | 3 (£54k) | £274,000 |
| **Y1 totals** | **~150 B2C** | **~8 B2B** | **~£1.64m** |

→ **Y1 turnover ~£1.65m, gross profit @ 22% ~£360k.**

### 5c. Stretch — B2B traction lands early

Capacity: same panel, but B2B does not consume crew capacity.
Marketing: £8–12k/month.
B2B: 1 active contractor + 1 developer mid-size project landed in H2.

| Month | B2C jobs | B2B trade orders | B2B project | Monthly turnover |
|---|---|---|---|---|
| M1–M6 | as base case | | | £380,000 (cumulative) |
| M7 | 14 | 1 | — | £158,000 |
| M8 | 16 | 2 | — | £196,000 |
| M9 | 18 | 3 | — | £234,000 |
| M10 | 20 | 4 | starts (£250k staged) | £350,000 |
| M11 | 22 | 4 | continues | £350,000 |
| M12 | 24 | 5 | continues | £400,000 |
| **Y1 totals** | **~165 B2C** | **~25 B2B** | **1 project (£250k)** | **~£2.7m** |

→ **Y1 turnover ~£2.7m, gross profit @ 22% ~£590k.**

> The stretch scenario hinges on landing **one** developer project. That single account adds roughly £500k–£1m to annual turnover and changes the size of the business.

---

## 6. Year 2 and Year 3 outlook

| Scenario | Y1 turnover | Y2 turnover | Y3 turnover |
|---|---|---|---|
| Conservative | £0.85m | £1.6–2.0m | £2.5–3.5m |
| Base | £1.65m | £3.0–3.8m | £5.0–6.5m |
| Stretch | £2.7m | £5.0–6.5m | £8.0–12.0m |

**Drivers of Y2/Y3 step-up:**
1. **Configurator** producing inbound at lower CPL (organic + branded search up).
2. **B2B trade portal live** — repeat orders, no marketing cost per job.
3. **2–3 active developer / contractor accounts** — each worth £300k–£1.5m / year.
4. **Geographic expansion** — Home Counties + Surrey + Birmingham as installer panel grows.
5. **Brand effect** — Trustpilot, referrals; CAC drops as repeat / referral share grows.

**Ceilings:**
- B2C-only ceiling, single-region: ~£3–4m/year (capacity-limited).
- With healthy B2B + 2 active developer accounts: £8–12m+/year is realistic.
- Beyond £12m the model needs a second region, a second showroom, or a proper trade-counter / wholesale arm.

---

## 7. Sensitivity — what moves the needle most

| Lever | Δ | Impact on Y1 turnover (base case) |
|---|---|---|
| AOV +£2,000 | +20% per job | **+£330k** |
| Lead → order conversion +3pp (12.4%) | +30% orders | **+£500k** |
| Add 1 install crew | +6 jobs/mo capacity | **+£400k** annualised |
| One B2B project lands | +£250–500k | **+£250–500k** |
| CAC drops £20 (better SEO/brand) | More leads at same spend | **+£150–250k** |
| Premium-tier mix +10pp | AOV +£1,200 | **+£200k** |

The two biggest unlocks are **landing the first B2B project** and **lifting blended AOV** by tilting marketing toward bifold / steel / architectural keywords rather than entry-tier replacement work.

---

## 8. Cash and working capital

The model is **structurally cash-positive** because of the escrow stage payments:

| Stage | Customer pays | AtoZ pays out |
|---|---|---|
| Order | 30% (into escrow) | nothing yet |
| Manufacturer dispatch | escrow holds | manufacturer paid (~55–60% of job value) |
| Delivery to site | another 60% | balance to manufacturer |
| Sign-off + 14d snag | retention 10% | installer paid + AtoZ margin retained |

Customer money is held in third-party escrow, so it isn't AtoZ's working capital — but **AtoZ's own cash exposure is limited** because suppliers and installers are paid only when their work is delivered and signed for.

Year-1 working-capital cushion needed: **~£60–90k** to cover marketing spend, ops payroll, software, deposits to suppliers requiring upfront, and timing differences. Not £500k of stock or vans — that's the point of the model.

---

## 9. What you need to actually hit each scenario

| Resource / cost | Conservative | Base case | Stretch |
|---|---|---|---|
| Install crews on panel | 4 | 6 | 6 + B2B PM capacity |
| Surveyors on panel | 1 | 2 | 2 |
| Manufacturer panel | 3 | 6 | 8 |
| Marketing spend (Y1) | £25–35k | £55–80k | £100–140k |
| Trade BD / sales lead | not yet | half-time | full-time |
| Operations / customer success | 1 FT | 1 FT + 1 PT | 2 FT |
| Configurator delivered by | M9 | M6 | M4 |
| Trade portal delivered by | Y2 | M10 | M6 |
| Total Y1 opex (excl. COGS) | £150–200k | £280–360k | £450–600k |

---

## 10. Headline summary

| | Y1 | Y2 | Y3 | Y3 gross profit @ 22% |
|---|---|---|---|---|
| **Conservative** | **£0.85m** | £1.8m | £3.0m | ~£660k |
| **Base case** | **£1.65m** | £3.4m | £5.5m | ~£1.21m |
| **Stretch** | **£2.7m** | £5.7m | £10.0m | ~£2.20m |

**Realistic planning assumption: aim for the base case, build the operating model so the stretch is reachable when (not if) the first developer account lands.**

The two single biggest determinants of where AtoZ ends up on this range are:

1. **How fast the panel scales.** If you can sign 2 manufacturers and 4 installers in the first 90 days, base case is on. If it takes 9 months, you slip to conservative.
2. **Whether the B2B channel gets resourced.** B2C alone caps you below £4m/year. Hiring or assigning a trade-BD person early is the lever that unlocks £6m+ outcomes.

---

## 11. What this analysis does NOT include

- New showroom or premises costs (assumes existing AtoZ location)
- Acquisition of an existing installer to "buy" capacity
- White-label / dropshipping for other retailers
- International (Ireland, France) — easy add-on once UK escrow + cert model is proven
- Insurance products (separate revenue stream — typically £30–80k/year of pure margin once attach rate hits 30%)

These are upside, not assumed.
