import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, Ban, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 font-ibm">سياسة الخصوصية</h1>
          <p className="text-gray-500 dark:text-gray-400">آخر تحديث: أبريل 2025</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {[
            {
              icon: Database,
              title: "جمع البيانات الشخصية وحمايتها",
              content: "تلتزم جمعية سقيا الماء بحماية خصوصية مستخدمي منصتها. يتم جمع البيانات الشخصية (مثل الاسم، ورقم الجوال، والبريد الإلكتروني) لغرض تسهيل عملية التبرع، وتوثيق وصول التبرعات، وإرسال التقارير، ولا يتم مشاركة هذه البيانات مع أطراف ثالثة لأغراض تجارية أو إعلانية.",
            },
            {
              icon: Lock,
              title: "الدفع الإلكتروني الآمن",
              content: "تتم عمليات الدفع الإلكتروني عبر بوابات دفع محلية معتمدة وآمنة (مثل مدى، وآبل باي، وSTC Pay). الجمعية لا تحتفظ بأي بيانات للبطاقات الائتمانية على خوادمها الخاصة. جميع عمليات الدفع مشفرة بتقنية SSL.",
            },
            {
              icon: Eye,
              title: "ملفات تعريف الارتباط (Cookies)",
              content: "يستخدم موقعنا ملفات الكوكيز لتحسين تجربة المستخدم وتذكر تفضيلاتك. يمكنك في أي وقت ضبط إعدادات متصفحك لرفض ملفات الكوكيز، علماً بأن ذلك قد يؤثر على بعض وظائف الموقع.",
            },
            {
              icon: Shield,
              title: "حقوق المستخدم",
              content: "يحق لك في أي وقت: (1) طلب الاطلاع على بياناتك الشخصية المحفوظة لدينا، (2) طلب تصحيح أي بيانات غير دقيقة، (3) طلب حذف بياناتك من قاعدة بياناتنا، (4) إلغاء الاشتراك في الرسائل الترويجية. للتواصل، راسلنا على info@sogyaalma.org.sa",
            },
            {
              icon: Ban,
              title: "مشاركة البيانات مع الأطراف الثالثة",
              content: "لا تقوم الجمعية ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد يتم مشاركة بعض البيانات المجمّعة وغير الشخصية مع الجهات الرقابية المختصة كالمركز الوطني لتنمية القطاع غير الربحي.",
            },
            {
              icon: Mail,
              title: "التواصل والشكاوى",
              content: "إذا كانت لديك أي استفسارات أو مخاوف تتعلق بسياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: info@sogyaalma.org.sa أو عبر الهاتف: 0112766744. سنرد على استفسارك خلال 3 أيام عمل.",
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
