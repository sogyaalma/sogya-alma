"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calculator, Coins, Landmark, Banknote } from "lucide-react";

export default function ZakatPage() {
  const [activeTab, setActiveTab] = useState("cash");
  const [cash, setCash] = useState<number | string>("");
  const goldPrice = 280; // Placeholder Gram price
  
  const calculateZakat = (amount: number | string) => {
    const val = Number(amount);
    return isNaN(val) ? 0 : val * 0.025;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-secondary dark:text-white mb-4 flex items-center justify-center gap-4 font-heading">
            <Calculator className="text-primary w-12 h-12" />
            حاسبة الزكاة الذكية
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto font-body leading-relaxed">
            احسب زكاتك بدقة ويسر وتبرع بها لمشاريع الجمعية لتنال أجر إرواء الظمأ. البرنامج يحسب النصاب تلقائياً بناءً على سعر الذهب اليوم.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-midnight-surface rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-midnight-border overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-midnight-border">
            {[
              { id: 'cash', label: 'زكاة النقد', icon: Banknote },
              { id: 'gold', label: 'زكاة الذهب والفضة', icon: Coins },
              { id: 'stocks', label: 'زكاة الأسهم', icon: Landmark, hideMobile: true },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-6 px-2 text-center font-black border-b-2 flex items-center justify-center gap-3 transition-all font-body ${
                  activeTab === tab.id 
                    ? 'border-primary text-primary bg-primary/5' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-950'
                } ${tab.hideMobile ? 'hidden sm:flex' : ''}`}
              >
                <tab.icon size={22} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-14">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-6 rounded-2xl mb-12 flex gap-4 text-sm text-blue-800 dark:text-blue-300 font-body items-start">
              <Calculator className="shrink-0 mt-1" />
              <p className="leading-relaxed">نصاب الزكاة اليوم يقدر بـ <strong>{85 * goldPrice} ريال</strong> (ما يعادل 85 جرام من الذهب عيار 24 بسعر {goldPrice} للجرام). إذا كان المبلغ المدخل يبلغ النصاب وحال عليه الحول فتجب فيه الزكاة.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-stretch">
              <div className="flex-1 w-full space-y-8">
                <div>
                  <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-4 font-body">
                    {activeTab === 'cash' ? 'المبلغ النقدي المحال عليه الحول (بالريال)' : activeTab === 'gold' ? 'وزن الذهب عيار 24 (بالجرام)' : 'قيمة الأسهم الاستثمارية وقت وجوب الزكاة (بالريال)'}
                  </label>
                  <input 
                    type="number" 
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                    className="w-full border-2 border-gray-100 dark:border-midnight-border rounded-2xl px-8 py-6 text-3xl font-black bg-gray-50 dark:bg-gray-950 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all font-heading" 
                    placeholder="أدخل القيمة هنا..."
                  />
                  {activeTab === 'gold' && <p className="text-xs text-gray-400 mt-4 font-body">ملاحظة: سيتم ضرب الوزن بسعر الذهب اليوم {goldPrice} ريال لحساب الزكاة.</p>}
                </div>
              </div>
              
              <div className="w-full md:w-auto flex flex-col justify-center items-center p-12 bg-gray-50 dark:bg-gray-950 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-midnight-border min-w-[320px] transition-all group hover:border-primary/30">
                <span className="text-gray-400 dark:text-gray-500 font-black mb-3 font-body text-xs uppercase tracking-widest">مقدار الزكاة الواجبة</span>
                <span className="text-6xl font-black text-secondary dark:text-white mb-2 font-heading group-hover:scale-105 transition-transform" suppressHydrationWarning>
                  {activeTab === 'gold' 
                    ? calculateZakat(Number(cash) * goldPrice).toLocaleString() 
                    : calculateZakat(cash).toLocaleString()}
                </span>
                <span className="text-sm font-black text-primary opacity-60 font-body uppercase">ريال سعودي</span>
              </div>
            </div>

            <div className="mt-14 border-t border-gray-50 dark:border-midnight-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
               <div className="flex-1">
                 {Number(cash) > 0 && Number(cash) < (85 * goldPrice) && (
                    <p className="text-red-500 dark:text-red-400 text-sm font-black font-body">⚠️ المبلغ المدخل لم يبلغ النصاب بعد.</p>
                 )}
               </div>
              <button 
                disabled={!cash || Number(cash) < (85 * goldPrice)}
                className="w-full sm:w-auto bg-primary disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-primary-dark text-white rounded-2xl px-16 py-6 font-black text-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                دفع الزكاة الآن
              </button>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
