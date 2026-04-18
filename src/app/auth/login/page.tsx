"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Lock, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-ibm">تسجيل الدخول</h1>
            <p className="text-gray-500">أهلاً بك في منصة سقيا الماء</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال أو البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-left" 
                  placeholder="05x xxx xxxx" 
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-left" 
                  placeholder="••••••••" 
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                <span className="text-gray-600">تذكرني</span>
              </label>
              <Link href="/auth/forgot-password" className="text-primary hover:underline font-bold">نسيت كلمة المرور؟</Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "دخول"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            ليس لديك حساب؟ <Link href="/auth/register" className="text-primary font-bold hover:underline">سجل الآن</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
