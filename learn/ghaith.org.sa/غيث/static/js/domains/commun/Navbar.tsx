import React, { useEffect, useState } from "react";
import NavigationMenu from "../../bibilio/Tabs/NavigationMenu";
import { Col, Divider, Dropdown, Row } from "antd";
import whiteLogo from "../../assets/logos/MainLogo.png";
import logo from "../../assets/logos/MainLogo.png";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import hamburgerIcon from "../../assets/icons/hamburger.svg";
//import searchIcon from "../../assets/icons/search-symbol.svg";
import TransparentButton from "../../bibilio/Buttons/TransparentButton";
import Login from "../pages/auth/Login";
import profileImg from "../../assets/images/profile/user-1.jpg";
import { LogoutOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import {
  getBeneficiaryDetails,
  getDonorDetails,
} from "../../apis/actions/profile.actions";
import OverlayMenu from "./OverLayMenu";
import ModalComponent from "../../bibilio/Modal/ModalComponent";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  variant: "projectDetails" | "homePage";
  type?: "profile" | any;
}

const NavBar = ({ type, variant, ...props }: NavbarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<
    "general" | "exterior_donor" | "exterior_beneficiary"
  >("general");
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenLoginFromNav = (
    type: "exterior_donor" | "exterior_beneficiary"
  ) => {
    setLoginType(type);
    setDisplayLogin(true);
  };

  const handleLogout = () => {
    removeCookie("apiKey", { path: "/" });
    removeCookie("role", { path: "/" });
    navigate("/");
  };

  const confirmLogout = () => {
    handleLogout();
    setIsModalVisible(false);
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOverlayOpen]);

  const [cookies, removeCookie] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;
  const role = cookies?.role;
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const dropdownItems = [
    {
      key: "1",
      label: (
        <div
          className="ghaith--dropdown-item"
          onClick={() => navigate("/profile")}
        >
          <HomeOutlined className="ghaith--dropdown-icon" />
          <span>صفحتي الرئيسية</span>
        </div>
      ),
    },
    {
      key: "divider",
      type: "divider" as const,
    },
    {
      key: "2",
      label: (
        <div
          className="ghaith--dropdown-item ghaith--dropdown-item-logout"
          onClick={() => setIsModalVisible(true)}
        >
          <LogoutOutlined className="ghaith--dropdown-icon" />
          <span>تسجيل الخروج</span>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (cookies.apiKey)
      role === "donor"
        ? dispatch(getDonorDetails())
        : dispatch(getBeneficiaryDetails());
  }, [dispatch, cookies.apiKey, role]);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const userName =
    role === "donor" ? donorDetails?.name : beneficiaryDetails?.name;

  return (
    <>
      <nav
        {...props}
        className={`ghaith--navigation-bar ${
          scrolled && variant === "homePage"
            ? "scrolled-navbar-bg-white"
            : scrolled && variant === "projectDetails"
            ? "scrolled-navbar-bg-blue"
            : type === "profile"
            ? "ghaith--fixed-image"
            : ""
        } ${props.className ?? ""}`}
      >
        <div className="ghaith--navbar-content">
          <div
            className={`ghaith--navbar-list ${
              variant === "homePage" ? "" : "text-color"
            }`}
          >
            {location.pathname === "/profiles" ? (
              <div />
            ) : (
              <div className="ghaith--navbar-profile-btn">
                {/* Burger Menu */}
                <img
                  src={hamburgerIcon}
                  alt="menu"
                  className="navbar-icon"
                  onClick={toggleOverlay}
                />
                {/* Language Selector
                <div className="ghaith--navbar-language-selector">
                  <span>En</span>
                  <img
                    src={downArrowIcon}
                    alt="language toggle"
                    className="navbar-icon ghaith--navbar-small-icon"
                  />
                </div>
                 */}
                {/* Search Icon 
                <img
                  src={searchIcon}
                  alt="search"
                  className="navbar-icon ghaith--navbar-search-icon"
                  onClick={() => console.log("Search clicked")}
                />
                */}
                {/* Profile Button with Dropdown when connected */}
                {isConnected ? (
                  <Dropdown
                    menu={{ items: dropdownItems }}
                    placement="bottomLeft"
                    overlayClassName="ghaith--profile-dropdown"
                    trigger={["click"]}
                  >
                    <div>
                      <TransparentButton
                        className="ghaith--navbar_login_button"
                        title={
                          <span
                            className={`ghaith--title ${
                              !isProfilePage ? "ghaith--title-animated" : ""
                            }`}
                          >
                            {userName}
                          </span>
                        }
                        icon={
                          <img
                            src={
                              role === "donor"
                                ? donorDetails?.image?.[0] || profileImg
                                : role === "beneficiary"
                                ? beneficiaryDetails?.image?.[0] || profileImg
                                : profileImg
                            }
                            alt="profile"
                            className="ghaith--top-navbar-profile-img"
                            width={22}
                            onError={(e) => {
                              e.currentTarget.src = profileImg;
                            }}
                          />
                        }
                    
                      />
                    </div>
                  </Dropdown>
                ) : (
                  <TransparentButton
                    className="ghaith--navbar_login_button"
                    title={t("text-btn")}
                    onClick={() => setDisplayLogin(true)}
                  />
                )}
              </div>
            )}
            <NavigationMenu
              variant={variant}
              onOpenLogin={handleOpenLoginFromNav}
            />
            <figure className="ghaith--navbar-logo">
              <img
                onClick={() => navigate("/")}
                src={variant === "homePage" ? logo : whiteLogo}
                alt="logo"
              />
            </figure>
          </div>
          {variant === "homePage" && (
            <Divider className="ghaith--navbar-divider" />
          )}
        </div>

        {/* Mobile Elements */}
        <div className="ghaith--navbar-mobile-controls">
          {/* Mobile Hamburger Menu */}
          <img
            src={hamburgerIcon}
            alt="menu"
            className="navbar-icon mobile-hamburger"
            onClick={toggleOverlay}
          />
        </div>

        <figure className="ghaith--navbar-logo mobile--logo">
          <img
            onClick={() => navigate("/")}
            src={variant === "homePage" ? logo : whiteLogo}
            alt="logo"
          />
        </figure>
      </nav>
      {/* Overlay Menu Component */}
      <OverlayMenu
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        isConnected={isConnected}
        role={role}
        userName={userName}
        onLoginClick={() => {
          setLoginType("general");
          setDisplayLogin(true);
        }}
        onSpecificLoginClick={handleOpenLoginFromNav}
      />

      <Login
        open={displayLogin}
        handleClose={() => {
          setDisplayLogin(false);
          setLoginType("general");
        }}
        login_type={loginType}
      />
      <ModalComponent
        title=""
        open={isModalVisible}
        onClose={cancelLogout}
        closeOnOutsideClick={true}
        modalStyle={{ top: 200 }}
      >
        <div className="ghaith--logout-modal-content">
          <div className="ghaith--logout-icon-wrapper">
            <LogoutOutlined className="ghaith--logout-modal-icon" />
          </div>
          <h3 className="ghaith--logout-modal-title">تسجيل الخروج</h3>
          <p className="ghaith--logout-modal-text">
            هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
          </p>
          <Row
            gutter={12}
            justify="center"
            className="ghaith--logout-modal-buttons"
          >
            <Col span={12}>
              <TransparentButton
                className="ghaith--cancel-btn-logout"
                title="إلغاء"
                onClick={cancelLogout}
              />
            </Col>
            <Col span={12}>
              <TransparentButton
                className="ghaith--confirm-btn-logout"
                title="تسجيل الخروج"
                onClick={confirmLogout}
              />
            </Col>
          </Row>
        </div>
      </ModalComponent>
    </>
  );
};

export default NavBar;