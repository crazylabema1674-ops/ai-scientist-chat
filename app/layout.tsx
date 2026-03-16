import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AI科学者メンター | 偉人と対話して、仕事の壁を乗り越えよう",
  description:
    "ニュートン、ガリレオ、テスラ…歴史を変えた科学者たちとAIで対話。仕事の悩み・挑戦・信念を、偉人の言葉で乗り越えよう。",
  openGraph: {
    title: "AI科学者メンター",
    description: "偉人と対話して、仕事の壁を乗り越えよう",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
