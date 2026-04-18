import { Button } from "antd";
import React from "react";
interface GiftButtonProps {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}
const GiftButton = ({ icon, title, ...props }: GiftButtonProps) => {
  return (
    <Button {...props} className="ghaith--gift-button" icon={icon}>
      {title}
    </Button>
  );
};

export default GiftButton;
