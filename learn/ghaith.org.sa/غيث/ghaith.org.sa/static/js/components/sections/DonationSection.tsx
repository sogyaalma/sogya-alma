import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import DonationCard from "../../bibilio/cards/DonationCard";
import validIcon from "../../assets/icons/valid.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { getPrograms, getAllKorba } from "../../apis/actions/program.actions";
import { useCookies } from "react-cookie";
import Login from "../../domains/pages/auth/Login";
import { scroll } from "../../apis/utils/utils";
import PaginationComponent from "../../bibilio/pagination/PaginationComponent";
import AddPartnershipButton from "../../bibilio/Buttons/addPartershipButton";

interface DonationSectionProps {
  type: "internal" | "homepage";
}

export default function DonationSection({ type }: DonationSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [cookies] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const currentRef = useRef<HTMLDivElement>(null);
  const itemPerPage = 6;
  const [activeTab, setActiveTab] = useState<"programs" | "cases">("programs");

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  const handleTabChange = (tab: "programs" | "cases") => {
    setActiveTab(tab);
    setShowFavoritesOnly(false);
    setShowCompletedOnly(false);
    setCurrentPage(1);
  };
  const programs = useSelector((state: RootState) => state?.program.programs);
  const korbas = useSelector((state: RootState) => state?.program.korbas);
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const partner_id = beneficiaryDetails?.id || donorDetails?.id;

    setIsLoading(true);

    if (activeTab === "programs") {
      dispatch(
        getPrograms({ tag: type === "internal" ? "all" : "homepage", ...(partner_id && { partner_id }) })
      ).finally(() => setIsLoading(false));
    } else {
      const tag = showCompletedOnly ? "completed" : "all";
      dispatch(getAllKorba({ tag })).finally(() => setIsLoading(false));
    }
  }, [
    dispatch,
    beneficiaryDetails?.id,
    donorDetails?.id,
    activeTab,
    showCompletedOnly,
  ]);

  const startIndex = (currentPage - 1) * itemPerPage;

  const filteredPrograms = showFavoritesOnly
    ? programs?.filter((item: any) => item?.favorite === true)
    : programs;

  const filteredData = activeTab === "programs" ? filteredPrograms : korbas;
  const allPrograms = filteredData?.slice(startIndex, startIndex + itemPerPage);

  const isShowingCompletedCases =
    activeTab === "cases" &&
    !isLoading &&
    korbas &&
    korbas.length > 0 &&
    showCompletedOnly;

  const isFilterActive =
    activeTab === "programs" ? showFavoritesOnly : showCompletedOnly;
  const filterIcon =
    activeTab === "programs" ? (
      showFavoritesOnly ? (
        <StarFilled />
      ) : (
        <StarOutlined />
      )
    ) : null;
  const filterLabel =
    activeTab === "programs"
      ? "المفضلة"
      : showCompletedOnly
      ? "كرب تنتظر دعمكم"
      : "المكتملة";

  const handleFilterClick = () => {
    if (activeTab === "programs") {
      if (isConnected) {
        setShowFavoritesOnly(!showFavoritesOnly);
      } else {
        setShowLogin(true);
      }
    } else {
      setShowCompletedOnly(!showCompletedOnly);
    }
  };

  return (
    <div className="ghaith--donation-section" style={{ marginTop: "6rem" }}>
      {/* Title */}
      {type === "homepage" && (
        <>
          <div className="ghaith--donationSection-title ghaith--donations-title">
            <img
              alt=""
              src={validIcon}
              className="ghaith--donationSection-title-icon"
            />
            <h1>
              <span className="ghaith--donation-highlight ">كن غيثًا </span>
              <span className="ghaith--donation-primary"> في غيث </span>
            </h1>
          </div>
          {/* Filter Buttons Row */}
          <div className="ghaith--donations-row ghaith--donation-header-buttons ">
            {/* Tab Buttons - Flex Start */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <AddPartnershipButton
                className={
                  activeTab === "programs"
                    ? "ghaith--add-partnership-active-button"
                    : ""
                }
                onClick={() => handleTabChange("programs")}
                title="برامج الجمعية"
              />{" "}
              <AddPartnershipButton
                className={
                  activeTab === "cases"
                    ? "ghaith--add-partnership-active-button"
                    : ""
                }
                onClick={() => handleTabChange("cases")}
                title="حالات تفريج كربة"
              />{" "}
            </div>

            {/* Filter Button - Flex End */}
            <Button
              className="ghaith--communs-add-partnership-button ghaith--favorite-button"
              type={isFilterActive ? "primary" : "default"}
              icon={filterIcon}
              onClick={handleFilterClick}
              style={{
                width: "200px",
                backgroundColor: "#deefed",
                ...(isFilterActive && {
                  backgroundColor:
                    activeTab === "programs" ? "#ff9800" : "#dff3f1",
                  borderColor: activeTab === "programs" ? "#ff9800" : "#dff3f1",
                }),
              }}
            >
              {filterLabel}
            </Button>
          </div>
        </>
      )}
      <Row
        gutter={[32, 32]}
        className="ghaith--donations-row"
        ref={currentRef}
        style={{
          display: "flex",
          justifyItems: "center",
        }}
      >
        {isLoading ? (
          <div
            className="gh--font-light"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              fontSize: "18px",
              color: "#666",
              width: "100%",
            }}
          >
            جاري التحميل...
          </div>
        ) : allPrograms && allPrograms.length > 0 ? (
          allPrograms.map((item: any) => (
            <Col
              key={item.id}
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={8}
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <DonationCard
                type={activeTab}
                title={
                  activeTab === "programs" ? item?.program_name : item?.name
                }
                imageUrl={item?.title_image_ids[0]}
                qrUrl={item?.qr_code_ids[0]}
                tags={item?.share_ids}
                access_token={item?.id}
                category_id={
                  activeTab === "programs" ? item?.category_id[0] : null
                }
                favorite={item?.favorite}
                isCompleted={isShowingCompletedCases}
              />
            </Col>
          ))
        ) : (
          <div
            className="gh--font-light"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              fontSize: "18px",
              color: "#666",
              width: "100%",
            }}
          >
            {activeTab === "programs" ? "لا توجد برامج" : "لا توجد حالات"}
          </div>
        )}
      </Row>
      <div className="ghaith--pagination-container">
        {filteredData && filteredData.length > itemPerPage && (
          <PaginationComponent
            active={currentPage}
            total={filteredData.length}
            itemPerPage={itemPerPage}
            scroll={() => scroll(currentRef)}
            setActive={(nb) => updateActive(nb)}
          />
        )}
      </div>
      <Login
        open={showLogin}
        handleClose={() => setShowLogin(false)}
        login_type="general"
      />
    </div>
  );
}
