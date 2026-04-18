import { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";

interface PolicyTooltipProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onScrollComplete: () => void;
  children: React.ReactNode;
}

const PolicyTooltip = ({
  visible,
  onVisibleChange,
  onScrollComplete,
  children,
}: PolicyTooltipProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      setHasScrolledToBottom(false);
    }
  }, [visible]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && visible) {
        event.stopPropagation();
        onVisibleChange(false);
      }
    };

    if (visible) {
      document.addEventListener("keydown", handleEscKey, true);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey, true);
    };
  }, [visible, onVisibleChange]);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Check if scrolled to bottom (with 10px threshold)
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (!hasScrolledToBottom) {
          setHasScrolledToBottom(true);
          // Auto-enable checkbox after a small delay
          setTimeout(() => {
            onScrollComplete();
          }, 500);
        }
      }
    }
  };

  const handleClose = () => {
    onVisibleChange(false);
  };

  const policyContent = (
    <div className="ghaith--policy-tooltip-wrapper">
      <div className="ghaith--policy-tooltip-header">
        <h4>سياسة المساهمة</h4>
        <button
          className="ghaith--policy-tooltip-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div
        className="ghaith--policy-tooltip-content"
        ref={contentRef}
        onScroll={handleScroll}
      >
        <section className="ghaith--policy-tooltip-section">
          <h5>شروط المساهمة</h5>
          <p>
            بالمساهمة في هذه المنصة، فإنك توافق على الشروط والأحكام التالية:
          </p>
          <ul>
            <li>جميع المساهمات نهائية وغير قابلة للاسترداد</li>
            <li>يجب أن تكون المساهمة من مصدر مشروع</li>
            <li>المساهم مسؤول عن دقة المعلومات المقدمة</li>
            <li>نحتفظ بالحق في رفض أي مساهمة دون إبداء الأسباب</li>
          </ul>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <h5>استخدام المساهمات</h5>
          <p>سيتم استخدام جميع المساهمات في:</p>
          <ul>
            <li>دعم المشاريع الخيرية المعتمدة</li>
            <li>تقديم المساعدات للمستحقين</li>
            <li>تطوير وتحسين خدمات المنصة</li>
            <li>المصاريف الإدارية الضرورية (بحد أقصى 8%)</li>
          </ul>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <h5>حماية البيانات</h5>
          <p>نلتزم بحماية بياناتك الشخصية:</p>
          <ul>
            <li>لن نشارك معلوماتك مع جهات خارجية دون موافقتك</li>
            <li>جميع المعاملات محمية بأعلى معايير الأمان</li>
            <li>يمكنك طلب حذف بياناتك في أي وقت</li>
            <li>نستخدم التشفير لحماية معلومات الدفع</li>
          </ul>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <h5>الإيصالات والإقرارات</h5>
          <ul>
            <li>سيتم إرسال إيصال رسمي بعد كل مساهمة</li>
            <li>الإيصالات معتمدة للأغراض الضريبية</li>
            <li>يمكنك تحميل نسخة من الإيصال في أي وقت</li>
            <li>نرسل تقارير دورية عن استخدام المساهمات</li>
          </ul>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <h5>التواصل</h5>
          <p>للاستفسارات والدعم:</p>
          <ul>
            <li>البريد الإلكتروني: support@ghaith.org</li>
            <li>الهاتف: 800-123-4567</li>
            <li>ساعات العمل: 8 صباحاً - 8 مساءً</li>
          </ul>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <h5>الموافقة</h5>
          <p>
            بتحديد مربع الموافقة، فإنك تقر بأنك قرأت وفهمت ووافقت على جميع
            الشروط والأحكام الواردة في هذه السياسة.
          </p>
        </section>

        {!hasScrolledToBottom && (
          <div className="ghaith--policy-tooltip-indicator">
            <span>⬇ تابع القراءة للموافقة ⬇</span>
          </div>
        )}

        {hasScrolledToBottom && (
          <div className="ghaith--policy-tooltip-success">
            <span>✓ شكراً لقراءة السياسة</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Tooltip
      title={policyContent}
      trigger="click"
      open={visible}
      onOpenChange={onVisibleChange}
      overlayClassName="ghaith--policy-tooltip-overlay"
      placement="topRight"
      color="#fff"
      overlayInnerStyle={{
        padding: 0,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      {children}
    </Tooltip>
  );
};

export default PolicyTooltip;