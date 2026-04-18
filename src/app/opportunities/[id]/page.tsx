import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Users, Droplets, ArrowRight, Share2, Heart, CircleCheck } from "lucide-react";
import Link from "next/link";
import DonationSidebar from "@/components/DonationSidebar";
import { getDatabaseRows } from "@/lib/csv-db";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pb-24">
        
        {/* Project Header Banner */}
        <div className="bg-secondary text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544473244-f6895e69da8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
          <div className="container mx-auto px-4 relative z-10">
            <Link href="/opportunities" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowRight size={20} />
              العودة للفرص
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">{row.Category}</span>
                <h1 className="text-3xl md:text-5xl font-black mb-4">{row.Title}</h1>
                <div className="flex items-center gap-4 text-white/80">
                  <span className="flex items-center gap-1"><MapPin size={18} /> القصيم - بريدة</span>
                  <span className="flex items-center gap-1"><Users size={18} /> 128 متبرع</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Details */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <h2 className="text-2xl font-bold text-secondary mb-4">عن المشروع</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {row.Description !== '-' ? row.Description : 'لا يوجد وصف متاح لهذه الفرصة حالياً.'}
                </p>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Droplets className="text-primary mb-2" size={24} />
                    <span className="text-sm text-gray-500">سعة البئر</span>
                    <span className="font-bold text-gray-800">10,000 لتر</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <MapPin className="text-emerald-500 mb-2" size={24} />
                    <span className="text-sm text-gray-500">العمق</span>
                    <span className="font-bold text-gray-800">120 متر</span>
                  </div>
                </div>
              </div>

              {/* Field Tracking / Location */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <h2 className="text-xl font-bold text-secondary mb-4">التحديثات الميدانية</h2>
                <div className="flex gap-4">
                  <div className="w-1/3 h-32 bg-gray-200 rounded-xl bg-[url('https://images.unsplash.com/photo-1615967073708-46add16cfafe?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80')] bg-cover bg-center"></div>
                  <div className="w-1/3 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">انتظار الاكتمال</div>
                  <div className="w-1/3 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">انتظار الاكتمال</div>
                </div>
              </div>
            </div>

            {/* Donation Sidebar (Shares System) */}
            <div className="flex flex-col gap-6">
              <DonationSidebar 
                percentage={percentage} 
                collectedAmount={collectedAmount} 
                targetAmount={targetAmount} 
              />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
