import Link from "next/link";
import type { Area } from "@/data/areas";
import { buildBookingUrl, buildCalculatorUrl } from "@/lib/pricing";

export function CTAButtons({ area }: { area?: Area }) {
  const calcLabel = area ? `Get a free estimate for ${area.name}` : "Try the free calculator";
  const bookLabel = area ? `Book a survey in ${area.name}` : "Book a survey";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href={buildCalculatorUrl(area)}
        className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-white font-semibold shadow-sm hover:bg-brand/90 transition"
      >
        {calcLabel}
      </Link>
      <Link
        href={buildBookingUrl(area)}
        className="inline-flex items-center justify-center rounded-md border border-brand px-5 py-3 text-brand font-semibold hover:bg-brand hover:text-white transition"
      >
        {bookLabel}
      </Link>
    </div>
  );
}
