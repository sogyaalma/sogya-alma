import React from "react";
import { Card } from "antd";
import { formatDate } from "../../../apis/utils/utils";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  title: string;
  imageUrl: string;
  date: string;
  access_token: any;
  type?: string;
}

export default function NewsCard({
  title,
  imageUrl,
  date,
  access_token,
  type = "news",
}: NewsCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    let route = "/news";

    if (type === "events") {
      route = "/event";
    } else if (type === "media_eyes") {
      route = "/media-eyes";
    }

    navigate(`${route}/${access_token}`);
  };

  return (
    <Card
      className="ghaith--news-card"
      cover={
        <div className="ghaith--news-card-image-container">
          <img
            alt={"ghaith news"}
            src={imageUrl}
            className="ghaith--news-card-image"
            onClick={handleCardClick}
          />
          <div className="ghaith--news-card-overlay">
            <div className="ghaith--news-card-meta">
              <span className="ghaith--news-card-date">{formatDate(date)}</span>
            </div>
            <h3 className="ghaith--news-card-title" onClick={handleCardClick}>
              {title}
            </h3>
            <a className="ghaith--news-card-link" onClick={handleCardClick}>
              إقرأ المزيد
            </a>
          </div>
        </div>
      }
      bordered={false}
    />
  );
}
