import Link from "next/link";
import { HandHeart, Target, Users } from "lucide-react";
import QuickDonate from "./QuickDonate";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary/5 py-16 md:py-24">
      {/* Abstract Background pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 100 Q 25 50, 50 100 T 100 100" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" className="text-secondary" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="flex flex-col gap-6 text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary leading-tight">
              قطرة ماء.. <br />
              <span className="text-primary">تروي عطشاً وتحيي أملاً</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              منصة وطنية موثوقة تهدف لتيسير عمليات التبرع لسقيا الماء، وتوزيعها على المستحقين في جميع أنحاء المملكة بكل شفّافية وموثوقيّة.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              <Link 
                href="/opportunities" 
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
              >
                تبرع الآن
              </Link>
              <Link 
                href="/reports" 
                className="bg-white hover:bg-gray-50 text-secondary border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              >
                شاهد الأثر
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <QuickDonate />
          </div>

        </div>

        {/* Impact Counters (like Sogya Alma) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-16 max-w-5xl mx-auto">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <HandHeart size={32} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-3xl font-black text-secondary">4,500,000+</span>
              <span className="text-gray-500 font-medium">إجمالي التبرعات (ريال)</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
              <Target size={32} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-3xl font-black text-secondary">152,300+</span>
              <span className="text-gray-500 font-medium">عملية تبرع ناجحة</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
              <Users size={32} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-3xl font-black text-secondary">50,000+</span>
              <span className="text-gray-500 font-medium">مستفيد ومستفيدة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
