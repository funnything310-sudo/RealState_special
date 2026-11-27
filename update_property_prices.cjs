const fs = require('fs');
let code = fs.readFileSync('src/services/propertyStore.ts', 'utf8');

// Update storage keys
code = code.replace(/vs_luxury_properties_v5/g, 'vs_luxury_properties_v8_inr');
code = code.replace(/vs_luxury_inquiries_v5/g, 'vs_luxury_inquiries_v8_inr');
code = code.replace(/vs_luxury_seeded_v5/g, 'vs_luxury_seeded_v8_inr');
code = code.replace(/vs_luxury_operating_cities_v1/g, 'vs_luxury_operating_cities_v4_inr');

// Update INITIAL_OPERATING_CITIES
code = code.replace("price: 'From €8,200,000'", "price: 'From ₹ 8.20 Cr'");
code = code.replace("price: 'From €6,800,000'", "price: 'From ₹ 6.80 Cr'");
code = code.replace("price: 'From €24,500,000'", "price: 'From ₹ 24.50 Cr'");
code = code.replace("price: 'From €11,400,000'", "price: 'From ₹ 11.40 Cr'");
code = code.replace("price: 'From €7,900,000'", "price: 'From ₹ 7.90 Cr'");

// Update Properties
const repls = [
  [
    `price: 34500000,\n    currency: 'EUR',\n    priceGuide: '€34,500,000 / Private Reserve Upon Request'`,
    `price: 345000000,\n    currency: 'INR',\n    priceGuide: '₹ 34.50 Cr / Private Reserve Upon Request'`
  ],
  [
    `price: 48000000,\n    currency: 'CHF',\n    priceGuide: 'Sold Out — Landmark Private Acquisition (CHF 48,000,000)'`,
    `price: 480000000,\n    currency: 'INR',\n    priceGuide: 'Sold Out — Landmark Private Acquisition (₹ 48.00 Cr)'`
  ],
  [
    `price: 29500000,\n    currency: 'GBP',\n    priceGuide: '£29,500,000 / Inquiries Open — 2 Units Remaining'`,
    `price: 295000000,\n    currency: 'INR',\n    priceGuide: '₹ 29.50 Cr / Inquiries Open — 2 Units Remaining'`
  ],
  [
    `price: 52000000,\n    currency: 'USD',\n    priceGuide: '$52,000,000 / Private Portfolio Offering'`,
    `price: 520000000,\n    currency: 'INR',\n    priceGuide: '₹ 52.00 Cr / Private Portfolio Offering'`
  ],
  [
    `price: 38000000,\n    currency: 'CHF',\n    priceGuide: 'Sold Out — Private Handover Complete'`,
    `price: 380000000,\n    currency: 'INR',\n    priceGuide: 'Sold Out — Private Handover Complete (₹ 38.00 Cr)'`
  ],
  [
    `price: 24000000,\n    currency: 'EUR',\n    priceGuide: '€24,000,000 / 2026 Q1 Release'`,
    `price: 240000000,\n    currency: 'INR',\n    priceGuide: '₹ 24.00 Cr / 2026 Q1 Release'`
  ],
  [
    `price: 18500000,\n    currency: 'CHF',\n    priceGuide: 'CHF 18,500,000 / Approved Architectural Permit Included'`,
    `price: 185000000,\n    currency: 'INR',\n    priceGuide: '₹ 18.50 Cr / Approved Architectural Permit Included'`
  ],
  [
    `price: 14200000,\n    currency: 'EUR',\n    priceGuide: '€14,200,000 / Under Offer'`,
    `price: 142000000,\n    currency: 'INR',\n    priceGuide: '₹ 14.20 Cr / Under Offer'`
  ],
  [
    `price: 360000,\n    currency: 'CHF',\n    priceGuide: 'CHF 360,000 / Year (Triple-Net Master Lease)'`,
    `price: 3600000,\n    currency: 'INR',\n    priceGuide: '₹ 36 Lakh / Year (Triple-Net Master Lease)'`
  ],
  [
    `price: 490000,\n    currency: 'GBP',\n    priceGuide: '£490,000 / Year / Long-Term Leasehold'`,
    `price: 4900000,\n    currency: 'INR',\n    priceGuide: '₹ 49 Lakh / Year / Long-Term Leasehold'`
  ],
  [
    `price: 18500000,\n    currency: 'EUR',\n    priceGuide: '€18,500,000 / Private Mandate Upon Request'`,
    `price: 82000000,\n    currency: 'INR',\n    priceGuide: '₹ 8.20 Cr / Private Mandate Upon Request'`
  ],
  [
    `price: 12000000,\n    currency: 'EUR',\n    priceGuide: '€12,000,000 / Private Reserve Upon Request'`,
    `price: 68000000,\n    currency: 'INR',\n    priceGuide: '₹ 6.80 Cr / Private Reserve Upon Request'`
  ],
  [
    `price: 45000000,\n    currency: 'EUR',\n    priceGuide: '€45,000,000 / Private Mandate Upon Request'`,
    `price: 245000000,\n    currency: 'INR',\n    priceGuide: '₹ 24.50 Cr / Private Mandate Upon Request'`
  ],
  [
    `price: 22500000,\n    currency: 'EUR',\n    priceGuide: '€22,500,000 / Inquiries Open'`,
    `price: 114000000,\n    currency: 'INR',\n    priceGuide: '₹ 11.40 Cr / Inquiries Open'`
  ],
  [
    `price: 14000000,\n    currency: 'EUR',\n    priceGuide: '€14,000,000 / Private Mandate Upon Request'`,
    `price: 79000000,\n    currency: 'INR',\n    priceGuide: '₹ 7.90 Cr / Private Mandate Upon Request'`
  ],
  [
    `budgetRange: '€30M - €45M'`,
    `budgetRange: '₹ 30 Cr - ₹ 45 Cr'`
  ]
];

let replacedCount = 0;
for (const [target, replacement] of repls) {
  if (code.includes(target)) {
    code = code.replace(target, replacement);
    replacedCount++;
  } else {
    // Attempt line-by-line fallback
    console.warn('Target not matched exactly, checking lines:', target.slice(0, 35));
  }
}

console.log(`Replaced ${replacedCount} of ${repls.length} targets`);
fs.writeFileSync('src/services/propertyStore.ts', code, 'utf8');
