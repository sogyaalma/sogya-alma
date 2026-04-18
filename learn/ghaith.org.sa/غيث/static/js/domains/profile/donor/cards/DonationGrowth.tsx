import * as React from "react";
import { Card, Typography, Stack, Grid, Avatar, Box } from "@mui/material";
import Chart from "react-apexcharts";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { Props } from "react-apexcharts";
import riyalIcon from "../../../../assets/icons/profile/Saudi_Riyal_Symbol.svg";
import { toFormatAmount } from "../../../../apis/utils/utils";

type DonationProps = {
  flow?: any;
};

const DonationGrowth: React.FC<DonationProps> = ({ flow }) => {
  const isPositiveGrowth = flow.last_month_vs_previous_month_diff >= 0;

  const optionscolumnchart: Props = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 60,
      sparkline: { enabled: true },
      group: "sparklines",
    },
    stroke: { curve: "smooth", width: 2 },
    fill: { colors: ["#55d6a3"], type: "solid", opacity: 0.06 },
    markers: { size: 0 },
    tooltip: {
      enabled: false, // Makes the chart unhoverable
    },
  };

  const seriescolumnchart = [
    { name: "", color: "#55d6a3", data: [25, 66, 20, 40, 12, 58, 20] },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #eef1ee",
        p: 4,
        bgcolor: "#fff",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
        minHeight: "250px",
      }}
      dir="rtl"
    >
      {/* FAB (overlay). For RTL header-left, use 'left: 16'. For right, swap to 'right: 16'. */}
      <Box
        color="secondary"
        aria-label="riyal-icon"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 60,
          height: 60,
          borderRadius: 50,
          bgcolor: "#07a787",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src={riyalIcon}
          alt="Riyal Icon"
          style={{
            width: 28,
            height: 28,
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 7, sm: 7 }}>
          <Typography
            fontSize="17px"
            color="#009767"
            className="gh--font-medium"
            mb={1}
            fontWeight={500}
          >
            نسبة نمو التبرعات
          </Typography>

          <Typography
            className="gh--font-light icon-saudi_riyal"
            variant="h5"
            fontWeight={700}
            color="#1c4446"
            mr={2}
          >
            {toFormatAmount(flow.last_month_amount)}
          </Typography>

          <Stack direction="row" spacing={1} mt={1} alignItems="center" gap={1}>
            <Avatar
              sx={{
                bgcolor: isPositiveGrowth ? "#e7fffa" : "#fdede9",
                width: 27,
                height: 27,
                mt: 1,
              }}
            >
              {isPositiveGrowth ? (
                <IconArrowUpRight width={20} color="#22ae8d" />
              ) : (
                <IconArrowDownRight width={20} color="#fa7753" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600" color="#1c4446">
              {Number.isInteger(flow?.last_month_vs_previous_month_diff)
                ? Math.abs(flow.last_month_vs_previous_month_diff)
                : Math.abs(
                    flow?.last_month_vs_previous_month_diff ?? 0,
                  ).toFixed(2)}
              % {isPositiveGrowth ? "+" : "-"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="#009767"
              className="gh--font-bold"
            >
              آخر شهر
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {/* bottom-stuck chart */}
      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="60px"
        />
      </Box>
    </Card>
  );
};
export default DonationGrowth;
