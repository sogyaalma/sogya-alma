import Link from "next/link";
import { Droplets, Phone, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#020617] text-gray-800 dark:text-gray-200 pt-20 pb-10 border-t border-gray-100 dark:border-midnight-border transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.svg" 
                alt="جمعية سقيا الماء" 
                className="h-[70px] md:h-[85px] w-auto transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed font-body">
              جمعية خيرية متخصصة في سقيا الماء بمنهجية مؤسسية وتنمية مستدامة. مرخصة من المركز الوطني لتنمية القطاع غير الربحي برقم <strong className="text-primary font-black">(1123)</strong>.
            </p>

            <div className="flex gap-4">
               <a href="https://linktr.ee/sogyaalma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-100 dark:bg-midnight-surface hover:bg-primary hover:text-white transition-all text-secondary dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm font-body">
                  <Globe size={16} /> حسابات التواصل
               </a>
            </div>
          </div>

          {/* About & Governance */}
          <div>
            <h4 className="text-lg font-black mb-8 text-secondary dark:text-white border-r-4 border-primary pr-4 font-heading">الجمعية والحوكمة</h4>
            <ul className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 text-sm font-body">
              <li><Link href="/about" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">عن الجمعية</Link></li>
              <li><Link href="/about?tab=policies" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">اللوائح والسياسات</Link></li>
              <li><Link href="/about?tab=financials" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">التقارير المالية والشفافية</Link></li>
              <li><Link href="/bank-accounts" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block font-bold text-primary dark:text-primary-light">الحسابات البنكية الرسمية</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-lg font-black mb-8 text-secondary dark:text-white border-r-4 border-primary pr-4 font-heading">مشاريعنا</h4>
            <ul className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 text-sm font-body">
              <li><Link href="/search?q=مساجد" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">سقيا المساجد</Link></li>
              <li><Link href="/search?q=آبار" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">حفر الآبار</Link></li>
              <li><Link href="/search?q=الأسر" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">سقيا الأسر المحتاجة</Link></li>
              <li><Link href="/zakat" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">زكاة المال</Link></li>
              <li><Link href="/waqf" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">الوقف الخيري</Link></li>
              <li><Link href="/media" className="hover:text-primary transition-colors hover:translate-x-[-4px] inline-block">المركز الإعلامي</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black mb-8 text-secondary dark:text-white border-r-4 border-primary pr-4 font-heading">تواصل معنا</h4>
            <ul className="flex flex-col gap-5 text-gray-500 dark:text-gray-400 text-sm font-body">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">المملكة العربية السعودية، الرياض، حي شبرا، طريق طوير</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:0112766744" className="hover:text-primary transition-colors font-mono font-black text-base">0112766744</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:info@sogyaalma.org.sa" className="hover:text-primary transition-colors font-black">info@sogyaalma.org.sa</a>
              </li>
            </ul>
            <div className="mt-10 flex gap-4">
              <Link href="/volunteer" className="bg-primary hover:bg-primary-dark text-white text-xs font-black px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                تطوع معنا
              </Link>
              <Link href="/contact" className="bg-gray-100 dark:bg-midnight-surface hover:bg-gray-200 dark:hover:bg-midnight-border text-secondary dark:text-white border border-transparent dark:border-midnight-border text-xs font-black px-6 py-3 rounded-xl transition-all shadow-sm">
                اتصل بنا
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-100 dark:border-midnight-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-widest">
          <p>جميع الحقوق محفوظة لجمعية سقيا الماء بمنطقة الرياض &copy; {new Date().getFullYear()}</p>
          <div className="flex gap-8">
            <Link href="/about/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
            <Link href="/about/terms" className="hover:text-primary transition-colors">شروط الاستخدام</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
