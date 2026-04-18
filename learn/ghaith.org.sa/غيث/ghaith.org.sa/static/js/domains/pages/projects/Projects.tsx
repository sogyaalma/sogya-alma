import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getHomeProjects } from "../../../apis/actions/home.actions";
import { AppDispatch, RootState } from "../../../apis/store";
import ProjectCard from "../../../bibilio/cards/ProjectCard";
import PaginationComponent from "../../../bibilio/pagination/PaginationComponent";
import { scroll } from "../../../apis/utils/utils";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import Loader from "../../../bibilio/loader/Loader";
import DonationSection from "../../../components/sections/DonationSection";
import AddPartnershipButton from "../../../bibilio/Buttons/addPartershipButton";
import PageContainer from "../../../components/container/PageContainer";
import { useLocation, useNavigate } from "react-router-dom";
interface ProjectsProps {
  type?: "general" | "seasonal";
}

const ProjectsPage = ({ type }: ProjectsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state?.home.projects);
  const loading = useSelector((state: RootState) => state.home.loading);

  const currentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<"general" | "seasonal">(
    type === "general" ? "general" : "seasonal",
  );
  const location = useLocation();
  const navigate = useNavigate();
  const itemPerPage = 6;

  useEffect(() => {
    setActiveCategory(
      location.pathname.includes("seasonal") ? "seasonal" : "general",
    );
  }, [location.pathname]);

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  useEffect(() => {
    dispatch(getHomeProjects());
  }, [dispatch]);

  const handleCategoryChange = (category: "general" | "seasonal") => {
    setActiveCategory(category);
    setCurrentPage(1);
    navigate(
      category === "general" ? "/general-projects" : "/seasonal-projects",
    );
  };

  const sortedProjects = [...(projects || [])].sort(
    (a: any, b: any) => (a.sequence ?? 0) - (b.sequence ?? 0),
  );

  const startIndex = (currentPage - 1) * itemPerPage;
  const paginatedProjects = sortedProjects.slice(
    startIndex,
    startIndex + itemPerPage,
  );
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageContainer
        title="جمعية غيث - مشاريع الجمعية"
        description="مشاريع الجمعية"
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">مشاريع </span>
              <span className="ghaith--donation-primary">الجمعية</span>
            </h1>
          </div>

          <Row
            gutter={[16, 16]}
            justify={"start"}
            dir={"rtl"}
            style={{ margin: "1.5rem 0", minHeight: "5rem" }}
          >
            <Col
              style={{ display: "flex", justifyContent: "start" }}
              xxl={12}
              xl={14}
              lg={16}
              md={18}
              sm={24}
              xs={24}
            >
              <Col
                xxl={8}
                xl={8}
                lg={8}
                md={8}
                sm={8}
                xs={8}
                className="ghaith--add-partnership-col"
              >
                <AddPartnershipButton
                  title={"المشاريع العامــــــة"}
                  onClick={() => handleCategoryChange("general")}
                  className={
                    activeCategory === "general"
                      ? "ghaith--add-partnership-active-button"
                      : ""
                  }
                />
              </Col>
              <Col
                xxl={8}
                xl={8}
                lg={8}
                md={8}
                sm={8}
                xs={8}
                className="ghaith--add-partnership-col"
              >
                <AddPartnershipButton
                  title={"المشاريع الموسمية"}
                  onClick={() => handleCategoryChange("seasonal")}
                  className={
                    activeCategory === "seasonal"
                      ? "ghaith--add-partnership-active-button"
                      : ""
                  }
                />
              </Col>
            </Col>
          </Row>

          {/* Content Based on Active Category */}
          {activeCategory === "general" ? (
            <div
              style={{
                marginLeft: "-50vw",
                marginRight: "-50vw",
                width: "100vw",
                position: "relative",
                left: "50%",
                right: "50%",
              }}
            >
              <DonationSection type="internal" />
            </div>
          ) : (
            <>
              {paginatedProjects && paginatedProjects.length > 0 && (
                <>
                  <Row
                    gutter={[32, 32]}
                    className="ghaith--projects-page-row"
                    ref={currentRef}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {paginatedProjects.map((item: any) => (
                      <Col
                        key={item.id}
                        xs={22}
                        sm={12}
                        md={11}
                        lg={9}
                        xl={7}
                        xxl={7}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ProjectCard
                          access_token={item?.access_token}
                          title={item?.title}
                          imageUrl={
                            item?.external_image_ids &&
                            item?.external_image_ids[0]
                          }
                          description={item?.brief}
                          youtube_url={item?.video_url}
                        />
                      </Col>
                    ))}
                  </Row>

                  <div className="ghaith--pagination-container">
                    {sortedProjects.length > itemPerPage && (
                      <PaginationComponent
                        active={currentPage}
                        total={sortedProjects.length}
                        itemPerPage={itemPerPage}
                        scroll={() => scroll(currentRef)}
                        setActive={(nb) => updateActive(nb)}
                      />
                    )}
                  </div>
                </>
              )}

              {sortedProjects.length === 0 && (
                <div className="ghaith--projects-empty-state">
                  <p>لا توجد مشاريع متاحة حالياً</p>
                </div>
              )}
            </>
          )}
        </div>
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default ProjectsPage;
