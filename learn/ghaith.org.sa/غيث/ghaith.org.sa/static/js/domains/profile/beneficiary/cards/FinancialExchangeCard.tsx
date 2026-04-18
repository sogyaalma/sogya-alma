import * as React from "react";
import { Card, Typography, Stack, Avatar, Grid } from "@mui/material";
import Chart from "react-apexcharts";
import { Props } from "react-apexcharts";
import { toFormatAmount } from "../../../../apis/utils/utils";

interface PaymentService {
  service: string;
  amount: number;
}

interface PaymentProps {
  payments?: {
    total?: number;
    payments_by_services?: PaymentService[];
  };
}

const FinancialSpendingCard: React.FC<PaymentProps> = ({ payments }) => {
  const chartWidth = 230;
  // Define color palette
  const colors = [
    "#5d87f9",
    "#0074ba",
    "#00c0c8",
    "#ccda4e",
    "#ff6b9d",
    "#9c27b0",
    "#ff9800",
    "#4caf50",
  ];

  // Extract series data and labels from payments
  const paymentServices = payments?.payments_by_services || [];
  const series = paymentServices.map((item) => item.amount);
  const legendItems = paymentServices.map((item, index) => ({
    label: item.service,
    color: colors[index % colors.length],
  }));

  const options: Props = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    colors: legendItems.map((item) => item.color),
    plotOptions: {
      pie: {
        donut: {
          size: "83%",
          labels: { show: false },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, w }: any) {
        const serviceName = w.config.labels[seriesIndex];
        const amount = toFormatAmount(series[seriesIndex]);
        const color = w.config.colors[seriesIndex];
        return `<div class="gh--font-medium" style="padding: 8px 12px; background: ${color}; color: white;  font-size: 14px; direction: rtl;">
          ${serviceName} :  <span class="icon-saudi_riyal"></span> ${amount}
        </div>`;
      },
    },
    labels: legendItems.map((item) => item.label),
  };

  // Calculate font size based on chart width (approximately 12% of width)
  const fontSize = `${chartWidth * 0.08}px`;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #eef1ee",
        p: 3,
        bgcolor: "#f3f9f9",
        height: "100%",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
        position: "relative",
        minHeight: "360px",
      }}
      dir="ltr"
    >
      {/* Title fixed in corner */}
      <Typography
        fontSize="32px"
        color="#1c4446"
        fontWeight={700}
        mb={5}
        mr={3}
        className="gh--font-bold"
        textAlign="end"
      >
        الصرف المالي
      </Typography>

      <Grid container spacing={3} alignItems="center">
        {/* Donut + custom center label */}
        <Grid
          size={{ xs: 6, sm: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Chart
            options={options}
            series={series}
            type="donut"
            width={`${chartWidth}px`}
          />

          {/* custom label inside donut */}
          <Stack
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {payments?.total && payments?.total > 0 ? (
              <Typography
                variant="h5"
                fontWeight={700}
                color="#1c4446"
                sx={{ fontSize, lineHeight: 1.2 }}
                className="gh--font-bold icon-saudi_riyal"
              >
                {toFormatAmount(payments?.total) || ""}
              </Typography>
            ) :null}
          </Stack>
        </Grid>

        {/* Legend vertically centered next to donut */}
        <Grid
          size={{ xs: 6, sm: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Stack spacing={1}>
            {legendItems.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    svg: { display: "none" },
                  }}
                />
                <Typography
                  variant="subtitle2"
                  color="#1b2d23"
                  className="gh--font-bold"
                  sx={{ fontSize: "15px" }}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FinancialSpendingCard;
