"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, facetValues, getCategory } from "@/lib/products";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

// Brands listed before "Show all"; the full list on All products is long.
const BRANDS_SHOWN = 12;

const PRICE_RANGES = [
  { id: "u30", label: "Under 30 000 DA", min: 0, max: 30000 },
  { id: "30-100", label: "30 000 – 100 000 DA", min: 30000, max: 100000 },
  { id: "100-250", label: "100 000 – 250 000 DA", min: 100000, max: 250000 },
  { id: "250", label: "Over 250 000 DA", min: 250000, max: Infinity },
] as const;

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">{title}</h3>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all",
        active
          ? "bg-primary text-white ring-primary"
          : "bg-white text-on-surface ring-outline-variant hover:text-primary hover:ring-primary"
      )}
    >
      {children}
    </button>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-outline-variant/60">
      <span className="text-sm font-semibold">{label}</span>
      <span className={cn("relative h-6 w-11 rounded-full transition-colors", checked ? "bg-primary" : "bg-outline-variant")}>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          className={cn("absolute top-1 size-4 rounded-full bg-white shadow", checked ? "end-1" : "start-1")}
        />
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

export function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const category = getCategory(cat);

  const [sort, setSort] = useState<Sort>("featured");
  const [brands, setBrands] = useState<string[]>([]);
  // Selected values per spec facet, e.g. { Socket: ["AM5"] }.
  const [specs, setSpecs] = useState<Record<string, string[]>>({});
  const [price, setPrice] = useState("");
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [allBrandsShown, setAllBrandsShown] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState(q);
  // Keep the input in sync when ?q= changes from elsewhere (e.g. header search)
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setQuery(q);
  }
  // Brand and spec filters belong to one category; drop them on switching.
  const [prevCat, setPrevCat] = useState(cat);
  if (cat !== prevCat) {
    setPrevCat(cat);
    setBrands([]);
    setSpecs({});
  }

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const inCategory = useMemo(() => PRODUCTS.filter((p) => !cat || p.category === cat), [cat]);
  const allBrands = useMemo(() => [...new Set(inCategory.map((p) => p.brand))].sort(), [inCategory]);
  const facets = useMemo(
    () => (category?.facets ?? []).map((key) => ({ key, values: facetValues(inCategory, key) })).filter((f) => f.values.length > 1),
    [category, inCategory]
  );

  const list = useMemo(() => {
    const s = query.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.id === price);
    const filtered = inCategory.filter(
      (p) =>
        (!s || `${p.name} ${p.brand} ${Object.values(p.specs).join(" ")}`.toLowerCase().includes(s)) &&
        (brands.length === 0 || brands.includes(p.brand)) &&
        Object.entries(specs).every(([k, vals]) => vals.length === 0 || vals.includes(p.specs[k])) &&
        (!range || (p.price >= range.min && p.price < range.max)) &&
        (!onlyPromo || p.promo) &&
        (!onlyInStock || p.stock > 0)
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [inCategory, query, brands, specs, price, onlyPromo, onlyInStock, sort]);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  const toggleSpec = (key: string, value: string) =>
    setSpecs((prev) => {
      const cur = prev[key] ?? [];
      return { ...prev, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  // Everything currently narrowing the list, as removable chips.
  const active: { label: string; clear: () => void }[] = [
    ...brands.map((b) => ({ label: b, clear: () => toggleBrand(b) })),
    ...Object.entries(specs).flatMap(([k, vals]) => vals.map((v) => ({ label: `${k}: ${v}`, clear: () => toggleSpec(k, v) }))),
    ...(price ? [{ label: PRICE_RANGES.find((r) => r.id === price)!.label, clear: () => setPrice("") }] : []),
    ...(onlyInStock ? [{ label: "In stock", clear: () => setOnlyInStock(false) }] : []),
    ...(onlyPromo ? [{ label: "Deals", clear: () => setOnlyPromo(false) }] : []),
  ];
  const clearAll = () => {
    setBrands([]);
    setSpecs({});
    setPrice("");
    setOnlyPromo(false);
    setOnlyInStock(false);
  };

  const Filters = (
    <div className="space-y-7">
      {facets.map((f) => (
        <FilterGroup key={f.key} title={f.key}>
          <div className="flex flex-wrap gap-2">
            {f.values.map((v) => (
              <Chip key={v} active={!!specs[f.key]?.includes(v)} onClick={() => toggleSpec(f.key, v)}>
                {v}
              </Chip>
            ))}
          </div>
        </FilterGroup>
      ))}
      <FilterGroup title="Brand">
        <div className="flex flex-wrap gap-2">
          {(allBrandsShown ? allBrands : allBrands.slice(0, BRANDS_SHOWN)).map((b) => (
            <Chip key={b} active={brands.includes(b)} onClick={() => toggleBrand(b)}>
              {b}
            </Chip>
          ))}
        </div>
        {allBrands.length > BRANDS_SHOWN && (
          <button
            onClick={() => setAllBrandsShown((v) => !v)}
            className="mt-2 text-xs font-bold text-primary hover:underline"
          >
            {allBrandsShown ? "Show fewer" : `Show all ${allBrands.length} brands`}
          </button>
        )}
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="space-y-1">
          {PRICE_RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setPrice(price === r.id ? "" : r.id)}
              aria-pressed={price === r.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-start text-sm transition-colors",
                price === r.id ? "font-semibold text-primary" : "text-on-surface hover:text-primary"
              )}
            >
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full ring-1",
                  price === r.id ? "ring-primary" : "ring-outline-variant"
                )}
              >
                {price === r.id && <span className="size-2 rounded-full bg-primary" />}
              </span>
              {r.label}
            </button>
          ))}
        </div>
      </FilterGroup>
      <div className="space-y-2">
        <Toggle label="In stock only" checked={onlyInStock} onChange={setOnlyInStock} />
        <Toggle label="Deals only" checked={onlyPromo} onChange={setOnlyPromo} />
      </div>
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary py-10 lg:py-14">
        <div className="pointer-events-none absolute -end-20 -top-20 size-96 rounded-full bg-primary-bright/30 blur-3xl" />
        <div className="container-ifta relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="size-3" />
            {category ? (
              <>
                <Link href="/shop" className="hover:text-white">Products</Link>
                <ChevronRight className="size-3" />
                <span className="text-gold-light">{category.name}</span>
              </>
            ) : (
              <span className="text-gold-light">Products</span>
            )}
          </nav>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl lg:text-5xl">
            {category?.name ?? "All products"}
          </h1>
          <p className="mt-2 text-sm text-white/70">
            {inCategory.length} products · Delivery to all 69 wilayas · Cash on delivery
          </p>
        </div>
      </section>

      <div className="container-ifta py-8 lg:py-12">
        {/* Category chips */}
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" data-lenis-prevent-touch>
          {[{ slug: "", name: "All" }, ...CATEGORIES].map((c) => {
            const isActive = cat === c.slug;
            return (
              <button
                key={c.slug || "all"}
                onClick={() => setParam("cat", c.slug)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-white" : "bg-white text-on-surface ring-1 ring-outline-variant/60 hover:text-primary"
                )}
              >
                {isActive && (
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
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pe-2" data-lenis-prevent>
              {Filters}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setParam("q", e.target.value);
                  }}
                  placeholder={category ? `Search ${category.name.toLowerCase()}…` : "Search products, brands, specs…"}
                  className="h-11 w-full rounded-xl bg-white ps-11 pe-4 text-sm ring-1 ring-outline-variant/60 outline-none transition focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold ring-1 ring-outline-variant/60 lg:hidden"
                >
                  <SlidersHorizontal className="size-4" /> Filters
                  {active.length > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {active.length}
                    </span>
                  )}
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  aria-label="Sort"
                  className="h-11 flex-1 rounded-xl bg-white px-4 text-sm font-semibold ring-1 ring-outline-variant/60 outline-none focus:ring-2 focus:ring-primary sm:flex-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
              <span>
                <span className="font-bold text-on-surface">{list.length}</span> product{list.length === 1 ? "" : "s"}
                {query && <> for “{query}”</>}
              </span>
              {active.map((a) => (
                <button
                  key={a.label}
                  onClick={a.clear}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-2.5 py-1 text-xs font-semibold text-primary-deep hover:bg-primary-fixed-dim"
                >
                  {a.label} <X className="size-3" />
                </button>
              ))}
              {active.length > 1 && (
                <button onClick={clearAll} className="text-xs font-bold text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>

            {list.length === 0 ? (
              <div className="rounded-2xl bg-white py-20 text-center ring-1 ring-outline-variant/50">
                <p className="text-lg font-bold">No products match</p>
                <p className="mt-1 text-sm text-on-surface-variant">Try removing a filter or another search term.</p>
                {active.length > 0 && (
                  <button onClick={clearAll} className="mt-4 text-sm font-bold text-primary hover:underline">
                    Clear filters
                  </button>
                )}
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
    </>
  );
}
