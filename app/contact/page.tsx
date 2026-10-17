import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="bg-surface-low">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062a4a] via-primary-deep to-primary py-14 lg:py-20">
        <div className="container-ifta relative">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-light">Get in touch</span>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter text-white lg:text-6xl">Contact us</h1>
        </div>
      </section>
      <div className="container-ifta grid gap-8 py-14 lg:grid-cols-[360px_1fr] lg:py-20">
        <div className="space-y-3">
          {[
            { icon: Phone, label: "Phone", value: "+213 XXX XX XX XX" },
            { icon: Mail, label: "Email", value: "contact@ifta-dz.com" },
            { icon: MapPin, label: "Store", value: "Algeria" },
            { icon: Clock, label: "Hours", value: "Sat – Thu · 9:00 – 18:00" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-outline-variant/50">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</div>
                <div className="text-sm font-bold">{value}</div>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
