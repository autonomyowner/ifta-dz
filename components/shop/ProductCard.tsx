import Image from "next/image";
import Link from "next/link";
import { formatDzd, discountPercent } from "@/lib/format";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const discount = discountPercent(product.price, product.comparePrice);
  const inStock = product.stock > 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-outline-variant/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-primary/30">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-surface-low">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute start-2 top-2 sm:start-3 sm:top-3">
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm backdrop-blur sm:px-3 sm:py-1 sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                In stock
              </span>
            ) : (
              <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Sold out
              </span>
            )}
          </div>

          <div className="absolute end-2 top-2 flex flex-col items-end gap-1.5 sm:end-3 sm:top-3">
            {discount !== null && (
              <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-black text-white shadow">
                −{discount}%
              </span>
            )}
            <span className="hidden rounded-full bg-ink/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur sm:inline-flex">
              {product.brand}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.6em] text-[12px] font-bold uppercase leading-snug tracking-tight text-on-surface transition-colors group-hover:text-primary sm:text-[14px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 sm:mt-3">
          <span className="text-base font-black tracking-tight text-primary sm:text-xl">
            {formatDzd(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-xs text-on-surface-variant/70 line-through">
              {formatDzd(product.comparePrice)}
            </span>
          )}
        </div>
        <AddToCartButton product={product} className="mt-3 sm:mt-4" />
      </div>
    </div>
  );
}
