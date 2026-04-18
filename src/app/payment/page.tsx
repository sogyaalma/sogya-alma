"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get("amount") || "100";
  const project = searchParams.get("project") || "صندوق سقيا العام";

  const handleSubmit = () => {
    router.push("/payment/success");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10 p-8 text-center">
        <ShieldCheck size={48} className="mx-auto mb-4 text-primary" />
        <h1 className="text-3xl font-bold mb-1 text-primary-dark dark:text-white">بوابة الدفع الآمنة</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">بياناتك مشفرة ومحمية بأعلى معايير الأمان</p>
      </div>

      <div className="p-8 md:p-10">
        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 mb-8">
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">ملخص التبرع</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm">{project}</span>
            <span className="text-2xl font-black text-primary">{Number(amount).toLocaleString()} ر.س</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 mb-3 text-center">طرق الدفع المتاحة</p>
          <div className="flex justify-center gap-3">
            {["mada", "Visa", "Apple", "STC Pay"].map((m) => (
              <div key={m} className="border border-gray-200 dark:border-gray-600 rounded-lg h-9 flex items-center justify-center px-3 text-xs font-bold text-gray-600 dark:text-gray-300">
                {m}
              </div>
            ))}
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم حامل البطاقة</label>
            <input type="text" className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 outline-none focus:border-primary bg-gray-50 dark:bg-gray-700 dark:text-white text-left" dir="ltr" placeholder="CARDHOLDER NAME" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم البطاقة</label>
            <div className="relative">
              <input type="text" className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 pl-12 outline-none focus:border-primary bg-gray-50 dark:bg-gray-700 dark:text-white text-left" dir="ltr" placeholder="0000 0000 0000 0000" required />
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تاريخ الانتهاء</label>
              <input type="text" className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 outline-none focus:border-primary bg-gray-50 dark:bg-gray-700 dark:text-white text-center" dir="ltr" placeholder="MM / YY" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رمز التحقق CVC</label>
              <input type="text" className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 outline-none focus:border-primary bg-gray-50 dark:bg-gray-700 dark:text-white text-center" dir="ltr" placeholder="123" required />
            </div>
          </div>

          <button type="submit" className="w-full mt-4 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            تأكيد الدفع — {Number(amount).toLocaleString()} ر.س
          </button>

          <Link href="/opportunities" className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mt-1">
            <ArrowRight size={14} /> العودة للمشاريع
          </Link>
        </form>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-2xl">
        <Suspense fallback={<div className="text-center py-20 text-gray-400">جاري التحميل...</div>}>
          <PaymentForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
