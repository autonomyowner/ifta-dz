"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Check, ChevronDown, Home, Minus, Plus, Zap } from "lucide-react";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatDzd } from "@/lib/format";
import { SHIPPING, WILAYAS } from "@/lib/wilayas";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

const field =
  "h-12 w-full rounded-xl bg-surface-low px-4 text-sm ring-1 ring-outline-variant/70 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary";

export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [delivery, setDelivery] = useState<"home" | "desk">("home");
  const [orderId, setOrderId] = useState<string | null>(null);
  const inStock = product.stock > 0;

  const subtotal = product.price * qty;
  const shipping = SHIPPING[delivery];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-outline-variant/50">
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <span className="size-2 rounded-full bg-emerald-500" />
          {inStock ? `In stock · ${product.stock} available` : "Out of stock"}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-12 items-center justify-between rounded-xl ring-1 ring-outline-variant sm:w-36">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-full w-11 items-center justify-center hover:text-primary" aria-label="Decrease">
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              className="flex h-full w-11 items-center justify-center hover:text-primary"
              aria-label="Increase"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <AddToCartButton product={product} qty={qty} className="h-12 flex-1 text-[11px]" />
        </div>
        <button
          disabled={!inStock}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={cn(
            "mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 disabled:opacity-50",
            open ? "bg-primary-deep" : "bg-ink hover:bg-primary-deep"
          )}
        >
          <Zap className="size-4 text-gold-light" /> Buy now · Cash on delivery
          <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-outline-variant/60 bg-primary-fixed/30 p-5">
              <AnimatePresence mode="wait" initial={false}>
                {orderId ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-bright to-primary text-white shadow-glow"
                    >
                      <Check className="size-8" strokeWidth={3} />
                    </motion.div>
                    <div className="text-lg font-black uppercase tracking-tight">Order confirmed!</div>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      Order <span className="font-bold text-on-surface">#{orderId}</span> received. We&apos;ll call you to confirm delivery.
                    </p>
                    <button
                      onClick={() => {
                        setOrderId(null);
                        setOpen(false);
                      }}
                      className="mt-4 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOrderId(`IFTA-${Math.floor(100000 + Math.random() * 900000)}`);
                    }}
                    className="space-y-3"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-widest">Quick order</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input required placeholder="Full name" autoComplete="name" className={field} />
                      <input required type="tel" placeholder="Phone (05 / 06 / 07…)" pattern="0[5-7][0-9]{8}" autoComplete="tel" className={field} />
                      <select required defaultValue="" className={field}>
                        <option value="" disabled>Select wilaya</option>
                        {WILAYAS.map((w, i) => (
                          <option key={w} value={w}>
                            {String(i + 1).padStart(2, "0")} — {w}
                          </option>
                        ))}
                      </select>
                      <input required placeholder="Commune" className={field} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "home" as const, icon: Home, label: "Home", price: SHIPPING.home },
                        { id: "desk" as const, icon: Building2, label: "Stop desk", price: SHIPPING.desk },
                      ].map(({ id, icon: Icon, label, price }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => setDelivery(id)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl bg-white p-3 text-start ring-2 transition-all",
                            delivery === id ? "ring-primary" : "ring-outline-variant/50 hover:ring-primary/40"
                          )}
                        >
                          <Icon className={cn("size-4 shrink-0", delivery === id ? "text-primary" : "text-on-surface-variant")} />
                          <div className="min-w-0">
                            <div className="text-xs font-bold">{label}</div>
                            <div className="text-[11px] text-on-surface-variant">{formatDzd(price)}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="space-y-1.5 rounded-xl bg-white p-4 text-sm ring-1 ring-outline-variant/50">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Product × {qty}</span>
                        <span className="font-semibold">{formatDzd(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Delivery</span>
                        <span className="font-semibold">{formatDzd(shipping)}</span>
                      </div>
                      <div className="flex items-baseline justify-between border-t border-outline-variant/50 pt-2">
                        <span className="font-bold">Total</span>
                        <span className="text-xl font-black text-primary">{formatDzd(subtotal + shipping)}</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary-bright to-primary text-[11px] font-bold uppercase tracking-widest text-white shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110"
                    >
                      <Check className="size-4" /> Confirm order
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
