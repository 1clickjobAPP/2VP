export interface Service {
  slug: string;
  title: string;
  short: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: "extensions",
    title: "House Extensions",
    short:
      "Single and double-storey rear, side-return and wrap-around extensions — built to add square metres without losing light.",
    bullets: [
      "Rear, side-return and wrap-around builds",
      "Steel design, glazing and structural openings",
      "Permitted development and householder applications",
      "Party Wall awards handled in-house",
    ],
  },
  {
    slug: "loft-conversions",
    title: "Loft Conversions",
    short:
      "Dormer, mansard, hip-to-gable and Velux conversions to add a bedroom suite or home office above your existing roofline.",
    bullets: [
      "Dormer, mansard, hip-to-gable, L-shape and Velux",
      "Building Regulations and structural calculations",
      "En-suite bathrooms, dressing rooms and stair design",
      "Insulation, fire strategy and acoustic detailing",
    ],
  },
  {
    slug: "refurbishments",
    title: "Full Refurbishments",
    short:
      "Whole-house renovations covering electrics, plumbing, plastering, joinery and decoration — delivered as one fixed-price programme.",
    bullets: [
      "Strip-out, structural alterations and rewiring",
      "Plumbing, heating and underfloor heating",
      "Plastering, flooring, joinery and decoration",
      "Single point of contact and weekly progress reports",
    ],
  },
  {
    slug: "kitchens-bathrooms",
    title: "Kitchens & Bathrooms",
    short:
      "Bespoke kitchen and bathroom installations — design, supply and fit, with trades coordinated under one roof.",
    bullets: [
      "Bespoke and modular kitchen installs",
      "Family bathrooms, en-suites and wet rooms",
      "Tiling, stone, joinery and lighting",
      "Aftercare and snagging covered",
    ],
  },
];
