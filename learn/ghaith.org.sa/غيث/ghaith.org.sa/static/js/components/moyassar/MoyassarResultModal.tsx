import { Button, Form } from "antd";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import { useEffect, useRef, useState } from "react";
import verifiedIcon from "../../assets/images/therm_success.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment-hijri";
import { toAddDonation } from "../../apis/actions/moyassar.actions";
import { baseUrlApi } from "../../proxy";
import { CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import messageDonation from "../../assets/animations/Checked.json";
import errorDonation from "../../assets/animations/error.json";
import smileIcon from "../../assets/icons/smile.png";
import printerIcon from "../../assets/icons/printer.png";
import {
  setRatingVisible,
  setResIds,
  setResModel,
} from "../../apis/slices/ratingSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import DonatePolicyModal from "../bank-transfer/DonatePolicyModal";
import { toPrintReceipt } from "../../apis/actions/donation.actions";
import TagManager from "react-gtm-module";

import {
  trackMetaDonation,
  trackSnapDonation,
  trackTikTokDonation,
  trackXDonation,
} from "../../apis/utils/pixelTools";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const tagManagerArgs = {
  gtmId: "GTM-NJJBGPPG",
};
TagManager.initialize(tagManagerArgs);

const MoyassarResultModal = ({ isModalVisible, setIsModalVisible }: Props) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);
  const [result, setResultat] = useState<any>(null);
  const [Id, setId] = useState<number | null>(null);
  const dateTime = dayjs();
  const arabicTime = dateTime.locale("ar").format("hh:mm A");
  const dispatch = useDispatch<AppDispatch>();

  const translatePaymentType = (paymentType: string) => {
    if (paymentType?.toLowerCase() === "creditcard") {
      return "بطاقة بنكية";
    }
    return paymentType;
  };

  //////// params data//////////////
  const [searchParams] = useSearchParams();
  const donationTypeName = searchParams.get("donation_type_name");
  const userName = searchParams.get("user_name");
  const statusPayment = searchParams.get("status");
  const AmountPaid = searchParams.get("amountPaid");
  const userEmail = searchParams.get("user_email");
  const userPhone = searchParams.get("user_phone");

  const decodedDonationTypeName = donationTypeName
    ? decodeURIComponent(donationTypeName)
    : null;
  const decodedUserName = userName ? decodeURIComponent(userName) : "فاعل خير";
  const decodedUserEmail = userEmail ? decodeURIComponent(userEmail) : "";
  const decodedUserPhone = userPhone ? decodeURIComponent(userPhone) : "";
  const id = searchParams.get("id");

  const loadinPrint = useSelector(
    (state: RootState) => state?.donation.loadingPrint,
  );

  const [state, setState] = useState({
    message: "",
    type: "error",
    donation_id: -1,
  });

  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  const startDonation = () => {
    setIsPolicyVisible(true);
  };

  const toFormatData = (data: any) => {
    moment.locale("ar");
    const formattedData = [
      { title: "تفاصيل التبرع:", value: decodedDonationTypeName },
      { title: "اسم المتبرع:", value: decodedUserName },
      {
        title: "مبلغ التبرع:",
        value: `${AmountPaid} ريال`,
      },
      {
        title: "رقم الإيصال:",
        value: data.result?.reference_number || id,
      },
      {
        title: "طريقة الدفع:",
        value: translatePaymentType(data.result?.payment_type),
      },
      {
        title: " تاريخ الدفع:",
        value: dateTime.locale("en").format("YYYY/MM/DD"),
      },
      {
        title: " وقت الدفع:",
        value: arabicTime,
      },
    ];
    setResultat(formattedData);
  };

  const handlePrint = async () => {
    try {
      await dispatch(toPrintReceipt(Id));
    } finally {
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current && id) {
      hasFetchedRef.current = true;
      getData(id.toString());
    }
  }, [id]);

  const getData = async (id?: string) => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const json: any = {
        id: id,
        status: statusPayment,
      };

      try {
        const storedUmrahLines = localStorage.getItem("umrahLines");
        if (storedUmrahLines) {
          const umrahLines = JSON.parse(storedUmrahLines);
          json.umrah_lines = umrahLines;
          localStorage.removeItem("umrahLines");
        }
      } catch (error) {
        console.error("Failed to parse umrah lines from localStorage:", error);
      }

      await addDonation(json);
    } catch (error) {
      if (statusPayment === "paid") {
        const fallbackData = [
          { title: "تفاصيل التبرع:", value: decodedDonationTypeName },
          { title: "اسم المتبرع:", value: decodedUserName },
          {
            title: "مبلغ التبرع:",
            value: `${AmountPaid} ريال`,
          },
          { title: "رقم الإيصال:", value: id },
          {
            title: " تاريخ :",
            value: moment().locale("en").format("YYYY/MM/DD"),
          },
          {
            title: " وقت :",
            value: arabicTime,
          },
        ];
        setResultat(fallbackData);
        setState({
          message: "تمت مساهمتك بنجاح",
          type: "success",
          donation_id: -1,
        });
      } else {
        setState({
          message:
            "نرجو التواصل مع البنك التابع للبطاقة و الاستفسار عن عملية التبرع المرفوضة",
          type: "error",
          donation_id: -1,
        });
      }
      setLoading(false);
    }
  };

  const waitUntilBackendIsUp = async () => {
    let tries = 0;
    while (tries < 5) {
      try {
        const res = await fetch(`${baseUrlApi}partners/success`);
        if (res.ok) return true;
      } catch {}
      await new Promise((r) => setTimeout(r, 2000));
      tries++;
    }
    return false;
  };

  const addDonation = async (values: any) => {
    const nameParts = decodedUserName?.split(" ") || [];

    const donationPayload = {
      price: AmountPaid || 0,
      currency: "SAR",
      transactionId: id || "unknown",
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: decodedUserEmail,
      phone: decodedUserPhone,
    };
    const backendReady = await waitUntilBackendIsUp();

    if (!backendReady) {
      if (statusPayment === "paid") {
        trackSnapDonation(donationPayload);
        trackTikTokDonation(donationPayload);
        trackMetaDonation(donationPayload);
        trackXDonation(donationPayload);
        const fallbackData = [
          { title: "تفاصيل التبرع:", value: decodedDonationTypeName },
          {
            title: "مبلغ التبرع:",
            value: `${AmountPaid} ريال`,
          },
          { title: "رقم الإيصال:", value: id },
          {
            title: " تاريخ :",
            value: moment().locale("en").format("YYYY/MM/DD"),
          },
          {
            title: " وقت :",
            value: moment().locale("en").format("HH:mm"),
          },
        ];
        setResultat(fallbackData);
        setState({
          message: "تمت مساهمتك بنجاح",
          type: "success",
          donation_id: -1,
        });
        setLoading(false);
        return;
      } else {
        setState({
          message: "الخدمة غير متوفرة حاليًا، سنعيد المحاولة لاحقًا",
          type: "error",
          donation_id: -1,
        });
        setLoading(false);
        return;
      }
    }

    const res = await toAddDonation(values);

    if (res?.result?.donation_id) {
      setId(res?.result?.donation_id);
    }

    if (res?.result?.code === 409 && statusPayment === "paid") {
      setIsModalVisible(false);
      navigate("/");
      return;
    }

    toFormatData({ ...res, id: id });

    // If backend response fails but payment status is "paid", show success with fallback
    if (!res?.result || res?.result?.status !== "paid") {
      if (statusPayment === "paid") {
        setState({
          message: "تمت مساهمتك بنجاح",
          type: "success",
          donation_id: -1, // No donation_id from backend, so rating won't be available
        });
      } else {
        setState({
          message: res?.result?.failure || "حدث خطأ في معالجة التبرع",
          type: "error",
          donation_id: -1,
        });
      }
    } else {
      trackSnapDonation(donationPayload);
      trackTikTokDonation(donationPayload);
      trackMetaDonation(donationPayload);
      trackXDonation(donationPayload);
      setState({
        message: res.result.message,
        type: "success",
        donation_id: res.result.donation_id,
      });
    }

    setLoading(false);
  };

  const handlePolicyAccept = () => {
    setIsPolicyVisible(true);
  };

  return (
    <ModalComponent
      title=""
      showCloseIcon={true}
      open={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
        form.resetFields();
      }}
      closeOnOutsideClick={true}
      width={550}
      modalRender={(node) => (
        <div style={{ pointerEvents: "auto" }}>
          {/* Lottie animation at the top */}
          {isLoading === false && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-30px",
                zIndex: 1000,
                position: "relative",
              }}
            >
              <Lottie
                animationData={
                  state.type === "success" ? messageDonation : errorDonation
                }
                loop={true}
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          )}
          {node}
          <div
            className="ghaith--login-external-titles registration--footer-title"
            style={{ pointerEvents: "auto" }}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate("/general-projects");
                setIsModalVisible(false);
              }}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              المزيد من المشاريع
            </span>
            <span className="ghaith--login-separator">|</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate("/");
                setIsModalVisible(false);
              }}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              العودة للرئيسية
            </span>
          </div>
        </div>
      )}
    >
      <div className="ghaith--login-form-wrapper ghaith--donate_form-wrapper">
        {" "}
        {state.type === "success" ? (
          <div className="ghaith--login-form-header ghaith--donate-header">
            <div
              className="ghaith--login-form-icon"
              style={{ width: "70%", height: "100%" }}
            >
              <img src={verifiedIcon} alt="" />
            </div>
          </div>
        ) : null}
        <div
          className="ghaith--login-form-body ghaith--donate_form-body"
          style={{ padding: "5px 5px 15px" }}
        >
          {isLoading === true ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <CircularProgress size={30} sx={{ color: "#07a887" }} />
              </div>
            </>
          ) : (
            <>
              {state.type === "success" ? (
                <>
                  {/* Success State */}
                  <div className="ghaith--donation-details">
                    {result?.map((el: any, index: number) => (
                      <div className="ghaith--detail-row" key={index}>
                        <span className="ghaith--detail-label">{el.title}</span>
                        <span
                          className={`ghaith--detail-value ${
                            el?.value?.includes("ريال")
                              ? "icon-saudi_riyal"
                              : ""
                          }`}
                        >
                          {el?.value?.replace("ريال", "").trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="ghaith--moyassar-divider" />
                  <div
                    style={{
                      display: "flex",
                      gap: "35px",
                      flexWrap: "wrap",
                      width: "90%",
                      margin: "0 auto",
                      marginBottom: "10px",
                    }}
                  >
                    {state.donation_id !== -1 && (
                      <Button
                        type="primary"
                        className="ghaith--login-button ghaith--moyassar-button gh--font-medium"
                        style={{ flex: "1", minWidth: "200px" }}
                        onClick={() => {
                          dispatch(setResModel("account.payment"));
                          dispatch(setRatingVisible(true));
                          dispatch(setResIds([state.donation_id]));
                        }}
                        icon={
                          <img
                            src={smileIcon}
                            alt=""
                            width={24}
                            height={24}
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          />
                        }
                      >
                        تقــــــــــيـيـم الخـــــــــــــدمة
                      </Button>
                    )}
                    <Button
                      type="primary"
                      className="ghaith--login-button ghaith--moyassar-button gh--font-medium"
                      style={{ flex: "1", minWidth: "200px" }}
                      icon={
                        loadinPrint ? (
                          <CircularProgress size={20} sx={{ color: "#fff" }} />
                        ) : (
                          <img
                            alt=""
                            src={printerIcon}
                            width={24}
                            height={24}
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          />
                        )
                      }
                      onClick={handlePrint}
                      disabled={!Id || loadinPrint}
                      loading={loadinPrint}
                    >
                      {loadinPrint
                        ? "جاري التحميل..."
                        : "طـــــباعة الإيصـــــــال"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Error State */}
                  <div style={{ textAlign: "center", padding: "20px 10px" }}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#D44E3F",
                        marginBottom: "15px",
                      }}
                      className="gh--font-light"
                    >
                      وقع خطأ في عملية الدفع
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        lineHeight: "1.6",
                        marginBottom: "20px",
                      }}
                      className="gh--font-light"
                    >
                      {state.message ||
                        "نرجو التواصل مع البنك التابع للبطاقة و الاستفسار عن عملية التبرع المرفوضة"}
                    </p>
                    <div className="ghaith--moyassar-divider" />
                  </div>
                </>
              )}
            </>
          )}
          <p
            className="ghaith--policy-text"
            style={{ textAlign: "center", marginTop: "0", marginBottom: "5px" }}
          >
            <span
              style={{
                color: "#109d72",
                fontWeight: 600,
              }}
            >
              سيتم حفظ بيانات البطاقة عند إتمام العملية.
            </span>
            <>
              <br />
              <span
                style={{
                  color: "#109d72",
                  fontWeight: 600,
                }}
              >
                خدمة الدفع مقدمة من قبل ميسر{" "}
              </span>
            </>
          </p>
          <p
            className="ghaith--policy-text"
            style={{ textAlign: "center", color: "#1c4246", marginTop: "0" }}
          >
            <>
              بإتمام التبرع أنت توافق على{" "}
              <span
                className="ghaith--policy-link"
                style={{
                  color: "#1c4246",
                  fontWeight: 600,
                }}
                onClick={startDonation}
              >
                سياسة التبرع{" "}
              </span>
            </>
          </p>
        </div>
      </div>{" "}
      <DonatePolicyModal
        isModalVisible={isPolicyVisible}
        setIsModalVisible={setIsPolicyVisible}
        onAccept={handlePolicyAccept}
      />
    </ModalComponent>
  );
};

export default MoyassarResultModal;
