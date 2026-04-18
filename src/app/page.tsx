import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickDonate from "@/components/QuickDonate";
import Projects from "@/components/Projects";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary-dark">
      <Header />
      <main className="flex-grow flex flex-col bg-gray-50">
        {/* Hero Section takes full width and includes the background and QuickDonate */}
        <Hero />

        {/* Projects Cards Section */}
        <Projects />

        {/* Latest News Section */}
        <LatestNews />

        {/* Call to action section before footer */}
        <section className="bg-primary pt-20 pb-24 text-center mt-auto">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-white mb-6">هل تبحث عن فرصة استدامة الأجر؟</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto opacity-90">
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
