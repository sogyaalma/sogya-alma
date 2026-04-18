import React, { useEffect, useMemo } from "react";
import { Row, Col } from "antd";
import DonationCard from "../../bibilio/cards/DonationCard";
import validIcon from "../../assets/icons/valid.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { getAllKorba, getPrograms } from "../../apis/actions/program.actions";
import { useParams, useLocation } from "react-router-dom";

export default function OtherProgramsSection() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { access_token } = useParams<{ access_token: string }>();

  const isKorba = location.pathname.toLowerCase().includes("korba");

  const programs = useSelector((state: RootState) => state?.program.programs);
  const korbaPrograms = useSelector(
    (state: RootState) => state?.program.korbas
  );
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );

  useEffect(() => {
    const partner_id = beneficiaryDetails?.id || donorDetails?.id;

    if (isKorba) {
      dispatch(getAllKorba({ tag: "all" }));
    } else {
      if (partner_id) {
        dispatch(getPrograms({ tag: "homepage", partner_id }));
      } else {
        dispatch(getPrograms({ tag: "homepage" }));
      }
    }
  }, [dispatch, beneficiaryDetails?.id, donorDetails?.id, isKorba]);

  // Use the appropriate programs list based on isKorba
  const currentPrograms = isKorba ? korbaPrograms : programs;

  // Filter programs to exclude the current one and limit to 3
  const filteredPrograms = useMemo(() => {
    return currentPrograms
      ?.filter((item: any) => item?.access_token !== access_token)
      .slice(0, 3);
  }, [currentPrograms, access_token]);

  return (
    <div className="ghaith--donation-section" style={{ marginTop: "10rem" }}>
      {/* Title */}
      <div
        className="ghaith--donationSection-title ghaith--donations-title"
        style={{ marginBottom: "6rem" }}
      >
        <img alt="valid_icon" src={validIcon} className="ghaith--donationSection-title-icon" />
        <h1>
          <span className="ghaith--donation-highlight ">{isKorba ? "حالات" : "برامج"} </span>
          <span className="ghaith--donation-primary"> أخرى تحتاج دعمك</span>
        </h1>
      </div>

      {/* Grid */}
      <Row gutter={[32, 24]} className="ghaith--donations-row">
        {filteredPrograms?.map((item: any) => (
          <Col
            key={item.id}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <DonationCard
              title={isKorba ? item?.name : item?.program_name}
              imageUrl={item?.title_image_ids[0]}
              qrUrl={item?.qr_code_ids[0]}
              tags={item?.share_ids}
              access_token={item?.id}
              category_id={!isKorba ? item?.category_id[0] : null}
              favorite={item?.favorite}
              type={isKorba ? "cases" : "programs"}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
