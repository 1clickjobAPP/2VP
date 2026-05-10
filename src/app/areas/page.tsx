import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/data/areas";
import { site } from "@/lib/site";
import { CTAButtons } from "@/components/CTAButtons";

export const metadata: Metadata = {
  title: `Areas we cover in London | ${site.name}`,
  description: `2VP delivers extensions, loft conversions, refurbishments and kitchen & bathroom installations across all 33 London boroughs and ${areas.filter((a) => a.type === "prime").length} prime areas.`,
  alternates: { canonical: "/areas" },
};

export default function AreasIndex() {
  const boroughs = areas.filter((a) => a.type === "borough");
  const prime = areas.filter((a) => a.type === "prime");

  return (
    <>
      <section className="bg-gradient-to-br from-brand to-[#072c46] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl md:text-5xl font-bold">Areas we cover</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            All 33 London boroughs and {prime.length} prime areas — {areas.length} dedicated
            local pages with planning notes, services and an instant cost estimate.
          </p>
          <div className="mt-6">
            <CTAButtons />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">London boroughs</h2>
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
          {boroughs.map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}`} className="text-slate-700 hover:text-brand">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-900">Prime areas</h2>
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
          {prime.map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}`} className="text-slate-700 hover:text-brand">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
