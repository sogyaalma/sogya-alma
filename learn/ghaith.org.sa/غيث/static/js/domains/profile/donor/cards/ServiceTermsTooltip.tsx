import { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";

interface ConditionsTooltipProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onScrollComplete: () => void;
  children: React.ReactNode;
}

const ConditionsTooltip = ({
  visible,
  onVisibleChange,
  onScrollComplete,
  children,
}: ConditionsTooltipProps) => {
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

  const conditionsContent = (
    <div className="ghaith--policy-tooltip-wrapper">
      <div className="ghaith--policy-tooltip-header">
        <h4>الشروط</h4>
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
          <p>1- أن يكون المتقدم/ة سعودي/ة الجنسية.</p>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <p>
            2- في حال كان المتقدمة غير سعودية يشترط أن يكون الزوج سعودي الجنسية.
          </p>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <p>
            3- أن يكون مقر إقامته الأصلي داخل نطاق الجمعية؛ وفي حال كان المتقدم
            حديث السكن يشترط مضي ثلاثة أشهر على إقامته داخل نطاق الجمعية.
          </p>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <p>
            4- يتم قبول المرأة كمستفيدة في حالة كونها مطلقة أو أرملة بعد تقرير
            الباحث.
          </p>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <p>
            5- يتعهد مقدم الطلب بصحة البيانات المدخلة من خلال الموقع الإلكتروني.
          </p>
        </section>

        <section className="ghaith--policy-tooltip-section">
          <p>
            6- الموافقة على تفويض الجمعية أو من يمثلها بالاستفسار عن صحة
            المعلومات في أي جهة ذات علاقة تراها الجمعية.
          </p>
        </section>

        {!hasScrolledToBottom && (
          <div className="ghaith--policy-tooltip-indicator">
            <span>⬇ تابع القراءة للموافقة ⬇</span>
          </div>
        )}

        {hasScrolledToBottom && (
          <div className="ghaith--policy-tooltip-success">
            <span>✓ شكراً لقراءة الشروط</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Tooltip
      title={conditionsContent}
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

export default ConditionsTooltip;