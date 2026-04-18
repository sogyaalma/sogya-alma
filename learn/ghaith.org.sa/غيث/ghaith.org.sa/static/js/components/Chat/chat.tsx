import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  Avatar,
  Spin,
  Badge,
  Tooltip,
  message as antMessage,
  Upload,
} from "antd";
import {
  SendOutlined,
  PaperClipOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { AppDispatch, RootState } from "../../apis/store";
import {
  getMeesages,
  sendMessage,
  conversationRead,
} from "../../apis/actions/chatbot.actions";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import { Box } from "@mui/material";
import ghaithLogo from "../../assets/logos/MainLogo.png";
import { convertFileToBase64 } from "../../apis/utils/utils";
import { getBeneficiaryDetails } from "../../apis/actions/profile.actions";

interface LatestMessage {
  id: number;
  attachment_ids: string[];
  body: string;
  date: string;
  sender: "me" | "association";
}

interface Message {
  id: number;
  latest_messages: LatestMessage;
}

interface MessagesResponse {
  total_messages: number;
  messages: Message[];
}

interface Props {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  view?: any;
}

const ChatMessagesApp = ({ isModalVisible, handleCloseModal }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [messageText, setMessageText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessagesCount, setNewMessagesCount] = useState<number>(0);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousMessagesCountRef = useRef<number>(0);
  const hasMarkedAsReadRef = useRef<boolean>(false);
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isModalVisible) {
      const initializeChat = async () => {
        await fetchMessages();

        // Now we have messages, check if we need to mark as read
        if (beneficiaryDetails?.total_unread_messages > 0) {
          await markMessagesAsRead();
          dispatch(getBeneficiaryDetails());
        }
      };
      initializeChat();

      intervalId = setInterval(() => {
        fetchMessages();
      }, 5000);
    } else {
      hasMarkedAsReadRef.current = false;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      setNewMessagesCount(0);
      setIsAtBottom(true);
    };
  }, [isModalVisible, beneficiaryDetails?.total_unread_messages]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
      setNewMessagesCount(0);
    } else if (messages.length > previousMessagesCountRef.current) {
      const newCount = messages.length - previousMessagesCountRef.current;
      setNewMessagesCount((prev) => prev + newCount);
    }

    previousMessagesCountRef.current = messages.length;
  }, [messages]);

  const markMessagesAsRead = async (): Promise<void> => {
    try {
      if (messages.length === 0) {
        console.log("No messages available to mark as read");
        return;
      }

      const lastMessageId = messages[messages.length - 1]?.id;

      if (lastMessageId) {
        await dispatch(
          conversationRead({
            read: true,
            channel_id: lastMessageId,
          })
        ).unwrap();
        hasMarkedAsReadRef.current = true;
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const fetchMessages = async (): Promise<void> => {
    try {
      const result = (await dispatch(
        getMeesages()
      ).unwrap()) as MessagesResponse;
      const newMessages = [...result.messages].reverse();
      setMessages(newMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (
      isModalVisible &&
      messages.length > 0 &&
      beneficiaryDetails?.total_unread_messages > 0 &&
      !hasMarkedAsReadRef.current
    ) {
      markMessagesAsRead();
    }
  }, [messages, isModalVisible, beneficiaryDetails?.total_unread_messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setNewMessagesCount(0);
  };

  const handleFileChange = async (info: any) => {
    const newFileList = info.fileList;
    setFileList(newFileList);

    const attachmentsArray = [];
    for (const fileItem of newFileList) {
      const file = fileItem?.originFileObj;
      if (file) {
        try {
          const base64 = await convertFileToBase64(file);
          const fileData = {
            filename: file.name,
            data: base64,
          };
          attachmentsArray.push(fileData);
        } catch (error) {
          console.error("Error converting file to Base64:", error);
          antMessage.error("فشل في تحميل الملف");
        }
      }
    }
    setAttachments(attachmentsArray);
  };

  const handleRemoveFile = (file: any) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);

    const newAttachments = attachments.filter(
      (_, index) => fileList[index]?.uid !== file.uid
    );
    setAttachments(newAttachments);
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!messageText.trim() && attachments.length === 0) return;

    setIsLoading(true);

    try {
      const payload: any = {
        message: messageText,
      };

      if (attachments.length > 0) {
        payload.attachments = attachments;
      }

      await dispatch(sendMessage(payload)).unwrap();
      setMessageText("");
      setAttachments([]);
      setFileList([]);
      await fetchMessages();
      setIsAtBottom(true);
    } catch (error) {
      console.error("Error sending message:", error);
      antMessage.error("فشل في إرسال الرسالة");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachmentClick = async (
    attachmentUrl: string,
    fileName: string
  ): Promise<void> => {
    try {
      window.open(attachmentUrl, "_blank");
    } catch (error) {
      console.error("Error opening attachment:", error);
      antMessage.error("فشل في فتح المرفق");
    }
  };

  const getFileNameFromUrl = (url: any): string => {
    return url?.filename;
  };

  const handleMessagesScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const threshold = 50;
    const atBottom = scrollHeight - scrollTop - clientHeight <= threshold;

    setIsAtBottom(atBottom);

    if (atBottom) {
      setNewMessagesCount(0);
    }
  };

  const parseHTML = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("ar-TN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFullDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString("ar-TN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={handleCloseModal}
      closeOnOutsideClick={true}
      width={550}
      showCloseIcon={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          direction: "rtl",
          position: "relative",
        }}
        className="gh--font-light"
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "16px 24px",
            borderBottom: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar size={80} style={{ backgroundColor: "#ffffffff" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& img": {
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <img src={ghaithLogo} alt="Logo" />
              </Box>
            </Avatar>
            <div>
              <div style={{ fontWeight: 600, color: "#000" }}>
                مسؤول التواصل
              </div>
              <div style={{ fontSize: "12px", color: "#52c41a" }}>متصل</div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxHeight: "50vh",
            minHeight: "50vh",
            justifyContent: messages.length === 0 ? "center" : "flex-start",
            alignItems: messages.length === 0 ? "center" : "stretch",
          }}
          onScroll={handleMessagesScroll}
        >
          {messages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#8c8c8c",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  opacity: 0.3,
                }}
              >
                💬
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
                className="gh--font-light"
              >
                لا توجد رسائل بعد
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#bfbfbf",
                }}
                className="gh--font-light"
              >
                ابدأ المحادثة بإرسال رسالة
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              return (
                <div
                  key={msg.latest_messages.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      msg.latest_messages.sender === "me"
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  {/* Message bubble */}
                  <div
                    style={{
                      maxWidth: "70%",
                      borderRadius: "16px",
                      padding: "12px 16px",
                      backgroundColor:
                        msg.latest_messages.sender === "me"
                          ? "#fff"
                          : "#009767",
                      color:
                        msg.latest_messages.sender === "me" ? "#000" : "#fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      border:
                        msg.latest_messages.sender === "me"
                          ? "1px solid #e8e8e8"
                          : "none",
                    }}
                    className="gh--font-light"
                  >
                    <div style={{ fontSize: "14px" }}>
                      {parseHTML(msg.latest_messages.body)}
                    </div>

                    {msg.latest_messages.attachment_ids?.length > 0 && (
                      <div style={{ marginTop: "8px" }}>
                        {msg.latest_messages.attachment_ids.map(
                          (url: any, idx) => {
                            const fileName = getFileNameFromUrl(url);

                            return (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  backgroundColor:
                                    msg.latest_messages.sender === "me"
                                      ? "#f5f5f5"
                                      : "rgba(255,255,255,0.2)",
                                  fontSize: "12px",
                                  marginTop: "4px",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                }}
                                className="attachment-item"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    msg.latest_messages.sender === "me"
                                      ? "#e6f7ff"
                                      : "rgba(255,255,255,0.3)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    msg.latest_messages.sender === "me"
                                      ? "#f5f5f5"
                                      : "rgba(255,255,255,0.2)";
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: 1,
                                    width: "100%",
                                  }}
                                  onClick={() =>
                                    handleAttachmentClick(url?.url, fileName)
                                  }
                                >
                                  <PaperClipOutlined />
                                  <span
                                    style={{
                                      flex: 1,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      maxWidth: "150px",
                                    }}
                                    title={fileName}
                                  >
                                    {fileName}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* Time with Tooltip */}
                  <Tooltip
                    title={formatFullDate(msg.latest_messages.date)}
                    placement={
                      msg.latest_messages.sender === "me" ? "right" : "left"
                    }
                    overlayStyle={{
                      maxWidth: "300px",
                      direction: "rtl",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color:
                          msg.latest_messages.sender === "me"
                            ? "#8c8c8c"
                            : "rgba(0,0,0,0.6)",
                        marginTop: "4px",
                        paddingInline: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      className="time-hover gh--font-light"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          msg.latest_messages.sender === "me"
                            ? "#009767"
                            : "#009767";
                        e.currentTarget.style.fontWeight = "bold";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          msg.latest_messages.sender === "me"
                            ? "#8c8c8c"
                            : "rgba(0,0,0,0.6)";
                        e.currentTarget.style.fontWeight = "normal";
                      }}
                    >
                      {formatTime(msg.latest_messages.date)}
                    </div>
                  </Tooltip>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* New Messages Indicator */}
        {newMessagesCount > 0 && !isAtBottom && (
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
          >
            <Button
              icon={<DownOutlined />}
              onClick={scrollToBottom}
              style={{
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0, 151, 103, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                height: "auto",
                border: "1px solid #00b377",
                color: "#00b377",
              }}
              className="gh--font-light"
            >
              <Badge
                count={newMessagesCount}
                size="default"
                style={{
                  backgroundColor: "#009767",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              />
              رسائل جديدة
            </Button>
          </div>
        )}

        {/* Input Area */}
        <div
          style={{
            backgroundColor: "#fff",
            borderTop: "1px solid #e8e8e8",
            padding: "16px 24px",
          }}
        >
          {/* Attached Files Preview */}
          {fileList.length > 0 && (
            <div
              style={{
                marginBottom: "12px",
                padding: "8px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              {fileList.map((file) => (
                <div
                  key={file.uid}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 8px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <PaperClipOutlined style={{ color: "#009767" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "200px",
                      }}
                    >
                      {file.name}
                    </span>
                  </div>
                  <CloseOutlined
                    style={{ cursor: "pointer", color: "#ff4d4f" }}
                    onClick={() => handleRemoveFile(file)}
                  />
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
              showUploadList={false}
              multiple={true}
            >
              <Button
                icon={<PaperClipOutlined />}
                type="text"
                style={{ color: "#8c8c8c" }}
              />
            </Upload>

            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onPressEnter={handleSendMessage}
              placeholder="اكتب رسالة..."
              disabled={isLoading}
              style={{
                flex: 1,
                borderRadius: "24px",
                textAlign: "right",
              }}
              size="large"
              suffix={
                isLoading && <Spin size="small" style={{ color: "#009767" }} />
              }
              className="gh--font-light ghaith--custom-chat-input"
            />
            <Button
              type="primary"
              icon={<SendOutlined style={{ transform: "scaleX(-1)" }} />}
              onClick={handleSendMessage}
              disabled={
                isLoading || (!messageText.trim() && attachments.length === 0)
              }
              shape="circle"
              size="large"
              className="ghaith--chat-send-btn"
            />
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ChatMessagesApp;
