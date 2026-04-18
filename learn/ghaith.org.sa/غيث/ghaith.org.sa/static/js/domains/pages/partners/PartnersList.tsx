import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { getSuccessPartners } from "../../../apis/actions/home.actions";
import PartnersCard from "./PartnersCard";
import Loader from "../../../bibilio/loader/Loader";
import PaginationComponent from "../../../bibilio/pagination/PaginationComponent";
import { scroll } from "../../../apis/utils/utils";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { getEntitiesClassification } from "../../../apis/actions/partners.actions";
import AddPartnershipButton from "../../../bibilio/Buttons/addPartershipButton";
import PageContainer from "../../../components/container/PageContainer";

const PartnersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRef = useRef<HTMLDivElement>(null);
  const { partners, loading } = useSelector((state: RootState) => state?.home);
  const [activeEntity, setActiveEntity] = useState<any>(null);
  const handleEntitySelection = (id: string) => {
    setActiveEntity(id);
    setCurrentPage(1);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };
  const { entities } = useSelector((state: RootState) => state?.partnership);
  useEffect(() => {
    dispatch(getSuccessPartners());
    dispatch(getEntitiesClassification());
  }, [dispatch]);
  useEffect(() => {
    if (entities && entities.length > 0 && activeEntity === null) {
      setActiveEntity(entities[0]?.id);
    }
  }, [entities, activeEntity]);
  const itemPerPage = 8;
  const startIndex = (currentPage - 1) * itemPerPage;
  const filteredPartners = partners.filter(
    (partner: any) => partner.partnership_type_id === activeEntity,
  );
  const allParetners = filteredPartners.slice(
    startIndex,
    startIndex + itemPerPage,
  );

  if (loading) return <Loader />;

  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - شركاء النجاح"
        description="شركاء النجاح"
      >
        <NavBar variant="homePage" />
        <div
          className="ghaith--newsSection-title"
          style={{ marginTop: "9rem" }}
        >
          <h1>
            <span className="ghaith--donation-highlight">شركاء </span>
            <span className="ghaith--donation-primary">غيث</span>
          </h1>
        </div>{" "}
        <Row
          gutter={[16, 16]}
          justify={"start"}
          dir={"rtl"}
          style={{ margin: "1.5rem", minHeight: "5rem" }}
          className="ghaith--reports-container"
        >
          {entities?.map((entity: any) => (
            <Col
              xxl={3}
              xl={6}
              lg={8}
              md={8}
              sm={12}
              xs={12}
              className="ghaith--add-partnership-col"
            >
              <AddPartnershipButton
                className={
                  activeEntity === entity?.id
                    ? "ghaith--add-partnership-active-button"
                    : ""
                }
                onClick={() => handleEntitySelection(entity?.id)}
                title={entity?.name}
              />
            </Col>
          ))}
        </Row>
        <Row
          dir="rtl"
          gutter={[16, 16]}
          className="ghaith--reports-container"
          ref={currentRef}
          style={{ margin: "1.5rem" }}
        >
          {allParetners?.map((partner: any, index: number) => (
            <Col
              key={partner.id || index}
              xxl={6}
              xl={6}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              style={{ marginTop: "1rem" }}
            >
              <PartnersCard partner={partner} />
            </Col>
          ))}
        </Row>
        <div className="ghaith--pagination-container">
          {filteredPartners && filteredPartners.length > itemPerPage && (
            <PaginationComponent
              active={currentPage}
              total={filteredPartners.length}
              itemPerPage={itemPerPage}
              scroll={() => scroll(currentRef)}
              setActive={(nb) => updateActive(nb)}
            />
          )}
        </div>{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default PartnersList;
