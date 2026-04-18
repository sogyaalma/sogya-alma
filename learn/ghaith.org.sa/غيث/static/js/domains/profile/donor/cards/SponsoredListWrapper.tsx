// @ts-ignore
import React from "react";
import Breadcrumb from "../../Breadcrumbs";
import SponsoredList from "./SponsoredList";

interface Props {
  onNavigateToMain?: () => void;
}

const SponsoredListWrapper: React.FC<Props> = ({ onNavigateToMain }) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "قائمة كفالاتي",
    },
  ];

  return (
    <>
      <Breadcrumb title="كفالاتي" items={BCrumb} bgColor="#e7f5f1" />
      <SponsoredList limit={6} />
    </>
  );
};

export default SponsoredListWrapper;
