import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, FileBarChart, Download, PieChart, Award } from "lucide-react";
import Link from "next/link";

const financialYears = [
  {
    year: "2024",
    totalIncome: "2,847,320",
    totalExpenses: "2,690,445",
    surplus: "156,875",
    projectsCount: 47,
    efficiency: "94.2%",
  },
  {
    year: "2023",
    totalIncome: "1,924,110",
    totalExpenses: "1,832,900",
    surplus: "91,210",
    projectsCount: 38,
    efficiency: "93.8%",
  },
];

const allocations = [
  { label: "مشاريع مياه مباشرة", pct: 82, color: "bg-primary" },
  { label: "إدارة الجمعية", pct: 10, color: "bg-amber-500" },
  { label: "التوعية والتطوير", pct: 5, color: "bg-emerald-500" },
  { label: "الاحتياطي الطارئ", pct: 3, color: "bg-gray-400" },
];

export default function FinancialsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileBarChart className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">القوائم المالية والتقارير السنوية</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            نُصدر تقاريرنا المالية بشكل دوري التزاماً بمبدأ الشفافية ومتطلبات الجهات الرقابية.
          </p>
        </div>

        {/* Annual Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {financialYears.map((y) => (
            <div key={y.year} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-black text-secondary dark:text-white flex items-center gap-2">
                  <TrendingUp className="text-primary" size={22} /> التقرير السنوي {y.year}
                </h2>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">مدقق خارجياً</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">إجمالي الإيرادات</p>
                  <p className="text-lg font-black text-primary">{y.totalIncome} ر.س</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">إجمالي المصروفات</p>
                  <p className="text-lg font-black text-gray-700 dark:text-gray-200">{y.totalExpenses} ر.س</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">الفائض</p>
                  <p className="text-lg font-black text-emerald-600">{y.surplus} ر.س</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">كفاءة الصرف</p>
                  <p className="text-lg font-black text-amber-600">{y.efficiency}</p>
                </div>
              </div>
              <a href="#" className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition text-sm">
                <Download size={16} /> تحميل PDF
              </a>
            </div>
          ))}
        </div>

        {/* Allocation Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-6 flex items-center gap-2">
            <PieChart className="text-primary" size={22} /> توزيع المصروفات
          </h2>
          <div className="flex flex-col gap-4">
            {allocations.map((a, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
                  <span>{a.label}</span>
                  <span>{a.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                  <div className={`${a.color} h-3 rounded-full`} style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Badge */}
        <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 flex items-center gap-4 border border-primary/20">
          <Award className="text-primary shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-1">شهادة الاعتماد المؤسسي</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              حصلت الجمعية على 98% في مقاييس الحوكمة من المركز الوطني لتنمية القطاع غير الربحي. التقارير المالية مدققة من مكتب مستقل معتمد لدى هيئة المحاسبين السعوديين.
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
