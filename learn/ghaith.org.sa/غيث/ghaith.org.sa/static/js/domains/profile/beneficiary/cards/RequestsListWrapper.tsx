// @ts-ignore
import React from "react";
import ExchangeList from "./ExchangeList";
import Breadcrumb from "../../Breadcrumbs";

interface RequestsListWrapperProps {
  filterType?: string | null;
  onNavigateToMain?: () => void;
}

const RequestsListWrapper: React.FC<RequestsListWrapperProps> = ({
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
      title: "قائمة الطلبات",
    },
  ];
  return (
    <>
      <Breadcrumb title=" الطلبات" items={BCrumb} bgColor="#e7f5f1" />
      <ExchangeList filterType={filterType} />
    </>
  );
};

export default RequestsListWrapper;
