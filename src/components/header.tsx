import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

type AntdMenuItem = Required<MenuProps>["items"][number];

interface CustomItem {
  label: string;
  key: string;
  icon?: React.ReactNode;
  link: string;
}

const customItems: CustomItem[] = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
    link: "/",
  },
  {
    label: "Create post",
    key: "app",
    icon: <AppstoreOutlined />,
    link: "/create",
  },
];

const items: AntdMenuItem[] = customItems.map((item) => ({
  label: item.label,
  key: item.key,
  icon: item.icon,
}));

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    const clicked = customItems.find((item) => item.key === e.key);
    if (clicked) {
      navigate(clicked.link);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
