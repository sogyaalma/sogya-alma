import { Col, Row } from "antd";
import React from "react";

interface Props {
  title: string;
  info: string[];
  icon: any;
  onClick?: () => void;
}

const ContactDetailsCard = ({ icon, title, info, onClick }: Props) => {
  return (
    <Row
      className="ghaith--contact-us-Details-card"
      justify={"space-between"}
      gutter={16}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Col xxl={8} xl={8} lg={7} md={8} sm={7} xs={8}>
        <div className="ghaith--contact-us-Details-card-icon">{icon}</div>
      </Col>
      <Col
        xxl={16}
        xl={16}
        lg={17}
        md={16}
        sm={17}
        xs={16}
        style={{ padding: 0 }}
      >
        <div className="ghaith--contact-us-Details-card-info">
          <p>{title}</p>
          {info?.map((info, index) => (
            <span
              key={index}
              style={{
                lineHeight: "0.7",
                direction: title === "رقم الهاتف" ? "ltr" : "rtl",
              }}
            >
              {info}
            </span>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default ContactDetailsCard;
