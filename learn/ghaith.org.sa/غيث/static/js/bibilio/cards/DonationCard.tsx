import React, { useState } from "react";
import { Button } from "antd";
import { ShareAltOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

import verifiedIcon from "../../assets/icons/verified.svg";
import completed from "../../assets/icons/completed.png";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../Modal/ModalComponent";
import ShareCases from "../../components/share/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import {
  addOrRemoveFavorite,
  getPrograms,
} from "../../apis/actions/program.actions";
import { showNotification } from "../../apis/utils/utils";
import { useCookies } from "react-cookie";
import Login from "../../domains/pages/auth/Login";

interface Tag {
  name: string;
  open: boolean;
  // Add other tag properties if needed
}

interface DonationCardProps {
  imageUrl: string;
  qrUrl: string;
  title: string;
  tags: Tag[];
  access_token: string;
  category_id: any;
  favorite?: boolean;
  type?: "programs" | "cases";
  isCompleted?: boolean;
}

const DonationCard: React.FC<DonationCardProps> = ({
  imageUrl,
  qrUrl,
  title,
  tags,
  access_token,
  category_id,
  favorite,
  type,
  isCompleted = false,
}) => {
  const navigate = useNavigate();
  const [activeShare, setActiveShare] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [cookies] = useCookies(["apiKey", "role"]);
  const [showLogin, setShowLogin] = useState(false);

  const isConnected = cookies?.apiKey ?? false;

  const generatedUrl = `${window.location.origin}/${
    type === "cases" ? "korba" : "program"
  }/${access_token}`;

  const handleDonateClick = () => {
    if (isCompleted) return;
    if (type === "programs") {
      navigate(`/program/${access_token}`, {
        state: {
          selectedShare: activeShare,
          partner_id: partner_id,
        },
      });
    } else {
      navigate(`/korba/${access_token}`, {
        state: {
          selectedShare: activeShare,
          partner_id: partner_id,
        },
      });
    }
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => {
    if (isCompleted) return;
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails,
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails,
  );
  const partner_id = beneficiaryDetails?.id || donorDetails?.id;
  const validateAddOrRemove = async () => {
    if (isCompleted) return;

    try {
      dispatch(addOrRemoveFavorite({ category_id: category_id })).then(
        (result: any) => {
          const request = result?.payload?.result;
          if (request?.code === 200) {
            showNotification(request?.message, "success");
            dispatch(getPrograms({ tag: "homepage", partner_id }));
          } else {
            showNotification(request?.message, "error");
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`ghaith--donation-card ${
        isCompleted ? "ghaith--donation-card--completed" : ""
      }`}
    >
      <div className="ghaith--donation-card__image-wrapper">
        <div className="ghaith--donation-card__image-container">
          <img
            src={imageUrl}
            alt={title}
            className="ghaith--donation-card__image"
            onClick={handleDonateClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Button
          className="ghaith--donation-card__share-btn"
          shape="circle"
          onClick={() => showModal()}
          disabled={isCompleted}
          icon={<ShareAltOutlined style={{ fontSize: "20px" }} />}
        />{" "}
        {type === "programs" && (
          <Button
            className="ghaith--donation-fav-btn"
            shape="circle"
            disabled={isCompleted}
            onClick={() => {
              if (isConnected) {
                if (category_id) {
                  validateAddOrRemove();
                }
              } else {
                setShowLogin(true);
              }
            }}
            icon={
              favorite ? (
                <StarFilled style={{ fontSize: "20px", color: "#ff9800" }} />
              ) : (
                <StarOutlined style={{ fontSize: "20px" }} />
              )
            }
          />
        )}
        <div className="ghaith--donation-card__footer">
          <h3
            className="ghaith--donation-card__title"
            style={{ cursor: isCompleted ? "not-allowed" : "pointer" }}
            onClick={handleDonateClick}
          >
            {title}
          </h3>

          <div className="ghaith--donation-card__qr-wrapper">
            <img
              src={qrUrl}
              alt="QR code"
              className="ghaith--donation-card__qr"
            />
          </div>
          <div className="ghaith--donation-card__safety-donate">
            <img src={verifiedIcon} alt="icon" className="safety-icon" />
            <span>تبرع بأمان</span>
          </div>
          <div className="ghaith--donation-card__safety-line">
            <span>الأسهم</span>
          </div>

          <div className="ghaith--donation-card__buttons">
            <Button
              type="primary"
              className="ghaith--donation-card__donate-btn"
              onClick={handleDonateClick}
              disabled={!activeShare || isCompleted}
            >
              ساهم الآن
            </Button>
            {activeShare?.amount ? (
              <Button
                style={{ direction: "ltr" }}
                type="primary"
                className="ghaith--donation-card__amount-btn icon-saudi_riyal"
                aria-readonly
                disabled={isCompleted}
              >
                {activeShare?.amount}
              </Button>
            ) : null}
            {tags?.map((tag, index) => (
              <Button
                key={index}
                className={`ghaith--donation-card__tag-btn ${
                  activeShare === tag
                    ? "ghaith--donation-card__tag-btn--active"
                    : ""
                }`}
                onClick={() => {
                  if (!isCompleted) {
                    setActiveShare(tag);
                  }
                }}
                disabled={isCompleted}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {isCompleted && (
        <img
          src={completed}
          className="ghaith--donation-card__completed-image"
          alt="completed"
        />
      )}
      <ModalComponent
        title=""
        open={isModalVisible}
        onClose={handleCloseModal}
        closeOnOutsideClick={true}
        width={400}
        modalStyle={{ top: "20%", minHeight: "20vh", height: "20vh" }}
        showCloseIcon={true}
      >
        <ShareCases
          url={generatedUrl}
          programName={title}
          isKorba={type === "cases" ? true : false}
        />
      </ModalComponent>{" "}
      <Login
        open={showLogin}
        handleClose={() => setShowLogin(false)}
        login_type="exterior_donor"
      />
    </div>
  );
};
export default DonationCard;
