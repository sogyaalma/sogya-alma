import React from "react";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import GiftComponent from "./GiftForm";
import PageContainer from "../../../components/container/PageContainer";

const GiftWrapper: React.FC = () => {
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - هدية غيث" description="هدية غيث ">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--gift-sub-title">
            <h1>
              <span className="ghaith--donation-highlight">هدية </span>
              <span className="ghaith--donation-primary">غيث</span>
            </h1>{" "}
            <p style={{ fontSize: "18px", color: "#666", marginTop: "10px" }}>
              يمكنك إهداء تبرعك باسم من تحب، لتصلهم رسالة امتنان، ويبقى لهم أجر
           العطاء وأثره
            </p>
          </div>{" "}
        </div>{" "}
        <GiftComponent />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default GiftWrapper;
