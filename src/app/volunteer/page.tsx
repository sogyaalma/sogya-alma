import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Handshake } from "lucide-react";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
         <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-ibm">انضم كمتطوع</h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">شاركنا الأجر وكن جزءاً من فريق سقيا الماء لإيصال الخير لمن يستحقه.</p>
         </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="max-w-xl mx-auto">
              <Handshake className="mx-auto mb-6 text-primary" size={64} />
              <form className="flex flex-col gap-4">
                 <input type="text" placeholder="الاسم الرباعي" className="border border-gray-200 p-4 rounded-xl outline-none focus:border-primary" />
                 <input type="email" placeholder="البريد الإلكتروني" className="border border-gray-200 p-4 rounded-xl outline-none focus:border-primary" />
                 <input type="tel" placeholder="رقم الجوال" className="border border-gray-200 p-4 rounded-xl outline-none focus:border-primary" />
                 <textarea placeholder="مجال التطوع المفضل (تصميم، تنظيم، توزيع ميداني...)" className="border border-gray-200 p-4 rounded-xl outline-none focus:border-primary h-32"></textarea>
                 <button className="bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors">إرسال طلب الانضمام</button>
              </form>
            </div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
