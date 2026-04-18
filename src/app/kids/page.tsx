import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Smile } from "lucide-react";

export default function KidsPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <Header />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-16 text-white text-center rounded-b-[40px] mb-8">
         <Smile size={48} className="mx-auto mb-4 opacity-90" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">منصة سقيا للأطفال</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto">
            علم أطفالك قيمة العطاء والتبرع من خلال تجربة تفاعلية آمنة.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl text-center text-gray-500">
         <div className="bg-white rounded-3xl shadow-lg p-12 border border-blue-100">
            <h2 className="text-2xl font-bold font-ibm text-blue-800 mb-4">قريباً: ألعاب التبرع التفاعلية</h2>
            <p className="text-gray-600">منصة مخصصة للأطفال تغرس فيهم قيم العمل الخيري بإشراف الوالدين.</p>
         </div>
      </main>
      <Footer />
    </div>
  );
}
