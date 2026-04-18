import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquareText } from "lucide-react";

export default function SmsDonationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="bg-primary hover:bg-primary-dark transition-colors py-16 text-white text-center rounded-b-[40px] mb-8">
         <MessageSquareText size={48} className="mx-auto mb-4 opacity-80" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">التبرع بالرسائل النصية</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto">
            ساهم باستقطاع شهري ميسر عبر رسالة نصية (SMS) من هاتفك المحمول.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl text-center text-gray-500">
         <div className="bg-white rounded-2xl shadow-soft p-12 border border-gray-100 flex flex-col items-center">
            <h2 className="text-2xl font-bold font-ibm text-gray-700 mb-6">أرسل رقم (1) إلى الرقم الموحد 5050</h2>
            <div className="grid grid-cols-3 gap-6 opacity-60 grayscale w-full max-w-md">
               <div className="border border-gray-200 rounded p-4">STC</div>
               <div className="border border-gray-200 rounded p-4">Mobily</div>
               <div className="border border-gray-200 rounded p-4">Zain</div>
            </div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
