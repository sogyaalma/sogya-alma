import { Button } from "antd";
import React from "react";
interface UmrahButtonProps {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}
const UmrahButton = ({ icon, title, ...props }: UmrahButtonProps) => {
  return (
    <Button {...props} className="ghaith--umrah-button" icon={icon}>
      {title}
    </Button>
  );
};

export default UmrahButton;
