import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import {
  Col,
  Row,
  Form,
  Checkbox,
  Button,
  Radio,
  ConfigProvider,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  convertFileToBase64,
  scroll,
  showNotification,
} from "../../../apis/utils/utils";
import UploadInput from "../../../bibilio/Inputs/UploadInput";
import CustomLabelSelect from "../../../components/select/CustomLabelSelect";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import NavBar from "../../commun/Navbar";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import {
  getCountries,
  getHealthState,
  getStates,
  ToRegisterBeneficiaryStep1,
  ToRegisterBeneficiaryStep2,
} from "../../../apis/actions/beneficiary.actions";
import { getFamilyStates } from "../../../apis/actions/beneficiary.actions";
import ar_EG from "antd/lib/locale/ar_EG";
import dayjs from "dayjs";
import HijriFeature from "../../../bibilio/Inputs/HijriFeature";
import OtpModal from "../../../components/otpModal/OtpModal";
import { setResIds, setResModel } from "../../../apis/slices/ratingSlice";
import PageContainer from "../../../components/container/PageContainer";

const AddActiveBeneficiary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);
  const [partnerType, setPartnerType] = useState<string>("identification");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [familyStateSelected, setFamilyStateSelected] = useState<number>(1);
  const [dynamicAttachmentsData, setDynamicAttachmentsData] = useState<any[]>(
    [],
  );
  const accessTokenRef = useRef<string>("");
  const currentRef = useRef<HTMLDivElement>(null);
  const handleCloseOtpModal = () => {
    setIsModalVisible(false);
    setIsSubmitDisabled(true);
  };

  const familyStates = useSelector(
    (state: RootState) => state?.beneficiary.familyStates,
  );
  const healthStates = useSelector(
    (state: RootState) => state?.beneficiary.healthState,
  );
  const states = useSelector((state: RootState) => state?.beneficiary.states);
  const countries = useSelector(
    (state: RootState) => state?.beneficiary.countries,
  );

  const selectedFamilyState = familyStates?.find(
    (state: any) => state.id === familyStateSelected,
  );
  const dynamicAttachments =
    selectedFamilyState?.beneficiary_attachments_inputs || [];
  useEffect(() => {
    dispatch(getFamilyStates());
    dispatch(getHealthState());
    dispatch(getStates());
    dispatch(getCountries());
  }, [dispatch]);

  const handleDateChange = (field: string) => (dateValue: any) => {
    form.setFieldsValue({
      [field]: dateValue,
    });
  };

  const handleFileChange = async (fileList: any[], fieldName: string) => {
    const file = fileList[0]?.originFileObj;
    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        const imageData = {
          filename: file.name,
          data: base64,
        };
        form2.setFieldsValue({
          [fieldName]: [imageData],
        });
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const handleDynamicFileChange = async (
    fileList: any[],
    attachmentId: number,
  ) => {
    const file = fileList[0]?.originFileObj;
    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        const imageData = {
          filename: file.name,
          data: base64,
          attachment_input_id: attachmentId,
        };

        setDynamicAttachmentsData((prev) => {
          const filtered = prev.filter(
            (att) => att.attachment_input_id !== attachmentId,
          );
          return [...filtered, imageData];
        });

        form2.setFieldsValue({
          [`dynamic_attachment_${attachmentId}`]: [imageData],
        });
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const validateStep1 = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const FormValues = form.getFieldsValue();
      setFamilyStateSelected(form.getFieldValue("family_state_id"));
      dispatch(ToRegisterBeneficiaryStep1(FormValues)).then((result: any) => {
        const request = result?.payload?.data?.result;
        if (request?.code === 200) {
          if (request?.access_token) {
            accessTokenRef.current = request.access_token;
          }
          setCurrentStep(2);
          setLoadingSend(false);
          scroll(currentRef);
        } else {
          showNotification(request?.message, "error");
          setLoadingSend(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoadingSend(false);
    }
  };
  const validateStep2 = async () => {
    try {
      await form2.validateFields();
      setLoadingSend(true);
      const FormValues = form2.getFieldsValue();

      const attachmentIds = dynamicAttachmentsData;
      const dataWithToken = {
        family_card_attachment_ids: FormValues.family_card_attachment_ids,
        salary_definition_attachment_ids:
          FormValues.salary_definition_attachment_ids,
        insurance_attachment_ids: FormValues.insurance_attachment_ids,
        bank_account_attachment_ids: FormValues.bank_account_attachment_ids,
        citizen_identification_attachment_ids:
          FormValues.citizen_identification_attachment_ids,
        id_card_attachment_ids: FormValues.id_card_attachment_ids,
        attachment_ids: attachmentIds, // All dynamic attachments in one array
        description_service: FormValues.description_service,
        access_token: accessTokenRef.current,
      };

      dispatch(ToRegisterBeneficiaryStep2(dataWithToken)).then(
        (result: any) => {
          const request = result?.payload?.data?.result;
          if (request?.code === 200) {
            setLoadingSend(false);
            dispatch(setResModel(request?.res_model));
            dispatch(setResIds([request?.res_id]));
            setIsModalVisible(true);
          } else {
            showNotification(request?.message, "error");
            setLoadingSend(false);
          }
        },
      );
    } catch (error) {
      console.log(error);
      setLoadingSend(false);
    }
  };
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - تسجيل مستفيد نشط" description="تسجيل مستفيد نشط">
        <NavBar variant="homePage" />
        <div
          className="ghaith--newsSection-title"
          style={{ marginTop: "9rem" }}
        >
          <h1>
            <span className="ghaith--donation-highlight">تسجيل </span>
            <span className="ghaith--donation-primary">مستفيد نشط</span>
          </h1>
        </div>

        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}
        >
          {/* Step 1 Form */}

          <Row gutter={[32, 32]} ref={currentRef}>
            <Col xxl={10} xl={10} lg={10} md={24} sm={24} xs={24}>
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "30px",
                  borderRadius: "12px",
                  direction: "rtl",
                }}
                className="gh--font-light"
              >
                <h3
                  style={{
                    color: "#009767",
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textAlign: "right",
                  }}
                >
                  الشروط
                </h3>
                <div
                  style={{ lineHeight: "2.2", fontSize: "16px", color: "#333" }}
                >
                  <p>1- أن يكون المتقدم/ة سعودي/ة الجنسية.</p>
                  <p>
                    2- في حال كان المتقدمة غير سعودية يشترط أن يكون الزوج سعودي
                    الجنسية.
                  </p>
                  <p>
                    3- أن يكون مقر إقامته الأصلي داخل نطاق الجمعية؛ وفي حال كان
                    المتقدم حديث السكن يشترط مضي ثلاثة أشهر على إقامته داخل نطاق
                    الجمعية.
                  </p>
                  <p>
                    4- يتم قبول المرأة كمستفيدة في حالة كونها مطلقة أو أرملة بعد
                    تقرير الباحث.
                  </p>
                  <p>
                    5- يتعهد مقدم الطلب بصحة البيانات المدخلة من خلال الموقع
                    الإلكتروني.
                  </p>
                  <p>
                    6- الموافقة على تفويض الجمعية أو من يمثلها بالاستفسار عن صحة
                    المعلومات في أي جهة ذات علاقة تراها الجمعية.
                  </p>
                </div>
              </div>
            </Col>
            {/* Form Section - Right Side on Large Screens */}{" "}
            {currentStep === 1 && (
              <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    direction: "rtl",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "40px",
                      direction: "rtl",
                    }}
                  >
                    <h2
                      style={{
                        color: "#009767",
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                      className="gh--font-light"
                    >
                      البيانات الأساسية
                    </h2>
                  </div>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={validateStep1}
                    style={{ direction: "rtl" }}
                  >
                    <Row gutter={[16, 8]}>
                      {/* Name */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="name"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>الاسم</span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelInput
                            label=""
                            placeholder="الاسم"
                            className="gh--add_beneficiary-input"
                          />
                        </Form.Item>
                      </Col>
                      {/* Mobile */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                            {
                              pattern: /^05\d{8}$/,
                              message:
                                "يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام",
                            },
                          ]}
                          name="mobile"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              رقم الجوال
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelInput
                            label=""
                            placeholder="05XXXXXXXX"
                            type="tel"
                            maxLength={10}
                            className="gh--add_beneficiary-input"
                          />
                        </Form.Item>
                      </Col>
                      {/* Saudi Checkbox */}
                      <Col span={24}>
                        <Form.Item
                          name="is_saudi"
                          valuePropName="checked"
                          style={{ marginBottom: "14px" }}
                        >
                          <Checkbox
                            style={{ fontSize: "16px" }}
                            className="ghaith--custom-checkbox"
                          >
                            <div className="ghaith--label-style gh--font-light">
                              <span>مواطن / زوجة سعودي</span>
                            </div>{" "}
                          </Checkbox>
                        </Form.Item>
                      </Col>
                      {/* Partner Type */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="partner_type"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              نوع الوثيقة
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                          initialValue="identification"
                        >
                          <Radio.Group
                            onChange={(e) => setPartnerType(e.target.value)}
                            style={{ width: "100%" }}
                          >
                            <Radio
                              value="identification"
                              className="ghaith--label-style gh--font-light"
                              style={{ fontSize: "16px" }}
                            >
                              هوية
                            </Radio>
                            <Radio
                              value="accommodation"
                              className="ghaith--label-style gh--font-light"
                              style={{ fontSize: "16px" }}
                            >
                              إقامة
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      {/* Identification or Accommodation Number */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name={
                            partnerType === "identification"
                              ? "identification_number"
                              : "accommodation_number"
                          }
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              {partnerType === "identification"
                                ? "رقم الهوية"
                                : "رقم الإقامة"}
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelInput
                            className="gh--add_beneficiary-input"
                            label=""
                            placeholder={
                              partnerType === "identification"
                                ? "رقم الهوية"
                                : "رقم الإقامة"
                            }
                          />
                        </Form.Item>
                      </Col>
                      {/* Family State */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="family_state_id"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              {" "}
                              الحالة الإجتماعية
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelSelect
                            label=""
                            placeholder="اختر الحالة"
                            options={familyStates}
                            allowClear={true}
                          />
                        </Form.Item>
                      </Col>{" "}
                      {/* Health State */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="health_state_id"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              الحالة الصحية
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelSelect
                            label=""
                            placeholder="اختر الحالة"
                            options={healthStates}
                            allowClear={true}
                          />
                        </Form.Item>
                      </Col>
                      {/* Birthday */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="birthday"
                          className="ghaith--label-inputs"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              تاريخ الميلاد
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <ConfigProvider locale={ar_EG} direction="rtl">
                            <HijriFeature
                              onChange={handleDateChange("birthday")}
                              maxDateGregorian={dayjs(new Date())}
                              maxDateHijri={dayjs(new Date()).toDate()}
                            />
                          </ConfigProvider>
                        </Form.Item>
                      </Col>{" "}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء إدخال الجنسية",
                            },
                          ]}
                          name="nationality_id"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              الجنسية{" "}
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelSelect
                            label=""
                            placeholder="اختر الجنسية"
                            options={countries}
                            allowClear={true}
                          />
                        </Form.Item>
                      </Col>
                      {/* State (City/Region) */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="state_id"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>المنطقة</span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelSelect
                            label=""
                            placeholder="اختر المنطقة"
                            options={states}
                            allowClear={true}
                          />
                        </Form.Item>
                      </Col>
                      {/* Address */}
                      <Col span={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="address"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>العنوان</span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelInput
                            className="gh--add_beneficiary-input"
                            label=""
                            placeholder="العنوان"
                          />
                        </Form.Item>
                      </Col>
                      {/* Family Salary */}
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          name="family_salary"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              دخل الأسرة
                            </span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <CustomLabelInput
                            label=""
                            placeholder="الدخل"
                            type="number"
                            className="gh--add_beneficiary-input"
                          />
                        </Form.Item>
                      </Col>
                      {/* Submit Button */}
                      <Col
                        span={24}
                        style={{ textAlign: "center", marginTop: "20px" }}
                      >
                        <Button
                          loading={loadingSend}
                          disabled={loadingSend}
                          type="primary"
                          htmlType="submit"
                          style={{
                            fontSize: "18px",
                            width: "180px",
                            height: "45px",
                            borderRadius: "8px",
                          }}
                          className="ghaith--login-button ghaith--donate-button"
                        >
                          التــــــــالي
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            )}
            {/* Step 2 Placeholder */}
            {currentStep === 2 && (
              <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    direction: "rtl",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "40px",
                      direction: "rtl",
                    }}
                  >
                    <h2
                      style={{
                        color: "#009767",
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                      className="gh--font-light"
                    >
                      المرفقات
                    </h2>
                  </div>{" "}
                  <Form
                    form={form2}
                    layout="vertical"
                    onFinish={validateStep2}
                    style={{ direction: "rtl" }}
                  >
                    {" "}
                    <Row gutter={[16, 8]}>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="family_card_attachment_ids"
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          labelCol={{ className: "ghaith--label-style" }}
                          style={{ marginBottom: "14px" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              صورة من كرت العائلة
                            </span>
                          }
                          className="ghaith--label-inputs"
                        >
                          <UploadInput
                            text="إرفق من هنا"
                            icon={<UploadOutlined />}
                            multiple={false}
                            onChange={(fileList) =>
                              handleFileChange(
                                fileList,
                                "family_card_attachment_ids",
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="salary_definition_attachment_ids"
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          labelCol={{ className: "ghaith--label-style" }}
                          style={{ marginBottom: "14px" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              صورة من التعريف بالراتب
                            </span>
                          }
                          className="ghaith--label-inputs"
                        >
                          <UploadInput
                            text="إرفق من هنا"
                            icon={<UploadOutlined />}
                            multiple={false}
                            onChange={(fileList) =>
                              handleFileChange(
                                fileList,
                                "salary_definition_attachment_ids",
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="insurance_attachment_ids"
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          labelCol={{ className: "ghaith--label-style" }}
                          style={{ marginBottom: "14px" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              صورة من التعريف بدخل الضمان الاجتماعي
                            </span>
                          }
                          className="ghaith--label-inputs"
                        >
                          <UploadInput
                            text="إرفق من هنا"
                            icon={<UploadOutlined />}
                            multiple={false}
                            onChange={(fileList) =>
                              handleFileChange(
                                fileList,
                                "insurance_attachment_ids",
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="bank_account_attachment_ids"
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          labelCol={{ className: "ghaith--label-style" }}
                          style={{ marginBottom: "14px" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              صورة من الحساب البنكي(آيبان)على مطبوعات البنك
                            </span>
                          }
                          className="ghaith--label-inputs"
                        >
                          <UploadInput
                            text="إرفق من هنا"
                            icon={<UploadOutlined />}
                            multiple={false}
                            onChange={(fileList) =>
                              handleFileChange(
                                fileList,
                                "bank_account_attachment_ids",
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="citizen_identification_attachment_ids"
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          labelCol={{ className: "ghaith--label-style" }}
                          style={{ marginBottom: "14px" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              صورة من بطاقة الأحوال{" "}
                            </span>
                          }
                          className="ghaith--label-inputs"
                        >
                          <UploadInput
                            text="إرفق من هنا"
                            icon={<UploadOutlined />}
                            multiple={false}
                            onChange={(fileList) =>
                              handleFileChange(
                                fileList,
                                "citizen_identification_attachment_ids",
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="id_card_attachment_ids"
                          rules={[
                            {
                              required: true,
                              message: "الرجاء تعبئة الحقل",
                            },
                          ]}
                          labelCol={{ className: "ghaith--label-style" }}
                          style={{ marginBottom: "14px" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>
                              صورة من التعريف بحساب المواطن{" "}
                            </span>
                          }
                          className="ghaith--label-inputs"
                        >
                          <UploadInput
                            text="إرفق من هنا"
                            icon={<UploadOutlined />}
                            multiple={false}
                            onChange={(fileList) =>
                              handleFileChange(
                                fileList,
                                "id_card_attachment_ids",
                              )
                            }
                          />
                        </Form.Item>
                      </Col>{" "}
                      {dynamicAttachments.map((attachment: any) => (
                        <Col
                          key={attachment.id}
                          xxl={12}
                          xl={12}
                          lg={12}
                          md={12}
                          sm={24}
                          xs={24}
                        >
                          <Form.Item
                            name={`dynamic_attachment_${attachment.id}`}
                            rules={[
                              {
                                required: attachment.is_required,
                                message: "الرجاء تعبئة الحقل",
                              },
                            ]}
                            labelCol={{ className: "ghaith--label-style" }}
                            style={{ marginBottom: "14px" }}
                            label={
                              <span style={{ marginBottom: "8px" }}>
                                {attachment.name}
                                {attachment.is_required && " *"}
                              </span>
                            }
                            className="ghaith--label-inputs"
                          >
                            <UploadInput
                              text="إرفق من هنا"
                              icon={<UploadOutlined />}
                              multiple={false}
                              onChange={(fileList) =>
                                handleDynamicFileChange(fileList, attachment.id)
                              }
                            />
                          </Form.Item>
                        </Col>
                      ))}
                      <Col span={24}>
                        <Form.Item
                          name="description_service"
                          labelCol={{ className: "ghaith--label-style" }}
                          label={
                            <span style={{ marginBottom: "8px" }}>ملاحظة</span>
                          }
                          style={{ marginBottom: "14px" }}
                        >
                          <div style={{ marginTop: "8px" }}>
                            <TextArea
                              className="ghaith--textarea-input"
                              rows={2}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                      <Col
                        span={24}
                        style={{ textAlign: "center", marginTop: "20px" }}
                      >
                        <Button
                          loading={loadingSend}
                          disabled={loadingSend || isSubmitDisabled}
                          type="primary"
                          htmlType="submit"
                          style={{
                            fontSize: "18px",
                            width: "180px",
                            height: "45px",
                            borderRadius: "8px",
                          }}
                          className="ghaith--login-button ghaith--donate-button"
                        >
                          إرســــــــال
                        </Button>
                      </Col>{" "}
                    </Row>
                  </Form>
                </div>
              </Col>
            )}
          </Row>
        </div>
        <OtpModal
          open={isModalVisible}
          onClose={handleCloseOtpModal}
          mobile={form.getFieldValue("mobile")}
          model={"beneficiary"}
          redirection={"profile"}
          to_register_beneficiary={true}
          access_token={accessTokenRef.current}
        />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default AddActiveBeneficiary;
