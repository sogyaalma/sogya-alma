import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import useIsMobile from "../../../bibilio/mobileVersion/useIsMobile";
import Loader from "../../../bibilio/loader/Loader";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import FooterSection from "../../../components/sections/FooterSection";
import PageContainer from "../../../components/container/PageContainer";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        {" "}
        <PageContainer title="جمعية غيث - اتصل بنا" description="اتصل بنا ">
          <Loader />{" "}
        </PageContainer>
      </>
    );
  }

  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - اتصل بنا" description="اتصل بنا ">
        <NavBar variant="homePage" />
        <div
          className="ghaith--newsSection-title"
          style={{ marginTop: "9rem" }}
        >
          <h1>
            <span className="ghaith--donation-highlight">اتصل </span>
            <span className="ghaith--donation-primary">بنا</span>
          </h1>
        </div>{" "}
        <Row dir="rtl" justify={"space-between"}>
          <Col xxl={2} xl={1} lg={1} md={1} sm={0} xs={0}></Col>
          <Col
            xxl={10}
            xl={15}
            lg={9}
            md={12}
            sm={24}
            xs={24}
            style={{
              padding: isMobile ? "0 0.5rem 1rem 0.5rem" : "0 2rem 2rem 2rem",
            }}
          >
            <ContactDetails />
          </Col>
          <Col
            xxl={6}
            xl={7}
            lg={11}
            md={11}
            sm={24}
            xs={24}
            style={{ padding: "0 2rem" }}
          >
            <ContactForm />
          </Col>
          <Col xxl={2} xl={1} lg={1} md={1} sm={0} xs={0}></Col>
        </Row>{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default ContactUs;
