import React from "react";
import { Card, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

interface DonationMethod {
  bank_name: string;
  logo_image_ids: string[];
  iban_list: string[];
  partner_id: any;
}

interface DonationMethodCardProps {
  method: DonationMethod;
}

const DonationMethodCard = ({ method }: DonationMethodCardProps) => {
  const copyToClipboard = (iban: string) => {
    navigator.clipboard
      .writeText(iban)
      .then(() => {
        message.success("تم نسخ رقم الآيبان");
      })
      .catch(() => {
        message.error("فشل نسخ رقم الآيبان");
      });
  };

  return (
    <Card className="ghaith--donation-method-card">
      <div className="ghaith--donation-card-inner">
        <div className="ghaith--donation-logo-container">
          <img
            alt={method.bank_name}
            src={method.logo_image_ids[0]}
            className="ghaith--donation-logo"
          />
        </div>

        <h3 className="ghaith--donation-bank-name">{method.bank_name}</h3>

        <p className="ghaith--iban-label">رقم الآيبان</p>

        <div className="ghaith--iban-list">
          {method.iban_list.map((iban, index) => (
            <div key={index} className="ghaith--iban-item">
              <span
                className="ghaith--iban-number"
                style={{ direction: "rtl" }}
              >
                {method.partner_id} : {iban}
              </span>
              <CopyOutlined
                className="ghaith--copy-icon"
                onClick={() => copyToClipboard(iban)}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DonationMethodCard;
