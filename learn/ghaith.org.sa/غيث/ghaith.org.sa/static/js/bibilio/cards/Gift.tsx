import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "antd";
import { FormInstance } from "antd/lib/form";
import CustomLabelInput from "../Inputs/CustomLabelInput";
import Switch from "../switch/SwitchToggle";
import giftIcon from "../../assets/icons/gift-box.svg";
import CustomLabelSelect from "../../components/select/CustomLabelSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../apis/store";
import ModalComponent from "../Modal/ModalComponent";
import { useCookies } from "react-cookie";
import { EyeOutlined } from "@ant-design/icons";

interface GiftProps {
  form: FormInstance;
  isDonationGiftEnabled: boolean;
  setIsDonationGiftEnabled: (v: boolean) => void;
  variant?: any;
}

const Gift: React.FC<GiftProps> = ({
  form,
  isDonationGiftEnabled,
  setIsDonationGiftEnabled,
  variant,
}) => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [card, setCard] = useState<boolean>(false);
  const [isNameGiftEnabled, setIsNameGiftEnabled] = useState<boolean>(false);
  const [cookies] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;

  const cardTypes = useSelector(
    (state: RootState) => state?.donation?.cardTypes
  );
  const donor = useSelector((state: RootState) => state?.profile?.DonorDetails);

  useEffect(() => {
    if (isConnected && cookies?.role === "donor") {
      form.setFieldsValue({
        inputFieldName: donor?.name,
      });
    }
  }, [cookies?.role, donor?.name, form, isConnected]);

  return (
    <>
      {variant !== "donation" && (
        <>
          {" "}
          <div className="ghaith--gift-section">
            <div className="ghaith--gift-content">
              <img src={giftIcon} alt="Gift" className="ghaith--gift-icon" />
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
              name="showName"
              label=""
              className="ghaith--donation-selects"
              style={{ marginBottom: "0px" }}
            >
              <Switch
                label=""
                onSwitchChange={(checked) => setIsDonationGiftEnabled(checked)}
              />
            </Form.Item>
          </div>
        </>
      )}
      {isDonationGiftEnabled && (
        <>
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
          </Form.Item>
          {isNameGiftEnabled && (
            <Form.Item
              className="gh-error-message"
              name="inputFieldName"
              rules={[
                {
                  required: true,
                  message: "الإسم مطلوب",
                },
                {
                  validator: (_, value) => {
                    if (value && !/^[A-Za-z\u0600-\u06FF\s]+$/.test(value)) {
                      return Promise.reject(new Error("فقط الحروف مسموح بها!"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CustomLabelInput
                label="إسمك"
                type="text"
                className="ghaith--donate-transparent-input"
              />
            </Form.Item>
          )}
          <Form.Item
            name="inputFieldDedicatedName"
            rules={[
              {
                required: true,
                message: " إسم المهدى له مطلوب",
              },

              {
                validator: (_, value) => {
                  if (value && !/^[A-Za-z\u0600-\u06FF\s]+$/.test(value)) {
                    return Promise.reject(new Error("فقط الحروف مسموح بها!"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className="ghaith--label-inputs"
          >
            <CustomLabelInput
              label="إســـــــم المهـــــــــــــدى له"
              type="text"
              className="ghaith--donate-transparent-input"
            />
          </Form.Item>
          <Form.Item
            name="inputFieldPhone"
            rules={[
              {
                required: true,
                message: "الرجاء تعبئة الحقل",
              },
            ]}
            className="ghaith--label-inputs"
          >
            <CustomLabelInput
              label="رقـــــــم المهـــــــــــــدى له"
              type="text"
              className="ghaith--donate-transparent-input"
            />
          </Form.Item>

          <Row
            gutter={16}
            justify="space-between"
            style={{ paddingBottom: "1.5rem" }}
          >
            <Col>
              <Form.Item
                name="showName"
                label=""
                className="ghaith--donation-selects"
                style={{ marginBottom: "0px" }}
              >
                <Switch
                  label="اضهــار اسمــك"
                  onSwitchChange={() => {
                    form.setFieldValue("showName", !isNameGiftEnabled);
                    setIsNameGiftEnabled(!isNameGiftEnabled);
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="sendCopie "
                label=""
                className="ghaith--donation-selects"
                style={{ marginBottom: "0px" }}
              >
                <Switch label="إرسال نسخة إلى جوالي" />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            block
            className="ghaith--login-button ghaith--donate-button ghaith--watch-card-btn"
            onClick={() => setCard(form.getFieldValue("card_id") ?? false)}
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
          </Button>
        </>
      )}

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
                    (el: any) => el.id === form.getFieldValue("card_id")
                  )[0].image_cover_ids[0]
                : null
            }
          />
        </div>
      </ModalComponent>
    </>
  );
};

export default Gift;
