import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, Row, Space} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import { register } from '../redux/user/register';

function Signup(props) {

    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.Register(values);
    };
    const [size] = useState(8);
    return (
        <Row>
            <Col>
                <Card bordered={false} style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <h2>Create an Account</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please enter your Username!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: 'Please enter your Email-id!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                   type="email"
                                   placeholder="E-mail"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please enter your Password!'}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm password"
                            rules={[{required: true, message: 'Please re-enter your Password!'}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Confirm Password"
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space size={size}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Sign up
                                </Button>
                                <br></br>
                                <span>Already have an account?<a style={{
                                    textAlign: 'right',
                                    float: 'right'
                                }} href="/login">login here!</a></span>
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
                }} src="/login.svg" alt="text"></img>
            </Col>
        </Row>
    );
}

const mapDispatchToProps = (dispatch) => ({
    Register: (data) => dispatch(register(data))
})

export default connect(null,mapDispatchToProps)(Signup);
