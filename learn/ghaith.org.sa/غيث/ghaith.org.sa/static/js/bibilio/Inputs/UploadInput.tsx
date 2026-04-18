import { Button, message, Upload, UploadFile } from "antd";
import React from "react";

interface UploadInputProps {
  text: string;
  icon?: React.ReactNode;
  multiple?: boolean;
  maxCount?: number;
  onChange?: (fileList: UploadFile[]) => void;
  className?: string;
  accept?: string;
  list?: any;
}

const UploadInput = ({ onChange, list, ...props }: UploadInputProps) => {
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

  return (
    <div className={`ghaith--input-upload ${props.className ?? ""}`}>
      <Upload
        beforeUpload={beforeUpload}
        accept={props.accept}
        multiple={props.multiple}
        maxCount={props.maxCount}
        className="ghaith--upload-file"
        onChange={handleChange}
        fileList={list}
      >
        <Button className="ghaith--upload" icon={props.icon}>
          {props.text}
        </Button>
      </Upload>
    </div>
  );
};

export default UploadInput;
