"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";

const tones = ["Professional", "Friendly", "Casual", "Empathetic"] as const;
const businessTypes = [
  "Restaurant",
  "Dental",
  "Salon",
  "Auto Shop",
  "General",
] as const;

interface GeneratedResponse {
  tone: string;
  response: string;
}

export default function AppPage() {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [tone, setTone] = useState<string>("Friendly");
  const [businessType, setBusinessType] = useState<string>("General");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<GeneratedResponse[]>([]);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Auto-detect star rating from review text
  const detectStars = useCallback((text: string) => {
    const lower = text.toLowerCase();
    
    // Check for explicit star mentions
    const starMatch = text.match(/(\d)\s*(?:star|\/5|out of 5)/i);
    if (starMatch) {
      return Math.min(5, Math.max(1, parseInt(starMatch[1])));
    }

    // Sentiment-based detection
    const positiveWords = [
      "amazing", "excellent", "fantastic", "wonderful", "great",
      "love", "perfect", "best", "outstanding", "incredible",
      "delicious", "friendly", "recommend", "awesome"
    ];
    const negativeWords = [
      "terrible", "horrible", "awful", "worst", "disgusting",
      "rude", "never again", "waste", "disappointment", "unacceptable",
      "cold", "slow", "dirty", "overpriced"
    ];
    const mixedWords = [
      "okay", "decent", "average", "fine", "but", "however",
      "although", "could be better", "not bad"
    ];

    let score = 3; // Default neutral
    let posCount = 0;
    let negCount = 0;

    positiveWords.forEach((word) => {
      if (lower.includes(word)) posCount++;
    });
    negativeWords.forEach((word) => {
      if (lower.includes(word)) negCount++;
    });
    const hasMixed = mixedWords.some((word) => lower.includes(word));

    if (posCount > negCount + 1) score = 5;
    else if (posCount > negCount) score = 4;
    else if (negCount > posCount + 1) score = 1;
    else if (negCount > posCount) score = 2;
    else if (hasMixed) score = 3;

    return score;
  }, []);

  useEffect(() => {
    if (review.length > 20 && stars === 0) {
      setStars(detectStars(review));
    }
  }, [review, stars, detectStars]);

  const handleGenerate = async () => {
    if (!review.trim()) {
      setError("Please paste a review first.");
      return;
    }
    if (stars === 0) {
      setError("Please select a star rating.");
      return;
    }

    setLoading(true);
    setError("");
    setResponses([]);

    try {
      // Track usage
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "generate_response",
          stars,
          tone,
          businessType,
        }),
      }).catch(() => {});

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review, stars, tone, businessType }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate responses. Please try again.");
      }

      const data = await res.json();
      setResponses(data.responses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-2">
            Generate a Response
          </h1>
          <p className="font-nunito text-brand-text-light text-lg">
            Paste a customer review and let AI craft the perfect reply
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-card border border-emerald-50 shadow-lg shadow-emerald-50/50 p-6 sm:p-8 mb-8">
          {/* Review Text Area */}
          <div className="mb-6">
            <label className="block font-outfit font-semibold text-brand-text mb-2">
              Customer Review
            </label>
            <textarea
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                if (e.target.value.length <= 20) setStars(0);
              }}
              placeholder="Paste a customer review here... e.g., 'Great food but the service was a bit slow. The pasta was delicious though — will definitely come back!'"
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-btn font-nunito text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald transition-all placeholder:text-brand-text-muted"
            />
          </div>

          {/* Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {/* Star Rating */}
            <div>
              <label className="block font-outfit font-semibold text-brand-text mb-2">
                Star Rating
              </label>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={stars}
                  onRate={setStars}
                  size="lg"
                  interactive
                />
                {stars > 0 && (
                  <span className="text-sm font-nunito text-brand-text-muted">
                    {stars}/5
                  </span>
                )}
              </div>
              {review.length > 20 && stars > 0 && (
                <p className="text-xs text-brand-emerald font-nunito mt-1">
                  ✨ Auto-detected from review
                </p>
              )}
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block font-outfit font-semibold text-brand-text mb-2">
                Response Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-nunito font-semibold transition-all ${
                      tone === t
                        ? "bg-brand-emerald text-white shadow-sm"
                        : "bg-emerald-50 text-brand-text-light hover:bg-emerald-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Business Type */}
            <div>
              <label className="block font-outfit font-semibold text-brand-text mb-2">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-btn font-nunito text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald transition-all bg-white"
              >
                {businessTypes.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-btn">
              <p className="text-sm text-red-600 font-nunito">{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-brand-emerald hover:bg-brand-emerald-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-nunito font-bold text-lg py-4 rounded-btn transition-all hover:shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating responses...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Response
              </>
            )}
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-card border border-emerald-50 p-6"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-20 h-5 bg-emerald-100 rounded-full animate-gentle-pulse" />
                  <div className="w-16 h-4 bg-gray-100 rounded-full animate-gentle-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-100 rounded animate-gentle-pulse" />
                  <div className="w-full h-4 bg-gray-100 rounded animate-gentle-pulse" />
                  <div className="w-3/4 h-4 bg-gray-100 rounded animate-gentle-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Response Cards */}
        {responses.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-outfit font-semibold text-xl text-brand-text">
              Your Responses
            </h2>

            {responses.map((r, i) => (
              <div
                key={i}
                className={`bg-white rounded-card border border-emerald-50 shadow-md p-6 ${
                  i === 0
                    ? "animate-slide-up"
                    : i === 1
                    ? "animate-slide-up-delay-1"
                    : "animate-slide-up-delay-2"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-emerald/10 text-brand-emerald text-xs font-nunito font-bold px-3 py-1 rounded-full">
                      Option {i + 1}
                    </span>
                    <span className="text-xs font-nunito text-brand-text-muted">
                      {r.tone} tone
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(r.response, i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-nunito font-semibold transition-all ${
                      copiedIndex === i
                        ? "bg-brand-emerald text-white"
                        : "bg-gray-50 text-brand-text-light hover:bg-emerald-50 hover:text-brand-emerald"
                    }`}
                  >
                    {copiedIndex === i ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <p className="font-nunito text-brand-text text-sm leading-relaxed whitespace-pre-wrap">
                  {r.response}
                </p>
              </div>
            ))}

            {/* Try again */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setResponses([]);
                  setReview("");
                  setStars(0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-brand-emerald font-nunito font-semibold text-sm hover:underline"
              >
                ← Generate another response
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
