import React from "react";
import { Row, Col } from "antd";
import AboutCoMainImg from "../../assets/images/AboutCoMain.png";
import AboutMainImg from "../../assets/images/AboutMain.png";
import validIcon from "../../assets/icons/valid.svg";

const AboutSection: React.FC = () => {
  return (
    <div className="ghaith--about-section" dir="rtl">
      <div className="ghaith--donationSection-title ghaith--about-title">
        <img
          alt=""
          src={validIcon}
          className="ghaith--donationSection-title-icon"
        />
        <h1>
          <span className="ghaith--donation-highlight ">نبذة </span>
          <span className="ghaith--donation-primary"> 
            
          </span>
        </h1>
      </div>
      <Row gutter={[32, 32]} className="about-row" justify={"center"}>
        <Col xxl={3} xl={3} lg={3} md={0} sm={0} xs={0}></Col>

        {/* Right side - big image */}
        <Col
          xxl={8}
          xl={8}
          lg={8}
          md={18}
          sm={18}
          xs={18}
          style={{ padding: "1vh" }}
          className="ghaith--about-right"
        >
          <div className="ghaith--about-big-img-frame">
            <img
              src={AboutMainImg}
              className="ghaith--about-big-img"
              alt="About main"
            />
          </div>{" "}
        </Col>

        <Col xxl={1} xl={1} lg={1} md={0} sm={0} xs={0}></Col>

        {/* Left side - text + small image at the bottom */}
        <Col
          xxl={8}
          xl={8}
          lg={8}
          md={18}
          sm={18}
          xs={18}
          style={{ padding: "1vh" }}
          className="ghaith--about-left"
        >
          <div className="ghaith--about-text">
            <p>
              نحن جمعية غيث الخيرية (ترخيص رقم 693 من المركز الوطني غير الربحي)،
              مهمّتنا تقديم المساعدات النقدية و العينية، والخدمات الصحية و
              التدريبية، و تأهيل المستفيدين من أهالي منطقة مكة المكرمة و القرى
              التي تمتدّ لها خدمات الجمعية، كذلك تقديم الخدمات لضيوف الرحمن بكل
              جودة و كفاءة من سقيا و ضيافة و إطعام و تنفيذ مشاريع أخرى لخدمة
              ضيوف الرحمن.
            </p>
          </div>

          <div className="ghaith--about-small-img">
            <img src={AboutCoMainImg} alt="About secondary" />
          </div>
        </Col>

        <Col xxl={3} xl={3} lg={3} md={0} sm={0} xs={0}></Col>
      </Row>
    </div>
  );
};

export default AboutSection;
