import { Button } from "antd";
import React from "react";
interface RamadanButtonProps {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}
const RamadanButton = ({ icon, title, ...props }: RamadanButtonProps) => {
  return (
    <Button {...props} className="ghaith--ramadan-button" icon={icon}>
      {title}
    </Button>
  );
};

export default RamadanButton;
