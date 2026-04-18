"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Phone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("كلمتا المرور غير متطابقتين"); return; }
    if (form.password.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }
    
    setLoading(true); 
    setError("");
    
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setLoading(false); 
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 p-10 max-w-md w-full">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2 font-heading">إنشاء حساب جديد</h1>
            <p className="text-gray-500 dark:text-gray-400 font-body">انضم لمنصة سقيا الماء وتابع تبرعاتك</p>
          </div>

          {success ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-emerald-500 text-4xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-heading">تم إنشاء حسابك بنجاح!</h2>
              <p className="text-gray-500 dark:text-gray-400 font-body text-lg">جاري توجيهك لصفحة تسجيل الدخول...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl text-sm font-bold text-center font-body">{error}</div>}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-body px-1">الاسم الكامل</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all font-body" placeholder="أدخل اسمك الكامل" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-body px-1">البريد الإلكتروني</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full pl-4 pr-12 py-4 border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white rounded-2xl focus:outline-none focus:border-primary transition-all text-left font-body" placeholder="email@example.com" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-body px-1">كلمة المرور</label>
                <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all text-left font-body" placeholder="••••••••" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-body px-1">تأكيد كلمة المرور</label>
                <input type="password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all text-left font-body" placeholder="••••••••" dir="ltr" />
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 mt-4">
                {loading ? <Loader2 className="animate-spin" size={24} /> : "إنشاء حساب"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 font-body">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-primary font-bold hover:text-primary-dark transition-colors">سجل الدخول</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
