import { Button } from "antd";
import React from "react";
interface AddPartnershipButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
  style?: any;
}
const AddPartnershipButton = ({
  title,
  ...props
}: AddPartnershipButtonProps) => {
  return (
    <Button
      {...props}
      className={`ghaith--communs-add-partnership-button ${props.className}`}
    >
      {title}
    </Button>
  );
};

export default AddPartnershipButton;
