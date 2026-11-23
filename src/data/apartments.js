export const APARTMENTS = [
  {
    id: 'penthouse',
    floor: 3,
    badge: 'Featured · Fully Staged',
    title: 'Apartment 3 — The Penthouse',
    subtitle: '2 Bed · 2 Bath · Huge Wrap-Around Sea-View Terrace',
    status: 'live',
    specs: [
      '2 Bedrooms (Master + Guest)',
      '2 Bathrooms (Family Bath + En-Suite)',
      'Family Bathroom: Freestanding bath, 2× stone vessel sinks, walk-in shower, WC & backlit mirror',
      'En-Suite: Walk-in rain shower, floating vanity sink & WC',
      'Utility Room: Wall-mounted boiler, oak countertop, washer & dryer space',
      'Open-Plan Living & Dining with architectural column & pendant lighting',
      '2× Hot & Cold Air Conditioning units serving every living space',
      'Freestanding Matte-Black Pellet Burner in living room',
      'Fully Fitted Kitchen to Spec — Choose Your Own Kitchen (Small or Large)',
      '1 Huge Wrap-Around Rooftop Terrace with panoramic mountain & sea views'
    ],
    highlights: [
      { label: 'Bedrooms', value: '2' },
      { label: 'Bathrooms', value: '2' },
      { label: 'Terrace', value: 'Wrap-Around Sea View' },
      { label: 'Climate', value: '2× A/C + Pellet Burner' }
    ]
  },
  {
    id: 'apt2',
    floor: 2,
    badge: 'Second Floor · Sea View',
    title: 'Apartment 2 — Sea-View Residence',
    subtitle: '3 Bed · 2 Bath · 2 Sea-View Balconies',
    status: 'coming-soon',
    specs: [
      '3 Bedrooms',
      '2 Bathrooms (Family Bath + En-Suite)',
      'Family Bathroom: Freestanding bath, 2× sinks, walk-in shower, WC & mirror',
      'En-Suite: Walk-in shower, sink & WC',
      'Utility Room with boiler & countertop',
      'Open-Plan Living Space & Kitchen with 3 French balcony doors',
      '2× Hot & Cold Air Conditioning units serving every living space',
      'Pellet Burner in the living room',
      'Fully Fitted Kitchen to Spec — Choose Your Own Kitchen',
      '2 Balconies with panoramic sea & valley views'
    ],
    highlights: [
      { label: 'Bedrooms', value: '3' },
      { label: 'Bathrooms', value: '2' },
      { label: 'Balconies', value: '2× Sea View' },
      { label: 'Climate', value: '2× A/C + Pellet Burner' }
    ]
  },
  {
    id: 'apt1',
    floor: 1,
    badge: 'First Floor · 3-Bed Family',
    title: 'Apartment 1 — Garden-Level Residence',
    subtitle: '3 Bed · 2 Bath · 2 Balconies',
    status: 'coming-soon',
    specs: [
      '3 Bedrooms',
      '2 Bathrooms (Family Bath + En-Suite)',
      'Family Bathroom: Freestanding bath, 2× sinks, walk-in shower, WC & mirror',
      'En-Suite: Walk-in shower, sink & WC',
      'Utility Room with boiler & countertop',
      'Open-Plan Living Space & Kitchen',
      '2× Hot & Cold Air Conditioning units serving every living space',
      'Pellet Burner in the living room',
      'Fully Fitted Kitchen to Spec — Choose Your Own Kitchen',
      '2 Private Balconies'
    ],
    highlights: [
      { label: 'Bedrooms', value: '3' },
      { label: 'Bathrooms', value: '2' },
      { label: 'Balconies', value: '2× Private' },
      { label: 'Climate', value: '2× A/C + Pellet Burner' }
    ]
  }
];

