import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../commun/Navbar";
import FooterSection from "../../components/sections/FooterSection";
import FooterImage from "../../assets/images/ghaith-footer.png";
import { formatSaudiNumber, scroll } from "../../apis/utils/utils";
import { AppDispatch, RootState } from "../../apis/store";
import { getStatistics } from "../../apis/actions/home.actions";
import Loader from "../../bibilio/loader/Loader";
import PaginationComponent from "../../bibilio/pagination/PaginationComponent";
import PageContainer from "../../components/container/PageContainer";

// Statistics Card Component
const StatisticsCard = ({ stat }: { stat: any }) => {
  const formattedNumber =
    typeof stat.number === "number"
      ? formatSaudiNumber(stat.number)
      : stat.number;

  return (
    <div className="ghaith--statistics-card">
      <div className="ghaith--statistics-card-icon">
        {stat.icon && stat.icon[0] && (
          <img src={stat.icon[0]} alt={stat.name} />
        )}
      </div>
      <div className="ghaith--statistics-card-name">{stat.name}</div>
      <div className="ghaith--statistics-card-number">{formattedNumber}</div>
      <div className="ghaith--statistics-card-unit">{stat.unit}</div>
    </div>
  );
};
const NumbersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRef = useRef<HTMLDivElement>(null);
  const { statistics, loading } = useSelector(
    (state: RootState) => state?.home,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  const itemPerPage = 8;
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentStatistics =
    statistics?.slice(startIndex, startIndex + itemPerPage) || [];

  if (loading) return <Loader />;

  return (
    <>
      <PageContainer title="جمعية غيث - أرقام غيث" description="أرقام غيث ">
        <NavBar variant="homePage" />

        <div
          className="ghaith--newsSection-title"
          style={{ marginTop: "9rem" }}
        >
          <div className="ghaith--statistics-title-box">
            <h1>
              <span className="ghaith--donation-highlight">أرقام </span>
              <span className="ghaith--donation-primary">غيث</span>
            </h1>
          </div>
        </div>

        <Row
          dir="rtl"
          gutter={[16, 16]}
          className="ghaith--reports-container"
          ref={currentRef}
          justify="center"
          style={{ margin: "1.5rem" }}
        >
          {currentStatistics?.map((stat: any, index: number) => (
            <Col
              key={stat.id || index}
              xxl={6}
              xl={8}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              style={{
                marginTop: "1rem",
                justifyItems: "center",
                display: "flex",
              }}
            >
              <StatisticsCard stat={stat} />
            </Col>
          ))}
        </Row>

        <div className="ghaith--pagination-container">
          {statistics && statistics.length > itemPerPage && (
            <PaginationComponent
              active={currentPage}
              total={statistics.length}
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

export default NumbersPage;
