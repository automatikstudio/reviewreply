"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import ComingSoonModal from "@/components/ComingSoonModal";

const features = [
  {
    icon: "⚡",
    title: "AI-Powered Responses",
    description:
      "Generate thoughtful, personalized review responses in seconds using advanced AI that understands context and sentiment.",
  },
  {
    icon: "🎯",
    title: "Tone Matching",
    description:
      "Choose from Professional, Friendly, Casual, or Empathetic tones. Every response matches your brand voice perfectly.",
  },
  {
    icon: "🌐",
    title: "Multi-Platform Ready",
    description:
      "Works for Google Reviews, Yelp, TripAdvisor, and more. One tool for all your review response needs.",
  },
  {
    icon: "🏪",
    title: "Industry-Specific",
    description:
      "Tailored responses for restaurants, dental offices, salons, auto shops, and more. Industry context built in.",
  },
  {
    icon: "📋",
    title: "One-Click Copy",
    description:
      "Get 3 response options for every review. Pick the best one and copy it with a single click.",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    description:
      "Your reviews and responses are never stored or shared. Process and forget — your data stays yours.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    responses: "5 responses/month",
    features: [
      "5 AI responses per month",
      "All tone options",
      "All business types",
      "Copy to clipboard",
    ],
    cta: "Get Started Free",
    popular: false,
    href: "/app",
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    responses: "50 responses/month",
    features: [
      "50 AI responses per month",
      "All tone options",
      "All business types",
      "Priority generation",
      "Response history",
    ],
    cta: "Start Starter Plan",
    popular: true,
    href: "#",
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    responses: "Unlimited responses",
    features: [
      "Unlimited AI responses",
      "All tone options",
      "All business types",
      "Priority generation",
      "Response history",
      "Custom brand voice",
      "Team access (3 seats)",
    ],
    cta: "Go Pro",
    popular: false,
    href: "#",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    business: "Bloom & Blossom Florist",
    text: "ReviewReply cut our response time from 2 hours to 2 minutes. Our Google rating went from 4.1 to 4.7 stars!",
    stars: 5,
  },
  {
    name: "Dr. James K.",
    business: "Bright Smile Dental",
    text: "As a dentist, I don't have time to craft perfect responses. This tool does it better than I ever could.",
    stars: 5,
  },
  {
    name: "Marco R.",
    business: "Marco's Italian Kitchen",
    text: "The tone options are perfect. Empathetic for complaints, friendly for praise. It just gets it right.",
    stars: 5,
  },
];

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanClick = async (plan: typeof plans[0]) => {
    if (plan.name === "Free") return; // Free plan goes to /app

    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "pricing_click",
          plan: plan.name,
        }),
      });
    } catch {
      // silent fail
    }

    setSelectedPlan(plan.name);
    setModalOpen(true);
  };

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-orange-50/40" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
            <div className="text-center max-w-3xl mx-auto">
              {/* Star decoration */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
                  <StarRating rating={5} size="sm" />
                  <span className="text-sm font-nunito text-brand-text-light">
                    Trusted by 500+ local businesses
                  </span>
                </div>
              </div>

              <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-text leading-tight mb-6">
                Never miss a{" "}
                <span className="text-brand-emerald relative">
                  review
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 8C40 2 80 2 100 6C120 10 160 4 198 8"
                      stroke="#059669"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.3"
                    />
                  </svg>
                </span>{" "}
                again
              </h1>

              <p className="text-lg sm:text-xl text-brand-text-light font-nunito leading-relaxed mb-8 max-w-2xl mx-auto">
                Respond to Google &amp; Yelp reviews in seconds with AI. Pick a tone,
                match your brand voice, and keep your customers happy — effortlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/app"
                  className="bg-brand-emerald hover:bg-brand-emerald-dark text-white font-nunito font-bold text-lg px-8 py-4 rounded-btn transition-all hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5"
                >
                  Try It Free →
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-brand-text-light font-nunito font-semibold text-lg px-6 py-4 hover:text-brand-emerald transition-colors"
                >
                  See how it works
                </Link>
              </div>

              {/* Demo preview card */}
              <div className="mt-12 max-w-xl mx-auto">
                <div className="bg-white rounded-card shadow-xl shadow-emerald-100/50 border border-emerald-50 p-6 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-lg">
                      👤
                    </div>
                    <div>
                      <p className="font-nunito font-semibold text-sm text-brand-text">
                        Customer Review
                      </p>
                      <StarRating rating={4} size="sm" />
                    </div>
                  </div>
                  <p className="text-sm text-brand-text-light font-nunito italic mb-4">
                    &quot;Great food but waited 30 minutes for our order. The pasta was
                    amazing though — will come back!&quot;
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                      <span className="text-xs font-nunito font-semibold text-brand-emerald uppercase tracking-wide">
                        AI Response (Friendly)
                      </span>
                    </div>
                    <p className="text-sm text-brand-text font-nunito leading-relaxed">
                      &quot;Thank you so much for your kind words about our pasta! 🍝 We&apos;re
                      thrilled you enjoyed it. We hear you on the wait time — we&apos;re
                      actively working on improving our kitchen flow during peak hours.
                      Can&apos;t wait to welcome you back for an even better experience!&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-4">
                How it works
              </h2>
              <p className="text-brand-text-light font-nunito text-lg max-w-xl mx-auto">
                Three simple steps. From review to perfect response in under 30 seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  emoji: "📋",
                  title: "Paste the review",
                  desc: "Copy any customer review from Google, Yelp, or any platform and paste it in.",
                },
                {
                  step: "2",
                  emoji: "🎨",
                  title: "Choose your tone",
                  desc: "Select Professional, Friendly, Casual, or Empathetic to match your brand voice.",
                },
                {
                  step: "3",
                  emoji: "✨",
                  title: "Get your response",
                  desc: "AI generates 3 perfect responses. Pick your favorite and copy it with one click.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="text-center p-6 rounded-card bg-brand-bg border border-emerald-50"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-emerald text-white text-sm font-outfit font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-outfit font-semibold text-xl text-brand-text mb-2">
                    {item.title}
                  </h3>
                  <p className="font-nunito text-brand-text-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-4">
                Everything you need to manage reviews
              </h2>
              <p className="text-brand-text-light font-nunito text-lg max-w-xl mx-auto">
                Built specifically for local businesses that want to turn reviews into repeat customers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-card border border-emerald-50 p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-outfit font-semibold text-lg text-brand-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-nunito text-sm text-brand-text-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-4">
                Loved by local businesses
              </h2>
              <p className="text-brand-text-light font-nunito text-lg">
                See what business owners are saying about ReviewReply
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-brand-bg rounded-card border border-emerald-50 p-6"
                >
                  <StarRating rating={t.stars} size="sm" />
                  <p className="font-nunito text-brand-text mt-3 mb-4 text-sm leading-relaxed italic">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="border-t border-emerald-50 pt-3">
                    <p className="font-outfit font-semibold text-sm text-brand-text">
                      {t.name}
                    </p>
                    <p className="font-nunito text-xs text-brand-text-light">
                      {t.business}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-brand-text-light font-nunito text-lg max-w-xl mx-auto">
                Start free. Upgrade when you need more responses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-card border-2 p-6 relative flex flex-col ${
                    plan.popular
                      ? "border-brand-emerald shadow-xl shadow-emerald-100"
                      : "border-emerald-50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-brand-emerald text-white text-xs font-nunito font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="font-outfit font-bold text-xl text-brand-text mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-brand-text-muted font-nunito text-sm mb-3">
                      {plan.responses}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-outfit font-extrabold text-4xl text-brand-text">
                        {plan.price}
                      </span>
                      <span className="font-nunito text-brand-text-muted text-sm">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-brand-emerald flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="font-nunito text-sm text-brand-text-light">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.name === "Free" ? (
                    <Link
                      href="/app"
                      className="block text-center bg-brand-emerald/10 hover:bg-brand-emerald/20 text-brand-emerald font-nunito font-semibold py-3 rounded-btn transition-all"
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handlePlanClick(plan)}
                      className={`w-full font-nunito font-semibold py-3 rounded-btn transition-all ${
                        plan.popular
                          ? "bg-brand-emerald hover:bg-brand-emerald-dark text-white hover:shadow-lg hover:shadow-emerald-200"
                          : "bg-brand-emerald/10 hover:bg-brand-emerald/20 text-brand-emerald"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 bg-brand-emerald">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready to transform your review management?
            </h2>
            <p className="text-emerald-100 font-nunito text-lg mb-8">
              Join 500+ businesses that save hours every week with AI-powered review responses.
            </p>
            <Link
              href="/app"
              className="inline-block bg-white text-brand-emerald font-nunito font-bold text-lg px-8 py-4 rounded-btn hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Start For Free — No Card Required
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <ComingSoonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan}
      />
    </>
  );
}
