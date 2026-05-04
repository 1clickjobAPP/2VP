# AtoZ Marketplace — Operating Model

> Operational design for the migration. Three pillars:
>
> 1. **Service continuity** — AtoZ stays the same helpful, accountable company customers already trust.
> 2. **AI agent stack** — Claude-powered agents automate operations and customer service end-to-end, with humans in the loop for anything financial or contentious.
> 3. **Panel payment system** — clean, auditable money flows in both directions: customer pays AtoZ; suppliers and installers also pay AtoZ for platform access and services.

---

## 1. Operating principles

1. **Customer experience must not degrade during migration.** Same brand, same phone number, same response SLAs.
2. **The founder must be removable from the loop** for any standard job step. AI agents handle the routine; humans handle escalations and BD.
3. **Every penny is auditable.** Customer money flows through escrow; panel-member fees flow through a regulated billing provider. Nothing in personal accounts.
4. **Panel members pay to be on the platform** — listing fees, per-job platform fees, certification umbrella levy. The customer-side mark-up is *not* the only revenue line.

---

## 2. Service continuity — staying "the same helpful company"

What customers experience today must remain or improve. Concretely:

| Touchpoint | Today | Marketplace target | How it's delivered |
|---|---|---|---|
| First reply to enquiry | Same day | **Under 5 minutes, 24/7** | Quote agent (AI) drafts initial response; human reviews if complex |
| Quote turnaround | 2–5 days | **Indicative under 1 hour, firm within 5 days of survey** | Configurator + pricing engine + survey scheduling agent |
| Single point of contact | Founder / sales | **Named customer-success owner per job** | Visible in portal, takes over from Day 1 |
| Status updates | On request | **Proactive at every stage change** | Status agent pushes email + SMS automatically |
| Snagging response | 1–3 days | **Under 48 hours on site** | Snag agent triages photos; auto-books panel installer |
| Aftercare | Phone | **Portal + agent + named human escalation** | Aftercare agent answers L1; human takes over on warranty claims |
| Founder access for premium / B2B | Direct | **Direct, unchanged** | Founder time freed up by automation, not removed from key accounts |

**The brand promise stays:** quality bespoke product, real installers (CERTASS-registered), insurance-backed guarantee, one company accountable. Behind the curtain it's a panel; in front of the curtain it's still AtoZ.

---

## 3. AI agent stack

Every agent is a Claude-powered service with a defined system prompt, a scoped toolset, and human-in-the-loop checkpoints for anything that moves money or affects compliance.

### 3.1 Customer-facing agents

| Agent | Job | Tools / data access | Handoff to human |
|---|---|---|---|
| **Quote Agent** | Converts free-text enquiries ("I need a 3m bifold for a side return in SW6") into structured configurator inputs; returns indicative price | Configurator API, supplier price tables, postcode service-area check | Anything outside service area, > £40k AOV, B2B, or specs not in catalogue |
| **Survey Booking Agent** | Books surveyors against availability, sends confirmations, handles reschedules | Calendar API, surveyor roster, customer record | If customer asks for specific surveyor or has access constraints |
| **Status Agent** | Proactively pushes job-stage updates by email + SMS ("your frames cleared customs", "delivery confirmed Tuesday 9–11am") | PO system, shipping API, install calendar | Never — this one is fully automated |
| **Snagging Triage Agent** | Receives customer photos/text reports of defects, classifies severity (cosmetic / functional / urgent), routes to installer or escalates | Photo intake, job record, installer roster | Any structural / safety issue, or anything the installer disputes |
| **Aftercare Agent** | Answers warranty / IBG questions, condensation queries, care advice | Knowledge base, IBG documents, job history | Any actual claim or alleged defect |

### 3.2 Operations / panel-facing agents

