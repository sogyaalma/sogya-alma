import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import Loader from "../../bibilio/loader/Loader";
import FooterSection from "../../components/sections/FooterSection";
import NavBar from "../commun/Navbar";
import FooterImage from "../../assets/images/ghaith-footer.png";
import { getZakatValues } from "../../apis/actions/beneficiary.actions";
import { Form } from "antd";
import CustomLabelSelect from "../../components/select/CustomLabelSelect";
import CustomLabelInput from "../../bibilio/Inputs/CustomLabelInput";
import moneyIcon from "../../assets/icons/money.svg";
import goldIcon from "../../assets/icons/gold-ingot.png";
import silverIcon from "../../assets/icons/gold-ingot.png";
import checkMark from "../../assets/icons/check-mark.png";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { toFormatAmount } from "../../apis/utils/utils";
import PageContainer from "../../components/container/PageContainer";

interface GoldEntry {
  id: string;
  weight: string;
  caliber: string | undefined;
}

const ZakatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { zakat, loading } = useSelector(
    (state: RootState) => state.beneficiary,
  );
  const [form] = Form.useForm();

  const [selectedTypes, setSelectedTypes] = useState({
    money: false,
    gold: false,
    silver: false,
  });

  const [goldEntries, setGoldEntries] = useState<GoldEntry[]>([
    { id: "gold_0", weight: "", caliber: undefined },
  ]);

  const [totalZakat, setTotalZakat] = useState(0);
  const [zakatDetails, setZakatDetails] = useState({
    money: 0,
    gold: 0,
    silver: 0,
  });

  useEffect(() => {
    dispatch(getZakatValues());
  }, [dispatch]);

  const moneyAmount = Form.useWatch("money_amount", form);
  const silverWeight = Form.useWatch("silver_weight", form);
  const formValues = Form.useWatch([], form);

  useEffect(() => {
    if (zakat) {
      calculateZakat();
    }
  }, [
    moneyAmount,
    silverWeight,
    selectedTypes,
    zakat,
    formValues,
    goldEntries,
  ]);

  const handleTypeToggle = (type: "money" | "gold" | "silver") => {
    const newValue = !selectedTypes[type];
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: newValue,
    }));

    // Reset values when unchecking
    if (!newValue) {
      if (type === "money") form.setFieldValue("money_amount", "");
      if (type === "gold") {
        goldEntries.forEach((entry) => {
          form.setFieldValue(`gold_weight_${entry.id}`, "");
          form.setFieldValue(`gold_caliber_${entry.id}`, undefined);
        });
        setGoldEntries([{ id: "gold_0", weight: "", caliber: undefined }]);
      }
      if (type === "silver") form.setFieldValue("silver_weight", "");
    }
  };

  const addGoldEntry = () => {
    const newId = `gold_${Date.now()}`;
    setGoldEntries([
      ...goldEntries,
      { id: newId, weight: "", caliber: undefined },
    ]);
  };

  const removeGoldEntry = (id: string) => {
    if (goldEntries.length > 1) {
      setGoldEntries(goldEntries.filter((entry) => entry.id !== id));
      form.setFieldValue(`gold_weight_${id}`, undefined);
      form.setFieldValue(`gold_caliber_${id}`, undefined);
    }
  };

  const calculateZakat = () => {
    if (!zakat) return;

    let details = { money: 0, gold: 0, silver: 0 };

    // Calculate money zakat
    if (selectedTypes.money && moneyAmount && zakat.money?.[0]) {
      const amount = parseFloat(moneyAmount);
      if (amount) {
        details.money = amount * zakat.money[0].percentage;
      }
    }

    // Calculate gold zakat for all entries
    if (selectedTypes.gold && zakat.gold) {
      let totalGoldZakat = 0;
      goldEntries.forEach((entry) => {
        const weight = form.getFieldValue(`gold_weight_${entry.id}`);
        const caliber = form.getFieldValue(`gold_caliber_${entry.id}`);

        if (weight && caliber) {
          const weightNum = parseFloat(weight);
          const selectedGold = zakat.gold.find(
            (g: any) => g.caliber === caliber,
          );
          if (selectedGold && weightNum) {
            const totalValue = weightNum * selectedGold.price;
            totalGoldZakat += totalValue * selectedGold.percentage;
          }
        }
      });
      details.gold = totalGoldZakat;
    }

    // Calculate silver zakat
    if (selectedTypes.silver && silverWeight && zakat.silver?.[0]) {
      const weight = parseFloat(silverWeight);
      const silverData = zakat.silver[0];
      const totalValue = weight * silverData.price;
      if (totalValue) {
        details.silver = totalValue * silverData.percentage;
      }
    }

    setZakatDetails(details);
    setTotalZakat(details.money + details.gold + details.silver);
  };

  const clearType = (type: "money" | "gold" | "silver") => {
    if (type === "money") form.setFieldValue("money_amount", "");
    if (type === "gold") {
      goldEntries.forEach((entry) => {
        form.setFieldValue(`gold_weight_${entry.id}`, "");
        form.setFieldValue(`gold_caliber_${entry.id}`, undefined);
      });
    }
    if (type === "silver") form.setFieldValue("silver_weight", "");
  };

  if (loading) return <Loader />;

  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - حاسبة الزكاة"
        description="حاسبة الزكاة "
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">حاسبة </span>
              <span className="ghaith--donation-primary">الزكاة</span>
            </h1>
          </div>

          <div className="ghaith--zakat-calculator-container">
            <div className="ghaith--zakat-calculator-grid">
              {/* Main Content Area */}
              <div className="ghaith--zakat-calculator-main">
                {/* Type Selection Cards */}
                <div className="ghaith--ghaith--zakat-type-cards">
                  {/* Money Card */}
                  <div
                    onClick={() => handleTypeToggle("money")}
                    className={`ghaith--zakat-type-card ${
                      selectedTypes.money
                        ? "ghaith--zakat-type-card-selected"
                        : ""
                    }`}
                  >
                    <div className="ghaith--zakat-type-card-content">
                      <div className="ghaith--zakat-type-label-wrapper">
                        <img
                          src={moneyIcon}
                          alt="money"
                          className="ghaith--zakat-type-icon"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <span className="ghaith--zakat-type-label">المال</span>
                      </div>
                      <div
                        className={`ghaith--zakat-checkbox ${
                          selectedTypes.money
                            ? "ghaith--zakat-checkbox-checked"
                            : ""
                        }`}
                      >
                        {selectedTypes.money && (
                          <img
                            src={checkMark}
                            alt="check"
                            className="ghaith--check-icon"
                            style={{ width: "14px", height: "14px" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gold Card */}
                  <div
                    onClick={() => handleTypeToggle("gold")}
                    className={`ghaith--zakat-type-card ${
                      selectedTypes.gold
                        ? "ghaith--zakat-type-card-selected"
                        : ""
                    }`}
                  >
                    <div className="ghaith--zakat-type-card-content">
                      <div className="ghaith--zakat-type-label-wrapper">
                        <img
                          src={goldIcon}
                          alt="gold"
                          className="ghaith--zakat-type-icon"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <span className="ghaith--zakat-type-label">الذهب</span>
                      </div>
                      <div
                        className={`ghaith--zakat-checkbox ${
                          selectedTypes.gold
                            ? "ghaith--zakat-checkbox-checked"
                            : ""
                        }`}
                      >
                        {selectedTypes.gold && (
                          <img
                            src={checkMark}
                            alt="check"
                            className="ghaith--check-icon"
                            style={{ width: "14px", height: "14px" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Silver Card */}
                  <div
                    onClick={() => handleTypeToggle("silver")}
                    className={`ghaith--zakat-type-card ${
                      selectedTypes.silver
                        ? "ghaith--zakat-type-card-selected"
                        : ""
                    }`}
                  >
                    <div className="ghaith--zakat-type-card-content">
                      <div className="ghaith--zakat-type-label-wrapper">
                        <img
                          src={silverIcon}
                          alt="silver"
                          className="ghaith--zakat-type-icon"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <span className="ghaith--zakat-type-label">الفضة</span>
                      </div>
                      <div
                        className={`ghaith--zakat-checkbox ${
                          selectedTypes.silver
                            ? "ghaith--zakat-checkbox-checked"
                            : ""
                        }`}
                      >
                        {selectedTypes.silver && (
                          <img
                            src={checkMark}
                            alt="check"
                            className="ghaith--check-icon"
                            style={{ width: "14px", height: "14px" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!selectedTypes.money &&
                  !selectedTypes.gold &&
                  !selectedTypes.silver && (
                    <div className="ghaith--zakat-empty-state">
                      <div className="ghaith--zakat-empty-icon">
                        <i className="fas fa-calculator"></i>
                      </div>
                      <p className="ghaith--zakat-empty-text">
                        الرجاء اختيار أنواع الزكاة المراد حسابها
                      </p>
                    </div>
                  )}

                <Form form={form} layout="vertical">
                  {/* Money Section */}
                  {selectedTypes.money && (
                    <div className="ghaith--zakat-section">
                      <div className="ghaith--zakat-section-header">
                        <div className="ghaith--zakat-section-title">
                          <img
                            src={moneyIcon}
                            alt="money"
                            className="ghaith--zakat-section-icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                          <span>المال</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearType("money");
                          }}
                          className="ghaith--zakat-clear-btn"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                      <div className="ghaith--zakat-section-content">
                        {zakat?.money?.[0] && (
                          <p
                            className="ghaith--zakat-info-text icon-saudi_riyal"
                            style={{ direction: "ltr", textAlign: "end" }}
                          >
                            النصاب المقدر للمال{" "}
                            {toFormatAmount(zakat.money[0].zakat_threshold)}
                          </p>
                        )}
                        <Form.Item
                          name="money_amount"
                          rules={[
                            {
                              required: selectedTypes.money,
                              message: "الرجاء إدخال المبلغ",
                            },
                          ]}
                          className="ghaith--label-inputs"
                        >
                          <CustomLabelInput
                            placeholder="أدخل المبلغ"
                            label="المبلغ"
                            type="number"
                            className="ghaith--donate-transparent-input"
                            withCurrency
                          />
                        </Form.Item>
                        {zakatDetails.money > 0 && (
                          <div className="ghaith--zakat-result">
                            <span> مبلغ الزكاة :</span>
                            <span className="ghaith--zakat-amount icon-saudi_riyal">
                              {toFormatAmount(zakatDetails.money)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Gold Section */}
                  {selectedTypes.gold && (
                    <div className="ghaith--zakat-section">
                      <div className="ghaith--zakat-section-header">
                        <div className="ghaith--zakat-section-title">
                          <img
                            src={goldIcon}
                            alt="gold"
                            className="ghaith--zakat-section-icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                          <span>الذهب</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearType("gold");
                          }}
                          className="ghaith--zakat-clear-btn"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                      <div className="ghaith--zakat-section-content">
                        {goldEntries.map((entry, index) => {
                          const currentCaliber = form.getFieldValue(
                            `gold_caliber_${entry.id}`,
                          );

                          return (
                            <div
                              key={entry.id}
                              style={{
                                marginBottom: "24px",
                                position: "relative",
                              }}
                            >
                              {index > 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <span style={{ fontWeight: "500" }}></span>
                                  <button
                                    type="button"
                                    onClick={() => removeGoldEntry(entry.id)}
                                    className="ghaith--zakat-clear-btn"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <DeleteOutlined />
                                  </button>
                                </div>
                              )}

                              {currentCaliber && zakat?.gold && (
                                <>
                                  <p className="ghaith--zakat-info-text">
                                    {(() => {
                                      const selected = zakat.gold.find(
                                        (g: any) =>
                                          g.caliber === currentCaliber,
                                      );
                                      if (selected) {
                                        const date = new Date(
                                          selected.price_date,
                                        );
                                        const formattedDate =
                                          date.toLocaleDateString("ar-TN");
                                        const formattedTime =
                                          date.toLocaleTimeString("ar-TN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          });
                                        return `آخر تحديث بتاريخ ${formattedDate} الساعة ${formattedTime}`;
                                      }
                                      return "";
                                    })()}
                                  </p>
                                  <p
                                    className="ghaith--zakat-info-text"
                                    style={{
                                      direction: "rtl",
                                      textAlign: "start",
                                      marginTop: "15px",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    {(() => {
                                      const selected = zakat.gold.find(
                                        (g: any) =>
                                          g.caliber === currentCaliber,
                                      );
                                      if (selected) {
                                        return (
                                          <>
                                            سعر الذهب {selected.caliber} للجرام{" "}
                                            <span className="icon-saudi_riyal"></span>
                                            {selected.price}
                                          </>
                                        );
                                      }
                                      return "";
                                    })()}
                                  </p>{" "}
                                  <p
                                    className="ghaith--zakat-info-text"
                                    style={{
                                      direction: "rtl",
                                      textAlign: "start",
                                      marginTop: "15px",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    {(() => {
                                      const selected = zakat.gold.find(
                                        (g: any) =>
                                          g.caliber === currentCaliber,
                                      );
                                      if (selected) {
                                        return (
                                          <>
                                            النصاب المقدر للذهب{" "}
                                            {selected.caliber} هو{" "}
                                            <span className="icon-saudi_riyal"></span>
                                            {selected.zakat_threshold}
                                          </>
                                        );
                                      }
                                      return "";
                                    })()}
                                  </p>
                                </>
                              )}

                              <Form.Item
                                name={`gold_weight_${entry.id}`}
                                rules={[
                                  {
                                    required: selectedTypes.gold,
                                    message: "الرجاء إدخال الوزن",
                                  },
                                ]}
                                className="ghaith--label-inputs"
                              >
                                <CustomLabelInput
                                  withPrefix
                                  prefix="جرام"
                                  placeholder="الوزن"
                                  label="وزن الذهب"
                                  type="number"
                                  className="ghaith--donate-transparent-input"
                                />
                              </Form.Item>
                              <Form.Item
                                name={`gold_caliber_${entry.id}`}
                                rules={[
                                  {
                                    required: selectedTypes.gold,
                                    message: "الرجاء اختيار العيار",
                                  },
                                ]}
                                className="ghaith--label-inputs"
                              >
                                <CustomLabelSelect
                                  WrapperclassName="ghaith--donate-select"
                                  className="ghaith--label-inputs"
                                  label="العيار"
                                  placeholder="اختر"
                                  options={
                                    zakat?.gold?.map((g: any) => ({
                                      id: g.caliber,
                                      name: g.caliber,
                                    })) || []
                                  }
                                />
                              </Form.Item>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          onClick={addGoldEntry}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "2px dashed #d9d9d9",
                            borderRadius: "8px",
                            background: "transparent",
                            color: "#009767",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginBottom: "16px",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#009767";
                            e.currentTarget.style.background = "#f0f8ff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#d9d9d9";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <PlusOutlined />
                          <span className="gh--font-light">إضافة عيار آخر</span>
                        </button>

                        {zakatDetails.gold > 0 && (
                          <div className="ghaith--zakat-result">
                            <span>مبلغ الزكاة :</span>
                            <span className="ghaith--zakat-amount icon-saudi_riyal">
                              {toFormatAmount(zakatDetails.gold)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Silver Section */}
                  {selectedTypes.silver && (
                    <div className="ghaith--zakat-section">
                      <div className="ghaith--zakat-section-header">
                        <div className="ghaith--zakat-section-title">
                          <img
                            src={silverIcon}
                            alt="silver"
                            className="ghaith--zakat-section-icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                          <span>الفضة</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearType("silver");
                          }}
                          className="ghaith--zakat-clear-btn"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                      <div className="ghaith--zakat-section-content">
                        {zakat?.silver?.[0] && (
                          <p className="ghaith--zakat-info-text">
                            {(() => {
                              const date = new Date(zakat.silver[0].price_date);
                              const formattedDate =
                                date.toLocaleDateString("ar-TN");
                              const formattedTime = date.toLocaleTimeString(
                                "ar-TN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              );
                              return `آخر تحديث بتاريخ ${formattedDate} الساعة ${formattedTime}`;
                            })()}
                          </p>
                        )}
                        {zakat?.silver?.[0] && (
                          <p className="ghaith--zakat-info-text">
                            سعر الفضة المقدر{" "}
                            <span className="icon-saudi_riyal"></span>
                            {zakat.silver[0].price}
                          </p>
                        )}
                        <Form.Item
                          name="silver_weight"
                          rules={[
                            {
                              required: selectedTypes.silver,
                              message: "الرجاء إدخال الوزن",
                            },
                          ]}
                          className="ghaith--label-inputs"
                        >
                          <CustomLabelInput
                            withPrefix
                            prefix="جرام"
                            placeholder="الوزن"
                            label="وزن الفضة"
                            type="number"
                            className="ghaith--donate-transparent-input"
                          />
                        </Form.Item>
                        {zakatDetails.silver > 0 && (
                          <div className="ghaith--zakat-result">
                            <span>مبلغ الزكاة :</span>
                            <span className="ghaith--zakat-amount icon-saudi_riyal">
                              {toFormatAmount(zakatDetails.silver)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Form>
              </div>

              {/* Sidebar - Total Summary */}
              <div className="ghaith--zakat-sidebar">
                <div className="ghaith--zakat-total-card">
                  <h3 className="ghaith--zakat-total-title">
                    إجمالي الزكاة المستحقة
                  </h3>
                  <div className="ghaith--zakat-total-amount icon-saudi_riyal">
                    {toFormatAmount(totalZakat)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default ZakatPage;
