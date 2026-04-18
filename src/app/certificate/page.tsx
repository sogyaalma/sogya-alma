"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Share2, Medal } from "lucide-react";

export default function CertificatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        
        <div className="text-center mb-12 w-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-secondary dark:text-white mb-4 flex items-center justify-center gap-4 font-heading">
             <Medal className="text-amber-500 w-12 h-12" />
            شهادة شكر وتقدير
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-body">
            هذه الشهادة مُنحت تقديراً للمبادرة بالعطاء ومواصلة زرع الأثر في سقيا الماء بمنطقة الرياض.
          </p>
        </div>

        {/* Certificate Display UI */}
        <div className="w-full max-w-4xl bg-white dark:bg-midnight-surface p-6 md:p-10 rounded-[2rem] shadow-soft border border-gray-100 dark:border-midnight-border relative overflow-hidden flex items-center justify-center">
          
          {/* Certificate Inner Canvas Simulation - Always remains elegant/light for printing/visual integrity */}
          <div className="w-full h-auto aspect-[1.414/1] relative bg-[#faf9f6] border-[12px] border-primary/90 p-10 flex flex-col justify-between overflow-hidden shadow-inner font-serif text-center">
            
            {/* Corner Details */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 border-t-4 border-l-4 border-secondary rounded-tl-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 border-b-4 border-r-4 border-secondary rounded-br-[100px]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none"></div>

            {/* Header Content */}
            <div className="flex justify-between items-center relative z-10 w-full">
              <div className="text-secondary opacity-70 text-right">
                <span className="block text-xs font-bold font-body">الرقم المرجعي</span>
                <span className="font-mono text-sm">CER-90082</span>
              </div>
              <div className="flex-1 flex justify-center">
                 <img src="/logo.svg" alt="جمعية سقيا الماء" className="h-16 md:h-20 object-contain drop-shadow-sm" />
              </div>
              <div className="text-secondary opacity-70 text-left">
                <span className="block text-xs font-bold font-body">التاريخ</span>
                <span className="font-mono text-sm">{new Date().toLocaleDateString('ar-EG')}</span>
              </div>
            </div>

            {/* Main Body */}
            <div className="flex-grow flex flex-col items-center justify-center relative z-10 py-14 px-8">
              <h2 className="text-3xl md:text-4xl text-secondary font-black mb-8 font-heading">شكر وامتنان</h2>
              <p className="text-xl leading-loose text-gray-700 font-body">تتقدم جمعية سقيا الماء بمنطقة الرياض بخالص الشكر والتقدير إلى:</p>
              
              <div className="my-10 pb-4 border-b-2 border-primary/50 w-3/4 max-w-lg mx-auto">
                <h3 className="text-4xl md:text-6xl font-black text-primary font-heading">المحسـن الكـريـم</h3>
              </div>

              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-2xl mx-auto font-medium font-body">
                وذلك لقاء مساهمته الفاعلة وبذله السخي في استكمال "حفر بئر ارتوازي رقم 5". نسأل الله أن يتقبل منه، وأن يجازيه خير الجزاء ويجعلها صدقة جارية له إلى يوم الدين.
              </p>
              <p className="text-primary mt-8 text-2xl font-black font-heading">"أفضل الصدقة سقي الماء"</p>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-end relative z-10 w-full pt-10 px-6">
               <div className="text-center w-1/3">
                 <div className="w-full h-px bg-gray-400 mb-2"></div>
                 <span className="font-bold text-gray-600 text-sm font-body">رئيس مجلس الإدارة</span>
               </div>
               <div className="w-1/3 flex justify-center">
                 <div className="w-24 h-24 border-4 border-amber-500/50 rounded-full flex items-center justify-center text-amber-600/60 transform -rotate-12" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)' }}>
                   <span className="font-black text-xs text-center leading-tight">خـتـم <br/>الجـمعـيـة</span>
                 </div>
               </div>
               <div className="text-center w-1/3">
                 <div className="w-full h-px bg-gray-400 mb-2"></div>
                 <span className="font-bold text-gray-600 text-sm font-body">المدير التنفيذي</span>
               </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
           <button className="bg-primary hover:bg-primary-dark text-white rounded-2xl px-12 py-5 font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
             <Download size={22} />
             تحميل الشهادة (PNG)
           </button>
           <button className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 rounded-2xl px-12 py-5 font-black text-xl flex items-center justify-center gap-3 transition-all shadow-soft hover:shadow-md hover:-translate-y-1">
             <Share2 size={22} />
             مشاركة الأثر
           </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
