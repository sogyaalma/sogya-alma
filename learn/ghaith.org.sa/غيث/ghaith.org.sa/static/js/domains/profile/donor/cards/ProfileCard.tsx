import * as React from "react";
import { Card, Box, Typography, Avatar, Stack, Grid } from "@mui/material";
import { IconUser } from "@tabler/icons-react";
//import noteIcon from "../../../../assets/icons/profile/note.svg";
import IconMedal from "../../../../assets/icons/profile/silver-medal.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { getDonorMedals } from "../../../../apis/actions/donor.actions";
import MedalsModal from "../medals/MedalModal";
type Props = {
  name?: string;
  remainingText?: string;
  type?: "general" | "internal";
};

export default function WelcomeBadgeCard({ type }: Props) {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const medals = useSelector((state: RootState) => state?.donor.donorMedals);

  React.useEffect(() => {
    dispatch(getDonorMedals());
  }, [dispatch]);
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );
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
        {/* small corner tile (top-left)
        {type === "general" && (
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: 16,
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "#d3e9e7",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={noteIcon}
              alt="Riyal Icon"
              style={{
                width: 22,
                height: 22,
              }}
            />
          </Box>
        )}
 */}
        {/* left badge column */}
        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            left: 12,
            top: { xs: 110, sm: 120, md: 132 },
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#b4b4b4", fontWeight: 700, fontSize: 14 }}
            className="gh--font-medium"
          >
            {donorDetails?.medal_name}
          </Typography>
          {donorDetails?.medal_icon?.[0] && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "#07a787",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => setIsModalVisible(true)}
            >
              <img
                src={donorDetails?.medal_icon?.[0] || IconMedal}
                alt={donorDetails?.medal_name || "Medal"}
                style={{ width: 38, height: 38 }}
              />
            </Box>
          )}
        </Stack>

        {/* main row (Grid v2) */}

        {/* main row (Grid v2) */}
        <Grid
          container
          alignItems="center"
          spacing={0}
          wrap="nowrap"
          gap={2} // Consistent gap
        >
          {/* Avatar tile (fixed width, never grows or shrinks) */}
          <Grid sx={{ flexShrink: 0, flexGrow: 0 }}>
            <Box
              sx={{
                width: 78,
                height: 98,
                borderRadius: 3,
                bgcolor: "#d3eae8",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Avatar
                variant="rounded"
                alt=""
                sx={{ width: 78, height: 98, bgcolor: "transparent" }}
              >
                {donorDetails.image && donorDetails.image?.length > 0 ? (
                  <img
                    src={donorDetails.image[0]}
                    style={{ width: "100%", height: "100%" }}
                    alt="Donor"
                  />
                ) : (
                  <IconUser size={44} color="#07a887" />
                )}
              </Avatar>
            </Box>
          </Grid>

          {/* Text block — takes remaining space */}
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
                fontSize: { xs: 16, sm: 20, md: 22 },
                mb: 0.5,
              }}
              className="gh--font-medium"
            >
              مرحبًا بك
            </Typography>
            <Typography
              sx={{
                color: "#0aa370",
                fontWeight: 800,
                fontSize: { xs: 16, sm: 20, md: 22 },
              }}
              className="gh--font-regular"
            >
               {donorDetails.name}
            </Typography>
          </Grid>
        </Grid>

        {/* bottom-right text */}

        <Box sx={{ mt: 5 }}>
          <Typography
            sx={{
              color: "#1c4446",
              //fontWeight: 700,
              fontSize: { xs: 13, sm: 15, md: 15 },
            }}
            className="gh--font-bold"
          >
            {" "}
            {donorDetails?.residual_amount_next_medal > 0 && (
              <>بادر بفعل الخيرات، </>
            )}
          </Typography>
          <Typography
            sx={{
              color: "#1c4446",
              minHeight: "40px",
              // fontWeight: 700,
              fontSize: { xs: 13, sm: 15, md: 15 },
            }}
            className="gh--font-bold"
          >
            {" "}
            {donorDetails?.residual_amount_next_medal > 0 && (
              <>
                متبقي فقط {donorDetails?.residual_amount_next_medal} ريال لتبلغ
                الوسام القادم{" "}
              </>
            )}
          </Typography>
        </Box>
      </Card>{" "}
      <MedalsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        medals={medals}
      />
    </>
  );
}
