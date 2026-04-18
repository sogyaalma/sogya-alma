import React, { useState } from "react";
import { Box } from "@mui/material";
import PdfPreview from "./PdfPreviewer";
import moment from "moment";

type Attachment = {
  name: string;
  date: string;
  url: string;
};

type AttachmentCardItemProps = {
  item: Attachment;
  index: number;
};

const AttachmentCardItem: React.FC<AttachmentCardItemProps> = ({
  item,
  index,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

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
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "18px",
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
                fontSize: "19px",
                fontWeight: 600,
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.2px",
              }}
            >
              {item?.name || `مرفق `}
            </Box>

            {/* Date */}
            {item?.date && (
              <Box
                component="span"
                className="gh--font-medium"
                sx={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.9)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: 0.8 }}
                >
                  <path
                    d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.695 13.7h.009M15.695 16.7h.009M11.995 13.7h.01M11.995 16.7h.01M8.294 13.7h.01M8.294 16.7h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {moment(item?.date).locale("en").format("YYYY/MM/DD")}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* PDF Preview Modal */}
      <PdfPreview
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={item?.url}
        isBlob={false}
      />
    </>
  );
};

type AttachmentCardProps = {
  attachments: Attachment[];
};

const AttachmentCard: React.FC<AttachmentCardProps> = ({ attachments }) => {
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
        minHeight: "30vh",
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
      }}
    >
      {attachments.map((attachment, index) => (
        <AttachmentCardItem key={index} item={attachment} index={index} />
      ))}
    </Box>
  );
};

export default AttachmentCard;
