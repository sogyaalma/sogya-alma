import React from "react";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import UmrahComponent from "./UmrahForm";
import PageContainer from "../../../components/container/PageContainer";

const UmrahPage: React.FC = () => {
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - عمرة البدل" description="عمرة البدل">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--gift-sub-title">
            <h1>
              <span className="ghaith--donation-highlight">عمرة </span>
              <span className="ghaith--donation-primary">البدل</span>
            </h1>{" "}
            <p style={{ fontSize: "18px", color: "#666", marginTop: "10px" }}>
              يمكنك توكيل جمعية غيث لأداء العمرة نيابةً عن متوفي أو عاجز، وفق
              الضوابط الشرعية، ليصله الأجر بإذن الله.
            </p>
          </div>{" "}
        </div>{" "}
        <UmrahComponent />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default UmrahPage;
