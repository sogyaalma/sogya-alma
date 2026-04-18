import React from "react";
import { Image } from "antd";

import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import image from "../../../assets/images/organizitional-structure.jpg";
import PageContainer from "../../../components/container/PageContainer";

const OrganizationalStructure = () => {
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - الهيكل التنظيمي"
        description="الهيكل التنظيمي "
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">الهيكل </span>
              <span className="ghaith--donation-primary">التنظيمي</span>
            </h1>
          </div>

          <div
            style={{
              width: "80%",
              margin: "2rem auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={image}
              alt="الهيكل التنظيمي"
              preview={{
                mask: "انقر للتكبير",
              }}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default OrganizationalStructure;