| Agent | Job | Tools / data access | Handoff |
|---|---|---|---|
| **PO Routing Agent** | Given a confirmed firm quote, selects the right manufacturer (tier, lead time, region) and the right installer (postcode, skill, capacity) | Panel database, lead-time tables, calendar | First 50 jobs all reviewed by ops; then exception-based |
| **Onboarding Agent** | Walks new suppliers/installers through KYB/KYC, document collection, agreement e-sign, DD mandate | DocuSign, Companies House API, GoCardless, KYB provider | Final approval signed off by founder/ops |
| **Compliance Agent** | Checks each completed job has CERTASS-required documentation, photos, U-value evidence; flags missing items | Document service, job record | Always raises tickets to ops, never closes alone |
| **Reconciliation Agent** | Matches escrow releases to POs, flags anomalies, generates VAT-ready exports for the bookkeeper | Stripe Connect, escrow API, accounting export | Bookkeeper signs off weekly |
| **Dispute Mediation Agent** | First-line response on customer/installer disputes; collects facts, drafts resolution proposals (refund, remake, partial credit) | Job record, payment history, snag log | Every dispute gets human approval before money moves |

### 3.3 Architecture pattern

```
                    ┌─────────────────────┐
                    │  Customer / Panel   │
                    │   (web, email, SMS) │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Agent Gateway     │   ← logging, auth, rate limit
                    └──────────┬──────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                       │
┌──────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐
│ Customer    │         │ Operations  │         │ Compliance  │
│ Agents      │         │ Agents      │         │ Agents      │
└──────┬──────┘         └──────┬──────┘         └──────┬──────┘
       │                       │                       │
       └──────────┬────────────┴────────────┬──────────┘
                  │                         │
       ┌──────────▼──────────┐    ┌─────────▼──────────┐
       │  Tools / APIs       │    │  Human-in-the-loop │
       │  (Stripe, escrow,   │    │  (ops, founder,    │
       │   calendar, docs)   │    │   bookkeeper)      │
       └─────────────────────┘    └────────────────────┘
                  │
       ┌──────────▼──────────┐
       │  Audit log          │   ← every agent action recorded
       └─────────────────────┘
```

### 3.4 Build approach

- **Anthropic SDK / Claude API** for all agents. Use prompt caching aggressively on the system prompt + product knowledge base (cuts cost ~80% on repeat calls).
- **One repo per agent** with shared tool definitions; agents call each other via internal HTTP, not by re-prompting.
- **Tool use** for everything that touches a database or third-party API — agents never free-text data into systems.
- **Audit log** every agent decision and tool call so disputes can be reconstructed.
- **Phase 1:** ship Quote, Status, and Snagging agents only. Add the rest in Phase 2 once 50+ jobs are through.

---

## 4. Money flow — the master picture

```
                                                                         
   CUSTOMER          ESCROW              MANUFACTURER  INSTALLER   ATOZ  
                  (Shieldpay /                                            
                   Transpact)                                             
                                                                         
   pays 30% ──────►│ holds   │                                            
   (order)         │ £4,500  │                                            
                   │         │                                            
                   │         │── on dispatch ────►│ £6,500 │              
                                                                          
   pays 60% ──────►│ holds   │                                            
   (delivery)      │ £9,000  │                                            
                   │         │── balance & install start ─►│ £2,200 │     
                                                                         
   pays 10% ──────►│ holds   │                                            
   (post-snag)     │ £1,500  │── installer payout (sign-off) ───►installer
                   │         │── AtoZ margin (sign-off) ─────────►│ AtoZ │
                                                                         
                                                                         
                   ┌─────────────────────────────────────┐               
                   │ Separate, recurring:                 │               
                   │ Suppliers & installers DD payments  │──────────►ATOZ 
                   │ to AtoZ for platform fees           │               
                   └─────────────────────────────────────┘               
```

Two distinct money systems running in parallel:

1. **Job-level escrow flow** — customer money in, panel paid out, AtoZ margin retained.
2. **Panel subscription flow** — suppliers and installers pay AtoZ recurring fees for platform access (next sections).

---

## 5. How **suppliers** pay AtoZ

Suppliers are panel manufacturers (PVC / aluminium / steel / timber). They benefit from AtoZ-driven UK demand without sales overhead. They pay AtoZ in three ways:

### 5.1 Fee schedule

| Fee | Amount | When charged | How collected |
|---|---|---|---|
| Onboarding fee | £500 one-off | At panel agreement signing | Direct invoice + bank transfer |
| Platform subscription | **£400/month** OR **0.5% of monthly order value, whichever is higher** | Monthly | GoCardless Direct Debit |
| Per-PO platform fee | £25 per purchase order | Auto-deducted at payout | Netted from escrow disbursement |
| Preferred placement (optional) | £750/month | Monthly | Direct Debit |
| Co-op marketing (optional) | 1% of monthly order value | Monthly | Direct Debit |

