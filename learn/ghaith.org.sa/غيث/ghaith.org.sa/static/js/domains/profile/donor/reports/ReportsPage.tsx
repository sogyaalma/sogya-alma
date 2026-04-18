import React, { useEffect, useRef, useState } from "react";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { scroll } from "../../../../apis/utils/utils";
import { getDonorReports } from "../../../../apis/actions/donor.actions";
import { Col, Row } from "antd";
import PaginationComponent from "../../../../bibilio/pagination/PaginationComponent";
import { Spin } from "antd";
import ReportCard from "./ReportsAttachment";
import AddPartnershipButton from "../../../../bibilio/Buttons/addPartershipButton";
import { LoadingOutlined } from "@ant-design/icons";

interface ReportsProps {
  limit?: number;
}

const ReportsComponent: React.FC<ReportsProps> = ({ limit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<"public" | "private">(
    "public"
  );
  const currentRef = useRef<HTMLDivElement>(null);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#1c4446" }} spin />
  );

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  const { data: reports, loading } = useSelector(
    (state: RootState) => state?.donor.donorReports
  );
  const { TotaldonorReports } = useSelector((state: RootState) => state?.donor);

  useEffect(() => {
    dispatch(
      getDonorReports({
        limit: itemPerPage,
        page: currentPage,
        category: activeCategory,
      })
    );
  }, [dispatch, currentPage, activeCategory]);

  const itemPerPage = 8;

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: "public" | "private") => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <Card
        dir="rtl"
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #eef1ee",
          boxShadow: "0px 6px 16px rgba(0,0,0,0.08)",
          bgcolor: "#f3f9f9",
          height: "100%",
        }}
      >
        {" "}
        <Row
          gutter={[16, 16]}
          justify={"start"}
          dir={"rtl"}
          style={{ margin: "1.5rem", minHeight: "5rem" }}
        >
          <Col
            style={{ display: "flex" }}
            xxl={14}
            xl={14}
            lg={16}
            md={16}
            sm={24}
            xs={24}
          >
            <Col
              xxl={6}
              xl={6}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="ghaith--add-partnership-col"
            >
              <AddPartnershipButton
                title={"عام"}
                onClick={() => handleCategoryChange("public")}
                className={
                  activeCategory === "public"
                    ? "ghaith--add-partnership-active-button"
                    : ""
                }
              />
            </Col>{" "}
            <Col
              xxl={6}
              xl={6}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="ghaith--add-partnership-col"
            >
              <AddPartnershipButton
                title={"خاص"}
                onClick={() => handleCategoryChange("private")}
                className={
                  activeCategory === "private"
                    ? "ghaith--add-partnership-active-button"
                    : ""
                }
              />
            </Col>
          </Col>
        </Row>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "120px",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        ) : reports?.length === 0 ? (
          <div
            className="gh--font-light"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              fontSize: "18px",
              color: "#666",
            }}
          >
            لا توجد تقارير متوفرة
          </div>
        ) : (
          <>
            <Row dir="rtl" gutter={[16, 16]} ref={currentRef}>
              {reports?.map((report: any, index: number) => (
                <Col
                  key={report.id || index}
                  xxl={6}
                  xl={8}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                >
                  <ReportCard
                    attachments={[{ ...report, displayIndex: index }]}
                  />
                </Col>
              ))}
            </Row>
            <div className="ghaith--pagination-container">
              {reports &&
                Math.ceil(TotaldonorReports) * itemPerPage > itemPerPage && (
                  <PaginationComponent
                    active={currentPage}
                    total={Math.ceil(TotaldonorReports) * itemPerPage}
                    itemPerPage={itemPerPage}
                    scroll={() => scroll(currentRef)}
                    setActive={(nb) => updateActive(nb)}
                  />
                )}
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default ReportsComponent;
