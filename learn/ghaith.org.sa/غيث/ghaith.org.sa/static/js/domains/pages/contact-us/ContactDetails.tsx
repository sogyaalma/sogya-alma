import { Col, Row } from "antd";
import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { TikTokOutlined, WhatsAppOutlined } from "@ant-design/icons";
import map from "../../../assets/icons/location.svg";
import map2 from "../../../assets/icons/placeholder.png";
import mail from "../../../assets/icons/envelope.png";
import phone from "../../../assets/icons/telephoner.svg";
import ContactDetailsCard from "./ContactDetailsCard";
import { IconBrandSnapchat } from "@tabler/icons-react";

const ContactDetails = () => {
  const cardData = [
    {
      title: "العنوان",
      info: [
        "المقر الرئيسي : المكتب الرئيسي - أبراج ",
        "البيت (برج الساعة) - مكة المكرمة",
        "الطبق الأرضي - خلف الصرافات ",
        "الآلية",
        "جوار سوبر ماركت بن داود",
      ],
      icon: <img width={50} src={map} alt="" />,
      onClick: () => {
        const address = "أبراج البيت برج الساعة مكة المكرمة";
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`,
          "_blank"
        );
      },
    },
    {
      title: "المقر الفرعي:",
      info: ["3334 حي المرسلات،", " 29098 - مدركة - مكة المكرمة"],
      icon: <img width={50} src={map2} alt="" />,
      onClick: () => {
        const address = "3334 حي المرسلات 29098 مكة المكرمة";
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`,
          "_blank"
        );
      },
    },
    {
      title: "البريد الإلكتروني",
      info: ["info@ghaith.org.sa", ""],
      icon: <img width={50} src={mail} alt="" />,
      onClick: () => {
        window.location.href = "mailto:info@ghaith.org.sa";
      },
    },
    {
      title: "رقم الهاتف",
      info: ["920066106"],
      icon: <img width={50} src={phone} alt="" />,
      onClick: () => {
        window.location.href = "tel:+966920066106";
      },
    },
  ];

  return (
    <div className="ghaith--contact-us-Details">
      <p className="ghaith--contact-us-Details-desc">نسعد بتواصلكم</p>
      <Row justify={"space-between"}>
        {cardData?.map((card, index) => (
          <Col
            key={index}
            xxl={11}
            xl={10}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ marginBottom: "2rem" }}
          >
            <ContactDetailsCard
              title={card?.title}
              info={card?.info}
              icon={card?.icon}
              onClick={card?.onClick}
            />
          </Col>
        ))}
      </Row>
      <Row className="ghaith--contact-us-details-social" align={"middle"}>
        <Col xxl={13} xl={14} lg={12} md={14} sm={24} xs={24}>
          <p className="ghaith--contact-us-Details-desc">
            تابعونا عبر وسائل التواصل الاجتماعي :
          </p>
        </Col>
        <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
          <Row
            style={{ gap: "0.7rem" }}
            gutter={16}
            className="ghaith--contactUs-icons"
          >
            <Col
              className="ghaith--contactUs-icon-container"
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              onClick={() => {
                window.open("https://www.instagram.com/ghaith_mkh/#");
              }}
            >
              <Instagram size={20} color="#000" />
            </Col>

            <Col
              className="ghaith--contactUs-icon-container"
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/company/ghaith-mkh/posts/?feedView=all"
                );
              }}
            >
              <Linkedin size={20} color="#000" />
            </Col>

            <Col
              className="ghaith--contactUs-icon-container"
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              onClick={() => {
                window.open("https://x.com/ghaith_mkh");
              }}
            >
              <Twitter size={20} color="#000" />
            </Col>
            <Col
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              className="ghaith--contactUs-icon-container"
              onClick={() => {
                window.open("https://www.youtube.com/@Ghaith_MKH");
              }}
            >
              <Youtube size={20} color="#000" />
            </Col>
          </Row>{" "}
          <Row
            style={{ gap: "0.7rem" }}
            gutter={16}
            className="ghaith--contactUs-icons-bottom"
          >
            <Col
              className="ghaith--contactUs-icon-container"
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              onClick={() => {
                window.open(
                  "https://www.facebook.com/people/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%BA%D9%8A%D8%AB/100070596472782/"
                );
              }}
            >
              <Facebook size={20} color="#000" />
            </Col>

            <Col
              className="ghaith--contactUs-icon-container"
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              onClick={() => {
                window.open(
                  "https://www.whatsapp.com/channel/0029VaTaGMR6GcGKf5OlFt1T"
                );
              }}
            >
              <WhatsAppOutlined style={{ fontSize: "21px", color: "#000" }} />
            </Col>

            <Col
              className="ghaith--contactUs-icon-container"
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              onClick={() => {
                window.open("https://www.tiktok.com/@ghaith_mkh");
              }}
            >
              <TikTokOutlined style={{ fontSize: "21px", color: "#000" }} />
            </Col>
            <Col
              xxl={4}
              xl={4}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              className="ghaith--contactUs-icon-container"
              onClick={() => {
                window.open("https://snapchat.com/t/N7hxrbmK");
              }}
            >
              <IconBrandSnapchat size={21} color="#000" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContactDetails;
