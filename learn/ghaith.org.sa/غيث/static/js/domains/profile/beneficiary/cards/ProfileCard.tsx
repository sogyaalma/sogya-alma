import * as React from "react";
import {
  Card,
  Box,
  Typography,
  Avatar,
  Stack,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { IconUser, IconMapPin, IconCamera } from "@tabler/icons-react";
import noteIcon from "../../../../assets/icons/profile/note.svg";
import messageIcon from "../../../../assets/icons/profile/message.svg";
import ageGroupeIcon from "../../../../assets/icons/profile/age-group.svg";
import licenseicon from "../../../../assets/icons/profile/driver-license.svg";
import smartphoneIcon from "../../../../assets/icons/profile/smartphone.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { getBeneficiaryDetails } from "../../../../apis/actions/profile.actions";
import ChatMessagesApp from "../../../../components/Chat/chat";
import { setEditMode } from "../../../../apis/slices/beneficiarySlices";
import {
  convertFileToBase64,
  showNotification,
} from "../../../../apis/utils/utils";
import { Upload } from "antd";
import { toEditProfile } from "../../../../apis/actions/beneficiary.actions"; // Import your edit action
import healthstateIcon from "../../../../assets/icons/profile/body-scan.png";
import homeIcon from "../../../../assets/icons/profile/home.svg";
import homeStateIcon from "../../../../assets/icons/profile/technology.svg";
import academicState from "../../../../assets/icons/profile/file.svg";
import folderIcon from "../../../../assets/icons/profile/folder.svg";
import userIcon from "../../../../assets/icons/profile/user.svg";
import workIcon from "../../../../assets/icons/profile/work.svg";

type Props = {
  name?: string;
  remainingText?: string;
  type: "general" | "internal";
};

type InfoItemConfig = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
};

