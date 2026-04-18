"use client";
import { useState } from "react";
import Link from "next/link";
import { Newspaper, Video, Image as ImageIcon, ArrowLeft, Calendar, Tag, PlayCircle, Clock } from "lucide-react";
import type { Post } from "@/lib/mdx";
import type { DatabaseRow } from "@/lib/csv-db";

interface Props {
  mdxPosts: Post[];
  csvNews: DatabaseRow[];
}

const tabs = [
  { id: "news",   label: "الأخبار",   icon: Newspaper },
  { id: "videos", label: "الفيديوهات", icon: Video },
  { id: "photos", label: "الصور",     icon: ImageIcon },
];

function MdxCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.meta.slug}`} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="h-44 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center relative">
        <Newspaper size={40} className="text-primary/40" />
        <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.meta.category}</div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Calendar size={12} />
          <span>{new Date(post.meta.date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {post.meta.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{post.meta.excerpt}</p>
        <span className="text-primary font-bold text-sm flex items-center gap-1">
          اقرأ المزيد <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

function CsvCard({ row }: { row: DatabaseRow }) {
  return (
    <Link href={`/media/${row.ID}`} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative">
        <Newspaper size={40} className="text-gray-300 dark:text-gray-500" />
        <div className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-primary text-xs font-bold px-2.5 py-1 rounded-full">{row.Category}</div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {row.Title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{row.Description}</p>
        <span className="text-primary font-bold text-sm flex items-center gap-1">
          اقرأ المزيد <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

function NewsTab({ mdxPosts, csvNews }: Props) {
  return (
    <div>
      {mdxPosts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            أحدث المقالات المحررة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mdxPosts.map((post) => <MdxCard key={post.meta.slug} post={post} />)}
          </div>
        </div>
      )}
      {csvNews.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gray-400 rounded-full inline-block" />
            إصدارات وبيانات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {csvNews.map((row) => <CsvCard key={row.ID} row={row} />)}
          </div>
        </div>
      )}
      {mdxPosts.length === 0 && csvNews.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Newspaper size={48} className="mx-auto mb-4 opacity-30" />
          <p>لا توجد أخبار حالياً</p>
        </div>
      )}
    </div>
  );
}

function VideosTab() {
  const videos = [
    { title: "حفل تكريم المتطوعين 2024", duration: "12:45", cat: "فعاليات" },
    { title: "جولة ميدانية في مشاريع السقيا", duration: "8:20", cat: "ميداني" },
    { title: "كلمة رئيس مجلس الإدارة في الجمعية العمومية", duration: "15:00", cat: "مؤسسي" },
    { title: "توزيع المياه في رمضان 1446هـ", duration: "6:35", cat: "رمضان" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((v, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
          <div className="h-48 bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 flex items-center justify-center relative">
            <PlayCircle size={56} className="text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all" />
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
              <Clock size={11} /> {v.duration}
            </div>
            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{v.cat}</div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-primary transition-colors">{v.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotosTab() {
  const photos = Array.from({ length: 8 }, (_, i) => ({
    title: `صورة من فعاليات جمعية سقيا الماء ${i + 1}`,
    cat: ["ميداني", "فعاليات", "مشاريع", "تطوع"][i % 4],
  }));
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((p, i) => (
        <div key={i} className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-primary/10 dark:to-secondary/20 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center group cursor-pointer hover:shadow-md transition-all relative overflow-hidden">
          <ImageIcon size={32} className="text-primary/30 group-hover:scale-110 transition-transform" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform">
            <p className="text-white text-[10px] font-bold text-center leading-tight">{p.title}</p>
          </div>
          <span className="absolute top-2 right-2 bg-primary/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{p.cat}</span>
        </div>
      ))}
    </div>
  );
}

export default function MediaLibraryClient({ mdxPosts, csvNews }: Props) {
  const [activeTab, setActiveTab] = useState("news");

  const totalNews = mdxPosts.length + csvNews.length;

  return (
    <main className="flex-grow">
      {/* Hero */}
      <div className="bg-gradient-to-l from-secondary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Newspaper size={40} className="mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-black mb-3">المكتبة الإعلامية</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            مركز الأخبار والفيديوهات والصور لجمعية سقيا الماء — {totalNews} خبراً ومقالاً
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-bold text-sm border-b-2 transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-primary"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {tab.id === "news" && (
                  <span className="bg-primary/10 text-primary text-xs font-black px-2 py-0.5 rounded-full">{totalNews}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-10">
        {activeTab === "news" && <NewsTab mdxPosts={mdxPosts} csvNews={csvNews} />}
        {activeTab === "videos" && <VideosTab />}
        {activeTab === "photos" && <PhotosTab />}
      </div>
    </main>
  );
}
