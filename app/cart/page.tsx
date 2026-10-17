"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { cartSubtotal, useCart, useMounted } from "@/lib/cart-store";
import { formatDzd } from "@/lib/format";
import { buttonClass } from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQty, remove } = useCart();
  const mounted = useMounted();

  if (!mounted) return <div className="min-h-[60vh]" />;

  if (items.length === 0) {
    return (
      <div className="container-ifta flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <ShoppingCart className="size-9" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Your cart is empty</h1>
        <p className="mt-2 text-on-surface-variant">Browse our catalog and find the perfect hardware.</p>
        <Link href="/shop" className={buttonClass("primary", "md", "mt-8")}>
          Start shopping <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);

  return (
    <div className="bg-surface-low">
      <div className="container-ifta py-10 lg:py-16">
        <h1 className="mb-8 text-3xl font-black uppercase tracking-tighter lg:text-5xl">Your cart</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-card ring-1 ring-outline-variant/50 sm:p-4"
                >
                  <Link href={`/product/${item.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-container sm:size-24">
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-bold uppercase tracking-tight hover:text-primary">
                      {item.name}
                    </Link>
                    <div className="mt-1 text-sm font-black text-primary">{formatDzd(item.price)}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex h-9 items-center rounded-lg ring-1 ring-outline-variant">
                        <button onClick={() => updateQty(item.slug, item.qty - 1)} className="flex h-full w-8 items-center justify-center hover:text-primary" aria-label="Decrease">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold tabular-nums">{item.qty}</span>
                        <button onClick={() => updateQty(item.slug, item.qty + 1)} className="flex h-full w-8 items-center justify-center hover:text-primary" aria-label="Increase">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button onClick={() => remove(item.slug)} className="rounded-lg p-2 text-on-surface-variant hover:bg-rose-50 hover:text-rose-600" aria-label="Remove">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div className="hidden text-end font-black sm:block">{formatDzd(item.price * item.qty)}</div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-card ring-1 ring-outline-variant/50 lg:sticky lg:top-24">
            <h2 className="mb-5 text-[11px] font-bold uppercase tracking-widest">Order summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-bold">{formatDzd(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Delivery</span>
                <span className="text-on-surface-variant">Calculated at checkout</span>
              </div>
            </div>
            <div className="my-5 h-px bg-outline-variant/60" />
            <div className="flex items-baseline justify-between">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-black text-primary">{formatDzd(subtotal)}</span>
            </div>
            <Link href="/checkout" className={buttonClass("primary", "md", "mt-6 w-full")}>
              Checkout <ArrowRight className="size-4" />
            </Link>
            <Link href="/shop" className="mt-3 block text-center text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
