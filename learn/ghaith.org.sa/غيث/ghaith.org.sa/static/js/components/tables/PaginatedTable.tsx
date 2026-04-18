import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Column {
  title: string;
  dataIndex: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any) => React.ReactNode;
}

interface RowSelection {
  selectedRowKeys: any[];
  onChange: (selectedRowKeys: any[], selectedRows: any[]) => void;
}

interface ProfileTableProps {
  columns: Column[];
  data: any[];
  totalPages: number;
  rowsPerPage?: number;
  dir?: "rtl" | "ltr";
  loading?: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  rowSelection?: RowSelection;
  onRowClick?: (record: any) => void; 
}

const ProfileTable: React.FC<ProfileTableProps> = ({
  columns,
  data,
  totalPages,
  rowsPerPage = 5,
  dir = "rtl",
  loading = false,
  onPageChange,
  currentPage,
  rowSelection,
  onRowClick, 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Get row key (id, number, _uniqueKey, or key field)
  const getRowKey = (row: any) => {
    return row._uniqueKey || row.id || row.number || row.key;
  };

  // Check if row is selected
  const isRowSelected = (row: any) => {
    if (!rowSelection) return false;
    const key = getRowKey(row);
    return rowSelection.selectedRowKeys.includes(key);
  };

  // Handle individual row selection
  const handleRowSelect = (row: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!rowSelection) return;

    const key = getRowKey(row);
    const isSelected = isRowSelected(row);

    let newSelectedKeys: any[];
    let newSelectedRows: any[];

    if (isSelected) {
      // Deselect
      newSelectedKeys = rowSelection.selectedRowKeys.filter((k) => k !== key);
      newSelectedRows = data.filter((r) => {
        const rKey = getRowKey(r);
        return newSelectedKeys.includes(rKey);
      });
    } else {
      // Select
      newSelectedKeys = [...rowSelection.selectedRowKeys, key];
      newSelectedRows = data.filter((r) => {
        const rKey = getRowKey(r);
        return newSelectedKeys.includes(rKey);
      });
    }

    rowSelection.onChange(newSelectedKeys, newSelectedRows);
  };

  // Handle select all on current page
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!rowSelection) return;

    if (event.target.checked) {
      // Select all rows on current page
      const currentPageKeys = data.map(getRowKey);
      const newSelectedKeys = [
        ...rowSelection.selectedRowKeys.filter(
          (key) => !currentPageKeys.includes(key)
        ),
        ...currentPageKeys,
      ];
      const allSelectedRows = data.filter((r) =>
        newSelectedKeys.includes(getRowKey(r))
      );
      rowSelection.onChange(newSelectedKeys, allSelectedRows);
    } else {
      // Deselect all rows on current page
      const currentPageKeys = data.map(getRowKey);
      const newSelectedKeys = rowSelection.selectedRowKeys.filter(
        (key) => !currentPageKeys.includes(key)
      );
      const remainingRows = data.filter((r) =>
        newSelectedKeys.includes(getRowKey(r))
      );
      rowSelection.onChange(newSelectedKeys, remainingRows);
    }
  };

  // Check if all rows on current page are selected
  const isAllSelected = () => {
    if (!rowSelection || data.length === 0) return false;
    return data.every((row) => isRowSelected(row));
  };

  // Check if some (but not all) rows are selected
  const isSomeSelected = () => {
    if (!rowSelection || data.length === 0) return false;
    const selectedCount = data.filter((row) => isRowSelected(row)).length;
    return selectedCount > 0 && selectedCount < data.length;
  };

  // Handle row click
  const handleRowClickInternal = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <Box dir={dir}>
      <TableContainer>
        <Table sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              {rowSelection && (
                <TableCell align="center" sx={{ width: 48 }}>
                  <Checkbox
                    checked={isAllSelected()}
                    indeterminate={isSomeSelected()}
                    onChange={handleSelectAll}
                    sx={{
                      color: "#07a887",
                      "&.Mui-checked": {
                        color: "#07a887",
                      },
                      "&.MuiCheckbox-indeterminate": {
                        color: "#07a887",
                      },
                    }}
                  />
                </TableCell>
              )}
              {columns.map((col, index) => (
                <TableCell key={index} align={col.align || "right"}>
                  <Typography
                    fontWeight={700}
                    fontSize={18}
                    color="#1c4446"
                    className="gh--font-bold"
                  >
                    {col.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  align="center"
                >
                  <CircularProgress size={30} sx={{ color: "#07a887" }} />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  align="center"
                >
                  <Typography className="gh--font-light">
                    لا توجد بيانات
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row, i) => (
                <TableRow
                  key={i}
                  hover
                  selected={isRowSelected(row)}
                  onClick={() => handleRowClickInternal(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(7, 168, 135, 0.08)",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "rgba(7, 168, 135, 0.12)",
                    },
                    "&:hover": {
                      backgroundColor: onRowClick
                        ? "rgba(7, 168, 135, 0.04)"
                        : undefined,
                    },
                  }}
                >
                  {rowSelection && (
                    <TableCell 
                      align="center" 
                      sx={{ width: 48 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isRowSelected(row)}
                        onChange={(e) => handleRowSelect(row, e as any)}
                        sx={{
                          color: "#07a887",
                          "&.Mui-checked": {
                            color: "#07a887",
                          },
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((col, ci) => {
                    const value = row[col.dataIndex];
                    return (
                      <TableCell key={ci} align={col.align || "right"}>
                        {col.render ? col.render(value, row) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          px: 1,
        }}
      >
        <Typography sx={{ mx: 2, fontSize: 14 }} className="gh--font-medium">
          صفحة {currentPage} من {Math.ceil(totalPages) || "0"}
        </Typography>

        <IconButton
          disabled={currentPage === 1 || loading}
          onClick={handlePrevious}
          sx={{ color: "#555" }}
        >
          <RightOutlined style={{ fontSize: "13px", marginLeft: "12px" }} />
        </IconButton>
        <IconButton
          disabled={currentPage >= Math.ceil(totalPages) || loading}
          onClick={handleNext}
          sx={{ color: "#555" }}
        >
          <LeftOutlined style={{ fontSize: "13px", marginRight: "8px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProfileTable;