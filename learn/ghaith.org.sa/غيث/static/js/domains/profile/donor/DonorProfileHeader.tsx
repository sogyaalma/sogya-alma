import React, { useState } from "react";
import { Col, Dropdown, Row } from "antd";
import {
  HomeOutlined,
  FolderOutlined,
  FileTextOutlined,
  StarOutlined,
  SettingOutlined,
  MoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
//import notificationIcon from "../../../assets/icons/notification.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import TransparentButton from "../../../bibilio/Buttons/TransparentButton";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import useIsBigMobile from "../../../bibilio/mobileVersion/useIsBigMobile";

interface SubNavbarProps {
  activeItem: string;
  setActiveItem: (key: string) => void;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(["apiKey", "role"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isMobile = useIsBigMobile();
  const [nav, setNav] = useState(1);

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
      key: "التقارير",
      label: "التقارير",
      icon: <FileTextOutlined className="menu-icon" />,
    },
    {
      key: "التبرعات",
      label: "التبرعات",
      icon: <FileTextOutlined className="menu-icon" />,
    },
    {
      key: "الأوسمة",
      label: "الأوسمة",
      icon: <StarOutlined className="menu-icon" />,
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
  const mobileMenuItems = menuItems.map((item) => ({
    key: item.key,
    label: (
      <div
        className={`ghaith--mobile-menu-item ${
          activeItem === item.key ? "active" : ""
        }`}
        onClick={() => setActiveItem(item.key)}
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
          {/* Centered Menu */}{" "}
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
          <ul className="ghaith--sub-profile-navbar-menu">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`ghaith--sub-profile-navbar-item ${
                  activeItem === item.key ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          {/* Left Icons + Profile */}
          <div className="ghaith--sub-profile-navbar-left">
            {isMobile && (
              <LogoutOutlined
                className="ghaith--sub-profile-navbar-icon"
                onClick={() => setIsModalVisible(true)}
              />
            )}
            {/*
            <MoonOutlined className="ghaith--sub-profile-navbar-icon" />
            <img
              src={notificationIcon}
              alt="notification"
              className="ghaith--sub-navbar-notification-icon"
            />{" "}*/}
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
            />{" "}
          </div>
        </div>
        <div className="ghaith--navbar-divider" />
      </nav>
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

export default SubNavbar;
