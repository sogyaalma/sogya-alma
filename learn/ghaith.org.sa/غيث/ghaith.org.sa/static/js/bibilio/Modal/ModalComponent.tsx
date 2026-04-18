import React, { ReactNode } from "react";
import { Button, ConfigProvider, Modal } from "antd";

interface ModalComponentProps {
  title: string;
  children?: ReactNode;
  withButton?: boolean;
  buttonText?: string;
  open?: boolean;
  buttonStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  width?: number;
  showCloseIcon?: boolean;
  className?: string;
  centered?: boolean;
  destroyOnClose?: boolean;
  mask?: boolean;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  children,
  withButton = false,
  buttonText = "Open Modal",
  buttonStyle,
  modalStyle,
  open = false,
  onClose,
  closeOnOutsideClick = true,
  width,
  showCloseIcon = true,
  className,
  centered,
  destroyOnClose,
  mask,
  modalRender,
}) => {
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {withButton && (
        <ConfigProvider wave={{ disabled: true }}>
          <Button style={buttonStyle}>{buttonText}</Button>
        </ConfigProvider>
      )}
      <Modal
        style={{ top: 20, minHeight: "30vh", height: "30vh", ...modalStyle }}
        width={width}
        open={open}
        footer={null}
        title={title}
        onCancel={handleCancel}
        closable={showCloseIcon}
        keyboard={true}
        className={className}
        centered={centered}
        destroyOnClose={destroyOnClose}
        mask={mask}
        maskClosable={closeOnOutsideClick}
        modalRender={modalRender}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
