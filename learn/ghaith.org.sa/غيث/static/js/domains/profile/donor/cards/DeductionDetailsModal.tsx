import { Row, Col, Divider } from "antd";
import ModalComponent from "../../../../bibilio/Modal/ModalComponent";
import { formatDate } from "../../../../apis/utils/utils";
import TagComponent from "../../../../bibilio/tags/TagComponent";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  deduction: any;
}

const DeductionDetailsModal = ({
  isModalVisible,
  setIsModalVisible,
  deduction,
}: Props) => {
  if (!deduction) return null;

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      closeOnOutsideClick={true}
      width={700}
      centered={true}
      modalStyle={{ top: -250, paddingBottom: "1rem" }}
    >
      <div style={{ padding: "20px", direction: "rtl" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              color: "#009767",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
            className="gh--font-light"
          >
            تفاصيل طلب الإستقطاع
          </h2>
          <p
            style={{ color: "#666", fontSize: "15px" }}
            className="gh--font-light"
          >
            رقم الطلب: {deduction?.name}
          </p>
        </div>
        {/* Basic Information */}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col lg={12} md={12} sm={24} xs={24}>
            {" "}
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                اسم المتبرع
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#1c4446",
                  fontWeight: 600,
                  margin: 0,
                }}
                className="gh--font-light"
              >
                {deduction?.donor_id}
              </p>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {" "}
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                الحالة
              </p>
              <TagComponent
                className="ghaith--tag-component"
                width="150px"
                state={deduction?.state}
                orangeValue="in_progress"
                greenValue="done"
                redValue="cancel"
                fontSize="14px"
                text={deduction?.stage_id}
              />
            </div>
          </Col>
        </Row>
        {/* Date Information */}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col lg={12} md={12} sm={24} xs={24}>
            {" "}
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                التاريخ من
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#1c4446",
                  fontWeight: 600,
                  margin: 0,
                }}
                className="gh--font-light"
              >
                {formatDate(deduction?.date_from)}
              </p>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {" "}
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                التاريخ إلى
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#1c4446",
                  fontWeight: 600,
                  margin: 0,
                }}
                className="gh--font-light"
              >
                {formatDate(deduction?.date_to)}
              </p>
            </div>
          </Col>
        </Row>{" "}
        <Divider style={{ margin: "24px 0" }} />
        {/* Amount Information */}
        {/* Contact Information */}
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                آلية التواصل
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {deduction?.contact_method_ids?.map(
                  (method: string, index: number) => (
                    <span
                      key={index}
                      style={{
                        padding: "4px 12px",
                        color: "#009767",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      className="gh--font-light"
                    >
                      {method}
                    </span>
                  )
                )}
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                الوقت المناسب للاتصال
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {deduction?.contact_time_ids?.map(
                  (time: string, index: number) => (
                    <span
                      key={index}
                      style={{
                        padding: "4px 12px",
                        color: "#009767",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      className="gh--font-light"
                    >
                      {time}
                    </span>
                  )
                )}
              </div>
            </div>
          </Col>
        </Row>{" "}
        <Divider style={{ margin: "24px 0" }} />{" "}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div
              style={{
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                قيمة القسط
              </p>
              <p
                style={{
                  fontSize: "18px",
                  color: "#009767",
                  fontWeight: 700,
                  margin: 0,
                }}
                className="gh--font-light icon-saudi_riyal"
              >
                {deduction?.amount_total}
              </p>
            </div>
          </Col>
        </Row>
        {/* Installments Information */}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #dff3f1",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                الأقساط المدفوعة
              </p>
              <p
                style={{
                  fontSize: "20px",
                  color: "#10b981",
                  fontWeight: 700,
                  margin: 0,
                }}
                className="gh--font-light"
              >
                {deduction?.count_installments_paid}
              </p>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #fecaca",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                الأقساط الغير مدفوعة
              </p>
              <p
                style={{
                  fontSize: "20px",
                  color: "#ef4444",
                  fontWeight: 700,
                  margin: 0,
                }}
                className="gh--font-light"
              >
                {deduction?.count_installments_unpaid}
              </p>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #fef08a",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                إجمالي الأقساط
              </p>
              <p
                style={{
                  fontSize: "20px",
                  color: "#ca8a04",
                  fontWeight: 700,
                  margin: 0,
                }}
                className="gh--font-light"
              >
                {deduction?.count_installments_paid +
                  deduction?.count_installments_unpaid}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </ModalComponent>
  );
};

export default DeductionDetailsModal;
