import { Button, Checkbox, Form } from "antd";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import verifiedIcon from "../../assets/icons/verified.svg";
import bank from "../../assets/icons/bank-transfer-removebg-preview.png";
import { AppDispatch, RootState } from "../../apis/store";
import CustomLabelSelect from "../select/CustomLabelSelect";
import { convertFileToBase64, showNotification } from "../../apis/utils/utils";
import CustomUploadInput from "../../bibilio/Inputs/CustomUploadInput";
import DonatePolicyModal from "./DonatePolicyModal";
import CustomLabelInput from "../../bibilio/Inputs/CustomLabelInput";
import PolicyTooltip from "./PolicyTooltip";
import {
  addBankTransfer,
  getCompanyBanks,
} from "../../apis/actions/donation.actions";
import {
  setAccessTokenPrint,
  setMessage,
  setPrinting,
  setResIds,
  setResModel,
} from "../../apis/slices/ratingSlice";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: () => void;
  view?: any;
}

const BankTransferModal = ({
  isModalVisible,
  setIsModalVisible,
  view,
}: Props) => {
  const [form] = Form.useForm();
  const [loadingSend, setLoadingSend] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);
  const [, setShowDonationForm] = useState(false);
  const [valid, setIsvalid] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Close tooltip when modal is closed
  useEffect(() => {
    if (!isModalVisible) {
      setTooltipVisible(false);
    }
  }, [isModalVisible]);

  useEffect(() => {}, [dispatch]);
  const { program_id, share_id, share_quantity } = useSelector(
    (state: RootState) => state?.moyassar,
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails,
  );
  const donor = useSelector((state: RootState) => state?.profile?.DonorDetails);
  const banks = useSelector((state: RootState) => state?.donation?.banks);
  const validateDonation = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);

      const FormValues = form.getFieldsValue();
      let ApplyData: any = {
        ...FormValues,
        is_approved: valid,
      };
      if (view === "payment") {
        ApplyData = {
          ...ApplyData,
          program_id,
          share_id,
          share_quantity,
        };
      }
      if (beneficiaryDetails?.id) {
        ApplyData.partner_id = beneficiaryDetails.id;
      } else if (donor?.id) {
        ApplyData.partner_id = donor.id;
      }

      dispatch(addBankTransfer(ApplyData)).then((result: any) => {
        const request = result?.payload?.result;
        if (request?.code === 200) {
          if (request?.access_token) {
            dispatch(setAccessTokenPrint(request?.access_token));
          }
          dispatch(setResModel(request?.res_model));
          dispatch(setMessage(request?.request_number));
          dispatch(setResIds([request?.request_id]));
          dispatch(setPrinting(true));
          form.resetFields();
          setLoadingSend(false);
          setIsModalVisible();
        } else {
          showNotification(request?.message, "error");
          setLoadingSend(false);
        }
      });
      setLoadingSend(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getCompanyBanks());
  }, [dispatch]);
  const handleFileChange = async (uploadFileList: any[]) => {
    setFileList(uploadFileList);
    const attachments = [];

    for (const fileItem of uploadFileList) {
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
      attachment_ids: attachments,
    });
  };
  const handlePolicyAccept = () => {
    setShowDonationForm(true);
  };
  const startDonation = () => {
    setIsPolicyVisible(true);
  };
  return (
    <ModalComponent
      title=""
      showCloseIcon={true}
      open={isModalVisible}
      onClose={() => {
        setIsModalVisible();
        form.resetFields();
        setFileList([]);
      }}
      closeOnOutsideClick={false}
      width={450}
    >
      <div className="ghaith--login-form-wrapper ghaith--donate_form-wrapper">
        <div className="ghaith--login-form-header ghaith--donate-header">
          <div className="ghaith--login-form-icon">
            <img src={verifiedIcon} alt="تسجيل متبرع جديد" />
          </div>
          <h4 className="ghaith--donate-title" style={{ fontSize: "20px" }}>
            تـــــــــــبرع بأمــــــــــــان
          </h4>
        </div>

        <div className="ghaith--payment-methods">
          <div className="ghaith--payment-icon-wrapper">
            <img
              src={bank}
              alt="Bank Transfer"
              className="ghaith--payment-icon"
            />
          </div>
        </div>

        <div className="ghaith--login-form-body ghaith--donate_form-body">
          <Form
            form={form}
            layout="vertical"
            onValuesChange={() => {
              const values = form.getFieldsValue();
              const requiredFieldsFilled =
                values.bank_account_id &&
                values.name_who_transfer &&
                values.attachment_ids?.length > 0;

              setIsFormValid(!!requiredFieldsFilled);
            }}
          >
            <Form.Item
              name="bank_account_id"
              rules={[
                {
                  required: true,
                  message: "الرجاء تعبئة الحقل",
                },
              ]}
              className="ghaith--label-inputs"
            >
              <CustomLabelSelect
                WrapperclassName="ghaith--donate-select ghaith--bank-select"
                className="ghaith--bank-select"
                placeholder="اختر البنك المناسب"
                label=""
                allowClear
                options={banks?.map((bank: any) => ({
                  ...bank,
                  name: `${bank.bank_name} - ${bank.acc_number}`,
                }))}
              />
            </Form.Item>
            <div className="ghaith--bank-info-test">
              <p className="ghaith--transfer-text">معلومات بعد التحويل</p>
              <p className="ghaith--transfer-text-description">
                يجب إرفاق صوره من إيصال التحويل البنكي و اسم الذي قام بالتحويل
                حتى يتم قبول الطلب.
              </p>
            </div>
            <Form.Item
              labelCol={{ className: "ghaith--label-style" }}
              label={
                <span style={{ marginBottom: "8px", fontWeight: "600" }}>
                  اسم صاحب الحساب الذي تم التحويل منه
                </span>
              }
              name="name_who_transfer"
              rules={[
                {
                  required: true,
                  message: "الإسم  مطلوب",
                },
              ]}
              className="ghaith--label-inputs"
            >
              <CustomLabelInput
                placeholder="ادخل الإسم "
                label=""
                type="text"
                className="ghaith--donate-transparent-input"
              />
            </Form.Item>
            <Form.Item
              name="attachment_ids"
              style={{ marginBottom: "18px" }}
              className="ghaith--label-inputs"
              rules={[
                {
                  required: true,
                  message: "الرجاء إرفاق صورة سند التحويل",
                },
              ]}
            >
              <div className="ghaith--upload-input-wrapper">
                <CustomUploadInput
                  text="رفع صورة سند التحويل"
                  multiple={true}
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  fileList={fileList}
                />
              </div>
            </Form.Item>{" "}
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
                    باستمرارك في عملية الدفع الحالية فأنت موافق على{" "}
                    <a>الشروط والأحكام</a>
                  </span>
                </div>
              </Checkbox>
            </PolicyTooltip>
            <Button
              style={{ marginTop: "0" }}
              type="primary"
              block
              className="ghaith--login-button ghaith--donate-button"
              disabled={!isFormValid || !valid || loadingSend}
              loading={loadingSend}
              onClick={validateDonation}
            >
              الدفع
            </Button>
          </Form>
          <p
            className="ghaith--policy-text"
            style={{ textAlign: "center", marginTop: "0", marginBottom: "5px" }}
          >
            <span
              style={{
                color: "#109d72",
                fontWeight: 600,
              }}
            >
              سيتم حفظ بيانات البطاقة عند إتمام العملية.
            </span>
            <>
              <br />
              <span
                style={{
                  color: "#109d72",
                  fontWeight: 600,
                }}
              >
                خدمة الدفع مقدمة من قبل ميسر{" "}
              </span>
            </>
          </p>
          <p
            className="ghaith--policy-text"
            style={{ textAlign: "center", color: "#1c4246", marginTop: "0" }}
          >
            <>
              بإتمام التبرع أنت توافق على{" "}
              <span
                className="ghaith--policy-link"
                style={{
                  color: "#1c4246",
                  fontWeight: 600,
                }}
                onClick={startDonation}
              >
                سياسة التبرع{" "}
              </span>
            </>
          </p>
        </div>
        <DonatePolicyModal
          isModalVisible={isPolicyVisible}
          setIsModalVisible={setIsPolicyVisible}
          onAccept={handlePolicyAccept}
        />
      </div>
    </ModalComponent>
  );
};

export default BankTransferModal;
