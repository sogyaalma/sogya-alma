import React from "react";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import MealsComponent from "./MealsComponent";
import PageContainer from "../../../components/container/PageContainer";

const MealsWrapper: React.FC = () => {
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - إفطار صائم" description="إفطار صائم ">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--gift-sub-title">
            <h1>
              <span className="ghaith--donation-highlight">يا باغِ </span>
              <span className="ghaith--donation-primary">الخير أقبل</span>
            </h1>{" "}
            <p style={{ fontSize: "18px", color: "#666", marginTop: "10px" }}>
              ساهم معنا في إفطار صائمي الحرم من خلال التبرع لأيام مُحددة في شهر
              رمضان المُبارك
            </p>
          </div>{" "}
        </div>{" "}
        <MealsComponent />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default MealsWrapper;
