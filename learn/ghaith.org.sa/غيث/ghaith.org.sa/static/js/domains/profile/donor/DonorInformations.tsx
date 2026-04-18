import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Breadcrumb from "../Breadcrumbs";
import ProfileIcon from "../../../assets/images/profile/profile.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../apis/store";
import { getBeneficiaryDetails } from "../../../apis/actions/profile.actions";
import WelcomeBadgeCard from "./cards/ProfileCard";
import EditProfile from "./cards/EditProfile";

interface DonorInformationsProps {
  onNavigateToMain?: () => void;
}

const DonorInformations: React.FC<DonorInformationsProps> = ({
  onNavigateToMain,
}) => {
  const BCrumb = [
    {
      to: "/profile",
      title: "الرئيسية",
      onClick: onNavigateToMain,
    },
    {
      title: " البيانات",
    },
  ];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBeneficiaryDetails());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb
        title="البيانات"
        items={BCrumb}
        bgColor="#ebf3fe"
        img={ProfileIcon}
      />

      <Box>
        <Grid container spacing={5} rowSpacing={5}>
          {/* column */}

          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 12,
              xl: 4,
            }}
          >
          <WelcomeBadgeCard type={"internal"} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <EditProfile />
          </Grid>

          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DonorInformations;
