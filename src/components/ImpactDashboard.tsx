import React from 'react';
import { Droplets, Users, Building2, Activity } from 'lucide-react';

const stats = [
  {
    icon: <Droplets size={40} className="text-accent" />,
    value: "5,200,000",
    label: "لتر مياه موزعة",
    suffix: "M+"
  },
  {
    icon: <Users size={40} className="text-accent" />,
    value: "1,100,000",
    label: "مستفيد",
    suffix: "M+"
  },
  {
    icon: <Building2 size={40} className="text-accent" />,
    value: "3,420",
    label: "مسجد تمت سقياه",
    suffix: ""
  },
  {
    icon: <Activity size={40} className="text-accent" />,
    value: "45",
    label: "مدينة طبية",
    suffix: ""
  }
];

export default function ImpactDashboard() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary dark:text-gray-100 mb-4 relative inline-block">
            أرقامنا الموثقة
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-16 h-1 bg-secondary rounded-full" />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto font-body text-lg">
            نعكس التزامنا بالشفافية من خلال مؤشرات الأداء المستحدثة يومياً والتي تترجم عطاءكم إلى أثر حقيقي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-900/40 p-10 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-secondary"
            >
              <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-primary dark:text-gray-100 mb-2 font-heading">
                {stat.value}
                <span className="text-secondary text-2xl ml-1">{stat.suffix}</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-lg font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
