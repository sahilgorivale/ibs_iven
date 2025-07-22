import React, { useState } from "react";
import { Layout, Drawer, Menu, Button } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MasterPage from "pages/MasterPage";

const { Header, Content } = Layout;

const AppBar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Header */}
      <Header className="bg-white shadow-md flex items-center px-4 justify-between sticky top-0 z-10">
        <Bars3Icon className="w-6 h-6 cursor-pointer" onClick={showDrawer} />
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </Header>

      {/* Side Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "3",
              icon: <SettingOutlined />,
              label: "Settings",
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Drawer>

      {/* Page Content */}
      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        < MasterPage/>
      </Content>
    </Layout>
  );
};

export default AppBar;
