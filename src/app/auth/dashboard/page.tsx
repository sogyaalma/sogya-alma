"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecurringDonationModal from "@/components/RecurringDonationModal";
import { User, Medal, CreditCard, Droplets, HeartHandshake, History, CheckCircle2, Trophy, Eye, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

const mockDonations = [
  { id: "TX-20251102", project: "ساهم بكرتون للمساجد", amount: 500, date: "2025-11-02", status: "مكتمل" },
  { id: "TX-20251015", project: "مشروع سقيا زمزم", amount: 300, date: "2025-10-15", status: "مكتمل" },
  { id: "TX-20250920", project: "سقيا المقابر", amount: 200, date: "2025-09-20", status: "مكتمل" },
  { id: "TX-20250801", project: "ساهم بجزء من قيمة سيارة (وقف)", amount: 2000, date: "2025-08-01", status: "مكتمل" },
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-bold">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 lg:sticky lg:top-28">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-gray-700">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 relative">
                <User size={40} />
                <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full w-6 h-6 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white">
                  <CheckCircle2 size={14} />
                </div>
              </div>
              <h2 className="font-bold text-xl text-secondary dark:text-white">{user?.user_metadata?.full_name || user?.email || "المتبرع"}</h2>
              <span className="text-sm font-bold text-gray-400 mt-1">متبرع نشط</span>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              <Link href="/auth/dashboard" className="flex items-center gap-3 text-primary font-bold bg-primary/5 px-4 py-3 rounded-xl">
                <Medal size={20} /> أثري (لوحة الشرف)
              </Link>
              <a href="#donation-history" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-primary font-bold hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors">
                <History size={20} /> سجل التبرعات
              </a>
              <Link href="/periodicdonation" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-primary font-bold hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors">
                <CreditCard size={20} /> الاستقطاع والبطاقات
              </Link>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                  router.refresh();
                }}
                className="flex items-center gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold px-4 py-3 rounded-xl transition-colors mt-6 w-full text-right"
              >
                تسجيل الخروج
              </button>
            </nav>

            {/* Recurring Donation Modal — Portal renders to document.body */}
            <RecurringDonationModal />
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 flex flex-col gap-8">

            {/* Impact Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-black text-secondary dark:text-white mb-6 flex items-center gap-2">
                <Droplets className="text-primary" />
                ملخص أثرك العظيم
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "إجمالي تبرعاتك", value: "3,000 ر.س", border: "border-r-4 border-primary" },
                  { label: "العمليات الناجحة", value: "4 عملية", border: "border-r-4 border-emerald-500" },
                  { label: "مجموع الأسهم", value: "8 أسهم", border: "border-r-4 border-amber-500" },
                ].map((item, i) => (
                  <div key={i} className={`border border-gray-100 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-700/50 shadow-sm relative overflow-hidden ${item.border}`}>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-bold block mb-2">{item.label}</span>
                    <span className="text-3xl font-black text-secondary dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                  <Medal className="text-primary" />
                  أوسمة ونقاط العطاء
                </h2>
                <div className="bg-amber-100 text-amber-600 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                  <Trophy size={18} />
                  النقاط: 450
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                {[
                  { icon: Droplets, label: "ساقي الماء", level: "المستوى 1", color: "text-primary", bg: "bg-primary/5 border-primary/20", locked: false },
                  { icon: HeartHandshake, label: "المبادر الخيري", level: "المستوى 1", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700", locked: false },
                  { icon: History, label: "المستديم", level: "مغلق", color: "text-gray-400", bg: "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600", locked: true },
                ].map((badge, i) => (
                  <div key={i} className={`flex flex-col items-center p-4 border rounded-2xl ${badge.bg} ${badge.locked ? "opacity-50 grayscale" : "group relative overflow-hidden"}`}>
                    <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <badge.icon className={`${badge.color} w-8 h-8`} />
                    </div>
                    <span className="font-bold text-sm text-secondary dark:text-white">{badge.label}</span>
                    <span className="text-xs text-gray-400 mt-1">{badge.level}</span>
                    {!badge.locked && (
                      <Link href="/certificate" className="absolute bottom-0 left-0 w-full bg-primary text-white text-[10px] py-1 font-bold flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye size={12} /> الشهادة
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Donation History */}
            <div id="donation-history" className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                  <History className="text-primary" />
                  سجل التبرعات
                </h2>
                <Link href="/opportunities" className="flex items-center gap-1 text-primary text-sm font-bold hover:underline">
                  تبرع جديد <ArrowLeft size={14} />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-right px-4 py-3 font-bold text-gray-500 dark:text-gray-300 rounded-r-xl">رقم العملية</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-500 dark:text-gray-300">المشروع</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-500 dark:text-gray-300">المبلغ</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-500 dark:text-gray-300">التاريخ</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-500 dark:text-gray-300 rounded-l-xl">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {mockDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-4 py-4 font-mono text-xs text-gray-400">{d.id}</td>
                        <td className="px-4 py-4 font-bold text-gray-700 dark:text-gray-200">{d.project}</td>
                        <td className="px-4 py-4 font-black text-primary">{d.amount.toLocaleString()} ر.س</td>
                        <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1"><Calendar size={13} />{d.date}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">{d.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
