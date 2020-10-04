import React from 'react';
import {Col, Layout, Row} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSidebar from 'components/workspace/WorkspaceSidebar';
import WorkspaceContent from 'components/workspace/WorkspaceContent';

const {Content} = Layout;

function Workspace() {
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
}

export default Workspace;
