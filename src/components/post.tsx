import { Post } from "@/types";
import { Card, Col } from "antd";
import { useNavigate } from "react-router";

interface PostProps {
  post: Post;
}
const PostComponent = ({ post }: PostProps) => {
  const navigate = useNavigate();
  return (
    <Col span={8} key={post.id}>
      <Card
        hoverable
        title={post.title}
        onClick={() => navigate(`blog/${post.id}`)}
      >
        <p>{post.text.substring(0, 100)}...</p>
      </Card>
    </Col>
  );
};

export default PostComponent;
