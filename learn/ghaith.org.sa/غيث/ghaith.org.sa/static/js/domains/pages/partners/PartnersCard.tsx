import { Card } from "antd";
import React from "react";

interface PartnersCardProps {
  partner: any;
}

const PartnersCard = ({ partner }: PartnersCardProps) => {
  return (
    <Card className="ghaith--partner-card">
      <div className="ghaith--partner-image-container">
        <img alt="partner logo" src={partner?.image} />
      </div>
      <div className="ghaith--partner-card-content">
        <h3 className="ghaith--partner-card-title">{partner.title}</h3>
        <p className="ghaith--partner-card-description">{partner.details}</p>
      </div>
    </Card>
  );
};

export default PartnersCard;
