import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, FileUser } from "lucide-react";

export default function CommitteePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
         
         <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-ibm">اللجان ومجلس الإدارة</h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              صُناع الأثر والقائمون على تحقيق أهداف جمعية سقيا الماء بشفافية واحترافية.
            </p>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center gap-3">
               <Users className="text-primary" />
               <h2 className="text-xl font-bold text-gray-800">أعضاء مجلس الإدارة</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { name: "أ. محمد عبد الله", role: "رئيس مجلس الإدارة" },
                 { name: "م. خالد عبد الرحمن", role: "نائب رئيس مجلس الإدارة" },
                 { name: "د. عبد السلام فهد", role: "المشرف المالي" },
                 { name: "أ. سعد محمد", role: "عضو" },
                 { name: "م. عبد العزيز فهد", role: "عضو" },
               ].map((member, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-gray-50/50">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                       <FileUser size={24} />
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-800">{member.name}</h3>
                       <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

      </main>

      <Footer />
    </div>
  );
}