export const PENTHOUSE_ROOMS = [
  {
    id: 'living-1',
    name: 'Open-Plan Lounge',
    shortName: 'Lounge',
    tag: 'Living Space',
    description: 'Sun-drenched open-plan living room with anthracite terrace doors, architectural round column, linear wood-and-black pendants, freestanding pellet burner, and warm Modern Mediterranean styling.',
    raw: './media/raw/penthouse-living-1.jpg',
    staged: './media/staged/penthouse-living-1.jpg',
    hotspot3D: { x: -1.6, y: 7.4, z: 1.2 },
    camera3D: { pos: [-5.5, 9.8, 6.2], target: [-1.4, 7.1, 1.0] }
  },
  {
    id: 'living-2',
    name: 'Dining & Living Panorama',
    shortName: 'Dining',
    tag: 'Living & Dining',
    description: 'Expansive sightline across the dining and lounge zones featuring a 6-seat light-oak dining table, gallery wall art, ceramic console, and seamless indoor-outdoor flow to the terrace.',
    raw: './media/raw/penthouse-living-2.jpg',
    staged: './media/staged/penthouse-living-2.jpg',
    hotspot3D: { x: 0.6, y: 7.4, z: 1.5 },
    camera3D: { pos: [4.8, 9.6, 6.4], target: [0.4, 7.1, 1.2] }
  },
  {
    id: 'kitchen',
    name: 'Penthouse Peninsula Kitchen',
    shortName: 'Kitchen',
    tag: 'Penthouse Spec',
    description: 'Compact Peninsula kitchen designed specifically for the Penthouse: handleless white gloss PET cabinetry, honed matt black granite worktops & recessed kickboards, projecting prep peninsula, undercounter oven + induction hob with T-shaped chimney hood, built-in microwave bay, and integrated fridge-freezer tower.',
    raw: './media/raw/penthouse-kitchen.jpg',
    staged: './media/staged/penthouse-kitchen.jpg',
    hotspot3D: { x: 2.8, y: 7.4, z: -1.4 },
    camera3D: { pos: [6.8, 9.8, -4.5], target: [2.6, 7.0, -1.4] }
  },
  {
    id: 'terrace-1',
    name: 'Wrap-Around Sea-View Terrace',
    shortName: 'Terrace Lounge',
    tag: 'Outdoor Living',
    description: 'Huge open-sky rooftop terrace finished in Andalusian terracotta tiles and white balustrades, staged with teak outdoor lounge seating, Mediterranean olive planters, and unobstructed mountain & sea views.',
    raw: './media/raw/penthouse-terrace-1.jpg',
    staged: './media/staged/penthouse-terrace-1.jpg',
    hotspot3D: { x: -4.4, y: 7.2, z: 3.4 },
    camera3D: { pos: [-9.2, 9.5, 7.8], target: [-3.8, 7.0, 2.8] }
  },
  {
    id: 'terrace-2',
    name: 'Al-Fresco Terrace Dining',
    shortName: 'Terrace Dining',
    tag: 'Outdoor Dining',
    description: 'Sunlit wrap-around terrace walkway styled with a 6-seater teak outdoor dining table right outside the living room sliding doors, flanked by potted olive trees and lavender.',
    raw: './media/raw/penthouse-terrace-2.jpg',
    staged: './media/staged/penthouse-terrace-2.jpg',
    hotspot3D: { x: 2.2, y: 7.2, z: 4.1 },
    camera3D: { pos: [7.2, 9.6, 8.2], target: [1.8, 7.0, 3.6] }
  },
  {
    id: 'master-bed',
    name: 'Master Suite',
    shortName: 'Master Bed',
    tag: 'Bedroom 1',
    description: 'Serene principal bedroom with private terrace access, oatmeal-linen upholstered king bed, oak nightstands, abstract canvas art, sheer linen drapes, and discreet wall-mounted A/C.',
    raw: './media/raw/penthouse-master-bed.jpg',
    staged: './media/staged/penthouse-master-bed.jpg',
    hotspot3D: { x: -2.8, y: 7.4, z: -2.2 },
    camera3D: { pos: [-7.2, 9.8, -5.2], target: [-2.6, 7.0, -2.0] }
  },
  {
    id: 'ensuite',
    name: 'Master En-Suite',
    shortName: 'En-Suite',
    tag: 'Bathroom 2',
    description: 'Spa-inspired en-suite featuring a walk-in matte-black rain shower, floating vanity with vessel sink, backlit black-framed LED mirror, and warm sand porcelain tiling.',
    raw: './media/raw/penthouse-ensuite.jpg',
    staged: './media/staged/penthouse-ensuite.jpg',
    hotspot3D: { x: -1.1, y: 7.4, z: -3.1 },
    camera3D: { pos: [-4.5, 9.8, -6.8], target: [-1.1, 7.0, -2.9] }
  },
  {
    id: 'family-bath',
    name: 'Family Spa Bathroom',
    shortName: 'Family Bath',
    tag: 'Bathroom 1',
    description: 'Generous family bathroom with freestanding oval tub, solid-wood vanity with twin carved stone vessel sinks, walk-in rain shower, backlit mirror, and woven rattan ceiling pendant.',
    raw: './media/raw/penthouse-family-bath.jpg',
    staged: './media/staged/penthouse-family-bath.jpg',
    hotspot3D: { x: 0.7, y: 7.4, z: -2.9 },
    camera3D: { pos: [3.2, 9.8, -6.8], target: [0.7, 7.0, -2.7] }
  },
  {
    id: 'utility',
    name: 'Kitted-Out Utility Room',
    shortName: 'Utility',
    tag: 'Laundry & Tech',
    description: 'Dedicated utility & laundry room fitted with wall-mounted electric boiler, full-length oak worktop, side-by-side front-loading washer & heat-pump dryer, floating shelves, and woven storage.',
    raw: './media/raw/penthouse-utility.jpg',
    staged: './media/staged/penthouse-utility.jpg',
    hotspot3D: { x: 2.2, y: 7.4, z: -3.1 },
    camera3D: { pos: [5.8, 9.8, -6.5], target: [2.1, 7.0, -2.9] }
  },
  {
    id: 'bed2',
    name: 'Guest Bedroom',
    shortName: 'Bedroom 2',
    tag: 'Bedroom 2',
    description: 'Bright second bedroom finished with warm sand & white linen bedding, woven natural headboard, light-oak nightstands, framed modern artwork, and dual black-framed windows.',
    raw: './media/raw/penthouse-bed2.jpg',
    staged: './media/staged/penthouse-bed2.jpg',
    hotspot3D: { x: 3.4, y: 7.4, z: 0.9 },
    camera3D: { pos: [8.0, 9.8, 3.8], target: [3.2, 7.0, 0.9] }
  },
  {
    id: 'exterior',
    name: 'Andalusian Residence Exterior',
    shortName: 'Exterior',
    tag: '3-Storey Building',
    description: 'Traditional whitewashed Andalusian façade with ochre architectural trim, terracotta roofline, private ground-floor garage & storage rooms, and three full-floor apartments.',
    raw: './media/raw/exterior-street.jpg',
    staged: './media/staged/exterior-street.jpg',
    hotspot3D: { x: 0.0, y: 3.2, z: 5.5 },
    camera3D: { pos: [12.5, 8.5, 14.5], target: [0, 4.2, 0] }
  }
];

