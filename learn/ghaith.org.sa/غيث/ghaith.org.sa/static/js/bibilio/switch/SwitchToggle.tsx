import { Switch } from "antd";
import React from "react";
interface SwitchToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  switchState?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  label: string;
}
const SwitchToggle = ({
  switchState,
  onSwitchChange,
  label,
  ...props
}: SwitchToggleProps) => {
  return (
    <div
      className={`ghaith--details-project-card-donation-box ${
        props.className ?? ""
      }`}
    >
      <Switch
        className="ghaith--donation-switch"
        checked={switchState}
        onChange={onSwitchChange}
      />
      <p className="ghaith--donation-card-text">{label}</p>
    </div>
  );
};

export default SwitchToggle;
