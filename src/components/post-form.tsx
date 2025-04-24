import { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { NotificationType, Post } from "@/types";

interface PostFormProps {
  onSubmit: (post: Omit<Post, "id">) => Promise<void>;
  initialValues?: Post;
  mode: "create" | "edit";
  loading?: boolean;
}

const PostForm = ({
  onSubmit,
  initialValues,
  mode,
  loading = false,
}: PostFormProps) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [form, initialValues]);

  const showNotification = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleFinish = async (values: { title: string; text: string }) => {
    try {
      setSubmitting(true);
      await onSubmit(values);

      showNotification(
        "success",
        mode === "create" ? "Post Created" : "Post Updated",
        mode === "create"
          ? "Your post has been created successfully!"
          : "Your post has been updated successfully!",
      );

      if (mode === "create") {
        form.resetFields();
      }
    } catch (error) {
      showNotification(
        "error",
        "Operation Failed",
        `Failed to ${mode === "create" ? "create" : "update"} post. Please try again.`,
      );
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, message: "Please enter a title" },
          { max: 100, message: "Title cannot be longer than 100 characters" },
        ]}
      >
        <Input placeholder="Enter post title" />
      </Form.Item>

      <Form.Item
        name="text"
        label="Content"
        rules={[
          { required: true, message: "Please enter content for your post" },
        ]}
      >
        <Input.TextArea
          rows={8}
          placeholder="Write your post content here..."
          showCount
          maxLength={10000}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting || loading}
          size="large"
        >
          {mode === "create" ? "Create Post" : "Update Post"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
