# AtoZ Bespoke-Product Marketplace — Solution Design

> Convert **atozdesignandglass.co.uk** from a vertically-integrated installer into a **managed bespoke-product marketplace** for windows, doors, glass, and architectural joinery.
>
> AtoZ stays the customer-facing brand and the contracting party. Behind the brand sit a vetted panel of UK / Polish / European manufacturers and a panel of CERTASS-registered installers operating under AtoZ's umbrella.

---

## 1. Executive summary

| | |
|---|---|
| **What it is** | A managed marketplace where customers buy bespoke fenestration through AtoZ. Manufacturing is fulfilled by a panel of suppliers; installation by a panel of vetted fitters. AtoZ handles configuration, pricing, escrow, certification, snagging, and warranty. |
| **Who it serves** | (B2C) London + South-East homeowners, (B2B) architects, main contractors, developers. |
| **How it earns** | Layered blended margin of ~22% — supplier mark-up + installer mark-up + finance referral + extended warranty + panel fees. No single visible "commission" line. |
| **Why it wins** | Cheaper than a full-service installer, safer than buying frames direct from Poland and finding a fitter, faster than RFQ'ing 3 manufacturers manually. CERTASS + HomePro IBG umbrella is the trust anchor. |
| **What it is *not*** | A pure directory or lead-gen site. AtoZ holds the customer contract, the warranty, and the certificate. |

---

## 2. Positioning and value proposition

| Audience | What they get | Why they pick AtoZ |
|---|---|---|
| Homeowner | One-quote, one-throat-to-choke for bespoke windows/doors with insurance-backed guarantee | Cheaper than a full-service installer, safer than DIY-importing frames |
| Architect / specifier | Trade portal with live trade-card pricing, schedules, delivery dates | Faster than emailing 3 manufacturers; spec-grade products without the import faff |
| Main contractor / developer | Site-delivered frames + vetted fitters under one PO and one cert | One supplier, one cert, no chasing |
| Panel manufacturer | UK demand without UK sales overhead | AtoZ handles import, customer service, snagging |
| Panel installer | Steady pre-qualified jobs, paid on time, no marketing spend | No customer disputes — handled by AtoZ |

---

## 3. Canonical job flow (the model)

1. **Configure online** — customer picks tier (entry / mid / premium), enters rough sizes, uploads photos, postcode-gated. Instant **indicative price** (calculated from pre-loaded supplier price list × AtoZ margin).
2. **Refundable survey deposit** — £200, refunded against final order. Kills tyre-kickers; signals serious intent.
3. **On-site survey** by panel surveyor — exact measurements, glass schedule, install scope, photos.
4. **Firm quote** auto-recalculated. Customer e-signs quote + T&Cs (incl. ±5% tolerance, snagging window, bespoke-goods consumer-rights disclosure).
5. **Stage 1 escrow payment** — 30% deposit into third-party escrow (Shieldpay / Transpact / solicitor client account). Manufacturing PO raised. Install slot booked.
6. **Frames delivered to site** — manufacturer paid from escrow. Stage 2 release: 60%.
7. **Installation** under AtoZ's CERTASS umbrella. Snag list signed on the day.
8. **14-day snagging window** — deemed acceptance unless defects raised in writing. Final 10% releases. CERTASS certificate + HomePro IBG issued in the customer's name.
9. **Installer paid** on sign-off; AtoZ retains its blended margin.

> **The fix that makes this work:** quote in two stages (indicative → firm after survey). Never quote bespoke from rough sizes alone.

---

## 4. The three-sided network

### 4.1 Manufacturer panel — target 6–10 partners across tiers

| Tier | Typical sources | Indicative trade margin AtoZ retains |
|---|---|---|
| Entry | Polish PVC (DAKO, Aluplast, Drutex etc.) | 18–25% |
| Mid | Polish / German aluminium | 15–22% |
| Premium | UK / German steel, German timber, bespoke joiners | 12–18% |

