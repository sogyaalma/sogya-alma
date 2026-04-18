"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart, AlertCircle, Apple, CreditCard, Trash2, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface CartItem {
  projectId: string;
  projectTitle: string;
  amount: number;
  shares: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setItems(data);
    setLoading(false);
  }, []);

  const removeItem = (id: string) => {
    const updated = items.filter(item => item.projectId !== id);
    setItems(updated);
    sessionStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] flex flex-col font-sans transition-colors duration-300">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl mb-24">
         <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <ShoppingCart size={22} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white font-heading">سلة التبرعات</h1>
         </div>

         {loading ? (
            <div className="py-20 text-center text-gray-400">جاري التحميل...</div>
         ) : items.length === 0 ? (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 p-16 flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mb-6">
                 <ShoppingCart size={48} className="text-gray-300 dark:text-gray-700" />
               </div>
               <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2 font-heading">السلة فارغة</h2>
               <p className="text-gray-500 dark:text-gray-400 mb-8 font-body">لم تقم بإضافة أي تبرعات إلى السلة حتى الآن. ساهم في سقي المحتاجين اليوم.</p>
               
               <Link href="/opportunities" className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1">
                  تصفح فرص التبرع
               </Link>
            </div>
         ) : (
            <div className="flex flex-col lg:flex-row gap-8">
               
               {/* Cart Items */}
               <div className="w-full lg:w-2/3 space-y-4">
                  {items.map((item) => (
                    <div key={item.projectId} className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-800 flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/5 dark:bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                            {item.shares}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 dark:text-white mb-1 font-heading">{item.projectTitle}</h3>
                            <p className="text-xs text-gray-400 font-body">قيمة السهم الواحد: 100 ر.س</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="text-xl font-black text-primary font-body">{item.amount.toLocaleString()} <span className="text-xs">ر.س</span></span>
                          <button 
                            onClick={() => removeItem(item.projectId)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>
                    </div>
                  ))}
                  
                  <Link href="/opportunities" className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm mt-4 font-body">
                    <ChevronLeft size={16} />
                    إضافة تبرع آخر
                  </Link>
               </div>

               {/* Cart Summary */}
               <div className="w-full lg:w-1/3">
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 p-8 sticky top-28">
                     <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 font-heading">ملخص التبرعات</h3>
                     
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-gray-500 dark:text-gray-400 font-body">
                           <span>عدد الحالات:</span>
                           <span>{items.length}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-gray-800">
                           <span className="font-bold text-gray-800 dark:text-white">المجموع الإجمالي:</span>
                           <span className="font-black text-2xl text-primary font-body">{total.toLocaleString()} ر.س</span>
                        </div>
                     </div>

                     <div className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl text-xs flex gap-3 mb-8 border border-emerald-100 dark:border-emerald-900/30 font-body">
                        <AlertCircle size={18} className="flex-shrink-0" />
                        <p className="leading-relaxed">سيذهب تبرعك تلقائياً للحالات الأشد احتياجاً لضمان أفضل أثر لمساهمتك.</p>
                     </div>

                     <div className="space-y-3">
                        <button className="w-full bg-black dark:bg-white dark:text-black text-white rounded-xl py-4 text-lg font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-md">
                           <Apple size={20} className="mb-1" /> Pay
                        </button>
                        
                        <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                           <CreditCard size={20} /> دفع بواسطة البطاقة
                        </button>
                     </div>

                     <div className="flex justify-center items-center gap-3 mt-8">
                        {["mada", "Visa", "Master"].map(brand => (
                          <div key={brand} className="border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 rounded-md h-[28px] flex items-center justify-center px-2 opacity-60">
                             <span className="font-bold text-[9px] dark:text-gray-400">{brand}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

            </div>
         )}

      </main>

      <Footer />
    </div>
  );
}
