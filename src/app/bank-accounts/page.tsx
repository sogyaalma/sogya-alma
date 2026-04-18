"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Copy, CheckCircle2 } from "lucide-react";

const bankAccounts = [
  { name: "مصرف الراجحي", iban: "SA8080000101608010330445", color: "border-blue-800 text-blue-800 dark:text-blue-400 dark:border-blue-500" },
  { name: "بنك البلاد", iban: "SA8515000999130517520007", color: "border-orange-500 text-orange-500 dark:text-orange-400 dark:border-orange-500" },
  { name: "البنك الأهلي", iban: "SA6610000024400000953205", color: "border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500" },
  { name: "مصرف الإنماء (العام)", iban: "SA5105000068203002026000", color: "border-amber-700 text-amber-700 dark:text-amber-500 dark:border-amber-500" },
  { name: "مصرف الإنماء (حساب الوقف)", iban: "SA5105000068203002026001", color: "border-amber-700 text-amber-700 dark:text-amber-500 dark:border-amber-500" },
  { name: "بنك الجزيرة", iban: "SA4560100003895018882001", color: "border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-500" },
];

export default function BankAccountsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (iban: string, index: number) => {
    navigator.clipboard.writeText(iban);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
      <Header />
      
      {/* Banner */}
      <div className="bg-primary/5 dark:bg-primary/10 py-16 border-b border-gray-100 dark:border-midnight-border">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white dark:bg-midnight-surface rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 dark:border-midnight-border">
            <Building2 className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-secondary dark:text-white mb-4 font-heading">الحسابات البنكية الرسمية</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-body">
            نسعد باستقبال تبرعاتكم ومساهماتكم عبر حساباتنا البنكية الرسمية. جميع الحسابات تابعة لجمعية سقيا الماء بمنطقة الرياض.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bankAccounts.map((bank, index) => (
            <div key={index} className="bg-white dark:bg-midnight-surface rounded-[2rem] p-8 shadow-soft border border-gray-100 dark:border-midnight-border hover:-translate-y-1 transition-all group flex flex-col justify-between">
               <h2 className={`text-xl font-bold mb-6 font-heading flex items-center gap-3 border-b-2 pb-4 ${bank.color}`}>
                 <Building2 size={24} className="shrink-0" />
                 {bank.name}
               </h2>
               <div className="space-y-2 mt-auto">
                 <p className="text-xs text-gray-500 dark:text-gray-400 font-bold font-body uppercase tracking-widest">رقم الآيبان (IBAN)</p>
                 <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800 transition-colors focus-within:border-primary">
                   <p className="font-mono font-bold text-gray-800 dark:text-gray-200 text-sm dir-ltr tracking-wider truncate px-1">{bank.iban}</p>
                   <button 
                     onClick={() => handleCopy(bank.iban, index)}
                     className={`p-2 rounded-lg transition-colors ${copiedIndex === index ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/20 shadow-sm border border-gray-100 dark:border-gray-700'}`}
                     title="نسخ الآيبان"
                   >
                     {copiedIndex === index ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                   </button>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 flex flex-col items-center text-center max-w-2xl mx-auto border border-emerald-100 dark:border-emerald-900/20">
          <CheckCircle2 className="text-emerald-500 mb-4" size={40} />
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2 font-heading">حسابات موثوقة ومعتمدة</h3>
          <p className="text-emerald-700 dark:text-emerald-500/80 font-medium font-body leading-relaxed">
            جميع هذه الحسابات رسمية ومسجلة باسم جمعية سقيا الماء بمنطقة الرياض، ومرخصة من المركز الوطني لتنمية القطاع غير الربحي برقم (1123).
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
