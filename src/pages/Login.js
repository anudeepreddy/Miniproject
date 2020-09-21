import React from 'react';
import { useState } from 'react';
import { Card, Row ,Col ,Form, Input, Button, Checkbox , Space } from 'antd';
import { UserOutlined, LockOutlined , ExclamationCircleOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import jwtdecode from 'jwt-decode';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const axios=require('axios');

toast.configure();

function Login() {
  
  const onFinish = values => {
    console.log('Received values of form: ', values);
    axios.post('http://localhost:8000/user/login',values)
    .then(res =>{
      console.log(res);
      const data=res.data;
      console.log(data);
      if(data.status)
      {
        localStorage.setItem(' token ' , data.accessToken );
        localStorage.setItem(' user ' , jwtdecode(data.accessToken).username);
        window.location='/home';
      }
      else{
          toast.warn(data.message, { autoClose : 3000 });
      }
    })
    .catch(err =>{
      toast.error(err.message, { autoClose : 3000 });
    });
  };
  const [size] = useState(8);
return(   
<Row>
      <Col span={7}>
          <Card bordered={false} style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", 
          }}>
              <h2>LOGIN</h2>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item>
                  <a style={{
            textAlign:'right',
            float:'right'
        }} href="/">Forgot Password?</a>        
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox align="middle">Remember me</Checkbox>
          <ExclamationCircleOutlined />
        </Form.Item>
      </Form.Item>
       
      <Form.Item>
        <Space size={size}>
            <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <br></br>
        <span>Don't have an Account?<a style={{
            textAlign:'right',
            float:'right'
        }} href="/signup">sign up now!</a></span>
        </Space>
      </Form.Item>
    </Form>
    </Card>
      </Col>
      <Col span={17}>
      <img style={{
   position: 'absolute',
   top: '4%',
   left: '19.8%',
   width: '600px',
   height: '500px'
}}src="/login.svg" alt="text" ></img>
      </Col>
  </Row>
);
}
export default Login;