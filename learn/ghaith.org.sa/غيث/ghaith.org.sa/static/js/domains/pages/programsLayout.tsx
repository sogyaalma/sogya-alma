import React, { useEffect, useMemo } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../commun/Navbar";
import FooterSection from "../../components/sections/FooterSection";
import CardDetailsProgram from "../../components/card-details-project/CardDetailsProgram";
import Loader from "../../bibilio/loader/Loader";
import { AppDispatch, RootState } from "../../apis/store";
import {
  getDetailsProgram,
  getProgramTypes,
} from "../../apis/actions/donor.actions";
import FooterImage from "../../assets/images/ghaith-footer.png";
import DonateCard from "../../bibilio/cards/DonateCard";
import OtherProgramsSection from "../../components/card-details-project/otherProgramsSection";
import { getCardTypes } from "../../apis/actions/donation.actions";
import { useCookies } from "react-cookie";
import { getDonorDetails } from "../../apis/actions/profile.actions";
import { getKorbaDetails } from "../../apis/actions/program.actions";
import PageContainer from "../../components/container/PageContainer";

const LayoutDetailsProgram = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { access_token } = useParams();
  const location = useLocation();
  const [cookies] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;
  const selectedShare = location.state?.selectedShare;
  const partner_id = location.state?.partner_id;

  // Check if the pathname includes "korba"
  const isKorba = location.pathname.toLowerCase().includes("korba");

  const { program: detailsProgram, status } = useSelector(
    (state: RootState) => state.donor.detailsProgram,
  );

  const { korba: detailsKorba, statusKorba } = useSelector(
    (state: RootState) => state.program.detailsKorba,
  );

  const details = isKorba ? detailsKorba : detailsProgram;
  const currentStatus = isKorba ? statusKorba : status;

  const pageTitle = useMemo(() => {
    return `جمعية غيث - ${
      isKorba
        ? details?.name || "حالات تفريج كربة"
        : details?.program_name || "برامج الجمعية"
    }`;
  }, [isKorba, details?.name, details?.program_name]);

  const pageDescription = useMemo(() => {
    return isKorba
      ? details?.name || "حالات تفريج كربة"
      : details?.program_name || "برامج الجمعية";
  }, [isKorba, details?.name, details?.program_name]);

  useEffect(() => {
    if (isKorba) {
      if (
        statusKorba === "idle" ||
        detailsKorba?.access_token !== access_token
      ) {
        dispatch(getKorbaDetails({ access_token: access_token }));
      }
    } else {
      if (status === "idle" || detailsProgram?.access_token !== access_token) {
        dispatch(
          getDetailsProgram({
            access_token: access_token,
            partner_id: partner_id,
          }),
        );
      }
    }

    dispatch(getProgramTypes());
    dispatch(getCardTypes());
    if (isConnected && cookies?.role === "donor") {
      dispatch(getDonorDetails());
    }
  }, [dispatch, access_token, isKorba]);

  useEffect(() => {
    if (
      details &&
      currentStatus === "succeeded" &&
      Object.keys(details).length === 0
    ) {
      navigate("/");
    }
  }, [details, currentStatus, navigate]);

  // Update document title directly
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  if (currentStatus === "loading") {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <PageContainer
      key={`${isKorba ? "korba" : "program"}-${details?.id || access_token}`}
      title={pageTitle}
      description={pageDescription}
    >
      <div className="ghaith--layout-details">
        <NavBar variant="homePage" />
        <div className="ghaith--newsSection-title">
          <h1>
            <span className="ghaith--donation-highlight" />
            <span className="ghaith--donation-primary" />
          </h1>
        </div>
        <Row dir="rtl" justify={"space-between"}>
          <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}></Col>
          <Col
            xxl={14}
            xl={14}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ padding: "2vh" }}
          >
            <CardDetailsProgram project={details} isKorba={isKorba} />
          </Col>
          <Col
            xxl={7}
            xl={7}
            lg={12}
            md={16}
            sm={24}
            xs={24}
            style={{ padding: "5vh" }}
          >
            {details && (
              <DonateCard
                tags={details?.share_ids}
                selectedShare={selectedShare}
                remaining_amount={details?.amount_residual}
                program={details}
                variant="payment"
                isKorba={isKorba}
              />
            )}
          </Col>
          <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}></Col>
        </Row>
        <OtherProgramsSection />
        <FooterSection footerImg={FooterImage} />
      </div>
    </PageContainer>
  );
};

export default LayoutDetailsProgram;
