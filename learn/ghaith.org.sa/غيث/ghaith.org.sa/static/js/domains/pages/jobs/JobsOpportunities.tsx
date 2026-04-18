import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import {
  getCertificateForJobs,
  getJobsOpportunities,
} from "../../../apis/actions/jobs.actions";
import { Col, Row } from "antd";
import Loader from "../../../bibilio/loader/Loader";
import DotsLoader from "../../../bibilio/loader/DotsLoader";
import JobsCollapse from "./JobsCollapse";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import PageContainer from "../../../components/container/PageContainer";

const JobsOpportunities = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, certificateJobs } = useSelector(
    (state: RootState) => state.jobs,
  );

  useEffect(() => {
    dispatch(getJobsOpportunities());
    dispatch(getCertificateForJobs());
  }, [dispatch]);
  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - الفرص التوظيفية"
        description="الفرص التوظيفية "
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">التوظيف </span>{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.5em",
                  backgroundColor: "#ccc",
                  margin: "0 1rem",
                  verticalAlign: "middle",
                }}
              ></span>
              <span className="ghaith--donation-primary">الفرص التوظيفية</span>
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
              ) : jobs && jobs.length === 0 ? (
                <p className="ghaith--no-services">لا توجد وظائف متاحة</p>
              ) : (
                <JobsCollapse jobs={jobs} certificateJobs={certificateJobs} />
              )}
            </div>
          </Col>
        </Row>{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default JobsOpportunities;
