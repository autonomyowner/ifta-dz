"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, name, discount }: { images: string[]; name: string; discount: number | null }) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-outline-variant/50">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image src={images[active]} alt={name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-8 sm:p-12" />
          </motion.div>
        </AnimatePresence>
        {discount !== null && (
          <span className="absolute start-5 top-5 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-black text-white shadow-lg">
            −{discount}%
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl bg-white ring-2 transition-all",
                i === active ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`Image ${i + 1}`}
            >
              <Image src={img} alt="" fill sizes="120px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
