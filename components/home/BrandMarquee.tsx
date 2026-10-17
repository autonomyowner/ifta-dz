import Image from "next/image";

const BRANDS = [
  ["NVIDIA", "nvidia"], ["AMD", "amd"], ["Intel", "intel"], ["ASUS", "asus"], ["MSI", "msibusiness"],
  ["Corsair", "corsair"], ["Razer", "razer"], ["Samsung", "samsung"], ["Kingston", "kingstontechnology"],
  ["HP", "hp"], ["Dell", "dell"], ["Lenovo", "lenovo"], ["Acer", "acer"], ["Cooler Master", "coolermaster"],
  ["Seagate", "seagate"], ["HyperX", "hyperx"], ["TP-Link", "tplink"],
] as const;

export function BrandMarquee() {
  const loop = [...BRANDS, ...BRANDS];
  return (
    <section className="pointer-events-none relative z-20 -mt-32 mb-4 md:-mt-36 md:mb-6">
      <div className="container-ifta pointer-events-auto">
        <div className="mb-5 flex items-center justify-center gap-3 md:mb-6">
          <span className="h-px w-10 bg-white/30" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-xs">
            Trusted brands
          </span>
          <span className="h-px w-10 bg-white/30" />
        </div>
        <div className="marquee-mask relative overflow-hidden py-2" dir="ltr">
          <div className="animate-marquee flex w-max items-center gap-12 md:gap-16">
            {loop.map(([name, file], i) => (
              <div
                key={`${name}-${i}`}
                title={name}
                className="relative flex h-10 w-[110px] shrink-0 items-center justify-center opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:h-12 md:w-[140px]"
              >
                <Image src={`/brands/${file}.svg`} alt={name} fill sizes="140px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
