import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { Col, Divider, Row, Form, Checkbox, Button } from "antd";
import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { setResIds, setResModel } from "../../../apis/slices/ratingSlice";
import {
  addPartnership,
  getAllAreas,
  getAllTypes,
  getEntitiesClassification,
} from "../../../apis/actions/partners.actions";
import {
  convertFileToBase64,
  showNotification,
} from "../../../apis/utils/utils";
import Loader from "../../../bibilio/loader/Loader";
import UploadInput from "../../../bibilio/Inputs/UploadInput";
import CustomLabelSelect from "../../../components/select/CustomLabelSelect";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import NavBar from "../../commun/Navbar";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import AddPartnershipButton from "../../../bibilio/Buttons/addPartershipButton";
import PageContainer from "../../../components/container/PageContainer";

const AddPartnership = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeEntity, setActiveEntity] = useState<any>(null);
  const navigate = useNavigate();
  const { entities, partnershipTypes, areas, loading } = useSelector(
    (state: RootState) => state?.partnership,
  );

  useEffect(() => {
    if (entities && entities.length > 0 && activeEntity === null) {
      setActiveEntity(entities[0]?.id);
    }
  }, [entities, activeEntity]);

  useEffect(() => {
    dispatch(getEntitiesClassification());
    dispatch(getAllTypes());
    dispatch(getAllAreas());
  }, [dispatch]);

  const options = [
    { id: "day", name: "يوم" },
    { id: "week", name: "أسبوع" },
    { id: "month", name: "شهر" },
    { id: "year", name: "سنة" },
  ];

  const handleEntitySelection = (id: string) => {
    setActiveEntity(id);
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

  const onFinish = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const FormValues = form.getFieldsValue();
      const partnershipDurationUnit = form.getFieldValue(
        "partnership_duration_unit",
      );

      let partnershipFormData = {
        ...FormValues,
        entity_classification_id: activeEntity,
        partnership_type_id: selectedTypes,
        partnership_duration_unit: partnershipDurationUnit?.value || "year",
        partnership_areas_ids: selectedAreas,
      };
      dispatch(addPartnership(partnershipFormData)).then((result: any) => {
        const partnership = result?.payload?.data?.result;
        if (partnership?.code === 200) {
          setLoadingSend(false);
          dispatch(setResModel(partnership?.res_model));
          dispatch(setResIds([partnership?.partnership_request_id]));
          showNotification(
            `سيتم التواصل معك قريبا الرقم المرجعي الخاص بكم هو ${partnership?.partnership_number} ،

رقم التواصل 966453528828+`,
            "success",
            dispatch,
          );
          setTimeout(() => {
            navigate("/");
            window.scrollTo(0, 0);
          }, 3000);
        } else {
          setLoadingSend(false);
          showNotification(partnership?.message, "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isOtherSelected = areas?.some(
    (area: any) => area?.is_other && selectedAreas.includes(area?.id),
  );

  const handleCheckboxAreaChange = (areaId: any) => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter((id) => id !== areaId));
      form.setFieldsValue({ other: "" });
    } else {
      setSelectedAreas([...selectedAreas, areaId]);
    }
  };

  const handleCheckboxTypeChange = (typeId: any) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  const handleNextStep = async () => {
    try {
      if (currentStep === 1) {
        await form.validateFields([
          "name",
          "partner_name",
          "city",
          "entity_email",
          "entity_mobile",
          "street",
        ]);
        setCurrentStep(2);
        window.scrollTo(0, 0);
      } else if (currentStep === 2) {
        if (selectedTypes.length === 0) {
          showNotification(
            "الرجاء إدخال اختيار واحد على الأقل لنوع الشراكة",
            "error",
          );
          return;
        }
        if (selectedAreas.length === 0) {
          showNotification(
            "الرجاء إدخال اختيار واحد على الأقل لمجالات الشراكة",
            "error",
          );
          return;
        }

        const fieldsToValidate = [
          "execution_location",
          "partnership_duration",
          "partnership_duration_unit",
          "comment",
        ];
        if (isOtherSelected) {
          fieldsToValidate.push("other");
        }
        await form.validateFields(fieldsToValidate);
        setCurrentStep(3);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <PageContainer
            title="جمعية غيث - طلب شراكة"
            description="طلب شراكة"
          >
            <NavBar variant="homePage" />
            <div
              className="ghaith--newsSection-title"
              style={{ marginTop: "9rem" }}
            >
              <h1>
                <span className="ghaith--donation-highlight">طلب </span>
                <span className="ghaith--donation-primary">شراكة</span>
              </h1>
            </div>
            <Form form={form} layout="vertical">
              <div className="ghaith--add-partnership-container">
                <Row gutter={[16, 16]} justify={"start"}>
                  <Col
                    style={{ display: "flex" }}
                    xxl={14}
                    xl={14}
                    lg={16}
                    md={16}
                    sm={24}
                    xs={24}
                  >
                    {entities?.map((entity: any) => (
                      <Col
                        key={entity?.id}
                        xxl={6}
                        xl={6}
                        lg={8}
                        md={8}
                        sm={8}
                        xs={8}
                        className="ghaith--add-partnership-col"
                      >
                        <Form.Item name="entity_classification_id">
                          <AddPartnershipButton
                            className={
                              activeEntity === entity?.id
                                ? "ghaith--add-partnership-active-button"
                                : ""
                            }
                            onClick={() => handleEntitySelection(entity?.id)}
                            title={entity?.name}
                          />
                        </Form.Item>
                      </Col>
                    ))}
                  </Col>
                </Row>
                <Divider className="ghaith--add-partnership-divider" />

                {/* Step 1: Basic Information */}
                <div style={{ display: currentStep === 1 ? "block" : "none" }}>
                  <Form.Item
                    name="name"
                    label={"موضوع الشراكة"}
                    rules={[
                      {
                        required: true,
                        message: "الرجاء تعبئة الحقل",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                    style={{ marginTop: "1rem" }}
                  >
                    <CustomLabelInput label="" type="text" />
                  </Form.Item>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="partner_name"
                        label="اسم الجهة"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="city"
                        label="المدينة"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="entity_email"
                        label="البريد الإلكتروني"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                          {
                            type: "email",
                            message:
                              "يجب  التأكد من أن البريد الإلكتروني مكتوب بشكل صحيح",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput
                          label=""
                          placeholder="email@example.com"
                          type="email"
                        />
                      </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="entity_mobile"
                        label="رقم الهاتف/الجوال"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                          {
                            len: 10,
                            message: "يجب أن يتكون رقم الهاتف من 10 ارقام",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput
                          label=""
                          placeholder="05XXXXXXXX"
                          type="tel"
                          maxLength={10}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="street"
                        label="العنوان"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row dir="rtl" justify={"end"} style={{ marginTop: "3rem" }}>
                    <Col
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      xxl={12}
                      xl={12}
                      lg={12}
                      md={12}
                      sm={24}
                      xs={24}
                    >
                      <Button
                        type="primary"
                        style={{
                          fontSize: "18px",
                          width: "140px",
                          borderRadius: "6px",
                        }}
                        className="ghaith--login-button ghaith--donate-button"
                        onClick={handleNextStep}
                      >
                        التالي
                      </Button>
                    </Col>
                  </Row>
                </div>

                {/* Step 2: Partnership Information */}
                <div style={{ display: currentStep === 2 ? "block" : "none" }}>
                  <h1 className="ghaith--add-partnership-title">
                    معلومات الشراكة
                  </h1>
                  <Row gutter={16} dir="rtl" style={{ marginTop: "1rem" }}>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={10} xs={10}>
                      <p className="ghaith--add-partnership-subtitle">
                        نوع الشراكة المطلوبة
                      </p>
                    </Col>

                    <Col xxl={18} xl={18} lg={18} md={18} sm={14} xs={14}>
                      <Row gutter={16}>
                        {partnershipTypes?.map((type: any) => (
                          <Col
                            key={type?.id}
                            xxl={6}
                            xl={6}
                            lg={6}
                            md={6}
                            sm={24}
                            xs={24}
                          >
                            <Checkbox
                              className="ghaith--custom-checkbox"
                              checked={selectedTypes.includes(type?.id)}
                              onChange={() =>
                                handleCheckboxTypeChange(type?.id)
                              }
                            >
                              <span className="ghaith--check-partnershipstyle">
                                {type?.name}
                              </span>
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl" style={{ marginTop: "1rem" }}>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={10} xs={10}>
                      <p className="ghaith--add-partnership-subtitle">
                        مجالات الشراكة
                      </p>
                    </Col>

                    <Col xxl={18} xl={18} lg={18} md={18} sm={14} xs={14}>
                      <Row gutter={16}>
                        {areas?.map((area: any) => (
                          <Col
                            key={area?.id}
                            xxl={6}
                            xl={6}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                          >
                            <Checkbox
                              className="ghaith--custom-checkbox"
                              checked={selectedAreas.includes(area?.id)}
                              onChange={() =>
                                handleCheckboxAreaChange(area?.id)
                              }
                            >
                              <span className="ghaith--check-partnershipstyle">
                                {area?.name}
                              </span>
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                      {isOtherSelected && (
                        <Col
                          style={{ marginRight: "1rem", marginTop: "1rem" }}
                          xxl={8}
                          xl={8}
                          lg={8}
                          md={8}
                          sm={24}
                          xs={24}
                        >
                          <Form.Item
                            name="other"
                            rules={[
                              {
                                required: true,
                                message: "الرجاء تعبئة الحقل",
                              },
                            ]}
                            className="ghaith--label-inputs"
                            labelCol={{ className: "ghaith--label-style" }}
                          >
                            <CustomLabelInput
                              label=""
                              value={form.getFieldValue("other")}
                              placeholder="أخرى (تذكر)"
                              type="text"
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="execution_location"
                        label="مكان التنفيذ"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={14} sm={14} xs={14}>
                      <Form.Item
                        name="partnership_duration"
                        label="مدة الشراكة"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="tel" />
                      </Form.Item>
                    </Col>
                    <Col xxl={4} xl={4} lg={4} md={10} sm={10} xs={10}>
                      <Form.Item
                        name="partnership_duration_unit"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs ghaith--select-partnership-unit"
                        labelCol={{ className: "ghaith--label-style" }}
                        initialValue={"year"}
                      >
                        <CustomLabelSelect label="" options={options} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="comment"
                        label="تفاصيل مجالات التعاون"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row
                    dir="rtl"
                    justify={"space-between"}
                    style={{ marginTop: "3rem" }}
                  >
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Button
                        type="primary"
                        style={{
                          fontSize: "18px",
                          width: "140px",
                          borderRadius: "6px",
                        }}
                        className="ghaith--login-button ghaith--donate-button"
                        onClick={handlePreviousStep}
                        icon={
                          <ArrowRightOutlined style={{ marginTop: "8px" }} />
                        }
                      >
                        السابق
                      </Button>
                    </Col>
                    <Col
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      xxl={12}
                      xl={12}
                      lg={12}
                      md={12}
                      sm={24}
                      xs={24}
                    >
                      <Button
                        type="primary"
                        style={{
                          fontSize: "18px",
                          width: "140px",
                          borderRadius: "6px",
                        }}
                        className="ghaith--login-button ghaith--donate-button"
                        onClick={handleNextStep}
                      >
                        التالي
                      </Button>
                    </Col>
                  </Row>
                </div>

                {/* Step 3: Contact Information */}
                <div style={{ display: currentStep === 3 ? "block" : "none" }}>
                  <h1 className="ghaith--add-partnership-title">
                    بيانات التواصل
                  </h1>
                  <Row gutter={16} dir="rtl" style={{ marginTop: "1rem" }}>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="contact_name"
                        label="اسم ممثل الجهة"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="phone"
                        label="رقم الهاتف/الجوال"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                          {
                            len: 10,
                            message: "يجب أن يتكون رقم الهاتف من 10 ارقام",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput
                          label=""
                          placeholder="05XXXXXXXX"
                          type="tel"
                          maxLength={10}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="function"
                        label="المنصب"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput label="" type="text" />
                      </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="email_from"
                        label="البريد الالكتروني"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                          {
                            type: "email",
                            message:
                              "يجب  التأكد من أن البريد الإلكتروني مكتوب بشكل صحيح",
                          },
                        ]}
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <CustomLabelInput
                          label=""
                          placeholder="email@example.com"
                          type="email"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} dir="rtl">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="attachment_ids"
                        label="إرفاق أي مستندات تدعم الطلب"
                        className="ghaith--label-inputs"
                        labelCol={{ className: "ghaith--label-style" }}
                      >
                        <UploadInput
                          text="إرفاق أي مستندات تدعم الطلب"
                          icon={<UploadOutlined />}
                          multiple={true}
                          onChange={handleFileChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row
                    dir="rtl"
                    justify={"space-between"}
                    style={{ marginTop: "3rem" }}
                  >
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Button
                        type="primary"
                        style={{
                          fontSize: "18px",
                          width: "140px",
                          borderRadius: "6px",
                        }}
                        className="ghaith--login-button ghaith--donate-button"
                        onClick={handlePreviousStep}
                        icon={
                          <ArrowRightOutlined style={{ marginTop: "8px" }} />
                        }
                      >
                        السابق
                      </Button>
                    </Col>
                    <Col
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      xxl={12}
                      xl={12}
                      lg={12}
                      md={12}
                      sm={24}
                      xs={24}
                    >
                      <Button
                        type="primary"
                        loading={loadingSend}
                        disabled={loadingSend}
                        style={{
                          fontSize: "18px",
                          width: "140px",
                          borderRadius: "6px",
                        }}
                        className="ghaith--login-button ghaith--donate-button"
                        onClick={onFinish}
                      >
                        إرسال الطلب
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
            <FooterSection footerImg={FooterImage} />{" "}
          </PageContainer>
        </>
      )}
    </>
  );
};

export default AddPartnership;
