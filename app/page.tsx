import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { featuredProducts, promoProducts } from "@/lib/products";

function SectionHeading({ title, subtitle, eyebrow, dark }: { title: string; subtitle?: string; eyebrow?: string; dark?: boolean }) {
  return (
    <div>
      {eyebrow && (
        <span className={`mb-2 inline-block text-xs font-bold uppercase tracking-widest ${dark ? "text-sky-300/80" : "text-primary"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mb-2 text-3xl font-black uppercase tracking-tighter lg:text-5xl ${dark ? "text-white" : ""}`}>{title}</h2>
      {subtitle && <p className={`max-w-xl text-sm sm:text-base ${dark ? "text-white/60" : "text-on-surface-variant"}`}>{subtitle}</p>}
    </div>
  );
}

const PERKS = [
  { figure: "69", label: "Wilayas covered", text: "Home or stop-desk delivery, anywhere in Algeria." },
  { figure: "24–72h", label: "Delivery time", text: "Orders confirmed by phone and shipped fast." },
  { figure: "100%", label: "Original parts", text: "Official warranty on every product we sell." },
  { figure: "0 DA", label: "Paid upfront", text: "Cash on delivery — pay when it arrives." },
];

export default function HomePage() {
  const featured = featuredProducts();
  const promos = promoProducts();

  return (
    <>
      <Hero />
      <BrandMarquee />

      {/* Perks */}
      <section className="bg-surface-low pb-4 pt-10">
        <Reveal className="container-ifta">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-outline-variant/70 ring-1 ring-outline-variant/70 lg:grid-cols-4">
            {PERKS.map(({ figure, label, text }) => (
              <div key={label} className="bg-white px-5 py-6 sm:px-7 sm:py-8">
                <div className="font-display text-2xl font-black tracking-tight text-primary-deep sm:text-3xl">{figure}</div>
                <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{label}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant sm:text-[13px]">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Categories */}
      <section className="bg-surface-low py-16 lg:py-24">
        <div className="container-ifta">
          <Reveal className="mb-10 text-center lg:mb-14">
            <h2 className="text-3xl font-black uppercase tracking-tighter lg:text-5xl">Shop by category</h2>
          </Reveal>
          <CategoryGrid />
        </div>
      </section>

      {/* Build your PC */}
      <section className="bg-surface-low pb-16 lg:pb-24">
        <div className="container-ifta">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary shadow-card">
              <div className="pointer-events-none absolute -start-20 -top-20 size-80 rounded-full bg-primary-bright/30 blur-3xl" />
              <div className="grid items-center md:grid-cols-2">
                <div className="relative order-2 p-8 sm:p-10 md:order-1 lg:p-14">
                  <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-gold-light">PC Configurator</span>
                  <h2 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Build your dream PC
                  </h2>
                  <p className="mb-8 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                    Choose your components, check compatibility and see the total price instantly. Our team assembles and
                    tests it before delivery.
                  </p>
                  <Link href="/build-pc" className={buttonClass("white", "md", "group")}>
                    Start building <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="relative order-1 h-64 min-h-[320px] md:order-2 md:h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=75"
                    alt="Gaming PC build"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 hidden bg-gradient-to-r from-primary-deep via-primary-deep/30 to-transparent md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/20 to-transparent md:hidden" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-ifta">
          <Reveal className="mb-10 flex items-end justify-between lg:mb-14">
            <SectionHeading title="Featured products" subtitle="Hand-picked hardware our customers love right now." />
            <Link
              href="/shop"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary-deep sm:inline-flex"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-primary">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promos */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-[#0b2540] to-ink py-16 lg:py-24">
        <div className="pointer-events-none absolute start-1/4 top-0 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 end-10 size-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-ifta relative z-10">
          <Reveal className="mb-10 flex items-end justify-between lg:mb-14">
            <SectionHeading dark eyebrow="Limited time" title="Hot deals" subtitle="Special prices on top components while stock lasts." />
          </Reveal>
          <PromoCarousel products={promos} />
        </div>
      </section>
    </>
  );
}
