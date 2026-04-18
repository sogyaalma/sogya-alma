"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, User, Building2, Navigation } from "lucide-react";
import { useState } from "react";

const branches = [
  {
    name: "الفرع الرئيسي - الرياض",
    district: "حي شبرا، طريق تويق",
    city: "الرياض",
    phone: "0112766744",
    phone2: "0501996361",
    manager: "الإدارة العامة",
    isMain: true,
    mapUrl: "https://maps.google.com?q=24.6877,46.7219",
    hours: "الأحد–الخميس: 8ص–4م",
  },
  {
    name: "فرع غرب الرياض",
    district: "غرب الرياض",
    city: "الرياض",
    phone: "0501996361",
    manager: "مدير الفرع",
    isMain: false,
    mapUrl: "https://maps.google.com?q=جمعية+سقيا+الماء+غرب+الرياض",
    hours: "الأحد–الخميس: 8ص–3م",
  },
  {
    name: "فرع شمال الرياض",
    district: "شمال الرياض",
    city: "الرياض",
    phone: "0501996361",
    manager: "عبدالله بن وليد القصير",
    isMain: false,
    mapUrl: "https://maps.google.com?q=جمعية+سقيا+الماء+شمال+الرياض",
    hours: "الأحد–الخميس: 8ص–3م",
  },
  {
    name: "فرع حوطة بني تميم",
    district: "محافظة حوطة بني تميم",
    city: "حوطة بني تميم",
    phone: "0501996361",
    manager: "محمد بن راشد الموسى",
    isMain: false,
    mapUrl: "https://maps.google.com?q=حوطة+بني+تميم",
    hours: "الأحد–الخميس: 8ص–2م",
  },
  {
    name: "فرع شقراء",
    district: "محافظة شقراء",
    city: "شقراء",
    phone: "0501996361",
    manager: "فارس بن عبدالعزيز الشيها",
    isMain: false,
    mapUrl: "https://maps.google.com?q=شقراء+الرياض",
    hours: "الأحد–الخميس: 8ص–2م",
  },
  {
    name: "فرع الخرج",
    district: "محافظة الخرج",
    city: "الخرج",
    phone: "0501996361",
    manager: "فهد بن ناصر أبو مناصب",
    isMain: false,
    mapUrl: "https://maps.google.com?q=الخرج+المملكة+العربية+السعودية",
    hours: "الأحد–الخميس: 8ص–2م",
  },
  {
    name: "فرع حريملاء",
    district: "محافظة حريملاء",
    city: "حريملاء",
    phone: "0501996361",
    manager: "عبدالعزيز بن عبدالله الدحمش",
    isMain: false,
    mapUrl: "https://maps.google.com?q=حريملاء+الرياض",
    hours: "الأحد–الخميس: 8ص–2م",
  },
];

export default function BranchesPage() {
  const [selected, setSelected] = useState(0);
  const branch = branches[selected];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">فروع الجمعية</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            تمتد جمعية سقيا الماء بـ <span className="text-primary font-black">7 فروع</span> في منطقة الرياض
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: "7", label: "فروع نشطة" },
            { value: "713+", label: "جهة مستفيدة" },
            { value: "179+", label: "أسرة مستفيدة" },
            { value: "4", label: "محافظات" },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-3xl font-black text-primary mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Branch List (selector) */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-secondary dark:text-white mb-3 px-1">اختر الفرع</h2>
            {branches.map((b, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`text-right w-full px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                  selected === i
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary"
                }`}
              >
                <MapPin size={16} className={selected === i ? "text-white/80" : "text-primary"} />
                <div className="text-right flex-grow">
                  <p className="font-bold text-sm leading-tight">{b.name}</p>
                  <p className={`text-xs mt-0.5 ${selected === i ? "text-white/70" : "text-gray-400"}`}>{b.city}</p>
                </div>
                {b.isMain && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${selected === i ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                    رئيسي
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Branch Detail Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-full">
              {/* Map placeholder with link */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin size={48} className="text-primary mx-auto mb-2 opacity-60" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">{branch.district}، {branch.city}</p>
                </div>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary-dark transition shadow-md"
                >
                  <Navigation size={16} /> عرض على الخريطة
                </a>
              </div>

              {/* Branch Info */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-secondary dark:text-white mb-1">{branch.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{branch.district}، {branch.city}</p>
                  </div>
                  {branch.isMain && (
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">المقر الرئيسي</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1 font-bold">مدير الفرع</p>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-primary" />
                      <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{branch.manager}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1 font-bold">رقم الهاتف</p>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-primary" />
                      <a href={`tel:${branch.phone}`} className="font-bold text-gray-700 dark:text-gray-200 text-sm hover:text-primary transition font-mono">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:col-span-2">
                    <p className="text-xs text-gray-400 mb-1 font-bold">أوقات الدوام</p>
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-bold">{branch.hours}</p>
                  </div>
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
