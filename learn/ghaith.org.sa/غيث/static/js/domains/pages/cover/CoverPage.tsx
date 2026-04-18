import { Col, Collapse, Row, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import PrimarButton from "../../../bibilio/Buttons/PrimaryButton";
import { scroll } from "../../../apis/utils/utils";
import useIsMobile from "../../../bibilio/mobileVersion/useIsMobile";
import HTMLFlipBook from "react-pageflip";

interface CoverPageProps {
  cover: any[];
}

const CoverCollapse = ({ cover }: CoverPageProps) => {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedMagazine, setSelectedMagazine] = useState<any>(null);
  const flipBookRef = useRef<any>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    scroll(currentRef);
  }, []);

  const handleDetailsClick = (e: React.MouseEvent, magazine: any) => {
    e.stopPropagation();
    setSelectedMagazine(magazine);
    setIsFlipbookOpen(true);
    const lastIndex = (magazine?.image_ids || []).length - 1;
    setCurrentPage(lastIndex >= 0 ? lastIndex : 0);
  };

  const handleModalClose = () => {
    setIsFlipbookOpen(false);
    setCurrentPage(0);
    setSelectedMagazine(null);
  };

  const goToPrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const images = selectedMagazine?.image_ids || [];
  const lastPageIndex = images.length - 1;

  return (
    <>
      <div className="ghaith--collapse-profile-container">
        <Collapse
          className={`ghaith--collapse-beneficiary-services ghaith--collapse-profile ghaith--survey-collapse `}
          ref={currentRef}
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key as any)}
          accordion
        >
          {[...cover]
            .sort((a, b) => a.sequence - b.sequence)
            .map((magazine, index) => (
              <Collapse.Panel
                key={index}
                showArrow={false}
                collapsible="icon"
                className="ghaith--header-jobs-panel ghaith--jobs-opportunities"
                header={
                  <div className="ghaith--header-profile-container">
                    <Row
                      justify={"center"}
                      style={{ marginBottom: "0" }}
                      align={"stretch"}
                    >
                      <Col xxl={6} xl={7} lg={5} md={5} sm={12} xs={24}>
                        {magazine.image_ids &&
                          magazine.image_ids?.length > 0 && (
                            <img
                              width={"100%"}
                              height={200}
                              style={{
                                objectFit: "cover",
                                borderRadius: "15px",
                              }}
                              src={
                                magazine.image_ids[
                                  magazine.image_ids.length - 1
                                ]
                              }
                              alt=""
                            />
                          )}
                      </Col>
                      <Col xxl={18} xl={17} lg={19} md={19} sm={12} xs={24}>
                        <Row
                          justify={"center"}
                          style={{ marginBottom: "0" }}
                          align={"stretch"}
                        >
                          <Col
                            xxl={15}
                            xl={14}
                            lg={12}
                            md={12}
                            sm={24}
                            xs={24}
                            className="ghaith--job-title-container"
                          >
                            <div className="ghaith--job-title-collapse">
                              <span>{magazine.title}</span>
                            </div>
                            <div className="ghaith--jobs-subtitle">
                              <FileTextOutlined
                                style={{ fontSize: "25px", color: "#d9d9d9" }}
                              />
                              <span>{magazine.description}</span>
                            </div>
                            {magazine?.date && (
                              <div className="ghaith--jobs-subtitle">
                                <CalendarOutlined
                                  style={{ fontSize: "25px", color: "#d9d9d9" }}
                                />
                                <span>
                                  {magazine?.date
                                    ? dayjs(
                                        magazine?.date,
                                        "YYYY-MM-DD",
                                      ).format("YYYY/MM/DD")
                                    : ""}
                                </span>
                              </div>
                            )}
                          </Col>

                          <Col
                            xxl={8}
                            xl={8}
                            lg={11}
                            md={11}
                            sm={24}
                            xs={24}
                            style={{
                              display: "flex",
                              alignItems: "end",
                              marginBottom: "1rem",
                              justifyContent: isMobile ? "center" : "end",
                              gap: "1rem",
                            }}
                          >
                            <PrimarButton
                              title="التفاصيل"
                              onClick={(e) => handleDetailsClick(e, magazine)}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                }
              ></Collapse.Panel>
            ))}
        </Collapse>
      </div>

      {/* Flipbook Modal */}
      <Modal
        open={isFlipbookOpen}
        onCancel={handleModalClose}
        width={isMobile ? "100%" : "95%"}
        style={{
          top: isMobile ? 0 : 20,
          maxWidth: isMobile ? "100vw" : "1400px",
        }}
        footer={null}
        destroyOnClose
      >
        <div className="ghaith--gift-wrapper" style={{ padding: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: isMobile ? "auto" : "70vh",
              padding: isMobile ? "10px" : "20px",
            }}
          >
            {/* Flipbook Container */}
            <div
              style={{
                position: "relative",
                marginBottom: isMobile ? "20px" : "30px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.16)",
                borderRadius: "12px",
                overflow: "hidden",
                width: "100%",
                maxWidth: isMobile ? "100%" : "1000px",
              }}
            >
              <HTMLFlipBook
                width={isMobile ? window.innerWidth - 60 : 500}
                height={isMobile ? (window.innerWidth - 60) * 1.4 : 700}
                size="stretch"
                minWidth={isMobile ? 280 : 400}
                maxWidth={isMobile ? window.innerWidth - 40 : 600}
                minHeight={isMobile ? 400 : 600}
                maxHeight={isMobile ? 700 : 800}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onFlip}
                className="flipbook"
                style={{
                  direction: "rtl",
                }}
                startPage={lastPageIndex >= 0 ? lastPageIndex : 0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.5}
                showPageCorners={true}
                disableFlipByClick={false}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                ref={flipBookRef}
              >
                {images.map((imageUrl: string, index: number) => (
                  <div
                    key={index}
                    className="page"
                    style={{
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`صفحة ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Navigation Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: isMobile ? "10px" : "20px",
                padding: isMobile ? "12px 15px" : "15px 30px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                direction: "rtl",
                width: "100%",
                maxWidth: isMobile ? "100%" : "auto",
              }}
            >
              <button
                className="gh--font-light"
                onClick={goToNextPage}
                disabled={currentPage >= lastPageIndex}
                style={{
                  padding: isMobile ? "10px 16px" : "12px 24px",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "500",
                  cursor:
                    currentPage >= lastPageIndex ? "not-allowed" : "pointer",
                  opacity: currentPage >= lastPageIndex ? 0.5 : 1,
                  backgroundColor: "#009767",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s",
                  minWidth: isMobile ? "80px" : "auto",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (currentPage < lastPageIndex) {
                    e.currentTarget.style.backgroundColor = "#007a55";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#009767";
                }}
              >
                <RightOutlined /> {isMobile ? "" : "السابق"}
              </button>
              <div
                style={{
                  margin: 0,
                  fontSize: isMobile ? "14px" : "18px",
                  whiteSpace: "nowrap",
                }}
                className="gh--font-light"
              >
                صفحة {images.length - currentPage} من {images.length}
              </div>
              <button
                className="gh--font-light"
                onClick={goToPrevPage}
                disabled={currentPage <= 0}
                style={{
                  padding: isMobile ? "10px 16px" : "12px 24px",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "500",
                  cursor: currentPage <= 0 ? "not-allowed" : "pointer",
                  opacity: currentPage <= 0 ? 0.5 : 1,
                  backgroundColor: "#009767",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s",
                  minWidth: isMobile ? "80px" : "auto",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (currentPage > 0) {
                    e.currentTarget.style.backgroundColor = "#007a55";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#009767";
                }}
              >
                {isMobile ? "" : "التالي"} <LeftOutlined />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CoverCollapse;
