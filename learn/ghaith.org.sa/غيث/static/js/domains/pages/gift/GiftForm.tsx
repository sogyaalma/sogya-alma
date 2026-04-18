import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { Form, Button, Row, Col, Checkbox } from "antd";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import { getCardTypes } from "../../../apis/actions/donation.actions";
import MoyasarForm from "../../../components/moyassar/MoyassarForm";
import { setDonationTypeId, setGift } from "../../../apis/slices/moyassarSlice";

const GiftComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [selectedCard, setSelectedCard] = useState(1);
  const [displayMoyasar, setDisplayMoyasar] = useState<boolean>(false);

  const cardTypes = useSelector(
    (state: RootState) => state?.donation?.cardTypes,
  );

  useEffect(() => {
    dispatch(getCardTypes());
  }, [dispatch]);

  const handleSubmit = async (values: any) => {
    try {
      const json = {
        ...values,
        send_copy_to_sender: form.getFieldValue("send_copy_to_sender") ?? false,
        show_name_in_dedication:
          form.getFieldValue("show_name_in_dedication") ?? false,
        show_amount: form.getFieldValue("show_amount") ?? false,
        send_gift: true,
        card_type_id: selectedCard ?? false,
      };
      dispatch(setDonationTypeId({ id: false, name: "إهداء" }));
      dispatch(setGift(json));
      setDisplayMoyasar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const selectedCardData = cardTypes?.find(
    (card: any) => card.id === selectedCard,
  );

  return (
    <>
      <div className="ghaith--gift-wrapper">
        <Row gutter={[32, 32]} justify={"center"}>
          {/* Right Side - Form */}
          <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
            <div className="ghaith--gift-form-wrapper">
              <h2 className="ghaith--gift-form-title gh--font-light">
                أدخل البيانات :
              </h2>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ direction: "rtl" }}
              >
                <Row gutter={[16, 16]}>
                  {/* Card Type Selection */}
                  <Col span={24}>
                    <Form.Item
                      label={
                        <span style={{ marginBottom: "22px" }}>
                          اختر البطاقة
                        </span>
                      }
                      labelCol={{ className: "ghaith--label-style" }}
                      style={{ marginBottom: "24px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        {cardTypes?.map((card: any) => (
                          <div
                            key={card.id}
                            onClick={() => setSelectedCard(card.id)}
                            className="ghaith--gift-image-card"
                            style={{
                              border:
                                selectedCard === card.id
                                  ? "3px solid #009767"
                                  : "3px solid #ddd",

                              backgroundColor:
                                selectedCard === card.id ? "#f0fdf7" : "#fff",
                            }}
                          >
                            {/* Card Image */}
                            <div className="ghaith--gift-image-container">
                              <img
                                src={
                                  card.icon_ids?.[0] ||
                                  card.image_cover_ids?.[0] ||
                                  ""
                                }
                                alt={card.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>

                            {/* Optional: Active indicator checkmark */}
                            {selectedCard === card.id && (
                              <div className="ghaith--gift-badge">✓</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </Form.Item>
                  </Col>
                  {/* Amount */}
                  <Col span={24}>
                    <Form.Item
                      name="amount"
                      label={
                        <span style={{ marginBottom: "8px" }}>المبلغ</span>
                      }
                      labelCol={{ className: "ghaith--label-style" }}
                      rules={[
                        {
                          required: true,
                          message: "الرجاء تعبئة الحقل",
                        },
                        {
                          validator: (_, value) => {
                            if (value === undefined || value === null) {
                              return Promise.resolve();
                            }
                            if (Number(value) < 5) {
                              return Promise.reject(
                                new Error("الحد الأدنى للمبلغ  هو 5 ريال"),
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      style={{ marginBottom: "14px" }}
                    >
                      <CustomLabelInput
                        withCurrency
                        label=""
                        placeholder="100"
                        type="number"
                        className="gh--add_beneficiary-input"
                      />
                    </Form.Item>
                  </Col>
                  {/* Show Amount Checkbox */}{" "}
                  <Col span={24}>
                    <Form.Item
                      name="show_amount"
                      valuePropName="checked"
                      style={{ marginBottom: "14px" }}
                    >
                      <Checkbox
                        style={{ fontSize: "16px" }}
                        className="ghaith--custom-checkbox"
                      >
                        <div className="ghaith--label-style gh--font-light">
                          <span>إظهار المبلغ للمهدى إليه</span>
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  {/* Your Name */}
                  <Col span={24}>
                    <Form.Item
                      name="sender_name"
                      label={<span style={{ marginBottom: "8px" }}>اسمك</span>}
                      labelCol={{ className: "ghaith--label-style" }}
                      style={{ marginBottom: "14px" }}
                    >
                      <CustomLabelInput
                        label=""
                        placeholder="الإسم"
                        className="gh--add_beneficiary-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      name="show_name_in_dedication"
                      valuePropName="checked"
                      style={{ marginBottom: "14px" }}
                    >
                      <Checkbox
                        style={{ fontSize: "16px" }}
                        className="ghaith--custom-checkbox"
                      >
                        <div className="ghaith--label-style gh--font-light">
                          <span>إظهار اسمك للمهدى إليه</span>
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  {/* Send Copy Checkbox */}{" "}
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      name="send_copy_to_sender"
                      valuePropName="checked"
                      style={{ marginBottom: "14px" }}
                    >
                      <Checkbox
                        style={{ fontSize: "16px" }}
                        className="ghaith--custom-checkbox"
                      >
                        <div className="ghaith--label-style gh--font-light">
                          <span>إرسال نسخة إلى جوالي</span>
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </Col>{" "}
                  {/* Recipient Name */}
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label={
                        <span style={{ marginBottom: "8px" }}>
                          اسم المهدى إليه
                        </span>
                      }
                      labelCol={{ className: "ghaith--label-style" }}
                      rules={[
                        { required: true, message: "الرجاء تعبئة الحقل" },
                      ]}
                      style={{ marginBottom: "14px" }}
                    >
                      <CustomLabelInput
                        label=""
                        placeholder="اسم المهدى إليه"
                        className="gh--add_beneficiary-input"
                      />
                    </Form.Item>
                  </Col>
                  {/* Recipient Mobile */}
                  <Col span={24}>
                    <Form.Item
                      name="mobile_number"
                      label={
                        <span style={{ marginBottom: "8px" }}>
                          رقم جوال المهدى إليه
                        </span>
                      }
                      labelCol={{ className: "ghaith--label-style" }}
                      rules={[
                        { required: true, message: "الرجاء تعبئة الحقل" },
                        {
                          pattern: /^05\d{8}$/,
                          message: "يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام",
                        },
                      ]}
                      style={{ marginBottom: "14px" }}
                    >
                      <CustomLabelInput
                        withSaudiNumber
                        label=""
                        placeholder="05XXXXXXXX"
                        type="tel"
                        maxLength={10}
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
                      المتــــــــابعة للدفع
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>{" "}
          <Col
            xxl={10}
            xl={10}
            lg={10}
            md={12}
            sm={22}
            xs={22}
            style={{ justifyContent: "center" }}
          >
            <div className="gift--gift-big-image-container">
              {selectedCardData && (
                <img
                  className="ghaith--gift-big_card"
                  src={selectedCardData.image_cover_ids[0]}
                  alt={selectedCardData.name}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>{" "}
      <MoyasarForm
        moyassarType={"general"}
        moyassarState={null}
        amount={Number(form.getFieldValue("amount"))}
        description="ghaith"
        open={displayMoyasar}
        handleClose={() => {
          setDisplayMoyasar(false);
        }}
      />
    </>
  );
};

export default GiftComponent;
