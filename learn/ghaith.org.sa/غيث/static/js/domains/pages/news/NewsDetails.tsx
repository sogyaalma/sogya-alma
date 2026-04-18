import React, { useEffect, useRef, useMemo } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import NewsCard from "./NewsCard";
import {
  getAllNews,
  getNewsDetails,
  getEventDetails,
  getMediaEyesDetails,
} from "../../../apis/actions/news.actions";
import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../bibilio/loader/Loader";
import NewsAttachmentCard from "./NewsAttachmentCard";
import PageContainer from "../../../components/container/PageContainer";
interface NewsDetailsProps {
  type: string;
}

const NewsDetails = ({ type }: NewsDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentRef = useRef<HTMLDivElement>(null);

  // Get access_token from URL parameters
  const { access_token } = useParams<{ access_token: string }>();

  const { data: news } = useSelector((state: RootState) => state?.news?.news);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const newsDetails = useSelector((state: RootState) => state.news.newsDetails);
  const loading = useSelector((state: RootState) => state.news.loading);

  const relatedNews = news
    ?.filter(
      (item: any) =>
        item.id !== newsDetails?.id &&
        item.category_id === newsDetails?.category_id,
    )
    .slice(0, 3);

  const pageTitle = useMemo(() => {
    if (newsDetails?.title) {
      return `جمعية غيث - ${newsDetails.title}`;
    }

    switch (type) {
      case "news":
        return "جمعية غيث - أخبار الجمعية";
      case "media_eyes":
        return "جمعية غيث - غيث بعيون الإعلام";
      case "events":
        return "جمعية غيث - فعاليات الجمعية";
      default:
        return "جمعية غيث";
    }
  }, [type, newsDetails?.title]);

  useEffect(() => {
    if (access_token) {
      switch (type) {
        case "news":
          dispatch(getNewsDetails(access_token));
          break;
        case "media_eyes":
          dispatch(getMediaEyesDetails(access_token));
          break;
        case "events":
          dispatch(getEventDetails(access_token));
          break;
        default:
          dispatch(getNewsDetails(access_token));
          break;
      }
    } else {
      switch (type) {
        case "media_eyes":
          navigate("/media-eyes");
          break;
        case "events":
          navigate("/events");
          break;
        case "news":
        default:
          navigate("/news");
          break;
      }
    }
  }, [dispatch, access_token, type, navigate]);

  // Update document title directly
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer
      key={`${type}-${newsDetails?.id || access_token}`}
      title={pageTitle}
      description={newsDetails?.title || ""}
    >
      <NavBar variant="homePage" />
      <div className="ghaith--news-section" style={{ marginTop: "11rem" }}>
        {/* Title */}
        <div className="ghaith--newsSection-title ghaith--newsDetails-title-wrapper">
          <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
            {newsDetails?.title}
          </h1>
        </div>
        <div className="ghaith--news_main-details-image-wrapper">
          {newsDetails?.news_image && (
            <img
              src={newsDetails?.news_image[0]}
              alt={newsDetails?.title || "News image"}
            />
          )}
        </div>
        <div
          className="ghaith--newsSection-div ghaith--newsDetails-title-wrapper"
          style={{ marginTop: "3rem" }}
        >
          <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
            التفاصيل
          </h1>
        </div>
        <div className="ghaith--newsSection-div ghaith--newsDetails-title-wrapper">
          <div
            className=" ghaith--newsDetails-description"
            dangerouslySetInnerHTML={{ __html: newsDetails?.description || "" }}
          />
        </div>
        {newsDetails?.image_ids && newsDetails?.image_ids.length > 0 && (
          <Row
            gutter={[32, 48]}
            className="ghaith--news-row"
            ref={currentRef}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            {newsDetails?.image_ids?.map((item: any) => (
              <Col
                key={item.id}
                xs={20}
                sm={20}
                md={14}
                lg={11}
                xl={10}
                xxl={7}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <NewsAttachmentCard
                  description={item?.description}
                  imageUrl={item?.attachment_ids[0]}
                />
              </Col>
            ))}
          </Row>
        )}
        {relatedNews && relatedNews.length > 0 && type === "news" && (
          <>
            <div
              className="ghaith--newsSection-title ghaith--newsDetails-title-wrapper"
              style={{ marginTop: "3rem" }}
            >
              <h1 className="ghaith--donation-primary ghaith--newsDetails-title">
                أخبار ذات صلة
              </h1>
            </div>
            {/* Grid */}
            <Row
              gutter={[32, 48]}
              className="ghaith--news-row"
              ref={currentRef}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {relatedNews?.map((item: any) => (
                <Col
                  key={item.id}
                  xs={20}
                  sm={20}
                  md={14}
                  lg={11}
                  xl={10}
                  xxl={7}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <NewsCard
                    title={item?.title}
                    imageUrl={item?.news_image[0] || null}
                    date={item?.date}
                    access_token={item?.access_token}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
      <FooterSection footerImg={FooterImage} />
    </PageContainer>
  );
};
export default NewsDetails;
