import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const ibmFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

// Alias for heading to use the same unified font
const unifiedHeadingVar = "--font-heading";

export const metadata: Metadata = {
  title: "جمعية سقيا الماء | وزارة الموارد البشرية والتنمية الاجتماعية",
  description: "المنصة الرسمية لجمعية سقيا الماء لجمع التبرعات والمبادرات الإنسانية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmFont.variable}`} style={{ [unifiedHeadingVar]: `var(--font-body)` } as React.CSSProperties} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased font-body bg-white text-gray-900 dark:bg-[#020617] dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
