import React from "react";
import Inputs from "./Inputs";

interface CustomLabelInputProps {
  label: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
  className?: string;
  withArrows?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  withCurrency?: boolean;
  withSaudiNumber?: boolean;
  withPrefix?: boolean;
  prefix?: any;
}

const CustomLabelInput: React.FC<CustomLabelInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  maxLength,
  className = "",
  withArrows,
  readonly,
  disabled,
  withCurrency,
  withSaudiNumber,
  withPrefix,
  prefix,
}) => {
  return (
    <div className={`ghaith--custom-input-wrapper ${className}`}>
      <label className="ghaith--custom-input-label">{label}</label>
      <Inputs
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`ghaith--custom-input `}
        withArrow={withArrows}
        readOnly={readonly}
        disabled={disabled}
      />
      {withSaudiNumber && (
        <label className="ghaith--number-prefix" style={{ fontSize: "20px" }}>
          966+
        </label>
      )}{" "}
      {withPrefix && (
        <label className="ghaith--number-prefix" style={{ fontSize: "20px" }}>
          {prefix}
        </label>
      )}{" "}
      {withCurrency && (
        <label className="icon-saudi_riyal" style={{ fontSize: "20px" }} />
      )}{" "}
    </div>
  );
};

export default CustomLabelInput;
