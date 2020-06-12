import React,{useState} from 'react';
import { Card,Layout,Row,Col,Modal,Input } from 'antd';
import styled from 'styled-components';
import Plus from "./plus.svg";
import './HomeContent.css';

const {Content} = Layout;

const DashboardWrapper = styled.div`
  padding:5em;
`
const PlusButton = styled.div`
display:flex;
justify-content:center;
` 

function HomeContent(){

  const [modalState,setModalState] = useState(false);
  const [modalButtonLoading,setModalButtonLoading] = useState(false);
  
  function modalOpenModal(){
    setModalState(true);
  }
  
  function modalHandleOk(){
    setModalButtonLoading(true);
  }
  
  function modalHandleClose(){
    setModalState(false);
    setModalButtonLoading(false);
  }

  return (
    <Content>
      <Modal
          title="Enter a cool name for your workspace"
          visible={modalState}
          onOk={modalHandleOk}
          confirmLoading={modalButtonLoading}
          onCancel={modalHandleClose}
        >
              <Input size="large" placeholder="New Workspace"/>
        </Modal>
      <DashboardWrapper>
        <h3>My Workspaces</h3>
        <Row style={{marginTop:"1em"}} gutter={[16, 16]}>
          <Col xs={{span:24}} md={{span:12}} lg={{span:8}} xl={{span:6}} xxl={{span:6}} onClick={modalOpenModal}>
            <Card className="newWorkspaceCard">
              <PlusButton>
                <img src={Plus} alt="new workspace" height="32px" weight="32px"/>
              </PlusButton>
              <h4 style={{marginTop:"1em"}}>New Workspace</h4>
            </Card>
          </Col>
        </Row>
      </DashboardWrapper>  
    </Content>
  )
}

export default HomeContent;