import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart3, Droplets, Users, Building2, Trophy, TrendingUp, Star } from "lucide-react";

const kpis = [
  { icon: Droplets, value: "3,864,001+", label: "عبوة ماء وُزِّعت", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { icon: Users, value: "179+", label: "أسرة مستفيدة", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { icon: Building2, value: "713+", label: "جهة مستفيدة", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  { icon: Trophy, value: "98%", label: "في مقاييس الحوكمة", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { icon: TrendingUp, value: "93,976+", label: "كرتون مياه", color: "text-primary", bg: "bg-primary/5 dark:bg-primary/10" },
  { icon: Star, value: "7", label: "فروع نشطة", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
];

const annualHighlights = [
  { year: "2025", title: "حملة رمضان", detail: "توزيع أكثر من 1.3 مليون عبوة ماء خلال شهر رمضان المبارك في مدينة الرياض" },
  { year: "2025", title: "الحملة الصيفية", detail: "انطلاق الحملة الصيفية بـ 800 ألف عبوة ماء في الرياض" },
  { year: "2025", title: "افتتاح الفرع السابع", detail: "افتتاح فرع حريملاء برعاية محافظ المنطقة" },
  { year: "2024", title: "شهادة الحوكمة", detail: "حصول الجمعية على 98٪ في مقاييس الحوكمة المؤسسية" },
  { year: "2024", title: "الشراكة الصحية", detail: "توقيع اتفاقية مع تجمع الرياض الصحي الثالث بوزارة الصحة" },
  { year: "2023", title: "اليوم الوطني 93", detail: "مشاركة الجمعية في فعاليات اليوم الوطني 93 بتوزيع المياه" },
];

const projectStats = [
  { category: "تبرع بثلاجة", target: 40000, collected: 16000 },
  { category: "تبرع بكرتون ماء", target: 32500, collected: 7072 },
  { category: "سقيا المساجد", target: 195000, collected: 9828 },
  { category: "سقيا المقابر", target: 10000, collected: 5615 },
  { category: "مشروع الوقف", target: 100000, collected: 1230 },
  { category: "تحلية المياه", target: 7000, collected: 1005 },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-l from-secondary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">تقارير وإحصائيات الجمعية</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            الشفافية هي أساس عملنا المؤسسي. نضع بين أيديكم أرقام الإنجاز الموثقة لجمعية سقيا الماء.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-16">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className={`w-14 h-14 ${kpi.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                <kpi.icon className={`${kpi.color} w-7 h-7`} />
              </div>
              <div>
                <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Progress Bars */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-secondary dark:text-white mb-8 flex items-center gap-2">
            <TrendingUp className="text-primary" />
            إنجاز المشاريع الجارية
          </h2>
          <div className="flex flex-col gap-6">
            {projectStats.map((p, i) => {
              const pct = Math.min((p.collected / p.target) * 100, 100).toFixed(0);
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{p.category}</span>
                    <span className="text-xs text-gray-400 font-mono">{p.collected.toLocaleString()} / {p.target.toLocaleString()} ر.س</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-l from-primary to-primary-light h-3 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-left text-xs text-primary font-bold mt-1">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Annual Highlights Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-secondary dark:text-white mb-8 flex items-center gap-2">
            <Star className="text-primary" />
            أبرز إنجازات الجمعية
          </h2>
          <div className="flex flex-col gap-4">
            {annualHighlights.map((h, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="bg-primary/10 dark:bg-primary/20 text-primary font-black text-sm px-3 py-2 rounded-xl shrink-0 w-16 text-center">
                  {h.year}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex-grow">
                  <h3 className="font-bold text-secondary dark:text-white mb-1">{h.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
