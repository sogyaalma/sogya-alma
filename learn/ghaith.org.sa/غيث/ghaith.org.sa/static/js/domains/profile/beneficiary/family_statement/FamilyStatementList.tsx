import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import PaginatedTable from "../../../../components/tables/PaginatedTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { formatDate } from "../../../../apis/utils/utils";
import {
  getStatements,
  toPrintstatement,
} from "../../../../apis/actions/beneficiary.actions";
import { Col, Row } from "antd";
import ButtonRequest from "../../../../bibilio/Buttons/RequestButton";
import StatementRequestModal from "./FamilyStateRequestModal";

interface statementProps {
  limit?: number;
}
const StatementsPage: React.FC<statementProps> = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printingId, setPrintingId] = useState<any>(null);

  const { data: beneficiaryStatements, loading } = useSelector(
    (state: RootState) => state?.beneficiary.beneficiaryStatements
  );
  const { TotalbeneficiaryStatements } = useSelector(
    (state: RootState) => state?.beneficiary
  );
  const loadinPrint = useSelector(
    (state: RootState) => state?.beneficiary.loadingPrint
  );
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    dispatch(getStatements({ limit: limit, page: currentPage }));
  }, [dispatch, currentPage, limit]);

  const handlePrint = async (access_token: any) => {
    setPrintingId(access_token);
    try {
      await dispatch(toPrintstatement(access_token));
    } finally {
      setPrintingId(null);
    }
  };
  const columns = [
    {
      title: "رقم الطلب",
      dataIndex: "name",
      render: (_: any, row: any) => (
        <Typography
          fontSize={18}
          sx={{ color: "#07a887", fontWeight: 600 }}
          className="gh--font-light"
        >
          {row.name}
        </Typography>
      ),
    },
    {
      title: "المستفيد",
      dataIndex: "beneficiary",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 18, fontWeight: 600 }}
          className="gh--font-light"
        >
          {value}
        </Typography>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 16, fontWeight: 600 }}
          className="gh--font-light"
        >
          {formatDate(value)}
        </Typography>
      ),
    },
    {
      title: "",
      dataIndex: "access_token",
      render: (id: number) =>
        id && (
          <Button
            loading={printingId === id}
            disabled={loadinPrint}
            variant="outlined"
            dir="rtl"
            disableRipple
            sx={{
              borderRadius: "6px",
              px: 1.5,
              py: 0.2,
              height: 36,
              fontSize: 12,
              fontWeight: 800,
              color: "#40b18d",
              borderColor: "#8da1a2",
              textWrap: "nowrap",
              transition: "transform 0.3s ease",
              "&:hover": {
                bgcolor: "#f7f6f6ff",
                borderColor: "#07a887",
                transform: "scale(1.07)",
              },
            }}
            className="gh--font-light"
            onClick={() => {
              handlePrint(id);
            }}
          >
            إعادة طباعة المشهد
          </Button>
        ),
    },
  ];

  return (
    <Card
      dir="rtl"
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #eef1ee",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.08)",
        bgcolor: "#f3f9f9",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5.5,
        }}
      >
        <Typography variant="h5" className="gh--font-bold" color="#1c4446">
          طلبات المشاهد{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          mb: 5.5,
        }}
      >
        <Row justify={"end"} dir="rtl" style={{ marginBottom: "1rem" }}>
          <Col style={{ marginLeft: "6px" }}>
            <ButtonRequest
              style={{
                marginBottom: "0.5rem",
                width: "100%",
              }}
              title="طلب طباعة مشهد"
              onClick={() => setIsModalVisible(true)}
              className="ghaith--deduction-request-button"
            />
          </Col>
        </Row>
      </Box>
      {/* Reusable Table */}
      <PaginatedTable
        columns={columns}
        data={beneficiaryStatements}
        totalPages={TotalbeneficiaryStatements}
        rowsPerPage={limit}
        loading={loading}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <StatementRequestModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Card>
  );
};

export default StatementsPage;
