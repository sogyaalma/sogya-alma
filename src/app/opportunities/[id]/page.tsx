import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Users, Droplets, ArrowRight, Share2, Heart, CircleCheck } from "lucide-react";
import Link from "next/link";
import DonationSidebar from "@/components/DonationSidebar";
import { getDatabaseRows } from "@/lib/db";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const rows = await getDatabaseRows();
  const row = rows.find(r => r.ID === id);
  return {
    title: row ? `${row.Title} | سقيا الماء` : "مشروع تبرع | سقيا الماء",
    description: row?.Description ?? "اكتشف مشاريع التبرع في جمعية سقيا الماء",
  };
}

async function getOpportunity(id: string) {
  const rows = await getDatabaseRows();
  const row = rows.find(r => r.ID === id);
  return row || null;
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const row = await getOpportunity(unwrappedParams.id);

  if (!row) return <div className="p-20 text-center font-bold">الفرصة غير موجودة</div>;
  
  const targetAmount = parseFloat(row.TargetAmount) || 0;
  const collectedAmount = parseFloat(row.CollectedAmount) || 0;
  const percentage = targetAmount > 0 ? Math.min((collectedAmount / targetAmount) * 100, 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
      <Header />
      <main className="flex-grow pb-24">
        
        {/* Project Header Banner */}
        <div className="bg-secondary dark:bg-[#0f172a] text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1538300342682-ffa5ecf1d5d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary dark:from-[#020617] to-transparent"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <Link href="/opportunities" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-all font-body font-black uppercase tracking-widest text-xs">
              <ArrowRight size={18} />
              العودة للفرص
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="max-w-3xl">
                <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black mb-6 inline-block font-body uppercase tracking-wider shadow-lg shadow-primary/20">{row.Category}</span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading leading-tight">{row.Title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-white/70 font-body text-sm font-black">
                  <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl"><MapPin size={18} className="text-primary" /> القصيم - بريدة</span>
                  <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl"><Users size={18} className="text-primary" /> 128 متبرع</span>
                  <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl"><CircleCheck size={18} className="text-emerald-500" /> مشروع معتمد</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90">
                  <Heart size={24} />
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90">
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Main Details */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <div className="bg-white dark:bg-midnight-surface rounded-[2.5rem] p-10 md:p-14 shadow-soft border border-gray-100 dark:border-midnight-border">
                <h2 className="text-3xl font-black text-secondary dark:text-white mb-8 font-heading">عن المشروع</h2>
                <div className="prose dark:prose-invert max-w-none">
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xl font-body">
                    {row.Description !== '-' ? row.Description : 'لا يوجد وصف متاح لهذه الفرصة حالياً.'}
                  </p>
                </div>
                
                <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-midnight-border flex flex-col items-center justify-center text-center transition-all hover:border-primary/30">
                    <Droplets className="text-primary mb-4" size={32} />
                    <span className="text-[10px] text-gray-400 font-black mb-1 font-body uppercase tracking-widest">سعة البئر</span>
                    <span className="font-black text-gray-800 dark:text-gray-200 font-heading text-lg">10,000 لتر</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-midnight-border flex flex-col items-center justify-center text-center transition-all hover:border-emerald-500/30">
                    <MapPin className="text-emerald-500 mb-4" size={32} />
                    <span className="text-[10px] text-gray-400 font-black mb-1 font-body uppercase tracking-widest">العمق</span>
                    <span className="font-black text-gray-800 dark:text-gray-200 font-heading text-lg">120 متر</span>
                  </div>
                </div>
              </div>

              {/* Field Tracking / Location */}
              <div className="bg-white dark:bg-midnight-surface rounded-[2.5rem] p-10 md:p-14 shadow-soft border border-gray-100 dark:border-midnight-border">
                <h2 className="text-2xl font-black text-secondary dark:text-white mb-8 font-heading">التحديثات الميدانية</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-950 rounded-[2rem] bg-[url('https://images.unsplash.com/photo-1615967073708-46add16cfafe?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80')] bg-cover bg-center border border-gray-100 dark:border-midnight-border overflow-hidden">
                    <div className="w-full h-full bg-black/20 flex items-end p-4">
                      <span className="bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black text-gray-800 dark:text-white font-body">بدء العمل</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-50 dark:bg-gray-950 rounded-[2rem] flex items-center justify-center text-gray-400 dark:text-gray-600 font-black border-2 border-dashed border-gray-200 dark:border-midnight-border font-body text-xs text-center px-6 uppercase tracking-wider">انتظار الاكتمال</div>
                  <div className="aspect-video bg-gray-50 dark:bg-gray-950 rounded-[2rem] flex items-center justify-center text-gray-400 dark:text-gray-600 font-black border-2 border-dashed border-gray-200 dark:border-midnight-border font-body text-xs text-center px-6 uppercase tracking-wider">انتظار الاكتمال</div>
                </div>
              </div>
            </div>

            {/* Donation Sidebar (Shares System) */}
            <div className="flex flex-col gap-6">
              <DonationSidebar 
                percentage={percentage} 
                collectedAmount={collectedAmount} 
                targetAmount={targetAmount} 
                projectId={row.ID}
                projectTitle={row.Title}
              />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
