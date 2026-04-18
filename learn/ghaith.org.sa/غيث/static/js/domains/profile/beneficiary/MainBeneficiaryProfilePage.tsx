import React from "react";
import TopCardsBeneficiary from "./cards/TopCards";
import { Box, Grid } from "@mui/material";

import BeneficiaryProfileCard from "./cards/ProfileCard";
import ExchangeList from "./cards/ExchangeList";
import FinancialSpendingCard from "./cards/FinancialExchangeCard";
import ProductSpendingCard from "./cards/ProductExchange";
import TrainingCard from "./cards/TrainingCard";

interface MainBeneficiaryProfileProps {
  onCardClick?: (filterType?: string) => void;
  beneficiaryProfileDetails?: any;
  payments?: any;
  products?: any;
  ExchangeFilterType?: any;
}

const MainBeneficiaryProfile: React.FC<MainBeneficiaryProfileProps> = ({
  onCardClick,
  beneficiaryProfileDetails,
  payments,
  products,
  ExchangeFilterType,
}) => {
  return (
    <>
      <Box>
        <Grid container spacing={5} rowSpacing={5}>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
            //sx={{marginBottom:"1.5rem"}}
          >
            <TopCardsBeneficiary
              onCardClick={onCardClick}
              details={beneficiaryProfileDetails}
              payments={payments}
              products={products}
            />
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: 4,
            }}
          >
            <BeneficiaryProfileCard type="general" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: 8,
            }}
          >
            <ExchangeList filterType={"general"} />
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
                <FinancialSpendingCard payments={payments} />
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
            <ProductSpendingCard products={products} />
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <TrainingCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainBeneficiaryProfile;
