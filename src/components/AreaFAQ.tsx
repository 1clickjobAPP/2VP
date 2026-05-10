import type { Area } from "@/data/areas";

export interface FAQItem {
  q: string;
  a: string;
}

export function buildAreaFAQ(area: Area): FAQItem[] {
  return [
    {
      q: `Do you cover the whole of ${area.name}?`,
      a: `Yes — 2VP covers every street and postcode across ${area.name} (${area.postcodes}). Our surveyors are on-site within a few working days of your enquiry.`,
    },
    {
      q: `How much does an extension or loft conversion cost in ${area.name}?`,
      a: `Costs vary with size, spec and structural complexity. The fastest way to a realistic figure is our free online calculator, which gives an instant per-square-metre range tuned for ${area.name}.`,
    },
    {
      q: `Will I need planning permission in ${area.name}?`,
      a: `${area.planning} We complete the planning and building-control work for you and engage the local authority directly.`,
    },
    {
      q: `How long does a project in ${area.name} typically take?`,
      a: `A single-storey rear extension usually runs 10–14 weeks on site, a loft conversion 8–12 weeks, and a full-house refurbishment 16–28 weeks depending on scope. Pre-construction (design, planning, party-wall) typically adds 8–16 weeks.`,
    },
    {
      q: `Are you insured and accredited?`,
      a: `Yes. 2VP carries full public liability, employer’s liability and contract works insurance, and we work to current Building Regulations, Party Wall etc. Act 1996 procedure and CDM 2015 health-and-safety duties on every project.`,
    },
  ];
}

export function AreaFAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5 open:bg-slate-50">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900">
            {item.q}
            <span className="text-brand transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-slate-700 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