export default function BeneficiaryProfileCard({ type }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [ismodalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imageChanges, setImageChanges] = React.useState<any[]>([]);

  const editMode = useSelector(
    (state: RootState) => state?.beneficiary.editMode
  );

  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );

  React.useEffect(() => {
    dispatch(getBeneficiaryDetails());
  }, [dispatch]);

  // Handle image upload - similar to your other component
  const handleImageUpload = async (fileList: any[]) => {
    const file = fileList[0]?.originFileObj;
    if (!file) return;

    setIsLoading(true);
    try {
      const base64 = (await convertFileToBase64(file)) as string;

      const imageData = {
        filename: file.name,
        data: base64,
      };

      setUploadedImage(base64);
      setImageChanges([imageData]);

      setIsLoading(false);
    } catch (error) {
      console.error("Error converting file to Base64:", error);
      setIsLoading(false);
    }
  };

  const confirmImageUpdate = () => {
    if (imageChanges.length === 0) {
      showNotification("لا توجد تغييرات لحفظها", "error");
      return;
    }

    const apiPayload = {
      image_ids: imageChanges,
    };

    dispatch(toEditProfile(apiPayload)).then((result: any) => {
      const response = result?.payload?.result;
      if (response?.code === 200) {
        showNotification(response?.message, "success");
        dispatch(getBeneficiaryDetails());
        setUploadedImage(null);
        setImageChanges([]);
      } else {
        showNotification(response?.message, "error");
      }
    });
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      // Use same pattern as your other component
      const fileList = [{ originFileObj: file }];
      handleImageUpload(fileList);
      return false; // Prevent auto upload
    },
    showUploadList: false,
    multiple: false,
    accept: "image/*",
  };

  const buildAddress = () => {
    const addressParts = [
      beneficiaryDetails?.street,
      beneficiaryDetails?.street2,
      beneficiaryDetails?.city,
      beneficiaryDetails?.state_id,
    ].filter(Boolean);

    return addressParts.length > 0 ? addressParts.join(", ") : "-";
  };

  // General info items (always shown)
  const generalInfoItems: InfoItemConfig[] = [
    {
      icon: (
        <img
          src={licenseicon}
          alt="License"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "رقم الهوية",
      value:
        beneficiaryDetails?.identification_number ||
        beneficiaryDetails?.accommodation_number ||
        "-",
      bgColor: "#e2cbb1",
    },
    {
      icon: (
        <img
          src={ageGroupeIcon}
          alt="Age"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "العمر",
      value: beneficiaryDetails?.age || "-",
      bgColor: "#e2b6b1",
    },
    {
      icon: (
        <img
          src={smartphoneIcon}
          alt="Phone"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "الجوال",
      value: beneficiaryDetails?.mobile || "-",
      bgColor: "#92cdf1",
    },
    {
      icon: <IconMapPin size={26} color="#0baeb0" />,
      label: "العنوان",
      value: buildAddress(),
      bgColor: "#92f0f1",
    },
  ];

  // Internal info items (shown only for internal type)
  const internalInfoItems: InfoItemConfig[] = [
    {
      icon: (
        <img
          src={healthstateIcon}
          alt="Education"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "الحالة الصحية",
      value: beneficiaryDetails?.health_state_id || "-",
      bgColor: "#e2cbb1",
    },
    {
      icon: (
        <img
          src={academicState}
          alt="Education"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "الوضع التعليمي",
      value: beneficiaryDetails?.education_mode_id || "-",
      bgColor: "#92cdf1",
    },
    {
      icon: (
        <img
          src={folderIcon}
          alt="Academic"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "المستوى الدراسي",
      value: beneficiaryDetails?.academic_level_id || "-",
      bgColor: "#e2b6b1",
    },
    {
      icon: (
        <img
          src={userIcon}
          alt="Help Reason"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "سبب تقديم المساعدة",
      value: beneficiaryDetails?.reason_help || "-",
      bgColor: "#92cdf1",
    },
    {
      icon: (
        <img
          src={workIcon}
          alt="Help Reason"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "يوجد عمل",
      value: beneficiaryDetails?.is_work ? "نعم " : "لا",
      bgColor: "#92f0f1",
    },
    {
      icon: (
        <img
          src={homeIcon}
          alt="Housing"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "حالة السكن",
      value: beneficiaryDetails?.housing_type || "-",
      bgColor: "#e2b6b1",
    },
    {
      icon: (
        <img
          src={homeStateIcon}
          alt="Housing"
          style={{ width: "60%", height: "60%" }}
        />
      ),
      label: "طبيعة السكن",
      value: beneficiaryDetails?.housing_nature || "-",
      bgColor: "#92f0f1",
    },
  ];

  const allInfoItems =
    type === "internal"
      ? [...generalInfoItems, ...internalInfoItems]
      : generalInfoItems;

  // Reusable InfoItem component
  const InfoItem = ({ icon, label, value, bgColor }: InfoItemConfig) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: 1, sm: 2 },
      }}
    >
      {/* Right half: icon box + title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        <Box
          sx={{
            width: { xs: 40, sm: 48, md: 52 },
            height: { xs: 38, sm: 44, md: 48 },
            borderRadius: 2,
            bgcolor: bgColor,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            "& img": {
              width: { xs: "60%", sm: "65%", md: "70%" },
              height: { xs: "60%", sm: "65%", md: "70%" },
            },
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            color: "#444",
            fontWeight: 700,
            fontSize: { xs: 13, sm: 15, md: 16 },
          }}
          className="gh--font-medium"
        >
          {label}
        </Typography>
      </Box>
      {/* Left half: value */}
      <Box sx={{ flex: 1, textAlign: "start" }}>
        <Typography
          sx={{
            color: "#07a787",
            fontWeight: 700,
            fontSize: { xs: 13, sm: 15, md: 16 },
            wordBreak: "break-word",
          }}
          className="gh--font-light"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );

  // Determine which image to display
  const displayImage =
    uploadedImage ||
    (beneficiaryDetails?.image && beneficiaryDetails?.image[0]);

  return (
    <>
      <Card
        dir="rtl"
        sx={{
          position: "relative",
          p: { xs: 2.5, sm: 3, md: 4 },
          borderRadius: 3,
          bgcolor: "#f3f9f9",
          boxShadow: "0px 10px 24px rgba(0,0,0,0.10)",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Small corner tile (top-left) */}
        {type === "internal" && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: { xs: 8, sm: 10, md: 14 },
                left: { xs: 10, sm: 12, md: 16 },
                width: { xs: 36, sm: 42, md: 48 },
                height: { xs: 36, sm: 42, md: 48 },
                borderRadius: { xs: 1.5, sm: 2 },
                bgcolor: "#d3e9e7",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: { xs: "45%", sm: "48%", md: "50%" },
                  height: { xs: "45%", sm: "48%", md: "50%" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  dispatch(setEditMode(true));
                }}
              >
                <img
                  src={noteIcon}
                  alt="Note Icon"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </>
        )}
        {/* Left badge column */}
        <Stack
          spacing={{ xs: 0.5, sm: 0.8, md: 1 }}
          sx={{
            position: "absolute",
            left: { xs: 6, sm: 8, md: 12 },
            top: { xs: 85, sm: 105, md: 132 },
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#1c4446",
              fontWeight: 700,
              fontSize: { xs: 10, sm: 12, md: 14 },
              whiteSpace: "nowrap",
            }}
            className="gh--font-medium"
          >
            الرسائل ({beneficiaryDetails.total_unread_messages})
          </Typography>
          <Box
            sx={{
              width: { xs: 36, sm: 42, md: 48 },
              height: { xs: 36, sm: 42, md: 48 },
              borderRadius: { xs: 1.5, sm: 2 },
              bgcolor: "#07a787",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "55%", sm: "58%", md: "60%" },
                height: { xs: "55%", sm: "58%", md: "60%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={messageIcon}
                alt="Message Icon"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            </Box>
          </Box>
        </Stack>

        {/* Main row (Grid v2) */}
        <Grid container alignItems="center" spacing={0} wrap="nowrap" gap={3}>
          {/* Avatar tile with edit functionality */}
          <Grid sx={{ flexShrink: 0, flexGrow: 0, position: "relative" }}>
            <Box
              sx={{
                width: { xs: 78, sm: 78, md: 78 },
                height: { xs: 98, sm: 98, md: 98 },
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                bgcolor: "#d3eae8",
                display: "grid",
                placeItems: "center",
                position: "relative",
                overflow: "hidden",
                "&:hover .edit-overlay": editMode
                  ? {
                      opacity: 1,
                    }
                  : {},
              }}
            >
              {isLoading ? (
                <CircularProgress size={40} color="success" />
              ) : (
                <>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 78,
                      height: 98,
                      bgcolor: "transparent",
                    }}
                  >
                    {displayImage ? (
                      <img
                        alt="profile"
                        src={displayImage}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <IconUser size={44} color="#07a887" />
                    )}
                  </Avatar>

                  {/* Edit overlay - shown on hover or when in edit mode */}
                  {type === "internal" && editMode && (
                    <Box
                      className="edit-overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        opacity: 0,
                        transition: "opacity 0.3s",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Trigger file input click
                        document.getElementById("avatar-upload")?.click();
                      }}
                    >
                      <IconCamera size={24} color="white" />
                    </Box>
                  )}
                </>
              )}
            </Box>

            {/* Upload component (hidden) */}
            {type === "internal" && editMode && (
              <Box sx={{ display: "none" }}>
                <Upload {...uploadProps}>
                  <button id="avatar-upload" style={{ display: "none" }} />
                </Upload>
              </Box>
            )}

            {/* Upload button and save button */}
            {type === "internal" && editMode && !isLoading && (
              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Upload {...uploadProps}>
                  <Typography
                    className="gh--font-light"
                    sx={{
                      fontSize: { xs: 14, sm: 14 },
                      color: "#07a787",
                      cursor: "pointer",
                      textDecoration: "underline",
                      "&:hover": {
                        color: "#0baeb0",
                      },
                    }}
                  >
                    {uploadedImage ? "تغيير الصورة" : "تحميل صورة"}
                  </Typography>
                </Upload>

                {/* Save button when image is uploaded */}
                {uploadedImage && (
                  <Typography
                    className="gh--font-light"
                    sx={{
                      fontSize: { xs: 14, sm: 14 },
                      color: "#0aa370",
                      cursor: "pointer",
                      textDecoration: "underline",
                      mt: 0.5,
                      "&:hover": {
                        color: "#07a787",
                      },
                    }}
                    onClick={confirmImageUpdate}
                  >
                    حفظ التغييرات
                  </Typography>
                )}
              </Box>
            )}
          </Grid>

          {/* Text block */}
          <Grid
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflowWrap: "anywhere",
            }}
          >
            <Typography
              sx={{
                color: "#263a3a",
                fontWeight: 800,
                fontSize: { xs: 14, sm: 18, md: 22 },
                mb: { xs: 0.3, sm: 0.4, md: 0.5 },
                lineHeight: 1.2,
              }}
              className="gh--font-medium"
            >
              مرحبًا بك
            </Typography>
            <Typography
              sx={{
                color: "#0aa370",
                fontWeight: 800,
                fontSize: { xs: 14, sm: 18, md: 22 },
                mb: { xs: 0.5, sm: 0.7, md: 1 },
                lineHeight: 1.2,
              }}
              className="gh--font-regular"
            >
               {beneficiaryDetails?.name}
            </Typography>
            <Typography
              sx={{
                color: "#ffffffff",
                bgcolor: "#1b4345",
                width: "fit-content",
                maxWidth: { xs: "120px", sm: "170px", md: "200px" },
                fontSize: { xs: 9.5, sm: 13, md: 17 },
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: { xs: 0.8, sm: 1, md: 1.2 },
                py: { xs: 0.3, sm: 0.4, md: 0.5 },
                borderRadius: { xs: 0.5, sm: 0.8, md: 1 },
                lineHeight: 1.3,
              }}
              className="gh--font-medium"
            >
              الفئة الإجتماعية : {beneficiaryDetails?.family_state_id}
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom-right text */}
        <Box sx={{ mt: { xs: 8, sm: 2.5, md: 4 } }}>
          <Typography
            sx={{
              color: "#c84b4b",
              fontSize: { xs: 11, sm: 12, md: 15 },
              lineHeight: { xs: 1.4, sm: 1.5 },
              marginLeft: { sm: "5px", md: "30px" },
            }}
            className="gh--font-bold"
          >
            بادر بتحديث بياناتك كل شهر حتى تتمتع بخدمات الجمعية
          </Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: { xs: 3, sm: 3.5, md: 4 } }} />

        {/* Info list */}
        <Stack
          spacing={{ xs: 2.5, sm: 2.5, md: 3 }}
          sx={{ mt: 2, mb: { xs: 8, sm: 10, md: 12 } }}
        >
          {allInfoItems.map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </Stack>
      </Card>
      <ChatMessagesApp
        isModalVisible={ismodalOpen}
        handleCloseModal={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
