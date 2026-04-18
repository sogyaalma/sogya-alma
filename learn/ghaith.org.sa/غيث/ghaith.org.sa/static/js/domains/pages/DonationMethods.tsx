import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import Loader from "../../bibilio/loader/Loader";
import FooterSection from "../../components/sections/FooterSection";
import NavBar from "../commun/Navbar";
import FooterImage from "../../assets/images/ghaith-footer.png";
import { toGetDonationMethods } from "../../apis/actions/home.actions";
import { scroll } from "../../apis/utils/utils";
import { Col, Row } from "antd";
import DonationMethodCard from "../../bibilio/cards/DonationMethodCard";
import PaginationComponent from "../../bibilio/pagination/PaginationComponent";
import PageContainer from "../../components/container/PageContainer";

const DonationMethods = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { donationMethods, loading } = useSelector(
    (state: RootState) => state.home,
  );
  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  useEffect(() => {
    dispatch(toGetDonationMethods());
  }, [dispatch]);

  const itemPerPage = 8;
  const startIndex = (currentPage - 1) * itemPerPage;
  const allDonationMethods = donationMethods?.slice(
    startIndex,
    startIndex + itemPerPage,
  );

  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - الحسابات البنكية"
        description="الحسابات البنكية "
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">الحسابات </span>
              <span className="ghaith--donation-primary">البنكية</span>
            </h1>
          </div>
        </div>
        <Row
          dir="rtl"
          gutter={[16, 16]}
          className="ghaith--reports-container ghaith--donation-methods-container"
          ref={currentRef}
          style={{ margin: "1.5rem" }}
        >
          {allDonationMethods && allDonationMethods?.length > 0 ? (
            allDonationMethods?.map((method: any, index: number) => (
              <Col
                key={method.bank_name || index}
                xxl={6}
                xl={8}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                style={{ marginTop: "1rem" }}
              >
                <DonationMethodCard method={method} />
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
              لا توجد حسابات بنكية
            </div>
          )}
        </Row>
        <div className="ghaith--pagination-container">
          {donationMethods && donationMethods?.length > itemPerPage && (
            <PaginationComponent
              active={currentPage}
              total={donationMethods.length}
              itemPerPage={itemPerPage}
              scroll={() => scroll(currentRef)}
              setActive={(nb) => updateActive(nb)}
            />
          )}
        </div>
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default DonationMethods;
