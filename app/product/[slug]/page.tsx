import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Truck, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";
import { PRODUCTS, getCategory, getProduct } from "@/lib/products";
import { discountPercent, formatDzd } from "@/lib/format";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const discount = discountPercent(product.price, product.comparePrice);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const more = related.length < 4 ? PRODUCTS.filter((p) => p.featured && p.slug !== product.slug && !related.includes(p)).slice(0, 4 - related.length) : [];

  return (
    <article className="bg-surface">
      <div className="container-ifta py-8 lg:py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-on-surface-variant">
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="size-3" />
          {category && (
            <>
              <Link href={`/shop?cat=${category.slug}`} className="hover:text-primary">{category.name}</Link>
              <ChevronRight className="size-3" />
            </>
          )}
          <span className="truncate text-primary">{product.brand}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} discount={discount} />

          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gold">{product.brand}</div>
            <h1 className="mb-5 text-3xl font-black uppercase leading-[1.05] tracking-tighter lg:text-5xl">{product.name}</h1>
            <div className="mb-6 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-black text-primary">{formatDzd(product.price)}</span>
              {product.comparePrice && (
                <span className="text-lg text-on-surface-variant/70 line-through">{formatDzd(product.comparePrice)}</span>
              )}
              {discount !== null && (
                <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-black text-white">Save {discount}%</span>
              )}
            </div>
            <p className="mb-8 leading-relaxed text-on-surface-variant">{product.description}</p>

            <PurchasePanel product={product} />

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Truck, label: "69 wilayas" },
                { icon: ShieldCheck, label: "Warranty" },
                { icon: CreditCard, label: "Pay on delivery" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl bg-white px-2 py-4 ring-1 ring-outline-variant/50">
                  <Icon className="mx-auto mb-1.5 size-5 text-primary" />
                  <div className="text-[11px] font-semibold">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest">Specifications</h2>
              <dl className="divide-y divide-outline-variant/50 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-outline-variant/50">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                    <dt className="text-on-surface-variant">{k}</dt>
                    <dd className="text-end font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {related.length + more.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <Reveal className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tighter lg:text-4xl">You may also like</h2>
              <Link href={`/shop?cat=${product.category}`} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:underline">
                View all
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {[...related, ...more].map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
