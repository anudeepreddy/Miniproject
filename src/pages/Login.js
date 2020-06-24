import React from 'react';
import { useState } from 'react';
import { Card, Row ,Col ,Form, Input, Button, Checkbox , Space } from 'antd';
import { UserOutlined, LockOutlined , ExclamationCircleOutlined} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function Login() {
    
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  const [size] = useState(8);
return(   
<Row>
      <Col>
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
        <a style={{
            textAlign:'right',
            float:'right'
        }} href="/">Forgot Password?</a>
      </Form.Item>
      <Form.Item>
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
   left: '20%',
   width: '600px',
   height: '500px'
}}src="/login.svg" alt="text" ></img>
      </Col>
  </Row>
);
}
export default Login;