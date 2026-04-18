"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Building, Phone, Mail, FileText, CheckCircle2, ChevronDown, ListPlus } from "lucide-react";

export default function RequestWaterPage() {
  const [requestType, setRequestType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Banner */}
      <div className="bg-primary/5 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 inline-block">خدمات الأفراد والجهات</span>
          <h1 className="text-3xl md:text-5xl font-black text-secondary mb-4">بوابة طلبات السقيا</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            نسعى للوصول إلى كل محتاج للماء. يمكنك عبر هذه البوابة رفع طلب لتوفير برادات، أو حفر بئر، أو سقيا مسجد. سيقوم فريقنا الميداني بدراسة الطلب وتنفيذه وفق الأولوية.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 flex justify-center">
        {!submitted ? (
          <div className="w-full max-w-3xl bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ListPlus size={24} />
              </div>
              <h2 className="text-2xl font-bold text-secondary">نموذج التقديم الجديد</h2>
            </div>

            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              
              {/* Request Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">نوع الطلب <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select 
                    value={requestType} 
                    onChange={e => setRequestType(e.target.value)}
                    required
                    className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors font-medium text-gray-700"
                  >
                    <option value="" disabled>-- اختر نوع الخدمة المطلوبة --</option>
                    <option value="masjid">سقيا مسجد (توفير برادات أو كراتين)</option>
                    <option value="well">طلب حفر بئر (للقرى أو الهجر)</option>
                    <option value="family">سقيا الأسر المحتاجة</option>
                    <option value="public">سقيا أماكن عامة والتجمعات</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الثلاثي أو اسم الجهة <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input required type="text" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="مثال: فهد عبدالعزيز محمد / جامع التقوى" />
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال للتواصل <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input required type="tel" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors text-left dir-ltr" dir="ltr" placeholder="05XXXXXXXX" />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="grid grid-cols-1 gap-6 mt-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المدينة / المحافظة <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="مثال: منطقة الرياض - محافظة الدرعية" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رابط خرائط جوجل للموقع المستهدف (Google Maps) <span className="text-red-500">*</span></label>
                  <div className="relative">
                     <input required type="url" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors text-left dir-ltr" dir="ltr" placeholder="https://maps.google.com/..." />
                     <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-2">
                 <label className="block text-sm font-bold text-gray-700 mb-2">وصف الحالية والمبررات <span className="text-red-500">*</span></label>
                 <textarea required rows={4} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none transition-colors resize-none" placeholder="اشرح لنا طبيعة الاحتياج وأهمية توفير المياه هنا..."></textarea>
                 <span className="text-xs text-gray-400 mt-2 flex gap-1"><FileText size={14}/> قد يُطلب منك لاحقاً فريق المسح رفع مستندات إضافية</span>
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  إرسال الطلب للاعتماد
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="w-full max-w-xl bg-white rounded-3xl p-12 shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6">
               <CheckCircle2 size={48} />
             </div>
             <h2 className="text-3xl font-black text-secondary mb-4">تم استلام طلبك بنجاح!</h2>
             <p className="text-gray-600 leading-relaxed font-medium mb-8">
               شكراً لتواصلك معنا ولثقتك بجمعية سقيا الماء. فريقنا الميداني لدراسة المشاريع سيقوم بمراجعة طلبك والمسح الميداني وسيتم التواصل معك على الرقم المسجل خلال 3 أيام عمل لترتيب التنفيذ.
             </p>
             <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl font-bold transition-colors">
               تقديم طلب آخر
             </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
