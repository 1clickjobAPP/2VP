export const site = {
  name: "2VP",
  legalName: "2VP Construction",
  url: "https://2vp.uk",
  calculatorUrl: "https://2vp.uk/calculator",
  bookingUrl: "https://2vp.uk/book",
  phone: "020 8050 8968",
  phoneHref: "tel:+442080508968",
  email: "hi@2vp.uk",
  emailHref: "mailto:hi@2vp.uk",
  region: "London, United Kingdom",
  description:
    "2VP is a London construction company specialising in extensions, loft conversions, full home refurbishments and kitchen & bathroom installations. Get an instant estimate with our free online calculator and book a survey in minutes.",
} as const;

export type Site = typeof site;
