import { Col, ConfigProvider, DatePicker, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ar_EG from "antd/lib/locale/ar_EG";

interface Props {
  state: any;
  setState: (values: any) => void;
  withtitle?: boolean;
  title?: string;
  yearValue?: string | "";
}
const YearMonthFilter = ({
  state,
  setState,
  withtitle,
  title,
  yearValue,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const element = document.getElementsByClassName("ant-picker-header");
    Array.from(element).forEach((el, index) => {
      if (index === 1) {
        const htmlElement = el as HTMLElement;
        htmlElement.style.display = "none";
      }
    });
  }, [open]);
  return (
    <ConfigProvider locale={ar_EG} direction="rtl">
      <Row justify={"end"} dir="rtl" style={{ marginBottom: "1rem" }}>
        {withtitle && (
          <Col xxl={2} xl={3} lg={3} md={3} sm={24} xs={24}>
            <span
              className="ghaith--date-filter-title"
              style={{ fontSize: "16px" }}
            >
              {title}
            </span>
          </Col>
        )}
        <Col xxl={6} xl={6} lg={6} md={6} sm={18} xs={18}>
          <div className="ghaith--input-date-container">
            <DatePicker
              className="ghaith--input ghaith--input-date"
              value={yearValue && dayjs(yearValue, "YYYY")}
              placeholder="السنة"
              picker="year"
              style={{
                marginLeft: "5px",
                marginTop: "8px",
                //    borderRadius: "25px",
              }}
              onChange={(e, date) => {
                setState({
                  month: e ? state.month : "",
                  year: e ? date.toString() : "",
                });
              }}
              allowClear
            />
          </div>
        </Col>

        <Col xxl={6} xl={6} lg={6} md={6} sm={18} xs={18}>
          <div className="ghaith--input-date-container">
            <DatePicker
              className="ghaith--input ghaith--input-date"
              disabled={state.year === ""}
              style={{
                marginLeft: "5px",
                marginTop: "8px",
                //   borderRadius: "25px",
              }}
              placeholder="الشهر"
              picker="month"
              format="MMMM"
              onOpenChange={(e) => setOpen(e)}
              onChange={(e: any) =>
                setState({
                  ...state,
                  month: `${e ? e?.month() : ""}`,
                })
              }
              allowClear
            />
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default YearMonthFilter;
