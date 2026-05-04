# AtoZ Marketplace — Code & Architecture Design

> Extracted from `MARKETPLACE_SOLUTION.md` (sections 5 and 14). Use this as the engineering brief for the platform build.

---

## 1. Platform architecture (functional view)

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

## 2. Recommended tech stack

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

## 3. Pricing engine — formula reference

```
indicative_price = supplier_price × (1 + supplier_markup)
                 + installer_day_rate × days × (1 + installer_markup)
                 + survey_fee
                 + extras (glass upgrades, trims, scaffolding, etc.)

firm_price       = indicative_price recalculated against on-site survey measurements,
                   bound by ±5% tolerance clause in T&Cs

blended_take ≈ 20–25%  (supplier mark-up + installer mark-up + finance referral
                        + extended warranty + panel fees)
```

### Stage-payment schedule (driven by escrow integration)

| Stage | % of total | Trigger | Released to |
|---|---|---|---|
| 1 — Order | 30% | Customer signs firm quote | Held in escrow; manufacturer paid on dispatch |
| 2 — Delivery | 60% | Frames delivered to site, signed for | Held in escrow; balance to manufacturer; install scheduled |
| 3 — Retention | 10% | Install + 14-day snagging window cleared | Installer paid; AtoZ keeps margin |

Deemed acceptance: if no faults raised in writing within 14 days of installation, payment auto-releases.

---

*See `business-plan.md` for the full operating model, compliance requirements, and rollout plan.*
