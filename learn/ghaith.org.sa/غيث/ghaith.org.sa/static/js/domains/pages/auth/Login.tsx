import React, { useState, useEffect } from "react";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import { Button, Alert, Row, Col, Form } from "antd";
import switchBeneficiaryImage from "../../../assets/images/login/switchBeneficiaryImage.png";
import switchDonorImage from "../../../assets/images/login/switchDonorImage.png";
import GhaithPasswordSvg from "../../../assets/icons/GhaithPassword.svg";
import DonorSvg from "../../../assets/icons/donorSvg.svg";
import BeneficiarySvg from "../../../assets/icons/beneficiarySvg.svg";
import ReCAPTCHA from "react-google-recaptcha";
import OtpModal from "../../../components/otpModal/OtpModal";
import RegisterDonor from "./RegisterDonor";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import {
  toLoginBeneficiary,
  toLoginDonor,
} from "../../../apis/actions/login.actions";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  open: boolean;
  handleClose: () => void;
  onOpenLogin?: () => void;
  login_type: "general" | "exterior_donor" | "exterior_beneficiary";
}

const Login = ({ open, handleClose, onOpenLogin, login_type }: LoginProps) => {
  const [view, setView] = useState<
    | "selection"
    | "beneficiary"
    | "donor"
    | "exterior_donor"
    | "exterior_beneficiary"
  >("selection");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [IsCaptchaValidated, setIsCaptchaValidated] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [form] = Form.useForm();
  const [mobileFieldValid, setMobileFieldValid] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state?.login);

  // Countdown timer effect
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev > 1) {
            const newTime = prev - 1;
            setTimeRemaining(formatTime(newTime));
            return newTime;
          } else {
            clearInterval(timer);
            return null;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Clear error when countdown ends
  useEffect(() => {
    if (countdown == null) {
      setDisplayError("");
    }
  }, [countdown]);

  useEffect(() => {
    if (login_type === "exterior_donor") {
      setView("exterior_donor");
    }
    if (login_type === "exterior_beneficiary") {
      setView("exterior_beneficiary");
    }
  }, [login_type, view]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const handleCloseOtpModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenRegister = () => {
    //setIsTransitioning(true);
    setTimeout(() => {
      setIsRegisterVisible(true);
      //   handleClose();
      setIsTransitioning(false);
    }, 200);
  };

  const handleCloseRegister = () => {
    setIsRegisterVisible(false);
  };

  const handleBackToLogin = () => {
    setIsRegisterVisible(false);
    setView("donor");
    setPhoneNumber("");
    setIsCaptchaValidated(false);
    setDisplayError("");
    setCountdown(null);
    setMobileFieldValid(false);
    form.resetFields();
    // Reopen the login modal programmatically
    setTimeout(() => {
      if (onOpenLogin) {
        onOpenLogin();
      }
    }, 250);
  };

  const handleUserTypeSelect = (userType: "beneficiary" | "donor") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView(userType);
      setIsTransitioning(false);
    }, 200);
  };

  const handleFormChange = () => {
    setDisplayError("");

    // Validate only the mobile field
    form
      .validateFields(["mobile"])
      .then(() => {
        setMobileFieldValid(true);
      })
      .catch(() => {
        setMobileFieldValid(false);
      });
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setPhoneNumber("");
    setIsCaptchaValidated(false);
    setDisplayError("");
    setCountdown(null);
    setMobileFieldValid(false);
    setTimeout(() => {
      setView("selection");
      form.resetFields();
      setIsTransitioning(false);
    }, 200);
  };

  const handleModalClose = () => {
    if (
      view === "selection" ||
      view === "exterior_donor" ||
      view === "exterior_beneficiary"
    ) {
      handleClose();
    } else {
      handleBack();
    }
  };

  // Reset to selection view when modal closes
  useEffect(() => {
    if (!open && login_type === "general") {
      setView("selection");
    }
    setPhoneNumber("");
    setCountdown(null);
    setDisplayError("");
    setMobileFieldValid(false);
  }, [open, login_type]);

  const handleLogin = async () => {
    try {
      setDisplayError("");
      setCountdown(null);
      await form.validateFields();
      const mobile = form.getFieldsValue();

      // Dynamically choose login action based on current view
      const loginAction =
        view === "beneficiary" ? toLoginBeneficiary : toLoginDonor;

      const success = (await dispatch(loginAction(mobile))) as any;
      const login = success?.payload?.data?.result;

      if (login?.code === 200) {
        setIsModalVisible(true);
      } else {
        const messageTime = login?.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0];
        if (messageTime) {
          const [hours, minutes, seconds] = messageTime.split(":").map(Number);
          const targetTime = dayjs()
            .hour(hours)
            .minute(minutes)
            .second(seconds);
          const now = dayjs();
          let diffInSeconds = targetTime.diff(now, "second");

          if (diffInSeconds < 0) {
            diffInSeconds = targetTime.add(1, "day").diff(now, "second");
          }

          if (diffInSeconds > 0) {
            setCountdown(diffInSeconds);
            setTimeRemaining(formatTime(diffInSeconds));
          }
        }

        setDisplayError(
          messageTime
            ? login?.message
                ?.replace(messageTime, "")
                .replace(/الساعة\s*$/, "")
                .trim()
            : login?.message
              ? login?.message
              : "... الرجاء الإنتظار قليلا",
        );
      }
    } catch (error) {
      setDisplayError("... الرجاء الإنتظار قليلا");
    }
  };

  const renderSelectionView = () => (
    <div className="ghaith--login-form-wrapper">
      {/* Header with Icon - White Background */}
      <div className="ghaith--login-form-header">
        <div className="ghaith--login-form-icon">
          <img src={GhaithPasswordSvg} alt="تسجيـــــــل" />
        </div>
        <h2 className="ghaith--login-form-title">تسجيـــــــل الدخـــــــول</h2>
      </div>

      {/* Selection Cards - Light Green Background */}
      <div className="ghaith--login-selection-body">
        <div className="ghaith--login-cards">
          <div
            className="ghaith--login-card"
            onClick={() => handleUserTypeSelect("donor")}
          >
            <div className="ghaith--login-card-image">
              <img src={switchBeneficiaryImage} alt="المتبرعين" />
            </div>
            <h3 className="ghaith--login-card-title">المـــــــــتبرعين</h3>
          </div>
          <div
            className="ghaith--login-card"
            onClick={() => handleUserTypeSelect("beneficiary")}
          >
            <div className="ghaith--login-card-image">
              <img src={switchDonorImage} alt="المستفيدين" />
            </div>
            <h3 className="ghaith--login-card-title">المـــــــــستفيدين</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBeneficiaryForm = () => (
    <div className="ghaith--login-form-wrapper">
      {/* Header with Icon - White Background */}
      <div className="ghaith--login-form-header">
        <div className="ghaith--login-form-icon">
          <img src={BeneficiarySvg} alt="مستفيد" />
        </div>
        <h2 className="ghaith--login-form-title">دخول حساب مستفيد</h2>
      </div>

      {/* Form Section - Light Green Background */}
      <div className="ghaith--login-form-body">
        <Form form={form} onChange={handleFormChange} layout="vertical">
          {displayError !== "" && (
            <Row gutter={16} className="ghaith--login-error-wrapper">
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Alert
                  message={
                    <div className="ghaith--login-error-message">
                      <span>{displayError}</span>
                      {countdown !== null && <span> {timeRemaining}</span>}
                    </div>
                  }
                  type="error"
                  onClose={() => setDisplayError("")}
                />
              </Col>
            </Row>
          )}

          {/* Form */}
          <div className="ghaith--login-form-inputs">
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "رقم الجوال مطلوب",
                },
                {
                  pattern: /^05\d{8}$/,
                  message: "يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام",
                },
              ]}
              className="ghaith--label-inputs"
            >
              <CustomLabelInput
                label=" ادخال رقم الجوال"
                placeholder="05XXXXXXXX"
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Item>
          </div>
        </Form>
        <div className="ghaith--recaptcha-container">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY ?? ""}
            onChange={(c: any) =>
              c ? setIsCaptchaValidated(true) : setIsCaptchaValidated(false)
            }
            hl="ar"
          />
        </div>
        {/* Login Button */}
        <Button
          type="primary"
          onClick={handleLogin}
          block
          className="ghaith--login-button"
          disabled={!IsCaptchaValidated || loading || !mobileFieldValid}
          loading={loading}
        >
          المتـــــــــــــابعة
        </Button>

        {/* Footer Link */}
        <div
          className="ghaith--login-form-footer"
          style={{ marginTop: "1rem" }}
        >
          و في حال أي إستفسارأو إشكال نرجو التواصل مع{" "}
          <a href="#" className="ghaith--login-form-link">
            خدمة المستفيدين
          </a>
        </div>
      </div>
    </div>
  );

  const renderDonorForm = () => (
    <div className="ghaith--login-form-wrapper">
      {/* Header with Icon - White Background */}
      <div className="ghaith--login-form-header">
        <div className="ghaith--login-form-icon">
          <img src={DonorSvg} alt="متبرع" />
        </div>
        <h2 className="ghaith--login-form-title">دخول حساب متبرع</h2>
      </div>

      {/* Form Section - Light Green Background */}
      <div className="ghaith--login-form-body">
        <Form form={form} onChange={handleFormChange} layout="vertical">
          {displayError !== "" && (
            <Row gutter={16} className="ghaith--login-error-wrapper">
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Alert
                  message={
                    <div className="ghaith--login-error-message">
                      <span>{displayError}</span>
                      {countdown !== null && <span> {timeRemaining}</span>}
                    </div>
                  }
                  type="error"
                  onClose={() => setDisplayError("")}
                />
              </Col>
            </Row>
          )}
          {/* Form */}
          <div className="ghaith--login-form-inputs">
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "رقم الجوال مطلوب",
                },
                {
                  pattern: /^05\d{8}$/,
                  message: "يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام",
                },
              ]}
              className="ghaith--label-inputs"
            >
              <CustomLabelInput
                label="فضلاً: ادخال رقم الجوال"
                placeholder="05XXXXXXXX"
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Item>
          </div>
        </Form>

        <div className="ghaith--recaptcha-container">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY ?? ""}
            onChange={(c: any) =>
              c ? setIsCaptchaValidated(true) : setIsCaptchaValidated(false)
            }
            hl="ar"
          />
        </div>
        {/* Login Button */}
        <Button
          disabled={loading || !IsCaptchaValidated || !mobileFieldValid}
          loading={loading}
          type="primary"
          onClick={handleLogin}
          block
          className="ghaith--login-button"
        >
          المتـــــــــــــابعة
        </Button>

        {/* Footer Links */}
        <div
          className="ghaith--login-form-footer"
          style={{ marginTop: "1rem" }}
        >
          ليس لديك حساب؟{" "}
          <a
            href="#"
            className="ghaith--login-form-link"
            onClick={(e) => {
              e.preventDefault();
              handleOpenRegister();
            }}
          >
            تسجيل
          </a>
        </div>

        <div
          className="ghaith--login-form-footer"
          style={{ marginTop: "0.5rem" }}
        >
          في حال أي إستفسار نرجو التواصل مع{" "}
          <a href="#" className="ghaith--login-form-link">
            خدمة المتبرعين
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ModalComponent
        title=""
        open={open}
        onClose={handleModalClose}
        width={view === "selection" ? 500 : 450}
        modalStyle={{ top: 200 }}
        closeOnOutsideClick
        showCloseIcon={false}
        className="ghaith--login-modal"
        modalRender={(node) => (
          <div style={{ pointerEvents: "auto" }}>
            {node}
            {view === "selection" && (
              <div
                className="ghaith--login-external-titles registration--footer-title"
                style={{ pointerEvents: "auto" }}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate("/general-projects");
                    handleClose();
                  }}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  المزيد من المشاريع
                </span>
                <span className="ghaith--login-separator">|</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate("/");
                    handleClose();
                  }}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  العودة للرئيسية
                </span>
              </div>
            )}
          </div>
        )}
      >
        <div
          className={`ghaith--login-transition ${
            isTransitioning ? "ghaith--login-transition-active" : ""
          }`}
        >
          {view === "selection" && renderSelectionView()}
          {view === "beneficiary" && renderBeneficiaryForm()}
          {view === "donor" && renderDonorForm()}
          {view === "exterior_donor" && renderDonorForm()}{" "}
          {view === "exterior_beneficiary" && renderBeneficiaryForm()}
        </div>
      </ModalComponent>

      <OtpModal
        open={isModalVisible}
        onClose={handleCloseOtpModal}
        mobile={phoneNumber}
        model={view}
        redirection={login_type === "exterior_donor" ? "same_page" : "profile"}
        to_register_beneficiary={false}
      />

      <RegisterDonor
        open={isRegisterVisible}
        handleClose={handleCloseRegister}
        onBackToLogin={handleBackToLogin}
        redirectionRegister={
          login_type === "exterior_donor" ? "same_page" : "profile"
        }
      />
    </>
  );
};

export default Login;
