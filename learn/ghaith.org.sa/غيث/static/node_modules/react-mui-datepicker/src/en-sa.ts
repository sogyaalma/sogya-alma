/* eslint-disable complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-return */
//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi

import moment from "moment";

const symbolMap = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  0: "0",
} as any;
const numberMap = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
} as any;
// const pluralForm = function (n: number) {
//   switch (n) {
//     case 0:
//       return 0;
//     case 1:
//       return 1;
//     case 2:
//       return 2;
//     default:
//       if (n % 100 >= 3 && n % 100 <= 10) {
//         return 3;
//       }
//       if (n % 100 >= 11) {
//         return 4;
//       }
//       return 5;
//   }
// };
// const plurals = {
//   s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
//   m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
//   h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
//   d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
//   M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
//   y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"],
// } as any;
// const pluralize = function (u: string | number) {
//   return function (number: number, withoutSuffix: any) {
//     const f = pluralForm(number);
//     let str = plurals[u][pluralForm(number)];
//     if (f === 2) {
//       str = str[withoutSuffix ? 0 : 1];
//     }
//     return str.replace(/%d/i, number);
//   };
// };

export default moment.defineLocale("en-sa", {
  weekdays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "D/\u200FM/\u200FYYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  meridiemParse: /[ص م]/,

  isPM(input) {
    return input === "م";
  },
  meridiem(hour) {
    if (hour < 12) {
      return "ص";
    }
    return "م";
  },
  calendar: {
    sameDay: "[اليوم عند الساعة] LT",
    nextDay: "[غدًا عند الساعة] LT",
    nextWeek: "dddd [عند الساعة] LT",
    lastDay: "[أمس عند الساعة] LT",
    lastWeek: "dddd [عند الساعة] LT",
    sameElse: "L",
  },
  // relativeTime: {
  //   future: "بعد %s",
  //   past: "منذ %s",
  //   s: pluralize("s"),
  //   ss: pluralize("s"),
  //   m: pluralize("m"),
  //   mm: pluralize("m"),
  //   h: pluralize("h"),
  //   hh: pluralize("h"),
  //   d: pluralize("d"),
  //   dd: pluralize("d"),
  //   M: pluralize("M"),
  //   MM: pluralize("M"),
  //   y: pluralize("y"),
  //   yy: pluralize("y"),
  // },
  preparse(string: string) {
    return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match: string | number) => numberMap[match]).replace(/،/g, ",");
  },
  postformat(string: string) {
    return string.replace(/\d/g, (match: string | number) => symbolMap[match]).replace(/,/g, "،");
  },
  week: {
    dow: 6, // Saturday is the first day of the week.
    doy: 12, // The week that contains Jan 12th is the first week of the year.
  },
});
