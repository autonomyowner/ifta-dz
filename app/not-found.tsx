import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-ifta flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="bg-gradient-to-b from-primary-bright to-primary-deep bg-clip-text font-display text-8xl font-black text-transparent">404</div>
      <h1 className="mt-4 text-2xl font-black uppercase tracking-tight">Page not found</h1>
      <p className="mt-2 text-on-surface-variant">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className={buttonClass("primary", "md", "mt-8")}>Back home</Link>
    </div>
  );
}
