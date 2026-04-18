import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDatabaseRows } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowRight, Tag, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const rows = await getDatabaseRows();
  const item = rows.find(r => r.ID === id && r.TemplateType === "News");
  return {
    title: item ? `${item.Title} | سقيا الماء` : "خبر | سقيا الماء",
    description: item?.Description ?? "المركز الإعلامي لجمعية سقيا الماء",
  };
}

export default async function MediaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await getDatabaseRows();
  const item = rows.find(r => r.ID === id && r.TemplateType === "News");

  if (!item) return notFound();

  // Parse markdown-like content
  const contentLines = item.Content
    ? item.Content.replace(/^#+ .+\n?/, "").trim()
    : item.Description;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/media" className="hover:text-primary transition-colors">المركز الإعلامي</Link>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-gray-700 dark:text-gray-200 font-medium line-clamp-1">{item.Title}</span>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Article Header */}
          <div className="bg-primary/5 dark:bg-primary/10 p-8 md:p-12 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <span className="flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                <Tag size={12} /> {item.Category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <Calendar size={14} /> {new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-secondary dark:text-white leading-tight mb-4">
              {item.Title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              {item.Description}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-loose">
              {contentLines.split("\n").map((para, i) => para.trim() && (
                <p key={i} className="mb-4">{para.trim()}</p>
              ))}
            </div>

            {/* Share / Back */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <Link
                href="/media"
                className="flex items-center gap-2 text-primary hover:text-primary-dark font-bold transition-colors"
              >
                <ArrowRight size={18} />
                العودة للمركز الإعلامي
              </Link>
              <div className="flex items-center gap-2 text-gray-400">
                <Newspaper size={16} />
                <span className="text-sm">جمعية سقيا الماء</span>
              </div>
            </div>
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}
