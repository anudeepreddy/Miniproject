import React from 'react';
import { Layout } from 'antd';
import EditorHeaderComponent from 'components/Editor/EditorHeaderComponent';
import  EditorSider  from 'components/Editor/EditorSider';
import EditorContent from 'components/Editor/EditorContent'

const {  Footer } = Layout;


function Editor() {
    return (
        <Layout>
      <EditorHeaderComponent/>
      <Layout>
        <EditorContent/>
        <EditorSider/>
      </Layout>
      <Footer>&copy; Copyrights:MiniProject</Footer>
    </Layout>
    );
}

export default Editor;