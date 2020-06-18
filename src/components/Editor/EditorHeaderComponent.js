import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {Layout,Menu,Avatar,Dropdown,Button} from 'antd';

const {Header}=Layout;
const menu = (
    <Menu style={{width:200, padding:"16px 24px"}}>
      <h4>UserName</h4>
      <Button type="primary" style={{marginTop:"10px"}}>Logout</Button>
    </Menu>
  );

function EditorHeaderComponent() {
    return (
    <Header >
    <div style={{display:"inline-block"}}>
    <Breadcrumb separator=">">
        <Breadcrumb.Item href="/home">
            <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/profile">
            <UserOutlined />
            <span>UserName</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>WorkSpace</Breadcrumb.Item>
    </Breadcrumb>
    </div>
    <div className="userAvatar" style={{float:"right"}}>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
      </Dropdown>
    </div>
  </Header>
    )
}

export default EditorHeaderComponent;