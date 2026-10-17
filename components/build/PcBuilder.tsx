"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Check, Cpu, CircuitBoard, MemoryStick, Gamepad2, HardDrive, Power, ShoppingCart, type LucideIcon } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { formatDzd } from "@/lib/format";
import { cn } from "@/lib/cn";

type Slot = { id: string; label: string; icon: LucideIcon; options: Product[] };

const byCat = (c: string) => PRODUCTS.filter((p) => p.category === c);

const SLOTS: Slot[] = [
  { id: "cpu", label: "Processor", icon: Cpu, options: byCat("processors") },
  { id: "mobo", label: "Motherboard", icon: CircuitBoard, options: byCat("motherboards") },
  { id: "ram", label: "Memory", icon: MemoryStick, options: byCat("memory") },
  { id: "gpu", label: "Graphics card", icon: Gamepad2, options: byCat("graphics-cards") },
  { id: "storage", label: "Storage", icon: HardDrive, options: byCat("storage") },
  { id: "case", label: "Case & PSU", icon: Power, options: byCat("cases-power").filter((p) => p.brand !== "IFTA") },
];

const ASSEMBLY_FEE = 3000;

export function PcBuilder() {
  const [picked, setPicked] = useState<Record<string, Product>>({});
  const [open, setOpen] = useState<string>("cpu");
  const add = useCart((s) => s.add);

  const parts = Object.values(picked);
  const total = parts.reduce((s, p) => s + p.price, 0);
  const progress = Math.round((parts.length / SLOTS.length) * 100);

  const pick = (slotId: string, p: Product) => {
    setPicked((prev) => ({ ...prev, [slotId]: p }));
    const idx = SLOTS.findIndex((s) => s.id === slotId);
    const nextEmpty = SLOTS.slice(idx + 1).find((s) => !picked[s.id]);
    if (nextEmpty) setOpen(nextEmpty.id);
  };

  return (
    <div className="container-ifta grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:py-14">
      <div className="space-y-3">
        {SLOTS.map((slot) => {
          const sel = picked[slot.id];
          const isOpen = open === slot.id;
          const Icon = slot.icon;
          return (
            <div key={slot.id} className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-outline-variant/50">
              <button
                onClick={() => setOpen(isOpen ? "" : slot.id)}
                className="flex w-full items-center gap-4 p-4 text-start sm:p-5"
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                    sel ? "bg-primary text-white" : "bg-primary-fixed text-primary"
                  )}
                >
                  {sel ? <Check className="size-5" /> : <Icon className="size-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">{slot.label}</div>
                  <div className="truncate text-sm font-bold">{sel ? sel.name : "Choose a component"}</div>
                </div>
                {sel && <div className="hidden text-sm font-black text-primary sm:block">{formatDzd(sel.price)}</div>}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="grid grid-cols-2 gap-3 border-t border-outline-variant/50 p-3 sm:gap-4 sm:p-5 xl:grid-cols-3">
                      {slot.options.map((p) => {
                        const active = sel?.slug === p.slug;
                        return (
                          <button
                            key={p.slug}
                            onClick={() => pick(slot.id, p)}
                            className={cn(
                              "group relative flex flex-col overflow-hidden rounded-2xl bg-white text-start ring-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
                              active ? "shadow-card-hover ring-primary" : "shadow-card ring-outline-variant/40 hover:ring-primary/40"
                            )}
                          >
                            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-container">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="(max-width: 1280px) 45vw, 260px"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                              />
                              <span className="absolute start-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur sm:start-3 sm:top-3 sm:text-[10px]">
                                {p.brand}
                              </span>
                              <AnimatePresence>
                                {active && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                                    className="absolute end-2 top-2 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-glow sm:end-3 sm:top-3"
                                  >
                                    <Check className="size-4" strokeWidth={3} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>
                            <div className="flex w-full flex-1 flex-col p-3 sm:p-4">
                              <div className="line-clamp-2 min-h-[2.6em] text-[12px] font-bold uppercase leading-snug tracking-tight sm:text-[13px]">
                                {p.name}
                              </div>
                              <div className="mt-2 text-base font-black text-primary sm:text-lg">{formatDzd(p.price)}</div>
                              <div
                                className={cn(
                                  "mt-3 rounded-lg py-2 text-center text-[10px] font-bold uppercase tracking-widest transition-colors",
                                  active ? "bg-primary text-white" : "bg-surface-low text-on-surface-variant group-hover:bg-primary-fixed group-hover:text-primary"
                                )}
                              >
                                {active ? "Selected" : "Select"}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <aside className="h-fit rounded-2xl bg-ink p-6 text-white shadow-card lg:sticky lg:top-24">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-gold-light">Your build</h2>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-bright"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <div className="mt-2 text-xs text-white/60">
          {parts.length}/{SLOTS.length} components selected
        </div>
        <ul className="mt-5 space-y-2 text-sm">
          {SLOTS.map((s) => (
            <li key={s.id} className="flex justify-between gap-3">
              <span className="text-white/60">{s.label}</span>
              <span className="text-end font-semibold">{picked[s.id] ? formatDzd(picked[s.id].price) : "—"}</span>
            </li>
          ))}
          <li className="flex justify-between gap-3">
            <span className="text-white/60">Assembly & testing</span>
            <span className="font-semibold">{formatDzd(ASSEMBLY_FEE)}</span>
          </li>
        </ul>
        <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-5">
          <span className="font-bold">Total</span>
          <span className="text-3xl font-black text-sky-300">{formatDzd(total + (parts.length ? ASSEMBLY_FEE : 0))}</span>
        </div>
        <button
          disabled={parts.length === 0}
          onClick={() => {
            parts.forEach((p) => add({ slug: p.slug, name: p.name, price: p.price, image: p.images[0] }));
            toast.success("Build added to cart", { description: `${parts.length} components` });
          }}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary-bright to-primary text-[11px] font-bold uppercase tracking-widest shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-40 disabled:hover:translate-y-0"
        >
          <ShoppingCart className="size-4" /> Add build to cart
        </button>
      </aside>
    </div>
  );
}
