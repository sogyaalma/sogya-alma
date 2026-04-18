// @ts-ignore
import React from "react";

import DonationList from "./DonationList";
import Breadcrumb from "../../Breadcrumbs";
import MoneyIcon from "../../../../assets/images/profile/money.png";

interface Props {
  onNavigateToMain?: () => void;
}

const DonationListWrapper: React.FC<Props> = ({ onNavigateToMain }) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: "قائمة التبرعات",
    },
  ];

  return (
    <>
      <Breadcrumb title="التبرعات" items={BCrumb} bgColor="#e7f5f1" img={MoneyIcon}/>
      <DonationList limit={6} />
    </>
  );
};

export default DonationListWrapper;
