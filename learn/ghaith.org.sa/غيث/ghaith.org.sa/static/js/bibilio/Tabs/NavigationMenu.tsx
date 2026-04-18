import React, { useEffect, useRef, useState } from "react";
import { sections } from "../../data/data";
import SubMenu from "./SubMenu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CheckAvailableServices } from "../../apis/actions/beneficiary.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";

interface NavigationTabsProps extends React.HTMLAttributes<HTMLUListElement> {
  id?: string;
  variant?: string;
  onOpenLogin?: (type: "exterior_donor" | "exterior_beneficiary") => void;
}

const NavigationMenu = ({
  variant,
  onOpenLogin,
  ...props
}: NavigationTabsProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>("1");
  const { t } = useTranslation();
  const menuRef = useRef<HTMLUListElement>(null);
  const [isExpanded, setIsExpanded] = useState<string | null>("1");
  const dispatch = useDispatch<AppDispatch>();

  const { availableServices } = useSelector(
    (state: RootState) => state?.beneficiary,
  );
  
  const handleItemClick = (id: string) => {
    if (selectedItemId === id) {
      setIsExpanded((prev) => (prev === id ? null : id));
      setTimeout(() => {
        setSelectedItemId(null);
      }, 100);
    } else {
      setSelectedItemId(id);
      setIsExpanded(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedItemId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseHover = (id: string) => {
    setSelectedItemId(id);
    setIsExpanded(id);
  };
  
  const handleMouseleave = () => {
    setSelectedItemId(null);
    setIsExpanded(null);
  };
  
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(CheckAvailableServices());
  }, [dispatch]);

  // Filter subitems based on conditions
  const filterSubItems = (subList: any[] = []) => {
    return subList.filter(item => {
      if (item.showCondition) {
        return availableServices && availableServices.includes("beneficiary_request_active")
      }
      return true;
    });
  };

  return (
    <ul
      ref={menuRef}
      {...props}
      className={`ghaith--navigation-menu-list ${props.className ?? ""}`}
    >
      {sections.map((section) => {
        // Filter the sublist for this section
        const filteredSubList = filterSubItems(section.subList);
        
        return (
          <div
            key={section.id}
            className={`ghaith--list-item ${
              variant === "homePage" ? "text-color" : "text-color-white"
            } ${section.id === selectedItemId ? "selected-item " : ""}`}
            onClick={() => handleItemClick(section.id)}
            onMouseEnter={() => handleMouseHover(section.id)}
          >
            {section.link && !filteredSubList?.length ? (
              <span onClick={() => navigate(section.link)}>
                {t(section.label)}
              </span>
            ) : (
              t(section.label)
            )}
            {filteredSubList && 
              filteredSubList.length > 0 && 
              section.id === selectedItemId && (
                <SubMenu
                  items={filteredSubList}
                  handleMouseHover={() => handleMouseHover(section.id)}
                  handleMouseleave={handleMouseleave}
                  className={isExpanded === section.id ? "expanded" : "collapsed"}
                  onOpenLogin={onOpenLogin}
                />
              )}
          </div>
        );
      })}
    </ul>
  );
};

export default NavigationMenu;