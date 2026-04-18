import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Avatar, Stack, Button } from "@mui/material";
import PaginatedTable from "../../../../components/tables/PaginatedTable";
import YearMonthFilter from "../../../../components/YearMonth/YearMonthFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import {
  formatDate,
  getDateRange,
  toFormatAmount,
} from "../../../../apis/utils/utils";
import { getDonationList } from "../../../../apis/actions/donor.actions";
import donationIcon from "../../../../assets/icons/profile/donation.png";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

interface DonationProps {
  limit?: number;
}

const DonationList: React.FC<DonationProps> = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [state, setState] = useState({
    year: "",
    month: "",
  });

  const { data: donorDonations, loading } = useSelector(
    (state: RootState) => state?.donor.donorDonations
  );
  const { TotaldonorDonations } = useSelector(
    (state: RootState) => state?.donor
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedRows([]); // Clear selection when changing pages
  };
  useEffect(() => {
    setSelectedRows([]);
  }, [state.year, state.month]);

  const handleRowSelection = (
    selectedRowKeys: any[],
    selectedRowData: any[]
  ) => {
    setSelectedRows(selectedRowData);
  };

  const exportToExcel = () => {
    if (selectedRows.length === 0) {
      alert("الرجاء تحديد صفوف للتصدير");
      return;
    }

    const exportData = selectedRows.map((row) => ({
      المشروع: row.name,
      "نوع المساهمة": row.category,
      التاريخ: formatDate(row.date),
      المبلغ: row.amount ? toFormatAmount(row.amount) : "-",
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set RTL direction for the worksheet
    if (!worksheet["!views"]) worksheet["!views"] = [{}];
    worksheet["!views"][0] = { rtl: true };

    // Auto-size columns for better readability
    if (exportData.length > 0) {
      const columnWidths = Object.keys(exportData[0]).map((key) => ({
        wch:
          Math.max(
            key.length,
            ...exportData.map((row) => String((row as any)[key] || "").length)
          ) + 2,
      }));
      worksheet["!cols"] = columnWidths;
    }

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();

    // Set workbook properties for RTL
    workbook.Workbook = {
      Views: [{ RTL: true }],
    };

    XLSX.utils.book_append_sheet(workbook, worksheet, "التبرعات");

    const fileName = `قائمة_التبرعات_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  useEffect(() => {
    const { date_from, date_to } = getDateRange(state.year, state.month);

    dispatch(
      getDonationList({ limit: limit, page: currentPage, date_from, date_to })
    );
  }, [dispatch, currentPage, state, limit]);

  const columns = [
    {
      title: "المشروع",
      dataIndex: "name",
      render: (_: any, row: any) => (
        <Stack direction="row" spacing={1} alignItems="center" gap={2}>
          <Avatar
            src={row.icon[0] || donationIcon}
            alt={row.name}
            sx={{ width: 40, height: 40, backgroundColor: "white" }}
            className="ghaith--progress-icon"
          />
          <Typography
            fontSize={18}
            sx={{ color: "#07a887", fontWeight: 600 }}
            className="gh--font-light"
          >
            {row.name}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "نوع المساهمة",
      dataIndex: "category",
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
      title: "المبلغ",
      dataIndex: "amount",
      render: (value: string) => (
        <Typography
          fontSize={15}
          fontWeight={600}
          sx={{ color: "#07a887" }}
          className="icon-saudi_riyal gh--font-light"
        >
          {toFormatAmount(value)}
        </Typography>
      ),
    },
    {
      title: "",
      dataIndex: "program_id",
      render: (id: number, row: any) =>
        id && (
          <Button
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
              if (row.access_token) {
                navigate(`/program/${id}`);
              }
            }}
          >
            تبرّع مجدداً
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
          mb: 2,
        }}
      >
        <Typography variant="h5" className="gh--font-bold" color="#1c4446">
          قائمة التبرعات
        </Typography>
        <YearMonthFilter
          state={state}
          setState={(values) => setState(values)}
        />
      </Box>

      {/* Export Button */}
      {selectedRows.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={exportToExcel}
            sx={{
              bgcolor: "#07a887",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: "6px",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#069073",
              },
            }}
            className="gh--font-light"
          >
            تحميل ({selectedRows.length})
          </Button>
        </Box>
      )}

      {/* Reusable Table */}
      <PaginatedTable
        columns={columns}
        data={donorDonations?.map((row: any, index: number) => ({
          ...row,
          _uniqueKey: `donation-${currentPage}-${index}`,
        }))}
        totalPages={TotaldonorDonations}
        rowsPerPage={limit}
        loading={loading}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowSelection={{
          selectedRowKeys: selectedRows.map((row) => row._uniqueKey),
          onChange: handleRowSelection,
        }}
      />
    </Card>
  );
};

export default DonationList;
