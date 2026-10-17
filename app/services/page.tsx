import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Cpu, Truck, ShieldCheck, Headphones, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Services" };

const SERVICES = [
  { icon: Cpu, title: "Custom PC assembly", text: "Professional assembly, cable management and stress-testing for every build." },
  { icon: Wrench, title: "Repair & maintenance", text: "Diagnostics, part replacement, cleaning and thermal paste renewal." },
  { icon: Sparkles, title: "Upgrades", text: "RAM, SSD and GPU upgrades to give your machine a second life." },
  { icon: Truck, title: "Nationwide delivery", text: "Fast, secure shipping to all 69 wilayas with home or desk delivery." },
  { icon: ShieldCheck, title: "Official warranty", text: "Genuine products with manufacturer warranty and after-sales follow-up." },
  { icon: Headphones, title: "Expert advice", text: "Not sure what to buy? Our technicians help you choose the right setup." },
];

export default function ServicesPage() {
  return (
    <div className="bg-surface-low">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary py-14 lg:py-20">
        <div className="container-ifta relative">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-light">What we do</span>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter text-white lg:text-6xl">Our services</h1>
        </div>
      </section>
      <div className="container-ifta py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl bg-white p-7 shadow-card ring-1 ring-outline-variant/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/contact" className={buttonClass("primary", "md")}>
            Contact us <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
