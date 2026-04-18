import { Button } from "antd";
import React from "react";
interface ButtonTransparentProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void; // Add event parameter
  title: any;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  style? : any;
}
const PrimarButton = ({ ...props }: ButtonTransparentProps) => {
  return (
    <Button
      {...props}
      title=""
      className={`ghaith--primary-button ${props.className}`}
      icon={props.icon}
      loading={props.loading}
    >
      {props.title}
    </Button>
  );
};

export default PrimarButton;
