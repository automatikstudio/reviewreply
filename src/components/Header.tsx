"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-emerald rounded-lg flex items-center justify-center">
            <span className="font-outfit font-bold text-white text-lg leading-none">R</span>
          </div>
          <span className="font-outfit font-bold text-xl text-brand-text">
            Review<span className="text-brand-emerald">Reply</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {pathname !== "/app" && (
            <>
              <Link
                href="#features"
                className="hidden sm:inline text-sm font-nunito text-brand-text-light hover:text-brand-emerald transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="hidden sm:inline text-sm font-nunito text-brand-text-light hover:text-brand-emerald transition-colors"
              >
                Pricing
              </Link>
            </>
          )}
          <Link
            href="/app"
            className="bg-brand-emerald hover:bg-brand-emerald-dark text-white font-nunito font-semibold text-sm px-5 py-2.5 rounded-btn transition-all hover:shadow-lg hover:shadow-emerald-200"
          >
            Try Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
