export type AreaType = "borough" | "prime";

export interface Area {
  name: string;
  slug: string;
  type: AreaType;
  postcodes: string;
  character: string;
  planning: string;
  neighbours: string[];
}

export const areas: Area[] = [
  // ── 33 London Boroughs ──────────────────────────────────────────────────────
  {
    name: "City of London",
    slug: "city-of-london",
    type: "borough",
    postcodes: "EC1, EC2, EC3, EC4",
    character:
      "A historic core of converted warehouses, period townhouses around the Barbican and high-end residential apartments tucked between Grade I and II listed offices.",
    planning:
      "Almost the entire Square Mile sits within conservation areas administered by the City of London Corporation, so external alterations and listed-building consents need careful pre-planning advice.",
    neighbours: ["islington", "tower-hamlets", "hackney", "southwark", "shoreditch"],
  },
  {
    name: "Barking and Dagenham",
    slug: "barking-and-dagenham",
    type: "borough",
    postcodes: "IG11, RM6–RM10",
    character:
      "Predominantly 1920s–30s ex-LCC cottage estates, post-war semis and a growing wave of new-build apartments around Barking Riverside.",
    planning:
      "Most family homes sit outside conservation areas, so rear and side extensions, hip-to-gable lofts and full refurbishments often progress under permitted development.",
    neighbours: ["redbridge", "newham", "havering", "tower-hamlets"],
  },
  {
    name: "Barnet",
    slug: "barnet",
    type: "borough",
    postcodes: "N2, N3, N10–N12, N20, NW2, NW4, NW7, NW9, NW11",
    character:
      "Generous semis and detached homes across Finchley, Mill Hill, Totteridge and Hampstead Garden Suburb — ideal for double rear extensions and large mansard or L-shaped lofts.",
    planning:
      "Hampstead Garden Suburb has its own Article 4 direction and design code; elsewhere most works fall under standard permitted development or householder applications.",
    neighbours: ["camden", "haringey", "harrow", "enfield", "hampstead"],
  },
  {
    name: "Bexley",
    slug: "bexley",
    type: "borough",
    postcodes: "DA1, DA5–DA8, DA14–DA18",
    character:
      "Inter-war and post-war family housing across Bexleyheath, Sidcup and Welling with deep gardens that suit single-storey wrap-around and rear extensions.",
    planning:
      "Limited Article 4 cover means most extensions and loft conversions can be delivered under permitted development, subject to the usual size and height limits.",
    neighbours: ["bromley", "greenwich", "lewisham"],
  },
  {
    name: "Brent",
    slug: "brent",
    type: "borough",
    postcodes: "NW2, NW6, NW9, NW10, HA0, HA9",
    character:
      "Edwardian and inter-war terraces and semis through Willesden, Kilburn, Wembley and Kensal Rise — a classic London canvas for side-return kitchens and dormer lofts.",
    planning:
      "Several conservation areas (e.g. Mapesbury, Queen’s Park, Sudbury Court) require householder applications; outside these, most projects proceed under permitted development.",
    neighbours: ["camden", "westminster", "harrow", "ealing", "barnet"],
  },
  {
    name: "Bromley",
    slug: "bromley",
    type: "borough",
    postcodes: "BR1–BR8, SE6, SE9, SE20, SE26",
    character:
      "Suburban London at its largest — Edwardian villas in Beckenham and Chislehurst, 1930s semis in Petts Wood, and detached family homes across Bickley and Keston.",
    planning:
      "Generally permissive for rear extensions and loft conversions; tighter controls apply inside conservation areas like Chislehurst, Sundridge and Cator.",
    neighbours: ["bexley", "lewisham", "croydon"],
  },
  {
    name: "Camden",
    slug: "camden",
    type: "borough",
    postcodes: "NW1, NW3, NW5, NW6, WC1, WC2",
    character:
      "Stucco-fronted Georgian and Victorian terraces in Bloomsbury, Belsize Park and Primrose Hill, plus mews houses and converted warehouses around King’s Cross.",
    planning:
      "Heavy conservation-area coverage and frequent listed-building constraints mean almost every project benefits from a pre-application enquiry with Camden planners.",
    neighbours: ["westminster", "islington", "hampstead", "primrose-hill", "fitzrovia", "marylebone"],
  },
  {
    name: "Croydon",
    slug: "croydon",
    type: "borough",
    postcodes: "CR0, CR2, CR7, SE19, SE25",
    character:
      "Edwardian terraces in South Norwood, generous Victorian villas in South Croydon and Sanderstead, and a strong stock of 1930s semis ripe for extension.",
    planning:
      "Most family homes sit outside Article 4 areas; the Croydon SPD on residential extensions is a useful design baseline before submitting.",
    neighbours: ["sutton", "lambeth", "bromley"],
  },
  {
    name: "Ealing",
    slug: "ealing",
    type: "borough",
    postcodes: "W3, W5, W7, W13, UB1, UB2, UB5, UB6",
    character:
      "‘Queen of the Suburbs’ — Edwardian and Arts-and-Crafts villas in Ealing and Pitshanger, plus extensive 1930s semis around Northolt, Greenford and Hanwell.",
    planning:
      "Brentham, Pitshanger and Walpole are protected conservation areas with their own design guidance; elsewhere most rear and loft works fall under permitted development.",
    neighbours: ["hounslow", "hammersmith-and-fulham", "brent", "hillingdon"],
  },
  {
    name: "Enfield",
    slug: "enfield",
    type: "borough",
    postcodes: "EN1–EN3, EN8, N9, N11, N13, N14, N18, N21",
    character:
      "A mix of Edwardian terraces in Bowes Park and Palmers Green, large detached homes in Winchmore Hill and Cockfosters, and post-war semis through Enfield Town.",
    planning:
      "Outside the Forty Hall and Winchmore Hill conservation areas, most extensions and loft conversions move forward under permitted development.",
    neighbours: ["barnet", "haringey", "waltham-forest"],
  },
  {
    name: "Greenwich",
    slug: "greenwich",
    type: "borough",
    postcodes: "SE3, SE7, SE9, SE10, SE18",
    character:
      "World-Heritage Georgian terraces around Greenwich town centre, Victorian terraces in Charlton and Eltham, and 1930s semis in New Eltham — plus growing new-build along the Peninsula.",
    planning:
      "West Greenwich, Ashburnham Triangle and Blackheath conservation areas demand sympathetic detailing; elsewhere standard householder rules apply.",
    neighbours: ["lewisham", "tower-hamlets", "bexley", "blackheath"],
  },
  {
    name: "Hackney",
    slug: "hackney",
    type: "borough",
    postcodes: "E1, E2, E5, E8, E9, N1, N16",
    character:
      "Victorian terraces in De Beauvoir, Stoke Newington and London Fields, warehouse conversions around Haggerston and Dalston, and Georgian streets near Clissold Park.",
    planning:
      "Wide Article 4 coverage on side-return rules and HMOs; expect a householder application for most rear extensions and full loft conversions.",
    neighbours: ["islington", "tower-hamlets", "shoreditch", "stoke-newington", "haringey", "newham"],
  },
  {
    name: "Hammersmith and Fulham",
    slug: "hammersmith-and-fulham",
    type: "borough",
    postcodes: "W6, W12, W14, SW6, SW10",
    character:
      "Classic London stock — Victorian terraces and Edwardian mansion blocks in Brook Green, Parsons Green and Bishop’s Park, with mews and townhouses through Brackenbury Village.",
    planning:
      "Numerous conservation areas (Brackenbury, Bishop’s Park, Walham Green) tightly control external alterations; rear extensions usually need a householder application.",
    neighbours: ["kensington-and-chelsea", "wandsworth", "hounslow", "fulham", "holland-park"],
  },
  {
    name: "Haringey",
    slug: "haringey",
    type: "borough",
    postcodes: "N2, N4, N6, N8, N10, N15, N17, N22",
    character:
      "Late-Victorian and Edwardian terraces in Crouch End, Muswell Hill and Harringay, sweeping into the larger detached homes of Highgate and Hornsey Lane.",
    planning:
      "Crouch End, Muswell Hill, Highgate and Stroud Green conservation areas all carry Article 4 directions; the rest follows standard householder permitted-development rules.",
    neighbours: ["camden", "islington", "barnet", "enfield", "hackney", "highgate"],
  },
  {
    name: "Harrow",
    slug: "harrow",
    type: "borough",
    postcodes: "HA1–HA3, HA5, HA7, HA8",
    character:
      "Inter-war ‘Metroland’ semis and detached homes in Pinner, Stanmore, Harrow-on-the-Hill and Kenton — long, deep plots that suit ambitious extensions.",
    planning:
      "Harrow-on-the-Hill and Pinner Village have strong conservation controls; otherwise extensions and lofts typically progress under permitted development.",
    neighbours: ["barnet", "brent", "hillingdon"],
  },
  {
    name: "Havering",
    slug: "havering",
    type: "borough",
    postcodes: "RM1–RM5, RM11–RM14",
    character:
      "Suburban Romford, Hornchurch, Upminster and Rainham — predominantly 1930s semis and detached family homes with garages and side passages ripe for extension.",
    planning:
      "Permissive overall; small conservation areas (Emerson Park, Upminster Old Village) require sympathetic design choices.",
    neighbours: ["redbridge", "barking-and-dagenham"],
  },
  {
    name: "Hillingdon",
    slug: "hillingdon",
    type: "borough",
    postcodes: "UB3, UB4, UB7–UB11, HA4, HA6",
    character:
      "Family-scale 1930s semis through Ruislip, Eastcote and Hayes, with larger detached stock in Northwood and Ickenham and modern apartments around Uxbridge.",
    planning:
      "Mostly permitted-development friendly; specific design guidance applies in the Ruislip Village and Eastcote Village conservation areas.",
    neighbours: ["harrow", "ealing", "hounslow"],
  },
  {
    name: "Hounslow",
    slug: "hounslow",
    type: "borough",
    postcodes: "TW3–TW5, TW7, TW8, TW13, TW14, W4",
    character:
      "Chiswick Edwardian terraces, Bedford Park Arts-and-Crafts villas, and 1930s semis through Isleworth, Heston and Hanworth.",
    planning:
      "Chiswick, Bedford Park and Strand-on-the-Green carry tight conservation controls; outside these areas most projects move under permitted development.",
    neighbours: ["ealing", "richmond-upon-thames", "hammersmith-and-fulham", "hillingdon"],
  },
  {
    name: "Islington",
    slug: "islington",
    type: "borough",
    postcodes: "N1, N5, N7, N19, EC1",
    character:
      "Georgian and early-Victorian terraces in Barnsbury, Canonbury and Highbury, plus warehouse conversions around Clerkenwell and Old Street.",
    planning:
      "Borough-wide Article 4 directions cover roof extensions, rear additions and basements in conservation areas — almost every project needs a householder or full application.",
    neighbours: ["camden", "hackney", "city-of-london", "haringey", "angel"],
  },
  {
    name: "Kensington and Chelsea",
    slug: "kensington-and-chelsea",
    type: "borough",
    postcodes: "SW3, SW5, SW7, SW10, W8, W10, W11, W14",
    character:
      "Stucco-fronted Italianate townhouses, mews houses and grand mansion blocks across some of London’s most desirable postcodes.",
    planning:
      "RBKC operates one of the strictest planning regimes in the UK with extensive Article 4, basement policy CL7, and listed-building constraints — early planning advice is essential.",
    neighbours: ["westminster", "hammersmith-and-fulham", "chelsea", "kensington", "notting-hill", "knightsbridge", "holland-park"],
  },
  {
    name: "Kingston upon Thames",
    slug: "kingston-upon-thames",
    type: "borough",
    postcodes: "KT1–KT3, KT5, KT6, KT9, SW15, SW20",
    character:
      "Edwardian villas in Surbiton and New Malden, riverside houses in Kingston town, and substantial detached homes through Coombe and Chessington.",
    planning:
      "Surbiton, Coombe and Old London Road conservation areas require careful design matching; elsewhere extensions and lofts typically proceed under permitted development.",
    neighbours: ["richmond-upon-thames", "merton", "sutton", "wimbledon"],
  },
  {
    name: "Lambeth",
    slug: "lambeth",
    type: "borough",
    postcodes: "SW2, SW4, SW8, SW9, SW16, SE1, SE11, SE24, SE27",
    character:
      "Victorian terraces in Clapham, Brixton, Herne Hill and Streatham, with Georgian survivors in Kennington and Vauxhall.",
    planning:
      "Article 4 directions on roof and front extensions in many conservation areas; rear and side-return extensions usually need a householder application.",
    neighbours: ["southwark", "wandsworth", "croydon", "clapham", "dulwich"],
  },
  {
    name: "Lewisham",
    slug: "lewisham",
    type: "borough",
    postcodes: "SE4, SE6, SE8, SE12–SE14, SE23, SE26",
    character:
      "Victorian terraces in Brockley, Telegraph Hill and Forest Hill, Edwardian semis in Hither Green, and 1930s housing across Lee and Catford.",
    planning:
      "Brockley and Telegraph Hill carry Article 4 controls; most other areas are permissive for rear and dormer-loft works.",
    neighbours: ["greenwich", "southwark", "bromley", "blackheath", "dulwich"],
  },
  {
    name: "Merton",
    slug: "merton",
    type: "borough",
    postcodes: "SW19, SW20, SM4, CR4",
    character:
      "Victorian terraces in Wimbledon and Colliers Wood, large detached and semi-detached homes around Wimbledon Village, and family housing through Morden and Mitcham.",
    planning:
      "Wimbledon Village and West Wimbledon conservation areas attract Article 4 controls; outside these most works proceed under permitted development.",
    neighbours: ["wandsworth", "kingston-upon-thames", "sutton", "wimbledon"],
  },
  {
    name: "Newham",
    slug: "newham",
    type: "borough",
    postcodes: "E6, E7, E12–E16, E20",
    character:
      "Victorian and Edwardian terraces through Forest Gate, Manor Park and Plaistow, with new-build apartments around Stratford and Royal Docks.",
    planning:
      "Limited Article 4 cover means many extensions and lofts can use permitted development; conservation areas in Forest Gate require sympathetic detailing.",
    neighbours: ["tower-hamlets", "hackney", "redbridge", "barking-and-dagenham"],
  },
  {
    name: "Redbridge",
    slug: "redbridge",
    type: "borough",
    postcodes: "IG1–IG6, IG8, E11, E18",
    character:
      "Edwardian and inter-war stock in Wanstead, South Woodford and Ilford, with larger detached homes in Woodford Green.",
    planning:
      "Wanstead and Woodford have a number of conservation areas; outside these, most extensions and loft conversions are permitted-development friendly.",
    neighbours: ["waltham-forest", "havering", "newham", "barking-and-dagenham"],
  },
  {
    name: "Richmond upon Thames",
    slug: "richmond-upon-thames",
    type: "borough",
    postcodes: "TW1, TW2, TW9–TW12, KT2, SW13–SW14",
    character:
      "Georgian riverside terraces in Richmond and Twickenham, Edwardian villas in St Margarets, and large detached homes in Kew, Petersham and Ham.",
    planning:
      "One of London’s most heavily protected boroughs — broad conservation-area coverage and strong design SPDs require careful pre-application engagement.",
    neighbours: ["kingston-upon-thames", "hounslow", "wandsworth"],
  },
  {
    name: "Southwark",
    slug: "southwark",
    type: "borough",
    postcodes: "SE1, SE5, SE15–SE17, SE21, SE22",
    character:
      "Georgian and Victorian terraces in Bermondsey, Camberwell and Peckham, and grand stuccoed villas through Dulwich Village.",
    planning:
      "Significant conservation-area coverage including Dulwich Village, Bellenden and Camberwell Grove; expect householder applications for most extensions.",
    neighbours: ["lambeth", "lewisham", "city-of-london", "tower-hamlets", "dulwich"],
  },
  {
    name: "Sutton",
    slug: "sutton",
    type: "borough",
    postcodes: "SM1–SM3, SM5–SM7",
    character:
      "Edwardian villas in Carshalton and Cheam, 1930s semis in Sutton and Wallington, plus larger detached stock in Belmont and the Banstead borders.",
    planning:
      "Carshalton Village and Cheam Village conservation areas attract specific design controls; otherwise the borough is largely permitted-development friendly.",
    neighbours: ["merton", "croydon", "kingston-upon-thames"],
  },
  {
    name: "Tower Hamlets",
    slug: "tower-hamlets",
    type: "borough",
    postcodes: "E1, E2, E3, E14",
    character:
      "Georgian terraces in Spitalfields and Wapping, Victorian housing in Bow and Bethnal Green, and high-density apartments through Canary Wharf and the Isle of Dogs.",
    planning:
      "Tight conservation controls in Spitalfields, Wapping Pierhead and Tredegar Square; outside these areas most projects need a householder application.",
    neighbours: ["hackney", "newham", "city-of-london", "southwark", "shoreditch", "wapping", "canary-wharf"],
  },
  {
    name: "Waltham Forest",
    slug: "waltham-forest",
    type: "borough",
    postcodes: "E4, E10, E11, E17, E18",
    character:
      "Victorian terraces in Walthamstow and Leyton, Edwardian semis in Highams Park, and larger detached homes in Chingford close to Epping Forest.",
    planning:
      "Walthamstow Village, Lloyd Park and Bakers Avenue conservation areas require careful design matching; most other works move under permitted development.",
    neighbours: ["haringey", "redbridge", "hackney", "newham", "enfield"],
  },
  {
    name: "Wandsworth",
    slug: "wandsworth",
    type: "borough",
    postcodes: "SW8, SW11, SW12, SW15, SW17, SW18",
    character:
      "Victorian terraces across Battersea, Clapham, Balham, Tooting and Wandsworth Town, with Edwardian villas in Putney and Southfields.",
    planning:
      "Numerous conservation areas (Sisters, Heaver, Wandsworth Common West Side, Magdalen) carry Article 4 directions on roof and front extensions.",
    neighbours: ["lambeth", "merton", "hammersmith-and-fulham", "richmond-upon-thames", "battersea", "clapham", "putney"],
  },
  {
    name: "Westminster",
    slug: "westminster",
    type: "borough",
    postcodes: "W1, W2, W9, NW1, NW8, SW1, WC1, WC2",
    character:
      "Stucco terraces in Belgravia and Pimlico, mews houses in Marylebone and Mayfair, and grand Edwardian mansion blocks across Bayswater and Maida Vale.",
    planning:
      "Almost the entire borough sits within conservation areas and most addresses fall under Article 4 directions; pre-application advice is the standard route.",
    neighbours: ["camden", "kensington-and-chelsea", "city-of-london", "mayfair", "marylebone", "fitzrovia", "soho", "belgravia", "knightsbridge", "st-johns-wood"],
  },

  // ── 26 Prime / High-Intent Areas ────────────────────────────────────────────
  {
    name: "Mayfair",
    slug: "mayfair",
    type: "prime",
    postcodes: "W1J, W1K, W1S",
    character:
      "Georgian townhouses, Edwardian mansion blocks and discreet mews houses — one of the most prestigious residential districts in the world.",
    planning:
      "Sits inside the Mayfair Conservation Area with extensive listed-building cover; almost any external work, basement or fit-out needs Westminster planning consent.",
    neighbours: ["westminster", "marylebone", "soho", "fitzrovia", "knightsbridge", "belgravia"],
  },
  {
    name: "Notting Hill",
    slug: "notting-hill",
    type: "prime",
    postcodes: "W11",
    character:
      "Pastel-fronted stucco terraces around Westbourne Grove and Ladbroke Grove, plus garden squares like Lansdowne and Stanley Crescent.",
    planning:
      "Almost entirely covered by the Ladbroke and Norland conservation areas with Article 4 controls on roof, front and basement works.",
    neighbours: ["kensington-and-chelsea", "holland-park", "kensington", "westminster"],
  },
  {
    name: "Chelsea",
    slug: "chelsea",
    type: "prime",
    postcodes: "SW3, SW10",
    character:
      "Georgian and early-Victorian townhouses around Cheyne Walk and Chelsea Square, mansion blocks on Sloane Avenue, and modern apartments at Chelsea Harbour.",
    planning:
      "Multiple conservation areas, RBKC basement policy CL7, and listed-building constraints make pre-application engagement essential.",
    neighbours: ["kensington-and-chelsea", "knightsbridge", "belgravia", "fulham", "kensington"],
  },
  {
    name: "Knightsbridge",
    slug: "knightsbridge",
    type: "prime",
    postcodes: "SW1X, SW7",
    character:
      "Stucco terraces, Edwardian mansion blocks and a tight cluster of mews houses around Beauchamp Place and Brompton Road.",
    planning:
      "Crosses both Westminster and RBKC, with conservation-area and listed-building cover throughout; basement and rear works need a full householder application.",
    neighbours: ["kensington-and-chelsea", "westminster", "belgravia", "chelsea", "kensington"],
  },
  {
    name: "Belgravia",
    slug: "belgravia",
    type: "prime",
    postcodes: "SW1W, SW1X",
    character:
      "Cream-stucco Cubitt terraces around Eaton Square, Belgrave Square and Chester Square, with mews houses tucked behind.",
    planning:
      "Sits within the Belgravia Conservation Area; many homes are listed and the Grosvenor Estate adds its own design covenants alongside Westminster planning.",
    neighbours: ["westminster", "knightsbridge", "mayfair", "chelsea"],
  },
  {
    name: "Marylebone",
    slug: "marylebone",
    type: "prime",
    postcodes: "W1G, W1H, W1U",
    character:
      "Georgian townhouses around Marylebone High Street and Wimpole Street, mansion blocks on Portland Place, and mews houses off Devonshire Street.",
    planning:
      "Marylebone Conservation Area covers almost all of the village; the Howard de Walden and Portman estates add design covenants.",
    neighbours: ["westminster", "fitzrovia", "mayfair", "soho", "camden"],
  },
  {
    name: "Fitzrovia",
    slug: "fitzrovia",
    type: "prime",
    postcodes: "W1T, W1W",
    character:
      "Georgian terraces, Edwardian commercial conversions and warehouse-style apartments between Tottenham Court Road and Great Portland Street.",
    planning:
      "Split between Camden and Westminster, both of which apply tight conservation-area design control and Article 4 directions on roof and rear extensions.",
    neighbours: ["camden", "westminster", "marylebone", "soho"],
  },
  {
    name: "Soho",
    slug: "soho",
    type: "prime",
    postcodes: "W1D, W1F",
    character:
      "Compact Georgian townhouses and warehouse conversions woven through one of London’s most active mixed-use districts.",
    planning:
      "Soho Conservation Area applies throughout; almost all external works and many internal alterations require Westminster planning input.",
    neighbours: ["westminster", "fitzrovia", "mayfair", "marylebone"],
  },
  {
    name: "Kensington",
    slug: "kensington",
    type: "prime",
    postcodes: "W8, SW7",
    character:
      "Italianate stucco terraces in Holland Park Road and De Vere Gardens, garden-square housing around Edwardes Square, and grand mansion blocks on Kensington High Street.",
    planning:
      "Sits within the Kensington and De Vere conservation areas; RBKC basement policy CL7 and frequent listed-building consents shape every project.",
    neighbours: ["kensington-and-chelsea", "notting-hill", "holland-park", "chelsea", "knightsbridge"],
  },
  {
    name: "Holland Park",
    slug: "holland-park",
    type: "prime",
    postcodes: "W11, W14",
    character:
      "Stucco-fronted Italianate villas, garden squares like Lansdowne Walk, and a quiet cluster of mews around Holland Park Avenue.",
    planning:
      "Almost entirely inside the Holland Park Conservation Area with Article 4 directions on roofs, fronts and basements.",
    neighbours: ["kensington-and-chelsea", "notting-hill", "kensington", "hammersmith-and-fulham"],
  },
  {
    name: "Hampstead",
    slug: "hampstead",
    type: "prime",
    postcodes: "NW3",
    character:
      "Georgian cottages around Flask Walk, large Victorian and Arts-and-Crafts villas, plus modern architect-designed homes near Hampstead Heath.",
    planning:
      "Sits within the Hampstead Conservation Area with multiple Article 4 directions; works on roof, front and rear elements typically need a householder application.",
    neighbours: ["camden", "barnet", "primrose-hill", "highgate", "st-johns-wood"],
  },
  {
    name: "Highgate",
    slug: "highgate",
    type: "prime",
    postcodes: "N6",
    character:
      "Georgian houses around Pond Square, large Victorian villas on the Holly Lodge Estate, and detached Arts-and-Crafts homes lining the Heath.",
    planning:
      "Covered by the Highgate Conservation Area which spans Camden, Haringey and Islington — sympathetic detailing is a baseline expectation.",
    neighbours: ["camden", "haringey", "islington", "hampstead"],
  },
  {
    name: "Primrose Hill",
    slug: "primrose-hill",
    type: "prime",
    postcodes: "NW1, NW3",
    character:
      "Pastel-painted early-Victorian terraces on Chalcot Square, Regent’s Park Road and Albert Terrace.",
    planning:
      "Sits inside the Primrose Hill Conservation Area; rear, roof and fenestration changes generally need a householder application with Camden.",
    neighbours: ["camden", "hampstead", "st-johns-wood", "marylebone"],
  },
  {
    name: "St John's Wood",
    slug: "st-johns-wood",
    type: "prime",
    postcodes: "NW8",
    character:
      "Detached and semi-detached villas on Hamilton Terrace, mansion blocks on Hall Road, and mews houses tucked off Abbey Road.",
    planning:
      "St John’s Wood Conservation Area applies throughout; many homes are listed or sit on the Eyre Estate with additional covenants.",
    neighbours: ["westminster", "camden", "primrose-hill", "marylebone"],
  },
  {
    name: "Shoreditch",
    slug: "shoreditch",
    type: "prime",
    postcodes: "EC2A, E1, E2",
    character:
      "Warehouse and industrial conversions, Georgian townhouses around Hoxton Square and Charlotte Road, and modern apartments along Curtain Road.",
    planning:
      "South Shoreditch and Boundary Estate conservation areas dominate the area, with Hackney and Tower Hamlets planning teams both involved depending on address.",
    neighbours: ["hackney", "tower-hamlets", "city-of-london", "islington"],
  },
  {
    name: "Clapham",
    slug: "clapham",
    type: "prime",
    postcodes: "SW4, SW11",
    character:
      "Victorian and Edwardian terraces wrapping Clapham Common, with larger semi-detached homes on Old Town and the Abbeville Village ‘Nappy Valley’.",
    planning:
      "Clapham Conservation Area, Abbeville and Park Town all carry Article 4 directions on roof, front and side extensions.",
    neighbours: ["lambeth", "wandsworth", "battersea"],
  },
  {
    name: "Battersea",
    slug: "battersea",
    type: "prime",
    postcodes: "SW8, SW11",
    character:
      "Victorian terraces in Battersea Park and Northcote, Edwardian mansion blocks along the Park, and modern flats around Nine Elms and Battersea Power Station.",
    planning:
      "Several Wandsworth conservation areas cover the historic streets; new-build districts have site-specific design codes from the Vauxhall–Nine Elms framework.",
    neighbours: ["wandsworth", "lambeth", "clapham", "chelsea", "fulham"],
  },
  {
    name: "Fulham",
    slug: "fulham",
    type: "prime",
    postcodes: "SW6",
    character:
      "Long Victorian terraces through Parsons Green, Munster Village and Fulham Broadway, with garden squares around Bishop’s Park.",
    planning:
      "Walham Green, Bishop’s Park and Munster conservation areas apply Article 4 controls; most rear and side-return extensions need a householder application.",
    neighbours: ["hammersmith-and-fulham", "chelsea", "battersea", "putney"],
  },
  {
    name: "Wimbledon",
    slug: "wimbledon",
    type: "prime",
    postcodes: "SW19, SW20",
    character:
      "Victorian villas on Wimbledon Hill, Edwardian semis around Worple Road, and large detached homes on the Parkside, West Side and Drax Avenue addresses.",
    planning:
      "Wimbledon Village and West Wimbledon conservation areas attract Article 4 controls and bespoke design SPDs from Merton.",
    neighbours: ["merton", "kingston-upon-thames", "wandsworth", "putney"],
  },
  {
    name: "Putney",
    slug: "putney",
    type: "prime",
    postcodes: "SW15",
    character:
      "Victorian and Edwardian terraces between the river and the heath, riverside apartments along the Embankment, and large detached homes in West Putney.",
    planning:
      "Putney Conservation Area, Putney Hill and Dover House Estate all carry Article 4 directions; basements and roof extensions need careful pre-app engagement.",
    neighbours: ["wandsworth", "richmond-upon-thames", "fulham", "wimbledon"],
  },
  {
    name: "Dulwich",
    slug: "dulwich",
    type: "prime",
    postcodes: "SE21, SE22",
    character:
      "Georgian and Regency villas through Dulwich Village, Edwardian terraces in East Dulwich, and 1930s detached homes on the Dulwich Estate.",
    planning:
      "Dulwich Village Conservation Area and the Dulwich Estate Scheme of Management both apply — most works require both planning and Estate consents.",
    neighbours: ["southwark", "lambeth", "lewisham", "blackheath"],
  },
  {
    name: "Blackheath",
    slug: "blackheath",
    type: "prime",
    postcodes: "SE3",
    character:
      "Georgian terraces around the Paragon, Victorian villas on Lee Road, and substantial detached homes lining Blackheath Park.",
    planning:
      "Blackheath Conservation Area spans Greenwich and Lewisham; both councils apply tight design control and Article 4 directions on roof works.",
    neighbours: ["greenwich", "lewisham", "dulwich"],
  },
  {
    name: "Angel",
    slug: "angel",
    type: "prime",
    postcodes: "N1, EC1",
    character:
      "Georgian terraces in Duncan Terrace and Colebrooke Row, warehouse conversions around Old Street, and Victorian streets through Barnsbury and Canonbury.",
    planning:
      "Wide Article 4 cover on roof and rear extensions; most works need a householder application with Islington.",
    neighbours: ["islington", "city-of-london", "shoreditch", "hackney"],
  },
  {
    name: "Stoke Newington",
    slug: "stoke-newington",
    type: "prime",
    postcodes: "N16",
    character:
      "Victorian terraces around Church Street, Georgian survivors near Clissold Park and Edwardian semis on the Cazenove Estate.",
    planning:
      "Stoke Newington Conservation Area carries Article 4 directions on roof, rear and side extensions; most projects use a householder application.",
    neighbours: ["hackney", "haringey", "islington"],
  },
  {
    name: "Wapping",
    slug: "wapping",
    type: "prime",
    postcodes: "E1W",
    character:
      "Riverside warehouse conversions, Georgian terraces on Wapping Wall, and modern apartments through St Katharine Docks.",
    planning:
      "Wapping Pierhead and Wapping Wall conservation areas apply, alongside frequent listed-building consents on warehouse façades.",
    neighbours: ["tower-hamlets", "city-of-london", "canary-wharf", "shoreditch"],
  },
  {
    name: "Canary Wharf",
    slug: "canary-wharf",
    type: "prime",
    postcodes: "E14",
    character:
      "High-density modern apartments and townhouses around the Wharf, Millwall and South Quay, plus warehouse conversions on the Isle of Dogs.",
    planning:
      "Predominantly modern stock outside conservation areas; high-rise locations follow site-specific design and structural standards from the Canary Wharf masterplan.",
    neighbours: ["tower-hamlets", "wapping", "greenwich"],
  },
];

export const totalAreas = areas.length;

export function findArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getNeighbours(slug: string): Area[] {
  const area = findArea(slug);
  if (!area) return [];
  return area.neighbours
    .map((s) => findArea(s))
    .filter((a): a is Area => Boolean(a))
    .slice(0, 5);
}
