import { Form, Row, Col, Button, ConfigProvider } from "antd";
import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { useState } from "react";
import InputDate from "../../../../bibilio/Inputs/InputDate";
import ar_EG from "antd/lib/locale/ar_EG";

import { showNotification } from "../../../../apis/utils/utils";
import dayjs from "dayjs";
import { toEditProfile } from "../../../../apis/actions/beneficiary.actions";
import CustomLabelInput from "../../../../bibilio/Inputs/CustomLabelInput";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void; // Optional callback on successful addition
}

const KINSHIP_OPTIONS = [
  { id: "father", name: "أب" },
  { id: "mother", name: "أم" },
  { id: "son", name: "إبن" },
  { id: "daughter", name: "إبنة" },
  { id: "wife_husband", name: "زوج(ة)" },
  { id: "sister", name: "أخت" },
  { id: "brother", name: "أخ" },
  { id: "grandfather", name: "جد" },
  { id: "grandmother", name: "جدة" },
  { id: "other", name: "أخرى" },
];

const GENDER_OPTIONS = [
  { id: "male", name: "ذكر" },
  { id: "female", name: "أنثى" },
];

const AddFamilyMemberModal = ({
  isModalVisible,
  setIsModalVisible,
  onSuccess,
}: Props) => {
  const [form] = Form.useForm();
  const [loadingSend, setLoadingSend] = useState(false);

  const { academicLevels, educationMode, healthState, countries } = useSelector(
    (state: RootState) => state?.beneficiary
  );
  const familyStates = useSelector(
    (state: RootState) => state?.beneficiary.familyStates
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleDateFieldChange = (field: string, e: any) => {
    form.setFieldsValue({ [field]: dayjs(e).format("YYYY-MM-DD") });
  };

  const validateMember = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const formValues = form.getFieldsValue();

      // Prepare the member object in the format expected by the API
      const memberData = {
        name: formValues.name,
        identification_number: formValues.identification_number,
        kinship: formValues.kinship,
        gender: formValues.gender,
        mobile: formValues.mobile,
        birthday: formValues.birthday,
        ...(formValues.nationality_id && {
          nationality_id: formValues.nationality_id,
        }),
        ...(formValues.health_state_id && {
          health_state_id: formValues.health_state_id,
        }),
        ...(formValues.academic_level_id && {
          academic_level_id: formValues.academic_level_id,
        }),
        ...(formValues.family_state_id && {
          family_state_id: formValues.family_state_id,
        }),
        ...(formValues.education_mode_id && {
          education_mode_id: formValues.education_mode_id,
        }),
        ...(formValues.job && { job: formValues.job }),
        // No ID field - this indicates it's a new member
      };

      // Prepare the API payload with the new member in member_ids array
      const apiPayload = {
        member_ids: [memberData], // Send as array with one member
      };

      dispatch(toEditProfile(apiPayload))
        .then((result: any) => {
          const response = result?.payload?.result;
          if (response?.code === 200) {
            showNotification("تم إضافة الفرد  الجديد بنجاح", "success");

            form.resetFields();
            setIsModalVisible(false);

            if (onSuccess) {
              onSuccess();
            }
          } else {
            showNotification(
              response?.message || "حدث خطأ أثناء إضافة الفرد",
              "error"
            );
          }
          setLoadingSend(false);
        })
        .catch((error) => {
          console.error("API error:", error);
          showNotification("حدث خطأ في الاتصال بالخادم", "error");
          setLoadingSend(false);
        });
    } catch (error) {
      console.log("Validation error:", error);
      showNotification("يرجى تعبئة جميع الحقول المطلوبة", "error");
      setLoadingSend(false);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={handleClose}
      closeOnOutsideClick={true}
      width={800}
      centered={true}
      modalStyle={{ top: -200 }}
    >
      <div style={{ padding: "20px", direction: "rtl" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2
            style={{
              color: "#009767",
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
            className="gh--font-light"
          >
            إضافة فرد جديد للأسرة
          </h2>
          <p
            style={{ color: "#666", fontSize: "14px" }}
            className="gh--font-light"
          >
            الرجاء تعبئة البيانات الأساسية للفرد الجديد
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={validateMember}
          style={{ direction: "rtl" }}
        >
          <Row gutter={[16, 8]}>
            {/* Name - Required */}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء إدخال الاسم",
                  },
                ]}
                name="name"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>الاسم الكامل</span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelInput
                  label=""
                  placeholder="أدخل الاسم الكامل"
                  className="ghaith--input-style"
                />
              </Form.Item>
            </Col>
            {/* Identification Number - Required */}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء إدخال رقم الهوية",
                  },
                ]}
                name="identification_number"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>رقم الهوية</span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelInput
                  label=""
                  placeholder="أدخل رقم الهوية"
                  className="ghaith--input-style"
                />
              </Form.Item>
            </Col>
            {/* Kinship - Required */}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء اختيار العلاقة",
                  },
                ]}
                name="kinship"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>العلاقة</span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر العلاقة"
                  options={KINSHIP_OPTIONS}
                  allowClear={false}
                />
              </Form.Item>
            </Col>
            {/* Gender - Required */}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء اختيار الجنس",
                  },
                ]}
                name="gender"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>الجنس</span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر الجنس"
                  options={GENDER_OPTIONS}
                  allowClear={false}
                />
              </Form.Item>
            </Col>
            {/* Mobile - Required */}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء إدخال رقم الجوال",
                  },
                  {
                    pattern: /^05\d{8}$/,
                    message: "يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام",
                  },
                ]}
                name="mobile"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>رقم الجوال</span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelInput
                  maxLength={10}
                  label=""
                  placeholder="أدخل رقم الجوال"
                  className="ghaith--input-style"
                />
              </Form.Item>
            </Col>
            {/* Birthday - Required */}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء اختيار تاريخ الميلاد",
                  },
                ]}
                name="birthday"
                className="ghaith--label-inputs"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>تاريخ الميلاد</span>
                }
                style={{ marginBottom: "14px" }}
              >
                <ConfigProvider locale={ar_EG} direction="rtl">
                  <InputDate
                    placeholder="تاريخ الميلاد"
                    onChange={(e) => handleDateFieldChange("birthday", e)}
                  />
                </ConfigProvider>
              </Form.Item>
            </Col>
            {/* Health State - Optional */}
            <Col span={12}>
              <Form.Item
                name="health_state_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>الحالة الصحية</span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر الحالة الصحية"
                  options={healthState || []}
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            {/* Academic Level - Optional */}
            <Col span={12}>
              <Form.Item
                name="academic_level_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>المستوى الدراسي</span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر المستوى الدراسي"
                  options={academicLevels || []}
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            {/* Education Mode - Optional */}
            <Col span={12}>
              <Form.Item
                name="education_mode_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>الوضع التعليمي</span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر الوضع التعليمي"
                  options={educationMode || []}
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            {/* Job - Optional */}
            <Col span={12}>
              <Form.Item
                name="job"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>المهنة</span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelInput
                  label=""
                  placeholder="أدخل المهنة"
                  className="ghaith--input-style"
                />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء إدخال الجنسية",
                  },
                ]}
                name="nationality_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>الجنسية </span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر الجنسية"
                  options={countries}
                  allowClear={true}
                />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء إدخال الحالة الإجتماعية",
                  },
                ]}
                name="family_state_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>الحالة الإجتماعية</span>
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
            </Col>
            <Col span={24} style={{ textAlign: "end", marginTop: "10px" }}>
              <Button
                loading={loadingSend}
                disabled={loadingSend}
                type="primary"
                style={{
                  fontSize: "18px",
                  width: "120px",
                  borderRadius: "6px",
                  marginRight: "10px",
                }}
                className="ghaith--login-button ghaith--donate-button"
                onClick={validateMember}
              >
                {loadingSend ? "جاري الإضافة..." : "إضافة"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </ModalComponent>
  );
};

export default AddFamilyMemberModal;
