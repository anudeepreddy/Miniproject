import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux';
import { ControlledEditor } from "@monaco-editor/react";
import {
  EditorContentManager,
  RemoteCursorManager,
} from "@convergencelabs/monaco-collab-ext";
import { Input,Button,Row,Col } from 'antd';
import LanguageCode from "./LanguageCode";

const { TextArea } = Input;

const colors = ["red", "green", "blue", "orange", "yellow"];

function EditorContent(props) {
  const editorRef = useRef();
  const editorContentManager = useRef();
  const remoteCursorManager = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const [code, setCode] = useState("//Type your code here...");
  const [input,setInput]=useState("");
  let startSync = false;
  let endSync = false;
  const username = localStorage.getItem("user");
  let sourceUserCursor;
  let guestCursors = {};

  const handleChanges = (ev,val) => {
    setCode(val);
  };

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleClick(){
    props.socket.emit('runCode',{roomId:props.roomId,Program:code,LanguageChoice:LanguageCode(props.language),Input:input});
  }


  useEffect(()=>{
    console.log(props.joinedRoom);
    if(!startSync&&!props.isOwner&&props.joinedRoom){
      console.log(props.joinedRoom);
      console.log("we are starting sync"+props.roomId);
      props.socket.emit('startSyncCode',{roomId:props.roomId});
      startSync = true;
    }
  },[props.joinedRoom])

  useEffect(() => {
    
    if (isMounted) {
      props.socket.on("editorInsert", ({ index, text }) =>{
      console.log("Insert", index, text);
        editorContentManager.current.insert(index, text)}
      );
      props.socket.on("editorReplace", ({ index, length, text }) =>{
      console.log("Replace", index, length, text);
        editorContentManager.current.replace(index, length, text)}
      );
      props.socket.on("editorDelete", ({ index, length }) =>{
      console.log("Delete", index, length);
        editorContentManager.current.delete(index, length)}
      );
      props.socket.on("users-list", (users) => {
        createCursors(users);
      });
      props.socket.on("update-cursor", ({ user, position }) => {
        console.log({ user, position });
        if (!guestCursors[user]) {
          guestCursors[user] = remoteCursorManager.current.addCursor(
            user,
            colors[Math.floor(Math.random() * colors.length)],
            user
          );
        }
        guestCursors[user].setPosition(position);
      });

    }
    
    if(props.isOwner){
      props.socket.on('startSyncCode',()=>{
        console.log("Owner send data");
        console.log(editorRef.current.getValue());
        props.socket.emit('endSyncCode',{roomId:props.roomId, code:editorRef.current.getValue()});
      });
    }

    props.socket.on('endSyncCode',(data)=>{
      //console.log(code);
      console.log("we are starting sync");
      if(!endSync){
        editorContentManager.current.replace(0,code.length,data.code);
        endSync = true;
      }
    })

    props.socket.on('output',(output)=>{
      console.log(output);
    })
  }, [isMounted]);



  function createCursors(users) {
    users.map((user) => {
      if (!guestCursors[user]) {
        guestCursors[user] = remoteCursorManager.current.addCursor(
          user,
          colors[Math.floor(Math.random() * colors.length)],
          user
        );
      }
    });
  }

  const handleEditorMount = (_, editor) => {
    editorRef.current = editor;
    editorRef.current.onDidChangeCursorPosition((e) => {
      sourceUserCursor.setPosition(e.position);
      props.socket.emit("update-cursor", {
        roomId: props.roomId,
        user: username,
        position: e.position,
      });
    });

    remoteCursorManager.current = new RemoteCursorManager({
      editor: editor,
      tooltips: true,
      tooltipDuration: 2,
    });

    sourceUserCursor = remoteCursorManager.current.addCursor(
      username,
      "black",
      username
    );

    sourceUserCursor.setOffset(0)

    props.socket.emit("fetch-users", props.roomId);

    editorContentManager.current = new EditorContentManager({
      editor: editor,
      onInsert(index, text) {
        props.socket.emit("editorOnInsert", {
          roomId: props.roomId,
          index,
          text,
        });
        console.log("Insert", index, text);
      },
      onReplace(index, length, text) {
        props.socket.emit("editorOnReplace", {
          roomId: props.roomId,
          index,
          length,
          text,
        });
        console.log("Replace", index, length, text);
      },
      onDelete(index, length) {
        props.socket.emit("editorOnDelete", {
          roomId: props.roomId,
          index,
          length,
        });
        console.log("Delete", index, length);
      },
    });

    setIsMounted(true);
  };

  return (
    <>
    <ControlledEditor
      editorDidMount={handleEditorMount}
      height="90vh"
      theme="light"
      language={props.language}
      onChange={handleChanges}
      value={code}
    />
    <Row>
      <Col span={11}>
        <h3>INPUT</h3>
        <TextArea id="input" placeholder="Enter the input to be provided" onChange={handleInputChange} allowClear rows={4} />
      </Col>
      <Col span={1}></Col>
      <Col span={11}>
        <div style={{display:'flex'}}>
          <h3 style={{marginRight:'10em'}} >OUTPUT</h3>
          <Button type="primary" onClick={handleClick}>RUN</Button>
        </div>
        <h5>{JSON.stringify(props.output)}</h5>
      </Col>
    </Row>
  </>
  );
}


export default EditorContent;
