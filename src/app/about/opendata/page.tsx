import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Database, Download, Code2, FileJson, Globe } from "lucide-react";

const datasets = [
  {
    title: "بيانات المشاريع المنفذة",
    description: "جميع مشاريع سقيا الماء من 2018 حتى اليوم مع المبالغ المجمعة وعدد المستفيدين.",
    format: "CSV / JSON",
    lastUpdate: "أبريل 2025",
    size: "84 KB",
    endpoint: "/api/v1/opportunities?type=Project",
  },
  {
    title: "إحصاءات الأثر الاجتماعي",
    description: "أعداد المستفيدين مصنفة حسب المنطقة الجغرافية والفئة العمرية ونوع الخدمة.",
    format: "JSON",
    lastUpdate: "مارس 2025",
    size: "12 KB",
    endpoint: "/api/v1/opportunities?type=Project&status=completed",
  },
  {
    title: "بيانات الفروع والمواقع",
    description: "مواقع فروع الجمعية السبعة ومعلومات التواصل وأوقات العمل.",
    format: "JSON / GeoJSON",
    lastUpdate: "فبراير 2025",
    size: "4 KB",
    endpoint: "/api/v1/opportunities?type=Branch",
  },
  {
    title: "قائمة الأخبار والإصدارات",
    description: "أرشيف أخبار الجمعية وبياناتها الصحفية منذ التأسيس.",
    format: "JSON",
    lastUpdate: "أبريل 2025",
    size: "48 KB",
    endpoint: "/api/v1/opportunities?type=News",
  },
];

export default function OpenDataPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">البيانات المفتوحة</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            نؤمن بمبدأ الشفافية الرقمية — نُتيح بيانات جمعيتنا للباحثين والمطورين والجهات المهتمة بالعمل الخيري.
          </p>
        </div>

        {/* API Note */}
        <div className="bg-secondary/5 dark:bg-secondary/10 border border-secondary/20 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <Code2 className="text-secondary dark:text-primary shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-1">واجهة برمجية مفتوحة (REST API)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              يمكن الوصول لجميع البيانات برمجياً عبر API موحد على المسار <code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-mono">/api/v1/</code>
            </p>
            <a href="/api/v1/opportunities" target="_blank" rel="noopener noreferrer"
              className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              <Globe size={14} /> تجربة الـ API
            </a>
          </div>
        </div>

        {/* Datasets */}
        <div className="flex flex-col gap-4 mb-8">
          {datasets.map((ds, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm flex items-start justify-between gap-4 flex-col md:flex-row">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <FileJson className="text-primary" size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-secondary dark:text-white mb-1">{ds.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{ds.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-mono">{ds.format}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">{ds.size}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">آخر تحديث: {ds.lastUpdate}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={ds.endpoint} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/30 px-3 py-2 rounded-lg hover:bg-primary/5 transition">
                  <Globe size={13} /> API
                </a>
                <a href="#" className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Download size={13} /> تحميل
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* License Note */}
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          جميع البيانات المتاحة تحت رخصة المشاع الإبداعي
          <strong className="text-gray-700 dark:text-gray-200"> CC BY 4.0</strong> — يُسمح بالاستخدام مع نسب المصدر.
        </div>
      </main>
      <Footer />
    </div>
  );
}
