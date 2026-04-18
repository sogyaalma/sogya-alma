import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "antd";
import linkedin from "../../assets/icons/footer-linkedin.svg";
import youtube from "../../assets/icons/footer-youtube.svg";
import twitter from "../../assets/icons/footer-twitter.svg";
import snapchat from "../../assets/icons/footer-snapchat.svg";
import tiktok from "../../assets/icons/footer-tiktok.svg";
import facebook from "../../assets/icons/footer-facebook.svg";
import whatsapp from "../../assets/icons/footer-whatsapp.svg";
import instagram from "../../assets/icons/footer-instagram.svg";
import handsImage from "../../assets/images/Be-ghaith.png";
import TopArrowIcon from "../../assets/icons/footer-arrow.svg";
import { useNavigate } from "react-router-dom";
import heroMobile0 from "../../assets/banners/mobile/ManFooterMobile.png";
import SkyFooterMobile from "../../assets/banners/mobile/SkyFooterMobile.png";
import useIsMobile from "../../bibilio/mobileVersion/useIsMobile";

interface FooterSectionProps {
  footerImg: any;
  footerMobile?: any;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  footerImg,
  footerMobile,
}) => {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  // parallax for hands
  const footerRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const START_EARLY = 650; // px BEFORE the footer top to begin effect (tweak)
    const SPEED = 0.4; // movement intensity
    const STOP_AT = 0.65; // stop before the end

    const onScroll = () => {
      const el = footerRef.current;
      if (!el) return;

      // disable below 990px
      if (window.innerWidth < 990) {
        setOffset(0);
        return;
      }

      const sectionTop = el.offsetTop;
      const sectionH = el.offsetHeight;
      const scrollY = window.scrollY;

      let rel = scrollY - (sectionTop - START_EARLY);
      if (rel < 0) rel = 0;

      const maxRel = sectionH * STOP_AT;
      if (rel > maxRel) rel = maxRel;

      setOffset(rel * SPEED);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer ref={footerRef} className="ghaith--footer-container" dir="rtl">
      {/* layered images */}
      <div className="ghaith--footer-layer">
        <img
          src={isMobile ? footerMobile || heroMobile0 : footerImg}
          alt="Mosque"
          className="ghaith--footer-mosque"
        />
        <img
          src={isMobile ? SkyFooterMobile : handsImage}
          alt="Hands"
          className="ghaith--footer-hands"
          style={{ transform: `translateY(${offset}px)` }}
        />
      </div>

      {/* ========== top bar (same level) ========== */}
      <div className="gh--footer-bottom-section">
        <div className="ghaith--footer-topbar">
          {/* ABSOLUTE center - always at screen middle */}
          <div className="ghaith--footer-topbar__center">
            <h3 className="ghaith--footer-cta__title">
              عطاءٌ لا ينقطع بإذن الله
            </h3>
            <a
              className="ghaith--foter-cta__btn"
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              تواصل معنا
            </a>
          </div>

          {/* Row holds the side items in the same level */}
          <Row
            className="ghaith--footer-topbar__row"
            align="middle"
            justify="space-between"
            wrap={false}
            gutter={[16, 16]}
          >
            {/* RIGHT help box */}
            <Col flex="0 1 420px" xs={24} md="auto">
              <div className="ghaith--footer-help">
                <p className="ghaith--footer-help__text">
                  مرحبًا، أنا غيث الخير ! دعني أساعدك في إجراء تبرعاتك بسرعة
                  والإجابة عن أي استفسارات لديك.
                </p>
                <a href="#contact" className="ghaith--footer-help__link">
                  اتفقنا !{" "}
                </a>
              </div>
            </Col>

            {/* LEFT go-to-top */}
            <Col flex="none" xs={24} md="auto">
              <button
                className="ghaith--footer-to-top"
                onClick={toTop}
                aria-label="إلى الأعلى"
              >
                <img src={TopArrowIcon} alt="Top Arrow" />
              </button>
            </Col>
          </Row>
        </div>

        {/* divider */}
        <div className="gh--footer-divider-block">
          <div className="ghaith--footer-divider" />

          {/* ========== bottom meta row ========== */}
          <Row
            className="ghaith--footer-meta"
            align="middle"
            wrap
            gutter={[12, 12]}
          >
            <Col
              flex="1 1 0"
              className="ghaith--footer-copy"
              span={12}
              sm={24}
              xs={24}
            >
              جميع الحقوق محفوظة - جمعية غيث - {currentYear}
            </Col>
            <Col flex="1 1 0" span={12} sm={24} xs={24}>
              <ul className="ghaith--footer-social">
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    href="https://www.linkedin.com/company/ghaith-mkh/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <img src={linkedin} alt="LinkedIn" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    rel="noopener noreferrer"
                    href="https://www.tiktok.com/@ghaith_mkh"
                    aria-label="TikTok"
                  >
                    <img src={tiktok} alt="TikTok" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    href="https://www.youtube.com/@Ghaith_MKH"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <img src={youtube} alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Snapchat"
                    href="https://snapchat.com/t/N7hxrbmK"
                  >
                    <img src={snapchat} alt="Snapchat" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    href="https://www.facebook.com/people/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%BA%D9%8A%D8%AB/100070596472782/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <img src={facebook} alt="Facebook" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    href="https://www.instagram.com/ghaith_mkh/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <img src={instagram} alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    aria-label="WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.whatsapp.com/channel/0029VaTaGMR6GcGKf5OlFt1T"
                  >
                    <img src={whatsapp} alt="WhatsApp" />
                  </a>
                </li>
                <li>
                  <a
                    className="ghaith--footer-social__icon"
                    href="https://x.com/ghaith_mkh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <img src={twitter} alt="Twitter" />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
