"use client";
import { useState, useEffect } from "react";
import { CalendarClock, AlertCircle, CreditCard, ChevronDown, CheckCircle2, X } from "lucide-react";
import { createPortal } from "react-dom";

function ModalContent({ amount, setAmount, onClose }: { amount: number; setAmount: (n: number) => void; onClose: () => void }) {
  const [success, setSuccess] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="bg-primary/10 p-6 flex justify-between items-center border-b border-primary/20">
          <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
            <CalendarClock className="text-primary" />
            تفعيل الاستقطاع التلقائي
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {!success ? (
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-sm text-blue-800 font-medium">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p>سيتم استقطاع المبلغ المحدد بشكل تلقائي من بطاقتك البنكية بناءً على الدورية التي تختارها. يمكنك إلغاء الاشتراك في أي وقت من لوحة التحكم.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">جهة الاستقطاع</label>
              <div className="relative">
                <select className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none font-bold text-gray-700">
                  <option>صندوق سقيا العام (الأشد حاجة)</option>
                  <option>الوقف الرقمي المائي (صدقة مستدامة)</option>
                  <option>حفر الآبار</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">دورية الخصم</label>
                <div className="relative">
                  <select className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none font-bold text-gray-700">
                    <option>شهرياً (يوم 1 من كل شهر)</option>
                    <option>شهرياً (يوم 27 - الراتب)</option>
                    <option>يومياً</option>
                    <option>أسبوعياً (كل يوم جمعة)</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">المبلغ (ر.س)</label>
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-primary outline-none text-center font-black text-primary" />
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 my-1" />

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><CreditCard size={18} /> بيانات الدفع (محفوظة مسبقاً)</label>
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-900 rounded text-[10px] text-white flex items-center justify-center font-bold">VISA</div>
                  <span className="font-mono font-bold text-gray-600">**** **** **** 4123</span>
                </div>
                <button className="text-sm text-primary font-bold">تغيير</button>
              </div>
            </div>

            <button onClick={() => setSuccess(true)} className="w-full mt-2 bg-primary hover:bg-primary-dark text-white rounded-xl py-4 font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              اعتماد الاستقطاع
            </button>
          </div>
        ) : (
          <div className="p-10 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-2">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-secondary">تم تفعيل الاستقطاع بنجاح</h3>
            <p className="text-gray-500 font-medium">كتب الله أجرك. تم جدول استقطاع دوري بقيمة {amount} ريال. وسيتم الخصم تلقائياً وإشعارك به.</p>
            <button onClick={onClose} className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl py-4 font-bold transition-colors">
              العودة للوحة التحكم
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecurringDonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full p-4 mt-6 bg-gradient-to-l from-primary to-primary-dark rounded-2xl text-white hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-3">
          <CalendarClock size={24} />
          <div className="text-right">
            <h4 className="font-bold">برنامج الاستقطاع</h4>
            <p className="text-xs opacity-80">فعل التبرع الدوري التلقائي</p>
          </div>
        </div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">تفعيل</span>
      </button>

      {isOpen && mounted && typeof document !== "undefined" &&
        createPortal(
          <ModalContent amount={amount} setAmount={setAmount} onClose={handleClose} />,
          document.body
        )
      }
    </>
  );
}
