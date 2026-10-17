"use client";

import { toast } from "sonner";
import { buttonClass } from "@/components/ui/Button";

const field =
  "w-full rounded-xl bg-surface-low px-4 py-3 text-sm ring-1 ring-outline-variant/70 outline-none transition focus:ring-2 focus:ring-primary";

export function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Message sent", { description: "We'll get back to you shortly." });
        e.currentTarget.reset();
      }}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-outline-variant/50 lg:p-8"
    >
      <h2 className="text-[11px] font-bold uppercase tracking-widest">Send us a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Name" className={field} />
        <input required type="tel" placeholder="Phone" className={field} />
      </div>
      <input type="email" placeholder="Email (optional)" className={field} />
      <textarea required rows={6} placeholder="How can we help?" className={field} />
      <button type="submit" className={buttonClass("primary", "md")}>Send message</button>
    </form>
  );
}
