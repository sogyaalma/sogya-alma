import React, { useEffect, useState } from "react";
import NavBar from "../../commun/Navbar";
import DonnorHeader from "./DonorProfileHeader";
import MainDonorProfile from "./MainDonorProfile";
import DonationListWrapper from "./cards/DonationListWrapper";
import SponsoredListWrapper from "./cards/SponsoredListWrapper";
import DonorInformations from "./DonorInformations";
import DeductionListWrapper from "./cards/DeductionListWrapper";
import MedalPageWrapper from "./medals/MedalPageWrapper";
import ReportPageWrapper from "./reports/ReportsWrapper";
import { useLocation } from "react-router-dom";
import PageContainer from "../../../components/container/PageContainer";

const DonorProfile: React.FC = () => {
  const [activeItem, setActiveItem] = useState("الرئيسية");
  const location = useLocation();
  const navigationItem = location.state?.navigationItem;
  const handleNavigateToMain = () => {
    setActiveItem("الرئيسية");
  };
  const handleCardClick = (activeItem?: string) => {
    if (activeItem === "donation") {
      setActiveItem("التبرعات");
    }
    if (activeItem === "sponsored") {
      setActiveItem("sponsored");
    }
    if (activeItem === "deduction") {
      setActiveItem("deduction");
    }
    if (activeItem === "reports") {
      setActiveItem("التقارير");
    }
  };
  useEffect(() => {
    if (navigationItem > 1) {
      setActiveItem("البيانات");
    }
  }, [navigationItem]);
  const renderContent = () => {
    switch (activeItem) {
      case "الرئيسية":
        return <MainDonorProfile onCardClick={handleCardClick} />;
      case "التبرعات":
        return <DonationListWrapper onNavigateToMain={handleNavigateToMain} />;
      case "البيانات":
        return <DonorInformations onNavigateToMain={handleNavigateToMain} />;
      case "sponsored":
        return <SponsoredListWrapper onNavigateToMain={handleNavigateToMain} />;
      case "deduction":
        return <DeductionListWrapper onNavigateToMain={handleNavigateToMain} />;
      case "الأوسمة":
        return <MedalPageWrapper onNavigateToMain={handleNavigateToMain} />;
      case "التقارير":
        return <ReportPageWrapper onNavigateToMain={handleNavigateToMain} />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageContainer
        title="جمعية غيث - حسابي الشخصي"
        description="حسابي الشخصي"
      >
        <NavBar variant="homePage" />
        <DonnorHeader activeItem={activeItem} setActiveItem={setActiveItem} />
        <div style={{ minHeight: "22vh" }}></div>
        <div
          style={{ marginTop: "10px", marginBottom: "8rem" }}
          className="ghaith--profile__main-container"
          dir="rtl"
        >
          {renderContent()}
        </div>
      </PageContainer>
    </>
  );
};

export default DonorProfile;
