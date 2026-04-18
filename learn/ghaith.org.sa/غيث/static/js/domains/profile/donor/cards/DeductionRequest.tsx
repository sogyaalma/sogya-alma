import { Form, Row, Col, Button, Input, ConfigProvider } from "antd";
import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { useEffect, useState } from "react";
import {
  addDeductionRequest,
  getContactMethods,
  getContactTime,
  getDeductions,
  getDeductionTypes,
} from "../../../../apis/actions/donor.actions";
import InputDate from "../../../../bibilio/Inputs/InputDate";
import ar_EG from "antd/lib/locale/ar_EG";
import UploadInput from "../../../../bibilio/Inputs/UploadInput";
import { UploadOutlined } from "@ant-design/icons";
import {
  convertFileToBase64,
  showNotification,
} from "../../../../apis/utils/utils";
import dayjs from "dayjs";

interface Props {
  donor?: any;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeductionRequest = ({
  donor,
  isModalVisible,
  setIsModalVisible,
}: Props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loadingSend, setLoadingSend] = useState(false);

  const { deductionTypes, contactMethods, contactTime } = useSelector(
    (state: RootState) => state?.donor
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDeductionTypes());
    dispatch(getContactMethods());
    dispatch(getContactTime());
  }, [dispatch]);
  const handleDateFieldChange = (field: string, e: any) => {
    form.setFieldsValue({ [field]: dayjs(e).format("YYYY-MM-DD") });
  };
  const handleFileChange = async (fileList: any[]) => {
    const attachments = [];
    for (const fileItem of fileList) {
      const file = fileItem?.originFileObj;
      if (file) {
        try {
          const base64 = await convertFileToBase64(file);
          const imageData = {
            filename: file.name,
            data: base64,
          };
          attachments.push(imageData);
          form.setFieldsValue({
            attachment_ids: attachments,
          });
        } catch (error) {
          console.error("Error converting file to Base64:", error);
        }
      }
    }
  };

  const validateDonation = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const FormValues = form.getFieldsValue();

      dispatch(addDeductionRequest(FormValues)).then((result: any) => {
        const request = result?.payload?.result;
        if (request?.code === 200) {
          showNotification(request?.message, "success");
          form.resetFields();
          setIsModalVisible(false);
          dispatch(getDeductions({ limit: 6, page: 1 }));
          setLoadingSend(false);
        } else {
          showNotification(request?.message, "error");
          setIsModalVisible(false);
          setLoadingSend(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
        form.resetFields();
      }}
      closeOnOutsideClick={true}
      width={700}
      centered={true}
      modalStyle={{ top: -200 }}
    >
      <div style={{ padding: "20px", direction: "rtl" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              color: "#009767",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
            className="gh--font-light"
          >
            رحلة الخير تبدأ بخطوة ثابتة
          </h2>
          <p
            style={{ color: "#666", fontSize: "15px" }}
            className="gh--font-light"
          >
            استقطع معنا جزءاً من مشروعنا الخيري المستدام
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={validateDonation}
          style={{ direction: "rtl" }}
        >
          <Row gutter={[16, 8]}>
            {/* Sponsorship Type */}
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء تعبئة الحقل",
                  },
                ]}
                name="product_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>نوع الكفالة </span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر نوع الكفالة"
                  options={deductionTypes}
                  allowClear={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء تعبئة الحقل",
                  },
                ]}
                name="date_from"
                className="ghaith--label-inputs"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>التاريخ من </span>}
                style={{ marginBottom: "14px" }}
              >
                <ConfigProvider locale={ar_EG} direction="rtl">
                  <InputDate
                    placeholder="تاريخ من"
                    onChange={(e) => handleDateFieldChange("date_from", e)}
                  />{" "}
                </ConfigProvider>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء تعبئة الحقل",
                  },
                ]}
                name="date_to"
                className="ghaith--label-inputs"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>التاريخ إلى </span>
                }
                style={{ marginBottom: "14px" }}
              >
                <ConfigProvider locale={ar_EG} direction="rtl">
                  <InputDate
                    placeholder="تاريخ إلى"
                    onChange={(e) => handleDateFieldChange("date_to", e)}
                  />{" "}
                </ConfigProvider>
              </Form.Item>
            </Col>
            {/* Communication Method */}
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء تعبئة الحقل",
                  },
                ]}
                name="contact_method_ids"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>آلية التواصل</span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  className="ghaith--multiple-select"
                  label=""
                  placeholder="اختر طريقة التواصل"
                  options={contactMethods}
                  mode="multiple"
                  allowClear={true}
                />
              </Form.Item>
            </Col>

            {/* Contact Time */}
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الرجاء تعبئة الحقل",
                  },
                ]}
                name="contact_time_ids"
                labelCol={{ className: "ghaith--label-style" }}
                label={
                  <span style={{ marginBottom: "8px" }}>
                    الوقت المناسب للاتصال
                  </span>
                }
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  className="ghaith--multiple-select"
                  label=""
                  placeholder="اختر الوقت المناسب"
                  options={contactTime}
                  mode="multiple"
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="attachment_ids"
                labelCol={{ className: "ghaith--label-style" }}
                style={{ marginBottom: "14px" }}
                label={<span style={{ marginBottom: "8px" }}>المرفقات</span>}
                className="ghaith--label-inputs"
              >
                <UploadInput
                  text="المرفقات"
                  icon={<UploadOutlined />}
                  multiple={true}
                  onChange={handleFileChange}
                />
              </Form.Item>
            </Col>
            {/* Note */}
            <Col span={24}>
              <Form.Item
                name="note"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}>ملاحظة</span>}
                style={{ marginBottom: "14px" }}
              >
                <div style={{ marginTop: "8px" }}>
                  <TextArea className="ghaith--textarea-input" rows={2} />
                </div>
              </Form.Item>
            </Col>

            {/* Submit Button */}
            <Col span={24} style={{ textAlign: "end" }}>
              <Button
                loading={loadingSend}
                disabled={loadingSend}
                type="primary"
                style={{
                  fontSize: "18px",
                  width: "120px",
                  borderRadius: "6px",
                }}
                className="ghaith--login-button ghaith--donate-button"
                onClick={() => {
                  validateDonation();
                }}
              >
                إرسال{" "}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </ModalComponent>
  );
};

export default DeductionRequest;
