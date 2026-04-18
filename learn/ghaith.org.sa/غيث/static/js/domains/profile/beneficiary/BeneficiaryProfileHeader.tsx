import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Col, Dropdown, Row, Badge } from "antd";
import {
  HomeOutlined,
  FolderOutlined,
  FileTextOutlined,
  StarOutlined,
  LogoutOutlined,
  MoreOutlined,
  SettingOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import notificationIcon from "../../../assets/icons/message_2.svg";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import TransparentButton from "../../../bibilio/Buttons/TransparentButton";
import useIsBigMobile from "../../../bibilio/mobileVersion/useIsBigMobile";
import { useSelector } from "react-redux";
import { RootState } from "../../../apis/store";
import ChatMessagesApp from "../../../components/Chat/chat";

interface BeneficiarySubNavbarProps {
  activeItem: string;
  setActiveItem: (key: string) => void;
}

const BeneficiarySubNavbar: React.FC<BeneficiarySubNavbarProps> = ({
  activeItem,
  setActiveItem,
}) => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(["apiKey", "role"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [nav, setNav] = useState(1);
  const isMobile = useIsBigMobile();
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );
  const menuItems = [
    {
      key: "الرئيسية",
      label: "الرئيسية",
      icon: <HomeOutlined className="menu-icon" />,
    },
    {
      key: "البيانات",
      label: "البيانات",
      icon: <FolderOutlined className="menu-icon" />,
    },
    {
      key: "أوامر الصرف",
      label: "أوامر الصرف",
      icon: <FileTextOutlined className="menu-icon" />,
    },

    {
      key: "التقارير",
      label: "التقارير",
      icon: <StarOutlined className="menu-icon" />,
    },
    {
      key: "المشاهد",
      label: "المشاهد",
      icon: <FileImageOutlined className="menu-icon" />,
    },
  ];
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

  const handleNotificationClick = () => {
    setIsMessageModalVisible(true);
  };

  const handleMenuItemClick = (key: string) => {
    setActiveItem(key);
    setNav((prevNav) => prevNav + 1);
  };

  const handleMobileMenuItemClick = (key: string) => {
    setActiveItem(key);
    setNav((prevNav) => prevNav + 1);
  };

  const mobileMenuItems = menuItems.map((item) => ({
    key: item.key,
    label: (
      <div
        className={`ghaith--mobile-menu-item ${
          activeItem === item.key ? "active" : ""
        }`}
        onClick={() => handleMobileMenuItemClick(item.key)}
      >
        {item.icon}
        <span>{item.label}</span>
      </div>
    ),
  }));

  return (
    <>
      <nav className="ghaith--sub-profile-navbar" dir="rtl">
        <div className="ghaith--sub-profile-navbar-content">
          {/* Mobile Menu Icon (three dots) - Right side */}
          <div className="ghaith--mobile-menu-wrapper">
            <Dropdown
              menu={{ items: mobileMenuItems }}
              placement="bottomRight"
              overlayClassName="ghaith--mobile-menu-dropdown"
              trigger={["click"]}
            >
              <MoreOutlined className="ghaith--mobile-menu-icon" />
            </Dropdown>
          </div>

          {/* Centered Menu (Desktop) */}
          <ul className="ghaith--sub-profile-navbar-menu">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`ghaith--sub-profile-navbar-item ${
                  activeItem === item.key ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Left Icons + Profile */}
          <div className="ghaith--sub-profile-navbar-left">
            {" "}
            {isMobile && (
              <LogoutOutlined
                className="ghaith--sub-profile-navbar-icon"
                onClick={() => setIsModalVisible(true)}
              />
            )}
            {/*
            <MoonOutlined className="ghaith--sub-profile-navbar-icon" />*/}{" "}
            <Badge
              count={
                beneficiaryDetails?.total_unread_messages > 0
                  ? beneficiaryDetails.total_unread_messages
                  : 0
              }
              offset={[-2, 3]}
              style={{ cursor: "pointer" }}
              onClick={handleNotificationClick}
            >
              <img
                src={notificationIcon}
                alt="notification"
                className="ghaith--sub-navbar-notification-icon"
                onClick={handleNotificationClick}
                style={{ cursor: "pointer" }}
              />
            </Badge>
            <SettingOutlined
              className="ghaith--sub-profile-navbar-icon"
              onClick={() => {
                setNav((prevNav) => prevNav + 1);
                navigate(`/profile`, {
                  state: {
                    navigationItem: nav + 1,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="ghaith--navbar-divider" />
      </nav>
      {/* Logout Confirmation Modal */}
      <ModalComponent
        title=""
        open={isModalVisible}
        onClose={cancelLogout}
        closeOnOutsideClick={true}
        centered={true}
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
      </ModalComponent>{" "}
      <ChatMessagesApp
        isModalVisible={isMessageModalVisible}
        handleCloseModal={() => {
          setIsMessageModalVisible(false);
        }}
      />
    </>
  );
};

export default BeneficiarySubNavbar;
