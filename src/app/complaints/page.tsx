import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquareWarning } from "lucide-react";

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="bg-primary py-16 text-white text-center rounded-b-[40px] mb-8">
         <MessageSquareWarning size={48} className="mx-auto mb-4 opacity-80" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">الشكاوى والمقترحات</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto">
            نسعد بسماع صوتكم لتحسين وتطوير خدمات جمعية سقيا الماء.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
         <div className="bg-white rounded-2xl shadow-soft p-12 border border-gray-100">
            <form className="max-w-2xl mx-auto flex flex-col gap-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input type="text" placeholder="الاسم الكريم" className="border border-gray-200 rounded-xl p-4 w-full outline-none focus:border-primary bg-gray-50" />
                 <input type="tel" placeholder="رقم الجوال" className="border border-gray-200 rounded-xl p-4 w-full outline-none focus:border-primary bg-gray-50" />
               </div>
               <select className="border border-gray-200 rounded-xl p-4 w-full outline-none focus:border-primary bg-gray-50 text-gray-600">
                  <option>نوع التذكرة (شكوى، مقترح، استفسار)</option>
                  <option>شكوى</option>
                  <option>مقترح</option>
                  <option>استفسار</option>
               </select>
               <textarea placeholder="اكتب تفاصيل تذكرتك هنا..." className="border border-gray-200 rounded-xl p-4 w-full outline-none focus:border-primary bg-gray-50 h-32"></textarea>
               <button className="bg-primary hover:bg-primary-dark transition-colors text-white font-bold py-4 rounded-xl mt-4 w-full text-lg shadow-sm">إرسال التذكرة</button>
            </form>
         </div>
      </main>
      <Footer />
    </div>
  );
}
