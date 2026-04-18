"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardRenderer from "@/components/CardRenderer";
import { getDatabaseRows, DatabaseRow } from "@/lib/db";
import { Search, Filter, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<DatabaseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      const allRows = await getDatabaseRows();
      
      const filtered = allRows.filter(row => {
        const matchesQuery = 
          row.Title.toLowerCase().includes(query.toLowerCase()) ||
          row.Description.toLowerCase().includes(query.toLowerCase()) ||
          row.Category.toLowerCase().includes(query.toLowerCase());
        
        if (filter === "all") return matchesQuery;
        if (filter === "projects") return matchesQuery && row.TemplateType === "Project";
        if (filter === "news") return matchesQuery && row.TemplateType === "News";
        return matchesQuery;
      });

      setResults(filtered);
      setLoading(false);
    }
    performSearch();
  }, [query, filter]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-secondary dark:text-white mb-2 font-heading">
            نتائج البحث عن: <span className="text-primary">"{query}"</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-body">
            تم العثور على {results.length} نتيجة في الموقع.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-midnight-surface p-1.5 rounded-2xl border border-gray-100 dark:border-midnight-border shadow-soft">
          <button 
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all font-body ${filter === 'all' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-950'}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilter("projects")}
            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all font-body ${filter === 'projects' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-950'}`}
          >
            المشاريع
          </button>
          <button 
            onClick={() => setFilter("news") || alert("سيتم إضافة أخبار قريباً.")}
            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all font-body ${filter === 'news' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-950'}`}
          >
            المكتبة الإعلامية
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400 font-bold font-body">جاري البحث في أرجاء الموقع...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((row) => (
            <CardRenderer key={row.ID} row={row} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-midnight-surface rounded-[2.5rem] p-16 text-center border border-gray-100 dark:border-midnight-border shadow-soft max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-950 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Search size={40} />
          </div>
          <h2 className="text-2xl font-black text-secondary dark:text-white mb-4 font-heading">لم نجد ما تبحث عنه</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 font-body text-lg">
            جرب كلمات بحث أخرى أو تصفح منصة التبرعات لاستكشاف أحدث الفرص المتاحة.
          </p>
          <Link 
            href="/opportunities" 
            className="inline-flex items-center gap-2 bg-primary text-white font-black px-10 py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:-translate-y-1"
          >
            تصفح جميع الفرص <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        }>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
