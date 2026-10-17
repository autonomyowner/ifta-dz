"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const [sort, setSort] = useState<Sort>("featured");
  const [brands, setBrands] = useState<string[]>([]);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState(q);
  // Keep the input in sync when ?q= changes from elsewhere (e.g. header search)
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setQuery(q);
  }

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const allBrands = useMemo(() => [...new Set(PRODUCTS.map((p) => p.brand))].sort(), []);

  const list = useMemo(() => {
    const s = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!s || `${p.name} ${p.brand}`.toLowerCase().includes(s)) &&
        (brands.length === 0 || brands.includes(p.brand)) &&
        (!onlyPromo || p.promo)
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [cat, query, brands, onlyPromo, sort]);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const Filters = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Brands</h3>
        <div className="flex flex-wrap gap-2">
          {allBrands.map((b) => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all",
                brands.includes(b)
                  ? "bg-primary text-white ring-primary"
                  : "bg-white text-on-surface ring-outline-variant hover:ring-primary hover:text-primary"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-outline-variant/60">
        <span className="text-sm font-semibold">Deals only</span>
        <span
          className={cn("relative h-6 w-11 rounded-full transition-colors", onlyPromo ? "bg-primary" : "bg-outline-variant")}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            className={cn("absolute top-1 size-4 rounded-full bg-white shadow", onlyPromo ? "end-1" : "start-1")}
          />
        </span>
        <input type="checkbox" className="sr-only" checked={onlyPromo} onChange={(e) => setOnlyPromo(e.target.checked)} />
      </label>
      {(brands.length > 0 || onlyPromo || cat || q) && (
        <button
          onClick={() => {
            setBrands([]);
            setOnlyPromo(false);
            router.replace(pathname, { scroll: false });
          }}
          className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-ifta py-8 lg:py-12">
      {/* Category chips */}
      <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" data-lenis-prevent-touch>
        {[{ slug: "", name: "All" }, ...CATEGORIES].map((c) => {
          const active = cat === c.slug;
          return (
            <button
              key={c.slug || "all"}
              onClick={() => setParam("cat", c.slug)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active ? "text-white" : "bg-white text-on-surface ring-1 ring-outline-variant/60 hover:text-primary"
              )}
            >
              {active && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-glow"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{c.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">{Filters}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setParam("q", e.target.value);
                }}
                placeholder="Search products…"
                className="h-11 w-full rounded-xl bg-white ps-11 pe-4 text-sm ring-1 ring-outline-variant/60 outline-none transition focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold ring-1 ring-outline-variant/60 lg:hidden"
              >
                <SlidersHorizontal className="size-4" /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 flex-1 rounded-xl bg-white px-4 text-sm font-semibold ring-1 ring-outline-variant/60 outline-none focus:ring-2 focus:ring-primary sm:flex-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>

          <p className="mb-4 text-sm text-on-surface-variant">
            <span className="font-bold text-on-surface">{list.length}</span> product{list.length === 1 ? "" : "s"}
            {query && <> for “{query}”</>}
          </p>

          {list.length === 0 ? (
            <div className="rounded-2xl bg-white py-20 text-center ring-1 ring-outline-variant/50">
              <p className="text-lg font-bold">No products found</p>
              <p className="mt-1 text-sm text-on-surface-variant">Try another category or search term.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[80vh] overflow-y-auto rounded-t-3xl bg-surface-low p-6 lg:hidden"
              data-lenis-prevent
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-tight">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} className="rounded-full bg-white p-2 ring-1 ring-outline-variant/60" aria-label="Close">
                  <X className="size-4" />
                </button>
              </div>
              {Filters}
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-8 w-full rounded-xl bg-primary py-3.5 text-xs font-bold uppercase tracking-widest text-white"
              >
                Show {list.length} products
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
