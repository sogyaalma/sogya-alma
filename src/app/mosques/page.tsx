import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Droplets } from "lucide-react";
import CardRenderer from "@/components/CardRenderer";
import { getDatabaseRows } from "@/lib/db";

async function getMosqueProjects() {
  const rows = await getDatabaseRows();
  let filteredRows = rows.filter(row => row.TemplateType === 'Project');
  const search = 'مساجد';
  const q = search.toLowerCase();
  filteredRows = filteredRows.filter(row => 
    row.Title.toLowerCase().includes(q) || 
    row.Description.toLowerCase().includes(q) ||
    row.Category.toLowerCase().includes(q)
  );
  return filteredRows;
}

export default async function MosquesPage() {
  const projects = await getMosqueProjects();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <div className="bg-gradient-to-l from-[#004080] to-[#005A9C] py-16 text-white text-center rounded-b-[40px] mb-8">
         <Building2 size={48} className="mx-auto mb-4 opacity-80" />
         <h1 className="text-4xl font-bold mb-4 font-ibm">العناية بالمساجد</h1>
         <p className="text-lg opacity-90 max-w-2xl mx-auto">
            مشاريع السقيا وترميم المساجد وتجهيزها في المناطق المحتاجة.
         </p>
      </div>
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
         {projects.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {projects.map((project: any) => (
               <CardRenderer key={project.ID} row={project} />
             ))}
           </div>
         ) : (
           <div className="text-center text-gray-500 py-16 bg-white rounded-2xl border border-gray-100">
             <Droplets size={64} className="mx-auto mb-4 text-gray-300" />
             <h2 className="text-2xl font-bold font-ibm text-gray-700 mb-2">مشاريع المساجد</h2>
             <p>سيتم قراءة الفرص المتاحة للمساجد قريباً.</p>
           </div>
         )}
      </main>
      <Footer />
    </div>
  );
}
