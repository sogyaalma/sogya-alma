import React, { ChangeEvent } from "react";
import { Input } from "antd";

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value?: number | string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  sizeInput?: "large" | "middle" | "small";
  maxLength?: number;
  withArrow?: boolean;
  addonAfter?: any;
  readonly?: boolean;
}
const Inputs = ({ ...props }: InputProps) => {
  const handleInput = (e: any) => {
    if (props.type === "number") {
      e.target.value = e.target.value.slice(0, props.maxLength);
    }

    if (props.type === "tel") {
      e.target.value = e.target.value
        .replace(/[^0-9]/g, "")
        .slice(0, props.maxLength);
    }
  };

  return (
    <Input
      {...props}
      min={1}
      addonAfter={props.addonAfter}
      title=""
      size={props.sizeInput}
      placeholder={props.placeholder}
      prefix={props.icon}
      onInput={handleInput}
      value={props?.value}
      readOnly={props?.readOnly}
      className={`ghaith--input ${
        props.withArrow ? "" : "ghaith--input-no-arrows"
      }  ${props.className ?? ""}`}
    />
  );
};

export default Inputs;
