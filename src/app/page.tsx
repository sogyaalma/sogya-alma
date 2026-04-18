import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickDonate from "@/components/QuickDonate";
import ImpactDashboard from "@/components/ImpactDashboard";
import Projects from "@/components/Projects";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary-dark">
      <Header />
      <main className="flex-grow flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        {/* Hero Section takes full width and includes the background and QuickDonate */}
        <Hero />

        {/* Impact Dashboard Section from Legacy */}
        <ImpactDashboard />

        {/* Projects Cards Section */}
        <Projects />

        {/* Latest News Section */}
        <LatestNews />

        {/* Trust & Transparency Section from Legacy */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-primary dark:text-gray-100 mb-4 font-heading">الشفافية والحوكمة</h2>
              <p className="text-gray-500 dark:text-gray-400 font-body text-lg">نلتزم بأعلى معايير الإفصاح المالي والإداري لنعزز ثقة شركائنا في كل قطرة عطاء.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                "شهادة المراجع الخارجي للعام 2023",
                "التقييم المالي لوزارة الموارد (98%)",
                "شهادة الامتثال للأمن السيبراني"
              ].map((badge, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-6 py-4 rounded-xl text-primary dark:text-blue-400 font-bold shadow-soft flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  {badge}
                </div>
              ))}
            </div>

            <Link href="/reports" className="inline-flex items-center gap-2 text-primary dark:text-secondary-light font-bold hover:text-primary-dark transition-colors border-b-2 border-primary/20 pb-1 font-body">
              شاهد تقارير الأثر والشفافية
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M7 7l5 5-5 5M13 7l5 5-5 5"/></svg>
            </Link>
          </div>
        </section>

        {/* Call to action section before footer */}
        <section className="bg-primary pt-20 pb-24 text-center mt-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/waves.svg')] bg-repeat-x bg-bottom" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-black text-white mb-6 font-heading">هل تبحث عن فرصة استدامة الأجر؟</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto opacity-90 font-body">
              بمساهمتك في الوقف الخيري لجمعية سقيا الماء، تستمر صدقتك الجارية ويدوم أثرها وعطاؤها لسنوات قادمة.
            </p>
            <Link href="/waqf" className="inline-block bg-white text-primary font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
              ساهم في الوقف
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
