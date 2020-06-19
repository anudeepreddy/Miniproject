import React,{Component} from 'react';
import MonacoEditor from 'react-monaco-editor';
import {Layout} from 'antd';

const {Content}=Layout;

class EditorContent extends Component{
constructor(props) {
    super(props);
    this.state = {
      code: '// Type your code here...',
    }
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        height="523px"
        value={code}
        options={options}
      />
    );
  }
}
export default EditorContent;