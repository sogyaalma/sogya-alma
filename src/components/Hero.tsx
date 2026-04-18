import Link from "next/link";
import { CreditCard } from "lucide-react";
import QuickDonate from "./QuickDonate";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary/5 dark:bg-primary/10 py-16 md:py-24">
      {/* Abstract Background pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 100 Q 25 50, 50 100 T 100 100" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" className="text-secondary opacity-50 dark:opacity-20" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="flex flex-col gap-8 text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary dark:text-gray-100 leading-tight">
              نعيد تعريف العطاء..<br />
              <span className="text-secondary dark:text-secondary-light">قطرة تنبض بالحياة</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
              جمعية سقيا الماء تدعوكم للمشاركة في أعظم الأبواب أجراً، وتوفير المياه النقية للمحتاجين في جميع أنحاء المملكة بكل أمانة وإخلاص.
            </p>
            <div className="flex flex-wrap gap-5 mt-4 justify-center lg:justify-start">
              <Link 
                href="/opportunities" 
                className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center gap-2"
              >
                <CreditCard size={22} />
                شاركنا الأجر
              </Link>
              <Link 
                href="/volunteer" 
                className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              >
                تطوع معنا
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <QuickDonate />
          </div>

        </div>
      </div>
    </section>
  );
}