> **Note on the implicit margin**: AtoZ already retains the trade-vs-retail mark-up on every order. The fees above are *additional* — they cover platform access, integration, and discoverability. Early adopters can negotiate the subscription waived for the first 3 months in exchange for committed volume.

### 5.2 What the supplier gets for it

- Listing in AtoZ configurator across relevant tiers and product lines
- Order routing from AtoZ's customer base
- AtoZ handles UK customer service, snagging, after-sales
- Logistics support (consolidated shipments, customs handling for Polish/EU)
- Quarterly business review with founder

### 5.3 Onboarding flow (Onboarding Agent)

1. Inbound interest → KYB run via Companies House + Sanctions check
2. Sample products requested + assessed
3. Trade price list collected; loaded into pricing engine
4. Panel agreement e-signed via Dropbox Sign / DocuSign
5. **GoCardless DD mandate signed** at the same time as the agreement
6. First PO test-run end-to-end before "live" status granted
7. Founder final-approval before activation

---

## 6. How **installers** pay AtoZ

Installers benefit from steady pre-qualified jobs, no marketing cost, and the protection of AtoZ's customer-success function. They pay AtoZ in four ways:

### 6.1 Fee schedule

| Fee | Amount | When charged | How collected |
|---|---|---|---|
| Vetting / onboarding | £200 one-off | At panel agreement signing | Bank transfer at signing |
| Panel membership | £150/month standard tier; £350/month priority tier | Monthly | GoCardless Direct Debit |
| Per-job referral fee | **12% of installer's day-rate cost on that job** | Auto-deducted at payout | Netted from escrow disbursement |
| CERTASS / IBG umbrella levy | £40 per certificate issued | Per job | Netted from escrow disbursement |
| Compliance / audit | £150/year | Annual | Direct Debit |

### 6.2 What the installer gets for it

- Pre-qualified, pre-quoted, deposited jobs delivered to their calendar
- AtoZ handles customer disputes, snagging admin, payment chasing
- Use of AtoZ's CERTASS umbrella + HomePro IBG (subject to compliance)
- Job-management portal (calendar, snags, sign-off, payment timeline)
- Priority-tier members get first refusal on new jobs in their area

### 6.3 Onboarding flow (Onboarding Agent)

1. Application via installer-onboarding form
2. Document collection: insurance certificate, CERTASS/FENSA reg, two reference jobs, ID
3. **DBS check + Companies House run**
4. References called by ops (human, not agent)
5. Trial job (AtoZ founder or ops attends to inspect)
6. Panel agreement + DD mandate e-signed at the same time
7. Activation in PO Routing Agent

---

## 7. Tooling for panel billing

| Need | Tool | Why |
|---|---|---|
| Customer card payments | Stripe (UK) | Standard, SCA-compliant, supports stage payments |
| Customer money escrow | Shieldpay or Transpact | UK-regulated; can hold and release on triggers |
| Split payouts to panel | Stripe Connect | Programmatic split-disbursement to suppliers + installers |
| Recurring panel subscriptions | GoCardless | Direct Debit is right tool for B2B subs in UK; lower fees than card |
| KYB / KYC | Onfido or Veriff | Verifies installers (individuals) and suppliers (companies) |
| E-signatures | Dropbox Sign or DocuSign | Panel agreements + DD mandates in one envelope |
| Accounting | Xero | DD imports, Stripe imports, VAT returns |
| Billing logic | Built in-house in pricing engine | Calculates net payout per job after fees |

**Critical:** every panel agreement is signed simultaneously with its Direct Debit mandate. **No DD mandate, no panel activation.** This eliminates the chasing problem.

---

## 8. Per-job money calculation example

A £12,000 firm quote on a 3-pane bifold:

