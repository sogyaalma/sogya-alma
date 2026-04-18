import { Card } from "antd";
import React, { useState } from "react";
import PdfPreview from "../../../bibilio/Modal/PdfPreviewer";

interface ReportsCardProps {
  report: any;
}

const ReportsCard = ({ report }: ReportsCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Card className="ghaith--partner-card">
        <div className="ghaith--partner-image-container">
          <img
            alt="partner logo"
            src={report?.image_ids[0]}
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="ghaith--partner-card-content">
          <h3
            className="ghaith--partner-card-title"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          >
            {report.name}
          </h3>
          <p className="ghaith--partner-card-description">
            {report.description}
          </p>
        </div>
      </Card>{" "}
      <PdfPreview
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={report?.attachment_ids[0]}
        className="ghaith--pdf-preview-modal"
      />
    </>
  );
};

export default ReportsCard;
