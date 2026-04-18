import React from "react";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import saudiIcon from "../../assets/images/foundersSvg.png";
import { FoundingMember } from "../../interfaces/Founding.members";

interface MemberCardProps {
  member: FoundingMember;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="ghaith--member-card">
      <div className="ghaith--member-avatar">
        {member.hasPhoto ? (
          <img src={member.image} alt={member.name} />
        ) : (
          <img src={saudiIcon} alt={member.name} className="icon" />
        )}
      </div>
      <h3 className="ghaith--member-name">{member.name}</h3>
      {member.role && (
        <p
          className={`ghaith--member-role ${
            member.roleDesign ? "ghaith--member-role-design" : ""
          }`}
        >
          {member.role}
        </p>
      )}{" "}
      {member.qualification && (
        <p className="ghaith--member-role">{member.qualification}</p>
      )}
      <div className="ghaith--member-contacts">
        {member.phone && (
          <a href={`tel:${member.phone}`} className="ghaith--contact-link">
            <PhoneOutlined />
            <span>{member.phone}</span>
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="ghaith--contact-link">
            <MailOutlined />
            <span>{member.email}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
