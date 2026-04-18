"use client";
import { useState } from "react";
import { Info, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "general",  label: "تبرع عام",   project: "صندوق سقيا العام" },
  { id: "mosques",  label: "سقيا مساجد", project: "ساهم بكرتون للمساجد" },
  { id: "waqf",     label: "وقف",        project: "وقف السيارات" },
  { id: "wells",    label: "حفر آبار",   project: "حفر بئر ارتوازي" },
];

const presets = [10, 50, 100];

export default function QuickDonate() {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState<number | string>(50);
  const router = useRouter();

  const handleDonate = () => {
    const finalAmount = Number(amount) || 50;
    const params = new URLSearchParams({
      amount: String(finalAmount),
      project: tabs[activeTab].project,
    });
    router.push(`/payment?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-20 px-4 md:px-0" style={{ fontFamily: "var(--font-ibm)" }}>
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-soft overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col p-4 md:p-6 pb-2 transition-colors duration-300">

        {/* Category Tabs */}
        <div className="flex border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl overflow-hidden mb-6 mx-auto w-full">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 px-2 text-center font-bold text-sm md:text-base border-l last:border-l-0 border-gray-100 dark:border-gray-800 transition-colors cursor-pointer ${
                activeTab === i
                  ? "text-primary bg-primary/5 dark:bg-primary/10"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Amount Form */}
        <div className="w-full flex flex-col gap-4">
          {/* Preset Amounts */}
          <div className="flex justify-between gap-4 h-[52px] w-full">
            {presets.map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`flex-1 border-2 rounded-xl text-xl font-bold flex items-center justify-center gap-1 transition-all ${
                  amount === val
                    ? "border-primary text-primary bg-primary/5 dark:bg-primary/10"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                {val}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">﷼</span>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="relative border border-gray-300 dark:border-gray-700 rounded-xl focus-within:border-primary transition-colors h-[52px] flex items-center group">
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="مبلغ التبرع"
              className="w-full h-full bg-transparent px-4 pr-12 font-bold text-gray-800 dark:text-white text-lg outline-none rounded-xl"
              style={{ direction: "rtl" }}
            />
            <span className="absolute right-4 text-sm text-gray-500 dark:text-gray-400 pointer-events-none group-focus-within:text-primary">
              ﷼
            </span>
          </div>

          {/* Project Info */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 text-[13px]">
            <Info size={16} className="text-gray-900 dark:text-gray-100 opacity-70 shrink-0" />
            <p className="m-0 text-gray-600 dark:text-gray-400 leading-tight">
              سيذهب تبرعك لـ <strong>{tabs[activeTab].project}</strong>
            </p>
          </div>

          {/* Payment Badges */}
          <div className="flex justify-center items-center gap-3 mt-1">
            {["mada", "Master", "Apple", "Visa"].map((brand) => (
              <div key={brand} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md h-[30px] flex items-center justify-center px-2 shadow-sm">
                <span className={`font-bold text-[10px] ${
                  brand === "mada" ? "text-blue-900 dark:text-blue-400" :
                  brand === "Master" ? "text-orange-500" :
                  brand === "Apple" ? "text-black dark:text-white" : "text-blue-600 dark:text-blue-300"
                }`}>{brand}</span>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="w-full pb-2">
            <button
              onClick={handleDonate}
              className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-3 px-8 text-lg font-bold shadow-md hover:shadow-xl transition-all h-[56px] flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Zap size={20} />
              تبرع الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}