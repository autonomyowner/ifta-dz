"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  qty = 1,
  className,
  label = "Add to cart",
}: {
  product: Product;
  qty?: number;
  className?: string;
  label?: string;
}) {
  const add = useCart((s) => s.add);
  const inStock = product.stock > 0;

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={() => {
        add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0] }, qty);
        toast.success("Added to cart", { description: product.name });
      }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary-bright to-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_8px_20px_-8px_rgba(2,132,199,0.6)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]",
        className
      )}
    >
      <ShoppingCart className="size-3.5 shrink-0" />
      <span className="truncate">{inStock ? label : "Out of stock"}</span>
    </button>
  );
}
