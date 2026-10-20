import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, LayoutGrid } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/cn";
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
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className={cn(
                    "transition-transform duration-700 ease-out group-hover:scale-110",
                    // Product photos (white background) sit inside; scene photos fill.
                    cat.image.startsWith("/products/") ? "object-contain p-4" : "object-cover"
                  )}
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
      {/* Two shortcut tiles round the grid out to full rows of five. */}
      {[
        { href: "/shop", label: "All products", note: `${PRODUCTS.length} items`, icon: LayoutGrid, tone: "from-ink to-primary-deep" },
        { href: "/build-pc", label: "Build your PC", note: "Compatibility checked", icon: Cpu, tone: "from-primary-deep via-primary to-primary-bright" },
      ].map((t, i) => (
        <Reveal key={t.href} delay={((CATEGORIES.length + i) % 5) * 0.05}>
          <Link
            href={t.href}
            className="group relative block overflow-hidden rounded-2xl shadow-card ring-1 ring-outline-variant/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className={cn("relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br text-white", t.tone)}>
              <t.icon className="size-10 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <div className="flex items-center justify-between bg-white px-3 py-3">
              <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-primary">{t.label}</p>
              <span className="text-[11px] font-medium text-on-surface-variant">{t.note}</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
