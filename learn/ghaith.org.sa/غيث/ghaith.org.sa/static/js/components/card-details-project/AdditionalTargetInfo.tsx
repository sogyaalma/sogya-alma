import { Col, Row } from "antd";
import peopleIcon from "../../assets/icons/team.svg";
import moneyIcon from "../../assets/icons/money.svg";
import { toFormatAmount } from "../../apis/utils/utils";

interface AdditionalInfoProps {
  targetAmount: number;
  targetNumber: number;
  isKorba?: boolean;
}

const AdditionalInfoSection = ({
  targetAmount,
  targetNumber,
  isKorba,
}: AdditionalInfoProps) => {
  return (
    <Row
      gutter={16}
      style={{
        paddingTop: "2rem",
        paddingRight: "1.5rem",
        paddingLeft: "1.5rem",
      }}
    >
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <div className="ghaith--card-details-project-additional-info">
          <div className="ghaith--card-details-project-additional-info-item ghaith--card-details-project-additional-info-item--wide">
            <img src={moneyIcon} alt="people" width={30} height={30} />
            <span className="ghaith--card-details-project-additional-info-label">
              المستهدف السنوي
            </span>
            <div className="ghaith--card-details-project-additional-info-value-wrapper">
              <span className="ghaith--card-details-project-additional-info-value">
                {toFormatAmount(targetAmount)}
              </span>
              <span className="ghaith--card-details-project-additional-info-unit icon-saudi_riyal"></span>
            </div>
          </div>

          <div className="ghaith--card-details-project-additional-info-divider"></div>

          <div className="ghaith--card-details-project-additional-info-item">
            <img
              src={isKorba ? moneyIcon : peopleIcon}
              alt="money"
              width={30}
              height={30}
            />
            <span className="ghaith--card-details-project-additional-info-label">
              {isKorba ? "المتبقي" : "العدد"}
            </span>
            <div className="ghaith--card-details-project-additional-info-value-wrapper">
              <span className="ghaith--card-details-project-additional-info-value">
                {isKorba ? toFormatAmount(targetNumber) : targetNumber}
              </span>
              <span
                className={`ghaith--card-details-project-additional-info-unit ${
                  isKorba ? "icon-saudi_riyal" : ""
                }`}
              >
                {!isKorba ? "مستفيد" : ""}
              </span>{" "}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdditionalInfoSection;
