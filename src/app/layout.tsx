import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  title: 'Thành & Nhi - Lễ Thành Hôn',
  description: 'Thiệp cưới của Thành & Nhi. Kính mời quý khách đến tham dự và chung vui trong ngày trọng đại.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${greatVibes.variable} antialiased`}
    >
      <body className="flex flex-col font-serif bg-paper">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
