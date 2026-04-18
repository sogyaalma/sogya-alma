import React from "react";
import { Card } from "antd";

interface NewsAttachmentCardProps {
  description: string;
  imageUrl: string;
}

export default function NewsAttachmentCard({
  description,
  imageUrl,
}: NewsAttachmentCardProps) {
  return (
    <Card
      className="ghaith--news-card"
      cover={
        <div className="">
          <div className="ghaith--news-card-image-container">
            <img
              alt={"ghaith news"}
              src={imageUrl}
              className="ghaith--news-card-image"
            />
          </div>{" "}
          <div className="ghaith--newsAttachment-card-overlay ">
            <h3 className="ghaith--newsAttachment-desciption">{description}</h3>
          </div>
        </div>
      }
      bordered={false}
    />
  );
}
