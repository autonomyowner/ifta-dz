"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { discountPercent, formatDzd } from "@/lib/format";
import type { Product } from "@/lib/products";

export function PromoCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    Autoplay({ delay: 2800, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  // Loop mode: prev/next are always available
  const navBtn =
    "hidden md:flex absolute -top-16 z-20 size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white hover:text-primary";

  return (
    <div className="relative">
      <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous" className={`${navBtn} end-14`}>
        <ArrowLeft className="size-4" />
      </button>
      <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next" className={`${navBtn} end-2`}>
        <ArrowRight className="size-4" />
      </button>

      <div
        ref={emblaRef}
        className="marquee-mask -mx-4 cursor-grab overflow-hidden px-4 py-2 active:cursor-grabbing sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
      >
        <div className="flex touch-pan-y items-stretch gap-5 md:gap-6">
          {products.map((p) => {
            const discount = discountPercent(p.price, p.comparePrice);
            return (
              <div
                key={p.slug}
                className="group/card relative flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:ring-primary-bright/50 sm:w-[280px] md:w-[300px]"
              >
                <Link href={`/product/${p.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="300px"
                      draggable={false}
                      className="pointer-events-none object-contain p-8 transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                      <span className="size-1.5 animate-pulse rounded-full bg-white" />
                      Promo
                    </div>
                    {discount !== null && (
                      <div className="absolute end-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-black text-white shadow-lg">
                        −{discount}%
                      </div>
                    )}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gold-light/70">{p.brand}</div>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="line-clamp-2 min-h-[2.6em] text-[14px] font-bold uppercase leading-snug tracking-tight text-white transition-colors group-hover/card:text-sky-300">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-black tracking-tight text-sky-300">{formatDzd(p.price)}</span>
                    {p.comparePrice && <span className="text-xs text-white/40 line-through">{formatDzd(p.comparePrice)}</span>}
                  </div>
                  <AddToCartButton product={p} className="mt-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
