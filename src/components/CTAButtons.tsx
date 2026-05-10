import Link from "next/link";
import { site } from "@/lib/site";

export function CTAButtons({ context }: { context?: string }) {
  const calcLabel = context
    ? `Get a free estimate for ${context}`
    : "Try the free calculator";
  const bookLabel = context ? `Book a survey in ${context}` : "Book a survey";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href={site.calculatorUrl}
        className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-white font-semibold shadow-sm hover:bg-brand/90 transition"
      >
        {calcLabel}
      </Link>
      <Link
        href={site.bookingUrl}
        className="inline-flex items-center justify-center rounded-md border border-brand px-5 py-3 text-brand font-semibold hover:bg-brand hover:text-white transition"
      >
        {bookLabel}
      </Link>
    </div>
  );
}
