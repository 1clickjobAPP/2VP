import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand">
          {site.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/areas" className="text-slate-700 hover:text-brand">
            Areas we cover
          </Link>
          <Link href={site.calculatorUrl} className="text-slate-700 hover:text-brand">
            Calculator
          </Link>
          <Link href={site.bookingUrl} className="text-slate-700 hover:text-brand">
            Book a survey
          </Link>
          <a href={site.phoneHref} className="font-semibold text-brand">
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
