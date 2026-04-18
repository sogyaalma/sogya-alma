import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { Form, Button, Row, Col, Checkbox } from "antd";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import { getCardTypes } from "../../../apis/actions/donation.actions";
import MoyasarForm from "../../../components/moyassar/MoyassarForm";
import { setGift, setRamadanLines } from "../../../apis/slices/moyassarSlice";
import mealsImage from "../../../assets/images/mealsImage.png";
import RamadanCalendar from "./ramadanCalenedar";
import {
  getAvailableDays,
  getRamadanList,
} from "../../../apis/actions/ramadan.actions";
import InputDate from "../../../bibilio/Inputs/InputDate";
import dayjs from "dayjs";
import CustomLabelSelect from "../../../components/select/CustomLabelSelect";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import Switch from "../../../bibilio/switch/SwitchToggle";
import giftIcon from "../../../assets/icons/gift-box.svg";
import PolicyTooltip from "../../../components/bank-transfer/PolicyTooltip";
import { scroll } from "../../../apis/utils/utils";

const MealsComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const calendarRef = useRef<HTMLDivElement>(null);
  const firstAvailableDateRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [displayMoyasar, setDisplayMoyasar] = useState<boolean>(false);
  const [card, setCard] = useState<boolean>(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [valid, setIsvalid] = useState(false);
  const [showCalendarTooltip, setShowCalendarTooltip] = useState(false);

  const [isDonationGiftEnabled, setIsDonationGiftEnabled] =
    useState<boolean>(false);

  const cardTypes = useSelector(
    (state: RootState) => state?.donation?.cardTypes,
  );
  const ramadanList = useSelector(
    (state: RootState) => state?.ramadan?.ramadanList,
  );
  const existingRamadanLines = useSelector(
    (state: RootState) => state?.moyassar?.ramadan_lines,
  );
  const totalDonation = existingRamadanLines.reduce(
    (total: number, line: any) => total + Number(line.amount || 0),
    0,
  );

  useEffect(() => {
    dispatch(getCardTypes());
    dispatch(getRamadanList());
    dispatch(getAvailableDays());
  }, [dispatch]);

  const handleDeleteLine = (index: number) => {
    const updatedLines = existingRamadanLines.filter(
      (_: any, i: number) => i !== index,
    );
    dispatch(setRamadanLines(updatedLines));
  };

  const handleAddAnotherDay = () => {
    if (calendarRef.current) {
      scroll(calendarRef);

      // Show tooltip animation
      setShowCalendarTooltip(true);

      // Hide tooltip after animation completes (6s * 4 iterations = 24s)
      setTimeout(() => {
        setShowCalendarTooltip(false);
      }, 24000);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (isDonationGiftEnabled) {
        const json = {
          ...values,
          send_copy_to_sender:
            form.getFieldValue("send_copy_to_sender") ?? false,
          show_name_in_dedication:
            form.getFieldValue("show_name_in_dedication") ?? false,
          show_amount: form.getFieldValue("show_amount") ?? false,
          send_gift: true,
          card_type_id: selectedCard ?? false,
        };
        dispatch(setGift(json));
      }
      setDisplayMoyasar(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="ghaith--meals-wrapper">
        <Row gutter={[32, 32]} justify={"center"} dir="ltr">
          <Col span={24} style={{ direction: "rtl" }}>
            {" "}
            <h2 className="ghaith--gift-form-title gh--font-light">
              حدد تفاصيل تبرعك :
            </h2>
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
              {ramadanList?.banner_image_ids &&
              ramadanList?.banner_image_ids?.length > 0 ? (
                <img
                  className="ghaith--gift-big_card"
                  src={ramadanList?.banner_image_ids[0]}
                  alt={"Meals Image"}
                />
              ) : (
                <img
                  className="ghaith--gift-big_card"
                  src={mealsImage}
                  alt={"Meals Image"}
                />
              )}
            </div>
          </Col>
          {/* Right Side - Form */}
          <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
            <div className=" ghaith--meals-wrapper">
              <div ref={calendarRef}>
                <RamadanCalendar
                  ramadanList={ramadanList}
                  firstAvailableDateRef={firstAvailableDateRef}
                  showTooltip={showCalendarTooltip}
                />
              </div>

              {/* Existing Ramadan Lines Display */}
              {existingRamadanLines && existingRamadanLines.length > 0 && (
                <div style={{ marginTop: "24px", marginBottom: "32px" }}>
                  {" "}
                  <h6
                    className="ghaith--gift-form-title gh--font-light"
                    style={{ fontSize: "20px" }}
                  >
                    تفاصيل تبرعك{" "}
                  </h6>
                  {existingRamadanLines.map((line: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        marginBottom: "12px",
                        border: "1px solid #e8e8e8",
                        position: "relative",
                      }}
                    >
                      {/* Delete Icon */}
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteLine(index)}
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "8px",
                          zIndex: 1,
                        }}
                      />

                      <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
                        <Col span={24} style={{ marginBottom: "px" }}>
                          <InputDate
                            placeholder=""
                            value={dayjs(line.date)}
                            disabled
                            style={{ width: "100%" }}
                          />
                        </Col>
                        <Col span={24} style={{ marginBottom: "px" }}>
                          <CustomLabelInput
                            label=""
                            value={line.quantity}
                            disabled
                            className="gh--add_beneficiary-input"
                            withPrefix
                            prefix={"وجبة"}
                          />
                        </Col>
                        <Col span={24} style={{ marginBottom: "px" }}>
                          {" "}
                          <CustomLabelInput
                            label=""
                            value={line.amount}
                            disabled
                            className="gh--add_beneficiary-input"
                            withCurrency
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}{" "}
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                      position: "relative",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="button"
                      icon={<PlusOutlined />}
                      onClick={handleAddAnotherDay}
                      style={{
                        fontSize: "18px",
                        minWidth: "280px",
                        height: "45px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0 20px",
                      }}
                      className="ghaith--login-button ghaith--donate-button"
                    >
                      <span> اضــــــافة يوم آخـــــر</span>
                    </Button>
                  </Col>
                </div>
              )}

              {/* Gift Section Toggle */}
              <div
                className="ghaith--gift-section"
                style={{ marginBottom: "24px" }}
              >
                <div className="ghaith--gift-content">
                  <img
                    src={giftIcon}
                    alt="Gift"
                    className="ghaith--gift-icon"
                  />
                  <div className="ghaith--gift-text">
                    <p className="ghaith--gift-text-primary">
                      اهدِ أحبتك أعظم هدية...
                    </p>
                    <p className="ghaith--gift-text-primary">
                      تبرّع عنهم ومشاركهم أجرًا لا ينقطع
                    </p>
                  </div>
                </div>
                <Form.Item
                  name="enable_gift"
                  label=""
                  className="ghaith--donation-selects"
                  style={{ marginBottom: "0px" }}
                >
                  <Switch
                    label=""
                    onSwitchChange={(checked) =>
                      setIsDonationGiftEnabled(checked)
                    }
                  />
                </Form.Item>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ direction: "rtl" }}
              >
                <Row gutter={[16, 16]}>
                  {isDonationGiftEnabled && (
                    <>
                      {/* Card Type Selection */}
                      <Col span={24}>
                        <Form.Item
                          name="card_id"
                          className="ghaith--label-inputs"
                          rules={[
                            {
                              required: true,
                              message: "نوع البطاقة مطلوب",
                            },
                          ]}
                        >
                          <CustomLabelSelect
                            WrapperclassName="ghaith--donate-select"
                            className="ghaith--label-inputs"
                            label="نوع البطاقة"
                            placeholder=""
                            allowClear
                            onChange={(e) => setSelectedCard(e)}
                            options={cardTypes.map((type: any) => ({
                              id: type.id,
                              name: type.name,
                            }))}
                          />
                        </Form.Item>{" "}
                      </Col>

                      {/* Watch Card Button */}
                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          type="primary"
                          block
                          style={{
                            maxWidth: "99%",
                            boxShadow: "0.2px 1px 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                          className="ghaith--login-button ghaith--donate-button ghaith--watch-card-btn"
                          onClick={() =>
                            setCard(form.getFieldValue("card_id") ?? false)
                          }
                          icon={
                            <EyeOutlined
                              style={{
                                fontSize: "18px",
                                color: selectedCard ? "#08c" : "",
                                marginTop: "5px",
                                marginRight: "5px",
                              }}
                            />
                          }
                          iconPosition="end"
                        >
                          مشاهدة البطاقة
                        </Button>{" "}
                      </Col>

                      {/* Show Amount Checkbox */}
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
                          label={
                            <span style={{ marginBottom: "8px" }}>اسمك</span>
                          }
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

                      {/* Show Name and Send Copy Checkboxes */}
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
                      </Col>

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
                              message:
                                "يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام",
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
                    </>
                  )}
                  {/* Submit Button */}{" "}
                  <Col span={24} style={{ padding: "0 20px" }}>
                    <PolicyTooltip
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
                            بإتمام التبرع أنت توافق على <a>سياسة المساهمة</a>
                          </span>
                        </div>
                      </Checkbox>
                    </PolicyTooltip>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        fontSize: "18px",
                        width: "95%",
                        height: "45px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent:
                          totalDonation > 0 ? "space-between" : "center",
                        alignItems: "center",
                        padding: "0 20px",
                      }}
                      className="ghaith--login-button ghaith--donate-button"
                      disabled={totalDonation <= 0 || !valid}
                    >
                      <span>متـــــــابعة الدفع</span>
                      {totalDonation > 0 && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              flexDirection: "column",
                            }}
                          />
                          <p>{totalDonation}</p>
                          <p className="icon-saudi_riyal"></p>
                        </span>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>{" "}
        </Row>
      </div>{" "}
      <ModalComponent
        open={card}
        title=""
        onClose={() => setCard(false)}
        closeOnOutsideClick
      >
        <div style={{ justifyContent: "center", display: "flex" }}>
          <img
            style={{ maxWidth: "100%" }}
            src={
              form.getFieldValue("card_id")
                ? cardTypes.filter(
                    (el: any) => el.id === form.getFieldValue("card_id"),
                  )[0].image_cover_ids[0]
                : null
            }
          />
        </div>
      </ModalComponent>
      <MoyasarForm
        moyassarType={"general"}
        moyassarState={null}
        amount={existingRamadanLines.reduce(
          (total: number, line: any) => total + Number(line.amount || 0),
          0,
        )}
        description="ghaith"
        open={displayMoyasar}
        handleClose={() => {
          setDisplayMoyasar(false);
        }}
      />
    </>
  );
};

export default MealsComponent;
