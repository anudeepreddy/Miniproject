import {useState} from 'react';
import {Button, Card, Col, Form, Input, Row, Space} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const axios = require('axios');

toast.configure();

function Signup() {

    const onFinish = values => {
        console.log('Received values of form: ', values);
        axios.post('http://localhost:8000/user/signup', values)
            .then(res => {
                console.log(res);
                const data = res.data;
                if (data.status) {
                    toast.success("Registration successful", {autoClose: 3000});
                    window.location = data.redirect;
                } else {
                    toast.error(data.message, {autoClose: 3000});
                }
            })
            .catch(err => {
                toast.error(err.message, {autoClose: 3000});
            });
    };
    const [size] = useState(8);
    return (
        < Row >
        < Col >
        < Card
    bordered = {false}
    style = {
    {
        minHeight: "100vh",
            display
    :
        "flex",
            flexDirection
    :
        "column",
            justifyContent
    :
        "center",
    }
}>
<
    h2 > Create
    an
    Account < /h2>
    < Form
    name = "normal_login"
    className = "login-form"
    initialValues = {
    {
        remember: true
    }
}
    onFinish = {onFinish}
        >
        < Form.Item
    name = "username"
    rules = {[{required: true, message: 'Please enter your Username!'}]}
        >
        < Input
    prefix = { < UserOutlined
    className = "site-form-item-icon" / >
}
    placeholder = "Username" / >
        < /Form.Item>
        < Form.Item
    name = "email"
    rules = {[{required: true, message: 'Please enter your Email-id!'}]}
        >
        < Input
    prefix = { < UserOutlined
    className = "site-form-item-icon" / >
}
    type = "email"
    placeholder = "E-mail"
        / >
        < /Form.Item>
        < Form.Item
    name = "password"
    rules = {[{required: true, message: 'Please enter your Password!'}]}
        >
        < Input.Password
    prefix = { < LockOutlined
    className = "site-form-item-icon" / >
}
    type = "password"
    placeholder = "Password"
    iconRender = {visible
=>
    (visible ? < EyeTwoTone / >
: <
    EyeInvisibleOutlined / >
)
}
    />
    < /Form.Item>
    < Form.Item
    name = "confirm password"
    rules = {[{required: true, message: 'Please re-enter your Password!'}]}
        >
        < Input.Password
    prefix = { < LockOutlined
    className = "site-form-item-icon" / >
}
    type = "password"
    placeholder = "Confirm Password"
    iconRender = {visible
=>
    (visible ? < EyeTwoTone / >
: <
    EyeInvisibleOutlined / >
)
}
    />
    < /Form.Item>
    < Form.Item >
    < Space
    size = {size} >
        < Button
    type = "primary"
    htmlType = "submit"
    className = "login-form-button" >
        Sign
    up
    < /Button>
    < br > < /br>
    < span > Already
    have
    an
    account ?
<
    a
    style = {
    {
        textAlign:'right',
            float
    :
        'right'
    }
}
    href = "/login" > login
    here
    ! < /a></s
    pan >
    < /Space>
    < /Form.Item>
    < /Form>
    < /Card>
    < /Col>
    < Col
    span = {17} >
        < img
    style = {
    {
        position: 'absolute',
            top
    :
        '4%',
            left
    :
        '20%',
            width
    :
        '600px',
            height
    :
        '500px'
    }
}
    src = "/login.svg"
    alt = "text" > < /img>
        < /Col>
        < /Row>
)
    ;
}

export default Signup;
