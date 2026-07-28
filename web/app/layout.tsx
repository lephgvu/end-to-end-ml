import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: "Hearthline — Boston Home Value Estimator",
    description:
      "Explore a fast, ML-powered Boston home value estimate using 13 neighborhood and housing signals.",
    openGraph: {
      title: "Hearthline — See the signal behind the sale",
      description: "A clear, ML-powered home value estimate built from 13 Boston housing signals.",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Hearthline home value estimator" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hearthline — Boston Home Value Estimator",
      description: "See the signal behind the sale with a fast ML-powered estimate.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