**Onboarding requirements:**
- Pre-negotiated trade price list (refresh quarterly)
- Lead-time SLAs in writing
- Back-to-back product warranty (10 years standard)
- EXW / DAP / DDP terms agreed up front
- Physical samples held at AtoZ HQ for showroom and dispute reference

### 4.2 Installer panel

- **Vetted:** CERTASS or FENSA registered, public liability ≥£5m, two reference jobs inspected, ID verified
- **Insured:** their own PI cover; AtoZ also carries umbrella PI
- **Contracted:** day rate negotiated per crew size; AtoZ books work and pays on sign-off
- **Bound by panel agreement**: measurement liability, snagging response SLAs (48 hours), exclusivity for inbound AtoZ jobs while on the panel

### 4.3 Customer types

- **B2C** — postcode-gated to AtoZ's service area. Single-job, full retail margin.
- **B2B** — trade login, credit terms (net 30), discounted margin tier, repeat orders.

---

## 5. Platform architecture (functional view)

```
                +----------------------------------+
                |      atozdesignandglass.co.uk    |
                |  (public site + configurator)    |
                +-----------------+----------------+
                                  |
              +-------------------+-------------------+
              |                                       |
   +-----------------+              +---------------------------+
   | Customer portal |              |  Trade portal (B2B)       |
   | (orders/snags)  |              |  (live quotes / accounts) |
   +--------+--------+              +-------------+-------------+
            |                                     |
            +------------------+------------------+
                               |
                  +------------v-----------+
                  |   Pricing & Order      |
                  |     Engine (core)      |
                  +---+----+----+----+----++
                      |    |    |    |    |
            +---------+    |    |    |    +--------------+
            |              |    |    |                   |
   +--------v---+  +-------v+   |    | +---------v----+  +--v----------+
   | Supplier   |  | Install|   |    | | Escrow svc   |  | Document    |
   | portal     |  | portal |   |    | | (Shieldpay/  |  | service     |
   | (POs/disp) |  | (jobs) |   |    | |  Transpact)  |  | (certs/IBG) |
   +------------+  +--------+   |    | +--------------+  +-------------+
                                |    |
                       +--------v+   +---v-----------+
                       | Payments|   | Finance       |
                       | (Stripe)|   | (Kandoo/V12)  |
                       +---------+   +---------------+
```

### Key modules
- **Configurator** — instant indicative pricing from pre-loaded supplier price tables
- **Pricing engine** — `supplier_price × margin × overheads + install + extras`
- **Customer / trade / supplier / installer portals** — role-scoped dashboards
- **Escrow integration** — third-party-held client money
- **Document service** — auto-generated quotes, invoices, CERTASS certs, HomePro IBG packs
- **Admin console** — panel management, dispute resolution, manual price overrides
- **Comms** — email + SMS triggered on every status change

---

## 6. Pricing engine and monetization

Customer sees one clean price. Behind the scenes the take is layered:

| Source | Rate | Customer sees |
|---|---|---|
| Mark-up on supplier price | 12–18% | Built into product line |
| Mark-up on installer day rate | 10–15% | Built into install line |
| Refundable survey fee | £150–300 | Survey line (refunded against order) |
| Finance referral (Kandoo / V12 / Klarna) | 3–8% of basket | Lender-paid, customer-invisible |
| Extended warranty add-on (15–25 yr insured) | £100–300 | Optional add-on |
| Supplier "preferred partner" placement | £200–1,500/mo | Not visible to customer |
| Installer panel subscription | £100–400/mo | Not visible to customer |

**Blended take ≈ 20–25%** — roughly double a flat 10% commission, without the customer ever seeing a "commission" line.

---

## 7. Escrow and payment schedule

| Stage | % of total | Trigger | Released to |
|---|---|---|---|
| 1 — Order | 30% | Customer signs firm quote | Held in escrow; manufacturer paid on dispatch |
| 2 — Delivery | 60% | Frames delivered to site, signed for | Held in escrow; balance to manufacturer; install scheduled |
| 3 — Retention | 10% | Install + 14-day snagging window cleared | Installer paid; AtoZ keeps margin |

