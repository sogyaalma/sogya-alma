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
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-primary/5 border border-primary/20 dark:border-primary/30 sticky top-28">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-600 dark:text-gray-400">المبلغ المجمع</span>
          <span className="font-bold text-primary text-xl">
            {collectedAmount.toLocaleString()} <span className="text-sm">ر.س</span>
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-bold mt-1">
          <span>{percentage.toFixed(0)}% إنجاز</span>
          <span>الهدف: {targetAmount.toLocaleString()} ر.س</span>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-gray-700 my-6" />

      {/* Shares selector */}
      <h3 className="font-bold text-lg mb-4 text-center text-secondary dark:text-white">
        شارك بسهمك لك ولمن تحب
      </h3>

      <div className="flex items-center justify-between border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-2 mb-3">
        <button
          onClick={() => setShares(Math.max(1, shares - 1))}
          className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold text-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          −
        </button>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-secondary dark:text-white">{shares}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">أسهم</span>
        </div>
        <button
          onClick={() => setShares(shares + 1)}
          className="w-12 h-12 rounded-xl bg-primary text-white font-bold text-xl hover:bg-primary-dark transition-colors"
        >
          +
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-gray-500 dark:text-gray-400 font-bold">قيمة التبرع:</span>
        <span className="text-3xl font-black text-primary">{totalAmount.toLocaleString()} ر.س</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleDonateNow}
          className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Zap size={20} />
          تبرع الآن مباشرة
        </button>

        <button
          onClick={handleAddToCart}
          className="w-full border-2 border-primary/30 text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingCart size={18} />
          أضف للسلة
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 flex items-center justify-center gap-1">
        <CircleCheck size={14} className="text-emerald-500" />
        موثق ومعتمد رسمياً
      </p>
    </div>
  );
}
