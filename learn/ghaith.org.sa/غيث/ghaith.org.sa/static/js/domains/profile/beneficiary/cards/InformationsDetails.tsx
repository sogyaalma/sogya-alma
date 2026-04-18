import * as React from "react";
import { Card, Typography, Box, Divider, Stack } from "@mui/material";
import {
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
  HomeOutlined,
  FlagOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import CustomLabelInput from "../../../../bibilio/Inputs/CustomLabelInput";
import PrimarButton from "../../../../bibilio/Buttons/PrimaryButton";
import { Row } from "antd";
import { useState, useEffect } from "react";
import { showNotification } from "../../../../apis/utils/utils";
import { setEditMode } from "../../../../apis/slices/beneficiarySlices";
import { toSendEditOtp } from "../../../../apis/actions/donor.actions";
import OtpEditModal from "../../donor/otp/OtpEdit";
import { getBeneficiaryDetails } from "../../../../apis/actions/profile.actions";
import { toEditProfile } from "../../../../apis/actions/beneficiary.actions";

type DetailItemProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        p: 1.2,
        mb: 1.5,
      }}
    >
      {/* Right half: icon + label */}
      <Box display="flex" alignItems="center" flex={1} gap={1}>
        <Box
          sx={{
            background: "#ebf3f8",
            border: "1px solid #ebf3f8",
            borderRadius: "6px",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#00010e",
            marginLeft: "10px",
          }}
        >
          {icon}
        </Box>
        <Typography
          fontWeight={600}
          color="#1f4547"
          sx={{ fontSize: "16px" }}
          className="gh--font-medium"
        >
          {label}
        </Typography>
      </Box>

      {/* Left half: value */}
      <Box flex={1} textAlign="start">
        <Typography fontSize="16px" color="#354445" className="gh--font-medium">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

type EditableDetailItemProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  fieldName: string;
  type?: string;
  editMode: boolean;
  maxLength?: number;
  onChange: (fieldName: string, value: any) => void;
};

