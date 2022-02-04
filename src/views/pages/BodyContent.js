import React, { useContext, useEffect, useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  TableOutlined,
} from "@ant-design/icons";
import "./BodyContent.css";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { observer } from "mobx-react";
import { withRouter } from "react-router";
import { RootStoreContext } from "../../state/Index";

const { Header, Sider, Content } = Layout;

const BodyContent = (props) => {
  const rootStore = useContext(RootStoreContext);
  const { content, history } = props;
  const { username, photo, logOut, state, getProfile, getUserTasks } = rootStore.User;
  const { openDrawer } = rootStore.UI.DrawerState;

  const [collapsed, setcollapsed] = useState(false);
  const toggle = () => {
    setcollapsed(!collapsed);
  };

  useEffect(() => {
    if (!localStorage.getItem("TOKEN")) {
      history.push("/login");
      return;
    }
    getProfile();
    getUserTasks();
  }, [state]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <SubMenu
            key="profile-sub-menu"
            title="Profile"
            icon={<UserOutlined />}
          >
            <Menu.Item key="sub-1" onClick={() => openDrawer()}>
              <Avatar src={photo} />
              {username}
            </Menu.Item>
            <Menu.Item
              key="sub-2"
              icon={<LogoutOutlined />}
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
            <Link to="/">Users List</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TableOutlined />}>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Z nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to="login" />
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ paddingLeft: "1vh", fontSize: "5vh" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

BodyContent.propTypes = {};

export default withRouter(observer(BodyContent));
