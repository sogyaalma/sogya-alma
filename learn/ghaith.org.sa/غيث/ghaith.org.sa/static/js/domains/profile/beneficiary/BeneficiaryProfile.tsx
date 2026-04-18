import React, { useEffect, useState } from "react";
import NavBar from "../../commun/Navbar";
import BeneficiarySubNavbar from "./BeneficiaryProfileHeader";
import MainBeneficiaryProfile from "./MainBeneficiaryProfilePage";
import ExchangeListWrapper from "./cards/ExchangeListWrapper";
import ProfileInfomtions from "./ProfileInformations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { getBeneficiaryDetails } from "../../../apis/actions/profile.actions";
import {
  getPaymentStatistics,
  getProductStatistics,
} from "../../../apis/actions/beneficiary.actions";
import Loader from "../../../bibilio/loader/Loader";
import BeneficiaryStatements from "./family_statement/FamilyStatementWrapper";
import ReportPageWrapper from "./reports/ReportsWrapper";
import { useLocation } from "react-router-dom";
import { setEditMode } from "../../../apis/slices/beneficiarySlices";
import RequestsListWrapper from "./cards/RequestsListWrapper";
import PageContainer from "../../../components/container/PageContainer";

const BeneficiaryProfile: React.FC = () => {
  const location = useLocation();
  const navigationItem = location.state?.navigationItem;
  const [activeItem, setActiveItem] = useState("الرئيسية");
  const [exchangeFilter, setExchangeFilter] = useState<string | null>(null);

  const handleCardClick = (filterType?: string) => {
    if (filterType === "product" || filterType === "payment") {
      setExchangeFilter(filterType ?? null);
      setActiveItem("أوامر الصرف");
    } else if (filterType) {
      setExchangeFilter(filterType ?? null);
      setActiveItem("الطلبات");
    }
    if (filterType === "reports") {
      setActiveItem("التقارير");
    }
  };

  const handleNavigateToMain = () => {
    setActiveItem("الرئيسية");
    setExchangeFilter("general");
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBeneficiaryDetails());
    dispatch(getPaymentStatistics());
    dispatch(getProductStatistics());
  }, [dispatch]);

  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails,
  );
  const payments = useSelector(
    (state: RootState) => state?.beneficiary?.payments,
  );
  const products = useSelector(
    (state: RootState) => state?.beneficiary?.products,
  );
  const loading = useSelector((state: RootState) => state?.beneficiary.loading);
  useEffect(() => {
    if (navigationItem > 1) {
      setActiveItem("البيانات");
      dispatch(setEditMode(true));
    }
  }, [navigationItem, dispatch]);
  const renderContent = () => {
    switch (activeItem) {
      case "الرئيسية":
        return (
          <MainBeneficiaryProfile
            onCardClick={handleCardClick}
            ExchangeFilterType={exchangeFilter}
            beneficiaryProfileDetails={beneficiaryDetails}
            payments={payments}
            products={products}
          />
        );
      case "أوامر الصرف":
        return (
          <ExchangeListWrapper
            filterType={exchangeFilter}
            onNavigateToMain={handleNavigateToMain}
          />
        );
      case "الطلبات":
        return (
          <RequestsListWrapper
            filterType={exchangeFilter}
            onNavigateToMain={handleNavigateToMain}
          />
        );
      case "البيانات":
        return <ProfileInfomtions onNavigateToMain={handleNavigateToMain} />;
      case "المشاهد":
        return (
          <BeneficiaryStatements onNavigateToMain={handleNavigateToMain} />
        );
      case "التقارير":
        return <ReportPageWrapper onNavigateToMain={handleNavigateToMain} />;
      default:
        return null;
    }
  };
  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - حسابي الشخصي"
        description="حسابي الشخصي"
      >
        <NavBar variant="homePage" />
        <BeneficiarySubNavbar
          activeItem={activeItem}
          setActiveItem={(item) => {
            setActiveItem(item);
            if (item === "أوامر الصرف") setExchangeFilter("general");
          }}
        />
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

export default BeneficiaryProfile;
