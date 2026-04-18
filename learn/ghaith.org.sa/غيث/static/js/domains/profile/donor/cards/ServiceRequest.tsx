import { Form, Row, Col, Button, Input, Checkbox, Radio } from "antd";
import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { useEffect, useState } from "react";
import UploadInput from "../../../../bibilio/Inputs/UploadInput";
import { UploadOutlined } from "@ant-design/icons";
import {
  convertFileToBase64,
  showNotification,
} from "../../../../apis/utils/utils";
import {
  addServicesRequest,
  getBeneficiaryRequests,
  getFamilyStates,
  getServiceTypes,
} from "../../../../apis/actions/beneficiary.actions";
import CustomLabelInput from "../../../../bibilio/Inputs/CustomLabelInput";
import ConditionsTooltip from "./ServiceTermsTooltip";
import { setResIds, setResModel } from "../../../../apis/slices/ratingSlice";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceRequest = ({ isModalVisible, setIsModalVisible }: Props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loadingSend, setLoadingSend] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [valid, setIsvalid] = useState(false);
  const [dynamicAttachmentsData, setDynamicAttachmentsData] = useState<any[]>(
    [],
  );
  const [hasStamping, setHasStamping] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const familyStates = useSelector(
    (state: RootState) => state?.beneficiary.familyStates,
  );
  const { availableServices, otherServiceTypes, serviceTypes } = useSelector(
    (state: RootState) => state?.beneficiary,
  );

  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails,
  );
  const selectedFamilyState = familyStates?.find(
    (state: any) => state.name === beneficiaryDetails.family_state_id,
  );
  const dynamicAttachments = selectedFamilyState?.attachments_inputs || [];
  useEffect(() => {
    dispatch(getServiceTypes());
    dispatch(getFamilyStates());
  }, [dispatch]);

  const handleFileChange = async (fileList: any[], fieldName: string) => {
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
        } catch (error) {
          console.error("Error converting file to Base64:", error);
        }
      }
    }
    form.setFieldsValue({
      [fieldName]: attachments,
    });
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    form.resetFields([
      "service_type_id",
      "other_service_id",
      "is_saudi",
      "salary",
      "stamping",
      "plan",
      "stamping_beneficiary",
      "less_than_five_years",
      "other",
      "surface",
      "stamping_attachment_ids",
      "plan_attachment_ids",
      "attachment_ids",
    ]);
    setHasStamping(false);
    setHasPlan(false);
  };

  const SendServiceRequest = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const FormValues = form.getFieldsValue();

      let requestData: any = {
        department_type: selectedDepartment,
        request_reason: FormValues.request_reason,
      };

      if (selectedDepartment === "social_support") {
        requestData.other_service_id = FormValues.other_service_id;
        requestData.is_saudi = FormValues.is_saudi;
        requestData.salary = FormValues.salary;
        requestData.attachment_ids = dynamicAttachmentsData || [];
      } else if (selectedDepartment === "construction") {
        requestData.service_type_id = FormValues.service_type_id;
        requestData.stamping = FormValues.stamping || false;
        requestData.plan = FormValues.plan || false;
        requestData.stamping_beneficiary =
          FormValues.stamping_beneficiary || false;
        requestData.other = FormValues.other || "";
        requestData.surface = FormValues.surface || 0;
        requestData.attachment_ids = FormValues.attachment_ids || [];

        if (FormValues.stamping) {
          requestData.stamping_attachment_ids =
            FormValues.stamping_attachment_ids || [];
        }
        if (FormValues.plan) {
          requestData.plan_attachment_ids =
            FormValues.plan_attachment_ids || [];
        }
      } else if (selectedDepartment === "renovation") {
        requestData.service_type_id = FormValues.service_type_id;
        requestData.stamping = FormValues.stamping || false;
        requestData.plan = FormValues.plan || false;
        requestData.stamping_beneficiary =
          FormValues.stamping_beneficiary || false;
        requestData.less_than_five_years =
          FormValues.less_than_five_years || false;
        requestData.other = FormValues.other || "";
        requestData.attachment_ids = FormValues.attachment_ids || [];

        if (FormValues.stamping) {
          requestData.stamping_attachment_ids =
            FormValues.stamping_attachment_ids || [];
        }
        if (FormValues.plan) {
          requestData.plan_attachment_ids =
            FormValues.plan_attachment_ids || [];
        }
      }

      dispatch(addServicesRequest(requestData)).then((result: any) => {
        const request = result?.payload?.result;
        if (request?.code === 200) {
          dispatch(setResModel(request?.res_model));
          dispatch(setResIds([request?.beneficiary_request_id]));
          showNotification(
            `${request?.message} ، و رقم الطلب هو ${request?.request_number}`,
            "success",
            dispatch,
          );
          form.resetFields();
          setSelectedDepartment(null);
          setIsModalVisible(false);
          setLoadingSend(false);
          dispatch(
            getBeneficiaryRequests({
              limit: 6,
              page: 1,
            }),
          );
        } else {
          showNotification(request?.message, "error");
          setLoadingSend(false);
        }
      });
    } catch (error) {
      setLoadingSend(false);
    }
  };

  const departmentOptions = availableServices?.map((service: string) => ({
    id: service,
    name:
      service === "social_support"
        ? "الدعم الاجتماعي"
        : service === "construction"
          ? "البناء"
          : "الترميم",
  }));

  const salaryOptions = [
    { id: "limited", name: "محدود" },
    { id: "not_limited", name: "غير محدود" },
  ];
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

        form.setFieldsValue({
          [`dynamic_attachment_${attachmentId}`]: [imageData],
        });
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };
  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedDepartment(null);
        setHasStamping(false);
        setHasPlan(false);
      }}
      closeOnOutsideClick={false}
      width={700}
      centered={true}
      modalStyle={{ top: -250 }}
    >
      <div style={{ padding: "20px", direction: "rtl" }}>
        {" "}
        <div
          style={{
            backgroundColor: "#FFF4E5",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
            textAlign: "start",
            border: "1px solid #FFE0B2",
          }}
        >
          <span
            style={{
              color: "#856404",
              fontSize: "14px",
            }}
            className="gh--font-light"
          >
            لا ينظر في الطلب في حال يوجد نواقص في مرفقات الطلب.
          </span>
        </div>
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
            طلب خدمة
          </h2>
        </div>
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={SendServiceRequest}
          style={{ direction: "rtl" }}
        >
          <Row gutter={[16, 4]}>
            {/* Department Type Selection */}
            <Col span={24}>
              <Form.Item
                name="department_type"
                label="نوع الخدمة"
                rules={[
                  {
                    required: true,
                    message: "الرجاء اختيار نوع الخدمة",
                  },
                ]}
                className="ghaith--label-inputs"
                labelCol={{ className: "ghaith--label-style" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="اختر نوع الخدمة"
                  options={departmentOptions}
                  onChange={handleDepartmentChange}
                />
              </Form.Item>
            </Col>

            {/* Social Support Fields */}
            {selectedDepartment === "social_support" && (
              <>
                <Col span={24}>
                  <Form.Item
                    name="other_service_id"
                    label="نوع الخدمة"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء اختيار نوع الخدمة",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelSelect
                      label=""
                      options={otherServiceTypes?.map((type: any) => ({
                        id: type.id,
                        name: type.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="is_saudi"
                    label="إن تكون المتقدمة سعودية الجنسية أو أم مواطن أو زوجة مواطن"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء الاختيار",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <Radio.Group>
                      <Radio
                        className="ghaith--label-inputs gh--font-light"
                        value={true}
                      >
                        نعم
                      </Radio>
                      <Radio
                        className="ghaith--label-inputs gh--font-light"
                        value={false}
                      >
                        لا
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="salary"
                    label="الدخل"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء اختيار الدخل",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelSelect label="" options={salaryOptions} />
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
              </>
            )}

            {/* Construction Fields */}
            {selectedDepartment === "construction" && (
              <>
                <Col span={24}>
                  <Form.Item
                    name="service_type_id"
                    label="نوع الخدمة"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء اختيار نوع الخدمة",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelSelect
                      label=""
                      options={serviceTypes?.map((type: any) => ({
                        id: type.id,
                        name: type.name,
                      }))}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="surface"
                    label="المساحة"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء إدخال المساحة",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelInput label="" type="number" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="stamping"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox
                      className="ghaith--custom-checkbox"
                      onChange={(e) => setHasStamping(e.target.checked)}
                    >
                      <span className="ghaith--check-partnershipstyle">
                        إن يكون لديه مرفق من الصك{" "}
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                {hasStamping && (
                  <Col span={24}>
                    <Form.Item
                      name="stamping_attachment_ids"
                      label="مرفق من الصك"
                      rules={[
                        {
                          required: true,
                          message: "الرجاء إرفاق المستندات",
                        },
                      ]}
                      className="ghaith--label-inputs"
                      labelCol={{ className: "ghaith--label-style" }}
                    >
                      <UploadInput
                        text="إرفاق مستندات  الصك"
                        icon={<UploadOutlined />}
                        multiple={true}
                        onChange={(fileList) =>
                          handleFileChange(fileList, "stamping_attachment_ids")
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col span={24}>
                  <Form.Item
                    name="plan"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox
                      className="ghaith--custom-checkbox"
                      onChange={(e) => setHasPlan(e.target.checked)}
                    >
                      <span className="ghaith--check-partnershipstyle">
                        إن يكون لديه مرفق من المخططات
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                {hasPlan && (
                  <Col span={24}>
                    <Form.Item
                      name="plan_attachment_ids"
                      label="مرفقات المخطط"
                      rules={[
                        {
                          required: true,
                          message: "الرجاء إرفاق المستندات",
                        },
                      ]}
                      className="ghaith--label-inputs"
                      labelCol={{ className: "ghaith--label-style" }}
                    >
                      <UploadInput
                        text="إرفاق مستندات المخطط"
                        icon={<UploadOutlined />}
                        multiple={true}
                        onChange={(fileList) =>
                          handleFileChange(fileList, "plan_attachment_ids")
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col span={24}>
                  <Form.Item
                    name="stamping_beneficiary"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox className="ghaith--custom-checkbox">
                      <span className="ghaith--check-partnershipstyle">
                        إن يكون الصك ملك المستفيد
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="other"
                    label="أخرى"
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelInput label="" type="text" />
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Renovation Fields */}
            {selectedDepartment === "renovation" && (
              <>
                <Col span={24}>
                  <Form.Item
                    name="service_type_id"
                    label="نوع الخدمة"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء اختيار نوع الخدمة",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelSelect
                      label=""
                      options={serviceTypes?.map((type: any) => ({
                        id: type.id,
                        name: type.name,
                      }))}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="stamping"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox
                      className="ghaith--custom-checkbox"
                      onChange={(e) => setHasStamping(e.target.checked)}
                    >
                      <span className="ghaith--check-partnershipstyle">
                        إن يكون لديه مرفق من الصك{" "}
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                {hasStamping && (
                  <Col span={24}>
                    <Form.Item
                      name="stamping_attachment_ids"
                      label="مرفق من الصك"
                      rules={[
                        {
                          required: true,
                          message: "الرجاء إرفاق المستندات",
                        },
                      ]}
                      className="ghaith--label-inputs"
                      labelCol={{ className: "ghaith--label-style" }}
                    >
                      <UploadInput
                        text="إرفاق مستندات الصك"
                        icon={<UploadOutlined />}
                        multiple={true}
                        onChange={(fileList) =>
                          handleFileChange(fileList, "stamping_attachment_ids")
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col span={24}>
                  <Form.Item
                    name="plan"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox
                      className="ghaith--custom-checkbox"
                      onChange={(e) => setHasPlan(e.target.checked)}
                    >
                      <span className="ghaith--check-partnershipstyle">
                        إن يكون لديه مرفق من المخططات
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                {hasPlan && (
                  <Col span={24}>
                    <Form.Item
                      name="plan_attachment_ids"
                      label="مرفقات المخطط"
                      rules={[
                        {
                          required: true,
                          message: "الرجاء إرفاق المستندات",
                        },
                      ]}
                      className="ghaith--label-inputs"
                      labelCol={{ className: "ghaith--label-style" }}
                    >
                      <UploadInput
                        text="إرفاق مستندات المخطط"
                        icon={<UploadOutlined />}
                        multiple={true}
                        onChange={(fileList) =>
                          handleFileChange(fileList, "plan_attachment_ids")
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col span={24}>
                  <Form.Item
                    name="stamping_beneficiary"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox className="ghaith--custom-checkbox">
                      <span className="ghaith--check-partnershipstyle">
                        إن يكون الصك ملك المستفيد
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="less_than_five_years"
                    valuePropName="checked"
                    className="ghaith--label-inputs"
                  >
                    <Checkbox className="ghaith--custom-checkbox">
                      <span className="ghaith--check-partnershipstyle">
                        أقل من خمس سنوات
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="other"
                    label="أخرى"
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <CustomLabelInput label="" type="text" />
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Common Fields */}
            {selectedDepartment && (
              <>
                <Col span={24}>
                  <Form.Item
                    name="request_reason"
                    label="سبب الطلب"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء إدخال سبب الطلب",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                  >
                    <TextArea className="ghaith--textarea-input" rows={3} />
                  </Form.Item>
                </Col>
                {selectedDepartment !== "social_support" && (
                  <Col span={24}>
                    <Form.Item
                      name="attachment_ids"
                      label="إرفاق المستندات"
                      className="ghaith--label-inputs"
                      labelCol={{ className: "ghaith--label-style" }}
                    >
                      <UploadInput
                        text="إرفاق المستندات"
                        icon={<UploadOutlined />}
                        multiple={true}
                        onChange={(fileList) =>
                          handleFileChange(fileList, "attachment_ids")
                        }
                      />
                    </Form.Item>
                  </Col>
                )}
              </>
            )}
            <ConditionsTooltip
              visible={tooltipVisible}
              onVisibleChange={setTooltipVisible}
              onScrollComplete={() => setIsvalid(true)}
            >
              <Checkbox
                style={{ marginTop: "3px", marginBottom: "8px" }}
                className="ghaith--custom-checkbox"
                onChange={(e) => {
                  setIsvalid(e.target.checked);
                }}
              >
                <div className="ghaith--login-check-box">
                  <span>
                    أوافق على <a>الشروط والأحكام</a>
                  </span>
                </div>
              </Checkbox>
            </ConditionsTooltip>
            {/* Submit Button */}
            <Col span={24} style={{ textAlign: "end" }}>
              <Button
                loading={loadingSend}
                disabled={loadingSend || !selectedDepartment || !valid}
                type="primary"
                style={{
                  fontSize: "18px",
                  width: "120px",
                  borderRadius: "6px",
                }}
                className="ghaith--login-button ghaith--donate-button"
                onClick={() => {
                  SendServiceRequest();
                }}
              >
                إرسال
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </ModalComponent>
  );
};

export default ServiceRequest;
