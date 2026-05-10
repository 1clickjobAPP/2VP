import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, findArea, getNeighbours } from "@/data/areas";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import { CTAButtons } from "@/components/CTAButtons";
import { AreaFAQ, buildAreaFAQ } from "@/components/AreaFAQ";
import { PriceBands } from "@/components/PriceBands";
import { LeadForm } from "@/components/LeadForm";
import { buildServicesLd, getAreaPricing } from "@/lib/pricing";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = findArea(params.slug);
  if (!area) return {};
  const title = `Builders in ${area.name} | Extensions, Lofts & Refurbishments | ${site.name}`;
  const description = `2VP delivers extensions, loft conversions, full refurbishments and kitchen & bathroom installations across ${area.name} (${area.postcodes}). Get an instant estimate with our free online calculator.`;
  const url = `${site.url}/areas/${area.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = findArea(params.slug);
  if (!area) notFound();

  const neighbours = getNeighbours(area.slug);
  const faqs = buildAreaFAQ(area);
  const pricing = getAreaPricing(area.slug);
  const url = `${site.url}/areas/${area.slug}`;

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${url}#business`,
    name: `${site.legalName} — ${area.name}`,
    url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/og.jpg`,
    priceRange: "££–£££",
    areaServed: {
      "@type": "Place",
      name: `${area.name}, London`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: "London",
      addressCountry: "GB",
      postalCode: area.postcodes.split(",")[0].trim(),
    },
    serviceType: services.map((s) => s.title),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Areas", item: `${site.url}/areas` },
      { "@type": "ListItem", position: 3, name: area.name, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const servicesLd = buildServicesLd(area);

  return (
    <article>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-[#072c46] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-sm uppercase tracking-widest text-brand-accent">
            Builders in {area.name}
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
            Extensions, loft conversions & refurbishments in {area.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            2VP is a London construction company delivering extensions, loft conversions, full
            home refurbishments and kitchen & bathroom installations across {area.name} (
            {area.postcodes}). Use the free calculator for an instant estimate, or book a
            survey at a time that suits you.
          </p>
          <div className="mt-6">
            <CTAButtons area={area} />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Speak to a project manager:{" "}
            <a href={site.phoneHref} className="font-semibold underline">
              {site.phone}
            </a>
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Construction specialists for {area.name} homes
        </h2>
        <p className="mt-3 text-slate-700 leading-relaxed">
          {area.character} Whether you’re unlocking a side return, converting a loft into a
          principal suite, or pulling a tired terrace back to first principles, our team
          delivers structural, M&amp;E, joinery and decoration trades under one programme — so
          you have one fixed price, one weekly progress report and one point of contact for
          your {area.name} project.
        </p>
        <p className="mt-3 text-slate-700 leading-relaxed">
          {area.planning} We handle the planning drawings, building control submissions and
          Party Wall awards in-house, so you can focus on the design choices that matter.
        </p>
      </section>

      {/* Services */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-900">
            What we build in {area.name}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.slug}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-brand">{s.title}</h3>
                <p className="mt-2 text-slate-700">{s.short}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-brand-accent">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-area price bands */}
      <PriceBands area={area} />

      {/* Why 2VP */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Why homeowners in {area.name} choose 2VP
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Fixed-price programme",
              d: "One detailed quote covering design, planning, structural, build, M&E and finish. No mid-job surprises.",
            },
            {
              t: "London-tuned planning",
              d: `We work with ${area.name} planners every week — pre-app advice, conservation-area design, Party Wall and Building Control all handled in-house.`,
            },
            {
              t: "Single point of contact",
              d: "A dedicated project manager runs your job from survey to snagging, with weekly written progress reports.",
            },
            {
              t: "Quality finishes",
              d: "Joinery, tiling and decoration delivered by trades who work with us full-time — not changing crews mid-project.",
            },
            {
              t: "Insured & compliant",
              d: "Full public liability, employer’s liability and contract works cover. CDM 2015 duties met on every project.",
            },
            {
              t: "12-month aftercare",
              d: "Snagging visits, defect resolution and a written 12-month workmanship warranty on every completed scheme.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-lg border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">{x.t}</p>
              <p className="mt-1 text-sm text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator nudge */}
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Calculator tuned for {area.name}
            </h2>
            <p className="mt-3 text-white/85">
              Click through and the calculator opens pre-set to {area.name} ({pricing.tier}
              -tier London pricing). Get a per-square-metre estimate in under a minute, no
              contact details needed up-front.
            </p>
          </div>
          <div className="md:text-right">
            <CTAButtons area={area} />
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="mx-auto max-w-3xl px-4 py-12" id="enquire">
        <LeadForm area={area} />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions — {area.name}
        </h2>
        <div className="mt-6">
          <AreaFAQ items={faqs} />
        </div>
      </section>

      {/* Neighbours */}
      {neighbours.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <h2 className="text-xl font-semibold text-slate-900">
            We also build near {area.name}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {neighbours.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/areas/${n.slug}`}
                  className="inline-block rounded-full border border-slate-300 px-4 py-1.5 text-sm text-slate-700 hover:border-brand hover:text-brand"
                >
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Ready to start your {area.name} project?
          </h2>
          <p className="mt-2 text-slate-700">
            Get a free estimate, or book a no-obligation survey with one of our project
            managers.
          </p>
          <div className="mt-5 flex justify-center">
            <CTAButtons area={area} />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Or call us directly:{" "}
            <a href={site.phoneHref} className="font-semibold text-brand">
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={site.emailHref} className="font-semibold text-brand">
              {site.email}
            </a>
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />
    </article>
  );
}
