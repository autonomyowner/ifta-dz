import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopView } from "@/components/shop/ShopView";

export const metadata: Metadata = { title: "Products" };

export default function ShopPage() {
  return (
    <div className="bg-surface-low">
      <Suspense
        fallback={
          <section className="bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary py-10 lg:py-14">
            <div className="container-ifta">
              <h1 className="mt-7 text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl lg:text-5xl">Products</h1>
            </div>
          </section>
        }
      >
        <ShopView />
      </Suspense>
    </div>
  );
}
