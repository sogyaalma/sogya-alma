import React, { useEffect, useRef } from "react";
import { Row, Col, Button } from "antd";
import Slider from "react-slick";
import { carousselSettings } from "../../apis/utils/utils";
import ProjectCard from "../../bibilio/cards/ProjectCard";
import titleIcon from "../../assets/icons/done.svg";
import { getHomeProjects } from "../../apis/actions/home.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import useIsMobile from "../../bibilio/mobileVersion/useIsMobile";
import { useNavigate } from "react-router-dom";

const ProjectSection: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state?.home.projects);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getHomeProjects());
  }, [dispatch]);

  // Responsive slider settings
  const responsiveSliderSettings = {
    ...carousselSettings(3.5),
    responsive: [
      {
        breakpoint: 1600, // xxl screens
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400, // xl screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200, // xl screens
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // lg screens
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // sm and xs screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="ghaith--project-section">
      <Row gutter={[16, 16]} className="ghaith--project-row">
        {/* Right Column with Text */}
        <Col
          xxl={7}
          xl={7}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          className="ghaith--project-description-col"
        >
          <div className="ghaith--project-description">
            <div className="ghaith--project-title-wrapper">
              <img
                src={titleIcon}
                alt="icon"
                className="ghaith--project-section-icon"
              />
              <h2 className="ghaith--project-section-title">
                <span className="green">مشاريع</span>
                <span className="black">الجمعية</span>
              </h2>
            </div>
            <h3 className="ghaith--project-subtitle">
              غيث: خير مستمر.. <span> وأثر موسمي مكثف </span>
            </h3>
            <p className="ghaith--project-text">
              في «غيث»، عطاؤنا مستدام ومشاريعنا مستمرة طوال العام تلبيةً لحاجة
              الإنسان، وفي مواسم الخير (رمضان والحج)، نضاعف جهودنا النوعية لخدمة
              ضيوف الرحمن في رحاب البيت العتيق، نسخر طاقاتنا كافة لصناعة تجربة
              روحانية فريدة، تجسد أسمى معاني الرفادة والوفاء والاحتفاء بالقلوب.
            </p>
            <div className="ghaith--project-btn-wrapper">
              <Button
                className="ghaith--discover-btn"
                onClick={() => {
                  navigate("/seasonal-projects");
                }}
              >
                اكتشف المزيد من المشاريع
              </Button>
            </div>
          </div>
        </Col>
        {/* Left Column with Slider */}
        <Col
          xxl={17}
          xl={17}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          className="ghaith--card-col"
        >
          <div className="slider-container">
            <Slider {...responsiveSliderSettings} ref={sliderRef} className="">
              {[...projects]
                .sort((a: any, b: any) => (a.sequence ?? 0) - (b.sequence ?? 0))
                .map((item: any) => (
                  <div
                    key={item.id}
                    className="ghaith--card-container"
                    style={{ textAlign: "center" }}
                  >
                    <ProjectCard
                      access_token={item?.access_token}
                      title={item?.title}
                      imageUrl={
                        item?.external_image_ids && item?.external_image_ids[0]
                      }
                      description={item?.brief}
                      youtube_url={item?.video_url}
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </Col>{" "}
        {isMobile && (
          <div className="ghaith--carousel-navigation" dir={"ltr"}>
            <button
              className="ghaith--carousel-arrow ghaith--carousel-arrow-prev"
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="ghaith--carousel-divider"></div>

            <button
              className="ghaith--carousel-arrow ghaith--carousel-arrow-next"
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ProjectSection;
