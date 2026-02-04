"use client";

import { useState } from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  planName,
}: ComingSoonModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "waitlist_signup",
          plan: planName,
          email,
        }),
      });
    } catch {
      // silent fail on tracking
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-card shadow-2xl max-w-md w-full p-8 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-text transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          {/* Rocket emoji */}
          <div className="text-4xl mb-3">🚀</div>

          <h3 className="font-outfit font-bold text-2xl text-brand-text mb-2">
            Coming Soon!
          </h3>

          {!submitted ? (
            <>
              <p className="text-brand-text-light font-nunito mb-6">
                The <span className="font-semibold text-brand-emerald">{planName}</span> plan
                is launching soon. Join the waitlist to get early access and a special discount.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-btn font-nunito text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-white font-nunito font-semibold py-3 rounded-btn transition-all hover:shadow-lg hover:shadow-emerald-200"
                >
                  Join Waitlist
                </button>
              </form>

              <p className="text-xs text-brand-text-muted mt-3 font-nunito">
                No spam. We&apos;ll only email you when we launch.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-brand-text-light font-nunito mb-4">
                You&apos;re on the list! We&apos;ll notify you at{" "}
                <span className="font-semibold">{email}</span> when we launch.
              </p>
              <button
                onClick={onClose}
                className="bg-brand-emerald hover:bg-brand-emerald-dark text-white font-nunito font-semibold px-6 py-2.5 rounded-btn transition-all"
              >
                Got it!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
