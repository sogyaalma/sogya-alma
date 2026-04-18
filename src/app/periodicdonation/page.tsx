"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RefreshCcw, Calendar, CreditCard, ShieldCheck, CheckCircle2, CreditCard as CardIcon, Edit3 } from "lucide-react";

const frequencies = [
  { id: "daily", label: "يومي" },
  { id: "monthly", label: "شهري" },
];

const presetAmounts = [1, 5, 10, 50];

export default function PeriodicDonationPage() {
  const [freq, setFreq] = useState("daily");
  const [amount, setAmount] = useState<number | string>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasCard, setHasCard] = useState(false);

  const handleActivate = () => {
    if (!hasCard) {
      alert("يرجى إضافة بطاقة بنكية أولاً.");
      return;
    }
    setIsSuccess(true);
  };

  const handleAddCard = () => {
    // Mocking card addition
    const confirmed = window.confirm("هل تريد إضافة البطاقة المنتهية بـ 4242؟");
    if (confirmed) {
      setHasCard(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300 flex flex-col font-sans">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white dark:bg-midnight-surface p-12 rounded-3xl shadow-soft border border-gray-100 dark:border-midnight-border text-center max-w-md w-full">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={44} />
            </div>
            <h1 className="text-2xl font-black text-secondary dark:text-white mb-4 font-heading">تم تفعيل التبرع الدوري!</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 font-body text-lg">
              شكراً لعطائك المستمر. سيتم استقطاع مبلغ <span className="font-bold text-primary">{amount} ر.س</span> بشكل <span className="font-bold text-primary">{freq === 'daily' ? 'يومي' : 'شهري'}</span>.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="w-full bg-primary text-white font-black py-5 rounded-2xl hover:shadow-xl transition-all shadow-lg hover:-translate-y-1"
            >
              العودة للوحة التحكم
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl mb-24">
         
         <div className="text-center mb-16">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCcw size={40} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white mb-4 font-heading">برنامج التبرع الدوري</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-xl font-body leading-relaxed">
               قليل دائم خير من كثير منقطع. استقطع مبلغاً من مالك يخصم يومياً أو شهرياً ليستمر عطاؤك.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-midnight-surface rounded-3xl shadow-soft border border-gray-100 dark:border-midnight-border p-8 md:p-10">
                 
                 <div className="mb-10">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2 font-heading text-xl">
                      <Calendar className="text-primary" size={24} />
                      اختر دورية التبرع
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                       {frequencies.map((f) => (
                         <button
                           key={f.id}
                           onClick={() => setFreq(f.id)}
                           className={`border-2 rounded-2xl p-6 flex items-center justify-center gap-3 transition-all ${
                             freq === f.id
                               ? "border-primary bg-primary/5 text-primary shadow-sm"
                               : "border-gray-100 dark:border-midnight-border text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700"
                           }`}
                         >
                           <span className="font-black text-xl font-body">{f.label}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="mb-10">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 text-xl font-heading">اختر المبلغ (رس)</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {presetAmounts.map((amt) => (
                         <button 
                           key={amt} 
                           onClick={() => setAmount(amt)}
                           className={`py-5 rounded-2xl font-black text-xl border-2 transition-all font-body ${
                             amount === amt 
                               ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                               : 'border-gray-100 dark:border-midnight-border text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700'
                           }`}
                         >
                           {amt}
                         </button>
                      ))}
                    </div>
                    <div className="mt-4 relative">
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="مبلغ آخر" 
                        className="w-full h-16 border border-gray-200 dark:border-midnight-border dark:bg-gray-900/30 rounded-2xl px-6 outline-none focus:border-primary font-black text-xl dark:text-white transition-colors" 
                      />
                    </div>
                 </div>

                 <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-8 flex items-start gap-4 mb-10 border border-emerald-100 dark:border-emerald-900/20">
                    <ShieldCheck className="text-emerald-500 mt-1 shrink-0" size={28} />
                    <p className="text-emerald-800 dark:text-emerald-400 text-base font-medium leading-relaxed font-body">
                      استقطاعك آمن تماماً ويمكنك إيقافه أو تعديل مبلغه في أي وقت من خلال لوحة التحكم الخاصة بك. لا تتردد في البدء ولو بالقليل.
                    </p>
                 </div>

                 <button 
                   onClick={handleActivate}
                   className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl py-6 text-2xl font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                 >
                   <CreditCard size={28} />
                   تفعيل التبرع الدوري
                 </button>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-midnight-surface rounded-3xl shadow-soft border border-gray-100 dark:border-midnight-border p-8">
                <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 font-heading text-lg">
                  <CardIcon className="text-primary" size={22} />
                  طريقة الدفع
                </h3>
                
                {hasCard ? (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-midnight-border mb-6 relative overflow-hidden">
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <p className="text-xs text-gray-400 font-black mb-2 font-body">البطاقة الحالية</p>
                          <p className="text-xl font-black text-gray-700 dark:text-gray-200 font-mono">**** **** **** 4242</p>
                          <p className="text-xs text-gray-400 font-black mt-2 font-body uppercase">Mada - Al Rajhi Bank</p>
                        </div>
                        <CardIcon size={24} className="text-primary" />
                      </div>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                    </div>
                    
                    <button 
                      onClick={handleAddCard}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 text-primary py-4 rounded-2xl font-black text-sm hover:bg-primary/5 transition-all group font-body"
                    >
                      <Edit3 size={18} className="group-hover:rotate-12 transition-transform" />
                      تغيير البطاقة البنكية
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleAddCard}
                    className="w-full aspect-video flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-200 dark:border-midnight-border rounded-2xl text-gray-400 dark:text-gray-500 hover:border-primary/50 hover:text-primary transition-all group font-body"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <CreditCard size={24} />
                    </div>
                    <span className="font-black">إضافة بطاقة دفع</span>
                  </button>
                )}
              </div>

              <div className="bg-white dark:bg-midnight-surface rounded-3xl shadow-soft border border-gray-100 dark:border-midnight-border p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center shrink-0">
                  <RefreshCcw size={20} className="text-amber-600" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug font-body">
                  سيتم خصم المبلغ المختار تلقائياً في نفس الموعد من كل دورة. يمكنك الإيقاف في أي وقت.
                </p>
              </div>
            </div>

         </div>

      </main>

      <Footer />
    </div>
  );
}
