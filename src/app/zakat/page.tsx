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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-secondary mb-4 flex items-center justify-center gap-3">
            <Calculator className="text-primary w-10 h-10" />
            حاسبة الزكاة الذكية
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            احسب زكاتك بدقة ويسر وتبرع بها لمشاريع الجمعية لتنال أجر إرواء الظمأ. البرنامج يحسب النصاب تلقائياً بناءً على سعر الذهب اليوم.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('cash')}
              className={`flex-1 py-4 px-2 text-center font-bold border-b-2 flex items-center justify-center gap-2 transition-colors ${activeTab === 'cash' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
            >
              <Banknote size={20} />
              زكاة النقد
            </button>
            <button 
              onClick={() => setActiveTab('gold')}
              className={`flex-1 py-4 px-2 text-center font-bold border-b-2 flex items-center justify-center gap-2 transition-colors ${activeTab === 'gold' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
            >
              <Coins size={20} />
              زكاة الذهب والفضة
            </button>
            <button 
              onClick={() => setActiveTab('stocks')}
              className={`flex-1 py-4 px-2 text-center font-bold border-b-2 hidden sm:flex items-center justify-center gap-2 transition-colors ${activeTab === 'stocks' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
            >
              <Landmark size={20} />
              زكاة الأسهم
            </button>
          </div>

          <div className="p-8 md:p-12">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8 flex gap-3 text-sm text-blue-800">
              <Calculator className="shrink-0" />
              <p>نصاب الزكاة اليوم يقدر بـ <strong>{85 * goldPrice} ريال</strong> (ما يعادل 85 جرام من الذهب عيار 24 بسعر {goldPrice} للجرام). إذا كان المبلغ المدخل يبلغ النصاب وحال عليه الحول فتجب فيه الزكاة.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                {activeTab === 'cash' && (
                  <>
                    <label className="block text-sm font-bold text-gray-700 mb-3">المبلغ النقدي المحال عليه الحول (بالريال)</label>
                    <input 
                      type="number" 
                      value={cash}
                      onChange={(e) => setCash(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-6 py-5 text-xl font-bold bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" 
                      placeholder="أدخل المبلغ هنا..."
                    />
                  </>
                )}
                {activeTab === 'gold' && (
                  <>
                    <label className="block text-sm font-bold text-gray-700 mb-3">وزن الذهب عيار 24 (بالجرام)</label>
                    <input 
                      type="number" 
                      value={cash}
                      onChange={(e) => setCash(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-6 py-5 text-xl font-bold bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" 
                      placeholder="وزن الذهب..."
                    />
                    <p className="text-sm text-gray-500 mt-2">ملاحظة: سيتم ضرب الوزن بسعر الذهب اليوم {goldPrice} ريال لحساب الزكاة.</p>
                  </>
                )}
                {activeTab === 'stocks' && (
                  <>
                    <label className="block text-sm font-bold text-gray-700 mb-3">قيمة الأسهم الاستثمارية وقت وجوب الزكاة (بالريال)</label>
                    <input 
                      type="number" 
                      value={cash}
                      onChange={(e) => setCash(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-6 py-5 text-xl font-bold bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" 
                      placeholder="قيمة الأسهم..."
                    />
                  </>
                )}
              </div>
              
              <div className="w-full md:w-auto flex flex-col justify-center items-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 min-w-[250px]">
                <span className="text-gray-500 font-bold mb-2">مقدار الزكاة الواجبة</span>
                <span className="text-4xl font-black text-secondary mb-1" suppressHydrationWarning>
                  {activeTab === 'gold' 
                    ? calculateZakat(Number(cash) * goldPrice).toLocaleString() 
                    : calculateZakat(cash).toLocaleString()}
                </span>
                <span className="text-sm font-bold text-gray-400">ريال سعودي</span>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-8 flex justify-end">
              <button 
                disabled={!cash || Number(cash) < (85 * goldPrice)}
                className="w-full md:w-auto bg-primary disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-dark text-white rounded-xl px-12 py-4 font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                دفع الزكاة الآن
              </button>
            </div>
            {Number(cash) > 0 && Number(cash) < (85 * goldPrice) && (
               <p className="text-red-500 text-sm font-bold text-center mt-4">المبلغ المدخل لم يبلغ النصاب.</p>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
