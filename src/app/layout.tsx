import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewReply — AI-Powered Review Response Manager",
  description:
    "Never miss a review again. ReviewReply helps local businesses respond to Google and Yelp reviews with AI-generated, professional responses in seconds.",
  keywords: [
    "review response",
    "Google reviews",
    "Yelp reviews",
    "AI review reply",
    "local business",
    "review management",
  ],
  openGraph: {
    title: "ReviewReply — AI-Powered Review Response Manager",
    description: "Never miss a review again. Generate professional responses to customer reviews in seconds with AI.",
    type: "website",
    siteName: "ReviewReply",
    url: "https://reviewreply-ten.vercel.app",
    images: [{ url: "https://reviewreply-ten.vercel.app/og-image.png", width: 1200, height: 630, alt: "ReviewReply — AI-Powered Review Response Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewReply — AI-Powered Review Response Manager",
    description: "Never miss a review again. Generate professional responses to customer reviews in seconds with AI.",
    creator: "@automatikstudio",
    images: ["https://reviewreply-ten.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
