import React from "react";
import { ConfigProvider, Empty, Select } from "antd";
interface OptionsProps {
  id?: number | string;
  name?: string;
}
interface CustomLabelSelectProps {
  label: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  options?: OptionsProps[];
  className?: string;
  allowClear?: boolean;
  mode?: "multiple" | "tags" | undefined;
  WrapperclassName?: string;
  error?: boolean; // Add error prop
}

const CustomLabelSelect: React.FC<CustomLabelSelectProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  options,
  className = "",
  allowClear = true,
  mode,
  WrapperclassName,
  error = false,
}) => {
  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          description={
            <span className="ghaith--select-empty">لا توجد بيانات</span>
          }
        />
      )}
    >
      <div
        className={`ghaith--custom-select-wrapper ${WrapperclassName} ${
          error ? "ghaith--custom-select-error" : ""
        }`}
      >
        <label className="ghaith--custom-select-label">{label}</label>
        <Select
          mode={mode}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          options={options?.map((option) => ({
            label: option.name,
            value: option.id,
          }))}
          className={`ghaith--custom-select ${className}`}
          allowClear={allowClear}
          suffixIcon={
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="#759596"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </ConfigProvider>
  );
};

export default CustomLabelSelect;
