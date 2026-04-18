"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-md w-full">
          {sent ? (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">تم إرسال الرمز</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                تم إرسال رمز إعادة تعيين كلمة المرور إلى رقم الجوال{" "}
                <span className="font-bold text-primary" dir="ltr">{phone}</span>.
                يُرجى التحقق من رسائلك.
              </p>
              <Link
                href="/auth/login"
                className="mt-4 w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-md"
              >
                العودة لتسجيل الدخول
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={28} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">نسيت كلمة المرور؟</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  أدخل رقم جوالك المسجل وسنرسل لك رمز إعادة التعيين.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الجوال</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:border-primary transition-colors text-left text-sm"
                      placeholder="05x xxx xxxx"
                      dir="ltr"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : "إرسال رمز التحقق"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                تذكرت كلمة المرور؟{" "}
                <Link href="/auth/login" className="text-primary font-bold hover:underline">سجل الدخول</Link>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
