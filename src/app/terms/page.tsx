import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ReviewReply",
  description: "ReviewReply terms of service and usage agreement.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-zinc max-w-none font-nunito space-y-6 text-brand-text-light leading-relaxed">
          <p className="text-sm text-brand-text-muted">
            Last updated: February 2025
          </p>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using ReviewReply (&quot;the Service&quot;), you agree to be
              bound by these Terms of Service. If you do not agree to these terms,
              please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              2. Description of Service
            </h2>
            <p>
              ReviewReply is an AI-powered tool that helps businesses generate
              professional responses to customer reviews. The Service uses artificial
              intelligence to create suggested responses based on the review content,
              tone preferences, and business type you provide.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              3. Use of Generated Content
            </h2>
            <p>
              AI-generated responses are suggestions only. You are responsible for
              reviewing, editing, and approving any response before posting it publicly.
              ReviewReply is not responsible for the content you choose to publish.
            </p>
            <p className="mt-2">
              You retain full ownership of the review responses generated through our
              Service. You are free to use, modify, and publish them without attribution.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              4. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>
                Generate responses intended to deceive, harass, or defame any person
              </li>
              <li>
                Attempt to reverse-engineer, decompile, or exploit the Service
              </li>
              <li>
                Use automated tools to access the Service beyond normal usage patterns
              </li>
              <li>Resell or redistribute the Service without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              5. Service Availability
            </h2>
            <p>
              We strive to maintain high availability but do not guarantee uninterrupted
              access to the Service. We may modify, suspend, or discontinue any aspect
              of the Service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
              any kind. ReviewReply and its affiliates shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of
              the Service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-outfit font-semibold text-xl text-brand-text mt-8 mb-3">
              8. Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
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
