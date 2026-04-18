import Link from "next/link";
import { Droplets, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-gray-950 text-white pt-16 pb-8 border-t-4 border-primary transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Droplets className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl leading-none">سقيا الماء</span>
                <span className="text-primary/80 text-sm">بمنطقة الرياض</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              جمعية متخصصة في توفير مياه الشرب النظيفة للمحتاجين، وحفر الآبار، وسقيا المساجد. مسجلة بوزارة الموارد البشرية برقم <strong className="text-primary">1123</strong>.
            </p>
          </div>

          {/* About & Governance — all pointing to /about with ?tab= */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-r-2 border-primary pr-3">الجمعية والحوكمة</h4>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">عن الجمعية والهيكل التنظيمي</Link></li>
              <li><Link href="/about?tab=policies" className="hover:text-primary transition-colors">اللوائح والسياسات</Link></li>
              <li><Link href="/about?tab=financials" className="hover:text-primary transition-colors">القوائم المالية</Link></li>
              <li><Link href="/about?tab=opendata" className="hover:text-primary transition-colors">البيانات المفتوحة</Link></li>
              <li><Link href="/reports" className="hover:text-primary transition-colors">تقارير الشفافية</Link></li>
              <li><Link href="/about/branches" className="hover:text-primary transition-colors">فروع الجمعية</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-r-2 border-primary pr-3">مشاريعنا</h4>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li><Link href="/opportunities?search=مساجد" className="hover:text-primary transition-colors">سقيا المساجد</Link></li>
              <li><Link href="/opportunities?search=آبار" className="hover:text-primary transition-colors">حفر الآبار</Link></li>
              <li><Link href="/opportunities?search=الأسر" className="hover:text-primary transition-colors">سقيا الأسر المحتاجة</Link></li>
              <li><Link href="/zakat" className="hover:text-primary transition-colors">زكاة المال</Link></li>
              <li><Link href="/waqf" className="hover:text-primary transition-colors">الوقف الخيري</Link></li>
              <li><Link href="/media" className="hover:text-primary transition-colors">المركز الإعلامي</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-r-2 border-primary pr-3">تواصل معنا</h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>المملكة العربية السعودية، الرياض، حي شبرا، طريق تويق</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:0112766744" className="hover:text-primary transition-colors font-mono">0112766744</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:info@sogyaalma.org.sa" className="hover:text-primary transition-colors">info@sogyaalma.org.sa</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Link href="/volunteer" className="bg-primary/20 hover:bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                تطوع معنا
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                اتصل بنا
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>جميع الحقوق محفوظة لجمعية سقيا الماء بمنطقة الرياض &copy; {new Date().getFullYear()}</p>
          <div className="flex gap-6">
            <Link href="/about/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
            <Link href="/about/terms" className="hover:text-primary transition-colors">شروط الاستخدام</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
