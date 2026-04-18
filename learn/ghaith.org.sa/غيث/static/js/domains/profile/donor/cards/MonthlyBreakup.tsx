import * as React from "react";
import { Card, Typography, Stack, Grid, Avatar } from "@mui/material";
import Chart from "react-apexcharts";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { Props } from "react-apexcharts";
import { toFormatAmount } from "../../../../apis/utils/utils";
type DonationProps = {
  flow?: any;
};
const MonthlyBreakup: React.FC<DonationProps> = ({ flow }) => {
  const isPositiveGrowth = flow.last_month_current_vs_previous_year_diff >= 0;

  const fillPercentage = Math.abs(
    flow.last_month_current_vs_previous_year_diff,
  );
  const remainingPercentage = 100 - fillPercentage;

  const optionscolumnchart: Props = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 155,
    },
    colors: [isPositiveGrowth ? "#7fddb9" : "#fa7753", "#f0fbf6"],

    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: { enabled: false },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: { width: 120 },
        },
      },
    ],
  };
  const seriescolumnchart = [fillPercentage, remainingPercentage];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #eef1ee",
        p: 4,
        bgcolor: "#fff",
        height: "100%",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
        position: "relative",
        minHeight: "250px",
      }}
      dir="rtl"
    >
      <Grid container spacing={3}>
        {/* LEFT COLUMN */}
        <Grid
          size={{
            xs: 7,
            sm: 7,
          }}
        >
          <Typography
            fontSize="17px"
            color="#009767"
            className="gh--font-medium"
            mb={1}
            fontWeight={500}
          >
            التبرعات السنوية{" "}
          </Typography>
          <Typography
            className="gh--font-light icon-saudi_riyal"
            variant="h5"
            fontWeight="700"
            color="#1c4446"
            mr={2}
          >
            {toFormatAmount(flow.current_year_amount)}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center" gap={1}>
            <Avatar
              sx={{
                bgcolor: isPositiveGrowth ? "#e7fffa" : "#fdede9",
                width: 27,
                height: 27,
                marginTop: 1,
              }}
            >
              {isPositiveGrowth ? (
                <IconArrowUpRight width={20} color="#22ae8d" />
              ) : (
                <IconArrowDownRight width={20} color="#fa7753" />
              )}{" "}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600" color="#1c4446">
              {Number.isInteger(flow?.last_month_current_vs_previous_year_diff)
                ? Math.abs(flow.last_month_current_vs_previous_year_diff)
                : Math.abs(
                    flow?.last_month_current_vs_previous_year_diff ?? 0,
                  ).toFixed(2)}{" "}
              {isPositiveGrowth ? "+" : "-"}{" "}
            </Typography>
            <Typography
              variant="subtitle2"
              color="#009767"
              className="gh--font-bold"
            >
              آخر شهر{" "}
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={2} alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: "#7fddb9",
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                color="#1b2d23"
                className="gh--font-medium"
              >
                {flow.current_year}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: "#bfe2d3ff",
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                color="#1b2d23"
                className="gh--font-medium"
              >
                {flow.previous_year}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid
          size={{
            xs: 5,
            sm: 5,
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            mt: 4,
          }}
        >
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="130px"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default MonthlyBreakup;
