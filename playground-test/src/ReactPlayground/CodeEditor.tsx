import FileList from "./FileNameList";
import Editor from "./Editor";
import { PlaygroundContext } from "./components/PlaygroundContext";
import { useContext } from "react";
import { debounce } from 'lodash-es';
import { type Files } from './components/PlaygroundContext'

export default function CodeEditor() {

  const {
    files,
    setFiles,
    selectedFileName,
    setSelectedFileName
  } = useContext(PlaygroundContext)

  const file = files[selectedFileName]

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    console.log('修改编辑器',files)
    setFiles(files);
};



return (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <FileList />
    <Editor file={file} onChange={debounce(onEditorChange, 2000)} />
  </div>
)
};


