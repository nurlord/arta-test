import { api } from "@/lib/api-client";
import { Post } from "@/types";

export const getAllPosts = async (page = 1) => {
  const { data } = await api<{
    data: Post[];
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
  }>({
    url: `/posts?_page=${page}`,
    method: "GET",
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    posts: data.data,
    pagination: {
      totalItems: data.items,
      totalPages: data.pages,
      currentPage: page,
      itemsPerPage: 10,
    },
  };
};

export const getPostById = async (id: string) => {
  const { data } = await api<Post>({
    url: `/posts/${id}`,
    method: "GET",
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return data;
};

export const createPost = async (data: Omit<Post, "id">) => {
  const { data: createdPost } = await api<Post>({
    url: `/posts`,
    method: "POST",
    data,
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return createdPost;
};

export const deletePost = async (id: string) => {
  const { data } = await api<Post>({
    url: `/posts/${id}`,
    method: "DELETE",
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return data;
};

export const updatePost = async (id: string, data: Omit<Post, "id">) => {
  const { data: updatedPost } = await api<Post>({
    url: `/posts/${id}`,
    method: "PATCH",
    data,
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return updatedPost;
};
