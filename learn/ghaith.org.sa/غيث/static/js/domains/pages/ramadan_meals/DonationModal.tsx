import { Form, Row, Col, Button, Checkbox, ConfigProvider } from "antd";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import { useState, useEffect } from "react";
import {
  formatRamadanNumber,
  showNotification,
} from "../../../apis/utils/utils";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import InputDate from "../../../bibilio/Inputs/InputDate";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import {
  getAvailableDays,
  getRamadanDayInformations,
} from "../../../apis/actions/ramadan.actions";
import ar_EG from "antd/lib/locale/ar_EG";
import { setRamadanLines } from "../../../apis/slices/moyassarSlice";
interface Props {
  isModalVisible: boolean;
  date?: any;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DonationModal = ({ isModalVisible, setIsModalVisible, date }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const dayInformations = useSelector(
    (state: RootState) => state?.ramadan?.dayInformations,
  );
  const availableDays = useSelector(
    (state: RootState) => state?.ramadan?.AvailableDays,
  );

  const existingRamadanLines = useSelector(
    (state: RootState) => state?.moyassar?.ramadan_lines,
  );

  const loading = useSelector((state: RootState) => state?.ramadan?.loadingDay);

  const [form] = Form.useForm();
  const [loadingSend, setLoadingSend] = useState(false);
  const [calculationMethod, setCalculationMethod] = useState<
    "meals" | "amount" | null
  >("meals");
  const [totalDonation, setTotalDonation] = useState<number>(0);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
  const [donationDate, setDonationDate] = useState<Dayjs | null>(null);
  const ACHIEVED = dayInformations?.reached; // المحقق
  const TARGET = dayInformations?.meal_number; // المستهدف
  const MEAL_PRICE = dayInformations?.meal_price; // Price per meal in Riyals
  const meals = totalDonation / MEAL_PRICE;
  const formattedMeals = Number.isInteger(meals) ? meals : meals.toFixed(2);
  // Calculate remaining amount needed to reach target
  useEffect(() => {
    const remaining = (TARGET - ACHIEVED) * MEAL_PRICE;
    setRemainingAmount(remaining > 0 ? remaining : 0);
  }, [TARGET, ACHIEVED]);

  // Initialize form values

  useEffect(() => {
    if (isModalVisible) {
      const initialDate = date ? dayjs(date) : null;
      setDonationDate(initialDate);

      form.setFieldsValue({
        numberOfMeals: true,
        donationAmount: false,
        mealAmount: undefined,
        donation_date: initialDate,
      });
      setCalculationMethod("meals");
      setTotalDonation(0);

      if (initialDate) {
        dispatch(
          getRamadanDayInformations({ date: initialDate.format("YYYY-MM-DD") }),
        );
      }
    }
  }, [isModalVisible, form, date]);

  useEffect(() => {
    if (isModalVisible) {
      dispatch(
        getRamadanDayInformations({ date: dayjs(date).format("YYYY-MM-DD") }),
      );
      dispatch(getAvailableDays());
    }
  }, [isModalVisible, date]);
  // Handle date change
  const handleDateChange = (date: Dayjs | null) => {
    setDonationDate(date);

    // If date is selected, dispatch to get day informations
    if (date) {
      dispatch(getRamadanDayInformations({ date: date.format("YYYY-MM-DD") }));

      // Reset form values when date changes
      form.setFieldsValue({
        mealAmount: undefined,
      });
      setTotalDonation(0);
    }
  };

  const handleCheckboxChange = (method: "meals" | "amount") => {
    setCalculationMethod(method);
    form.setFieldsValue({
      numberOfMeals: method === "meals",
      donationAmount: method === "amount",
      mealAmount: undefined,
    });
    setTotalDonation(0);
  };

  const disabledDate = (current: Dayjs) => {
    if (!current) {
      return false;
    }

    // Format current date to YYYY-MM-DD
    const currentDateStr = dayjs(current).format("YYYY-MM-DD");

    // Check if date exists in existing ramadan lines
    const isInExistingLines = existingRamadanLines?.some(
      (line: any) => line.date === currentDateStr,
    );

    // If date is in existing lines, disable it
    if (isInExistingLines) {
      return true;
    }

    // Check if date exists in availableDays
    if (!availableDays || availableDays.length === 0) {
      return false;
    }

    const isAvailable = availableDays.some(
      (day: any) => day.date === currentDateStr,
    );

    // Disable date if it's NOT available
    return !isAvailable;
  };

  const calculateDonation = (value: number) => {
    if (!value || value <= 0) {
      setTotalDonation(0);
      return;
    }

    if (calculationMethod === "meals") {
      // Calculate based on meals
      const calculatedAmount = value * MEAL_PRICE;

      if (calculatedAmount > remainingAmount) {
        const maxMeals = Math.floor(remainingAmount / MEAL_PRICE);
        const adjustedAmount = maxMeals * MEAL_PRICE;

        form.setFieldsValue({
          mealAmount: maxMeals,
        });
        setTotalDonation(adjustedAmount);

        showNotification(
          `تم تعديل عدد الوجبات إلى ${maxMeals} وجبة (الحد الأقصى المتبقي)`,
          "info",
        );
      } else {
        setTotalDonation(calculatedAmount);
      }
    } else {
      // Calculate based on amount
      if (value > remainingAmount) {
        form.setFieldsValue({
          mealAmount: remainingAmount,
        });
        setTotalDonation(remainingAmount);

        showNotification(
          `تم تعديل المبلغ إلى ${formatRamadanNumber(remainingAmount)} ريال (الحد الأقصى المتبقي)`,
          "info",
        );
      } else {
        setTotalDonation(value);
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    calculateDonation(value);
  };

  const validateDonation = async () => {
    try {
      await form.validateFields();

      // Check if donation amount is valid
      const mealAmount = form.getFieldValue("mealAmount");
      if (!mealAmount || mealAmount <= 0) {
        showNotification(
          calculationMethod === "meals"
            ? "يرجى إدخال عدد الوجبات"
            : "يرجى إدخال المبلغ",
          "error",
        );
        return;
      }

      if (totalDonation <= 0) {
        showNotification("المبلغ المدخل غير صالح", "error");
        return;
      }

      setLoadingSend(true);

      const donationDate = form.getFieldValue("donation_date");

      if (!donationDate) {
        showNotification("يرجى اختيار تاريخ التبرع", "error");
        setLoadingSend(false);
        return;
      }

      const formattedDate = donationDate;

      const dateExists = existingRamadanLines?.some(
        (line: any) => line.date === formattedDate,
      );

      if (dateExists) {
        showNotification("هذا التاريخ تم اختياره بالفعل", "error");
        setLoadingSend(false);
        return;
      }

      const mealsNumber =
        calculationMethod === "meals" ? mealAmount : formattedMeals;

      const newDonationLine = {
        date: formattedDate.format("YYYY-MM-DD"),
        quantity: Number(mealsNumber),
        amount: totalDonation,
      };

      const updatedRamadanLines = [...existingRamadanLines, newDonationLine];

      dispatch(setRamadanLines(updatedRamadanLines));

      setTimeout(() => {
        showNotification(
          "تم إضافة التاريخ بنجاح ، الرجاء متابعة تبرعك ",
          "success",
        );
        form.resetFields();
        setIsModalVisible(false);
        setLoadingSend(false);
        setTotalDonation(0);
      }, 500);
    } catch (error) {
      setLoadingSend(false);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
    form.setFieldsValue({
      numberOfMeals: true,
      donationAmount: false,
      mealAmount: undefined,
    });
    setTotalDonation(0);
  };

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={handleClose}
      closeOnOutsideClick={true}
      width={550}
      centered={true}
      modalStyle={{ top: -200 }}
      className="ghaith--donation-modal"
    >
      <div
        style={{
          padding: " 2px 12px",
          direction: "rtl",
          borderRadius: "12px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "start", marginBottom: "25px" }}>
          <h2
            style={{
              color: "#009767",
              fontSize: "17px",
              fontWeight: "600",
              marginBottom: "0",
            }}
            className="gh--font-light"
          >
            وجبات افطار صائمي الحرم - شهر رمضان
          </h2>
        </div>

        {/* Stats Cards */}
        <Row gutter={16} style={{ marginBottom: "25px" }}>
          <Col span={12}>
            <div className="ghaith--ramadan-donation-container">
              <div className="ghaith--ramadan-donation-wrapper">
                <div className="ghaith--ramadan-donation-target-text gh--font-light">
                  <span className="ghaith--ramadan-donation-target-label">
                    المستهدف :{" "}
                  </span>
                  <span className="ghaith--ramadan-donation-target-value gh--font-medium">
                    {formatRamadanNumber(TARGET)}
                  </span>
                </div>
                <div className="ghaith--ramadan-donation-meal-label gh--font-light">
                  وجبة
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="ghaith--ramadan-donation-container">
              <div className="ghaith--ramadan-donation-wrapper">
                <div className="ghaith--ramadan-donation-target-text gh--font-light">
                  <span className="ghaith--ramadan-donation-target-label">
                    المـــــحقق :{" "}
                  </span>
                  <span className="ghaith--ramadan-donation-target-value gh--font-medium">
                    {formatRamadanNumber(ACHIEVED)}
                  </span>
                </div>
                <div className="ghaith--ramadan-donation-meal-label gh--font-light">
                  وجبة
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Remaining Amount */}
        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <span
            style={{ fontSize: "14px", color: "#666" }}
            className="gh--font-light"
          >
            المتبقي للوصول إلى الهدف :{" "}
            <span
              style={{ fontWeight: "bold", color: "#009767" }}
              className="icon-saudi_riyal"
            >
              {formatRamadanNumber(remainingAmount)}
            </span>
          </span>{" "}
          <span
            style={{ fontSize: "14px", color: "#666" }}
            className="gh--font-light"
          >
            عدد الوجبات المتبقي :{" "}
            <span style={{ fontWeight: "bold", color: "#009767" }}>
              {formatRamadanNumber(TARGET - ACHIEVED)} وجبة
            </span>
          </span>
        </div>

        <ConfigProvider locale={ar_EG} direction="rtl">
          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={validateDonation}
            style={{ direction: "rtl" }}
          >
            <Row gutter={[16, 0]}>
              {/* Donation Date */}
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الرجاء إدخال تاريخ التبرع",
                    },
                  ]}
                  name="donation_date"
                  labelCol={{ className: "ghaith--label-style" }}
                  style={{ marginBottom: "14px" }}
                >
                  <InputDate
                    placeholder="حدد تاريخ التبرع"
                    className="ghaith--input-style"
                    disabledDate={disabledDate}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>

              {/* Calculation Method */}
              <Col span={24} style={{ marginTop: "2rem" }}>
                <div style={{ marginBottom: "16px", textAlign: "start" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      display: "block",
                      marginBottom: "12px",
                    }}
                    className="gh--font-light"
                  >
                    اختر طريقة احتساب التبرع
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "40px",
                    }}
                  >
                    <Form.Item
                      name="numberOfMeals"
                      valuePropName="checked"
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox
                        onChange={() => handleCheckboxChange("meals")}
                        checked={calculationMethod === "meals"}
                        style={{ fontSize: "15px" }}
                        className="ghaith--custom-checkbox gh--font-light"
                      >
                        بعدد الوجبات
                      </Checkbox>
                    </Form.Item>
                    <Form.Item
                      name="donationAmount"
                      valuePropName="checked"
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox
                        onChange={() => handleCheckboxChange("amount")}
                        checked={calculationMethod === "amount"}
                        style={{ fontSize: "15px" }}
                        className="ghaith--custom-checkbox gh--font-light"
                      >
                        بمبلغ التبرع
                      </Checkbox>
                    </Form.Item>
                  </div>
                </div>
              </Col>

