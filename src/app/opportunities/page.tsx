import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardRenderer from "@/components/CardRenderer";
import { getDatabaseRows } from "@/lib/db";
import Link from "next/link";
import { Droplets, Filter } from "lucide-react";

const FILTERS = [
  { label: "الكل", value: "" },
  { label: "سقيا مساجد", value: "مساجد" },
  { label: "حفر آبار", value: "آبار" },
  { label: "سقيا الأسر", value: "الأسر" },
  { label: "تبرع بثلاجة", value: "ثلاجة" },
  { label: "مشاريع الوقف", value: "وقف" },
];

async function getProjects(search?: string) {
  const rows = await getDatabaseRows();
  let filteredRows = rows.filter(row => row.TemplateType === 'Project');

  if (search) {
    const q = search.toLowerCase();
    filteredRows = filteredRows.filter(row => 
      row.Title.toLowerCase().includes(q) || 
      row.Description.toLowerCase().includes(q) ||
      row.Category.toLowerCase().includes(q)
    );
  }
  return filteredRows;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const unwrappedParams = await searchParams;
  const activeSearch = unwrappedParams?.search || "";
  const projects = await getProjects(activeSearch);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-l from-primary to-primary-dark py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplets size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 font-ibm">دليل فرص التبرع والمشاريع</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            تصفح جميع مشاريع جمعية سقيا الماء واختر المشروع الذي تود المساهمة فيه. كل ريال يُحدث فرقاً.
          </p>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 sticky top-[72px] z-40 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Filter size={18} />
              <span className="font-bold text-sm hidden md:inline">تصفية حسب:</span>
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {FILTERS.map((f) => (
                <Link
                  key={f.value}
                  href={f.value ? `/opportunities?search=${encodeURIComponent(f.value)}` : "/opportunities"}
                  className={`px-5 py-2 rounded-full font-bold text-sm shrink-0 transition-colors ${
                    activeSearch === f.value
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {f.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-12 pb-24 container mx-auto px-4 md:px-8">
        {activeSearch && (
           <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                نتائج البحث عن: <span className="text-primary">{activeSearch}</span>
              </h2>
              <p className="text-gray-500 mt-2">وجدنا ({projects.length}) فرص تبرعية مطابقة.</p>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <CardRenderer key={project.ID} row={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
               <div className="text-gray-400 mb-4 text-6xl">🔍</div>
               <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">لا توجد نتائج مطابقة</h3>
               <p className="text-gray-500 mb-6">حاول البحث باستخدام كلمات أخرى مثل (حفر، سقيا، وقف).</p>
               <Link href="/opportunities" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition">
                 عرض جميع المشاريع
               </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
