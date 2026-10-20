# IFTA Computer — Demo storefront

Demo preview of a PC hardware storefront for IFTA Computer (ifta-dz.com), built by the [sitedz.com](https://sitedz.com) team.

Live: https://ifta-dz.vercel.app

## Stack

- Next.js 16 (App Router, Cache Components) · React 19 · TypeScript
- Tailwind CSS 4
- Motion (animations), Lenis (smooth scroll), Embla (carousel)
- Zustand (persisted cart), Sonner (toasts), Lucide (icons)

## Pages

Home · Shop (category menu, per-category spec filters, brand, price range, stock, search, sort) · Product (gallery, specs, compatible parts, inline "Buy now" order form) · Cart · Checkout (69 wilayas, home / stop-desk delivery) · Build PC (8 slots with socket, memory and power-supply compatibility checks) · Services · Contact

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Demo notes

- Catalog is static data in `lib/products.ts` (about 60 current-generation products, 13 categories) — no backend; orders and messages are not saved. Prices are demo prices in DZD.
- Product photos are manufacturer images in `public/products/<slug>.<ext>` (`<slug>-2.<ext>` for extra angles). After adding or replacing one, run `node scripts/gen-product-images.mjs` to rebuild `lib/product-images.ts`.
- Filters come from each category's `facets` list in `lib/products.ts`; every facet key must exist in that category's product `specs`.
- Contact details (phone, email, WhatsApp) are placeholders.
- Arabic language switch is not implemented yet.
