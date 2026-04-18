import { Button } from "antd";
import React from "react";
interface RequestButtonProps {
  onClick?: () => void;
  title: any;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  style? : any;
}
const ButtonRequest = ({ ...props }: RequestButtonProps) => {
  return (
    <Button
      {...props}
      title=""
      className={`ghaith--request-button ${props.className}`}
      icon={props.icon}
      loading={props.loading}
    >
      {props.title}
    </Button>
  );
};

export default ButtonRequest;
