// GenericEditableTab.tsx
import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Row } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../apis/store";
import { getBeneficiaryDetails } from "../../../../apis/actions/profile.actions";
import { setEditMode } from "../../../../apis/slices/beneficiarySlices";
import { toEditProfile } from "../../../../apis/actions/beneficiary.actions";
import { showNotification } from "../../../../apis/utils/utils";
import PrimarButton from "../../../../bibilio/Buttons/PrimaryButton";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import CustomLabelInput from "../../../../bibilio/Inputs/CustomLabelInput";

interface FieldConfig {
  label: string;
  fieldName: string;
  type?: string;
  options?: Array<{ id: string; name: string }>;
}

interface GenericEditableTabProps {
  data: any;
  editMode: boolean;
  fieldsConfig: {
    leftColumn: FieldConfig[];
    rightColumn: FieldConfig[];
  };
  onSaveSuccess?: () => void;
}
// New Editable Detail Item Component
type EditableDetailItemProps = {
  label: string;
  value: string | number;
  fieldName: string;
  type?: string;
  editMode: boolean;
  onChange: (fieldName: string, value: any) => void;
  options?: Array<{ id: string; name: string }>;
};

const EditableDetailItem: React.FC<EditableDetailItemProps> = ({
  label,
  value,
  fieldName,
  type = "text",
  editMode,
  onChange,
  options,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="flex-start"
      sx={{
        p: { xs: 1.5, sm: 1.2 },
        mb: 1.5,
      }}
    >
      {/* Label */}
      <Box
        display="flex"
        alignItems="center"
        flex={{ xs: "none", sm: 1 }}
        gap={1}
        mb={{ xs: 0.5, sm: 0 }}
      >
        <Typography
          fontWeight={600}
          color="#1f4547"
          sx={{ fontSize: { xs: "16px", sm: "16px" } }}
          className="gh--font-medium"
        >
          {label}
        </Typography>
      </Box>

      {/* Value or Input or Select */}
      <Box flex={{ xs: "none", sm: 1 }} textAlign="start">
        {editMode ? (
          type === "select" && options ? (
            <CustomLabelSelect
              label=""
              value={value}
              onChange={(selectedValue: any) => {
                const actualValue =
                  selectedValue?.id || selectedValue?.key || selectedValue;
                onChange(fieldName, actualValue);
              }}
              options={options}
            />
          ) : (
            <CustomLabelInput
              label=""
              type={type}
              value={value}
              onChange={(e) => onChange(fieldName, e.target.value)}
            />
          )
        ) : (
          <Typography
            fontSize={{ xs: "16px", sm: "16px" }}
            color="#354445"
            className="gh--font-medium"
          >
            {value === "male"
              ? "ذكر"
              : value === "female"
              ? "أنثى"
              : value || "-"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
const GenericEditableTab: React.FC<GenericEditableTabProps> = ({
  data,
  editMode,
  fieldsConfig,
  onSaveSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [localData, setLocalData] = useState<any>({});
  const [updatedData, setUpdatedData] = useState<any>({});

  useEffect(() => {
    if (data) {
      const initialData: any = {};
      fieldsConfig.leftColumn.forEach((field) => {
        initialData[field.fieldName] = data[field.fieldName] || "";
      });
      fieldsConfig.rightColumn.forEach((field) => {
        initialData[field.fieldName] = data[field.fieldName] || "";
      });
      setLocalData(initialData);
    }
  }, [data, fieldsConfig]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setLocalData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));

    setUpdatedData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    try {
      if (Object.keys(updatedData).length === 0) {
        showNotification("لا توجد تغييرات لحفظها", "error");
        return;
      }

      dispatch(toEditProfile(updatedData)).then((result: any) => {
        const response = result?.payload?.result;
        if (response?.code === 200) {
          showNotification(response?.message, "success");
          dispatch(getBeneficiaryDetails());
          dispatch(setEditMode(false));
          setUpdatedData({});
          if (onSaveSuccess) onSaveSuccess();
        } else {
          showNotification(response?.message, "error");
        }
      });
    } catch (error) {
      console.error(error);
      showNotification("حدث خطأ أثناء حفظ التعديلات", "error");
    }
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ px: 3, py: 2 }}
        marginRight={1}
      >
        <Box flex={1}>
          {fieldsConfig.leftColumn.map((field) => (
            <EditableDetailItem
              key={field.fieldName}
              label={field.label}
              value={localData[field.fieldName] || ""}
              fieldName={field.fieldName}
              type={field.type || "text"}
              editMode={editMode}
              onChange={handleFieldChange}
              options={field.options}
            />
          ))}
        </Box>

        <Box flex={1}>
          {fieldsConfig.rightColumn.map((field) => (
            <EditableDetailItem
              key={field.fieldName}
              label={field.label}
              value={localData[field.fieldName] || ""}
              fieldName={field.fieldName}
              type={field.type || "text"}
              editMode={editMode}
              onChange={handleFieldChange}
              options={field.options}
            />
          ))}
        </Box>
      </Stack>

      {editMode && (
        <Row
          justify={"end"}
          style={{ marginTop: 16, width: "100%", paddingRight: 16 }}
        >
          <PrimarButton title="تعديل" onClick={handleSave} />
        </Row>
      )}
    </>
  );
};

export default GenericEditableTab;
