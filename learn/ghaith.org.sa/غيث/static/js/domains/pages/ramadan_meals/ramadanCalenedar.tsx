import React, { useState, useMemo, useEffect } from "react";
import { Badge, Button } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import { formatRamadanNumber } from "../../../apis/utils/utils";
import DonationModal from "./DonationModal";
import { SyncOutlined } from "@ant-design/icons";
import {
  getAvailableDays,
  getRamadanList,
} from "../../../apis/actions/ramadan.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import DotsLoader from "../../../bibilio/loader/DotsLoader";

interface DonationDay {
  date: string;
  daily_target: number;
  meal_price: number;
  meal_number: number;
  reached: number;
  residual: number;
  is_last_ten_ramadan_days: boolean;
  progress: number;
}

interface RamadanList {
  product_id: string;
  date_from: string;
  date_to: string;
  banner_image_ids: any[];
  meal_target_line_ids: DonationDay[];
  last_update? : any;
}

interface Props {
  ramadanList?: RamadanList;
  firstAvailableDateRef?: any;
  showTooltip?: boolean;
}

const RamadanCalendar: React.FC<Props> = ({
  ramadanList,
  firstAvailableDateRef,
  showTooltip,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state?.ramadan?.loading);

  const existingRamadanLines = useSelector(
    (state: RootState) => state?.moyassar?.ramadan_lines,
  );

  const availableDays = useSelector(
    (state: RootState) => state?.ramadan?.AvailableDays,
  );

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [firstAvailableDate, setFirstAvailableDate] = useState<string>("");

  const safeRamadanList: RamadanList = ramadanList || {
    product_id: "",
    date_from: "",
    date_to: "",
    banner_image_ids: [],
    meal_target_line_ids: [],
  };

  const disabledDates = useMemo(() => {
    const disabled = new Set<string>();

    // Add dates from existing ramadan lines
    if (existingRamadanLines && existingRamadanLines.length > 0) {
      existingRamadanLines.forEach((line: any) => {
        disabled.add(line.date);
      });
    }

    // Add dates that are NOT in available days
    if (availableDays && availableDays.length > 0) {
      const availableDateSet = new Set(
        availableDays.map((day: any) => day.date),
      );

      // Get all dates in the ramadan period
      const start = dayjs(safeRamadanList.date_from);
      const end = dayjs(safeRamadanList.date_to);

      if (start.isValid() && end.isValid()) {
        let current = start.clone();
        while (current.isBefore(end) || current.isSame(end, "day")) {
          const dateStr = current.format("YYYY-MM-DD");
          if (!availableDateSet.has(dateStr)) {
            disabled.add(dateStr);
          }
          current = current.add(1, "day");
        }
      }
    }

    return disabled;
  }, [existingRamadanLines, availableDays, safeRamadanList]);

  const donationMap = useMemo(() => {
    const mealTargetLines = safeRamadanList?.meal_target_line_ids;
    if (!mealTargetLines || !Array.isArray(mealTargetLines)) {
      return {};
    }

    return mealTargetLines.reduce(
      (acc, day) => {
        if (day && day.date) {
          acc[day.date] = {
            target: day.meal_number,
            reached: day.reached,
            progress: day.progress,
            is_last_ten_ramadan_days: day.is_last_ten_ramadan_days,
          };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }, [safeRamadanList]);

  const { calendarDays, startDate, endDate } = useMemo(() => {
    const start = dayjs(safeRamadanList.date_from);
    const end = dayjs(safeRamadanList.date_to);
    const days: (Dayjs | null)[] = [];
    if (start.isValid() && end.isValid()) {
      for (let i = 0; i < start.day(); i++) days.push(null);
      let current = start.clone();
      while (current.isBefore(end) || current.isSame(end, "day")) {
        days.push(current.clone());
        current = current.add(1, "day");
      }
    }
    return { calendarDays: days, startDate: start, endDate: end };
  }, [safeRamadanList]);

  useEffect(() => {
    if (calendarDays && disabledDates && donationMap) {
      const firstAvailable = calendarDays.find((day) => {
        if (!day) return false;
        const dateStr = day.format("YYYY-MM-DD");
        return donationMap[dateStr] && !disabledDates.has(dateStr);
      });

      if (firstAvailable) {
        setFirstAvailableDate(firstAvailable.format("YYYY-MM-DD"));
      }
    }
  }, [calendarDays, disabledDates, donationMap]);

  const renderCellContent = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const data = donationMap[dateStr];
    const isDisabled = disabledDates.has(dateStr);
    const isFirstAvailable = dateStr === firstAvailableDate;

    return (
      <div
        ref={isFirstAvailable ? firstAvailableDateRef : null}
        className="gh--ramadan-inner-cell"
        onClick={() => {
          if (data && !isDisabled) {
            setSelectedDate(dateStr);
            setIsModalVisible(true);
          }
        }}
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // Padding removed from here
          cursor: data && !isDisabled ? "pointer" : "not-allowed",
          opacity: isDisabled ? 0.5 : 1,
          backgroundColor: isDisabled ? "#f5f5f5" : "transparent",
        }}
      >
        <div
          style={{
            padding: "clamp(4px, 1vw, 8px)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isFirstAvailable && showTooltip && (
            <div className="gh--ramadan-calendar-tooltip">
              يمكنك إضافة يوم آخر من هنا
            </div>
          )}

          <div
            className="gh--ramadan-calender-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div
              className="gh--ramadan-calendar-date"
              style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                fontWeight: "bold",
                color: isDisabled ? "#bfbfbf" : "inherit",
              }}
            >
              {value.date()}
            </div>
            {data?.is_last_ten_ramadan_days && (
              <div
                className="gh--ramadan-calendar-special"
                style={{
                  fontSize: "10px",
                  color: "#ff66ff",
                  textAlign: "left",
                }}
              >
                <span>العشر الأواخر</span>
                <Badge color="#ff66ff" />
              </div>
            )}
          </div>

          {data && (
            <div
              className="gh--ramadan-calendar-target"
              style={{
                fontSize: "clamp(10px, 1.1vw, 12px)",
                marginTop: "4px",
                color: isDisabled ? "#bfbfbf" : "",
              }}
            >
              المستهدف: {formatRamadanNumber(data.target)}
            </div>
          )}

          {data?.reached > 0 && (
            <div
              className="gh--ramadan-calendar-achieved"
              style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "#42956b" }}
            >
              <span className="gh--achieved-label">المحقق: </span>
              <span className="gh--achieved-number">
                <strong>{formatRamadanNumber(data.reached)}</strong>
              </span>
            </div>
          )}
        </div>

        {/* 2. Progress Bar (Outside the padded wrapper, sticks to bottom) */}
        {data && data?.progress && data?.progress > 0 ? (
          <div className="gh--ramadan-calendar-percentage-wrapper">
            <div
              style={{
                width: `${data.progress}%`,
                justifyContent: data.progress >= 30 ? "center" : "flex-start",
                paddingRight:
                  data.progress < 30 ? `calc(${data.progress}% + 2px)` : "0",
                opacity: isDisabled ? 0.7 : 1,
              }}
              className="gh--ramadan-calendar-progress-fill"
            >
              <span
                style={{
                  color: data.progress >= 30 ? "#fff" : "#42956b",
                  fontSize: "10px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  marginLeft: data.progress < 30 ? "4px" : "0",
                }}
              >
                {data.progress.toFixed(1)}%
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  if (!safeRamadanList.date_from) return null;

  const weekDays = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const arabicHijriYear = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    year: "numeric",
  })
    .format(startDate.toDate())
    .replace(/[^\d\u0660-\u0669]/g, "");

  return (
    <div
      style={{
        backgroundColor: "#f8f8f8",
        borderRadius: "12px",
        direction: "rtl",
        position: "relative",
      }}
    >
      {/* 1. Header with responsive font */}
      <div
        style={{
          padding: "20px 0",
          textAlign: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            color: "#42956b",
            margin: 0,
            fontWeight: "600",
          }}
          className="gh--font-light"
        >
          رمضان {arabicHijriYear} - {startDate.year()}
        </h2>
      </div>

      {/* 2. Scrollable Container for Mobile */}
      <div
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "22px",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div
          style={{
            minWidth: "720px",
            padding: "10px",
            backgroundColor: "#f8f8f8",
          }}
        >
          {loading ? (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                minHeight: "660px",
                display: "flex",
              }}
            >
              <DotsLoader />
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                borderTop: "1px solid #ececec",
                borderRight: "1px solid #ececec",
                backgroundColor: "#f8f8f8",
              }}
            >
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="gh--font-light"
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#a3a3a3",
                    backgroundColor: "#fafafa",
                    borderBottom: "1px solid #ececec",
                    borderLeft: "1px solid #ececec",
                  }}
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    minHeight: "120px",
                    minWidth: "112px",
                    borderBottom: "1px solid #ececec",
                    borderLeft: "1px solid #ececec",
                    backgroundColor: day ? "#f8f8f8" : "#fafafa",
                  }}
                >
                  {day && renderCellContent(day)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Refresh Button - Fixed Position */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            fontSize: "clamp(12px, 1.2vw, 18px)",
            color: "#8c8c8c",
          }}
          className="gh--font-light"
        >
          {(() => {
            const selectedDate = ramadanList?.last_update;
            if (selectedDate) {
              const date = new Date(selectedDate);
              const formattedDate = date.toLocaleDateString("ar-TN");
              const formattedTime = date.toLocaleTimeString("ar-TN", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return `آخر تحديث بتاريخ ${formattedDate} الساعة ${formattedTime}`;
            }
            return "";
          })()}
        </div>

        <Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={() => {
            dispatch(getRamadanList());
            dispatch(getAvailableDays());
          }}
          style={{
            backgroundColor: "#009767",
            borderColor: "#009767",
            height: "40px",
            borderRadius: "8px",
          }}
          className="gh--font-light"
        >
          تحديث البيانات
        </Button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
        }
        .gh--ramadan-inner-cell:not([style*="cursor: not-allowed"]):hover {
          background-color: #f6ffed;
        }
      `}</style>

      <DonationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        date={selectedDate}
      />
    </div>
  );
};

export default RamadanCalendar;

