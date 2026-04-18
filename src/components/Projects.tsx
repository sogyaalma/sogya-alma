import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";
import { getDatabaseRows } from "@/lib/db";
import CardRenderer from "@/components/CardRenderer";

export default async function Projects() {
  const rows = await getDatabaseRows();
  const projects = rows.filter(r => r.TemplateType === 'Project').slice(0, 3); // Get 3 latest projects

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Gift size={20} />
              </span>
              فرص التبرع المتاحة
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
              تصفح أحدث المشاريع والمبادرات التي يمكنك المساهمة فيها. لك الأجر ولهم الحياة.
            </p>
          </div>
          <Link 
            href="/opportunities" 
            className="flex items-center gap-2 text-primary hover:text-primary-dark font-bold group"
          >
            عرض كل المشاريع
            <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <CardRenderer key={project.ID} row={project} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