**Deemed acceptance:** if no faults raised in writing within 14 days of installation, payment auto-releases. Stops customers from indefinitely sitting on the retention.

**Why third-party escrow, not AtoZ's bank account:**
- Customer is protected if AtoZ becomes insolvent
- Cleaner VAT / accounting position
- Trust signal in marketing copy ("your money is held in independent escrow until you're happy")

---

## 8. Compliance — non-negotiable pre-launch

| Area | Requirement | Action |
|---|---|---|
| CERTASS / FENSA | If AtoZ issues the certificate, AtoZ is the legal installer. Sub-contractor model must be sanctioned. | Confirm in writing with CERTASS — does the lead-contractor model qualify? Document supervision/training records expected. |
| HomePro IBG | Insurance-Backed Guarantee normally names the installing company | Confirm with HomePro whether AtoZ as lead-contractor can be the named entity, or whether the panel installer must be |
| Building Regs Part L / Q / F | U-values, security, ventilation — installer's day-of-job responsibility | Build a digital install checklist signed off on every job |
| GDPR | Customer data shared with supplier and installer | Document data-controller / processor mapping; DPA in panel agreements |
| Consumer Rights Act 2015 | Fitness for purpose, satisfactory quality | Reflected in T&Cs and warranty wording |
| Consumer Contracts Regs 2013 | Bespoke goods exempt from 14-day cooling-off — but only if disclosed properly | Bold, plain-English disclosure on the firm quote screen |

> **These three calls must happen before a line of code is written:** CERTASS, HomePro, and a construction-sector solicitor.

---

## 9. Legal stack

- **Manufacturer Panel Agreement** — pricing, lead times, warranty back-to-back, IP, data, exit
- **Installer Panel Agreement** — vetting, day rate, measurement liability, snagging SLA, exclusivity-while-on-panel, indemnities
- **Customer T&Cs (B2C)** — bespoke goods, cooling-off disclosure, snagging window, dispute path
- **Master Services Agreement (B2B)** — credit terms, schedules of rates, KPIs, change control
- **Privacy policy** — data flows across all parties
- **Snagging & remake policy** — who pays for what, who attends, time limits
- **Escrow service agreement** — flow of funds, release conditions

---

## 10. Operating model — lean Phase 1 team

| Role | FT/PT | Responsibility |
|---|---|---|
| Founder / commercial lead | FT | Panel relationships, pricing, escalations |
| Operations / supply-chain | FT | POs, logistics, deliveries |
| Surveyor coordinator | FT | Books and dispatches surveys |
| Customer success | FT | First-line support, snags |
| Bookkeeper | PT | AP/AR, escrow reconciliation, VAT |
| Dev (outsourced) | Contract | Configurator, portals, integrations |
| Legal | Retainer | Agreements, disputes |
| Accountant | Retainer | VAT, payroll, year-end |

---

## 11. Unit economics & KPIs

### Target unit economics per job (illustrative — adjust to your real cost lines)

| Line | £ |
|---|---|
| Customer pays (AOV) | 12,000 |
| Manufacturer cost | 6,500 |
| Installer cost | 2,200 |
| Logistics, comms, admin | 400 |
| Marketing CAC (allocated) | 600 |
| **Gross profit retained by AtoZ** | **2,300 (≈19%)** |

### KPIs to instrument from day 1
- Lead → quote conversion
- Quote → order conversion
- Survey-deposit refund rate
- AOV by tier
- Blended gross margin %
- Snag rate per 100 jobs
- NPS / Trustpilot inflow
- Days from order to install (lead-time SLA)
- Cash conversion cycle
- Repeat / referral rate

---