| Line | £ |
|---|---|
| Customer pays into escrow | 12,000.00 |
| Manufacturer cost (trade price) | 6,500.00 |
| Manufacturer per-PO fee deducted | -25.00 |
| **Manufacturer payout** | **6,475.00** |
| Installer day rate (3 days × 2 fitters) | 2,200.00 |
| Per-job referral fee (12% of installer cost) | -264.00 |
| CERTASS umbrella levy | -40.00 |
| **Installer payout** | **1,896.00** |
| AtoZ retained margin | 12,000 − 6,500 − 2,200 − 200 (delivery/admin) | = **3,100.00** |
| AtoZ also collects (this job) | per-PO £25 + referral £264 + cert £40 | = **329.00** |
| **AtoZ total per-job income** | | **3,429.00 (28.6%)** |

Plus monthly subscriptions from suppliers and installers, which scale with panel size, not with job count — that's recurring revenue independent of the project pipeline.

### 8.1 Recurring subscription revenue at scale

| Panel size (Y2) | Monthly | Annual |
|---|---|---|
| 6 suppliers × £400 | £2,400 | £28,800 |
| 8 installers × £150 (standard) | £1,200 | £14,400 |
| 4 installers × £350 (priority) | £1,400 | £16,800 |
| **Total recurring** | **£5,000** | **£60,000** |

Modest, but it's pure margin — the platform earns ~£60k/year from panel fees regardless of how many customer orders complete.

---

## 9. Migration mapping — what becomes what

| Current AtoZ asset | Becomes (in marketplace) |
|---|---|
| In-house fitter team | **Lead panel installer** — first installer signed, anchor for the panel, gets priority tier free for first 12 months |
| Surveyor | **First panel surveyor** — paid per visit instead of salaried |
| Existing supplier relationships | **First 2–3 manufacturers signed** — preferred-tier rates negotiated |
| Showroom at Dawes Road | Stays — used for samples, customer meetings, B2B specifying |
| Phone number / email | Stays — answered by Quote Agent first-line, ops second-line |
| Trustpilot reviews | Stays — same legal entity, no review reset |
| CERTASS membership | Becomes umbrella under which panel installers operate (subject to CERTASS sanction — see `MARKETPLACE_SOLUTION.md` §8) |
| HomePro IBG | Same — confirm marketplace structure with HomePro |
| Founder time | Reallocated from site days → BD, panel relationships, premium B2B |

This is the bridge that means **revenue never dips during migration**: every existing relationship is reused, just under new contractual structure.

---

## 10. Agent rollout sequence

| Phase | Months | Agents shipped | Manual fallback |
|---|---|---|---|
| 0 | 0–3 | None — manual ops | Founder + 1 ops person |
| 1 | 3–9 | Quote Agent, Status Agent | Ops handles snags, routing |
| 2 | 9–15 | Snagging Triage, PO Routing, Survey Booking | Ops handles disputes, compliance |
| 3 | 15–24 | Onboarding, Compliance, Reconciliation, Dispute Mediation | Ops handles only escalations |

> Don't build the agents until you've run the first 30 jobs *manually*. You can't write good system prompts for processes you haven't lived through.

---

## 11. Decisions needed before build

- [ ] Pick escrow provider (Shieldpay vs Transpact) — pricing, API maturity, customer-trust messaging
- [ ] Confirm Stripe Connect supports the split-payout flows we need (it does, but confirm UK platform fee model)
- [ ] Confirm GoCardless tier (Standard sufficient until panel > 30)
- [ ] Decide priority-tier installer fee (£250 / £350 / £450 per month)
- [ ] Decide whether early-stage suppliers get subscription waived (recommended: yes, first 3 months)
- [ ] Confirm CERTASS / HomePro position on the umbrella structure (still the #1 gating call)
- [ ] Pick KYB / KYC provider (Onfido is good default for UK)
- [ ] Confirm legal entity that signs the panel agreements (existing AtoZ Ltd vs new platform Ltd)

---

## 12. Summary

The migration delivers **the same AtoZ customer experience or better**, run by **AI agents handling the routine** with humans in the loop for compliance, disputes, and BD. Money flows in two directions through clean, auditable systems:

- **Customers pay AtoZ** through escrow, with stage releases to panel members.
- **Suppliers and installers pay AtoZ** through Direct Debit (subscriptions) and netted deductions (per-job fees).

The platform earns margin on every job *and* recurring subscription revenue from the panel — two stacking income streams that the current vertically-integrated model doesn't have at all.
