import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";

const ibmFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ibm",
});

export const metadata: Metadata = {
  title: "سقيا الماء | منصة التبرعات المؤسسية",
  description: "المنصة الرسمية لجمعية سقيا الماء لجمع التبرعات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={ibmFont.variable} suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-900 bg-white flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