## 12. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Quote-vs-survey price gap → customer attrition | High | Med | Two-stage pricing + tolerance clause + transparent survey process |
| Botched install hits AtoZ's certificate | Med | High | Strict installer vetting, supervision audit trail, back-to-back indemnity, PI cover |
| HomePro / CERTASS rule out lead-contractor model | Low | High | Confirm in writing pre-launch; fall-back is each installer registered, AtoZ as marketplace |
| Customer holds 10% retention indefinitely | High | Low/Med | Deemed acceptance after 14 days |
| Escrow / cashflow / VAT confusion | Med | Med | Third-party escrow; bookkeeper from day 1 |
| Manufacturer lead-time slip | High | Med | SLAs in panel agreement; multi-source by tier; weekly check-ins |
| Measurement error → remake cost | Med | Med | Installer panel agreement assigns liability to installer for measurement errors |
| Reputation damage from one bad job | Med | High | Pre-emptive customer success on every job; review-mining process; root-cause every snag |

---

## 13. Rollout plan

### Phase 0 — Validate (Weeks 0–6)
- CERTASS + HomePro written confirmation of model
- Sign 1 manufacturer + 1 installer to draft panel agreements
- Sketch configurator wireframes
- Define MVP scope for pilot

### Phase 1 — MVP (Weeks 6–16)
- Manual quote flow through Typeform / spreadsheet engine + bookkeeper
- Stripe + Shieldpay/Transpact escrow integration
- Branded customer journey (quote PDFs, T&Cs, snagging form)
- **Run 10 pilot jobs end-to-end** — every one debriefed; rebuild playbook after each

### Phase 2 — Scale (Months 4–9)
- Onboard 4 manufacturers + 6 installers
- Public configurator with instant indicative pricing
- B2C launch with paid acquisition (Google + Meta)
- HubSpot CRM, automated comms

### Phase 3 — Trade (Months 9–18)
- Architect / contractor portal with credit accounts
- Schedules-of-rates pricing for repeat buyers
- Lightweight ERP integration for suppliers
- Expand service area

---

## 14. Recommended tech stack

| Layer | Pick | Why |
|---|---|---|
| Front-end | Next.js | SEO + configurator + marketing site in one stack |
| Back-end | Node + Postgres (Supabase / Render) | Fast to ship, cheap to run |
| Auth | Clerk / Supabase Auth | Role-scoped portals out of the box |
| Payments | Stripe | UK-friendly, supports stage payments and SCA |
| Escrow | Shieldpay or Transpact | UK-regulated third-party client money |
| Finance referral | Kandoo / V12 | Home-improvement specialists |
| CRM | HubSpot starter | Free tier, automation, email, pipeline |
| E-sign | Dropbox Sign / DocuSign | T&Cs, panel agreements, quote acceptance |
| Docs / drawings | Google Drive (Phase 1) → custom (Phase 2) | One folder per job, shared with installer |
| Analytics | PostHog | KPI funnel + product analytics in one |

---

## 15. Decisions needed before any build starts

- [ ] CERTASS confirms lead-contractor + sub-contractor structure
- [ ] HomePro confirms IBG entity rules
- [ ] Construction-sector solicitor briefed; first drafts of panel agreements + T&Cs in flight
- [ ] First manufacturer signed (preferred: 1 Polish PVC + 1 UK steel) — even with manual ordering
- [ ] First installer signed
- [ ] Service area and price tiers locked for Phase 1
- [ ] Brand decision: keep "AtoZ Design and Glass" or sub-brand the marketplace ("AtoZ Marketplace" / similar)
- [ ] Pilot budget agreed (suggest £15–30k for Phase 0+1: legal + dev + escrow setup + pilot marketing)

---

## 16. What "good" looks like at month 12

- 60+ completed jobs across 5+ manufacturers and 6+ installers
- Blended gross margin ≥ 20%
- Snag rate < 8% of jobs, all closed within SLA
- ≥ 4.7★ Trustpilot, sustained
- 1 architect or developer trade account live with repeat orders
- Configurator producing ≥ 50% of inbound quotes (rest still manual / phone)
- A defensible operations playbook that lets a third hire run a job end-to-end without the founder

---

*This document supersedes prior business-model notes on this branch. Pair it with the panel-agreement drafts and the pricing-engine specification (to follow).*
