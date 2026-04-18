import React, { SetStateAction, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import visa from "../../assets/icons/visa.png";
import mc from "../../assets/icons/card.png";
import applePay from "../../assets/icons/apple-pay.png";
import bank from "../../assets/icons/bank.png";
import mada from "../../assets/icons/mada.png";
import verifiedIcon from "../../assets/icons/verified.svg";
import microphoneIcon from "../../assets/icons/microphone.svg";
import { Button, Checkbox, Col, ConfigProvider, Form, Row } from "antd";
import CustomLabelInput from "../Inputs/CustomLabelInput";
import InputDate from "../Inputs/InputDate";
import Gift from "./Gift";
import MoyasarForm from "../../components/moyassar/MoyassarForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import {
  setBeneficiaryRequestId,
  setDonationTypeId,
  setGift,
  setMobile,
  setProgramId,
  setShareId,
  setShareQuantity,
  setUmrahId,
  setUmrahLines,
} from "../../apis/slices/moyassarSlice";
import { useCookies } from "react-cookie";
import Login from "../../domains/pages/auth/Login";
import BankTransferModal from "../../components/bank-transfer/BankTransferModal";
import CustomLabelSelect from "../../components/select/CustomLabelSelect";
import { scroll, showNotification } from "../../apis/utils/utils";
import { useVoiceRecorder } from "./VoiceRecorder";
import ModalComponent from "../Modal/ModalComponent";
import useIsMobile from "../mobileVersion/useIsMobile";
import donationIcon from "../../assets/icons/donation.png";
import PolicyTooltip from "../../components/bank-transfer/PolicyTooltip";
import ar_EG from "antd/lib/locale/ar_EG";
import {
  getAvailableDays,
  getRamadanList,
} from "../../apis/actions/ramadan.actions";

interface DonateCardProps {
  tags: any[];
  selectedShare?: any;
  setSelectedShare?: (value: SetStateAction<any>) => void;
  remaining_amount?: number;
  program?: any;
  variant?: "donation" | "payment";
  umrah?: boolean;
  isKorba?: boolean;
}

interface UmrahData {
  beneficiary_name: string;
  mobile: string;
  gender: string;
  is_dead: boolean;
  execution_date: string;
  beneficiary_name_voice_recording_ids: Array<{
    filename: string;
    data: string;
  }>;
}

