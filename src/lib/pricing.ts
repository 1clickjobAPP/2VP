import { areas, type Area } from "@/data/areas";
import { site } from "@/lib/site";

export type Tier = "prime" | "inner" | "outer";

const PRIME_SLUGS = new Set<string>([
  // Boroughs that price as prime
  "city-of-london",
  "westminster",
  "kensington-and-chelsea",
  "camden",
  // Prime areas
  "mayfair",
  "belgravia",
  "knightsbridge",
  "chelsea",
  "kensington",
  "holland-park",
  "notting-hill",
  "marylebone",
  "soho",
  "fitzrovia",
  "hampstead",
  "highgate",
  "primrose-hill",
  "st-johns-wood",
]);

const INNER_SLUGS = new Set<string>([
  // Boroughs
  "islington",
  "hackney",
  "tower-hamlets",
  "southwark",
  "lambeth",
  "wandsworth",
  "hammersmith-and-fulham",
  // Prime / high-intent inner
  "shoreditch",
  "angel",
  "stoke-newington",
  "wapping",
  "canary-wharf",
  "battersea",
  "clapham",
  "fulham",
  "putney",
  "dulwich",
  "blackheath",
]);

export function getTier(slug: string): Tier {
  if (PRIME_SLUGS.has(slug)) return "prime";
  if (INNER_SLUGS.has(slug)) return "inner";
  return "outer";
}

export interface PriceBand {
  low: number;
  high: number;
}

export interface AreaPricing {
  tier: Tier;
  extensions: PriceBand;
  lofts: PriceBand;
  refurbishments: PriceBand;
  kitchensBathrooms: PriceBand;
}

const BAND_BY_TIER: Record<Tier, Omit<AreaPricing, "tier">> = {
  prime: {
    extensions: { low: 4200, high: 6500 },
    lofts: { low: 2800, high: 4200 },
    refurbishments: { low: 2600, high: 4200 },
    kitchensBathrooms: { low: 2200, high: 4000 },
  },
  inner: {
    extensions: { low: 3200, high: 4800 },
    lofts: { low: 2200, high: 3400 },
    refurbishments: { low: 2000, high: 3200 },
    kitchensBathrooms: { low: 1800, high: 3200 },
  },
  outer: {
    extensions: { low: 2600, high: 3800 },
    lofts: { low: 1800, high: 2800 },
    refurbishments: { low: 1500, high: 2400 },
    kitchensBathrooms: { low: 1400, high: 2600 },
  },
};

export function getAreaPricing(slug: string): AreaPricing {
  const tier = getTier(slug);
  return { tier, ...BAND_BY_TIER[tier] };
}

export function formatBand(b: PriceBand): string {
  const fmt = (n: number) => `£${n.toLocaleString("en-GB")}`;
  return `${fmt(b.low)}–${fmt(b.high)}/m²`;
}

export function buildCalculatorUrl(area?: Area): string {
  if (!area) return site.calculatorUrl;
  const tier = getTier(area.slug);
  const firstPostcode = area.postcodes.split(",")[0].trim();
  const params = new URLSearchParams({
    area: area.slug,
    tier,
    postcode: firstPostcode,
  });
  return `${site.calculatorUrl}?${params.toString()}`;
}

export function buildBookingUrl(area?: Area): string {
  if (!area) return site.bookingUrl;
  const params = new URLSearchParams({ area: area.slug });
  return `${site.bookingUrl}?${params.toString()}`;
}

// Sanity check helper used from tests / scripts.
export function tierCounts() {
  const counts: Record<Tier, number> = { prime: 0, inner: 0, outer: 0 };
  for (const a of areas) counts[getTier(a.slug)]++;
  return counts;
}
