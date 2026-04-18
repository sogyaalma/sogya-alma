import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Handshake } from "lucide-react";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-5xl">
         <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white mb-4 font-heading">انضم كمتطوع</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-body">شاركنا الأجر وكن جزءاً من فريق سقيا الماء لإيصال الخير لمن يستحقه.</p>
         </div>
         <div className="bg-white dark:bg-midnight-surface rounded-3xl shadow-soft border border-gray-100 dark:border-midnight-border p-10 md:p-16">
            <div className="max-w-xl mx-auto">
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-10">
                <Handshake className="text-primary" size={48} />
              </div>
              <form className="flex flex-col gap-5">
                 <div className="space-y-1">
                   <label className="text-sm font-bold text-gray-600 dark:text-gray-400 font-body px-1">الاسم الرباعي</label>
                   <input type="text" placeholder="أدخل اسمك الكامل" className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white p-4 rounded-2xl outline-none focus:border-primary transition-colors font-body" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-bold text-gray-600 dark:text-gray-400 font-body px-1">البريد الإلكتروني</label>
                   <input type="email" placeholder="example@email.com" className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white p-4 rounded-2xl outline-none focus:border-primary transition-colors font-body" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-bold text-gray-600 dark:text-gray-400 font-body px-1">رقم الجوال</label>
                   <input type="tel" placeholder="05x xxx xxxx" className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white p-4 rounded-2xl outline-none focus:border-primary transition-colors font-body" dir="ltr" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-bold text-gray-600 dark:text-gray-400 font-body px-1">مجال التطوع المفضل</label>
                   <textarea placeholder="تصميم، تنظيم، توزيع ميداني، أخرى..." className="w-full border border-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white p-4 rounded-2xl outline-none focus:border-primary transition-colors h-32 resize-none font-body"></textarea>
                 </div>
                 <button className="bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-4">إرسال طلب الانضمام</button>
              </form>
            </div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
