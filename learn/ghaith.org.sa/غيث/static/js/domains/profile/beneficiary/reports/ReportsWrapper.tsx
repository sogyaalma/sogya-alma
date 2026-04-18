// @ts-ignore
import React from "react";
import Breadcrumb from "../../Breadcrumbs";
import ListIcon from "../../../../assets/images/profile/list.png";
import ReportsComponent from "./ReportsPage";

interface Props {
  onNavigateToMain?: () => void;
}

const ReportPageWrapper: React.FC<Props> = ({ onNavigateToMain }) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "التقارير",
    },
  ];

  return (
    <>
      <Breadcrumb
        title="التقارير"
        items={BCrumb}
        bgColor="#e7f5f1"
        img={ListIcon}
      />
      <ReportsComponent />
    </>
  );
};

export default ReportPageWrapper;
