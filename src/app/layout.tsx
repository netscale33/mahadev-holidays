import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahadevholidays.com"),
  title: "MAHADEV HOLIDAYS | Explore • Experience • Enjoy",
  description:
    "Discover extraordinary journeys with Mahadev Holidays. Premium travel curated since 2022. Ministry of Tourism approved. Bespoke domestic and international tour packages based in Palanpur, Gujarat.",
  keywords:
    "luxury travel, india tours, holiday packages, mahadev holidays, tour operator, travel agency, premium travel, bespoke journeys, palanpur, gujarat",
  openGraph: {
    title: "MAHADEV HOLIDAYS | Explore • Experience • Enjoy",
    description:
      "Discover extraordinary journeys with Mahadev Holidays. Premium travel curated since 2022.",
    url: "https://www.mahadevholidays.com",
    siteName: "MAHADEV HOLIDAYS",
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "MAHADEV HOLIDAYS",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAHADEV HOLIDAYS | Explore • Experience • Enjoy",
    description:
      "Discover extraordinary journeys with Mahadev Holidays. Premium travel curated since 2022.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-body antialiased">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
