"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingCart, X, ChevronRight, Cpu } from "lucide-react";
import { cartCount, useCart, useMounted } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { SearchOverlay } from "./SearchOverlay";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Products" },
  { href: "/build-pc", label: "Build PC" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((s) => s.items);
  const mounted = useMounted();
  const count = mounted ? cartCount(items) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays when the route changes
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/85 shadow-[0_1px_0_rgba(11,27,43,0.06)] backdrop-blur-xl" : "bg-white"
        )}
      >
        <nav className="flex h-16 w-full items-center justify-between px-4 lg:h-[72px] lg:px-8">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-lg hover:bg-surface-container lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <Link href="/" aria-label="IFTA Computer — Home" className="flex items-center rounded-lg px-2 py-1.5">
              <Image src="/logo.png" alt="IFTA Computer" width={147} height={42} priority className="h-9 w-auto lg:h-10" />
            </Link>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors",
                  isActive(l.href) ? "text-primary" : "text-gray-700 hover:bg-surface-low hover:text-gray-900"
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button className="hidden px-2 text-sm font-semibold text-primary sm:block" aria-label="Arabic">
              عربي
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex size-10 items-center justify-center rounded-lg hover:bg-surface-container"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/cart"
              className="relative flex size-10 items-center justify-center rounded-lg hover:bg-surface-container"
              aria-label="Cart"
            >
              <ShoppingCart className="size-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 20 }}
                    className="absolute -end-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-bright px-1 text-[10px] font-bold text-white ring-2 ring-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              className="fixed start-0 top-0 z-[61] flex h-[100dvh] w-[86vw] max-w-sm flex-col rounded-e-3xl bg-white shadow-2xl lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div className="relative rounded-ee-3xl bg-gradient-to-br from-primary-deep via-primary to-primary-bright px-6 pb-6 pt-6 text-white">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute end-4 top-4 rounded-full bg-white/15 p-2 hover:bg-white/25"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Menu</div>
                <div className="mt-1 font-display text-xl font-black tracking-wider">IFTA COMPUTER</div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="mt-5 flex w-full items-center gap-3 rounded-full bg-white/15 px-4 py-3 text-sm text-white/70 ring-1 ring-white/20"
                >
                  <Search className="size-4" /> Search products…
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold uppercase tracking-tight transition-colors hover:bg-primary/5 hover:text-primary",
                        isActive(l.href) && "bg-primary/5 text-primary"
                      )}
                    >
                      <span className="flex-1">{l.label}</span>
                      <ChevronRight className="size-4 text-on-surface-variant transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="border-t border-outline-variant/60 px-6 py-5">
                <Link
                  href="/build-pc"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-glow"
                >
                  <Cpu className="size-4" /> Build your PC
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
