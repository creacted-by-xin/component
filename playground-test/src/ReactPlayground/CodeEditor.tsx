import FileList from "./FileNameList";
import Editor from "./Editor";
import { PlaygroundContext } from "./components/PlaygroundContext";
import { useContext } from "react";

export default function CodeEditor() {
  

  const { 
    files, 
    setFiles, 
    selectedFileName, 
    setSelectedFileName
} = useContext(PlaygroundContext)

const file = files[selectedFileName]

  function onEditorChange() {
    console.log(...arguments);
  };

  

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <FileList/>
        <Editor file={file} onChange={onEditorChange}/>
    </div>
  )
};


