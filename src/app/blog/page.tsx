import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — ReviewReply",
  description:
    "Tips, guides, and best practices for managing customer reviews and growing your business reputation with AI.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-text mb-4">
          Blog
        </h1>
        <p className="text-brand-text-light font-nunito text-lg mb-12">
          Guides and tips on managing customer reviews, improving your online reputation, and growing your business.
        </p>

        {posts.length === 0 ? (
          <p className="text-brand-text-light font-nunito">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-card border border-emerald-50 p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-outfit font-semibold text-xl text-brand-text mb-2 hover:text-brand-emerald transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-brand-text-light font-nunito text-sm mb-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-4">
                  <time className="text-xs text-brand-text-muted font-nunito">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-nunito font-semibold text-brand-emerald hover:text-brand-emerald-dark transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
