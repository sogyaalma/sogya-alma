import { getDatabaseRows } from "@/lib/csv-db";
import CardRenderer from "@/components/CardRenderer";
import Link from "next/link";
import { Newspaper, ArrowLeft } from "lucide-react";

export default async function LatestNews() {
  const rows = await getDatabaseRows();
  const newsItems = rows.filter(r => r.TemplateType === "News").slice(0, 3);

  if (newsItems.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Newspaper size={20} />
              </span>
              المركز الإعلامي
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
              آخر أخبار ومستجدات جمعية سقيا الماء وتقارير إنجازاتها الميدانية.
            </p>
          </div>
          <Link
            href="/media"
            className="flex items-center gap-2 text-primary hover:text-primary-dark font-bold group"
          >
            كل الأخبار
            <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <CardRenderer key={item.ID} row={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
