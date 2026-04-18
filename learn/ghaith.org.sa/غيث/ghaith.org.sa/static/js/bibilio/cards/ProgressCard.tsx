import { Progress } from "antd";
import React from "react";

interface ProgressProps extends React.AllHTMLAttributes<HTMLInputElement> {
  percent: any;
  percentPosition?: any;
  size?: any;
  alternativeColor?: boolean;
  surveyColor?: boolean;
}

const ProgressCard = ({ ...props }: ProgressProps) => {
  return (
    <Progress
      className={`ghaith--progress-card ${props.className ?? ""}`}
      percent={props.percent}
      percentPosition={props.percentPosition}
      size={props.size}
      strokeColor={
        props.percent < 1
          ? props.surveyColor
            ? "transparent"
            : "#fff"
          : props.alternativeColor
          ? "#18afa6"
          : "#eeecec"
      }
    />
  );
};

export default ProgressCard;
