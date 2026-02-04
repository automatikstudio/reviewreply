import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ReviewReply",
  description: "ReviewReply privacy policy. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-zinc max-w-none font-nunito space-y-6 text-brand-text-light leading-relaxed">
          <p className="text-sm text-brand-text-muted">
            Last updated: February 2025
          </p>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              1. Information We Collect
            </h2>
            <p>
              ReviewReply is designed with privacy in mind. When you use our service:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Review text:</strong> We process the review text you paste to generate
                responses. This text is sent to our AI provider (Anthropic) for processing
                and is not permanently stored.
              </li>
              <li>
                <strong>Usage data:</strong> We collect anonymous usage metrics (such as
                response generation counts and selected tones) to improve our service.
              </li>
              <li>
                <strong>Email address:</strong> If you join our waitlist, we collect your
                email address to notify you about product updates.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Generate AI-powered review responses</li>
              <li>Improve the quality and accuracy of our AI responses</li>
              <li>Send product updates if you&apos;ve opted in</li>
              <li>Monitor and improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              3. Data Retention
            </h2>
            <p>
              Review text is processed in real-time and not permanently stored on our
              servers. AI-generated responses are returned to you immediately and not
              retained. Anonymous usage analytics may be retained for up to 12 months.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              4. Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Anthropic (Claude AI):</strong> For generating review responses.
                Subject to{" "}
                <a
                  href="https://www.anthropic.com/privacy"
                  className="text-brand-emerald hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anthropic&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Vercel:</strong> For hosting. Subject to{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  className="text-brand-emerald hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel&apos;s Privacy Policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              5. Your Rights
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of
              your personal data. Since we don&apos;t permanently store review content, most
              data is ephemeral by design. For waitlist removal or other data requests,
              contact us at automatikstudiomail@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              6. Contact
            </h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a
                href="mailto:automatikstudiomail@gmail.com"
                className="text-brand-emerald hover:underline"
              >
                automatikstudiomail@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
