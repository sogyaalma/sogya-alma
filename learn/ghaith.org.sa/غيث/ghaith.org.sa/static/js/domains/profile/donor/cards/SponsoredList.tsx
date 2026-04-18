import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Stack, Button } from "@mui/material";
import PaginatedTable from "../../../../components/tables/PaginatedTable";
import YearMonthFilter from "../../../../components/YearMonth/YearMonthFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import { formatDate, getDateRange } from "../../../../apis/utils/utils";
import { getSponsored } from "../../../../apis/actions/donor.actions";
import * as XLSX from "xlsx";

interface DonationProps {
  limit?: number;
}

const SponsoredList: React.FC<DonationProps> = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const [state, setState] = useState({
    year: "",
    month: "",
  });
  useEffect(() => {
    setSelectedRows([]);
  }, [state.year, state.month]);
  
  const { data: sponsored, loading } = useSelector(
    (state: RootState) => state?.donor.donorSponsored
  );
  const { TotaldonorSponsored } = useSelector(
    (state: RootState) => state?.donor
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedRows([]); // Clear selection when changing pages
  };

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
      المستفيد: row.partner_id?.[1] || "",
      "الحالة الإجتماعية": row.sponsorship_type_id?.[1] || "",
      "تاريخ بداية الكفالة": formatDate(row.sponsorship_start_date),
      "كفالة مدفوعة إلى": formatDate(row.sponsorship_paid_to),
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "الكفالات");

    const fileName = `قائمة_كفالاتي_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  useEffect(() => {
    const { date_from, date_to } = getDateRange(state.year, state.month);

    dispatch(
      getSponsored({ limit: limit, page: currentPage, date_from, date_to })
    );
  }, [dispatch, currentPage, state, limit]);

  const columns = [
    {
      title: "المستفيد",
      dataIndex: "partner_id",
      render: (value: any, row: any) => (
        <Stack direction="row" spacing={1} alignItems="center" gap={2}>
          <Typography
            fontSize={18}
            sx={{ color: "#07a887", fontWeight: 600 }}
            className="gh--font-light"
          >
            {value[1] && value[1]}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "الحالة الإجتماعية",
      dataIndex: "sponsorship_type_id",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 18, fontWeight: 600 }}
          className="gh--font-light"
        >
          {value[1] && value[1]}
        </Typography>
      ),
    },
    {
      title: "تاريخ بداية الكفالة",
      dataIndex: "sponsorship_start_date",
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
      title: "كفالة مدفوعة إلى",
      dataIndex: "sponsorship_paid_to",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 16, fontWeight: 600 }}
          className="gh--font-light"
        >
          {formatDate(value)}
        </Typography>
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
          قائمة كفالاتي
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
        data={sponsored?.map((row: any, index: number) => ({
          ...row,
          _uniqueKey: `sponsored-${currentPage}-${index}`,
        }))}
        totalPages={TotaldonorSponsored}
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

export default SponsoredList;
