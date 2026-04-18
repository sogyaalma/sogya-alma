import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../apis/store";
import { LockOutlined } from "@ant-design/icons";
import MedalsModal from "./MedalModal";
import { Tooltip } from "@mui/material";
import { toFormatAmount } from "../../../../apis/utils/utils";

interface MedalProps {
  limit?: number;
}
const MedalComponent: React.FC<MedalProps> = ({ limit }) => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const medals = useSelector((state: RootState) => state?.donor.donorMedals);
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );

  // Find current and next medal
  const currentMedal = medals?.find((medal: any) => medal.is_current === true);
  const currentIndex = medals?.findIndex(
    (medal: any) => medal.is_current === true
  );
  const nextMedal =
    currentIndex !== -1 && currentIndex < medals?.length - 1
      ? medals[currentIndex + 1]
      : null;

  // Check if current medal is the last one
  const isLastMedal = currentIndex === medals?.length - 1;

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!currentMedal || !donorDetails?.donation_amount) return 0;

    const currentAmount = donorDetails.donation_amount;
    const minAmount = currentMedal.amount_from;
    const maxAmount = currentMedal.amount_to;

    const progress =
      ((currentAmount - minAmount) / (maxAmount - minAmount)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const progressPercentage = calculateProgress();
  return (
    <>
      <Card
        dir="rtl"
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #eef1ee",
          boxShadow: "0px 6px 16px rgba(0,0,0,0.08)",
          bgcolor: "#f3f9f9",
          height: "100%",
        }}
      >
        {/* Medal Badge */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentMedal?.icon_ids?.[0] ? (
              <img
                src={currentMedal?.icon_ids?.[0]}
                alt={currentMedal.name}
                style={{ width: 90, height: 90, objectFit: "contain" }}
              />
            ) : (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "white",
                  borderRadius: "50%",
                }}
              />
            )}
          </Box>

          <Typography
            variant="h6"
            sx={{ color: "#1c4446", fontSize: "22px" }}
            className="gh--font-medium"
          >
            {currentMedal?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            mr: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#666", fontSize: "18px" }}
            className="gh--font-light"
          >
            {isLastMedal
              ? "وصلت لأعلى وسام "
              : "المتبقي على الوسام القادم"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#009767",
              fontWeight: 600,
              fontSize: "18px",
            }}
            className="gh--font-light icon-saudi_riyal"
          >
            {isLastMedal
              ? toFormatAmount(currentMedal?.amount_to)
              : toFormatAmount(donorDetails?.residual_amount_next_medal)}
          </Typography>
        </Box>
        {/* Progress Bar */}
        <Box
          sx={{
            position: "relative",
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: 8,
              bgcolor: "#e0e0e0",
              borderRadius: 4,
              position: "relative",
              overflow: "visible",
              cursor: "pointer",
            }}
          >
            {/* Progress Fill */}{" "}
            <Tooltip
              title={`إجمالي التبرعات: ${toFormatAmount(
                donorDetails?.donation_amount
              )} ريال`}
              placement="top"
              followCursor
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#1c4446",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "14px",
                  },
                },
                arrow: {
                  sx: {
                    color: "#1c4446",
                  },
                },
              }}
              className="gh--font-light"
            >
              <Box
                sx={{
                  height: "100%",
                  bgcolor: "#3d9d8f",
                  borderRadius: 4,
                  width: `${progressPercentage}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </Tooltip>
          </Box>

          {/* Next Medal Icon with Lock - Only show if not last medal */}
          {!isLastMedal && nextMedal && (
            <Box
              sx={{
                position: "relative",
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Medal Icon */}
              {nextMedal?.icon_ids?.[0] ? (
                <img
                  src={nextMedal?.icon_ids?.[0]}
                  alt={nextMedal.name}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                    opacity: 0.3,
                    filter: "grayscale(100%)",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "#e0e0e0",
                    borderRadius: "50%",
                    opacity: 0.4,
                  }}
                />
              )}

              {/* Lock Icon Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LockOutlined style={{ color: "black", fontSize: 20 }} />
              </Box>
            </Box>
          )}
        </Box>

        {/* Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              setIsModalVisible(true);
            }}
            className="gh--font-light"
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: "#1a1a1a",
              color: "#1a1a1a",
              px: 4,
              py: 1,
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                borderColor: "#3d9d8f",
                bgcolor: "rgba(61, 157, 143, 0.05)",
              },
            }}
          >
            قائمة الأوسمة
          </Button>
        </Box>
      </Card>{" "}
      <MedalsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        medals={medals}
      />
    </>
  );
};

export default MedalComponent;
