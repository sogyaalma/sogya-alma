import React, { useState } from "react";
import { Card, Button } from "antd";
import leftArrow from "../../assets/icons/left-arrow.svg";
import leftTriangle from "../../assets/icons/left-triangle.svg";
import ModalComponent from "../Modal/ModalComponent";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  youtube_url?: string;
  access_token: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  title,
  description,
  youtube_url,
  access_token,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleProjectClick = () => {
    navigate(`/project/${access_token}`, {});
  };
  const handleOpenVideo = () => {
    if (youtube_url) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <Card
        className="ghaith--projects-card"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="ghaith--projects-image-wrapper">
          <img
            src={imageUrl}
            alt={title}
            className="ghaith--projects-image"
            style={{ cursor: "pointer" }}
            onClick={handleProjectClick}
          />

          <div className="ghaith--projects-overlay">
            <h3
              className="ghaith--projects-title"
              style={{ cursor: "pointer" }}
              onClick={handleProjectClick}
            >
              {title}
            </h3>
            <p className="ghaith--projects-description">{description}</p>
            <div className="ghaith--projects-actions">
              {/* Left square button - Opens YouTube video */}
              <Button
                className="ghaith--projects-btn-icon"
                onClick={handleOpenVideo}
                disabled={!youtube_url}
              >
                <img src={leftTriangle} alt="triangle" />
              </Button>

              {/* تفاصيل button */}
              <Button
                className="ghaith--projects-btn "
                onClick={handleProjectClick}
              >
                <img
                  src={leftArrow}
                  alt="arrow"
                  className="ghaith--projects-arrow"
                />
                تفاصيل
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* YouTube Video Modal */}
      {youtube_url && (
        <ModalComponent
          title={title}
          open={isModalOpen}
          onClose={handleCloseModal}
          closeOnOutsideClick={true}
          width={800}
          centered={true}
          destroyOnClose={true}
          modalStyle={{
            top: 20,
            minHeight: "60vh",
            height: "auto",
            direction: "rtl",
          }}
          className="gh--font-medium"
        >
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              direction: "rtl",
            }}
          >
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              src={getYouTubeEmbedUrl(youtube_url)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default ProjectCard;