const EditableDetailItem: React.FC<EditableDetailItemProps> = ({
  label,
  value,
  icon,
  fieldName,
  type = "text",
  editMode,
  maxLength,
  onChange,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        p: 1.2,
        mb: 1.5,
      }}
    >
      {/* Right half: icon + label */}
      <Box display="flex" alignItems="center" flex={1} gap={1}>
        <Box
          sx={{
            background: "#ebf3f8",
            border: "1px solid #ebf3f8",
            borderRadius: "6px",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#00010e",
            marginLeft: "10px",
          }}
        >
          {icon}
        </Box>
        <Typography
          fontWeight={600}
          color="#1f4547"
          sx={{ fontSize: "16px" }}
          className="gh--font-medium"
        >
          {label}
        </Typography>
      </Box>

      {/* Left half: value or input */}
      <Box flex={1} textAlign="start">
        {editMode ? (
          <CustomLabelInput
            label=""
            maxLength={maxLength}
            type={type}
            value={value}
            onChange={(e) => onChange(fieldName, e.target.value)}
          />
        ) : (
          <Typography
            fontSize="16px"
            color="#354445"
            className="gh--font-medium"
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

type Props = {
  details: any;
};

export default function BeneficiaryDetailsCard({ details }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const editMode = useSelector(
    (state: RootState) => state?.beneficiary.editMode
  );

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [initialMobile, setInitialMobile] = useState<string>("");
  const [relativeName, setRelativeName] = useState<string>("");
  const [initialRelativeName, setInitialRelativeName] = useState<string>("");
  const [relativePhone, setRelativePhone] = useState<string>("");
  const [initialRelativePhone, setInitialRelativePhone] = useState<string>("");
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState<boolean>(false);
  const [changedValues, setChangedValues] = useState<any>({});

  useEffect(() => {
    const mobile = details?.mobile || "";
    const relName = details?.relative_name || "";
    const relPhone = details?.relative_phone_number || "";

    setMobileNumber(mobile);
    setInitialMobile(mobile);
    setRelativeName(relName);
    setInitialRelativeName(relName);
    setRelativePhone(relPhone);
    setInitialRelativePhone(relPhone);
  }, [details]);

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === "mobile") {
      setMobileNumber(value);
    } else if (fieldName === "relative_name") {
      setRelativeName(value);
    } else if (fieldName === "relative_phone_number") {
      setRelativePhone(value);
    }
  };

  const handleSaveChanges = async () => {
    const mobileChanged = mobileNumber !== initialMobile;
    const relativeNameChanged = relativeName !== initialRelativeName;
    const relativePhoneChanged = relativePhone !== initialRelativePhone;

    // Check if there are any changes
    if (!mobileChanged && !relativeNameChanged && !relativePhoneChanged) {
      showNotification("لا توجد تغييرات لحفظها", "error");
      return;
    }

    // Validate mobile number if changed
    if (mobileChanged) {
      if (!/^[0-9]+$/.test(mobileNumber)) {
        showNotification("فقط الأرقام الموجبة مسموح بها!", "error");
        return;
      }

      if (mobileNumber.length !== 10) {
        showNotification("يجب أن يتكون رقم الهاتف من 10 ارقام", "error");
        return;
      }
    }

    // Validate relative phone if changed
    if (relativePhoneChanged && relativePhone) {
      if (!/^[0-9]+$/.test(relativePhone)) {
        showNotification(
          "فقط الأرقام الموجبة مسموح بها لهاتف القريب!",
          "error"
        );
        return;
      }

      if (relativePhone.length !== 10) {
        showNotification("يجب أن يتكون هاتف القريب من 10 ارقام", "error");
        return;
      }
    }

    setLoadingSend(true);

    // If mobile changed, use OTP flow
    if (mobileChanged) {
      const changedFields: any = {
        mobile: mobileNumber,
      };

      if (relativeNameChanged) {
        changedFields.relative_name = relativeName;
      }

      if (relativePhoneChanged) {
        changedFields.relative_phone_number = relativePhone;
      }

      setChangedValues(changedFields);

      dispatch(toSendEditOtp({ mobile: mobileNumber })).then((result: any) => {
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
      });
    } else {
      // If only relative info changed, direct API call without OTP
      const apiPayload: any = {};

      if (relativeNameChanged) {
        apiPayload.relative_name = relativeName;
      }

      if (relativePhoneChanged) {
        apiPayload.relative_phone_number = relativePhone;
      }

      dispatch(toEditProfile(apiPayload)).then((result: any) => {
        const response = result?.payload?.result;
        if (response?.code === 200) {
          showNotification(
            response?.message || "تم حفظ التغييرات بنجاح",
            "success"
          );
          dispatch(getBeneficiaryDetails());
          dispatch(setEditMode(false));
          setLoadingSend(false);
        } else {
          showNotification(
            response?.message || "حدث خطأ أثناء حفظ التغييرات",
            "error"
          );
          setLoadingSend(false);
        }
      });
    }
  };

  const buildAddress = () => {
    const addressParts = [
      details?.street,
      details?.street2,
      details?.city,
      details?.state_id,
    ].filter(Boolean);

    return addressParts.length > 0 ? addressParts.join(", ") : "-";
  };

  const detailsRight: DetailItemProps[] = [
    {
      label: "رقم الهوية",
      value:
        details?.identification_number || details?.accommodation_number || "-",
      icon: <IdcardOutlined />,
    },
    {
      label: "النوع",
      value:
        details?.gender === "male"
          ? "ذكر"
          : details?.gender === "female"
          ? "أنثى"
          : "-",
      icon: <UserOutlined />,
    },
    {
      label: "تاريخ الميلاد",
      value: details?.birthday || "-",
      icon: <CalendarOutlined />,
    },
    {
      label: "مكان الميلاد",
      value: details?.birthday_location || "-",
      icon: <HomeOutlined />,
    },
    {
      label: "الجنسية",
      value: details?.nationality_id || "-",
      icon: <FlagOutlined />,
    },
    {
      label: "العنوان",
      value: buildAddress(),
      icon: <HomeOutlined />,
    },
  ];

  const detailsLeft = [
    {
      label: "رقم الجوال",
      value: mobileNumber || "-",
      icon: <PhoneOutlined />,
      editable: true,
      fieldName: "mobile",
      type: "tel",
      maxLength: 10,
    },
    {
      label: "البريد الإلكتروني",
      value: details?.email || "-",
      icon: <MailOutlined />,
      editable: false,
    },
    {
      label: "الحالة الصحية",
      value: details?.health_state_id || "-",
      icon: <ToolOutlined />,
      editable: false,
    },
    {
      label: "حالة الأسرة",
      value: details?.family_state_id || "-",
      icon: <TeamOutlined />,
      editable: false,
    },
    {
      label: "اسم القريب",
      value: relativeName || "-",
      icon: <UserOutlined />,
      editable: true,
      fieldName: "relative_name",
      type: "text",
    },
    {
      label: "هاتف القريب",
      value: relativePhone || "-",
      icon: <PhoneOutlined />,
      editable: true,
      fieldName: "relative_phone_number",
      type: "tel",
      maxLength: 10,
    },
    {
      label: "صلة القرابة",
      value: details?.relative_relationship || "-",
      icon: <SolutionOutlined />,
      editable: false,
    },
  ];

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid #eef1ee",
          p: 3,
          bgcolor: "#f3f9f9",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
        }}
        dir="rtl"
      >
        {/* Title */}
        <Typography
          variant="h5"
          className="gh--font-bold"
          color="#1c4446"
          sx={{ mb: 2 }}
        >
          تفاصيل المستفيد
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Two columns */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="flex-start"
        >
          <Box flex={1}>
            {detailsRight.map((item, i) => (
              <DetailItem key={i} {...item} />
            ))}
          </Box>
          <Box flex={1}>
            {detailsLeft.map((item, i) =>
              item.editable ? (
                <EditableDetailItem
                  key={i}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  fieldName={item.fieldName || ""}
                  type={item.type}
                  maxLength={item.maxLength}
                  editMode={editMode}
                  onChange={handleFieldChange}
                />
              ) : (
                <DetailItem
                  key={i}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                />
              )
            )}
          </Box>
        </Stack>

        {/* Save Button */}
        {editMode && (
          <Row justify="end" style={{ marginTop: 16 }}>
            <PrimarButton
              title="تعديل"
              onClick={handleSaveChanges}
              disabled={loadingSend}
            />
          </Row>
        )}
      </Card>

      <OtpEditModal
        open={isOtpModalVisible}
        onClose={() => {
          setIsOtpModalVisible(false);
        }}
        changedData={changedValues}
        mobile={mobileNumber}
        edit_type="beneficiary"
      />
    </>
  );
}
