import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Layout,
  Typography,
  Button,
  Card,
  Modal,
  Spin,
  notification,
  Space,
  Breadcrumb,
  Empty,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import PostForm from "@/components/post-form";
import { deletePost, getPostById, updatePost } from "@/api/posts";
import { Post } from "@/types";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost);
    } catch {
      notification.error({
        message: "Error",
        description: "Failed to load post.",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const handleUpdate = async (updatedData: Omit<Post, "id">) => {
    if (!id || !post) return;

    try {
      setSubmitting(true);
      const updatedPost = await updatePost(id, updatedData);
      setPost(updatedPost);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating post", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this post?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDelete,
    });
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      setSubmitting(true);
      await deletePost(id);

      notification.success({
        message: "Success",
        description: "Post has been deleted successfully.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting post", error);
      notification.error({
        message: "Error",
        description: "Failed to delete post. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout style={{ padding: "24px", marginTop: 64 }}>
      <Content
        style={{ background: "#fff", padding: 24, margin: 0, minHeight: 280 }}
      >
        <Breadcrumb
          style={{ marginBottom: 16 }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Home</a>,
            },
            {
              title: "Post Details",
            },
          ]}
        ></Breadcrumb>

        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          style={{ marginBottom: 16 }}
        >
          Back to Posts
        </Button>

        {loading ? (
          <div
            style={{ display: "flex", justifyContent: "center", padding: 48 }}
          >
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
        ) : !post ? (
          <Card>
            <Empty description="Post not found" />
          </Card>
        ) : editMode ? (
          <Card
            title="Edit Post"
            extra={<Button onClick={() => setEditMode(false)}>Cancel</Button>}
          >
            <PostForm
              onSubmit={handleUpdate}
              initialValues={post}
              mode="edit"
              loading={submitting}
            />
          </Card>
        ) : (
          <Card
            title={<Title level={2}>{post.title}</Title>}
            extra={
              <Space>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={showDeleteConfirm}
                >
                  Delete
                </Button>
              </Space>
            }
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  whiteSpace: "pre-line",
                }}
              >
                {post.text}
              </Paragraph>
            </Space>
          </Card>
        )}
      </Content>
    </Layout>
  );
};
export default PostDetailPage;
