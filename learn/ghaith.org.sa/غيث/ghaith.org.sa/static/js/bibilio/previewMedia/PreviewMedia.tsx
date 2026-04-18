import React, { useRef, useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { LeftOutlined, RightOutlined, CloseOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { scroll } from "../../apis/utils/utils";
import PaginationComponent from "../pagination/PaginationComponent";

interface MediaItem {
  id: number;
  name: string;
  attachment_ids?: string;
  video_url?: string;
}

interface PreviewMediaProps {
  mediaItems: MediaItem[];
  loading: boolean;
  itemPerPage: number;
  isVideo: boolean;
  title?: string;
  type?: "project" | "general";
}

const PreviewMedia = ({
  mediaItems,
  itemPerPage,
  isVideo,
  title,
  type,
}: PreviewMediaProps) => {
  const currentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const updateActive = (nb: number) => {
    setCurrentPage(nb);
    scroll(currentRef);
  };

  const handleItemClick = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  const sortedData = mediaItems
    .map((report: any) => report)
    .sort((a: any, b: any) => a.sequence - b.sequence);

  const startIndex = (currentPage - 1) * itemPerPage;
  const currentMediaItems = sortedData.slice(
    startIndex,
    startIndex + itemPerPage
  );

  const handleArrowClick = (direction: "left" | "right") => {
    if (currentIndex !== null) {
      let newIndex = currentIndex;

      if (direction === "left") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
      } else if (direction === "right") {
        newIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
      }

      setCurrentIndex(newIndex);
    }
  };

  return (
    <div
      className="ghaith--video-album-container"
      ref={currentRef}
      style={{
      }}
    >
      {title && (
        <h2 className="ghaith--video-album-title" style={{ direction: "rtl" }}>
          {title}
        </h2>
      )}
      <Row
        key={currentPage}
        gutter={[{ xxl: 16, xl: 16, lg: 16, md: 16, sm: 0, xs: 0 }, 48]}
        justify="center"
        className="ghaith--video-album-container"
        style={{
          padding: type === "project" ? "0 20px" : "",
        }}
      >
        {currentMediaItems.map((item, index) => (
          <Col
            key={index}
            xxl={type === "project" ? 5 : 7}
            xl={type === "project" ? 5 : 8}
            lg={type === "project" ? 6 : 11}
            md={type === "project" ? 8 : 11}
            sm={type === "project" ? 12 : 11}
            xs={24}
          >
            <div
              onClick={() => handleItemClick(startIndex + index)}
              className={`ghaith--video-photo-container ${
                type === "project" ? "ghaith--project-details_reports" : ""
              }`}
            >
              {isVideo ? (
                <ReactPlayer
                  url={item.video_url}
                  light
                  width="100%"
                  height="100%"
                  style={{ aspectRatio: "16/9" }}
                />
              ) : (
                <img
                  src={item.attachment_ids}
                  alt={`Photo ${index + 1}`}
                  className={`ghaith--video-photo-container ${
                    type === "project" ? "ghaith--project-details_reports" : ""
                  }`}
                />
              )}
              {type !== "project" && (
                <div className="ghaith--video-overlay">{item.name}</div>
              )}
            </div>
          </Col>
        ))}
      </Row>

      <div className="ghaith--pagination-container">
        {mediaItems && mediaItems.length > itemPerPage && (
          <PaginationComponent
            active={currentPage}
            total={mediaItems.length}
            itemPerPage={itemPerPage}
            scroll={() => scroll(currentRef)}
            setActive={(nb) => updateActive(nb)}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={handleCloseModal}
          width={800}
          centered
          maskClosable={true}
          closable={false}
          title={""}
          className="ghaith--custom-video-modal"
        >
          <Row>
            <Col span={3} />
            <Col span={18}>
              <div className="ghaith--modal-title-container">
                <span onClick={handleCloseModal} className="ghaith--close-icon">
                  <CloseOutlined />
                </span>
                <span className="ghaith--modal-title">
                  {currentIndex !== null ? mediaItems[currentIndex].name : ""}
                </span>
              </div>
            </Col>
            <Col span={3} />
          </Row>
          <Row>
            <Col span={3} onClick={() => handleArrowClick("left")}>
              <Button
                icon={<LeftOutlined />}
                onClick={() => handleArrowClick("left")}
                className="ghaith--modal-arrow-button ghaith--modal-arrow-left"
              />
            </Col>
            <Col span={18}>
              <div className="ghaith--video-modal-col">
                {currentIndex !== null &&
                  (isVideo ? (
                    <ReactPlayer
                      url={mediaItems[currentIndex].video_url}
                      playing
                      controls
                      width="100%"
                    />
                  ) : (
                    <img
                      src={mediaItems[currentIndex].attachment_ids}
                      alt={`Photo ${currentIndex + 1}`}
                      className="ghaith--modal-image"
                    />
                  ))}
              </div>
            </Col>
            <Col span={3} onClick={() => handleArrowClick("right")}>
              <Button
                icon={<RightOutlined />}
                onClick={() => handleArrowClick("right")}
                className="ghaith--modal-arrow-button ghaith--modal-arrow-right"
              />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default PreviewMedia;
