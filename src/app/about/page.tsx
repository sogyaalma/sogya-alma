"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  FileText, Building2, Gavel, Scale, FileArchive,
  CheckCircle2, Users, Shield, FileBarChart, TrendingUp,
  Database, Download, Code2, FileJson, Globe, PieChart,
  Award, ShieldCheck, ChevronDown,
} from "lucide-react";

const boardMembers = [
  { name: "د. عبدالله بن عبدالعزيز آل طالب", role: "رئيس مجلس الإدارة" },
  { name: "م. محمد بن إبراهيم بن حيدر", role: "نائب رئيس مجلس الإدارة" },
  { name: "أ. عبدالرحمن المقبل", role: "عضو مجلس الإدارة" },
  { name: "أ. عبدالعزيز بن قعيد", role: "عضو مجلس الإدارة" },
  { name: "أ. سامر العدياني", role: "عضو مجلس الإدارة" },
];

const pdfFiles = [
  { name: "القوائم المالية 2024", size: "2.4 MB", path: "/docs/financial-2024.pdf" },
  { name: "التقرير الختامي للإنجازات", size: "5.1 MB", path: "/docs/annual-report.pdf" },
  { name: "اللائحة الأساسية للجمعية", size: "1.2 MB", path: "/docs/charter.pdf" },
];

const tabs = [
  { id: "about", label: "عن الجمعية" },
  { id: "policies", label: "اللوائح والسياسات" },
  { id: "financials", label: "القوائم المالية" },
  { id: "opendata", label: "البيانات المفتوحة" },
];

// ─── Tab Content Components ──────────────────────────────────────────────────

