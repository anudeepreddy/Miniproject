import {useState} from 'react';
import {ControlledEditor} from "@monaco-editor/react";


function EditorContent(props) {

    const [code, setCode] = useState("//Type your code here...");

    const handleChanges = (ev, value) => {
        setCode(value);
        console.log(code);
    };

    return (
        < ControlledEditor
    height = "90vh"
    theme = 'dark'
    language = {props.language}
    onChange = {handleChanges}
    value = {code}
    />
)
    ;
}

export default EditorContent;
