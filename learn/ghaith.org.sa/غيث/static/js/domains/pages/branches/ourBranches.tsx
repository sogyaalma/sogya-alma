import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import Loader from "../../../bibilio/loader/Loader";
import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { scroll } from "../../../apis/utils/utils";
import { Col, Row } from "antd";
import PaginationComponent from "../../../bibilio/pagination/PaginationComponent";
import { getAllBranches } from "../../../apis/actions/branches.actions";
import BranchCard from "../../../bibilio/cards/branchCard";
import PageContainer from "../../../components/container/PageContainer";

const OurBranches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { branches, loading } = useSelector(
    (state: RootState) => state.branches,
  );
  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  const itemPerPage = 6;
  const startIndex = (currentPage - 1) * itemPerPage;
  const allbranches = branches.slice(startIndex, startIndex + itemPerPage);
  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - فروعنا" description="فروعنا">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">فروعنا </span>
              <span className="ghaith--donation-primary"></span>
            </h1>
          </div>
        </div>
        <Row
          dir="rtl"
          gutter={[16, 16]}
          className="ghaith--reports-container"
          ref={currentRef}
          style={{ margin: "1.5rem" }}
          justify={"center"}
        >
          {allbranches?.map((branch: any, index: number) => (
            <Col
              key={index}
              xxl={20}
              xl={22}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              <BranchCard branch={branch} />
            </Col>
          ))}
        </Row>
        <div className="ghaith--pagination-container">
          {branches && branches.length > itemPerPage && (
            <PaginationComponent
              active={currentPage}
              total={branches.length}
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

export default OurBranches;
