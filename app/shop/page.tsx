import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopView } from "@/components/shop/ShopView";

export const metadata: Metadata = { title: "Products" };

export default function ShopPage() {
  return (
    <div className="bg-surface-low">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary py-14 lg:py-20">
        <div className="pointer-events-none absolute -end-20 -top-20 size-96 rounded-full bg-primary-bright/30 blur-3xl" />
        <div className="container-ifta relative">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-light">IFTA Store</span>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter text-white lg:text-6xl">All products</h1>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Components, laptops, monitors and accessories from the brands you trust.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="container-ifta py-24 text-center text-on-surface-variant">Loading…</div>}>
        <ShopView />
      </Suspense>
    </div>
  );
}
