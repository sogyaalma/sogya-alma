import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart, AlertCircle, Apple, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
         <h1 className="text-2xl font-bold text-gray-800 mb-6 font-ibm">سلة التبرعات</h1>

         <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Cart Items (Empty State for now) */}
            <div className="w-full lg:w-2/3">
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={48} className="text-gray-300" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-700 mb-2">السلة فارغة</h2>
                  <p className="text-gray-500 mb-6">لم تقم بإضافة أي تبرعات إلى السلة حتى الآن.</p>
                  
                  <Link href="/opportunities" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-dark transition-colors">
                     تصفح فرص التبرع
                  </Link>
               </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-1/3">
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-4">ملخص التبرعات</h3>
                  
                  <div className="flex justify-between items-center mb-6">
                     <span className="text-gray-600">المجموع الإجمالي</span>
                     <span className="font-bold text-xl text-primary">0 ر.س</span>
                  </div>

                  <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm flex gap-2 mb-6 border border-emerald-100">
                     <AlertCircle size={18} className="flex-shrink-0" />
                     <p className="leading-tight font-medium">سيذهب تبرعك تلقائياً للحالات الأشد احتياجاً في حال لم تحدد.</p>
                  </div>

                  <button disabled className="w-full bg-gray-300 text-white rounded-xl py-3 text-lg font-bold mb-3 flex items-center justify-center gap-2 cursor-not-allowed">
                     <Apple size={20} className="mb-1" /> Pay
                  </button>
                  
                  <button disabled className="w-full bg-primary text-white rounded-xl py-3 text-lg font-bold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                     <CreditCard size={20} /> دفع بواسطة البطاقة
                  </button>

                  <div className="flex justify-center items-center gap-2 mt-6 grayscale opacity-50">
                     <div className="border border-gray-200 rounded-md h-[24px] flex items-center justify-center p-1 w-[40px]">
                        <span className="font-bold text-[8px]">mada</span>
                     </div>
                     <div className="border border-gray-200 rounded-md h-[24px] flex items-center justify-center p-1 w-[40px]">
                        <span className="font-bold text-[8px]">Visa</span>
                     </div>
                     <div className="border border-gray-200 rounded-md h-[24px] flex items-center justify-center p-1 w-[40px]">
                        <span className="font-bold text-[8px]">Master</span>
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
