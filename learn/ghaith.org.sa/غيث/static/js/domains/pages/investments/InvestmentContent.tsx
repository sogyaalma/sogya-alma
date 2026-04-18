import React from "react";
import { Row, Col } from "antd";

interface investmentType {
  name: string;
  description: string;
  details: string;
  location: string;
}

interface InvestmentContentProps {
  investments: investmentType[];
}

const InvestmentContent = ({ investments }: InvestmentContentProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  if (!investments || investments.length === 0) {
    return (
      <div
        className="gh--font-light"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        لا توجد أوقاف متاحة حاليًا
      </div>
    );
  }

  const activeInvestment = investments[activeTab];

  return (
    <div
      className="ghaith--news-section"
      style={{ marginTop: "11rem" }}
      dir="rtl"
    >
      <div className="ghaith--newsSection-title">
        <h1>
          <span className="ghaith--donation-highlight"> أوقاف </span>
          <span className="ghaith--donation-primary">الجمعية</span>
        </h1>
      </div>

      {/* Using Ant Design Row and Col */}
      <Row
        gutter={[24, 24]}
        style={{
          marginBottom: "3rem",
          maxWidth: "1400px",
          margin: "0 auto 3rem auto",
          padding: "0 1rem",
        }}
      >
        {/* Right Column - Vertical Tabs */}
        <Col xs={24} sm={24} md={24} lg={11} xl={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0 1rem",
              marginBottom: "2rem",
            }}
          >
            {investments.map((investment: any, index: any) => (
              <button
                key={index}
                className="gh--font-light"
                onClick={() => setActiveTab(index)}
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  color: activeTab === index ? "#009767" : "#6b7280",
                  borderRight:
                    activeTab === index
                      ? "4px solid #009767"
                      : "4px solid transparent",
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {investment.name}
              </button>
            ))}
          </div>
        </Col>

        {/* Left Column - Content */}
        <Col xs={24} sm={24} md={24} lg={13} xl={16}>
          <div
            className="gh--investment-div"
            style={{
              marginBottom: "3rem",
            }}
          >
            <h1 className="ghaith--investment-primary gh--investment-div">
              {activeInvestment?.name}
            </h1>
          </div>

          <div className="gh--investment-div">
            <div className="ghaith--newsDetails-description">
              {activeInvestment?.details}
            </div>
          </div>

          <div className="gh--investment-div" style={{ marginTop: "3rem" }}>
            <h1 className="ghaith--investment-primary gh--investment-div">
              الوصف
            </h1>
          </div>

          <div className="gh--investment-div">
            <div
              className="ghaith--newsDetails-description"
              dangerouslySetInnerHTML={{
                __html: activeInvestment.description || "",
              }}
            />
          </div>

          <div className="gh--investment-div" style={{ marginTop: "3rem" }}>
            <h1 className="ghaith--investment-primary gh--investment-div">
              الموقع
            </h1>
          </div>

          <div className="gh--investment-div">
            <div className="ghaith--newsDetails-description">
              {activeInvestment?.location}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentContent;
