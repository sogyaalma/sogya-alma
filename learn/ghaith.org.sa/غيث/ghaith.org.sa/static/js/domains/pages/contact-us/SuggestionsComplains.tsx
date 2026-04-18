import React, { useEffect, useState } from "react";
import { Checkbox, Col, Form, Row, Radio, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import {
  addTicket,
  getTicketsTypes,
  toPrintRequest,
} from "../../../apis/actions/contact.actions";
import { PrinterOutlined, UploadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import {
  setResIds,
  setResModel,
  setRatingVisible,
} from "../../../apis/slices/ratingSlice";
import {
  convertFileToBase64,
  showNotification,
} from "../../../apis/utils/utils";
import Loader from "../../../bibilio/loader/Loader";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import CustomLabelSelect from "../../../components/select/CustomLabelSelect";
import UploadInput from "../../../bibilio/Inputs/UploadInput";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import PrimarButton from "../../../bibilio/Buttons/PrimaryButton";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import PageContainer from "../../../components/container/PageContainer";

const { TextArea } = Input;

const SuggestionsComplaints = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { ticketsTypes, loading } = useSelector(
    (state: RootState) => state.contact,
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ticketId, setTicketId] = useState<number>(0);

  useEffect(() => {
    dispatch(getTicketsTypes());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [ticketsTypes]);

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

  const handlePrint = async () => {
    (await dispatch(toPrintRequest(ticketId))) as any;
    if (!loading) {
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  const handleAddTicket = async () => {
    try {
      await form.validateFields();
      const gender = form.getFieldValue("gender");
      const mappedGender = gender.value === 1 ? "male" : "female";

      const FormValues = form.getFieldsValue();
      const suggestionsComplaintsData = {
        ...FormValues,
        gender: mappedGender,
      };
      const data = (await dispatch(
        addTicket(suggestionsComplaintsData),
      )) as any;
      const success = data?.payload?.data?.result;
      if (success?.code === 200) {
        dispatch(setResModel(success?.res_model));
        dispatch(setResIds([success?.ticket_id]));
        showNotification(success?.message, "success");
        setTimeout(() => {
          setIsModalVisible(true);
          setTicketId(success?.ticket_id);
        }, 3000);
        form.resetFields();
      } else {
        showNotification(success?.message, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading && loading) {
    return <Loader />;
  }

  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - المقترحات و الشكاوى"
        description="المقترحات و الشكاوى "
      >
        <NavBar variant="homePage" />
        <div
          className="ghaith--newsSection-title"
          style={{ marginTop: "9rem" }}
        >
          <h1>
            <span className="ghaith--donation-highlight">المقترحات </span>
            <span className="ghaith--donation-primary">و الشكاوى</span>
          </h1>
        </div>{" "}
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            is_beneficiary: false,
          }}
        >
          <div className="ghaith--add-partnership-container">
            <span className="ghaith--add-partnership-title">
              بيانات مقدم الطلب
            </span>
            <Row gutter={16} align={"middle"}>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="firstname"
                  label="الاسم الأول"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  className="ghaith--label-inputs"
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="father_name"
                  label="إسم الأب"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="grandfather_name"
                  label="إسم الجد"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="family_name"
                  label="إسم العائلة"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>

              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="gender"
                  label="الجنس"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelSelect
                    label=""
                    options={[
                      { id: 1, name: "ذكر" },
                      { id: 2, name: "أنثى" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="mobile"
                  label="رقم الجوال"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                    {
                      len: 10,
                      message: "رقم الجوال يجب ان يكون 10 أرقام",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="tel" maxLength={10} />
                </Form.Item>
              </Col>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  label="البريد الالكتروني"
                  rules={[
                    {
                      type: "email",
                      message:
                        "يجب أن يحتوي البريد الإلكتروني على الرمز (@) ويتضمن اسم نطاق",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>
              <Col
                xxl={6}
                xl={6}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                style={{ marginTop: "1.5rem" }}
              >
                <Form.Item name="is_beneficiary" valuePropName="checked">
                  <Checkbox
                    value={false}
                    style={{ marginTop: "3px", marginBottom: "8px" }}
                    className="ghaith--custom-checkbox"
                  >
                    <span className="ghaith--check-partnershipstyle">
                      هل أنت من مستفيدي الجمعية؟
                    </span>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <span className="ghaith--add-partnership-title">بيانات الطلب</span>
            <Row gutter={16} align={"middle"}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="ticket_type_id"
                  className="ghaith--label-inputs"
                  label="نوع الطلب:"
                  layout="horizontal"
                  wrapperCol={{
                    xxl: 12,
                    xl: 12,
                    lg: 16,
                    md: 16,
                    sm: 16,
                    xs: 16,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelAlign="left"
                  labelCol={{
                    className: "ghaith--label-style",
                    xxl: 3,
                    xl: 3,
                    lg: 6,
                    md: 6,
                    sm: 6,
                    xs: 6,
                  }}
                >
                  <Radio.Group style={{ marginLeft: "0.9rem" }}>
                    {ticketsTypes.map((ticketType: any) => (
                      <Radio
                        key={ticketType.id}
                        value={ticketType.id}
                        className="ghaith--label-style gh--font-light"
                        style={{ fontSize: "16px" }}
                      >
                        {ticketType.name}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="name"
                  label="عنوان الطلب"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <CustomLabelInput label="" type="text" />
                </Form.Item>
              </Col>

              <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="attachment_ids"
                  label="مرفقات"
                  className="ghaith--label-inputs"
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <UploadInput
                    text="مرفقات"
                    icon={<UploadOutlined />}
                    multiple={true}
                    onChange={handleFileChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="description"
                  label="تفاصيل الطلب"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تعبئة الحقل",
                    },
                  ]}
                  labelCol={{ className: "ghaith--label-style" }}
                >
                  <TextArea className="ghaith--textarea-input" rows={3} />
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
                <PrimarButton
                  className="ghaith--add-partnership-button"
                  title="إرسال الطلب"
                  onClick={() => {
                    handleAddTicket();
                  }}
                  disabled={loading}
                  loading={loading}
                />
              </Col>
            </Row>
          </div>
        </Form>
        <ModalComponent
          title=""
          open={isModalVisible}
          closeOnOutsideClick={true}
          onClose={() => setIsModalVisible(false)}
          width={500}
          showCloseIcon={false}
        >
          <div className="ghaith--declaration-modal-content">
            <p>تم تسجيل الطلب بنجاح</p>
            <p>يمكنكم طباعة سند الإستلام</p>
            <div className="ghaith--declaration-modal-footer">
              <PrimarButton
                title="تقييم الخدمة"
                onClick={() => {
                  dispatch(setRatingVisible(true));
                  setIsModalVisible(false);
                }}
                className="ghaith--grey-button ghaith--grey-button-active"
              />
              <PrimarButton
                title="إغلاق"
                style={{
                  width: "3rem",
                }}
                onClick={() => {
                  setIsModalVisible(false);
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
              />
              <PrimarButton
                title="طباعة سند إستلام"
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                disabled={loading}
                className="ghaith--print-btn-container"
              />
            </div>
          </div>
        </ModalComponent>{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default SuggestionsComplaints;
