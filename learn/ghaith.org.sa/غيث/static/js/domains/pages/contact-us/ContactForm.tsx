import { Form, Input } from "antd";
import React from "react";
import { toAddContact } from "../../../apis/actions/contact.actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../apis/store";
import { showNotification } from "../../../apis/utils/utils";
import CustomLabelInput from "../../../bibilio/Inputs/CustomLabelInput";
import PrimarButton from "../../../bibilio/Buttons/PrimaryButton";

const ContactForm = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async () => {
    try {
      await form.validateFields();

      const FormValues = form.getFieldsValue();
      let contactFormData = {
        ...FormValues,
      };
      dispatch(toAddContact(contactFormData)).then((result: any) => {
        const contact = result?.payload?.data?.result;
        if (contact?.code === 200) {
          showNotification(contact?.message, "success");
          form.resetFields();
        } else {
          showNotification(contact?.message, "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ghaith--contact-form-container">
      <p className="ghaith--contact-us-Details-desc">اتصل بنا </p>
      <Form form={form} layout="vertical">
        <div className="ghaith--contact-us-form">
          <Form.Item
            name="contact_name"
            rules={[
              {
                required: true,
                message: "الرجاء تعبئة الحقل",
              },
            ]}
            labelCol={{ className: "ghaith--label-style" }}
            className="ghaith--contact-us-form-inputs-container"
          >
            <CustomLabelInput
              label=""
              className="ghaith--contact-us-form-inputs"
              type="text"
              placeholder="الاسم الكامل"
            />
          </Form.Item>
          <Form.Item
            name="email_from"
            rules={[
              {
                required: false,
              },
              {
                type: "email",
                message: "يجب  التأكد من أن البريد الإلكتروني مكتوب بشكل صحيح",
              },
            ]}
            labelCol={{ className: "ghaith--label-style" }}
            className="ghaith--contact-us-form-inputs-container"
          >
            <CustomLabelInput
              label=""
              className="ghaith--contact-us-form-inputs"
              type="email"
              placeholder="البريد الإلكتروني"
            />
          </Form.Item>
          <Form.Item
            name="phone"
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
            className="ghaith--contact-us-form-inputs-container"
            labelCol={{ className: "ghaith--label-style" }}
          >
            <CustomLabelInput
              label=""
              className="ghaith--contact-us-form-inputs"
              placeholder="05XXXXXXXX"
              type="tel"
              maxLength={10}
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "الرجاء تعبئة الحقل",
              },
            ]}
            labelCol={{ className: "ghaith--label-style" }}
            className="ghaith--contact-us-form-inputs-container"
          >
            <CustomLabelInput
              label=""
              className="ghaith--contact-us-form-inputs"
              type="text"
              placeholder="الموضوع"
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "الرجاء تعبئة الحقل",
              },
            ]}
            labelCol={{ className: "ghaith--label-style" }}
            className="ghaith--contact-us-form-inputs-container"
          >
            <TextArea
              className="ghaith--suggestions-complaints-textarea ghaith--contact-us-form-inputs ghaith--textarea-input"
              rows={4}
              placeholder="النص"
            />
          </Form.Item>
          <PrimarButton
            className="ghaith--sponsor-orphan-card-button ghaith--contact-us-btn"
            title="إرسال "
            onClick={() => {
              onFinish();
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
