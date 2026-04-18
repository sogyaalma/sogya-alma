import { Box, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import icon1 from "../../../../assets/icons/profile/bar-chart.svg";
import icon2 from "../../../../assets/icons/profile/cash.svg";
import icon3 from "../../../../assets/icons/profile/boxes.svg";
import icon4 from "../../../../assets/icons/profile/folders.svg";
import icon5 from "../../../../assets/icons/profile/convenience.svg";
import icon6 from "../../../../assets/icons/profile/presentation.svg";
import { toFormatAmount } from "../../../../apis/utils/utils";

interface TopCardsBeneficiaryProps {
  onCardClick?: (filterType?: string) => void;
  details?: any;
  payments?: any;
  products?: any;
}

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
  filterType?: string;
}

const TopCardsBeneficiary: React.FC<TopCardsBeneficiaryProps> = ({
  onCardClick,
  details,
  payments,
  products,
}) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const topcards: cardType[] = [
    {
      icon: icon2,
      title: "إجمالي الصرف المالي",
      digits: toFormatAmount(payments?.total),
      bgcolor: "#f1f8f8",
      filterType: "payment",
    },
    {
      icon: icon3,
      title: "إجمالي الصرف العيني",
      digits: products?.quantity,
      bgcolor: "#e5f9f5",
      filterType: "product",
    },
    {
      icon: icon4,
      title: "عدد الطلبات",
      digits: details?.request_number,
      bgcolor: "#e7f5f1",
      filterType: "requests",
    },
    {
      icon: icon5,
      title: "الأنشطة",
      digits: "2",
      bgcolor: "#f1f8f8",
    },
    {
      icon: icon6,
      title: "التدريب",
      digits: "0",
      bgcolor: "#ecf5f5",
    },
    {
      icon: icon1,
      title: "التقارير",
      filterType: "reports",
      digits: details?.reports_number,
      bgcolor: "#e5f9f5",
    },
  ];

  const handleCardClick = (topcard: cardType) => {
    if (!topcard.filterType || !onCardClick) return;

    if (activeCard === topcard.filterType) {
      // Reset if clicking the same card
      setActiveCard(null);
      onCardClick("general");
    } else {
      // Set new active card
      setActiveCard(topcard.filterType);
      onCardClick(topcard.filterType);
    }
  };

  return (
    <Grid container spacing={4}>
      {topcards.map((topcard, i) => {
        const isClickable = !!topcard.filterType;
        const isActive = activeCard === topcard.filterType;

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
                border: isActive
                  ? "2px solid #14b8a6"
                  : "2px solid transparent",
                boxShadow: isActive
                  ? "0 4px 12px rgba(20, 184, 166, 0.3)"
                  : "none",
                transform: isActive ? "scale(1.02)" : "scale(1)",
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
      })}
    </Grid>
  );
};

export default TopCardsBeneficiary;
