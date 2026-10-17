"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Home, Building2, PackageCheck } from "lucide-react";
import { cartSubtotal, useCart, useMounted } from "@/lib/cart-store";
import { formatDzd } from "@/lib/format";
import { SHIPPING, WILAYAS } from "@/lib/wilayas";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const field =
  "h-12 w-full rounded-xl bg-white px-4 text-sm ring-1 ring-outline-variant/70 outline-none transition focus:ring-2 focus:ring-primary";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const mounted = useMounted();
  const [delivery, setDelivery] = useState<"home" | "desk">("home");
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!mounted) return <div className="min-h-[60vh]" />;

  if (orderId) {
    return (
      <div className="container-ifta flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mb-6 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-bright to-primary text-white shadow-glow"
        >
          <Check className="size-12" strokeWidth={3} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-3xl font-black uppercase tracking-tighter lg:text-4xl">Order confirmed!</h1>
          <p className="mt-3 text-on-surface-variant">
            Order <span className="font-bold text-on-surface">#{orderId}</span> received. Our team will call you to confirm delivery.
          </p>
          <Link href="/shop" className={buttonClass("primary", "md", "mt-8")}>
            Continue shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-ifta flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-black uppercase">Nothing to checkout</h1>
        <Link href="/shop" className={buttonClass("primary", "md", "mt-6")}>Go to shop</Link>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);
  const shipping = SHIPPING[delivery];

  return (
    <div className="bg-surface-low">
      <div className="container-ifta py-10 lg:py-16">
        <h1 className="mb-8 text-3xl font-black uppercase tracking-tighter lg:text-5xl">Checkout</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOrderId(`IFTA-${Math.floor(100000 + Math.random() * 900000)}`);
            clear();
            window.scrollTo({ top: 0 });
          }}
          className="grid gap-8 lg:grid-cols-[1fr_400px]"
        >
          <div className="space-y-6 rounded-2xl bg-white p-6 shadow-card ring-1 ring-outline-variant/50 lg:p-8">
            <h2 className="text-[11px] font-bold uppercase tracking-widest">Delivery information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className={field} />
              <input required type="tel" placeholder="Phone (05 / 06 / 07…)" pattern="0[5-7][0-9]{8}" className={field} />
              <select required defaultValue="" className={field}>
                <option value="" disabled>Select wilaya</option>
                {WILAYAS.map((w, i) => (
                  <option key={w} value={w}>
                    {String(i + 1).padStart(2, "0")} — {w}
                  </option>
                ))}
              </select>
              <input required placeholder="Commune" className={field} />
              <input placeholder="Address (optional for desk delivery)" className={cn(field, "sm:col-span-2")} />
            </div>

            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest">Delivery method</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "home" as const, icon: Home, label: "Home delivery", price: SHIPPING.home },
                  { id: "desk" as const, icon: Building2, label: "Stop desk pickup", price: SHIPPING.desk },
                ].map(({ id, icon: Icon, label, price }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setDelivery(id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl p-4 text-start ring-2 transition-all",
                      delivery === id ? "bg-primary-fixed/60 ring-primary" : "ring-outline-variant/60 hover:ring-primary/40"
                    )}
                  >
                    <Icon className={cn("size-5", delivery === id ? "text-primary" : "text-on-surface-variant")} />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{label}</div>
                      <div className="text-xs text-on-surface-variant">{formatDzd(price)}</div>
                    </div>
                    {delivery === id && <Check className="size-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface-low p-4 text-sm">
              <PackageCheck className="size-5 shrink-0 text-primary" />
              Payment: <span className="font-bold">Cash on delivery</span>
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-card ring-1 ring-outline-variant/50 lg:sticky lg:top-24">
            <h2 className="mb-5 text-[11px] font-bold uppercase tracking-widest">Your order</h2>
            <ul className="mb-5 space-y-3">
              {items.map((i) => (
                <li key={i.slug} className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <Image src={i.image} alt="" fill sizes="56px" className="object-cover" />
                    <span className="absolute -end-0 -top-0 rounded-bl-lg bg-primary px-1.5 text-[10px] font-bold text-white">{i.qty}</span>
                  </div>
                  <span className="line-clamp-2 flex-1 text-xs font-semibold">{i.name}</span>
                  <span className="text-xs font-bold">{formatDzd(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-outline-variant/60 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-on-surface-variant">Subtotal</span><span className="font-semibold">{formatDzd(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Delivery</span><span className="font-semibold">{formatDzd(shipping)}</span></div>
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-outline-variant/60 pt-4">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-black text-primary">{formatDzd(subtotal + shipping)}</span>
            </div>
            <button type="submit" className={buttonClass("primary", "md", "mt-6 w-full")}>
              Confirm order
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}
