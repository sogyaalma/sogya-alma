import { Tag } from "antd";

interface Props {
  state: any;
  orangeValue?: string;
  greenValue?: string;
  redValue?: string;
  blueValue?: string;
  width?: string;
  fontSize?: string;

  text: string;
  className?: string;
}
const TagComponent = ({
  state,
  orangeValue,
  greenValue,
  redValue,
  width,
  text,
  className,
  fontSize,
}: Props) => {
  return (
    <Tag
      className={className}
      style={{
        padding: "4px 0",
        width: width,
        textAlign: "center",
        fontSize: fontSize,
      }}
      color={
        redValue || orangeValue || greenValue
          ? state === orangeValue
            ? "orange"
            : state === greenValue
            ? "green"
            : !redValue || state === redValue
            ? "red"
            : "blue"
          : ""
      }
    >
      <span className="ghaith--content-services-request-span">{text}</span>
    </Tag>
  );
};

export default TagComponent;
