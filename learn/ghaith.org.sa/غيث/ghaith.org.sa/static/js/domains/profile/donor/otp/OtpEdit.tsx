import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import { Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { InputOTP } from "antd-input-otp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import modalOtpAnimation from "../../../../assets/animations/OTP _ Mobile Notification.json";
import Lottie from "lottie-react";
import TransparentButton from "../../../../bibilio/Buttons/TransparentButton";
import { showNotification } from "../../../../apis/utils/utils";
import {
  EditDonorInformations,
  toSendEditOtp,
} from "../../../../apis/actions/donor.actions";
import { toEditProfile } from "../../../../apis/actions/beneficiary.actions";

interface OtpEditModalProps {
  onClose: () => void;
  open?: boolean;
  mobile: string;
  changedData?: any;
  edit_type?: "donor" | "beneficiary";
}

const OtpEditModal = ({
  open,
  onClose,
  mobile,
  changedData,
  edit_type,
}: OtpEditModalProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [isClickable, setIsClickable] = useState<boolean>(false);

  const { loading } = useSelector((state: RootState) => state.login);
const [, removeCookie] = useCookies(["apiKey", "role"]);

  /* verify otp handler */
  const handleVerifyOtp = async () => {
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
        EditDonorInformations({
          otp: `${otp[0]}${otp[1]}${otp[2]}${otp[3]}`,
          ...changedData,
        })
      )) as any;
      const verifyOtp = success?.payload?.result;
      if (verifyOtp?.code === 200) {
        showNotification(verifyOtp?.message, "success");
        setTimeout(() => {
          removeCookie("apiKey", { path: "/" });
          navigate("/");
          onClose();
        }, 3000);

        form.resetFields();
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
        toEditProfile({
          otp: `${otp[0]}${otp[1]}${otp[2]}${otp[3]}`,
          ...changedData,
        })
      )) as any;
      const verifyOtp = success?.payload?.result;
      if (verifyOtp?.code === 200) {
        showNotification(verifyOtp?.message, "success");
        setTimeout(() => {
          removeCookie("apiKey", { path: "/" });
          navigate("/");
          onClose();
        }, 3000);

        form.resetFields();
      } else {
        showNotification(verifyOtp?.message, "error");
      }
    }
  };
  const handleRegenerateOtp = async () => {
    if (!isClickable) return;
    const success = (await dispatch(
      toSendEditOtp({
        mobile: mobile,
      })
    )) as any;

    const regenrateOtp = success?.payload?.data?.result;
    if (regenrateOtp?.code === 200) {
      showNotification(regenrateOtp?.message, "success");
    } else {
      showNotification(regenrateOtp?.message, "error");
    }
    setIsClickable(false);
    setTimeout(() => setIsClickable(true), 120000);
  };

  const handleAutoSubmit = (otp: string[]) => {
    if (edit_type === "beneficiary") {
      handleVerifyOtpBeneficiary();
    } else {
      handleVerifyOtp();
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
                onClick={
                  edit_type === "beneficiary"
                    ? handleVerifyOtpBeneficiary
                    : handleVerifyOtp
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

export default OtpEditModal;
