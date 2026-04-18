import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Megaphone } from "lucide-react";

export default function DonationCampaignPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="bg-primary hover:bg-primary-dark transition-colors py-16 text-white text-center rounded-b-[40px] mb-8">
         <Megaphone size={48} className="mx-auto mb-4 opacity-80" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">حملات التبرع (غراس)</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto">
            أنشئ حملتك التبرعية الخاصة وشاركها مع عائلتك وأصدقائك لدعم مشاريع الجمعية.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl text-center">
         <div className="bg-white rounded-2xl shadow-soft p-12 border border-gray-100">
            <h2 className="text-2xl font-bold font-ibm text-gray-800 mb-4">أنشئ حملتك الآن</h2>
            <p className="text-gray-500 mb-6">ساهم في نشر الخير عبر بناء رابط تبرع خاص بك وتتبع وصول المبالغ بوضوح تام.</p>
            <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all">ابدأ بإنشاء حملة</button>
         </div>
      </main>
      <Footer />
    </div>
  );
}
