import React from 'react';
import {Col, Layout, Row} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSidebar from 'components/workspace/WorkspaceSidebar';
import WorkspaceContent from 'components/workspace/WorkspaceContent';
import { connect } from 'react-redux';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const {Content} = Layout;

function Workspace(props) {
    if(props.isLoggedIn)
    return (
        <Layout>
            <HeaderComponent username="Anudeep" workspaceName="mark1"/>
            <Content>
                <Row>
                    <Col span={19}>
                        <WorkspaceContent language='javascript'/>
                    </Col>
                    <Col span={5}>
                        <WorkspaceSidebar language={{name: "C++", value: "cpp"}}/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
    else
    return (
        <div style={{textAlign: 'center'}}>
        <h1>Login to Continue</h1>
        <a  href="/login">Login Here!</a> 
       </div>
    );
}


const mapStateToProps = (state) => ({
    isLoggedIn: state.userLogin.loggedIn
})

export default connect(mapStateToProps,null)(Workspace);
