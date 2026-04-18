import { Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface PaginationProps {
  total: number;
  active: number;
  itemPerPage: number;
  setActive: (value: number) => void;
  scroll?: () => void;
  showLess?:boolean;
}
const PaginationComponent = ({
  total,
  active,
  setActive,
  itemPerPage,
  scroll,
  showLess
}: PaginationProps) => {
  const itemRender = (page: any, type: any, originalElement: any) => {
    if (type === "prev") {
      return (
        <a title="">
          <RightOutlined className="ghaith--pagination-arrow" aria-label=" " />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a title="">
          <LeftOutlined className="ghaith--pagination-arrow" aria-label=" " />
        </a>
      );
    }

    return originalElement;
  };

  return (
    <div className="ghaith--pagination-container">
      <Pagination
        style={{ direction: "rtl" }}
        align="center"
        current={active}
        total={total}
        pageSize={itemPerPage}
        onChange={setActive}
        itemRender={itemRender}
        locale={{
          items_per_page: "/ الصفحة",
        }}
        showLessItems={showLess} 
      />
    </div>
  );
};

export default PaginationComponent;