const DonateCard: React.FC<DonateCardProps> = ({
  tags,
  selectedShare,
  setSelectedShare,
  remaining_amount,
  program,
  variant,
  umrah,
  isKorba,
}) => {
  const [form] = Form.useForm();
  const [showGiftFields, setShowGiftFields] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(
    variant === "payment" ? true : false,
  );
  const [isHeaderExpanded, setIsHeaderExpanded] = useState<string>("");
  const [isBankTransferVisible, setIsBankTransferVisible] =
    useState<boolean>(false);
  const donor = useSelector((state: RootState) => state?.profile?.DonorDetails);
  const ramadanList = useSelector(
    (state: RootState) => state?.ramadan?.ramadanList,
  );
  const availableDays = useSelector(
    (state: RootState) => state?.ramadan?.AvailableDays,
  );
  const [valid, setIsvalid] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [activeTag, setActiveTag] = useState<any>(null);
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState<any>(null);
  const [displayMoyasar, setDisplayMoyasar] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [cookies] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;
  const donateCardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(getRamadanList());
    dispatch(getAvailableDays());
  }, [dispatch]);
  const donationAmount = Form.useWatch("donation_amount", form);
  const {
    isRecording,
    recordingTime,
    formattedTime,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useVoiceRecorder();
  const isMobile = useIsMobile();

  const [voiceRecordings, setVoiceRecordings] = useState<
    Array<{
      index: number;
      filename: string;
      data: string;
    } | null>
  >(Array(counter).fill(null));

  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [recordingForIndex, setRecordingForIndex] = useState<number>(0); // Track which person is being recorded

  const normalizeDateStrings = (dates: any[]) =>
    dates
      .map((date) => (typeof date === "string" ? date : date?.date))
      .filter((date): date is string => typeof date === "string")
      .filter((date) => dayjs(date).isValid());

  const getDateBounds = (dates: string[]) => {
    if (!dates || dates.length === 0) {
      return null;
    }

    const sorted = dates
      .map((date) => dayjs(date).startOf("day"))
      .filter((date) => date.isValid())
      .sort((a, b) => a.valueOf() - b.valueOf());

    if (sorted.length === 0) {
      return null;
    }

    return {
      start: sorted[0],
      end: sorted[sorted.length - 1],
    };
  };

  const getAvailableDateStrings = () => {
    if (Array.isArray(availableDays) && availableDays.length > 0) {
      const dates = normalizeDateStrings(availableDays);
      if (dates.length > 0) {
        return dates;
      }
    }

    if (Array.isArray(ramadanList?.meal_target_line_ids)) {
      return normalizeDateStrings(ramadanList.meal_target_line_ids);
    }

    return [];
  };

  const getLastTenDateStrings = () => {
    if (Array.isArray(ramadanList?.meal_target_line_ids)) {
      const lastTenDates = ramadanList.meal_target_line_ids
        .filter((day: any) => day?.is_last_ten_ramadan_days)
        .map((day: any) => day?.date)
        .filter(Boolean);

      const normalized = normalizeDateStrings(lastTenDates);
      const availableDates = getAvailableDateStrings();
      const intersected =
        availableDates.length > 0
          ? normalized.filter((date) => availableDates.includes(date))
          : normalized;

      if (intersected.length > 0) {
        return intersected;
      }
    }

    const availableDates = getAvailableDateStrings();
    if (availableDates.length === 0) {
      return [];
    }

    const sorted = availableDates
      .map((date) => dayjs(date).startOf("day"))
      .filter((date) => date.isValid())
      .sort((a, b) => a.valueOf() - b.valueOf())
      .map((date) => date.format("YYYY-MM-DD"));

    return sorted.slice(-10);
  };

  const getExecutionDateRange = () => {
    const tagName = activeTag?.name;
    const today = dayjs().startOf("day");
    const tomorrow = today.add(1, "day");

    if (typeof tagName !== "string") {
      return null;
    }

    if (tagName.includes("العشر الأواخر")) {
      const lastTenDates = getLastTenDateStrings();
      const bounds = getDateBounds(lastTenDates);
      if (!bounds) {
        return null;
      }

      const { start, end } = bounds;
      const isTodayInRange =
        (today.isAfter(start) || today.isSame(start)) &&
        (today.isBefore(end) || today.isSame(end));

      return {
        start: isTodayInRange ? tomorrow : start,
        end,
      };
    }

    if (tagName.includes("رمضان")) {
      const availableDates = getAvailableDateStrings();
      const bounds = getDateBounds(availableDates);
      if (!bounds) {
        return null;
      }

      const start = tomorrow.isAfter(bounds.start) ? tomorrow : bounds.start;

      return {
        start,
        end: bounds.end,
      };
    }

    return null;
  };

  const disabledExecutionDate = (current: Dayjs) => {
    if (!current) return false;

    const selectedDate = current.startOf("day");
    const range = getExecutionDateRange();

    if (range) {
      return (
        selectedDate.isBefore(range.start) || selectedDate.isAfter(range.end)
      );
    }

    return !selectedDate.isAfter(dayjs().startOf("day"));
  };

  const validateExecutionDate = (_: unknown, value: Dayjs) => {
    if (!value) {
      return Promise.resolve();
    }

    const selectedDate = value.startOf("day");
    const range = getExecutionDateRange();

    if (range) {
      if (
        selectedDate.isBefore(range.start) ||
        selectedDate.isAfter(range.end)
      ) {
        return Promise.reject(
          new Error(
            "تاريخ التنفيذ يجب أن يكون ضمن الفترة المتاحة للوسم المختار",
          ),
        );
      }
      return Promise.resolve();
    }

    if (!selectedDate.isAfter(dayjs().startOf("day"))) {
      return Promise.reject(new Error("تاريخ التنفيذ يجب أن يكون بعد اليوم"));
    }

    return Promise.resolve();
  };

  const handleStartRecording = async (index: number) => {
    setRecordingForIndex(index);
    setShowRecordingModal(true);
    const started = await startRecording(async () => {
      try {
        const recording = await stopRecording();
        const newRecordings = [...voiceRecordings];
        newRecordings[index] = {
          index,
          filename: recording.filename,
          data: recording.data,
        };
        setVoiceRecordings(newRecordings);
        setShowRecordingModal(false);
        // Update form field for this specific person
        form.setFieldValue(`voice_recording_${index}`, recording);
        showNotification(
          "تم حفظ التسجيل الصوتي بنجاح ( الحد الأقصى 10 ثواني)",
          "success",
        );
      } catch (error) {
        setShowRecordingModal(false);
        showNotification("حدث خطأ أثناء حفظ التسجيل", "error");
      }
    });

    if (!started) {
      setShowRecordingModal(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      const recording = await stopRecording();
      const newRecordings = [...voiceRecordings];
      newRecordings[recordingForIndex] = {
        index: recordingForIndex,
        filename: recording.filename,
        data: recording.data,
      };
      setVoiceRecordings(newRecordings);
      setShowRecordingModal(false);
      // Update form field for this specific person
      form.setFieldValue(`voice_recording_${recordingForIndex}`, recording);
      showNotification(
        "تم حفظ التسجيل الصوتي بنجاح (الحد الأقصى 10 ثواني)",
        "success",
      );
    } catch (error) {
      setShowRecordingModal(false);
      showNotification("حدث خطأ أثناء حفظ التسجيل", "error");
    }
  };

  const handleCancelRecording = () => {
    cancelRecording();
    setShowRecordingModal(false);
  };

  const handleDeleteRecording = (index: number) => {
    const newRecordings = [...voiceRecordings];
    newRecordings[index] = null;
    setVoiceRecordings(newRecordings);
    // Clear form field for this specific person
    form.setFieldValue(`voice_recording_${index}`, null);
    showNotification("تم حذف التسجيل الصوتي", "success");
  };

  const toggleBodyVisibility = () => {
    if (isVisible) {
      setIsHeaderExpanded("no");
      form.resetFields();
      setActiveTag(null);
      setVoiceRecordings(Array(counter).fill(null)); // Reset recordings
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } else {
      setIsVisible(true);
      setIsHeaderExpanded("yes");
    }
  };

  // Add escape key handler
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible && variant === "donation") {
        setIsHeaderExpanded("no");
        form.resetFields();
        setActiveTag(null);
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isVisible, variant, form]);

  useEffect(() => {
    if (donationAmount !== undefined && donationAmount !== null) {
      setTotal(donationAmount);
    }
  }, [donationAmount]);

  useEffect(() => {
    if (selectedShare) {
      setActiveTag(selectedShare);
      if (selectedShare.amount) {
        const initialAmount = selectedShare.amount;
        form.setFieldsValue({
          donation_amount: initialAmount,
        });
        setCounter(1);
      }
    }
  }, [selectedShare, form]);

  useEffect(() => {
    if (isConnected && cookies?.role === "donor") {
      form.setFieldsValue({
        mobile: donor?.mobile,
      });
    }
  }, [cookies?.role]);

  // Update voice recordings array when counter changes
  useEffect(() => {
    if (umrah && variant !== "donation") {
      const newRecordings = [...voiceRecordings];
      if (counter > newRecordings.length) {
        // Add null entries for new persons
        const additionalNulls = Array(counter - newRecordings.length).fill(
          null,
        );
        setVoiceRecordings([...newRecordings, ...additionalNulls]);
      } else if (counter < newRecordings.length) {
        // Remove entries for removed persons
        const trimmedRecordings = newRecordings.slice(0, counter);
        setVoiceRecordings(trimmedRecordings);
      }
    }
  }, [counter, umrah, variant]);
  useEffect(() => {
    if (tags?.length === 1 && !activeTag) {
      handleTagClick(tags[0]);
    }
  }, [tags]);
  const handleTagClick = (tag?: any) => {
    setActiveTag(tag);

    if (setSelectedShare) {
      setSelectedShare(tag);
    }

    if (tag?.amount) {
      const newAmount = tag?.amount;
      form.setFieldsValue({
        donation_amount: newAmount,
      });
      setCounter(1);
      // Reset recordings when tag changes
      setVoiceRecordings(Array(1).fill(null));
    }
  };

  const isActiveTag = (tag: any) => {
    if (!activeTag) return false;
    return tag.id ? tag.id === activeTag.id : tag.name === activeTag.name;
  };

  // Check if donation amount should be read-only
  const isDonationAmountReadOnly = activeTag?.open_share === false;

  // Handle counter change
  const handleCounterChange = (value: number) => {
    if (!activeTag?.amount || value < 1) return;

    const newAmount = activeTag.amount * value;

    // Check if new amount exceeds remaining amount
    if (remaining_amount && newAmount > remaining_amount) {
      const maxCounter = Math.floor(remaining_amount / activeTag.amount);
      setCounter(maxCounter);
      form.setFieldsValue({
        donation_amount: remaining_amount,
      });
    } else {
      setCounter(value);
      form.setFieldsValue({
        donation_amount: newAmount,
      });
    }
  };

  const handleDonationAmountChange = (value: number) => {
    if (!activeTag?.amount) return;

    // Check if amount exceeds remaining amount
    if (remaining_amount && value > remaining_amount) {
      form.setFieldsValue({
        donation_amount: remaining_amount,
      });
      // Update counter based on remaining amount
      const newCounter = Math.floor(remaining_amount / activeTag.amount);
      setCounter(newCounter);
    } else {
      // Update counter based on the new amount
      const newCounter = Math.round(value / activeTag.amount);
      setCounter(newCounter > 0 ? newCounter : 1);
    }
  };

  const handleExecutionDateFieldChange = (
    field: string,
    value: Dayjs | null,
  ) => {
    form.setFieldValue(field, value);
    if (value) {
      form.validateFields([field]).catch(() => {});
    }
  };

  const validateDonation = async () => {
    await form.validateFields().then((values) => {
      if (variant !== "donation" && umrah) {
        const umrahDataList: UmrahData[] = [];

        for (let i = 0; i < counter; i++) {
          const umrahData: UmrahData = {
            beneficiary_name: values[`motamar_name_${i}`],
            mobile: values[`motamar_phone_${i}`] || "",
            gender: values[`motamar_gender_${i}`],
            is_dead: values[`is_deceased_${i}`] || false,
            execution_date: values[`execution_date_${i}`]?.format("YYYY-MM-DD"),
            beneficiary_name_voice_recording_ids: voiceRecordings[i]
              ? [
                  {
                    filename: voiceRecordings[i]!.filename,
                    data: voiceRecordings[i]!.data,
                  },
                ]
              : [],
          };
          umrahDataList.push(umrahData);
          dispatch(setUmrahId(activeTag?.id));
        }

        dispatch(setUmrahLines(umrahDataList));
        try {
          localStorage.setItem("umrahLines", JSON.stringify(umrahDataList));
        } catch (error) {
          console.error("Failed to save umrah lines to localStorage:", error);
        }
      }

      if (isKorba) {
        dispatch(setBeneficiaryRequestId(program?.id));
      } else {
        dispatch(
          setProgramId({
            id: program?.id,
            name: umrah ? activeTag?.name : "صدقة",
          }),
        );
      }
      if (!umrah && variant !== "donation") {
        dispatch(setShareId(activeTag?.id));
      }
      if (showGiftFields) {
        const json = {
          sender_name: form.getFieldValue("inputFieldName"),
          card_type_id: form.getFieldValue("card_id")?.value,
          name: form.getFieldValue("inputFieldDedicatedName"),
          mobile_number: form.getFieldValue("inputFieldPhone"),
          send_copy_to_sender: form.getFieldValue("sendCopie") ?? false,
          show_name_in_dedication: form.getFieldValue("showName") ?? false,
          show_amount: form.getFieldValue("show_amount") ?? false,
          send_gift: true,
        };
        dispatch(setGift(json));
      }

      setDisplayMoyasar(true);

      if (variant === "donation") {
        dispatch(setDonationTypeId({ id: false, name: "صدقة" }));
      }
      if (!activeTag?.open_share) {
        dispatch(setShareQuantity(counter));
      }
    });
  };

  const validateOpenBank = async () => {
    await form.validateFields().then((values) => {
      if (variant !== "donation" && umrah) {
        const umrahDataList: UmrahData[] = [];

        for (let i = 0; i < counter; i++) {
          const umrahData: UmrahData = {
            beneficiary_name: values[`motamar_name_${i}`],
            mobile: values[`motamar_phone_${i}`],
            gender: values[`motamar_gender_${i}`],
            is_dead: values[`is_deceased_${i}`] || false,
            execution_date: values[`execution_date_${i}`]?.format("YYYY-MM-DD"),
            beneficiary_name_voice_recording_ids: voiceRecordings[i]
              ? [
                  {
                    filename: voiceRecordings[i]!.filename,
                    data: voiceRecordings[i]!.data,
                  },
                ]
              : [],
          };
          umrahDataList.push(umrahData);
        }

        dispatch(setUmrahId(activeTag?.id));
        dispatch(setUmrahLines(umrahDataList));
      }
      if (!umrah && variant !== "donation") {
        dispatch(setShareId(activeTag?.id));
      }
      if (!activeTag?.open_share) {
        dispatch(setShareQuantity(counter));
      }

      dispatch(
        setProgramId({
          id: program?.id,
          name: umrah ? activeTag?.name : "صدقة",
        }),
      );
      setIsBankTransferVisible(true);
    });
  };

  // Render umrah fields based on counter
  const renderUmrahFields = () => {
    if (!umrah || variant === "donation") return null;

    return (
      <>
        <h5 className="ghaith--donation-tags-title">
          {counter === 1 ? "بيانات المعتمر عنه" : "بيانات المعتمرين"}
        </h5>

        {Array.from({ length: counter }).map((_, index) => (
          <div key={index} className="ghaith--umrah-person-section">
            <Row gutter={16}>
              <Col xxl={12} xl={24} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name={`motamar_name_${index}`}
                  rules={[
                    {
                      required: true,
                      message: "اسم المعتمر مطلوب",
                    },
                    {
                      validator: (_, value) => {
                        if (
                          value &&
                          !/^[A-Za-z\u0600-\u06FF\s]+$/.test(value)
                        ) {
                          return Promise.reject(
                            new Error("فقط الحروف مسموح بها!"),
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  className="ghaith--label-inputs"
                >
                  <CustomLabelInput
                    label=""
                    placeholder={`اسم المعتمر ${index + 1}`}
                    type="text"
                    className="ghaith--donate-transparent-input"
                  />
                </Form.Item>
              </Col>
              <Col xxl={12} xl={24} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name={`motamar_phone_${index}`}
                  rules={[
                    {
                      required: false,
                      message: "رقم الجوال مطلوب",
                    },
                    {
                      validator: (_, value) => {
                        if (value && !/^[0-9]+$/.test(value)) {
                          return Promise.reject(
                            new Error("فقط الأرقام مسموح بها!"),
                          );
                        }
                        if (value && value.toString().length !== 10) {
                          return Promise.reject(
                            new Error("يجب أن يتكون رقم الهاتف من 10 ارقام"),
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  className="ghaith--label-inputs"
                >
                  <CustomLabelInput
                    label=""
                    placeholder="الجوال"
                    type="tel"
                    className="ghaith--donate-transparent-input"
                    maxLength={10}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} align="middle">
              <Col span={12}>
                <Form.Item
                  name={`motamar_gender_${index}`}
                  rules={[
                    {
                      required: true,
                      message: "الجنس مطلوب",
                    },
                  ]}
                  className="ghaith--label-inputs"
                >
                  <CustomLabelSelect
                    WrapperclassName="ghaith--donate-select"
                    className="ghaith--label-inputs"
                    label="الجنس"
                    placeholder=""
                    options={[
                      { id: "male", name: "ذكر" },
                      { id: "female", name: "أنثى" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                {" "}
                <Form.Item
                  name={`execution_date_${index}`}
                  rules={[
                    {
                      required: true,
                      message: "تاريخ التنفيذ مطلوب",
                    },
                    {
                      validator: validateExecutionDate,
                    },
                  ]}
                  className="ghaith--label-inputs"
                >
                  <ConfigProvider locale={ar_EG} direction="rtl">
                    <InputDate
                      placeholder="تاريخ التنفيذ"
                      className="ghaith--donate-transparent-input"
                      disabledDate={disabledExecutionDate}
                      format="YYYY-MM-DD"
                      onChange={(value) =>
                        handleExecutionDateFieldChange(
                          `execution_date_${index}`,
                          value,
                        )
                      }
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12} style={{ marginBottom: "25px" }}>
                <Form.Item
                  name={`is_deceased_${index}`}
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox className="ghaith--custom-checkbox">
                    <div className="ghaith--label-style gh--font-medium">
                      <span>متوفي</span>
                    </div>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              block
              className="ghaith--login-button ghaith--donate-button ghaith--watch-card-btn"
              icon={
                <img
                  src={microphoneIcon}
                  alt="تسجيل صوتي"
                  style={{
                    width: "22px",
                    height: "22px",
                    marginTop: "5px",
                    marginRight: "5px",
                  }}
                />
              }
              iconPosition="end"
              onClick={() => {
                if (!isRecording) {
                  handleStartRecording(index);
                } else if (recordingForIndex === index) {
                  handleStopRecording();
                }
              }}
              style={{
                backgroundColor:
                  voiceRecordings[index] ||
                  (isRecording && recordingForIndex === index)
                    ? "#109d73a8"
                    : undefined,
                borderColor:
                  voiceRecordings[index] ||
                  (isRecording && recordingForIndex === index)
                    ? "#109d73a8"
                    : undefined,
              }}
            >
              {isRecording && recordingForIndex === index
                ? "جارٍ التسجيل..."
                : voiceRecordings[index]
                  ? `تم التسجيل ✓`
                  : "تسجيل صوتي لإسم المعتمر"}
            </Button>
            <h1 className="ghaith--donation-umrah-subtitle">
              تسجيل صوتي لإسم المعتمر عنه لضمان نطقه بشكل صحيح
            </h1>
            {voiceRecordings[index] && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#f0f9f4",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#109d72", fontSize: "14px" }}>
                  📎 {voiceRecordings[index]!.filename}
                </span>
                <Button
                  type="text"
                  danger
                  size="small"
                  onClick={() => handleDeleteRecording(index)}
                  style={{ padding: "0 8px" }}
                  className="gh--font-light"
                >
                  حذف
                </Button>
              </div>
            )}

            {index < counter - 1 && (
              <hr style={{ margin: "20px 0", borderColor: "#e8e8e8" }} />
            )}
          </div>
        ))}
      </>
    );
  };
  useEffect(() => {
    if (
      variant !== "donation" &&
      donateCardRef.current &&
      !umrah &&
      (selectedShare || activeTag)
    ) {
      scroll(donateCardRef);
    }
  }, [cookies, variant]);
  return (
    <div
      className="ghaith--login-form-wrapper ghaith--donate_form-wrapper "
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <div
        className={` ${
          variant === "donation"
            ? "ghaith--card-donation-size ghaith--rapide_donation-card"
            : "ghaith--card-payment-size"
        } `}
        ref={variant === "donation" ? null : donateCardRef}
      >
        {variant === "donation" && (
          <div
            className={`ghaith--rapide_donation-card-header ${
              isHeaderExpanded === "yes"
                ? "expanded"
                : isHeaderExpanded === "no"
                  ? "collapsed"
                  : ""
            }`}
            onClick={() => toggleBodyVisibility()}
          >
            {isMobile ? (
              <img src={donationIcon} width={32} height={32} />
            ) : (
              <p>التبرع السريع</p>
            )}
          </div>
        )}

        {/* Header with Icon - White Background */}
        {isVisible && (
          <div
            className={
              variant === "donation"
                ? `ghaith--rapide_donation-card-body ${
                    isHeaderExpanded === "yes" ? "expanded" : "collapsed"
                  }`
                : ""
            }
          >
            {variant !== "donation" && (
              <div className="ghaith--login-form-header ghaith--donate-header">
                <div className="ghaith--login-form-icon">
                  <img src={verifiedIcon} alt="تسجيل متبرع جديد" />
                </div>
                <h4 className="ghaith--donate-title">
                  تـــــــــــبرع بأمــــــــــــان
                </h4>
              </div>
            )}

            <div className="ghaith--payment-methods">
              {!umrah && (
                <div
                  className={`ghaith--payment-icon-wrapper ghaith--bank-icon-container ${
                    total && !isNaN(total) && total > 0
                      ? "ghaith--bank-icon-highlight"
                      : ""
                  }`}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={bank}
                    alt="Bank Transfer"
                    className="ghaith--payment-icon bank-icon"
                    onClick={() => {
                      if (isConnected || variant === "donation") {
                        if (variant === "payment") {
                          validateOpenBank();
                        } else {
                          setIsBankTransferVisible(true);
                        }
                      } else {
                        setShowLogin(true);
                      }
                    }}
                  />
                  {total && !isNaN(total) && total > 0 && (
                    <div className="ghaith--bank-tooltip">
                      يمكنك إستخدام التحويل البنكي
                    </div>
                  )}
                </div>
              )}
              <div className="ghaith--payment-icon-wrapper">
                <img src={mada} alt="Mada" className="ghaith--payment-icon" />
              </div>
              <div className="ghaith--payment-icon-wrapper">
                <img src={visa} alt="Visa" className="ghaith--payment-icon" />
              </div>
              <div className="ghaith--payment-icon-wrapper">
                <img
                  src={mc}
                  alt="Mastercard"
                  className="ghaith--payment-icon"
                />
              </div>
              <div className="ghaith--payment-icon-wrapper">
                <img
                  src={applePay}
                  alt="Apple Pay"
                  className="ghaith--payment-icon"
                />
              </div>
            </div>

            {/* Form Section - Light Green Background */}
            <div className="ghaith--login-form-body ghaith--donate_form-body ">
              <div className="ghaith--donation-tags-section">
                {variant !== "donation" && (
                  <h5 className="ghaith--donation-tags-title">
                    {umrah ? "انــــــواع العمـــــــرة" : "الأســــــهم"}
                  </h5>
                )}

                <div className="ghaith--donation-tags-wrapper">
                  {tags?.map((tag, index) => (
                    <Button
                      key={index}
                      className={`ghaith--donation-card__tag-btn ${
                        isActiveTag(tag)
                          ? "ghaith--donation-card__tag-btn--active"
                          : ""
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag.name.includes("ر.س") ? (
                        <span className="icon-saudi_riyal">
                          {tag.name.replace("ر.س", "").trim()}
                        </span>
                      ) : (
                        tag.name
                      )}{" "}
                    </Button>
                  ))}
                </div>
              </div>
              <Form form={form} layout="vertical">
                {/* Form Fields */}
                <div className="ghaith--login-form-inputs">
                  <Row gutter={8} justify={"space-between"}>
                    <Col
                      xxl={variant === "donation" || umrah ? 24 : 19}
                      xl={variant === "donation" || umrah ? 24 : 17}
                      lg={variant === "donation" || umrah ? 24 : 19}
                      md={variant === "donation" || umrah ? 24 : 19}
                      sm={variant === "donation" || umrah ? 24 : 19}
                      xs={variant === "donation" || umrah ? 24 : 17}
                    >
                      {" "}
                      <Form.Item
                        name="donation_amount"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء تعبئة الحقل",
                          },
                          {
                            validator: (_, value) => {
                              if (value === undefined || value === null) {
                                return Promise.resolve();
                              }
                              if (Number(value) < 5) {
                                return Promise.reject(
                                  new Error(
                                    "الحد الأدنى لمبلغ التبرع هو 5 ريال",
                                  ),
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        className="ghaith--label-inputs"
                      >
                        <CustomLabelInput
                          withCurrency
                          placeholder="مبلغ التبرع"
                          label=""
                          maxLength={7}
                          type="number"
                          className="ghaith--donate-transparent-input"
                          withArrows={false}
                          disabled={
                            isDonationAmountReadOnly ||
                            (!selectedShare &&
                              !activeTag &&
                              tags?.length > 0 &&
                              variant === "payment") ||
                            umrah
                          }
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && activeTag?.open_share) {
                              handleDonationAmountChange(value);
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    {variant !== "donation" && !umrah && (
                      <Col xxl={5} xl={7} lg={5} md={5} sm={5} xs={7}>
                        <CustomLabelInput
                          label=""
                          value={counter}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              handleCounterChange(value);
                            }
                          }}
                          withArrows={true}
                          className="ghaith--donation-counter-input"
                          type="number"
                        />
                      </Col>
                    )}
                  </Row>
                  <Form.Item
                    preserve={true}
                    name="mobile"
                    rules={[
                      {
                        required: false,
                        message: "رقم الجوال مطلوب",
                      },
                      {
                        validator: (_, value) => {
                          if (value && !/^[0-9]+$/.test(value)) {
                            return Promise.reject(
                              new Error("فقط الأرقام الموجبة مسموح بها!"),
                            );
                          }
                          if (value && value.toString().length !== 10) {
                            return Promise.reject(
                              new Error("يجب أن يتكون رقم الهاتف من 10 ارقام"),
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    className="ghaith--label-inputs"
                  >
                    <CustomLabelInput
                      placeholder="ادخل رقم الجوال"
                      label=""
                      type="tel"
                      className="ghaith--donate-transparent-input"
                      maxLength={10}
                      onChange={(e) => {
                        dispatch(setMobile(e.target.value));
                      }}
                    />
                  </Form.Item>

                  {variant !== "donation" && renderUmrahFields()}
                </div>
                <Gift
                  form={form}
                  isDonationGiftEnabled={showGiftFields}
                  setIsDonationGiftEnabled={setShowGiftFields}
                  variant={variant}
                />
              </Form>
              {variant === "donation" && (
                <p
                  className="ghaith--policy-text"
                  style={{ textAlign: "center" }}
                >
                  سيذهب تبرعك تلقائيًا للحالات{" "}
                  <span
                    style={{
                      color: isConnected ? "#4caf50" : "inherit",
                      fontWeight: isConnected ? 500 : "normal",
                    }}
                  >
                    الأشد احتياجًا
                  </span>
                  {!isConnected && (
                    <>
                      <br />
                      يمكنك{" "}
                      <span
                        className="ghaith--policy-link"
                        onClick={() => setShowLogin(true)}
                      >
                        تسجيل الدخول{" "}
                      </span>
                    </>
                  )}
                </p>
              )}{" "}
              {variant !== "donation" && (
                <PolicyTooltip
                  visible={tooltipVisible}
                  onVisibleChange={setTooltipVisible}
                  onScrollComplete={() => setIsvalid(true)}
                >
                  <Checkbox
                    style={{ marginTop: "3px", marginBottom: "8px" }}
                    className="ghaith--custom-checkbox"
                    onChange={(e) => {
                      setIsvalid(e.target.checked);
                    }}
                  >
                    <div className="ghaith--login-check-box">
                      <span>
                        بإتمام التبرع أنت توافق على <a>سياسة المساهمة</a>
                      </span>
                    </div>
                  </Checkbox>
                </PolicyTooltip>
              )}
              <Button
                type="primary"
                block
                className="ghaith--login-button ghaith--donate-button"
                disabled={
                  !total ||
                  isNaN(total) ||
                  total === 0 ||
                  (variant !== "donation" && !valid) ||
                  total < 5
                }
                onClick={() => {
                  if (
                    (!isConnected && program?.is_ritual_adahi) ||
                    (!isConnected && umrah)
                  ) {
                    setShowLogin(true);
                  } else {
                    validateDonation();
                  }
                }}
              >
                ساهم الآن
              </Button>
            </div>
          </div>
        )}
      </div>
      <MoyasarForm
        moyassarType={
          variant === "donation" || umrah || (variant === "payment" && isKorba)
            ? "general"
            : "by_state"
        }
        moyassarState={
          variant === "donation" || umrah || (variant === "payment" && isKorba)
            ? null
            : program.state_id && program.state_id[0]
        }
        amount={total}
        description="ghaith"
        open={displayMoyasar}
        handleClose={() => {
          setDisplayMoyasar(false);
          dispatch(setProgramId(false));
          dispatch(setShareId(false));
          dispatch(setShareQuantity(false));
          dispatch(setUmrahId(false));
          dispatch(setUmrahLines([]));
        }}
      />
      <Login
        open={showLogin}
        handleClose={() => setShowLogin(false)}
        login_type="exterior_donor"
      />
      <ModalComponent
        title=""
        open={showRecordingModal}
        onClose={handleCancelRecording}
        centered
        className="gh--font-light"
        modalStyle={{ top: -100 }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎤</div>
          <h3 style={{ direction: "rtl" }}>
            جاري التسجيل للمعتمر {recordingForIndex + 1}...
          </h3>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", margin: "20px 0" }}
          >
            {formattedTime}
          </div>
          <p style={{ color: "#666" }}>اضغط "إيقاف التسجيل" عند الانتهاء</p>
          <div style={{ marginTop: "20px" }}>
            <Button
              key="stop"
              type="primary"
              onClick={handleStopRecording}
              danger
              style={{ marginRight: "10px" }}
              className="gh--font-light"
            >
              إيقاف التسجيل
            </Button>
          </div>
        </div>
      </ModalComponent>
      <BankTransferModal
        isModalVisible={isBankTransferVisible}
        setIsModalVisible={() => {
          setIsBankTransferVisible(false);
          if (variant === "payment") {
            dispatch(setProgramId(false));
            dispatch(setShareId(false));
            dispatch(setShareQuantity(false));
          }
        }}
        view={variant}
      />
    </div>
  );
};

export default DonateCard;
