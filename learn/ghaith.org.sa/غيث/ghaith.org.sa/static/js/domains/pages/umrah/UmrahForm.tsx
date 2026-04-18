import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { Row, Col } from "antd";
import {
  getCardTypes,
  getUmrahTypes,
} from "../../../apis/actions/donation.actions";
import DonateCard from "../../../bibilio/cards/DonateCard";
import umrahImage from "../../../assets/images/umrah-banner.png";
import QrCodeImage from "../../../assets/images/ghaith-umrah-qr.png";

const UmrahComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const umrahTypes = useSelector(
    (state: RootState) => state?.donation?.umrahTypes,
  );

  useEffect(() => {
    dispatch(getUmrahTypes());
    dispatch(getCardTypes());
  }, [dispatch]);

  return (
    <>
      <div className="ghaith--gift-wrapper">
        <Row gutter={[32, 18]} justify={"center"} style={{ direction: "ltr" }}>
          {/* Right Side - Form */}
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={18}
            sm={23}
            xs={24}
            style={{ justifyContent: "center" }}
          >
            <div className="gift--gift-big-image-container">
              {umrahImage && (
                <img
                  className="ghaith--gift-big_card"
                  src={umrahImage}
                  alt={"umrah"}
                />
              )}
              {QrCodeImage && (
                <img
                  className="ghaith--qr-code-overlay"
                  src={QrCodeImage}
                  alt={"QR Code"}
                />
              )}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <div
              className="ghaith--gift-form-wrapper ghaith--umrah-wrapper"
              style={{ marginTop: "1rem" }}
            >
              <DonateCard variant="payment" tags={umrahTypes} umrah={true} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UmrahComponent;
