import location from "../../assets/icons/location_details.svg";
import cursor from "../../assets/icons/cursor-icon.svg";
import doc from "../../assets/icons/doc-icon.svg";
import click from "../../assets/icons/tab-click-icon.svg";
import { Button, Col, Row, notification } from "antd";
import { useEffect, useState } from "react";
import AdditionalInfoSection from "./AdditionalTargetInfo";
import { ShareAltOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import facebookIcon from "../../assets/icons/facebook.png";
import twitterIcon from "../../assets/icons/twitter.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import envelopIcon from "../../assets/icons/envelope.png";
import linkIcon from "../../assets/icons/link.png";
import water from "../../assets/icons/water-drop.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../apis/store";
import { useCookies } from "react-cookie";
import { addOrRemoveFavorite } from "../../apis/actions/program.actions";
import { showNotification } from "../../apis/utils/utils";
import Login from "../../domains/pages/auth/Login";
import ProgressCard from "../../bibilio/cards/ProgressCard";

interface CardProps {
  project: any;
  isKorba: boolean;
}

const CardDetailsProgram = ({ project, isKorba }: CardProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const generatedUrl = `${window.location.origin}/${
    isKorba ? "korba" : "program"
  }/${isKorba ? project?.access_token : project?.id}`;
  const projectName = isKorba ? project?.name : project?.program_name;
  const shareText = isKorba
    ? `تبرع للحالة ${projectName}`
    : `تبرع للمشروع ${projectName} `;
  const dispatch = useDispatch<AppDispatch>();
  const [cookies] = useCookies(["apiKey", "role"]);
  const [showLogin, setShowLogin] = useState(false);

  const isConnected = cookies?.apiKey ?? false;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [api, contextHolder] = notification.useNotification();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      api.success({
        message: "نجاح",
        description: "تم نسخ الرابط بنجاح!",
        placement: "topRight",
        duration: 3,
        className: "custom-copy-notification",
      });
    } catch (err) {
      api.error({
        message: "عذرا",
        description: "فشل نسخ الرابط",
        placement: "topRight",
        duration: 3,
        className: "custom-copy-notification",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: projectName,
          text: `${shareText}: ${projectName}`,
          url: generatedUrl,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      handleCopyLink();
    }
  };
  const validateAddOrRemove = async () => {
    try {
      dispatch(
        addOrRemoveFavorite({ category_id: project.category_id[0] }),
      ).then((result: any) => {
        const request = result?.payload?.result;
        if (request?.code === 200) {
          window.location.reload();
          showNotification(request?.message, "success");
        } else {
          showNotification(request?.message, "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="ghaith--card-details-project-container">
        <div
          className="ghaith--card-details-project-image"
          style={{
            backgroundImage: project?.title_image_ids?.[0]
              ? `url(${project.title_image_ids[0]})`
              : `url(${project?.image})`,
          }}
        >
          {/* QR Code positioned to overlap the image */}
          <div className="ghaith--card-details-project-qr">
            {!isKorba && (
              <span className="ghaith--card-details-project-qr-license">
                رقم الترخيص: {project?.license_number}
              </span>
            )}
            {project?.qr_code_ids?.length > 0 && (
              <img width={140} src={project?.qr_code_ids[0]} alt="qr-code" />
            )}
          </div>
          {!isKorba && (
            <Button
              className="ghaith--donation-fav-btn ghaith--detail-fav-btn"
              shape="circle"
              onClick={() => {
                if (isConnected) {
                  if (project.category_id) {
                    validateAddOrRemove();
                  }
                } else {
                  setShowLogin(true);
                }
              }}
              icon={
                project.favorite ? (
                  <StarFilled style={{ fontSize: "28px", color: "#ff9800" }} />
                ) : (
                  <StarOutlined style={{ fontSize: "28px" }} />
                )
              }
            />
          )}
          {/* Title positioned to overlap the bottom of the image */}
          <div className="ghaith--card-details-project-title-wrapper">
            {project?.icon_image_ids?.length > 0 && (
              <img
                width={140}
                src={project?.icon_image_ids[0]}
                alt="icon"
                className="ghaith--card-details-project-icon"
              />
            )}
            <span className="ghaith--card-details-project-title">
              {projectName}
            </span>
          </div>
        </div>
        {/* New Row: Project Number and Social Icons */}
        <Row
          gutter={16}
          justify="space-between"
          align="middle"
          dir="rtl"
          className="ghaith--card-details-project-meta-row"
        >
          <Col xxl={12} xl={9} lg={12} md={9} sm={12} xs={24}>
            <div className="ghaith--card-details-project-number">
              {!isKorba && <span>رقم المشروع : {project?.name}</span>}
            </div>
          </Col>
          <Col
            xxl={12}
            xl={15}
            lg={12}
            md={15}
            sm={12}
            xs={24}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="ghaith--card-details-project-social">
              {/* Share button with native share API */}
              <button
                className="ghaith--card-details-project-social-btn"
                onClick={handleShare}
              >
                <ShareAltOutlined style={{ fontSize: "20px", color: "#333" }} />
              </button>

              {/* Facebook share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  generatedUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ghaith--card-details-project-social-btn"
              >
                <img src={facebookIcon} alt="facebook" />
              </a>

              {/* Twitter/X share */}
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                  shareText,
                )}&url=${encodeURIComponent(generatedUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ghaith--card-details-project-social-btn"
              >
                <img src={twitterIcon} alt="x" />
              </a>

              {/* WhatsApp share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${shareText}: ${generatedUrl}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ghaith--card-details-project-social-btn"
              >
                <img src={whatsappIcon} alt="whatsapp" />
              </a>

              {/* Email share */}
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  projectName || (isKorba ? "حالة" : "مشروع"),
                )}&body=${encodeURIComponent(`${shareText}: ${generatedUrl}`)}`}
                className="ghaith--card-details-project-social-btn"
              >
                <img src={envelopIcon} alt="email" />
              </a>

              {/* Copy link button */}
              <button
                className="ghaith--card-details-project-social-btn"
                onClick={handleCopyLink}
              >
                <img src={linkIcon} alt="link" />
              </button>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "2rem",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
          }}
          dir="rtl"
        >
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div
              className="ghaith--card-details-project-description"
              dangerouslySetInnerHTML={{ __html: project?.details || "" }}
            />
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "2rem",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
          }}
          dir="rtl"
        >
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            {/* Distribution Sites Section */}
            {project?.distribution_sites && (
              <div className="ghaith--card-details-project-distribution">
                <img
                  src={location}
                  alt="location"
                  className="ghaith--card-details-project-distribution-icon"
                />
                <span className="ghaith--card-details-project-distribution-label">
                  مواقع التوزيع:
                </span>
                <span className="ghaith--card-details-project-distribution-value">
                  {project.distribution_sites}
                </span>
              </div>
            )}
          </Col>
        </Row>{" "}
        {isKorba ||
          (!isKorba && project?.display_progress && (
            <div style={{ padding: "1.5rem" }}>
              <ProgressCard
                percent={project?.progress.toFixed(2)}
                percentPosition={{
                  align: "end",
                  type: "inner",
                }}
                size={["100%", 15]}
              />{" "}
            </div>
          ))}
        <AdditionalInfoSection
          targetAmount={
            isKorba ? project?.amount || 0 : project?.target_amount || 0
          }
          targetNumber={
            isKorba
              ? project?.amount_residual || 0
              : project?.target_number || 0
          }
          isKorba={isKorba}
        />
        <Row
          gutter={16}
          justify={isMobile ? "center" : "space-between"}
          style={{
            paddingTop: "2rem",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
          }}
        >
          <Col xxl={7} xl={7} lg={7} md={7} sm={22} xs={22}>
            <div className="ghaith--card-details-project-statistics ghaith--card-details-project-border-center">
              <div className="ghaith--card-details-project-statistics-title">
                <span>آخر تبرع</span>
                <img width={30} height={30} src={cursor} alt="card-details" />
              </div>
              <span>{project?.last_payment_period}</span>
            </div>
          </Col>
          <Col xxl={7} xl={7} lg={7} md={7} sm={22} xs={22}>
            <div className="ghaith--card-details-project-statistics ghaith--card-details-project-border-center">
              <div className="ghaith--card-details-project-statistics-title">
                <span>عدد الزيارات</span>
                <img width={30} height={30} src={click} alt="card-details" />
              </div>
              <span>{project?.visit_count}</span>
            </div>
          </Col>
          <Col xxl={7} xl={7} lg={7} md={7} sm={22} xs={22}>
            <div className="ghaith--card-details-project-statistics ghaith--card-details-project-border-left">
              <div className="ghaith--card-details-project-statistics-title">
                <span>عدد التبرعات</span>
                <img width={30} height={30} src={doc} alt="card-details" />
              </div>
              <span>{project?.donation_number}</span>
            </div>
          </Col>
        </Row>
      </div>{" "}
      <Login
        open={showLogin}
        handleClose={() => setShowLogin(false)}
        login_type="exterior_donor"
      />
    </>
  );
};

export default CardDetailsProgram;
