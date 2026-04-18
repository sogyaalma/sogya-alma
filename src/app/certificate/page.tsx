"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Share2, Medal } from "lucide-react";

export default function CertificatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        
        <div className="text-center mb-10 w-full max-w-3xl">
          <h1 className="text-4xl font-black text-secondary mb-4 flex items-center justify-center gap-3">
             <Medal className="text-yellow-500 w-10 h-10" />
            شهادة شكر وتقدير
          </h1>
          <p className="text-gray-500 text-lg">
            هذه الشهادة مُنحت تقديراً للمبادرة بالعطاء ومواصلة زرع الأثر في سقيا الماء بمنطقة الرياض.
          </p>
        </div>

        {/* Certificate Display UI */}
        <div className="w-full max-w-4xl bg-white p-4 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center border-4 border-gray-100">
          
          {/* Certificate Inner Canvas Simulation */}
          <div className="w-full h-auto aspect-[1.414/1] relative bg-[#faf9f6] border-[12px] border-primary/90 p-8 flex flex-col justify-between overflow-hidden shadow-inner font-serif text-center">
            
            {/* Corner Details */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 border-t-4 border-l-4 border-secondary rounded-tl-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 border-b-4 border-r-4 border-secondary rounded-br-[100px]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none"></div>

            {/* Header Content */}
            <div className="flex justify-between items-center relative z-10 w-full">
              <div className="text-secondary opacity-70">
                <span className="block text-sm font-bold">الرقم المرجعي</span>
                <span className="font-mono">CER-90082</span>
              </div>
              <div className="flex-1 flex justify-center">
                 <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">سقيا</div>
              </div>
              <div className="text-secondary opacity-70">
                <span className="block text-sm font-bold">التاريخ</span>
                <span className="font-mono">{new Date().toLocaleDateString('ar-EG')}</span>
              </div>
            </div>

            {/* Main Body */}
            <div className="flex-grow flex flex-col items-center justify-center relative z-10 py-12 px-8">
              <h2 className="text-2xl md:text-3xl text-secondary font-bold mb-8">شكر وامتنان</h2>
              <p className="text-xl leading-loose text-gray-700">تتقدم جمعية سقيا الماء بمنطقة الرياض بخالص الشكر والتقدير إلى:</p>
              
              <div className="my-8 pb-4 border-b-2 border-primary/50 w-3/4 max-w-lg mx-auto">
                <h3 className="text-3xl md:text-5xl font-black text-primary" style={{ fontFamily: 'var(--font-ibm)' }}>المحسـن الكـريـم</h3>
              </div>

              <p className="text-lg md:text-xl leading-loose text-gray-700 max-w-2xl mx-auto font-medium">
                وذلك لقاء مساهمته الفاعلة وبذله السخي في استكمال "حفر بئر ارتوازي رقم 5". نسأل الله أن يتقبل منه، وأن يجازيه خير الجزاء ويجعلها صدقة جارية له إلى يوم الدين.
              </p>
              <p className="text-primary mt-6 text-xl font-bold">"أفضل الصدقة سقي الماء"</p>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-end relative z-10 w-full pt-8">
               <div className="text-center w-1/3">
                 <div className="w-full h-px bg-gray-400 mb-2"></div>
                 <span className="font-bold text-gray-600">رئيس مجلس الإدارة</span>
               </div>
               <div className="w-1/3 flex justify-center">
                 <div className="w-24 h-24 border-4 border-amber-500 rounded-full flex items-center justify-center text-amber-500 transform -rotate-12 opacity-80" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }}>
                   <span className="font-bold text-sm">خـتـم <br/>الجـمعـيـة</span>
                 </div>
               </div>
               <div className="text-center w-1/3">
                 <div className="w-full h-px bg-gray-400 mb-2"></div>
                 <span className="font-bold text-gray-600">المدير التنفيذي</span>
               </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
           <button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
             <Download size={20} />
             تحميل كصورة (PNG)
           </button>
           <button className="bg-white border-2 border-gray-200 text-gray-600 hover:text-primary hover:border-primary/50  rounded-xl px-8 py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm">
             <Share2 size={20} />
             مشاركة الشهادة
           </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
