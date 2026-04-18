"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail || !password) {
      setError("الرجاء إدخال جميع البيانات");
      return;
    }
    
    setLoading(true);
    setError("");
    
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: phoneOrEmail,
      password,
    });

    if (authError) {
      setError("بيانات الدخول غير صحيحة أو الحساب غير موجود");
      setLoading(false);
    } else {
      router.push("/auth/dashboard");
      router.refresh();
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 p-10 max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-3 font-heading">تسجيل الدخول</h1>
            <p className="text-gray-500 dark:text-gray-400 font-body">أهلاً بك في منصة سقيا الماء</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl text-sm font-bold text-center font-body">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-body px-1">رقم الجوال أو البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-4 border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white rounded-2xl focus:outline-none focus:border-primary transition-all text-left font-body" 
                  placeholder="05x xxx xxxx" 
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-body px-1">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-4 border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white rounded-2xl focus:outline-none focus:border-primary transition-all text-left font-body" 
                  placeholder="••••••••" 
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors font-body">تذكرني</span>
              </label>
              <Link href="/auth/forgot-password" className="text-primary hover:text-primary-dark font-bold font-body transition-colors">نسيت كلمة المرور؟</Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "دخول"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 font-body">
            ليس لديك حساب؟ <Link href="/auth/register" className="text-primary font-bold hover:underline transition-colors">سجل الآن</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
