import { useEffect, useState } from "react";
import { getAllPosts } from "@/api/posts";
import { Post } from "@/types";
import { Pagination, Spin, Row, Typography, Divider } from "antd";
import PostComponent from "@/components/post";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { posts, pagination } = await getAllPosts(currentPage);
      setPosts(posts);
      setPagination(pagination);
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "100svh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Blog Posts</Title>
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </Row>
      <Divider />
      <Pagination
        current={pagination.currentPage}
        total={pagination.totalItems}
        pageSize={pagination.itemsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default HomePage;
