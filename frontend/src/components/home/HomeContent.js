import React, { useState,useEffect } from 'react';
import { Card, Layout, Row, Col, Modal, Input, Select } from 'antd';
import WorkspaceCard from './WorkspaceCard';
import styled from 'styled-components';
import Plus from './plus.svg';
import './HomeContent.css';

const { Content } = Layout;
const { Option } = Select;
const DashboardWrapper = styled.div`
  padding: 5em;
`;
const PlusButton = styled.div`
  display: flex;
  justify-content: center;
`;

function HomeContent() {

  const [modalState, setModalState] = useState(false);
  const [modalButtonLoading, setModalButtonLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceLang, setWorkspaceLang] = useState('');

  useEffect(()=>{
    console.log(workspaceName);
    console.log(workspaceLang);
  },[workspaceLang,workspaceName]);

  function modalOpenModal() {
    setModalState(true);
  }

  function modalHandleOk() {
    setModalButtonLoading(true);
  }

  function modalHandleClose() {
    setModalState(false);
    setModalButtonLoading(false);
  }

  function handleInputChange(value) {
    setWorkspaceName(value);
  }

  function handleLanguageChange(value) {
    setWorkspaceLang(value);
  }

  return (
    <Content>
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
          style={{ paddingTop: '1em', width:"100%"}}
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
        <Row style={{ marginTop: '1em' }} gutter={[40, 40]}>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
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
              <h4 style={{ marginTop: '1em' }}>New Workspace</h4>
            </Card>
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <WorkspaceCard name="Hello world" lang="cpp" />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <WorkspaceCard name="Mark1" lang="node" />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <WorkspaceCard name="Mark1" lang="node" />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <WorkspaceCard name="Mark1" lang="node" />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <WorkspaceCard name="Mark1" lang="node" />
          </Col>
        </Row>
      </DashboardWrapper>
    </Content>
  );
}

export default HomeContent;