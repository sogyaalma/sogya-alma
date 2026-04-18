import React from "react";
import backUpImage from "../../../assets/logos/MainLogo.png";
import PrimarButton from "../../../bibilio/Buttons/PrimaryButton";

interface PodcastProps {
  podcast: any;
}

const PodcastCard: React.FC<PodcastProps> = ({ podcast }) => {
  const getImageUrl = () => {
    if (podcast?.image_ids && podcast?.image_ids.length > 0) {
      return podcast.image_ids[0];
    }
    return backUpImage;
  };

  const handleWatchClick = () => {
    if (podcast.url_podcast) {
      window.open(podcast.url_podcast, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div className="ghaith-podcast-card">
      <div className="ghaith-podcast-container">
        {/* Content Section - Left Side */}
        <div className="ghaith-podcast-content">
          <span
            className="ghaith--content-services-request-span ghaith--podcast-brief"
            dangerouslySetInnerHTML={{
              __html: podcast?.brief || "",
            }}
          />
          <PrimarButton
            className="ghaith-podcast-button"
            title="استمع للبودكاست"
            onClick={handleWatchClick}
          />
        </div>

        {/* Image Section - Right Side */}
        <div className="ghaith-podcast-image">
          <img
            src={getImageUrl()}
            alt={"podcast.name"}
            onError={(e) => {
              e.currentTarget.src = backUpImage;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
