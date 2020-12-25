import React, {useEffect, useState} from 'react';
import {Card, Col, Input, Layout, Modal, Row, Select} from 'antd';
import WorkspaceCard from './WorkspaceCard';
import styled from 'styled-components';
import Plus from './plus.svg';
import './HomeContent.css';

const {Content} = Layout;
const {Option} = Select;
const DashboardWrapper = styled.div`
  padding: 5em;
`;
const PlusButton = styled.div`
  display: flex;
  justify-content: center;
`;

function HomeContent(props) {

    const [modalState, setModalState] = useState(false);
    const [modalButtonLoading, setModalButtonLoading] = useState(false);
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceLang, setWorkspaceLang] = useState('');

    useEffect(() => {
        console.log(workspaceName);
        console.log(workspaceLang);
    }, [workspaceLang, workspaceName]);

    function modalOpenModal() {
        setModalState(true);
    }

    function modalHandleOk() {
        props.handleCreate({name:workspaceName,language:workspaceLang});
        setModalButtonLoading(true);
    }

    function modalHandleClose() {
        setModalState(false);
        setModalButtonLoading(false);
    }

    function handleInputChange(e) {
        setWorkspaceName(e.target.value);
    }

    function handleLanguageChange(value) {
        setWorkspaceLang(value);
    }

    return (
        <Content style={{height: '100vh'}}>
            <Modal
                title="Configure your workspace"
                visible={modalState}
                onOk={modalHandleOk}
                confirmLoading={modalButtonLoading}
                onCancel={modalHandleClose}
            >
                <Input
                    size="large"
                    placeholder="Choose an Awesome Name"
                    onChange={handleInputChange}
                />
                <Select
                    size="large"
                    placeholder="Choose a Language"
                    onChange={handleLanguageChange}
                    style={{paddingTop: '1em', width: "100%"}}
                >
                    <Option value="c">C</Option>
                    <Option value="cpp">C++</Option>
                    <Option value="java">Java</Option>
                    <Option value="python">Python</Option>
                    <Option value="node">Node Js</Option>
                    <Option value="ruby">Ruby</Option>
                </Select>
            </Modal>
            <DashboardWrapper>
                <h3>My Workspaces</h3>
                <Row style={{marginTop: '1em'}} gutter={[40, 40]}>
                    <Col
                        xs={{span: 24}}
                        md={{span: 12}}
                        lg={{span: 10}}
                        xl={{span: 6}}
                        xxl={{span: 6}}
                        onClick={modalOpenModal}
                    >
                        <Card className="newWorkspaceCard">
                            <PlusButton>
                                <img
                                    src={Plus}
                                    alt="new workspace"
                                    height="32px"
                                    weight="32px"
                                />
                            </PlusButton>
                            <h4 style={{marginTop: '1em'}}>New Workspace</h4>
                        </Card>
                    </Col>
                    {
                        props.workspaces.map((workspace)=>(
                            <Col
                                xs={{span: 24}}
                                md={{span: 12}}
                                lg={{span: 10}}
                                xl={{span: 6}}
                                xxl={{span: 6}}
                            >
                                <WorkspaceCard name={workspace.name} lang={workspace.language} id={workspace._id}/>
                            </Col>
                        ))
                    }
                </Row>
            </DashboardWrapper>
        </Content>
    );
}

export default HomeContent;
