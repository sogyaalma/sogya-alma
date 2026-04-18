import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Scale, ShieldCheck, FileText, Gavel, CheckCircle2 } from "lucide-react";

const policies = [
  {
    icon: ShieldCheck,
    title: "سياسة الحوكمة المؤسسية",
    summary: "تلتزم جمعية سقيا الماء بأعلى معايير الحوكمة المؤسسية الصادرة عن المركز الوطني لتنمية القطاع غير الربحي. يضم مجلس الإدارة 5 أعضاء منتخبين لمدة 3 سنوات ويجتمع 4 مرات سنوياً على الأقل.",
    items: ["انعقاد الجمعية العمومية مرة سنوياً", "التدقيق المالي الخارجي المستقل", "الإفصاح الكامل في التقرير السنوي", "98% في مقاييس الحوكمة 2024"],
  },
  {
    icon: Scale,
    title: "سياسة الاستقلالية وتجنب تضارب المصالح",
    summary: "يلتزم جميع أعضاء مجلس الإدارة والمدراء التنفيذيين بالإفصاح عن أي مصلحة شخصية في القرارات التي تتخذها الجمعية، والامتناع عن التصويت في الحالات التي يوجد فيها تضارب مصالح.",
    items: ["نموذج إفصاح سنوي لكل عضو", "سياسة باب مفتوح مع المستفيدين", "لجنة رقابة داخلية مستقلة", "خط ساخن للإبلاغ عن المخالفات"],
  },
  {
    icon: FileText,
    title: "سياسة قبول التبرعات وصرفها",
    summary: "تقبل الجمعية التبرعات النقدية والعينية والوقفية وفق ضوابط واضحة. يُصرف 100% من تبرعات المشاريع المخصصة على المشروع المحدد، فيما تُخصص نسبة من التبرعات العامة للتشغيل بحد أقصى 10%.",
    items: ["نسبة توجيه للمشاريع 90%+", "تقرير أثر لكل تبرع فوق 500 ريال", "قبول التبرعات بالعملات المحلية والخليجية", "إيصالات رسمية معتمدة ضريبياً"],
  },
  {
    icon: Gavel,
    title: "اللائحة الأساسية للجمعية",
    summary: "تأسست جمعية سقيا الماء بموجب اللائحة الأساسية المعتمدة من وزارة الموارد البشرية والتنمية الاجتماعية، وتعمل وفق نظام الجمعيات والمؤسسات الأهلية السعودي الصادر بالمرسوم الملكي رقم م/8.",
    items: ["رقم السجل: 1123", "الجهة المشرفة: وزارة الموارد البشرية", "النشرة الرسمية: 1443/03/14هـ", "الهدف: سقيا الماء للمحتاجين"],
  },
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">اللوائح والسياسات المؤسسية</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            تعتمد جمعية سقيا الماء منظومة متكاملة من اللوائح التي تضمن الشفافية والحوكمة الرشيدة في جميع عملياتها.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {policies.map((policy, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="p-6 md:p-8 flex gap-5 items-start">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <policy.icon className="text-primary" size={24} />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-secondary dark:text-white mb-2">{policy.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{policy.summary}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {policy.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 size={15} className="text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
