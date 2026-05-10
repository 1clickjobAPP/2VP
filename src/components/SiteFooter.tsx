import Link from "next/link";
import { site } from "@/lib/site";
import { areas } from "@/data/areas";

export function SiteFooter() {
  const boroughs = areas.filter((a) => a.type === "borough");
  const prime = areas.filter((a) => a.type === "prime");

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-brand">{site.legalName}</p>
          <p className="mt-2 text-sm text-slate-600 max-w-xs">{site.description}</p>
          <div className="mt-4 text-sm">
            <a href={site.phoneHref} className="block font-semibold text-brand">
              {site.phone}
            </a>
            <a href={site.emailHref} className="block text-slate-700 hover:text-brand">
              {site.email}
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">London Boroughs</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600">
            {boroughs.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-brand">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Prime areas</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600">
            {prime.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-brand">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.legalName}. Serving {site.region}.
      </div>
    </footer>
  );
}