function AboutTab() {
  return (
    <div className="flex flex-col gap-10">
      {/* Vision Mission */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2"><Shield size={20} /> رؤيتنا</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">أن تكون جمعية سقيا الماء المنصة الأولى والأكثر موثوقية لتوصيل الماء الصافي لكل من يحتاجه في المملكة العربية السعودية.</p>
        </div>
        <div className="bg-secondary/5 dark:bg-secondary/10 border border-secondary/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-secondary dark:text-primary mb-3 flex items-center gap-2"><Users size={20} /> رسالتنا</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">تيسير عمليات التبرع بالمياه وتوزيعها بكفاءة وشفافية عالية على المستحقين في جميع مناطق المملكة.</p>
        </div>
      </div>

      {/* License Info */}
      <div className="bg-white dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 p-6">
        <h3 className="font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
          <FileText className="text-primary" size={20} /> بيانات الترخيص والتسجيل
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "رقم الترخيص", value: "1123" },
            { label: "جهة الإشراف", value: "وزارة الموارد البشرية" },
            { label: "تاريخ التأسيس", value: "1443/03/14هـ" },
            { label: "نسبة الحوكمة", value: "98%" },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-600 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
              <p className="font-black text-secondary dark:text-white text-lg">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Board Members */}
      <div>
        <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
          <Users className="text-primary" size={22} /> أعضاء مجلس الإدارة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boardMembers.map((m, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary text-lg shrink-0">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-secondary dark:text-white">{m.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Downloads */}
      <div>
        <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
          <FileArchive className="text-primary" size={22} /> الوثائق والتقارير
        </h3>
        <div className="flex flex-col gap-3">
          {pdfFiles.map((f, i) => (
            <a key={i} href={f.path} download className="flex items-center justify-between bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:border-primary rounded-xl p-4 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="text-red-500" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-700 dark:text-gray-200">{f.name}</p>
                  <p className="text-xs text-gray-400">{f.size}</p>
                </div>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PoliciesTab() {
  const policies = [
    {
      icon: ShieldCheck, title: "سياسة الحوكمة المؤسسية",
      summary: "تلتزم الجمعية بأعلى معايير الحوكمة الصادرة عن المركز الوطني لتنمية القطاع غير الربحي. يجتمع مجلس الإدارة 4 مرات سنوياً على الأقل.",
      items: ["الجمعية العمومية مرة سنوياً", "تدقيق مالي خارجي مستقل", "إفصاح كامل في التقرير السنوي", "98% في مقاييس الحوكمة 2024"],
    },
    {
      icon: Scale, title: "سياسة تجنب تضارب المصالح",
      summary: "يلتزم أعضاء المجلس بالإفصاح عن أي مصلحة شخصية في القرارات والامتناع عن التصويت عند وجود تضارب.",
      items: ["نموذج إفصاح سنوي لكل عضو", "سياسة باب مفتوح مع المستفيدين", "لجنة رقابة داخلية مستقلة", "خط ساخن للإبلاغ عن المخالفات"],
    },
    {
      icon: FileText, title: "سياسة قبول التبرعات وصرفها",
      summary: "يُصرف 90%+ من تبرعات المشاريع المخصصة مباشرةً على المشروع. بحد أقصى 10% للتشغيل.",
      items: ["نسبة توجيه للمشاريع 90%+", "تقرير أثر لكل تبرع فوق 500 ريال", "قبول التبرعات بالعملات المحلية", "إيصالات رسمية معتمدة"],
    },
    {
      icon: Gavel, title: "اللائحة الأساسية للجمعية",
      summary: "تأسست بموجب نظام الجمعيات السعودي الصادر بالمرسوم الملكي رقم م/8، وتعمل تحت إشراف وزارة الموارد البشرية.",
      items: ["رقم السجل: 1123", "الجهة المشرفة: وزارة الموارد البشرية", "النشرة الرسمية: 1443/03/14هـ", "الهدف: سقيا الماء للمحتاجين"],
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      {policies.map((p, i) => (
        <div key={i} className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl p-6 flex gap-5">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <p.icon className="text-primary" size={22} />
          </div>
          <div>
            <h3 className="font-bold text-secondary dark:text-white mb-2">{p.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{p.summary}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {p.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle2 size={14} className="text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function FinancialsTab() {
  const years = [
    { year: "2024", income: "2,847,320", expenses: "2,690,445", surplus: "156,875", efficiency: "94.2%" },
    { year: "2023", income: "1,924,110", expenses: "1,832,900", surplus: "91,210", efficiency: "93.8%" },
  ];
  const allocations = [
    { label: "مشاريع مياه مباشرة", pct: 82, color: "bg-primary" },
    { label: "إدارة الجمعية", pct: 10, color: "bg-amber-500" },
    { label: "التوعية والتطوير", pct: 5, color: "bg-emerald-500" },
    { label: "الاحتياطي الطارئ", pct: 3, color: "bg-gray-400" },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-2 gap-5">
        {years.map((y) => (
          <div key={y.year} className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-secondary dark:text-white flex items-center gap-2">
                <TrendingUp className="text-primary" size={18} /> التقرير السنوي {y.year}
              </h3>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">مدقق خارجياً</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { l: "الإيرادات", v: y.income, c: "text-primary" },
                { l: "المصروفات", v: y.expenses, c: "text-gray-700 dark:text-gray-200" },
                { l: "الفائض", v: y.surplus, c: "text-emerald-600" },
                { l: "الكفاءة", v: y.efficiency, c: "text-amber-600" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-600 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.l}</p>
                  <p className={`font-black ${item.c}`}>{item.v} {i < 3 ? "ر.س" : ""}</p>
                </div>
              ))}
            </div>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-primary/20 text-primary rounded-xl hover:bg-primary/5 font-bold text-sm transition">
              <Download size={15} /> تحميل PDF
            </a>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl p-6">
        <h3 className="font-bold text-secondary dark:text-white mb-5 flex items-center gap-2">
          <PieChart className="text-primary" size={20} /> توزيع المصروفات
        </h3>
        {allocations.map((a, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
              <span>{a.label}</span><span>{a.pct}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-2.5">
              <div className={`${a.color} h-2.5 rounded-full`} style={{ width: `${a.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
        <Award className="text-primary shrink-0" size={36} />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          جميع التقارير مدققة من مكتب محاسبة مستقل معتمد لدى <strong>هيئة المحاسبين السعوديين</strong>. حصلت الجمعية على <strong>98%</strong> في مقاييس الحوكمة من المركز الوطني لتنمية القطاع غير الربحي.
        </p>
      </div>
    </div>
  );
}

function OpenDataTab() {
  const datasets = [
    { title: "بيانات المشاريع المنفذة", desc: "جميع مشاريع السقيا مع المبالغ المجمعة وعدد المستفيدين.", format: "CSV / JSON", endpoint: "/api/v1/opportunities?type=Project" },
    { title: "إحصاءات الأثر الاجتماعي", desc: "أعداد المستفيدين مصنفة حسب المنطقة الجغرافية والفئة.", format: "JSON", endpoint: "/api/v1/opportunities?type=Project" },
    { title: "بيانات الفروع والمواقع", desc: "مواقع الفروع السبعة ومعلومات التواصل وأوقات العمل.", format: "JSON / GeoJSON", endpoint: "/api/v1/opportunities?type=Branch" },
    { title: "قائمة الأخبار والإصدارات", desc: "أرشيف أخبار الجمعية وبياناتها الصحفية منذ التأسيس.", format: "JSON", endpoint: "/api/v1/opportunities?type=News" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-secondary/5 dark:bg-secondary/10 border border-secondary/20 rounded-xl p-4 flex items-start gap-3">
        <Code2 className="text-secondary dark:text-primary shrink-0 mt-1" size={22} />
        <div>
          <h3 className="font-bold text-secondary dark:text-white mb-1">REST API مفتوح</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            يمكن الوصول لجميع البيانات عبر <code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-mono">/api/v1/</code>
          </p>
          <a href="/api/v1/opportunities" target="_blank" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
            <Globe size={13} /> تجربة الـ API
          </a>
        </div>
      </div>
      {datasets.map((ds, i) => (
        <div key={i} className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl p-5 flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div className="flex items-start gap-3">
            <FileJson className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-secondary dark:text-white mb-1">{ds.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{ds.desc}</p>
              <span className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-mono">{ds.format}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href={ds.endpoint} target="_blank" className="text-xs font-bold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition flex items-center gap-1">
              <Globe size={12} /> API
            </a>
            <a href="#" className="text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition flex items-center gap-1">
              <Download size={12} /> CSV
            </a>
          </div>
        </div>
      ))}
      <p className="text-center text-sm text-gray-400 dark:text-gray-500">
        جميع البيانات تحت رخصة <strong className="text-gray-600 dark:text-gray-300">CC BY 4.0</strong> — يُسمح بالاستخدام مع نسب المصدر.
      </p>
    </div>
  );
}

// ─── Main Page (inner, reads ?tab= from URL) ─────────────────────────────────

function AboutPageInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") ?? "about";
  const validTabs = tabs.map((t) => t.id);
  const [activeTab, setActiveTab] = useState(
    validTabs.includes(tabParam) ? tabParam : "about"
  );

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t && validTabs.includes(t)) setActiveTab(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-l from-secondary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Building2 size={40} className="mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-black mb-3">جمعية سقيا الماء</h1>
          <p className="text-white/80 max-w-xl mx-auto">منصة وطنية موثوقة تهدف لسقيا المحتاجين في جميع أنحاء المملكة العربية السعودية.</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-6 py-4 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main className="flex-grow container mx-auto px-4 md:px-8 py-10 max-w-5xl">
        {activeTab === "about" && <AboutTab />}
        {activeTab === "policies" && <PoliciesTab />}
        {activeTab === "financials" && <FinancialsTab />}
        {activeTab === "opendata" && <OpenDataTab />}
      </main>

      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">جاري التحميل...</div>}>
      <AboutPageInner />
    </Suspense>
  );
}
