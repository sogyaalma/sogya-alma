import React from "react";
import { Row, Col } from "antd";
import saudiImage from "../../../assets/images/Saudi-person.png";

interface MemberType {
  name: string;
  function: string;
  image_ids: string[];
}

interface CommitteeType {
  name: string;
  date_from: string;
  date_to: string;
  tasks: string;
  member_ids: MemberType[];
}

interface CommitteesContentProps {
  committes: CommitteeType[];
}

const CommitteesContent = ({ committes }: CommitteesContentProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  if (!committes || committes.length === 0) {
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
        لا توجد لجان متاحة حاليًا
      </div>
    );
  }

  const activeCommittee = committes[activeTab];

  const formatDate = (dateStr: any) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day} / ${month} / ${year}م`;
  };

  return (
    <div
      className="ghaith--news-section"
      style={{ marginTop: "11rem" }}
      dir="rtl"
    >
      <div className="ghaith--newsSection-title">
        <h1>
          <span className="ghaith--donation-highlight"> لجان </span>
          <span
            className="ghaith--donation-primary
"
          >
            الجمعية
          </span>
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
        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0 1rem",
              marginBottom: "2rem",
            }}
          >
            {committes.map((committee: any, index: any) => (
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
                {committee.name}
              </button>
            ))}
          </div>
        </Col>

        {/* Left Column - Content */}
        <Col xs={24} sm={24} md={24} lg={16} xl={18}>
          <div
            className="gh--investment-div"
            style={{
              marginBottom: "3rem",
            }}
          >
            <h1 className="ghaith--investment-primary gh--investment-div">
              {activeCommittee.name}
            </h1>
          </div>

          <div
            style={{
              textAlign: "start",
              marginBottom: "3rem",
              color: "#6b7280",
              fontSize: "1rem",
            }}
            className="gh--font-light"
          >
            <p style={{ margin: "0.25rem 0" }}>
              تاريخ البداية : {formatDate(activeCommittee.date_from)}
            </p>
            <p style={{ margin: "0.25rem 0" }}>
              تاريخ النهاية : {formatDate(activeCommittee.date_to)}
            </p>
          </div>

          <div className="gh--investment-div" style={{ marginTop: "3rem" }}>
            <h1 className="ghaith--investment-primary  gh--investment-div">
              مهامها
            </h1>
          </div>

          <div className="gh--investment-div">
            <div
              className="ghaith--newsDetails-description"
              dangerouslySetInnerHTML={{ __html: activeCommittee.tasks || "" }}
            />
          </div>

          <div className="gh--investment-div" style={{ marginTop: "3rem" }}>
            <h1 className="ghaith--investment-primary gh--investment-div">
              الأعضاء
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "flex-start",
              gap: "3rem",
              flexWrap: "wrap",
              padding: "2rem 1rem",
              marginBottom: "3rem",
            }}
          >
            {activeCommittee.member_ids.map((member: any, index: any) => (
              <div
                key={index}
                style={{ textAlign: "center", maxWidth: "200px" }}
              >
                <div style={{ position: "relative", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      margin: "0 auto",
                    }}
                  >
                    {member.image_ids && member.image_ids.length > 0 ? (
                      <img
                        src={member.image_ids[0]}
                        alt={member.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={saudiImage}
                        alt={member.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "0.25rem",
                  }}
                  className="gh--font-light"
                >
                  {member.name}
                </h4>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                  className="gh--font-light"
                >
                  {member.function}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CommitteesContent;
