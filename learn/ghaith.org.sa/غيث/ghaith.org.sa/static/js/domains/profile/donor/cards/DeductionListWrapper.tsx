// @ts-ignore
import React from "react";
import Breadcrumb from "../../Breadcrumbs";
import DeductionList from "./DeductionList.tsx";

interface Props {
  onNavigateToMain?: () => void;
}

const DeductionListWrapper: React.FC<Props> = ({ onNavigateToMain }) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "قائمة الإستقطاعات",
    },
  ];

  return (
    <>
      <Breadcrumb title="الإستقطاعات" items={BCrumb} bgColor="#e7f5f1" />
      <DeductionList limit={6} />
    </>
  );
};

export default DeductionListWrapper;
