import { Divider } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ShareAltOutlined } from "@ant-design/icons";
import { useState } from "react";
import Inputs from "../../bibilio/Inputs/Inputs";
import TransparentButton from "../../bibilio/Buttons/TransparentButton";
import facebookIcon from "../../assets/icons/facebook.png";
import twitterIcon from "../../assets/icons/twitter.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import envelopIcon from "../../assets/icons/envelope.png";
import linkIcon from "../../assets/icons/link.png";
interface ShareCasesProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: any;
  type?: string;
  programName?: string;
  isKorba?: boolean;
}

const ShareCases = ({
  url,
  programName,
  isKorba,
  ...props
}: ShareCasesProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const shareText = isKorba
    ? `تبرع للحالة ${programName}`
    : `تبرع للمشروع ${programName} `;
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 6000);
  };

  return (
    <>
      <div
        className="ghaith--share-cases-container"
        style={{ marginTop: "0.5rem" }}
      >
        <div className="ghaith--share-cases-title-grand">
          <ShareAltOutlined style={{ fontSize: "20px", color: "#333" }} />
          <span>{isKorba ? "مشاركة الحالة" : "مشاركة المشروع"}</span>
        </div>
        <Divider />
        <div className="ghaith--share-cases-title-container">
          <h5>{isKorba ? "رابط الحالة" : "رابط المشروع"}</h5>
          <Inputs readOnly value={url} className="ghaith--input-share-link" />
          <div className="ghaith--share-button-container">
            <CopyToClipboard text={url || ""} onCopy={handleCopy}>
              <TransparentButton
                title="نسخ الرابط"
                className="ghaith--share-button-copy"
              />
            </CopyToClipboard>
            {copied ? <p className="ghaith--copied">تم نسخ الرابط</p> : null}
          </div>
        </div>

        <div className="ghaith--share-cases-text-container">
          <h5>نشر عبر حسابك في التواصل الاجتماعي</h5>
          <div
            className="ghaith--card-details-project-social "
            style={{ padding: "0.3rem 1rem" }}
          >
            {/* Share button with native share API */}

            {/* Facebook share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" ghaith--share-modal-social"
            >
              <img src={facebookIcon} alt="facebook" />
            </a>

            {/* Twitter/X share */}
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                shareText + ` :  ${url}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" ghaith--share-modal-social"
            >
              <img src={twitterIcon} alt="x" />
            </a>

            {/* WhatsApp share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                shareText + ` :  ${url}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" ghaith--share-modal-social"
            >
              <img src={whatsappIcon} alt="whatsapp" />
            </a>

            {/* Email share */}
            <a
              href={`mailto:?subject=${encodeURIComponent(
                shareText + ` :  ${url}`,
              )}`}
              className=" ghaith--share-modal-social"
            >
              <img src={envelopIcon} alt="email" />
            </a>

            {/* Copy link button */}
            <button
              className=" ghaith--share-modal-social"
              onClick={handleCopy}
            >
              <img src={linkIcon} alt="link" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareCases;
