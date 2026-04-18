import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardRenderer from "@/components/CardRenderer";
import { getDatabaseRows } from "@/lib/db";

async function getWaqfProjects() {
  const rows = await getDatabaseRows();
  let filteredRows = rows.filter(row => row.TemplateType === 'Project');
  const search = 'وقف';
  const q = search.toLowerCase();
  filteredRows = filteredRows.filter(row => 
    row.Title.toLowerCase().includes(q) || 
    row.Description.toLowerCase().includes(q) ||
    row.Category.toLowerCase().includes(q)
  );
  return filteredRows;
}

export default async function WaqfPage() {
  const waqfProjects = await getWaqfProjects();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300 flex flex-col font-sans">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-l from-primary to-primary-dark py-20 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 font-heading">الوقف الرقمي لقطاع المياه</h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto font-body">
               استدامة العطاء، وتدفق الخير. ساهم في الأوقاف لضمان استمرار السقيا للمحتاجين عبر الزمن.
            </p>
         </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {waqfProjects.length > 0 ? (
              waqfProjects.map((project: any) => (
                <CardRenderer key={project.ID} row={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white dark:bg-[#1e1e1e] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft">
                 <p className="text-gray-500 dark:text-gray-400 font-body">لا توجد مشاريع وقفية متاحة حالياً.</p>
              </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
