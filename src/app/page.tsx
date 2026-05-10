import Link from "next/link";
import { CTAButtons } from "@/components/CTAButtons";
import { areas } from "@/data/areas";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand to-[#072c46] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm uppercase tracking-widest text-brand-accent">
            London builders
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Extensions, loft conversions and refurbishments across all of London
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{site.description}</p>
          <div className="mt-6">
            <CTAButtons />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Or call us:{" "}
            <a href={site.phoneHref} className="font-semibold underline">
              {site.phone}
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">What we build</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.slug} className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-brand">{s.title}</h3>
              <p className="mt-2 text-slate-700">{s.short}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-2xl font-bold text-slate-900">Areas we cover</h2>
            <Link href="/areas" className="text-sm font-semibold text-brand hover:underline">
              See all {areas.length} →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
            {areas.slice(0, 24).map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="text-slate-700 hover:text-brand">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Try the free 2VP calculator
        </h2>
        <p className="mt-2 text-slate-700 max-w-2xl mx-auto">
          Get an instant per-square-metre estimate for your London project — no contact
          details required up front.
        </p>
        <div className="mt-5 flex justify-center">
          <CTAButtons />
        </div>
      </section>
    </>
  );
}
