import * as React from "react";
import { Card, Typography, Stack, Avatar, Grid } from "@mui/material";
import Chart from "react-apexcharts";
import { Props } from "react-apexcharts";

interface PaymentByService {
  service: string;
  quantity: number;
}

interface ProductProps {
  products?: {
    quantity?: number;
    products_by_services?: PaymentByService[];
  };
}

const ProductSpendingCard: React.FC<ProductProps> = ({ products }) => {
  const chartWidth = 230;

  // Generate colors dynamically based on number of services
  const generateColors = (count: number) => {
    const baseColors = [
      "#5d87f9",
      "#0074ba",
      "#00c0c8",
      "#ccda4e",
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
    ];
    return baseColors.slice(0, count);
  };

  // Extract data from products?.payments_by_services
  const paymentServices = products?.products_by_services || [];

  const series = paymentServices.map((item) => item.quantity);
  const colors = generateColors(paymentServices.length);

  const legendItems = paymentServices.map((item, index) => ({
    label: item.service,
    color: colors[index],
  }));

  const options: Props = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    colors: colors,
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
        const amount = series[seriesIndex];
        const color = w.config.colors[seriesIndex];
        return `<div class="gh--font-medium" style="padding: 8px 12px; background: ${color}; color: white;  font-size: 14px; direction: rtl;">
          ${serviceName} :  <span ></span> ${amount}
        </div>`;
      },
    },
    labels: legendItems.map((item) => item.label),
  };
  const fontSize = `${chartWidth * 0.09}px`;

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
        minHeight: "280px",
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
        الصرف العيني
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
            <Typography
              variant="h5"
              fontWeight={700}
              color="#1c4446"
              sx={{ fontSize, lineHeight: 1.2, direction: "rtl" }}
              className="gh--font-bold"
            >
              {products?.quantity ? products.quantity + "مرة" : ""}
            </Typography>
          </Stack>
        </Grid>

        {/* Legend vertically centered next to donut */}
        <Grid
          size={{ xs: 6, sm: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // Change to flex-start
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

export default ProductSpendingCard;
