"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Cpu, Truck, ShieldCheck, Zap } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=2000&q=75";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.15]);

  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section ref={ref} className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      {/* Blue brand wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062a4a]/95 via-[#0b4f86]/75 to-[#0ea5e9]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.35),transparent_60%)]" />
      {/* Glow orbs */}
      <div className="animate-float pointer-events-none absolute -end-24 top-24 size-[420px] rounded-full bg-primary-bright/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 start-1/4 size-[380px] rounded-full bg-gold/20 blur-[120px]" />
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-ifta relative z-10 pb-44 pt-20 sm:pb-48 md:pb-56 md:pt-28">
        <div className="max-w-2xl">
          <motion.div
            {...item(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary-bright" />
            New season · RTX 50 series in stock
          </motion.div>

          <motion.h1
            {...item(0.08)}
            className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-sky-300 via-primary-bright to-sky-200 bg-clip-text font-display text-transparent">
              IFTA
            </span>{" "}
            Computer
          </motion.h1>

          <motion.p {...item(0.16)} className="mb-10 max-w-xl text-base leading-relaxed text-sky-100/80 md:text-lg">
            Your trusted partner for all your tech needs. Premium components, laptops and accessories delivered across all
            69 wilayas.
          </motion.p>

          <motion.div {...item(0.24)} className="flex flex-wrap items-center gap-3">
            <Link href="/shop" className={buttonClass("primary", "md", "group")}>
              Shop now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/build-pc" className={buttonClass("glass", "md")}>
              Build your PC <Cpu className="size-4" />
            </Link>
          </motion.div>

          <motion.div {...item(0.34)} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
            {[
              { icon: Truck, label: "69 wilayas delivery" },
              { icon: ShieldCheck, label: "Official warranty" },
              { icon: Zap, label: "Cash on delivery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-primary-bright" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface-low" />
    </section>
  );
}
