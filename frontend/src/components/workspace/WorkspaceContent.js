import React, { useState, useRef, useEffect } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import {
  EditorContentManager,
  RemoteCursorManager,
} from "@convergencelabs/monaco-collab-ext";

const colors = ["red", "green", "blue", "orange", "yellow"];

function EditorContent(props) {
  const editorRef = useRef();
  const editorContentManager = useRef();
  const remoteCursorManager = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const [code, setCode] = useState("//Type your code here...");
  const username = localStorage.getItem("user");
  let sourceUserCursor;
  let guestCursors = {};
  const handleChanges = (ev) => {
    //console.log(ev);
  };

  useEffect(() => {
    if (isMounted) {
      props.socket.on("editorInsert", ({ index, text }) =>
        editorContentManager.current.insert(index, text)
      );
      props.socket.on("editorReplace", ({ index, length, text }) =>
        editorContentManager.current.replace(index, length, text)
      );
      props.socket.on("editorDelete", ({ index, length }) =>
        editorContentManager.current.delete(index, length)
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

    props.socket.emit("fetch-users", props.roomId);

    editorContentManager.current = new EditorContentManager({
      editor: editor,
      onInsert(index, text) {
        props.socket.emit("editorOnInsert", {
          roomId: props.roomId,
          index,
          text,
        });
        console.log("Insert", index, text.charCodeAt(0));
      },
      onReplace(index, length, text) {
        props.socket.emit("editorOnReplace", {
          roomId: props.roomId,
          index,
          length,
          text,
        });
        //console.log("Replace", index, length, text);
      },
      onDelete(index, length) {
        props.socket.emit("editorOnDelete", {
          roomId: props.roomId,
          index,
          length,
        });
        //console.log("Delete", index, length);
      },
    });

    setIsMounted(true);
  };

  return (
    <ControlledEditor
      editorDidMount={handleEditorMount}
      height="90vh"
      theme="light"
      language={props.language}
      onChange={handleChanges}
      value={code}
    />
  );
}

export default EditorContent;
