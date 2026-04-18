import { Button } from "antd";
import React from "react";
interface ButtonTransparentProps {
  onClick?: () => void;
  title: any;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: any;
}
const TransparentButton = ({ ...props }: ButtonTransparentProps) => {
  return (
    <Button
      {...props}
      title=""
      className={`ghaith--tansparent-button ${props.className}`}
      icon={props.icon}
      loading={props.loading}
    >
      {props.title}
    </Button>
  );
};

export default TransparentButton;
