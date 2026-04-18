import * as React from "react";
import {
  Card,
  Box,
  Typography,
  Avatar,
  Button as MuiButton,
} from "@mui/material";
import { Form, Row, Col, Button } from "antd";
import { IconUser } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import {
  EditDonorInformations,
  toSendEditOtp,
} from "../../../../apis/actions/donor.actions";
import UploadInput from "../../../../bibilio/Inputs/UploadInput";
import { UploadOutlined } from "@ant-design/icons";
import CustomLabelInput from "../../../../bibilio/Inputs/CustomLabelInput";
import {
  convertFileToBase64,
  showNotification,
} from "../../../../apis/utils/utils";
import { getDonorDetails } from "../../../../apis/actions/profile.actions";
import OtpEditModal from "../otp/OtpEdit";

type Props = {
  name?: string;
  remainingText?: string;
  type?: "general | internal";
};

export default function EditProfile({ type }: Props) {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [loadingSend, setLoadingSend] = React.useState<boolean>(false);
  const [initialValues, setInitialValues] = React.useState<any>({});
  const [hasChanges, setHasChanges] = React.useState<boolean>(false);
  const [changedValues, setChangedValues] = React.useState<any>({});
  const [isOtpModalVisible, setIsOtpModalVisible] =
    React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );

  React.useEffect(() => {
    if (donorDetails && isEditing) {
      const values = {
        email: donorDetails.email || "",
        mobile: donorDetails.mobile || donorDetails.phone || "",
        image: donorDetails.image || [],
      };
      form.setFieldsValue(values);
      setInitialValues(values);
      setHasChanges(false);
    }
  }, [donorDetails, isEditing, form]);

  const checkForChanges = () => {
    const currentValues = form.getFieldsValue();

    const emailChanged = currentValues.email !== initialValues.email;
    const mobileChanged = currentValues.mobile !== initialValues.mobile;

    const imageChanged =
      currentValues.image_ids && currentValues.image_ids.length > 0;

    setHasChanges(emailChanged || mobileChanged || imageChanged);
  };

  const handleFileChange = async (fileList: any[]) => {
    if (fileList.length > 0) {
      const file = fileList[0]?.originFileObj;
      if (file) {
        try {
          const base64 = await convertFileToBase64(file);
          const imageData = {
            filename: file.name,
            data: base64,
          };
          form.setFieldsValue({
            image_ids: [imageData],
          });
          checkForChanges();
        } catch (error) {
          console.error("Error converting file to Base64:", error);
        }
      }
    } else {
      form.setFieldsValue({
        image_ids: undefined,
      });
      checkForChanges();
    }
  };

  const validateAndSubmit = async () => {
    try {
      await form.validateFields();
      setLoadingSend(true);
      const currentValues = form.getFieldsValue();

      const changedFields: any = {};

      if (currentValues.email !== initialValues.email) {
        changedFields.email = currentValues.email;
      }

      if (currentValues.mobile !== initialValues.mobile) {
        changedFields.mobile = currentValues.mobile;
      }

      if (currentValues.image_ids && currentValues.image_ids.length > 0) {
        changedFields.image_ids = currentValues.image_ids;
      }
      if (Object.keys(changedFields).length === 0) {
        showNotification("لا توجد تغييرات للحفظ", "error");
        setLoadingSend(false);
        return;
      }

      setChangedValues(changedFields);

      // Check if mobile has changed
      const mobileChanged = currentValues.mobile !== initialValues.mobile;

      if (mobileChanged) {
        // If mobile changed, send OTP first
        dispatch(toSendEditOtp({ mobile: currentValues.mobile })).then(
          (result: any) => {
            const response = result?.payload?.result;
            if (response?.code === 200) {
              showNotification(
                response?.message || "تم إرسال رمز التحقق",
                "success"
              );
              setTimeout(() => {
                setIsOtpModalVisible(true);
              }, 3000);

              setLoadingSend(false);
            } else {
              showNotification(
                response?.message || "حدث خطأ أثناء إرسال رمز التحقق",
                "error"
              );
              setLoadingSend(false);
            }
          }
        );
      } else {
        dispatch(EditDonorInformations(changedFields)).then((result: any) => {
          const response = result?.payload?.result;
          if (response?.code === 200) {
            showNotification(response?.message, "success");
            dispatch(getDonorDetails());
            setIsEditing(false);
            setLoadingSend(false);
            setHasChanges(false);
            form.resetFields();
          } else {
            showNotification(
              response?.message || "حدث خطأ أثناء التحديث",
              "error"
            );
            setLoadingSend(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
      setLoadingSend(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setHasChanges(false);
    form.resetFields();
  };

  return (
    <>
      <Card
        dir="rtl"
        sx={{
          position: "relative",
          p: 4,
          borderRadius: 3,
          bgcolor: "#f3f9f9",
          boxShadow: "0px 10px 24px rgba(0,0,0,0.10)",
          overflow: "hidden",
          mt: 2,
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography
            sx={{
              color: "#009767",
              fontSize: "24px",
              fontWeight: "bold",
              mb: 1,
            }}
            className="gh--font-light"
          >
            {isEditing ? "تعديل الملف الشخصي" : "الملف الشخصي"}
          </Typography>
          <Typography
            sx={{ color: "#666", fontSize: "15px" }}
            className="gh--font-light"
          >
            {isEditing ? "قم بتحديث بياناتك الشخصية" : "معلوماتك الشخصية"}
          </Typography>
        </Box>

        {/* Profile Avatar Section */}
        {!isEditing && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 3,
                bgcolor: "#d3eae8",
                display: "grid",
                placeItems: "center",
                mb: 2,
              }}
            >
              <Avatar
                variant="rounded"
                sx={{ width: 100, height: 100, bgcolor: "transparent" }}
              >
                {donorDetails?.image && donorDetails.image?.length > 0 ? (
                  <img
                    src={donorDetails.image[0]}
                    alt="Profile"
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                ) : (
                  <IconUser size={50} color="#07a887" />
                )}
              </Avatar>
            </Box>
            <Typography
              sx={{
                color: "#263a3a",
                fontWeight: 700,
                fontSize: 20,
                mb: 0.5,
              }}
              className="gh--font-medium"
            >
              {donorDetails?.name}
            </Typography>
            <Typography
              sx={{
                color: "#666",
                fontSize: 16,
                mb: 0.5,
              }}
              className="gh--font-regular"
            >
              {donorDetails?.email}
            </Typography>
            <Typography
              sx={{
                color: "#666",
                fontSize: 16,
              }}
              className="gh--font-regular"
            >
              {donorDetails?.mobile || donorDetails?.phone}
            </Typography>
          </Box>
        )}

        {/* Edit Button (when not editing) */}
        {!isEditing && (
          <Box sx={{ textAlign: "center" }}>
            <MuiButton
              variant="contained"
              onClick={() => setIsEditing(true)}
              sx={{
                bgcolor: "#009767",
                color: "white",
                px: 4,
                py: 1,
                borderRadius: 2,
                fontSize: 16,
                "&:hover": {
                  bgcolor: "#007a54",
                },
              }}
              className="gh--font-regular"
            >
              تعديل البيانات
            </MuiButton>
          </Box>
        )}

        {/* Edit Form (when editing) */}
        {isEditing && (
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={validateAndSubmit}
              onValuesChange={checkForChanges}
              style={{ direction: "rtl" }}
            >
              <Row gutter={[16, 8]}>
                {/* Email */}
                <Col span={24}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء تعبئة الحقل",
                      },
                      {
                        type: "email",
                        message: "الرجاء إدخال بريد إلكتروني صحيح",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                    style={{ marginBottom: "14px" }}
                  >
                    <CustomLabelInput
                      label="البريد الإلكتروني"
                      placeholder="أدخل البريد الإلكتروني"
                      type="email"
                    />
                  </Form.Item>
                </Col>

                {/* Mobile */}
                <Col span={24}>
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "الرجاء تعبئة الحقل",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "الرجاء إدخال أرقام فقط",
                      },
                    ]}
                    className="ghaith--label-inputs"
                    labelCol={{ className: "ghaith--label-style" }}
                    style={{ marginBottom: "14px" }}
                  >
                    <CustomLabelInput
                      label="رقم الجوال"
                      placeholder="أدخل رقم الجوال"
                      type="tel"
                      maxLength={10}
                    />
                  </Form.Item>
                </Col>

                {/* Profile Image */}
                <Col span={24}>
                  <Form.Item
                    name="image_ids"
                    labelCol={{ className: "ghaith--label-style" }}
                    label={
                      <span style={{ marginBottom: "8px" }}>
                        الصورة الشخصية
                      </span>
                    }
                    style={{ marginBottom: "14px" }}
                    className="ghaith--label-inputs"
                  >
                    <UploadInput
                      text="الصورة الشخصية"
                      icon={<UploadOutlined />}
                      multiple={false}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Form.Item>
                </Col>

                {/* Action Buttons */}
                <Col span={24} style={{ textAlign: "end" }}>
                  <Button
                    onClick={handleCancel}
                    style={{
                      fontSize: "18px",
                      width: "120px",
                      borderRadius: "6px",
                      marginLeft: "10px",
                    }}
                    className=" ghaith--cancel-edir-button "
                  >
                    إلغاء
                  </Button>
                  <Button
                    loading={loadingSend}
                    disabled={loadingSend || !hasChanges}
                    type="primary"
                    style={{
                      fontSize: "18px",
                      width: "120px",
                      borderRadius: "6px",
                    }}
                    className="ghaith--login-button ghaith--donate-button"
                    onClick={() => {
                      validateAndSubmit();
                    }}
                  >
                    حفظ
                  </Button>
                </Col>
              </Row>
            </Form>
          </Box>
        )}
      </Card>
      <OtpEditModal
        open={isOtpModalVisible}
        onClose={() => {
          setIsOtpModalVisible(false);
        }}
        changedData={changedValues}
        mobile={form.getFieldValue("mobile")}
        edit_type="donor"
      />
    </>
  );
}
