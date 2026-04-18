'use client';
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';

export default function PageRating() {
  const [rated, setRated] = useState<'yes'|'no'|null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleRate = (val: 'yes'|'no') => {
    setRated(val);
    if(val === 'no') setFeedbackOpen(true);
  };

  if(!feedbackOpen && rated === 'yes') {
     return (
       <div className="mt-16 border-t border-gray-200 py-6 text-center text-green-600 font-semibold bg-green-50 rounded">
         شكراً لملاحظاتك، نحن نقدر تقييمك!
       </div>
     )
  }

  return (
    <div className="mt-16 border-t border-gray-200 py-8 relative">
      {!feedbackOpen ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <span className="font-ibm font-bold text-gray-700 text-lg">هل كانت هذه الصفحة مفيدة؟</span>
          <div className="flex gap-4">
            <button 
              onClick={() => handleRate('yes')}
              className={`flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full font-bold hover:bg-primary/5 transition ${rated === 'yes' ? 'bg-primary/5 text-primary border-primary' : 'text-gray-600'}`}
            >
              <ThumbsUp size={18} /> نعم
            </button>
            <button 
              onClick={() => handleRate('no')}
              className={`flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full font-bold hover:bg-red-50 hover:text-red-600 transition ${rated === 'no' ? 'bg-red-50 text-red-600 border-red-600' : 'text-gray-600'}`}
            >
              <ThumbsDown size={18} /> لا
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-xl relative">
          <button onClick={() => setFeedbackOpen(false)} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
          <h4 className="font-ibm font-bold text-lg mb-4 text-primary">من فضلك أخبرنا بالسبب (اختياري)</h4>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-light focus:outline-none h-24 mb-4"
            placeholder="أدخل ملاحظاتك هنا لنتمكن من تحسين التجربة..."
          ></textarea>
          <button 
            onClick={() => { setFeedbackOpen(false); setRated('yes'); }}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition"
          >
            إرسال الملاحظات
          </button>
        </div>
      )}
    </div>
  );
}
