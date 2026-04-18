import React, { useEffect, useRef, useState, useMemo } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { scroll } from "../../../apis/utils/utils";
import PaginationComponent from "../../../bibilio/pagination/PaginationComponent";
import NewsCard from "./NewsCard";
import {
  getAllEvents,
  getAllMediaEyes,
  getAllNews,
} from "../../../apis/actions/news.actions";
import FooterSection from "../../../components/sections/FooterSection";
import NavBar from "../../commun/Navbar";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import Loader from "../../../bibilio/loader/Loader";
import PageContainer from "../../../components/container/PageContainer";

interface NewsPageProps {
  type: string;
}

const NewsSection = ({ type }: NewsPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState({ title: "", subTitle: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const currentRef = useRef<HTMLDivElement>(null);
  const itemPerPage = 4;

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  // Replace this with your actual news data from Redux store
  const { data: news, loading } = useSelector(
    (state: RootState) => state?.news?.news
  );

  // Calculate page title based on type using useMemo
  const pageTitle = useMemo(() => {
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
  }, [type]);

  useEffect(() => {
    switch (type) {
      case "news":
        dispatch(getAllNews());
        setState({ title: "أخبار", subTitle: "الجمعية" });
        break;
      case "media_eyes":
        dispatch(getAllMediaEyes());
        setState({
          title: "غيث ",
          subTitle: " بعيون الإعلام",
        });
        break;
      case "events":
        dispatch(getAllEvents());
        setState({
          title: "فعاليات ",
          subTitle: "الجمعية",
        });
        break;
      default:
        break;
    }
  }, [dispatch, type]);

  // Update document title directly in useEffect
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const startIndex = (currentPage - 1) * itemPerPage;
  const allNews = news?.slice(startIndex, startIndex + itemPerPage);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer key={type} title={pageTitle} description="">
      <NavBar variant="homePage" />
      <div className="ghaith--news-section" style={{ marginTop: "9rem" }}>
        {/* Title */}
        <div className="ghaith--newsSection-title">
          <h1>
            <span className="ghaith--donation-highlight">{state.title} </span>
            <span className="ghaith--donation-primary">{state.subTitle}</span>
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
          {allNews?.map((item: any) => (
            <Col
              key={item.id}
              xs={20}
              sm={20}
              md={14}
              lg={11}
              xl={10}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <NewsCard
                title={item?.title}
                imageUrl={item?.news_image[0] || null}
                date={item?.published_date}
                access_token={item?.access_token}
                type={type}
              />
            </Col>
          ))}
        </Row>

        <div className="ghaith--pagination-container">
          {news && news.length > itemPerPage && (
            <PaginationComponent
              active={currentPage}
              total={news.length}
              itemPerPage={itemPerPage}
              scroll={() => scroll(currentRef)}
              setActive={(nb) => updateActive(nb)}
            />
          )}
        </div>
      </div>
      <FooterSection footerImg={FooterImage} />
    </PageContainer>
  );
};
export default NewsSection;