import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RefreshCcw, Calendar, CreditCard, ShieldCheck } from "lucide-react";

export default function PeriodicDonationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl mb-24">
         
         <div className="text-center mb-16">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCcw size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 font-ibm">برنامج التبرع الدوري</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
               قليل دائم خير من كثير منقطع. استقطع مبلغاً من مالك يخصم يومياً أو شهرياً ليستمر عطاؤك.
            </p>
         </div>

         <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 md:p-12 max-w-3xl mx-auto mb-12">
            
            <div className="mb-10">
               <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                 <Calendar className="text-primary" size={20} />
                 اختر دورية التبرع
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <label className="border-2 border-primary bg-primary/5 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="freq" className="w-5 h-5 text-primary" defaultChecked />
                    <span className="font-bold text-primary text-lg">يومي</span>
                  </label>
                  <label className="border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-gray-200 dark:hover:border-gray-600">
                    <input type="radio" name="freq" className="w-5 h-5 text-primary" />
                    <span className="font-bold text-gray-600 dark:text-gray-400 text-lg">شهري</span>
                  </label>
               </div>
            </div>

            <div className="mb-10">
               <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">اختر المبلغ (رس)</h3>
               <div className="grid grid-cols-4 gap-3">
                 {[1, 5, 10, 50].map((amt, idx) => (
                    <button key={amt} className={`py-4 rounded-xl font-bold text-lg border-2 transition-colors ${idx === 0 ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-600'}`}>
                      {amt}
                    </button>
                 ))}
               </div>
               <div className="mt-4 relative">
                 <input type="number" placeholder="مبلغ آخر" className="w-full h-14 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl px-4 outline-none focus:border-primary font-bold text-lg dark:text-white" />
               </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-5 flex items-start gap-4 mb-10 border border-emerald-100 dark:border-emerald-800">
               <ShieldCheck className="text-emerald-500 mt-0.5" size={24} />
               <p className="text-emerald-800 dark:text-emerald-400 text-sm font-medium leading-relaxed">
                 استقطاعك آمن تماماً ويمكنك إيقافه أو تعديل مبلغه في أي وقت من خلال لوحة التحكم الخاصة بك. لا تتردد في البدء ولو بالقليل.
               </p>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <CreditCard size={24} />
              تفعيل التبرع الدوري
            </button>

         </div>

      </main>

      <Footer />
    </div>
  );
}
