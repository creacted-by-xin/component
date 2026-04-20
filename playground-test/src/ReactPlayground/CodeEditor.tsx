import FileList from "./FileList";
import Editor from "./Editor";

export default function CodeEditor() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <FileList/>
        <Editor/>
    </div>
  )
};


