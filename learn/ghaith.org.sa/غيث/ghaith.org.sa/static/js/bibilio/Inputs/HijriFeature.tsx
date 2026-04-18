import React, { useEffect, useState } from "react";
import moment from "moment-hijri";
import { DatePicker } from "react-mui-datepicker";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import InputDate from "./InputDate";

dayjs.extend(updateLocale);
dayjs.updateLocale("ar", {
  weekStart: 6,
  weekdays: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
});
interface HijriProps {
  onChange: (date: any) => void;
  maxDateGregorian?: any;
  maxDateHijri?: any;
  value?: any;
  allowclear?: boolean;
}

const HijriFeature = ({
  onChange,
  maxDateGregorian,
  maxDateHijri,
  value,
  allowclear,
}: HijriProps) => {
  const [state, setState] = useState<any>({
    hijriDate: null,
    gregorianDate: null,
  });

  const handleDateChange = (dateValue: any | null) => {
    if (dateValue) {
      const hijri = moment(dateValue.toDate())
        .locale("en")
        .format("iDD/iMM/iYYYY");

      setState({
        hijriDate: hijri,
        gregorianDate: dateValue,
      });
      onChange(dateValue);
    } else {
      setState({
        hijriDate: null,
        gregorianDate: null,
      });
      onChange(null);
    }
  };

  const handleDateChangeHijri = (date: any | null) => {
    if (date) {
      const gregorian = moment(date).locale("en").format("YYYY/MM/DD");
      const hijri = moment(date).locale("en").format("iDD/iMM/iYYYY");
      setState({
        hijriDate: hijri,
        gregorianDate: dayjs(gregorian),
      });
      onChange(dayjs(gregorian));
    } else {
      setState({
        hijriDate: null,
        gregorianDate: null,
      });
      onChange(null);
    }
  };

  useEffect(() => {
    setState({
      hijriDate: value
        ? moment(value.format("YYYY-MM-DD"))
            .locale("en")
            .format("iDD/iMM/iYYYY")
        : null,
      gregorianDate: value || null,
    });
  }, [value]);

  return (
    <Row gutter={16}>
      {/* Gregorian Date Input */}
      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
        <InputDate
          allowClear={allowclear}
          value={state.gregorianDate ? dayjs(state.gregorianDate) : null}
          onChange={handleDateChange}
          placeholder=""
          maxDate={maxDateGregorian}
        />
      </Col>

      {/* Hijri Date Input */}
      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
        <DatePicker
          inputClassName="ghaith--hijri-datepicker"
          key={
            state.hijriDate
              ? moment(state.hijriDate, "iDD/iMM/iYYYY").toISOString()
              : new Date().toISOString()
          }
          value={
            state.hijriDate
              ? moment(state.hijriDate, "iDD/iMM/iYYYY").toDate()
              : null
          }
          onChange={handleDateChangeHijri}
          lang="ar"
          calendar="hijri"
          maxDate={maxDateHijri}
        />
      </Col>
    </Row>
  );
};

export default HijriFeature;
