import * as React from "react";
import { Card, Typography, Stack } from "@mui/material";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

// Custom Needle
function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) return null;

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      {/* Needle */}
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Center circle */}
      <circle cx={cx} cy={cy} r={5} fill="red" />
    </g>
  );
}

export default function TrainingCard() {
  const value = 12;
  const maxValue = 1000;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #eef1ee",
        p: 3,
        bgcolor: "#f3f9f9",
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
        height: "100%",
      }}
      dir="rtl"
    >
      {/* Title */}
      <Typography
        fontSize="32px"
        color="#1c4446"
        fontWeight={700}
        mb={5}
        mr={3}
        className="gh--font-bold"
        textAlign="start"
        width="100%"
      >
        الدورات التدريبية{" "}
      </Typography>

      {/* Gauge with needle */}
      <GaugeContainer
        width={250}
        height={150}
        startAngle={-110}
        endAngle={110}
        value={value}
        min={0}
        max={maxValue}
      >
        <GaugeReferenceArc style={{ fill: "#e0e0e0" }} />
        <GaugeValueArc style={{ fill: "#5d87f9" }} />
        <GaugePointer />
      </GaugeContainer>

      {/* Number of trainings */}
      <Stack textAlign="center" mt={1}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="#1c4446"
          sx={{ mt: 2 }}
        >
          <span className="gh--font-bold" style={{ fontSize: "30px" }}>
            {value}
          </span>
          <span
            style={{ marginRight: 7, fontSize: "16px" }}
            className="gh--font-light"
          >
            دورة تدريبية
          </span>
        </Typography>
      </Stack>
    </Card>
  );
}
