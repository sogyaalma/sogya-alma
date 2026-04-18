// @ts-ignore
import React from "react";
import ExchangeList from "./ExchangeList";
import Breadcrumb from "../../Breadcrumbs";

interface ExchangeListWrapperProps {
  filterType?: string | null;
  onNavigateToMain?: () => void;
}

const ExchangeListWrapper: React.FC<ExchangeListWrapperProps> = ({
  filterType,
  onNavigateToMain,
}) => {

  const BCrumb = [
    {
      to: "/beneficiary_profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "قائمة الصرف",
    },
  ];
  return (
    <>
      <Breadcrumb title="أوامر الصرف" items={BCrumb} bgColor="#e7f5f1" />
      {/* 👇 Pass filterType down to ExchangeList */}
      <ExchangeList filterType={filterType} />
    </>
  );
};

export default ExchangeListWrapper;
