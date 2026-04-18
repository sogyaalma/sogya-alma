import { Form, Row, Col, Button } from "antd";
import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { useEffect, useState } from "react";
import { showNotification } from "../../../../apis/utils/utils";
import { getFamilyMembersDetails } from "../../../../apis/actions/profile.actions";
import {
  addStatementRequest,
  getStatements,
  toPrintstatement,
} from "../../../../apis/actions/beneficiary.actions";
import {
  setRatingVisible,
  setResIds,
  setResModel,
} from "../../../../apis/slices/ratingSlice";
import PrimarButton from "../../../../bibilio/Buttons/PrimaryButton";
import { IconDownload } from "@tabler/icons-react";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatementRequestModal = ({
  isModalVisible,
  setIsModalVisible,
}: Props) => {
  const [form] = Form.useForm();
  const [loadingSend, setLoadingSend] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const familyMembers = useSelector(
    (state: RootState) => state?.profile?.familyMembers
  );
  const { res_ids, res_model } = useSelector(
    (state: RootState) => state?.rating
  );
  const loadinPrint = useSelector(
    (state: RootState) => state?.beneficiary.loadingPrint
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFamilyMembersDetails());
  }, [dispatch]);
  const handlePrint = async () => {
    try {
      await dispatch(toPrintstatement(accessToken));
    } finally {
    }
  };
  const validateDonation = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const FormValues = form.getFieldsValue();

      dispatch(addStatementRequest(FormValues)).then((result: any) => {
        const request = result?.payload?.result;
        if (request?.code === 200) {
          if (request?.access_token) {
            setAccessToken(request?.access_token);
          }
          dispatch(setResModel(request.res_model));
          dispatch(setResIds([request.request_id]));
          dispatch(getStatements({ limit: 6, page: 1 }));
          setLoadingSend(false);
        } else {
          showNotification(request?.message, "error");
          setIsModalVisible(false);
          setLoadingSend(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoadingSend(false);
    }
  };

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
        form.resetFields();
        setAccessToken(null);
        if (res_ids && res_model) {
          dispatch(setRatingVisible(true));
        }
      }}
      closeOnOutsideClick={true}
      width={550}
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
            طباعة مشهد{" "}
          </h2>
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
                name="beneficiary_id"
                labelCol={{ className: "ghaith--label-style" }}
                label={<span style={{ marginBottom: "8px" }}> المستفيد </span>}
                style={{ marginBottom: "14px" }}
              >
                <CustomLabelSelect
                  label=""
                  placeholder="إختر المستفيد"
                  options={familyMembers}
                  allowClear={false}
                />
              </Form.Item>
            </Col>

            {/* Download Button - Only show if PDF exists */}
            {accessToken && (
              <Col
                span={24}
                style={{ textAlign: "center", marginBottom: "2rem" }}
              >
                <PrimarButton
                  title={loadinPrint ? "جاري التحميل..." : "طباعة المشهد"}
                  icon={loadinPrint ? null : <IconDownload />}
                  onClick={handlePrint}
                  disabled={loadinPrint}
                  loading={loadinPrint}
                />
              </Col>
            )}

            {/* Submit Button */}
            <Col span={24} style={{ textAlign: "end" }}>
              <Button
                loading={loadingSend}
                disabled={loadingSend || accessToken !== null}
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
                طلب طباعة{" "}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </ModalComponent>
  );
};

export default StatementRequestModal;
