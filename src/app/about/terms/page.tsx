import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileWarning, CheckSquare, AlertTriangle, XCircle, RefreshCw, Phone } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileWarning className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 font-ibm">شروط الاستخدام</h1>
          <p className="text-gray-500 dark:text-gray-400">آخر تحديث: أبريل 2025</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {[
            {
              icon: CheckSquare,
              title: "الموافقة على الشروط",
              content: "باستخدامك لمنصة جمعية سقيا الماء، فإنك توافق على الالتزام بجميع القوانين واللوائح المعمول بها في المملكة العربية السعودية والخاصة بالتبرعات والعمل الخيري. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام المنصة فوراً.",
            },
            {
              icon: RefreshCw,
              title: "توجيه وإعادة توجيه التبرعات",
              content: "يحق للجمعية إعادة توجيه ريع التبرعات حسب الحاجة وحسب الأولويات الميدانية لمشاريع السقيا، مع الالتزام التام بالضوابط الشرعية والنظامية في صرف تلك التبرعات. لا يحق للمتبرع المطالبة باسترداد المبلغ بعد إتمام العملية إلا في حالات استثنائية وبعد مراجعة الإدارة.",
            },
            {
              icon: AlertTriangle,
              title: "القيود والاستخدام المقبول",
              content: "يُحظر استخدام المنصة لأي غرض غير مشروع أو ينتهك القوانين السارية. يُحظر محاولة الوصول غير المصرح به لأنظمة الجمعية. يجب تقديم معلومات صحيحة ودقيقة عند التسجيل. يحق للجمعية إيقاف أي حساب يخالف هذه الشروط دون إشعار مسبق.",
            },
            {
              icon: XCircle,
              title: "حدود المسؤولية",
              content: "تبذل جمعية سقيا الماء قصارى جهدها لضمان دقة المعلومات المقدمة على المنصة، غير أنها لا تتحمل المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناجمة عن الاعتماد على هذه المعلومات. المنصة مقدمة 'كما هي' وقد تتوقف مؤقتاً لأغراض الصيانة.",
            },
            {
              icon: RefreshCw,
              title: "تعديل الشروط",
              content: "تحتفظ جمعية سقيا الماء بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين المسجلين بأي تغييرات جوهرية عبر البريد الإلكتروني أو رسالة نصية. استمرارك في استخدام المنصة بعد التعديل يعني موافقتك على الشروط المحدثة.",
            },
            {
              icon: Phone,
              title: "التواصل والنزاعات",
              content: "تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع يُحل أولاً بالتفاوض الودي، فإن تعذر ذلك تُحال إلى المحاكم السعودية المختصة. للتواصل: info@sogyaalma.org.sa أو الاتصال على 0112766744.",
            },
          ].map((section, i) => (
            <div key={i} className={`p-8 md:p-10 ${i < 5 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                  <section.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{section.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.content}</p>
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
