"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatDzd } from "@/lib/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setQ("");
  }

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS.filter((p) => p.featured).slice(0, 5);
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(s)
    ).slice(0, 6);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/50 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-outline-variant/50"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
                onClose();
              }}
              className="flex items-center gap-3 border-b border-outline-variant/60 px-5"
            >
              <Search className="size-5 text-primary" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search GPUs, laptops, brands…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-on-surface-variant/60"
              />
              <button type="button" onClick={onClose} aria-label="Close search" className="rounded-md p-1 hover:bg-surface-container">
                <X className="size-4" />
              </button>
            </form>
            <div className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular"}
              </div>
              {results.map((p) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-low"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-outline-variant/50">
                    <Image src={p.images[0]} alt="" fill sizes="48px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold group-hover:text-primary">{p.name}</div>
                    <div className="text-xs text-on-surface-variant">{p.brand}</div>
                  </div>
                  <div className="text-sm font-bold text-primary">{formatDzd(p.price)}</div>
                </Link>
              ))}
              {q && results.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-on-surface-variant">No products match “{q}”.</div>
              )}
              {q && results.length > 0 && (
                <Link
                  href={`/shop?q=${encodeURIComponent(q.trim())}`}
                  onClick={onClose}
                  className="mt-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/5"
                >
                  See all results <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
