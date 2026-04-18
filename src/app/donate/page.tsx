'use client';
import React, { useState } from 'react';
import { Heart, CreditCard, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageRating from '@/components/PageRating';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [checkoutStep, setCheckoutStep] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-5 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-ibm font-bold text-primary mb-4">التبرع السريع - شاركنا الأجر</h1>
          <p className="text-gray-600">اختر المبلغ الذي تود التبرع به للمساهمة في سقي العطشى داخل المملكة</p>
        </div>

        {!checkoutStep ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-ibm font-bold text-xl mb-6">قيمة التبرع (ريال سعودي)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[20, 50, 100, 500].map(amt => (
                <button 
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-4 rounded-xl font-bold transition border-2 ${selectedAmount === amt ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-700 border-gray-100 hover:border-primary-light'}`}
                >
                  {amt} ريال
                </button>
              ))}
            </div>
            
            <div className="mb-8">
              <span className="block text-sm text-gray-500 mb-2">أو أدخل مبلغاً مخصصاً</span>
              <input 
                type="number" 
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 font-bold text-primary text-lg focus:ring-2 focus:ring-primary-light focus:outline-none"
              />
            </div>

            <button 
              onClick={() => setCheckoutStep(true)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-dark transition shadow-lg"
            >
              <Heart size={20} /> استمرار للدفع
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <h2 className="font-ibm font-bold text-xl">بوابات الدفع الإلكتروني (نموذج محاكاة)</h2>
              <div className="font-bold text-2xl text-primary">{selectedAmount} ريال</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button className="flex flex-col items-center gap-2 border border-blue-200 bg-blue-50 text-blue-800 rounded-xl p-4 font-bold hover:bg-blue-100 transition">
                 Mada / مدى
              </button>
              <button className="flex flex-col items-center gap-2 border border-gray-200 bg-black text-white rounded-xl p-4 font-bold hover:bg-gray-800 transition">
                 Apple Pay
              </button>
              <button className="flex flex-col items-center gap-2 border border-gray-200 bg-gray-50 text-gray-800 rounded-xl p-4 font-bold hover:bg-gray-100 transition">
                 <CreditCard />
                 بطاقة ائتمانية
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold mt-8 bg-green-50 py-3 rounded-lg">
               <ShieldCheck size={18} />
               منصة آمنة وموثقة بتشفير SSL
            </div>
            
            <button 
              onClick={() => setCheckoutStep(false)}
              className="mt-6 text-sm text-gray-500 hover:text-primary block text-center w-full"
            >
              العودة لاختيار المبلغ
            </button>
          </div>
        )}

        <PageRating />
      </main>
      <Footer />
    </div>
  );
}
