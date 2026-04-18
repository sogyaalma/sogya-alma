import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Avatar, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../apis/store";
import {
  CheckAvailableServices,
  getBeneficiaryPayments,
  getBeneficiaryProduts,
  getBeneficiaryRequests,
  getDisbursementList,
  getOtherServiceTypes,
} from "../../../../apis/actions/beneficiary.actions";
import PaginatedTable from "../../../../components/tables/PaginatedTable";
import YearMonthFilter from "../../../../components/YearMonth/YearMonthFilter";
import "dayjs/locale/ar";
import { getDateRange, toFormatAmount } from "../../../../apis/utils/utils";
import TagComponent from "../../../../bibilio/tags/TagComponent";
import { useTranslation } from "react-i18next";
import CustomLabelSelect from "../../../../components/select/CustomLabelSelect";
import { Col, Row } from "antd";
import ButtonRequest from "../../../../bibilio/Buttons/RequestButton";
import ServiceRequest from "../../donor/cards/ServiceRequest";
import * as XLSX from "xlsx";

interface ExchangeListProps {
  filterType?: string | null;
}

// Date formatting utility
const formatDate = (dateString: string): string => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const ExchangeList: React.FC<ExchangeListProps> = ({ filterType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [state, setState] = useState({
    year: "",
    month: "",
  });
  const [selectedFilter, setSelectedFilter] = React.useState<any>(null);

  const handleFilterChange = (value: any) => {
    if (value) {
      setSelectedFilter(value);
    } else {
      setSelectedFilter(null);
    }
  };

  const {
    otherServiceTypes,
    availableServices,
    TotalDisbursements,
    TotalPaymentsPages,
    TotalProductsPages,
    TotalRequestsPages,
  } = useSelector((state: RootState) => state?.beneficiary);

  const { data: disbursements, loading } = useSelector(
    (state: RootState) => state?.beneficiary.disbursements
  );
  const { data: productList, loadingProduct } = useSelector(
    (state: RootState) => state?.beneficiary.productsList
  );
  const { data: paymentList, loadingPayment } = useSelector(
    (state: RootState) => state?.beneficiary.paymentsList
  );
  const { data: requestsList, loadingRequests } = useSelector(
    (state: RootState) => state?.beneficiary.requestsList
  );

  useEffect(() => {
    dispatch(getOtherServiceTypes());
    dispatch(CheckAvailableServices());
  }, [dispatch]);

  useEffect(() => {
    setSelectedRows([]);
  }, [state.year, state.month, selectedFilter, filterType]);

  useEffect(() => {
    const { date_from, date_to } = getDateRange(state.year, state.month);

    if (filterType === "general") {
      dispatch(
        getDisbursementList({ limit: 6, page: currentPage, date_from, date_to })
      );
    } else if (filterType === "product") {
      dispatch(
        getBeneficiaryProduts({
          limit: 6,
          page: currentPage,
          date_from,
          date_to,
        })
      );
    } else if (filterType === "payment") {
      dispatch(
        getBeneficiaryPayments({
          limit: 6,
          page: currentPage,
          date_from,
          date_to,
        })
      );
    } else if (filterType === "requests") {
      dispatch(
        getBeneficiaryRequests({
          limit: 6,
          page: currentPage,
          date_from,
          date_to,
          service_id: selectedFilter,
        })
      );
    }
  }, [dispatch, currentPage, state, filterType, selectedFilter]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedRows([]); // Clear selection when changing pages
  };

  const handleRowSelection = (selectedRowKeys: any[], selectedRowData: any[]) => {
    setSelectedRows(selectedRowData);
  };

  const exportToExcel = () => {
    if (selectedRows.length === 0) {
      alert("الرجاء تحديد صفوف للتصدير");
      return;
    }

    let exportData: any[] = [];
    
    switch (filterType) {
      case "general":
        exportData = selectedRows.map((row) => ({
          "الخدمة": row.service,
          "نوع الصرف": row.disbursement_type === "product" ? "عيني" : "نقدي",
          "تاريخ التسليم": formatDate(row.date),
          "تفاصيل الصرف": row.disbursement_type === "product"
            ? (row.received ? "تم الإستلام" : "لم يتم الإستلام")
            : (row.is_paid ? "تم الصرف" : "لم يتم الصرف"),
          "قيمة الصرف": row.amount ? toFormatAmount(row.amount) : "-",
        }));
        break;

      case "product":
        exportData = selectedRows.map((row) => ({
          "الخدمة": row.service,
          "نوع الصرف": "عيني",
          "تاريخ التسليم": formatDate(row.date),
          "تفاصيل الصرف": row.is_paid ? "تم الصرف" : "لم يتم الصرف",
        }));
        break;

      case "payment":
        exportData = selectedRows.map((row) => ({
          "الخدمة": row.service,
          "نوع الصرف": "نقدي",
          "تاريخ التسليم": formatDate(row.date),
          "تفاصيل الصرف": row.received ? "تم الإستلام" : "لم يتم الإستلام",
          "قيمة الصرف": row.amount ? toFormatAmount(row.amount) : "-",
        }));
        break;

      case "requests":
        exportData = selectedRows.map((row) => ({
          "رقم الطلب": row.number,
          "الخدمة": row.department_type ? t(`department_type.${row.department_type}`) : "",
          "نوع الخدمة": row.other_service_id?.[1] || "",
          "التاريخ": formatDate(row.date),
          "الحالة": row.stage_id?.[1] || "",
        }));
        break;

      default:
        return;
    }

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Set RTL direction for the worksheet
    if (!worksheet['!views']) worksheet['!views'] = [{}];
    worksheet['!views'][0] = { rtl: true };
    
    // Auto-size columns for better readability
    if (exportData.length > 0) {
      const columnWidths = Object.keys(exportData[0]).map(key => ({
        wch: Math.max(
          key.length,
          ...exportData.map(row => String((row as any)[key] || '').length)
        ) + 2
      }));
      worksheet['!cols'] = columnWidths;
    }

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    
    // Set workbook properties for RTL
    workbook.Workbook = {
      Views: [{ RTL: true }]
    };
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "البيانات");

    const fileName = `${getTableConfig()?.title}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const columns = [
    {
      title: "الخدمة",
      dataIndex: "service",
      render: (_: any, row: any) => (
        <Stack direction="row" spacing={1} alignItems="center" gap={2}>
          <Avatar
            src={row?.icon[0]}
            alt={row.service}
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            fontSize={18}
            sx={{ color: "#07a887", fontWeight: 600 }}
            className="gh--font-light"
          >
            {row.service}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "نوع الصرف",
      dataIndex: "disbursement_type",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 18, fontWeight: 600 }}
          className="gh--font-light"
        >
          {value === "product" ? "عيني" : "نقدي"}
        </Typography>
      ),
    },
    {
      title: "تاريخ التسليم",
      dataIndex: "date",
      render: (value: string, row: any) => {
        const isReceived = row.status === "Received";
        const formattedDate = formatDate(value);
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isReceived ? "#07a887" : "#a8a9a9" }}
            className="gh--font-light"
          >
            {formattedDate}
          </Typography>
        );
      },
    },
    {
      title: "تفاصيل الصرف",
      dataIndex: "received",
      render: (value: string, row: any) => {
        let displayText = "";
        let isCompleted = false;

        if (row.disbursement_type === "product") {
          isCompleted = row.received || value;
          displayText = isCompleted ? "تم الإستلام" : "لم يتم الإستلام";
        } else if (row.disbursement_type === "payment") {
          isCompleted = row.is_paid;
          displayText = isCompleted ? "تم الصرف" : "لم يتم الصرف";
        }

        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isCompleted ? "#07a887" : "#a8a9a9" }}
            className="gh--font-light"
          >
            {displayText}
          </Typography>
        );
      },
    },
    {
      title: "قيمة الصرف",
      dataIndex: "amount",
      render: (value: string) => {
        const hasValue = value && value !== "-";
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: "#07a887" }}
            className={`gh--font-light ${hasValue ? "icon-saudi_riyal" : ""}`}
          >
            {hasValue ? toFormatAmount(value) : "-"}
          </Typography>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      render: (id: number) =>
        id === 1 && (
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
              color: "#333333",
              borderColor: "#3cbaa1",
              textWrap: "nowrap",
              "&:hover": {
                bgcolor: "#f7f6f6ff",
                borderColor: "#07a887",
              },
            }}
            className="gh--font-light"
          >
            طلب إستلام
          </Button>
        ),
    },
  ];

  const productsColumns = [
    {
      title: "الخدمة",
      dataIndex: "service",
      render: (_: any, row: any) => (
        <Stack direction="row" spacing={1} alignItems="center" gap={2}>
          <Avatar
            src={row?.icon[0]}
            alt={row.service}
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            fontSize={18}
            sx={{ color: "#07a887", fontWeight: 600 }}
            className="gh--font-light"
          >
            {row.service}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "نوع الصرف",
      dataIndex: "disbursement_type",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 18, fontWeight: 600 }}
          className="gh--font-light"
        >
          {"عيني"}
        </Typography>
      ),
    },
    {
      title: "تاريخ التسليم",
      dataIndex: "date",
      render: (value: string, row: any) => {
        const isReceived = row.status === "Received";
        const formattedDate = formatDate(value);
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isReceived ? "#07a887" : "#a8a9a9" }}
            className="gh--font-light"
          >
            {formattedDate}
          </Typography>
        );
      },
    },
    {
      title: "تفاصيل الصرف",
      dataIndex: "is_paid",
      render: (value: string, row: any) => {
        const isNotReceived = value;
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isNotReceived ? "#a8a9a9" : "#07a887" }}
            className="gh--font-light"
          >
            {value ? "تم الصرف" : "لم يتم الصرف"}
          </Typography>
        );
      },
    },
  ];

  const paymentsColumns = [
    {
      title: "الخدمة",
      dataIndex: "service",
      render: (_: any, row: any) => (
        <Stack direction="row" spacing={1} alignItems="center" gap={2}>
          <Avatar
            src={row?.icon[0]}
            alt={row.service}
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            fontSize={18}
            sx={{ color: "#07a887", fontWeight: 600 }}
            className="gh--font-light"
          >
            {row.service}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "نوع الصرف",
      dataIndex: "disbursement_type",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 18, fontWeight: 600 }}
          className="gh--font-light"
        >
          {"نقدي"}
        </Typography>
      ),
    },
    {
      title: "تاريخ التسليم",
      dataIndex: "date",
      render: (value: string, row: any) => {
        const isReceived = row.status === "Received";
        const formattedDate = formatDate(value);
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isReceived ? "#07a887" : "#a8a9a9" }}
            className="gh--font-light"
          >
            {formattedDate}
          </Typography>
        );
      },
    },
    {
      title: "تفاصيل الصرف",
      dataIndex: "received",
      render: (value: string, row: any) => {
        const isNotReceived = value;
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isNotReceived ? "#a8a9a9" : "#07a887" }}
            className="gh--font-light"
          >
            {value ? "تم الإستلام" : "لم يتم الإستلام"}
          </Typography>
        );
      },
    },
    {
      title: "قيمة الصرف",
      dataIndex: "amount",
      render: (value: string) => {
        const hasValue = value && value !== "-";
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: "#07a887" }}
            className={`gh--font-light ${hasValue ? "icon-saudi_riyal" : ""}`}
          >
            {hasValue ? toFormatAmount(value) : "-"}
          </Typography>
        );
      },
    },
  ];

  const RequestsColumn = [
    {
      title: "رقم الطلب",
      dataIndex: "number",
      render: (value: string) => (
        <Typography
          sx={{ color: "#07a887", fontSize: 16, fontWeight: 600 }}
          className="gh--font-light"
        >
          {value}
        </Typography>
      ),
    },
    {
      title: "الخدمة",
      dataIndex: "department_type",
      render: (value: string) => {
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: "#07a887" }}
            className={`gh--font-light`}
          >
            {value && t(`department_type.${value}`)}
          </Typography>
        );
      },
    },
    {
      title: "نوع الخدمة",
      dataIndex: "other_service_id",
      render: (value: string) => {
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: "#07a887" }}
            className={`gh--font-light`}
          >
            {value?.[1]}
          </Typography>
        );
      },
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      render: (value: string, row: any) => {
        const isReceived = row.status === "Received";
        const formattedDate = formatDate(value);
        return (
          <Typography
            fontSize={15}
            fontWeight={600}
            sx={{ color: isReceived ? "#07a887" : "#a8a9a9" }}
            className="gh--font-light"
          >
            {formattedDate}
          </Typography>
        );
      },
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
            text={value && value?.[1]}
          />
        );
      },
    },
  ];

  const getTableConfig = () => {
    switch (filterType) {
      case "general":
        return {
          title: "قائمة الصرف",
          columns: columns,
          data: disbursements,
          totalPages: TotalDisbursements,
          loading: loading,
          showFilter: true,
        };
      case "product":
        return {
          title: "قائمة الصرف العيني",
          columns: productsColumns,
          data: productList,
          totalPages: TotalProductsPages,
          loading: loadingProduct,
          showFilter: true,
        };
      case "payment":
        return {
          title: "قائمة الصرف المالي",
          columns: paymentsColumns,
          data: paymentList,
          totalPages: TotalPaymentsPages,
          loading: loadingPayment,
          showFilter: true,
        };
      case "requests":
        return {
          title: "قائمة الطلبات ",
          columns: RequestsColumn,
          data: requestsList,
          totalPages: TotalRequestsPages,
          loading: loadingRequests,
          showFilter: true,
        };
      default:
        return null;
    }
  };

  const tableConfig = getTableConfig();

  if (!tableConfig) {
    return null;
  }

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="h5" className="gh--font-bold" color="#1c4446">
          {tableConfig.title}
        </Typography>

        {tableConfig.showFilter && (
          <YearMonthFilter
            state={state}
            setState={(values) => setState(values)}
          />
        )}
      </Box>
      
      <Box sx={{ alignItems: "center", mb: 2.5 }}>
        <Row justify={"end"} dir="rtl" style={{ marginBottom: "1rem" }}>
          <Col style={{ marginLeft: "6px", minWidth: "200px" }}>
            {filterType === "requests" && (
              <CustomLabelSelect
                label=""
                placeholder="نوع الخدمة  : "
                onChange={handleFilterChange}
                value={selectedFilter}
                options={otherServiceTypes?.map((service: any) => ({
                  id: service.id || service.name,
                  name: service.name,
                }))}
              />
            )}
          </Col>
        </Row>
      </Box>

      <Box sx={{ alignItems: "center", mb: 2.5 }}>
        <Row justify={"space-between"} dir="rtl" style={{ marginBottom: "1rem" }}>
          <Col>
            {selectedRows.length > 0 && (
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
            )}
          </Col>
          <Col style={{ marginLeft: "6px" }}>
            {filterType === "requests" &&
              availableServices &&
              availableServices.length > 0 && (
                <ButtonRequest
                  style={{
                    marginBottom: "0.5rem",
                    width: "100%",
                  }}
                  title="طلب خدمة"
                  onClick={() => setIsModalVisible(true)}
                  className="ghaith--deduction-request-button"
                />
              )}
          </Col>
        </Row>
      </Box>

      <PaginatedTable
        columns={tableConfig.columns}
        data={tableConfig.data?.map((row: any, index: number) => ({
          ...row,
          _uniqueKey: `${filterType}-${currentPage}-${index}`,
        }))}
        totalPages={tableConfig.totalPages}
        rowsPerPage={6}
        loading={tableConfig.loading}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowSelection={{
          selectedRowKeys: selectedRows.map((row) => row._uniqueKey),
          onChange: handleRowSelection,
        }}
      />

      <ServiceRequest
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Card>
  );
};

export default ExchangeList;