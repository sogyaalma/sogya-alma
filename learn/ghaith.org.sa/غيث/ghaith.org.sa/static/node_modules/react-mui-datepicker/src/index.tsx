/* eslint-disable no-empty */
/* eslint-disable no-eval */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import "./ar-sa";
import "./en-sa";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterMomentHijri } from "@mui/x-date-pickers/AdapterMomentHijri";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import momentHj, { Moment } from "moment-hijri";
import React, { MouseEvent, useLayoutEffect, useState } from "react";

type Calendar = "gregrian" | "hijri";

interface Props {
  lang?: "ar" | "en";
  isError?: boolean;
  isToggle?: boolean;
  calendar?: Calendar;
  maxDate?: Date;
  minDate?: Date;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  value?: any;
  toggleText?: string;
  onChange?: (date: string | null) => void;
  toggleClassName?: string;
  inputClassName?: string;
}

export function DatePicker({
  ref,
  lang = "en",
  isError,
  disabled,
  maxDate = new Date(2075, 11, 31),
  minDate = new Date(1938, 0, 1),
  onChange,
  value,
  isToggle,
  toggleText = "switch the picker",
  calendar = "gregrian",
  toggleClassName,
  inputClassName,
}: Props) {
  const [localei, setLocalei] = useState<Calendar>(calendar);
  const [selected, setSelected] = useState(value);

  const toggleHandler = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    if (calendar === "gregrian") setLocalei(e.currentTarget.checked ? "hijri" : "gregrian");
    if (calendar === "hijri") setLocalei(e.currentTarget.checked ? "gregrian" : "hijri");
  };
  // eslint-disable-next-line prefer-const

  useLayoutEffect(() => {
    if (lang) {
      momentHj.locale(`${lang}-sa`);
    }

    if (lang === "en" && localei === "hijri") {
      momentHj.updateLocale("ar-sa", {
        iMonths:
          "Muharram12_Safar_Rabi' al-Awwal_Rabi' al-Thani_Jumada al-Ula_Jumada al-Alkhirah_Rajab_Sha’ban_Ramadhan_Shawwal_Thul-Qi’dah_Thul-Hijjah".split(
            "_"
          ),
        iMonthsShort:
          "Muharram12_Safar_Rabi' al-Awwal_Rabi' al-Thani_Jumada al-Ula_Jumada al-Alkhirah_Rajab_Sha’ban_Ramadhan_Shawwal_Thul-Qi’dah_Thul-Hijjah".split(
            "_"
          ),
        weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      });
    }
    if (lang === "ar" && localei === "hijri") {
      momentHj.updateLocale("ar-sa", {
        iMonths: "محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأولى_جمادى الآخرة_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة".split("_"),
        iMonthsShort: "محرم_صفر_ربيع ١_ربيع ٢_جمادى ١_جمادى ٢_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
      });
    }
  }, [lang, localei]);

  return (
    <>
      <div style={{ display: localei === "hijri" ? "block" : "none" }}>
        <LocalizationProvider dateAdapter={AdapterMomentHijri}>
          <MuiDatePicker
            inputRef={ref}
            onError={newError => console.log({ newError })}
            format={"iDD/iMM/iYYYY"}
            views={["year", "month", "day"]}
            value={selected ? momentHj(selected) : null}
            onChange={(date: Moment) => {
              if (onChange) onChange(date.toLocaleString());
              setSelected(date.toLocaleString());
            }}
            minDate={momentHj(minDate)}
            maxDate={momentHj(maxDate)}
            slotProps={{
              textField: {
                variant: "outlined",
                error: isError,
                className: inputClassName,
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div style={{ display: localei === "gregrian" ? "block" : "none" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MuiDatePicker
            inputRef={ref}
            onError={newError => console.log({ newError })}
            format={"DD/MM/YYYY"}
            views={["year", "month", "day"]}
            value={selected ? momentHj(selected) : null}
            onChange={(date: Moment) => {
              if (onChange) onChange(date.toLocaleString());
              setSelected(date.toLocaleString());
            }}
            minDate={momentHj(minDate)}
            maxDate={momentHj(maxDate)}
            slotProps={{
              textField: {
                variant: "outlined",
                error: isError,
                className: inputClassName,
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {!disabled && isToggle && (
        <div>
          <label className={toggleClassName}>
            <input type="checkbox" className="" id="toggleCalendar" onClick={toggleHandler} />
            <span>{toggleText}</span>
          </label>
        </div>
      )}
    </>
  );
}
