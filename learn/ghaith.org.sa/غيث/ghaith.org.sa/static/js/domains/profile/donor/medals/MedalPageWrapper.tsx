// @ts-ignore
import React from "react";
import Breadcrumb from "../../Breadcrumbs";
import MedalIcon from "../../../../assets/images/profile/medal.png";
import MedalComponent from "./MedalComponent";

interface Props {
  onNavigateToMain?: () => void;
}

const MedalPageWrapper: React.FC<Props> = ({ onNavigateToMain }) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "الأوسمة",
    },
  ];

  return (
    <>
      <Breadcrumb title="الأوسمة" items={BCrumb} bgColor="#e7f5f1" img={MedalIcon} />
      <MedalComponent/>
    </>
  );
};

export default MedalPageWrapper;
