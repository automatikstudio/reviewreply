import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand-emerald rounded-lg flex items-center justify-center">
                <span className="font-outfit font-bold text-white text-sm leading-none">R</span>
              </div>
              <span className="font-outfit font-bold text-lg text-brand-text">
                Review<span className="text-brand-emerald">Reply</span>
              </span>
            </div>
            <p className="text-sm text-brand-text-light font-nunito leading-relaxed">
              AI-powered review response manager for local businesses. Never miss a review again.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-outfit font-semibold text-brand-text mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/app" className="text-sm text-brand-text-light hover:text-brand-emerald transition-colors font-nunito">
                  Generate Response
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-brand-text-light hover:text-brand-emerald transition-colors font-nunito">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm text-brand-text-light hover:text-brand-emerald transition-colors font-nunito">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-outfit font-semibold text-brand-text mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-brand-text-light hover:text-brand-emerald transition-colors font-nunito">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-brand-text-light hover:text-brand-emerald transition-colors font-nunito">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-text-muted font-nunito">
            © {new Date().getFullYear()} ReviewReply. All rights reserved.
          </p>
          <p className="text-xs text-brand-text-muted font-nunito">
            Built by{" "}
            <a
              href="https://automatik.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-emerald hover:underline"
            >
              Automatik.studio
            </a>
            {" "}•{" "}
            <a
              href="https://www.aitoolzdir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-emerald hover:underline"
            >
              AI Toolz Dir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
