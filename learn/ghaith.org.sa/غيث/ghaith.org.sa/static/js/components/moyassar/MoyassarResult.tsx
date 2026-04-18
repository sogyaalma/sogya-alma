import { Button, Col, Divider, Row } from "antd";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { SmileOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import moment from "moment";
import { useCookies } from "react-cookie";
import errorDonation from "../../assets/animations/error.json";
import messageDonation from "../../assets/animations/Checked.json";
import { baseUrlApi } from "../../proxy";
import Loader from "../../bibilio/loader/Loader";
import TransparentButton from "../../bibilio/Buttons/TransparentButton";
import { toAddDonation } from "../../apis/actions/moyassar.actions";

const MoyasarResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [isLoading, setLoading] = useState(true);
  const [result, setResultat] = useState<any>(null);

  ////// params data ///////////
  const [searchParams] = useSearchParams();
  const donationTypeName = searchParams.get("donation_type_name");
  const statusPayment = searchParams.get("status");
  const AmountPaid = searchParams.get("amountPaid");

  const decodedDonationTypeName = donationTypeName
    ? decodeURIComponent(donationTypeName)
    : null;
  const id = queryParams.get("id");
  /////////// /////////// ///////////

  const [state, setState] = useState({
    message: "",
    type: "error",
    donation_id: -1,
  });

  const hasFetchedRef = useRef(false);

  const [cookies] = useCookies(["apiKey", "role"]);
  const user = cookies?.apiKey;

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
      const json: any = {
        id: id,
        status: statusPayment,
      };

      await addDonation(json);
    } catch (error) {
      if (statusPayment === "paid") {
        const fallbackData = [
          {
            title: "مبلغ المساهمة :",
            value: `${AmountPaid} ريال`,
          },

          { title: "رقم المرجع :", value: id },
          {
            title: " نوع المساهمة  :",
            value: decodedDonationTypeName || "تبرع",
          },
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
      } else {
        setState({
          message: "",
          type: "error",
          donation_id: -1,
        });
      }
      setLoading(false);
    }
  };

  const toFormatData = (data: any) => {
    const dateTime = data.created_at ? moment(data.created_at) : moment();

    const formattedData = [
      {
        title: "مبلغ المساهمة :",
        value: `${AmountPaid} ريال`,
      },
      {
        title: "رقم المرجع :",
        value: data.result?.reference_number || id,
      },
      { title: "طريقة الدفع :", value: data.result?.payment_type },
      {
        title: " تاريخ :",
        value: dateTime.locale("en").format("YYYY/MM/DD"),
      },
      {
        title: " وقت :",
        value: dateTime.locale("en").format("HH:mm"),
      },
      { title: " نوع المساهمة  :", value: decodedDonationTypeName },
    ];
    setResultat(formattedData);
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
    const backendReady = await waitUntilBackendIsUp();
    if (!backendReady) {
      if (statusPayment === "paid") {
        const fallbackData = [
          {
            title: "مبلغ المساهمة :",
            value: `${AmountPaid} ريال`,
          },
          { title: "رقم المرجع :", value: id },
          {
            title: " نوع المساهمة  :",
            value: decodedDonationTypeName || "تبرع",
          },
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
    if (res?.result?.code === 409 && statusPayment === "paid") {
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
      setState({
        message: res.result.message,
        type: "success",
        donation_id: res.result.donation_id,
      });
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#F2F4F4", minHeight: "100vh" }}>
        <div className="ghaith--moyasar-result-content">
          {state.type === "success" ? (
            <>
              <p className="ghaith--moyasar-message-title">تم التبرع بنجاح</p>
              <Lottie
                className="ghaith--moyasar-image-container"
                animationData={messageDonation}
                loop={true}
              />
              <span className="ghaith--moyasar-message-span">
                تمت مساهمتك بنجاح
              </span>
              <p className="ghaith--moyasar-message-paragraph">
                شكرا جزيلا لتبرعك.. جهدك سيحدث تطويرا ايجابياً في حياة
                المستفيدين
              </p>
              <>
                <Row
                  justify={"center"}
                  style={{ width: "100%", marginTop: "2rem" }}
                >
                  <Col xxl={4} xl={4} md={2} lg={2} sm={1} xs={1} />
                  <Col xxl={8} xl={8} lg={13} md={13} sm={20} xs={20}>
                    <div style={{ borderRadius: "40px" }}>
                      <div className="ghaith--card-moyasser-header">
                        <span>تفاصيل الفاتورة </span>
                      </div>
                      <div className="ghaith--card-moyasser-body">
                        {result?.map((el: any, index: number) => (
                          <>
                            <Row className="ghaith--card-moyasser-body-item">
                              <Col span={16}>
                                <p
                                  className={
                                    index === 0
                                      ? "ghaith--card-moyasser-body-item-title"
                                      : "ghaith--card-moyasser-body-item-title ghaith--text-color"
                                  }
                                >
                                  {el.title}
                                </p>
                              </Col>
                              <Col span={8}>
                                <span
                                  className={`ghaith--card-moyasser-body-item-value ${
                                    el?.value?.includes("ريال")
                                      ? "icon-saudi_riyal"
                                      : ""
                                  }`}
                                >
                                  {el?.value?.replace("ريال", "").trim()}
                                </span>
                              </Col>
                            </Row>
                            {index === 0 && (
                              <Row>
                                <Col span={21}>
                                  <Divider
                                    variant="dashed"
                                    dashed
                                    className="ghaith--card-moyasser-divider"
                                  />
                                </Col>
                              </Row>
                            )}
                          </>
                        ))}
                        {state.donation_id !== -1 && (
                          <Row>
                            <Col span={24}>
                              <Button
                                className={
                                  "ghaith--grey-button ghaith--grey-button-active"
                                }
                                title="تقييم الخدمة"
                                style={{ marginTop: "1rem", width: "100%" }}
                                icon={<SmileOutlined color="#ccc" />}
                              >
                                تقييم الخدمة
                              </Button>
                            </Col>
                          </Row>
                        )}
                        <Divider className="ghaith--moyasar-divider-btn" />

                        <Row>
                          <Col span={24}>
                            <TransparentButton
                              style={{
                                marginBottom: "0.5rem",
                                width: "100%",
                              }}
                              title="الرجوع للرئيسية"
                              onClick={() => navigate("/")}
                              className="ghaith--donation-back-button"
                            />
                          </Col>
                        </Row>

                        {user && (
                          <Row>
                            <Col span={24}>
                              <TransparentButton
                                style={{
                                  marginTop: "0.5rem",
                                  marginBottom: "1rem",
                                  width: "100%",
                                }}
                                title="الرجوع إلى صفحتي"
                                onClick={() => navigate("/profile")}
                              />
                            </Col>
                          </Row>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} xl={4} md={2} lg={2} sm={1} xs={1} />
                </Row>
              </>
            </>
          ) : (
            <Row
              justify={"center"}
              style={{ width: "100%", marginTop: "5rem" }}
            >
              <Col xxl={6} xl={6} md={4} lg={4} sm={3} xs={3} />
              <Col xxl={6} xl={6} lg={11} md={11} sm={18} xs={18}>
                <div style={{ textAlign: "center" }}>
                  <p className="ghaith--moyasar-message-title">وقع خطأ </p>

                  <Lottie
                    className="ghaith--moyasar-image-container"
                    animationData={errorDonation}
                    loop={true}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  />
                  <p
                    className="ghaith--moyasar-message-title"
                    style={{ color: "#D44E3F" }}
                  >
                    وقع خطأ في عملية الدفع
                  </p>
                  <p className="ghaith--moyasar-message-paragraph">
                    نرجو التواصل مع البنك التابع للبطاقة و الاستفسار عن عملية
                    التبرع المرفوضة
                  </p>
                  <Row>
                    <Col span={24}>
                      <TransparentButton
                        style={{
                          marginTop: "2rem",
                          marginBottom: "0.5rem",
                          width: "100%",
                        }}
                        title="الرجوع للرئيسية"
                        onClick={() => navigate("/")}
                      />
                    </Col>
                  </Row>

                  {user && (
                    <Row>
                      <Col span={24}>
                        <TransparentButton
                          style={{
                            marginTop: "0.5rem",
                            marginBottom: "1rem",
                            width: "100%",
                          }}
                          title="الرجوع إلى صفحتي"
                          onClick={() => navigate("/profile")}
                        />
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
              <Col xxl={6} xl={6} md={4} lg={4} sm={3} xs={3} />
            </Row>
          )}
        </div>
      </div>
    </>
  );
};

export default MoyasarResult;
