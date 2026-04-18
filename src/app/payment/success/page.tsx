"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, Droplets, Share2, Download, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [txId] = useState(() =>
    "TXN-" + Math.random().toString(36).slice(2, 10).toUpperCase()
  );
  const [date] = useState(() =>
    new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })
  );

  useEffect(() => {
    // Confetti-like micro animation via CSS class
    document.title = "تم التبرع بنجاح | سقيا الماء";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-lg w-full overflow-hidden text-center">

          {/* Success Banner */}
          <div className="bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800 pt-12 pb-8 px-8">
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-full animate-ping opacity-30" />
              <div className="relative w-28 h-28 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                <CheckCircle2 size={56} className="text-emerald-500" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
              تم التبرع بنجاح! 🎉
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              جزاك الله خيراً، وبارك في مالك وعملك.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="px-8 pb-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 my-6 text-right space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-800 dark:text-white font-bold">رقم العملية</span>
                <span className="font-mono text-gray-500 dark:text-gray-300 text-xs">{txId}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-gray-600 pt-3">
                <span className="text-gray-800 dark:text-white font-bold">التاريخ</span>
                <span className="text-gray-500 dark:text-gray-300">{date}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-gray-600 pt-3">
                <span className="text-gray-800 dark:text-white font-bold">الحالة</span>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">مكتملة ✓</span>
              </div>
            </div>

            {/* Impact Note */}
            <div className="flex items-start gap-3 bg-primary/5 dark:bg-primary/10 rounded-xl p-4 text-right mb-6">
              <Droplets className="text-primary shrink-0 mt-1" size={22} />
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                تبرعك هذا يُساهم مباشرةً في إيصال الماء النقي لمن يحتاجه. سيتم إرسال تقرير الأثر لبريدك الإلكتروني.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pb-8">
              <Link
                href="/opportunities"
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                تبرع في مشروع آخر
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2">
                  <Download size={16} /> إيصال PDF
                </button>
                <button className="py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2">
                  <Share2 size={16} /> مشاركة
                </button>
              </div>
              <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors mt-1">
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
