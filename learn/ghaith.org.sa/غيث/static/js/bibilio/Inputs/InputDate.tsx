import { DatePicker } from "antd";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import { Dayjs } from "dayjs";
import ar_EG from "antd/lib/locale/ar_EG";
import "dayjs/locale/ar"; // Import Arabic locale for dayjs

interface InputDateProps
  extends Omit<
    PickerProps<Dayjs>,
    "onChange" | "value" | "defaultValue" | "onOk"
  > {
  placeholder: string;
  onChange?: (value: Dayjs | null) => void;
  value?: Dayjs | null;
  class?: any;
  defaultValue?: Dayjs | null;
}
const InputDate = ({ ...props }: InputDateProps) => {
  const handleChange = (date: any) => {
    if (props.onChange) {
      props.onChange(date);
    }
  };
  return (
    <div className={`ghaith--input-date-container ${props.class ?? ""}`}>
      <DatePicker
        {...props}
        size="large"
        value={props.value}
        onChange={handleChange}
        placeholder={props.placeholder}
        format={"YYYY/MM/DD"}
        locale={ar_EG.DatePicker}
        className={`ghaith--input ghaith--input-date ${props.className ?? ""}`}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export default InputDate;
