import Link from "next/link";
import type { Area } from "@/data/areas";
import { buildCalculatorUrl, formatBand, getAreaPricing } from "@/lib/pricing";

const TIER_LABEL: Record<string, string> = {
  prime: "Prime central London",
  inner: "Inner London",
  outer: "Outer London",
};

export function PriceBands({ area }: { area: Area }) {
  const pricing = getAreaPricing(area.slug);
  const calcUrl = buildCalculatorUrl(area);

  const rows: Array<{ label: string; band: string; note: string }> = [
    {
      label: "House extensions",
      band: formatBand(pricing.extensions),
      note: "Single-storey rear, side-return and wrap-around. Steel, glazing and finishes included.",
    },
    {
      label: "Loft conversions",
      band: formatBand(pricing.lofts),
      note: "Dormer, mansard, hip-to-gable or Velux. Includes bedroom + en-suite finish.",
    },
    {
      label: "Full refurbishments",
      band: formatBand(pricing.refurbishments),
      note: "Whole-house strip-out, M&E, plastering, joinery and decoration.",
    },
    {
      label: "Kitchens & bathrooms",
      band: formatBand(pricing.kitchensBathrooms),
      note: "Bespoke fit-out including tiling, stone, joinery and lighting.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Indicative {area.name} build costs
          </h2>
          <p className="mt-2 max-w-2xl text-slate-700">
            Pricing in {area.name} sits in the{" "}
            <strong>{TIER_LABEL[pricing.tier]}</strong> band. The figures below are typical
            per-square-metre ranges for a quality 2VP build in this area — your tuned
            calculator estimate will sharpen these numbers for your specific scope.
          </p>
        </div>
        <Link
          href={calcUrl}
          className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-white font-semibold shadow-sm hover:bg-brand/90 transition"
        >
          Tune my estimate for {area.name}
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-semibold px-4 py-3 w-1/3">Service</th>
              <th className="text-left font-semibold px-4 py-3 w-1/4">
                Typical range ({area.name})
              </th>
              <th className="text-left font-semibold px-4 py-3">What it includes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="px-4 py-3 font-medium text-slate-900">{r.label}</td>
                <td className="px-4 py-3 font-semibold text-brand whitespace-nowrap">
                  {r.band}
                </td>
                <td className="px-4 py-3 text-slate-600">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Indicative ranges only. Final pricing depends on size, structural complexity,
        specification and access. Use the calculator for a project-specific figure tuned to{" "}
        {area.name}.
      </p>
    </section>
  );
}
