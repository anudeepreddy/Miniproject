import React from 'react';
import {useLocation} from 'react-router-dom';
import {Layout,Menu,Avatar,Dropdown,Button} from 'antd';
const {Header} = Layout;

// const pages=["/home"]
const menu = (
  <Menu style={{width:200, padding:"16px 24px"}}>
    <h4>Anudeep Reddy</h4>
    <Button type="primary" style={{marginTop:"10px"}}>Logout</Button>
  </Menu>
);

function HeaderComponent(){
const location = useLocation();
if(location.pathname==='/home'){
  return (
    <Header>
      <div className="logo" />
      <div className="userAvatar" style={{float:"right"}}>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>A</Avatar>
      </Dropdown>
      </div>
    </Header>
  )
}
else{
  return (
    <h1>We are not ready yet</h1>
  )
}
}

export default HeaderComponent;