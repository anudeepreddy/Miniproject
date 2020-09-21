import React,{useState} from 'react';
import Editor from "@monaco-editor/react";
import {Layout} from 'antd';

const {Content}=Layout;

function EditorContent(props){
   const [code,setCode]=useState("//Type your code here...");

   return(

     <Editor
     height="90vh"
     theme='dark'
     language={props.language}
     value={code}
     />
   );
}
export default EditorContent;