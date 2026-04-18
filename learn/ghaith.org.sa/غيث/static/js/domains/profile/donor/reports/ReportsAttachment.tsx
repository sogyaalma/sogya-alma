import React, { useState } from "react";
import { Box } from "@mui/material";
import PdfPreview from "../../../../bibilio/Modal/PdfPreviewer";

type Attachment = {
  name: string;
  category: string;
  attachment_ids: string | string[];
  displayIndex?: number;
};

type ReportCardItemProps = {
  item: Attachment;
  index: number;
};

const ReportCardItem: React.FC<ReportCardItemProps> = ({ item, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const actualIndex =
    item.displayIndex !== undefined ? item.displayIndex : index;
  const formattedIndex =
    actualIndex < 9 ? `0${actualIndex + 1}` : `${actualIndex + 1}`;
  // Get the URL from attachment_ids (handle both string and array)
  const getAttachmentUrl = () => {
    if (Array.isArray(item.attachment_ids)) {
      return item.attachment_ids[0];
    }
    return item.attachment_ids;
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // Get category display info
  const getCategoryInfo = () => {
    const isPrivate = item.category?.toLowerCase() === "private";
    return {
      text: isPrivate ? "خاص" : "عام",
      bgColor: "rgba(028, 066, 069, 0.35)",
      textColor: "#ffff",
    };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          mt: 2,
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            "& .card-content": {
              boxShadow: "0 12px 28px rgba(10, 163, 112, 0.25)",
              background:
                "linear-gradient(135deg, rgba(10, 163, 112, 0.9) 0%, rgba(109, 213, 168, 0.9) 100%)",
            },
          },
        }}
        onClick={handleCardClick}
      >
        <Box
          className="card-content"
          dir="rtl"
          sx={{
            position: "relative",
            padding: "1rem 2rem",
            paddingLeft: "5rem",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(10, 163, 112, 0.75) 0%, rgba(109, 213, 168, 0.75) 100%)",
            boxShadow: "0 4px 16px rgba(10, 163, 112, 0.15)",
            transition: "all 0.3s ease",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
            },
            "&:hover::before": {
              opacity: 1,
            },
          }}
        >
          {/* Index Badge */}
          <Box
            className="index-badge"
            sx={{
              position: "absolute",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "32px",
              height: "32px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "14px",
              color: "#0aa370",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {formattedIndex}
          </Box>

          {/* Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            {/* File Name */}
            <Box
              component="span"
              className="gh--font-light"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.2px",
              }}
            >
              {item?.name || "مرفق"}
            </Box>

            {/* Category */}
            {item?.category && (
              <Box
                component="span"
                className="gh--font-medium"
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.95)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  width: "fit-content",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  background: categoryInfo.bgColor,
                  backdropFilter: "blur(10px)",
                }}
              >
                <span style={{ color: categoryInfo.textColor }}>
                  {categoryInfo.text}
                </span>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* PDF Preview Modal */}
      <PdfPreview
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={getAttachmentUrl()}
        isBlob={false}
        className="ghaith--pdf-preview-modal"
      />
    </>
  );
};

type ReportCardProps = {
  attachments: Attachment[];
};

const ReportCard: React.FC<ReportCardProps> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            padding: "2.5rem 3.5rem",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(10, 163, 112, 0.03) 0%, rgba(109, 213, 168, 0.05) 100%)",
            border: "2px dashed rgba(10, 163, 112, 0.25)",
          }}
        >
          <Box
            sx={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(10, 163, 112, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            📎
          </Box>
          <Box
            component="span"
            className="gh--font-medium"
            sx={{
              color: "#666",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            لا توجد مرفقات
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
      }}
    >
      {attachments.map((attachment, index) => (
        <ReportCardItem key={index} item={attachment} index={index} />
      ))}
    </Box>
  );
};

export default ReportCard;
