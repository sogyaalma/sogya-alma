import React, { useEffect, useState } from "react";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import { Button, Alert, Row, Col, Form, ConfigProvider } from "antd";
import DonorSvg from "../../../assets/icons/donorSvg.svg";
import ReCAPTCHA from "react-google-recaptcha";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import CustomLabelSelect from "../../../components/select/CustomLabelSelect";
import { getProgramTypes } from "../../../apis/actions/donor.actions";
import { toRegisterDonor } from "../../../apis/actions/login.actions";
import dayjs from "dayjs";
import InputDate from "../../../bibilio/Inputs/InputDate";
import ar_EG from "antd/lib/locale/ar_EG";
import { showNotification } from "../../../apis/utils/utils";
import OtpModal from "../../../components/otpModal/OtpModal";

interface RegisterDonorProps {
  open: boolean;
  handleClose: () => void;
  onBackToLogin: () => void;
  redirectionRegister: any;
}

const RegisterDonor = ({
  open,
  handleClose,
  onBackToLogin,
  redirectionRegister,
}: RegisterDonorProps) => {
  const [isCaptchaValidated, setIsCaptchaValidated] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const genderOptions = [
    { id: "male", name: "ذكر" },
    { id: "female", name: "أنثى" },
  ];

  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state?.login);
  const { programTypes } = useSelector((state: RootState) => state?.donor);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const handleDateFieldChange = (field: string, e: any) => {
    form.setFieldsValue({ [field]: dayjs(e).format("YYYY-MM-DD") });
  };

  // Reset all state when modal closes
  const resetModalState = () => {
    form.resetFields();
    setIsCaptchaValidated(false);
    setDisplayError("");
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleModalClose = () => {
    resetModalState();
    handleClose();
  };

  const disabledDate = (current: any) => {
    return current && current >= dayjs().startOf("day");
  };

  const handleBackToLoginClick = () => {
    setTimeout(() => {
      resetModalState();
      handleClose();
      onBackToLogin();
    }, 200);
  };

  const handleCloseOtpModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getProgramTypes());
  }, [dispatch]);

  useEffect(() => {
    if (!open) {
      resetModalState();
    }
  }, [open]);

  const handleRegister = async () => {
    try {
      setDisplayError("");
      await form.validateFields();
      const formData = form.getFieldsValue();
      const success = (await dispatch(toRegisterDonor(formData))) as any;
      const register = success?.payload?.data?.result;

      if (register?.code === 200) {
        setIsModalVisible(true);
      } else {
        showNotification(register?.message, "error");
      }
    } catch (error) {}
  };

  return (
    <>
      <ModalComponent
        title=""
        open={open}
        onClose={handleModalClose}
        width={700}
        modalStyle={{ top: 50, marginBottom: "2rem" }}
        closeOnOutsideClick
      >
        <div style={{ padding: "10px", direction: "rtl" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ marginBottom: "15px" }}>
              <img
                src={DonorSvg}
                alt="تسجيل متبرع جديد"
                style={{ height: "48px" }}
              />
            </div>
            <h2
              style={{
                color: "#009767",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              className="gh--font-light"
            >
              تسجيل بيانات متبرع جديد
            </h2>
            <p
              style={{ color: "#666", fontSize: "15px" }}
              className="gh--font-light"
            >
              انضم إلينا لتكون جزءاً من رحلة العطاء
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onChange={() => setDisplayError("")}
            style={{ direction: "rtl" }}
          >
            {displayError !== "" && (
              <Row gutter={16} style={{ marginBottom: "8px" }}>
                <Col span={24}>
                  <Alert
                    message={displayError}
                    type="error"
                    onClose={() => setDisplayError("")}
                  />
                </Col>
              </Row>
            )}

            <Row gutter={[16, 8]}>
              {/* First Name */}
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                  label={
                    <span style={{ marginBottom: "8px" }}>الاسم الأول</span>
                  }
                  style={{ marginBottom: "14px" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>

              {/* Family Name */}
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="family_name"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                  label={
                    <span style={{ marginBottom: "8px" }}>اسم العائلة</span>
                  }
                  style={{ marginBottom: "14px" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>

              {/* Mobile */}
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                    {
                      len: 10,
                      message: "يجب أن يتكون رقم الهاتف من 10 أرقام",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                  label={
                    <span style={{ marginBottom: "8px" }}>رقم الجوال</span>
                  }
                  style={{ marginBottom: "8px" }}
                >
                  <CustomLabelInput
                    label=""
                    placeholder="05XXXXXXXX"
                    type="tel"
                    maxLength={10}
                  />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "البريد الإلكتروني غير صحيح",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                  label={
                    <span style={{ marginBottom: "8px" }}>
                      البريد الإلكتروني
                    </span>
                  }
                  style={{ marginBottom: "8px" }}
                >
                  <CustomLabelInput
                    label=""
                    placeholder="example@company.com"
                    type="email"
                  />
                </Form.Item>
              </Col>

              {/* Birthday */}
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="birthday"
                  labelCol={{ className: "ghaith--label-style" }}
                  label={
                    <span style={{ marginBottom: "8px" }}>تاريخ الميلاد</span>
                  }
                  style={{ marginBottom: "8px" }}
                  className="ghaith--label-inputs"
                >
                  <ConfigProvider locale={ar_EG} direction="rtl">
                    <InputDate
                      placeholder="تاريخ الميلاد"
                      onChange={(e) => handleDateFieldChange("birthday", e)}
                      disabledDate={disabledDate}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>

              {/* Gender */}
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                  label={<span style={{ marginBottom: "8px" }}>الجنس</span>}
                  style={{ marginBottom: "8px" }}
                >
                  <CustomLabelSelect
                    label=""
                    allowClear
                    options={genderOptions}
                  />
                </Form.Item>
              </Col>

              {/* Program Types */}
              <Col span={24}>
                <Form.Item
                  name="program_type_ids"
                  labelCol={{ className: "ghaith--label-style" }}
                  label={<span style={{ marginBottom: "8px" }}>المفضلة</span>}
                  style={{ marginBottom: "8px" }}
                >
                  <CustomLabelSelect
                    className="ghaith--multiple-select"
                    label=""
                    placeholder="أختر المجالات التي تفضلها"
                    allowClear
                    options={programTypes}
                    mode="multiple"
                  />
                </Form.Item>
              </Col>

              {/* ReCAPTCHA */}
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY ?? ""}
                    onChange={(c: any) =>
                      c
                        ? setIsCaptchaValidated(true)
                        : setIsCaptchaValidated(false)
                    }
                    hl="ar"
                  />
                </div>
              </Col>

              {/* Submit Button */}
              <Col span={24} style={{ textAlign: "end" }}>
                <Button
                  disabled={loading || !isCaptchaValidated}
                  loading={loading}
                  type="primary"
                  style={{
                    fontSize: "18px",
                    width: "120px",
                    borderRadius: "6px",
                  }}
                  className="ghaith--login-button ghaith--donate-button"
                  onClick={handleRegister}
                >
                  المتــــــــــابعة
                </Button>
              </Col>

              {/* Footer Link */}
              <Col span={24}>
                <div
                  className="ghaith--login-form-footer"
                  style={{ marginTop: "1rem" }}
                >
                  هل لديك حساب؟{" "}
                  <a
                    href="#"
                    className="ghaith--login-form-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBackToLoginClick();
                    }}
                  >
                    تسجيل الدخول
                  </a>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </ModalComponent>

      <OtpModal
        open={isModalVisible}
        onClose={handleCloseOtpModal}
        mobile={form.getFieldValue("mobile")}
        model={"donor"}
        redirection={redirectionRegister}
        to_register_beneficiary={false}
      />
    </>
  );
};

export default RegisterDonor;
