"use client";
import { useState } from "react";
import { CircleCheck, ShoppingCart, Zap, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DonationSidebarProps {
  percentage: number;
  collectedAmount: number;
  targetAmount: number;
  projectId?: string;
  projectTitle?: string;
}

export default function DonationSidebar({
  percentage,
  collectedAmount,
  targetAmount,
  projectId = "",
  projectTitle = "",
}: DonationSidebarProps) {
  const [shares, setShares] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const sharePrice = 100;
  const totalAmount = shares * sharePrice;
  const router = useRouter();

  const handleDonateNow = () => {
    const params = new URLSearchParams({
      amount: String(totalAmount),
      project: projectTitle,
      id: projectId,
    });
    router.push(`/payment?${params.toString()}`);
  };

  const handleAddToCart = () => {
    const cartItem = { projectId, projectTitle, amount: totalAmount, shares };
    const existing = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const idx = existing.findIndex((i: { projectId: string }) => i.projectId === projectId);
    if (idx > -1) existing[idx] = cartItem;
    else existing.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(existing));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 4000);
  };

  return (
    <div className="bg-white dark:bg-midnight-surface rounded-[2.5rem] p-8 shadow-soft border border-gray-100 dark:border-midnight-border sticky top-28">
      {/* Progress */}
      <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-midnight-border">
        <div className="flex justify-between items-end mb-3">
          <span className="text-primary font-black text-2xl font-heading">{percentage.toFixed(0)}%</span>
          <div className="text-right">
            <span className="block text-xs text-gray-400 font-black mb-1 font-body">المبلغ المتبقي</span>
            <span className="text-gray-700 dark:text-gray-200 font-black text-lg font-heading">{(targetAmount - collectedAmount).toLocaleString()} ر.س</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-2">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold font-body uppercase tracking-wider">
          <span>إنجاز المشروع</span>
          <span>الهدف: {targetAmount.toLocaleString()} ر.س</span>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-midnight-border my-6" />

      {/* Shares selector */}
      <h3 className="font-black text-xl mb-6 text-center text-secondary dark:text-white font-heading">
        شارك بسهمك لك ولمن تحب
      </h3>

      <div className="flex items-center justify-between border-2 border-gray-100 dark:border-midnight-border bg-gray-50 dark:bg-gray-950 rounded-[2rem] p-3 mb-6 transition-all focus-within:border-primary/50">
        <button
          onClick={() => setShares(Math.max(1, shares - 1))}
          className="w-14 h-14 rounded-2xl bg-white dark:bg-midnight-surface text-gray-600 dark:text-gray-300 font-black text-2xl hover:bg-gray-100 dark:hover:bg-midnight-border transition-all shadow-sm active:scale-95"
        >
          −
        </button>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-black text-secondary dark:text-white font-heading">{shares}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-black font-body uppercase">أسهم العطاء</span>
        </div>
        <button
          onClick={() => setShares(shares + 1)}
          className="w-14 h-14 rounded-2xl bg-primary text-white font-black text-2xl hover:bg-primary-dark transition-all shadow-md active:scale-95"
        >
          +
        </button>
      </div>

      <div className="flex justify-between items-center mb-8 px-4 bg-primary/5 dark:bg-primary/10 py-5 rounded-2xl border border-primary/10">
        <span className="text-gray-500 dark:text-gray-400 font-bold font-body">إجمالي المساهمة:</span>
        <span className="text-3xl font-black text-primary font-heading">{totalAmount.toLocaleString()} ر.س</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        <button
          onClick={handleDonateNow}
          className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl py-5 font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Zap size={22} fill="currentColor" />
          تبرع الآن مباشرة
        </button>

        <button
          onClick={handleAddToCart}
          className="w-full border-2 border-primary/20 dark:border-primary/10 text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-2xl py-4 font-black flex items-center justify-center gap-3 transition-all"
        >
          {addedToCart ? (
            <>
              <CheckCircle2 size={20} className="animate-in zoom-in" />
              تمت الإضافة للسلة
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              أضف للسلة
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-6 flex items-center justify-center gap-2 font-black uppercase tracking-widest font-body">
        <CircleCheck size={14} className="text-emerald-500" />
        موثق ومعتمد رسمياً (1123)
      </p>
    </div>
  );
}
