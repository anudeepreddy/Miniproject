import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu } from "antd";

const { Header } = Layout;

const UserMenu = (props) => (
  <Menu style={{ width: 200, padding: "16px 24px" }}>
    <h4>{props.username}</h4>
    <Button type="primary" style={{ marginTop: "10px" }} onClick={props.logout}>
      Logout
    </Button>
  </Menu>
);

const workspaceMenu = (
  <Menu style={{ width: 200, padding: "16px 24px" }}>
    <h4>This will be implemented soon</h4>
  </Menu>
);

function HeaderComponent(props) {
  const location = useLocation();

  function logout() {
    console.log("logout clicked");
    localStorage.clear();
    window.location.reload(false);
  }
  if (location.pathname === "/a/home") {
    return (
      <Header>
        <div className="logo" />
        <div className="userAvatar" style={{ float: "right" }}>
          <Dropdown
            overlay={<UserMenu username={props.username} logout={logout} />}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              {props.username[0].toUpperCase()}
            </Avatar>
          </Dropdown>
        </div>
      </Header>
    );
  } else if (location.pathname.split("/")[2] === "workspace") {
    return (
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="logo" />
        <div style={{ display: "flex" }}>
          <Breadcrumb
            style={{ alignSelf: "center" }}
            separator={<span style={{ color: "white" }}>/</span>}
          >
            <Breadcrumb.Item style={{ color: "white" }}>
              {props.workspaceOwner}
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ color: "white" }}>
              {props.workspaceName}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="userAvatar" style={{}}>
          <Dropdown
            overlay={<UserMenu username={props.username} logout={logout} />}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              {props.username[0].toUpperCase()}
            </Avatar>
          </Dropdown>
        </div>
      </Header>
    );
  } else {
    return <h1>We are not ready yet</h1>;
  }
}

export default HeaderComponent;
