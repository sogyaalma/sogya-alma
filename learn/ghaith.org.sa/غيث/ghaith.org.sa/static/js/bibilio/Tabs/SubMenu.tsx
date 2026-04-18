import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SubItem } from "../../data/data";
import { RightOutlined } from "@ant-design/icons";
import useIsMobile from "../mobileVersion/useIsMobile";
import { useCookies } from "react-cookie";
interface SubMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  id?: string;
  items: any;
  handleMouseHover?: () => void;
  handleMouseleave?: () => void;
  onOpenLogin?: (type: "exterior_donor" | "exterior_beneficiary") => void; 
}

const SubMenu = ({
  items,
  handleMouseleave,
  handleMouseHover,
  onOpenLogin,
  ...props
}: SubMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [cookies] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;

  const handleItemClick = (item: SubItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item?.link.includes("http")) {
      window.open(item?.link, "_blank");
    } else if (item?.openLogin) {
      if (isConnected) {
        navigate("/profile");
        return;
      }

      if (onOpenLogin) {
        onOpenLogin(
          item.openLogin as "exterior_donor" | "exterior_beneficiary"
        );
      }
      return;
    } else {
      navigate(item?.link);
    }
  };
  return (
    <ul {...props} className={`ghaith--sub-menu ${props.className ?? ""}`}>
      {items.length > 0 &&
        items.map((item: SubItem, index: number) => (
          <div
            key={index}
            style={{ display: "flex", gap: "0.5rem" }}
            onMouseEnter={handleMouseHover}
            onMouseOut={handleMouseleave}
          >
            {isMobile && <RightOutlined className="ghaith--sub-menu-arrow" />}
            <li
              onMouseEnter={handleMouseHover}
              onClick={(e) => handleItemClick(item, e)}
              className="ghaith--sub-menu-item"
              style={{ width: "100%", cursor: "pointer" }}
            >
              {t(item?.name)}
            </li>
          </div>
        ))}
    </ul>
  );
};

export default SubMenu;
