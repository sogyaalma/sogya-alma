import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Crown } from "lucide-react";

export default function MajorDonorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="bg-[#0D121C] py-20 text-[#D4AF37] text-center mb-8 border-b-4 border-[#004080]">
         <Crown size={48} className="mx-auto mb-4 opacity-80 text-[#D4AF37]" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">بوابة كبار المتبرعين</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto text-gray-300">
            خدمات مخصصة لشركاء العطاء وكبار الداعمين لمشاريع التنمية المستدامة.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
         <div className="bg-white rounded-2xl shadow-soft p-12 border border-gray-100 text-center">
            <h2 className="text-2xl font-bold font-ibm text-gray-800 mb-2">تسجيل الدخول لبوابة كبار المانحين</h2>
            <p className="text-gray-500 mb-8">توفر البوابة تقارير حصرية وخدمة مدير علاقات مخصص لإدارة مشاريعكم التبرعية.</p>
            <button className="bg-[#004080] hover:bg-[#002b5e] text-white px-8 py-3 rounded-xl font-bold transition-all">تسجيل الدخول كشريك</button>
         </div>
      </main>
      <Footer />
    </div>
  );
}
