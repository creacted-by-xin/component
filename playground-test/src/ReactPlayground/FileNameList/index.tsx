import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../components/PlaygroundContext";
import FileNameItem from "./FileNameItem";
import styles from '../index.module.scss'

export default function FileList() {
  const { 
        files, 
        removeFile, 
        addFile, 
        updateFileName, 
        selectedFileName,
        setSelectedFileName
    } = useContext(PlaygroundContext);

    const [tabs, setTabs] = useState(['']);
    const [creating, setCreating] = useState(false);

    const  handleEditComplete = (oldFileName: string, newFileName: string)=> {
      updateFileName(oldFileName, newFileName);
      setSelectedFileName(newFileName)
    };

     function handleAdd() {
      addFile('请输入文件名！')
      setCreating(true)
      console.log('请输入文件名！')
     };

     function handleCreating() {
      setCreating(false)
     }

    useEffect(()=> {
      setTabs(Object.keys(files));
    }, [files])

  return (
    <div className={styles.tabs}>{
      tabs.map((item, index)=> (
        <FileNameItem key={item+index} 
        onClick={() => setSelectedFileName(item)} 
        value={item}
        creating = {creating && index === (tabs.length-1)}
        handleCreating={()=>handleCreating()}
        actived={selectedFileName === item}
        onEditComplete={(name: string )=> handleEditComplete(item, name)}
        />
      ))
      }
      {
        !creating && <div className={styles.add} onClick={handleAdd}>+</div>
      }
      </div>
  )
}
