import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, 
  LogoutOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./BodyContent.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const BodyContent = ({ content }) => {
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>Z
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to="login" >
            </Link>
            Log Out
          </Menu.Item>

        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle
            }
          )}
          Test
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

BodyContent.propTypes = {};

export default BodyContent;
