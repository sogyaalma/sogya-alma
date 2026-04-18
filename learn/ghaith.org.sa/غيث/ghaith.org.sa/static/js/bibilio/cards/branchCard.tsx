import React from "react";
import { Collapse } from "antd";
import {
  EnvironmentOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import backUpImage from "../../assets/logos/MainLogo.png";
import { Branch } from "../../interfaces/Branches.types";
import PrimarButton from "../Buttons/PrimaryButton";

const { Panel } = Collapse;

interface BranchCardProps {
  branch: Branch;
}

interface BranchOffice {
  id: string;
  name: string;
  google_map_location?: string;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  const hasOffices =
    branch.branch_office_ids && branch.branch_office_ids.length > 0;

  const getImageUrl = () => {
    if (branch.image_ids && branch.image_ids.length > 0) {
      return branch.image_ids[0];
    }
    return backUpImage;
  };

  const handleMapClick = (url?: string) => {
    const mapUrl = url || branch.google_map_location;
    if (mapUrl) {
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Custom collapse arrow renderer
  const renderCollapseArrow = (panelProps: any) => {
    return (
      <div className="ghaith-collapse-arrow">
        {panelProps.isActive ? (
          <DownOutlined className="ghaith-arrow-icon" />
        ) : (
          <RightOutlined className="ghaith-arrow-icon" />
        )}
      </div>
    );
  };

  return (
    <div className="ghaith-branch-card">
      <Collapse
        bordered={false}
        ghost
        expandIcon={hasOffices ? renderCollapseArrow : undefined}
        expandIconPosition="left"
        className="ghaith-branch-collapse"
      >
        <Panel
          header={
            <div className="ghaith-branch-container">
              {/* Content Section - Left Side */}
              <div className="ghaith-branch-content">
                <h2 className="ghaith-branch-title">{branch.name}</h2>
                <p className="ghaith-branch-address">{branch.address}</p>
                <PrimarButton
                  className="ghaith-branch-button"
                  title="اكتشف في الخريطة"
                  onClick={() => handleMapClick()}
                  icon={<EnvironmentOutlined />}
                  style={{ direction: "ltr" }}
                />
              </div>

              {/* Image Section - Right Side */}
              <div className="ghaith-branch-image">
                <img
                  src={getImageUrl()}
                  alt={branch.name}
                  onError={(e) => {
                    e.currentTarget.src = backUpImage;
                  }}
                />
              </div>
            </div>
          }
          key="1"
          showArrow={hasOffices}
          className={hasOffices ? "ghaith-collapsible-panel" : ""}
        >
          {/* Branch Offices Section - Simplified: Just clickable names */}
          {hasOffices && (
            <div className="ghaith-branch-offices">
              <h3 className="ghaith-offices-title"> المكاتب :</h3>
              <div className="ghaith-offices-list">
                {(branch.branch_office_ids as BranchOffice[]).map(
                  (office: BranchOffice, index: number) => (
                    <div
                      key={office.id || index}
                      className="ghaith-office-name-item"
                      onClick={() =>
                        office.google_map_location &&
                        handleMapClick(office.google_map_location)
                      }
                    >
                      <span className="ghaith-office-name-text">
                        {office.name}
                      </span>
                      {office.google_map_location && (
                        <EnvironmentOutlined className="ghaith-office-icon" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default BranchCard;
