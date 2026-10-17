import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {CATEGORIES.map((cat, i) => {
        const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
        return (
          <Reveal key={cat.slug} delay={(i % 5) * 0.05}>
            <Link
              href={`/shop?cat=${cat.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-outline-variant/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-primary/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute end-2 top-2 flex size-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-3">
                <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-primary">{cat.name}</p>
                <span className="text-[11px] font-medium text-on-surface-variant">{count}</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
