import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../apis/store";
import TransparentButton from "../../bibilio/Buttons/TransparentButton";
import logo from "../../assets/logos/MainLogo.png";
import { sections } from "../../data/data";
import linkedin from "../../assets/icons/menu/footer-linkedin.svg";
import youtube from "../../assets/icons/menu/footer-youtube.svg";
import twitter from "../../assets/icons/menu/footer-twitter.svg";
import snapchat from "../../assets/icons/menu/footer-snapchat.svg";
import tiktok from "../../assets/icons/menu/footer-tiktok.svg";
import facebook from "../../assets/icons/menu/footer-facebook.svg";
import whatsapp from "../../assets/icons/menu/footer-whatsapp.svg";
import instagram from "../../assets/icons/menu/footer-instagram.svg";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useMiddleMobile from "../../bibilio/mobileVersion/useMiddleMobile";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  role?: string;
  userName?: string;
  onLoginClick: () => void;
  onSpecificLoginClick?: (
    type: "exterior_donor" | "exterior_beneficiary",
  ) => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isOpen,
  onClose,
  isConnected,
  role,
  userName,
  onLoginClick,
  onSpecificLoginClick,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isMobile = useMiddleMobile();
  const currentYear = new Date().getFullYear();

  const { availableServices } = useSelector(
    (state: RootState) => state?.beneficiary,
  );

  useEffect(() => {
    if (!isOpen) {
      setOpenSection(null);
    }
  }, [isOpen]);

  const filterSubItems = (subList: any[] = []) => {
    return subList.filter((item) => {
      if (item.showCondition) {
        return availableServices?.includes("beneficiary_request_active");
      }
      return true;
    });
  };

  const handleNavigation = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
      onClose();
    } else if (path) {
      navigate(path);
      onClose();
    }
  };

  const handleSubItemClick = (subItem: any) => {
    if (
      subItem?.openLogin === "exterior_donor" ||
      subItem?.openLogin === "exterior_beneficiary"
    ) {
      if (onSpecificLoginClick) {
        onSpecificLoginClick(subItem.openLogin);
      } else {
        onLoginClick();
      }
      onClose();
      return;
    }

    handleNavigation(subItem.link);
  };

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleLoginProfileClick = () => {
    onClose();
    if (isConnected) {
      navigate("/profile");
    } else {
      onLoginClick();
    }
  };

  return (
    <div className={`ghaith--overlay-menu ${isOpen ? "active" : ""}`}>
      <div className="ghaith--overlay-background" onClick={onClose} />

      <div className="ghaith--overlay-content">
        <div className="ghaith--overlay-scrollable-wrapper">
          {/* Close Button */}
          <button className="ghaith--overlay-close" onClick={onClose}>
            <span className="close-line close-line-1"></span>
            <span className="close-line close-line-2"></span>
          </button>

          {/* RIGHT SIDEBAR - 1/3 screen on big screens */}
          <div className="ghaith--overlay-sidebar">
            {/* Logo */}
            <div className="ghaith--overlay-logo">
              <img src={logo} alt="logo" />
            </div>

            {/* Contact Info */}
            {!isMobile && (
              <>
                <div className="ghaith--overlay-contact">
                  <div className="ghaith--overlay-contact-item">
                    <span className="contact-label"> البريد الإلكتروني: </span>
                    <a href="mailto:info@example.com"> info@ghaith.org.sa</a>
                  </div>
                  <div className="ghaith--overlay-contact-item">
                    <span className="contact-label"> الهاتف: </span>
                    <a href="tel:+1234567890"> + (966) 500 500 845</a>
                  </div>
                  <div className="ghaith--overlay-contact-item">
                    <span className="contact-label"> العنوان: </span>
                    <a>
                      {" "}
                      المقر الرئيسي : المكتب الرئيسي - أبراج البيت ( برج الساعة
                      ) - مكة المكرمة الطبق الأرضي - خلف الصرافات الآلية جوار
                      سوبر ماركت بن داود{" "}
                    </a>
                  </div>
                  <div className="ghaith--overlay-contact-item">
                    <span className="contact-label">المقر الفرعي : </span>
                    <a> ٣٣٣٤ حي المرسلات، ٢٩٠٩٨ - مدركة - مكة المكرمة </a>
                  </div>
                </div>

                {/* Login/Profile Button */}
                <div className="ghaith--overlay-action ghaith--overlay-sidebar-btn">
                  <TransparentButton
                    style={{ direction: "ltr" }}
                    icon={<ArrowLeftOutlined />}
                    title={
                      isConnected ? (
                        <span className="ghaith--title">{userName}</span>
                      ) : (
                        t("text-btn")
                      )
                    }
                    onClick={handleLoginProfileClick}
                    className="ghaith--overlay-login-btn"
                  />
                </div>
              </>
            )}
            {/* Copyright - Only on big screens */}
            <div className="ghaith--overlay-copyright">
              <p>جميع الحقوق محفوظة - جمعية غيث - {currentYear}</p>
            </div>
          </div>

          {/* MAIN CONTENT AREA - 2/3 screen on big screens */}
          <div className="ghaith--overlay-main">
            {/* Navigation Links */}
            <nav className="ghaith--overlay-nav">
              <ul className="ghaith--overlay-nav-list">
                {/* Home Link */}
                <li className="ghaith--overlay-nav-item">
                  <a onClick={() => handleNavigation("/")}>
                    <span
                      className="nav-item-text"
                      style={{ marginLeft: "23px" }}
                    >
                      الرئيسية
                    </span>
                  </a>
                </li>

                {/* Dynamic Sections with Submenus */}
                {sections.map((section) => {
                  const filteredSubList = filterSubItems(section.subList);

                  return (
                    <li key={section.id} className="ghaith--overlay-nav-item">
                      <a
                        onClick={() =>
                          section.link
                            ? handleNavigation(section.link)
                            : toggleSection(section.id)
                        }
                        className={openSection === section.id ? "active" : ""}
                      >
                        <span className="nav-item-text">
                          {t(section.label)}
                        </span>
                        {filteredSubList.length > 0 && (
                          <span
                            className={`nav-toggle ${
                              openSection === section.id ? "open" : ""
                            }`}
                          >
                            +
                          </span>
                        )}
                      </a>

                      {/* Submenu - only show if there are filtered items */}
                      {filteredSubList.length > 0 && (
                        <ul
                          className={`ghaith--overlay-submenu ${
                            openSection === section.id ? "open" : ""
                          }`}
                        >
                          {filteredSubList.map((subItem, index) => (
                            <li
                              key={index}
                              className="ghaith--overlay-submenu-item"
                            >
                              <a onClick={() => handleSubItemClick(subItem)}>
                                {t(subItem.name)}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          {isMobile && (
            <div className="ghaith--overlay-action">
              <TransparentButton
                style={{ direction: "ltr" }}
                icon={<ArrowLeftOutlined />}
                title={
                  isConnected ? (
                    <span className="ghaith--title">{userName}</span>
                  ) : (
                    t("text-btn")
                  )
                }
                onClick={handleLoginProfileClick}
                className="ghaith--overlay-login-btn"
              />
            </div>
          )}
          {/* Social Links - Only visible on mobile */}
          <div className="ghaith--overlay-social">
            <ul className="ghaith--footer-social ghaith--overlay--social">
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  href="https://www.linkedin.com/company/ghaith-mkh/posts/?feedView=all"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="LinkedIn"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  href="https://www.tiktok.com/@ghaith_mkh"
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={tiktok}
                    alt="TikTok"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  href="https://www.youtube.com/@Ghaith_MKH"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <img
                    src={youtube}
                    alt="YouTube"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  aria-label="Snapchat"
                  href="https://snapchat.com/t/N7hxrbmK"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={snapchat}
                    alt="Snapchat"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  href="https://www.facebook.com/people/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%BA%D9%8A%D8%AB/100070596472782/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <img
                    src={facebook}
                    alt="Facebook"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  href="https://www.instagram.com/ghaith_mkh/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <img
                    src={instagram}
                    alt="Instagram"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.whatsapp.com/channel/0029VaTaGMR6GcGKf5OlFt1T"
                >
                  <img
                    src={whatsapp}
                    alt="WhatsApp"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
              <li>
                <a
                  className="ghaith--footer-social__icon overlay-icons"
                  href="https://x.com/ghaith_mkh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <img
                    src={twitter}
                    alt="Twitter"
                    className="ghaith--overlay-social-image"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayMenu;
