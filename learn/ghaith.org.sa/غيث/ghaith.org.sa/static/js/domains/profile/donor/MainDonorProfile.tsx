import React, { useEffect } from "react";
import TopCards from "./cards/topCards";
import AnnualDonationsCard from "./cards/MonthlyBreakup";
import { Box, Grid } from "@mui/material";
import DonationGrowth from "./cards/DonationGrowth";
import WelcomeBadgeCard from "./cards/ProfileCard";
import ImageSliderCard from "./cards/ImagesCard";
import DonationList from "./cards/DonationList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { getPrograms } from "../../../apis/actions/program.actions";
import { getDonorFlow } from "../../../apis/actions/donor.actions";
interface MainDonorProfilerops {
  onCardClick?: (activeItem?: string) => void;
}
const MainDonorProfile: React.FC<MainDonorProfilerops> = ({ onCardClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails
  );
  const programs = useSelector((state: RootState) => state?.program.programs);
  const flow = useSelector((state: RootState) => state?.donor.donorFlow);

  useEffect(() => {
    dispatch(getPrograms({ tag: "donor", partner_id: donorDetails?.id }));
    dispatch(getDonorFlow());
  }, [dispatch, donorDetails?.id]);
  return (
    <Box>
      <Grid container spacing={3} rowSpacing={5}>
        {/* column */}
        <Grid
          size={{
            xs: 12,
            lg: 12,
          }}
          //sx={{marginBottom:"1.5rem"}}
        >
          <TopCards onCardClick={onCardClick} />
        </Grid>
        {/* column */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <WelcomeBadgeCard type={"general"} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <DonationGrowth flow={flow} />
        </Grid>

        {/* column */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                //   sm: 6,
                lg: 12,
              }}
            >
              <AnnualDonationsCard flow={flow} />
            </Grid>
          </Grid>
        </Grid>
        {/* column */}
        {/* column */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <ImageSliderCard height={560} programs={programs} />
        </Grid>
        {/* column */}
        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <DonationList limit={4} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDonorProfile;
