import { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import verifiedIcon from "../../assets/icons/verified.svg";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept?: () => void;
}

const DonatePolicyModal = ({
  isModalVisible,
  setIsModalVisible,
  onAccept,
}: Props) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset button state when modal opens
    if (isModalVisible) {
      setIsButtonEnabled(false);
    }
  }, [isModalVisible]);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Enable button when user scrolls to bottom (with 10px threshold)
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsButtonEnabled(true);
      }
    }
  };

  const handleContinue = () => {
    if (onAccept) {
      onAccept();
    }
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ModalComponent
      title=""
      showCloseIcon={true}
      open={isModalVisible}
      onClose={handleClose}
      closeOnOutsideClick={true}
      width={500}
      centered={true}
      modalStyle={{ top: -200 }}
    >
      <div className="ghaith--policy-modal-wrapper">
        <div className="ghaith--policy-header">
          <div className="ghaith--policy-icon">
            <img src={verifiedIcon} alt="سياسة التبرع" />
          </div>
          <h2 className="ghaith--policy-title">سياسة وشروط التبرع</h2>
        </div>

        <div
          className="ghaith--policy-content"
          ref={contentRef}
          onScroll={handleScroll}
        >
          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">مقدمة</h3>
            <p className="ghaith--policy-text">
              نرحب بكم في منصة التبرع الخاصة بنا. تهدف هذه السياسة إلى توضيح
              الشروط والأحكام المتعلقة بعملية التبرع، وحقوق والتزامات المتبرعين
              والمستفيدين. نحن ملتزمون بالشفافية والنزاهة في جميع عمليات التبرع
              التي تتم من خلال منصتنا.
            </p>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">شروط التبرع</h3>
            <ul className="ghaith--policy-list">
              <li>يجب أن يكون المتبرع بالغاً راشداً وفقاً للقوانين المحلية</li>
              <li>
                جميع التبرعات نهائية وغير قابلة للاسترداد إلا في حالات استثنائية
              </li>
              <li>يتحمل المتبرع مسؤولية التأكد من دقة المعلومات المقدمة</li>
              <li>يحق للمنصة رفض أي تبرع يُشتبه في أنه من مصدر غير مشروع</li>
              <li>
                يجب على المتبرع الالتزام بالحد الأدنى والأقصى لمبلغ التبرع
              </li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">استخدام التبرعات</h3>
            <p className="ghaith--policy-text">
              نلتزم باستخدام جميع التبرعات في الأغراض المحددة من قبل المتبرع أو
              في المشاريع الخيرية العامة. سيتم توزيع التبرعات وفقاً للأولويات
              التالية:
            </p>
            <ul className="ghaith--policy-list">
              <li>المشاريع المحددة من قبل المتبرع</li>
              <li>الحالات الطارئة والإغاثة العاجلة</li>
              <li>المشاريع التنموية طويلة الأمد</li>
              <li>المصاريف الإدارية الضرورية (بحد أقصى 10%)</li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">الشفافية والمساءلة</h3>
            <p className="ghaith--policy-text">
              نؤمن بأهمية الشفافية في جميع عملياتنا. لذلك نلتزم بما يلي:
            </p>
            <ul className="ghaith--policy-list">
              <li>نشر تقارير مالية دورية توضح كيفية استخدام التبرعات</li>
              <li>إمكانية تتبع التبرعات الفردية ومعرفة تأثيرها</li>
              <li>الخضوع للمراجعة المالية من قبل جهات مستقلة</li>
              <li>الرد على استفسارات المتبرعين خلال 48 ساعة عمل</li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">
              حماية البيانات والخصوصية
            </h3>
            <p className="ghaith--policy-text">
              نحن ملتزمون بحماية خصوصية المتبرعين وبياناتهم الشخصية:
            </p>
            <ul className="ghaith--policy-list">
              <li>لن نشارك معلوماتك الشخصية مع أي جهة ثالثة دون موافقتك</li>
              <li>جميع المعاملات المالية محمية بأعلى معايير الأمان والتشفير</li>
              <li>يحق لك طلب حذف بياناتك الشخصية في أي وقت</li>
              <li>
                نستخدم بياناتك فقط لأغراض التبرع وإرسال التقارير والتحديثات
              </li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">سياسة الاسترداد</h3>
            <p className="ghaith--policy-text">
              على الرغم من أن التبرعات نهائية بطبيعتها، نوفر إمكانية الاسترداد
              في الحالات التالية:
            </p>
            <ul className="ghaith--policy-list">
              <li>الخطأ في إدخال مبلغ التبرع</li>
              <li>التبرع المكرر عن طريق الخطأ</li>
              <li>المعاملات الاحتيالية أو غير المصرح بها</li>
              <li>يجب تقديم طلب الاسترداد خلال 7 أيام من تاريخ التبرع</li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">
              الإيصالات والشهادات الضريبية
            </h3>
            <p className="ghaith--policy-text">
              سيحصل كل متبرع على إيصال رسمي معتمد يمكن استخدامه للأغراض
              الضريبية. الإيصالات تشمل:
            </p>
            <ul className="ghaith--policy-list">
              <li>رقم الإيصال الفريد</li>
              <li>تاريخ ووقت التبرع</li>
              <li>مبلغ التبرع وطريقة الدفع</li>
              <li>اسم المشروع أو الجهة المستفيدة</li>
              <li>ختم وتوقيع المؤسسة</li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">التواصل والدعم</h3>
            <p className="ghaith--policy-text">
              نحن هنا لمساعدتك في أي وقت. يمكنك التواصل معنا عبر:
            </p>
            <ul className="ghaith--policy-list">
              <li>البريد الإلكتروني: support@ghaith.org</li>
              <li>الهاتف: 800-123-4567 (مجاني)</li>
              <li>الدردشة المباشرة على الموقع</li>
              <li>ساعات العمل: من السبت إلى الخميس، 8 صباحاً - 8 مساءً</li>
            </ul>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">تعديلات السياسة</h3>
            <p className="ghaith--policy-text">
              نحتفظ بالحق في تعديل هذه السياسة في أي وقت. سيتم إشعار جميع
              المتبرعين المسجلين بأي تغييرات جوهرية عبر البريد الإلكتروني.
              يُعتبر استمرارك في استخدام المنصة بعد نشر التعديلات موافقة منك على
              السياسة المحدثة.
            </p>
          </section>

          <section className="ghaith--policy-section">
            <h3 className="ghaith--policy-section-title">الموافقة والقبول</h3>
            <p className="ghaith--policy-text">
              بالنقر على زر "متابعة"، فإنك تقر بأنك قرأت وفهمت وتوافق على جميع
              الشروط والأحكام الواردة في هذه السياسة. إذا كان لديك أي استفسارات
              أو تحفظات، يرجى التواصل معنا قبل إتمام عملية التبرع.
            </p>
          </section>

          <div className="ghaith--policy-footer-text">
            <p>
              شكراً لثقتكم ودعمكم الكريم. تبرعكم يصنع فرقاً حقيقياً في حياة
              المحتاجين. نسأل الله أن يتقبل منكم ويجعله في موازين حسناتكم.
            </p>
          </div>

          {!isButtonEnabled && (
            <div className="ghaith--scroll-indicator">
              <span>⬇ قم بالتمرير للأسفل لقراءة السياسة كاملة ⬇</span>
            </div>
          )}
        </div>

        <div className="ghaith--policy-actions">
          <Button
            type="primary"
            onClick={handleContinue}
            disabled={!isButtonEnabled}
            className="ghaith--policy-continue-btn"
          >
            {isButtonEnabled ? "متابعة" : "اقرأ السياسة للمتابعة"}
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default DonatePolicyModal;
