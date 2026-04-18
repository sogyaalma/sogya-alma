import { message, Upload, UploadFile } from "antd";
import React from "react";

interface CustomUploadInputProps {
  text: string;
  icon?: React.ReactNode;
  multiple?: boolean;
  maxCount?: number;
  onChange?: (fileList: UploadFile[]) => void;
  className?: string;
  accept?: string;
  fileList?: UploadFile[];
}

const CustomUploadInput = ({
  text,
  icon,
  multiple = false,
  maxCount,
  onChange,
  className = "",
  accept,
  fileList = [],
}: CustomUploadInputProps) => {
  const handleChange = (info: { fileList: UploadFile[] }) => {
    if (onChange) {
      onChange(info.fileList);
    }
  };

  const beforeUpload = (file: any) => {
    const isValidType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isValidType) {
      message.error(
        `${file.name} ليس نوع ملف صالح. يرجى تحميل ملفات بصيغة JPG أو JPEG أو PNG او ملف.`
      );
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  // Custom upload icon component
  const UploadIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 15L40 50M40 15L30 25M40 15L50 25"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 50L20 60C20 62.7614 22.2386 65 25 65L55 65C57.7614 65 60 62.7614 60 60L60 50"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`custom-upload-input ${className}`}>
      <Upload
        beforeUpload={beforeUpload}
        accept={accept}
        multiple={multiple}
        maxCount={maxCount}
        onChange={handleChange}
        fileList={fileList}
        showUploadList={true}
        className="custom-upload-wrapper"
      >
        <div className="custom-upload-area">
          <div className="custom-upload-icon">
            {icon || <UploadIcon />}
          </div>
          <div className="custom-upload-text">{text}</div>
        </div>
      </Upload>
    </div>
  );
};

export default CustomUploadInput;