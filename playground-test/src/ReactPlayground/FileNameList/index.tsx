import { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../components/PlaygroundContext";
import FileNameItem from "./FileNameItem";
import { ENTRY_FILE_NAME, APP_COMPONENT_FILE_NAME, IMPORT_MAP_File_NAME } from "../files";
import styles from '../index.module.scss';

export default function FileList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName
  } = useContext(PlaygroundContext);

  const readonlyFIleNames = [ ENTRY_FILE_NAME, APP_COMPONENT_FILE_NAME, IMPORT_MAP_File_NAME ];
  const [tabs, setTabs] = useState(['']);
  const [creating, setCreating] = useState(false);
  const countRef = useRef(1);

  const handleEditComplete = (oldFileName: string, newFileName: string) => {
    updateFileName(oldFileName, newFileName);
    setSelectedFileName(newFileName)
  };

  function handleAdd() {
    addFile(`新建文件(${countRef.current}).jsx`)
    countRef.current++;
    setCreating(true)
  };

  function handleCreating() {
    setCreating(false)
  }

  function handleRemove(name: string) {
    setSelectedFileName(ENTRY_FILE_NAME);
    removeFile(name);
  };

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files])

  return (
    <div className={styles.tabs}>{
      tabs.map((item, index) => (
        <FileNameItem key={item + index}
          onClick={() => setSelectedFileName(item)}
          value={item}
          readonly = {readonlyFIleNames.includes(item)}
          creating={creating && index === (tabs.length - 1)}
          handleCreating={() => handleCreating()}
          actived={selectedFileName === item}
          onEditComplete={(name: string) => handleEditComplete(item, name)}
          handleRemove={() => {
            handleRemove(item)
          }}
        />
      ))
    }
      {
        !creating && <div className={styles.add} onClick={handleAdd}>+</div>
      }
    </div>
  )
}
