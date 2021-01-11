import React, {useState, useRef, useEffect} from 'react';
import {ControlledEditor} from "@monaco-editor/react";
import { EditorContentManager } from '@convergencelabs/monaco-collab-ext';


function EditorContent(props) {
    const editorRef = useRef();
    const editorContentManagerRef = useRef();
    const [isMounted, setIsMounted] = useState(false);
    let editorContentManager;

    const [code, setCode] = useState("//Type your code here...");

    const handleChanges = (ev, value) => {
        setCode(value);
        console.log(code);
    };

    useEffect(()=>{
        console.log("Is Mounted:",isMounted);
        console.log("Printing the EditorContentManager",editorContentManager)
        if(isMounted){
            props.socket.on('editorInsert',({index, text})=>editorContentManagerRef.current.insert(index,text));
            props.socket.on('editorReplace',({index, length, text})=>editorContentManagerRef.current.replace(index, length, text));
            props.socket.on('editorDelete',({index, length})=>editorContentManagerRef.current.delete(index, length));
        }
    },[isMounted]);

    const handleEditorMount = (_, editor) => {
        editorRef.current = editor;
        editorContentManagerRef.current = new EditorContentManager({
            editor: editor,
            onInsert(index, text) {
                props.socket.emit('editorOnInsert',{roomId: props.roomId, index, text});
                //console.log("Insert", index, text);
            },
            onReplace(index, length, text) {
                props.socket.emit('editorOnReplace',{roomId: props.roomId, index, length, text});
                //console.log("Replace", index, length, text);
            },
            onDelete(index, length) {
                props.socket.emit('editorOnDelete',{roomId: props.roomId, index, length});
                //console.log("Delete", index, length);
            }
        });
        console.log(editorContentManager);
        setIsMounted(true);
    }

    return (
        <ControlledEditor
            editorDidMount={handleEditorMount}
            height="90vh"
            theme='light'
            language={props.language}
            //onChange={handleChanges}
            value={code}
        />
    );
}

export default EditorContent;
