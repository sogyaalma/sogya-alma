"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">تواصل معنا</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك. تواصل معنا عبر أي من القنوات المتاحة.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            {[
              { icon: Phone, title: "الهاتف", lines: ["0112766744", "0501996361"], href: "tel:0112766744" },
              { icon: Mail, title: "البريد الإلكتروني", lines: ["info@sogyaalma.org.sa"], href: "mailto:info@sogyaalma.org.sa" },
              { icon: MapPin, title: "العنوان", lines: ["المملكة العربية السعودية", "الرياض، حي شبرا، طريق تويق"], href: "#" },
              { icon: Clock, title: "أوقات العمل", lines: ["الأحد – الخميس", "8:00 صباحاً – 4:00 مساءً"], href: "#" },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-secondary dark:text-white mb-1">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-gray-500 dark:text-gray-400 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black text-secondary dark:text-white">تم إرسال رسالتك بنجاح</h2>
                <p className="text-gray-500 dark:text-gray-400">سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك مع جمعية سقيا الماء.</p>
                <button onClick={() => setSent(false)} className="mt-4 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all">
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-secondary dark:text-white mb-6">راسلنا</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm" placeholder="أدخل اسمك الكامل" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الجوال *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm" placeholder="05x xxx xxxx" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm" placeholder="example@email.com" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">موضوع الرسالة *</label>
                    <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm">
                      <option value="">اختر الموضوع</option>
                      <option>استفسار عن التبرعات</option>
                      <option>طلب دعم مائي</option>
                      <option>شراكة مؤسسية</option>
                      <option>شكوى أو ملاحظة</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الرسالة *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-sm resize-none" placeholder="اكتب رسالتك هنا..." />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-md">
                      <Send size={18} /> إرسال الرسالة
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
