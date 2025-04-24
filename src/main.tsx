import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
import Header from "./components/header";
import CreatePostPage from "./pages/create-post";
import "@ant-design/v5-patch-for-react-19";
import PostDetailPage from "./pages/post-detail";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/blog/:id" element={<PostDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>,
);
