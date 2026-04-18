import React, { useEffect, useRef, useState, useMemo } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import {
  toGetAnnualReports,
  toGetFeedback,
  toGetFinancialStatements,
  toGetGoalsPrograms,
  toGetOperationalPlans,
  toGetPerformanceReports,
  toGetQualityDevelopment,
  toGetRegualationsSystems,
  toGetOfficials,
  toGetMediaReports,
} from "../../apis/actions/reports.actions";
import PaginationComponent from "../../bibilio/pagination/PaginationComponent";
import { scroll } from "../../apis/utils/utils";
import Loader from "../../bibilio/loader/Loader";
import NavBar from "../commun/Navbar";
import FooterSection from "../../components/sections/FooterSection";
import FooterImage from "../../assets/images/ghaith-footer.png";
import ReportsCard from "./reports/ReportsCard";
import PageContainer from "../../components/container/PageContainer";

interface ReportsPageProps {
  type: string;
}

const ReportsPage = ({ type }: ReportsPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { reports, loading } = useSelector((state: RootState) => state.reports);

  const currentRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({ title: "", subTitle: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  // Calculate page title using useMemo
  const pageTitle = useMemo(() => {
    switch (type) {
      case "annual_reports":
        return "جمعية غيث - التقارير السنوية";
      case "quality_development":
        return "جمعية غيث - التطوير و الجودة";
      case "performance_reports":
        return "جمعية غيث - تقارير و مؤشرات الأداء";
      case "regulations":
        return "جمعية غيث - اللوائح و السياسات";
      case "operational_plans":
        return "جمعية غيث - خطط الجمعية";
      case "financial_statement":
        return "جمعية غيث - القوائم المالية والتقارير الربعية";
      case "goals_programs":
        return "جمعية غيث - أهداف و برامج الجمعية";
      case "feedback":
        return "جمعية غيث - التغذية الراجعة";
      case "officials":
        return "جمعية غيث - بيانات القائمين على الجمعية";
      case "mediaReports":
        return "جمعية غيث - التقارير الإعلامية";
      default:
        return "جمعية غيث - التقارير";
    }
  }, [type]);

  useEffect(() => {
    switch (type) {
      case "annual_reports":
        dispatch(toGetAnnualReports());
        setState({ title: "من نحن", subTitle: "التقارير السنوية" });
        break;
      case "quality_development":
        dispatch(toGetQualityDevelopment());
        setState({ title: "الحوكمة", subTitle: "التطوير و الجودة" });
        break;
      case "performance_reports":
        dispatch(toGetPerformanceReports());
        setState({ title: "الحوكمة", subTitle: "تقارير و مؤشرات الأداء" });
        break;
      case "regulations":
        dispatch(toGetRegualationsSystems());
        setState({
          title: "الحوكمة",
          subTitle: "اللوائح و السياسات",
        });
        break;
      case "operational_plans":
        dispatch(toGetOperationalPlans());
        setState({
          title: "الحوكمة",
          subTitle: "خطط الجمعية",
        });
        break;
      case "financial_statement":
        dispatch(toGetFinancialStatements());
        setState({
          title: "الحوكمة",
          subTitle: "القوائم المالية والتقارير الربعية",
        });
        break;
      case "goals_programs":
        dispatch(toGetGoalsPrograms());
        setState({
          title: "الحوكمة",
          subTitle: " أهداف و برامج الجمعية",
        });
        break;
      case "feedback":
        dispatch(toGetFeedback());
        setState({
          title: "الحوكمة",
          subTitle: "التغذية الراجعة",
        });
        break;
      case "officials":
        dispatch(toGetOfficials());
        setState({
          title: "الحوكمة",
          subTitle: "بيانات القائمين على الجمعية",
        });
        break;
      case "mediaReports":
        dispatch(toGetMediaReports());
        setState({
          title: "التقارير",
          subTitle: "الإعلامية",
        });
        break;
      default:
        break;
    }
  }, [dispatch, type]);

  // Update document title directly
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const sortedData = reports
    .map((report: any) => report)
    .sort((a: any, b: any) => a.sequence - b.sequence);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReports = sortedData.slice(startIndex, endIndex);

  if (loading) return <Loader />;

  return (
    <PageContainer key={type} title={pageTitle} description="">
      <NavBar variant="homePage" />
      <div className="ghaith--newsSection-title" style={{ marginTop: "9rem" }}>
        <h1>
          <span className="ghaith--donation-highlight">{state.title}</span>{" "}
          {type !== "mediaReports" && (
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
          )}
          <span className="ghaith--donation-primary">{state.subTitle}</span>
        </h1>
      </div>
      <Row
        dir="rtl"
        gutter={[16, 16]}
        className="ghaith--reports-container"
        ref={currentRef}
        style={{ margin: "1.5rem" }}
        justify={"center"}
      >
        {paginatedReports &&
          paginatedReports.map((item: any, index: number) => (
            <Col
              key={item.id || index}
              xxl={6}
              xl={6}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              style={{ marginTop: "1rem" }}
            >
              <ReportsCard report={item} />
            </Col>
          ))}
      </Row>
      <div className="ghaith--pagination-container">
        {reports && reports.length > itemsPerPage && (
          <PaginationComponent
            active={currentPage}
            total={reports.length}
            itemPerPage={itemsPerPage}
            scroll={() => scroll(currentRef)}
            setActive={(nb) => updateActive(nb)}
          />
        )}
      </div>
      <FooterSection footerImg={FooterImage} />
    </PageContainer>
  );
};

export default ReportsPage;
