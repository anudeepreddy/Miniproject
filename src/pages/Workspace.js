import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import WorkspaceSider from 'components/workspace/WorkspaceSider';
import WorkspaceContent from 'components/workspace/WorkspaceContent';


function Workspace() {
  return (
    <Layout>
      <HeaderComponent username="Anudeep" workspaceName="mark1"/>
      <Layout>
        <WorkspaceContent />
        <WorkspaceSider />
      </Layout>
    </Layout>
  );
}

export default Workspace;
