import React from "react";
import { Card, Box } from "@mui/material";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

type ImageSliderCardProps = {
  height?: number; // card height
  autoplay?: boolean;
  programs?: any;
};

const ImageSliderCard: React.FC<ImageSliderCardProps> = ({
  height = 440,
  autoplay = true,
  programs,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      dir="rtl"
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
        position: "relative",

        /* center dots at bottom + style like the design */
        ".slick-dots": { bottom: 20 },
        ".slick-dots li": { width: 20, margin: "0 3px" },
        ".slick-dots li button": {
          width: 9,
          height: 10,
          padding: 0,
          background: "rgba(255,255,255,0.55)",
          opacity: 1,
        },
        ".slick-dots li.slick-active button": {
          width: 22,
          background: "#fff",
        },
      }}
    >
      <Carousel autoplay={autoplay} arrows={false} dots>
        {programs.map((program: any, i: any) => (
          <Box
            key={i}
            onClick={() => navigate(`/program/${program.id}`)}
            sx={{
              height,
              backgroundImage: `url(${program.title_image_ids[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer", 
            }}
          />
        ))}
      </Carousel>
    </Card>
  );
};

export default ImageSliderCard;