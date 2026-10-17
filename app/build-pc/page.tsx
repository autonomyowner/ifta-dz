import type { Metadata } from "next";
import { PcBuilder } from "@/components/build/PcBuilder";

export const metadata: Metadata = { title: "Build your PC" };

export default function BuildPcPage() {
  return (
    <div className="bg-surface-low">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary py-14 lg:py-20">
        <div className="pointer-events-none absolute -end-20 -top-20 size-96 rounded-full bg-primary-bright/30 blur-3xl" />
        <div className="container-ifta relative">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-light">PC Configurator</span>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter text-white lg:text-6xl">Build your PC</h1>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Pick a part for each slot. We assemble, cable-manage and stress-test every build before it ships.
          </p>
        </div>
      </section>
      <PcBuilder />
    </div>
  );
}
