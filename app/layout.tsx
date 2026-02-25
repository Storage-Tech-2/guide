import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guide.storagecatalog.org"),
  title: {
    default: "Storage Tech Beginner Guides",
    template: "%s | Storage Tech Beginner Guides",
  },
  description:
    "Guides and curated resources for getting started with Minecraft storage tech.",
  openGraph: {
    title: "Storage Tech Beginner Guides",
    description:
      "Guides and curated resources for getting started with Minecraft storage tech.",
    url: "/",
    images: [{ url: "/banner.webp", alt: "Minecraft Storage Catalog" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <GoogleAnalytics gaId="G-77Y9ZBT4TY" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
