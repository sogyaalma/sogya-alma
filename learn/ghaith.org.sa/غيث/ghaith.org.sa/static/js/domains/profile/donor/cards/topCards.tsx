import { Box, CardContent, Grid, Typography } from "@mui/material";

import icon1 from "../../../../assets/icons/profile/bar-chart.svg";
import icon2 from "../../../../assets/icons/profile/cash.svg";
import icon3 from "../../../../assets/icons/profile/credit-card-payment.svg";
import icon4 from "../../../../assets/icons/profile/folders.svg";
import icon5 from "../../../../assets/icons/profile/care.svg";
import icon6 from "../../../../assets/icons/profile/conversation.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../apis/store";
import { toFormatAmount } from "../../../../apis/utils/utils";
import { useState } from "react";

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
  activeItem?: any;
}

interface Props {
  onCardClick?: (activeItem?: string) => void;
}

const TopCards: React.FC<Props> = ({ onCardClick }) => {
  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails,
  );
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const topcards: cardType[] = [
    {
      icon: icon2,
      title: "إجمالي التبرعات",
      digits: toFormatAmount(donorDetails?.donation_amount) || "0",
      bgcolor: "#f1f8f8",
      activeItem: "donation",
    },
    {
      icon: icon3,
      title: "عدد التبرعات",
      digits: donorDetails?.donation_number || "0",
      activeItem: "donation",
      bgcolor: "#e5f9f5",
    },
    {
      icon: icon4,
      title: "عدد المشاريع",
      digits: donorDetails?.program_number || "0",
      bgcolor: "#e7f5f1",
    },
    {
      icon: icon5,
      title: "الكفالات",
      digits: donorDetails?.sponsorship_number || "0",
      bgcolor: "#f1f8f8",
      activeItem: "sponsored",
    },
    {
      icon: icon6,
      title: "الاستقطاع",
      digits: donorDetails?.deductions_number || "0",
      bgcolor: "#ecf5f5",
      activeItem: "deduction",
    },
    {
      icon: icon1,
      title: "التقارير",
      activeItem: "reports",
      digits: donorDetails?.reports_number,
      bgcolor: "#e5f9f5",
    },
  ];

  const handleCardClick = (topcard: cardType) => {
    if (!onCardClick) return;

    if (activeCard === topcard.activeItem) {
      setActiveCard(null);
      onCardClick("general");
    } else {
      // Set new active card
      setActiveCard(topcard.activeItem);
      onCardClick(topcard.activeItem);
    }
  };
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => {
        const isClickable = !!topcard.activeItem;

        return (
          <Grid
            key={i}
            size={{
              xs: 12,
              sm: 4,
              lg: 2,
            }}
          >
            <Box
              bgcolor={topcard.bgcolor}
              textAlign="center"
              borderRadius="6px"
              className="TopCardBox"
              sx={{
                cursor: isClickable ? "pointer" : "default",
                border: "2px solid transparent",
                boxShadow: "none",
                transform: "scale(1)",
                transition: "all 0.3s ease",
                "&:hover": isClickable
                  ? {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }
                  : {},
              }}
              onClick={() => handleCardClick(topcard)}
            >
              <CardContent className="Card-content">
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  className="ghaith--profile-topcard__title"
                  variant="subtitle1"
                >
                  {topcard.title}
                </Typography>
                <Typography
                  color={topcard.bgcolor + ".main"}
                  variant="subtitle1"
                  fontWeight={600}
                  className="ghaith--profile-topcard__title ghaith--profile-topcard_numbers"
                >
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        );
      })}{" "}
    </Grid>
  );
};

export default TopCards;
