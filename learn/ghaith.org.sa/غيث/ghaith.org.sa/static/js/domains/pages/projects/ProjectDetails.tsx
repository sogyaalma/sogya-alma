import React, { useEffect, useRef, useMemo } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { getAllNews } from "../../../apis/actions/news.actions";
import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { useParams } from "react-router-dom";
import Loader from "../../../bibilio/loader/Loader";
import { getDetailsProject } from "../../../apis/actions/home.actions";
import OtherProjectCard from "../../../bibilio/cards/otherProjectCard";
import PreviewMedia from "../../../bibilio/previewMedia/PreviewMedia";
import PageContainer from "../../../components/container/PageContainer";

export default function ProjectDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const { access_token } = useParams();

  const { project: detailsProject, status } = useSelector(
    (state: RootState) => state.home.detailsProject
  );
  const videos = detailsProject.video_ids;
  const reports = detailsProject.report_ids;

  const transformedReports =
    reports?.map((url: string, index: number) => ({
      id: index,
      name: `تقرير ${index + 1}`,
      attachment_ids: url,
      sequence: index,
    })) || [];

  const pageTitle = useMemo(() => {
    return `جمعية غيث - ${detailsProject?.title || "تفاصيل المشروع"}`;
  }, [detailsProject?.title]);

  useEffect(() => {
    if (status === "idle" || detailsProject?.access_token !== access_token) {
      dispatch(getDetailsProject(access_token));
    }
  }, [dispatch, access_token, detailsProject?.access_token]);

  // Update document title directly
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  if (status === "loading") {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <PageContainer 
      key={`project-${detailsProject?.id || access_token}`}
      title={pageTitle} 
      description={detailsProject?.title || ""}
    >
      <NavBar variant="homePage" />
      <div className="ghaith--news-section" style={{ marginTop: "11rem" }}>
        {/* Title */}
        <div className="ghaith--newsSection-title ghaith--newsDetails-title-wrapper">
          <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
            {detailsProject?.title}
          </h1>
        </div>
        <div className="ghaith--news_main-details-image-wrapper">
          {detailsProject?.external_image_ids && (
            <img
              src={detailsProject.external_image_ids[0]}
              alt={detailsProject?.title}
            />
          )}
        </div>
        <div
          className="ghaith--newsSection-div ghaith--newsDetails-title-wrapper"
          style={{ marginTop: "3rem" }}
        >
          <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
            المختصر{" "}
          </h1>
        </div>
        <div className="ghaith--newsSection-div ghaith--newsDetails-title-wrapper">
          <div className=" ghaith--newsDetails-description">
            {detailsProject?.brief}
            <div />
          </div>
        </div>
        <div
          className="ghaith--newsSection-div ghaith--newsDetails-title-wrapper"
          style={{ marginTop: "3rem" }}
        >
          <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
            التفاصيل{" "}
          </h1>
        </div>
        <div className="ghaith--newsSection-div ghaith--newsDetails-title-wrapper">
          <div
            className=" ghaith--newsDetails-description"
            dangerouslySetInnerHTML={{ __html: detailsProject?.details || "" }}
          />
        </div>
        {detailsProject?.image_ids && detailsProject?.image_ids.length > 0 && (
          <Row
            gutter={[16, 16]}
            className="ghaith--news-row"
            dir="rtl"
            ref={currentRef}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
              margin: "4rem 1rem 0",
            }}
          >
            {[0, 1, 2, 3, 4].map((colIndex) => {
              // Pattern: tall, short, tall, short, tall for first row
              const isFirstRowTall = colIndex % 2 === 0;

              return (
                <Col
                  key={`col-${colIndex}`}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={Math.floor(24 / 5)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {detailsProject?.image_ids[colIndex] && (
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        height: isFirstRowTall ? "486px" : "236px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={detailsProject.image_ids[colIndex].image[0]}
                        alt={
                          detailsProject.image_ids[colIndex].title ||
                          `Gallery image ${colIndex + 1}`
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}

                  {detailsProject?.image_ids[colIndex + 5] && (
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        height: isFirstRowTall ? "236px" : "486px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={detailsProject.image_ids[colIndex + 5].image[0]}
                        alt={
                          detailsProject.image_ids[colIndex + 5].title ||
                          `Gallery image ${colIndex + 6}`
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </Col>
              );
            })}
          </Row>
        )}
        {videos && videos.length > 0 && (
          <>
            <div
              className="ghaith--newsSection-title ghaith--newsDetails-title-wrapper"
              style={{ marginTop: "4rem" }}
            >
              <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
                الفيديوهات{" "}
              </h1>
            </div>
            {/* Grid */}
            <div className="ghaith--projects-page">
              <Row
                gutter={[32, 32]}
                className="ghaith--projects-page-row"
                ref={currentRef}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {videos?.map((item: any) => (
                  <Col
                    key={item.id}
                    xs={22}
                    sm={12}
                    md={11}
                    lg={9}
                    xl={7}
                    xxl={6}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <OtherProjectCard
                      title={item?.title}
                      imageUrl={item?.image[0]}
                      youtube_url={item?.video}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
        {transformedReports.length > 0 && (
          <div
            className="ghaith--newsSection-title ghaith--newsDetails-title-wrapper"
            style={{ marginTop: "4rem" }}
          >
            <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
              تقارير المشروع{" "}
            </h1>
          </div>
        )}
      </div>
      {transformedReports.length > 0 && (
        <PreviewMedia
          mediaItems={transformedReports}
          loading={status === "loading"}
          itemPerPage={8}
          isVideo={false}
          title=""
          type="project"
        />
      )}
      <FooterSection footerImg={FooterImage} />
    </PageContainer>
  );
}