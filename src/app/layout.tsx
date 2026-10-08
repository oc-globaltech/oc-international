import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "OC International is the parent company of OC Global Technology Sdn. Bhd., the Malaysian technology company powering digital growth through conversation, commerce and community platforms.";

export const metadata: Metadata = {
  title: "OC International — Parent company of OC Global Technology",
  description,
  openGraph: {
    title: "OC International",
    description,
    type: "website",
    siteName: "OC International",
  },
};

export const viewport: Viewport = { themeColor: "#fcfbf8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
