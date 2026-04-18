"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Phone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("كلمتا المرور غير متطابقتين"); return; }
    if (form.password.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false); setSuccess(true);
    setTimeout(() => router.push("/auth/login"), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={28} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">إنشاء حساب جديد</h1>
            <p className="text-gray-500 dark:text-gray-400">انضم لمنصة سقيا الماء وتابع تبرعاتك</p>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-500 text-3xl">✓</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">تم إنشاء حسابك بنجاح!</h2>
              <p className="text-gray-500 dark:text-gray-400">جاري توجيهك لصفحة تسجيل الدخول...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center">{error}</div>}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm" placeholder="أدخل اسمك الكامل" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الجوال</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                  <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:border-primary text-left text-sm" placeholder="05x xxx xxxx" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-left text-sm" placeholder="••••••••" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                <input type="password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-left text-sm" placeholder="••••••••" dir="ltr" />
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={24} /> : "إنشاء حساب"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-primary font-bold hover:underline">سجل الدخول</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
