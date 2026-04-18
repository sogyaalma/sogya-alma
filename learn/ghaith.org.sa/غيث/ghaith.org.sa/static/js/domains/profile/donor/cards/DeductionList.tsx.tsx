import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Stack } from "@mui/material";
import PaginatedTable from "../../../../components/tables/PaginatedTable";
import YearMonthFilter from "../../../../components/YearMonth/YearMonthFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { formatDate, getDateRange } from "../../../../apis/utils/utils";
import { getDeductions } from "../../../../apis/actions/donor.actions";
import TagComponent from "../../../../bibilio/tags/TagComponent";
import { Col, Row } from "antd";
import ButtonRequest from "../../../../bibilio/Buttons/RequestButton";
import DeductionRequest from "./DeductionRequest";
import DeductionDetailsModal from "./DeductionDetailsModal";

interface DonationProps {
  limit?: number;
}
const DeductionList: React.FC<DonationProps> = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedDeduction, setSelectedDeduction] = useState<any>(null);

  const [state, setState] = useState({
    year: "",
    month: "",
  });
  const { data: deductions, loading } = useSelector(
    (state: RootState) => state?.donor.donorDeductions
  );
  const { TotaldonorDeductions } = useSelector(
    (state: RootState) => state?.donor
  );
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (record: any) => {
    setSelectedDeduction(record);
    setIsDetailsModalVisible(true);
  };

  useEffect(() => {
    const { date_from, date_to } = getDateRange(state.year, state.month);

    dispatch(
      getDeductions({ limit: limit, page: currentPage, date_from, date_to })
    );
  }, [dispatch, currentPage, state, limit]);

  const columns = [
    {
      title: "الرقم",
      dataIndex: "name",
      render: (value: any) => (
        <Stack direction="row" spacing={1} alignItems="center" gap={2}>
          <Typography
            fontSize={18}
            sx={{ color: "#07a887", fontWeight: 600 }}
            className="gh--font-light"
          >
            {value}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "التاريخ من",
      dataIndex: "date_from",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 18, fontWeight: 600 }}
          className="gh--font-light"
        >
          {formatDate(value)}
        </Typography>
      ),
    },
    {
      title: "التاريخ إلى",
      dataIndex: "date_to",
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
      title: "الحالة",
      dataIndex: "stage_id",
      render: (value: string, row: any) => {
        return (
          <TagComponent
            className="ghaith--tag-component"
            width="100%"
            state={row?.state}
            orangeValue="in_progress"
            greenValue="done"
            redValue="cancel"
            fontSize="15px"
            text={value}
          />
        );
      },
    },
  ];

  return (
    <>
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
            mb: 1.5,
          }}
        >
          <Typography variant="h5" className="gh--font-bold" color="#1c4446">
            قائمة الإستقطاعات{" "}
          </Typography>
          <YearMonthFilter
            state={state}
            setState={(values) => setState(values)}
          />{" "}
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
                title="طلب إستقطاع"
                onClick={() => setIsModalVisible(true)}
                className="ghaith--deduction-request-button"
              />
            </Col>
          </Row>
        </Box>
        {/* Reusable Table */}
        <PaginatedTable
          columns={columns}
          data={deductions}
          totalPages={TotaldonorDeductions}
          rowsPerPage={limit}
          loading={loading}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          onRowClick={handleRowClick}
        />
      </Card>
      <DeductionRequest
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <DeductionDetailsModal
        isModalVisible={isDetailsModalVisible}
        setIsModalVisible={setIsDetailsModalVisible}
        deduction={selectedDeduction}
      />
    </>
  );
};

export default DeductionList;