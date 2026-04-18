import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { Col, Row } from "antd";
import Loader from "../../../bibilio/loader/Loader";
import DotsLoader from "../../../bibilio/loader/DotsLoader";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import CoverCollapse from "./CoverPage";
import { getMagazineData } from "../../../apis/actions/news.actions";
import PageContainer from "../../../components/container/PageContainer";

const CoverPageWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { magazine, loading } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(getMagazineData());
  }, [dispatch]);
  if (loading) return <Loader />;

  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - غلاف غيث" description="غلاف غيث ">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">غلاف </span>{" "}
              <span className="ghaith--donation-primary">غيث</span>
            </h1>
          </div>
        </div>
        <Row>
          <Col xxl={2} xl={1} md={0} lg={0} xs={0} sm={0}></Col>
          <Col xxl={20} xl={23} md={24} lg={24} xs={24} sm={24}>
            <div dir="rtl" className="ghaith--evaluation">
              {loading ? (
                <div className="ghaith--loading-projects-cases">
                  <p className="ghaith--no-project-message">جارٍ التحميل</p>
                  <DotsLoader />
                </div>
              ) : (
                <CoverCollapse cover={magazine} />
              )}
            </div>
          </Col>
        </Row>{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default CoverPageWrapper;
