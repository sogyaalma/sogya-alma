import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import MedalIcon from "../../../../assets/icons/medal-ribbon.png";
import { toFormatAmount } from "../../../../apis/utils/utils";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import PdfPreview from "../../../../bibilio/Modal/PdfPreviewer";

interface Medal {
  id: number;
  name: string;
  amount_from: number;
  amount_to: number;
  icon_ids: string[];
  is_current: boolean;
  medal_history_id: number | false;
  url_certificate: string;
}

interface Props {
  medals?: Medal[];
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MedalsModal = ({ medals, isModalVisible, setIsModalVisible }: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
      }}
      closeOnOutsideClick={true}
      width={600}
      centered={true}
      modalStyle={{ top: -200 }}
    >
      <div className="ghaith--medal-modal-container">
        {/* Header */}
        <div className="ghaith--medal-header">
          <div className="ghaith--medal-logo-wrapper">
            <img src={MedalIcon} alt="غيث" className="ghaith--medal-logo" />
          </div>
          <h2 className="ghaith--medal-title gh--font-light">أوسمة غيث </h2>
          <p className="ghaith--medal-description gh--font-light">
            تُمنح أوسمة غيث للمتبرعين عبر حساباتهم الشخصية في موقع غيث، وتُصنَّف
            الأوسمة حسب إجمالي التبرعات{" "}
          </p>
        </div>

        {/* Medals List */}
        <div className="ghaith--medal-list-container">
          {medals && medals.length > 0 ? (
            medals.map((medal, index) => (
              <div
                key={medal.id}
                className={`ghaith--medal-item ${
                  medal.is_current ? "ghaith--medal-item-current" : ""
                }`}
              >
                {/* Medal Icon */}
                <div className="ghaith--medal-icon-wrapper">
                  {medal.icon_ids && medal.icon_ids.length > 0 ? (
                    <img
                      src={medal.icon_ids[0]}
                      alt={medal.name}
                      className="ghaith--medal-icon"
                    />
                  ) : (
                    <div className="ghaith--medal-icon-placeholder">🏅</div>
                  )}
                </div>

                {/* Medal Info */}
                <div className="ghaith--medal-info">
                  <h3 className="ghaith--medal-name gh--font-light">
                    {medal.name}
                  </h3>
                  <p className="ghaith--medal-amount gh--font-light">
                    {medal.amount_to >= 999999999 ? (
                      <>
                        للمتبرعين بأكثر من {toFormatAmount(medal.amount_from)}{" "}
                        <span className="icon-saudi_riyal"></span>
                      </>
                    ) : (
                      <>
                        للمتبرعين بمبلغ من {toFormatAmount(medal.amount_from)}{" "}
                        <span className="icon-saudi_riyal"></span> {"إلى "}
                        {toFormatAmount(medal.amount_to)}{" "}
                        <span className="icon-saudi_riyal"></span>
                      </>
                    )}
                  </p>
                </div>

                {/* Download Button and Current Badge Container */}
                <div className="ghaith--medal-actions">
                  {medal.url_certificate && medal.is_current && (
                    <button
                      className="ghaith--medal-download-btn"
                      onClick={() => setPdfUrl(medal.url_certificate)}
                      title="تحميل الشهادة"
                    >
                      <DownloadOutlined />
                    </button>
                  )}

                  {/* Current Badge */}
                  {medal.is_current && (
                    <div className="ghaith--medal-current-badge gh--font-light">
                      الحالي
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="ghaith--medal-empty-state">
              <p className="gh--font-light">لا توجد أوسمة متاحة</p>
            </div>
          )}
        </div>
      </div>
      <PdfPreview
        open={pdfUrl !== ""}
        onClose={() => setPdfUrl("")}
        url={pdfUrl}
        isBlob={false}
        className="ghaith--pdf-preview-modal"
      />
    </ModalComponent>
  );
};

export default MedalsModal;
