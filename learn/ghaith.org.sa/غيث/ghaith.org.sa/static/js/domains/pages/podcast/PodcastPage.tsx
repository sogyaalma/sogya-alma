import React, { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { getAllPodcasts } from "../../../apis/actions/podcast.actions";
import Loader from "../../../bibilio/loader/Loader";
import PodcastCard from "./PodcastCard";
import PageContainer from "../../../components/container/PageContainer";
const PodcastPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRef = useRef<HTMLDivElement>(null);
  const { podcasts, loading } = useSelector(
    (state: RootState) => state.podcasts,
  );
  useEffect(() => {
    dispatch(getAllPodcasts());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - بودكاست غيث" description="بودكاست غيث">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">بودكاست </span>
              <span className="ghaith--donation-primary">غيث</span>
            </h1>
          </div>
          <div
            style={{
              justifyContent: "center",
              marginBottom: "2rem",
              padding: "1rem",
            }}
          >
            <p
              style={{ color: "#666", fontSize: "16px" }}
              className="gh--font-light"
            >
              بودكاست جمعية غيث، يتناول البودكاست مواضيع عامة ومتنوعة تغطي
              مجموعة واسعة من المواضيع الثقافية، الاجتماعية، الصحية، التقنية
              التي تخص القطاع غير الربحي إجمالًا، مع استضافة خبراء ومتخصصين في
              مجالات مختلفة لمشاركة آرائهم وأفكارهم.
            </p>
          </div>
          <Row
            dir="rtl"
            gutter={[16, 16]}
            className="ghaith--reports-container"
            ref={currentRef}
            style={{ margin: "1.5rem" }}
            justify={"center"}
          >
            {" "}
            {podcasts[0]?.podcast_line_ids?.map((podcast: any, index: any) => (
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
                <PodcastCard podcast={podcast} />
              </Col>
            ))}
          </Row>
        </div>

        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default PodcastPage;
