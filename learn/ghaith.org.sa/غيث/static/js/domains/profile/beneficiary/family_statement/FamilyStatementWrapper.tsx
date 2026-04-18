// @ts-ignore
import React from "react";

import Breadcrumb from "../../Breadcrumbs";
import StatementsPage from "./FamilyStatementList";

interface Props {
  onNavigateToMain?: () => void;
}

const BeneficiaryStatements: React.FC<Props> = ({ onNavigateToMain }) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "قائمة طلبات المشاهد",
    },
  ];

  return (
    <>
      <Breadcrumb title="المشاهد" items={BCrumb} bgColor="#e7f5f1" />
      <StatementsPage limit={6} />
    </>
  );
};

export default BeneficiaryStatements;
