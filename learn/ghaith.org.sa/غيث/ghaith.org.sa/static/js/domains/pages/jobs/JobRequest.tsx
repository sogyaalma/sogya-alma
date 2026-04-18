import React from "react";
import { Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import { UploadOutlined } from "@ant-design/icons";

import { toAddJobApplication } from "../../../apis/actions/jobs.actions";
import {
  convertFileToBase64,
  showNotification,
} from "../../../apis/utils/utils";
import ModalComponent from "../../../bibilio/Modal/ModalComponent";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import CustomLabelSelect from "../../../components/select/CustomLabelSelect";
import UploadInput from "../../../bibilio/Inputs/UploadInput";
import PrimarButton from "../../../bibilio/Buttons/PrimaryButton";

interface JobRequestProps {
  jobId: number | string;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  certificateJobs: any;
}

const JobRequest = ({
  jobId,
  isModalVisible,
  setIsModalVisible,
  certificateJobs,
}: JobRequestProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.jobs.application);

  const handleFileChange = async (fileList: any[]) => {
    const file = fileList[0]?.originFileObj;

    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        const imageData = {
          filename: file.name,
          data: base64,
        };

        form.setFieldsValue({
          biography_attachment_ids: [imageData],
        });
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      const values = form.getFieldsValue();
      const applicationJobData = {
        ...values,
        job_id: jobId,
      };

      const success = (await dispatch(
        toAddJobApplication(applicationJobData),
      )) as any;
      const jobApplication = success?.payload?.result;

      if (jobApplication?.code === 200) {
          setIsModalVisible(false);
        showNotification(
          `${jobApplication?.message} ، و رقم الطلب هو ${jobApplication?.applicant_number}`,
          "success",
          undefined,
          true,
        );
   
        form.resetFields();
      } else {
        showNotification(jobApplication?.message, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalComponent
      title=""
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      closeOnOutsideClick={true}
      width={800}
      modalStyle={{ top: 200 }}
    >
      <Row justify={"center"} style={{ paddingBottom: "2rem" }}>
        {" "}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2
            style={{
              color: "#009767",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
            className="gh--font-light"
          >
            تقديم طلب التوظيف{" "}
          </h2>
        </div>
      </Row>
      <Form form={form} layout="vertical">
        <Row dir="rtl" gutter={16}>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="partner_name"
              label="الإسم"
              rules={[
                {
                  required: true,
                  message: "الرجاء تعبئة الحقل",
                },
              ]}
              className="ghaith--label-inputs"
              labelCol={{ className: "ghaith--label-style" }}
            >
              <CustomLabelInput label="" type="text" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="email_from"
              label="البريد الإلكتروني"
              rules={[
                {
                  required: true,
                  message: "الرجاء تعبئة الحقل",
                },
                {
                  type: "email",
                  message:
                    "يجب  التأكد من أن البريد الإلكتروني مكتوب بشكل صحيح",
                },
              ]}
              className="ghaith--label-inputs"
              labelCol={{ className: "ghaith--label-style" }}
            >
              <CustomLabelInput
                label=""
                type="email"
                placeholder="email@example.com"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="partner_phone"
              label="الهاتف"
              rules={[
                {
                  required: true,
                  message: "الرجاء تعبئة الحقل",
                },
                {
                  len: 10,
                  message: "يجب أن يتكون رقم الهاتف من 10 ارقام",
                },
              ]}
              className="ghaith--label-inputs"
              labelCol={{ className: "ghaith--label-style" }}
            >
              <CustomLabelInput label="" type="tel" maxLength={10} />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="type_id"
              label="الشهادة"
              rules={[
                {
                  required: true,
                  message: "الرجاء تعبئة الحقل",
                },
              ]}
              className="ghaith--label-inputs"
              labelCol={{ className: "ghaith--label-style" }}
            >
              <CustomLabelSelect
                label=""
                options={certificateJobs}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </Form.Item>
          </Col>
          <Col xxl={16} xl={16} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="biography_attachment_ids"
              label="السيرة الذاتية"
              rules={[
                {
                  required: true,
                  message: "الرجاء تعبئة الحقل",
                },
              ]}
              labelCol={{ className: "ghaith--label-style" }}
            >
              <UploadInput
                accept="*"
                text="السيرة الذاتية"
                icon={<UploadOutlined />}
                multiple={false}
                maxCount={1}
                onChange={handleFileChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} justify={"end"} dir="rtl">
          <Col xxl={4} xl={4} lg={4} md={4} sm={9} xs={9}>
            <PrimarButton
              className="ghaith--job-button"
              onClick={() => {
                handleSubmit();
              }}
              title="إرسال"
              loading={loading}
              disabled={loading}
            />
          </Col>
        </Row>
      </Form>
    </ModalComponent>
  );
};

export default JobRequest;
