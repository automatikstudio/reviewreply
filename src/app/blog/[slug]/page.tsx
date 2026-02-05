import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — ReviewReply`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      siteName: "ReviewReply",
    },
  };
}

export default function BlogPost({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm font-nunito text-brand-emerald hover:text-brand-emerald-dark transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <time className="text-sm text-brand-text-muted font-nunito">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-nunito bg-emerald-50 text-brand-emerald px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none font-nunito
              prose-headings:font-outfit prose-headings:text-brand-text
              prose-p:text-brand-text-light prose-p:leading-relaxed
              prose-a:text-brand-emerald prose-a:no-underline hover:prose-a:underline
              prose-strong:text-brand-text
              prose-li:text-brand-text-light
              prose-h2:text-2xl prose-h3:text-xl"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </article>

        {/* CTA */}
        <div className="mt-12 bg-brand-emerald/5 border border-emerald-100 rounded-card p-8 text-center">
          <h3 className="font-outfit font-bold text-xl text-brand-text mb-2">
            Ready to respond to reviews faster?
          </h3>
          <p className="font-nunito text-brand-text-light mb-4">
            Try ReviewReply free — generate personalized, professional responses in seconds.
          </p>
          <Link
            href="/app"
            className="inline-block bg-brand-emerald hover:bg-brand-emerald-dark text-white font-nunito font-bold px-6 py-3 rounded-btn transition-all hover:shadow-lg hover:shadow-emerald-200"
          >
            Try ReviewReply Free →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
