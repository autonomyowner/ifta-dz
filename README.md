# IFTA Computer — Demo storefront

Demo preview of a PC hardware storefront for IFTA Computer (ifta-dz.com), built by the [sitedz.com](https://sitedz.com) team.

Live: https://ifta-dz.vercel.app

## Stack

- Next.js 16 (App Router, Cache Components) · React 19 · TypeScript
- Tailwind CSS 4
- Motion (animations), Lenis (smooth scroll), Embla (carousel)
- Zustand (persisted cart), Sonner (toasts), Lucide (icons)

## Pages

Home · Shop (filters, search, sort) · Product (gallery, specs, inline "Buy now" order form) · Cart · Checkout (69 wilayas, home / stop-desk delivery) · Build PC · Services · Contact

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Demo notes

- Catalog is static data in `lib/products.ts` — no backend; orders and messages are not saved.
- Product photos are Unsplash placeholders.
- Contact details (phone, email, WhatsApp) are placeholders.
- Arabic language switch is not implemented yet.