export const KITCHEN_OPTIONS = {
  small: {
    id: 'small',
    name: 'Penthouse Compact Peninsula Kitchen',
    dimensions: 'Apartment 3 (Penthouse) · 4,400 × 3,000 mm',
    summary: 'Fitted to Apartment 3 (Penthouse): open-plan peninsula configuration maximizing floor flow, featuring handleless white gloss PET fronts, honed matt black granite worktops & plinths, statement T-shaped chimney hood, built-in microwave bay, and integrated fridge tower.',
    features: [
      'Designed specifically for Apartment 3 — The Penthouse',
      '1.8m projecting peninsula creating an open culinary zone',
      'Honed matt black granite worktops & 100mm recessed kickboards',
      'Undercounter oven + induction hob with T-shaped chimney extractor',
      'Integrated dishwasher, sink cabinet, built-in microwave & 600mm fridge tower'
    ],
    views: [
      { label: 'Hero Frontal View', src: './media/kitchens/small-kitchen-photoreal.jpg' },
      { label: 'From Right Aisle', src: './media/kitchens/small-kitchen-02.jpg' },
      { label: 'From Left Passage', src: './media/kitchens/small-kitchen-03.jpg' },
      { label: 'Elevated Layout', src: './media/kitchens/small-kitchen-04.jpg' },
      { label: 'Coffee & Cooking Detail', src: './media/kitchens/small-kitchen-05.jpg' }
    ]
  },
  large: {
    id: 'large',
    name: 'Large L-Shaped Designer Kitchen',
    dimensions: 'Apartments 1 & 2 · 4,000 × 2,600 mm',
    summary: 'Fitted to Apartments 1 & 2: continuous 900mm white gloss handleless upper & base cabinetry around both legs, honed matt black granite worktops & kickboards, concealed integrated extractor, tall fridge-freezer tower, and waist-height oven & microwave tower.',
    features: [
      'Designed for Apartments 1 & 2 (Floors 1 & 2)',
      '4.0m sink & prep run + 2.6m cooking return',
      'Honed matt black granite worktops & 100mm recessed kickboards',
      'Integrated tall fridge-freezer + dedicated oven/microwave tower',
      'Concealed stainless mesh extractor & continuous under-cabinet LED strip'
    ],
    views: [
      { label: 'Hero 3/4 View', src: './media/kitchens/large-kitchen-photoreal.jpg' },
      { label: 'Along Sink Run', src: './media/kitchens/large-kitchen-02.jpg' },
      { label: 'Toward Fridge Tower', src: './media/kitchens/large-kitchen-03.jpg' },
      { label: 'Elevated Layout', src: './media/kitchens/large-kitchen-04.jpg' },
      { label: 'Hob & Concealed Hood', src: './media/kitchens/large-kitchen-05.jpg' }
    ]
  }
};
