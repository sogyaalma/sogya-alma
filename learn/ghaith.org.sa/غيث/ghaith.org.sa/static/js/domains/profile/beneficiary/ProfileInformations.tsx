import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import BeneficiaryProfileCard from "./cards/ProfileCard";
import Breadcrumb from "../Breadcrumbs";
import BeneficiaryDetailsCard from "./cards/InformationsDetails";
import FamilyDetailsCard from "./cards/DetailsTab";
import ProfileIcon from "../../../assets/images/profile/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { getBeneficiaryDetails } from "../../../apis/actions/profile.actions";

interface ProfileInfomtionsProps {
  onNavigateToMain?: () => void;
}

const ProfileInfomtions: React.FC<ProfileInfomtionsProps> = ({
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

  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );

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
            <BeneficiaryProfileCard type="internal" />
          </Grid>
          <Grid
            size={{
               xs: 12,
              lg: 12,
              xl: 8,
            }}
          >
            <BeneficiaryDetailsCard details={beneficiaryDetails} />
            <div style={{ marginTop: "3rem" }}>
              <FamilyDetailsCard details={beneficiaryDetails} />
            </div>
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

export default ProfileInfomtions;
