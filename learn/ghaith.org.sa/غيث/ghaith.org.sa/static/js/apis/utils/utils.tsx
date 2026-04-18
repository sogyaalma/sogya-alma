import Swal from "sweetalert2";
import moment from "moment-hijri";
import { setRatingVisible, setPrinting } from "../slices/ratingSlice";

export const carousselSettings = (nb: number, withDots?: boolean): any => {
  return {
    dots: withDots ? withDots : false,
    arrows: false,
    slidesToShow: nb,
    slidesToScroll: nb,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    rtl: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },

      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
};

export const showNotification = (
  text: string,
  type: "success" | "error" | "info",
  dispatch?: any,
  noTimer?: boolean,
): void => {
  Swal.fire({
    text: text,
    icon: type,
    showConfirmButton: dispatch ? true : false,
    confirmButtonText: "تقييم الخدمة",
    timer: (type === "success" && dispatch) || noTimer ? undefined : 3000,
    showCloseButton: dispatch || noTimer ? true : false,
    customClass: {
      popup: "gh--font-light ghaith--pop-up",
      confirmButton: "ghaith--grey-button ghaith--grey-button-active",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (dispatch) {
        dispatch(setRatingVisible(true));
      }
    }
  });
};

export const getDateRange = (year: string, month: string) => {
  if (!year) return { date_from: "", date_to: "" }; // fallback if no year

  // Only year provided
  if (month === "") {
    return {
      date_from: `01-01-${year}`,
      date_to: `12-31-${year}`,
    };
  }

  const numericMonth = String(Number(month) + 1).padStart(2, "0");
  const startOfMonth = `${numericMonth}-01-${year}`;
  const endOfMonth = moment(`${year}-${numericMonth}-01`, "YYYY-MM-DD")
    .locale("en") // 👈 Force English locale for formatting
    .endOf("month")
    .format("MM-DD-YYYY");

  return {
    date_from: startOfMonth,
    date_to: endOfMonth,
  };
};

export const toFormatAmount = (value: any): string => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "-";
  }

  const formattedValue = new Intl.NumberFormat("en-EN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

  return formattedValue
    .replace(/,/g, "TEMP")
    .replace(/\./g, ".")
    .replace(/TEMP/g, ",");
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};
export const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result?.toString().split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};
export const scroll = (currentRef: any) => {
  setTimeout(() => {
    if (currentRef.current) {
      const element = currentRef.current;
      const offset = -150;
      const top =
        element.getBoundingClientRect().top + window.pageYOffset + offset;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
  }, 100);
};

export const formatSaudiNumber = (num: number | string): string => {
  const numStr = typeof num === "number" ? num.toString() : num;

  const [integerPart, decimalPart] = numStr.split(",");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
};
export const formatRamadanNumber = (num?: number | string | null): string => {
  if (num === null || num === undefined) {
    return "0";
  }

  const numValue = typeof num === "string" ? parseFloat(num) : num;

  const numStr = numValue % 1 === 0 ? String(numValue) : numValue.toFixed(2);

  const [integerPart, decimalPart] = numStr.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};