              {/* Amount Input */}
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message:
                        calculationMethod === "meals"
                          ? "الرجاء إدخال عدد الوجبات"
                          : "الرجاء إدخال المبلغ",
                    },
                    {
                      validator: (_, value) => {
                        if (value && value <= 0) {
                          return Promise.reject(
                            calculationMethod === "meals"
                              ? "عدد الوجبات يجب أن يكون أكبر من صفر"
                              : "المبلغ يجب أن يكون أكبر من صفر",
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  name="mealAmount"
                  labelCol={{ className: "ghaith--label-style" }}
                  style={{ marginBottom: "14px" }}
                >
                  <CustomLabelInput
                    label={calculationMethod === "meals" ? "وجبة" : "المبلغ"}
                    type="number"
                    className="ghaith--donate-transparent-input gh--ramadan-input"
                    withCurrency={true}
                    withPrefix={calculationMethod === "meals"}
                    prefix={
                      calculationMethod === "meals" ? MEAL_PRICE : undefined
                    }
                    onChange={handleAmountChange}
                  />
                </Form.Item>
              </Col>

              {/* Total Donation Display */}
              {totalDonation > 0 && (
                <Col span={24}>
                  <div
                    style={{
                      marginBottom: "20px",
                      textAlign: "center",
                      padding: "12px",
                      backgroundColor: "#e6f7f0",
                      borderRadius: "8px",
                      border: "1px solid #b2ebd2",
                    }}
                  >
                    <span
                      style={{ fontSize: "16px", color: "#009767" }}
                      className="gh--font-light"
                    >
                      إجمالي التبرع :{" "}
                      <span
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                        className="icon-saudi_riyal"
                      >
                        {formatRamadanNumber(totalDonation)}
                      </span>
                    </span>
                    {calculationMethod === "amount" &&
                      totalDonation >= MEAL_PRICE && (
                        <div
                          style={{
                            marginTop: "5px",
                            fontSize: "14px",
                            color: "#666",
                          }}
                          className="gh--font-light"
                        >
                          ( ما يقارب {formattedMeals} وجبة)
                        </div>
                      )}
                    {calculationMethod === "meals" && (
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "14px",
                          color: "#666",
                        }}
                        className="gh--font-light"
                      >
                        (سعر الوجبة : {MEAL_PRICE} ريال ×{" "}
                        {form.getFieldValue("mealAmount")} وجبة)
                      </div>
                    )}
                  </div>
                </Col>
              )}

              {/* Submit Button */}
              <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingSend}
                  style={{
                    fontSize: "18px",
                    width: "180px",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                  className="ghaith--login-button ghaith--donate-button"
                  disabled={totalDonation === 0}
                >
                  المتــــــــابعة
                </Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </div>
    </ModalComponent>
  );
};

export default DonationModal;
