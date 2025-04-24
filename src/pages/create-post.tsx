import { createPost } from "@/api/posts";
import PostForm from "@/components/post-form";
import { Post } from "@/types";

const CreatePostPage = () => {
  const handleSubmit = async (post: Omit<Post, "id">) => {
    createPost(post);
  };
  return (
    <div style={{ padding: "20px" }}>
      <PostForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePostPage;
