"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Gift, Heart, Send } from "lucide-react";

export default function GiftPage() {
  const [occasion, setOccasion] = useState("شكر وتقدير");
  const occasions = ["شكر وتقدير", "تهنئة بنجاح", "شفاء من مرض", "عزاء ومواساة", "زواج الميمون"];
  const [amount, setAmount] = useState<number | string>(100);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-secondary mb-4 flex items-center justify-center gap-3">
            <Gift className="text-primary w-10 h-10" />
            أهدي من تحب تبرعاً
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            عبر عن مشاعرك لمن تحب بإهداء تبرع لمشاريع سقيا الماء لتكون صدقة جارية له يصله إشعار بها فوراً.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-soft">
          
          {/* Form Step */}
          <div className="flex flex-col gap-8">
            {/* Occasion Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">اختر مناسبة الإهداء</label>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      occasion === occ 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-gray-200 text-gray-500 hover:border-primary/30"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">اسم المُهدَى إليه</label>
                <input type="text" placeholder="مثال: محمد عبدالله" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم جوال المُهدَى إليه (لإرسال البطاقة)</label>
                <input type="tel" placeholder="05XXXXXXXX" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors text-left dir-ltr" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">اسم المُرسل (كما سيظهر في البطاقة)</label>
                <input type="text" placeholder="اسمك الكريم" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" />
              </div>
            </div>

             {/* Amount */}
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">مبلغ الإهداء (ريال)</label>
              <div className="flex gap-4">
                {[50, 100, 300].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`flex-1 py-3 border-2 rounded-xl font-bold transition-all ${
                      amount === preset ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)}
                  className="flex-[2] border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors font-bold text-center"
                  placeholder="مبلغ آخر" 
                />
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mt-4">
              <Send size={20} />
              معاينة واعتماد الإهداء
            </button>
          </div>

          {/* Card Preview */}
          <div className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-[500px]">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-full h-full bg-primary opacity-5 pointer-events-none"></div>
             
             <div className="bg-white rounded-xl shadow-xl w-full max-w-sm h-full flex flex-col relative z-10 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                {/* Header pattern equivalent */}
                <div className="h-32 bg-primary flex items-center justify-center relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '10px 10px'}}></div>
                  <Heart className="text-white w-12 h-12" />
                </div>
                
                {/* Card Content */}
                <div className="p-8 flex flex-col text-center flex-grow justify-center gap-6">
                  <div>
                    <h4 className="text-primary font-bold text-lg mb-1">{occasion}</h4>
                    <div className="w-12 h-1 bg-gray-200 mx-auto rounded-full"></div>
                  </div>
                  
                  <p className="text-xl font-medium text-gray-800 leading-relaxed">
                    تقبل الله منا ومنكم صالح الأعمال.
                    <br/>لقد تم دفع مساهمة لسقيا الماء 
                    <br/>كصدقة جارية.
                  </p>

                  <div className="mt-8">
                    <span className="text-gray-400 text-sm block mb-1">إلى الغالي:</span>
                    <span className="font-bold text-secondary text-lg inline-block border-b-2 border-gray-100 pb-1 w-full">[اسم المهدى إليه]</span>
                  </div>

                  <div className="mt-2 text-left w-full">
                    <span className="text-gray-400 text-xs block truncate w-full text-center">أهديت بحب من: [تكتب اسمك]</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
