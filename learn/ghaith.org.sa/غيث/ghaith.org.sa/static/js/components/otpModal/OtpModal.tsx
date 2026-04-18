import ModalComponent from "../../bibilio/Modal/ModalComponent";
import { Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { InputOTP } from "antd-input-otp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import modalOtpAnimation from "../../assets/animations/OTP _ Mobile Notification.json";
import Lottie from "lottie-react";
import TransparentButton from "../../bibilio/Buttons/TransparentButton";
import {
  toRegenerateOtp,
  toVerifyOtp,
  toVerifyOtpBeneficiary,
  toRegenerateOtpBeneficiary,
} from "../../apis/actions/login.actions";
import { showNotification } from "../../apis/utils/utils";

interface OtpModalProps {
  onClose: () => void;
  open?: boolean;
  redirection?: any;
  model: string;
  mobile: string;
  to_register_beneficiary: boolean;
  access_token?: string;
}

const OtpModal = ({
  open,
  onClose,
  redirection,
  model,
  mobile,
  to_register_beneficiary,
  access_token,
}: OtpModalProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [isClickable, setIsClickable] = useState<boolean>(false);

  const { loading } = useSelector((state: RootState) => state.login);
  const [, setCookie] = useCookies(["apiKey", "role"]);
  const { res_ids, res_model } = useSelector(
    (state: RootState) => state.rating
  );

  /* verify otp handler */
  const handleVerifyOtp = async (model: string) => {
    const otp = form.getFieldValue("otp");
    if (
      !otp ||
      otp.length !== 4 ||
      !otp ||
      otp.includes(undefined) ||
      otp.includes("")
    )
      return form.setFields([
        {
          name: "otp",
          errors: ["الرجاء إدخال رمز التحقق"],
        },
      ]);
    else {
      const success = (await dispatch(
        toVerifyOtp({
          otp: `${otp[0]}${otp[1]}${otp[2]}${otp[3]}`,
          login: mobile,
        })
      )) as any;
      const verifyOtp = success?.payload?.data?.result;
      if (verifyOtp?.code === 200) {
        setCookie("apiKey", Object.values(verifyOtp)[0]);
        setCookie("role", model === "exterior_donor" ? "donor" : model);
        onClose();
        form.resetFields();
        if (redirection === "same_page") {
          window.location.reload();
        } else {
          navigate("/profile");
        }
      } else {
        showNotification(verifyOtp?.message, "error");
      }
    }
  };

  const handleVerifyOtpBeneficiary = async () => {
    const otp = form.getFieldValue("otp");
    if (
      !otp ||
      otp.length !== 4 ||
      !otp ||
      otp.includes(undefined) ||
      otp.includes("")
    )
      return form.setFields([
        {
          name: "otp",
          errors: ["الرجاء إدخال رمز التحقق"],
        },
      ]);
    else {
      const success = (await dispatch(
        toVerifyOtpBeneficiary({
          otp: `${otp[0]}${otp[1]}${otp[2]}${otp[3]}`,
          access_token: access_token,
        })
      )) as any;
      const verifyOtp = success?.payload?.data?.result;
      if (verifyOtp?.code === 200) {
        showNotification(verifyOtp?.message, "success", dispatch);
        onClose();
        navigate("/");
      } else {
        showNotification(verifyOtp?.message, "error");
      }
    }
  };

  /* regenerate otp handler */
  const handleRegenerateOtp = async () => {
    if (!isClickable) return;

    let success;

    if (to_register_beneficiary) {
      success = (await dispatch(
        toRegenerateOtpBeneficiary({
          id: res_ids[0], 
          res_model: res_model,
          mobile: mobile,
        })
      )) as any;
    } else {
      success = (await dispatch(
        toRegenerateOtp({
          mobile: mobile,
        })
      )) as any;
    }

    const regenerateOtp = success?.payload?.data?.result;
    if (regenerateOtp?.code === 200) {
      showNotification(regenerateOtp?.message, "success");
    } else {
      showNotification(regenerateOtp?.message, "error");
    }
    // Reset clickable state for another 2-minute delay
    setIsClickable(false);
    setTimeout(() => setIsClickable(true), 120000);
  };

  const handleAutoSubmit = (otp: string[]) => {
    if (to_register_beneficiary) {
      handleVerifyOtpBeneficiary();
    } else {
      handleVerifyOtp(model);
    }
  };

  useEffect(() => {
    setIsClickable(false);
    const timer = setTimeout(() => setIsClickable(true), 120000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ModalComponent
        width={500}
        title=""
        open={open}
        onClose={onClose}
        closeOnOutsideClick={true}
        className="ghaith--otp-modal"
        destroyOnClose
      >
        <div className="ghaith--otp-modal-content">
          <div className="ghaith--otp-modal-image-text">
            <Lottie
              style={{ width: "60%" }}
              animationData={modalOtpAnimation}
              loop={true}
            />
            <h3>رمز التحقق</h3>
            <span>لقد أرسلنا لك رمزاً على جوالك</span>
          </div>

          <div className="ghaith--otp-modal-input">
            <Form form={form}>
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Form.Item
                    name="otp"
                    rules={[
                      { required: true, message: "الرجاء إدخال رمز التحقق" },
                    ]}
                  >
                    <InputOTP 
                      autoFocus 
                      inputMode="tel" 
                      length={4}
                      autoSubmit={handleAutoSubmit}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="ghaith--otp-modal-footer">
            <span className="ghaith--otp-modal-text-footer">
              <button
                onClick={handleRegenerateOtp}
                disabled={!isClickable}
                className={`ghaith--regenerate-otp-btn ${
                  isClickable ? "clickable" : "disabled"
                }`}
              >
                إعادة المحاولة
              </button>
              لم أستلم الرمز ؟
            </span>
            <div>
              <TransparentButton
                className="ghaith--verify_otp_button"
                title="تحقق"
                onClick={() =>
                  to_register_beneficiary
                    ? handleVerifyOtpBeneficiary()
                    : handleVerifyOtp(model)
                }
                disabled={loading}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default OtpModal;