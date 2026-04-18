import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { HeartHandshake, Building2, Truck, Briefcase, Droplets, Phone, Mail, ExternalLink } from "lucide-react";

const services = [
  {
    icon: HeartHandshake,
    title: "طلب دعم مائي للأفراد",
    description: "تقديم طلب دعم مائي للأسر والأفراد الذين يعانون من شُح المياه أو عجز عن سداد فواتير المياه.",
    link: "/request-water",
    color: "text-blue-600",
    bg: "bg-blue-50",
    badge: "للأفراد",
  },
  {
    icon: Building2,
    title: "طلب دعم مائي للجهات",
    description: "تقديم طلب دعم مائي للجهات الخيرية والمساجد والمدارس والمستشفيات وغيرها من المنشآت.",
    link: "/request-water",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    badge: "للجهات",
  },
  {
    icon: Truck,
    title: "بوابة الموردين",
    description: "انضم لقائمة موردي جمعية سقيا الماء وقدم خدماتك ومنتجاتك لدعم مسيرة السقيا المستمرة.",
    link: "/volunteer",
    color: "text-amber-600",
    bg: "bg-amber-50",
    badge: "للشركاء",
  },
  {
    icon: Briefcase,
    title: "فرص العمل والتطوع",
    description: "استعرض الوظائف الشاغرة وفرص التطوع المتاحة في جمعية سقيا الماء وانضم لفريق العطاء.",
    link: "/volunteer",
    color: "text-purple-600",
    bg: "bg-purple-50",
    badge: "وظائف وتطوع",
  },
  {
    icon: Droplets,
    title: "منصة جمع التبرعات",
    description: "تصفح جميع فرص التبرع ومشاريع الجمعية واختر ما يناسبك للمساهمة في إيصال الماء لمستحقيه.",
    link: "/opportunities",
    color: "text-primary",
    bg: "bg-primary/5",
    badge: "التبرعات",
  },
  {
    icon: HeartHandshake,
    title: "تسجيل شراكة مؤسسية",
    description: "انضم كشريك مؤسسي لجمعية سقيا الماء وساهم في بناء مجتمع يعتني بتوفير الماء لكل محتاج.",
    link: "/partnerprofile",
    color: "text-rose-600",
    bg: "bg-rose-50",
    badge: "مؤسسات",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Page Hero */}
      <div className="bg-gradient-to-l from-primary to-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplets size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">الخدمات الإلكترونية</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            جمعية سقيا الماء توفر منظومة متكاملة من الخدمات الرقمية لخدمة المتبرعين والمستفيدين والشركاء.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-16">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.link}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className={`w-14 h-14 ${service.bg} dark:bg-opacity-20 rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon className={`${service.color} w-7 h-7`} />
              </div>
              <span className={`text-xs font-bold ${service.color} bg-opacity-10 mb-3 self-start px-3 py-1 rounded-full border border-current border-opacity-20`}>
                {service.badge}
              </span>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                {service.description}
              </p>
              <div className={`mt-6 flex items-center gap-2 ${service.color} font-bold text-sm`}>
                الدخول للخدمة <ExternalLink size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">هل تحتاج مساعدة؟</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            فريقنا جاهز للإجابة على جميع استفساراتك وتقديم الدعم اللازم لك.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0112766744"
              className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-md"
            >
              <Phone size={18} /> 0112766744
            </a>
            <a
              href="mailto:info@sogyaalma.org.sa"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold px-8 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <Mail size={18} /> info@sogyaalma.org.sa
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
