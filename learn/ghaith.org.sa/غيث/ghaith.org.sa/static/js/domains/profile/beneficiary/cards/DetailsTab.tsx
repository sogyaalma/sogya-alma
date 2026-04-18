import React, { useEffect, useState } from "react";
import { Card, Typography, Box, Stack, Tabs, Tab } from "@mui/material";
import { Col, Collapse, Divider, Row, Table } from "antd";
import {
  DownOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import {
  getBeneficiaryDetails,
  getFamilyMembersDetails,
} from "../../../../apis/actions/profile.actions";
import AttachmentCard from "../../../../bibilio/Modal/AttachmentCard";
import PrimarButton from "../../../../bibilio/Buttons/PrimaryButton";
import CustomLabelInput from "../../../../bibilio/Inputs/CustomLabelInput";
import UploadInput from "../../../../bibilio/Inputs/UploadInput";
import {
  showNotification,
  convertFileToBase64,
} from "../../../../apis/utils/utils";
import { setEditMode } from "../../../../apis/slices/beneficiarySlices";
import {
  getAcademicLevels,
  getAllIncomeSources,
  getCountries,
  getEducationMode,
  getFamilyStates,
  getHealthState,
  toEditProfile,
  deleteFamilyMember,
} from "../../../../apis/actions/beneficiary.actions";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import { getCompanyBanks } from "../../../../apis/actions/donation.actions";
import PaginationComponent from "../../../../bibilio/pagination/PaginationComponent";
import GenericEditableTab from "./EditableFamilyStatus";
import AddFamilyMemberModal from "../../donor/cards/AddMemberModal";
import ModalComponent from "../../../../bibilio/Modal/ModalComponent";

type DetailItemProps = {
  label: string;
  value: string;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
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

      {/* Value */}
      <Box flex={{ xs: "none", sm: 1 }} textAlign="start">
        <Typography
          fontSize={{ xs: "16px", sm: "16px" }}
          color="#354445"
          className="gh--font-medium"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

// New Editable Detail Item Component
type EditableDetailItemProps = {
  label: string;
  value: string | number | any[];
  fieldName: string;
  type?: string;
  editMode: boolean;
  onChange: (fieldName: string, value: any) => void;
  options?: Array<{ id: string | number; name: string }>;
  multiple?: boolean;
};

const EditableDetailItem: React.FC<EditableDetailItemProps> = ({
  label,
  value,
  fieldName,
  type = "text",
  editMode,
  onChange,
  options,
  multiple = false,
}) => {
  // Helper function to format display value
  const formatDisplayValue = (val: any) => {
    if (multiple && Array.isArray(val)) {
      if (!options || options.length === 0) return "-";
      return val
        .map((id) => {
          const option = options.find((opt) => opt.id === id);
          return option ? option.name : "";
        })
        .filter(Boolean)
        .join("، ");
    }

    if (typeof val === "string" || typeof val === "number") {
      // Format gender
      if (fieldName === "gender") {
        return val === "male" ? "ذكر" : val === "female" ? "أنثى" : val || "-";
      }
      // Format kinship
      if (fieldName === "kinship") {
        const kinshipMap: Record<string, string> = {
          father: "أب",
          mother: "أم",
          son: "إبن",
          daughter: "إبنة",
          wife_husband: "زوج(ة)",
          sister: "أخت",
          brother: "أخ",
          grandfather: "جد",
          grandmother: "جدة",
          other: "أخرى",
        };
        return kinshipMap[val as string] || val || "-";
      }
      // For single select, find matching option
      if (options && options.length > 0) {
        const option = options.find((opt) => opt.id === val);
        return option ? option.name : val || "-";
      }

      return val || "-";
    }

    return "-";
  };

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
      <Box flex={{ xs: "none", sm: 1 }} textAlign="start" width="100%">
        {editMode ? (
          type === "select" && options ? (
            multiple ? (
              <CustomLabelSelect
                className="ghaith--multiple-select"
                label=""
                mode="multiple"
                placeholder={`اختر ${label}`}
                value={Array.isArray(value) ? value : []}
                onChange={(selectedValues) =>
                  onChange(fieldName, selectedValues)
                }
                options={options.map((option) => ({
                  name: option.name,
                  id: option.id,
                }))}
              />
            ) : (
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
            )
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
            {formatDisplayValue(value)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const TAB_ITEMS = [
  "أفراد الأسرة",
  "وضع الأسرة",
  "مصادر الدخل",
  "الحساب البنكي",
  "المرفقات",
];

type Props = {
  details: any;
};

export default function BeneficiaryDetailsCard({ details }: Props) {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [materialStateData, setMaterialStateData] = useState<any[]>([]);
  const [bankData, setBankData] = useState<any[]>([]);
  const [updatedBankData, setUpdatedBankData] = useState<any[]>([]);
  const [updatedMaterialStateData, setUpdatedMaterialStateData] = useState<
    any[]
  >([]);
  const [attachmentData, setAttachmentData] = useState<any[]>([]);
  const [currentAttachmentPage, setCurrentAttachmentPage] = useState(1);

  // New state for family members
  const [familyMembersData, setFamilyMembersData] = useState<any[]>([]);
  const [updatedFamilyMembersData, setUpdatedFamilyMembersData] = useState<
    any[]
  >([]);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);

  // State for delete member modal
  const [deleteMemberInfo, setDeleteMemberInfo] = useState<{
    memberId: number | null;
    memberName: string;
  }>({
    memberId: null,
    memberName: "",
  });

  const editMode = useSelector(
    (state: RootState) => state?.beneficiary.editMode
  );
  const { incomeSources, educationMode, healthState, academicLevels } =
    useSelector((state: RootState) => state.beneficiary);

  const banks = useSelector((state: RootState) => state?.donation?.banks);

  const newRowTemplate = {
    key: materialStateData.length,
    source_income_id: null,
    amount: 0,
  };
  const newRowBank = {
    key: bankData.length,
    bank_id: null,
    acc_number: "",
  };

  const handleAddMemberSuccess = () => {
    dispatch(getFamilyMembersDetails());
    dispatch(setEditMode(false));
    showNotification("تم تحديث بيانات الأسرة", "success");
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
        } catch (error) {
          console.error("Error converting file to Base64:", error);
        }
      }
    }
    setAttachmentData(attachments);
  };

  const handleSourceIncomeChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setMaterialStateData((prev) => {
      const updatedData = [...prev];
      if (!updatedData[index]) return prev;

      updatedData[index] = {
        ...updatedData[index],
        [field]: value,
      };

      setUpdatedMaterialStateData((prevChanges) => {
        const changes = [...prevChanges];
        const existingChangeIndex = changes.findIndex((item) =>
          item.key
            ? item.key === updatedData[index].key
            : item.id === updatedData[index].id
        );

        if (existingChangeIndex !== -1) {
          changes[existingChangeIndex] = {
            ...changes[existingChangeIndex],
            [field]: value,
          };
        } else {
          changes.push({
            key: updatedData[index].key,
            id: updatedData[index].id,
            [field]: value,
          });
        }

        return changes;
      });

      return updatedData;
    });
  };

  const handleBankDataChange = (index: number, field: string, value: any) => {
    setBankData((prev) => {
      const updatedData = [...prev];
      if (!updatedData[index]) return prev;

      updatedData[index] = {
        ...updatedData[index],
        [field]: value,
      };
      setUpdatedBankData((prevChanges) => {
        const changes = [...prevChanges];
        const existingChangeIndex = changes.findIndex((item) =>
          item.key
            ? item.key === updatedData[index].key
            : item.id === updatedData[index].id
        );

        if (existingChangeIndex !== -1) {
          changes[existingChangeIndex] = {
            ...changes[existingChangeIndex],
            [field]: value,
          };
        } else {
          changes.push({
            key: updatedData[index].key,
            id: updatedData[index].id,
            [field]: value,
          });
        }

        return changes;
      });

      return updatedData;
    });
  };

  const handleFamilyMemberChange = (
    memberId: number,
    field: string,
    value: any
  ) => {
    setFamilyMembersData((prev) => {
      const updatedData = [...prev];
      const memberIndex = updatedData.findIndex((m) => m.id === memberId);

      if (memberIndex === -1) return prev;

      updatedData[memberIndex] = {
        ...updatedData[memberIndex],
        [field]: value,
      };

      setUpdatedFamilyMembersData((prevChanges) => {
        const changes = [...prevChanges];
        const existingChangeIndex = changes.findIndex(
          (item) => item.id === memberId
        );

        if (existingChangeIndex !== -1) {
          changes[existingChangeIndex] = {
            ...changes[existingChangeIndex],
            [field]: value,
          };
        } else {
          changes.push({
            id: memberId,
            [field]: value,
          });
        }

        return changes;
      });

      return updatedData;
    });
  };

  useEffect(() => {
    if (Array.isArray(details?.source_income_ids)) {
      setMaterialStateData([...details?.source_income_ids]);
    }
    if (Array.isArray(details?.bank_ids)) {
      const transformedBankData = details.bank_ids.map((bank: any) => ({
        ...bank,
        bank_id: bank.bank_id || bank.bank_name,
        key: bank.id || Date.now() + Math.random(),
      }));
      setBankData(transformedBankData);
    }
  }, [details]);

  const KINSHIP_OPTIONS = [
    { id: "father", name: "أب" },
    { id: "mother", name: "أم" },
    { id: "son", name: "إبن" },
    { id: "daughter", name: "إبنة" },
    { id: "wife_husband", name: "زوج(ة)" },
    { id: "sister", name: "أخت" },
    { id: "brother", name: "أخ" },
    { id: "grandfather", name: "جد" },
    { id: "grandmother", name: "جدة" },
    { id: "other", name: "أخرى" },
  ];

  const addNewRow = () => {
    const uniqueKey = Date.now();
    setMaterialStateData((prev) => [
      ...prev,
      { ...newRowTemplate, key: uniqueKey },
    ]);
  };

  const addNewBankRow = () => {
    const uniqueKey = Date.now();
    setBankData((prev) => [...prev, { ...newRowBank, key: uniqueKey }]);
  };

  useEffect(() => {
    dispatch(getFamilyMembersDetails());
  }, [dispatch]);

  useEffect(() => {
    if (editMode) {
      dispatch(getAllIncomeSources());
      dispatch(getCompanyBanks());
      dispatch(getEducationMode());
      dispatch(getAcademicLevels());
      dispatch(getFamilyStates());
      dispatch(getCountries());
      dispatch(getHealthState());
    }
  }, [editMode, dispatch]);

  const confirmIncomeModification = () => {
    try {
      const sourceIncomePayload =
        updatedMaterialStateData.length > 0
          ? updatedMaterialStateData.map((item) => {
              const { key, ...rest } = item;
              return rest;
            })
          : undefined;

      const bankPayload =
        updatedBankData.length > 0
          ? updatedBankData.map((item) => {
              const { key, ...rest } = item;
              return {
                bank_id: rest.bank_id,
                acc_number: rest.acc_number,
                ...(rest.id && { id: rest.id }),
              };
            })
          : undefined;

      const apiPayload = {
        ...(sourceIncomePayload && { source_income_ids: sourceIncomePayload }),
        ...(bankPayload && { bank_ids: bankPayload }),
        ...(updatedFamilyMembersData.length > 0 && {
          member_ids: [...updatedFamilyMembersData],
        }),
        ...(attachmentData.length > 0 && {
          attachment_ids: attachmentData,
        }),
      };

      if (Object.keys(apiPayload).length === 0) {
        showNotification("لا توجد تغييرات لحفظها", "error");
        return;
      }

      dispatch(toEditProfile(apiPayload)).then((result: any) => {
        const response = result?.payload?.result;
        if (response?.code === 200) {
          showNotification(response?.message, "success");
          dispatch(getBeneficiaryDetails());
          dispatch(getFamilyMembersDetails());
          dispatch(setEditMode(false));
          setUpdatedMaterialStateData([]);
          setUpdatedBankData([]);
          setUpdatedFamilyMembersData([]);
          setAttachmentData([]);
        } else {
          showNotification(response?.message, "error");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const familyMembers = useSelector(
    (state: RootState) => state?.profile?.familyMembers
  );

  useEffect(() => {
    if (familyMembers && familyMembers.length > 0) {
      setFamilyMembersData([...familyMembers]);
    }
  }, [familyMembers]);

  // Function to show delete confirmation modal
  const showDeleteMemberModal = (memberId: number, memberName: string) => {
    setDeleteMemberInfo({
      memberId,
      memberName,
    });
    setIsModalDeleteVisible(true);
  };

  // Function to handle member deletion
  const handleConfirmDeleteMember = () => {
    if (!deleteMemberInfo.memberId) return;

    dispatch(deleteFamilyMember({ partner_id: deleteMemberInfo.memberId }))
      .then((result: any) => {
        const response = result?.payload?.data?.result;
        if (response?.code === 200) {
          showNotification(
            response?.message || "تمت أرشفة الشريك بنجاح",
            "success"
          );
          dispatch(getFamilyMembersDetails());
        } else {
          showNotification(
            response?.message || "حدث خطأ أثناء الأرشفة",
            "error"
          );
        }
      })
      .catch((error) => {
        showNotification("حدث خطأ أثناء الأرشفة", "error");
      })
      .finally(() => {
        setIsModalDeleteVisible(false);
        setDeleteMemberInfo({ memberId: null, memberName: "" });
      });
  };

  const cancelDeleteModification = () => {
    setIsModalDeleteVisible(false);
    setDeleteMemberInfo({ memberId: null, memberName: "" });
  };

  const incomeColumns = [
    {
      title: "مصدر الدخل",
      dataIndex: "source_income_id",
      key: "source_income_id",
      render: (text: string, record: any, index: number) => {
        const selectedIncomeIds = materialStateData
          .filter((item) => item.source_income_id && item.key !== record.key)
          .map((item) => item.source_income_id);
        const selectedUpdated = updatedMaterialStateData
          .filter((item) => item.source_income_id && item.key !== record.key)
          .map((item) => item.source_income_id);

        const availableOptions = editMode
          ? (incomeSources.data || []).filter(
              (option: any) =>
                !selectedIncomeIds.includes(option.name || option.key) &&
                !selectedUpdated.includes(option.id || option.key)
            )
          : incomeSources.data || [];

        return editMode ? (
          <CustomLabelSelect
            label=""
            value={record.source_income_id || null}
            onChange={(SelectedValue: any) => {
              const actualId =
                SelectedValue?.id || SelectedValue?.key || SelectedValue;
              handleSourceIncomeChange(index, "source_income_id", actualId);
            }}
            options={availableOptions}
            placeholder={
              availableOptions.length === 0
                ? "لا توجد خيارات متاحة"
                : "اختر مصدر الدخل"
            }
          />
        ) : (
          <Typography
            fontSize="16px"
            color="#283233ff"
            className="gh--font-light"
          >
            {text}
          </Typography>
        );
      },
    },
    {
      title: "المبلغ",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      render: (text: number, record: any, index: number) =>
        editMode ? (
          <CustomLabelInput
            label=""
            type="tel"
            value={record.amount}
            onChange={(e) =>
              handleSourceIncomeChange(
                index,
                "amount",
                parseFloat(e.target.value)
              )
            }
          />
        ) : (
          <Typography
            fontSize="16px"
            color="#354445"
            className="gh--font-medium icon-saudi_riyal"
          >
            {Number.isInteger(text) ? text : text.toFixed(2)}
          </Typography>
        ),
    },
    {
      dataIndex: "",
      align: "right" as const,
      title: (() => {
        if (!editMode) return null;

        const selectedIncomeIds = materialStateData
          .filter((item) => item.source_income_id)
          .map((item) => item.source_income_id);
        const selectedUpdated = updatedMaterialStateData
          .filter((item) => item.source_income_id)
          .map((item) => item.source_income_id);

        const availableOptions = editMode
          ? (incomeSources.data || []).filter(
              (option: any) =>
                !selectedIncomeIds.includes(option.name || option.key) &&
                !selectedUpdated.includes(option.id || option.key)
            )
          : incomeSources.data || [];
        return availableOptions.length > 0 ? (
          <PrimarButton
            icon={
              <PlusCircleOutlined
                style={{ fontSize: "20px", marginTop: "2px" }}
              />
            }
            title=""
            onClick={addNewRow}
          />
        ) : null;
      })(),
    },
  ];

  const bankColumns = [
    {
      title: "البنك",
      dataIndex: "bank_id",
      key: "bank_id",
      render: (bankId: string, record: any, index: number) => {
        const selectedBank = banks?.find((bank: any) => bank.id === bankId);

        return editMode ? (
          <CustomLabelSelect
            label=""
            value={bankId || null}
            onChange={(selectedValue: any) => {
              const actualId =
                selectedValue?.id || selectedValue?.key || selectedValue;
              handleBankDataChange(index, "bank_id", actualId);
            }}
            options={(banks || []).map((bank: any) => ({
              id: bank.id,
              name: bank.bank_name,
            }))}
            placeholder="اختر البنك"
          />
        ) : (
          <Typography
            fontSize="16px"
            color="#283233ff"
            className="gh--font-light"
          >
            {selectedBank?.bank_name || "-"}
          </Typography>
        );
      },
    },
    {
      title: "رقم الحساب",
      dataIndex: "acc_number",
      key: "acc_number",
      align: "right" as const,
      render: (text: string, record: any, index: number) =>
        editMode ? (
          <CustomLabelInput
            label=""
            type="text"
            value={record.acc_number}
            onChange={(e) =>
              handleBankDataChange(index, "acc_number", e.target.value)
            }
          />
        ) : (
          <Typography
            fontSize="16px"
            color="#354445"
            className="gh--font-medium"
          >
            {text}
          </Typography>
        ),
    },
    {
      dataIndex: "",
      align: "right" as const,
      title: editMode === true && (
        <PrimarButton
          icon={
            <PlusCircleOutlined
              style={{ fontSize: "20px", marginTop: "2px" }}
            />
          }
          title=""
          onClick={addNewBankRow}
        />
      ),
    },
  ];

  const getFamilyMemberDetails = (member: any) => {
    const details = [
      {
        label: "العلاقة",
        value: member?.kinship || "",
        fieldName: "kinship",
        type: "select",
        options: KINSHIP_OPTIONS,
      },
      {
        label: "الحالة الصحية",
        value: member?.health_state_id,
        fieldName: "health_state_id",
        type: "select",
        options: healthState || [],
      },
      {
        label: "الحالة الإجتماعية",
        value: member?.family_state_id,
        fieldName: "family_state_id",
        type: "text",
      },
      {
        label: "المستوى الدراسي",
        value: member?.academic_level_id,
        fieldName: "academic_level_id",
        type: "select",
        options: academicLevels || [],
      },
      {
        label: "الوضع التعليمي",
        value: member?.education_mode_id,
        fieldName: "education_mode_id",
        type: "select",
        options: educationMode || [],
      },
      ...(member?.sponsorship_type_id
        ? [
            {
              label: "نوع الكفالة المتاحة",
              value: member.sponsorship_type_id,
              fieldName: "sponsorship_type_id",
              type: "text",
            },
          ]
        : []),
      {
        label: "حالة الكفالة",
        value:
          member?.sponsorship_status === "unsponsored" ? "غير مكفول" : "مكفول",
        fieldName: "sponsorship_status",
        type: "text",
      },
      ...(member?.orphan_type_id
        ? [
            {
              label: "نوع اليتيم",
              value: member.orphan_type_id,
              fieldName: "orphan_type_id",
              type: "text",
            },
          ]
        : []),
      {
        label: "تاريخ الميلاد",
        value: member?.birthday,
        fieldName: "birthday",
        type: "date",
      },
      {
        label: "الجنسية",
        value: member?.nationality_id,
        fieldName: "nationality_id",
        type: "text",
      },
      {
        label: "المهنة",
        value: member?.job,
        fieldName: "job",
        type: "text",
      },
      ...(member?.sponsor_id
        ? [
            {
              label: "الكفيل",
              value: member.sponsor_id,
              fieldName: "sponsor_id",
              type: "text",
            },
          ]
        : []),
      ...(member?.sponsorship_start_date
        ? [
            {
              label: "تاريخ بداية الكفالة",
              value: member.sponsorship_start_date,
              fieldName: "sponsorship_start_date",
              type: "date",
            },
          ]
        : []),
    ];

    return details;
  };

  const GENDER_OPTIONS = [
    { id: "male", name: "ذكر" },
    { id: "female", name: "أنثى" },
  ];

  const collapseItems = familyMembersData
    ?.filter((member: any) => member.id !== details.id)
    .map((member: any, index: number) => ({
      key: index.toString(),
      label: (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1.5, md: 4 },
            py: 1.5,
            alignItems: "center",
          }}
        >
          {/* Name Field */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              px: 1,
            }}
          >
            <Typography
              fontWeight={600}
              color="#1f4547"
              sx={{ fontSize: "16px", minWidth: { xs: "80px", md: "auto" } }}
              className="gh--font-medium"
            >
              الاسم
            </Typography>
            <EditableDetailItem
              label=""
              value={member?.name || ""}
              fieldName="name"
              editMode={editMode}
              onChange={(field, value) =>
                handleFamilyMemberChange(member.id, field, value)
              }
            />
          </Box>

          {/* ID Number Field */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              px: 1,
            }}
          >
            <Typography
              fontWeight={600}
              color="#1f4547"
              sx={{ fontSize: "16px", minWidth: { xs: "80px", md: "auto" } }}
              className="gh--font-medium"
            >
              رقم الهوية
            </Typography>
            <Typography
              fontSize="16px"
              color="#354445"
              className="gh--font-medium"
              sx={{ textAlign: { xs: "right", md: "left" } }}
            >
              {member?.identification_number || "-"}
            </Typography>
          </Box>

          {/* Delete Icon - Show only in edit mode */}
          {editMode && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ml: 2,
                cursor: "pointer",
                color: "#ff4d4f",
                "&:hover": {
                  color: "#d9363e",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                showDeleteMemberModal(member.id, member.name || "هذا الفرد");
              }}
            >
              <DeleteOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            </Box>
          )}
        </Box>
      ),
      children: (
        <Box sx={{ bgcolor: "#fafafa", borderRadius: 1, p: 2 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ px: 2, py: 1 }}
          >
            <Box flex={1}>
              <EditableDetailItem
                label="النوع"
                value={
                  member?.gender === "male"
                    ? "male"
                    : member?.gender === "female"
                    ? "female"
                    : member?.gender || ""
                }
                fieldName="gender"
                type="select"
                editMode={editMode}
                onChange={(field, value) =>
                  handleFamilyMemberChange(member.id, field, value)
                }
                options={GENDER_OPTIONS}
              />
              <EditableDetailItem
                label="رقم الجوال"
                value={member?.mobile || ""}
                fieldName="mobile"
                type="tel"
                editMode={editMode}
                onChange={(field, value) =>
                  handleFamilyMemberChange(member.id, field, value)
                }
              />
              {getFamilyMemberDetails(member)
                .slice(0, Math.ceil(getFamilyMemberDetails(member).length / 2))
                .map((detail, idx) =>
                  detail.type === "select" ? (
                    <EditableDetailItem
                      key={idx}
                      label={detail.label}
                      value={detail.value}
                      fieldName={detail.fieldName}
                      type={detail.type}
                      editMode={editMode}
                      onChange={(field, value) =>
                        handleFamilyMemberChange(member.id, field, value)
                      }
                      options={detail.options}
                    />
                  ) : (
                    <DetailItem
                      key={idx}
                      label={detail.label}
                      value={detail.value}
                    />
                  )
                )}
            </Box>
            <Box flex={1}>
              {getFamilyMemberDetails(member)
                .slice(Math.ceil(getFamilyMemberDetails(member).length / 2))
                .map((detail, idx) =>
                  detail.type === "select" ? (
                    <EditableDetailItem
                      key={idx}
                      label={detail.label}
                      value={detail.value}
                      fieldName={detail.fieldName}
                      type={detail.type}
                      editMode={editMode}
                      onChange={(field, value) =>
                        handleFamilyMemberChange(member.id, field, value)
                      }
                      options={detail.options}
                    />
                  ) : (
                    <DetailItem
                      key={idx}
                      label={detail.label}
                      value={detail.value}
                    />
                  )
                )}
            </Box>
          </Stack>
        </Box>
      ),
    }));

  return (
    <Card
      elevation={0}
      dir="rtl"
      sx={{
        borderRadius: 2,
        border: "1px solid #eef1ee",
        p: 0,
        bgcolor: "#f3f9f9",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.08)",
        minHeight: "532px",
      }}
    >
      {/* Header + Tabs */}
      <Box sx={{ px: 3, py: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, v) => setTabIndex(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{
            style: { height: 4, backgroundColor: "#456361" },
          }}
          sx={{
            minHeight: 56,
            "& .MuiTab-root": {
              minHeight: 56,
              textTransform: "none",
              fontWeight: 500,
              fontSize: 20,
              px: 5.5,
              color: "#0aa370",
            },
            "& .Mui-selected": {
              color: "#456361 !important",
            },
            borderBottom: "2px solid rgba(0,0,0,0.06)",
          }}
        >
          {TAB_ITEMS.map((t, i) => (
            <Tab className="gh--font-medium" key={t} label={t} />
          ))}
        </Tabs>
      </Box>
      {/* Content */}
      <Box sx={{ p: 2 }}>
        {/* Family Members Tab */}
        {tabIndex === 0 && (
          <Box sx={{ px: 3, py: 2 }}>
            {/* Add Family Member Button */}
            {editMode && (
              <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
                <PrimarButton
                  title="إضافة فرد"
                  icon={<PlusCircleOutlined style={{ fontSize: "16px" }} />}
                  onClick={() => setIsAddMemberModalVisible(true)}
                />
              </Box>
            )}
            {familyMembersData && familyMembersData.length > 0 ? (
              <>
                <Collapse
                  accordion
                  expandIcon={({ isActive }) => (
                    <DownOutlined
                      rotate={isActive ? 180 : 0}
                      style={{ color: "#456361", fontSize: "16px" }}
                    />
                  )}
                  items={collapseItems}
                  style={{
                    background: "transparent",
                    border: "none",
                  }}
                  className="gh--font-medium"
                  expandIconPosition="end"
                />
                {editMode && (
                  <Row justify={"end"} style={{ marginTop: 16 }}>
                    <PrimarButton
                      title="تعديل"
                      onClick={confirmIncomeModification}
                    />
                  </Row>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography color="#666" className="gh--font-medium">
                  لا توجد بيانات لأفراد الأسرة
                </Typography>
              </Box>
            )}
          </Box>
        )}
        {/* Family Status Tab */}
        {tabIndex === 1 && (
          <GenericEditableTab
            data={details}
            editMode={editMode}
            fieldsConfig={{
              leftColumn: [
                { label: "العمر", fieldName: "age", type: "number" },
                {
                  label: "عدد الأبناء",
                  fieldName: "number_children",
                  type: "number",
                },
                { label: "وصف الحالة", fieldName: "description_situation" },
                { label: "الديون", fieldName: "debit_family" },
                {
                  label: "قيمة الدين",
                  fieldName: "total_debit",
                  type: "number",
                },
              ],
              rightColumn: [
                {
                  label: "الأقساط الشهرية لكل دين",
                  fieldName: "monthly_installment",
                  type: "number",
                },
                { label: "سبب الدين", fieldName: "reason_debit" },
                {
                  label: "ما تمّ تسديده",
                  fieldName: "was_paid",
                  type: "number",
                },
                {
                  label: "المتبقي من الدين",
                  fieldName: "rest_debit",
                  type: "number",
                },
                {
                  label: "قيمة الإيجار",
                  fieldName: "rent_value",
                  type: "number",
                },
              ],
            }}
          />
        )}
        {tabIndex === 2 && (
          <div className="ghaith--table-profile-container">
            <Table
              className="ghaith--table"
              style={{ direction: "rtl", textWrap: "nowrap" }}
              columns={incomeColumns}
              scroll={{
                x: "max-content",
                y: 400,
              }}
              dataSource={materialStateData}
              pagination={false}
              locale={{
                emptyText: (
                  <span className="ghaith--empty-text-table">
                    لا توجد بيانات
                  </span>
                ),
              }}
            />
            {editMode === true && (
              <Row justify={"space-between"} style={{ marginTop: 16 }}>
                <Col xxl={5} xl={5} lg={5} md={5} sm={12} xs={10}></Col>
                <div>
                  <PrimarButton
                    title="تعديل"
                    onClick={confirmIncomeModification}
                  />
                </div>
              </Row>
            )}
          </div>
        )}
        {/* Bank Account Tab */}
        {tabIndex === 3 && (
          <div className="ghaith--table-profile-container">
            <Table
              className="ghaith--table"
              style={{ direction: "rtl", textWrap: "nowrap" }}
              columns={bankColumns}
              scroll={{
                x: "max-content",
                y: 400,
              }}
              dataSource={bankData}
              pagination={false}
              locale={{
                emptyText: (
                  <span className="ghaith--empty-text-table">
                    لا توجد بيانات
                  </span>
                ),
              }}
            />
            {editMode === true && (
              <Row justify={"space-between"} style={{ marginTop: 16 }}>
                <Col xxl={5} xl={5} lg={5} md={5} sm={12} xs={10}></Col>
                <div>
                  <PrimarButton
                    title="تعديل"
                    onClick={confirmIncomeModification}
                  />
                </div>
              </Row>
            )}
          </div>
        )}
        {/* Attachments Tab */}
        {tabIndex === 4 && (
          <Box sx={{ px: 3, py: 2 }}>
            {editMode ? (
              <>
                <Box sx={{ mb: 3, maxWidth: "300px" }}>
                  <Typography
                    sx={{
                      mb: 2,
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#1f4547",
                    }}
                    className="gh--font-medium"
                  >
                    إضافة مرفقات جديدة
                  </Typography>
                  <UploadInput
                    text="اختر الملفات"
                    icon={<UploadOutlined />}
                    multiple={true}
                    onChange={handleFileChange}
                  />
                </Box>

                <Divider />

                <Box>
                  <Typography
                    sx={{
                      mb: 2,
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#1f4547",
                    }}
                    className="gh--font-medium"
                  >
                    المرفقات الحالية
                  </Typography>

                  {/* Attachments list */}
                  {(() => {
                    const attachments = details?.attachment_ids || [];
                    const itemPerPage = 5;
                    const startIndex =
                      (currentAttachmentPage - 1) * itemPerPage;
                    const currentAttachments = attachments.slice(
                      startIndex,
                      startIndex + itemPerPage
                    );

                    return (
                      <>
                        <AttachmentCard attachments={currentAttachments} />

                        {attachments.length > itemPerPage && (
                          <Box
                            className="ghaith--pagination-container"
                            sx={{ mt: 3 }}
                          >
                            <PaginationComponent
                              active={currentAttachmentPage}
                              total={attachments.length}
                              itemPerPage={itemPerPage}
                              scroll={() => {}}
                              setActive={(page) =>
                                setCurrentAttachmentPage(page)
                              }
                            />
                          </Box>
                        )}
                      </>
                    );
                  })()}
                </Box>

                <Row justify={"end"} style={{ marginTop: 16 }}>
                  <PrimarButton
                    title="تعديل"
                    onClick={confirmIncomeModification}
                  />
                </Row>
              </>
            ) : (
              <>
                {(() => {
                  const attachments = details?.attachment_ids || [];
                  const itemPerPage = 5;
                  const startIndex = (currentAttachmentPage - 1) * itemPerPage;
                  const currentAttachments = attachments.slice(
                    startIndex,
                    startIndex + itemPerPage
                  );

                  return (
                    <>
                      <AttachmentCard attachments={currentAttachments} />

                      {attachments.length > itemPerPage && (
                        <Box
                          className="ghaith--pagination-container"
                          sx={{ mt: 3 }}
                        >
                          <PaginationComponent
                            active={currentAttachmentPage}
                            total={attachments.length}
                            itemPerPage={itemPerPage}
                            scroll={() => {}}
                            setActive={(page) => setCurrentAttachmentPage(page)}
                          />
                        </Box>
                      )}
                    </>
                  );
                })()}
              </>
            )}
          </Box>
        )}
      </Box>

      {/* Delete Member Confirmation Modal */}
      <ModalComponent
        title=""
        open={isModalDeleteVisible}
        onClose={cancelDeleteModification}
        closeOnOutsideClick={true}
        centered={true}
      >
        <Row justify={"center"} style={{ paddingTop: "1rem" }}>
          <p className="ghaith--confirm-logout" style={{ textAlign: "center" }}>
            {" "}
            ؟<strong>{deleteMemberInfo.memberName}</strong> هل أنت متأكد أنك
            تريد أرشفة
          </p>
        </Row>
        <Row gutter={16} justify={"center"} style={{ paddingTop: "2rem" }}>
          <Col xxl={6} xl={6} lg={6} md={6} sm={9} xs={9}>
            <PrimarButton
              className="ghaith--cancel-btn-logout"
              onClick={cancelDeleteModification}
              title="لا"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={9} xs={9}>
            <PrimarButton
              className="ghaith--confirm-btn-logout"
              title="نعم"
              onClick={handleConfirmDeleteMember}
            />
          </Col>
        </Row>
      </ModalComponent>

      <AddFamilyMemberModal
        isModalVisible={isAddMemberModalVisible}
        setIsModalVisible={setIsAddMemberModalVisible}
        onSuccess={handleAddMemberSuccess}
      />
    </Card>
  );
}
