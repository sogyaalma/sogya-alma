import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Handshake } from "lucide-react";

export default function PartnerProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="bg-[#002b5e] py-20 text-white text-center mb-8 border-b-4 border-primary">
         <Handshake size={48} className="mx-auto mb-4 opacity-80" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">ملف الشريك الاستراتيجي</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto text-gray-300">
            بوابة متخصصة للجهات المانحة والمؤسسات الوقفية لتتبع أثر مشاريعهم التنموية.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
         <div className="bg-white rounded-2xl shadow-soft p-12 border border-gray-100 text-center">
            <h2 className="text-2xl font-bold font-ibm text-gray-800 mb-2">تسجيل دخول شركاء النجاح</h2>
            <p className="text-gray-500 mb-8">الوصول لتقارير الإنجاز التفصيلية وإدارة الصناديق الوقفية.</p>
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">تسجيل الدخول</button>
         </div>
      </main>
      <Footer />
    </div>
  );
}
