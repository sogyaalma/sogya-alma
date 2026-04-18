import React from "react";
import { Row, Col } from "antd";
import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { foundingMembers } from "../../../interfaces/Founding.members";
import MemberCard from "../../../bibilio/cards/memberCard";
import PageContainer from "../../../components/container/PageContainer";

const FoundingMembers = () => {
  return (
    <>
      <PageContainer
        title="جمعية غيث - الأعضاء المؤسسين"
        description="الأعضاء المؤسسين"
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">الأعضاء </span>
              <span className="ghaith--donation-primary">المؤسسين</span>
            </h1>
          </div>

          <div className="ghaith--founding-members-container">
            <Row
              gutter={[32, 48]}
              justify="center"
              style={{ direction: "rtl" }}
            >
              {foundingMembers.map((member) => (
                <Col
                  key={member.id}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <MemberCard member={member} />
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default FoundingMembers;
