import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/70">
      <div className="container-ifta pb-8 pt-14 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Image src="/logo.png" alt="IFTA Computer" width={168} height={48} className="h-11 w-auto" />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed">
              Your trusted partner for all your tech needs. Premium components, laptops and accessories delivered across all 69 wilayas.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-primary hover:text-white">
                <FacebookIcon className="size-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-primary hover:text-white">
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-widest text-gold">Quick links</h3>
            <ul className="space-y-2 text-[13px]">
              {[
                ["/", "Home"],
                ["/shop", "Products"],
                ["/build-pc", "Build PC"],
                ["/services", "Services"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-primary-bright">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-widest text-gold">Categories</h3>
            <ul className="space-y-2 text-[13px]">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?cat=${c.slug}`} className="transition-colors hover:text-primary-bright">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-widest text-gold">Contact</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary-bright" />
                <span dir="ltr">+213 XXX XX XX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary-bright" />
                contact@ifta-dz.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary-bright" />
                Algeria
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-ifta py-5 text-center text-xs text-white/40">
          © {2026} IFTA Computer. All rights reserved.
          <div className="mt-1.5">
            Demo for IFTA by the{" "}
            <a href="https://sitedz.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-bright hover:underline">
              sitedz.com
            </a>{" "}
            team
          </div>
        </div>
      </div>
    </footer>
  );
}
