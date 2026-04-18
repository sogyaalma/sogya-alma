import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import Loader from "../loader/Loader";

interface PdfPreviewProps {
  open: boolean;
  onClose: () => void;
  url?: string;
  className?: string;
  isBlob?: boolean;
}

const PdfPreview = ({
  open,
  onClose,
  url,
  className,
  isBlob,
}: PdfPreviewProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        (window.innerWidth === 1024 && window.innerHeight < 1280) ||
        window.innerWidth === 1280;
      setIsMobile(isMobileDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ModalComponent
      className="ghaith--pdf-preview-modal-container"
      title=""
      width={1200}
      open={open}
      onClose={onClose}
      closeOnOutsideClick={true}
    >
      {loading && !url ? (
        <Loader />
      ) : (
        <>
          {((isBlob && !isMobile) || !isBlob) && (
            <iframe
              title=""
              src={url}
              className={`ghaith--pdf-preview ${className}`}
              onLoad={() => setLoading(false)}
              width="100%"
              height="600px"
            />
          )}
          {isMobile && isBlob && (
            <a className="ghaith--pdf-preview-download" href={url} download>
              تحميل
            </a>
          )}
        </>
      )}
    </ModalComponent>
  );
};

export default PdfPreview;
