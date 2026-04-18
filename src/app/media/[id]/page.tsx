import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDatabaseRows } from "@/lib/db";
import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowRight, Tag, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const rows = await getDatabaseRows();
  const dbItem = rows.find(r => r.ID === id && r.TemplateType === "News");
  const mdxItem = dbItem ? null : getPostBySlug("news", id);
  const title = dbItem?.Title || mdxItem?.meta.title || "خبر";

  return {
    title: `${title} | سقيا الماء`,
    description: dbItem?.Description || mdxItem?.meta.excerpt || "المركز الإعلامي لجمعية سقيا الماء",
  };
}

export default async function MediaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 1. Try DB first
  const rows = await getDatabaseRows();
  const dbItem = rows.find(r => r.ID === id && r.TemplateType === "News");
  
  // 2. Try MDX if not in DB
  const mdxItem = dbItem ? null : getPostBySlug("news", id);

  if (!dbItem && !mdxItem) return notFound();

  const title = dbItem?.Title || mdxItem?.meta.title;
  const description = dbItem?.Description || mdxItem?.meta.excerpt;
  const category = dbItem?.Category || mdxItem?.meta.category;
  const date = dbItem ? new Date() : new Date(mdxItem!.meta.date);
  
  const content = dbItem 
    ? (dbItem.Content || dbItem.Description) 
    : mdxItem!.content;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/media" className="hover:text-primary transition-colors">المركز الإعلامي</Link>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-gray-700 dark:text-gray-200 font-medium line-clamp-1">{title}</span>
        </div>

        <article className="bg-white dark:bg-gray-900/40 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Article Header */}
          <div className="bg-primary/5 dark:bg-primary/10 p-8 md:p-12 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <span className="flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                <Tag size={12} /> {category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <Calendar size={14} /> {date.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-secondary dark:text-gray-100 leading-tight mb-4 font-heading">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-body">
              {description}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-loose font-body">
              {content.split("\n").map((para, i) => para.trim() && (
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
